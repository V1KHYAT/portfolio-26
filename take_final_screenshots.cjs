const puppeteer = require("puppeteer");
const { spawn } = require("child_process");

(async () => {
  const server = spawn("python", ["-m", "http.server", "8000"], { cwd: "site" });
  await new Promise(r => setTimeout(r, 1000));

  const browser = await puppeteer.launch({ defaultViewport: { width: 1440, height: 900 } });
  const page = await browser.newPage();
  
  await page.goto("http://localhost:8000/index.html", { waitUntil: "networkidle0" });
  
  // Scroll down to the Featured Projects section
  await page.evaluate(() => {
    const el = document.querySelector(".works_home_item");
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: "screenshot_debug_fixed_final_projects.png" });

  // Hover over the first project to trigger the hover state
  const project = await page.$(".works_home_item");
  if (project) {
    const box = await project.boundingBox();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await new Promise(r => setTimeout(r, 1500)); // wait for hover animation and JS slideshow
    await page.screenshot({ path: "screenshot_debug_fixed_final_hover.png" });
  }

  // Scroll to FAQ section
  await page.evaluate(() => {
    const el = document.querySelector("#faqs");
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: "screenshot_debug_fixed_final_faq.png" });

  await browser.close();
  server.kill();
})();
