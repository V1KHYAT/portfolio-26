const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ defaultViewport: { width: 1440, height: 900 } });
  const page = await browser.newPage();
  
  await page.goto("http://localhost:8090/index.html", { waitUntil: "networkidle0" });
  
  await new Promise(r => setTimeout(r, 2000));
  
  await page.screenshot({ path: "screenshot_8090_test.png" });

  await browser.close();
})();
