CREATE TABLE departments (department_id INT PRIMARY KEY, department_name TEXT NOT NULL, location TEXT);
CREATE TABLE jobs (job_id TEXT PRIMARY KEY, job_title TEXT NOT NULL, min_salary NUMERIC, max_salary NUMERIC);
CREATE TABLE employees (employee_id INT PRIMARY KEY, first_name TEXT, last_name TEXT, email TEXT, department_id INT, job_id TEXT, salary NUMERIC,
  FOREIGN KEY (department_id) REFERENCES departments(department_id), FOREIGN KEY (job_id) REFERENCES jobs(job_id));
CREATE TABLE exclusion_rules (rule_id INT PRIMARY KEY, blocked_job_id TEXT, reason TEXT);
INSERT INTO departments VALUES (1,'Engineering','Kolkata'),(2,'HR','Delhi'),(3,'Sales','Mumbai');
INSERT INTO jobs VALUES ('ENG_DEV','Developer',40000,120000),('HR_REP','HR Representative',30000,90000),('SALES_REP','Sales Representative',25000,100000),('DATA_ENG','Data Engineer',50000,140000);
INSERT INTO employees VALUES (1,'Chris','Anderson','chris@example.com',3,'SALES_REP',65000),(2,'Emma','Thomas','emma@example.com',2,'HR_REP',72000),(3,'Jane','Smith','jane@example.com',2,'HR_REP',68000),(4,'Lisa','Davis','lisa@example.com',2,'HR_REP',75000),(5,'Sarah','Williams','sarah@example.com',3,'SALES_REP',71000),(6,'Tom','Wilson','tom@example.com',3,'SALES_REP',62000),(7,'Amit','Kumar','amit@example.com',1,'DATA_ENG',105000),(8,'Neha','Roy','neha@example.com',1,'ENG_DEV',98000);
INSERT INTO exclusion_rules VALUES (1,'ENG_DEV','Restricted'),(2,NULL,'Legacy rule');
