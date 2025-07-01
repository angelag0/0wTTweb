class ModularSix extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.currentTheme = this.getAttribute('theme') || 'tech';
        this.stats = [
            { number: 200000, suffix: '+', label: '認證供應商', desc: '覆蓋各大產業的優質製造商與貿易商' },
            { number: 180, suffix: '個', label: '覆蓋國家地區', desc: '全球最大的貿易網絡覆蓋範圍' },
            { number: 500, suffix: '萬+', label: '產品總數', desc: '涵蓋50+產業類別的豐富產品線' },
            { number: 98, suffix: '%', label: '客戶滿意度', desc: '持續提供優質服務的品質保證' },
            { number: 24, suffix: '小時', label: '全天候服務', desc: '專業客服團隊提供即時支援' },
            { number: 35, suffix: '年', label: '產業經驗', desc: '深耕B2B貿易領域的豐富經驗' }
        ];
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
                :host([theme="tech"]) {
                    --primary-bg: linear-gradient(135deg, #0D0D0D 0%, #1A1A1A 100%);
                    --secondary-bg: #2A2A2A;
                    --glass-bg: rgba(255,255,255,0.05);
                    --glass-hover-bg: rgba(255,255,255,0.1);
                    --accent-color: #FFD700;
                    --accent-deep: #E6B800;
                    --text-primary: #FFFFFF;
                    --text-secondary: rgba(255,255,255,0.7);
                    --text-tertiary: #CCCCCC;
                    --border-color: rgba(255,215,0,0.3);
                    --border-hover: #FFD700;
                    --glow-color: rgba(255,215,0,0.4);
                    --inner-glow: rgba(255,215,0,0.1);
                    --grid-color: rgba(255,215,0,0.1);
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
                    --primary-bg: linear-gradient(135deg, #FFF8E1 0%, #FFECB3 100%);
                    --secondary-bg: #FFFFFF;
                    --glass-bg: rgba(255,255,255,0.9);
                    --glass-hover-bg: rgba(255,255,255,0.95);
                    --accent-color: #D4A017;
                    --accent-deep: #B8860B;
                    --text-primary: #2C2C2C;
                    --text-secondary: #4A4A4A;
                    --text-tertiary: #666666;
                    --border-color: #D4A017;
                    --border-hover: #B8860B;
                    --glow-color: rgba(212,160,23,0.25);
                    --inner-glow: rgba(212,160,23,0.1);
                    --grid-color: rgba(212,160,23,0.15);
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
                    --primary-bg: linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%);
                    --secondary-bg: #F8F9FA;
                    --glass-bg: rgba(255,255,255,0.95);
                    --glass-hover-bg: rgba(255,255,255,1);
                    --accent-color: #CC9900;
                    --accent-deep: #B8860B;
                    --text-primary: #1A1A1A;
                    --text-secondary: #333333;
                    --text-tertiary: #666666;
                    --border-color: #CC9900;
                    --border-hover: #B8860B;
                    --glow-color: rgba(204,153,0,0.2);
                    --inner-glow: rgba(204,153,0,0.05);
                    --grid-color: rgba(204,153,0,0.1);
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
                .parallax-stats-section {
                    position: relative;
                    min-height: 100vh;
                    background-image: url('https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=1920&h=600&fit=crop');
                    background-attachment: fixed;
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: cover;
                    display: flex;
                    align-items: center;
                    overflow: hidden;
                }
                .parallax-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: var(--primary-bg);
                    opacity: 0.9;
                }
                .background-elements {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    z-index: 1;
                }
                .bg-circle {
                    position: absolute;
                    border-radius: 50%;
                    background: radial-gradient(circle, var(--glow-color) 0%, transparent 70%);
                    animation: float 15s ease-in-out infinite;
                }
                .bg-circle:nth-child(1) {
                    width: 400px;
                    height: 400px;
                    top: -200px;
                    left: -200px;
                    animation-delay: 0s;
                }
                .bg-circle:nth-child(2) {
                    width: 300px;
                    height: 300px;
                    bottom: -150px;
                    right: -150px;
                    animation-delay: 5s;
                }
                .bg-circle:nth-child(3) {
                    width: 250px;
                    height: 250px;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    animation-delay: 10s;
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.15; }
                    33% { transform: translateY(-20px) rotate(120deg); opacity: 0.25; }
                    66% { transform: translateY(20px) rotate(240deg); opacity: 0.2; }
                }
                .stats-container {
                    position: relative;
                    z-index: 10;
                    width: 100%;
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: var(--space-5xl) var(--space-2xl);
                }
                .section-header {
                    text-align: center;
                    margin-bottom: var(--space-5xl);
                }
                .section-label {
                    display: inline-block;
                    background: var(--glass-bg);
                    backdrop-filter: blur(20px);
                    color: var(--accent-color);
                    padding: var(--space-sm) var(--space-lg);
                    font-size: 14px;
                    font-weight: 500;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    border-radius: 100px;
                    margin-bottom: var(--space-lg);
                    border: 1px solid var(--border-color);
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
                    animation: titleGlow 3s ease-in-out infinite;
                }
                @keyframes titleGlow {
                    0%, 100% { filter: drop-shadow(0 0 8px var(--glow-color)); }
                    50% { filter: drop-shadow(0 0 15px var(--glow-color)); }
                }
                .section-subtitle {
                    font-size: 20px;
                    font-weight: 300;
                    color: var(--text-secondary);
                    max-width: 600px;
                    margin: 0 auto;
                    line-height: 1.6;
                }
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: var(--space-3xl);
                    margin-top: var(--space-4xl);
                }
                .stat-item {
                    text-align: center;
                    position: relative;
                    padding: var(--space-3xl) var(--space-xl);
                    background: var(--glass-bg);
                    backdrop-filter: blur(20px);
                    border: 1px solid var(--border-color);
                    border-radius: 16px;
                    transition: all 0.4s ease;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 280px;
                }
                .stat-item::before {
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
                .stat-item:hover::before { opacity: 1; }
                .stat-item::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, var(--sweep-color), transparent);
                    transition: left 0.6s ease;
                }
                .stat-item:hover::after { left: 100%; }
                .stat-item:hover {
                    transform: translateY(-8px);
                    border-color: var(--border-hover);
                    background: var(--glass-hover-bg);
                    box-shadow: 0 20px 40px var(--card-shadow);
                }
                .stat-number-container {
                    display: flex;
                    align-items: baseline;
                    justify-content: center;
                    margin-bottom: var(--space-lg);
                    z-index: 2;
                    position: relative;
                }
                .stat-number {
                    font-size: 64px;
                    font-weight: 900;
                    color: var(--accent-color);
                    line-height: 1;
                    text-shadow: 0 0 15px var(--glow-color);
                }
                .stat-suffix {
                    font-size: 28px;
                    font-weight: 700;
                    color: var(--text-primary);
                    margin-left: var(--space-sm);
                }
                .stat-label {
                    font-size: 20px;
                    font-weight: 600;
                    color: var(--text-primary);
                    margin-bottom: var(--space-md);
                    z-index: 2;
                    position: relative;
                }
                .stat-description {
                    font-size: 14px;
                    font-weight: 400;
                    color: var(--text-tertiary);
                    line-height: 1.5;
                    max-width: 250px;
                    z-index: 2;
                    position: relative;
                }
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
                .theme-white { background: linear-gradient(45deg, #FFF, #CC9900); }
                @media (max-width: 1024px) {
                    .stats-container { padding: var(--space-4xl) var(--space-xl); }
                    .section-title { font-size: 40px; }
                    .stats-grid { gap: var(--space-xl); grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
                }
                @media (max-width: 768px) {
                    .parallax-stats-section { min-height: 100vh; background-attachment: scroll; }
                    .stats-container { padding: var(--space-4xl) var(--space-lg); }
                    .section-title { font-size: 32px; }
                    .section-subtitle { font-size: 18px; }
                    .stats-grid { grid-template-columns: 1fr; gap: var(--space-lg); }
                    .stat-item { padding: var(--space-xl) var(--space-lg); min-height: 240px; }
                    .stat-number { font-size: 48px; }
                    .stat-suffix { font-size: 20px; }
                    .background-elements { display: none; }
                }
                @media (prefers-reduced-motion: reduce) {
                    *, *::before, *::after {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                    }
                }
                @keyframes countUp {
                    from { opacity: 0; transform: translateY(20px);}
                    to { opacity: 1; transform: translateY(0);}
                }
                .animate-count { animation: countUp 0.8s ease-out forwards; }
            </style>
            <section class="parallax-stats-section">
                <div class="theme-switcher">
                    <button class="theme-btn theme-tech" data-theme="tech" title="科技黑主題"></button>
                    <button class="theme-btn theme-gold" data-theme="business-gold" title="商務金主題"></button>
                    <button class="theme-btn theme-white" data-theme="classic-white" title="經典白主題"></button>
                </div>
                <div class="parallax-overlay"></div>
                <div class="background-elements">
                    <div class="bg-circle"></div>
                    <div class="bg-circle"></div>
                    <div class="bg-circle"></div>
                </div>
                <div class="stats-container">
                    <div class="section-header">
                        <span class="section-label">Our Achievements</span>
                        <h2 class="section-title">見證台灣經貿網的成長軌跡</h2>
                        <p class="section-subtitle">
                            35年來持續創新，為台灣企業搭建通往全球市場的橋樑，創造無數商業成功故事
                        </p>
                    </div>
                    <div class="stats-grid">
                        ${this.stats.map(stat => `
                            <div class="stat-item">
                                <div class="stat-number-container">
                                    <span class="stat-number" data-target="${stat.number}">0</span>
                                    <span class="stat-suffix">${stat.suffix}</span>
                                </div>
                                <div class="stat-label">${stat.label}</div>
                                <div class="stat-description">${stat.desc}</div>
                            </div>
                        `).join('')}
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

        // 數字動畫 Intersection Observer
        const statsSection = this.shadowRoot.querySelector('.parallax-stats-section');
        const statNumbers = this.shadowRoot.querySelectorAll('.stat-number');
        let animated = false;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated) {
                    statNumbers.forEach(num => {
                        const target = parseInt(num.getAttribute('data-target'));
                        this.animateNumber(num, target);
                        num.classList.add('animate-count');
                    });
                    animated = true;
                    observer.disconnect();
                }
            });
        }, { threshold: 0.3 });
        observer.observe(statsSection);

        // 視差滾動效果
        this.shadowRoot.addEventListener('scroll', () => this.handleParallax(), true);
        window.addEventListener('scroll', () => this.handleParallax());

        // 卡片 hover 動畫延遲
        const statItems = this.shadowRoot.querySelectorAll('.stat-item');
        statItems.forEach((item, index) => {
            item.addEventListener('mouseenter', () => {
                item.style.animationDelay = `${index * 0.1}s`;
            });
        });
    }

    animateNumber(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 16);
    }

    handleParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = this.shadowRoot.querySelectorAll('.bg-circle');
        parallaxElements.forEach((element, index) => {
            const speed = 0.3 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }

    updateTheme() {
        this.shadowRoot.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-theme') === this.currentTheme);
        });
        this.setAttribute('theme', this.currentTheme);
    }

    connectedCallback() {
        this.updateTheme();
    }
}
customElements.define('modular-six', ModularSix);