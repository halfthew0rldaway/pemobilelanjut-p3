REQ.md --- CompStore: Katalog Komputer
Dokumen requirement lengkap untuk coding agent / AI coding assistant.
Gunakan dokumen ini sebagai spesifikasi implementasi, bukan sekadar
inspirasi. Bangun aplikasi yang benar-benar bisa dijalankan, periksa
hasilnya, dan jangan mengklaim sesuatu berhasil jika belum diuji.
1. Informasi Proyek
- Nama aplikasi: CompStore
- Jenis aplikasi: Mobile app katalog komputer dan simulasi
  checkout
- Framework: React Native + Expo
- Navigasi: React Navigation Native Stack
- Bahasa: TypeScript disarankan untuk project baru. Jika project
  yang tersedia sudah memakai JavaScript, pertahankan JavaScript dan
  jangan mencampur keduanya tanpa alasan.
- Target: Android melalui Expo Go atau development build yang
  sesuai dengan dependency yang dipakai
- Backend: Tidak diperlukan
- Penyimpanan: Data produk lokal di source code
- Koneksi internet: Aplikasi utama harus tetap bisa digunakan
  tanpa API eksternal
- Tujuan akademik: Mempraktikkan interaction, event handling,
  Stack Navigation, passing data antar-screen, useState, dan
  feedback pengguna sesuai tugas Pertemuan 3.
Aplikasi ini adalah simulasi katalog dan checkout. Tidak ada pembayaran
sungguhan, transaksi server, akun pengguna, atau penyimpanan pesanan
permanen.
2. Konteks dan Tujuan Tugas
Buat aplikasi mobile sederhana bertema toko komputer. Pengguna dapat
melihat katalog produk, membuka detail suatu produk, menentukan jumlah
barang, melihat ringkasan checkout, dan mengonfirmasi pesanan demo.
Implementasi wajib memperlihatkan konsep yang dipelajari di kelas secara
nyata dalam source code. Jangan hanya membuat tampilan statis yang
menyerupai alur aplikasi. Navigasi dan data antar-screen harus
benar-benar bekerja.
Tujuan utama
1. Menampilkan daftar produk komputer dengan informasi yang mudah
   dibaca.
2. Membuka halaman detail berdasarkan produk yang dipilih pengguna.
3. Mengelola jumlah barang menggunakan React state.
4. Mengirim data produk antar-screen dengan React Navigation.
5. Menghitung total checkout dari harga dan jumlah aktual.
6. Memberikan feedback setelah pengguna mengonfirmasi pesanan.
7. Menghasilkan source code, screenshot aplikasi, dokumentasi, dan ZIP
   untuk pengumpulan.
