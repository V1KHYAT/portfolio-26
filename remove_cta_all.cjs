const fs = require("fs");
function removeCTA(file) {
    let html = fs.readFileSync(file, "utf8");
    const startIdx = html.indexOf('<section class="cta_home_wrap">');
    if (startIdx !== -1) {
        // Find the matching </section> safely by looking for the next section or footer
        const endIdx = html.indexOf('<footer', startIdx);
        if (endIdx !== -1) {
            html = html.substring(0, startIdx) + html.substring(endIdx);
            fs.writeFileSync(file, html);
            console.log("Successfully removed CTA from", file);
        }
    }
}
removeCTA("site/index.html");
removeCTA("site/work.html");
removeCTA("site/play.html");
