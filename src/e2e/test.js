
const puppeteer = require('puppeteer');
let waitLoad={ waitUntil: 'domcontentloaded' }
function timeout(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(1)
      } catch (e) {
        reject(0)
      }
    }, delay)
  })
}

let mainFun=async () => {
  let browser = await puppeteer.launch({
    executablePath:'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    headless:false,
    slowMo:50,
    // devtools:true,
    // args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  page.on('console', (msg) => {
    console.log('PAGE LOG=======:', msg.text())
  });

  await page.goto('http://localhost:8000/user/login', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => window.localStorage.setItem('authority', 'guest'));
  await page.waitForSelector('#userName', {
    timeout: 1000
  });
  await page.type('#userName', 'admin');
  await page.type('#passWord', 'admin');
  await page.click('button[type="submit"]', {delay:100});

  await page.goto('http://localhost:8000/resource/manage', waitLoad);
  await page.waitForSelector('#logo');

  const tr= await page.evaluate(() => {
    console.log('in ==== page')

    let tb=document.getElementsByTagName('tbody')[0].childNodes;
    console.log(tb);
    console.log(Array.from(tb));
    return 'out====page'
  });

  console.log(tr.jsonValue());
  await timeout(800000);
  await page.close();
  await browser.close();
};
mainFun();
