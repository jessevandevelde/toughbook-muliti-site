// ============================================
// main-en.js — English homepage content
// ============================================

const IMAGES = {
  hero:              '../assets/images/wow/Panasonic_Toughbook_in_moody_studio_shot.png',
  featureRobust:     '../assets/images/Product gallery/Rugged_Panasonic_Toughbook_close-up.png',
  featureScreen:     '../assets/images/Product gallery/Robuuste_TOUGHBOOK_in_dramatisch_licht.png',
  featureBattery:    '../assets/images/Product gallery/Rugged_emergency_vehicle_cockpit_in_rain.png',
  featurePower:      '../assets/images/Product gallery/Ruw_bouwterrein_met_robuust_apparaat.png',
  specsExploded:     '../assets/images/wow/Panasonic_Toughbook_uitgelegd_in_lagen.png',
  gallery1:          '../assets/images/Product gallery/Rugged_Panasonic_Toughbook_in_cinematic_lighting.png',
  gallery2:          '../assets/images/Product gallery/Rugged_Toughbook_in_stormy_terrain.png',
  gallery3:          '../assets/images/Product gallery/Rugged_Toughbook_in_a_snowy_wilderness.png',
  gallery4:          '../assets/images/Product gallery/Robuuste_Panasonic_Toughbook_in_mistige_studiohoek.png',
};

