const fs = require("fs");

function processFile(file) {
    let html = fs.readFileSync(file, "utf8");
    if (html.includes("</footer>") && !html.includes("</div>\n            </footer>")) {
        html = html.replace("</footer>", "</div>\n            </footer>");
        fs.writeFileSync(file, html, "utf8");
        console.log(`Added missing </div> before </footer> in ${file}`);
    }
}

["site/index.html", "site/work.html", "site/play.html"].forEach(processFile);
