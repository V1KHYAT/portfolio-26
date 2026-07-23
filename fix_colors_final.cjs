const fs = require('fs');
const originalPath = '../bymonolog-clone/site/css/bym0n0l0g.webflow.shared.e9a9b6790.min.css';
const targetPath = 'site/css/bym0n0l0g.webflow.shared.e9a9b6790.min.css';

let css = fs.readFileSync(originalPath, 'utf-8');

// Replace backgrounds
css = css.replace(/background-color:var\(--swatch--black-400\)/g, 'background-color:var(--swatch--beige-100)');
css = css.replace(/background-color:#000(?![\da-fA-F])/gi, 'background-color:var(--swatch--beige-100)');
css = css.replace(/background-color:#080807(?![\da-fA-F])/gi, 'background-color:var(--swatch--beige-100)');

// Replace text colors carefully
css = css.replace(/(?<!-|\w)color:var\(--swatch--beige-100\)/g, 'color:var(--swatch--black-400)');
css = css.replace(/(?<!-|\w)color:var\(--swatch--beige-100-2[^\)]*\)/g, 'color:var(--swatch--black-400)');
css = css.replace(/(?<!-|\w)color:#fcfcfc(?![\da-fA-F])/gi, 'color:var(--swatch--black-400)');

// Fix the u-theme-dark CSS custom properties
css = css.replace(/--_theme---background:var\(--swatch--black-400\)/g, '--_theme---background:var(--swatch--beige-100)');
css = css.replace(/--_theme---text:var\(--swatch--beige-100-2[^\)]*\)/g, '--_theme---text:var(--swatch--black-400)');
css = css.replace(/--_theme---heading-accent:var\(--swatch--beige-400\)/g, '--_theme---heading-accent:var(--swatch--black-300)'); // make heading accents dark
css = css.replace(/--_theme---background-2:var\(--swatch--black-300\)/g, '--_theme---background-2:var(--swatch--beige-200)');
css = css.replace(/--_theme---border:var\(--swatch--black-300\)/g, '--_theme---border:var(--swatch--beige-300)');
css = css.replace(/--_theme---selection--text:var\(--swatch--black-400\)/g, '--_theme---selection--text:var(--swatch--beige-100)'); // when selected, light text

// Also, the global variables! There might be inline styles in JS or HTML, but CSS handles most.
// Replace any remaining global background properties if they exist
css = css.replace(/background-color:var\(--_theme---background\)/g, 'background-color:var(--_theme---background)');

fs.writeFileSync(targetPath, css);
console.log('Fixed CSS custom variables!');
