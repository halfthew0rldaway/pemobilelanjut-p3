import { Product } from '../types/product';

export const PRODUCTS: Product[] = [
  {
    id: 'pc-001',
    name: 'CompStore Gaming PC R5',
    category: 'PC Desktop',
    price: 12500000,
    description:
      'PC desktop gaming performa tinggi yang ditenagai prosesor AMD Ryzen 5 generasi terbaru dan kartu grafis dedicated GeForce RTX. Siap melibas game kompetitif maupun AAA serta kebutuhan kreasi konten dan multitasking berat.',
    specifications: [
      { label: 'Prosesor', value: 'AMD Ryzen 5 5600X (6 Core, 12 Thread, up to 4.6GHz)' },
      { label: 'Kartu Grafis', value: 'NVIDIA GeForce RTX 4060 8GB GDDR6' },
      { label: 'Memori RAM', value: '16GB (2x8GB) DDR4 3200MHz Dual Channel' },
      { label: 'Penyimpanan', value: '512GB M.2 NVMe PCIe SSD' },
      { label: 'Power Supply', value: '550W 80+ Bronze Certified' },
      { label: 'Motherboard', value: 'B550M Micro-ATX dengan Heatsink VRM' },
    ],
  },
  {
    id: 'laptop-001',
    name: 'CompStore ProBook 14',
    category: 'Laptop',
    price: 8750000,
    description:
      'Laptop produktivitas ramping dan elegan dengan layar IPS 14 inci berbezel tipis. Didesain untuk profesional modern, mahasiswa, dan pekerja remote yang membutuhkan mobilitas tinggi dengan daya tahan baterai sepanjang hari.',
    specifications: [
      { label: 'Prosesor', value: 'Intel Core i5-1240P (12 Core, 16 Thread, up to 4.4GHz)' },
      { label: 'Layar', value: '14.0 inch Full HD IPS Anti-Glare 100% sRGB' },
      { label: 'Memori RAM', value: '16GB LPDDR5 4800MHz' },
      { label: 'Penyimpanan', value: '512GB M.2 NVMe PCIe 4.0 SSD' },
      { label: 'Baterai', value: '54Wh dengan pengisian cepat 65W USB Type-C' },
      { label: 'Bobot', value: '1.38 kg (Desain tipis aluminium)' },
    ],
  },
  {
    id: 'monitor-001',
    name: 'CompStore IPS 24',
    category: 'Monitor',
    price: 1650000,
    description:
      'Monitor komputer 23.8 inci berpanel IPS dengan reproduksi warna akurat dan sudut pandang luas 178 derajat. Refresh rate 100Hz dan bezel ultra tipis menjamin kenyamanan mata untuk bekerja maupun menikmati hiburan.',
    specifications: [
      { label: 'Ukuran Layar', value: '23.8 inch (16:9 Rasio Aspek)' },
      { label: 'Tipe Panel', value: 'IPS Frameless 3-Sisi' },
      { label: 'Resolusi', value: 'Full HD (1920 x 1080 piksel)' },
      { label: 'Refresh Rate', value: '100Hz dengan Adaptive Sync' },
      { label: 'Waktu Respon', value: '1ms (MPRT) / 4ms (GtG)' },
      { label: 'Konektivitas', value: '1x HDMI 1.4, 1x VGA, 1x Audio Out 3.5mm' },
    ],
  },
  {
    id: 'keyboard-001',
    name: 'CompStore Mechanical K87',
    category: 'Keyboard',
    price: 650000,
    description:
      'Keyboard mekanikal format Tenkeyless (87 tombol) yang menghemat ruang meja Anda. Dilengkapi mechanical switch responsif, keycaps PBT tahan aus, dan pencahayaan RGB per tombol yang dapat dikustomisasi.',
    specifications: [
      { label: 'Tata Letak', value: 'Tenkeyless 87 Tombol (TKL Layout)' },
      { label: 'Tipe Switch', value: 'Outemu Mechanical Switch (Hot-swappable)' },
      { label: 'Material Keycaps', value: 'Double-shot PBT OEM Profile' },
      { label: 'Konektivitas', value: 'Kabel USB Type-C Detachable (Braided 1.8m)' },
      { label: 'Pencahayaan', value: 'RGB Backlit dengan 18 mode efek' },
      { label: 'Fitur Khusus', value: 'Full Anti-Ghosting / N-Key Rollover' },
    ],
  },
  {
    id: 'mouse-001',
    name: 'CompStore Gaming Mouse',
    category: 'Mouse',
    price: 275000,
    description:
      'Mouse gaming ergonomis berbobot ringan dengan sensor optik presisi tinggi hingga 7200 DPI. Kontur bodi nyaman di tangan untuk sesi penggunaan berjam-jam, baik untuk produktivitas maupun gaming kompetitif.',
    specifications: [
      { label: 'Sensor', value: 'High-Precision Optical Gaming Sensor (up to 7200 DPI)' },
      { label: 'Jumlah Tombol', value: '6 Tombol Responsif yang dapat diprogram' },
      { label: 'Ketahanan Switch', value: 'Huano Switch hingga 20 juta kali klik' },
      { label: 'Polling Rate', value: '1000Hz (Response Time 1ms)' },
      { label: 'Kabel', value: 'Paracord Ultra-Flexible 1.6 meter' },
      { label: 'Bobot', value: '68 gram (Desain Ultralight)' },
    ],
  },
  {
    id: 'ssd-001',
    name: 'CompStore NVMe 1TB',
    category: 'Storage',
    price: 1050000,
    description:
      'Media penyimpanan Solid State Drive super cepat dengan antarmuka PCIe Gen 3.0 x4 M.2 2280. Mempercepat waktu boot sistem operasi, transfer file berukuran besar, dan waktu muat aplikasi hingga berlipat ganda.',
    specifications: [
      { label: 'Kapasitas', value: '1TB (1000 Gigabyte)' },
      { label: 'Form Factor', value: 'M.2 2280 NVMe' },
      { label: 'Antarmuka', value: 'PCIe Gen 3.0 x4, standar NVMe 1.3' },
      { label: 'Kecepatan Baca', value: 'Hingga 3500 MB/detik' },
      { label: 'Kecepatan Tulis', value: 'Hingga 3000 MB/detik' },
      { label: 'Ketahanan (TBW)', value: '600 Terabytes Written (TBW)' },
    ],
  },
];

