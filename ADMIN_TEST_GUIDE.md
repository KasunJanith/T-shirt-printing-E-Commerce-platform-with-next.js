# Admin Features - Quick Test Guide

## 🚀 Quick Start

### Step 1: Create Admin User
```bash
node create-admin.js
```
Follow the prompts to create your admin account.

### Step 2: Start the Development Server
```bash
npm run dev
```

### Step 3: Test Admin Login
1. Go to `http://localhost:3000/login`
2. Login with your admin credentials
3. You should be **automatically redirected** to `/admin/dashboard` ✅

---

## ✅ Testing Checklist

### 1. Login & Redirect Test
- [ ] Admin login redirects to `/admin/dashboard` (not homepage)
- [ ] Regular user login redirects to `/dashboard`
- [ ] Already logged-in admin visiting `/login` redirects to admin dashboard

### 2. Text Visibility Test
Visit each page and verify all text is clearly readable:
- [ ] `/admin/dashboard` - All headings, descriptions, and stats visible
- [ ] `/admin/products` - Table headers, product names, prices visible
- [ ] `/admin/users` - Table headers, user names, emails visible

### 3. Product Management Test
Go to `/admin/products`:
- [ ] Products list displays correctly with images
- [ ] Search bar filters products
- [ ] "Add New Product" button is visible and clickable
- [ ] Edit button navigates to edit page
- [ ] Delete button shows confirmation dialog
- [ ] Delete button removes product from list
- [ ] Empty state shows when no products found

### 4. User Management Test
Go to `/admin/users`:
- [ ] Users list displays with names and emails
- [ ] Search bar filters users
- [ ] Role badges show (Shield icon for ADMIN)
- [ ] "Change Role" button toggles USER ↔ ADMIN
- [ ] "Delete User" button shows confirmation
- [ ] Cannot delete or modify your own account (security check)
- [ ] User count matches actual number of users

### 5. Dashboard Navigation Test
From `/admin/dashboard`:
- [ ] "Manage Products" button navigates to products page
- [ ] "Manage Users" button navigates to users page
- [ ] "Add New Product" button navigates to new product form
- [ ] Statistics cards display (even if showing 0)
- [ ] All text has good contrast and is readable

---

## 🎯 Expected Behavior

### Admin Login Flow
```
User logs in with admin credentials
    ↓
System checks role === 'ADMIN'
    ↓
Redirect to /admin/dashboard (NOT /dashboard)
```

### User Management Security
```
Admin tries to delete own account
    ↓
System checks: session.user.email === target.email
    ↓
Show error: "Cannot modify your own account"
    ↓
Action blocked ✅
```

### Product Management Flow
```
Admin views products list
    ↓
Clicks "Delete" on a product
    ↓
Confirmation dialog appears
    ↓
Confirms deletion
    ↓
API call to DELETE /api/products/[id]
    ↓
Product removed from list
    ↓
Success message shown
```

---

## 🐛 Common Issues & Solutions

### Issue: Not redirecting to admin dashboard after login
**Solution**: Clear browser cache and cookies, then try again. Check that your user has `role: 'ADMIN'` in database.

### Issue: Text is hard to read
**Solution**: This should be fixed now. If still having issues, check your browser's zoom level and color settings.

### Issue: "Unauthorized" when accessing admin pages
**Solution**: Make sure you're logged in as an admin user. Check your session by visiting `/api/auth/session`.

### Issue: Cannot see users in User Management
**Solution**: Make sure you have users in your database. Create at least one additional user via `/register` page.

### Issue: Product images not loading
**Solution**: Ensure product images exist in `public/images/products/` or update image URLs in database.

---

## 📊 Test Data

### Create Test Users
1. Register 2-3 regular users via `/register`
2. Create 1 admin user via `node create-admin.js`
3. Go to `/admin/users` to see all users

### Create Test Products
Visit `/admin/products/new` to add:
- At least 3 test products
- Include images and prices
- Set some as "In Stock", others as "Out of Stock"

---

## 🔍 Visual Verification

### Text Colors Should Be:
- **Headings**: Dark gray/black (`text-gray-900`)
- **Body Text**: Medium gray (`text-gray-700`)
- **Table Headers**: Medium gray (`text-gray-700`)
- **Links/Buttons**: Blue or styled with proper contrast

### UI Elements Should Have:
- ✅ Clear borders on cards
- ✅ Hover effects on buttons
- ✅ Loading spinners when fetching data
- ✅ Empty states with icons and messages
- ✅ Confirmation dialogs for destructive actions

---

## 🎉 Success Indicators

You'll know everything is working when:

1. ✅ Admin login takes you to **admin dashboard** (not homepage)
2. ✅ All text on all admin pages is **clearly visible**
3. ✅ You can **search, edit, and delete** products
4. ✅ You can **manage user roles** and **delete users**
5. ✅ You **cannot delete yourself** as admin
6. ✅ Navigation between admin pages works smoothly
7. ✅ No console errors in browser DevTools

---

## 📱 Browser DevTools Tips

### Check Session Data
Open Console and run:
```javascript
fetch('/api/auth/session').then(r => r.json()).then(console.log)
```

### Check for Errors
Open Console (F12) and look for:
- ❌ Red errors (should be none)
- ⚠️ Yellow warnings (acceptable)
- 🔵 Network requests (200 status = good)

### Check Network Requests
Go to Network tab and verify:
- `/api/users` returns 200 and user list
- `/api/products` returns 200 and product list
- DELETE/PATCH requests complete successfully

---

## 🆘 Need Help?

If something isn't working:

1. **Check console for errors** (F12 → Console)
2. **Verify your admin status** (visit `/api/auth/session`)
3. **Clear browser cache** (Ctrl + Shift + Delete)
4. **Restart dev server** (Ctrl + C, then `npm run dev`)
5. **Check database** (ensure tables have data)

---

**Happy Testing!** 🚀

All admin features should now work perfectly. Enjoy your fully functional admin system!
