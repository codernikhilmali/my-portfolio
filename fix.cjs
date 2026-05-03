const fs = require('fs');
let css = fs.readFileSync('src/styles/theme.css', 'utf8');

// Replace hex colors
css = css.replace(/#3b82f6/g, 'var(--theme-500)');
css = css.replace(/#60a5fa/g, 'var(--theme-400)');
css = css.replace(/#2563eb/g, 'var(--theme-600)');
css = css.replace(/#1d4ed8/g, 'var(--theme-700)');
css = css.replace(/#93c5fd/g, 'var(--theme-300)');

// Replace rgba(59,130,246, alpha) -> color-mix(in srgb, var(--theme-500) alpha*100%, transparent)
css = css.replace(/rgba\(59\s*,\s*130\s*,\s*246\s*,\s*([\d.]+)\)/g, (match, p1) => {
  return `color-mix(in srgb, var(--theme-500) ${parseFloat(p1)*100}%, transparent)`;
});

// rgba(96,165,250, alpha)
css = css.replace(/rgba\(96\s*,\s*165\s*,\s*250\s*,\s*([\d.]+)\)/g, (match, p1) => {
  return `color-mix(in srgb, var(--theme-400) ${parseFloat(p1)*100}%, transparent)`;
});

// rgba(147,197,253, alpha)
css = css.replace(/rgba\(147\s*,\s*197\s*,\s*253\s*,\s*([\d.]+)\)/g, (match, p1) => {
  return `color-mix(in srgb, var(--theme-300) ${parseFloat(p1)*100}%, transparent)`;
});

// radial gradients for bg-app-theme
css = css.replace(/rgba\(30,\s*100,\s*255,\s*0\.12\)/g, 'color-mix(in srgb, var(--theme-500) 12%, transparent)');
css = css.replace(/rgba\(120,\s*40,\s*255,\s*0\.15\)/g, 'color-mix(in srgb, var(--theme-600) 15%, transparent)');
css = css.replace(/rgba\(0,\s*180,\s*255,\s*0\.12\)/g, 'color-mix(in srgb, var(--theme-400) 12%, transparent)');
css = css.replace(/rgba\(100,\s*180,\s*255,\s*0\.14\)/g, 'color-mix(in srgb, var(--theme-400) 14%, transparent)');

fs.writeFileSync('src/styles/theme.css', css);
console.log("Replaced colors successfully");
