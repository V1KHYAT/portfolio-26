const fs = require('fs');
const html = fs.readFileSync('site/index.html', 'utf8');
const listStart = html.indexOf('<div role="list" class="works_home_list w-dyn-items">');
const listEnd = html.indexOf('</div>', html.lastIndexOf('works_home_item'));
console.log('List starts at:', listStart);
