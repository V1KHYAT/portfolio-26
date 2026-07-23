const fs = require('fs');
const html = fs.readFileSync('site/index.html', 'utf-8');
const scriptTags = html.match(/<script[^>]*>.*?<\/script>/g) || [];
console.log(scriptTags.map(tag => tag.substring(0, 100)).join('\n'));
