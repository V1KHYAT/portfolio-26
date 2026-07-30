const fs = require("fs");
const css = fs.readFileSync("site/css/bym0n0l0g.webflow.shared.e9a9b6790.min.css", "utf8");
let match = css.match(/\.works_home_cover\{[^}]+\}/);
console.log(".works_home_cover:", match ? match[0] : "Not found");
