const fs = require('fs');

const files = ['site/index.html', 'site/work.html', 'site/play.html'];

for (const file of files) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');

    // Regex to match the entire IIFE script that loads bundle.js
    const regex = /<script>\s*\(\s*function\s*\(\)\s*\{[\s\S]*?var\s+isStaging[\s\S]*?\}\s*\)\(\);\s*<\/script>/;

    if (regex.test(content)) {
      content = content.replace(regex, '<script src="js/bundle.js"></script>');
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Replaced dynamic bundle.js loader in ${file}`);
    } else {
      console.log(`No dynamic loader found in ${file} or already replaced.`);
    }
  }
}
