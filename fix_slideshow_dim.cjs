const fs = require("fs");
let html = fs.readFileSync("site/index.html", "utf8");

html = html.replace('.hover-slideshow {', '.hover-slideshow {\n    position: absolute;\n    top: 0; left: 0; width: 100%; height: 100%;');
fs.writeFileSync("site/index.html", html, "utf8");
console.log("Fixed hover-slideshow dimensions");
