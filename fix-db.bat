@echo off
echo.
echo ========================================
echo   Fixing Database Schema
echo ========================================
echo.

echo Pushing schema to database...
npx prisma db push --accept-data-loss

echo.
echo Generating Prisma Client...
npx prisma generate

echo.
echo ========================================
echo   Database Fixed!
echo ========================================
echo.
echo You can now open Prisma Studio with:
echo npx prisma studio
echo.
pause
