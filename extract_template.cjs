const fs = require('fs');
const html = fs.readFileSync('site/index.html', 'utf8');

const listStart = html.indexOf('<div role="list" class="works_home_list w-dyn-items">');
const listEnd = html.indexOf('</div>', html.indexOf('<div role="listitem" class="works_home_item w-dyn-item">', html.indexOf('<div role="listitem" class="works_home_item w-dyn-item">', html.indexOf('<div role="listitem" class="works_home_item w-dyn-item">') + 1) + 1));
// It's better to just regex the works_home_item
const matches = html.match(/<div role="listitem" class="works_home_item w-dyn-item">[\s\S]*?<\/a>\s*<\/div>/g);
if (matches) {
    console.log(matches[0]);
} else {
    console.log("Not found");
}
