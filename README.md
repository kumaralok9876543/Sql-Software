# SQL Software | SQL Practice Studio

A SQL learning and interview-practice platform with a React frontend, Node.js/Express API, PostgreSQL database, and optional OpenAI-powered tutoring and question generation.

> **Important:** This repository is a development baseline. Before calling it production-ready, run the complete verification checklist in this README on your own machine/CI environment. Never commit real API keys or production database credentials.

For the repository layout and Cloudflare Workers deployment (including the API hosting requirement and exact API token permissions), see [DEPLOYMENT.md](DEPLOYMENT.md).

---

## 1. What is included

### Core SQL practice
- SQL editor and practice workspace
- Database/schema explorer
- Tables and columns
- Schema architecture / ER-style view
- Data Output and Expected Output areas
- Practice questions and difficulty levels
- SQL execution API boundary
- Result-comparison/attempt infrastructure

### Database and question workflow
- PostgreSQL practice database
- Isolated practice-schema architecture
- Schema metadata/introspection
- Question persistence and validation architecture
- Reference-query execution architecture
- Expected-output generation architecture
- Database reset/snapshot concepts
- Demo HR SQL dataset in `examples/hr_demo.sql`

### OpenAI features
- Server-side OpenAI integration boundary
- AI SQL tutor
- Progressive hints
- Query explanation/review
- SQL-error assistance
- Schema/image interpretation architecture
- AI question-generation architecture

### Platform features
- Authentication/session architecture
- Roles and RBAC foundation
- Admin/question-management foundation
- Analytics/progress foundation
- Interview-mode foundation
- Audit/security controls
- Health checks
- Backup script
- Docker development and production configurations
- GitHub Actions CI foundation

---

# 2. Requirements

Install:

- **Node.js 20 or newer**
- **npm 10 or newer** (normally bundled with Node)
- **Docker Desktop** with Docker Compose
- **Git**
- An OpenAI API key if you want to test AI features

Check versions:

```bash
node --version
npm --version
docker --version
docker compose version
git --version
```

Recommended:

```text
Node >= 20
Docker Desktop >= current stable release
```

---

# 3. Clone from GitHub

Clone this repository:

```bash
git clone https://github.com/nigamkumar2002/Sql-software-.git
cd Sql-software-
```

Do **not** paste a real OpenAI API key into GitHub.

---

# 4. Project structure

```text
sql-software/
│
├── worker/                   # Cloudflare Worker for static assets and API proxy
├── package.json              # Root build and deployment commands
├── wrangler.jsonc            # Cloudflare Workers configuration
├── DEPLOYMENT.md             # Hosting architecture and deployment guide
├── frontend/                 # React + Vite UI
│   ├── src/
│   ├── package.json
│   └── ...
│
├── backend/                  # Node + Express API
│   ├── src/
│   ├── test/
│   ├── package.json
│   └── ...
│
├── examples/
│   └── hr_demo.sql           # Demo schema/data
│
├── scripts/
│   └── backup.sh
│
├── docker-compose.yml        # Local PostgreSQL
├── docker-compose.prod.yml   # Production-style stack
├── .env.production.example
├── .github/workflows/ci.yml
└── README.md
```

---

# 5. Recommended first run — local development

Use three terminals.

## Terminal 1 — PostgreSQL

From the repository root:

```bash
docker compose up -d postgres
```

Check:

```bash
docker compose ps
```

PostgreSQL should show as healthy/running.

Connection used by the default development configuration:

```text
Host: localhost
Port: 5432
Database: sql_practice
User: postgres
Password: postgres
```

These are **development-only credentials**. Change them for any shared/production environment.

To stop PostgreSQL:

```bash
docker compose down
```

To remove the development database volume as well:

```bash
docker compose down -v
```

**Warning:** `down -v` deletes the local PostgreSQL volume and therefore local database data.

---

# 6. Configure the backend

Create the backend environment file:

### Linux/macOS

```bash
cp backend/.env.example backend/.env
```

### Windows PowerShell

```powershell
Copy-Item backend/.env.example backend/.env
```

Open `backend/.env` and configure:

```env
PORT=4000
OPENAI_API_KEY=your_key_here
OPENAI_MODEL=your_supported_model
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/sql_practice
ALLOWED_ORIGIN=http://localhost:5173
```

If you are only testing the UI/database and not AI, you can leave the OpenAI key unset where the code permits it. AI endpoints will then report that OpenAI is not configured.

### Security rule

Never commit:

```text
backend/.env
.env
*.key
```

If a key is accidentally committed, revoke/rotate it immediately.

---

# 7. Install backend dependencies

Terminal 2:

```bash
cd backend
npm install
```

Check TypeScript without emitting files:

```bash
npm run check
```

