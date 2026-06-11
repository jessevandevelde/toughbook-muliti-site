// ============================================
// main.js — Alle JavaScript voor de homepage
//
// Structuur:
// 1. Config & utilities
// 2. Data ophalen van backend
// 3. Bouwfuncties per sectie
// 4. Gallery slider
// 5. Scroll & UI effecten
// ============================================


// ===== 1. CONFIG & UTILITIES =====

const WEBSITE_ID = 4;

// Werkt zowel lokaal (localhost/127.0.0.1) als in productie (zelfde origin).
const API_BASE = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost')
  ? 'http://127.0.0.1:3000'
  : '';
const API_URL = `${API_BASE}/api/content/websites/${WEBSITE_ID}`;

// Beschermt tegen XSS: escapet alle tekst die uit de backend komt voor gebruik in innerHTML.
function escHtml(value) {
  if (value == null) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Voorkomt javascript:-URLs in href en src attributen.
function escUrl(url) {
  if (!url || /^javascript:/i.test(String(url).trim())) return '#';
  return escHtml(url);
}

// Wraps één woord in de sectie-titel met een gradient span (veilig: escHtml al toegepast).
function gradientWord(safeTitle, word) {
  const safeWord = escHtml(word);
  return safeTitle.includes(safeWord)
    ? safeTitle.replace(safeWord, `<span class="gradient-text">${safeWord}</span>`)
    : `<span class="gradient-text">${safeTitle}</span>`;
}

// Lokale afbeeldingen (pad relatief aan index.html)
const IMAGES = {
  hero:              'assets/images/wow/Panasonic_Toughbook_in_a_tech_storm.png',
  featureRobuust:    'assets/images/Product gallery/Ruwe_kracht_in_modderige_omstandigheden.png',
  featureScherm:     'assets/images/wow/Futuristisch_tech_lab_met_Toughbook_laptop.png',
  featureBatterij:   'assets/images/Product gallery/Bouwplaats_in_de_regen_met_tablet.png',
  featurePrestaties: 'assets/images/wow/Nachtmissie_met_tactisch_laptop_en_helikopter.png',
  specsExploded:     'assets/images/wow/Panasonic_Toughbook_uitgelegd_in_lagen.png',
  gallery1: 'assets/images/wow/Panasonic_Toughbook_in_a_tech_storm.png',
  gallery2: 'assets/images/wow/Panasonic_Toughbook_in_stormy_terrain.png',
  gallery3: 'assets/images/Product gallery/Rugged_Panasonic_Toughbook_in_cinematic_lighting.png',
  gallery4: 'assets/images/wow/Nachtmissie_met_tactisch_laptop_en_helikopter.png',
};


// ===== 2. DATA OPHALEN =====

fetch(API_URL)
  .then(response => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  })
  .then(data => {
    const blocks = data.website.blocks;

    blocks.forEach(block => {
      const fields = {};
      block.fields.forEach(f => { fields[f.fieldName] = f.fieldValue; });

      const items = block.items.map(item => {
        const itemFields = {};
        item.fields.forEach(f => { itemFields[f.fieldName] = f.fieldValue; });
        return { ...item, ...itemFields };
      });

      switch (block.blockTypeName) {
        case 'navbar_block':         buildNavbar(fields, items); break;
        case 'hero_block':           buildHero(fields); break;
        case 'features_block':       buildFeatures(fields, items); break;
        case 'specifications_block': buildSpecs(fields, items); break;
        case 'downloads_block':      buildDownloads(fields, items); break;
        case 'cta_block':            buildCTA(fields, items); break;
        case 'footer_block':         buildFooter(fields, items); break;
      }
    });

    document.getElementById('loading').style.display = 'none';
    startScrollEffects();
    startScrollAnimations();
    initGallery();
    initQuoteForm();
  })
  .catch(error => {
    console.error('Fout bij ophalen data:', error);
    document.getElementById('loading').innerHTML = `
      <div style="text-align:center; padding: 40px;">
        <p style="color:#ef4444; font-size:16px; margin-bottom:12px;">
          ❌ Kon geen verbinding maken met de backend.
        </p>
        <p style="color:rgba(255,255,255,0.4); font-size:14px;">
          Zorg dat de backend draait op http://localhost:3000
        </p>
      </div>
    `;
  });


