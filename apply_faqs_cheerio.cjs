const fs = require("fs");
const cheerio = require("cheerio");

let html = fs.readFileSync("site/index.html", "utf8");
const $ = cheerio.load(html);

$(".g_eyebrow_text:contains('FAQ')").text("Not-so-FAQs");
$(".faq_home_heading:contains('Here')").text("Things you might want to know (or not)");
$(".faq_home_heading").css("color", "var(--swatch--black-400)");

const faqs = [
  {
    q: "Do you code?",
    a: "I can read code well enough to know when it's broken. But yes, I prototype extensively and understand frontend workflows."
  },
  {
    q: 'What makes you an "AI-Native" Designer?',
    a: "I leverage AI models natively in my workflow to think faster and build better. My designs are optimized not just for human eyes, but for the systems that power them."
  },
  {
    q: "What is your favorite design tool?",
    a: "Figma for UI. Cursor for the heavy lifting. Notion for making sense of the chaos."
  },
  {
    q: "Are you available for freelance?",
    a: "Always open to interesting conversations. Send me an email and let's chat."
  }
];

const list = $(".g_faq_list");
list.empty();
faqs.forEach(f => {
  list.append(`
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
    </div>
  `);
});

fs.writeFileSync("site/index.html", $.html());
console.log("Updated FAQs using Cheerio.");
