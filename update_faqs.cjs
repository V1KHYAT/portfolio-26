const fs = require('fs');
let html = fs.readFileSync('site/index.html', 'utf-8');

// Replace "FAQs" with "Not-so-FAQs"
html = html.replace(
  /<div id="w-node-[a-z0-9-]+-c52ac3cf" class="g_eyebrow_text u-text-style-large">\s*FAQs\s*<\/div>/,
  '<div id="w-node-_01473dc5-045d-cd95-0817-52d9c52ac3d1-c52ac3cf" class="g_eyebrow_text u-text-style-large">Not-so-FAQs</div>'
);

// Replace "Here's what you need to consider before partnering with us."
html = html.replace(
  /<h2 class="faq_home_heading u-text-style-h2">\s*Here's what you need to consider before partnering with us\.\s*<\/h2>/,
  '<h2 class="faq_home_heading u-text-style-h2" style="color: var(--swatch--black-400);">Things you might want to know (or not)</h2>'
);


const listStartStr = '<div data-index-group="values"';
let listStart = html.indexOf(listStartStr);
listStart = html.indexOf('role="list" class="g_faq_list w-dyn-items">', listStart);

if (listStart !== -1) {
  listStart += 'role="list" class="g_faq_list w-dyn-items">'.length;
  
  let openTags = 0;
  let listEnd = listStart;
  for (let i = listStart; i < html.length; i++) {
    if (html.slice(i, i + 4) === '<div') openTags++;
    if (html.slice(i, i + 5) === '</div') {
      if (openTags === 0) {
        listEnd = i;
        break;
      }
      openTags--;
    }
  }

  const faqs = [
    {
      q: 'Do you code?',
      a: 'I can read code well enough to know when it\'s broken. But yes, I prototype extensively and understand frontend workflows.'
    },
    {
      q: 'What makes you an "AI-Native" Designer?',
      a: 'I leverage AI models natively in my workflow to think faster and build better. My designs are optimized not just for human eyes, but for the systems that power them.'
    },
    {
      q: 'What is your favorite design tool?',
      a: 'Figma for UI. Cursor for the heavy lifting. Notion for making sense of the chaos.'
    },
    {
      q: 'Are you available for freelance?',
      a: 'Always open to interesting conversations. Send me an email and let\'s chat.'
    }
  ];

  let newItems = '';
  for (const f of faqs) {
    newItems += `
                <div data-accordion-status="not-active" role="listitem" class="g_faq_item w-dyn-item">
                  <button data-accordion-toggle="" data-hover-highlight="accordion" class="accordion_css_item_top">
                    <span class="accordion_css_item_bg"></span>
                    <h3 data-hover-heading="" class="accordion_css_item_heading u-text-trim-off u-text-style-large" style="color: var(--swatch--black-400); mix-blend-mode: normal;">
                      ${f.q}
                    </h3>
                    <div class="accordion_css_square" style="border-color: var(--swatch--black-400);"></div>
                  </button>
                  <div class="accordion_css_item_bottom">
                    <div class="accordion_css_bottom_wrap">
                      <div class="accordion_css_bottom_contain">
                        <div class="accordion_css_bottom_rich u-rich-text u-text-style-small w-richtext" style="color: var(--swatch--black-400);">
                          <p>${f.a}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>`;
  }

  const newHtml = html.substring(0, listStart) + newItems + html.substring(listEnd);
  fs.writeFileSync('site/index.html', newHtml);
  console.log('Successfully updated FAQ section!');
} else {
  console.log('Could not find list start.');
}
