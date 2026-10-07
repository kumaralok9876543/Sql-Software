SQL AI Practice Platform — Final 70 Features
A. Database & Schema Management — 1–10
#
Feature
1
Multiple Database Management
2
Create / Rename / Delete Database
3
Schema Image Upload
4
AI/OCR Schema Extraction
5
Automatic Table & Column Creation
6
Data Import from Image / CSV / Excel / JSON
7
Manual Schema Builder
8
Primary Key / Foreign Key / Constraints
9
Automatic Relationship Detection
10
ER Diagram / Schema Architecture Viewer
B. Database Explorer & Data — 11–18
#
Feature
11
Database Explorer Sidebar
12
Expandable Tables & Columns
13
Table Data Viewer
14
Table Structure / Column Details
15
Schema Search
16
Schema Consistency / Validation Checker
17
Database Clone / Duplicate
18
Database Reset to Original State
C. SQL IDE / Editor — 19–28
#
Feature
19
Professional SQL Editor
20
Syntax Highlighting
21
Line Numbers + Auto Indentation
22
SQL Formatter
23
SQL Autocomplete
24
Table / Column Suggestions
25
Multi-Tab Query Editor
26
SQL Query Execution / Run
27
SQL Error Highlighting & Explanation
28
Query History + Restore Previous Query
D. SQL Execution & Validation — 29–37
#
Feature
29
Secure SQL Sandbox
30
Database Engine Selection
31
Read-only / Controlled Query Permissions
32
Data Output Panel
33
Expected Output Panel
34
Automatic Result Comparison
35
Multiple Valid SQL Solution Support
36
Hidden Test Cases
37
Query Execution / Performance Analysis
E. AI Question Generation — 38–47
#
Feature
38
AI Question Generator
39
Generate 10 / 50 / 100 / 500+ Questions
40
Difficulty Levels — Easy / Medium / Hard / Very Hard
41
Topic-wise Question Generation
42
Scenario / Business-based Questions
43
Duplicate Question Detection
44
Question Variations
45
Edge-case Question Generation
46
AI-generated Reference Solutions
47
Question Metadata — Topic / Difficulty / Tables / Concepts
F. Learning & AI Tutor — 48–57
#
Feature
48
Learning Mode
49
Hint 1 / Hint 2 / Progressive Hints
50
Solution / Explanation Mode
51
AI SQL Tutor
52
AI Query Explanation
53
AI SQL Error Explanation
54
Query Approach / Logic Explanation
55
Multiple Approach Explanation
56
SQL Concept Reference / Documentation
57
Custom SQL Playground
G. Interview, Assessment & Adaptive Learning — 58–65
#
Feature
58
SQL Interview Mode
59
AI SQL Interviewer / Follow-up Questions
60
Timed Challenge Mode
61
Full SQL Assessment / Test
62
Adaptive Question Difficulty
63
Weak Topic Detection
64
Mistake Review / Retry Wrong Questions
65
Topic-wise & Difficulty-wise Practice
H. Progress, Productivity & Platform Features — 66–70
#
Feature
66
User Progress Dashboard & Analytics
67
Bookmarks + Personal Notes
68
Daily Goals / Streaks / Gamification
69
Query / Question / Database Import & Export
70
Multi-SQL Engine + SQL Dialect Awareness
🧠 अब Master Prompt
नीचे वाला prompt Lovable में project specification / master architecture prompt की तरह इस्तेमाल किया जा सकता है।
Important: इसे एक ही बार में 70 features implement करने के लिए नहीं कहना है। इसका purpose है कि Lovable को पूरे product का final vision, architecture, database structure और development roadmap पता रहे। Actual development हम phase-by-phase करेंगे।
MASTER PROMPT — AI SQL PRACTICE & INTERVIEW PLATFORM
Build a production-quality AI-powered SQL Practice, Learning and Interview Platform.

The product should be a professional SQL IDE + SQL learning platform + AI question generator + SQL interview simulator.

IMPORTANT:
Do NOT clone or scrape any existing SQL practice website or copyrighted content.
Use the general workflow and UX pattern of professional SQL IDE/practice platforms, but create original UI, original questions, original explanations and original application logic.

The platform must eventually support all 70 features defined in this specification.

Do NOT attempt to implement all 70 features in one step.

First establish the complete architecture, database model, reusable components, routing structure, security model and feature roadmap.

Development will happen incrementally in approximately 15–16 phases.
Each phase must build on the previous phase without breaking existing functionality.

==================================================
PRODUCT VISION
==================================================

The platform allows a user to:

