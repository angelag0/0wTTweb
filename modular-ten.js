class ModularTen extends HTMLElement {
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
          --grid-color: rgba(255,215,0,0.1);
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
          --border-color: #D4A017;
          --border-hover: #B8860B;
          --glow-color: rgba(212,160,23,0.25);
          --inner-glow: rgba(212,160,23,0.1);
          --grid-color: rgba(212,160,23,0.15);
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
          --border-color: #CC9900;
          --border-hover: #B8860B;
          --glow-color: rgba(204,153,0,0.2);
          --inner-glow: rgba(204,153,0,0.05);
          --grid-color: rgba(204,153,0,0.1);
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
        .content-section {
          position: relative;
          min-height: 100vh;
          padding: var(--space-5xl) 0;
          background: var(--primary-bg);
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .content-bg {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: url('https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=1080&fit=crop') center/cover;
          opacity: 0.15;
          transform: scale(1.1);
          transition: transform 8s ease;
          z-index: 1;
        }
        .content-section:hover .content-bg {
          transform: scale(1.05);
        }
        .content-bg::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.8) 100%);
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
          z-index: 2;
          opacity: 0.3;
        }
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(80px, 80px); }
        }
        .radial-glow {
          position: absolute;
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, var(--glow-color) 0%, transparent 70%);
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: glowPulse 6s ease-in-out infinite;
          z-index: 2;
        }
        @keyframes glowPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.1; }
          50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.2; }
        }
        .content-container {
          position: relative;
          z-index: 10;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--space-2xl);
        }
        .content-card {
          background: var(--glass-bg);
          backdrop-filter: blur(30px);
          border: 1px solid var(--border-color);
          border-radius: 24px;
          padding: var(--space-4xl) var(--space-3xl);
          text-align: center;
          position: relative;
          overflow: hidden;
          transition: all 0.4s ease;
          opacity: 0;
          transform: translateY(50px);
        }
        .content-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(45deg, var(--accent-color), transparent, var(--accent-color));
          border-radius: 24px;
          padding: 2px;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: xor;
          -webkit-mask-composite: xor;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .content-card:hover::before { opacity: 0.8; }
        .content-card:hover {
          transform: translateY(-8px);
          border-color: var(--accent-color);
          background: var(--glass-hover-bg);
          box-shadow: 0 20px 60px var(--card-shadow);
        }
        .content-label {
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
          transition: all 0.3s ease;
        }
        .content-label:hover {
          border-color: var(--accent-color);
          background: var(--glass-hover-bg);
          transform: scale(1.05);
        }
        .content-title {
          font-size: 56px;
          font-weight: 900;
          color: var(--text-primary);
          margin-bottom: var(--space-2xl);
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
        .content-preview {
          font-size: 20px;
          font-weight: 300;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: var(--space-2xl);
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }
        .content-expand {
          max-height: 0;
          overflow: hidden;
          transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          opacity: 0;
        }
        .content-expand.expanded {
          max-height: 1500px;
          opacity: 1;
          margin-bottom: var(--space-2xl);
        }
        .content-text {
          font-size: 18px;
          font-weight: 300;
          color: var(--text-secondary);
          line-height: 1.8;
          margin-bottom: var(--space-lg);
          text-align: left;
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
        }
        .content-text:last-child { margin-bottom: 0; }
        .content-actions {
          display: flex;
          gap: var(--space-lg);
          justify-content: center;
          flex-wrap: wrap;
        }
        .btn-tech {
          border-radius: 100px;
          height: 48px;
          padding: 0 var(--space-xl);
          font-size: 16px;
          font-weight: 600;
          min-width: 140px;
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
          top: 0; left: -100%;
          width: 100%; height: 100%;
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
        }
        .btn-secondary:hover {
          background: var(--accent-color);
          color: #1A1A1A;
        }
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(10px);
          z-index: 1000;
          opacity: 0;
          visibility: hidden;
          transition: all 0.4s ease;
        }
        .modal-overlay.active {
          opacity: 1;
          visibility: visible;
        }
        .modal-content {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%) scale(0.8);
          width: 90%;
          max-width: 1000px;
          max-height: 90vh;
          background: var(--glass-bg);
          backdrop-filter: blur(30px);
          border: 1px solid var(--border-color);
          border-radius: 24px;
          padding: var(--space-4xl);
          overflow-y: auto;
          transition: all 0.4s ease;
        }
        .modal-overlay.active .modal-content {
          transform: translate(-50%, -50%) scale(1);
        }
        .modal-close {
          position: absolute;
          top: var(--space-lg);
          right: var(--space-lg);
          width: 40px;
          height: 40px;
          border: none;
          background: var(--glass-bg);
          backdrop-filter: blur(10px);
          border: 1px solid var(--border-color);
          border-radius: 50%;
          color: var(--text-primary);
          font-size: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .modal-close:hover {
          background: var(--accent-color);
          color: #1A1A1A;
          border-color: var(--accent-color);
          transform: scale(1.1);
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
        @media (max-width: 768px) {
          .content-section { padding: var(--space-4xl) 0; }
          .content-container { padding: 0 var(--space-md); }
          .content-card { padding: var(--space-2xl); border-radius: 16px; }
          .content-title { font-size: 36px; margin-bottom: var(--space-lg); }
          .content-preview { font-size: 16px; margin-bottom: var(--space-lg); }
          .content-text { font-size: 16px; text-align: center; }
          .content-actions { flex-direction: column; align-items: center; }
          .btn-tech { width: 100%; max-width: 280px; }
          .modal-content { width: 95%; padding: var(--space-2xl); margin: var(--space-lg); max-height: 85vh; }
          .tech-grid, .radial-glow { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      </style>
      <section class="content-section">
        <div class="theme-switcher">
          <button class="theme-btn theme-tech" data-theme="tech" title="科技黑主題"></button>
          <button class="theme-btn theme-gold" data-theme="business-gold" title="商務金主題"></button>
          <button class="theme-btn theme-white" data-theme="classic-white" title="經典白主題"></button>
        </div>
        <div class="content-bg"></div>
        <div class="tech-grid"></div>
        <div class="radial-glow"></div>
        <div class="content-container">
          <div class="content-card">
            <div class="content-label">ABOUT TAIWANTRADE</div>
            <h2 class="content-title">台灣經貿網的使命與願景</h2>
            <p class="content-preview">
              自1988年成立以來，台灣經貿網始終秉持「連結台灣，行銷全球」的使命，致力於成為全球最大的中文B2B採購平台。我們深知台灣製造業的競爭優勢在於創新技術、精密製造和靈活服務...
            </p>
            <div class="content-expand" id="contentExpand">
              <p class="content-text">
                透過35年的深耕經營，我們已建立了涵蓋全球180多個國家的龐大買家網絡，並累積超過200,000家認證供應商。我們的平台不僅提供產品展示和商機媒合，更整合了智慧搜尋、即時翻譯、線上洽談等創新功能，讓全球買家能夠輕鬆找到台灣的優質產品與服務。
              </p>
              <p class="content-text">
                面對數位時代的挑戰，我們持續投入AI、大數據等先進技術，打造更智慧、更精準的媒合平台。同時，我們也積極推動ESG永續發展理念，協助企業建立綠色供應鏈，共同為地球的永續未來努力。
              </p>
              <p class="content-text">
                展望未來，台灣經貿網將繼續扮演台灣企業走向世界的重要橋樑，以科技創新提升服務品質，以專業服務創造更大價值，讓「台灣製造」的品牌在全球市場發光發熱。我們相信，透過持續的創新與努力，台灣經貿網能夠成為全球B2B電子商務的領導平台，為台灣經濟發展貢獻更大的力量。
              </p>
              <p class="content-text">
                在這個快速變遷的時代，我們不斷調整策略，強化平台功能，提供更全面的服務。從產品搜尋、供應商認證、線上交易到售後服務，我們建立了完整的生態系統，確保每一筆交易都能順利完成。我們的目標是讓台灣的中小企業也能輕鬆進入國際市場，與全球買家建立長期的合作關係。
              </p>
              <p class="content-text">
                透過數位轉型和創新服務，我們將持續為台灣企業創造更多商機，讓「台灣品質，全球信賴」的理念深植人心。未來，我們將繼續秉持專業、創新、服務的核心價值，與台灣企業攜手共創美好未來。
              </p>
            </div>
            <div class="content-actions">
              <button class="btn-tech btn-primary" id="expandBtn">
                <span id="expandText">展開閱讀</span>
              </button>
              <button class="btn-tech btn-secondary" id="modalBtn">
                光箱檢視
              </button>
            </div>
          </div>
        </div>
        <div class="modal-overlay" id="modalOverlay">
          <div class="modal-content">
            <button class="modal-close" id="closeModalBtn">&times;</button>
            <div class="content-label">ABOUT TAIWANTRADE</div>
            <h2 class="content-title">台灣經貿網的使命與願景</h2>
            <div style="text-align: left; max-width: none;">
              <p class="content-text">
                自1988年成立以來，台灣經貿網始終秉持「連結台灣，行銷全球」的使命，致力於成為全球最大的中文B2B採購平台。我們深知台灣製造業的競爭優勢在於創新技術、精密製造和靈活服務，因此不斷投入資源協助台灣企業拓展國際市場。
              </p>
              <p class="content-text">
                透過35年的深耕經營，我們已建立了涵蓋全球180多個國家的龐大買家網絡，並累積超過200,000家認證供應商。我們的平台不僅提供產品展示和商機媒合，更整合了智慧搜尋、即時翻譯、線上洽談等創新功能，讓全球買家能夠輕鬆找到台灣的優質產品與服務。
              </p>
              <p class="content-text">
                面對數位時代的挑戰，我們持續投入AI、大數據等先進技術，打造更智慧、更精準的媒合平台。同時，我們也積極推動ESG永續發展理念，協助企業建立綠色供應鏈，共同為地球的永續未來努力。
              </p>
              <p class="content-text">
                展望未來，台灣經貿網將繼續扮演台灣企業走向世界的重要橋樑，以科技創新提升服務品質，以專業服務創造更大價值，讓「台灣製造」的品牌在全球市場發光發熱。我們相信，透過持續的創新與努力，台灣經貿網能夠成為全球B2B電子商務的領導平台，為台灣經濟發展貢獻更大的力量。
              </p>
              <p class="content-text">
                在這個快速變遷的時代，我們不斷調整策略，強化平台功能，提供更全面的服務。從產品搜尋、供應商認證、線上交易到售後服務，我們建立了完整的生態系統，確保每一筆交易都能順利完成。我們的目標是讓台灣的中小企業也能輕鬆進入國際市場，與全球買家建立長期的合作關係。
              </p>
              <p class="content-text">
                透過數位轉型和創新服務，我們將持續為台灣企業創造更多商機，讓「台灣品質，全球信賴」的理念深植人心。未來，我們將繼續秉持專業、創新、服務的核心價值，與台灣企業攜手共創美好未來。
              </p>
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

    // 展開/收起
    const expandBtn = this.shadowRoot.getElementById('expandBtn');
    const expandText = this.shadowRoot.getElementById('expandText');
    const expandContent = this.shadowRoot.getElementById('contentExpand');
    expandBtn.addEventListener('click', () => {
      if (expandContent.classList.contains('expanded')) {
        expandContent.classList.remove('expanded');
        expandText.textContent = '展開閱讀';
      } else {
        expandContent.classList.add('expanded');
        expandText.textContent = '收起內容';
      }
    });

    // 光箱
    const modalBtn = this.shadowRoot.getElementById('modalBtn');
    const modalOverlay = this.shadowRoot.getElementById('modalOverlay');
    const closeModalBtn = this.shadowRoot.getElementById('closeModalBtn');
    modalBtn.addEventListener('click', () => {
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
    closeModalBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
    // ESC 關閉光箱
    this._escHandler = (event) => {
      if (event.key === 'Escape') {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    };
    document.addEventListener('keydown', this._escHandler);

    // 視差背景
    this._scrollHandler = () => {
      const scrolled = window.pageYOffset;
      const bg = this.shadowRoot.querySelector('.content-bg');
      if (bg) {
        bg.style.transform = `scale(1.1) translateY(${scrolled * 0.3}px)`;
      }
    };
    window.addEventListener('scroll', this._scrollHandler);

    // 內容卡片進場動畫
    const contentCard = this.shadowRoot.querySelector('.content-card');
    contentCard.style.opacity = '0';
    contentCard.style.transform = 'translateY(50px)';
    contentCard.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    observer.observe(contentCard);
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

  disconnectedCallback() {
    // 清理事件
    document.removeEventListener('keydown', this._escHandler);
    window.removeEventListener('scroll', this._scrollHandler);
  }
}
customElements.define('modular-ten', ModularTen);