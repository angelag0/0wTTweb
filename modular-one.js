class ModularOne extends HTMLElement {
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
                    --inner-glow: rgba(255,215,0,0.1);
                    --grid-color: rgba(255,215,0,0.1);
                    --search-shadow: rgba(0,0,0,0.3);
                    --search-glow: rgba(255,215,0,0.2);
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
                    --primary-bg: linear-gradient(135deg, #FFF8E1 0%, #FFECB3 100%);
                    --secondary-bg: #FFFFFF;
                    --glass-bg: rgba(255,255,255,0.9);
                    --glass-hover-bg: rgba(255,255,255,0.95);
                    --accent-color: #D4A017;
                    --accent-deep: #B8860B;
                    --text-primary: #2C2C2C;
                    --text-secondary: #4A4A4A;
                    --text-placeholder: rgba(44,44,44,0.6);
                    --border-color: #D4A017;
                    --border-hover: #B8860B;
                    --glow-color: rgba(212,160,23,0.25);
                    --inner-glow: rgba(212,160,23,0.1);
                    --grid-color: rgba(212,160,23,0.15);
                    --search-shadow: rgba(212,160,23,0.2);
                    --search-glow: rgba(212,160,23,0.3);
                    --button-shadow: rgba(212,160,23,0.4);
                    --card-shadow: rgba(0,0,0,0.15);
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
                    --text-placeholder: rgba(26,26,26,0.6);
                    --border-color: #CC9900;
                    --border-hover: #B8860B;
                    --glow-color: rgba(204,153,0,0.2);
                    --inner-glow: rgba(204,153,0,0.05);
                    --grid-color: rgba(204,153,0,0.1);
                    --search-shadow: rgba(204,153,0,0.15);
                    --search-glow: rgba(204,153,0,0.25);
                    --button-shadow: rgba(204,153,0,0.3);
                    --card-shadow: rgba(0,0,0,0.12);
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
                /* ...以下 CSS 內容與元件1.html 相同，請直接複製... */
                /* ===== 主視覺容器 ===== */
                .hero-tech {
                    position: relative;
                    height: 100vh;
                    min-height: 600px;
                    background: var(--primary-bg);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                }
                .tech-grid {
                    position: absolute;
                    width: 120%;
                    height: 120%;
                    background-image: 
                        linear-gradient(var(--grid-color) 1px, transparent 1px),
                        linear-gradient(90deg, var(--grid-color) 1px, transparent 1px);
                    background-size: 80px 80px;
                    animation: gridMove 20s linear infinite;
                    z-index: 1;
                }
                @keyframes gridMove {
                    0% { transform: translate(0, 0); }
                    100% { transform: translate(80px, 80px); }
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
                    width: 4px;
                    height: 4px;
                    background: var(--accent-color);
                    border-radius: 50%;
                    opacity: 0;
                    animation: particleFloat 8s infinite ease-in-out;
                }
                .particle:nth-child(1) { left: 10%; animation-delay: 0s; }
                .particle:nth-child(2) { left: 20%; animation-delay: 1s; }
                .particle:nth-child(3) { left: 30%; animation-delay: 2s; }
                .particle:nth-child(4) { left: 40%; animation-delay: 3s; }
                .particle:nth-child(5) { left: 50%; animation-delay: 4s; }
                .particle:nth-child(6) { left: 60%; animation-delay: 5s; }
                .particle:nth-child(7) { left: 70%; animation-delay: 6s; }
                .particle:nth-child(8) { left: 80%; animation-delay: 7s; }
                @keyframes particleFloat {
                    0%, 100% { 
                        transform: translateY(100vh);
                        opacity: 0;
                    }
                    50% { 
                        transform: translateY(-100px);
                        opacity: 0.8;
                    }
                }
                .radial-glow {
                    position: absolute;
                    width: 600px;
                    height: 600px;
                    background: radial-gradient(circle, var(--glow-color) 0%, transparent 70%);
                    border-radius: 50%;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    animation: glowPulse 4s ease-in-out infinite;
                    z-index: 1;
                }
                @keyframes glowPulse {
                    0%, 100% { 
                        transform: translate(-50%, -50%) scale(1);
                        opacity: 0.15;
                    }
                    50% { 
                        transform: translate(-50%, -50%) scale(1.1);
                        opacity: 0.3;
                    }
                }
                .search-container-tech {
                    position: relative;
                    z-index: 10;
                    width: 90%;
                    max-width: 1000px;
                    text-align: center;
                }
                .hero-title-tech {
                    font-size: 72px;
                    font-weight: 900;
                    margin-bottom: var(--space-xl);
                    background: linear-gradient(45deg, var(--accent-color) 0%, var(--text-primary) 50%, var(--accent-color) 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    line-height: 1.1;
                    text-shadow: 0 0 20px var(--glow-color);
                    animation: titleGlow 3s ease-in-out infinite;
                }
                @keyframes titleGlow {
                    0%, 100% { 
                        filter: drop-shadow(0 0 8px var(--glow-color)); 
                    }
                    50% { 
                        filter: drop-shadow(0 0 15px var(--glow-color)); 
                    }
                }
                .hero-subtitle {
                    font-size: 24px;
                    font-weight: 300;
                    color: var(--text-secondary);
                    margin-bottom: var(--space-3xl);
                    letter-spacing: 2px;
                }
                .search-box-tech {
                    background: var(--glass-bg);
                    backdrop-filter: blur(20px);
                    border: 2px solid var(--border-color);
                    border-radius: 100px;
                    padding: var(--space-sm);
                    display: flex;
                    align-items: center;
                    gap: var(--space-sm);
                    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                    box-shadow: 0 20px 60px var(--search-shadow);
                    position: relative;
                    overflow: hidden;
                }
                .search-box-tech::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(45deg, var(--accent-color), transparent, var(--accent-color));
                    border-radius: 100px;
                    padding: 2px;
                    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                    mask-composite: xor;
                    -webkit-mask-composite: xor;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                .search-box-tech:hover::before,
                .search-box-tech:focus-within::before {
                    opacity: 1;
                }
                .search-box-tech::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, var(--sweep-color), transparent);
                    transition: left 0.6s ease;
                }
                .search-box-tech:hover::after {
                    left: 100%;
                }
                .search-box-tech:hover,
                .search-box-tech:focus-within {
                    border-color: var(--border-hover);
                    background: var(--glass-hover-bg);
                    transform: translateY(-4px);
                    box-shadow: 0 30px 80px var(--search-glow);
                }
                .search-input-tech {
                    flex: 1;
                    background: transparent;
                    border: none;
                    padding: 24px var(--space-xl);
                    font-size: 20px;
                    color: var(--text-primary);
                    outline: none;
                    font-weight: 300;
                    z-index: 2;
                    position: relative;
                }
                .search-input-tech::placeholder {
                    color: var(--text-placeholder);
                    font-weight: 300;
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
                    z-index: 2;
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
                .btn-tech:hover::before {
                    left: 100%;
                }
                .btn-tech:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 10px 25px var(--button-shadow);
                }
                .btn-secondary {
                    background: transparent;
                    color: var(--accent-color);
                    border-color: var(--accent-color);
                }
                .btn-secondary:hover {
                    background: var(--accent-color);
                    color: #1A1A1A;
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
                    transform: translateY(-3px) scale(1.02);
                    box-shadow: 0 12px 30px var(--button-shadow);
                }
                .camera-icon {
                    width: 20px;
                    height: 20px;
                    background: currentColor;
                    mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z'%3E%3C/path%3E%3Ccircle cx='12' cy='13' r='4'%3E%3C/circle%3E%3C/svg%3E") no-repeat center;
                    -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z'%3E%3C/path%3E%3Ccircle cx='12' cy='13' r='4'%3E%3C/circle%3E%3C/svg%3E") no-repeat center;
                    mask-size: contain;
                    -webkit-mask-size: contain;
                }
                .hot-keywords-tech {
                    margin-top: var(--space-3xl);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: var(--space-lg);
                }
                .keywords-label {
                    color: var(--accent-color);
                    font-size: 18px;
                    font-weight: 500;
                    margin-right: var(--space-md);
                }
                .keyword-link {
                    color: var(--text-secondary);
                    text-decoration: none;
                    font-size: 16px;
                    font-weight: 400;
                    transition: all 0.3s ease;
                    position: relative;
                    padding: var(--space-sm) var(--space-md);
                    border-radius: 25px;
                    border: 1px solid transparent;
                }
                .keyword-link:hover {
                    color: var(--accent-color);
                    transform: translateY(-2px);
                    border-color: var(--accent-color);
                    background: var(--glass-bg);
                    backdrop-filter: blur(10px);
                    font-weight: 500;
                    text-shadow: 0 1px 3px rgba(0,0,0,0.2);
                }
                .theme-switcher {
                    position: absolute; /* 原本是 fixed */
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
                .theme-gold { background: linear-gradient(45deg, #FFF8E1, #FFD700); }
                .theme-white { background: linear-gradient(45deg, #FFF, #F0F0F0); }
                @media (max-width: 768px) {
                    .hero-tech {
                        height: 100vh;
                        min-height: 500px;
                        padding: 0 var(--space-md);
                    }
                    .hero-title-tech {
                        font-size: 48px;
                        margin-bottom: var(--space-lg);
                    }
                    .hero-subtitle {
                        font-size: 18px;
                        margin-bottom: var(--space-xl);
                    }
                    .search-box-tech {
                        flex-direction: column;
                        gap: var(--space-md);
                        padding: var(--space-md);
                    }
                    .search-input-tech {
                        padding: 20px;
                        font-size: 18px;
                        text-align: center;
                    }
                    .btn-tech {
                        width: 100%;
                        justify-content: center;
                    }
                    .hot-keywords-tech {
                        flex-direction: column;
                        gap: var(--space-md);
                        margin-top: var(--space-xl);
                    }
                    .keywords-label {
                        margin-right: 0;
                        margin-bottom: var(--space-sm);
                    }
                    .tech-particles,
                    .tech-grid {
                        display: none;
                    }
                    .transition-normal {
                        transition: all 0.2s ease;
                    }
                    .search-box-tech:hover {
                        transform: translateY(-2px);
                    }
                }
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
            <div class="theme-switcher">
                <button class="theme-btn theme-tech" data-theme="tech" title="科技黑主題"></button>
                <button class="theme-btn theme-gold" data-theme="business-gold" title="商務金主題"></button>
                <button class="theme-btn theme-white" data-theme="classic-white" title="經典白主題"></button>
            </div>
            <div class="hero-tech" id="heroSection">
                <div class="tech-grid"></div>
                <div class="radial-glow"></div>
                <div class="tech-particles">
                    <div class="particle"></div>
                    <div class="particle"></div>
                    <div class="particle"></div>
                    <div class="particle"></div>
                    <div class="particle"></div>
                    <div class="particle"></div>
                    <div class="particle"></div>
                    <div class="particle"></div>
                </div>
                <div class="search-container-tech">
                    <h1 class="hero-title-tech">智慧貿易 創新未來</h1>
                    <p class="hero-subtitle">AI驅動的全球B2B採購平台</p>
                    <div class="search-box-tech">
                        <input type="text" class="search-input-tech" placeholder="搜尋全球優質供應商與產品">
                        <button class="btn-tech btn-secondary">
                            <div class="camera-icon"></div>
                            <span>AI 圖搜</span>
                        </button>
                        <button class="btn-tech btn-primary">立即搜尋</button>
                    </div>
                    <div class="hot-keywords-tech">
                        <span class="keywords-label">趨勢關鍵字</span>
                        <a href="#" class="keyword-link">5G通訊設備</a>
                        <a href="#" class="keyword-link">AI晶片</a>
                        <a href="#" class="keyword-link">電動車零件</a>
                        <a href="#" class="keyword-link">智慧製造</a>
                        <a href="#" class="keyword-link">綠能科技</a>
                        <a href="#" class="keyword-link">精密機械</a>
                    </div>
                </div>
            </div>
        `;
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // 主題切換
        this.shadowRoot.querySelectorAll('.theme-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const theme = btn.getAttribute('data-theme');
                this.setAttribute('theme', theme);
            });
        });

        // 打字動畫
        setTimeout(() => this.typeWriter(), 500);

        // 搜尋框效果
        const searchInput = this.shadowRoot.querySelector('.search-input-tech');
        const searchBox = this.shadowRoot.querySelector('.search-box-tech');
        searchInput.addEventListener('focus', () => {
            searchBox.style.transform = 'translateY(-6px)';
        });
        searchInput.addEventListener('blur', () => {
            searchBox.style.transform = 'translateY(-4px)';
        });

        // 按鈕點擊效果
        this.shadowRoot.querySelectorAll('.btn-tech').forEach(button => {
            button.addEventListener('click', function() {
                this.style.transform = 'translateY(-2px) scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });
    }

    typeWriter() {
        const title = this.shadowRoot.querySelector('.hero-title-tech');
        const originalText = "智慧貿易 創新未來";
        title.textContent = '';
        let i = 0;
        const type = () => {
            if (i < originalText.length) {
                title.textContent += originalText.charAt(i);
                i++;
                setTimeout(type, 100);
            }
        };
        type();
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
customElements.define('modular-one', ModularOne);
