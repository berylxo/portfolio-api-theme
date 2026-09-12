/**
 * Recapture the Nodus+ Health gallery screenshots at twice their display size,
 * so they stay sharp on high-density screens.
 *
 * The gallery renders about 1136 CSS pixels wide. These captures come out 2560
 * wide, which leaves headroom at every viewport the site supports.
 *
 * Setup, once:
 *   npm install -D playwright && npx playwright install chromium
 *
 * Start the Nodus backend (make dev) and frontend (npm run dev), then either:
 *
 *   A. Let the script sign in:
 *        NODUS_EMAIL=you@example.com NODUS_PASSWORD=secret \
 *          node scripts/capture-nodus-screenshots.mjs
 *
 *   B. Sign in yourself, which is the way to go when the account has a second
 *      factor. Start Chrome with --remote-debugging-port=9222, log in, then:
 *        node scripts/capture-nodus-screenshots.mjs --attach
 *
 * Files are written over the ones in public/images/nodus, so the page itself
 * needs no changes.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outputDir = join(root, 'public', 'images', 'nodus');

const baseUrl = process.env.NODUS_URL ?? 'http://localhost:5173';
const attach = process.argv.includes('--attach');
const debugPort = process.env.NODUS_CDP ?? 'http://localhost:9222';

// The viewport is the shape of the gallery frame. Captures come out at twice
// this size, which is what keeps them sharp.
const viewport = { width: 1280, height: 582 };
const scale = 2;

const shots = [
  { file: 'billing-dashboard.webp', path: '/billing' },
  { file: 'patient-register.webp', path: '/patients' },
  { file: 'pharmacy-formulary.webp', path: '/pharmacy/formulary' }
];

async function signIn(page) {
  await page.goto(`${baseUrl}/login`, { waitUntil: 'networkidle' });
  if (!page.url().includes('/login')) return;

  const email = process.env.NODUS_EMAIL;
  const password = process.env.NODUS_PASSWORD;
  if (!email || !password) {
    throw new Error('Set NODUS_EMAIL and NODUS_PASSWORD, or sign in yourself and pass --attach.');
  }

  await page.fill('input[type="email"]', email);
  await page.click('button[type="submit"]');
  await page.fill('input[type="password"]', password);
  await page.click('button[type="submit"]');
  await page.waitForURL((url) => !url.pathname.startsWith('/login'), { timeout: 20000 });

  if (page.url().includes('/mfa')) {
    throw new Error('This account asks for a second factor. Sign in yourself and rerun with --attach.');
  }
}

async function capture(page, cdp, shot) {
  await page.goto(`${baseUrl}${shot.path}`, { waitUntil: 'networkidle' });

  if (page.url().includes('/login')) {
    throw new Error(`Opening ${shot.path} bounced to the login page. Check the session and try again.`);
  }

  // Let fonts and any entrance animation settle before the shutter.
  await page.waitForTimeout(1500);

  // Playwright writes PNG only. Chrome's own protocol encodes WebP directly,
  // which keeps both the existing filenames and the file sizes reasonable.
  const { data } = await cdp.send('Page.captureScreenshot', { format: 'webp', quality: 92 });
  const bytes = Buffer.from(data, 'base64');

  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, shot.file), bytes);
  return bytes.length;
}

/** Loaded on demand so a missing install explains itself instead of throwing. */
async function loadChromium() {
  try {
    return (await import('playwright')).chromium;
  } catch {
    throw new Error('Playwright is missing. Run: npm install -D playwright && npx playwright install chromium');
  }
}

let browser;
try {
  const chromium = await loadChromium();
  browser = attach ? await chromium.connectOverCDP(debugPort) : await chromium.launch();
  const context = attach
    ? browser.contexts()[0]
    : await browser.newContext({ viewport, deviceScaleFactor: scale });
  const page = attach ? context.pages()[0] ?? (await context.newPage()) : await context.newPage();

  if (!attach) await signIn(page);

  // Playwright's own deviceScaleFactor is not what the protocol screenshot
  // reads, so state the metrics again here or the capture comes back at 1x.
  const cdp = await context.newCDPSession(page);
  await cdp.send('Emulation.setDeviceMetricsOverride', {
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: scale,
    mobile: false
  });

  for (const shot of shots) {
    const size = await capture(page, cdp, shot);
    console.log(`${shot.file.padEnd(26)} ${viewport.width * scale} px wide   ${Math.round(size / 1024)} KB`);
  }
  console.log(`\nWrote ${shots.length} screenshots to public/images/nodus`);
} catch (error) {
  console.error(`\nCapture stopped: ${error.message}`);
  process.exitCode = 1;
} finally {
  await browser?.close();
}
