const fs = require("fs");

const pages = ["site/index.html", "site/play.html", "site/work.html"];
pages.forEach(file => {
  let html = fs.readFileSync(file, "utf8");
  
  html = html.replace(/bymonolog\.com/gi, "vikhyat.com");
  html = html.replace(/MONOLOG/g, "Vikhyat");
  html = html.replace(/monolog/g, "vikhyat");
  html = html.replace(/Huy/g, "Vikhyat");
  
  fs.writeFileSync(file, html);
});

console.log("Replaced all Monolog references with Vikhyat!");
