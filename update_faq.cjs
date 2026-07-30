const fs = require("fs");

let html = fs.readFileSync("site/index.html", "utf8");

// Extract the CSS block
const cssStart = html.indexOf('<div class="faq_css w-embed">');
let cssBlock = '';
if (cssStart !== -1) {
  const cssEnd = html.indexOf('</div>', html.indexOf('</style>', cssStart)) + 6;
  cssBlock = html.substring(cssStart, cssEnd);
}

const faqs = [
  {
    q: "Why shouldn't I just hire my nephew for this?",
    a: "I will not make your holiday dinners awkward over delayed payments and last moment button color changes."
  },
  {
    q: "Are you just 3 AIs in a trenchcoat?",
    a: "No, but I definitely know how to get work done using a crew of AI henchmen. I do the deep thinking, research and user logic, and I make them do all the heavy lifting and grunt work."
  },
  {
    q: "What do you do outside of work?",
    a: "Waking up way too early to take my bike out for a ride, messing around on random instruments (I can't play any of them properly), and diving down random reading rabbit holes."
  },
  {
    q: "Do you play a lot of video games?",
    a: "Sadly, no. I rarely have the time to actually play them these days. But I do like studying about game UX. I watch hours of video essays on how games guide players without them noticing. I still keep a highly detailed spreadsheet of my gaming backlog just to feel involved."
  },
  {
    q: "Should we hire you?",
    a: "Please."
  }
];

let itemsHtml = faqs.map((faq, index) => `
<div data-accordion-status="not-active" role="listitem" class="g_faq_item w-dyn-item">
  <!--$--><button data-accordion-toggle="" data-hover-highlight="accordion" class="accordion_css_item_top">
    <!--$--><span class="accordion_css_item_bg"></span><!--/$-->
    <h3 data-hover-heading="" class="accordion_css_item_heading u-text-trim-off u-text-style-large">
      ${faq.q}
    </h3>
    <div class="accordion_css_square"></div></button><!--/$-->
  <div class="accordion_css_item_bottom">
    <div class="accordion_css_bottom_wrap">
      <div class="accordion_css_bottom_contain">
        <div class="accordion_css_bottom_rich u-rich-text u-text-style-small w-richtext">
          <p>${faq.a}</p>
        </div>
      </div>
    </div>
  </div>
  ${index === 0 ? cssBlock : ''}
</div>`).join('\n');

const faqListRegex = /<div data-index-group="values" id="[^"]+" role="list" class="g_faq_list w-dyn-items">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>\s*<div id="[^"]+" class="faq_home_content">/g;

// Instead of complex regex, let's just construct the entire FAQ section HTML to ensure correctness.
// Find <section id="faqs" ...>
const sectionStart = html.indexOf('<section id="faqs"');
const sectionEnd = html.indexOf('</section>', sectionStart) + 10;

const newSection = `
<section id="faqs" class="faq_home_wrap u-grid-custom">
  <div id="w-node-_175f460a-5a43-8e1a-5c1c-d7cade701ca5-de701ca4" class="faq_home_left">
    <div data-wf--global-eyebrow--variant="base" class="g_eyebrow">
      <div class="g_eyebrow_circle"></div>
      <div id="w-node-_01473dc5-045d-cd95-0817-52d9c52ac3d1-c52ac3cf" class="g_eyebrow_text u-text-style-large">
        Not-So-FAQ
      </div>
    </div>
  </div>
  <div id="w-node-_175f460a-5a43-8e1a-5c1c-d7cade701ca8-de701ca4" class="faq_home_main">
    <h2 class="faq_home_heading u-text-style-h2">
      Answers to questions you were probably never going to ask anyway.
    </h2>
    <div data-accordion-close-siblings="true" data-accordion-css-init="" class="g_faq_collection w-dyn-list">
      <div data-index-group="values" id="w-node-_175f460a-5a43-8e1a-5c1c-d7cade701cac-de701ca4" role="list" class="g_faq_list w-dyn-items">
        ${itemsHtml}
      </div>
    </div>
  </div>
  <div id="w-node-_175f460a-5a43-8e1a-5c1c-d7cade701cba-de701ca4" class="faq_home_content">
    <img loading="lazy" src="images/pfp.jpg" alt="A headshot of Vikhyat" class="faq_home_headshot">
    <p class="faq_home_p u-text-style-h5">
      Got more questions? Contact Vikhyat.
    </p>
    <a data-btn-default="" data-wf--global-button-main--variant="base" href="#contact" class="g_btn_main w-inline-block">
      <div class="g_btn_text_contain">
        <div class="g_btn_text u-text-style-small u-text-trim-off">
          Contact Me
        </div>
      </div>
      <div class="g_btn_aside_wrap">
        <div class="g_btn_aside_bg"></div>
        <!--$--><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 12 12" fill="none" class="g_btn_svg">
          <!--$-->
          <path d="M8.90954 9.09046L9 3L2.90954 3.09046L2.90213 4.32367L6.86437 4.25391L2.55914 8.55914L3.44086 9.44086L7.74609 5.13563L7.68708 9.10862L8.90954 9.09046Z" fill="currentColor"></path>
          <!--/$--></svg><!--/$-->
        <!--$--><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 12 12" fill="none" class="g_btn_svg is-absolute">
          <!--$-->
          <path d="M8.90954 9.09046L9 3L2.90954 3.09046L2.90213 4.32367L6.86437 4.25391L2.55914 8.55914L3.44086 9.44086L7.74609 5.13563L7.68708 9.10862L8.90954 9.09046Z" fill="currentColor"></path>
          <!--/$--></svg><!--/$-->
      </div>
    </a>
  </div>
</section>
`;

html = html.substring(0, sectionStart) + newSection + html.substring(sectionEnd);

fs.writeFileSync("site/index.html", html);
console.log("Successfully replaced FAQ section.");
