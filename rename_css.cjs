const fs = require('fs');
const path = require('path');

const oldCssFile = 'site/css/bym0n0l0g.webflow.shared.e9a9b6790.min.css';
const newCssFile = 'site/css/styles.css';

if (fs.existsSync(oldCssFile)) {
  fs.renameSync(oldCssFile, newCssFile);
  console.log(`Renamed ${oldCssFile} to ${newCssFile}`);
}

const htmlFiles = ['site/index.html', 'site/work.html', 'site/play.html'];
htmlFiles.forEach(file => {
  if (fs.existsSync(file)) {
    let html = fs.readFileSync(file, 'utf8');
    html = html.replace(/css\/bym0n0l0g\.webflow\.shared\.e9a9b6790\.min\.css/g, 'css/styles.css');
    fs.writeFileSync(file, html, 'utf8');
    console.log(`Updated CSS reference in ${file}`);
  }
});
