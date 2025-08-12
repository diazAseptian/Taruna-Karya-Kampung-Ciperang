export default function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Default articles data
    const defaultArticles = [
        {
            id: 1,
            title: "Pengajian Akbar 2025",
            date: "2025-01-15",
            category: "kegiatan",
            description: "Laporan lengkap kegiatan pengajian yang dihadiri ratusan jamaah.",
            content: "Kegiatan pengajian akbar yang diselenggarakan pada tanggal 15 Januari 2025 telah berlangsung dengan sukses. Acara ini dihadiri oleh lebih dari 300 jamaah dari berbagai kalangan masyarakat Kampung Ciperang dan sekitarnya.\n\nAcara dimulai pukul 19.30 WIB dengan pembacaan ayat suci Al-Quran, dilanjutkan dengan ceramah dari Ustadz Ahmad Fauzi yang membahas tentang pentingnya menjaga silaturahmi dalam kehidupan bermasyarakat.\n\nKegiatan ini merupakan bagian dari program rutin Taruna Karya dalam membina kehidupan spiritual masyarakat Kampung Ciperang."
        },
        {
            id: 2,
            title: "Kerja Bakti RT 03",
            date: "2025-01-12",
            category: "kegiatan",
            description: "Dokumentasi kerja bakti membersihkan selokan dan area umum di RT 03.",
            content: "Kegiatan kerja bakti di RT 03 telah dilaksanakan pada hari Minggu, 12 Januari 2025. Kegiatan ini diikuti oleh 45 warga yang dengan semangat gotong royong membersihkan lingkungan.\n\nArea yang dibersihkan meliputi:\n- Selokan sepanjang 500 meter\n- Taman RT dan area bermain anak\n- Jalan lingkungan RT 03\n- Pos ronda dan fasilitas umum\n\nKegiatan dimulai pukul 07.00 WIB dan selesai pukul 10.00 WIB. Setelah kegiatan, warga berkumpul untuk sarapan bersama yang telah disiapkan oleh ibu-ibu PKK."
        },
        {
            id: 3,
            title: "Laporan Kegiatan 2024",
            date: "2024-12-31",
            category: "laporan",
            description: "Rangkuman lengkap seluruh kegiatan dan pencapaian organisasi sepanjang tahun 2024.",
            content: "Tahun 2024 telah menjadi tahun yang penuh prestasi bagi Taruna Karya Kampung Ciperang. Berikut adalah rangkuman kegiatan yang telah dilaksanakan:\n\nKEGIATAN RUTIN:\n- 52 kali kerja bakti mingguan\n- 104 kali pengajian rutin (Selasa & Jumat)\n- 12 kali rapat koordinasi bulanan\n\nKEGIATAN KHUSUS:\n- Perayaan HUT RI ke-79\n- Santunan anak yatim (3 kali)\n- Bakti sosial untuk korban bencana\n- Turnamen olahraga antar RT\n\nPENCAPAIAN:\n- Peningkatan partisipasi warga 35%\n- Dana sosial terkumpul Rp 15.000.000\n- 25 keluarga terbantu melalui program sosial"
        }
    ];

    // Simple in-memory storage (in production, use a real database)
    if (!global.articles) {
        global.articles = [...defaultArticles];
    }

    switch (req.method) {
        case 'GET':
            res.status(200).json(global.articles);
            break;

        case 'POST':
            const newArticle = {
                id: Math.max(...global.articles.map(a => a.id), 0) + 1,
                ...req.body
            };
            global.articles.unshift(newArticle);
            res.status(201).json(newArticle);
            break;

        case 'PUT':
            const { id, ...updateData } = req.body;
            const index = global.articles.findIndex(a => a.id === parseInt(id));
            if (index !== -1) {
                global.articles[index] = { id: parseInt(id), ...updateData };
                res.status(200).json(global.articles[index]);
            } else {
                res.status(404).json({ error: 'Article not found' });
            }
            break;

        case 'DELETE':
            const deleteId = parseInt(req.query.id);
            global.articles = global.articles.filter(a => a.id !== deleteId);
            res.status(200).json({ success: true });
            break;

        default:
            res.status(405).json({ error: 'Method not allowed' });
    }
}