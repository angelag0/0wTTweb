class ModularThree extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.currentTheme = this.getAttribute('theme') || 'tech';
        this.render();
    }

    static get observedAttributes() {
        return ['theme'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'theme' && oldValue !== newValue) {
            this.currentTheme = newValue;
            this.updateTheme();
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                :host {
                    display: block;
                    position: relative;
                }
                /* ===== CSS 變數系統 ===== */
                :host([theme="tech"]) {
                    --primary-bg: #1A1A1A;
                    --secondary-bg: #2A2A2A;
                    --glass-bg: rgba(255,255,255,0.05);
                    --glass-hover-bg: rgba(255,255,255,0.1);
                    --accent-color: #FFD700;
                    --accent-deep: #E6B800;
                    --text-primary: #FFFFFF;
                    --text-secondary: rgba(255,255,255,0.8);
                    --border-color: rgba(255,215,0,0.3);
                    --border-hover: #FFD700;
                    --glow-color: rgba(255,215,0,0.4);
                    --button-shadow: rgba(255,215,0,0.4);
                    --card-shadow: rgba(255,215,0,0.2);
                    --sweep-color: rgba(255,215,0,0.1);
                    --space-xs: 4px;
                    --space-sm: 8px;
                    --space-md: 16px;
                    --space-lg: 24px;
                    --space-xl: 32px;
                    --space-2xl: 40px;
                    --space-3xl: 48px;
                    --space-4xl: 60px;
                    --space-5xl: 80px;
                }
                :host([theme="business-gold"]) {
                    --primary-bg: #FFF8E1;
                    --secondary-bg: #FFFFFF;
                    --glass-bg: rgba(255,255,255,0.9);
                    --glass-hover-bg: rgba(255,255,255,0.95);
                    --accent-color: #D4A017;
                    --accent-deep: #B8860B;
                    --text-primary: #2C2C2C;
                    --text-secondary: #4A4A4A;
                    --border-color: rgba(212,160,23,0.4);
                    --border-hover: #B8860B;
                    --glow-color: rgba(212,160,23,0.25);
                    --button-shadow: rgba(212,160,23,0.4);
                    --card-shadow: rgba(212,160,23,0.2);
                    --sweep-color: rgba(212,160,23,0.15);
                    --space-xs: 4px;
                    --space-sm: 8px;
                    --space-md: 16px;
                    --space-lg: 24px;
                    --space-xl: 32px;
                    --space-2xl: 40px;
                    --space-3xl: 48px;
                    --space-4xl: 60px;
                    --space-5xl: 80px;
                }
                :host([theme="classic-white"]) {
                    --primary-bg: #FFFFFF;
                    --secondary-bg: #F8F9FA;
                    --glass-bg: rgba(248,249,250,0.95);
                    --glass-hover-bg: rgba(248,249,250,1);
                    --accent-color: #CC9900;
                    --accent-deep: #B8860B;
                    --text-primary: #1A1A1A;
                    --text-secondary: #333333;
                    --border-color: rgba(204,153,0,0.4);
                    --border-hover: #B8860B;
                    --glow-color: rgba(204,153,0,0.2);
                    --button-shadow: rgba(204,153,0,0.3);
                    --card-shadow: rgba(204,153,0,0.15);
                    --sweep-color: rgba(204,153,0,0.1);
                    --space-xs: 4px;
                    --space-sm: 8px;
                    --space-md: 16px;
                    --space-lg: 24px;
                    --space-xl: 32px;
                    --space-2xl: 40px;
                    --space-3xl: 48px;
                    --space-4xl: 60px;
                    --space-5xl: 80px;
                }
                
                /* ===== 主容器 ===== */
                .categories-section {
                    position: relative;
                    min-height: 100vh;
                    background: var(--primary-bg);
                    padding: var(--space-5xl) var(--space-2xl);
                }

                /* 主題切換器 */
                .theme-switcher {
                    position: absolute;
                    top: 0;
                    right: 0;
                    z-index: 1000;
                    display: flex;
                    gap: var(--space-sm);
                    background: var(--glass-bg);
                    backdrop-filter: blur(20px);
                    border: 1px solid var(--border-color);
                    border-radius: 100px;
                    padding: var(--space-sm);
                }
                
                .theme-btn {
                    width: 40px;
                    height: 40px;
                    border: none;
                    border-radius: 50%;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    position: relative;
                }
                
                .theme-btn.active {
                    transform: scale(1.1);
                    box-shadow: 0 0 20px var(--glow-color);
                }
                
                .theme-tech { background: linear-gradient(45deg, #000, #333); }
                .theme-gold { background: linear-gradient(45deg, #FFF8E1, #D4A017); }
                .theme-white { background: linear-gradient(45deg, #FFF, #F0F0F0); }

                /* ===== 內容容器 ===== */
                .container {
                    position: relative;
                    max-width: 1400px;
                    margin: 0 auto;
                }

                /* ===== 區域標題 ===== */
                .section-header {
                    text-align: center;
                    margin-bottom: var(--space-4xl);
                }

                .section-title {
                    font-size: 48px;
                    font-weight: 900;
                    color: var(--text-primary);
                    margin-bottom: var(--space-md);
                    line-height: 1.2;
                    background: linear-gradient(45deg, var(--accent-color) 0%, var(--text-primary) 50%, var(--accent-color) 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    text-shadow: 0 0 15px var(--glow-color);
                }

                .section-subtitle {
                    font-size: 20px;
                    font-weight: 300;
                    color: var(--text-secondary);
                    max-width: 600px;
                    margin: 0 auto;
                    line-height: 1.6;
                }

                /* ===== 產品分類網格 ===== */
                .categories-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
                    gap: var(--space-xl);
                    margin-top: var(--space-4xl);
                }

                /* ===== 分類卡片 ===== */
                .category-card {
                    position: relative;
                    background: var(--glass-bg);
                    backdrop-filter: blur(20px);
                    border: 1px solid var(--border-color);
                    border-radius: 16px;
                    padding: var(--space-lg);
                    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                    cursor: pointer;
                    overflow: hidden;
                    opacity: 0;
                    transform: translateY(30px);
                }

                .category-card.visible {
                    opacity: 1;
                    transform: translateY(0);
                    transition: all 0.6s ease;
                }

                /* 發光邊框效果 */
                .category-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(45deg, var(--accent-color), transparent, var(--accent-color));
                    border-radius: 16px;
                    padding: 2px;
                    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                    mask-composite: xor;
                    -webkit-mask-composite: xor;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .category-card:hover::before {
                    opacity: 1;
                }

                /* 掃光效果 */
                .category-card::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, var(--sweep-color), transparent);
                    transition: left 0.6s ease;
                }

                .category-card:hover::after {
                    left: 100%;
                }

                .category-card:hover {
                    transform: translateY(-8px);
                    border-color: var(--border-hover);
                    box-shadow: 0 20px 60px var(--card-shadow);
                }

                /* ===== 分類標題 ===== */
                .category-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: var(--space-lg);
                    position: relative;
                    z-index: 2;
                }

                .category-title {
                    font-size: 24px;
                    font-weight: 700;
                    color: var(--text-primary);
                }

                .more-btn {
                    background: transparent;
                    border: 2px solid var(--accent-color);
                    color: var(--accent-color);
                    padding: 8px var(--space-md);
                    border-radius: 100px;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }

                .more-btn::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: var(--accent-color);
                    transition: left 0.3s ease;
                    z-index: -1;
                }

                .more-btn:hover::before {
                    left: 0;
                }

                .more-btn:hover {
                    color: #1A1A1A;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px var(--button-shadow);
                }

                /* ===== 產品網格 ===== */
                .products-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: var(--space-md);
                    position: relative;
                    z-index: 2;
                }

                .products-grid.large-grid {
                    grid-template-columns: 2fr 1fr;
                }

                .product-item {
                    background: rgba(255,255,255,0.1);
                    border-radius: 12px;
                    overflow: hidden;
                    transition: all 0.3s ease;
                    cursor: pointer;
                    border: 1px solid rgba(255,255,255,0.1);
                }

                .product-item:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 8px 25px rgba(0,0,0,0.3);
                    border-color: var(--accent-color);
                }

                .product-item.main-product {
                    grid-row: 1 / 3;
                }

                .product-item.main-wide {
                    grid-column: 1 / 3;
                }

                .product-image {
                    width: 100%;
                    height: 100%;
                    background-size: cover;
                    background-position: center;
                    transition: transform 0.3s ease;
                    border-radius: 12px;
                }

                .product-item:hover .product-image {
                    transform: scale(1.05);
                }

                /* ===== 不同佈局變化 ===== */
                .products-grid.large-grid {
                    grid-template-columns: 2fr 1fr;
                    grid-template-rows: 1fr 1fr;
                    height: 300px;
                }

                .products-grid.standard-grid {
                    grid-template-columns: 1fr 1fr;
                    grid-template-rows: 1fr 1fr;
                    height: 300px;
                }

                .products-grid.vertical-grid {
                    grid-template-columns: 1fr 1fr 1fr;
                    grid-template-rows: 2fr 1fr;
                    height: 300px;
                }

                /* 主題特定調整 */
                :host([theme="business-gold"]) .product-item,
                :host([theme="classic-white"]) .product-item {
                    background: rgba(255,255,255,0.8);
                    border: 1px solid rgba(212,160,23,0.2);
                }

                :host([theme="classic-white"]) .product-item {
                    border-color: rgba(204,153,0,0.2);
                }

                :host([theme="business-gold"]) .more-btn:hover,
                :host([theme="classic-white"]) .more-btn:hover {
                    color: #FFFFFF;
                }

                /* ===== 響應式設計 ===== */
                @media (max-width: 768px) {
                    .categories-section {
                        padding: var(--space-2xl) var(--space-md);
                        min-height: auto;
                    }

                    .section-title {
                        font-size: 32px;
                    }

                    .categories-grid {
                        grid-template-columns: 1fr;
                        gap: var(--space-lg);
                    }

                    .products-grid {
                        grid-template-columns: 1fr 1fr;
                        grid-template-rows: auto auto;
                        height: auto;
                    }

                    .products-grid.large-grid,
                    .products-grid.standard-grid,
                    .products-grid.vertical-grid {
                        grid-template-columns: 1fr 1fr;
                        grid-template-rows: auto auto;
                        height: auto;
                    }

                    .product-item.main-product,
                    .product-item.main-wide {
                        grid-row: auto;
                        grid-column: auto;
                    }

                    .product-image {
                        height: 120px;
                    }

                    .category-header {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: var(--space-sm);
                    }
                }

                /* ===== 減動效偏好支援 ===== */
                @media (prefers-reduced-motion: reduce) {
                    *,
                    *::before,
                    *::after {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                    }
                }
            </style>
            <!-- 其餘 HTML 保持不變 ... -->
            <section class="categories-section">
                <div class="theme-switcher">
                    <button class="theme-btn theme-tech" data-theme="tech" title="科技黑主題"></button>
                    <button class="theme-btn theme-gold" data-theme="business-gold" title="商務金主題"></button>
                    <button class="theme-btn theme-white" data-theme="classic-white" title="經典白主題"></button>
                </div>
                <div class="container">
                    <div class="section-header">
                        <h2 class="section-title">精選產品分類</h2>
                        <p class="section-subtitle">探索台灣優質製造業的核心領域</p>
                    </div>
                    <div class="categories-grid">
                        <!-- 工業設備 & 機械 -->
                        <div class="category-card">
                            <div class="category-header">
                                <h3 class="category-title">工業設備 & 機械</h3>
                                <button class="more-btn">More</button>
                            </div>
                            <div class="products-grid large-grid">
                                <div class="product-item main-product">
                                    <div class="product-image" style="background-image: url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop')"></div>
                                </div>
                                <div class="product-item">
                                    <div class="product-image" style="background-image: url('https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&h=300&fit=crop')"></div>
                                </div>
                                <div class="product-item">
                                    <div class="product-image" style="background-image: url('https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=400&h=300&fit=crop')"></div>
                                </div>
                            </div>
                        </div>
                        <!-- 電子零組件 & 半導體 -->
                        <div class="category-card">
                            <div class="category-header">
                                <h3 class="category-title">電子零組件 & 半導體</h3>
                                <button class="more-btn">More</button>
                            </div>
                            <div class="products-grid standard-grid">
                                <div class="product-item">
                                    <div class="product-image" style="background-image: url('https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop')"></div>
                                </div>
                                <div class="product-item">
                                    <div class="product-image" style="background-image: url('https://images.unsplash.com/photo-1562408590-e32931084e23?w=400&h=300&fit=crop')"></div>
                                </div>
                                <div class="product-item">
                                    <div class="product-image" style="background-image: url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop')"></div>
                                </div>
                                <div class="product-item">
                                    <div class="product-image" style="background-image: url('https://images.unsplash.com/photo-1540829917886-91ab031b1764?w=400&h=300&fit=crop')"></div>
                                </div>
                            </div>
                        </div>
                        <!-- 紡織服飾 & 時尚 -->
                        <div class="category-card">
                            <div class="category-header">
                                <h3 class="category-title">紡織服飾 & 時尚</h3>
                                <button class="more-btn">More</button>
                            </div>
                            <div class="products-grid vertical-grid">
                                <div class="product-item main-wide">
                                    <div class="product-image" style="background-image: url('https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=400&fit=crop')"></div>
                                </div>
                                <div class="product-item">
                                    <div class="product-image" style="background-image: url('https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=300&fit=crop')"></div>
                                </div>
                                <div class="product-item">
                                    <div class="product-image" style="background-image: url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop')"></div>
                                </div>
                                <div class="product-item">
                                    <div class="product-image" style="background-image: url('https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&h=300&fit=crop')"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
        this.initEvents();
    }

    initEvents() {
        // 主題切換
        this.shadowRoot.querySelectorAll('.theme-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const theme = btn.getAttribute('data-theme');
                this.setAttribute('theme', theme);
                this.updateTheme();
            });
        });

        // 產品項目點擊效果
        this.shadowRoot.querySelectorAll('.product-item').forEach(item => {
            item.addEventListener('click', function() {
                this.style.transform = 'translateY(-4px) scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });

        // More按鈕點擊效果
        this.shadowRoot.querySelectorAll('.more-btn').forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                this.style.transform = 'translateY(-2px) scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });

        // 滾動動畫觸發
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const cards = entry.target.querySelectorAll('.category-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, index * 200);
                    });
                }
            });
        }, observerOptions);

        // 監聽卡片容器
        const categoriesGrid = this.shadowRoot.querySelector('.categories-grid');
        observer.observe(categoriesGrid);
    }

    updateTheme() {
        this.shadowRoot.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-theme') === this.currentTheme);
        });
    }

    connectedCallback() {
        this.updateTheme();
    }
}

customElements.define('modular-three', ModularThree);