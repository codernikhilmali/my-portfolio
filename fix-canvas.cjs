const fs = require('fs');

const files = [
  'src/components/ui/CodeBackground.tsx',
  'src/components/ui/HexGridBackground.tsx',
  'src/components/ui/NetworkBackground.tsx',
  'src/components/ui/StarfieldBackground.tsx',
  'src/components/ui/AnimatedBackground.tsx'
];

const helper = `
const getThemeColor = () => {
  const theme = document.documentElement.getAttribute("data-theme") || "blue";
  const colors: Record<string, {r:number,g:number,b:number}> = {
    blue: { r: 59, g: 130, b: 246 },
    emerald: { r: 16, g: 185, b: 129 },
    purple: { r: 168, g: 85, b: 247 },
    rose: { r: 244, g: 63, b: 94 },
    amber: { r: 245, g: 158, b: 11 }
  };
  return colors[theme] || colors.blue;
};
`;

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');

  if (!content.includes('getThemeColor')) {
    // Insert helper after imports
    content = content.replace(/(import.*?;)/s, `$1\n${helper}`);
  }

  // Replace rgba(59, 130, 246, alpha) with rgba(c.r, c.g, c.b, alpha)
  // For CodeBackground.tsx
  content = content.replace(/rgba\(59,\s*130,\s*246,\s*0\.4\)/g, '`rgba(${c.r}, ${c.g}, ${c.b}, 0.4)`');
  content = content.replace(/rgba\(96,\s*165,\s*250,\s*0\.8\)/g, '`rgba(${c.r}, ${c.g}, ${c.b}, 0.8)`');
  content = content.replace(/rgba\(59,\s*130,\s*246,\s*0\.25\)/g, '`rgba(${c.r}, ${c.g}, ${c.b}, 0.25)`');
  
  // For HexGridBackground.tsx
  content = content.replace(/rgba\(59,\s*130,\s*246,\s*\$\{alpha\}\)/g, 'rgba(${c.r}, ${c.g}, ${c.b}, ${alpha})');
  
  // For NetworkBackground.tsx
  content = content.replace(/rgba\(96,\s*165,\s*250,\s*0\.4\)/g, '`rgba(${c.r}, ${c.g}, ${c.b}, 0.4)`');
  content = content.replace(/rgba\(59,\s*130,\s*246,\s*\$\{0\.15\s*\*\s*\(1\s*-\s*distance\s*\/\s*maxDistance\)\}\)/g, 'rgba(${c.r}, ${c.g}, ${c.b}, ${0.15 * (1 - distance / maxDistance)})');
  
  // For StarfieldBackground.tsx
  content = content.replace(/rgba\(147,\s*197,\s*253,\s*\$\{intensity\}\)/g, 'rgba(${c.r}, ${c.g}, ${c.b}, ${intensity})');

  // Insert const c = getThemeColor(); inside the draw loop or before using it
  // Actually it's easier to just do it inline or replace with getThemeColor() directly.
  content = content.replace(/\$\{c\.r\}/g, '${getThemeColor().r}');
  content = content.replace(/\$\{c\.g\}/g, '${getThemeColor().g}');
  content = content.replace(/\$\{c\.b\}/g, '${getThemeColor().b}');

  fs.writeFileSync(file, content);
});

console.log("Canvas backgrounds themed successfully");
