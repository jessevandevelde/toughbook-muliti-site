// ============================================
// main.js — Alle JavaScript voor de homepage
//
// Structuur:
// 1. Data ophalen van backend
// 2. Bouwfuncties per sectie
// 3. Gallery slider
// 4. Scroll animaties
// ============================================

// ===== 1. DATA OPHALEN =====
// Website ID 4 = Saymon's website in de database
const WEBSITE_ID = 4;
const API_URL = `http://127.0.0.1:3000/api/content/websites/${WEBSITE_ID}`;
const SHARED_FOOTER_URL = 'http://127.0.0.1:3000/api/content/by-domain/shared-footer';
const CONTACT_API_URL = 'http://127.0.0.1:3000/api/contact/';

// Afbeeldingen die we lokaal hebben opgeslagen
const IMAGES = {
  hero:             'assets/images/wow/Panasonic_Toughbook_in_moody_studio_shot.png',
  gallery1:         'assets/images/Product gallery/Rugged_Panasonic_Toughbook_in_cinematic_lighting.png',
  gallery2:         'assets/images/Product gallery/Rugged_Toughbook_in_stormy_terrain.png',
  gallery3:         'assets/images/Product gallery/Rugged_Toughbook_in_a_snowy_wilderness.png',
  gallery4:         'assets/images/Product gallery/Robuuste_Panasonic_Toughbook_in_mistige_studiohoek.png',
  featureRobuust:   'assets/images/Product gallery/Rugged_Panasonic_Toughbook_close-up.png',
  featureScherm:    'assets/images/Product gallery/Robuuste_TOUGHBOOK_in_dramatisch_licht.png',
  featureBatterij:  'assets/images/Product gallery/Rugged_emergency_vehicle_cockpit_in_rain.png',
  featurePrestaties:'assets/images/Product gallery/Ruw_bouwterrein_met_robuust_apparaat.png',
  specsExploded:    'assets/images/wow/Panasonic_Toughbook_uitgelegd_in_lagen.png',
};

// fetch() haalt data op van de backend
// .then() voert iets uit als de data klaar is
fetch(API_URL, {
  cache: 'no-store',
  headers: {
    'Cache-Control': 'no-cache',
  },
})
  .then(response => response.json())
  .then(data => {
    const blocks = data.website.blocks;

    // Loop door alle blokken
    blocks.forEach(block => {
      // Zet fields array om naar handig object
      // Van: [{fieldName: 'title', fieldValue: 'Hallo'}]
      // Naar: {title: 'Hallo'}
      const fields = {};
      block.fields.forEach(f => fields[f.fieldName] = f.fieldValue);

      // Zet items om naar bruikbaar formaat
      const items = block.items.map(item => {
        const itemFields = {};
        item.fields.forEach(f => itemFields[f.fieldName] = f.fieldValue);
        return { ...item, ...itemFields };
      });

      // Roep de juiste bouwfunctie aan
      switch (block.blockTypeName) {
        case 'navbar_block':         buildNavbar(fields, items); break;
        case 'hero_block':           buildHero(fields); break;
        case 'features_block':       buildFeatures(fields, items); break;
        case 'specifications_block': buildSpecs(fields, items); break;
        case 'downloads_block':      buildDownloads(fields, items); break;
        case 'cta_block':            buildCTA(fields, items); break;
      }
    });

    return fetch(SHARED_FOOTER_URL, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache',
      },
    });
  })
  .then(response => response.ok ? response.json() : null)
  .then(payload => {
    const sharedFooter = payload?.footer || payload?.website?.blocks?.find(block => block.blockTypeName === 'footer_block');

    if (sharedFooter) {
      const fields = {};
      sharedFooter.fields.forEach(f => fields[f.fieldName] = f.fieldValue);

      const items = sharedFooter.items.map(item => {
        const itemFields = {};
        item.fields.forEach(f => itemFields[f.fieldName] = f.fieldValue);
        return { ...item, ...itemFields };
      });

      buildFooter(fields, items);
    }

    // Laadscherm verbergen
    document.getElementById('loading').style.display = 'none';

    // Animaties starten
    startScrollAnimations();

    // Gallery initialiseren
    initGallery();

    // Offerteformulier koppelen aan mailservice
    initQuoteForm();
  })
  .catch(error => {
    console.error('Fout bij ophalen data:', error);
    document.getElementById('loading').innerHTML = `
      <div style="text-align:center; padding: 40px;">
        <p style="color:#ef4444; font-size:16px; margin-bottom:12px;">
          ❌ Kon geen verbinding maken met de backend.
        </p>
        <p style="color:#64748b; font-size:14px;">
          Zorg dat de backend draait op http://localhost:3000
        </p>
      </div>
    `;
  });


