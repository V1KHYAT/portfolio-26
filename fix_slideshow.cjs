const fs = require("fs");
let html = fs.readFileSync("site/index.html", "utf8");

const badCss = `  .hover-slideshow {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    position: relative;
    width: 100%;
    height: 100%;
  }`;
  
const goodCss = `  .hover-slideshow {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
  }`;

html = html.replace(badCss, goodCss);
fs.writeFileSync("site/index.html", html, "utf8");
console.log("Fixed hover-slideshow position");
