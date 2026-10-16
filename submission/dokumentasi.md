# Dokumentasi Tugas Pertemuan 3: CompStore (Katalog Komputer & Checkout)

**Nama Mahasiswa:** Wisnu Widya Pradana  
**NIM:** 411231088  
**Mata Kuliah:** Pemrograman Mobile Lanjut  
**Pertemuan:** 3 (Interaction, Navigation & State Management)  

---

## 1. Deskripsi & Tujuan Aplikasi

**CompStore** adalah aplikasi mobile berbasis **React Native + Expo** yang mensimulasikan katalog produk toko komputer lokal dan alur checkout pemesanan. Aplikasi ini dirancang untuk memenuhi capaian pembelajaran Pertemuan 3, yaitu:
1. Menampilkan daftar perangkat keras komputer dengan tata letak mobile-first yang bersih dan terstruktur.
2. Menerapkan navigasi hierarkis antar-layar menggunakan **React Navigation Native Stack**.
3. Mengirimkan objek data secara dinamis dari katalog ke detail, lalu meneruskan produk beserta jumlah pembelian ke layar checkout.
4. Mengelola state kuantitas barang secara reaktif dengan hook `useState`.
5. Menghitung total transaksi secara akurat berdasarkan kuantitas dan harga satuan aktual.
6. Memberikan umpan balik interaktif (*user feedback*) saat pengguna mengonfirmasi pesanan demo.

> **Catatan Batasan Aplikasi:**  
> Aplikasi ini bekerja 100% secara client-side tanpa backend database dan tanpa gateway pembayaran sungguhan. Konfirmasi pembelian merupakan simulasi akademik.

---

## 2. Teknologi & Dependensi Utama

- **Framework:** React Native (`0.88.0`) + Expo SDK (`58.0.13`)
- **Bahasa:** TypeScript (`6.0.3`) dengan konfigurasi tipe ketat
- **Navigasi:** `@react-navigation/native` & `@react-navigation/native-stack`
- **Komponen Native Pendukung:** `react-native-screens`, `react-native-safe-area-context`
- **Platform Target:** Android (via Expo Go atau Android Emulator) dan Web

---

## 3. Daftar Layar (Screens)

| Layar | File Sumber | Fungsi Utama |
| :--- | :--- | :--- |
| **Home Screen** | `src/screens/HomeScreen.tsx` | Menampilkan header toko CompStore, subjudul, dan daftar 6 produk komputer dalam kartu terstruktur dengan tombol *Lihat Detail*. |
| **Detail Screen** | `src/screens/DetailScreen.tsx` | Menampilkan detail spesifikasi perangkat yang dipilih, kontrol penambahan/pengurangan kuantitas, estimasi subtotal, dan tombol *Beli Sekarang*. |
| **Checkout Screen** | `src/screens/CheckoutScreen.tsx` | Menampilkan ringkasan pesanan, perkalian harga total (`price * quantity`), tombol *Konfirmasi Pembelian*, feedback konfirmasi, dan tombol kembali ke katalog. |

---

## 4. Alur Navigasi & Aliran Data (*Data Flow*)

Alur utama aplikasi bergerak linear dari katalog menuju ringkasan pembelian:

```
[Home Screen] 
    │ 
    │  navigation.navigate('Detail', { product })
    ▼
[Detail Screen] 
    │ 
    │  navigation.navigate('Checkout', { product, quantity })
    ▼
[Checkout Screen]
    │
    │  navigation.navigate('Home')
    ▼
[Home Screen (Kembali ke Katalog)]
```

### Navigasi Kembali:
- Dari **Detail** ke **Home** menggunakan `navigation.goBack()`.
- Dari **Checkout** ke **Detail** menggunakan `navigation.goBack()`.
- Dari **Checkout** kembali ke katalog utama menggunakan `navigation.navigate('Home')`.

---

## 5. Implementasi Konsep Akademik

