const fs = require('fs');
const originalPath = '../bymonolog-clone/site/css/bym0n0l0g.webflow.shared.e9a9b6790.min.css';
const targetPath = 'site/css/bym0n0l0g.webflow.shared.e9a9b6790.min.css';

let css = fs.readFileSync(originalPath, 'utf-8');

// Invert the root variables (just replacing the HEX values!)
css = css.replace(/--swatch--black-400:#080807/g, '--swatch--black-400:#e8e8e3'); // Make black a light beige
css = css.replace(/--swatch--black-300:#393632/g, '--swatch--black-300:#ddddd5'); // Lighten
css = css.replace(/--swatch--black-200:#524d47/g, '--swatch--black-200:#d1d1c7'); // Lighten
css = css.replace(/--swatch--black-100:#6b645c/g, '--swatch--black-100:#bfbfb1'); // Lighten
css = css.replace(/--swatch--card-bg:#181715/g, '--swatch--card-bg:#e8e8e3'); // Make card bg light
css = css.replace(/--swatch--black-50:#938f8a/g, '--swatch--black-50:#d1d1c7'); // Lighten

css = css.replace(/--swatch--beige-100:#e8e8e3/g, '--swatch--beige-100:#080807'); // Make beige black
css = css.replace(/--swatch--beige-100-2([^\:]*):#fafaf9/g, '--swatch--beige-100-2$1:#181715'); // Make beige-100-2 dark
css = css.replace(/--swatch--beige-200:#ddddd5/g, '--swatch--beige-200:#393632'); // Darken
css = css.replace(/--swatch--beige-300:#d1d1c7/g, '--swatch--beige-300:#524d47'); // Darken
css = css.replace(/--swatch--beige-400:#bfbfb1/g, '--swatch--beige-400:#6b645c'); // Darken
css = css.replace(/--swatch--beige-600([^\:]*):#8c8c73/g, '--swatch--beige-600$1:#524d47'); // Darken

// Replace hardcoded darks carefully, ensuring not to hit transparent #0000
css = css.replace(/background-color:#000(?![\da-fA-F])/gi, 'background-color:#e8e8e3');
css = css.replace(/background-color:#080807(?![\da-fA-F])/gi, 'background-color:#e8e8e3');
css = css.replace(/(?<!-|\w)color:#fcfcfc(?![\da-fA-F])/gi, 'color:#080807');
css = css.replace(/(?<!-|\w)color:#fff(?![\da-fA-F])/gi, 'color:#080807');

fs.writeFileSync(targetPath, css);
console.log('CSS inverted perfectly!');