Di luar scope
Jangan menambahkan fitur berikut kecuali diminta secara terpisah: -
Backend, REST API, GraphQL, atau cloud database. - Login, registrasi,
profil pengguna, atau role. - Pembayaran sungguhan, payment gateway,
atau integrasi bank. - Keranjang belanja multi-produk. - Sinkronisasi
stok real-time. - Notifikasi push. - Panel admin. - Fitur chat. -
Integrasi layanan eksternal yang membutuhkan API key. - Arsitektur
kompleks yang tidak diperlukan untuk tugas sederhana ini.
3. Requirement Akademik yang Wajib Dipenuhi
Pastikan semua poin berikut bisa ditunjukkan kepada dosen melalui
aplikasi dan source code.
3.1 Pressable atau TouchableOpacity
Gunakan Pressable dari React Native untuk tombol dan area interaktif.
TouchableOpacity boleh digunakan jika memang sesuai, tetapi utamakan
satu pola yang konsisten.
Minimal digunakan untuk: - Tombol Lihat Detail pada kartu produk. -
Tombol kembali di Detail. - Tombol tambah jumlah. - Tombol kurang
jumlah. - Tombol Beli Sekarang. - Tombol kembali di Checkout. - Tombol
Konfirmasi Pembelian. - Tombol Kembali ke Katalog setelah konfirmasi,
bila tersedia.
3.2 Event handling melalui onPress
Setiap kontrol interaktif harus memiliki onPress dengan aksi yang
benar. Jangan membuat tombol yang hanya dekoratif atau tidak memberikan
respons.
Contoh perilaku: - Lihat Detail membuka Detail untuk produk yang
tepat. - Plus menambah jumlah barang. - Minus mengurangi jumlah, tetapi
tidak kurang dari satu. - Beli Sekarang membuka Checkout dengan data
yang benar. - Konfirmasi Pembelian menampilkan feedback.
3.3 Stack Navigation
Implementasikan Stack Navigator dengan tiga screen: 1. Home 2.
Detail 3. Checkout
Daftarkan ketiga screen dalam navigator dan atur judul/header secara
konsisten. Header bawaan React Navigation boleh digunakan atau diganti
dengan header custom, tetapi tombol kembali harus jelas dan fungsional.
3.4 navigation.navigate()
Gunakan navigation.navigate() untuk perpindahan screen utama: - Home →
Detail - Detail → Checkout
Kirim parameter yang dibutuhkan pada saat navigasi.
3.5 navigation.goBack()
Gunakan navigation.goBack() untuk kembali dari: - Detail → Home -
Checkout → Detail
Pastikan tombol kembali tidak menyebabkan crash. Jangan memanggil
goBack() jika tidak ada screen sebelumnya tanpa fallback yang masuk
akal.
3.6 Passing data antar-screen
Alur data wajib: - Home mengirim data produk yang dipilih ke Detail. -
Detail membaca data produk dari parameter navigasi. - Detail mengirim
produk dan jumlah barang ke Checkout. - Checkout membaca data tersebut
dan menghitung totalnya.
Jangan hard-code produk tertentu di screen Detail atau Checkout. Screen
harus menampilkan data sesuai produk yang dipilih pengguna.
3.7 route.params
Gunakan route.params pada screen penerima untuk mengambil parameter
navigasi. Jika memakai TypeScript, definisikan tipe parameter navigator
agar data yang dikirim dan diterima konsisten.
3.8 useState
Gunakan useState setidaknya untuk mengelola jumlah barang di Detail.
State harus memengaruhi UI dan nilai jumlah yang diteruskan ke Checkout.
3.9 Feedback pengguna
Setelah pengguna menekan Konfirmasi Pembelian, tampilkan feedback yang
jelas menggunakan Alert atau komponen feedback sederhana. Contoh:
"Pesanan demo berhasil dikonfirmasi."
Jelaskan bahwa ini adalah simulasi. Jangan menampilkan klaim pembayaran
berhasil atau transaksi sungguhan.
4. Teknologi dan Setup
Gunakan: - React Native - Expo - TypeScript untuk project baru, kecuali
project yang sudah ada menggunakan JavaScript -
@react-navigation/native - @react-navigation/native-stack -
Dependency pendukung React Navigation yang sesuai dengan versi Expo -
React hooks - StyleSheet dari React Native untuk styling, kecuali
project yang ada sudah memiliki solusi styling konsisten
Ketentuan setup
1. Periksa folder kerja sebelum mengubah apa pun.
2. Jika sudah ada project Expo, gunakan dan pertahankan konfigurasi
   yang berfungsi.
3. Jika belum ada project, buat project Expo yang sesuai.
4. Instal dependency menggunakan perintah yang kompatibel dengan Expo,
   misalnya npx expo install untuk dependency native.
5. Ikuti dokumentasi React Navigation yang cocok dengan versi Expo dan
   React Native project.