### 5.1. Penggunaan `Pressable` dan `onPress`
Seluruh tombol dan area interaktif menggunakan komponen `Pressable` dari React Native dengan penanganan feedback visual `pressed` dan event `onPress`:
- Tombol **"Lihat Detail"** pada kartu produk.
- Tombol navigasi **"← Kembali ke Katalog"** dan **"← Kembali ke Detail"**.
- Tombol **`+`** (tambah jumlah) dan **`−`** (kurang jumlah) pada `QuantitySelector`.
- Tombol **"Beli Sekarang"** pada layar detail.
- Tombol **"Konfirmasi Pembelian"** dan **"Kembali ke Katalog"** pada layar checkout.

### 5.2. Penggunaan `useState`
State jumlah barang dikelola di `src/screens/DetailScreen.tsx`:
```tsx
const [quantity, setQuantity] = useState<number>(1);

const handleIncrease = () => {
  setQuantity((prev) => prev + 1);
};

const handleDecrease = () => {
  setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
};
```
Kuantitas tidak dapat bernilai kurang dari 1, dan tombol minus secara otomatis dinonaktifkan (`disabled`) saat kuantitas bernilai 1.

### 5.3. Passing Data Antar-Layar & `route.params`
Definisi tipe parameter navigasi terpusat pada `src/types/navigation.ts`:
```tsx
export type RootStackParamList = {
  Home: undefined;
  Detail: { product: Product };
  Checkout: { product: Product; quantity: number };
};
```

1. **Home → Detail:**
   ```tsx
   navigation.navigate('Detail', { product });
   ```
   Diterima di `DetailScreen.tsx`:
   ```tsx
   const product = route.params?.product;
   ```

2. **Detail → Checkout:**
   ```tsx
   navigation.navigate('Checkout', { product, quantity });
   ```
   Diterima di `CheckoutScreen.tsx`:
   ```tsx
   const product = route.params?.product;
   const quantity = route.params?.quantity;
   ```

### 5.4. Perhitungan Total Dinamis
Total harga tidak di-hardcode melainkan dikalkulasikan secara aktual:
```tsx
const total = product.price * quantity;
```
Semua tampilan nominal harga menggunakan fungsi pembantu `formatCurrency(price)` yang menghasilkan format mata uang Rupiah standar (contoh: `Rp12.500.000`).

### 5.5. Umpan Balik Pengguna (*User Feedback*)
Saat tombol **"Konfirmasi Pembelian"** ditekan:
- Menampilkan dialog notifikasi (`Alert.alert` atau browser dialog pada platform web) yang mengonfirmasi bahwa pesanan demo berhasil dicatat serta menegaskan batasan simulasi.
- Menampilkan kartu banner konfirmasi pesanan di dalam antarmuka aplikasi.
- Menonaktifkan tombol konfirmasi agar tidak terjadi submit ganda (*idempotent*).

---

## 6. Dokumentasi Tangkapan Layar (Screenshots)

Tangkapan layar diambil secara langsung dari aplikasi yang berjalan aktif:

1. **Home Screen (`01-home.png`):** Menampilkan daftar katalog produk CompStore dengan kartu harga dan tombol detail.
2. **Detail Screen (`02-detail.png`):** Menampilkan spesifikasi teknis produk terpilih dan kontrol kuantitas interaktif.
3. **Checkout Screen (`03-checkout.png`):** Menampilkan ringkasan pesanan, kalkulasi total yang tepat, dan banner feedback konfirmasi.
4. **Diagram Alur Navigasi (`04-navigation-flow.png`):** Diagram arsitektur transisi layar dan aliran parameter navigasi.

*(Semua berkas gambar tersimpan di dalam folder `submission/screenshots/`)*

---

## 7. Petunjuk Menjalankan Aplikasi

1. Ekstrak berkas proyek atau buka direktori proyek di terminal.
2. Pastikan dependensi telah terinstal:
   ```bash
   npm install
   ```
3. Jalankan aplikasi menggunakan Expo:
   ```bash
   # Menjalankan Expo development server
   npm start
   
   # Atau langsung di Android Emulator / Expo Go
   npm run android
   
   # Atau di Web Browser
   npm run web
   ```
4. Buka aplikasi di smartphone melalui aplikasi **Expo Go** dengan memindai kode QR yang muncul di terminal.

