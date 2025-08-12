# Fitur CRUD Artikel - Taruna Karya

## Deskripsi
Fitur CRUD (Create, Read, Update, Delete) untuk mengelola artikel pada website Taruna Karya Kampung Ciperang. Sistem ini menggunakan localStorage untuk penyimpanan data dan dapat diakses melalui halaman admin.

## File yang Ditambahkan

### 1. `admin.html`
Halaman admin untuk mengelola artikel dengan fitur:
- Tambah artikel baru
- Edit artikel yang sudah ada
- Hapus artikel
- Tampilan daftar semua artikel

### 2. `article-manager.js`
JavaScript class untuk mengelola CRUD artikel:
- `ArticleManager` class dengan metode lengkap CRUD
- Penyimpanan data menggunakan localStorage
- Validasi form dan handling error
- Interface modal untuk add/edit artikel

### 3. `article-display.js`
JavaScript untuk menampilkan artikel di halaman utama:
- `ArticleDisplay` class untuk render artikel
- Modal detail artikel
- Formatting tanggal dan kategori
- Integrasi dengan sistem animasi yang ada

### 4. `README-ARTIKEL.md`
Dokumentasi lengkap fitur artikel

## Cara Menggunakan

### Mengakses Halaman Admin
1. Buka `admin.html` di browser
2. Atau klik tombol "Kelola Artikel" di section artikel pada halaman utama

### Menambah Artikel Baru
1. Klik tombol "Tambah Artikel Baru"
2. Isi form dengan data artikel:
   - Judul Artikel
   - Tanggal
   - Kategori (Kegiatan, Pengumuman, Laporan, Berita)
   - Deskripsi Singkat
   - Konten Artikel
3. Klik "Simpan"

### Mengedit Artikel
1. Klik icon edit (pensil) pada artikel yang ingin diedit
2. Ubah data yang diperlukan
3. Klik "Simpan"

### Menghapus Artikel
1. Klik icon hapus (tempat sampah) pada artikel
2. Konfirmasi penghapusan

### Melihat Artikel di Halaman Utama
1. Artikel akan otomatis tampil di section "Artikel & Dokumentasi"
2. Klik artikel untuk melihat detail lengkap dalam modal

## Struktur Data Artikel

```javascript
{
  id: number,           // ID unik artikel
  title: string,        // Judul artikel
  date: string,         // Tanggal (format: YYYY-MM-DD)
  category: string,     // Kategori: kegiatan, pengumuman, laporan, berita
  description: string,  // Deskripsi singkat
  content: string       // Konten lengkap artikel
}
```

## Kategori Artikel

1. **Kegiatan** - Laporan kegiatan organisasi
2. **Pengumuman** - Pengumuman penting
3. **Laporan** - Laporan resmi dan dokumentasi
4. **Berita** - Berita dan informasi umum

## Fitur Tambahan

### Penyimpanan Data
- Menggunakan localStorage browser
- Data tersimpan secara lokal di perangkat pengguna
- Artikel default akan dimuat jika belum ada data

### Responsive Design
- Halaman admin responsive untuk semua ukuran layar
- Modal dan form menyesuaikan ukuran layar

### Validasi
- Semua field wajib diisi
- Validasi format tanggal
- Konfirmasi sebelum menghapus artikel

### Animasi dan UX
- Smooth transitions dan hover effects
- Loading animations
- Modal dengan backdrop blur
- Consistent design dengan tema website

## Integrasi dengan Website Utama

Fitur artikel terintegrasi penuh dengan:
- Sistem navigasi yang ada
- Theme dan color scheme website
- Animasi scroll yang ada
- Responsive design yang konsisten

## Pengembangan Selanjutnya

Fitur yang dapat ditambahkan:
- Upload gambar untuk artikel
- Sistem pencarian artikel
- Filter berdasarkan kategori
- Pagination untuk artikel banyak
- Export artikel ke PDF
- Sistem komentar
- Integrasi dengan database server