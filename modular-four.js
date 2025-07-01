class ModularFour extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.currentTheme = this.getAttribute('theme') || 'tech';
        this.currentSlide = 0;
        this.autoPlayInterval = null;
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
                /* ===== 主題變數 ===== */
                :host([theme="tech"]) {
                    --primary-bg: linear-gradient(135deg, #0D0D0D 0%, #1A1A1A 100%);
                    --secondary-bg: #2A2A2A;
                    --glass-bg: rgba(255,255,255,0.05);
                    --glass-hover-bg: rgba(255,255,255,0.1);
                    --accent-color: #FFD700;
                    --accent-deep: #E6B800;
                    --text-primary: #FFFFFF;
                    --text-secondary: rgba(255,255,255,0.7);
                    --text-placeholder: rgba(255,255,255,0.5);
                    --border-color: rgba(255,215,0,0.3);
                    --border-hover: #FFD700;
                    --glow-color: rgba(255,215,0,0.4);
                    --button-shadow: rgba(255,215,0,0.4);
                    --overlay-dark: rgba(0,0,0,0.85);
                    --overlay-light: rgba(0,0,0,0.4);
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
                    --primary-bg: #FFFFFF;
                    --secondary-bg: #F8F9FA;
                    --glass-bg: rgba(212,160,23,0.08);
                    --glass-hover-bg: rgba(212,160,23,0.15);
                    --accent-color: #D4A017;
                    --accent-deep: #B8860B;
                    --text-primary: #1A1A1A;
                    --text-secondary: #4A4A4A;
                    --text-placeholder: rgba(26,26,26,0.6);
                    --border-color: rgba(212,160,23,0.4);
                    --border-hover: #D4A017;
                    --glow-color: rgba(212,160,23,0.3);
                    --button-shadow: rgba(212,160,23,0.25);
                    --overlay-dark: rgba(255,255,255,0.95);
                    --overlay-light: rgba(255,255,255,0.7);
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
                    --primary-bg: linear-gradient(135deg, #FAFBFC 0%, #FFFFFF 100%);
                    --secondary-bg: #FFFFFF;
                    --glass-bg: rgba(204,153,0,0.05);
                    --glass-hover-bg: rgba(204,153,0,0.1);
                    --accent-color: #B8860B;
                    --accent-deep: #996F00;
                    --text-primary: #1A1A1A;
                    --text-secondary: #2C2C2C;
                    --text-placeholder: rgba(26,26,26,0.5);
                    --border-color: rgba(184,134,11,0.3);
                    --border-hover: #B8860B;
                    --glow-color: rgba(184,134,11,0.2);
                    --button-shadow: rgba(184,134,11,0.2);
                    --overlay-dark: rgba(255,255,255,0.9);
                    --overlay-light: rgba(255,255,255,0.6);
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
                /* ===== 主視覺容器 ===== */
                .hero-slider-container {
                    position: relative;
                    height: 700px;
                    overflow: hidden;
                    background: var(--primary-bg);
                }
                .slider-wrapper {
                    position: relative;
                    width: 100%;
                    height: 100%;
                }
                .slide {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                    transition: opacity 1.2s ease-in-out;
                    background-size: cover;
                    background-position: center;
                }
                .slide.active {
                    opacity: 1;
                    z-index: 2;
                }
                .slide-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(
                        90deg, 
                        var(--overlay-dark) 0%, 
                        rgba(0,0,0,0.8) 40%, 
                        var(--overlay-light) 70%, 
                        transparent 100%
                    );
                }
                /* 主題特殊覆蓋 */
                :host([theme="business-gold"]) .slide-overlay {
                    background: linear-gradient(
                        90deg, 
                        var(--overlay-dark) 0%, 
                        rgba(255,255,255,0.85) 40%, 
                        var(--overlay-light) 70%, 
                        rgba(255,255,255,0.2) 100%
                    );
                }
                :host([theme="classic-white"]) .slide-overlay {
                    background: linear-gradient(
                        90deg, 
                        var(--overlay-dark) 0%, 
                        rgba(255,255,255,0.8) 40%, 
                        var(--overlay-light) 70%, 
                        rgba(255,255,255,0.1) 100%
                    );
                }
                .slide-content {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 55%;
                    height: 100%;
                    padding: 100px 120px 100px 120px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    z-index: 10;
                    backdrop-filter: none;
                }
                :host([theme="business-gold"]) .slide-content,
                :host([theme="classic-white"]) .slide-content {
                    backdrop-filter: blur(10px);
                }
                .slide-label {
                    display: inline-block;
                    background: var(--glass-bg);
                    backdrop-filter: blur(10px);
                    color: var(--accent-color);
                    border: 1px solid var(--border-color);
                    padding: var(--space-sm) var(--space-lg);
                    font-size: 14px;
                    font-weight: 500;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    border-radius: 100px;
                    margin-bottom: var(--space-xl);
                    width: fit-content;
                    transition: all 0.3s ease;
                }
                .slide-label:hover {
                    border-color: var(--accent-color);
                    background: var(--glass-hover-bg);
                    transform: translateX(8px);
                }
                /* 主題特殊覆蓋 */
                :host([theme="business-gold"]) .slide-label {
                    background: var(--accent-color);
                    color: #fff;
                    border: none;
                    font-weight: 600;
                }
                :host([theme="classic-white"]) .slide-label {
                    background: #fff;
                    color: var(--accent-color);
                    border: 2px solid var(--accent-color);
                    font-weight: 600;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }
                .slide-title {
                    font-size: 64px;
                    font-weight: 900;
                    color: var(--text-primary);
                    line-height: 1.1;
                    margin-bottom: var(--space-lg);
                    text-shadow: 0 4px 20px rgba(0,0,0,0.5);
                }
                :host([theme="business-gold"]) .slide-title,
                :host([theme="classic-white"]) .slide-title {
                    color: var(--text-primary);
                    text-shadow: none;
                    font-weight: 800;
                }
                .slide-title .accent {
                    background: linear-gradient(45deg, var(--accent-color) 0%, #FFF700 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    display: block;
                    margin-top: var(--space-md);
                }
                :host([theme="business-gold"]) .slide-title .accent,
                :host([theme="classic-white"]) .slide-title .accent {
                    background: linear-gradient(45deg, var(--accent-color) 0%, var(--accent-deep) 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                .slide-description {
                    font-size: 20px;
                    font-weight: 300;
                    color: var(--text-secondary);
                    line-height: 1.6;
                    margin-bottom: var(--space-2xl);
                    max-width: 520px;
                }
                :host([theme="business-gold"]) .slide-description,
                :host([theme="classic-white"]) .slide-description {
                    color: #2C2C2C;
                }
                .slide-actions {
                    display: flex;
                    gap: var(--space-lg);
                    align-items: center;
                }
                .btn-tech {
                    border-radius: 100px;
                    height: 48px;
                    padding: 0 var(--space-xl);
                    font-size: 16px;
                    font-weight: 600;
                    min-width: 120px;
                    border: 2px solid var(--accent-color);
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: var(--space-sm);
                    text-decoration: none;
                }
                .btn-tech::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
                    transition: left 0.5s ease;
                    z-index: -1;
                }
                .btn-tech:hover::before { left: 100%; }
                .btn-tech:hover {
                    transform: translateY(-3px) scale(1.02);
                    box-shadow: 0 12px 30px var(--button-shadow);
                }
                .btn-primary {
                    background: var(--accent-color);
                    color: #1A1A1A;
                    border-color: var(--accent-color);
                    font-weight: 700;
                }
                .btn-primary:hover {
                    background: var(--accent-deep);
                    border-color: var(--accent-deep);
                }
                .btn-secondary {
                    background: transparent;
                    color: var(--accent-color);
                    border-color: var(--accent-color);
                    border: 2px solid var(--accent-color);
                    box-shadow: none;
                }
                .btn-secondary:hover {
                    background: var(--accent-color);
                    color: #1A1A1A;
                }
                .btn-secondary::after { display: none; }
                /* 主題特殊按鈕 */
                :host([theme="business-gold"]) .btn-primary,
                :host([theme="classic-white"]) .btn-primary {
                    background: var(--accent-color);
                    color: #fff;
                    box-shadow: 0 4px 15px var(--button-shadow);
                }
                :host([theme="business-gold"]) .btn-secondary,
                :host([theme="classic-white"]) .btn-secondary {
                    background: #fff;
                    color: var(--accent-color);
                    border: 2px solid var(--accent-color);
                    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                }
                :host([theme="business-gold"]) .btn-secondary:hover,
                :host([theme="classic-white"]) .btn-secondary:hover {
                    background: var(--accent-color);
                    color: #fff;
                    box-shadow: 0 8px 25px var(--button-shadow);
                }
                /* ===== 指示器 ===== */
                .slider-indicators {
                    position: absolute;
                    bottom: var(--space-4xl);
                    left: 120px;
                    display: flex;
                    gap: var(--space-md);
                    z-index: 20;
                }
                .indicator {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.3);
                    cursor: pointer;
                    transition: all 0.3s ease;
                    position: relative;
                    border: 2px solid transparent;
                }
                .indicator.active {
                    background: var(--accent-color);
                    transform: scale(1.2);
                    border-color: rgba(255,215,0,0.3);
                }
                .indicator:hover {
                    background: var(--accent-color);
                    transform: scale(1.1);
                }
                :host([theme="business-gold"]) .indicator,
                :host([theme="classic-white"]) .indicator {
                    background: rgba(0,0,0,0.2);
                    border: 2px solid transparent;
                }
                :host([theme="business-gold"]) .indicator.active,
                :host([theme="classic-white"]) .indicator.active {
                    background: var(--accent-color);
                    border-color: rgba(255,255,255,0.8);
                    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                }
                /* ===== 箭頭 ===== */
                .slider-nav {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 56px;
                    height: 56px;
                    background: var(--glass-bg);
                    backdrop-filter: blur(20px);
                    border: 2px solid var(--border-color);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    z-index: 20;
                }
                .slider-nav:hover {
                    background: var(--glass-hover-bg);
                    border-color: var(--accent-color);
                    transform: translateY(-50%) scale(1.1);
                    box-shadow: 0 8px 25px var(--glow-color);
                }
                .slider-nav.prev { right: 120px; }
                .slider-nav.next { right: 50px; }
                .nav-arrow {
                    width: 12px;
                    height: 12px;
                    border-top: 2px solid var(--accent-color);
                    border-right: 2px solid var(--accent-color);
                    transition: border-color 0.3s ease;
                }
                .slider-nav:hover .nav-arrow { border-color: var(--accent-color); }
                .prev .nav-arrow { transform: rotate(-135deg); }
                .next .nav-arrow { transform: rotate(45deg); }
                :host([theme="business-gold"]) .slider-nav,
                :host([theme="classic-white"]) .slider-nav {
                    background: #fff;
                    border: 2px solid var(--accent-color);
                    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                }
                :host([theme="business-gold"]) .slider-nav:hover,
                :host([theme="classic-white"]) .slider-nav:hover {
                    background: var(--accent-color);
                }
                :host([theme="business-gold"]) .slider-nav:hover .nav-arrow,
                :host([theme="classic-white"]) .slider-nav:hover .nav-arrow {
                    border-color: #fff;
                }
                /* ===== 計數器 ===== */
                .slide-counter {
                    position: absolute;
                    top: var(--space-4xl);
                    right: 120px;
                    color: var(--text-secondary);
                    font-size: 16px;
                    font-weight: 300;
                    z-index: 20;
                }
                .slide-counter .current {
                    color: var(--accent-color);
                    font-size: 24px;
                    font-weight: 700;
                }
                :host([theme="business-gold"]) .slide-counter,
                :host([theme="classic-white"]) .slide-counter {
                    color: #666;
                }
                :host([theme="business-gold"]) .slide-counter .current,
                :host([theme="classic-white"]) .slide-counter .current {
                    color: var(--accent-color);
                }
                /* ===== 主題切換器 ===== */
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
                .theme-gold { background: linear-gradient(45deg, #FFFFFF, #D4A017); }
                .theme-white { background: linear-gradient(45deg, #FFFFFF, #F8F9FA); }
                /* ===== 響應式設計 ===== */
                @media (max-width: 1024px) {
                    .slide-content { width: 70%; padding: 80px 60px 80px 80px; }
                    .slide-title { font-size: 48px; }
                    .slider-nav.prev { right: 80px; }
                    .slider-nav.next { right: 20px; }
                    .slide-counter { right: 80px; }
                }
                @media (max-width: 768px) {
                    .hero-slider-container { height: 600px; }
                    .slide-content { width: 100%; padding: 60px var(--space-2xl); text-align: center; }
                    .slide-title { font-size: 36px; }
                    .slide-description { font-size: 18px; max-width: none; }
                    .slide-actions { flex-direction: column; gap: var(--space-md); }
                    .btn-tech { width: 100%; justify-content: center; }
                    .slider-indicators { left: 50%; transform: translateX(-50%); bottom: var(--space-2xl); }
                    .slider-nav { display: none; }
                    .slide-counter { top: var(--space-2xl); right: var(--space-2xl); }
                }
                @media (prefers-reduced-motion: reduce) {
                    *, *::before, *::after {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                    }
                }
            </style>
            <section class="hero-slider-container">
                <div class="theme-switcher">
                    <button class="theme-btn theme-tech" data-theme="tech" title="科技黑主題"></button>
                    <button class="theme-btn theme-gold" data-theme="business-gold" title="商務金主題"></button>
                    <button class="theme-btn theme-white" data-theme="classic-white" title="經典白主題"></button>
                </div>
                <div class="slider-wrapper">
                    <div class="slide active" style="background-image: url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1920&h=700&fit=crop');">
                        <div class="slide-overlay"></div>
                        <div class="slide-content">
                            <span class="slide-label">Taiwan Excellence</span>
                            <h2 class="slide-title">
                                連接台灣優質供應商
                                <span class="accent">開拓全球商機</span>
                            </h2>
                            <p class="slide-description">
                                超過200,000家認證供應商，提供最完整的B2B採購解決方案，讓台灣製造走向世界舞台。
                            </p>
                            <div class="slide-actions">
                                <button class="btn-tech btn-primary">立即開始採購</button>
                                <a href="#" class="btn-tech btn-secondary">
                                    <span>了解更多</span>
                                    <span>→</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="slide" style="background-image: url('https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1920&h=700&fit=crop');">
                        <div class="slide-overlay"></div>
                        <div class="slide-content">
                            <span class="slide-label">Smart Manufacturing</span>
                            <h2 class="slide-title">
                                智慧製造技術
                                <span class="accent">引領產業升級</span>
                            </h2>
                            <p class="slide-description">
                                結合AI、IoT等創新科技，提供高品質、高附加價值的產品，提升台灣產業國際競爭力。
                            </p>
                            <div class="slide-actions">
                                <button class="btn-tech btn-primary">探索智慧方案</button>
                                <a href="#" class="btn-tech btn-secondary">
                                    <span>查看案例</span>
                                    <span>→</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="slide" style="background-image: url('https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=1920&h=700&fit=crop');">
                        <div class="slide-overlay"></div>
                        <div class="slide-content">
                            <span class="slide-label">Sustainable Future</span>
                            <h2 class="slide-title">
                                永續環保理念
                                <span class="accent">創造綠色商機</span>
                            </h2>
                            <p class="slide-description">
                                推動循環經濟，發展環保產品，為地球永續發展貢獻心力，開創綠色商業新模式。
                            </p>
                            <div class="slide-actions">
                                <button class="btn-tech btn-primary">綠色產品目錄</button>
                                <a href="#" class="btn-tech btn-secondary">
                                    <span>ESG報告</span>
                                    <span>→</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="slider-indicators">
                    <div class="indicator active" data-index="0"></div>
                    <div class="indicator" data-index="1"></div>
                    <div class="indicator" data-index="2"></div>
                </div>
                <div class="slider-nav prev"><div class="nav-arrow"></div></div>
                <div class="slider-nav next"><div class="nav-arrow"></div></div>
                <div class="slide-counter">
                    <span class="current">01</span> / 03
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

        // 輪播
        this.slides = this.shadowRoot.querySelectorAll('.slide');
        this.indicators = this.shadowRoot.querySelectorAll('.indicator');
        this.counter = this.shadowRoot.querySelector('.slide-counter .current');

        this.shadowRoot.querySelector('.slider-nav.prev').addEventListener('click', () => this.prevSlide());
        this.shadowRoot.querySelector('.slider-nav.next').addEventListener('click', () => this.nextSlide());
        this.indicators.forEach((indicator, idx) => {
            indicator.addEventListener('click', () => this.goToSlide(idx));
        });

        // 自動播放
        this.startAutoPlay();

        // 滑鼠懸停暫停
        const container = this.shadowRoot.querySelector('.hero-slider-container');
        container.addEventListener('mouseenter', () => this.stopAutoPlay());
        container.addEventListener('mouseleave', () => this.startAutoPlay());

        // 按鈕點擊效果
        this.shadowRoot.querySelectorAll('.btn-tech').forEach(button => {
            button.addEventListener('click', function(e) {
                if (this.tagName === 'A') e.preventDefault();
                this.style.transform = 'translateY(-3px) scale(0.98)';
                setTimeout(() => { this.style.transform = ''; }, 150);
            });
        });
    }

    updateSlider() {
        this.slides.forEach((slide, idx) => {
            slide.classList.toggle('active', idx === this.currentSlide);
        });
        this.indicators.forEach((indicator, idx) => {
            indicator.classList.toggle('active', idx === this.currentSlide);
        });
        this.counter.textContent = String(this.currentSlide + 1).padStart(2, '0');
    }

    goToSlide(idx) {
        this.currentSlide = idx;
        this.updateSlider();
        this.resetAutoPlay();
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.updateSlider();
        this.resetAutoPlay();
    }

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.updateSlider();
        this.resetAutoPlay();
    }

    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000);
    }

    stopAutoPlay() {
        clearInterval(this.autoPlayInterval);
    }

    resetAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }

    updateTheme() {
        this.shadowRoot.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-theme') === this.currentTheme);
        });
    }

    connectedCallback() {
        this.updateTheme();
    }

    disconnectedCallback() {
        this.stopAutoPlay();
    }
}
customElements.define('modular-four', ModularFour);