# 🧪 COMPLETE TESTING GUIDE

## Quick Start Testing

After running `start-app.bat`, follow these test scenarios to verify all features.

---

## 🔍 TEST SCENARIO 1: GUEST USER (Not Logged In)

### Test Steps:
1. **Open Browser** → Navigate to `http://localhost:3000`
2. **Browse Homepage** → Should see hero section and featured products
3. **Click "Browse Products"** → Navigate to `/products` page
4. **View Product Card** → Hover over any product
5. **Try to Add to Cart** → Click "Add to Cart" button
   
### Expected Results:
- ✅ **Login Modal Appears** with:
  - "Login Required" heading
  - Blue "Sign In" button
  - "Create Account" button
  - Close (X) button
- ✅ **No Items Added** to cart
- ✅ **Cart Badge** shows 0 items
- ✅ **Theme Toggle** works (sun/moon icon in header)

### Test Theme Toggle:
1. Click **Sun icon** (if in light mode) → Should switch to dark mode
2. Click **Moon icon** (if in dark mode) → Should switch to light mode
3. Refresh page → Theme preference should persist

---

## 🔍 TEST SCENARIO 2: CUSTOMER USER (Logged In)

### Prerequisites:
- Login as a regular user (not admin)
- Email: `user@example.com` / Password: Your password

### Test Steps:
1. **Click "Sign In"** from login modal
2. **Enter credentials** and login
3. **Verify Customer Navigation:**
   - "Browse Products" link visible
   - "About" link visible
   - "Contact" link visible
   - "Dashboard" link visible
   - **Cart icon** visible in header
4. **Add Product to Cart:**
   - Browse products page
   - Click "Add to Cart" on any product
   - Should see success animation
5. **Verify Cart Badge:**
   - Cart icon should show item count (1)
6. **Test Cart Persistence:**
   - Refresh the page
   - Cart count should remain (1)
7. **Open Product Modal:**
   - Click "View Details" on a product
   - Select size and color
   - Change quantity
   - Click "Add to Cart"
   - Should add successfully
8. **Navigate to Cart:**
   - Click cart icon in header
   - Should see all added items
   - Can update quantities
   - Can remove items

### Expected Results:
- ✅ Customer can add items to cart
- ✅ Cart persists on refresh (localStorage + backend)
- ✅ Cart badge updates correctly
- ✅ Customer navigation visible
- ✅ No admin routes accessible
- ✅ Theme toggle works

### Test Route Protection:
1. Try to access `/admin/dashboard`
2. **Expected:** Redirected to `/login` or error page

---

## 🔍 TEST SCENARIO 3: ADMIN USER

### Prerequisites:
- Login as admin
- Create admin using: `node create-admin.js`

### Test Steps:
1. **Login as Admin**
2. **Verify Admin Navigation:**
   - "Dashboard" link with icon
   - "Products" link with icon
   - "Orders" link with icon
   - "Users" link with icon
   - "Analytics" link with icon
   - **No Cart Icon** visible
3. **Test Admin Routes:**
   - Click "Dashboard" → `/admin/dashboard`
   - Should see admin dashboard
4. **Test Customer Route Blocking:**
   - Try to access `/products`
   - **Expected:** Redirected to `/admin/dashboard`
   - Try to access `/cart`
   - **Expected:** Redirected to `/admin/dashboard`
5. **Verify Logo Click:**
   - Click logo in header
   - **Expected:** Routes to `/admin/dashboard` (not homepage)

### Expected Results:
- ✅ Admin sees admin-only navigation
- ✅ No cart icon for admin
- ✅ Cannot access customer pages
- ✅ Logo links to admin dashboard
- ✅ Role badge shows "Admin"
- ✅ Theme toggle works

---

## 🔍 TEST SCENARIO 4: CART PERSISTENCE

### Test A: Guest Cart Migration (Future Feature)
1. **As Guest:** Add 2 items to cart
2. **Login:** Cart should be preserved
3. **Expected:** Items visible in cart after login

### Test B: Logged-In User Persistence
1. **Login** as customer
2. **Add 3 items** to cart
3. **Close browser** completely
4. **Reopen browser** and navigate to site
5. **Login again**
6. **Expected:** All 3 items still in cart

### Test C: Multiple Tabs
1. **Open Tab 1:** Login and add items
2. **Open Tab 2:** Same user session
3. **Add items in Tab 2**
4. **Switch to Tab 1:** Refresh
5. **Expected:** All items visible (requires page refresh)

---

## 🔍 TEST SCENARIO 5: DARK MODE

### Test All Components:

#### Header
- ✅ Background: Light gray → Dark gray
- ✅ Text: Dark → Light
- ✅ Links: Blue → Blue (lighter shade)
- ✅ User menu: White → Dark

#### Product Cards
- ✅ Card background: White → Dark gray
- ✅ Text: Dark → Light
- ✅ Borders: Light gray → Dark gray
- ✅ Hover effects work in both modes

#### Login Modal
- ✅ Modal background: White → Dark gray
- ✅ Text: Dark → Light
- ✅ Buttons maintain blue color
- ✅ Close button: Light gray → Dark gray

#### Footer
- ✅ Background: Dark gray → Darker
- ✅ Text: Gray → Lighter gray
- ✅ Links hover: White effect

#### Forms
- ✅ Input fields: White → Dark
- ✅ Borders: Light → Dark
- ✅ Focus states work

