/**
 * 
 * v1.0
 **/

// puppeteer to take screenshot
const puppeteer = require('puppeteer');
// fs to work with files
const fs = require('fs');
const path = require('path')



// define dist folder
const distFolder = 'dist';
const addrPreviewList = 'src/preview-list';
const addrPreviewURL = 'https://demo.jibres.me/preview/';


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

    await page.goto(_url, {
      waitUntil: 'networkidle0',
    });
    await page.screenshot({ path: targetPath });

    await browser.close();
  })();
}


function readAndShot()
{
  const jsonsInDir = fs.readdirSync(addrPreviewList).filter(file => path.extname(file) === '.json');

  jsonsInDir.forEach(file => {
    const fileData = fs.readFileSync(path.join(addrPreviewList, file));
    const json = JSON.parse(fileData.toString());

    for(var attributename in json){
        console.log(attributename+": "+json[attributename]);
    }

    // console.log(json);
  });

  // send order to take screenshot
  // takeScreenShot('https://demo.jibres.me/preview/blog/b1/p1', 'abc.png');
}


// create folder
createFolderIfNotExist(distFolder);
// read json file to create path list
readAndShot();

