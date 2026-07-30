const fs = require("fs");
const html = fs.readFileSync("site/index.html", "utf8");

const pageWrapStart = html.indexOf('class="page_wrap"');
const faqStart = html.indexOf('class="faq_home_wrap');
const footerStart = html.indexOf('<footer');

console.log("pageWrapStart:", pageWrapStart);
console.log("faqStart:", faqStart);
console.log("footerStart:", footerStart);
