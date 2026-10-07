import crypto from "node:crypto";
import pg from "pg";
import type { PoolClient, FieldDef } from "pg";
const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: Number(process.env.DB_POOL_SIZE ?? 10),
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000
});

export async function withClient<T>(fn:(client:PoolClient)=>Promise<T>):Promise<T>{const c=await pool.connect();try{return await fn(c)}finally{c.release()}}

export async function initDb(){
 if(!process.env.DATABASE_URL)return;
 await pool.query(`
 CREATE TABLE IF NOT EXISTS app_databases(id UUID PRIMARY KEY,name TEXT NOT NULL,slug TEXT UNIQUE NOT NULL,schema_name TEXT UNIQUE NOT NULL,dialect TEXT NOT NULL DEFAULT 'postgresql',description TEXT DEFAULT '',created_at TIMESTAMPTZ NOT NULL DEFAULT now());
 CREATE TABLE IF NOT EXISTS challenges(id UUID PRIMARY KEY,database_id UUID NOT NULL REFERENCES app_databases(id) ON DELETE CASCADE,title TEXT NOT NULL,difficulty TEXT NOT NULL,topic TEXT NOT NULL,context TEXT NOT NULL,task TEXT NOT NULL,required_output TEXT NOT NULL,reference_sql TEXT NOT NULL,expected_json JSONB NOT NULL,tags JSONB NOT NULL DEFAULT '[]'::jsonb,source TEXT NOT NULL DEFAULT 'ai',created_at TIMESTAMPTZ NOT NULL DEFAULT now());
 CREATE TABLE IF NOT EXISTS attempts(id UUID PRIMARY KEY,challenge_id UUID NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,database_id UUID NOT NULL REFERENCES app_databases(id) ON DELETE CASCADE,session_id TEXT NOT NULL,sql TEXT NOT NULL,correct BOOLEAN NOT NULL DEFAULT false,execution_ms INTEGER NOT NULL DEFAULT 0,error TEXT,actual_json JSONB,created_at TIMESTAMPTZ NOT NULL DEFAULT now());
 CREATE INDEX IF NOT EXISTS attempts_challenge_idx ON attempts(challenge_id,created_at DESC);
 CREATE INDEX IF NOT EXISTS attempts_session_idx ON attempts(session_id,created_at DESC);
 CREATE TABLE IF NOT EXISTS question_sets(id UUID PRIMARY KEY,database_id UUID NOT NULL REFERENCES app_databases(id) ON DELETE CASCADE,name TEXT NOT NULL,count_requested INTEGER NOT NULL,accepted_count INTEGER NOT NULL DEFAULT 0,rejected_count INTEGER NOT NULL DEFAULT 0,status TEXT NOT NULL DEFAULT 'pending',settings JSONB NOT NULL DEFAULT '{}'::jsonb,created_at TIMESTAMPTZ NOT NULL DEFAULT now());
 ALTER TABLE challenges ADD COLUMN IF NOT EXISTS question_set_id UUID REFERENCES question_sets(id) ON DELETE SET NULL;
 CREATE INDEX IF NOT EXISTS challenges_question_set_idx ON challenges(question_set_id);
 UPDATE challenges c SET question_set_id=(SELECT qs.id FROM question_sets qs WHERE qs.database_id=c.database_id AND qs.created_at<=c.created_at ORDER BY qs.created_at DESC LIMIT 1) WHERE c.question_set_id IS NULL AND EXISTS(SELECT 1 FROM question_sets qs WHERE qs.database_id=c.database_id AND qs.created_at<=c.created_at);
 CREATE OR REPLACE FUNCTION assign_running_question_set() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW.question_set_id IS NULL THEN SELECT id INTO NEW.question_set_id FROM question_sets WHERE database_id=NEW.database_id AND status='running' ORDER BY created_at DESC LIMIT 1; END IF; RETURN NEW; END; $$;
 DROP TRIGGER IF EXISTS challenges_assign_question_set ON challenges;
 CREATE TRIGGER challenges_assign_question_set BEFORE INSERT ON challenges FOR EACH ROW EXECUTE FUNCTION assign_running_question_set();
 CREATE TABLE IF NOT EXISTS schema_imports(id UUID PRIMARY KEY,database_id UUID NOT NULL REFERENCES app_databases(id) ON DELETE CASCADE,source_type TEXT NOT NULL,filename TEXT,raw_text TEXT,extracted_sql TEXT,review_json JSONB,status TEXT NOT NULL DEFAULT 'draft',created_at TIMESTAMPTZ NOT NULL DEFAULT now());
 CREATE TABLE IF NOT EXISTS database_snapshots(id UUID PRIMARY KEY,database_id UUID NOT NULL REFERENCES app_databases(id) ON DELETE CASCADE,label TEXT NOT NULL,schema_sql TEXT NOT NULL,data_sql TEXT NOT NULL,created_at TIMESTAMPTZ NOT NULL DEFAULT now());
 CREATE TABLE IF NOT EXISTS challenge_flags(id UUID PRIMARY KEY,challenge_id UUID NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,reason TEXT NOT NULL,details TEXT,created_at TIMESTAMPTZ NOT NULL DEFAULT now());
 CREATE INDEX IF NOT EXISTS challenges_database_idx ON challenges(database_id);
 CREATE TABLE IF NOT EXISTS users(id UUID PRIMARY KEY,name TEXT NOT NULL,email TEXT UNIQUE NOT NULL,password_hash TEXT NOT NULL,role TEXT NOT NULL DEFAULT 'student',status TEXT NOT NULL DEFAULT 'active',created_at TIMESTAMPTZ NOT NULL DEFAULT now(),last_login_at TIMESTAMPTZ);
 CREATE TABLE IF NOT EXISTS sessions(id UUID PRIMARY KEY,user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,token_hash TEXT UNIQUE NOT NULL,expires_at TIMESTAMPTZ NOT NULL,created_at TIMESTAMPTZ NOT NULL DEFAULT now());
 CREATE INDEX IF NOT EXISTS sessions_token_idx ON sessions(token_hash);
 CREATE TABLE IF NOT EXISTS audit_logs(id UUID PRIMARY KEY,actor_user_id UUID REFERENCES users(id) ON DELETE SET NULL,action TEXT NOT NULL,resource_type TEXT,resource_id TEXT,metadata JSONB NOT NULL DEFAULT '{}'::jsonb,ip TEXT,created_at TIMESTAMPTZ NOT NULL DEFAULT now());
 CREATE INDEX IF NOT EXISTS audit_logs_created_idx ON audit_logs(created_at DESC);
 CREATE TABLE IF NOT EXISTS question_reviews(id UUID PRIMARY KEY,challenge_id UUID NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,reviewer_user_id UUID REFERENCES users(id) ON DELETE SET NULL,status TEXT NOT NULL,notes TEXT DEFAULT '',created_at TIMESTAMPTZ NOT NULL DEFAULT now());
 CREATE TABLE IF NOT EXISTS question_collections(id UUID PRIMARY KEY,database_id UUID NOT NULL REFERENCES app_databases(id) ON DELETE CASCADE,name TEXT NOT NULL,description TEXT DEFAULT '',is_published BOOLEAN NOT NULL DEFAULT false,created_at TIMESTAMPTZ NOT NULL DEFAULT now());
 CREATE TABLE IF NOT EXISTS collection_questions(collection_id UUID NOT NULL REFERENCES question_collections(id) ON DELETE CASCADE,challenge_id UUID NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,position INTEGER NOT NULL DEFAULT 0,PRIMARY KEY(collection_id,challenge_id));
 CREATE TABLE IF NOT EXISTS feature_flags(id UUID PRIMARY KEY,key TEXT UNIQUE NOT NULL,enabled BOOLEAN NOT NULL DEFAULT false,config JSONB NOT NULL DEFAULT '{}'::jsonb,updated_at TIMESTAMPTZ NOT NULL DEFAULT now());
 CREATE TABLE IF NOT EXISTS api_usage_daily(day DATE PRIMARY KEY,requests BIGINT NOT NULL DEFAULT 0,ai_requests BIGINT NOT NULL DEFAULT 0,ai_input_tokens BIGINT NOT NULL DEFAULT 0,ai_output_tokens BIGINT NOT NULL DEFAULT 0,sql_runs BIGINT NOT NULL DEFAULT 0);
 CREATE TABLE IF NOT EXISTS refresh_jobs(id UUID PRIMARY KEY,job_type TEXT NOT NULL,status TEXT NOT NULL DEFAULT 'queued',payload JSONB NOT NULL DEFAULT '{}'::jsonb,progress INTEGER NOT NULL DEFAULT 0,error TEXT,created_at TIMESTAMPTZ NOT NULL DEFAULT now(),finished_at TIMESTAMPTZ);

 `);
}

