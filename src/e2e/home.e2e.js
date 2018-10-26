import puppeteer from 'puppeteer';
const delay=[{delay:0},{delay:100},{delay:200}];

describe('Homepage', () => {
  it('logo测试', async () => {
    /*const browser = await puppeteer.launch({
      executablePath:'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      args: ['--no-sandbox']
    });*/
    const browser = await puppeteer.launch({
      executablePath:'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      args: ['--no-sandbox'] ,
      headless:false,
      slowMo:100,
    });
    const page = await browser.newPage();
    await page.goto('http://localhost:8000/user/login', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => window.localStorage.setItem('authority', 'guest'));
    await page.waitForSelector('#userName', {
      timeout: 1000
    });

    await page.type('#userName', 'admin');
    await page.type('#passWord', 'admin');
    await page.click('button[type="submit"]', delay[1]);

    await page.goto('http://localhost:8000', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('#logo h1');
    const text = await page.evaluate(() => document.body.innerHTML);
    expect(text).toContain('<h1>精准社会服务平台</h1>');
    await page.close();
    browser.close();
  });
});