6. Jangan menebak versi paket secara acak.
7. Jangan menghapus konfigurasi yang ada tanpa alasan.
8. Pastikan perintah menjalankan aplikasi dicantumkan dalam README.
5. Konsep Produk dan Konten
Nama aplikasi adalah CompStore. Aplikasi menampilkan katalog produk
komputer dengan gaya toko komputer lokal yang rapi dan mudah digunakan.
Gunakan minimal enam produk demo berikut. Harga ini hanya data contoh
untuk aplikasi, bukan klaim harga pasar terkini.
  ID               Nama Produk                Kategori         Harga Demo
  pc-001         CompStore Gaming PC R5     PC Desktop     Rp12.500.000
  laptop-001     CompStore ProBook 14       Laptop          Rp8.750.000
  monitor-001    CompStore IPS 24           Monitor         Rp1.650.000
  keyboard-001   CompStore Mechanical K87   Keyboard          Rp650.000
  mouse-001      CompStore Gaming Mouse     Mouse             Rp275.000
  ssd-001        CompStore NVMe 1TB         Storage         Rp1.050.000
Boleh memperbaiki nama produk agar lebih natural, tetapi pertahankan
minimal enam kategori/item yang berbeda dan harga demo yang konsisten di
semua screen.
5.1 Struktur data produk
Setiap produk setidaknya memiliki: - id: identifier unik berbentuk
string - name: nama produk - category: kategori - price: harga
numerik dalam Rupiah, bukan string berformat - description: deskripsi
singkat - specifications: kumpulan spesifikasi yang relevan - image:
referensi asset lokal opsional
Gunakan tipe data konsisten. Simpan harga sebagai angka agar perhitungan
tidak bergantung pada parsing string seperti Rp12.500.000.
Untuk spesifikasi, gunakan struktur data yang jelas, misalnya daftar
pasangan label dan nilai. Tampilkan hanya spesifikasi yang relevan
dengan kategori produk. Jangan menampilkan spesifikasi PC desktop untuk
mouse atau monitor.
5.2 Data produk terpusat
Simpan daftar produk dalam satu file data, misalnya
src/data/products.ts. Semua screen harus menggunakan sumber data yang
sama. Hindari menyalin data produk secara manual ke masing-masing
screen.
6. Detail Kebutuhan Tiap Screen
6.1 Home Screen --- Katalog Produk
Tujuan
Menjadi halaman awal aplikasi dan titik masuk untuk memilih produk.
Konten wajib
- Header dengan nama CompStore.
- Subjudul singkat, misalnya "Temukan perangkat yang sesuai
  kebutuhanmu".
- Daftar minimal enam produk.
- Kartu produk yang menampilkan:
  - Gambar atau placeholder produk.
  - Nama produk.
  - Kategori.
  - Harga dengan format Rupiah.
  - Tombol Lihat Detail.
- Layout list atau grid yang cocok untuk layar ponsel.
- Scroll vertikal jika seluruh produk tidak muat di layar.
Perilaku
- Menekan Lihat Detail membuka screen Detail.
- Produk yang dibuka harus sama dengan produk pada kartu yang ditekan.
- Kirim data produk yang dipilih melalui parameter navigasi.
- Pastikan semua kartu dapat dibuka.
- Gunakan product.id sebagai key untuk daftar.
- Bila memakai filter kategori sebagai fitur tambahan, pastikan filter
  benar-benar bekerja. Fitur ini opsional dan tidak boleh menggantikan
  requirement utama.
Empty state dan error
Data lokal seharusnya tersedia. Meski demikian, bila daftar kosong,
tampilkan pesan kosong yang wajar alih-alih membuat screen rusak.
6.2 Detail Screen --- Detail Produk
Tujuan
Menampilkan informasi produk yang dipilih dan memungkinkan pengguna
memilih jumlah barang.
Konten wajib
- Tombol kembali yang memanggil navigation.goBack().
- Gambar atau placeholder produk.
- Nama produk.
- Kategori.
- Harga satuan.
- Deskripsi.
- Daftar spesifikasi.
- Kontrol jumlah barang dengan tombol minus dan plus.
- Label jumlah barang yang dipilih.
- Tombol Beli Sekarang.
Perilaku jumlah barang
- Nilai awal jumlah adalah 1.
- Tombol plus menambah jumlah satu per satu.
- Tombol minus mengurangi jumlah satu per satu.
- Jumlah minimum adalah 1.
- Tombol minus dapat dinonaktifkan ketika jumlah sudah 1, atau tetap
  bisa ditekan tetapi tidak mengubah nilai di bawah 1.
