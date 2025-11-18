const fs = require('fs');

const files = [
  'src/app/returns/page.tsx',
  'src/app/refund-policy/page.tsx',
  'src/app/privacy-policy/page.tsx'
];

files.forEach(filePath => {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    // Main container
    content = content.replace(/className="min-h-screen bg-gray-50">/g, 'className="min-h-screen bg-gray-50 dark:bg-gray-950">');
    
    // Hero gradients - multiple patterns
    content = content.replace(/className="bg-gradient-to-r from-(\w+)-(\d+) to-(\w+)-(\d+) text-white/g, 
      (match, c1, n1, c2, n2) => `className="bg-gradient-to-r from-${c1}-${n1} to-${c2}-${n2} dark:from-${c1}-${parseInt(n1)+300} dark:to-${c2}-${parseInt(n2)+300} text-white`);
    
    // Cards - all patterns
    content = content.replace(/<Card className="p-(\d+)">/g, '<Card className="p-$1 dark:border-gray-700 dark:bg-gray-800">');
    content = content.replace(/<Card className="p-(\d+) mb-(\d+)">/g, '<Card className="p-$1 mb-$2 dark:border-gray-700 dark:bg-gray-800">');
    content = content.replace(/<Card className="p-(\d+) text-center">/g, '<Card className="p-$1 text-center dark:border-gray-700 dark:bg-gray-800">');
    
    // Colored cards
    content = content.replace(/className="p-(\d+) mb-(\d+) bg-(\w+)-50 border-(\w+)-200"/g, 
      'className="p-$1 mb-$2 bg-$3-50 dark:bg-$3-900/20 border-$4-200 dark:border-$4-800"');
    content = content.replace(/className="p-(\d+) bg-(\w+)-50 border-(\w+)-200"/g, 
      'className="p-$1 bg-$2-50 dark:bg-$2-900/20 border-$3-200 dark:border-$3-800"');
    
    // Icon backgrounds
    content = content.replace(/bg-(\w+)-100 w-12 h-12/g, 'bg-$1-100 dark:bg-$1-900/30 w-12 h-12');
    
    // Icon colors
    content = content.replace(/text-(\w+)-600" \/>/g, 'text-$1-600 dark:text-$1-400" />');
    
    // Text colors
    content = content.replace(/text-gray-900">/g, 'text-gray-900 dark:text-white">');
    content = content.replace(/text-gray-700">/g, 'text-gray-700 dark:text-gray-300">');
    content = content.replace(/text-gray-800">/g, 'text-gray-800 dark:text-gray-300">');
    content = content.replace(/className="text-gray-900 /g, 'className="text-gray-900 dark:text-white ');
    content = content.replace(/className="text-gray-700 /g, 'className="text-gray-700 dark:text-gray-300 ');
    content = content.replace(/className="text-gray-800 /g, 'className="text-gray-800 dark:text-gray-300 ');
    
    // Headings with flex/items
    content = content.replace(/className="([^"]*?)text-gray-900([^"]*?)flex/g, 'className="$1text-gray-900 dark:text-white$2flex');
    content = content.replace(/mb-(\d+) flex items-center">\s*<(\w+) className="h-(\d+) w-(\d+) mr-(\d+) text-(\w+)-600"/g,
      'mb-$1 flex items-center dark:text-white">\n                  <$2 className="h-$3 w-$4 mr-$5 text-$6-600 dark:text-$6-400"');
    
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Updated: ${filePath}`);
    } else {
      console.log(`⏭️  Already updated: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
  }
});

console.log('\n🎉 Batch dark mode update complete!');