1. Create or import a database/schema.
2. Upload a schema image and let AI extract tables, columns, keys and relationships.
3. Automatically create an executable practice database.
4. Import sample data.
5. View the schema using an ER diagram.
6. Browse tables and columns.
7. Write and execute SQL queries in a professional SQL editor.
8. Practice generated SQL questions.
9. Generate 10, 50, 100, 500 or more questions from the same database/schema.
10. Automatically validate the user's SQL result against the expected result.
11. Provide hints and explanations.
12. Track progress and weak areas.
13. Conduct timed SQL assessments and interviews.
14. Provide AI-powered SQL tutoring and adaptive practice.

The most important workflow is:

SCHEMA IMAGE
      ↓
AI/OCR EXTRACTION
      ↓
SCHEMA VALIDATION
      ↓
DATABASE CREATION
      ↓
DATA IMPORT
      ↓
ER DIAGRAM
      ↓
QUESTION GENERATION
      ↓
SQL PRACTICE
      ↓
QUERY EXECUTION
      ↓
RESULT COMPARISON
      ↓
CORRECT / INCORRECT
      ↓
AI EXPLANATION
      ↓
PROGRESS ANALYTICS

==================================================
CORE 70 FEATURES
==================================================

DATABASE & SCHEMA

1. Multiple Database Management
2. Create / Rename / Delete Database
3. Schema Image Upload
4. AI/OCR Schema Extraction
5. Automatic Table & Column Creation
6. Data Import from Image / CSV / Excel / JSON
7. Manual Schema Builder
8. Primary Key / Foreign Key / Constraints
9. Automatic Relationship Detection
10. ER Diagram / Schema Architecture Viewer

DATABASE EXPLORER

11. Database Explorer Sidebar
12. Expandable Tables & Columns
13. Table Data Viewer
14. Table Structure / Column Details
15. Schema Search
16. Schema Consistency / Validation Checker
17. Database Clone / Duplicate
18. Database Reset to Original State

SQL IDE

19. Professional SQL Editor
20. Syntax Highlighting
21. Line Numbers + Auto Indentation
22. SQL Formatter
23. SQL Autocomplete
24. Table / Column Suggestions
25. Multi-Tab Query Editor
26. SQL Query Execution / Run
27. SQL Error Highlighting & Explanation
28. Query History + Restore Previous Query

EXECUTION & VALIDATION

29. Secure SQL Sandbox
30. Database Engine Selection
31. Read-only / Controlled Query Permissions
32. Data Output Panel
33. Expected Output Panel
34. Automatic Result Comparison
35. Multiple Valid SQL Solution Support
36. Hidden Test Cases
37. Query Execution / Performance Analysis

AI QUESTION GENERATION

38. AI Question Generator
39. Generate 10 / 50 / 100 / 500+ Questions
40. Easy / Medium / Hard / Very Hard
41. Topic-wise Question Generation
42. Scenario / Business-based Questions
43. Duplicate Question Detection
44. Question Variations
45. Edge-case Question Generation
46. AI-generated Reference Solutions
47. Question Metadata

LEARNING & AI

48. Learning Mode
49. Progressive Hints
50. Solution / Explanation Mode
51. AI SQL Tutor
52. AI Query Explanation
53. AI SQL Error Explanation
54. Query Approach / Logic Explanation
55. Multiple Approach Explanation
56. SQL Concept Reference
57. Custom SQL Playground

INTERVIEW & ADAPTIVE LEARNING

58. SQL Interview Mode
59. AI SQL Interviewer / Follow-up Questions
60. Timed Challenge Mode
61. Full SQL Assessment
62. Adaptive Question Difficulty
63. Weak Topic Detection
64. Mistake Review / Retry Wrong Questions
65. Topic-wise & Difficulty-wise Practice

PRODUCTIVITY

66. Progress Dashboard & Analytics
67. Bookmarks + Personal Notes
68. Daily Goals / Streaks / Gamification
69. Import / Export
70. Multi-SQL Engine + SQL Dialect Awareness

==================================================
DATABASE ARCHITECTURE
==================================================

Design a scalable relational backend.

At minimum plan entities/tables for:

users
databases
schemas
tables
columns
relationships
constraints
indexes
table_data
questions
question_variants
question_topics
question_solutions
question_hints
question_test_cases
user_attempts
query_history
bookmarks
notes
progress
topic_progress
assessments
assessment_attempts
interview_sessions
ai_feedback
database_versions
imports
exports

Use proper foreign keys and indexes.

The architecture must support multiple independent databases per user.

Each practice database must be isolated from other practice databases.

==================================================
DATABASE ISOLATION
==================================================

