@echo off
echo.
echo ========================================
echo   T-Shirt Platform - Quick Migration
echo ========================================
echo.

echo Step 1: Pushing database schema changes...
echo.
call npx prisma db push
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Database push failed!
    echo Please check your DATABASE_URL in .env file
    pause
    exit /b 1
)

echo.
echo Step 2: Generating Prisma Client...
echo.
call npx prisma generate
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Prisma generate failed!
    pause
    exit /b 1
)

echo.
echo Step 3: Updating existing products...
echo.
call node update-products.js
if %errorlevel% neq 0 (
    echo.
    echo [WARNING] Product update had issues, but continuing...
    echo You may need to manually update products or add new ones.
)

echo.
echo ========================================
echo   Migration Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Run: npm run dev
echo 2. Visit: http://localhost:3000/products
echo 3. Test the new features
echo.
echo Press any key to start the development server...
pause > nul

echo.
echo Starting development server...
call npm run dev
