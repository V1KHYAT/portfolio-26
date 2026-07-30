const fs = require('fs');
const html = fs.readFileSync('site/index.html', 'utf8');
const openDivs = (html.match(/<div\b/g) || []).length;
const closeDivs = (html.match(/<\/div>/g) || []).length;
console.log(`Open divs: ${openDivs}, Close divs: ${closeDivs}`);
