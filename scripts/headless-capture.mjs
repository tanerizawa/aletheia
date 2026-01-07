import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';

const url = process.argv[2] || 'http://localhost:3000';
const outDir = path.resolve(process.cwd(), 'captures');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const harPath = path.join(outDir, 'homepage.har');
const consolePath = path.join(outDir, 'homepage-console.json');
const networkPath = path.join(outDir, 'homepage-network.json');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ recordHar: { path: harPath } });
  const page = await context.newPage();

  const consoleLogs = [];
  const requests = [];
  const responses = [];

  page.on('console', (msg) => {
    consoleLogs.push({
      type: msg.type(),
      text: msg.text(),
      location: msg.location(),
      timestamp: Date.now(),
    });
    console.log(`[PAGE][console][${msg.type()}] ${msg.text()}`);
  });

  page.on('request', (req) => {
    requests.push({ url: req.url(), method: req.method(), headers: req.headers(), timestamp: Date.now() });
  });

  page.on('response', async (res) => {
    const entry = { url: res.url(), status: res.status(), headers: res.headers(), timestamp: Date.now() };
    try {
      const b = await res.body();
      entry.bodySize = b?.length ?? null;
    } catch (e) {
      entry.bodySize = null;
    }
    responses.push(entry);
  });

  console.log('Navigating to', url);
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  } catch (err) {
    console.error('Page.goto error:', err.message || err);
  }

  // give the page a moment for late requests
  await page.waitForTimeout(2000);

  await context.close();
  await browser.close();

  fs.writeFileSync(consolePath, JSON.stringify(consoleLogs, null, 2));
  fs.writeFileSync(networkPath, JSON.stringify({ requests, responses }, null, 2));

  console.log('Saved HAR to', harPath);
  console.log('Saved console logs to', consolePath);
  console.log('Saved network summary to', networkPath);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