// ===== 3. BOUWFUNCTIES =====

// --- NAVBAR ---
function buildNavbar(fields, items) {
  const nav = document.getElementById('navbar');
  const isEnglish = /\/Simon\/en(\/|$)/.test(window.location.pathname);
  const langHref = isEnglish ? '/Simon/index.html' : '/Simon/en/index.html';
  const langLabel = isEnglish ? 'NL' : 'EN';

  const links = items
    .filter(i => i.itemType === 'nav_link')
    .map(i => `<li><a href="${escUrl(i.url)}">${escHtml(i.text)}</a></li>`)
    .join('');

  nav.innerHTML = `
    <div class="nav-inner">
      <a href="#" class="nav-logo">
        <div class="nav-logo-icon">P</div>
        <span class="nav-logo-text">${escHtml(fields.logo_text)}</span>
      </a>
      <ul class="nav-links">${links}</ul>
      <div class="nav-right">
        <a href="${langHref}" class="nav-lang-link">${langLabel}</a>
        <a href="${escUrl(fields.button_url)}" class="btn-nav">${escHtml(fields.button_text)}</a>
        <button class="nav-hamburger" aria-label="Menu openen" aria-expanded="false" aria-controls="navMobile">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
    <div class="nav-mobile" id="navMobile" aria-hidden="true">
      <ul class="nav-mobile-links">${links}</ul>
      <a href="${langHref}" class="btn-nav btn-nav-mobile">${langLabel}</a>
      <a href="${escUrl(fields.button_url)}" class="btn-nav btn-nav-mobile">${escHtml(fields.button_text)}</a>
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

  // Sluit menu na klikken op een link
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

// --- HERO ---
function buildHero(fields) {
  const hero = document.getElementById('hero');

  hero.innerHTML = `
    <div class="hero-bg"></div>
    <div class="hero-glow-1"></div>
    <div class="hero-glow-2"></div>

    <div class="hero-inner">
      <div class="hero-content fade-up">
        <div class="hero-badge">
          <span class="badge-dot"></span>
          <span class="badge-text">${escHtml(fields.badge_text)}</span>
        </div>

        <h1 class="hero-title">
          <span class="gradient-text">${escHtml(fields.title_line_1)}</span><br>
          <span class="dark-text">${escHtml(fields.title_line_2)} ${escHtml(fields.title_line_3)}</span>
        </h1>

        <p class="hero-desc">${escHtml(fields.subtitle)}</p>

        <div class="hero-btns">
          <a href="${escUrl(fields.primary_button_url)}" class="btn-primary">
            <span>${escHtml(fields.primary_button_text)}</span>
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </a>
          <a href="${escUrl(fields.secondary_button_url)}" class="btn-secondary">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/>
              <polygon points="10,8 16,12 10,16" fill="currentColor" stroke="none"/>
            </svg>
            <span>${escHtml(fields.secondary_button_text)}</span>
          </a>
        </div>

        <div class="hero-stats">
          <div>
            <div class="stat-number">${escHtml(fields.stat_1_value)}</div>
            <div class="stat-label">${escHtml(fields.stat_1_label)}</div>
          </div>
          <div class="stat-divider"></div>
          <div>
            <div class="stat-number">${escHtml(fields.stat_2_value)}</div>
            <div class="stat-label">${escHtml(fields.stat_2_label)}</div>
          </div>
          <div class="stat-divider"></div>
          <div>
            <div class="stat-number">${escHtml(fields.stat_3_value)}</div>
            <div class="stat-label">${escHtml(fields.stat_3_label)}</div>
          </div>
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
              <div class="cert-label">${escHtml(fields.card_label)}</div>
              <div class="cert-title">${escHtml(fields.card_text)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  hero.style.display = 'flex';
}

// --- FEATURES ---
const FEATURE_ICONS = {
  shield:  `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>`,
  monitor: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
  battery: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="7" width="12" height="11" rx="2"/><path d="M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>`,
  zap:     `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/></svg>`,
};

const FEATURE_IMAGES = [
  IMAGES.featureRobuust,
  IMAGES.featureScherm,
  IMAGES.featureBatterij,
  IMAGES.featurePrestaties,
];

const ICON_COLORS = ['icon-1', 'icon-2', 'icon-3', 'icon-4'];

function buildFeatures(fields, items) {
  const cards = items.map((item, i) => `
    <div class="feat-card fade-up d${i + 1}">
      <img class="feat-card-img" src="${FEATURE_IMAGES[i] || ''}" alt="${escHtml(item.title)}" loading="lazy" />
      <div class="feat-card-body">
        <div class="feat-icon ${ICON_COLORS[i] || 'icon-1'}" aria-hidden="true">
          ${FEATURE_ICONS[item.icon] || FEATURE_ICONS.shield}
        </div>
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
        <h2 class="section-title">${gradientWord(escHtml(fields.title), 'Extreme')}</h2>
        <p class="section-desc">${escHtml(fields.subtitle)}</p>
      </div>
      <div class="features-grid">${cards}</div>
      <div class="trusted-banner fade-up">
        <div class="trusted-pill">✓ ${escHtml(fields.bottom_badge_text)}</div>
      </div>
    </div>
  `;
  section.style.display = 'block';
}

// --- SPECS ---
const SPEC_ICONS = {
  cpu:          `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="2" x2="9" y2="4"/><line x1="15" y1="2" x2="15" y2="4"/></svg>`,
  'hard-drive': `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
  monitor:      `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
  wifi:         `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.55a11 11 0 0114.08 0"/><path d="M1.42 9a16 16 0 0121.16 0"/><path d="M8.53 16.11a6 6 0 016.95 0"/><line x1="12" y1="20" x2="12" y2="20.01"/></svg>`,
  battery:      `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="7" width="12" height="11" rx="2"/><path d="M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>`,
  shield:       `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>`,
};

function buildSpecs(fields, items) {
  const cards = items.map((item, i) => `
    <div class="spec-card fade-up d${(i % 3) + 1}">
      <div class="spec-header">
        <div class="spec-icon" aria-hidden="true">${SPEC_ICONS[item.icon] || SPEC_ICONS.shield}</div>
        <span class="spec-title">${escHtml(item.title)}</span>
      </div>
      <div class="spec-rows">
        <div class="spec-row">
          <span class="spec-label">${escHtml(item.row_1_label)}</span>
          <span class="spec-value">${escHtml(item.row_1_value)}</span>
        </div>
        <div class="spec-row">
          <span class="spec-label">${escHtml(item.row_2_label)}</span>
          <span class="spec-value">${escHtml(item.row_2_value)}</span>
        </div>
        <div class="spec-row">
          <span class="spec-label">${escHtml(item.row_3_label)}</span>
          <span class="spec-value">${escHtml(item.row_3_value)}</span>
        </div>
      </div>
    </div>
  `).join('');

  const section = document.getElementById('specifications');
  section.innerHTML = `
    <div class="specs-bg"></div>
    <div class="section-inner" style="position:relative;">
      <div class="section-head fade-up">
        <h2 class="section-title">${gradientWord(escHtml(fields.title), 'Specifications')}</h2>
        <p class="section-desc">${escHtml(fields.subtitle)}</p>
      </div>
      <div class="specs-grid">${cards}</div>
      <div class="specs-stats fade-up">
        <div class="specs-stats-grid">
          <div>
            <div class="stat-big">${escHtml(fields.bottom_stat_1_value)}</div>
            <div class="stat-desc">${escHtml(fields.bottom_stat_1_label)}</div>
          </div>
          <div>
            <div class="stat-big">${escHtml(fields.bottom_stat_2_value)}</div>
            <div class="stat-desc">${escHtml(fields.bottom_stat_2_label)}</div>
          </div>
          <div>
            <div class="stat-big">${escHtml(fields.bottom_stat_3_value)}</div>
            <div class="stat-desc">${escHtml(fields.bottom_stat_3_label)}</div>
          </div>
        </div>
      </div>
      <div class="specs-exploded fade-up">
        <img src="${IMAGES.specsExploded}" alt="Toughbook 33 uitgelegd in lagen" loading="lazy" />
      </div>
    </div>
  `;
  section.style.display = 'block';
}

// --- DOWNLOADS ---
const DL_ICON_COLORS = ['dl-icon-1', 'dl-icon-2', 'dl-icon-3'];
const DL_ICON_SVG = `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>`;
const DL_BTN_SVG = `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;

function buildDownloads(fields, items) {
  const cards = items.map((item, i) => `
    <div class="dl-card fade-up d${i + 1}">
      <div class="dl-icon ${DL_ICON_COLORS[i]}">${DL_ICON_SVG}</div>
      <div class="dl-title">${escHtml(item.title)}</div>
      <div class="dl-desc">${escHtml(item.description)}</div>
      <div class="dl-meta">
        <span>${escHtml(item.file_type)}</span>
        <span>${escHtml(item.file_size)}</span>
      </div>
      <a href="${escUrl(item.url)}" class="btn-download" ${item.url.startsWith('/') ? 'download' : 'target="_blank" rel="noopener noreferrer"'}>
        ${DL_BTN_SVG} ${escHtml(item.button_text)}
      </a>
    </div>
  `).join('');

  const section = document.getElementById('downloads');
  section.innerHTML = `
    <div class="downloads-bg"></div>
    <div class="section-inner" style="position:relative;">
      <div class="section-head fade-up">
        <h2 class="section-title">${gradientWord(escHtml(fields.title), 'Documentation')}</h2>
        <p class="section-desc">${escHtml(fields.subtitle)}</p>
      </div>
      <div class="downloads-grid">${cards}</div>
      <div class="dl-info-box fade-up">
        <div class="dl-info-title">${escHtml(fields.cta_title)}</div>
        <div class="dl-info-text">${escHtml(fields.cta_text)}</div>
        <a href="#offerte" class="btn-touch">${escHtml(fields.cta_button_text)}</a>
      </div>
    </div>
  `;
  section.style.display = 'block';
}

// --- CTA ---
function buildCTA(fields, items) {
  const benefits = items.map(item => `
    <div class="cta-feat">
      <div class="cta-feat-icon" aria-hidden="true">
        <svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
        </svg>
      </div>
      <div>
        <div class="cta-feat-title">${escHtml(item.title)}</div>
        <div class="cta-feat-sub">${escHtml(item.description)}</div>
      </div>
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
          <div class="cta-tag">⚡ ${escHtml(fields.badge_text)}</div>
          <h2 class="cta-title">${escHtml(fields.title)}</h2>
          <p class="cta-desc">${escHtml(fields.subtitle)}</p>
          <div class="cta-btns">
            <a href="${escUrl(fields.primary_button_url)}" class="btn-cta-white">
              ${escHtml(fields.primary_button_text)}
              <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </a>
            <a href="#gallery-section" class="btn-cta-ghost">
              <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              ${escHtml(fields.secondary_button_text)}
            </a>
          </div>
        </div>
        <div class="cta-features">${benefits}</div>
      </div>
    </div>
  `;
  section.style.display = 'block';
}

// --- FOOTER ---
function buildFooter(fields, items) {
  const navLinks = items
    .filter(i => i.itemType === 'nav_link')
    .map(i => `<li><a href="${escUrl(i.url)}">${escHtml(i.text)}</a></li>`)
    .join('');

  const supportLinks = items
    .filter(i => i.itemType === 'product_link')
    .map(i => `<li><a href="${escUrl(i.url)}" ${i.url.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''}>${escHtml(i.text)}</a></li>`)
    .join('');

  const groupLinks = items
    .filter(i => i.itemType === 'group_link')
    .map(i => `<li><a href="${escUrl(i.url)}" ${i.url !== '#' ? 'target="_blank" rel="noopener noreferrer"' : ''}>${escHtml(i.text)}</a></li>`)
    .join('');

  const footer = document.getElementById('footer');
  footer.innerHTML = `
    <div class="footer-glow-1"></div>
    <div class="footer-glow-2"></div>
    <div class="footer-inner">
      <div class="footer-top">
        <div>
          <div class="footer-logo">
            <div class="footer-logo-icon">P</div>
            <span class="footer-logo-text">${escHtml(fields.logo_text)}</span>
          </div>
          <p class="footer-desc">${escHtml(fields.description)}</p>
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
          <div class="footer-col-title">Navigatie</div>
          <ul class="footer-links">${navLinks}</ul>
        </div>
        <div>
          <div class="footer-col-title">Ondersteuning</div>
          <ul class="footer-links">${supportLinks}</ul>
        </div>
        <div>
          <div class="footer-col-title">Groepsproducten</div>
          <ul class="footer-links">${groupLinks}</ul>
        </div>
        <div>
          <div class="footer-col-title">Contact</div>
          <ul class="footer-links">
            <li>
              <div class="footer-contact-item">
                <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <a href="mailto:${escHtml(fields.contact_email)}">${escHtml(fields.contact_email)}</a>
              </div>
            </li>
            <li>
              <div class="footer-contact-item">
                <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                <a href="tel:${escHtml(fields.contact_phone)}">${escHtml(fields.contact_phone)}</a>
              </div>
            </li>
            <li>
              <div class="footer-contact-item">
                <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                <span>${escHtml(fields.contact_location)}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span class="footer-copy">${escHtml(fields.copyright)}</span>
        <div class="footer-bottom-links">
          <a href="${escUrl(fields.privacy_policy_url)}" target="_blank" rel="noopener noreferrer">Privacyverklaring</a>
          <a href="${escUrl(fields.terms_url)}" target="_blank" rel="noopener noreferrer">Gebruiksvoorwaarden</a>
          <a href="${escUrl(fields.cookies_url)}" target="_blank" rel="noopener noreferrer">Cookie-beleid</a>
        </div>
      </div>
    </div>
  `;
  footer.style.display = 'block';
}


// ===== 4. GALLERY SLIDER =====

const GALLERY_SLIDES = [
  { img: 'assets/images/wow/Panasonic_Toughbook_in_a_tech_storm.png',                           title: 'Tech Storm',           desc: 'De TOUGHBOOK 33 trotseert de krachtigste technologische stormen — altijd verbonden, altijd aan.' },
  { img: 'assets/images/wow/Nachtmissie_met_tactisch_laptop_en_helikopter.png',                  title: 'Night Mission',        desc: 'Ingezet bij nachtmissies en tactische operaties — waar betrouwbaarheid geen optie is.' },
  { img: 'assets/images/wow/Panasonic_Toughbook_in_stormy_terrain.png',                          title: 'Stormy Terrain',       desc: 'Werkt perfect in de zwaarste weersomstandigheden — regen, wind en modder.' },
  { img: 'assets/images/wow/Futuristisch_tech_lab_met_Toughbook_laptop.png',                     title: 'Futuristisch Lab',     desc: 'Thuis in het meest geavanceerde tech-lab — Intel Core i7 vPro met Intel Iris Xe Graphics.' },
  { img: 'assets/images/wow/Panasonic_Toughbook in_futuristic_setting.png',                      title: 'Futuristic Setting',   desc: 'De TOUGHBOOK 33 MK4 — ontworpen voor de wereld van morgen, gebouwd voor vandaag.' },
  { img: 'assets/images/wow/Panasonic_Toughbook_in_moody_studio_shot.png',                       title: 'Studio Shot',          desc: 'Elk detail van de robuuste behuizing is ontworpen voor maximale duurzaamheid en stijl.' },
  { img: 'assets/images/Product gallery/Rugged_Panasonic_Toughbook_in_cinematic_lighting.png',   title: 'Cinematic View',       desc: 'De TOUGHBOOK 33 in dramatisch cinematisch licht — gebouwd voor elke omgeving.' },
  { img: 'assets/images/Product gallery/Rugged_Panasonic_Toughbook_close-up.png',                title: 'Close-up Detail',      desc: 'MIL-STD-810H gecertificeerd — elk onderdeel is getest op extreme omstandigheden.' },
  { img: 'assets/images/Product gallery/Robuuste_TOUGHBOOK_in_dramatisch_licht.png',             title: 'Dramatisch Licht',     desc: '12" QHD scherm met 1.200 cd/m² helderheid — zichtbaar in direct zonlicht.' },
  { img: 'assets/images/Product gallery/Robuuste_Panasonic_Toughbook_in_mistige_studiohoek.png', title: 'Misty Studio',         desc: 'Robuust design, verfijnd tot in elk detail — IP65 waterdicht en stofvrij.' },
  { img: 'assets/images/Product gallery/Rugged_emergency_vehicle_cockpit_in_rain.png',           title: 'Emergency Vehicle',    desc: 'Standaard uitrusting in hulpdienstvoertuigen — werkt in de hevigste regenbuien.' },
  { img: 'assets/images/Product gallery/Ruwe_kracht_in_modderige_omstandigheden.png',            title: 'Ruwe Kracht',          desc: '150 cm valweerstand — overleeft val op beton, modder of asfalt.' },
  { img: 'assets/images/Product gallery/Bouwplaats_in_de_regen_met_tablet.png',                  title: 'Bouwplaats',           desc: 'Hot-swappable batterij — nooit stilstand op de bouwplaats of in het veld.' },
  { img: 'assets/images/Product gallery/Rugged_Toughbook_in_stormy_terrain.png',                 title: 'Stormy Field',         desc: 'Temperatuurbereik van -29°C tot +63°C — klaar voor elk klimaat ter wereld.' },
  { img: 'assets/images/Product gallery/Rugged_Toughbook_in_a_snowy_wilderness.png',             title: 'Arctic Conditions',    desc: 'Betrouwbaar tot -29°C — zelfs in besneeuwde en ijzige omstandigheden.' },
  { img: 'assets/images/Product gallery/Ruw_bouwterrein_met_robuust_apparaat.png',               title: 'Bouwterrein',          desc: 'Van kantoor tot bouwterrein — de TOUGHBOOK 33 past zich aan elke werkplek aan.' },
  { img: 'assets/images/Product gallery/Ruw_industrieterrein_met_Panasonic_Toughbook.png',       title: 'Industrieterrein',     desc: 'Vertrouwd door industrie en logistiek wereldwijd — gebouwd voor de zwaarste taken.' },
  { img: 'assets/images/Product gallery/Ruw_ontwerp_met_kleurrijke_verlichting.png',             title: 'Design Detail',        desc: 'Krachtig uiterlijk, krachtige inhoud — Intel Wi-Fi 6E en 5G altijd verbonden.' },
];

let currentSlide = 0;
let galleryTimer  = null;

function initGallery() {
  // Bouw dots dynamisch op basis van GALLERY_SLIDES
  const dotsContainer = document.querySelector('.gallery-dots');
  dotsContainer.innerHTML = GALLERY_SLIDES.map((_, i) => `
    <button class="gallery-dot${i === 0 ? ' active' : ''}" data-slide="${i}" role="tab"
      aria-selected="${i === 0}" aria-label="Afbeelding ${i + 1}"></button>
  `).join('');

  // Bouw thumbnails dynamisch op
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
  const title   = document.getElementById('galleryTitle');
  const desc    = document.getElementById('galleryDesc');
  if (!mainImg) return;

  // Fade-out → wissel afbeelding → fade-in
  mainImg.style.opacity = '0';
  setTimeout(() => {
    mainImg.src       = GALLERY_SLIDES[currentSlide].img;
    title.textContent = GALLERY_SLIDES[currentSlide].title;
    desc.textContent  = GALLERY_SLIDES[currentSlide].desc;
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

function initQuoteForm() {
  const form = document.getElementById('quoteForm');
  if (!form) return;

  const status = document.getElementById('quoteFormStatus');
  const submitButton = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const payload = {
      name: String(formData.get('name') || '').trim(),
      company: String(formData.get('company') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      phone: String(formData.get('phone') || '').trim(),
      message: String(formData.get('message') || '').trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      status.textContent = 'Vul alstublieft naam, e-mail en bericht in.';
      status.className = 'quote-form-status quote-form-error';
      return;
    }

    submitButton.disabled = true;
    status.textContent = 'Verzenden...';
    status.className = 'quote-form-status quote-form-info';

    try {
      const response = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Serverfout');
      }

      status.textContent = data.message || 'Je aanvraag is verzonden.';
      status.className = 'quote-form-status quote-form-success';
      form.reset();
    } catch (error) {
      console.error(error);
      status.textContent = 'Verzenden is mislukt. Probeer het later opnieuw.';
      status.className = 'quote-form-status quote-form-error';
    } finally {
      submitButton.disabled = false;
    }
  });
}


// ===== 5. SCROLL & UI EFFECTEN =====

function startScrollEffects() {
  const nav         = document.getElementById('navbar');
  const progressBar = document.getElementById('scrollProgress');
  const backToTop   = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrollY    = window.scrollY;
    const maxScroll  = document.documentElement.scrollHeight - window.innerHeight;

    nav.classList.toggle('scrolled', scrollY > 40);
    progressBar.style.width = (Math.min(scrollY / maxScroll, 1) * 100) + '%';
    backToTop.classList.toggle('visible', scrollY > 600);
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function startScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}
