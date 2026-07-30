const puppeteer = require("puppeteer");
const { spawn } = require("child_process");

(async () => {
  const server = spawn("python", ["-m", "http.server", "8000"], { cwd: "site" });
  await new Promise(r => setTimeout(r, 1000));

  const browser = await puppeteer.launch({ defaultViewport: { width: 1440, height: 900 } });
  const page = await browser.newPage();
  
  await page.goto("http://localhost:8000/index.html", { waitUntil: "networkidle0" });
  
  // Wait for entrance animations to finish
  await new Promise(r => setTimeout(r, 2000));
  
  // Check the Experience section
  await page.evaluate(() => {
    const el = document.querySelector("#experience");
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: "screenshot_debug_restored_experience.png" });

  // Check the gap_home_wrap section (Taking in the world images)
  await page.evaluate(() => {
    const el = document.querySelector(".gap_home_wrap");
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: "screenshot_debug_restored_world.png" });

  // Check the FAQ section
  await page.evaluate(() => {
    const el = document.querySelector("#faqs");
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: "screenshot_debug_restored_faqs.png" });

  // Check Featured Projects
  await page.evaluate(() => {
    const el = document.querySelector(".works_home_item");
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: "screenshot_debug_restored_projects.png" });

  await browser.close();
  server.kill();
})();
