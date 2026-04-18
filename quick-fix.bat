@echo off
echo Fixing contact page error...
echo.
taskkill /F /IM node.exe 2>nul >nul
if exist .next rmdir /s /q .next
echo Cache cleared! Starting server...
npm run dev
