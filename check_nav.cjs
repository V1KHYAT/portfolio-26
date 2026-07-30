const fs = require("fs");
const css = fs.readFileSync("site/css/bym0n0l0g.webflow.shared.e9a9b6790.min.css", "utf8");
const navMatch = css.match(/\.navbar_wrap\{[^}]+\}/);
console.log(navMatch ? navMatch[0] : "Not found");
