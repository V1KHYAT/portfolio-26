const fs = require("fs");
let html = fs.readFileSync("site/index.html", "utf8");

html = html.replace("aspect-ratio: 3 / 2;", "aspect-ratio: 3 / 2;\n        height: auto !important;");

fs.writeFileSync("site/index.html", html, "utf8");
console.log("Fixed hover height");
