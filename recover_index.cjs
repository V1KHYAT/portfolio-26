const fs = require("fs");
let html = fs.readFileSync("site/index.html", "utf8");

// 1. Remove the aspect-ratio: 4/3 that messed up the static thumbnail ratio
html = html.replace(/\.works_home_cover\.u-ratio-1-1\s*\{\s*aspect-ratio:\s*4\s*\/\s*3\s*!important;\s*\}/, "");

// 2. Remove Services and Process sections from index.html (they are already in work.html and play.html)
function extractSection(html, startPattern, endPatternOrTag) {
    const startIdx = html.indexOf(startPattern);
    if (startIdx === -1) return { section: null, remainder: html };
    let searchFrom = startIdx + startPattern.length;
    const endIdx = html.indexOf("</section>", searchFrom);
    if (endIdx !== -1) {
        const fullEndIdx = endIdx + "</section>".length;
        const sectionHTML = html.substring(startIdx, fullEndIdx);
        const remainderHTML = html.substring(0, startIdx) + html.substring(fullEndIdx);
        return { section: sectionHTML, remainder: remainderHTML };
    }
    return { section: null, remainder: html };
}

html = extractSection(html, '<section id="services"').remainder;
html = extractSection(html, '<section id="process"').remainder;

// 3. Update Nav Links to point to the correct pages
html = html.replace(/href="\/"/g, 'href="index.html"');
html = html.replace(/href="\/projects"/g, 'href="work.html"');
html = html.replace(/href="\/play"/g, 'href="play.html"');

fs.writeFileSync("site/index.html", html);
console.log("Recovered sections, nav links, and fixed thumbnail aspect ratio.");
