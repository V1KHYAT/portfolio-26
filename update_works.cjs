const fs = require("fs");
let html = fs.readFileSync("site/index.html", "utf8");

const workSectionStart = html.indexOf('<section id="work"');
let currentIndex = html.indexOf('class="works_home_item w-dyn-item"', workSectionStart);

// Find 5th occurrence
for (let i = 1; i < 5; i++) {
  currentIndex = html.indexOf('class="works_home_item w-dyn-item"', currentIndex + 1);
}

if (currentIndex !== -1) {
  const divStart = html.lastIndexOf('<div', currentIndex);
  
  // Find <div class="works_home_cta">
  const ctaStart = html.indexOf('<div class="works_home_cta">', divStart);
  
  // The exact end of the 5th item is before the first closing </div> that belongs to the wrappers
  // Let's just use regex to find the end of the item. 
  // It ends with <p class="works_home_result_label u-text-style-main w-dyn-bind-empty"></p>\s*</div></div></a>\s*</div>
  const match = html.substring(divStart).match(/<\/p>\s*<\/div><\/div><\/a>\s*<\/div>/);
  
  if (match) {
    const itemEnd = divStart + match.index + match[0].length;
    html = html.substring(0, divStart) + html.substring(itemEnd);
    console.log("Successfully removed 5th project.");
  } else {
    console.log("Could not find end of 5th project with regex");
  }
}

fs.writeFileSync("site/index.html", html);
