const fs = require("fs");
const css = fs.readFileSync("site/css/bym0n0l0g.webflow.shared.e9a9b6790.min.css", "utf8");
let match = css.match(/img\{[^}]+\}/);
console.log("img:", match ? match[0] : "Not found");
match = css.match(/video\{[^}]+\}/);
console.log("video:", match ? match[0] : "Not found");
