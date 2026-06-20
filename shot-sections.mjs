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

// Scroll through the whole page slowly to trigger every IntersectionObserver / counter
await page.evaluate(async () => {
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const step = window.innerHeight * 0.6;
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await sleep(350);
  }
  window.scrollTo(0, document.body.scrollHeight);
  await sleep(600);
  window.scrollTo(0, 0);
  await sleep(500);
});

// Now capture each section by scrolling it into view
const sections = [
  { id: 'features', name: 'ai-features' },
  { id: 'how', name: 'how-it-works' },
  { id: 'testimonials', name: 'testimonials' },
  { id: 'pricing', name: 'pricing' },
];

for (const s of sections) {
  await page.evaluate((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  }, s.id);
  await sleep(1200);
  await page.screenshot({ path: `/tmp/sec-${s.name}.png`, fullPage: false });
}

// Stats section sits right under hero — scroll a bit past hero
await page.evaluate(() => window.scrollTo(0, window.innerHeight - 100));
await sleep(1500);
await page.screenshot({ path: '/tmp/sec-stats.png', fullPage: false });

await browser.close();
console.log('Section screenshots saved');
