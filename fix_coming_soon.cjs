const fs = require("fs");
let html = fs.readFileSync("site/index.html", "utf8");

const oldHtml = `<div class="reel_home_video">
          <img src="images/The SaaS Dream/ComingSoon.png" class="u-cover-absolute" style="object-fit: cover;">
        </div>`;
const newHtml = `<div class="reel_home_video hover-slideshow">
          <img src="images/The SaaS Dream/ComingSoon.png" class="u-cover-absolute" style="object-fit: cover;">
        </div>`;

html = html.replace(oldHtml, newHtml);
fs.writeFileSync("site/index.html", html, "utf8");
console.log("Fixed Coming Soon container");
