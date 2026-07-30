const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  
  await page.goto("http://localhost:8085/index.html", { waitUntil: "networkidle" });
  
  // Wait a moment for any initial GSAP/WebGL animations to start
  await page.waitForTimeout(2000);
  
  await page.screenshot({ path: "clean_monolog_screenshot.png", fullPage: true });
  await browser.close();
  console.log("Screenshot saved to clean_monolog_screenshot.png");
})();
