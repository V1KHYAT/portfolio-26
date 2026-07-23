const fs = require('fs');
let html = fs.readFileSync('site/index.html', 'utf-8');

const listStartStr = '<div role="list" class="services_home_service-list w-dyn-items">';
const listStart = html.indexOf(listStartStr);

if (listStart !== -1) {
  let openTags = 0;
  let listEnd = listStart;
  for (let i = listStart; i < html.length; i++) {
    if (html.slice(i, i + 4) === '<div') openTags++;
    if (html.slice(i, i + 5) === '</div') {
      openTags--;
      if (openTags === 0) {
        listEnd = i + 6;
        break;
      }
    }
  }

  const skills = [
    'UX/UI Design',
    'AI Workflows',
    'Game UX & Systems',
    'Psychology & Behavior'
  ];

  let newItems = '<div role="list" class="services_home_service-list w-dyn-items">';
  for (const s of skills) {
    newItems += `
                      <div data-content-trigger="" role="listitem" class="services_home_service_item w-dyn-item">
                        <div class="services_home_service_image" style="background-color: var(--swatch--black-100); width: 100%; height: 100%; position: absolute; top: 0; left: 0;"></div>
                        <h2 class="services_home_heading u-text-style-h2" style="color: var(--swatch--black-400); mix-blend-mode: normal;">
                          ${s}
                        </h2>
                      </div>`;
  }
  newItems += '</div>';

  const newHtml = html.substring(0, listStart) + newItems + html.substring(listEnd);
  fs.writeFileSync('site/index.html', newHtml);
  console.log('Successfully updated services section!');
} else {
  console.log('Could not find list start.');
}
