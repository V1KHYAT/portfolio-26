const fs = require("fs");
const files = fs.readdirSync("site/css").filter(f => f.endsWith(".css"));
for (let file of files) {
  const content = fs.readFileSync("site/css/" + file, "utf8");
  const regex = /\.reel_home_cover\{([^}]+)\}/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    console.log(`Found in ${file}:`, match[1]);
  }
}
