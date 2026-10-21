# Catatan Ritase

Aplikasi web untuk mencatat ritase harian dump truck: jarak loading ke dumping dihitung otomatis, ada rekap per loading dan dumping (termasuk BD di jalan), tambah lokasi sendiri, dan perkiraan gaji. Bisa dipakai tanpa sinyal setelah dibuka sekali.

## Pasang di HP
1. Buka alamat GitHub Pages repository ini di Safari (iPhone) atau Chrome (Android) saat ada sinyal.
2. iPhone: ketuk Bagikan, lalu Tambahkan ke Layar Utama. Android: menu Chrome, lalu Instal aplikasi atau Tambahkan ke layar utama.
3. Buka dari ikon di layar utama. Setelah itu aplikasi jalan tanpa sinyal.

## Periode buku
Buka buku tanggal 29 dan tutup buku tanggal 28 (bisa diubah di tab Gaji). Tiap periode punya catatan, rekap, dan hitungan gaji sendiri. Daftar periode tiap bulan sudah tersedia, mulai September – Oktober 2026, dan tinggal dipilih. Ketuk Tutup buku untuk mengunci catatan periode, dan Periode berikutnya untuk pindah ke periode selanjutnya.

## Data
Semua catatan tersimpan di browser HP masing-masing, tidak dikirim ke mana pun. Unduh cadangan dari tab Gaji secara berkala. Jangan hapus data situs di pengaturan browser.

## Catatan
- Daftar lokasi dan jarak bawaan berasal dari data master PT. Weda Bay Nickel. Ubah di tab Lokasi.
- Nama, NIP, dan angka gaji dikosongkan. Isi sendiri di tab Gaji.
- Setelah mengganti file di repository, naikkan angka VERSI di `sw.js` (misalnya `ritase-v2`) supaya HP mengambil versi baru.

## Pembaruan v18
- Rumus BD "Lanjut ke dumping": total KM slot = jarak loading ke titik BD + jarak titik BD ke KM absolut dumping (POS12 27, Parkiran KR 38, Parkiran Tofu/Gantungan 68; bisa diubah di tab Lokasi).
- Tab **Driver**: input data driver, gaji, aturan buku, isian periode, serta tombol Reset HK dan Reset rekapan (periode terpilih saja, ketuk dua kali).
- Setelah mengganti file di GitHub, tutup dan buka lagi aplikasi (service worker v18) agar versi baru aktif.


## Konfigurasi kontrak (penting)
Nilai gaji terkunci (tarif, gaji pokok, insentif, onsite, BPJS, PPh) diisi di objek `CONTRACT.fixed` di dalam `index.html`. Ganti angka sesuai offering letter. Nama & NIP bisa diisi di tab Driver.
