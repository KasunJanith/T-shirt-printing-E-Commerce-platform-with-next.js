@echo off
echo ========================================
echo T-SHIRT E-COMMERCE PLATFORM - STARTUP
echo ========================================
echo.

echo [1/5] Checking environment variables...
node check-env.js
if %errorlevel% neq 0 (
    echo ERROR: Environment variables not configured properly!
    echo Please check your .env file.
    pause
    exit /b 1
)
echo ✓ Environment variables OK
echo.

echo [2/5] Running Prisma migration...
call npx prisma migrate dev --name add_cart_models
if %errorlevel% neq 0 (
    echo WARNING: Migration may have already been applied
)
echo.

echo [3/5] Generating Prisma Client...
call npx prisma generate
if %errorlevel% neq 0 (
    echo ERROR: Failed to generate Prisma Client
    pause
    exit /b 1
)
echo ✓ Prisma Client generated
echo.

echo [4/5] Installing dependencies (if needed)...
if not exist "node_modules\" (
    echo Installing dependencies...
    call npm install
) else (
    echo ✓ Dependencies already installed
)
echo.

echo [5/5] Starting development server...
echo.
echo ========================================
echo APPLICATION STARTING
echo ========================================
echo.
echo Open your browser at: http://localhost:3000
echo.
echo FEATURES AVAILABLE:
echo  ✓ Light/Dark Theme Toggle
echo  ✓ Role-Based Navigation
echo  ✓ Auth-Protected Cart
echo  ✓ Session Persistence
echo  ✓ Admin/Customer Separation
echo.
echo Press Ctrl+C to stop the server
echo.
call npm run dev
