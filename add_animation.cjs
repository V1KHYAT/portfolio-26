const fs = require("fs");

let html = fs.readFileSync("site/index.html", "utf8");

const startIdx = html.indexOf('<section id="experience"');
const endIdx = html.indexOf('</section>', startIdx) + '</section>'.length;

if (startIdx !== -1 && endIdx !== -1) {
  let sectionHtml = html.substring(startIdx, endIdx);
  
  // Add data-highlight-text to all the <p class="u-text-style-main"> inside the experience section
  sectionHtml = sectionHtml.replace(/<p class="u-text-style-main"/g, '<p data-highlight-text="" class="u-text-style-main"');
  
  html = html.substring(0, startIdx) + sectionHtml + html.substring(endIdx);
  fs.writeFileSync("site/index.html", html);
  console.log("Successfully added data-highlight-text attribute to Experience descriptions.");
} else {
  console.log("Could not find Experience section.");
}
