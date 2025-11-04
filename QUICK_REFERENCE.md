# 🚀 QUICK REFERENCE GUIDE - Shirt Canary

## 📋 ALL AVAILABLE PAGES

### 🛍️ Shopping & Products
| Route | Description | Status |
|-------|-------------|--------|
| `/` | Homepage with hero, categories, featured products | ✅ Complete |
| `/shop` | All products with filters, search, and sorting | ✅ Complete |
| `/shop/men` | Men's collection only | ✅ Complete |
| `/shop/women` | Women's collection only | ✅ Complete |
| `/shop/kids` | Kids' collection only | ✅ Complete |
| `/products/[id]` | Individual product detail page | ✅ Complete |

### 🛒 Cart & Purchase
| Route | Description | Status |
|-------|-------------|--------|
| `/cart` | Shopping cart with item management | ✅ Complete |
| `/checkout` | Checkout form and order placement | ✅ Complete |

### 👤 User Account
| Route | Description | Status |
|-------|-------------|--------|
| `/login` | User login page | ✅ Complete |
| `/register` | New user registration | ✅ Complete |
| `/dashboard` | User dashboard with orders & profile | ✅ Complete |

### 🔐 Admin Panel
| Route | Description | Status |
|-------|-------------|--------|
| `/admin/dashboard` | Admin overview with stats | ✅ Complete |
| `/admin/products` | Product management (list, edit, delete) | ✅ Complete |

### 📄 Information Pages
| Route | Description | Status |
|-------|-------------|--------|
| `/about` | Company story, values, and stats | ✅ Complete |
| `/contact` | Contact form and information | ✅ Complete |
| `/shipping` | Shipping methods and costs | ✅ Complete |
| `/returns` | Return policy and process | ✅ Complete |
| `/privacy-policy` | Privacy policy and data protection | ✅ Complete |
| `/terms` | Terms of service | ✅ Complete |
| `/refund-policy` | Refund eligibility and process | ✅ Complete |

---

## 🎨 UI Components Available

```typescript
// Button variants
<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>

// Button sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>

// Card variants
<Card variant="default">Content</Card>
<Card variant="elevated">Content</Card>
<Card variant="outlined">Content</Card>

// Badge variants
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="danger">Danger</Badge>
<Badge variant="info">Info</Badge>

// Input
<Input type="text" placeholder="Enter text" />
<Input type="email" placeholder="Email" />
<Input type="password" placeholder="Password" />
```

---

## 🔧 Key Features by Page

### Shop All (`/shop`)
```typescript
Features:
✅ Search products
✅ Filter by category (All, Men, Women, Kids)
✅ Filter by size (XS, S, M, L, XL, XXL)
✅ Filter by price range
✅ Sort (Featured, Newest, Price Low-High, Price High-Low, Name A-Z)
✅ Clear all filters
✅ Product count display
✅ Responsive sidebar
```

### Product Detail (`/products/[id]`)
```typescript
Features:
✅ Image gallery with thumbnails
✅ Size selector
✅ Color selector
✅ Quantity controls
✅ Add to cart
✅ Add to wishlist
✅ Stock status
✅ Rating & reviews display
✅ Feature highlights (Shipping, Returns, Quality)
✅ Product specifications
```

### Shopping Cart (`/cart`)
```typescript
Features:
✅ Display all cart items
✅ Update quantities
✅ Remove items
✅ Calculate subtotal
✅ Calculate shipping
✅ Calculate total
✅ Empty cart state
✅ Continue shopping link
✅ Proceed to checkout
```

### User Dashboard (`/dashboard`)
```typescript
Features:
✅ Order history with status badges
✅ View order details
✅ Profile information
✅ Edit profile
✅ Sidebar navigation
✅ Protected route (login required)
```

### Admin Dashboard (`/admin/dashboard`)
```typescript
Features:
✅ Revenue statistics
✅ Order count
✅ Product count
✅ User count
✅ Recent orders table
✅ Quick action buttons
✅ Admin-only access
```

