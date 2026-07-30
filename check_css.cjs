const fs = require("fs");
const css = fs.readFileSync("site/css/bym0n0l0g.webflow.shared.e9a9b6790.min.css", "utf8");
console.log(".u-cover-absolute:", css.match(/\.u-cover-absolute\{[^}]+\}/)?.[0]);
