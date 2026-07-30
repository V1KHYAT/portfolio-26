const puppeteer = require("puppeteer");
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto("http://localhost:8085");
  await new Promise(r => setTimeout(r, 2000));
  
  // Scroll to the Featured Projects section
  await page.evaluate(() => {
    const el = document.querySelector("#experience");
    if(el) el.scrollIntoView();
  });
  
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: "screenshot_projects.png" });
  console.log("Screenshot taken: screenshot_projects.png");
  await browser.close();
})();
