const fs = require('fs');
const bundle = fs.readFileSync('site/js/bundle.js', 'utf8');

const functionsToFind = ['bt', 'wt', 'St', 'He', 'vt', 'yt', 'xt'];

for (const fnName of functionsToFind) {
  const regex = new RegExp(`function ${fnName}\\([^)]*\\)\\{.*?\\}(?=function|var|let|const|window)`, 'gs');
  const match = bundle.match(regex);
  if (match) {
    console.log(`--- ${fnName} ---`);
    console.log(match[0].substring(0, 500) + '...');
  }
}
