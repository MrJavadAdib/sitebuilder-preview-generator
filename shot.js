/**
 * 
 * 
 * 
 **/

const puppeteer = require('puppeteer');

// create dist folder
const fs = require('fs');
const distFolder = 'dist';
try {
  if (!fs.existsSync(distFolder)) {
    fs.mkdirSync(distFolder);
  }
} catch (err) {
  console.error(err);
}


function takeScreenShot(_url, _save)
{
  // try to get scrrenshot
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
    });

    targetPath = distFolder + '/';
    targetPath += _save;

    await page.goto(_url);
    await page.screenshot({ path: targetPath });

    await browser.close();
  })();
}

// send order to take screenshot
takeScreenShot('https://jibres.com', 'abc.png');