- Jumlah yang terlihat harus selalu sesuai dengan state.
- Jangan menggunakan manipulasi DOM atau pola web; gunakan state React
  Native.
Perilaku navigasi
- Baca data produk dari route.params.
- Jangan memilih produk berdasarkan nama hard-coded.
- Saat tombol Beli Sekarang ditekan, gunakan navigation.navigate()
  untuk membuka Checkout.
- Kirim data produk dan jumlah terbaru ke Checkout.
- Pastikan jumlah yang dikirim sama dengan jumlah yang dipilih
  pengguna.
Parameter tidak valid
Jika Detail dibuka tanpa parameter produk yang valid: - Jangan membuat
aplikasi crash. - Tampilkan pesan error yang ramah atau fallback yang
masuk akal. - Sediakan tombol kembali ke katalog. - Jangan menampilkan
data produk palsu seolah-olah valid.
6.3 Checkout Screen --- Ringkasan Pembelian
Tujuan
Menampilkan ringkasan produk dan simulasi konfirmasi pesanan.
Konten wajib
- Tombol kembali yang memanggil navigation.goBack().
- Judul Ringkasan Pembelian.
- Nama produk.
- Kategori produk.
- Harga satuan.
- Jumlah barang.
- Total harga.
- Tombol Konfirmasi Pembelian.
- Feedback yang muncul setelah konfirmasi.
Perhitungan
Hitung total dengan rumus:
total = hargaSatuan × jumlah
Jangan mengirim atau menggunakan nilai total statis yang sudah
di-hard-code. Hitung total berdasarkan parameter produk dan jumlah yang
diterima Checkout.
Format harga dan total menggunakan format Rupiah Indonesia, misalnya: -
Rp275.000 - Rp550.000
Gunakan helper formatter terpusat agar format konsisten di seluruh
screen.
Perilaku konfirmasi
Ketika Konfirmasi Pembelian ditekan: - Tampilkan Alert atau feedback
UI yang jelas. - Pesan harus menyatakan bahwa pesanan demo telah
dikonfirmasi, bukan pembayaran nyata. - Hindari membuat pesanan permanen
atau mengklaim transaksi server. - Cegah aksi ganda yang tidak perlu
jika tombol ditekan berulang kali, bila implementasinya membutuhkan
state konfirmasi.
Sediakan cara kembali ke katalog, misalnya tombol Kembali ke Katalog.
Tombol ini harus mengarahkan pengguna ke Home secara konsisten, tanpa
meninggalkan rangkaian screen duplikat yang membingungkan. Gunakan
pendekatan React Navigation yang sesuai untuk mereset atau kembali ke
route Home. Jangan menggunakan API navigasi yang tidak tersedia pada
versi paket yang terpasang.
Parameter tidak valid
Jika produk atau jumlah tidak tersedia: - Jangan menghitung NaN atau
menampilkan total yang salah. - Tampilkan pesan error yang jelas. -
Sediakan cara kembali ke screen sebelumnya atau katalog. - Validasi
bahwa harga dan jumlah adalah angka valid serta jumlah minimal 1.
7. Alur Data dan Navigasi yang Diharapkan
Alur utama:
Home → Detail → Checkout
Home → Detail
Home mengirim produk yang dipilih. Detail membaca produk dari
route.params.
Contoh konseptual parameter: - product: objek produk yang dipilih
Detail → Checkout
Detail mengirim: - product: produk yang dipilih - quantity: jumlah
barang yang dipilih
Checkout menggunakan data tersebut untuk menampilkan ringkasan dan
menghitung total.
Navigasi kembali
- Detail → Home melalui navigation.goBack().
- Checkout → Detail melalui navigation.goBack().
- Setelah konfirmasi, tombol Kembali ke Katalog mengarahkan pengguna
  ke Home dengan stack yang tetap masuk akal.
