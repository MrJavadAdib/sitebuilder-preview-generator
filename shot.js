/**
 * 
 * v1.0
 **/

// puppeteer to take screenshot
const puppeteer = require('puppeteer');
// fs to work with files
const fs = require('fs');
// define dist folder
const distFolder2 = 'dist';


function createFolderIfNotExist(_path)
{
  try {
    if (!fs.existsSync(_path)) {
      fs.mkdirSync(_path);
    }
  } catch (err) {
    console.error(err);
  }
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


// create folder
createFolderIfNotExist(distFolder);
// send order to take screenshot
takeScreenShot('https://jibres.com', 'abc.png');

