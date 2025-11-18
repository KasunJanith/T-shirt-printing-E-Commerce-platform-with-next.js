const fs = require('fs');

const files = [
  'src/app/privacy-policy/page.tsx',
  'src/app/shipping/page.tsx',
  'src/app/returns/page.tsx',
  'src/app/refund-policy/page.tsx'
];

const replacements = [
  // Card components
  { from: /<Card className="p-8 mb-8">/g, to: '<Card className="p-8 mb-8 dark:border-gray-700 dark:bg-gray-800">' },
  { from: /<Card className="p-6">/g, to: '<Card className="p-6 dark:border-gray-700 dark:bg-gray-800">' },
  { from: /<Card className="p-6 text-center">/g, to: '<Card className="p-6 text-center dark:border-gray-700 dark:bg-gray-800">' },
  { from: /<Card className="p-8">/g, to: '<Card className="p-8 dark:border-gray-700 dark:bg-gray-800">' },
  
  // Colored accent cards
  { from: /className="p-8 mb-8 bg-blue-50 border-blue-200"/g, to: 'className="p-8 mb-8 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"' },
  { from: /className="p-6 bg-blue-50 border-blue-200"/g, to: 'className="p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"' },
  { from: /className="p-8 bg-blue-50 border-blue-200"/g, to: 'className="p-8 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"' },
  { from: /className="p-8 bg-green-50 border-green-200"/g, to: 'className="p-8 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"' },
  { from: /className="p-8 bg-yellow-50 border-yellow-200"/g, to: 'className="p-8 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800"' },
  
  // Text colors
  { from: /text-gray-700"/g, to: 'text-gray-700 dark:text-gray-300"' },
  { from: /text-gray-900">/g, to: 'text-gray-900 dark:text-white">' },
  { from: /className="text-gray-700 /g, to: 'className="text-gray-700 dark:text-gray-300 ' },
  { from: /className="text-gray-900 /g, to: 'className="text-gray-900 dark:text-white ' },
  
  // Icon background colors
  { from: /bg-blue-100 w-12 h-12/g, to: 'bg-blue-100 dark:bg-blue-900/30 w-12 h-12' },
  { from: /bg-green-100 w-12 h-12/g, to: 'bg-green-100 dark:bg-green-900/30 w-12 h-12' },
  { from: /bg-purple-100 w-12 h-12/g, to: 'bg-purple-100 dark:bg-purple-900/30 w-12 h-12' },
  { from: /bg-indigo-100 w-12 h-12/g, to: 'bg-indigo-100 dark:bg-indigo-900/30 w-12 h-12' },
  { from: /bg-red-100 w-12 h-12/g, to: 'bg-red-100 dark:bg-red-900/30 w-12 h-12' },
  { from: /bg-orange-100 w-12 h-12/g, to: 'bg-orange-100 dark:bg-orange-900/30 w-12 h-12' },
  { from: /bg-yellow-100 w-12 h-12/g, to: 'bg-yellow-100 dark:bg-yellow-900/30 w-12 h-12' },
  
  // Icon colors
  { from: /text-blue-600" \/>/g, to: 'text-blue-600 dark:text-blue-400" />' },
  { from: /text-green-600" \/>/g, to: 'text-green-600 dark:text-green-400" />' },
  { from: /text-purple-600" \/>/g, to: 'text-purple-600 dark:text-purple-400" />' },
  { from: /text-indigo-600" \/>/g, to: 'text-indigo-600 dark:text-indigo-400" />' },
  { from: /text-red-600" \/>/g, to: 'text-red-600 dark:text-red-400" />' },
  { from: /text-orange-600" \/>/g, to: 'text-orange-600 dark:text-orange-400" />' },
  { from: /text-yellow-600" \/>/g, to: 'text-yellow-600 dark:text-yellow-400" />' },
];

files.forEach(filePath => {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    replacements.forEach(({ from, to }) => {
      if (content.match(from)) {
        content = content.replace(from, to);
        modified = true;
      }
    });
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Updated: ${filePath}`);
    } else {
      console.log(`⏭️  No changes needed: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
  }
});

console.log('\n🎉 Dark mode update complete!');
