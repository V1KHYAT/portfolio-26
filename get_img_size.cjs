const fs = require("fs");
// Since we don't have an image parser, we can just search the CSS again for object-fit: cover
const css = fs.readFileSync("site/css/bym0n0l0g.webflow.shared.e9a9b6790.min.css", "utf8");
console.log(css.includes("object-fit:cover") || css.includes("object-fit: cover"));
