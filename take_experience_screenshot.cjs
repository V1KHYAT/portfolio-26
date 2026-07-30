const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  
  await page.goto("http://localhost:8085/index.html", { waitUntil: "networkidle" });
  
  // Wait a moment for any initial GSAP/WebGL animations to start
  await page.waitForTimeout(2000);
  
  const element = await page.$("#experience");
  if (element) {
    await element.screenshot({ path: "screenshot_experience.png" });
    console.log("Screenshot saved to screenshot_experience.png");
  } else {
    console.log("Could not find #experience element to screenshot");
    await page.screenshot({ path: "screenshot_experience_full.png", fullPage: true });
  }
  
  await browser.close();
})();
