@echo off
echo ============================================
echo PostgreSQL Password Reset Script
echo ============================================
echo.
echo This script will help you reset your PostgreSQL password.
echo.
echo Please follow these steps:
echo.
echo 1. Find your PostgreSQL installation directory (usually in C:\Program Files\PostgreSQL\)
echo 2. Locate the pg_hba.conf file in the data directory
echo 3. Edit pg_hba.conf and temporarily change "md5" or "scram-sha-256" to "trust" for local connections
echo 4. Restart the PostgreSQL service
echo 5. Connect without a password and reset it
echo.
echo Current PostgreSQL service status:
sc query postgresql-x64-18
echo.
echo To restart PostgreSQL service, run as Administrator:
echo   net stop postgresql-x64-18
echo   net start postgresql-x64-18
echo.
echo To connect to PostgreSQL without password (after setting to trust):
echo   psql -U postgres
echo.
echo Once connected, reset the password with:
echo   ALTER USER postgres WITH PASSWORD 'postgres';
echo.
echo Don't forget to change pg_hba.conf back to "md5" or "scram-sha-256" after!
echo.
pause