---

## 🎯 Navigation Structure

### Header (Desktop)
```
Logo | Shop All | Men | Women | Kids | About | Contact | Search | User | Cart
```

### Header (Mobile)
```
Logo | [Hamburger Menu] | User | Cart
```

### Footer Sections
```
SHOP          SUPPORT        LEGAL           
- Men's       - About        - Privacy       
- Women's     - Contact      - Terms         
- Kids'       - Shipping     - Refund        
- All         - Returns                      
```

---

## 🚦 Route Protection

### Public Routes (No login required)
- `/` - Homepage
- `/shop`, `/shop/men`, `/shop/women`, `/shop/kids` - Shopping
- `/products/[id]` - Product details
- `/cart` - Shopping cart
- `/login`, `/register` - Authentication
- `/about`, `/contact` - Information
- `/shipping`, `/returns`, `/privacy-policy`, `/terms`, `/refund-policy` - Policies

### Protected Routes (Login required)
- `/dashboard` - User dashboard
- `/checkout` - Checkout (recommended but optional)

### Admin Routes (Admin role required)
- `/admin/dashboard` - Admin overview
- `/admin/products` - Product management

---

## 🎨 Color Palette

```css
/* Primary Colors */
Blue: #2563eb (rgb(37, 99, 235))
Purple: #9333ea (rgb(147, 51, 234))
Pink: #ec4899 (rgb(236, 72, 153))

/* Status Colors */
Success: #10b981 (Green)
Warning: #f59e0b (Yellow)
Danger: #ef4444 (Red)
Info: #3b82f6 (Blue)

/* Neutral Colors */
Gray 50: #f9fafb
Gray 100: #f3f4f6
Gray 700: #374151
Gray 900: #111827
```

---

## 📱 Responsive Breakpoints

```css
/* Tailwind Breakpoints */
sm: 640px   /* Small devices (tablets) */
md: 768px   /* Medium devices (laptops) */
lg: 1024px  /* Large devices (desktops) */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* 2X Extra large */
```

---

## 🔥 Quick Commands

### Development
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

### Database
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Open Prisma Studio
npx prisma studio

# Reset database
npx prisma migrate reset
```

---

## 📊 Page Load Performance

| Page Type | Expected Load Time | Priority |
|-----------|-------------------|----------|
| Homepage | < 1s | High |
| Category Pages | < 1.5s | High |
| Product Detail | < 2s | High |
| Cart | < 1s | Medium |
| Dashboard | < 2s | Medium |
| Admin Pages | < 2.5s | Low |
| Info Pages | < 1.5s | Low |

---

## 🐛 Common Issues & Solutions

### Issue: Products not loading
```typescript
Solution: Check if API route is working
- Verify /api/products returns data
- Check database connection
- Ensure Prisma client is generated
```

### Issue: Cart not updating
```typescript
Solution: Check cart context
- Verify CartProvider wraps the app
- Check localStorage is accessible
- Clear browser cache
```

### Issue: Authentication failing
```typescript
Solution: Check NextAuth configuration
- Verify environment variables (.env)
- Check database connection
- Verify NEXTAUTH_SECRET is set
```

---

## 📞 Support & Documentation

- **Technical Issues**: Check console for errors
- **Design Questions**: Refer to Tailwind CSS docs
- **Database Issues**: Check Prisma documentation
- **Authentication**: Review NextAuth.js docs

---

## ✅ Quality Checklist

Before deploying:
- [ ] All pages load without errors
- [ ] Mobile responsive on all pages
- [ ] Forms validate correctly
- [ ] Cart functions properly
- [ ] User authentication works
- [ ] Admin panel is secured
- [ ] Database is connected
- [ ] Environment variables are set
- [ ] Images are optimized
- [ ] SEO metadata is added

---

**Last Updated:** November 2, 2025  
**Total Pages:** 17  
**Status:** ✅ Production Ready
