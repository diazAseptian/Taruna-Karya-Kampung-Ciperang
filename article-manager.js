class ArticleManager {
    constructor() {
        this.articles = this.loadArticles();
        this.currentEditId = null;
        this.initializeEventListeners();
        this.renderArticles();
    }

    // Load articles from localStorage
    loadArticles() {
        const stored = localStorage.getItem('articles');
        return stored ? JSON.parse(stored) : this.getDefaultArticles();
    }

    // Save articles to localStorage
    saveArticles() {
        localStorage.setItem('articles', JSON.stringify(this.articles));
    }

    // Default articles
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

    // Initialize event listeners
    initializeEventListeners() {
        document.getElementById('addArticleBtn').addEventListener('click', () => this.openModal());
        document.getElementById('closeModal').addEventListener('click', () => this.closeModal());
        document.getElementById('cancelBtn').addEventListener('click', () => this.closeModal());
        document.getElementById('articleForm').addEventListener('submit', (e) => this.handleSubmit(e));
        document.getElementById('image').addEventListener('change', (e) => this.previewImage(e));
        
        // Close modal when clicking outside
        document.getElementById('articleModal').addEventListener('click', (e) => {
            if (e.target.id === 'articleModal') this.closeModal();
        });
    }

    // Preview image
    previewImage(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                document.getElementById('previewImg').src = e.target.result;
                document.getElementById('imagePreview').classList.remove('hidden');
            };
            reader.readAsDataURL(file);
        }
    }

    // Open modal for add/edit
    openModal(article = null) {
        const modal = document.getElementById('articleModal');
        const modalTitle = document.getElementById('modalTitle');
        const form = document.getElementById('articleForm');
        
        if (article) {
            // Edit mode
            modalTitle.textContent = 'Edit Artikel';
            this.currentEditId = article.id;
            document.getElementById('articleId').value = article.id;
            document.getElementById('title').value = article.title;
            document.getElementById('date').value = article.date;
            document.getElementById('category').value = article.category;
            document.getElementById('description').value = article.description;
            document.getElementById('content').value = article.content;
            if (article.image) {
                document.getElementById('previewImg').src = article.image;
                document.getElementById('imagePreview').classList.remove('hidden');
            }
        } else {
            // Add mode
            modalTitle.textContent = 'Tambah Artikel';
            this.currentEditId = null;
            form.reset();
            document.getElementById('date').value = new Date().toISOString().split('T')[0];
            document.getElementById('imagePreview').classList.add('hidden');
        }
        
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    // Close modal
    closeModal() {
        document.getElementById('articleModal').classList.add('hidden');
        document.body.style.overflow = 'auto';
        this.currentEditId = null;
    }

    // Handle form submission
    handleSubmit(e) {
        e.preventDefault();
        
        const imageFile = document.getElementById('image').files[0];
        const formData = {
            title: document.getElementById('title').value,
            date: document.getElementById('date').value,
            category: document.getElementById('category').value,
            description: document.getElementById('description').value,
            content: document.getElementById('content').value
        };

        if (imageFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                formData.image = e.target.result;
                this.saveArticle(formData);
            };
            reader.readAsDataURL(imageFile);
        } else {
            // Keep existing image if editing
            if (this.currentEditId) {
                const existingArticle = this.articles.find(a => a.id === this.currentEditId);
                if (existingArticle && existingArticle.image) {
                    formData.image = existingArticle.image;
                }
            }
            this.saveArticle(formData);
        }
    }

    // Save article helper
    saveArticle(formData) {
        if (this.currentEditId) {
            this.updateArticle(this.currentEditId, formData);
        } else {
            this.createArticle(formData);
        }
        this.closeModal();
        this.renderArticles();
    }

    // Create new article
    createArticle(data) {
        const newId = Math.max(...this.articles.map(a => a.id), 0) + 1;
        const newArticle = { id: newId, ...data };
        this.articles.unshift(newArticle);
        this.saveArticles();
    }

    // Update existing article
    updateArticle(id, data) {
        const index = this.articles.findIndex(a => a.id === id);
        if (index !== -1) {
            this.articles[index] = { id, ...data };
            this.saveArticles();
        }
    }

    // Delete article
    deleteArticle(id) {
        if (confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
            this.articles = this.articles.filter(a => a.id !== id);
            this.saveArticles();
            this.renderArticles();
        }
    }

    // Get category color
    getCategoryColor(category) {
        const colors = {
            kegiatan: 'bg-green-100 text-green-800',
            pengumuman: 'bg-blue-100 text-blue-800',
            laporan: 'bg-purple-100 text-purple-800',
            berita: 'bg-yellow-100 text-yellow-800'
        };
        return colors[category] || 'bg-gray-100 text-gray-800';
    }

    // Format date
    formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    }

    // Render articles list
    renderArticles() {
        const container = document.getElementById('articlesContainer');
        
        if (this.articles.length === 0) {
            container.innerHTML = `
                <div class="p-8 text-center text-gray-500">
                    <svg class="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <p>Belum ada artikel. Klik "Tambah Artikel Baru" untuk memulai.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.articles.map(article => `
            <div class="p-6 hover:bg-gray-50 transition-colors">
                <div class="flex justify-between items-start">
                    <div class="flex items-start space-x-4 flex-1">
                        ${article.image ? `<img src="${article.image}" alt="${article.title}" class="w-20 h-20 object-cover rounded-lg flex-shrink-0">` : ''}
                        <div class="flex-1">
                            <div class="flex items-center mb-2">
                                <span class="px-2 py-1 text-xs font-medium rounded-full ${this.getCategoryColor(article.category)}">
                                    ${article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                                </span>
                                <span class="ml-3 text-sm text-gray-500">${this.formatDate(article.date)}</span>
                            </div>
                            <h3 class="text-lg font-semibold text-forest-green mb-2">${article.title}</h3>
                            <p class="text-gray-600 mb-3">${article.description}</p>
                            <div class="text-sm text-gray-500">
                                ${article.content.substring(0, 150)}${article.content.length > 150 ? '...' : ''}
                            </div>
                        </div>
                    </div>
                    <div class="flex space-x-2 ml-4">
                        <button onclick="articleManager.openModal(${JSON.stringify(article).replace(/"/g, '&quot;')})" 
                                class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                        </button>
                        <button onclick="articleManager.deleteArticle(${article.id})" 
                                class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Get articles for public display
    getPublicArticles() {
        return this.articles.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
}

// Initialize the article manager
const articleManager = new ArticleManager();