Build the backend:

```bash
npm run build
```

Run backend tests:

```bash
npm test
```

Start the development server:

```bash
npm run dev
```

Expected API address:

```text
http://localhost:4000
```

---

# 8. Test backend health

Open this in your browser:

```text
http://localhost:4000/api/health
```

Or use curl:

```bash
curl http://localhost:4000/api/health
```

You should receive JSON indicating the service is healthy.

If OpenAI is configured, the health response should also indicate that the OpenAI integration is configured.

---

# 9. Install and run frontend

Terminal 3:

```bash
cd frontend
npm install
```

Type-check/build:

```bash
npm run build
```

Start Vite:

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

The browser should display the SQL Practice workspace.

---

# 10. Quick local startup summary

After the first dependency installation, the normal workflow is:

### Terminal 1

```bash
docker compose up -d postgres
```

### Terminal 2

```bash
cd backend
npm run dev
```

### Terminal 3

```bash
cd frontend
npm run dev
```

Then open:

```text
http://localhost:5173
```

---

# 11. Load the demo database

The repository contains:

```text
examples/hr_demo.sql
```

With PostgreSQL running, you can load it using `psql` if `psql` is installed:

```bash
psql "postgresql://postgres:postgres@localhost:5432/sql_practice" -f examples/hr_demo.sql
```

Or copy the file into the PostgreSQL container and execute it:

```bash
docker cp examples/hr_demo.sql $(docker compose ps -q postgres):/tmp/hr_demo.sql
docker compose exec postgres psql -U postgres -d sql_practice -f /tmp/hr_demo.sql
```

Then verify:

```bash
docker compose exec postgres psql -U postgres -d sql_practice
```

Inside `psql`:

```sql
\dt
SELECT * FROM employees LIMIT 5;
SELECT * FROM departments LIMIT 5;
```

Exit:

```text
\q
```

---

# 12. Manual SQL verification

Before testing AI functionality, verify ordinary SQL execution independently.

Run these queries against the demo database:

```sql
SELECT * FROM employees;
```

```sql
SELECT first_name, salary
FROM employees
ORDER BY salary DESC;
```

JOIN test:

```sql
SELECT
    e.first_name,
    d.department_name
FROM employees e
JOIN departments d
    ON e.department_id = d.department_id;
```

GROUP BY/HAVING test:

```sql
SELECT department_id, AVG(salary)
FROM employees
GROUP BY department_id
HAVING AVG(salary) > 50000;
```

If these fail, fix the database/API layer before testing the AI features.

---

# 13. Frontend smoke test

After opening `http://localhost:5173`, verify:

- [ ] Application loads without a blank screen
- [ ] Database selector is visible
- [ ] Tables appear in schema explorer
- [ ] Tables expand/collapse
- [ ] Columns are visible
- [ ] Schema Architecture opens
- [ ] SQL editor accepts SQL
- [ ] Run button responds
- [ ] Reset works
- [ ] Format works
- [ ] Data Output renders
- [ ] Expected Output renders
- [ ] Challenge panel renders
- [ ] Hint/AI Tutor controls open their UI

Open browser DevTools (`F12`) and check:

```text
Console → no unexpected red errors
Network → API requests return expected status codes
```

---

# 14. Backend/API smoke test

At minimum test:

```text
GET /api/health
```

Then test the SQL endpoint with a simple request according to the current API contract.

Example pattern:

```bash
curl -X POST http://localhost:4000/api/sql/execute \
  -H "Content-Type: application/json" \
  -d '{"sql":"SELECT 1","databaseId":"demo-db"}'
```

Read the response rather than assuming success from HTTP 200 alone.

---

# 15. OpenAI verification

With `OPENAI_API_KEY` configured and the backend restarted, verify the health endpoint first.

Then test the AI Tutor from the application.

Test at least:

1. **Hint**
   - Ask for a hint without revealing the solution.

2. **Query explanation**
   - Submit a valid SQL query and ask for an explanation.

3. **Error explanation**
   - Use an invalid column/table and request an explanation.

4. **Question generation**
   - Generate questions using the selected schema.

5. **Schema grounding**
   - Verify generated questions only reference real tables/columns.

Never trust generated SQL just because the model produced it. The reference query must be validated/executed by the application before a question is published.

---

# 16. Question-generation acceptance test

This is one of the most important tests for this project.

Choose one database/schema and generate:

```text
10 questions
```

Then test:

```text
50 questions
```

Then:

```text
100 questions
```

For every accepted question verify:

- [ ] Tables exist
- [ ] Columns exist
- [ ] Difficulty is valid
- [ ] Topic is valid
- [ ] Reference SQL parses
- [ ] Reference SQL executes
- [ ] Expected output comes from actual execution
- [ ] Question is not a duplicate
- [ ] Question is not effectively the same as another question

