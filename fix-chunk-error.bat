@echo off
echo ========================================
echo Fixing Chunk Load Error
echo ========================================
echo.

echo Step 1: Stopping any running dev servers...
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak >nul

echo Step 2: Clearing .next build directory...
if exist .next (
    rmdir /s /q .next
    echo .next directory removed
) else (
    echo .next directory not found (already clean)
)

echo Step 3: Clearing node_modules/.cache...
if exist node_modules\.cache (
    rmdir /s /q node_modules\.cache
    echo node_modules\.cache removed
) else (
    echo node_modules\.cache not found
)

echo.
echo ========================================
echo Cache cleared successfully!
echo ========================================
echo.
echo Now run: npm run dev
echo.
echo If the error persists:
echo 1. Close all browser tabs for localhost:3000
echo 2. Clear your browser cache (Ctrl+Shift+Delete)
echo 3. Try opening in an incognito window
echo.
pause
