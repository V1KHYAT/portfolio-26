const fs = require("fs");

let html = fs.readFileSync("site/index.html", "utf8");

const startIdx = html.indexOf('<section id="experience"');
const endIdx = html.indexOf('</section>', startIdx) + '</section>'.length;

if (startIdx !== -1 && endIdx !== -1) {
  let sectionHtml = html.substring(startIdx, endIdx);
  
  // Revert data-split-text back to data-highlight-text for the animation
  sectionHtml = sectionHtml.replace(/data-split-text=""/g, 'data-highlight-text=""');
  
  // Make company name and duration fully black (remove opacity)
  sectionHtml = sectionHtml.replace(/opacity:\s*0\.85;/g, 'opacity: 1;');
  
  html = html.substring(0, startIdx) + sectionHtml + html.substring(endIdx);
  fs.writeFileSync("site/index.html", html);
  console.log("Successfully reverted to data-highlight-text and set company text to fully black.");
} else {
  console.log("Could not find Experience section.");
}
