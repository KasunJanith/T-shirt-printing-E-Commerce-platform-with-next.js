# Admin Dashboard Access Guide

**Date**: November 2, 2025  
**Platform**: Shirt Canary E-Commerce  

---

## 🔐 How to Access the Admin Dashboard

### Method 1: Create an Admin User via Database

Since there's no admin registration UI, you need to create an admin user directly in the database.

#### Step 1: Start Your Development Server
```cmd
npm run dev
```

#### Step 2: Access Prisma Studio
Open a new terminal and run:
```cmd
npx prisma studio
```

This will open Prisma Studio in your browser at `http://localhost:5555`

#### Step 3: Create an Admin User

1. **In Prisma Studio**, click on the `User` model
2. Click **"Add record"**
3. Fill in the following fields:
   - **id**: (auto-generated, leave as is)
   - **email**: `admin@shirtcanary.com` (or your preferred email)
   - **name**: `Admin User`
   - **password**: You need a hashed password. Use this tool to generate one:

**Option A: Generate Password Hash via Node.js**

Create a file `generate-admin.js` in your project root:
```javascript
const bcrypt = require('bcryptjs');

async function generateAdminPassword() {
  const password = 'Admin123!'; // Change this to your desired password
  const hashedPassword = await bcrypt.hash(password, 12);
  console.log('Password:', password);
  console.log('Hashed Password:', hashedPassword);
  console.log('\nCopy the hashed password and paste it in Prisma Studio');
}

generateAdminPassword();
```

Run it:
```cmd
node generate-admin.js
```

**Option B: Use an Online Bcrypt Tool**
- Go to: https://bcrypt-generator.com/
- Enter your desired password (e.g., `Admin123!`)
- Set rounds to 12
- Copy the generated hash

4. **Continue in Prisma Studio**:
   - **password**: Paste the bcrypt hash
   - **role**: Select `ADMIN` from dropdown
   - **emailVerified**: (optional, can leave null)
   - **image**: (optional, can leave null)

5. Click **"Save 1 change"**

#### Step 4: Login as Admin

1. Go to: `http://localhost:3000/login`
2. Enter your admin credentials:
   - Email: `admin@shirtcanary.com`
   - Password: `Admin123!` (or whatever you used)
3. Click **"Sign In"**

#### Step 5: Access Admin Dashboard

Once logged in, you can access the admin dashboard at:
- **URL**: `http://localhost:3000/admin/dashboard`

---

## 📋 Method 2: Modify an Existing User

If you already have a user account:

### Step 1: Open Prisma Studio
```cmd
npx prisma studio
```

### Step 2: Update User Role
1. Click on the `User` model
2. Find your user account
3. Click on the row to edit
4. Change **role** from `USER` to `ADMIN`
5. Click **"Save 1 change"**

### Step 3: Re-login
1. Logout from your current session
2. Login again with your credentials
3. Your account now has admin privileges

---

## 🚀 Method 3: Create Admin User via API (Recommended)

Create a one-time script to add an admin user:

### Create `create-admin.js` in project root:
```javascript
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'admin@shirtcanary.com' }
    });

    if (existingAdmin) {
      console.log('❌ Admin user already exists!');
      console.log('Email:', existingAdmin.email);
      console.log('Role:', existingAdmin.role);
      
      if (existingAdmin.role !== 'ADMIN') {
        // Update to admin role
        await prisma.user.update({
          where: { email: 'admin@shirtcanary.com' },
          data: { role: 'ADMIN' }
        });
        console.log('✅ User updated to ADMIN role!');
      }
      return;
    }

    // Create new admin user
    const hashedPassword = await bcrypt.hash('Admin123!', 12);
    
    const admin = await prisma.user.create({
      data: {
        email: 'admin@shirtcanary.com',
        name: 'Admin User',
        password: hashedPassword,
        role: 'ADMIN'
      }
    });

    console.log('✅ Admin user created successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 Email:', admin.email);
    console.log('🔒 Password: Admin123!');
    console.log('👤 Role:', admin.role);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n🌐 Login at: http://localhost:3000/login');
    console.log('🔐 Admin Dashboard: http://localhost:3000/admin/dashboard');
    
  } catch (error) {
    console.error('❌ Error creating admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
```

