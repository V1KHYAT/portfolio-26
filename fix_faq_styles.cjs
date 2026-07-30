const fs = require("fs");
let html = fs.readFileSync("site/index.html", "utf8");

// Replace var(--swatch--beige-400) with #ffffff anywhere near accordion_css_item_bg
// There are two occurrences.
html = html.replace(/background-color:\s*var\(--swatch--beige-400\);/g, "background-color: #ffffff;");

fs.writeFileSync("site/index.html", html);
console.log("Updated FAQ hover styles");