For the original product requirement, this is the acceptance criterion:

```text
ONE DATABASE
    ↓
ONE SCHEMA
    ↓
50/100+ DIFFERENT QUESTIONS
    ↓
EVERY QUESTION VALIDATED AGAINST THAT DATABASE
```

---

# 17. Student-result verification

Take one generated question.

### Test A — correct query

Submit a known-correct solution.

Expected:

```text
Correct
```

### Test B — wrong query

Submit an incorrect solution.

Expected:

```text
Incorrect
```

### Test C — syntax error

Submit intentionally invalid SQL.

Expected:

```text
Execution error
```

### Test D — equivalent query

Write a logically equivalent query using a different valid SQL approach.

The result comparator should judge based on result semantics where that is the intended policy, not merely string equality of SQL.

---

# 18. Security tests

Because this application handles user SQL, security testing is mandatory.

Try:

```sql
DROP TABLE employees;
```

```sql
DELETE FROM employees;
```

```sql
UPDATE employees SET salary = 1;
```

```sql
SELECT 1; DROP TABLE employees;
```

These should be rejected by the student execution boundary.

Normal read-only SQL such as:

```sql
SELECT * FROM employees;
```

should work.

Also test:

- [ ] Statement timeout
- [ ] Multiple-statement blocking
- [ ] Read-only transaction
- [ ] CORS restriction
- [ ] Rate limits
- [ ] Authentication checks
- [ ] Admin-only routes
- [ ] Upload-size limits
- [ ] API key not exposed to browser

---

# 19. Authentication test

Create two users:

```text
User A
User B
```

Verify that User A cannot access User B's:

- attempts
- progress
- saved questions
- interview results
- private data

Test:

- [ ] Register
- [ ] Login
- [ ] Logout
- [ ] Expired/invalid session
- [ ] Protected API route
- [ ] Student role
- [ ] Admin role

Do not test only by hiding UI buttons. Direct API access must also be denied.

---

# 20. Admin test

Admin should be able to access the administration functionality.

Verify:

- [ ] User management
- [ ] Question moderation
- [ ] Question approval/rejection
- [ ] Audit logs
- [ ] Platform metrics
- [ ] Feature/configuration controls

Login as a normal student and verify that admin APIs reject the request.

---

# 21. Interview-mode test

Start an interview session and verify:

- [ ] Question selection
- [ ] Difficulty
- [ ] Timer/session state
- [ ] SQL execution
- [ ] Correct answer scoring
- [ ] Incorrect answer scoring
- [ ] Session completion
- [ ] Final score/result
- [ ] Attempt history

Test both correct and incorrect answers.

---

# 22. Schema-image workflow test

For the schema-image feature, use a screenshot containing a small database schema.

Verify the pipeline:

```text
Screenshot
   ↓
OpenAI vision/schema extraction
   ↓
Tables
   ↓
Columns
   ↓
Types
   ↓
Primary keys
   ↓
Foreign keys
   ↓
Relationships
   ↓
Review
   ↓
Database creation
```

**Do not automatically trust uncertain extraction.** Review the generated schema before importing it into a persistent database.

Then verify the actual PostgreSQL catalog contains the expected tables/columns/constraints.

---

# 23. Automated tests

Backend tests:

```bash
cd backend
npm test
```

Type check:

```bash
npm run check
```

Build:

```bash
npm run build
```

Frontend build:

```bash
cd frontend
npm run build
```

Run these before every GitHub push.

---

# 24. GitHub push checklist

Before pushing:

```bash
git status
```

Confirm that secrets are NOT listed.

Then:

```bash
git add .
git commit -m "Add SQL Practice OpenAI platform"
git push origin main
```

Never run:

```bash
git add backend/.env
```

If `.env` accidentally appears in `git status`, stop and fix `.gitignore` before committing.

---

# 25. GitHub Actions / CI

The repository contains:

```text
.github/workflows/ci.yml
```

CI should be used to verify at least:

```text
backend install
backend type-check
backend tests
backend build
frontend install
frontend build
```

Open the **Actions** tab on GitHub after pushing and verify the workflow is green.

A green CI run is necessary but does not replace manual end-to-end testing with PostgreSQL and OpenAI.

---

# 26. Docker production-style test

Build the production images:

```bash
docker compose -f docker-compose.prod.yml build
```

Start:

```bash
docker compose -f docker-compose.prod.yml up -d
```

Check:

```bash
docker compose -f docker-compose.prod.yml ps
```

Inspect logs:

```bash
docker compose -f docker-compose.prod.yml logs --tail=200
```

Stop:

```bash
docker compose -f docker-compose.prod.yml down
```

