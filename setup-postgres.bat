@echo off
echo ================================================
echo PostgreSQL Database Setup for Shirt Canary
echo ================================================
echo.
echo This script will:
echo 1. Connect to PostgreSQL
echo 2. Create the shirt_canary database
echo 3. Set up necessary permissions
echo.
echo You will be prompted for the PostgreSQL password
echo.
pause

echo.
echo Attempting to create database...
"C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -c "DROP DATABASE IF EXISTS shirt_canary;"
"C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -c "CREATE DATABASE shirt_canary;"

echo.
echo ================================================
echo Setup complete!
echo ================================================
echo.
echo Your DATABASE_URL should be:
echo postgresql://postgres:YOUR_PASSWORD@localhost:5432/shirt_canary?schema=public
echo.
echo Make sure to update .env and .env.local with your actual password
echo.
pause