export async function createPracticeSchema(schemaName:string){if(!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(schemaName))throw new Error("Invalid schema name");await pool.query(`CREATE SCHEMA IF NOT EXISTS "${schemaName}"`)}
export function quoteIdent(v:string){if(!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(v))throw new Error("Invalid identifier");return `"${v}"`}

export async function listTables(schemaName:string){
 const t=await pool.query(`SELECT table_name FROM information_schema.tables WHERE table_schema=$1 AND table_type='BASE TABLE' ORDER BY table_name`,[schemaName]);const out:any[]=[];
 for(const row of t.rows){const c=await pool.query(`SELECT c.column_name,c.data_type,c.udt_name,c.is_nullable,c.column_default,c.ordinal_position,CASE WHEN EXISTS(SELECT 1 FROM information_schema.table_constraints tc JOIN information_schema.key_column_usage k ON k.constraint_name=tc.constraint_name AND k.constraint_schema=tc.constraint_schema WHERE tc.constraint_type='PRIMARY KEY' AND tc.table_schema=c.table_schema AND tc.table_name=c.table_name AND k.column_name=c.column_name) THEN true ELSE false END is_primary_key FROM information_schema.columns c WHERE c.table_schema=$1 AND c.table_name=$2 ORDER BY c.ordinal_position`,[schemaName,row.table_name]);out.push({name:row.table_name,columns:c.rows})}return out;
}
export async function schemaSnapshot(schemaName:string){
 const tables=await listTables(schemaName);const fks=await pool.query(`SELECT tc.constraint_name,tc.table_name,kcu.column_name,ccu.table_name foreign_table_name,ccu.column_name foreign_column_name FROM information_schema.table_constraints tc JOIN information_schema.key_column_usage kcu ON kcu.constraint_name=tc.constraint_name AND kcu.table_schema=tc.constraint_schema JOIN information_schema.constraint_column_usage ccu ON ccu.constraint_name=tc.constraint_name AND ccu.constraint_schema=tc.constraint_schema WHERE tc.constraint_type='FOREIGN KEY' AND tc.table_schema=$1`,[schemaName]);return{schemaName,tables,relationships:fks.rows};
}

