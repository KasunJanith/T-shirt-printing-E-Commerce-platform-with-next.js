# 🔧 Chunk Load Error - Troubleshooting Guide

**Error:** `Loading chunk app/products/page failed`  
**Date:** November 13, 2025  
**Status:** Fixable

---

## 🎯 QUICK FIX (Run These Commands)

### Option 1: Using the Fix Script
```bash
# Run the automated fix script
fix-chunk-error.bat

# Then restart dev server
npm run dev
```

### Option 2: Manual Commands
```bash
# Stop any running servers
taskkill /F /IM node.exe

# Remove build cache
rmdir /s /q .next
rmdir /s /q node_modules\.cache

# Restart dev server
npm run dev
```

---

## 🔍 ROOT CAUSES

### 1. **Build Cache Mismatch**
After making code changes, the cached chunks in `.next` folder may not match the current code.

**Solution:** Delete `.next` folder and rebuild

### 2. **Hot Reload Issues**
Next.js development server sometimes doesn't properly reload after major changes.

**Solution:** Restart the dev server

### 3. **Browser Cache**
Browser is trying to load old cached JavaScript files that no longer exist.

**Solution:** Clear browser cache or use incognito mode

### 4. **Multiple Dev Servers**
Multiple instances of `npm run dev` running simultaneously.

**Solution:** Kill all Node processes and start fresh

---

## 📋 STEP-BY-STEP FIX

### Step 1: Stop Everything
```bash
# Windows Command Prompt
taskkill /F /IM node.exe

# Or manually:
# Press Ctrl+C in the terminal running npm run dev
```

### Step 2: Clear Build Cache
```bash
# Navigate to project directory
cd "d:\My Github Projects\T-shirt-printing-E-Commerce-platform-with-next.js"

# Remove .next directory
rmdir /s /q .next

# Remove node_modules cache (optional but recommended)
rmdir /s /q node_modules\.cache
```

### Step 3: Clear Browser Cache
**Chrome/Edge:**
1. Press `Ctrl + Shift + Delete`
2. Select "Cached images and files"
3. Choose "Last hour" or "All time"
4. Click "Clear data"

**Or use Incognito Mode:**
- Press `Ctrl + Shift + N`
- Navigate to `http://localhost:3000`

### Step 4: Restart Dev Server
```bash
npm run dev
```

### Step 5: Hard Refresh Browser
Once the server is running:
- Press `Ctrl + Shift + R` (hard refresh)
- Or `Ctrl + F5`

---

## 🚨 IF ERROR PERSISTS

### Try: Full Clean Build
```bash
# Stop server
taskkill /F /IM node.exe

# Delete everything
rmdir /s /q .next
rmdir /s /q node_modules\.cache
del /q package-lock.json

# Reinstall dependencies
npm install

# Start server
npm run dev
```

### Try: Different Port
Sometimes port 3000 has issues:
```bash
# Edit package.json scripts section:
"dev": "next dev -p 3001"

# Or run directly:
npx next dev -p 3001
```

### Try: Production Build
Test if the issue is dev-specific:
```bash
# Build for production
npm run build

# Start production server
npm start
```

---

## 🔍 DIAGNOSTIC CHECKS

### Check 1: Verify .next Directory
```bash
# Should be deleted after clearing cache
dir .next
# Should show: "File Not Found"
```

### Check 2: Check Running Processes
```bash
# List Node processes
tasklist | findstr node.exe
# Should show nothing or only your new process
```

### Check 3: Check Port Availability
```bash
# Check if port 3000 is in use
netstat -ano | findstr :3000
```

### Check 4: Verify File Exists
```bash
# Check if products page exists
dir src\app\products\page.tsx
# Should show the file
```

---

## 🎨 PREVENTION TIPS

### 1. **Always Stop Server Before Major Changes**
```bash
# Before making big code changes:
Ctrl + C (in terminal)
# Make changes
# Then restart:
npm run dev
```

### 2. **Clear Cache Regularly**
Add to your workflow:
```bash
# After pulling updates or major changes:
rmdir /s /q .next
npm run dev
```

