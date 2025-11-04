# PostgreSQL Password Reset Guide for Windows

## Quick Steps to Reset PostgreSQL Password

### Step 1: Find PostgreSQL Data Directory
Open Command Prompt as **Administrator** and run:
```cmd
sc qc postgresql-x64-18
```
Look for "BINARY_PATH_NAME" - the data directory is usually near the executable path.

Common locations:
- C:\Program Files\PostgreSQL\18\data\
- C:\Program Files\PostgreSQL\17\data\
- C:\Program Files\PostgreSQL\16\data\

### Step 2: Edit pg_hba.conf
1. Navigate to the PostgreSQL data directory
2. Find the file `pg_hba.conf`
3. Open it with Notepad as Administrator
4. Find the line that looks like:
   ```
   host    all             all             127.0.0.1/32            scram-sha-256
   ```
5. Change `scram-sha-256` (or `md5`) to `trust`:
   ```
   host    all             all             127.0.0.1/32            trust
   ```
6. Save the file

### Step 3: Restart PostgreSQL Service
Open Command Prompt as **Administrator**:
```cmd
net stop postgresql-x64-18
net start postgresql-x64-18
```

### Step 4: Connect and Reset Password
```cmd
psql -U postgres
```

Once connected, run:
```sql
ALTER USER postgres WITH PASSWORD 'postgres';
\q
```

### Step 5: Restore Security
1. Open `pg_hba.conf` again
2. Change `trust` back to `scram-sha-256`:
   ```
   host    all             all             127.0.0.1/32            scram-sha-256
   ```
3. Save the file
4. Restart PostgreSQL:
   ```cmd
   net stop postgresql-x64-18
   net start postgresql-x64-18
   ```

### Step 6: Create Database
```cmd
set PGPASSWORD=postgres
psql -U postgres -c "CREATE DATABASE shirt_canary;"
```

### Step 7: Update Your Environment Files
Make sure your `.env` and `.env.local` files have:
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/shirt_canary?schema=public"
```

### Step 8: Run Prisma Commands
```cmd
npx prisma generate
npx prisma db push
```

## Alternative: Use Default Password
If you just installed PostgreSQL, try these common default passwords:
- postgres
- admin
- root
- password
- (empty password)
- The password you set during installation