// ===== 2. BOUWFUNCTIES =====

// --- NAVBAR ---
function buildNavbar(fields, items) {
  const nav = document.getElementById('navbar');

  // Maak nav links van de items
  const links = items
    .filter(i => i.itemType === 'nav_link')
    .map(i => `<li><a href="${i.url}">${i.text}</a></li>`)
    .join('');

  nav.innerHTML = `
    <div class="nav-inner">
      <a href="#" class="nav-logo">
        <div class="nav-logo-icon">P</div>
        <span class="nav-logo-text">${fields.logo_text}</span>
      </a>
      <ul class="nav-links">${links}</ul>
      <a href="${fields.button_url}" class="btn-nav">${fields.button_text}</a>
    </div>
  `;
  nav.style.display = 'block';
}

// --- HERO ---
function buildHero(fields) {
  const hero = document.getElementById('hero');

  hero.innerHTML = `
    <div class="hero-bg"></div>
    <div class="hero-glow-1"></div>
    <div class="hero-glow-2"></div>

    <div class="hero-inner">
      <!-- Linkerkant: tekst -->
      <div class="hero-content fade-up">
        <div class="hero-badge">
          <span class="badge-dot"></span>
          <span class="badge-text">${fields.badge_text}</span>
        </div>

        <h1 class="hero-title">
          <span class="gradient-text">${fields.title_line_1}</span><br>
          <span class="dark-text">${fields.title_line_2} ${fields.title_line_3}</span>
        </h1>

        <p class="hero-desc">${fields.subtitle}</p>

        <div class="hero-btns">
          <a href="${fields.primary_button_url}" class="btn-primary">
            <span>${fields.primary_button_text}</span>
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </a>
          <a href="${fields.secondary_button_url}" class="btn-secondary">
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"/>
              <polygon points="10,8 16,12 10,16" fill="currentColor" stroke="none"/>
            </svg>
            <span>${fields.secondary_button_text}</span>
          </a>
        </div>

        <!-- Stats onderaan hero -->
        <div class="hero-stats">
          <div>
            <div class="stat-number">${fields.stat_1_value}</div>
            <div class="stat-label">${fields.stat_1_label}</div>
          </div>
          <div class="stat-divider"></div>
          <div>
            <div class="stat-number">${fields.stat_2_value}</div>
            <div class="stat-label">${fields.stat_2_label}</div>
          </div>
          <div class="stat-divider"></div>
          <div>
            <div class="stat-number">${fields.stat_3_value}</div>
            <div class="stat-label">${fields.stat_3_label}</div>
          </div>
        </div>
      </div>

      <!-- Rechterkant: productafbeelding -->
      <div class="hero-image-wrap fade-up d2">
        <div class="hero-image-glow"></div>
        <div class="hero-card">
          <img src="${IMAGES.hero}" alt="Panasonic Toughbook 33" />
          <div class="cert-badge">
            <div class="cert-icon">
              <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>
            <div>
              <div class="cert-label">${fields.card_label}</div>
              <div class="cert-title">${fields.card_text}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  hero.style.display = 'flex';
}

// --- FEATURES ---
// Elk feature icoon heeft een eigen kleur en SVG
const FEATURE_ICONS = {
  shield: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>`,
  monitor: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
  battery: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="6" y="7" width="12" height="11" rx="2"/><path d="M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>`,
  zap: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/></svg>`,
};

// Afbeeldingen per feature card
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
      <img class="feat-card-img" src="${FEATURE_IMAGES[i]}" alt="${item.title}" />
      <div class="feat-card-body">
        <div class="feat-icon ${ICON_COLORS[i] || 'icon-1'}">
          ${FEATURE_ICONS[item.icon] || FEATURE_ICONS.shield}
        </div>
        <h3 class="feat-title">${item.title}</h3>
        <p class="feat-text">${item.description}</p>
      </div>
    </div>
  `).join('');

  const section = document.getElementById('features');
  section.innerHTML = `
    <div class="features-bg"></div>
    <div class="section-inner" style="position:relative;">
      <div class="section-head fade-up">
        <h2 class="section-title">
          ${fields.title.replace('Extreme', '<span class="gradient-text">Extreme</span>')}
        </h2>
        <p class="section-desc">${fields.subtitle}</p>
      </div>
      <div class="features-grid">${cards}</div>
      <div class="trusted-banner fade-up">
        <div class="trusted-pill">✓ ${fields.bottom_badge_text}</div>
      </div>
    </div>
  `;
  section.style.display = 'block';
}

