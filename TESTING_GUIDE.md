# Testing Guide - T-Shirt Platform Redesign

## 🧪 TESTING CHECKLIST

### Pre-Testing Setup
- [ ] Ensure migration script completed successfully
- [ ] Verify database has `printSize` column in products table
- [ ] Check that Prisma client generated without errors
- [ ] Start development server: `npm run dev`

---

## 1️⃣ Homepage Testing

### Visual Tests
- [ ] Hero section displays with gradient background
- [ ] "Browse Products" button is visible and styled correctly
- [ ] Three print size cards display (Small, Medium, Full)
- [ ] Print size icons show correctly (📏 🖼️ 🎯)
- [ ] Feature cards show (Free Shipping, Secure Payment, Premium Quality)
- [ ] All text is visible (no white text on white background)

### Functionality Tests
- [ ] Click "Browse Products" → navigates to `/products`
- [ ] Click "Small Print" card → navigates to `/products?printSize=SMALL`
- [ ] Click "Medium Print" card → navigates to `/products?printSize=MEDIUM`
- [ ] Click "Full Print" card → navigates to `/products?printSize=FULL`
- [ ] Scroll animations work smoothly
- [ ] Mobile responsive (test on narrow screen)

---

## 2️⃣ Browse Products Page Testing (`/products`)

### Visual Tests
- [ ] Hero section with gradient displays
- [ ] Filter chips show (Small, Medium, Full Print)
- [ ] Price range chips display correctly
- [ ] Search bar is visible
- [ ] Product grid displays (1 column mobile, 4 columns desktop)
- [ ] Product cards show images, prices, print size badges
- [ ] "Add to Cart" buttons visible on cards
- [ ] Filter results counter shows correct number

### Filter Tests
- [ ] Click "Small Print" → filters to SMALL products only
- [ ] Click "Medium Print" → filters to MEDIUM products
- [ ] Click "Full Print" → filters to FULL products
- [ ] Click "All Sizes" → shows all products
- [ ] Click "Under $20" → filters price range
- [ ] Click "$20-$35" → filters price range
- [ ] Click "$35+" → filters price range
- [ ] Multiple filters work together correctly

### Search Tests
- [ ] Type in search box → filters products in real-time
- [ ] Search by product name works
- [ ] Search by description works
- [ ] Search with no results shows empty state
- [ ] Clear search shows all products again

### Product Card Tests
- [ ] Hover over card → image zooms smoothly
- [ ] Hover over card → overlay appears with cart button
- [ ] Print size badge displays correct icon and text
- [ ] Price displays correctly formatted
- [ ] Stock status shows ("In Stock" or "Out of Stock")
- [ ] Click card (not button) → opens product modal

### Add to Cart Tests
- [ ] Click "Add to Cart" on card → success animation
- [ ] Success checkmark appears
- [ ] Cart icon in header updates count
- [ ] Can add multiple products
- [ ] Click again → adds another unit

---

## 3️⃣ Product Modal Testing

### Visual Tests
- [ ] Modal opens with backdrop blur
- [ ] Close button (X) visible in top-right
- [ ] Product image displays large
- [ ] Thumbnail gallery shows below main image
- [ ] Size selector shows all 6 sizes (XS, S, M, L, XL, XXL)
- [ ] Color selector shows 8 color swatches
- [ ] Quantity selector with +/- buttons
- [ ] Print size info card displays
- [ ] Product features list shows
- [ ] "Add to Cart" button prominent

### Functionality Tests
- [ ] Click thumbnail → changes main image
- [ ] Click size option → selects size (border highlights)
- [ ] Click color swatch → selects color (ring appears)
- [ ] Click "+" → increases quantity
- [ ] Click "-" → decreases quantity (min 1)
- [ ] Type in quantity field → updates value
- [ ] Click "Add to Cart" → adds to cart with success message
- [ ] Click "X" or outside modal → closes modal
- [ ] ESC key closes modal

### Responsive Tests
- [ ] Modal scales correctly on mobile
- [ ] Thumbnails scroll or wrap properly
- [ ] All buttons remain accessible
- [ ] Text is readable at all sizes

---

## 4️⃣ Navigation Testing

### Header Navigation
- [ ] "Browse Products" link in header works
- [ ] "About" link works
- [ ] "Contact" link works
- [ ] Cart icon shows correct count
- [ ] User menu works (if logged in)
- [ ] Mobile menu hamburger works

### Redirects
- [ ] `/shop` redirects to `/products`
- [ ] Old category URLs are gone (404 expected):
  - `/shop/men` → 404
  - `/shop/women` → 404
  - `/shop/kids` → 404

