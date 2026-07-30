const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto("http://localhost:8085/"); // MUST use root URL for Barba!
  
  await new Promise(r => setTimeout(r, 6000));
  
  await page.screenshot({ path: "screenshot_debug_main.png" });
  await browser.close();
  console.log("Screenshot taken.");
})();
