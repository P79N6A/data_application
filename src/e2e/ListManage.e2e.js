import puppeteer from 'puppeteer';
const delay=[{delay:0},{delay:100},{delay:200}];
const url='http://localhost:8000/resource/manage';
const waitLoad={ waitUntil: 'domcontentloaded' }


describe('api列表管理页', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      executablePath:'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      headless:false,
      slowMo:50,
      // devtools:true,
      args: ['--no-sandbox'],
    });
    // browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  });

  afterAll(() => {
    if (!browser.close)return;
    return browser.close()
  });

  beforeEach(async ()=>{
    page = await browser.newPage();
    await page.goto('http://localhost:8000/user/login', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => window.localStorage.setItem('authority', 'guest'));
    await page.waitForSelector('#userName', {
      timeout: 1000,
    });
    await page.type('#userName', 'admin');
    await page.type('#passWord', 'admin');
    await page.click('button[type="submit"]', delay[1]);
  })

  afterEach(() => {
    if (!page.close)return;
    return page.close()
  });

  it('html content test', async () => {
    await page.goto(url, waitLoad);
    await page.waitForSelector('#logo h1');
    const text = await page.evaluate(() => document.body.innerHTML);
    expect(text).toContain('<h1>精准社会服务平台</h1>');
    expect(text).toContain('<table');
  });

  it('html content test', async () => {
    await page.goto(url, waitLoad);
    await page.waitForSelector('#logo h1');
    const text = await page.evaluate(() => document.body.innerHTML);
    expect(text).toContain('<h1>精准社会服务平台</h1>');
    expect(text).toContain('<table');
  });
});