### Run the script:
```cmd
node create-admin.js
```

### Expected Output:
```
✅ Admin user created successfully!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 Email: admin@shirtcanary.com
🔒 Password: Admin123!
👤 Role: ADMIN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🌐 Login at: http://localhost:3000/login
🔐 Admin Dashboard: http://localhost:3000/admin/dashboard
```

---

## 🎯 Admin Dashboard Features

Once logged in as admin, you have access to:

### 1. Admin Dashboard (`/admin/dashboard`)
- **Total Revenue** - Sum of all orders
- **Total Orders** - Count of all orders
- **Total Products** - Count of products in catalog
- **Total Customers** - Count of registered users
- **Recent Orders** - Latest orders with details

### 2. Product Management (`/admin/products`)
- **View all products** - Complete product list with images
- **Add new products** - Create new products
- **Edit products** - Update product details
- **Delete products** - Remove products from catalog
- **Product details**:
  - Name, description, price
  - Categories (men, women, kids)
  - Stock quantity
  - Images

---

## 🔒 Admin Protection

### Route Protection
Admin routes are protected by middleware:

**File**: `src/app/(admin)/layout.tsx`
- Checks if user is authenticated
- Verifies user has `ADMIN` role
- Redirects non-admin users to login

### Access Control
Regular users (`USER` role) cannot access:
- `/admin/dashboard` - Admin dashboard
- `/admin/products` - Product management
- Admin API endpoints

### API Protection
Admin API routes (e.g., `POST /api/products`) check for:
1. Valid session
2. User role = `ADMIN`
3. Returns `401 Unauthorized` if not admin

---

## 🧪 Testing Admin Access

### Test 1: Admin Login
```
1. Create admin user (using method above)
2. Go to: http://localhost:3000/login
3. Enter admin credentials
4. Click "Sign In"
5. ✅ Should redirect to homepage
```

### Test 2: Access Admin Dashboard
```
1. While logged in as admin
2. Go to: http://localhost:3000/admin/dashboard
3. ✅ Should see admin dashboard with stats
```

### Test 3: Access Product Management
```
1. While logged in as admin
2. Go to: http://localhost:3000/admin/products
3. ✅ Should see product list
4. Try adding a new product
5. ✅ Should successfully create product
```

### Test 4: Regular User Access (Should Fail)
```
1. Create regular user account
2. Login as regular user
3. Try accessing: http://localhost:3000/admin/dashboard
4. ✅ Should redirect to login or show "Access Denied"
```

---

## 🔧 Troubleshooting

### Issue 1: "Cannot Access Admin Dashboard"
**Solution**: Verify user role in database
```cmd
npx prisma studio
```
- Open User model
- Check your user's role is `ADMIN`

### Issue 2: "User Already Exists"
**Solution**: Update existing user's role
```javascript
// In create-admin.js, the script automatically updates existing users
// Or manually change role in Prisma Studio
```

### Issue 3: "Invalid Credentials"
**Solution**: Reset password
1. Open Prisma Studio
2. Find your user
3. Generate new bcrypt hash
4. Update password field
5. Try logging in again

### Issue 4: "Session Expired"
**Solution**: Clear cookies and re-login
1. Clear browser cookies for localhost
2. Go to login page
3. Enter credentials again

---

## 📊 Admin vs Regular User Comparison

| Feature | Regular User | Admin User |
|---------|-------------|------------|
| Browse Products | ✅ Yes | ✅ Yes |
| Add to Cart | ✅ Yes | ✅ Yes |
| Place Orders | ✅ Yes | ✅ Yes |
| View Own Orders | ✅ Yes | ✅ Yes |
| Access Dashboard | ✅ Yes (`/dashboard`) | ✅ Yes (`/dashboard` + `/admin/*`) |
| Add Products | ❌ No | ✅ Yes |
| Edit Products | ❌ No | ✅ Yes |
| Delete Products | ❌ No | ✅ Yes |
| View All Orders | ❌ No | ✅ Yes |
| View All Customers | ❌ No | ✅ Yes |
| Access Admin Dashboard | ❌ No | ✅ Yes |

