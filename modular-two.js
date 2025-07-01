class ModularTwo extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.currentTheme = this.getAttribute('theme') || 'tech';
        this.currentSlideIndex = 0;
        this.autoSlideInterval = null;
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
                    --text-tertiary: rgba(255,255,255,0.5);
                    --border-color: rgba(255,215,0,0.3);
                    --border-hover: #FFD700;
                    --glow-color: rgba(255,215,0,0.4);
                    --inner-glow: rgba(255,215,0,0.1);
                    --grid-color: rgba(255,215,0,0.1);
                    --card-shadow: rgba(255,215,0,0.2);
                    --button-shadow: rgba(255,215,0,0.4);
                    --nav-bg: rgba(0,0,0,0.8);
                    --dropdown-bg: rgba(42,42,42,0.95);
                    --space-xs: 4px;
                    --space-sm: 8px;
                    --space-md: 16px;
                    --space-lg: 24px;
                    --space-xl: 32px;
                    --space-2xl: 40px;
                    --space-3xl: 48px;
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
                    --card-shadow: rgba(212,160,23,0.3);
                    --button-shadow: rgba(212,160,23,0.4);
                    --nav-bg: rgba(255,248,225,0.9);
                    --dropdown-bg: rgba(255,255,255,0.95);
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
                    --text-tertiary: #555555;
                    --border-color: #CC9900;
                    --border-hover: #B8860B;
                    --glow-color: rgba(204,153,0,0.2);
                    --inner-glow: rgba(204,153,0,0.05);
                    --grid-color: rgba(204,153,0,0.1);
                    --card-shadow: rgba(204,153,0,0.25);
                    --button-shadow: rgba(204,153,0,0.3);
                    --nav-bg: rgba(255,255,255,0.95);
                    --dropdown-bg: rgba(255,255,255,0.98);
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
                .nav-carousel-section {
                    position: relative;
                    height: auto;
                    background: var(--primary-bg);
                    overflow: hidden;
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
                .tech-grid {
                    position: absolute;
                    width: 120%;
                    height: 120%;
                    background-image: 
                        linear-gradient(var(--grid-color) 1px, transparent 1px),
                        linear-gradient(90deg, var(--grid-color) 1px, transparent 1px);
                    background-size: 60px 60px;
                    animation: gridMove 25s linear infinite;
                    z-index: 1;
                    opacity: 0.3;
                }
                @keyframes gridMove {
                    0% { transform: translate(0, 0); }
                    100% { transform: translate(60px, 60px); }
                }
                .section-glow {
                    position: absolute;
                    width: 400px;
                    height: 400px;
                    background: radial-gradient(circle, var(--glow-color) 0%, transparent 70%);
                    border-radius: 50%;
                    top: 20%;
                    right: 10%;
                    animation: glowFloat 8s ease-in-out infinite;
                    z-index: 1;
                }
                @keyframes glowFloat {
                    0%, 100% { 
                        transform: scale(1) translateY(0);
                        opacity: 0.1;
                    }
                    50% { 
                        transform: scale(1.1) translateY(-20px);
                        opacity: 0.2;
                    }
                }
                .category-nav {
                    position: relative;
                    z-index: 100;
                    background: var(--nav-bg);
                    backdrop-filter: blur(20px);
                    border-bottom: 1px solid var(--border-color);
                    padding: var(--space-md) 0;
                }
                .nav-container {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 0 var(--space-2xl);
                }
                .nav-list {
                    display: flex;
                    justify-content: center;
                    gap: var(--space-lg);
                    list-style: none;
                    flex-wrap: wrap;
                }
                .nav-item {
                    position: relative;
                }
                .nav-button {
                    background: var(--glass-bg);
                    backdrop-filter: blur(15px);
                    border: 1px solid var(--border-color);
                    border-radius: 100px;
                    color: var(--text-primary);
                    text-decoration: none;
                    font-size: 16px;
                    font-weight: 500;
                    padding: 12px var(--space-lg);
                    display: block;
                    position: relative;
                    transition: all 0.3s ease;
                    overflow: hidden;
                    min-width: 120px;
                    text-align: center;
                }
                .nav-button::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, var(--inner-glow), transparent);
                    transition: left 0.5s ease;
                }
                .nav-button:hover::before {
                    left: 100%;
                }
                .nav-button:hover,
                .nav-item.active .nav-button {
                    background: var(--glass-hover-bg);
                    border-color: var(--accent-color);
                    color: var(--accent-color);
                    transform: translateY(-2px) scale(1.02);
                    box-shadow: 0 8px 25px var(--button-shadow);
                }
                .dropdown-menu {
                    position: absolute;
                    top: calc(100% + 10px);
                    left: 50%;
                    transform: translateX(-50%);
                    width: 800px;
                    background: var(--dropdown-bg);
                    backdrop-filter: blur(25px);
                    border: 1px solid var(--border-color);
                    border-radius: 16px;
                    padding: var(--space-xl);
                    opacity: 0;
                    visibility: hidden;
                    transform: translateX(-50%) translateY(-10px) scale(0.95);
                    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                    z-index: 200;
                }
                .nav-item:hover .dropdown-menu,
                .nav-item.active .dropdown-menu {
                    opacity: 1;
                    visibility: visible;
                    transform: translateX(-50%) translateY(0) scale(1);
                }
                .dropdown-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: var(--space-xl);
                }
                .dropdown-section {
                    min-height: 150px;
                }
                .dropdown-title {
                    color: var(--accent-color);
                    font-size: 18px;
                    font-weight: 600;
                    margin-bottom: var(--space-md);
                    padding-bottom: var(--space-sm);
                    border-bottom: 1px solid var(--border-color);
                }
                .dropdown-links {
                    display: flex;
                    flex-direction: column;
                    gap: var(--space-sm);
                }
                .dropdown-link {
                    color: var(--text-secondary);
                    text-decoration: none;
                    font-size: 14px;
                    font-weight: 400;
                    padding: var(--space-sm) var(--space-md);
                    border-radius: 25px;
                    transition: all 0.3s ease;
                    border: 1px solid transparent;
                }
                .dropdown-link:hover {
                    color: var(--accent-color);
                    background: var(--glass-bg);
                    border-color: var(--border-color);
                    transform: translateX(4px);
                    font-weight: 500;
                }
                .carousel-container {
                    position: relative;
                    height: auto;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: var(--space-2xl);
                }
                .carousel-wrapper {
                    position: relative;
                    width: 100%;
                    max-width: 1200px;
                    height: 400px;
                    min-height: 300px;
                    border-radius: 20px;
                    overflow: hidden;
                    box-shadow: 0 20px 60px var(--card-shadow);
                }
                .carousel-track {
                    display: flex;
                    height: 100%;
                    transition: transform 0.5s ease-in-out;
                }
                .carousel-slide {
                    min-width: 100%;
                    height: 100%;
                    position: relative;
                    overflow: hidden;
                }
                .slide-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.3s ease;
                }
                .carousel-slide:hover .slide-image {
                    transform: scale(1.05);
                }
                .slide-content {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: linear-gradient(transparent, rgba(0,0,0,0.8));
                    padding: var(--space-3xl) var(--space-xl) var(--space-xl);
                    color: #FFFFFF;
                }
                .slide-title {
                    font-size: 28px;
                    font-weight: 700;
                    margin-bottom: var(--space-md);
                    color: var(--accent-color);
                }
                .slide-description {
                    font-size: 16px;
                    font-weight: 300;
                    line-height: 1.6;
                    opacity: 0.9;
                }
                .carousel-controls {
                    position: absolute;
                    bottom: var(--space-lg);
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    gap: var(--space-md);
                    z-index: 10;
                }
                .carousel-dot {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.3);
                    border: 2px solid var(--accent-color);
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .carousel-dot.active,
                .carousel-dot:hover {
                    background: var(--accent-color);
                    transform: scale(1.2);
                    box-shadow: 0 0 15px var(--glow-color);
                }
                .carousel-nav {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    background: var(--glass-bg);
                    backdrop-filter: blur(15px);
                    border: 1px solid var(--border-color);
                    border-radius: 50%;
                    width: 50px;
                    height: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    color: var(--text-primary);
                    font-size: 20px;
                    z-index: 10;
                }
                .carousel-nav:hover {
                    background: var(--glass-hover-bg);
                    border-color: var(--accent-color);
                    color: var(--accent-color);
                    transform: translateY(-50%) scale(1.1);
                    box-shadow: 0 8px 25px var(--button-shadow);
                }
                .carousel-nav.prev {
                    left: var(--space-lg);
                }
                .carousel-nav.next {
                    right: var(--space-lg);
                }
                @media (max-width: 1024px) {
                    .dropdown-menu {
                        width: 90vw;
                        max-width: 600px;
                    }
                    .dropdown-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
                @media (max-width: 768px) {
                    .nav-carousel-section {
                        height: 60vh;
                        min-height: 400px;
                    }
                    .nav-list {
                        gap: var(--space-md);
                    }
                    .nav-button {
                        font-size: 14px;
                        padding: 10px var(--space-md);
                        min-width: 100px;
                    }
                    .dropdown-menu {
                        width: 95vw;
                        padding: var(--space-lg);
                    }
                    .dropdown-grid {
                        grid-template-columns: 1fr;
                        gap: var(--space-lg);
                    }
                    .carousel-wrapper {
                        height: 300px;
                        margin: 0 var(--space-md);
                    }
                    .carousel-nav {
                        width: 40px;
                        height: 40px;
                        font-size: 16px;
                    }
                    .slide-title {
                        font-size: 22px;
                    }
                    .slide-description {
                        font-size: 14px;
                    }
                    .tech-grid {
                        display: none;
                    }
                    .section-glow {
                        opacity: 0.5;
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
            <section class="nav-carousel-section">
                <div class="theme-switcher">
                    <button class="theme-btn theme-tech" data-theme="tech" title="科技黑主題"></button>
                    <button class="theme-btn theme-gold" data-theme="business-gold" title="商務金主題"></button>
                    <button class="theme-btn theme-white" data-theme="classic-white" title="經典白主題"></button>
                </div>
                <div class="tech-grid"></div>
                <div class="section-glow"></div>
                <nav class="category-nav">
                    <div class="nav-container">
                        <ul class="nav-list">
                            <li class="nav-item">
                                <a href="#" class="nav-button">工業機械</a>
                                <div class="dropdown-menu">
                                    <div class="dropdown-grid">
                                        <div class="dropdown-section">
                                            <h3 class="dropdown-title">生產設備</h3>
                                            <div class="dropdown-links">
                                                <a href="#" class="dropdown-link">CNC加工機</a>
                                                <a href="#" class="dropdown-link">自動化產線</a>
                                                <a href="#" class="dropdown-link">工具機</a>
                                                <a href="#" class="dropdown-link">檢測設備</a>
                                                <a href="#" class="dropdown-link">包裝機械</a>
                                            </div>
                                        </div>
                                        <div class="dropdown-section">
                                            <h3 class="dropdown-title">電機設備</h3>
                                            <div class="dropdown-links">
                                                <a href="#" class="dropdown-link">馬達驅動</a>
                                                <a href="#" class="dropdown-link">控制系統</a>
                                                <a href="#" class="dropdown-link">感測器</a>
                                                <a href="#" class="dropdown-link">電力設備</a>
                                                <a href="#" class="dropdown-link">變頻器</a>
                                            </div>
                                        </div>
                                        <div class="dropdown-section">
                                            <h3 class="dropdown-title">特殊機械</h3>
                                            <div class="dropdown-links">
                                                <a href="#" class="dropdown-link">客製化機台</a>
                                                <a href="#" class="dropdown-link">專用設備</a>
                                                <a href="#" class="dropdown-link">模具工具</a>
                                                <a href="#" class="dropdown-link">量測儀器</a>
                                                <a href="#" class="dropdown-link">精密機械</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="nav-item">
                                <a href="#" class="nav-button">電子零組件</a>
                                <div class="dropdown-menu">
                                    <div class="dropdown-grid">
                                        <div class="dropdown-section">
                                            <h3 class="dropdown-title">半導體技術</h3>
                                            <div class="dropdown-links">
                                                <a href="#" class="dropdown-link">IC晶片</a>
                                                <a href="#" class="dropdown-link">記憶體</a>
                                                <a href="#" class="dropdown-link">處理器</a>
                                                <a href="#" class="dropdown-link">功率元件</a>
                                                <a href="#" class="dropdown-link">類比晶片</a>
                                            </div>
                                        </div>
                                        <div class="dropdown-section">
                                            <h3 class="dropdown-title">電路板</h3>
                                            <div class="dropdown-links">
                                                <a href="#" class="dropdown-link">PCB板</a>
                                                <a href="#" class="dropdown-link">軟板FPC</a>
                                                <a href="#" class="dropdown-link">組裝服務</a>
                                                <a href="#" class="dropdown-link">測試服務</a>
                                                <a href="#" class="dropdown-link">HDI板</a>
                                            </div>
                                        </div>
                                        <div class="dropdown-section">
                                            <h3 class="dropdown-title">被動元件</h3>
                                            <div class="dropdown-links">
                                                <a href="#" class="dropdown-link">電阻器</a>
                                                <a href="#" class="dropdown-link">電容器</a>
                                                <a href="#" class="dropdown-link">電感器</a>
                                                <a href="#" class="dropdown-link">連接器</a>
                                                <a href="#" class="dropdown-link">濾波器</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="nav-item">
                                <a href="#" class="nav-button">紡織服飾</a>
                                <div class="dropdown-menu">
                                    <div class="dropdown-grid">
                                        <div class="dropdown-section">
                                            <h3 class="dropdown-title">功能性紡織</h3>
                                            <div class="dropdown-links">
                                                <a href="#" class="dropdown-link">運動機能布</a>
                                                <a href="#" class="dropdown-link">防水透氣</a>
                                                <a href="#" class="dropdown-link">抗菌纖維</a>
                                                <a href="#" class="dropdown-link">智慧紡織</a>
                                                <a href="#" class="dropdown-link">環保纖維</a>
                                            </div>
                                        </div>
                                        <div class="dropdown-section">
                                            <h3 class="dropdown-title">成衣製造</h3>
                                            <div class="dropdown-links">
                                                <a href="#" class="dropdown-link">運動服飾</a>
                                                <a href="#" class="dropdown-link">戶外用品</a>
                                                <a href="#" class="dropdown-link">時尚服裝</a>
                                                <a href="#" class="dropdown-link">工作服</a>
                                                <a href="#" class="dropdown-link">制服訂製</a>
                                            </div>
                                        </div>
                                        <div class="dropdown-section">
                                            <h3 class="dropdown-title">配件用品</h3>
                                            <div class="dropdown-links">
                                                <a href="#" class="dropdown-link">拉鍊扣件</a>
                                                <a href="#" class="dropdown-link">織帶繩索</a>
                                                <a href="#" class="dropdown-link">標籤印刷</a>
                                                <a href="#" class="dropdown-link">包裝材料</a>
                                                <a href="#" class="dropdown-link">設計服務</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="nav-item">
                                <a href="#" class="nav-button">綠能科技</a>
                                <div class="dropdown-menu">
                                    <div class="dropdown-grid">
                                        <div class="dropdown-section">
                                            <h3 class="dropdown-title">太陽能技術</h3>
                                            <div class="dropdown-links">
                                                <a href="#" class="dropdown-link">太陽能板</a>
                                                <a href="#" class="dropdown-link">逆變器</a>
                                                <a href="#" class="dropdown-link">追日系統</a>
                                                <a href="#" class="dropdown-link">儲能設備</a>
                                                <a href="#" class="dropdown-link">安裝服務</a>
                                            </div>
                                        </div>
                                        <div class="dropdown-section">
                                            <h3 class="dropdown-title">風力發電</h3>
                                            <div class="dropdown-links">
                                                <a href="#" class="dropdown-link">風力發電機</a>
                                                <a href="#" class="dropdown-link">葉片材料</a>
                                                <a href="#" class="dropdown-link">塔架結構</a>
                                                <a href="#" class="dropdown-link">控制系統</a>
                                                <a href="#" class="dropdown-link">維護服務</a>
                                            </div>
                                        </div>
                                        <div class="dropdown-section">
                                            <h3 class="dropdown-title">電動車產業</h3>
                                            <div class="dropdown-links">
                                                <a href="#" class="dropdown-link">電池技術</a>
                                                <a href="#" class="dropdown-link">充電設備</a>
                                                <a href="#" class="dropdown-link">電機系統</a>
                                                <a href="#" class="dropdown-link">車用零件</a>
                                                <a href="#" class="dropdown-link">智慧充電</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="nav-item">
                                <a href="#" class="nav-button">AI智慧科技</a>
                                <div class="dropdown-menu">
                                    <div class="dropdown-grid">
                                        <div class="dropdown-section">
                                            <h3 class="dropdown-title">AI晶片</h3>
                                            <div class="dropdown-links">
                                                <a href="#" class="dropdown-link">GPU加速卡</a>
                                                <a href="#" class="dropdown-link">NPU處理器</a>
                                                <a href="#" class="dropdown-link">邊緣運算</a>
                                                <a href="#" class="dropdown-link">FPGA方案</a>
                                                <a href="#" class="dropdown-link">AI伺服器</a>
                                            </div>
                                        </div>
                                        <div class="dropdown-section">
                                            <h3 class="dropdown-title">機器學習</h3>
                                            <div class="dropdown-links">
                                                <a href="#" class="dropdown-link">深度學習框架</a>
                                                <a href="#" class="dropdown-link">電腦視覺</a>
                                                <a href="#" class="dropdown-link">自然語言處理</a>
                                                <a href="#" class="dropdown-link">語音識別</a>
                                                <a href="#" class="dropdown-link">推薦系統</a>
                                            </div>
                                        </div>
                                        <div class="dropdown-section">
                                            <h3 class="dropdown-title">智慧應用</h3>
                                            <div class="dropdown-links">
                                                <a href="#" class="dropdown-link">工業4.0</a>
                                                <a href="#" class="dropdown-link">智慧城市</a>
                                                <a href="#" class="dropdown-link">自動駕駛</a>
                                                <a href="#" class="dropdown-link">醫療AI</a>
                                                <a href="#" class="dropdown-link">金融科技</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div class="carousel-container">
                    <div class="carousel-wrapper">
                        <div class="carousel-track">
                            <div class="carousel-slide">
                                <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=400&fit=crop" alt="工業機械展示" class="slide-image">
                                <div class="slide-content">
                                    <h3 class="slide-title">精密工業機械</h3>
                                    <p class="slide-description">領先的CNC加工技術，為製造業提供高精度、高效率的解決方案</p>
                                </div>
                            </div>
                            <div class="carousel-slide">
                                <img src="https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=1200&h=400&fit=crop" alt="電子科技" class="slide-image">
                                <div class="slide-content">
                                    <h3 class="slide-title">先進電子零組件</h3>
                                    <p class="slide-description">從晶片設計到電路板製造，完整的電子產業鏈解決方案</p>
                                </div>
                            </div>
                            <div class="carousel-slide">
                                <img src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&h=400&fit=crop" alt="綠能科技" class="slide-image">
                                <div class="slide-content">
                                    <h3 class="slide-title">永續綠能科技</h3>
                                    <p class="slide-description">太陽能、風能到電動車，打造低碳永續的未來能源生態系統</p>
                                </div>
                            </div>
                            <div class="carousel-slide">
                                <img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=400&fit=crop" alt="AI智慧科技" class="slide-image">
                                <div class="slide-content">
                                    <h3 class="slide-title">AI智慧解決方案</h3>
                                    <p class="slide-description">人工智慧與機器學習技術，助力企業數位轉型與智慧升級</p>
                                </div>
                            </div>
                        </div>
                        <button class="carousel-nav prev" type="button">‹</button>
                        <button class="carousel-nav next" type="button">›</button>
                        <div class="carousel-controls">
                            <button class="carousel-dot active" type="button"></button>
                            <button class="carousel-dot" type="button"></button>
                            <button class="carousel-dot" type="button"></button>
                            <button class="carousel-dot" type="button"></button>
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

        // 輪播
        this.slides = this.shadowRoot.querySelectorAll('.carousel-slide');
        this.dots = this.shadowRoot.querySelectorAll('.carousel-dot');
        this.track = this.shadowRoot.querySelector('.carousel-track');

        this.shadowRoot.querySelector('.carousel-nav.prev').addEventListener('click', () => this.changeSlide(-1));
        this.shadowRoot.querySelector('.carousel-nav.next').addEventListener('click', () => this.changeSlide(1));
        this.dots.forEach((dot, idx) => {
            dot.addEventListener('click', () => this.currentSlide(idx));
        });

        // 自動輪播
        this.startAutoSlide();

        // 滑鼠懸停暫停
        const wrapper = this.shadowRoot.querySelector('.carousel-wrapper');
        wrapper.addEventListener('mouseenter', () => this.stopAutoSlide());
        wrapper.addEventListener('mouseleave', () => this.startAutoSlide());

        // 導覽互動
        this.shadowRoot.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('mouseenter', () => item.classList.add('active'));
            item.addEventListener('mouseleave', () => item.classList.remove('active'));
        });

        // 鍵盤支援
        this.shadowRoot.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.changeSlide(-1);
            if (e.key === 'ArrowRight') this.changeSlide(1);
        });
        wrapper.setAttribute('tabindex', '0');
    }

    updateCarousel() {
        const translateX = -this.currentSlideIndex * 100;
        this.track.style.transform = `translateX(${translateX}%)`;
        this.dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === this.currentSlideIndex);
        });
    }

    changeSlide(direction) {
        this.currentSlideIndex += direction;
        if (this.currentSlideIndex >= this.slides.length) this.currentSlideIndex = 0;
        if (this.currentSlideIndex < 0) this.currentSlideIndex = this.slides.length - 1;
        this.updateCarousel();
    }

    currentSlide(idx) {
        this.currentSlideIndex = idx;
        this.updateCarousel();
    }

    startAutoSlide() {
        this.stopAutoSlide();
        this.autoSlideInterval = setInterval(() => {
            this.changeSlide(1);
        }, 5000);
    }

    stopAutoSlide() {
        if (this.autoSlideInterval) clearInterval(this.autoSlideInterval);
        this.autoSlideInterval = null;
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
        this.stopAutoSlide();
    }
}
customElements.define('modular-two', ModularTwo);