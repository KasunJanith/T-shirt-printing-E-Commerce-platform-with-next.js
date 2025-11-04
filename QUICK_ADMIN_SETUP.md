# 🚀 Quick Start - Admin Access

**Want to access the admin dashboard? Follow these simple steps:**

---

## Step 1: Create Admin User (1 minute)

Run this command in your terminal:

```cmd
node create-admin.js
```

**Expected output:**
```
✅ Admin user created successfully!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                 ADMIN CREDENTIALS                 
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 Email:    admin@shirtcanary.com
🔒 Password: Admin123!
👤 Name:     Admin User
🔑 Role:     ADMIN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Step 2: Start Development Server

```cmd
npm run dev
```

Wait for: `✓ Ready on http://localhost:3000`

---

## Step 3: Login as Admin

1. Open browser: `http://localhost:3000/login`
2. Enter credentials:
   - **Email**: `admin@shirtcanary.com`
   - **Password**: `Admin123!`
3. Click **"Sign In"**

---

## Step 4: Access Admin Dashboard

Navigate to: `http://localhost:3000/admin/dashboard`

**You should see:**
- 💰 Total Revenue
- 📦 Total Orders
- 📦 Products
- 👥 Customers

---

## 🎉 Done!

You now have full admin access to:

- **Admin Dashboard**: `/admin/dashboard`
- **Product Management**: `/admin/products`
- **Add/Edit/Delete Products**
- **View All Orders**
- **Manage Customers**

---

## ⚠️ Troubleshooting

### Problem: "User already exists"
**Solution**: The script will update the existing user to admin role automatically.

### Problem: "Cannot connect to database"
**Solution**: 
1. Check if database is running
2. Verify DATABASE_URL in `.env` file
3. Run: `npx prisma generate`

### Problem: "Invalid credentials"
**Solution**: 
- Use email: `admin@shirtcanary.com`
- Use password: `Admin123!`
- Check for typos (case-sensitive!)

---

## 📚 More Help?

See **ADMIN_ACCESS_GUIDE.md** for:
- Detailed setup instructions
- Alternative methods
- Security best practices
- Feature documentation
- Troubleshooting guide

---

**That's it! Enjoy your admin powers! 🎊**
