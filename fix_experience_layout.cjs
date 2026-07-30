const fs = require("fs");

let html = fs.readFileSync("site/index.html", "utf8");

const startIdx = html.indexOf('<section id="experience"');
const endIdx = html.indexOf('</section>', startIdx) + '</section>'.length;

if (startIdx !== -1 && endIdx !== -1) {
  const newExperienceHtml = `
<section id="experience" class="works_home_wrap" style="padding-top: 5rem; padding-bottom: 5rem;">
  <div class="works_home_contain">
    <div class="works_home_left">
      <div data-wf--global-eyebrow--variant="base-light" class="g_eyebrow">
        <div class="g_eyebrow_circle"></div>
        <div class="g_eyebrow_text u-text-style-large w-variant-e146755c-7cd8-05ac-1b2a-e5d85dd563b0">
          Experience
        </div>
      </div>
    </div>
    
    <div class="works_home_collection w-dyn-list">
      <div role="list" class="works_home_list w-dyn-items" style="display: flex; flex-direction: column; gap: 3rem;">
        
        <div role="listitem" class="works_home_item w-dyn-item" style="border: none; padding: 0;">
          <h2 class="u-text-style-h4" style="margin-bottom: 0.5rem; font-weight: 500;">
            Product Designer
          </h2>
          <div class="u-text-mono" style="opacity: 0.6; margin-bottom: 1rem; font-size: 0.875rem;">
            Webtel &nbsp;|&nbsp; Present
          </div>
          <p class="u-text-style-main" style="max-width: 48ch;">
            Driving user experience and interface design for enterprise applications. Collaborating closely with product and engineering teams to translate complex requirements into intuitive, user-centric solutions.
          </p>
        </div>

        <div role="listitem" class="works_home_item w-dyn-item" style="border: none; padding: 0;">
          <h2 class="u-text-style-h4" style="margin-bottom: 0.5rem; font-weight: 500;">
            UX Design Intern
          </h2>
          <div class="u-text-mono" style="opacity: 0.6; margin-bottom: 1rem; font-size: 0.875rem;">
            DO Communication &nbsp;|&nbsp; May 2025 - Dec 2025
          </div>
          <p class="u-text-style-main" style="max-width: 48ch;">
            I get to work on live websites for some of the company's big-name clients, handling everything from designing page layouts to helping out with research, ad visuals, and campaign ideas. It's been a great space to learn fast and create real impact.
          </p>
        </div>

        <div role="listitem" class="works_home_item w-dyn-item" style="border: none; padding: 0;">
          <h2 class="u-text-style-h4" style="margin-bottom: 0.5rem; font-weight: 500;">
            Freelance Projects
          </h2>
          <div class="u-text-mono" style="opacity: 0.6; margin-bottom: 1rem; font-size: 0.875rem;">
            Independent &nbsp;|&nbsp; Ongoing
          </div>
          <p class="u-text-style-main" style="max-width: 48ch;">
            I've taken on a few freelance gigs — mostly web design — where I got to work directly with clients to understand what they needed and turn that into clean, functional designs.
          </p>
        </div>

        <div role="listitem" class="works_home_item w-dyn-item" style="border: none; padding: 0;">
          <h2 class="u-text-style-h4" style="margin-bottom: 0.5rem; font-weight: 500;">
            Young Jury
          </h2>
          <div class="u-text-mono" style="opacity: 0.6; margin-bottom: 1rem; font-size: 0.875rem;">
            Awwwards &nbsp;|&nbsp; Apr 2025 - Present
          </div>
          <p class="u-text-style-main" style="max-width: 48ch;">
            As part of the Young Jury at Awwwards, I review and rate websites submitted by designers from around the world. It's been exciting to learn from so many different design styles while contributing to a platform I've always looked up to.
          </p>
        </div>
        
        <div role="listitem" class="works_home_item w-dyn-item" style="border: none; padding: 0;">
          <h2 class="u-text-style-h4" style="margin-bottom: 0.5rem; font-weight: 500;">
            Director's Assistant
          </h2>
          <div class="u-text-mono" style="opacity: 0.6; margin-bottom: 1rem; font-size: 0.875rem;">
            HCIPAI &nbsp;|&nbsp; Feb 2025 - Jan 2026
          </div>
          <p class="u-text-style-main" style="max-width: 48ch;">
            I help out behind the scenes at HCIPAI — India's largest HCI community — managing things like awards, certifications, and events. It's a mix of coordination, organization, and lots of learning.
          </p>
        </div>

      </div>
    </div>
  </div>
</section>`;

  html = html.substring(0, startIdx) + newExperienceHtml + html.substring(endIdx);
  fs.writeFileSync("site/index.html", html);
  console.log("Successfully rebuilt Experience section using works_home_wrap classes for the 2-column grid layout.");
} else {
  console.log("Could not find the Experience section to replace.");
}
