@echo off
echo ========================================
echo   Deploying Render Deployment Fix
echo ========================================
echo.

echo [1/3] Adding changes...
git add .

echo [2/3] Committing...
git commit -m "Fix: Add dynamic rendering to Stripe routes for Render deployment"

echo [3/3] Pushing to GitHub...
git push origin main

echo.
echo ========================================
echo   ✅ Changes pushed successfully!
echo ========================================
echo.
echo Render will automatically redeploy.
echo Check your Render dashboard for build progress.
echo.
echo Don't forget to add environment variables:
echo - DATABASE_URL
echo - NEXTAUTH_SECRET
echo - NEXTAUTH_URL
echo - STRIPE_SECRET_KEY
echo - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
echo - STRIPE_WEBHOOK_SECRET
echo - NEXT_PUBLIC_APP_URL
echo.
pause
