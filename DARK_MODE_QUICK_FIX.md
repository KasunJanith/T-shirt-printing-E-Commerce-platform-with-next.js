# 🎯 Quick Dark Mode Fix Script

Copy and apply these patterns to each page that needs dark mode updates.

## 🔍 Find & Replace Patterns

### Pattern 1: Main Container
**Find:** `<div className="min-h-screen bg-gray-50`
**Replace:** `<div className="min-h-screen bg-gray-50 dark:bg-gray-900`

OR

**Find:** `<div className="min-h-screen bg-white`
**Replace:** `<div className="min-h-screen bg-white dark:bg-gray-950`

### Pattern 2: Headings
**Find:** `text-gray-900">`
**Replace:** `text-gray-900 dark:text-white">`

### Pattern 3: Paragraphs/Body Text
**Find:** `text-gray-700`
**Replace:** `text-gray-700 dark:text-gray-300`

**Find:** `text-gray-600`
**Replace:** `text-gray-600 dark:text-gray-400`

### Pattern 4: Borders
**Find:** `border-gray-200`
**Replace:** `border-gray-200 dark:border-gray-700`

**Find:** `border-gray-300`
**Replace:** `border-gray-300 dark:border-gray-600`

### Pattern 5: Card Backgrounds
**Find:** `bg-white rounded`
**Replace:** `bg-white dark:bg-gray-800 rounded`

**Find:** `bg-gray-50`
**Replace:** `bg-gray-50 dark:bg-gray-900`

### Pattern 6: Icon Backgrounds
**Find:** `bg-blue-100`
**Replace:** `bg-blue-100 dark:bg-blue-900/30`

**Find:** `bg-purple-100`
**Replace:** `bg-purple-100 dark:bg-purple-900/30`

**Find:** `bg-green-100`
**Replace:** `bg-green-100 dark:bg-green-900/30`

**Find:** `bg-pink-100`
**Replace:** `bg-pink-100 dark:bg-pink-900/30`

### Pattern 7: Icon Colors
**Find:** `text-blue-600`
**Replace:** `text-blue-600 dark:text-blue-400`

**Find:** `text-purple-600`
**Replace:** `text-purple-600 dark:text-purple-400`

**Find:** `text-green-600`
**Replace:** `text-green-600 dark:text-green-400`

### Pattern 8: Gradient Sections
**Find:** `from-blue-600 via-purple-600 to-pink-500`
**Replace:** `from-blue-600 via-purple-600 to-pink-500 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900`

**Find:** `from-blue-600 to-purple-600`
**Replace:** `from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800`

---

## 📝 Copy-Paste Classes

### For Input Fields
```tsx
className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 
           rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
           placeholder-gray-500 dark:placeholder-gray-400 
           focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
           focus:border-transparent transition-colors"
```

### For Textareas
```tsx
className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 
           rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
           placeholder-gray-500 dark:placeholder-gray-400 
           focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
           focus:border-transparent transition-colors resize-none"
```

### For Labels
```tsx
className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
```

### For Cards
```tsx
className="bg-white dark:bg-gray-800 rounded-xl shadow-lg 
           border border-gray-200 dark:border-gray-700 
           p-6 hover:shadow-2xl hover:-translate-y-2 
           transition-all duration-300"
```

### For Hero Sections
```tsx
className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 
           dark:from-blue-900 dark:via-purple-900 dark:to-pink-900 
           text-white py-20 relative overflow-hidden"
```

### For Feature Cards
```tsx
className="group p-8 bg-white dark:bg-gray-800 rounded-2xl 
           border border-gray-200 dark:border-gray-700 
           shadow-lg hover:shadow-2xl transition-all duration-300 
           hover:-translate-y-2 hover:scale-105 animate-fade-in-up"
```

---

## 🎨 Animation Classes to Add

### Page Sections
```tsx
// Add to main sections
className="...existing... animate-fade-in-up"

// Add to hero text
className="...existing... animate-slide-in-left"

// Add to images/illustrations
className="...existing... animate-fade-in-right"
```

### Cards with Staggered Animation
```tsx
// First card
className="...existing... animate-fade-in-up"
style={{ animationDelay: '0ms' }}

// Second card
className="...existing... animate-fade-in-up"
style={{ animationDelay: '100ms' }}

// Third card
className="...existing... animate-fade-in-up"
style={{ animationDelay: '200ms' }}
```

### Hover Effects
```tsx
// For cards
className="...existing... hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"

// For buttons
className="...existing... hover:scale-105 hover:shadow-xl transition-all duration-300"

// For icons
className="...existing... group-hover:scale-110 group-hover:rotate-12 transition-all duration-300"
```

---

## ⚡ Priority Pages to Update

### HIGH PRIORITY (User-Facing):
1. **About** - Brand identity page
2. **Contact** - User communication
3. **Cart** - Shopping flow
4. **Products** - Already done ✅
5. **Shop** - Product browsing

### MEDIUM PRIORITY (Legal):
6. **Terms** - Legal compliance
7. **Privacy Policy** - GDPR compliance
8. **Shipping** - Customer info
9. **Returns** - Customer service
10. **Refund Policy** - Customer service

### LOW PRIORITY (Internal):
11. **Dashboard** - User dashboard
12. **Admin** - Admin panel (less critical for dark mode)

---

## 🚀 Testing Checklist

After updating each page, test:

- [ ] Toggle dark mode - all text is readable
- [ ] All inputs/textareas visible in dark mode
- [ ] Borders are visible but not harsh
- [ ] Cards have proper contrast
- [ ] Icons are visible and colored correctly
- [ ] Hover effects work smoothly
- [ ] Animations play correctly
- [ ] Mobile responsive in both themes
- [ ] No white flashes when loading
- [ ] Gradient sections look good in dark

---

## 💡 Pro Tips

1. **Use VS Code Replace**:
   - Press `Ctrl+H`
   - Enable "Use Regular Expression"
   - Replace across all files in `src/app/`

2. **Test with DevTools**:
   - Press `F12` in browser
   - Click "Toggle device toolbar"
   - Test mobile responsive
   - Use "Rendering" tab to test dark mode

3. **Batch Update**:
   - Update all similar pages at once
   - Copy-paste the template structure
   - Then customize content

4. **Keep Consistency**:
   - Use same color combinations
   - Use same animation timings
   - Use same hover effects

---

## 🎯 Done When...

Each page should have:
✅ Dark background colors
✅ Light text colors in dark mode
✅ Visible borders
✅ Proper input styling
✅ Smooth animations
✅ Hover effects
✅ Mobile responsive
✅ No accessibility issues

---

**Remember**: The Home Page is your reference! Copy its styling patterns. 🏠✨
