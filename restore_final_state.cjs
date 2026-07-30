const fs = require('fs');
const cheerio = require('cheerio');

let html = fs.readFileSync('site/index.html', 'utf8');

// 1. Fix bundle.js and styles.css references
html = html.replace(/https:\/\/cdn\.odyn\.dev\/p\/3pc9\/bundle\.js/g, 'js/bundle.js');
html = html.replace(/css\/bym0n0l0g\.webflow\.shared\.e9a9b6790\.min\.css/g, 'css/styles.css');

// 2. Add the Experience section stub before the FAQs section
if (!html.includes('<section id="experience"')) {
    const faqIdx = html.indexOf('<section id="faqs"');
    if (faqIdx !== -1) {
        const experienceStub = `<section id="experience"></section>\n`;
        html = html.substring(0, faqIdx) + experienceStub + html.substring(faqIdx);
    }
}

fs.writeFileSync('site/index.html', html, 'utf8');
console.log("Restored CSS/JS references and injected Experience stub.");
