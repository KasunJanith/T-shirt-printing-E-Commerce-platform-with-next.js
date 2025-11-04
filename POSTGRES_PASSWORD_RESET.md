# PostgreSQL Password Solutions for Shirt Canary

## Problem
Cannot connect to PostgreSQL - password authentication failed.

## Solution Options

### Option 1: Find Your PostgreSQL Password

Your PostgreSQL password was set during installation. Check:
1. Any password manager you used during installation
2. Installation notes or documentation
3. The installer may have saved it to a file

### Option 2: Reset PostgreSQL Password (Recommended)

Follow these steps to reset your PostgreSQL password:

#### Step 1: Edit pg_hba.conf
1. Navigate to: `C:\Program Files\PostgreSQL\18\data\`
2. Find the file: `pg_hba.conf`
3. Make a backup copy of this file
4. Open it with Notepad (Run as Administrator)
5. Find lines that look like this:
   ```
   # IPv4 local connections:
   host    all             all             127.0.0.1/32            scram-sha-256
   # IPv6 local connections:
   host    all             all             ::1/128                 scram-sha-256
   ```
6. Change `scram-sha-256` to `trust` on those lines:
   ```
   host    all             all             127.0.0.1/32            trust
   host    all             all             ::1/128                 trust
   ```
7. Save the file

#### Step 2: Restart PostgreSQL Service
1. Open Command Prompt as Administrator
2. Run:
   ```cmd
   net stop postgresql-x64-18
   net start postgresql-x64-18
   ```

#### Step 3: Reset the Password
1. Open Command Prompt
2. Run:
   ```cmd
   "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres
   ```
3. You should now be logged in without a password
4. Run this SQL command (replace `123456` with your desired password):
   ```sql
   ALTER USER postgres WITH PASSWORD '123456';
   ```
5. Type `\q` and press Enter to exit

#### Step 4: Restore Security
1. Go back to `C:\Program Files\PostgreSQL\18\data\pg_hba.conf`
2. Change `trust` back to `scram-sha-256`
3. Save the file
4. Restart PostgreSQL service again:
   ```cmd
   net stop postgresql-x64-18
   net start postgresql-x64-18
   ```

#### Step 5: Create the Database
1. Open Command Prompt
2. Run:
   ```cmd
   set PGPASSWORD=123456
   "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -c "CREATE DATABASE shirt_canary;"
   ```

#### Step 6: Update Your Project
1. Update `.env` file with:
   ```
   DATABASE_URL="postgresql://postgres:123456@localhost:5432/shirt_canary?schema=public"
   ```
2. Update `.env.local` file with the same connection string
3. Run:
   ```cmd
   npx prisma generate
   npx prisma db push
   ```

### Option 3: Use pgAdmin (If Installed)

1. Open pgAdmin 4
2. If it asks for a master password, use that to log in
3. Right-click on "PostgreSQL 18" server
4. Select "Properties" > "Connection"
5. The password might be saved there
6. Or use pgAdmin to create a new user with known credentials

## After Password is Set

Once you have the correct password:

1. Update `.env`:
   ```
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/shirt_canary?schema=public"
   ```

2. Update `.env.local` with the same string

3. Run these commands:
   ```cmd
   npx prisma generate
   npx prisma db push
   npm run dev
   ```

## Troubleshooting

If you still have issues:
- Make sure PostgreSQL service is running
- Check Windows Firewall isn't blocking port 5432
- Try connecting with 127.0.0.1 instead of localhost
- Check PostgreSQL logs at: `C:\Program Files\PostgreSQL\18\data\log\`
