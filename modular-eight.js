class ModularEight extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.currentTheme = this.getAttribute('theme') || 'tech';
    this.items = [
      {
        title: '智慧製造',
        desc: '結合AI與IoT技術的未來工廠，實現高效率生產與智能管理系統',
        img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=600&fit=crop',
        link: '了解更多'
      },
      {
        title: '半導體技術',
        desc: '全球領先的晶片製造技術，推動科技創新與數位轉型',
        img: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=600&h=600&fit=crop',
        link: '探索技術'
      },
      {
        title: '綠能創新',
        desc: '永續發展的環保科技解決方案，共創綠色未來與美好地球',
        img: 'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=600&h=600&fit=crop',
        link: '深入了解'
      }
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
          --glass-bg: rgba(255,255,255,0.05);
          --glass-hover-bg: rgba(255,255,255,0.1);
          --accent-color: #FFD700;
          --accent-deep: #E6B800;
          --text-primary: #FFFFFF;
          --text-secondary: rgba(255,255,255,0.7);
          --border-color: rgba(255,215,0,0.3);
          --border-hover: #FFD700;
          --glow-color: rgba(255,215,0,0.4);
          --card-shadow: rgba(255,215,0,0.2);
          --sweep-color: rgba(255,215,0,0.1);
          --overlay-bg: rgba(0,0,0,0.7);
          --overlay-hover-bg: rgba(0,0,0,0.85);
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
          --glass-bg: rgba(255,255,255,0.9);
          --glass-hover-bg: rgba(255,255,255,0.95);
          --accent-color: #D4A017;
          --accent-deep: #B8860B;
          --text-primary: #2C2C2C;
          --text-secondary: #4A4A4A;
          --border-color: #D4A017;
          --border-hover: #B8860B;
          --glow-color: rgba(212,160,23,0.25);
          --card-shadow: rgba(212,160,23,0.2);
          --sweep-color: rgba(212,160,23,0.15);
          --overlay-bg: rgba(255,255,255,0.8);
          --overlay-hover-bg: rgba(255,255,255,0.9);
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
          --glass-bg: rgba(255,255,255,0.95);
          --glass-hover-bg: rgba(255,255,255,1);
          --accent-color: #CC9900;
          --accent-deep: #B8860B;
          --text-primary: #1A1A1A;
          --text-secondary: #333333;
          --border-color: #CC9900;
          --border-hover: #B8860B;
          --glow-color: rgba(204,153,0,0.2);
          --card-shadow: rgba(204,153,0,0.15);
          --sweep-color: rgba(204,153,0,0.1);
          --overlay-bg: rgba(255,255,255,0.85);
          --overlay-hover-bg: rgba(255,255,255,0.95);
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
        .showcase-section {
          position: relative;
          min-height: 100vh;
          background: var(--primary-bg);
          padding: var(--space-5xl) 0;
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
        .theme-gold { background: linear-gradient(45deg, #FFF8E1, #FFD700); }
        .theme-white { background: linear-gradient(45deg, #FFF, #F0F0F0); }
        .bg-elements {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
        }
        .floating-particle {
          position: absolute;
          width: 6px;
          height: 6px;
          background: var(--accent-color);
          border-radius: 50%;
          opacity: 0;
          animation: floatUp 12s infinite ease-in-out;
        }
        .floating-particle:nth-child(1) { left: 10%; animation-delay: 0s; }
        .floating-particle:nth-child(2) { left: 25%; animation-delay: 2s; }
        .floating-particle:nth-child(3) { left: 50%; animation-delay: 4s; }
        .floating-particle:nth-child(4) { left: 75%; animation-delay: 6s; }
        .floating-particle:nth-child(5) { left: 90%; animation-delay: 8s; }
        @keyframes floatUp {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10%,90% { opacity: 0.6; }
          100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
        }
        .section-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 var(--space-2xl);
          position: relative;
          z-index: 10;
        }
        .section-header {
          text-align: center;
          margin-bottom: var(--space-5xl);
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
          animation: labelGlow 3s ease-in-out infinite;
        }
        @keyframes labelGlow {
          0%, 100% { box-shadow: 0 0 10px var(--glow-color);}
          50% { box-shadow: 0 0 20px var(--glow-color);}
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
        .showcase-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
          gap: var(--space-3xl);
          margin-top: var(--space-5xl);
        }
        .showcase-item {
          position: relative;
          height: 420px;
          border-radius: 50%;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          border: 2px solid var(--border-color);
          opacity: 0;
          transform: translateY(30px);
        }
        .showcase-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          border-radius: 50%;
          transition: all 0.5s ease;
          z-index: 1;
        }
        .showcase-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: var(--overlay-bg);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: all 0.5s ease;
          z-index: 2;
        }
        .showcase-content {
          text-align: center;
          padding: var(--space-xl);
          transform: translateY(20px);
          transition: all 0.5s ease;
        }
        .showcase-content h3 {
          font-size: 32px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: var(--space-md);
        }
        .showcase-content p {
          font-size: 16px;
          font-weight: 300;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: var(--space-lg);
        }
        .showcase-link {
          display: inline-flex;
          align-items: center;
          gap: var(--space-sm);
          color: var(--accent-color);
          text-decoration: none;
          font-size: 16px;
          font-weight: 600;
          padding: var(--space-md) var(--space-xl);
          border: 2px solid var(--accent-color);
          border-radius: 100px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .showcase-link::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s ease;
        }
        .showcase-link:hover::before {
          left: 100%;
        }
        .showcase-link:hover {
          background: var(--accent-color);
          color: #1A1A1A;
          transform: translateY(-2px);
          box-shadow: 0 10px 25px var(--glow-color);
        }
        .showcase-item:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: var(--accent-color);
          box-shadow: 0 20px 60px var(--card-shadow);
        }
        .showcase-item:hover .showcase-image {
          transform: scale(1.1);
          filter: blur(2px);
        }
        .showcase-item:hover .showcase-overlay {
          opacity: 1;
          background: var(--overlay-hover-bg);
        }
        .showcase-item:hover .showcase-content {
          transform: translateY(0);
        }
        .showcase-item::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, var(--accent-color), transparent, var(--accent-color));
          border-radius: 50%;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s ease;
          animation: rotateBorder 3s linear infinite;
        }
        .showcase-item:hover::before {
          opacity: 1;
        }
        @keyframes rotateBorder {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          .showcase-section { padding: var(--space-4xl) 0; }
          .section-container { padding: 0 var(--space-md); }
          .section-title { font-size: 36px; }
          .section-subtitle { font-size: 18px; }
          .showcase-grid { grid-template-columns: 1fr; gap: var(--space-2xl);}
          .showcase-item { height: 300px; }
          .showcase-content h3 { font-size: 24px; }
          .showcase-content p { font-size: 14px; }
          .floating-particle { display: none; }
          .showcase-item:hover { transform: translateY(-4px);}
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      </style>
      <section class="showcase-section">
        <div class="theme-switcher">
          <button class="theme-btn theme-tech" data-theme="tech" title="科技黑主題"></button>
          <button class="theme-btn theme-gold" data-theme="business-gold" title="商務金主題"></button>
          <button class="theme-btn theme-white" data-theme="classic-white" title="經典白主題"></button>
        </div>
        <div class="bg-elements">
          <div class="floating-particle"></div>
          <div class="floating-particle"></div>
          <div class="floating-particle"></div>
          <div class="floating-particle"></div>
          <div class="floating-particle"></div>
        </div>
        <div class="section-container">
          <div class="section-header">
            <span class="section-label">Industry Highlights</span>
            <h2 class="section-title">產業亮點展示</h2>
            <p class="section-subtitle">探索台灣頂尖製造技術與創新產品，見證科技與傳統的完美融合</p>
          </div>
          <div class="showcase-grid">
            ${this.items.map(item => `
              <div class="showcase-item">
                <div class="showcase-image" style="background-image: url('${item.img}');"></div>
                <div class="showcase-overlay">
                  <div class="showcase-content">
                    <h3>${item.title}</h3>
                    <p>${item.desc}</p>
                    <a href="#" class="showcase-link">${item.link}</a>
                  </div>
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

    // 進場動畫
    const items = this.shadowRoot.querySelectorAll('.showcase-item');
    items.forEach((item, index) => {
      setTimeout(() => {
        item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, index * 200);
    });

    // 點擊動畫
    items.forEach(item => {
      item.addEventListener('click', function () {
        this.style.transform = 'translateY(-8px) scale(0.98)';
        setTimeout(() => {
          this.style.transform = '';
        }, 200);
      });
    });

    // 視差粒子
    this.shadowRoot.addEventListener('scroll', () => this.handleParallax(), true);
    window.addEventListener('scroll', () => this.handleParallax());
  }

  handleParallax() {
    const scrolled = window.pageYOffset;
    const particles = this.shadowRoot.querySelectorAll('.floating-particle');
    particles.forEach((particle, index) => {
      const speed = 0.5 + (index * 0.1);
      particle.style.transform = `translateY(${scrolled * speed}px)`;
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
customElements.define('modular-eight', ModularEight);