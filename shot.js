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
      fs.mkdirSync(_path, { recursive: true });
    }
  } catch (err) {
    console.error(err);
  }
}


function takeScreenShot(_url, _save)
{
  var targetPath = distFolder + '/' + _save;

  var saveFolder = path.dirname(targetPath);
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
    await page.screenshot({ path: targetPath });

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
        var targetPreview = groupName + '/' + modelName + '/' + previewName;
        
        var addrTargetUrl = addrPreviewURL + targetPreview;
        var addrTargetSavePath = targetPreview + '.png';

        console.log(addrTargetUrl);
        console.log(addrTargetSavePath);

        takeScreenShot(addrTargetUrl, addrTargetSavePath);
      }
    }
  });
}


// read json file to create path list
readAndShot();

// send order to take screenshot
// takeScreenShot('https://demo.jibres.me/preview/blog/b1/p1', 'abc.png');
