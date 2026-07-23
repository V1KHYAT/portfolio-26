const fs = require('fs');
const path = require('path');

const cssPath = path.join(process.cwd(), 'site', 'css', 'bym0n0l0g.webflow.shared.e9a9b6790.min.css');
let css = fs.readFileSync(cssPath, 'utf-8');

// The goal: Force all dark backgrounds to become light, and all light text to become dark.
// Leave everything else (including already light sections) alone.

const replacements = [
  // 1. Backgrounds
  ['background-color:var(--swatch--black-400)', 'background-color:var(--swatch--beige-100)'],
  ['background-color:var(--swatch--black-300)', 'background-color:var(--swatch--beige-300)'],
  ['background-color:var(--swatch--card-bg)', 'background-color:var(--swatch--beige-100)'],
  ['background:var(--swatch--black-400)', 'background:var(--swatch--beige-100)'],

  // 2. Borders
  ['border-color:var(--swatch--black-300)', 'border-color:var(--swatch--beige-400)'],
  ['border-color:var(--swatch--black-400)', 'border-color:var(--swatch--beige-100)'],

  // 3. Text Colors (Only replace beige/white text with black text)
  ['color:var(--swatch--beige-100)', 'color:var(--swatch--black-400)'],
  ['color:var(--swatch--beige-100-2)', 'color:var(--swatch--black-400)'],
  ['color:var(--swatch--beige-300)', 'color:var(--swatch--black-300)'],
  
  // 4. Specific known hardcoded strings in this CSS file
  ['--_theme---background:var(--swatch--black-400)', '--_theme---background:var(--swatch--beige-100)'],
  ['--_theme---background:var(--swatch--black-300)', '--_theme---background:var(--swatch--beige-300)'],
  ['--_theme---text:var(--swatch--beige-100)', '--_theme---text:var(--swatch--black-400)'],
  ['--_theme---text:var(--swatch--beige-300)', '--_theme---text:var(--swatch--black-300)'],

  // 5. The hero gradient
  ['linear-gradient(180deg,#0000,var(--swatch--black-400))', 'linear-gradient(180deg,#0000,var(--swatch--beige-100))']
];

for (const [from, to] of replacements) {
  css = css.split(from).join(to);
}

// Special regex for variables with hashes attached to them, e.g. var(--swatch--beige-100-2-34983)
css = css.replace(/color:var\(--swatch--beige-100[^)]*\)/g, 'color:var(--swatch--black-400)');
css = css.replace(/--_theme---text:var\(--swatch--beige-100[^)]*\)/g, '--_theme---text:var(--swatch--black-400)');

fs.writeFileSync(cssPath, css, 'utf-8');
console.log('CSS perfectly converted to full light mode!');
