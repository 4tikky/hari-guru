# To My First and Forever Teacher

Situs penghormatan Hari Guru Nasional 25 November 2026 dari seorang putri untuk Ayah, guru di SMKN 1 Windusari.

## Pengembangan lokal

Gunakan Node.js 22 atau 24, lalu jalankan dari direktori proyek.

```sh
npm ci
npm run dev
```

Buka alamat yang ditampilkan Vite. Jalankan `npm run build` untuk memeriksa tipe dan membuat build produksi di `dist/`. Gunakan `npm run preview` untuk memeriksa hasil build secara lokal.

## Personalisasi

- Edit [src/data/tribute.ts](src/data/tribute.ts) untuk mengganti nama, sekolah, tanggal, narasi, pesan di buku catatan, isi surat, urutan galeri, keterangan foto, dan pengaturan musik.
- Tempatkan foto asli di [public/images](public/images). Gunakan nama dalam panduan di folder tersebut. Foto yang belum tersedia akan tampil sebagai placeholder berlabel. Untuk foto pembuka dan penutup, gunakan JPG lanskap yang dikompresi dengan subjek cukup jauh dari tepi.
- Ganti `public/audio/background-music.mp3` untuk memakai musik pilihan Anda. Situs menyertakan instrumental piano sintetis yang dibuat untuk proyek ini. Musik mulai setelah tombol pembuka ditekan. Untuk menonaktifkannya, kosongkan `music.src` di konfigurasi. Jika diinginkan, tambahkan `public/audio/paper-opening.mp3` untuk suara saat amplop dibuka.
- Perbarui judul, deskripsi, dan metadata Open Graph di [index.html](index.html) jika mengubah identitas situs. Ganti `public/images/social-card.png` untuk membuat kartu berbagi sendiri.

## Deploy ke Vercel

Impor repositori di Vercel dan pilih preset **Vite**. Gunakan `npm run build` sebagai perintah build dan `dist` sebagai direktori output. Tambahkan variabel `VITE_SITE_URL` berisi URL publik dengan HTTPS, tanpa garis miring di akhir, lalu deploy atau deploy ulang jika URL baru ditetapkan setelah deploy pertama. URL absolut ini diperlukan agar WhatsApp dapat mengambil gambar pratinjau. Situs berjalan sebagai situs statis dan tidak memerlukan backend atau akun pengguna.