export async function executeReadOnly(schemaName:string,sql:string){
 if(!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(schemaName))throw new Error("Invalid schema");
 const cleaned=sql.trim().replace(/;\s*$/,'');
 if(!cleaned)throw new Error("Query is empty");
 if(cleaned.includes(';'))throw new Error("Only one SQL statement is allowed per practice run.");
 if(!/^(SELECT|WITH)\b/i.test(cleaned))throw new Error("Practice execution only permits SELECT/WITH queries.");
 if(/\b(INSERT|UPDATE|DELETE|DROP|ALTER|TRUNCATE|CREATE|GRANT|REVOKE|COPY|VACUUM|CALL|DO|SET|RESET|SHOW|EXPLAIN\s+ANALYZE)\b/i.test(cleaned))throw new Error("Read-only query required.");
 const client=await pool.connect();const started=Date.now();try{await client.query('BEGIN');await client.query("SET LOCAL statement_timeout='5000ms'");await client.query("SET LOCAL idle_in_transaction_session_timeout='6000ms'");await client.query("SET LOCAL transaction_read_only=on");await client.query("SET LOCAL work_mem='16MB'");await client.query("SET LOCAL temp_file_limit='64MB'");await client.query(`SET LOCAL search_path TO ${quoteIdent(schemaName)}, public`);const r=await client.query(cleaned);await client.query('ROLLBACK');return{columns:r.fields.map((f:FieldDef)=>f.name),rows:r.rows,rowCount:r.rowCount??r.rows.length,executionMs:Date.now()-started};}catch(e){try{await client.query('ROLLBACK')}catch{}throw e}finally{client.release()}
}

export async function executeImport(schemaName:string,sql:string){if(!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(schemaName))throw new Error("Invalid schema");const c=await pool.connect();try{await c.query('BEGIN');await c.query("SET LOCAL statement_timeout='30000ms'");await c.query(`SET LOCAL search_path TO ${quoteIdent(schemaName)}, public`);await c.query(sql);await c.query('COMMIT')}catch(e){try{await c.query('ROLLBACK')}catch{}throw e}finally{c.release()}}

