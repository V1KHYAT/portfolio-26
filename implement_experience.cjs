const fs = require("fs");

let html = fs.readFileSync("site/index.html", "utf8");

// 1. Update "Projects" to "Work" in Navbar
// Look for `<a href="/projects" ...>...Projects...</a>`
html = html.replace(/<a href="\/projects"([^>]*)><div([^>]*)(>)[^<]*<\/div><\/a>/g, '<a href="/projects"$1><div$2$3Work</div></a>');
// Also update the navbar text in other potential places
html = html.replace(/>Projects<\/div>/g, '>Work</div>');

// Replace heading if it says "SELECTED PROJECTS" 
html = html.replace(/>\s*SELECTED PROJECTS\s*<\/h2>/g, '>SUCCESS STORIES</h2>');

// 2. Build the Experience section HTML based on the "Our principles" list style
const experienceHtml = `
<section id="experience" data-theme-section="dark" class="about_home_wrap u-theme-dark">
  <div class="about_home_header">
    <h2 class="about_home_heading u-text-style-display u-sr-only">
      Experience
    </h2>
  </div>
  <div class="about_home_contain">
    <div class="about_home_left">
      <div data-wf--global-eyebrow--variant="base" class="g_eyebrow">
        <div class="g_eyebrow_circle"></div>
        <div class="g_eyebrow_text u-text-style-large">
          Experience
        </div>
      </div>
      <h2 class="about_home_heading u-text-style-h3" style="margin-top: 1.5rem;">
        CAREER HIGHLIGHTS
      </h2>
    </div>
    
    <div class="about_values_collection w-dyn-list">
      <div role="list" class="about_values_list w-dyn-items" style="display: flex; flex-direction: column; gap: 2.5rem;">
        
        <div role="listitem" class="about_values_item w-dyn-item">
          <h2 class="about_values_heading u-text-style-h5" style="margin-bottom: 0.25rem;">
            Product Designer
          </h2>
          <div class="u-text-mono" style="opacity: 0.6; margin-bottom: 1rem; font-size: 0.875rem;">
            Webtel &nbsp;|&nbsp; Present
          </div>
          <p class="about_values_p u-text-style-small">
            Driving user experience and interface design for enterprise applications. Collaborating closely with product and engineering teams to translate complex requirements into intuitive, user-centric solutions.
          </p>
        </div>

        <div role="listitem" class="about_values_item w-dyn-item">
          <h2 class="about_values_heading u-text-style-h5" style="margin-bottom: 0.25rem;">
            UX Design Intern
          </h2>
          <div class="u-text-mono" style="opacity: 0.6; margin-bottom: 1rem; font-size: 0.875rem;">
            DO Communication &nbsp;|&nbsp; May 2025 - Dec 2025
          </div>
          <p class="about_values_p u-text-style-small">
            I get to work on live websites for some of the company's big-name clients, handling everything from designing page layouts to helping out with research, ad visuals, and campaign ideas. It's been a great space to learn fast and create real impact.
          </p>
        </div>

        <div role="listitem" class="about_values_item w-dyn-item">
          <h2 class="about_values_heading u-text-style-h5" style="margin-bottom: 0.25rem;">
            Young Jury
          </h2>
          <div class="u-text-mono" style="opacity: 0.6; margin-bottom: 1rem; font-size: 0.875rem;">
            Awwwards &nbsp;|&nbsp; Apr 2025 - Present
          </div>
          <p class="about_values_p u-text-style-small">
            As part of the Young Jury at Awwwards, I review and rate websites submitted by designers from around the world. It's been exciting to learn from so many different design styles while contributing to a platform I've always looked up to.
          </p>
        </div>
        
        <div role="listitem" class="about_values_item w-dyn-item">
          <h2 class="about_values_heading u-text-style-h5" style="margin-bottom: 0.25rem;">
            Director's Assistant
          </h2>
          <div class="u-text-mono" style="opacity: 0.6; margin-bottom: 1rem; font-size: 0.875rem;">
            HCIPAI &nbsp;|&nbsp; Feb 2025 - Jan 2026
          </div>
          <p class="about_values_p u-text-style-small">
            I help out behind the scenes at HCIPAI — India's largest HCI community — managing things like awards, certifications, and events. It's a mix of coordination, organization, and lots of learning.
          </p>
        </div>
        
        <div role="listitem" class="about_values_item w-dyn-item">
          <h2 class="about_values_heading u-text-style-h5" style="margin-bottom: 0.25rem;">
            Freelance Projects
          </h2>
          <div class="u-text-mono" style="opacity: 0.6; margin-bottom: 1rem; font-size: 0.875rem;">
            Independent &nbsp;|&nbsp; Ongoing
          </div>
          <p class="about_values_p u-text-style-small">
            I've taken on a few freelance gigs — mostly web design — where I got to work directly with clients to understand what they needed and turn that into clean, functional designs.
          </p>
        </div>

      </div>
    </div>
  </div>
</section>
`;

// Insert the section above process_home_wrap
const processStart = html.indexOf('<section id="process" class="process_home_wrap">');
if (processStart !== -1) {
  html = html.substring(0, processStart) + experienceHtml + "\n" + html.substring(processStart);
  fs.writeFileSync("site/index.html", html);
  console.log("Successfully added the Experience section and updated Projects to Work.");
} else {
  console.log("Could not find process_home_wrap");
}
