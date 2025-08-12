-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  date DATE NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  image TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insert default articles
INSERT INTO articles (title, date, category, description, content) VALUES
('Pengajian Akbar 2025', '2025-01-15', 'kegiatan', 'Laporan lengkap kegiatan pengajian yang dihadiri ratusan jamaah.', 'Kegiatan pengajian akbar yang diselenggarakan pada tanggal 15 Januari 2025 telah berlangsung dengan sukses. Acara ini dihadiri oleh lebih dari 300 jamaah dari berbagai kalangan masyarakat Kampung Ciperang dan sekitarnya.\n\nAcara dimulai pukul 19.30 WIB dengan pembacaan ayat suci Al-Quran, dilanjutkan dengan ceramah dari Ustadz Ahmad Fauzi yang membahas tentang pentingnya menjaga silaturahmi dalam kehidupan bermasyarakat.\n\nKegiatan ini merupakan bagian dari program rutin Taruna Karya dalam membina kehidupan spiritual masyarakat Kampung Ciperang.'),
('Kerja Bakti RT 03', '2025-01-12', 'kegiatan', 'Dokumentasi kerja bakti membersihkan selokan dan area umum di RT 03.', 'Kegiatan kerja bakti di RT 03 telah dilaksanakan pada hari Minggu, 12 Januari 2025. Kegiatan ini diikuti oleh 45 warga yang dengan semangat gotong royong membersihkan lingkungan.\n\nArea yang dibersihkan meliputi:\n- Selokan sepanjang 500 meter\n- Taman RT dan area bermain anak\n- Jalan lingkungan RT 03\n- Pos ronda dan fasilitas umum\n\nKegiatan dimulai pukul 07.00 WIB dan selesai pukul 10.00 WIB. Setelah kegiatan, warga berkumpul untuk sarapan bersama yang telah disiapkan oleh ibu-ibu PKK.'),
('Laporan Kegiatan 2024', '2024-12-31', 'laporan', 'Rangkuman lengkap seluruh kegiatan dan pencapaian organisasi sepanjang tahun 2024.', 'Tahun 2024 telah menjadi tahun yang penuh prestasi bagi Taruna Karya Kampung Ciperang. Berikut adalah rangkuman kegiatan yang telah dilaksanakan:\n\nKEGIATAN RUTIN:\n- 52 kali kerja bakti mingguan\n- 104 kali pengajian rutin (Selasa & Jumat)\n- 12 kali rapat koordinasi bulanan\n\nKEGIATAN KHUSUS:\n- Perayaan HUT RI ke-79\n- Santunan anak yatim (3 kali)\n- Bakti sosial untuk korban bencana\n- Turnamen olahraga antar RT\n\nPENCAPAIAN:\n- Peningkatan partisipasi warga 35%\n- Dana sosial terkumpul Rp 15.000.000\n- 25 keluarga terbantu melalui program sosial')
ON CONFLICT DO NOTHING;