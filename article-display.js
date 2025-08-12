class ArticleDisplay {
    constructor() {
        this.articles = [];
        this.apiUrl = '/api/articles';
        this.loadArticles();
    }

    // Load articles from API
    async loadArticles() {
        try {
            const response = await fetch(this.apiUrl);
            this.articles = await response.json();
            this.renderArticles();
        } catch (error) {
            console.error('Error loading articles:', error);
            this.articles = this.getDefaultArticles();
            this.renderArticles();
        }
    }

    // Get default articles fallback
    getDefaultArticles() {
        return [
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
    }

    // Get category icon
    getCategoryIcon(category) {
        const icons = {
            kegiatan: `<svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                      </svg>`,
            pengumuman: `<svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path>
                        </svg>`,
            laporan: `<svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                     </svg>`,
            berita: `<svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
                    </svg>`
        };
        return icons[category] || icons.berita;
    }

    // Get category color
    getCategoryColor(category) {
        const colors = {
            kegiatan: 'bg-green-100',
            pengumuman: 'bg-blue-100',
            laporan: 'bg-purple-100',
            berita: 'bg-yellow-100'
        };
        return colors[category] || 'bg-gray-100';
    }

    // Format date
    formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    }

    // Open article modal
    openArticleModal(article) {
        const modal = document.getElementById('articleModal');
        const modalTitle = document.getElementById('modalArticleTitle');
        const modalDate = document.getElementById('modalArticleDate');
        const modalCategory = document.getElementById('modalArticleCategory');
        const modalContent = document.getElementById('modalArticleContent');

        modalTitle.textContent = article.title;
        modalDate.textContent = this.formatDate(article.date);
        modalCategory.innerHTML = `
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${this.getCategoryColor(article.category)}">
                ${this.getCategoryIcon(article.category)}
                <span class="ml-2">${article.category.charAt(0).toUpperCase() + article.category.slice(1)}</span>
            </span>
        `;
        modalContent.innerHTML = `
            ${article.image ? `<img src="${article.image}" alt="${article.title}" class="w-full max-w-md mx-auto rounded-lg mb-6">` : ''}
            ${article.content.replace(/\n/g, '<br>')}
        `;

        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    // Close article modal
    closeArticleModal() {
        const modal = document.getElementById('articleModal');
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    // Render articles in the main page
    renderArticles() {
        const container = document.getElementById('artikelContainer');
        if (!container) {
            console.log('Article container not found, waiting for DOM...');
            setTimeout(() => this.renderArticles(), 100);
            return;
        }

        // Sort articles by date (newest first)
        const sortedArticles = this.articles.sort((a, b) => new Date(b.date) - new Date(a.date));

        container.innerHTML = sortedArticles.map(article => `
            <div class="bg-white p-6 rounded-lg shadow-lg card-hover animate-on-scroll cursor-pointer" 
                 onclick="articleDisplay.openArticleModal(${JSON.stringify(article).replace(/"/g, '&quot;')})">
                ${article.image ? `<img src="${article.image}" alt="${article.title}" class="w-full h-48 object-cover rounded-lg mb-4">` : ''}
                <div class="flex items-center mb-4">
                    <div class="${this.getCategoryColor(article.category)} p-3 rounded-lg mr-4">
                        ${this.getCategoryIcon(article.category)}
                    </div>
                    <div>
                        <h3 class="font-semibold text-forest-green">${article.title}</h3>
                        <p class="text-sm text-gray-500">${this.formatDate(article.date)}</p>
                    </div>
                </div>
                <p class="text-gray-600 mb-4">${article.description}</p>
                <div class="text-ocean-blue hover:text-blue-700 font-semibold text-sm flex items-center">
                    Baca Selengkapnya 
                    <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                </div>
            </div>
        `).join('');

        // Re-observe elements for animation
        if (window.observer) {
            document.querySelectorAll('.animate-on-scroll').forEach(el => {
                if (!el.classList.contains('is-visible')) {
                    window.observer.observe(el);
                }
            });
        }
    }
}

// Initialize article display when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.articleDisplay = new ArticleDisplay();
});