---

## 🎨 Admin Dashboard UI

### Dashboard Cards
```
┌─────────────┬─────────────┬─────────────┬─────────────┐
│ 💰 Revenue  │ 📦 Orders   │ 📦 Products │ 👥 Customers│
│ $12,450.00  │ 45          │ 28          │ 150         │
│ +12.5%      │ +8 new      │ +3 new      │ +15 new     │
└─────────────┴─────────────┴─────────────┴─────────────┘
```

### Recent Orders Table
```
┌──────────────┬─────────────┬──────────┬──────────┐
│ Order #      │ Customer    │ Status   │ Amount   │
├──────────────┼─────────────┼──────────┼──────────┤
│ #ORD-001234  │ John Doe    │ Shipped  │ $129.99  │
│ #ORD-001235  │ Jane Smith  │ Pending  │ $89.99   │
│ #ORD-001236  │ Bob Wilson  │ Delivered│ $149.99  │
└──────────────┴─────────────┴──────────┴──────────┘
```

---

## 🚀 Quick Start Commands

### Create Admin User
```cmd
node create-admin.js
```

### Start Development Server
```cmd
npm run dev
```

### Open Prisma Studio
```cmd
npx prisma studio
```

### View Database
```cmd
npx prisma studio
```

### Reset Database (Warning: Deletes all data)
```cmd
npx prisma migrate reset
```

---

## 📝 Default Admin Credentials

If you used the `create-admin.js` script:

```
📧 Email: admin@shirtcanary.com
🔒 Password: Admin123!
```

**⚠️ IMPORTANT**: Change this password after first login!

---

## 🔐 Security Best Practices

### For Development
1. ✅ Use strong passwords (minimum 8 chars, uppercase, lowercase, number, special char)
2. ✅ Don't commit admin credentials to version control
3. ✅ Use environment variables for sensitive data
4. ✅ Regularly update dependencies

### For Production
1. ✅ Change default admin credentials immediately
2. ✅ Enable two-factor authentication (if implemented)
3. ✅ Use HTTPS only
4. ✅ Set up rate limiting
5. ✅ Monitor admin activity logs
6. ✅ Restrict admin access by IP (optional)
7. ✅ Regular security audits

---

## 📚 Related Files

### Admin Layout
- **File**: `src/app/(admin)/layout.tsx`
- **Purpose**: Protects admin routes

### Admin Dashboard
- **File**: `src/app/admin/dashboard/page.tsx`
- **URL**: `/admin/dashboard`

### Product Management
- **File**: `src/app/admin/products/page.tsx`
- **URL**: `/admin/products`

### Authentication
- **File**: `src/lib/auth.ts`
- **Purpose**: NextAuth configuration with role support

---

## ✅ Checklist

Before accessing admin dashboard:

- [ ] Database is set up and running
- [ ] Admin user is created
- [ ] Admin user has `ADMIN` role
- [ ] Development server is running
- [ ] Can access login page
- [ ] Successfully logged in as admin
- [ ] Can access `/admin/dashboard`
- [ ] Can access `/admin/products`

---

## 📞 Need Help?

If you're still having trouble accessing the admin dashboard:

1. Check the console for error messages
2. Verify database connection
3. Confirm user role in Prisma Studio
4. Try logging out and logging in again
5. Clear browser cache and cookies
6. Restart development server

---

## Summary

### Quick Access Steps:
1. **Create admin user**: `node create-admin.js`
2. **Login**: Go to `/login` with admin credentials
3. **Access dashboard**: Navigate to `/admin/dashboard`
4. **Manage products**: Go to `/admin/products`

**Default Credentials** (if using script):
- Email: `admin@shirtcanary.com`
- Password: `Admin123!`

**Admin Dashboard URL**: `http://localhost:3000/admin/dashboard`

✅ **You're all set!** Enjoy managing your e-commerce platform!
