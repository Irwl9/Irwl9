import puppeteer from 'puppeteer';

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

const browser = await puppeteer.launch({
  executablePath: '/root/.cache/puppeteer/chrome/linux-149.0.7827.22/chrome-linux64/chrome',
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  headless: true,
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });

await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 20000 });
await sleep(1500);
await page.screenshot({ path: '/tmp/saas-desktop.png', fullPage: false });

// Mobile view
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await page.reload({ waitUntil: 'networkidle0' });
await sleep(1000);
await page.screenshot({ path: '/tmp/saas-mobile.png', fullPage: false });

// Full page desktop
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.reload({ waitUntil: 'networkidle0' });
await sleep(1500);
await page.screenshot({ path: '/tmp/saas-full.png', fullPage: true });

await browser.close();
console.log('Screenshots saved');