---

## 5️⃣ API Testing

### GET /api/products
Test in browser console or Postman:

```javascript
// All products
fetch('/api/products').then(r => r.json()).then(console.log)

// Filter by print size
fetch('/api/products?printSize=SMALL').then(r => r.json()).then(console.log)
fetch('/api/products?printSize=MEDIUM').then(r => r.json()).then(console.log)
fetch('/api/products?printSize=FULL').then(r => r.json()).then(console.log)

// Filter by price
fetch('/api/products?minPrice=20&maxPrice=30').then(r => r.json()).then(console.log)

// Search
fetch('/api/products?search=shirt').then(r => r.json()).then(console.log)

// Multiple filters
fetch('/api/products?printSize=MEDIUM&minPrice=20&maxPrice=35').then(r => r.json()).then(console.log)
```

**Expected**: Each query returns correctly filtered products

---

## 6️⃣ Mobile Responsiveness

### Breakpoints to Test
- [ ] 320px (small mobile)
- [ ] 375px (iPhone SE)
- [ ] 768px (tablet)
- [ ] 1024px (desktop)
- [ ] 1440px (large desktop)

### Mobile-Specific Tests
- [ ] Product grid changes to 1-2 columns
- [ ] Filters become collapsible/drawer
- [ ] Modal fits screen properly
- [ ] Buttons are touch-friendly (min 44px)
- [ ] Text remains readable
- [ ] Images load and scale correctly
- [ ] Navigation hamburger menu works

---

## 7️⃣ Performance Testing

### Load Times
- [ ] Homepage loads < 3 seconds
- [ ] Products page loads < 3 seconds
- [ ] Images load progressively
- [ ] No layout shift during load

### Animations
- [ ] Transitions are smooth (no jank)
- [ ] Hover effects respond immediately
- [ ] Modal open/close is smooth
- [ ] Filter changes don't lag

---

## 8️⃣ Accessibility Testing

### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Enter/Space activates buttons
- [ ] ESC closes modal
- [ ] Focus indicators are visible

### Screen Reader
- [ ] Images have alt text
- [ ] Buttons have descriptive labels
- [ ] Form inputs have labels
- [ ] Error messages are announced

### Color Contrast
- [ ] Text passes WCAG AA standards
- [ ] Interactive elements are distinguishable
- [ ] Color is not the only indicator

---

## 9️⃣ Error Handling

### Network Errors
- [ ] Products fail to load → shows error message
- [ ] Add to cart fails → shows error notification
- [ ] Search fails gracefully

### Empty States
- [ ] No products match filters → helpful message
- [ ] No search results → suggestion to try different query
- [ ] Empty cart → prompt to browse products

### Edge Cases
- [ ] Very long product names display correctly
- [ ] Products with no images show placeholder
- [ ] Out of stock products handled properly
- [ ] Invalid URLs show 404 page

---

## 🔟 Database Verification

### Check Database Directly
```sql
-- Connect to PostgreSQL
psql -U postgres -d shirt_canary

-- Check products table has printSize column
\d products

-- Check print size values
SELECT id, name, "printSize", price FROM products LIMIT 10;

-- Count products by print size
SELECT "printSize", COUNT(*) FROM products GROUP BY "printSize";

-- Verify categories table is gone
\dt categories
```

**Expected Results**:
- Products table has `printSize` column (type: PrintSize enum)
- Categories table does not exist (error expected)
- Products have SMALL, MEDIUM, or FULL print sizes
- No NULL values in printSize column

---

## ✅ TESTING COMPLETION CRITERIA

All tests should pass before considering the redesign complete:

- [ ] All visual elements render correctly
- [ ] All interactive features work
- [ ] Filters and search function properly
- [ ] Mobile responsive on all devices
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] API returns correct data
- [ ] Database schema matches expectations
- [ ] Performance is acceptable
- [ ] Accessibility standards met

---

## 🐛 Bug Reporting Template

If you find issues, document them as:

```
**Bug**: [Brief description]
**Page**: [Which page]
**Steps to Reproduce**:
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Expected**: [What should happen]
**Actual**: [What actually happens]
**Browser**: [Chrome/Firefox/Safari/Edge]
**Device**: [Desktop/Mobile/Tablet]
**Screenshot**: [If applicable]
```

---

## 📞 Support

If you encounter issues:
1. Check console for errors (`F12` → Console)
2. Verify database migration completed
3. Check `.env` file has correct DATABASE_URL
4. Try restarting dev server
5. Clear browser cache
6. Check `FINAL_IMPLEMENTATION_SUMMARY.md`

---

*Last Updated: November 7, 2025*
