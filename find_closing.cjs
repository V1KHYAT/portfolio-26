const fs = require("fs");
const html = fs.readFileSync("site/index.html", "utf8");

// Try to parse using a simple tag counter to find where page_wrap ends
function findClosingTag(html, startIndex) {
  let depth = 0;
  let i = startIndex;
  
  while (i < html.length) {
    if (html.substring(i, i + 4) === '<div') {
      depth++;
      i += 4;
    } else if (html.substring(i, i + 5) === '</div') {
      depth--;
      if (depth === 0) {
        return i;
      }
      i += 5;
    } else {
      i++;
    }
  }
  return -1;
}

const pageWrapStart = html.indexOf('<div data-barba-namespace="home" data-barba="container" class="page_wrap">');
const pageWrapEnd = findClosingTag(html, pageWrapStart);

console.log("pageWrapEnd:", pageWrapEnd);
const faqStart = html.indexOf('<section id="faqs"');
console.log("faqStart:", faqStart);