function escHtml(value) {
  if (value == null) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escUrl(url) {
  if (!url || /^javascript:/i.test(String(url).trim())) return '#';
  return escHtml(url);
}

function gradientWord(safeTitle, word) {
  const safeWord = escHtml(word);
  return safeTitle.includes(safeWord)
    ? safeTitle.replace(safeWord, `<span class="gradient-text">${safeWord}</span>`)
    : `<span class="gradient-text">${safeTitle}</span>`;
}

const NAV_LINKS = [
  { url: '#hero', text: 'Home' },
  { url: '#features', text: 'Features' },
  { url: '#specifications', text: 'Specifications' },
  { url: '#gallery-section', text: 'Gallery' },
  { url: '#downloads', text: 'Downloads' },
  { url: '#footer', text: 'Contact' },
];

const HERO_CONTENT = {
  badge_text: 'Fully Rugged 2-in-1',
  title_line_1: 'TOUGHBOOK 33',
  title_line_2: 'Performance in',
  title_line_3: 'Extreme Conditions',
  subtitle: 'A fully rugged 12" QHD 2-in-1 device. MIL-STD-810H certified, IP65 protected and ready for any terrain — from tablet to laptop to vehicle-based workflow.',
  primary_button_text: 'Request a quote',
  primary_button_url: '#offerte',
  secondary_button_text: 'View specifications',
  secondary_button_url: '#specifications',
  stat_1_value: '15h+',
  stat_1_label: 'Battery life',
  stat_2_value: '1.54 kg',
  stat_2_label: 'Weight (tablet)',
  stat_3_value: 'IP65',
  stat_3_label: 'Waterproof',
  card_label: 'Certified',
  card_text: 'MIL-STD-810H',
};

const FEATURES_CONTENT = {
  title: 'Built for Extreme Conditions',
  subtitle: 'The TOUGHBOOK 33 is engineered for professionals who need absolute reliability where others fail.',
  bottom_badge_text: 'Trusted by emergency services, defence and industry worldwide',
  items: [
    {
      icon: 'shield',
      title: 'MIL-STD-810H & IP65',
      description: '150 cm drop resistance, fully dust- and waterproof (IP65), withstands shock, vibration and temperatures from -29°C to +63°C.',
    },
    {
      icon: 'monitor',
      title: '12" QHD Touchscreen',
      description: '2160×1440 resolution with up to 1,200 cd/m² brightness and anti-reflective coating. Works with gloves and in rain thanks to dedicated touch modes.',
    },
    {
      icon: 'battery',
      title: 'Up to 15 hours battery',
      description: 'Hot-swappable Li-Ion batteries so you never run out of power. Panasonic guarantees 5-year battery availability with predictive monitoring.',
    },
    {
      icon: 'zap',
      title: '5G & Wi-Fi 6E',
      description: 'Intel Wi-Fi 6E AX211, Bluetooth 5.3, 4G/5G with eSIM support. Microsoft Secured Core PC with Windows Hello and OPAL SSD encryption.',
    },
  ],
};

const SPEC_CONTENT = {
  title: 'Technical Specifications',
  subtitle: 'Full specifications of the TOUGHBOOK 33 MK4 — the most advanced rugged 2-in-1 device from Panasonic.',
  bottom_stat_1_value: '15h+',
  bottom_stat_1_label: 'Battery life',
  bottom_stat_2_value: 'MIL-810H',
  bottom_stat_2_label: 'Military certified',
  bottom_stat_3_value: 'IP65',
  bottom_stat_3_label: 'Dust & waterproof',
  items: [
    {
      icon: 'cpu',
      title: 'Processor & Memory',
      row_1_label: 'Processor', row_1_value: 'Intel Core i7-1370P vPro',
      row_2_label: 'Memory', row_2_value: '16 GB DDR4 (max. 32 GB)',
      row_3_label: 'Storage', row_3_value: '512 GB NVMe SSD (OPAL, up to 2 TB)',
    },
    {
      icon: 'monitor',
      title: 'Display',
      row_1_label: 'Screen', row_1_value: '12" QHD (2160×1440, 3:2)',
      row_2_label: 'Brightness', row_2_value: 'Up to 1,200 cd/m²',
      row_3_label: 'Touch', row_3_value: '10-finger capacitive + IP55 digitizer',
    },
    {
      icon: 'wifi',
      title: 'Connectivity',
      row_1_label: 'Wi-Fi', row_1_value: 'Intel Wi-Fi 6E AX211',
      row_2_label: 'Bluetooth', row_2_value: '5.3 + EDR Class 1',
      row_3_label: 'Mobile', row_3_value: '4G / 5G with physical SIM + eSIM',
    },
    {
      icon: 'battery',
      title: 'Battery',
      row_1_label: 'Life (tablet)', row_1_value: 'Up to 15.5 hours',
      row_2_label: 'Life (2-in-1)', row_2_value: 'Up to 15 hours',
      row_3_label: 'Type', row_3_value: 'Hot-swappable Li-Ion',
    },
    {
      icon: 'shield',
      title: 'Ruggedness',
      row_1_label: 'Standard', row_1_value: 'MIL-STD-810H + IP65',
      row_2_label: 'Drop resistance', row_2_value: '150 cm (tablet + keyboard)',
      row_3_label: 'Temperature', row_3_value: '-29°C to +63°C',
    },
    {
      icon: 'hard-drive',
      title: 'Weight & Software',
      row_1_label: 'Weight (tablet)', row_1_value: 'From 1.54 kg',
      row_2_label: 'Weight (2-in-1)', row_2_value: 'From 2.81 kg',
      row_3_label: 'OS', row_3_value: 'Windows 11 Pro',
    },
  ],
};

const DOWNLOADS_CONTENT = {
  title: 'Product Documentation',
  subtitle: 'Download the official TOUGHBOOK 33 documentation, brochures and technical specifications.',
  cta_title: 'Looking for more information?',
  cta_text: 'Contact our sales team for personal advice, a demo or a tailored quote.',
  cta_button_text: 'Contact us',
  items: [
    {
      title: 'Product specifications',
      description: 'Complete technical specifications of the TOUGHBOOK 33 MK4 including all configurations.',
      file_type: 'PDF',
      file_size: '2.4 MB',
      url: '#',
      button_text: 'Download',
    },
    {
      title: 'Product brochure',
      description: 'Overview of all TOUGHBOOK 33 models, configurations and enterprise options.',
      file_type: 'PDF',
      file_size: '5.1 MB',
      url: '#',
      button_text: 'Download',
    },
    {
      title: 'CAD files',
      description: '3D CAD drawings for vehicle and system integration of the TOUGHBOOK 33.',
      file_type: 'ZIP',
      file_size: '12.8 MB',
      url: '#',
      button_text: 'Download',
    },
  ],
};

const CTA_CONTENT = {
  badge_text: 'Enterprise Computing',
  title: 'Ready for Performance in Extreme Conditions?',
  subtitle: 'Discover how the TOUGHBOOK 33 strengthens your organisation with unmatched reliability and performance. Trusted by emergency services, defence and industry worldwide.',
  primary_button_text: 'Request a quote',
  primary_button_url: '#offerte',
  secondary_button_text: 'View gallery',
  secondary_button_url: '#gallery-section',
  items: [
    { title: '24/7 Support', description: 'Enterprise-level assistance' },
    { title: '3 Year Warranty', description: 'Standard with every device via ProTect' },
    { title: 'Bulk Discounts', description: 'For enterprise orders' },
  ],
};

const FOOTER_CONTENT = {
  logo_text: 'Panasonic Toughbook',
  description: 'Rugged enterprise laptops built for the toughest work environments.',
  contact_email: 'info@example.com',
  contact_phone: '+31 20 123 4567',
  contact_location: 'Amsterdam, Netherlands',
  copyright: '© 2026 Toughbook. All rights reserved.',
  privacy_policy_url: '#',
  terms_url: '#',
  cookies_url: '#',
  nav_links: NAV_LINKS,
  product_links: [
    { url: '#features', text: 'Features' },
    { url: '#specifications', text: 'Specifications' },
    { url: '#downloads', text: 'Downloads' },
  ],
};

const FEATURE_ICONS = {
  shield: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>`,
  monitor: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
  battery: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="7" width="12" height="11" rx="2"/><path d="M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>`,
  zap: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/></svg>`,
};

const SPEC_ICONS = {
  cpu: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="2" x2="9" y2="4"/><line x1="15" y1="2" x2="15" y2="4"/></svg>`,
  monitor: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
  battery: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="7" width="12" height="11" rx="2"/><path d="M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>`,
  shield: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>`,
};

function buildNavbar() {
  const nav = document.getElementById('navbar');
  const links = NAV_LINKS.map(link => `<li><a href="${escUrl(link.url)}">${escHtml(link.text)}</a></li>`).join('');
  const langHref = '/Simon/index.html';

  nav.innerHTML = `
    <div class="nav-inner">
      <a href="#hero" class="nav-logo">
        <div class="nav-logo-icon">P</div>
        <span class="nav-logo-text">Toughbook</span>
      </a>
      <ul class="nav-links">${links}</ul>
      <div class="nav-right">
        <a href="${langHref}" class="nav-lang-link">NL</a>
        <a href="#downloads" class="btn-nav">Brochure</a>
        <button class="nav-hamburger" aria-label="Open menu" aria-expanded="false" aria-controls="navMobile">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
    <div class="nav-mobile" id="navMobile" aria-hidden="true">
      <ul class="nav-mobile-links">${links}</ul>
      <a href="${langHref}" class="btn-nav btn-nav-mobile">NL</a>
      <a href="#downloads" class="btn-nav btn-nav-mobile">Brochure</a>
    </div>
  `;

  nav.style.display = 'block';

  const hamburger = nav.querySelector('.nav-hamburger');
  const mobileMenu = nav.querySelector('.nav-mobile');

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));
    document.body.classList.toggle('menu-open', isOpen);
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('menu-open');
    });
  });
}

function buildHero() {
  const hero = document.getElementById('hero');
  hero.innerHTML = `
    <div class="hero-bg"></div>
    <div class="hero-glow-1"></div>
    <div class="hero-glow-2"></div>
    <div class="hero-inner">
      <div class="hero-content fade-up">
        <div class="hero-badge">
          <span class="badge-dot"></span>
          <span class="badge-text">${escHtml(HERO_CONTENT.badge_text)}</span>
        </div>
        <h1 class="hero-title">
          <span class="gradient-text">${escHtml(HERO_CONTENT.title_line_1)}</span><br>
          <span class="dark-text">${escHtml(HERO_CONTENT.title_line_2)} ${escHtml(HERO_CONTENT.title_line_3)}</span>
        </h1>
        <p class="hero-desc">${escHtml(HERO_CONTENT.subtitle)}</p>
        <div class="hero-btns">
          <a href="${escUrl(HERO_CONTENT.primary_button_url)}" class="btn-primary">
            <span>${escHtml(HERO_CONTENT.primary_button_text)}</span>
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </a>
          <a href="${escUrl(HERO_CONTENT.secondary_button_url)}" class="btn-secondary">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/>
              <polygon points="10,8 16,12 10,16" fill="currentColor" stroke="none"/>
            </svg>
            <span>${escHtml(HERO_CONTENT.secondary_button_text)}</span>
          </a>
        </div>
        <div class="hero-stats">
          <div><div class="stat-number">${escHtml(HERO_CONTENT.stat_1_value)}</div><div class="stat-label">${escHtml(HERO_CONTENT.stat_1_label)}</div></div>
          <div class="stat-divider"></div>
          <div><div class="stat-number">${escHtml(HERO_CONTENT.stat_2_value)}</div><div class="stat-label">${escHtml(HERO_CONTENT.stat_2_label)}</div></div>
          <div class="stat-divider"></div>
          <div><div class="stat-number">${escHtml(HERO_CONTENT.stat_3_value)}</div><div class="stat-label">${escHtml(HERO_CONTENT.stat_3_label)}</div></div>
        </div>
      </div>
      <div class="hero-image-wrap fade-up d2">
        <div class="hero-image-glow"></div>
        <div class="hero-card">
          <img src="${IMAGES.hero}" alt="Panasonic Toughbook 33" loading="eager" />
          <div class="cert-badge">
            <div class="cert-icon">
              <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>
            <div>
              <div class="cert-label">${escHtml(HERO_CONTENT.card_label)}</div>
              <div class="cert-title">${escHtml(HERO_CONTENT.card_text)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  hero.style.display = 'flex';
}

function buildFeatures() {
  const cards = FEATURES_CONTENT.items.map((item, i) => `
    <div class="feat-card fade-up d${i + 1}">
      <img class="feat-card-img" src="${[IMAGES.featureRobust, IMAGES.featureScreen, IMAGES.featureBattery, IMAGES.featurePower][i]}" alt="${escHtml(item.title)}" loading="lazy" />
      <div class="feat-card-body">
        <div class="feat-icon icon-${i + 1}" aria-hidden="true">${FEATURE_ICONS[item.icon] || FEATURE_ICONS.shield}</div>
        <h3 class="feat-title">${escHtml(item.title)}</h3>
        <p class="feat-text">${escHtml(item.description)}</p>
      </div>
    </div>
  `).join('');

  const section = document.getElementById('features');
  section.innerHTML = `
    <div class="features-bg"></div>
    <div class="section-inner" style="position:relative;">
      <div class="section-head fade-up">
        <h2 class="section-title">${gradientWord(escHtml(FEATURES_CONTENT.title), 'Extreme')}</h2>
        <p class="section-desc">${escHtml(FEATURES_CONTENT.subtitle)}</p>
      </div>
      <div class="features-grid">${cards}</div>
      <div class="trusted-banner fade-up"><div class="trusted-pill">✓ ${escHtml(FEATURES_CONTENT.bottom_badge_text)}</div></div>
    </div>
  `;
  section.style.display = 'block';
}

function buildSpecs() {
  const cards = SPEC_CONTENT.items.map((item, i) => `
    <div class="spec-card fade-up d${(i % 3) + 1}">
      <div class="spec-header">
        <div class="spec-icon" aria-hidden="true">${SPEC_ICONS[item.icon] || SPEC_ICONS.shield}</div>
        <span class="spec-title">${escHtml(item.title)}</span>
      </div>
      <div class="spec-rows">
        <div class="spec-row"><span class="spec-label">${escHtml(item.row_1_label)}</span><span class="spec-value">${escHtml(item.row_1_value)}</span></div>
        <div class="spec-row"><span class="spec-label">${escHtml(item.row_2_label)}</span><span class="spec-value">${escHtml(item.row_2_value)}</span></div>
        <div class="spec-row"><span class="spec-label">${escHtml(item.row_3_label)}</span><span class="spec-value">${escHtml(item.row_3_value)}</span></div>
      </div>
    </div>
  `).join('');

  const section = document.getElementById('specifications');
  section.innerHTML = `
    <div class="specs-bg"></div>
    <div class="section-inner" style="position:relative;">
      <div class="section-head fade-up">
        <h2 class="section-title">${gradientWord(escHtml(SPEC_CONTENT.title), 'Specifications')}</h2>
        <p class="section-desc">${escHtml(SPEC_CONTENT.subtitle)}</p>
      </div>
      <div class="specs-grid">${cards}</div>
      <div class="specs-stats fade-up">
        <div class="specs-stats-grid">
          <div><div class="stat-big">${escHtml(SPEC_CONTENT.bottom_stat_1_value)}</div><div class="stat-desc">${escHtml(SPEC_CONTENT.bottom_stat_1_label)}</div></div>
          <div><div class="stat-big">${escHtml(SPEC_CONTENT.bottom_stat_2_value)}</div><div class="stat-desc">${escHtml(SPEC_CONTENT.bottom_stat_2_label)}</div></div>
          <div><div class="stat-big">${escHtml(SPEC_CONTENT.bottom_stat_3_value)}</div><div class="stat-desc">${escHtml(SPEC_CONTENT.bottom_stat_3_label)}</div></div>
        </div>
      </div>
      <div class="specs-exploded fade-up"><img src="${IMAGES.specsExploded}" alt="Toughbook 33 exploded view" loading="lazy" /></div>
    </div>
  `;
  section.style.display = 'block';
}

function buildDownloads() {
  const cards = DOWNLOADS_CONTENT.items.map((item, i) => `
    <div class="dl-card fade-up d${i + 1}">
      <div class="dl-icon ${['dl-icon-1','dl-icon-2','dl-icon-3'][i]}">${DL_ICON_SVG}</div>
      <div class="dl-title">${escHtml(item.title)}</div>
      <div class="dl-desc">${escHtml(item.description)}</div>
      <div class="dl-meta"><span>${escHtml(item.file_type)}</span><span>${escHtml(item.file_size)}</span></div>
      <a href="${escUrl(item.url)}" class="btn-download" download>${DL_BTN_SVG} ${escHtml(item.button_text)}</a>
    </div>
  `).join('');

  const section = document.getElementById('downloads');
  section.innerHTML = `
    <div class="downloads-bg"></div>
    <div class="section-inner" style="position:relative;">
      <div class="section-head fade-up">
        <h2 class="section-title">${gradientWord(escHtml(DOWNLOADS_CONTENT.title), 'Documentation')}</h2>
        <p class="section-desc">${escHtml(DOWNLOADS_CONTENT.subtitle)}</p>
      </div>
      <div class="downloads-grid">${cards}</div>
      <div class="dl-info-box fade-up">
        <div class="dl-info-title">${escHtml(DOWNLOADS_CONTENT.cta_title)}</div>
        <div class="dl-info-text">${escHtml(DOWNLOADS_CONTENT.cta_text)}</div>
        <button class="btn-touch">${escHtml(DOWNLOADS_CONTENT.cta_button_text)}</button>
      </div>
    </div>
  `;
  section.style.display = 'block';
}

function buildCTA() {
  const benefits = CTA_CONTENT.items.map(item => `
    <div class="cta-feat">
      <div class="cta-feat-icon" aria-hidden="true">
        <svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
      </div>
      <div><div class="cta-feat-title">${escHtml(item.title)}</div><div class="cta-feat-sub">${escHtml(item.description)}</div></div>
    </div>
  `).join('');

  const section = document.getElementById('cta');
  section.innerHTML = `
    <div class="cta-bg"></div>
    <div class="cta-blur-1"></div>
    <div class="cta-blur-2"></div>
    <div class="cta-card fade-up">
      <div class="cta-grid">
        <div class="cta-content">
          <div class="cta-tag">⚡ ${escHtml(CTA_CONTENT.badge_text)}</div>
          <h2 class="cta-title">${escHtml(CTA_CONTENT.title)}</h2>
          <p class="cta-desc">${escHtml(CTA_CONTENT.subtitle)}</p>
          <div class="cta-btns">
            <a href="${escUrl(CTA_CONTENT.primary_button_url)}" class="btn-cta-white">${escHtml(CTA_CONTENT.primary_button_text)}<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg></a>
            <a href="${escUrl(CTA_CONTENT.secondary_button_url)}" class="btn-cta-ghost"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>${escHtml(CTA_CONTENT.secondary_button_text)}</a>
          </div>
        </div>
        <div class="cta-features">${benefits}</div>
      </div>
    </div>
  `;
  section.style.display = 'block';
}

function buildFooter() {
  const navLinks = FOOTER_CONTENT.nav_links.map(link => `<li><a href="${escUrl(link.url)}">${escHtml(link.text)}</a></li>`).join('');
  const productLinks = FOOTER_CONTENT.product_links.map(link => `<li><a href="${escUrl(link.url)}">${escHtml(link.text)}</a></li>`).join('');

  const footer = document.getElementById('footer');
  footer.innerHTML = `
    <div class="footer-glow-1"></div>
    <div class="footer-glow-2"></div>
    <div class="footer-inner">
      <div class="footer-top">
        <div>
          <div class="footer-logo"><div class="footer-logo-icon">P</div><span class="footer-logo-text">${escHtml(FOOTER_CONTENT.logo_text)}</span></div>
          <p class="footer-desc">${escHtml(FOOTER_CONTENT.description)}</p>
          <div class="footer-socials">
            <a href="#" class="social-btn" aria-label="Facebook"><svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg></a>
            <a href="#" class="social-btn" aria-label="Twitter / X"><svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg></a>
            <a href="#" class="social-btn" aria-label="LinkedIn"><svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg></a>
            <a href="#" class="social-btn" aria-label="Instagram"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
          </div>
        </div>
        <div><div class="footer-col-title">Navigation</div><ul class="footer-links">${navLinks}</ul></div>
        <div><div class="footer-col-title">Products</div><ul class="footer-links">${productLinks}</ul></div>
        <div><div class="footer-col-title">Contact</div><ul class="footer-links">
          <li><div class="footer-contact-item"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg><a href="mailto:${escHtml(FOOTER_CONTENT.contact_email)}">${escHtml(FOOTER_CONTENT.contact_email)}</a></div></li>
          <li><div class="footer-contact-item"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/><a href="tel:${escHtml(FOOTER_CONTENT.contact_phone)}">${escHtml(FOOTER_CONTENT.contact_phone)}</a></div></li>
          <li><div class="footer-contact-item"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg><span>${escHtml(FOOTER_CONTENT.contact_location)}</span></div></li>
        </ul></div>
      </div>
      <div class="footer-bottom"><span class="footer-copy">${escHtml(FOOTER_CONTENT.copyright)}</span><div class="footer-bottom-links"><a href="${escUrl(FOOTER_CONTENT.privacy_policy_url)}">Privacy Policy</a><a href="${escUrl(FOOTER_CONTENT.terms_url)}">Terms of Service</a><a href="${escUrl(FOOTER_CONTENT.cookies_url)}">Cookie Policy</a></div></div>
    </div>
  `;
  footer.style.display = 'block';
}

const GALLERY_SLIDES = [
  { img: IMAGES.gallery1, title: 'Cinematic View', desc: 'The Toughbook 33 in dramatic cinematic lighting, built for extreme environments.' },
  { img: IMAGES.gallery2, title: 'Stormy Terrain', desc: 'Trusted performance in rain, mud and heavy weather conditions.' },
  { img: IMAGES.gallery3, title: 'Arctic Conditions', desc: 'Reliable operation down to -29°C for cold climate work.' },
  { img: IMAGES.gallery4, title: 'Studio Detail', desc: 'Precision-crafted rugged design with premium finish and durability.' },
];

let currentSlide = 0;
let galleryTimer = null;

function initGallery() {
  document.getElementById('gallery-section').style.display = 'block';
  updateGallery();

  document.getElementById('galleryPrev').addEventListener('click', () => { changeSlide(-1); resetGalleryTimer(); });
  document.getElementById('galleryNext').addEventListener('click', () => { changeSlide(1); resetGalleryTimer(); });

  document.querySelectorAll('.gallery-dot').forEach(dot => {
    dot.addEventListener('click', () => { goSlide(Number(dot.dataset.slide)); resetGalleryTimer(); });
  });

  document.querySelectorAll('.gallery-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => { goSlide(Number(thumb.dataset.slide)); resetGalleryTimer(); });
  });

  startGalleryTimer();

  const galleryMain = document.querySelector('.gallery-main');
  galleryMain.addEventListener('mouseenter', () => clearInterval(galleryTimer));
  galleryMain.addEventListener('mouseleave', startGalleryTimer);
  galleryMain.addEventListener('focusin', () => clearInterval(galleryTimer));
  galleryMain.addEventListener('focusout', startGalleryTimer);
}

function startGalleryTimer() {
  galleryTimer = setInterval(() => changeSlide(1), 5000);
}

function resetGalleryTimer() {
  clearInterval(galleryTimer);
  startGalleryTimer();
}

function updateGallery() {
  const mainImg = document.getElementById('galleryMainImg');
  const title = document.getElementById('galleryTitle');
  const desc = document.getElementById('galleryDesc');
  if (!mainImg) return;

  mainImg.style.opacity = '0';
  setTimeout(() => {
    mainImg.src = GALLERY_SLIDES[currentSlide].img;
    title.textContent = GALLERY_SLIDES[currentSlide].title;
    desc.textContent = GALLERY_SLIDES[currentSlide].desc;
    mainImg.style.opacity = '1';
  }, 300);

  document.querySelectorAll('.gallery-dot').forEach((dot, i) => {
    const active = i === currentSlide;
    dot.classList.toggle('active', active);
    dot.setAttribute('aria-selected', String(active));
  });

  document.querySelectorAll('.gallery-thumb').forEach((thumb, i) => {
    const active = i === currentSlide;
    thumb.classList.toggle('active', active);
    thumb.setAttribute('aria-selected', String(active));
  });
}

function changeSlide(direction) {
  currentSlide = (currentSlide + direction + GALLERY_SLIDES.length) % GALLERY_SLIDES.length;
  updateGallery();
}

function goSlide(index) {
  currentSlide = index;
  updateGallery();
}

function startScrollEffects() {
  const nav = document.getElementById('navbar');
  const progressBar = document.getElementById('scrollProgress');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    nav.classList.toggle('scrolled', scrollY > 40);
    progressBar.style.width = (Math.min(scrollY / maxScroll, 1) * 100) + '%';
    backToTop.classList.toggle('visible', scrollY > 600);
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function startScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}

function initPage() {
  buildNavbar();
  buildHero();
  buildFeatures();
  buildSpecs();
  buildDownloads();
  buildCTA();
  buildFooter();
  document.getElementById('loading').style.display = 'none';
  startScrollEffects();
  startScrollAnimations();
  initGallery();
}

const DL_ICON_SVG = `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>`;
const DL_BTN_SVG = `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;

window.addEventListener('DOMContentLoaded', initPage);
