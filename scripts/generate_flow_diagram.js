const path = require('path');
const puppeteer = require('puppeteer-core');

const SCREENSHOTS_DIR = path.resolve(__dirname, '..', 'submission', 'screenshots');
const flowPath = path.join(SCREENSHOTS_DIR, '04-navigation-flow.png');

const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }
    body {
      width: 1200px;
      height: 750px;
      background: #F8FAFC;
      padding: 40px;
      display: flex;
      flex-direction: column;
      justifyContent: space-between;
    }
    .header {
      text-align: center;
      margin-bottom: 24px;
    }
    .header h1 {
      font-size: 28px;
      font-weight: 800;
      color: #1E40AF;
      letter-spacing: 0.5px;
    }
    .header p {
      font-size: 15px;
      color: #64748B;
      margin-top: 6px;
    }
    .flow-container {
      display: flex;
      justifyContent: space-between;
      align-items: stretch;
      gap: 24px;
      flex: 1;
    }
    .screen-card {
      flex: 1;
      background: #FFFFFF;
      border: 2px solid #E2E8F0;
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
      display: flex;
      flex-direction: column;
    }
    .screen-badge {
      display: inline-block;
      align-self: flex-start;
      background: #EFF6FF;
      color: #1D4ED8;
      border: 1px solid #BFDBFE;
      font-size: 12px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 6px;
      margin-bottom: 12px;
    }
    .screen-title {
      font-size: 20px;
      font-weight: 700;
      color: #0F172A;
      margin-bottom: 8px;
    }
    .screen-desc {
      font-size: 13px;
      color: #475569;
      line-height: 1.5;
      margin-bottom: 16px;
    }
    .features-list {
      list-style: none;
      font-size: 13px;
      color: #334155;
      margin-bottom: 16px;
      flex: 1;
    }
    .features-list li {
      padding: 6px 0;
      border-bottom: 1px solid #F1F5F9;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .code-tag {
      background: #F1F5F9;
      color: #0F172A;
      font-family: monospace;
      font-size: 11px;
      padding: 2px 6px;
      border-radius: 4px;
      border: 1px solid #E2E8F0;
    }
    .action-box {
      background: #F8FAFC;
      border-radius: 10px;
      padding: 12px;
      border-left: 4px solid #2563EB;
      font-size: 12px;
      color: #1E293B;
    }
    .connector {
      display: flex;
      flex-direction: column;
      justifyContent: center;
      align-items: center;
      width: 60px;
      color: #2563EB;
    }
    .arrow-icon {
      font-size: 28px;
      font-weight: bold;
    }
    .connector-text {
      font-size: 11px;
      font-weight: 700;
      text-align: center;
      margin-top: 4px;
      color: #2563EB;
    }
    .return-arrow {
      color: #94A3B8;
      font-size: 18px;
      margin-top: 8px;
    }
    .footer-note {
      text-align: center;
      font-size: 13px;
      color: #64748B;
      margin-top: 24px;
      padding-top: 12px;
      border-top: 1px solid #E2E8F0;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Alur Navigasi & Aliran Data CompStore</h1>
    <p>React Native + Expo • React Navigation Native Stack • Tugas Pertemuan 3</p>
  </div>

  <div class="flow-container">
    <!-- Home Screen -->
    <div class="screen-card">
      <div class="screen-badge">Screen 1</div>
      <div class="screen-title">HomeScreen</div>
      <div class="screen-desc">Menampilkan daftar produk komputer (min 6 item) dengan kartu terstruktur.</div>
      <ul class="features-list">
        <li><span>• Komponen: <span class="code-tag">ProductCard</span></span></li>
        <li><span>• Tombol: <span class="code-tag">Pressable</span> ("Lihat Detail")</span></li>
        <li><span>• KeyExtractor: <span class="code-tag">product.id</span></span></li>
        <li><span>• Event Handler: <span class="code-tag">onPress</span></span></li>
      </ul>
      <div class="action-box">
        <strong>Navigasi Keluar:</strong><br/>
        <span class="code-tag">navigation.navigate('Detail', { product })</span>
      </div>
    </div>

    <!-- Connector 1 -->
    <div class="connector">
      <div class="arrow-icon">➔</div>
      <div class="connector-text">Passing { product }</div>
      <div class="return-arrow">❮</div>
      <div class="connector-text" style="color: #64748B; font-weight: normal;">goBack()</div>
    </div>

    <!-- Detail Screen -->
    <div class="screen-card">
      <div class="screen-badge">Screen 2</div>
      <div class="screen-title">DetailScreen</div>
      <div class="screen-desc">Detail produk terpilih, spesifikasi teknis lengkap, dan pemilihan kuantitas.</div>
      <ul class="features-list">
        <li><span>• Membaca: <span class="code-tag">route.params.product</span></span></li>
        <li><span>• State: <span class="code-tag">useState(1)</span> untuk kuantitas</span></li>
        <li><span>• Komponen: <span class="code-tag">QuantitySelector</span> (+ / -)</span></li>
        <li><span>• Batas: <span class="code-tag">min = 1</span> (tombol minus nonaktif)</span></li>
      </ul>
      <div class="action-box">
        <strong>Navigasi Keluar:</strong><br/>
        <span class="code-tag">navigation.navigate('Checkout', { product, quantity })</span>
      </div>
    </div>

    <!-- Connector 2 -->
    <div class="connector">
      <div class="arrow-icon">➔</div>
      <div class="connector-text">Passing { product, quantity }</div>
      <div class="return-arrow">❮</div>
      <div class="connector-text" style="color: #64748B; font-weight: normal;">goBack()</div>
    </div>

    <!-- Checkout Screen -->
    <div class="screen-card">
      <div class="screen-badge">Screen 3</div>
      <div class="screen-title">CheckoutScreen</div>
      <div class="screen-desc">Ringkasan pesanan, kalkulasi total harga akurat, dan konfirmasi demo.</div>
      <ul class="features-list">
        <li><span>• Membaca: <span class="code-tag">route.params.{product, quantity}</span></span></li>
        <li><span>• Kalkulasi: <span class="code-tag">total = price * quantity</span></span></li>
        <li><span>• Format: <span class="code-tag">formatCurrency(total)</span> (Rp)</span></li>
        <li><span>• Feedback: <span class="code-tag">Alert.alert</span> konfirmasi demo</span></li>
      </ul>
      <div class="action-box">
        <strong>Reset Alur:</strong><br/>
        <span class="code-tag">navigation.navigate('Home')</span>
      </div>
    </div>
  </div>

  <div class="footer-note">
    Arsitektur Navigasi: <strong>React Navigation Native Stack</strong> • Tidak ada backend • Seluruh data dan kalkulasi dikelola secara aman di client-side.
  </div>
</body>
</html>
`;

async function generate() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 750, deviceScaleFactor: 2 });
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: flowPath });
  console.log(`Saved navigation flow diagram: ${flowPath}`);
  await browser.close();
}

generate();

