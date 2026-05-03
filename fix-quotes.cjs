const fs = require('fs');

const files = [
  'src/components/ui/CodeBackground.tsx',
  'src/components/ui/NetworkBackground.tsx',
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');

  // Replace "`rgba(..." with `rgba(...`
  content = content.replace(/"`rgba/g, '`rgba');
  // Replace `"` with `
  content = content.replace(/`"/g, '`');

  fs.writeFileSync(file, content);
});

console.log("Fixed quotes");
