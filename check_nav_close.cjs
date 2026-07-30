const fs = require("fs");
const html = fs.readFileSync("site/index.html", "utf8");

const navStart = html.indexOf('<header class="navbar_wrap">');
const navEnd = html.indexOf('</header>', navStart);
console.log("Nav Start:", navStart);
console.log("Nav End:", navEnd);
