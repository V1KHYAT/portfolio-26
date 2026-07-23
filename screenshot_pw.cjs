const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('http://localhost:62306', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'screenshot_playwright.png', fullPage: true });
  
  await browser.close();
  console.log('Screenshot saved to screenshot_playwright.png');
})();
