const fs = require('fs');
let html = fs.readFileSync('site/index.html', 'utf-8');

const injection = `
<style>
  * {
    --_theme---background: var(--swatch--beige-100) !important;
    --_theme---text: var(--swatch--black-400) !important;
    --_theme---heading-accent: var(--swatch--black-300) !important;
    --_theme---background-2: var(--swatch--beige-300) !important;
    --_theme---border: var(--swatch--beige-400) !important;
    --swatch--card-bg: var(--swatch--beige-100) !important;
  }
</style>
`;

html = html.replace('</head>', '\n' + injection + '\n</head>');
html = html.replace(/data-theme-section="dark"/g, 'data-theme-section="light"');
html = html.replace(/data-theme-nav="dark"/g, 'data-theme-nav="light"');
html = html.replace(/u-theme-dark/g, 'u-theme-light');
html = html.replace(/is-dark/g, 'is-light');

// And the hero image height fix
html = html.replace(
  `data-translate-hero="true"
              class="hero_home_img"
            /><!--$--><canvas`,
  `data-translate-hero="true"
              class="hero_home_img"
              style="height: 130%;"
            /><!--$--><canvas`
);

fs.writeFileSync('site/index.html', html, 'utf-8');
console.log('Successfully reverted HTML to pure light mode!');
