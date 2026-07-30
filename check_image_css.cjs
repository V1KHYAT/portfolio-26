const fs = require("fs");
const css = fs.readFileSync("site/css/bym0n0l0g.webflow.shared.e9a9b6790.min.css", "utf8");
let match = css.match(/\.works_home_image\{[^}]+\}/);
console.log(".works_home_image:", match ? match[0] : "Not found");
match = css.match(/\.g_visual_video\{[^}]+\}/);
console.log(".g_visual_video:", match ? match[0] : "Not found");
match = css.match(/\.u-cover-absolute\{[^}]+\}/);
console.log(".u-cover-absolute:", match ? match[0] : "Not found");
