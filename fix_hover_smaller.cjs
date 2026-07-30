const fs = require("fs");
let html = fs.readFileSync("site/index.html", "utf8");

const oldHoverCss = `  .hover-slideshow {
    position: relative;
    width: 95%;
    aspect-ratio: 3 / 2;
    border-radius: var(--radius--small);
    overflow: hidden;
  }`;

const newHoverCss = `  .hover-slideshow {
    position: relative;
    width: 75%;
    aspect-ratio: 3 / 2;
    border-radius: var(--radius--small);
    overflow: hidden;
  }`;

html = html.replace(oldHoverCss, newHoverCss);

fs.writeFileSync("site/index.html", html, "utf8");
console.log("Made hover slideshow smaller");
