const fs = require("fs");

let html = fs.readFileSync("site/index.html", "utf8");

const startIdx = html.indexOf('<section class="cta_home_wrap">');
if (startIdx !== -1) {
  const endIdx = html.indexOf('</section>', startIdx) + '</section>'.length;
  html = html.substring(0, startIdx) + html.substring(endIdx);
  fs.writeFileSync("site/index.html", html);
  console.log("Successfully removed cta_home_wrap section.");
} else {
  console.log("Section not found.");
}
