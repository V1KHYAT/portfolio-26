const fs = require("fs");
let html = fs.readFileSync("site/index.html", "utf8");

// Fix z-index
html = html.replace('z-index: 1 !important;', 'z-index: 10 !important;');

// Fix hover color
// There are multiple instances of `var(--swatch--beige-100)` inside the `.faq_css` block
// We want to replace it specifically in the active and hover states for `.accordion_css_item_bg`
html = html.replace(/& \.accordion_css_item_bg {\s*background-color: var\(--swatch--beige-100\);\s*}/g, '& .accordion_css_item_bg {\n                            background-color: var(--swatch--beige-400);\n                          }');

fs.writeFileSync("site/index.html", html);
console.log("Fixed FAQ styling");
