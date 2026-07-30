const fs = require("fs");

let indexHTML = fs.readFileSync("site/index.html", "utf8");

function extractSection(html, startPattern, endPatternOrTag) {
    const startIdx = html.indexOf(startPattern);
    if (startIdx === -1) return { section: null, remainder: html };
    
    let searchFrom = startIdx + startPattern.length;
    const endIdx = html.indexOf(endPatternOrTag, searchFrom);
    if (endIdx !== -1) {
        const fullEndIdx = endIdx + endPatternOrTag.length;
        const sectionHTML = html.substring(startIdx, fullEndIdx);
        const remainderHTML = html.substring(0, startIdx) + html.substring(fullEndIdx);
        return { section: sectionHTML, remainder: remainderHTML };
    }
    
    return { section: null, remainder: html };
}

// Ensure the fixes CSS is injected first (if not already)
const fixesCss = `
  <style id="custom-fixes-css">
    .hover-slideshow {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      position: relative !important;
      width: 100% !important;
      height: auto !important;
      aspect-ratio: 3 / 2 !important;
    }
    .hover-slideshow img.slide {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      object-fit: cover !important;
      opacity: 0;
      animation: slideshow 2s infinite;
    }
    .hover-slideshow img.s1 { animation-delay: 0s; }
    .hover-slideshow img.s2 { animation-delay: 0.5s; }
    .hover-slideshow img.s3 { animation-delay: 1.0s; }
    .hover-slideshow img.s4 { animation-delay: 1.5s; }

    @keyframes slideshow {
      0%, 25% { opacity: 1; }
      25.01%, 100% { opacity: 0; }
    }

    .cta_home_wrap { display: none !important; }

    .works_home_item img[src*="ComingSoon"] {
      width: 100% !important;
      height: 100% !important;
      object-fit: cover !important;
      position: absolute !important;
      top: 0; left: 0;
    }

    .navbar_contain, .navbar_home_svg, .navbar_menu_span, .navbar_link, .footer_nav_span {
      color: var(--swatch--black-400) !important;
    }
    .navbar_wrap {
      visibility: visible !important;
      opacity: 1 !important;
    }

    .footer-wrap-dark, .footer_canvas_bottom {
      display: none !important;
    }
  </style>
`;

if (!indexHTML.includes('id="custom-fixes-css"')) {
    indexHTML = indexHTML.replace("</head>", fixesCss + "\n  </head>");
}

// Read the original un-split HTML to extract sections cleanly
let baseHTML = indexHTML; // Since it's HEAD~1, it has ALL sections

const sectionsToExtract = [
    { id: "services", pattern: '<section id="services"', end: '</section>' },
    { id: "process", pattern: '<section id="process"', end: '</section>' },
    { id: "work", pattern: '<section id="work"', end: '</section>' },
    { id: "experience", pattern: '<section id="experience"', end: '</section>' },
    { id: "faqs", pattern: '<section id="faqs"', end: '</section>' },
    { id: "gap1", pattern: '<section data-animate="" data-theme-section="light"', end: '</section>' },
    { id: "gap2", pattern: '<section data-theme-section="light" data-stacking-cards-item="" data-slider=""', end: '</section>' },
    { id: "gap3", pattern: '<section data-theme-section="light" data-stacking-cards-item="" class="gap_home_wrap"', end: '</section>' }
];

const extracted = {};

// We extract from baseHTML to populate extracted map
let currentHTML = baseHTML;
for (const sec of sectionsToExtract) {
    const res = extractSection(currentHTML, sec.pattern, sec.end);
    if (res.section) {
        extracted[sec.id] = res.section;
        currentHTML = res.remainder; // currentHTML has them removed
    }
}

// indexHTML should be currentHTML (which has all those sections removed)
indexHTML = currentHTML;

// For work.html, we start with currentHTML (which just has Hero, About, Footer)
// But we want to REMOVE Hero and About, and ADD Work, Experience, Services.
// Wait, the user said "keep about section and the hero on the index page", and "the work section into its own page and play section in its own page".
// We can just use the baseHTML structure but swap out the middle content.
const headerEnd = baseHTML.indexOf('</header>') + '</header>'.length;
const footerStart = baseHTML.indexOf('<footer');

const topPart = baseHTML.substring(0, headerEnd);
const bottomPart = baseHTML.substring(footerStart);

let workPage = topPart + "\n" + 
    (extracted["work"] || "") + "\n" + 
    (extracted["experience"] || "") + "\n" + 
    (extracted["services"] || "") + "\n" + 
    bottomPart;

let playPage = topPart + "\n" + 
    (extracted["process"] || "") + "\n" + 
    (extracted["faqs"] || "") + "\n" + 
    bottomPart;

function updateNavLinks(content) {
    let newContent = content.replace(/href="\/"/g, 'href="index.html"');
    newContent = newContent.replace(/href="\/projects"/g, 'href="work.html"');
    newContent = newContent.replace(/href="\/play"/g, 'href="play.html"');
    return newContent;
}

indexHTML = updateNavLinks(indexHTML);
workPage = updateNavLinks(workPage);
playPage = updateNavLinks(playPage);

fs.writeFileSync("site/index.html", indexHTML);
fs.writeFileSync("site/work.html", workPage);
fs.writeFileSync("site/play.html", playPage);

console.log("Fixed sections and regenerated pages correctly!");