Jangan menduplikasi state yang tidak diperlukan. Karena aplikasi ini
sederhana dan tidak membutuhkan backend, tidak perlu membuat global
state management seperti Redux.
8. TypeScript dan Tipe Navigasi
Jika memakai TypeScript: - Definisikan tipe data Product. -
Definisikan parameter list untuk stack navigator. - Pastikan tipe
Home, Detail, dan Checkout mencerminkan parameter yang benar. -
Detail harus memiliki parameter produk. - Checkout harus memiliki
parameter produk dan jumlah. - Hindari any jika tipe yang benar dapat
didefinisikan dengan mudah. - Tangani parameter yang mungkin tidak
tersedia saat runtime meskipun tipe sudah didefinisikan.
Jika project memakai JavaScript, tetap gunakan bentuk data yang
konsisten dan lakukan validasi runtime.
9. UI/UX dan Visual Design
Buat aplikasi yang terlihat seperti aplikasi katalog toko komputer
mobile yang wajar, bukan website desktop yang diperkecil.
Arah visual
- Desain sederhana, bersih, dan fungsional.
- Prioritaskan light theme.
- Gunakan latar terang dan permukaan putih atau abu-abu muda.
- Pilih satu warna aksen solid yang konsisten, misalnya biru tua atau
  biru standar.
- Gunakan tipografi yang mudah dibaca.
- Terapkan spacing yang konsisten.
- Tampilkan harga dengan hierarki visual yang jelas.
- Gunakan card dengan border atau elevation ringan seperlunya.
- Gunakan radius secukupnya dan konsisten.
Hindari
- Gradient.
- Glassmorphism.
- Neon atau glow.
- Dekorasi berlebihan.
- Emoji sebagai pengganti ikon produk.
- Efek animasi yang tidak dibutuhkan.
- Komponen yang tampak seperti dashboard desktop.
- Font terlalu kecil.
- Layout yang membuat konten terpotong.
- Tombol yang terlalu kecil untuk disentuh.
- Menambahkan fitur hanya demi membuat aplikasi terlihat kompleks.
Responsivitas
- Uji layout pada layar ponsel berukuran kecil dan umum.
- Gunakan ScrollView atau FlatList yang sesuai.
- Pastikan tidak ada horizontal overflow.
- Pastikan harga panjang dan nama produk tidak merusak layout.
- Gunakan safe area yang sesuai.
- Jangan menempatkan konten penting di bawah area status bar atau
  navigation bar.
- Hindari tinggi card yang terlalu kaku jika teks dapat berbeda
  panjang.
- Pastikan tombol utama tetap mudah ditemukan.
Gambar produk
- Utamakan asset lokal yang benar-benar tersedia di folder project.
- Jika tidak ada gambar, buat placeholder visual yang rapi menggunakan
  komponen native.
- Jangan menambahkan referensi gambar lokal yang filenya tidak ada.
- Hindari ketergantungan pada URL gambar eksternal yang dapat gagal
  saat offline.
- Jika memakai asset gambar, pastikan pemetaan file sesuai produk dan
  semua file disertakan dalam project.