A user's SQL execution must never affect another user's database.

Practice databases must be isolated.

Each database should support:

- schema
- tables
- columns
- relationships
- sample data
- generated questions
- question metadata
- database reset
- database cloning

Provide a version/snapshot mechanism so the original database can be restored.

==================================================
SCHEMA IMAGE PROCESSING
==================================================

Support:

- PNG
- JPG/JPEG
- screenshots
- multiple schema images

If a schema spans multiple images, allow multiple uploads and combine them.

AI should attempt to extract:

- table names
- column names
- data types
- primary keys
- foreign keys
- nullable fields
- relationships
- constraints where visible

Do NOT blindly trust OCR.

Show a review screen before creating the database.

Example:

Detected:

employees
employee_id INT PRIMARY KEY
department_id INT FOREIGN KEY

Allow the user to edit the detected schema.

Only after confirmation should the actual database be created.

==================================================
DATA IMPORT
==================================================

Support:

- CSV
- Excel
- JSON
- manually entered data
- image/table extraction where technically reliable

Validate:

- column count
- data types
- NULL values
- duplicate primary keys
- foreign-key consistency

Show errors before inserting invalid data.

==================================================
ER DIAGRAM
==================================================

Create a professional interactive ER diagram.

Show:

TABLE
COLUMN
TYPE
PRIMARY KEY
FOREIGN KEY
RELATIONSHIP

Allow:

- zoom
- pan
- fit to screen
- table selection
- relationship highlighting

==================================================
SQL EDITOR
==================================================

Create a professional SQL IDE.

Features:

- syntax highlighting
- line numbers
- auto indentation
- formatting
- autocomplete
- table suggestions
- column suggestions
- multiple tabs
- run query
- clear
- save query
- query history

The interface should have:

LEFT:
Database / schema explorer

CENTER:
SQL editor

BOTTOM:
Data Output + Expected Output

RIGHT:
Question / challenge panel

Also support a distraction-free editor mode.

==================================================
QUESTION UI
==================================================

Each question should contain:

Title
Context
Task
Difficulty
Topic
Required Output
Tables involved
Hints
Solution
Explanation

The user should be able to:

Run
Submit
Reset
Show Hint
View Solution
Next Question
Previous Question
Bookmark
Add Note

==================================================
QUESTION GENERATION
==================================================

The AI question generator must understand the database schema before creating questions.

It must generate questions using:

- actual tables
- actual columns
- actual relationships
- actual data
- SQL concepts
- business scenarios
- edge cases

Do not generate questions that reference nonexistent tables or columns.

Every generated question must be validated before becoming active.

For each generated question store:

question
difficulty
topic
tables
concepts
reference SQL
expected result
hints
explanation
test cases

==================================================
QUESTION QUALITY CONTROL
==================================================

Before publishing a generated question:

1. Validate referenced tables.
2. Validate referenced columns.
3. Execute reference SQL.
4. Confirm the query runs.
5. Generate expected result.
6. Check result is meaningful.
7. Check for duplicates.
8. Check difficulty.
9. Check question clarity.
10. Store only validated questions.

==================================================
ANSWER VALIDATION
==================================================

Do NOT compare only the user's SQL text against the reference SQL.

Multiple SQL queries can correctly solve the same problem.

Use:

USER SQL
↓
EXECUTION
↓
USER RESULT

REFERENCE SQL
↓
EXECUTION
↓
EXPECTED RESULT

Compare normalized result sets.

Handle:

- column order where appropriate
- row order where order is not required
- NULL values
- duplicate rows
- data types
- numeric precision

If ORDER BY is explicitly required, preserve ordering requirements.

==================================================
SECURITY
==================================================

Use isolated SQL execution.

Never expose production credentials to the client.

Use server-side execution.

Prevent:

- cross-user database access
- unauthorized database access
- dangerous system commands
- unrestricted resource consumption
- SQL injection into platform metadata
- credential exposure

Add query timeout and resource limits.

For assessment mode, allow hidden test cases.

==================================================
AI TUTOR
==================================================

The AI tutor should be able to explain:

- why the query works
- why it fails
- alternative approaches
- JOIN logic
- GROUP BY logic
- subqueries
- CTEs
- window functions
- NULL behavior
- performance considerations

Do not immediately reveal the answer when the user only asks for a hint.

Use progressive teaching.

==================================================
ADAPTIVE LEARNING
==================================================

Track:

- accuracy
- attempts
- solve time
- difficulty
- topic
- mistakes
- hints used
- questions skipped

Use this information to recommend future questions.

Example:

If the user performs poorly in Window Functions:

Recommend:

