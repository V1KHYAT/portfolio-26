const puppeteer = require("puppeteer");
const { spawn } = require("child_process");

(async () => {
  const server = spawn("python", ["-m", "http.server", "8000"], { cwd: "site" });
  
  await new Promise(r => setTimeout(r, 1000));

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => {
    console.log(`[CONSOLE ${msg.type().toUpperCase()}] ${msg.text()}`);
  });

  page.on('pageerror', err => {
    console.log(`[PAGE ERROR] ${err.toString()}`);
  });

  const url = `http://localhost:8000/index.html`;
  console.log(`Navigating to ${url}...`);
  
  await page.goto(url, { waitUntil: "networkidle0" });
  
  console.log("Testing navigation links...");
  // Try to click "Projects" link
  await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a'));
    const projectsLink = links.find(l => l.textContent.includes('Projects'));
    if (projectsLink) projectsLink.click();
  });
  
  await new Promise(r => setTimeout(r, 1000));

  // Try to click "Experience" link
  await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a'));
    const expLink = links.find(l => l.textContent.includes('Experience'));
    if (expLink) expLink.click();
  });

  await new Promise(r => setTimeout(r, 1000));

  console.log("Done checking for console logs.");
  await browser.close();
  server.kill();
})();
