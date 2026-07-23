const fs = require('fs');
const originalPath = '../bymonolog-clone/site/css/bym0n0l0g.webflow.shared.e9a9b6790.min.css';
const targetPath = 'site/css/bym0n0l0g.webflow.shared.e9a9b6790.min.css';

let css = fs.readFileSync(originalPath, 'utf-8');

// 1. Force all theme variables to be LIGHT theme (regardless of .u-theme-dark or .u-theme-light)
css = css.replace(/--_theme---background:var\(--swatch--black-400\)/g, '--_theme---background:var(--swatch--beige-100)');
css = css.replace(/--_theme---background:var\(--swatch--black-300\)/g, '--_theme---background:var(--swatch--beige-200)');
css = css.replace(/--_theme---background:var\(--swatch--card-bg\)/g, '--_theme---background:var(--swatch--beige-100)');

css = css.replace(/--_theme---text:var\(--swatch--beige-[^\)]*\)/g, '--_theme---text:var(--swatch--black-400)');

css = css.replace(/--_theme---background-2:var\(--swatch--black-[^\)]*\)/g, '--_theme---background-2:var(--swatch--beige-200)');
css = css.replace(/--_theme---heading-accent:var\(--swatch--beige-[^\)]*\)/g, '--_theme---heading-accent:var(--swatch--black-300)');
css = css.replace(/--_theme---border:var\(--swatch--black-[^\)]*\)/g, '--_theme---border:var(--swatch--beige-300)');

css = css.replace(/--_theme---selection--background:var\(--swatch--black-[^\)]*\)/g, '--_theme---selection--background:var(--swatch--beige-300)');
css = css.replace(/--_theme---selection--text:var\(--swatch--beige-[^\)]*\)/g, '--_theme---selection--text:var(--swatch--black-400)');

css = css.replace(/--_theme---button-primary--background:var\(--swatch--beige-[^\)]*\)/g, '--_theme---button-primary--background:var(--swatch--black-400)');

// 2. Change root brand-text so anything referencing it becomes black
css = css.replace(/--swatch--brand-text:var\(--swatch--beige-[^\)]*\)/g, '--swatch--brand-text:var(--swatch--black-400)');

// 3. Change hardcoded dark backgrounds to light
css = css.replace(/background-color:var\(--swatch--black-[^\)]*\)/gi, 'background-color:var(--swatch--beige-100)');
css = css.replace(/background-color:var\(--swatch--card-bg\)/gi, 'background-color:var(--swatch--beige-100)');
css = css.replace(/background-color:#000(?![\da-fA-F])/gi, 'background-color:var(--swatch--beige-100)');
css = css.replace(/background-color:#080807(?![\da-fA-F])/gi, 'background-color:var(--swatch--beige-100)');

// 4. Change hardcoded light text to dark
css = css.replace(/(?<!-|\w)color:var\(--swatch--beige-[^\)]*\)/gi, 'color:var(--swatch--black-400)');
css = css.replace(/(?<!-|\w)color:#fff(?![\da-fA-F])/gi, 'color:var(--swatch--black-400)');
css = css.replace(/(?<!-|\w)color:#fcfcfc(?![\da-fA-F])/gi, 'color:var(--swatch--black-400)');
css = css.replace(/(?<!-|\w)color:#e8e8e3(?![\da-fA-F])/gi, 'color:var(--swatch--black-400)');

fs.writeFileSync(targetPath, css);
console.log('CSS transformed to pure light mode, handling brand-text and all themes!');
