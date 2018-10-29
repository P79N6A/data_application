import puppeteer from 'puppeteer';
import {timeout} from '../utils/utils';

const delay=[{delay:0},{delay:100},{delay:200}];

describe('Login', () => {
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

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto('http://localhost:8000/user/login', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => window.localStorage.setItem('authority', 'guest'));
  });

  /* afterEach(() => {
    if (!page.close)return;
    return page.close()
  }); */

  it('登录失败测试', async () => {
    /* const userName= await page.$('#userName', {
      timeout: 2000
    });
    await userName.click();
    await page.type('admin', {delay:100}); */
    await page.waitForSelector('#userName', {
      timeout: 1000,
    });
    await page.type('#userName', 'admin55');
    await page.type('#passWord', 'admin55',{delay:10});
    await page.click('button[type="submit"]',{delay:50});
    await page.waitForSelector('.ant-message-notice'); // should display error
  });

  it('登录成功测试', async () => {
    await page.waitForSelector('#userName', {
      timeout: 1000,
    });
    await page.type('#userName', 'admin');
    await page.type('#passWord', 'admin');
    await page.click('button[type="submit"]', delay[1]);
    await timeout(500);
    await page.waitForSelector('#logo'); // should display error
    const text = await page.evaluate(() => document.body.innerHTML);
    expect(text).toContain('<h1>精准社会服务平台</h1>');
  });

  afterAll(() => browser.close());
});
