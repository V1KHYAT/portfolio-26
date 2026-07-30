const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  
  // Index
  let page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto("http://localhost:8085/index.html", { waitUntil: "networkidle0" });
  await new Promise(r => setTimeout(r, 6000));
  await page.screenshot({ path: "screenshot_final_index.png" });
  await page.close();

  // Work
  page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto("http://localhost:8085/work.html", { waitUntil: "networkidle0" });
  await new Promise(r => setTimeout(r, 6000));
  // Scroll a bit to see the work section
  await page.evaluate(() => window.scrollBy(0, 800));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: "screenshot_final_work.png" });
  await page.close();
  
  // Play
  page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto("http://localhost:8085/play.html", { waitUntil: "networkidle0" });
  await new Promise(r => setTimeout(r, 6000));
  // Scroll a bit to see the play section
  await page.evaluate(() => window.scrollBy(0, 800));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: "screenshot_final_play.png" });
  await page.close();

  await browser.close();
  console.log("Screenshots taken.");
})();
