const fs = require("fs");
let html = fs.readFileSync("site/index.html", "utf8");

// 1. Replace SUCCESS STORIES and Success Stories
html = html.replace(/>\s*SUCCESS STORIES\s*<\/h2>/, '>\n                FEATURED PROJECTS\n              </h2>');
html = html.replace(/>\s*Success Stories\s*<\/div>/, '>\n                  Featured Projects\n                </div>');

// 2. Replace View All Stories
html = html.replace(/>\s*View All Stories\s*<\/div>/g, '>\n                View All Work\n              </div>');

fs.writeFileSync("site/index.html", html);
console.log("Renamed text labels");
