const fs = require('fs');
let html = fs.readFileSync('site/index.html', 'utf-8');

const listStartStr = '<div role="list" class="works_home_list w-dyn-items">';
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

  const projects = [
    {
      title: 'Samsung Prism Hackathon',
      desc: 'Agentic Travel Planning System designed under 24 Hours.',
      resultLabel: 'Hackathon',
      resultValue: 'Winner',
      index: '/01'
    },
    {
      title: 'Perplexity Redesign',
      desc: 'A simple and effective redesign of Perplexity based on studies of Cognitive Ergonomics.',
      resultLabel: 'Case Study',
      resultValue: 'UX/UI',
      index: '/02'
    },
    {
      title: 'CoLab',
      desc: 'A simple Figma Extension for Group Projects and Corporates.',
      resultLabel: 'Tool Build',
      resultValue: 'Figma',
      index: '/03'
    },
    {
      title: 'Why Opening Up Is Hard',
      desc: 'A behavioral study of emotional vulnerability in Gen Z students.',
      resultLabel: 'Research',
      resultValue: 'Study',
      index: '/04'
    }
  ];

  let newItems = '<div role="list" class="works_home_list w-dyn-items">';
  for (const p of projects) {
    newItems += `
                <div role="listitem" class="works_home_item w-dyn-item">
                  <a href="/case-studies/${p.title.toLowerCase().replace(/ /g, '-')}" class="works_home_link u-grid-custom w-inline-block">
                    <div data-start="top bottom" data-scroll-container="" data-target-translate="125" class="works_home_cover u-ratio-1-1">
                      <div class="works_home_overlay"></div>
                      <div class="reel_home_cover" style="background-color: var(--swatch--black-100);">
                        <!-- Placeholder for project image/video -->
                      </div>
                    </div>
                    <div class="works_home_content">
                      <div class="works_home_title">
                        <div class="works_home_micrographic">
                          <div class="works_home_content_ss u-text-style-micro" style="color: var(--swatch--black-400);">CS</div>
                          <div class="works_micrographic_inner">
                            <div class="works_micrographic_circle" style="background-color: var(--swatch--black-400);"></div>
                            <div class="works_micrographic_line" style="background-color: var(--swatch--black-400);"></div>
                            <div class="works_home_micrographic_index">
                              <div class="works_home_content_index u-text-style-micro" style="color: var(--swatch--black-400);">${p.index}</div>
                            </div>
                          </div>
                        </div>
                        <h2 class="works_home_inner_title u-text-style-h5" style="color: var(--swatch--black-400);">${p.title}</h2>
                        <p class="works_home_p u-text-style-h5" style="color: var(--swatch--black-400);">${p.desc}</p>
                      </div>
                      <div class="works_home_result">
                        <h3 class="works_home_result_value u-text-style-main" style="color: var(--swatch--black-400);">${p.resultValue}</h3>
                        <p class="works_home_result_label u-text-style-main" style="color: var(--swatch--black-400);">${p.resultLabel}</p>
                      </div>
                    </div>
                  </a>
                </div>`;
  }
  newItems += '</div>';

  const newHtml = html.substring(0, listStart) + newItems + html.substring(listEnd);
  fs.writeFileSync('site/index.html', newHtml);
  console.log('Successfully updated works section!');
} else {
  console.log('Could not find list start.');
}
