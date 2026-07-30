const fs = require("fs");

let html = fs.readFileSync("site/index.html", "utf8");

// Helper to extract a section from HTML string
function extractSection(html, startPattern, endPatternOrTag) {
    const startIdx = html.indexOf(startPattern);
    if (startIdx === -1) return { section: null, remainder: html };
    
    // Find the next <section> or <footer after this section's opening tag to denote the end
    // Or we could just find the matching closing </section> tag by counting
    let searchFrom = startIdx + startPattern.length;
    let depth = 1;
    let currentIndex = searchFrom;
    
    // A simple regex approach to find the closing tag for a section
    // Since these sections don't have nested <section> tags inside them (usually), we can just look for </section>
    const endIdx = html.indexOf("</section>", searchFrom);
    if (endIdx !== -1) {
        const fullEndIdx = endIdx + "</section>".length;
        const sectionHTML = html.substring(startIdx, fullEndIdx);
        const remainderHTML = html.substring(0, startIdx) + html.substring(fullEndIdx);
        return { section: sectionHTML, remainder: remainderHTML };
    }
    
    return { section: null, remainder: html };
}

// Extract Services
const servicesResult = extractSection(html, '<section id="services"');
const servicesHtml = servicesResult.section;
html = servicesResult.remainder;

// Extract Process
const processResult = extractSection(html, '<section id="process"');
const processHtml = processResult.section;
html = processResult.remainder;

// Function to update Nav Links
function updateNavLinks(content) {
    let newContent = content.replace(/href="\/"/g, 'href="index.html"');
    newContent = newContent.replace(/href="\/projects"/g, 'href="work.html"');
    newContent = newContent.replace(/href="\/play"/g, 'href="play.html"');
    return newContent;
}

// Generate work.html
let workPage = html;
// We need to remove all sections from work.html EXCEPT we inject servicesHtml
// Let's remove ALL sections from work.html, then inject servicesHtml before the footer.
// An easier way is to just find the start of the first section and the end of the last section.
// Actually, let's just strip sections one by one.
const sectionPatterns = [
    '<section data-animate="" data-theme-section="light"',
    '<section data-theme-section="light" data-stacking-cards-item="" data-slider=""',
    '<section data-theme-section="light" data-stacking-cards-item="" class="gap_home_wrap"',
    '<section id="work"',
    '<section id="experience"',
    '<section id="faqs"'
];

let workPageStripped = workPage;
sectionPatterns.forEach(pattern => {
    let res = extractSection(workPageStripped, pattern);
    if (res.section) workPageStripped = res.remainder;
});

// Now insert servicesHtml before the footer
const footerIdx = workPageStripped.indexOf('<footer');
workPage = workPageStripped.substring(0, footerIdx) + servicesHtml + "\n" + workPageStripped.substring(footerIdx);

// Generate play.html
let playPageStripped = html;
sectionPatterns.forEach(pattern => {
    let res = extractSection(playPageStripped, pattern);
    if (res.section) playPageStripped = res.remainder;
});

let playPage = playPageStripped.substring(0, footerIdx) + processHtml + "\n" + playPageStripped.substring(footerIdx);

// Update Nav Links in all files
html = updateNavLinks(html);
workPage = updateNavLinks(workPage);
playPage = updateNavLinks(playPage);

// Write files
fs.writeFileSync("site/index.html", html);
fs.writeFileSync("site/work.html", workPage);
fs.writeFileSync("site/play.html", playPage);

console.log("Successfully extracted sections and created work.html and play.html");