10. Komponen yang Disarankan
Buat komponen reusable hanya bila membantu mengurangi duplikasi.
ProductCard
Tanggung jawab: - Menampilkan ringkasan satu produk. - Menampilkan
gambar/placeholder, nama, kategori, dan harga. - Menyediakan tombol
Lihat Detail. - Menerima produk dan callback melalui props.
QuantitySelector
Tanggung jawab: - Menampilkan jumlah saat ini. - Menyediakan tombol plus
dan minus. - Menegakkan jumlah minimum 1. - Mengirim perubahan melalui
callback.
Formatter harga
Buat helper, misalnya formatCurrency(price: number), untuk
menghasilkan format Rupiah yang konsisten menggunakan
Intl.NumberFormat jika tersedia pada runtime yang ditargetkan. Jika
ada kendala kompatibilitas, gunakan solusi formatter yang sederhana dan
diuji.
Navigasi
Simpan konfigurasi stack navigator di file tersendiri bila itu membuat
struktur lebih jelas.
Jangan membuat terlalu banyak komponen kecil yang hanya menambah
kompleksitas.
11. Struktur Folder yang Disarankan
Struktur ini adalah panduan. Sesuaikan dengan project yang sudah ada dan
jangan memindahkan file secara tidak perlu.
CompStore/
├── assets/
│   └── products/
│       ├── gaming-pc.png
│       ├── laptop.png
│       ├── monitor.png
│       ├── keyboard.png
│       ├── mouse.png
│       └── ssd.png
├── src/
│   ├── components/
│   │   ├── ProductCard.tsx
│   │   └── QuantitySelector.tsx
│   ├── data/
│   │   └── products.ts
│   ├── navigation/
│   │   └── AppNavigator.tsx
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   ├── DetailScreen.tsx
│   │   └── CheckoutScreen.tsx
│   ├── types/
│   │   ├── product.ts
│   │   └── navigation.ts
│   └── utils/
│       └── formatCurrency.ts
├── App.tsx
├── package.json
├── README.md
└── REQ.md
Jika asset gambar tidak digunakan, jangan membuat file gambar kosong.
Placeholder dapat dibuat langsung di komponen.
12. Aksesibilitas dan Detail Interaksi
- Gunakan label tombol yang jelas dalam Bahasa Indonesia.
- Pastikan area tekan cukup besar.
- Gunakan accessibilityRole="button" atau properti aksesibilitas
  yang relevan pada kontrol custom.
- Beri nama aksesibilitas yang bermakna jika ikon digunakan untuk
  plus, minus, atau kembali.
- Jangan mengandalkan warna saja untuk menyampaikan status.
- Pastikan teks memiliki kontras yang memadai.
- Pastikan state jumlah dapat dibaca jelas.
- Jangan biarkan tombol tampak aktif bila memang tidak bisa digunakan
  tanpa alasan visual.
13. Validasi dan Penanganan Error
Implementasikan pengecekan berikut: - ID produk unik. - Data produk
tersedia di katalog. - Parameter produk valid sebelum digunakan. - Harga
berupa angka valid. - Jumlah berupa integer dan minimal 1. - Total
checkout berupa hasil perhitungan aktual. - Tidak ada referensi gambar
yang hilang. - Tidak ada import dependency yang belum terpasang. - Tidak
ada tombol yang tidak memiliki aksi. - Tidak ada NaN, undefined,
atau data yang salah tampil pada UI. - Jangan menutupi error dengan
fallback data palsu yang membuat seolah-olah produk valid.
14. Pengujian Manual Wajib
Jalankan dan periksa setidaknya skenario berikut.
1. Aplikasi berhasil dimulai menggunakan command yang dicantumkan di
   README.
2. Home tampil dengan nama CompStore.
3. Home menampilkan minimal enam produk.
4. Nama, kategori, dan harga produk tampil dengan benar.
5. Menekan Lihat Detail pada produk pertama membuka produk yang sama.
6. Menekan Lihat Detail pada produk lain menampilkan produk lain yang
   benar.