---

## 🔍 TEST SCENARIO 6: MOBILE RESPONSIVE

### Test on Mobile View (< 768px):

1. **Open DevTools** → Toggle device toolbar
2. **Select iPhone or Android** device
3. **Test Header:**
   - Hamburger menu appears
   - Mobile menu slides in
   - Theme toggle visible
   - Cart icon visible (customers only)
4. **Test Navigation:**
   - Click hamburger menu
   - All links accessible
   - Menu closes on link click
5. **Test Product Grid:**
   - Products stack vertically
   - Cards responsive
   - Images scale properly
6. **Test Login Modal:**
   - Modal fits screen
   - Buttons stack properly
   - Text readable
7. **Test Cart:**
   - Cart page mobile-friendly
   - Buttons accessible

---

## 🔍 TEST SCENARIO 7: EDGE CASES

### Test 1: Empty Cart
- Navigate to `/cart` when empty
- Should see "Your cart is empty" message

### Test 2: Duplicate Items
- Add same product twice (same size/color)
- Should increase quantity, not create duplicate

### Test 3: Session Expiration
- Login and wait for session to expire
- Try to access protected route
- Should redirect to login

### Test 4: Network Failure
- Turn off internet (or use DevTools offline mode)
- Try to add to cart
- Should save to localStorage
- When back online, should sync

### Test 5: Invalid Product
- Try to add non-existent product
- Should handle gracefully (error message)

### Test 6: Quick Theme Toggle
- Rapidly click theme toggle 10 times
- Should not crash or flicker excessively

---

## 🐛 COMMON ISSUES & SOLUTIONS

### Issue 1: "Products is not iterable" Error
**Solution:** Check API response in `/api/products/route.ts`
```typescript
return NextResponse.json({ products: allProducts })
```

### Issue 2: Cart Not Persisting
**Solution:** 
1. Check if user is logged in
2. Verify database connection
3. Check browser localStorage
4. Run migration: `npx prisma migrate dev`

### Issue 3: Theme Not Saving
**Solution:**
1. Check localStorage in DevTools
2. Verify `suppressHydrationWarning` in layout.tsx
3. Clear browser cache

### Issue 4: Admin Can Access Customer Pages
**Solution:**
1. Check middleware.ts
2. Verify role in session
3. Check matcher configuration

### Issue 5: Login Modal Not Appearing
**Solution:**
1. Verify `useSession()` in product components
2. Check if LoginModal is imported
3. Verify showLoginModal state

---

## ✅ FEATURE CHECKLIST

### Authentication & Authorization
- [ ] Guest users see login modal on "Add to Cart"
- [ ] Customers can add items to cart
- [ ] Admins cannot access customer pages
- [ ] Customers cannot access admin pages
- [ ] Session persists across page refreshes

### Cart Functionality
- [ ] Items add to cart successfully
- [ ] Cart badge updates correctly
- [ ] Cart persists in localStorage
- [ ] Cart syncs to database (logged-in users)
- [ ] Quantity updates work
- [ ] Remove items works
- [ ] Empty cart shows message

### Theme System
- [ ] Light mode works
- [ ] Dark mode works
- [ ] Theme toggle button functional
- [ ] Theme persists on refresh
- [ ] All components support both themes
- [ ] Smooth transitions

### Navigation
- [ ] Customer sees customer nav
- [ ] Admin sees admin nav
- [ ] Cart icon hidden for admins
- [ ] Logo routes correctly based on role
- [ ] Mobile menu works
- [ ] All links functional

### UI/UX
- [ ] Login modal appears correctly
- [ ] Animations smooth
- [ ] Loading states visible
- [ ] Error messages clear
- [ ] Success feedback shown
- [ ] Mobile responsive
- [ ] Accessible (keyboard navigation)

---

## 📊 PERFORMANCE TESTING

### Load Time
- Homepage should load < 2 seconds
- Product page should load < 3 seconds
- Theme toggle should be instant

### Database Queries
- Cart load should be < 500ms
- Product fetch should be < 1 second

### Bundle Size
- Check with: `npm run build`
- Total bundle should be reasonable (< 500KB JS)

---

## 🚀 PRODUCTION READINESS

### Before Deploying:
1. ✅ All tests pass
2. ✅ No console errors
3. ✅ Environment variables set
4. ✅ Database migrations applied
5. ✅ Images optimized
6. ✅ API routes secured
7. ✅ Error boundaries implemented
8. ✅ Logging configured
9. ✅ Analytics added (optional)
10. ✅ SEO metadata complete

---

## 📝 TEST RESULTS LOG

### Date: _____________
### Tester: _____________

| Test Scenario | Status | Notes |
|--------------|--------|-------|
| Guest User Flow | ⬜ Pass / ⬜ Fail | |
| Customer User Flow | ⬜ Pass / ⬜ Fail | |
| Admin User Flow | ⬜ Pass / ⬜ Fail | |
| Cart Persistence | ⬜ Pass / ⬜ Fail | |
| Dark Mode | ⬜ Pass / ⬜ Fail | |
| Mobile Responsive | ⬜ Pass / ⬜ Fail | |
| Edge Cases | ⬜ Pass / ⬜ Fail | |

### Overall Result: ⬜ PASS / ⬜ FAIL

### Issues Found:
1. _____________________________________________
2. _____________________________________________
3. _____________________________________________

---

**Happy Testing! 🎉**
