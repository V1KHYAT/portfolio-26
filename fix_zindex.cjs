const fs = require("fs");
let html = fs.readFileSync("site/index.html", "utf8");

const css = `
  /* Reduce crop on Featured Projects */
  .works_home_cover.u-ratio-1-1 {
    aspect-ratio: 4 / 3 !important;
  }
  body .works_home_image {
    transform: scale(1.05);
  }
  
  .reel_home_cover {
    z-index: 10 !important;
  }
  
  .hover-slideshow img.slide {
    animation-play-state: paused;
  }
  
  .works_home_item:hover .hover-slideshow img.slide {
    animation-play-state: running;
  }
`;

html = html.replace(/\/\* Reduce crop on Featured Projects \*\/[\s\S]*?transform: scale\(1\.05\);\s*\}/, css);
fs.writeFileSync("site/index.html", html, "utf8");
console.log("Fixed z-index and animation play state");
