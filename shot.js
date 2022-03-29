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
const addrPreviewList = 'src/preview-list';
const addrPreviewURL = 'https://demo.jibres.me/preview/';


function createFolderIfNotExist(_path)
{
  try {
    if (!fs.existsSync(_path)) {
      fs.mkdirSync(_path, { recursive: true });
    }
  } catch (err) {
    console.error(err);
  }
}


function takeScreenShot(_url, _save)
{
  var saveFolder = path.dirname(_save);
  createFolderIfNotExist(saveFolder);

  // try to get scrrenshot
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
    });

    await page.goto(_url, {
      waitUntil: 'networkidle0',
    });

    // take png screenshot
    // await page.screenshot({ path: _save, format: 'png'});

    // take webp screenshot
    await page.screenshot({ path: _save, format: 'webp'});

    await browser.close();

  })();
}


function readAndShot()
{
  // get list of json files
  const jsonsInDir = fs.readdirSync(addrPreviewList).filter(file => path.extname(file) === '.json');

  jsonsInDir.forEach(file => 
  {
    // read file data
    const fileData = fs.readFileSync(path.join(addrPreviewList, file));
    // parse as json
    const json = JSON.parse(fileData.toString());
    // get group name
    var groupName = path.parse(file).name;
    // loop for each model
    for(var modelName in json)
    {
      var previewArr =  json[modelName];
      for(var previewList in previewArr)
      {
        var previewName = previewArr[previewList];
        var targetPreviewUrl = addrPreviewURL + groupName + '/' + modelName + '/' + previewName + '?lock=1';
        var targetPreviewFileName = 'dist/' + groupName + '/' + modelName + '/' + modelName + "-" + previewName + '.webp';
        
        // show in console
        console.log(targetPreviewUrl + "\t>>\t" + targetPreviewFileName);

        takeScreenShot(targetPreviewUrl, targetPreviewFileName);
      }
    }
  });
}


// read json file to create path list
readAndShot();
