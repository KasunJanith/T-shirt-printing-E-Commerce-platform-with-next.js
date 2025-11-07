@echo off
echo ================================
echo Clear Browser Sessions
echo ================================
echo.
echo This script will help you clear sessions for testing.
echo.
echo OPTION 1: Clear Browser Cookies (Recommended)
echo --------------------------------------------
echo 1. Open your browser (Chrome/Edge/Firefox)
echo 2. Press Ctrl+Shift+Delete
echo 3. Select "Cookies and other site data"
echo 4. Select "All time"
echo 5. Click "Clear data"
echo.
echo OPTION 2: Use Incognito/Private Mode
echo --------------------------------------------
echo - Chrome: Ctrl+Shift+N
echo - Edge: Ctrl+Shift+N
echo - Firefox: Ctrl+Shift+P
echo.
echo OPTION 3: Clear Next.js Cache
echo --------------------------------------------
echo Running cleanup...
echo.

cd /d "%~dp0"

if exist ".next" (
    echo Deleting .next folder...
    rmdir /s /q .next
    echo ✓ .next folder deleted
) else (
    echo ✓ .next folder doesn't exist
)

if exist "node_modules\.cache" (
    echo Deleting node_modules cache...
    rmdir /s /q node_modules\.cache
    echo ✓ Cache deleted
) else (
    echo ✓ Cache doesn't exist
)

echo.
echo ================================
echo Cleanup Complete!
echo ================================
echo.
echo Now restart your dev server:
echo   npm run dev
echo.
echo Then clear your browser cookies and test login again.
echo Session will now expire after 24 hours.
echo.
pause