7. Tombol kembali di Detail mengembalikan pengguna ke Home.
8. Jumlah awal pada Detail adalah 1.
9. Menekan plus mengubah jumlah menjadi 2.
10. Menekan minus mengembalikan jumlah menjadi 1.
11. Jumlah tidak pernah kurang dari 1.
12. Menekan Beli Sekarang membuka Checkout.
13. Checkout menampilkan produk yang dipilih.
14. Checkout menampilkan jumlah yang dipilih.
15. Total checkout sama dengan harga dikali jumlah.
16. Harga dan total menggunakan format Rupiah yang konsisten.
17. Tombol kembali di Checkout kembali ke Detail.
18. Konfirmasi Pembelian menampilkan feedback.
19. Tombol Kembali ke Katalog membawa pengguna ke Home.
20. Tidak ada crash karena parameter kosong atau tidak valid.
21. Tidak ada error asset hilang.
22. Tidak ada error import atau dependency utama.
23. Layout tidak overflow secara horizontal pada layar ponsel.
24. Semua tombol utama bisa digunakan.
Jalankan pemeriksaan yang memang tersedia pada project, misalnya
TypeScript check atau lint bila script-nya tersedia. Jangan mengarang
hasil pengujian. Jika tidak bisa menjalankan emulator/device, jelaskan
bahwa pengujian perangkat belum dilakukan.
15. Screenshot dan Dokumentasi Pengumpulan
Siapkan folder output pengumpulan, misalnya:
submission/
├── screenshots/
│   ├── 01-home.png
│   ├── 02-detail.png
│   ├── 03-checkout.png
│   └── 04-navigation-flow.png
└── dokumentasi.md
Screenshot yang diperlukan: - Home dengan katalog produk terlihat. -
Detail dengan informasi produk dan kontrol jumlah. - Checkout dengan
ringkasan dan total. - Screenshot atau ilustrasi dokumentasi alur
navigasi.
Aturan screenshot: - Screenshot UI harus berasal dari aplikasi yang
benar-benar dijalankan. - Jangan membuat screenshot palsu atau mengklaim
mockup sebagai screenshot aplikasi. - Jika screenshot perangkat belum
dapat diambil, jelaskan apa yang belum dilakukan dan berikan langkah
pengambilan screenshot. - Diagram alur navigasi boleh dibuat sebagai
dokumentasi, tetapi jangan menyebutnya sebagai screenshot aplikasi.
Dokumentasi singkat harus menjelaskan: - Nama dan tujuan aplikasi. -
Teknologi yang digunakan. - Daftar screen. - Alur Home → Detail →
Checkout. - Contoh passing data melalui parameter navigasi. - Penggunaan
Pressable, onPress, useState, navigate, goBack, dan
route.params. - Cara menjalankan aplikasi. - Batasan bahwa checkout
hanya simulasi.
Jika nama dan NIM mahasiswa belum diberikan, gunakan placeholder yang
mudah diganti. Jangan mengarang identitas.
16. File ZIP Pengumpulan
Buat ZIP bernama:
Nama_NIM_TugasPertemuan3.zip
ZIP harus berisi: - Source code yang diperlukan untuk menjalankan
aplikasi. - package.json. - Lockfile jika tersedia. - README.md atau
dokumentasi cara menjalankan. - REQ.md. - Screenshot yang benar-benar
diambil. - Dokumentasi singkat.
Jangan sertakan node_modules karena ukurannya besar dan dapat diinstal
ulang dari manifest dependency. Jangan menyertakan cache build yang
tidak diperlukan. Pastikan path folder di dalam ZIP jelas dan tidak
bertingkat secara tidak sengaja.
Jika identitas belum tersedia, gunakan nama file placeholder dan beri
tahu pengguna untuk menggantinya sebelum pengumpulan.
17. README dan Cara Menjalankan
Buat README yang mencakup: - Deskripsi singkat CompStore. - Fitur dan
screen. - Dependency utama. - Prasyarat menjalankan project. - Langkah
instalasi dependency. - Command menjalankan Expo. - Cara membuka
aplikasi pada Expo Go atau emulator yang sesuai. - Catatan bahwa
aplikasi tidak menggunakan backend dan checkout hanya simulasi.
Jangan menuliskan command yang tidak sesuai dengan package.json
aktual. Periksa script dan versi dependency sebelum
mendokumentasikannya.
18. Kriteria Penerimaan
Project dianggap selesai jika seluruh poin berikut dipenuhi:
Fungsional
- [ ] Aplikasi Expo dapat dijalankan.
- [ ] Home menampilkan minimal enam produk.
- [ ] Detail menampilkan produk yang dipilih.
- [ ] Checkout menampilkan produk dan jumlah yang benar.
- [ ] Total checkout dihitung dari harga dan jumlah.
- [ ] Konfirmasi menampilkan feedback.
- [ ] Tombol kembali berfungsi.
Persyaratan materi
- [ ] Menggunakan Pressable atau TouchableOpacity.
- [ ] Menggunakan onPress.
- [ ] Menggunakan Stack Navigation.
- [ ] Menggunakan navigation.navigate().
- [ ] Menggunakan navigation.goBack().
- [ ] Mengirim data antar-screen.
- [ ] Menggunakan route.params.
- [ ] Menggunakan useState.
- [ ] Memberikan feedback setelah interaksi.
Kualitas
- [ ] UI rapi dan mobile-first.
- [ ] Tidak ada horizontal overflow yang jelas.
- [ ] Tidak ada asset yang hilang.
- [ ] Tidak ada error penting yang diketahui.
- [ ] Kode mudah dibaca dan tidak berlebihan.
- [ ] README menjelaskan cara menjalankan.
- [ ] Screenshot berasal dari aplikasi yang benar-benar dijalankan.
- [ ] ZIP pengumpulan tersedia dan isinya diperiksa.
19. Instruksi Eksekusi untuk AI Coding Agent
Kerjakan tugas ini secara end-to-end. Jangan berhenti setelah memberi
rencana, snippet, atau daftar langkah.
1. Inspect: Periksa isi folder kerja, file yang tersedia, dan
   apakah project Expo sudah ada.
