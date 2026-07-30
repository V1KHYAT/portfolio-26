const fs = require("fs");
let html = fs.readFileSync("site/index.html", "utf8");

const oldCss = `  .reel_home_cover {
    z-index: 10 !important;
    position: absolute !important;
    top: 0; left: 0; width: 100%; height: 100%;
  }`;

const newCss = `  .reel_home_cover {
    z-index: 10 !important;
    position: absolute !important;
    top: 0; left: 0; width: 100%; height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none; /* Let hover pass through */
  }`;

html = html.replace(oldCss, newCss);

const oldHoverCss = `  .hover-slideshow {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
  }`;

const newHoverCss = `  .hover-slideshow {
    position: relative;
    width: 95%;
    aspect-ratio: 3 / 2;
    border-radius: var(--radius--small);
    overflow: hidden;
  }`;

html = html.replace(oldHoverCss, newHoverCss);

fs.writeFileSync("site/index.html", html, "utf8");
console.log("Fixed hover size and layout");
