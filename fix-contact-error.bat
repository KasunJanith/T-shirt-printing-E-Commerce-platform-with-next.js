@echo off
echo ========================================
echo    Fixing Contact Page Runtime Error
echo ========================================
echo.

echo [1/4] Stopping any running processes...
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak >nul

echo [2/4] Cleaning build cache...
if exist .next (
    rmdir /s /q .next
    echo     - Deleted .next folder
) else (
    echo     - .next folder not found
)

echo [3/4] Cleaning node modules cache (optional)...
if exist node_modules\.cache (
    rmdir /s /q node_modules\.cache
    echo     - Deleted node_modules\.cache
)

echo [4/4] Starting fresh development server...
echo.
echo Starting server on http://localhost:3000
echo Press Ctrl+C to stop the server
echo.
npm run dev
