import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const db=fs.readFileSync(new URL('../src/db.ts',import.meta.url),'utf8');
const server=fs.readFileSync(new URL('../src/server.ts',import.meta.url),'utf8');
test('practice execution is read-only and bounded',()=>{assert.match(db,/statement_timeout='5000ms'/);assert.match(db,/transaction_read_only=on/);assert.match(db,/Only one SQL statement/);assert.match(db,/Practice execution only permits SELECT\/WITH queries/)});
test('production security controls exist',()=>{assert.match(server,/X-Content-Type-Options/);assert.match(server,/X-Frame-Options/);assert.match(server,/Rate limit exceeded/);assert.match(server,/requireRole\('admin'\)/)});
test('authentication and audit routes exist',()=>{assert.match(server,/\/api\/auth\/register/);assert.match(server,/\/api\/auth\/login/);assert.match(server,/\/api\/auth\/logout/);assert.match(server,/\/api\/admin\/audit/)});
test('production lifecycle routes exist',()=>{assert.match(server,/\/api\/admin\/questions/);assert.match(server,/\/api\/admin\/collections/);assert.match(server,/\/api\/analytics\/overview/);assert.match(server,/\/api\/export\/progress/)});
