const fs = require("fs");

let html = fs.readFileSync("site/index.html", "utf8");

// Find the start of the injected script from earlier
const startScript = html.indexOf('<script>\n  window.addEventListener(\'load\', function() {');
const endScript = html.indexOf('</script>\n</body>');

if (startScript !== -1 && endScript !== -1) {
  const newScript = `
<script>
  window.addEventListener('load', function() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && typeof SplitText !== 'undefined') {
      setTimeout(() => {
        const texts = document.querySelectorAll('.experience-text');
        texts.forEach(text => {
          const split = new SplitText(text, { type: "words,chars" });
          
          gsap.fromTo(split.chars, 
            { color: "rgba(0,0,0,0.15)" },
            { 
              color: "rgba(0,0,0,1)",
              stagger: 0.03, // Faster cascade
              duration: 0.1, // Quick transition per character
              ease: "power1.out",
              scrollTrigger: {
                trigger: text,
                start: "top 90%", // Triggers as soon as the paragraph just enters the bottom 10% of the screen
                toggleActions: "play none none reverse" // Plays on its own timing, detaching it from the scroll wheel
              }
            }
          );
        });
      }, 1000);
    }
  });
`;

  html = html.substring(0, startScript) + newScript + html.substring(endScript);
  fs.writeFileSync("site/index.html", html);
  console.log("Successfully updated custom GSAP script to be time-based rather than linearly scrubbed.");
} else {
  console.log("Could not find the previously injected script.");
}