2. Plan: Tentukan perubahan minimum yang diperlukan berdasarkan
   project aktual.
3. Setup: Buat atau sesuaikan project Expo dan dependency yang
   diperlukan.
4. Implement: Buat data produk, navigasi stack, Home, Detail,
   Checkout, komponen reusable seperlunya, formatter harga, dan
   penanganan parameter.
5. Verify: Jalankan pemeriksaan yang tersedia. Perbaiki error yang
   ditemukan sebelum menyatakan selesai.
6. Test: Uji alur utama dengan cara yang tersedia. Bedakan
   pengujian yang benar-benar dilakukan dari pengujian yang belum
   dilakukan.
7. Document: Buat README dan dokumentasi tugas.
8. Capture: Ambil screenshot aktual bila environment memungkinkan.
   Jangan mengarang screenshot.
9. Package: Buat ZIP pengumpulan dengan nama yang diminta. Jangan
   memasukkan node_modules.
10. Report: Berikan ringkasan file yang dibuat, command untuk
    menjalankan aplikasi, pengujian yang dilakukan dan hasilnya, serta
    lokasi file ZIP.
Jangan mengubah scope menjadi aplikasi e-commerce besar. Fokus pada
pemenuhan materi perkuliahan, fungsi navigasi dan passing data yang
benar, UI mobile yang rapi, serta hasil pengumpulan yang lengkap.
20. Instruksi untuk Pengguna
Sebelum dikumpulkan: - Ganti placeholder nama dan NIM jika digunakan. -
Jalankan aplikasi di perangkat atau emulator. - Periksa kembali tampilan
dan alur. - Pastikan screenshot sesuai dengan hasil aplikasi aktual. -
Periksa ZIP dan pastikan source code serta dokumentasi sudah ada.