Do not put real production secrets directly into the Compose file.

---

# 27. Backup test

The repository includes:

```text
scripts/backup.sh
```

Run it in an environment with the required database tooling configured.

After creating a backup, verify that the backup file actually exists and is non-empty.

A backup is only considered verified after performing a test restore into a separate database/environment.

---

# 28. Full verification checklist

Use this as the final acceptance checklist:

### Infrastructure
- [ ] Node works
- [ ] Docker works
- [ ] PostgreSQL works
- [ ] Backend starts
- [ ] Frontend starts

### Frontend
- [ ] IDE loads
- [ ] Schema explorer works
- [ ] SQL editor works
- [ ] Output works
- [ ] Challenge panel works
- [ ] Schema architecture works

### SQL
- [ ] SELECT
- [ ] JOIN
- [ ] GROUP BY
- [ ] HAVING
- [ ] Subquery
- [ ] NULL handling
- [ ] Error handling
- [ ] Timeout/security controls

### AI
- [ ] Tutor
- [ ] Hint
- [ ] Error explanation
- [ ] Question generation
- [ ] Schema grounding
- [ ] Generated reference SQL validation

### Question system
- [ ] 10 questions
- [ ] 50 questions
- [ ] 100 questions
- [ ] Duplicate detection
- [ ] Expected-output validation
- [ ] Result comparison

### Accounts
- [ ] Registration
- [ ] Login
- [ ] Logout
- [ ] Session protection
- [ ] Student isolation
- [ ] Admin authorization

### Platform
- [ ] Analytics
- [ ] Interview mode
- [ ] Admin moderation
- [ ] Audit logs
- [ ] Backup

### Production
- [ ] Frontend build
- [ ] Backend build
- [ ] Docker build
- [ ] Docker startup
- [ ] CI green
- [ ] Secrets protected
- [ ] Backup restore tested

---

# 29. Troubleshooting

## `npm: command not found`

Install Node.js 20+ and restart the terminal.

## `docker: command not found`

Install/start Docker Desktop.

## PostgreSQL connection refused

Check:

```bash
docker compose ps
```

Then:

```bash
docker compose logs postgres
```

## Port 5432 already in use

Find the process using port 5432 or change the host-side port in Compose and update `DATABASE_URL` accordingly.

## Port 4000 already in use

Change `PORT` in `backend/.env` and update the frontend API configuration if required.

## Port 5173 already in use

Vite can select another port, or stop the process currently using 5173.

## OpenAI errors

Check:

```text
OPENAI_API_KEY
OPENAI_MODEL
internet connectivity
OpenAI account/project configuration
backend logs
```

Never paste your API key into a GitHub issue, screenshot, browser console, or chat.

## CORS error

Make sure:

```env
ALLOWED_ORIGIN=http://localhost:5173
```

matches the URL from which the frontend is being served.

---

# 30. Recommended development order

When extending the project, use this order:

```text
1. Start PostgreSQL
2. Start backend
3. Start frontend
4. Verify /api/health
5. Verify basic SQL
6. Verify question generation
7. Verify reference SQL execution
8. Verify student-result comparison
9. Verify AI Tutor
10. Verify authentication
11. Verify admin permissions
12. Verify interview mode
13. Run security tests
14. Run npm test
15. Run type checks
16. Run production builds
17. Run Docker build
18. Push to GitHub
19. Verify GitHub Actions
```

---

# 31. Important production notes

This project should **not** be considered production-ready merely because it builds.

Before a public deployment:

1. Replace development PostgreSQL credentials.
2. Use strong session/authentication secrets.
3. Store secrets in the hosting provider's secret manager.
4. Run SQL execution in an appropriately isolated environment.
5. Add database backups and test restores.
6. Add monitoring/logging/alerting.
7. Review rate limits and abuse controls.
8. Run dependency/security scanning.
9. Perform a full authorization review.
10. Test generated questions against the real schema before publication.

The SQL execution sandbox is a security boundary. Treat it as untrusted-code execution and harden/isolate it before exposing it to arbitrary internet users.

---

# 32. Final local-success criteria

You can consider the local development setup verified when all of these are true:

```text
Browser
  ↓
React frontend
  ↓
Node/Express backend
  ↓
PostgreSQL
  ↓
Real SQL execution
  ↓
Question/reference SQL validation
  ↓
Expected output
  ↓
Student SQL comparison
  ↓
OpenAI Tutor/Generation
```

and:

```text
npm test             ✓
npm run check        ✓
npm run build        ✓
frontend npm build   ✓
docker compose       ✓
GitHub Actions       ✓
security tests       ✓
manual E2E tests     ✓
```

Only after those checks pass should you move from local testing to a public production deployment.
