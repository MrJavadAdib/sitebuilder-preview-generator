const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://jibres.com');
  await page.screenshot({ path: 'jibres.png' });

  await browser.close();
})();