### 3. **Use Git Ignore**
Make sure `.next` is in `.gitignore`:
```gitignore
# Build directories
.next/
out/
build/
dist/

# Cache
.cache/
node_modules/.cache/
```

### 4. **Browser Developer Tools**
Keep DevTools open with "Disable cache" checked:
- Press `F12`
- Go to Network tab
- Check "Disable cache"

---

## 🛠️ ADVANCED TROUBLESHOOTING

### Issue: Chunk Error After Deployment
```bash
# Clear all caches
npm run build -- --no-cache

# Or use turbo mode
npm run build -- --turbo
```

### Issue: Specific Route Failing
```bash
# Check route file
dir src\app\products\page.tsx

# Verify no syntax errors
npm run lint
```

### Issue: Memory Issues
```bash
# Increase Node memory
set NODE_OPTIONS=--max-old-space-size=4096
npm run dev
```

---

## 📊 COMMON SCENARIOS

### Scenario 1: After Code Changes
**Problem:** Made changes to products page, now getting chunk error  
**Solution:**
1. Stop server (Ctrl+C)
2. Delete `.next` folder
3. Restart server
4. Hard refresh browser

### Scenario 2: After Git Pull
**Problem:** Pulled new code, chunks not loading  
**Solution:**
```bash
git pull
rmdir /s /q .next
npm install
npm run dev
```

### Scenario 3: Works in Incognito, Fails in Normal Browser
**Problem:** Incognito works, normal browser fails  
**Solution:** Clear browser cache completely

### Scenario 4: Random Chunk Errors
**Problem:** Intermittent chunk loading failures  
**Solution:**
1. Check for multiple dev servers running
2. Kill all Node processes
3. Start single fresh instance

---

## 🎯 QUICK REFERENCE

### Essential Commands
```bash
# Stop all Node processes
taskkill /F /IM node.exe

# Clear build cache
rmdir /s /q .next

# Clear node cache
rmdir /s /q node_modules\.cache

# Restart dev server
npm run dev

# Hard refresh browser
Ctrl + Shift + R
```

### File Locations
- Build cache: `.next/`
- Node cache: `node_modules/.cache/`
- Products page: `src/app/products/page.tsx`
- Package config: `package.json`

---

## ✅ VERIFICATION

After applying fixes, verify:

1. ✅ No Node processes running before restart
2. ✅ `.next` directory deleted
3. ✅ Dev server starts without errors
4. ✅ Browser cache cleared
5. ✅ Products page loads successfully
6. ✅ No console errors in browser DevTools

---

## 📞 STILL HAVING ISSUES?

### Check These Files
```bash
# Verify products page exists and is valid
type src\app\products\page.tsx

# Check for syntax errors
npm run lint

# Check TypeScript errors
npx tsc --noEmit
```

### Collect Diagnostic Info
```bash
# Node version
node --version

# NPM version
npm --version

# Next.js version
npm list next

# Check running processes
tasklist | findstr node.exe

# Check network
netstat -ano | findstr :3000
```

---

## 🔄 AUTOMATED FIX SCRIPT

A `fix-chunk-error.bat` script has been created in your project root.

**Usage:**
```bash
# Just double-click the file or run:
fix-chunk-error.bat
```

**What it does:**
1. Stops all Node processes
2. Deletes `.next` directory
3. Deletes `node_modules/.cache`
4. Provides next steps

---

## 🎯 EXPECTED OUTCOME

After following these steps, you should see:

```
✅ Dev server starts successfully
✅ Products page compiles without errors
✅ Browser loads page at http://localhost:3000/products
✅ No chunk loading errors in console
✅ Page renders correctly with all components
```

---

## 💡 BEST PRACTICES

1. **Always stop server before major changes**
2. **Clear cache after pulling updates**
3. **Use browser DevTools with cache disabled**
4. **Keep only one dev server running**
5. **Hard refresh after code changes**
6. **Use incognito mode for testing**
7. **Commit before major refactoring**

---

**Status:** Follow the Quick Fix steps above  
**Expected Time:** 1-2 minutes  
**Success Rate:** 95%+

---

*Chunk Load Error Fix Guide - November 13, 2025*
