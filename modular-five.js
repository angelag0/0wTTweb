class ModularFive extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.currentTheme = this.getAttribute('theme') || 'tech';
        this.categories = [
            { name: '機械設備', img: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=300&h=200&fit=crop&auto=format' },
            { name: '電子零組件', img: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=300&h=200&fit=crop&auto=format' },
            { name: '紡織服飾', img: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=200&fit=crop&auto=format' },
            { name: '化工材料', img: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=300&h=200&fit=crop&auto=format' },
            { name: '食品飲料', img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=300&h=200&fit=crop&auto=format' },
            { name: '建材五金', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop&auto=format' },
            { name: '汽車零件', img: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=300&h=200&fit=crop&auto=format' },
            { name: '醫療設備', img: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=200&fit=crop&auto=format' },
            { name: '包裝材料', img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=300&h=200&fit=crop&auto=format' },
            { name: '環保設備', img: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=300&h=200&fit=crop&auto=format' },
            { name: '通訊設備', img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=300&h=200&fit=crop&auto=format' },
            { name: '精密儀器', img: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=300&h=200&fit=crop&auto=format' }
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
                    --border-color: rgba(255,215,0,0.3);
                    --border-hover: #FFD700;
                    --glow-color: rgba(255,215,0,0.4);
                    --inner-glow: rgba(255,215,0,0.1);
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
                    --border-color: #D4A017;
                    --border-hover: #B8860B;
                    --glow-color: rgba(212,160,23,0.25);
                    --inner-glow: rgba(212,160,23,0.1);
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
                    --border-color: #CC9900;
                    --border-hover: #B8860B;
                    --glow-color: rgba(204,153,0,0.2);
                    --inner-glow: rgba(204,153,0,0.05);
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
                }
                .categories-section {
                    position: relative;
                    min-height: 100vh;
                    background: var(--primary-bg);
                    padding: var(--space-4xl) 0;
                    overflow: hidden;
                }
                .radial-glow {
                    position: absolute;
                    width: 400px;
                    height: 400px;
                    background: radial-gradient(circle, var(--glow-color) 0%, transparent 70%);
                    border-radius: 50%;
                    top: 20%;
                    right: 10%;
                    animation: glowPulse 6s ease-in-out infinite;
                    z-index: 1;
                }
                @keyframes glowPulse {
                    0%, 100% { transform: scale(1); opacity: 0.1; }
                    50% { transform: scale(1.2); opacity: 0.2; }
                }
                .tech-particles {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    z-index: 2;
                    pointer-events: none;
                }
                .particle {
                    position: absolute;
                    width: 3px;
                    height: 3px;
                    background: var(--accent-color);
                    border-radius: 50%;
                    opacity: 0;
                    animation: particleFloat 12s infinite ease-in-out;
                }
                .particle:nth-child(1) { left: 8%; animation-delay: 0s; }
                .particle:nth-child(2) { left: 25%; animation-delay: 2s; }
                .particle:nth-child(3) { left: 42%; animation-delay: 4s; }
                .particle:nth-child(4) { left: 58%; animation-delay: 6s; }
                .particle:nth-child(5) { left: 75%; animation-delay: 8s; }
                .particle:nth-child(6) { left: 92%; animation-delay: 10s; }
                @keyframes particleFloat {
                    0%, 100% { transform: translateY(100vh); opacity: 0; }
                    50% { transform: translateY(-50px); opacity: 0.6; }
                }
                .container {
                    position: relative;
                    z-index: 10;
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 0 var(--space-2xl);
                }
                .section-header {
                    text-align: center;
                    margin-bottom: var(--space-4xl);
                }
                .section-label {
                    display: inline-block;
                    background: var(--glass-bg);
                    color: var(--accent-color);
                    padding: var(--space-sm) var(--space-lg);
                    font-size: 14px;
                    font-weight: 500;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    border-radius: 25px;
                    margin-bottom: var(--space-lg);
                    border: 1px solid var(--border-color);
                    backdrop-filter: blur(10px);
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
                    letter-spacing: 1px;
                }
                .categories-grid {
                    display: grid;
                    grid-template-columns: repeat(6, 1fr);
                    gap: var(--space-lg);
                    margin-top: var(--space-2xl);
                }
                .category-card {
                    background: var(--glass-bg);
                    backdrop-filter: blur(20px);
                    border: 1px solid var(--border-color);
                    border-radius: 16px;
                    overflow: hidden;
                    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                    cursor: pointer;
                    position: relative;
                    height: 200px;
                    display: flex;
                    flex-direction: column;
                }
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
                .category-card:hover::before { opacity: 1; }
                .category-card::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, var(--sweep-color), transparent);
                    transition: left 0.6s ease;
                    z-index: 1;
                }
                .category-card:hover::after { left: 100%; }
                .category-card:hover {
                    transform: translateY(-8px);
                    border-color: var(--border-hover);
                    background: var(--glass-hover-bg);
                    box-shadow: 0 20px 60px var(--card-shadow);
                }
                .category-image {
                    width: 100%;
                    height: 140px;
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                    position: relative;
                    z-index: 2;
                }
                .category-info {
                    flex: 1;
                    padding: var(--space-md);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    z-index: 2;
                }
                .category-name {
                    font-size: 16px;
                    font-weight: 600;
                    color: var(--text-primary);
                    text-align: center;
                    line-height: 1.3;
                    transition: all 0.3s ease;
                }
                .category-card:hover .category-name {
                    color: var(--accent-color);
                    transform: scale(1.05);
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
                .theme-white { background: linear-gradient(45deg, #FFF, #F0F0F0); }
                @media (max-width: 1200px) {
                    .categories-grid { grid-template-columns: repeat(4, 1fr); }
                }
                @media (max-width: 768px) {
                    .categories-section { padding: var(--space-2xl) 0; }
                    .container { padding: 0 var(--space-md); }
                    .section-title { font-size: 32px; }
                    .categories-grid { grid-template-columns: repeat(2, 1fr); gap: var(--space-md); }
                    .category-card { height: 180px; }
                    .category-image { height: 120px; }
                    .category-name { font-size: 14px; }
                    .tech-particles { display: none; }
                    .category-card:hover { transform: translateY(-4px); }
                }
                @media (max-width: 480px) {
                    .categories-grid { grid-template-columns: 1fr; }
                    .category-card { height: 160px; margin: 0 auto; max-width: 280px; }
                }
                @media (prefers-reduced-motion: reduce) {
                    *, *::before, *::after {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                    }
                }
            </style>
            <section class="categories-section">
                <div class="theme-switcher">
                    <button class="theme-btn theme-tech" data-theme="tech" title="科技黑主題"></button>
                    <button class="theme-btn theme-gold" data-theme="business-gold" title="商務金主題"></button>
                    <button class="theme-btn theme-white" data-theme="classic-white" title="經典白主題"></button>
                </div>
                <div class="radial-glow"></div>
                <div class="tech-particles">
                    <div class="particle"></div>
                    <div class="particle"></div>
                    <div class="particle"></div>
                    <div class="particle"></div>
                    <div class="particle"></div>
                    <div class="particle"></div>
                </div>
                <div class="container">
                    <div class="section-header">
                        <span class="section-label">產品分類</span>
                        <h2 class="section-title">商品分類</h2>
                        <p class="section-subtitle">精選優質產品分類，快速找到您的業務需求</p>
                    </div>
                    <div class="categories-grid">
                        ${this.categories.map(cat => `
                            <div class="category-card">
                                <div class="category-image" style="background-image: url('${cat.img}')"></div>
                                <div class="category-info">
                                    <h3 class="category-name">${cat.name}</h3>
                                </div>
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

        // 卡片點擊效果
        this.shadowRoot.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', function () {
                this.style.transform = 'translateY(-8px) scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                // 可自訂跳轉或事件
                const name = this.querySelector('.category-name').textContent;
                // 可 emit 事件
                // this.dispatchEvent(new CustomEvent('category-click', { detail: { name } }));
            });
        });

        // 入場動畫
        const cards = this.shadowRoot.querySelectorAll('.category-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            setTimeout(() => {
                card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
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
customElements.define('modular-five', ModularFive);