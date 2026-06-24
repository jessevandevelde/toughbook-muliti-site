// ============================================
// main-en.js — English homepage content
// ============================================

const IMAGES = {
  hero:              '../assets/images/wow/Panasonic_Toughbook_in_a_tech_storm.png',
  featureRobust:     '../assets/images/Product gallery/Ruwe_kracht_in_modderige_omstandigheden.png',
  featureScreen:     '../assets/images/wow/Futuristisch_tech_lab_met_Toughbook_laptop.png',
  featureBattery:    '../assets/images/Product gallery/Bouwplaats_in_de_regen_met_tablet.png',
  featurePower:      '../assets/images/wow/Nachtmissie_met_tactisch_laptop_en_helikopter.png',
  specsExploded:     '../assets/images/wow/Panasonic_Toughbook_uitgelegd_in_lagen.png',
  gallery1:          '../assets/images/wow/Panasonic_Toughbook_in_a_tech_storm.png',
  gallery2:          '../assets/images/wow/Panasonic_Toughbook_in_stormy_terrain.png',
  gallery3:          '../assets/images/Product gallery/Rugged_Panasonic_Toughbook_in_cinematic_lighting.png',
  gallery4:          '../assets/images/wow/Nachtmissie_met_tactisch_laptop_en_helikopter.png',
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
      url: '../assets/downloads/toughbook33-specificaties.pdf',
      button_text: 'Download',
    },
    {
      title: 'Product brochure',
      description: 'Overview of all TOUGHBOOK 33 models, configurations and enterprise options.',
      file_type: 'PDF',
      file_size: '5.1 MB',
      url: '../assets/downloads/toughbook33-brochure.pdf',
      button_text: 'Download',
    },
    {
      title: 'CAD files',
      description: 'CAD files are available for registered partners. Contact us to request access.',
      file_type: 'ZIP',
      file_size: 'On request',
      url: '#offerte',
      button_text: 'Contact us',
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
  description: 'Rugged enterprise laptops for professionals in the most demanding work environments — from emergency services to defence and industry.',
  contact_email: 'info@nl.panasonic.com',
  contact_phone: '+31 (0)20 514 6000',
  contact_location: 'Amstelveen, Netherlands',
  copyright: '© 2026 Panasonic Connect. All rights reserved.',
  privacy_policy_url: 'https://eu.connect.panasonic.com/nl/en/privacy-policy',
  terms_url: 'https://eu.connect.panasonic.com/nl/en/terms-of-use',
  cookies_url: 'https://eu.connect.panasonic.com/nl/en/cookie-policy',
  nav_links: NAV_LINKS,
  support_links: [
    { url: '#offerte',                                                    text: 'Request a Quote' },
    { url: '../assets/downloads/toughbook33-brochure.pdf',                text: 'Download Brochure' },
    { url: '../assets/downloads/toughbook33-specificaties.pdf',           text: 'Specifications Sheet' },
    { url: 'https://eu.connect.panasonic.com/nl/en/toughbook',            text: 'Panasonic Connect' },
  ],
  group_links: [
    { url: '#', text: 'TOUGHBOOK 56' },
    { url: '#', text: 'Toughbook G2' },
    { url: '#', text: 'Toughbook 40' },
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
        <a href="#offerte" class="btn-nav">Request a Quote</a>
        <button class="nav-hamburger" aria-label="Open menu" aria-expanded="false" aria-controls="navMobile">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
    <div class="nav-mobile" id="navMobile" aria-hidden="true">
      <ul class="nav-mobile-links">${links}</ul>
      <a href="${langHref}" class="btn-nav btn-nav-mobile">NL</a>
      <a href="#offerte" class="btn-nav btn-nav-mobile">Request a Quote</a>
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
      <a href="${escUrl(item.url)}" class="btn-download" ${item.url.startsWith('.') ? 'download' : 'target="_blank" rel="noopener noreferrer"'}>${DL_BTN_SVG} ${escHtml(item.button_text)}</a>
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
        <a href="#offerte" class="btn-touch">${escHtml(DOWNLOADS_CONTENT.cta_button_text)}</a>
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
  const navLinks = FOOTER_CONTENT.nav_links.map(link =>
    `<li><a href="${escUrl(link.url)}">${escHtml(link.text)}</a></li>`
  ).join('');

  const supportLinks = FOOTER_CONTENT.support_links.map(link =>
    `<li><a href="${escUrl(link.url)}" ${link.url.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''}>${escHtml(link.text)}</a></li>`
  ).join('');

  const groupLinks = FOOTER_CONTENT.group_links.map(link =>
    `<li><a href="${escUrl(link.url)}" ${link.url !== '#' ? 'target="_blank" rel="noopener noreferrer"' : ''}>${escHtml(link.text)}</a></li>`
  ).join('');

  const footer = document.getElementById('footer');
  footer.innerHTML = `
    <div class="footer-glow-1"></div>
    <div class="footer-glow-2"></div>
    <div class="footer-inner">
      <div class="footer-top">
        <div>
          <div class="footer-logo">
            <div class="footer-logo-icon">P</div>
            <span class="footer-logo-text">${escHtml(FOOTER_CONTENT.logo_text)}</span>
          </div>
          <p class="footer-desc">${escHtml(FOOTER_CONTENT.description)}</p>
          <div class="footer-socials">
            <a href="https://www.linkedin.com/company/panasonic-connect-europe/" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="LinkedIn">
              <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="https://www.youtube.com/@PanasonicConnectEurope" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="YouTube">
              <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon fill="#fff" points="9.75,15.02 15.5,12 9.75,8.98 9.75,15.02"/></svg>
            </a>
          </div>
        </div>
        <div>
          <div class="footer-col-title">Navigation</div>
          <ul class="footer-links">${navLinks}</ul>
        </div>
        <div>
          <div class="footer-col-title">Support</div>
          <ul class="footer-links">${supportLinks}</ul>
        </div>
        <div>
          <div class="footer-col-title">Group Products</div>
          <ul class="footer-links">${groupLinks}</ul>
        </div>
        <div>
          <div class="footer-col-title">Contact</div>
          <ul class="footer-links">
            <li>
              <div class="footer-contact-item">
                <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <a href="mailto:${escHtml(FOOTER_CONTENT.contact_email)}">${escHtml(FOOTER_CONTENT.contact_email)}</a>
              </div>
            </li>
            <li>
              <div class="footer-contact-item">
                <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                <a href="tel:${escHtml(FOOTER_CONTENT.contact_phone)}">${escHtml(FOOTER_CONTENT.contact_phone)}</a>
              </div>
            </li>
            <li>
              <div class="footer-contact-item">
                <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                <span>${escHtml(FOOTER_CONTENT.contact_location)}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span class="footer-copy">${escHtml(FOOTER_CONTENT.copyright)}</span>
        <div class="footer-bottom-links">
          <a href="${escUrl(FOOTER_CONTENT.privacy_policy_url)}" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
          <a href="${escUrl(FOOTER_CONTENT.terms_url)}" target="_blank" rel="noopener noreferrer">Terms of Use</a>
          <a href="${escUrl(FOOTER_CONTENT.cookies_url)}" target="_blank" rel="noopener noreferrer">Cookie Policy</a>
        </div>
      </div>
    </div>
  `;
  footer.style.display = 'block';
}

const GALLERY_SLIDES = [
  { img: '../assets/images/wow/Panasonic_Toughbook_in_a_tech_storm.png',                           title: 'Tech Storm',        desc: 'The TOUGHBOOK 33 conquers the most powerful technology storms — always connected, always on.' },
  { img: '../assets/images/wow/Nachtmissie_met_tactisch_laptop_en_helikopter.png',                  title: 'Night Mission',     desc: 'Deployed on night missions and tactical operations — where reliability is non-negotiable.' },
  { img: '../assets/images/wow/Panasonic_Toughbook_in_stormy_terrain.png',                          title: 'Stormy Terrain',    desc: 'Flawless performance in the harshest weather — rain, wind and mud.' },
  { img: '../assets/images/wow/Futuristisch_tech_lab_met_Toughbook_laptop.png',                     title: 'Futuristic Lab',    desc: 'At home in the most advanced tech lab — Intel Core i7 vPro with Intel Iris Xe Graphics.' },
  { img: '../assets/images/wow/Panasonic_Toughbook in_futuristic_setting.png',                      title: 'Future Ready',      desc: 'The TOUGHBOOK 33 MK4 — engineered for tomorrow\'s world, built for today.' },
  { img: '../assets/images/wow/Panasonic_Toughbook_in_moody_studio_shot.png',                       title: 'Studio Shot',       desc: 'Every detail of the rugged housing is designed for maximum durability and style.' },
  { img: '../assets/images/Product gallery/Rugged_Panasonic_Toughbook_in_cinematic_lighting.png',   title: 'Cinematic View',    desc: 'The TOUGHBOOK 33 in dramatic cinematic lighting — built for every environment.' },
  { img: '../assets/images/Product gallery/Rugged_Panasonic_Toughbook_close-up.png',                title: 'Close-up Detail',   desc: 'MIL-STD-810H certified — every component tested under extreme conditions.' },
  { img: '../assets/images/Product gallery/Robuuste_TOUGHBOOK_in_dramatisch_licht.png',             title: 'Dramatic Light',    desc: '12" QHD display at 1,200 cd/m² brightness — visible in direct sunlight.' },
  { img: '../assets/images/Product gallery/Robuuste_Panasonic_Toughbook_in_mistige_studiohoek.png', title: 'Misty Studio',      desc: 'Rugged design, refined to every detail — IP65 waterproof and dustproof.' },
  { img: '../assets/images/Product gallery/Rugged_emergency_vehicle_cockpit_in_rain.png',           title: 'Emergency Vehicle', desc: 'Standard equipment in emergency vehicles — operates in the heaviest downpour.' },
  { img: '../assets/images/Product gallery/Ruwe_kracht_in_modderige_omstandigheden.png',            title: 'Raw Power',         desc: '150 cm drop resistance — survives falls onto concrete, mud or asphalt.' },
  { img: '../assets/images/Product gallery/Bouwplaats_in_de_regen_met_tablet.png',                  title: 'Construction Site', desc: 'Hot-swappable battery — zero downtime on the construction site or in the field.' },
  { img: '../assets/images/Product gallery/Rugged_Toughbook_in_stormy_terrain.png',                 title: 'Stormy Field',      desc: 'Operating range from -29°C to +63°C — ready for every climate on earth.' },
  { img: '../assets/images/Product gallery/Rugged_Toughbook_in_a_snowy_wilderness.png',             title: 'Arctic Conditions', desc: 'Reliable down to -29°C — even in snowy and icy conditions.' },
  { img: '../assets/images/Product gallery/Ruw_bouwterrein_met_robuust_apparaat.png',               title: 'Work Site',         desc: 'From office to building site — the TOUGHBOOK 33 adapts to every workplace.' },
  { img: '../assets/images/Product gallery/Ruw_industrieterrein_met_Panasonic_Toughbook.png',       title: 'Industrial Zone',   desc: 'Trusted by industry and logistics worldwide — built for the toughest tasks.' },
  { img: '../assets/images/Product gallery/Ruw_ontwerp_met_kleurrijke_verlichting.png',             title: 'Design Detail',     desc: 'Powerful looks, powerful core — Intel Wi-Fi 6E and 5G always connected.' },
];

let currentSlide = 0;
let galleryTimer = null;

function initGallery() {
  // Build dots dynamically from GALLERY_SLIDES
  const dotsContainer = document.querySelector('.gallery-dots');
  dotsContainer.innerHTML = GALLERY_SLIDES.map((_, i) => `
    <button class="gallery-dot${i === 0 ? ' active' : ''}" data-slide="${i}" role="tab"
      aria-selected="${i === 0}" aria-label="Image ${i + 1}"></button>
  `).join('');

  // Build thumbnails dynamically
  const thumbsContainer = document.querySelector('.gallery-thumbs');
  thumbsContainer.innerHTML = GALLERY_SLIDES.map((slide, i) => `
    <button class="gallery-thumb${i === 0 ? ' active' : ''}" data-slide="${i}" role="tab"
      aria-selected="${i === 0}" aria-label="${slide.title}">
      <img src="${slide.img}" alt="${slide.title}" loading="lazy" />
      <div class="gallery-thumb-overlay" aria-hidden="true"></div>
    </button>
  `).join('');

  document.getElementById('gallery-section').style.display = 'block';
  updateGallery();

  document.getElementById('galleryPrev').addEventListener('click', () => { changeSlide(-1); resetGalleryTimer(); });
  document.getElementById('galleryNext').addEventListener('click', () => { changeSlide(1);  resetGalleryTimer(); });

  dotsContainer.querySelectorAll('.gallery-dot').forEach(dot => {
    dot.addEventListener('click', () => { goSlide(Number(dot.dataset.slide)); resetGalleryTimer(); });
  });

  thumbsContainer.querySelectorAll('.gallery-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => { goSlide(Number(thumb.dataset.slide)); resetGalleryTimer(); });
  });

  startGalleryTimer();

  const galleryMain = document.querySelector('.gallery-main');
  galleryMain.addEventListener('mouseenter', () => clearInterval(galleryTimer));
  galleryMain.addEventListener('mouseleave', startGalleryTimer);
  galleryMain.addEventListener('focusin',    () => clearInterval(galleryTimer));
  galleryMain.addEventListener('focusout',   startGalleryTimer);
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

function initQuoteForm() {
  const form = document.getElementById('quoteForm');
  if (!form) return;

  const status = document.getElementById('quoteFormStatus');
  const submitButton = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const payload = {
      name:    String(formData.get('name')    || '').trim(),
      company: String(formData.get('company') || '').trim(),
      email:   String(formData.get('email')   || '').trim(),
      phone:   String(formData.get('phone')   || '').trim(),
      message: String(formData.get('message') || '').trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      status.textContent = 'Please fill in your name, email and message.';
      status.className = 'quote-form-status quote-form-error';
      return;
    }

    submitButton.disabled = true;
    status.textContent = 'Sending...';
    status.className = 'quote-form-status quote-form-info';

    try {
      const response = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Server error');
      }

      status.textContent = data.message || 'Your request has been sent.';
      status.className = 'quote-form-status quote-form-success';
      form.reset();
    } catch (error) {
      console.error(error);
      status.textContent = 'Sending failed. Please try again later.';
      status.className = 'quote-form-status quote-form-error';
    } finally {
      submitButton.disabled = false;
    }
  });
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
  initQuoteForm();
}

const DL_ICON_SVG = `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>`;
const DL_BTN_SVG = `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;

window.addEventListener('DOMContentLoaded', initPage);