export async function clearPracticeSchema(schemaName:string){await pool.query(`DROP SCHEMA IF EXISTS ${quoteIdent(schemaName)} CASCADE`);await createPracticeSchema(schemaName)}
export async function schemaDDL(schemaName:string){const tables=await listTables(schemaName);const lines:string[]=[];for(const t of tables){lines.push(`CREATE TABLE ${quoteIdent(t.name)} (`);lines.push(t.columns.map((c:any)=>`  ${quoteIdent(c.column_name)} ${c.data_type.toUpperCase()}${c.is_nullable==='NO'?' NOT NULL':''}${c.is_primary_key?' PRIMARY KEY':''}`).join(',\n'));lines.push(');')}const snap=await schemaSnapshot(schemaName);for(const fk of snap.relationships)lines.push(`ALTER TABLE ${quoteIdent(fk.table_name)} ADD CONSTRAINT ${quoteIdent(fk.constraint_name)} FOREIGN KEY (${quoteIdent(fk.column_name)}) REFERENCES ${quoteIdent(fk.foreign_table_name)} (${quoteIdent(fk.foreign_column_name)});`);return lines.join('\n')}
export async function dataSQL(schemaName:string){const tables=await listTables(schemaName);const out:string[]=[];for(const t of tables){const r=await pool.query(`SELECT * FROM ${quoteIdent(schemaName)}.${quoteIdent(t.name)}`);if(!r.rows.length)continue;const cols=r.fields.map(f=>quoteIdent(f.name)).join(', ');for(const row of r.rows){const vals=r.fields.map(f=>{const v=row[f.name];if(v===null)return 'NULL';if(typeof v==='number'&&!Number.isNaN(v))return String(v);if(v instanceof Date)return `'${v.toISOString().replace(/'/g,"''")}'`;return `'${String(v).replace(/'/g,"''")}'`}).join(', ');out.push(`INSERT INTO ${quoteIdent(t.name)} (${cols}) VALUES (${vals});`)}}return out.join('\n')}
export async function snapshotDatabase(databaseId:string,label:string){const d=(await pool.query('SELECT * FROM app_databases WHERE id=$1',[databaseId])).rows[0];if(!d)throw new Error('Database not found');const schema_sql=await schemaDDL(d.schema_name);const data_sql=await dataSQL(d.schema_name);const id=crypto.randomUUID();await pool.query('INSERT INTO database_snapshots(id,database_id,label,schema_sql,data_sql) VALUES($1,$2,$3,$4,$5)',[id,databaseId,label,schema_sql,data_sql]);return{id,label}}
export async function restoreSnapshot(databaseId:string,snapshotId:string){const d=(await pool.query('SELECT * FROM app_databases WHERE id=$1',[databaseId])).rows[0];const s=(await pool.query('SELECT * FROM database_snapshots WHERE id=$1 AND database_id=$2',[snapshotId,databaseId])).rows[0];if(!d||!s)throw new Error('Snapshot not found');await clearPracticeSchema(d.schema_name);await executeImport(d.schema_name,s.schema_sql+'\n'+s.data_sql);return schemaSnapshot(d.schema_name)}

export async function ensureDemoDatabase(){const e=await pool.query('SELECT * FROM app_databases WHERE slug=$1',['demo-ecommerce']);if(e.rowCount)return e.rows[0];const id=crypto.randomUUID(),schema='demo_ecommerce';await createPracticeSchema(schema);await pool.query('INSERT INTO app_databases(id,name,slug,schema_name,description) VALUES($1,$2,$3,$4,$5)',[id,'Demo E-Commerce','demo-ecommerce',schema,'Built-in practice database for first-run testing']);await executeImport(schema,`CREATE TABLE departments(department_id INT PRIMARY KEY,department_name TEXT NOT NULL,location TEXT);CREATE TABLE jobs(job_id TEXT PRIMARY KEY,job_title TEXT NOT NULL,min_salary NUMERIC,max_salary NUMERIC);CREATE TABLE employees(employee_id INT PRIMARY KEY,first_name TEXT,last_name TEXT,email TEXT,department_id INT,job_id TEXT,salary NUMERIC,FOREIGN KEY(department_id) REFERENCES departments(department_id),FOREIGN KEY(job_id) REFERENCES jobs(job_id));CREATE TABLE exclusion_rules(rule_id INT PRIMARY KEY,blocked_job_id TEXT,reason TEXT);INSERT INTO departments VALUES(1,'Engineering','Kolkata'),(2,'HR','Delhi'),(3,'Sales','Mumbai');INSERT INTO jobs VALUES('ENG_DEV','Developer',40000,120000),('HR_REP','HR Representative',30000,90000),('SALES_REP','Sales Representative',25000,100000),('DATA_ENG','Data Engineer',50000,140000);INSERT INTO employees VALUES(1,'Chris','Anderson','chris@example.com',3,'SALES_REP',65000),(2,'Emma','Thomas','emma@example.com',2,'HR_REP',72000),(3,'Jane','Smith','jane@example.com',2,'HR_REP',68000),(4,'Lisa','Davis','lisa@example.com',2,'HR_REP',75000),(5,'Sarah','Williams','sarah@example.com',3,'SALES_REP',71000),(6,'Tom','Wilson','tom@example.com',3,'SALES_REP',62000),(7,'Amit','Kumar','amit@example.com',1,'DATA_ENG',105000),(8,'Neha','Roy','neha@example.com',1,'ENG_DEV',98000);INSERT INTO exclusion_rules VALUES(1,'ENG_DEV','Restricted'),(2,NULL,'Legacy rule');`);return(await pool.query('SELECT * FROM app_databases WHERE id=$1',[id])).rows[0]}
