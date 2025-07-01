class ModularSeven extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.currentTheme = this.getAttribute('theme') || 'tech';
    this.products = [
      {
        name: '高效能AI晶片模組',
        price: '$1,299',
        img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop'
      },
      {
        name: '精密CNC加工中心',
        price: '$89,600',
        img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
      },
      {
        name: '機能性運動面料',
        price: '$45',
        img: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop'
      },
      {
        name: '高分子聚合物材料',
        price: '$28',
        img: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=300&fit=crop'
      },
      {
        name: '有機健康食品原料',
        price: '$168',
        img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop'
      },
      {
        name: '智能電動車控制器',
        price: '$2,640',
        img: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&h=300&fit=crop'
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
          --primary-bg: #1A1A1A;
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
          --button-shadow: rgba(255,215,0,0.4);
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
          --button-shadow: rgba(212,160,23,0.4);
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
          --button-shadow: rgba(204,153,0,0.3);
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
        .product-showcase {
          min-height: 100vh;
          background: var(--primary-bg);
          padding: var(--space-5xl) var(--space-2xl);
          display: flex;
          flex-direction: column;
          justify-content: center;
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
        .container {
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
        }
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
        .products-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: var(--space-lg);
          margin-bottom: var(--space-4xl);
        }
        .product-card {
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          cursor: pointer;
          position: relative;
          opacity: 0;
          transform: translateY(30px);
        }
        .product-card::before {
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
        .product-card:hover::before { opacity: 1; }
        .product-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, var(--sweep-color), transparent);
          transition: left 0.6s ease;
        }
        .product-card:hover::after { left: 100%; }
        .product-card:hover {
          transform: translateY(-8px);
          border-color: var(--border-hover);
          box-shadow: 0 20px 60px var(--card-shadow);
        }
        .product-image {
          width: 100%;
          height: 180px;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          position: relative;
          overflow: hidden;
        }
        .product-info {
          padding: var(--space-lg);
          text-align: center;
        }
        .product-name {
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: var(--space-sm);
          line-height: 1.4;
        }
        .product-price {
          font-size: 24px;
          font-weight: 700;
          color: var(--accent-color);
          line-height: 1;
        }
        .more-button {
          background: transparent;
          color: var(--accent-color);
          border: 2px solid var(--accent-color);
          border-radius: 100px;
          padding: var(--space-md) var(--space-2xl);
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin: 0 auto;
          display: block;
          min-width: 160px;
          position: relative;
          overflow: hidden;
        }
        .more-button::before {
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
        .more-button:hover::before { left: 0; }
        .more-button:hover {
          color: #1A1A1A;
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 12px 30px var(--button-shadow);
        }
        @media screen and (max-width: 1200px) {
          .products-grid { grid-template-columns: repeat(3, 1fr); gap: var(--space-lg); }
        }
        @media screen and (max-width: 768px) {
          .product-showcase { padding: var(--space-3xl) var(--space-md); }
          .section-title { font-size: 36px; }
          .products-grid { grid-template-columns: repeat(2, 1fr); gap: var(--space-md); }
          .product-image { height: 150px; }
          .product-name { font-size: 16px; }
          .product-price { font-size: 20px; }
          .product-card:hover { transform: translateY(-4px); }
          .more-button:hover { transform: translateY(-2px) scale(1.01); }
        }
        @media screen and (max-width: 480px) {
          .products-grid { grid-template-columns: 1fr; }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      </style>
      <section class="product-showcase">
        <div class="theme-switcher">
          <button class="theme-btn theme-tech" data-theme="tech" title="科技黑主題"></button>
          <button class="theme-btn theme-gold" data-theme="business-gold" title="商務金主題"></button>
          <button class="theme-btn theme-white" data-theme="classic-white" title="經典白主題"></button>
        </div>
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">熱銷產品推薦</h2>
            <p class="section-subtitle">嚴選全球優質供應商，為您帶來最具競爭力的產品解決方案</p>
          </div>
          <div class="products-grid">
            ${this.products.map(product => `
              <div class="product-card">
                <div class="product-image" style="background-image: url('${product.img}')"></div>
                <div class="product-info">
                  <h3 class="product-name">${product.name}</h3>
                  <div class="product-price">${product.price}</div>
                </div>
              </div>
            `).join('')}
          </div>
          <button class="more-button">查看更多產品</button>
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

    // 產品卡片點擊效果
    this.shadowRoot.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', function () {
        const productName = this.querySelector('.product-name').textContent;
        window.alert(`查看產品詳情: ${productName}`);
      });
    });

    // More按鈕
    this.shadowRoot.querySelector('.more-button').addEventListener('click', () => {
      window.alert('跳轉到完整產品列表頁面');
    });

    // 入場動畫
    const cards = this.shadowRoot.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
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
customElements.define('modular-seven', ModularSeven);