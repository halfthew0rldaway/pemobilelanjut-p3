const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const PORT = 8099;
const DIST_DIR = path.resolve(__dirname, '..', 'dist');
const SCREENSHOTS_DIR = path.resolve(__dirname, '..', 'submission', 'screenshots');

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  let filePath = path.join(DIST_DIR, reqPath);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(DIST_DIR, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end('Error loading file');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

async function run() {
  server.listen(PORT, async () => {
    console.log(`Server running at http://localhost:${PORT}`);

    const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

    const browser = await puppeteer.launch({
      executablePath: chromePath,
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setViewport({
      width: 412,
      height: 915,
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 2,
    });

    page.on('dialog', async (dialog) => {
      console.log('Dialog opened:', dialog.message());
      await dialog.accept();
    });

    try {
      console.log('1. Opening Home screen...');
      await page.goto(`http://localhost:${PORT}`, { waitUntil: 'networkidle0' });
      await new Promise((r) => setTimeout(r, 2000));

      const homePath = path.join(SCREENSHOTS_DIR, '01-home.png');
      await page.screenshot({ path: homePath });
      console.log(`Saved: ${homePath}`);

      console.log('2. Clicking "Lihat Detail" on first product...');
      const clickedDetail = await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('*'));
        const btn = buttons.find((el) => el.textContent && el.textContent.trim() === 'Lihat Detail');
        if (btn) {
          btn.click();
          return true;
        }
        return false;
      });
      console.log('Detail button clicked:', clickedDetail);

      await new Promise((r) => setTimeout(r, 1500));

      console.log('3. Increasing quantity on Detail screen...');
      await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('*'));
        const plusBtn = buttons.find(
          (el) =>
            el.getAttribute('aria-label') === 'Tambah jumlah barang' ||
            (el.textContent && el.textContent.trim() === '+')
        );
        if (plusBtn) {
          plusBtn.click();
          setTimeout(() => plusBtn.click(), 200);
        }
      });

      await new Promise((r) => setTimeout(r, 800));

      const detailPath = path.join(SCREENSHOTS_DIR, '02-detail.png');
      await page.screenshot({ path: detailPath });
      console.log(`Saved: ${detailPath}`);

      console.log('4. Clicking "Beli Sekarang"...');
      const clickedBuy = await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('*'));
        const buyBtn = buttons.find(
          (el) =>
            (el.getAttribute('aria-label') && el.getAttribute('aria-label').includes('Beli sekarang')) ||
            (el.textContent && el.textContent.trim() === 'Beli Sekarang')
        );
        if (buyBtn) {
          buyBtn.click();
          return true;
        }
        return false;
      });
      console.log('Buy button clicked:', clickedBuy);

      await new Promise((r) => setTimeout(r, 1500));

      console.log('5. Clicking "Konfirmasi Pembelian"...');
      const clickedConfirm = await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('*'));
        const confirmBtn = buttons.find(
          (el) =>
            el.getAttribute('aria-label') === 'Konfirmasi Pembelian Demo' ||
            (el.textContent && el.textContent.trim() === 'Konfirmasi Pembelian')
        );
        if (confirmBtn) {
          confirmBtn.click();
          return true;
        }
        return false;
      });
      console.log('Confirm button clicked:', clickedConfirm);

      await new Promise((r) => setTimeout(r, 1000));

      const checkoutPath = path.join(SCREENSHOTS_DIR, '03-checkout.png');
      await page.screenshot({ path: checkoutPath });
      console.log(`Saved: ${checkoutPath}`);

      console.log('All screens successfully navigated and captured!');
    } catch (err) {
      console.error('Error during capture:', err);
    } finally {
      await browser.close();
      server.close();
      process.exit(0);
    }
  });
}

run();

