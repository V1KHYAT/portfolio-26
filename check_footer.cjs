const fs = require("fs");
const css = fs.readFileSync("site/css/bym0n0l0g.webflow.shared.e9a9b6790.min.css", "utf8");
const match = css.match(/\.footer_wrap_main\{[^}]+\}/);
console.log(match ? match[0] : "Not found");
