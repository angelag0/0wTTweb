class ModularNine extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.currentTheme = this.getAttribute('theme') || 'tech';
    this.brands = [
      {
        name: '優貝比嬰幼用品',
        logo: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=100&h=100&fit=crop',
        img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=400&fit=crop'
      },
      {
        name: '美光汽車護理',
        logo: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=100&h=100&fit=crop',
        img: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=400&fit=crop'
      },
      {
        name: '綠聯科技',
        logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop',
        img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop'
      },
      {
        name: '宏達科技',
        logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&h=100&fit=crop',
        img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop'
      },
      {
        name: '屈臣氏',
        logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
        img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=400&fit=crop'
      },
      {
        name: '宜麗客',
        logo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
        img: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=400&fit=crop'
      },
      {
        name: '台積電',
        logo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop',
        img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=400&fit=crop'
      },
      {
        name: '鴻海科技',
        logo: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=100&h=100&fit=crop',
        img: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=800&h=400&fit=crop'
      },
      {
        name: '華碩電腦',
        logo: 'https://images.unsplash.com/photo-1535498730771-e735b998cd64?w=100&h=100&fit=crop',
        img: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=400&fit=crop'
      }
    ];
    this.currentSlide = 0;
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
        .brand-showcase {
          background: var(--primary-bg);
          padding: var(--space-4xl) 0;
          position: relative;
        }
        .container {
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
        }
        .section-subtitle {
          font-size: 20px;
          font-weight: 300;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }
        .slider-container {
          position: relative;
          padding: 0 80px;
        }
        .slider-wrapper {
          overflow: hidden;
          border-radius: 16px;
        }
        .brands-slider {
          display: flex;
          transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          gap: var(--space-lg);
        }
        .brand-card {
          flex: 0 0 calc((100% - 5 * var(--space-lg)) / 6);
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          padding: var(--space-lg);
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          overflow: hidden;
          min-height: 280px;
          display: flex;
          flex-direction: column;
          cursor: pointer;
        }
        .brand-card::before {
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
        .brand-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, var(--sweep-color), transparent);
          transition: left 0.6s ease;
        }
        .brand-card:hover::before { opacity: 1; }
        .brand-card:hover::after { left: 100%; }
        .brand-card:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: var(--border-hover);
          background: var(--glass-hover-bg);
          box-shadow: 0 20px 40px var(--card-shadow);
          z-index: 5;
        }
        .product-image {
          width: 100%;
          height: 160px;
          border-radius: 12px;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          margin-bottom: var(--space-md);
          position: relative;
          overflow: hidden;
          z-index: 2;
        }
        .product-image::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, transparent 0%, rgba(0,0,0,0.1) 100%);
          border-radius: 12px;
        }
        .brand-info {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          margin-top: auto;
          z-index: 2;
          position: relative;
        }
        .brand-logo {
          width: 50px;
          height: 50px;
          border-radius: 8px;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          border: 1px solid var(--border-color);
          flex-shrink: 0;
          position: relative;
          overflow: hidden;
        }
        .brand-logo::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255,255,255,0.05);
          border-radius: 6px;
        }
        .brand-details { flex: 1; }
        .brand-name {
          font-size: 16px;
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.3;
        }
        .nav-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 50px;
          height: 50px;
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          border: 1px solid var(--border-color);
          border-radius: 50%;
          color: var(--accent-color);
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          z-index: 10;
        }
        .nav-button:hover {
          background: var(--accent-color);
          color: #1A1A1A;
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 10px 30px var(--card-shadow);
        }
        .nav-button.prev { left: 0; }
        .nav-button.next { right: 0; }
        .nav-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          pointer-events: none;
        }
        .more-button {
          background: transparent;
          color: var(--accent-color);
          border: 2px solid var(--accent-color);
          border-radius: 100px;
          padding: var(--space-md) var(--space-xl);
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin: var(--space-2xl) auto 0;
          display: block;
          min-width: 120px;
        }
        .more-button:hover {
          background: var(--accent-color);
          color: #1A1A1A;
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 12px 30px var(--card-shadow);
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
        .slider-indicators {
          display: flex;
          justify-content: center;
          gap: var(--space-sm);
          margin-top: var(--space-lg);
        }
        .indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--border-color);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .indicator.active {
          background: var(--accent-color);
          transform: scale(1.2);
        }
        @media (max-width: 1200px) {
          .slider-container { padding: 0 70px; }
          .brand-card { flex: 0 0 calc((100% - 3 * var(--space-lg)) / 4); }
        }
        @media (max-width: 768px) {
          .slider-container { padding: 0 60px; }
          .brand-card { flex: 0 0 calc((100% - 1 * var(--space-lg)) / 2); min-height: 240px; }
          .product-image { height: 120px; }
          .section-title { font-size: 36px; }
          .section-subtitle { font-size: 18px; }
          .brand-logo { width: 40px; height: 40px; }
          .brand-name { font-size: 14px; }
          .nav-button { width: 40px; height: 40px; font-size: 16px; }
          .nav-button.prev { left: -20px; }
          .nav-button.next { right: -20px; }
        }
        @media (max-width: 480px) {
          .slider-container { padding: 0 50px; }
          .brand-card { flex: 0 0 calc(100% - var(--space-lg)); }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      </style>
      <section class="brand-showcase">
        <div class="theme-switcher">
          <button class="theme-btn theme-tech" data-theme="tech" title="科技黑主題"></button>
          <button class="theme-btn theme-gold" data-theme="business-gold" title="商務金主題"></button>
          <button class="theme-btn theme-white" data-theme="classic-white" title="經典白主題"></button>
        </div>
        <div class="container">
          <div class="section-header">
            <span class="section-label">Trusted Brands</span>
            <h2 class="section-title">精選品牌供應商</h2>
            <p class="section-subtitle">與全球知名品牌合作，提供最優質的產品與服務</p>
          </div>
          <div class="slider-container">
            <button class="nav-button prev" title="上一頁">‹</button>
            <button class="nav-button next" title="下一頁">›</button>
            <div class="slider-wrapper">
              <div class="brands-slider">
                ${this.brands.map(brand => `
                  <div class="brand-card">
                    <div class="product-image" style="background-image: url('${brand.img}')"></div>
                    <div class="brand-info">
                      <div class="brand-logo" style="background-image: url('${brand.logo}')"></div>
                      <div class="brand-details">
                        <h3 class="brand-name">${brand.name}</h3>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
          <div class="slider-indicators"></div>
          <button class="more-button">查看更多品牌</button>
        </div>
      </section>
    `;
    this.initEvents();
  }

  getSlidesToShow() {
    const width = window.innerWidth;
    if (width <= 480) return 1;
    if (width <= 768) return 2;
    if (width <= 1200) return 4;
    return 6;
  }

  getTotalSlides() {
    return Math.ceil(this.brands.length / this.getSlidesToShow());
  }

  updateSlider() {
    const slider = this.shadowRoot.querySelector('.brands-slider');
    const cardsPerSlide = this.getSlidesToShow();
    const cardWidth = 100 / cardsPerSlide;
    const translateX = -(this.currentSlide * cardWidth);
    slider.style.transform = `translateX(${translateX}%)`;

    // 更新按鈕狀態
    const prevBtn = this.shadowRoot.querySelector('.nav-button.prev');
    const nextBtn = this.shadowRoot.querySelector('.nav-button.next');
    prevBtn.disabled = this.currentSlide === 0;
    nextBtn.disabled = this.currentSlide >= this.getTotalSlides() - 1;

    // 更新指示器
    this.updateIndicators();
  }

  updateIndicators() {
    const indicatorsContainer = this.shadowRoot.querySelector('.slider-indicators');
    const totalSlides = this.getTotalSlides();
    indicatorsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
      const indicator = document.createElement('div');
      indicator.className = `indicator${i === this.currentSlide ? ' active' : ''}`;
      indicator.addEventListener('click', () => {
        this.goToSlide(i);
      });
      indicatorsContainer.appendChild(indicator);
    }
  }

  goToSlide(index) {
    const totalSlides = this.getTotalSlides();
    this.currentSlide = Math.max(0, Math.min(index, totalSlides - 1));
    this.updateSlider();
  }

  slideLeft() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
      this.updateSlider();
    }
  }

  slideRight() {
    if (this.currentSlide < this.getTotalSlides() - 1) {
      this.currentSlide++;
      this.updateSlider();
    }
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

    // 導航按鈕
    this.shadowRoot.querySelector('.nav-button.prev').addEventListener('click', () => this.slideLeft());
    this.shadowRoot.querySelector('.nav-button.next').addEventListener('click', () => this.slideRight());

    // 品牌卡片點擊
    this.shadowRoot.querySelectorAll('.brand-card').forEach(card => {
      card.addEventListener('click', function () {
        const brandName = this.querySelector('.brand-name').textContent;
        window.alert(`查看品牌詳情: ${brandName}`);
      });
    });

    // More 按鈕
    this.shadowRoot.querySelector('.more-button').addEventListener('click', () => {
      window.alert('跳轉到完整品牌列表頁面');
    });

    // 響應式處理
    window.addEventListener('resize', () => {
      this.currentSlide = 0;
      this.updateSlider();
    });

    // 自動播放
    let autoPlayInterval;
    const startAutoPlay = () => {
      autoPlayInterval = setInterval(() => {
        if (this.currentSlide < this.getTotalSlides() - 1) {
          this.slideRight();
        } else {
          this.goToSlide(0);
        }
      }, 5000);
    };
    const stopAutoPlay = () => clearInterval(autoPlayInterval);

    const sliderWrapper = this.shadowRoot.querySelector('.slider-wrapper');
    sliderWrapper.addEventListener('mouseenter', stopAutoPlay);
    sliderWrapper.addEventListener('mouseleave', startAutoPlay);

    startAutoPlay();

    // 初始 slider
    this.updateSlider();
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
customElements.define('modular-nine', ModularNine);