"Practice 20 Window Function questions."

==================================================
INTERVIEW MODE
==================================================

Provide:

- timer
- question progression
- difficulty progression
- no-hint option
- score
- accuracy
- time per question

AI interviewer should optionally ask follow-up questions such as:

"Can you solve this using a window function?"

"Why did you use LEFT JOIN?"

"What happens if department_id is NULL?"

==================================================
ANALYTICS
==================================================

Dashboard should show:

Total questions solved
Correct answers
Accuracy
Average solve time
Current streak
Topic performance
Difficulty performance
Weak areas
Strong areas
Recent activity

==================================================
GAMIFICATION
==================================================

Support:

XP
levels
streaks
badges
daily goals
weekly goals
milestones

Keep gamification optional and non-distracting.

==================================================
IMPORT / EXPORT
==================================================

Support export/import where practical for:

- questions
- databases
- schema
- query history
- progress data

Use JSON/CSV/Excel where appropriate.

==================================================
MULTI-ENGINE SUPPORT
==================================================

Design the architecture so SQL engines can be added later.

Potential engines:

MySQL
PostgreSQL
SQLite
SQL Server
Oracle

Do not hard-code the system to one engine.

Each engine should have dialect-aware:

- syntax
- functions
- LIMIT/TOP/FETCH behavior
- date functions
- string functions
- window functions

==================================================
UI DESIGN
==================================================

Create a professional dark-first SQL IDE interface.

Main layout:

TOP:
Logo
Database selector
Mode selector
User/profile

LEFT:
Database / Schema Explorer

CENTER:
SQL Editor

BOTTOM:
Data Output
Expected Output
Messages

RIGHT:
Question / Challenge Panel

Important:

The UI must be clean, responsive and professional.

Do not overcrowd the interface.

Desktop is the primary experience because SQL editing requires screen space.

Mobile should still provide a usable responsive experience.

==================================================
DEVELOPMENT RULE
==================================================

Do NOT build everything at once.

Create the project architecture first.

Use reusable components.

Use clean separation between:

UI
Database
SQL execution
Question engine
AI services
Validation
Authentication
Analytics

Every phase must preserve existing functionality.

Do not replace working features with mockups.

Do not create fake SQL execution.

Do not show fake expected results.

Where a backend feature is not yet implemented, clearly mark it as pending rather than pretending it works.

==================================================
DEVELOPMENT PHASES
==================================================

The project will be developed in approximately 15–16 phases.

Phase 1:
Application foundation + database management + schema model + basic layout.

Phase 2:
Manual schema builder + tables + columns + relationships.

Phase 3:
Database explorer + table viewer + ER diagram.

Phase 4:
Professional SQL editor + query tabs + formatting.

Phase 5:
Secure SQL execution sandbox + output panel.

Phase 6:
Question system + expected output + result comparison.

Phase 7:
Question generator + difficulty + topic engine.

Phase 8:
Schema image upload + AI/OCR extraction + schema review.

Phase 9:
Automatic database creation + data import + validation.

Phase 10:
AI tutor + hints + explanations + error analysis.

Phase 11:
Learning mode + progress tracking + bookmarks + notes.

Phase 12:
Adaptive learning + weak-topic detection + mistake review.

Phase 13:
Interview mode + timed challenges + assessment system.

Phase 14:
AI interviewer + follow-up questions + interview feedback.

Phase 15:
Analytics + gamification + import/export + advanced productivity features.

Phase 16:
Multi-engine support + performance optimization + security hardening + production readiness.

==================================================
IMPORTANT DEVELOPMENT BEHAVIOR
==================================================

At the beginning of every phase:

1. Inspect the existing implementation.
2. Do not break existing functionality.
3. Identify reusable components.
4. Implement only the requested phase.
5. Test the completed functionality.
6. Fix errors.
7. Confirm integration with previous phases.
8. Do not implement future features prematurely.

Maintain a clear feature checklist.

Mark features:

[ ] Planned
[~] In Progress
[✓] Completed
[!] Needs Review

The final product should eventually contain all 70 features listed above.

The architecture must be designed now so all future phases can be added without rebuilding the entire application.
🗺️ 15–16 Phase Development Plan
हम इसे roughly इस क्रम में बनाएँगे:
Phase
Main Development
01
Foundation + Database architecture + Main UI
02
Schema Builder + Tables + Columns + Relationships
03
Database Explorer + Data Viewer + ER Diagram
04
Professional SQL Editor
05
SQL Execution Sandbox + Output
06
Questions + Expected Output + Answer Matching
07
AI Question Generator
08
Schema Photo → AI Extr