// --- SPECS ---
const SPEC_ICONS = {
  cpu: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="2" x2="9" y2="4"/><line x1="15" y1="2" x2="15" y2="4"/></svg>`,
  'hard-drive': `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
  monitor: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
  wifi: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12.55a11 11 0 0114.08 0"/><path d="M1.42 9a16 16 0 0121.16 0"/><path d="M8.53 16.11a6 6 0 016.95 0"/><line x1="12" y1="20" x2="12" y2="20.01"/></svg>`,
  battery: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="6" y="7" width="12" height="11" rx="2"/><path d="M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>`,
  shield: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>`,
};

function buildSpecs(fields, items) {
  const cards = items.map((item, i) => `
    <div class="spec-card fade-up d${(i % 3) + 1}">
      <div class="spec-header">
        <div class="spec-icon">${SPEC_ICONS[item.icon] || SPEC_ICONS.shield}</div>
        <span class="spec-title">${item.title}</span>
      </div>
      <div class="spec-rows">
        <div class="spec-row">
          <span class="spec-label">${item.row_1_label}</span>
          <span class="spec-value">${item.row_1_value}</span>
        </div>
        <div class="spec-row">
          <span class="spec-label">${item.row_2_label}</span>
          <span class="spec-value">${item.row_2_value}</span>
        </div>
        <div class="spec-row">
          <span class="spec-label">${item.row_3_label}</span>
          <span class="spec-value">${item.row_3_value}</span>
        </div>
      </div>
    </div>
  `).join('');

  const section = document.getElementById('specifications');
  section.innerHTML = `
    <div class="specs-bg"></div>
    <div class="section-inner" style="position:relative;">
      <div class="section-head fade-up">
        <h2 class="section-title">
          ${fields.title.replace('Specifications', '<span class="gradient-text">Specifications</span>')}
        </h2>
        <p class="section-desc">${fields.subtitle}</p>
      </div>
      <div class="specs-grid">${cards}</div>
      <div class="specs-stats fade-up">
        <div class="specs-stats-grid">
          <div>
            <div class="stat-big">${fields.bottom_stat_1_value}</div>
            <div class="stat-desc">${fields.bottom_stat_1_label}</div>
          </div>
          <div>
            <div class="stat-big">${fields.bottom_stat_2_value}</div>
            <div class="stat-desc">${fields.bottom_stat_2_label}</div>
          </div>
          <div>
            <div class="stat-big">${fields.bottom_stat_3_value}</div>
            <div class="stat-desc">${fields.bottom_stat_3_label}</div>
          </div>
        </div>
      </div>
      <div class="specs-exploded fade-up">
        <img src="${IMAGES.specsExploded}" alt="Toughbook 33 uitgelegd in lagen" />
      </div>
    </div>
  `;
  section.style.display = 'block';
}

// --- DOWNLOADS ---
const DL_ICON_COLORS = ['dl-icon-1', 'dl-icon-2', 'dl-icon-3'];
const DL_ICON_SVG = `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>`;
const DL_BTN_SVG = `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="18" height="18"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;

function buildDownloads(fields, items) {
  const cards = items.map((item, i) => `
    <div class="dl-card fade-up d${i + 1}">
      <div class="dl-icon ${DL_ICON_COLORS[i]}">${DL_ICON_SVG}</div>
      <div class="dl-title">${item.title}</div>
      <div class="dl-desc">${item.description}</div>
      <div class="dl-meta">
        <span>${item.file_type}</span>
        <span>${item.file_size}</span>
      </div>
      <button class="btn-download" onclick="window.location='${item.url}'">
        ${DL_BTN_SVG} ${item.button_text}
      </button>
    </div>
  `).join('');

  const section = document.getElementById('downloads');
  section.innerHTML = `
    <div class="downloads-bg"></div>
    <div class="section-inner" style="position:relative;">
      <div class="section-head fade-up">
        <h2 class="section-title">
          ${fields.title.replace('Documentation', '<span class="gradient-text">Documentation</span>')}
        </h2>
        <p class="section-desc">${fields.subtitle}</p>
      </div>
      <div class="downloads-grid">${cards}</div>
      <div class="dl-info-box fade-up">
        <div class="dl-info-title">${fields.cta_title}</div>
        <div class="dl-info-text">${fields.cta_text}</div>
        <button class="btn-touch">${fields.cta_button_text}</button>
      </div>
    </div>
  `;
  section.style.display = 'block';
}

// --- CTA ---
function buildCTA(fields, items) {
  const benefits = items.map(item => `
    <div class="cta-feat">
      <div class="cta-feat-icon">
        <svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
        </svg>
      </div>
      <div>
        <div class="cta-feat-title">${item.title}</div>
        <div class="cta-feat-sub">${item.description}</div>
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
          <div class="cta-tag">⚡ ${fields.badge_text}</div>
          <h2 class="cta-title">${fields.title}</h2>
          <p class="cta-desc">${fields.subtitle}</p>
          <div class="cta-btns">
            <a href="${fields.primary_button_url}" class="btn-cta-white">
              ${fields.primary_button_text}
              <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="22" height="22">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </a>
            <a href="${fields.secondary_button_url}" class="btn-cta-ghost">
              <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="22" height="22">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              ${fields.secondary_button_text}
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
  const columns = items.filter(i => i.itemType === 'footer_column');
  const footerLinks = items.filter(i => i.itemType === 'footer_link');
  const columnMarkup = columns.length
    ? columns.map(column => {
      const columnLinks = footerLinks
        .filter(link => Math.floor((link.sortOrder || 0) / 10) === (column.sortOrder || 0))
        .map(link => `<li><a href="${link.url || '#'}">${link.text || link.title || ''}</a></li>`)
        .join('');

      return `
        <div>
          <div class="footer-col-title">${column.title || ''}</div>
          <ul class="footer-links">${columnLinks}</ul>
        </div>
      `;
    }).join('')
    : `
      <div>
        <div class="footer-col-title">Navigation</div>
        <ul class="footer-links">${items.filter(i => i.itemType === 'nav_link').map(i => `<li><a href="${i.url}">${i.text}</a></li>`).join('')}</ul>
      </div>
      <div>
        <div class="footer-col-title">Products</div>
        <ul class="footer-links">${items.filter(i => i.itemType === 'product_link').map(i => `<li><a href="${i.url}">${i.text}</a></li>`).join('')}</ul>
      </div>
    `;

  const footer = document.getElementById('footer');
  footer.innerHTML = `
    <div class="footer-glow-1"></div>
    <div class="footer-glow-2"></div>
    <div class="footer-inner">
      <div class="footer-top">
        <div>
          <div class="footer-logo">
            <div class="footer-logo-icon">P</div>
            <span class="footer-logo-text">${fields.logo_text}</span>
          </div>
          <p class="footer-desc">${fields.description}</p>
          <div class="footer-socials">
            <a href="#" class="social-btn">
              <svg fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
            </a>
            <a href="#" class="social-btn">
              <svg fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
            </a>
            <a href="#" class="social-btn">
              <svg fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="#" class="social-btn">
              <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
          </div>
        </div>
        ${columnMarkup}
      </div>
      <div class="footer-bottom">
        <span class="footer-copy">${fields.copyright_text || fields.copyright}</span>
        <div class="footer-bottom-links">
          ${footerLinks.filter(link => Math.floor((link.sortOrder || 0) / 10) === 4).map(link => `<a href="${link.url || '#'}">${link.text || link.title || ''}</a>`).join('')}
        </div>
      </div>
    </div>
  `;
  footer.style.display = 'block';
}


// ===== 3. GALLERY SLIDER =====
const GALLERY_SLIDES = [
  {
    img: 'assets/images/gallery-1.png',
    title: 'Cinematic View',
    desc: 'De Toughbook 33 in dramatisch cinematisch licht — gebouwd voor elke omgeving'
  },
  {
    img: 'assets/images/gallery-2.png',
    title: 'Stormy Terrain',
    desc: 'Werkt perfect in de zwaarste weersomstandigheden — regen, wind en modder'
  },
  {
    img: 'assets/images/gallery-3.png',
    title: 'Arctic Conditions',
    desc: 'Betrouwbaar tot -29°C — zelfs in besneeuwde en ijzige omstandigheden'
  },
  {
    img: 'assets/images/gallery-4.png',
    title: 'Studio Detail',
    desc: 'Elk detail van de robuuste behuizing is ontworpen voor maximale duurzaamheid'
  },
];

let currentSlide = 0;

function initGallery() {
  updateGallery();
}

function updateGallery() {
  const mainImg = document.getElementById('galleryMainImg');
  const title = document.getElementById('galleryTitle');
  const desc = document.getElementById('galleryDesc');

  if (!mainImg) return;

  // Update hoofdafbeelding en tekst
  mainImg.src = GALLERY_SLIDES[currentSlide].img;
  title.textContent = GALLERY_SLIDES[currentSlide].title;
  desc.textContent = GALLERY_SLIDES[currentSlide].desc;

  // Update dots
  document.querySelectorAll('.gallery-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });

  // Update thumbnails
  document.querySelectorAll('.gallery-thumb').forEach((thumb, i) => {
    thumb.classList.toggle('active', i === currentSlide);
  });
}

// Deze functies worden aangeroepen vanuit de HTML knoppen
function changeSlide(direction) {
  currentSlide = (currentSlide + direction + GALLERY_SLIDES.length) % GALLERY_SLIDES.length;
  updateGallery();
}

function goSlide(index) {
  currentSlide = index;
  updateGallery();
}


// ===== 4. SCROLL ANIMATIES =====
// IntersectionObserver kijkt welke elementen in beeld komen
// en voegt dan de class "show" toe zodat de animatie start
function startScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    },
    { threshold: 0.1 } // Element moet voor 10% zichtbaar zijn
  );

  // Observeer alle elementen met class "fade-up"
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
      name: String(formData.get('name') || '').trim(),
      company: String(formData.get('company') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      phone: String(formData.get('phone') || '').trim(),
      model: String(formData.get('model') || '').trim(),
      quantity: String(formData.get('quantity') || '').trim(),
      message: String(formData.get('message') || '').trim(),
    };

    if (!payload.name || !payload.email || !payload.model || !payload.quantity || !payload.message) {
      status.textContent = 'Vul je naam, e-mailadres, model, aantal en bericht in.';
      status.className = 'quote-form-status quote-form-error';
      return;
    }

    submitButton.disabled = true;
    status.textContent = 'Verzenden...';
    status.className = 'quote-form-status quote-form-info';

    try {
      const response = await fetch(CONTACT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Server error');
      }

      status.textContent = data.message || 'Je aanvraag is verzonden.';
      status.className = 'quote-form-status quote-form-success';
      form.reset();
    } catch (error) {
      console.error(error);
      status.textContent = 'Verzenden mislukt. Probeer het later opnieuw.';
      status.className = 'quote-form-status quote-form-error';
    } finally {
      submitButton.disabled = false;
    }
  });
}
