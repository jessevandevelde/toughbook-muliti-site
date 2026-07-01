const fallbackSpecData = {
  overview: [
    { label: 'Vormfactor', value: '10,1 inch volledig robuuste converteerbare 2-in-1' },
    { label: 'Scherm', value: '10,1 inch WUXGA IPS, buiten goed leesbaar' },
    { label: 'Batterijduur', value: 'Tot 18,5 uur' },
  ],
};

const localHeroImages = [
  'assets/images/toughbook2.jpeg',
  'assets/images/toughbook.jpeg',
  'assets/images/toughbook3.jpeg',
  'assets/images/toughbook4.jpeg',
];

const config = window.RAFI_CMS_CONFIG || {};
const apiBase = String(config.apiBase || (
  window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000'
    : ''
)).replace(/\/$/, '');
const languageParam = new URLSearchParams(window.location.search).get('lang');
const selectedDomain = languageParam === 'en'
  ? 'toughbook-g2-english.nl'
  : languageParam === 'nl'
    ? 'toughbook-g2-dutch.nl'
    : '';
const defaultDomain = window.location.pathname.includes('/Rafi-English/') ? 'toughbook-g2-english.nl' : 'toughbook-g2-dutch.nl';
const websiteDomain = selectedDomain || config.websiteDomain || defaultDomain;
const selectedLanguage = websiteDomain === 'toughbook-g2-english.nl' ? 'en' : 'nl';
const cmsApiUrl = `${apiBase}/api/content/by-domain/${encodeURIComponent(websiteDomain)}`;
const sharedFooterApiUrl = `${apiBase}/api/content/by-domain/shared-footer`;

let specData = fallbackSpecData;
let activeTab = 'overview';
let heroImages = localHeroImages.slice();

const normalizeFieldName = value => String(value || '').trim().toLowerCase();

const escapeHtml = (value) => String(value ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

const safeUrl = (value) => {
  const raw = String(value || '').trim();
  if (!raw) return '#';
  if (raw === '#specifications') return '#specs';
  if (raw === '#documentation') return '#downloads';
  if (raw === '#applications') return '#usecases';
  if (raw.startsWith('#') || raw.startsWith('./') || raw.startsWith('../') || raw.startsWith('assets/')) return raw;
  if (raw.startsWith('/downloads/')) return 'assets/TOUGHBOOK_G2_Series_Specification.pdf';
  if (raw.startsWith('/images/')) return `assets/images/${raw.split('/').pop()}`;
  if (raw.startsWith('/')) return raw;
  if (raw.startsWith('//') || /^javascript:/i.test(raw)) return '#';
  if (raw.startsWith('mailto:') || raw.startsWith('tel:')) return raw;
  if (!raw.includes(':')) return raw;

  try {
    const url = new URL(raw);
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.href : '#';
  } catch {
    return '#';
  }
};

const getFieldValue = (fields, fieldNames, fallback = '') => {
  if (!Array.isArray(fields)) return fallback;

  const normalizedNames = fieldNames.map(normalizeFieldName);
  const field = fields.find((entry) => {
    const fieldName = normalizeFieldName(entry.fieldName || entry.name || entry.key);
    return normalizedNames.includes(fieldName);
  });

  return field?.fieldValue ?? field?.value ?? fallback;
};

const getBlockByName = (website, blockNames) => {
  const blocks = website?.blocks || [];
  const normalizedNames = blockNames.map(normalizeFieldName);

  return blocks.find((block) => {
    const blockName = normalizeFieldName(block.blockTypeName || block.name || block.type);
    return normalizedNames.includes(blockName);
  });
};

const getBlockItems = block => (block?.items || [])
  .slice()
  .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

const itemFields = item => item?.fields || [];

const itemsByType = (block, type) => getBlockItems(block)
  .filter(item => normalizeFieldName(item.itemType) === normalizeFieldName(type));

const setTextContent = (selector, value) => {
  const element = document.querySelector(selector);
  if (element && value) element.textContent = value;
};

const languageCopy = {
  nl: {
    labels: {
      name: 'Naam <span class="form-required">*</span>',
      company: 'Bedrijf',
      email: 'E-mail <span class="form-required">*</span>',
      phone: 'Telefoon',
      model: 'Model <span class="form-required">*</span>',
      quantity: 'Aantal <span class="form-required">*</span>',
      message: 'Bericht <span class="form-required">*</span>',
    },
    placeholders: {
      name: 'Jan Jansen',
      company: 'Bedrijfsnaam',
      email: 'jan@bedrijf.nl',
      phone: '+31 6 1234 5678',
      quantity: 'Bijv. 10',
      message: 'Waar heeft u een offerte voor nodig?',
    },
    submit: 'Offerteaanvraag versturen',
    sending: 'Verzenden...',
    successTitle: 'Offerteaanvraag verzonden',
    successDesc: 'Bedankt voor uw interesse. Een specialist neemt binnen een werkdag contact met u op.',
    legal: 'Door dit formulier te verzenden gaat u akkoord met ons privacybeleid en onze gebruiksvoorwaarden.',
    serverError: 'Er is een fout opgetreden. Probeer het opnieuw.',
    connectionError: 'Verbindingsfout. Controleer uw internetverbinding en probeer het opnieuw.',
    switchHref: '?lang=en',
    switchTitle: 'Switch to English',
    switchFlag: 'gb',
    switchAlt: 'English',
  },
  en: {
    labels: {
      name: 'Name <span class="form-required">*</span>',
      company: 'Company',
      email: 'Email <span class="form-required">*</span>',
      phone: 'Phone',
      model: 'Model <span class="form-required">*</span>',
      quantity: 'Quantity <span class="form-required">*</span>',
      message: 'Message <span class="form-required">*</span>',
    },
    placeholders: {
      name: 'John Smith',
      company: 'Company name',
      email: 'john@company.com',
      phone: '+31 6 1234 5678',
      quantity: 'For example 10',
      message: 'What do you need a quote for?',
    },
    submit: 'Submit quote request',
    sending: 'Sending...',
    successTitle: 'Quote request sent',
    successDesc: 'Thank you for your interest. A specialist will contact you within one business day.',
    legal: 'By submitting this form, you agree to our privacy policy and terms of use.',
    serverError: 'Something went wrong. Please try again.',
    connectionError: 'Connection error. Check your internet connection and try again.',
    switchHref: '?lang=nl',
    switchTitle: 'Naar de Nederlandse versie',
    switchFlag: 'nl',
    switchAlt: 'Nederlands',
  },
};

const activeCopy = languageCopy[selectedLanguage];
window.RAFI_LANGUAGE_COPY = activeCopy;

const applyLanguageChrome = () => {
  Object.entries(activeCopy.labels).forEach(([name, labelText]) => {
    const input = document.querySelector(`[name="${name}"]`);
    const label = input?.closest('.form-group')?.querySelector('.form-label');
    if (label) label.innerHTML = labelText;
  });

  Object.entries(activeCopy.placeholders).forEach(([name, placeholder]) => {
    const input = document.querySelector(`[name="${name}"]`);
    if (input) input.placeholder = placeholder;
  });

  setTextContent('#submit-label', activeCopy.submit);
  setTextContent('#success-title', activeCopy.successTitle);
  setTextContent('#success-desc', activeCopy.successDesc);
  setTextContent('.form-legal', activeCopy.legal);

  const languageSwitch = document.querySelector('.lang-switch');
  const flag = languageSwitch?.querySelector('img');
  if (languageSwitch) {
    languageSwitch.href = activeCopy.switchHref;
    languageSwitch.title = activeCopy.switchTitle;
  }
  if (flag) {
    flag.src = `https://flagcdn.com/w40/${activeCopy.switchFlag}.png`;
    flag.alt = activeCopy.switchAlt;
  }
};

const docIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>';
const arrowIcon = '<svg class="download-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
const chevronIcon = '<svg class="industry-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>';
const usecaseIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>';

const renderNavbar = (block) => {
  const fields = block?.fields || [];
  const links = itemsByType(block, 'nav_link');
  const desktop = document.querySelector('.nav-links');
  const mobile = document.getElementById('mobile-menu');
  const logoText = getFieldValue(fields, ['logo_text']);
  const buttonText = getFieldValue(fields, ['button_text']);
  const buttonUrl = safeUrl(getFieldValue(fields, ['button_url'], '#quote'));

  if (logoText) {
    const parts = logoText.split(/\s+/);
    setTextContent('.nav-logo-badge span', parts[0] || logoText);
    setTextContent('.nav-logo-sub', parts.slice(1).join(' ') || logoText);
  }

  if (desktop && links.length) {
    desktop.innerHTML = links.map((item) => {
      const fields = itemFields(item);
      const text = getFieldValue(fields, ['text', 'title']);
      const url = safeUrl(getFieldValue(fields, ['url', 'href'], '#'));
      return `<a href="${url}">${escapeHtml(text)}</a>`;
    }).join('') + (buttonText ? `<a href="${buttonUrl}" class="btn-nav-cta" id="nav-cta">${escapeHtml(buttonText)}</a>` : '');
  }

  if (mobile && links.length) {
    mobile.innerHTML = links.map((item) => {
      const fields = itemFields(item);
      const text = getFieldValue(fields, ['text', 'title']);
      const url = safeUrl(getFieldValue(fields, ['url', 'href'], '#'));
      return `<a href="${url}" onclick="closeMobile()">${escapeHtml(text)}</a>`;
    }).join('');
  }
};

const renderHero = (block) => {
  const fields = block?.fields || [];
  const featureItems = itemsByType(block, 'feature');

  setTextContent('#hero-tag', getFieldValue(fields, ['badge_text', 'tag_text']));
  setTextContent('.hero-title', getFieldValue(fields, ['title_line_1', 'title']));
  setTextContent('.hero-title-blue', getFieldValue(fields, ['title_line_2']));
  setTextContent('#hero-sub', getFieldValue(fields, ['subtitle']));
  setTextContent('#hero-desc', getFieldValue(fields, ['description']));

  const primary = document.getElementById('hero-cta1');
  const secondary = document.getElementById('hero-cta2');
  if (primary) {
    primary.childNodes[0].textContent = getFieldValue(fields, ['primary_button_text'], primary.textContent).trim() + ' ';
    primary.href = safeUrl(getFieldValue(fields, ['primary_button_url'], '#quote'));
  }
  if (secondary) {
    secondary.textContent = getFieldValue(fields, ['secondary_button_text'], secondary.textContent);
    secondary.href = safeUrl(getFieldValue(fields, ['secondary_button_url'], '#specs'));
  }

  const features = document.querySelector('.hero-features');
  if (features && featureItems.length) {
    features.innerHTML = featureItems.map((item) => {
      const text = getFieldValue(itemFields(item), ['text', 'title', 'label']);
      return `<div class="hero-feature">${usecaseIcon}<span>${escapeHtml(text)}</span></div>`;
    }).join('');
  }

  const cmsImage = getFieldValue(fields, ['main_image', 'image_url']);
  heroImages = [cmsImage, ...localHeroImages].filter(Boolean).map(safeUrl);
  syncHeroThumbs();
};

const buildSpecDataFromCms = (block) => {
  const specRows = itemsByType(block, 'spec_row');
  if (!specRows.length) return null;

  return {
    overview: specRows.map((item) => ({
      label: getFieldValue(itemFields(item), ['label', 'name', 'title']),
      value: getFieldValue(itemFields(item), ['value', 'text', 'description']),
    })).filter(row => row.label && row.value),
  };
};

const renderSpecTabs = (block) => {
  const tabContainer = document.querySelector('.spec-tabs');
  const tabs = itemsByType(block, 'tab');
  const tabKeys = Object.keys(specData);
  const visibleTabs = tabs.length ? tabs.slice(0, Math.max(1, tabKeys.length)) : tabKeys.map(key => ({ fields: [{ fieldName: 'text', fieldValue: key }] }));

  if (!tabContainer) return;
  tabContainer.innerHTML = visibleTabs.map((item, index) => {
    const key = tabKeys[index] || tabKeys[0] || 'overview';
    const text = getFieldValue(itemFields(item), ['text', 'title', 'label'], key);
    return `<button class="spec-tab ${index === 0 ? 'active' : ''}" onclick="setTab('${key}',this)">${escapeHtml(text)}</button>`;
  }).join('');
};

const renderSpecs = (block) => {
  const fields = block?.fields || [];
  setTextContent('#specs .section-label', getFieldValue(fields, ['badge_text', 'section_label']));
  setTextContent('#specs-heading', getFieldValue(fields, ['title', 'heading']));
  setTextContent('#specs-sub', getFieldValue(fields, ['subtitle', 'description']));

  const cmsSpecs = buildSpecDataFromCms(block);
  if (cmsSpecs) {
    specData = cmsSpecs;
    activeTab = Object.keys(specData)[0];
  }
  renderSpecTabs(block);
  renderSpecTable();

  const highlights = itemsByType(block, 'highlight');
  const highlightList = document.querySelector('.highlights-label')?.parentElement;
  if (highlightList && highlights.length) {
    const label = document.querySelector('.highlights-label')?.outerHTML || '';
    const stats = document.querySelector('.stats-strip')?.outerHTML || '';
    highlightList.innerHTML = label + highlights.map((item) => {
      const fields = itemFields(item);
      return `<div class="highlight-item"><div class="highlight-dot"></div><div><div class="highlight-title">${escapeHtml(getFieldValue(fields, ['title']))}</div><div class="highlight-desc">${escapeHtml(getFieldValue(fields, ['description', 'text']))}</div></div></div>`;
    }).join('') + stats;
  }

  const stats = itemsByType(block, 'stat');
  const statsStrip = document.querySelector('.stats-strip');
  if (statsStrip && stats.length) {
    statsStrip.innerHTML = stats.map((item) => {
      const fields = itemFields(item);
      return `<div class="stat-cell"><div class="stat-value">${escapeHtml(getFieldValue(fields, ['value']))}</div><div class="stat-label">${escapeHtml(getFieldValue(fields, ['label', 'text']))}</div></div>`;
    }).join('');
  }

  const specsButton = document.getElementById('specs-dl-btn');
  if (specsButton) {
    specsButton.href = safeUrl(getFieldValue(fields, ['download_button_url'], specsButton.href));
    specsButton.lastChild.textContent = ' ' + getFieldValue(fields, ['download_button_text'], specsButton.textContent.trim());
  }
};

const renderUseCases = (block) => {
  const fields = block?.fields || [];
  setTextContent('#usecases .section-label', getFieldValue(fields, ['badge_text', 'section_label']));
  setTextContent('#usecases .section-heading', getFieldValue(fields, ['title']));
  setTextContent('#usecases .section-sub', getFieldValue(fields, ['subtitle', 'description']));

  const grid = document.querySelector('.usecase-grid');
  const cards = itemsByType(block, 'application_card');
  if (grid && cards.length) {
    grid.innerHTML = cards.map((item) => {
      const fields = itemFields(item);
      return `<div class="usecase-card"><div class="usecase-icon">${usecaseIcon}</div><div class="usecase-title">${escapeHtml(getFieldValue(fields, ['title']))}</div><div class="usecase-desc">${escapeHtml(getFieldValue(fields, ['text', 'description']))}</div></div>`;
    }).join('');
  }
};

const renderDownloads = (block) => {
  const fields = block?.fields || [];
  const documents = itemsByType(block, 'document');
  const section = document.getElementById('downloads');
  if (!section) return;

  section.innerHTML = `
    <div class="container">
      <div class="section-header">
        <span class="section-label">${escapeHtml(getFieldValue(fields, ['badge_text', 'section_label']))}</span>
        <h2 class="section-heading" id="dl-heading">${escapeHtml(getFieldValue(fields, ['title']))}</h2>
        <p class="section-sub" id="dl-sub">${escapeHtml(getFieldValue(fields, ['subtitle', 'description']))}</p>
      </div>
      <div class="downloads-grid">
        ${documents.map((item) => {
          const fields = itemFields(item);
          return `<a class="download-card" href="${safeUrl(getFieldValue(fields, ['file_url'], '#'))}">
            <div class="download-icon">${docIcon}</div>
            <div class="download-body">
              <div class="download-meta">
                <div class="download-title">${escapeHtml(getFieldValue(fields, ['title']))}</div>
                <div class="download-size-wrap"><span class="download-filetype">${escapeHtml(getFieldValue(fields, ['file_type']))}</span><span class="download-size">${escapeHtml(getFieldValue(fields, ['file_size']))}</span></div>
              </div>
              <div class="download-desc">${escapeHtml(getFieldValue(fields, ['description', 'text']))}</div>
            </div>
            ${arrowIcon}
          </a>`;
        }).join('')}
      </div>
      <div class="download-bundle">
        <div><div class="download-title">${escapeHtml(getFieldValue(fields, ['package_title']))}</div><div class="download-desc">${escapeHtml(getFieldValue(fields, ['package_text']))}</div></div>
        <a class="btn-bundle" href="${safeUrl(getFieldValue(fields, ['package_button_url'], '#'))}">${escapeHtml(getFieldValue(fields, ['package_button_text']))}</a>
      </div>
    </div>
  `;
};

const renderQuote = (block) => {
  const fields = block?.fields || [];
  const fieldNameAliases = {
    first_name: 'name',
    full_name: 'name',
    product: 'model',
    estimated_quantity: 'quantity',
    additional_requirements: 'message',
    notes: 'message',
  };

  setTextContent('#quote .section-label', getFieldValue(fields, ['badge_text', 'section_label']));
  setTextContent('#quote-heading', getFieldValue(fields, ['title', 'heading']));
  setTextContent('#quote-sub', getFieldValue(fields, ['subtitle', 'description']));
  setTextContent('#submit-label', getFieldValue(fields, ['button_text']));
  setTextContent('.form-legal', getFieldValue(fields, ['privacy_text']));

  itemsByType(block, 'form_field').forEach((item) => {
    const fields = itemFields(item);
    const name = getFieldValue(fields, ['name']);
    const inputName = fieldNameAliases[name] || name;
    const input = document.querySelector(`[name="${inputName}"]`);
    if (!input) return;

    const label = input.closest('.form-group')?.querySelector('.form-label');
    const labelText = getFieldValue(fields, ['label']);
    if (label && labelText) label.innerHTML = escapeHtml(labelText);
    input.placeholder = getFieldValue(fields, ['placeholder'], input.placeholder);
    input.type = getFieldValue(fields, ['type'], input.type) === 'textarea' ? input.type : getFieldValue(fields, ['type'], input.type);
  });
};

const renderContact = (block) => {
  const fields = block?.fields || [];
  setTextContent('#contact .section-label', getFieldValue(fields, ['badge_text', 'section_label']));
  setTextContent('#contact-heading', getFieldValue(fields, ['title', 'heading']));
  setTextContent('#contact-sub', getFieldValue(fields, ['subtitle', 'description']));

  const contactList = document.querySelector('.contact-info-list');
  const contactItems = itemsByType(block, 'contact_info');
  if (contactList && contactItems.length) {
    contactList.innerHTML = contactItems.map((item) => {
      const fields = itemFields(item);
      return `<div class="contact-info-item"><div class="contact-icon">${usecaseIcon}</div><div><div class="contact-item-label">${escapeHtml(getFieldValue(fields, ['label']))}</div><div class="contact-item-value">${escapeHtml(getFieldValue(fields, ['value', 'text']))}</div></div></div>`;
    }).join('');
  }

  const industryGrid = document.querySelector('.industries-grid');
  const industries = itemsByType(block, 'industry');
  if (industryGrid && industries.length) {
    industryGrid.innerHTML = industries.map(item => `<div class="industry-item">${chevronIcon}${escapeHtml(getFieldValue(itemFields(item), ['text', 'title']))}</div>`).join('');
  }

  const certList = document.querySelector('.cert-list');
  const certs = itemsByType(block, 'certification');
  if (certList && certs.length) {
    certList.innerHTML = certs.map(item => `<span class="cert-badge">${escapeHtml(getFieldValue(itemFields(item), ['text', 'title']))}</span>`).join('');
  }
};

const renderFooter = (block) => {
  const fields = block?.fields || [];
  const footer = document.getElementById('footer');
  if (!footer) return;

  const columns = itemsByType(block, 'footer_column');
  const links = itemsByType(block, 'footer_link');
  const columnHtml = columns.map((column) => {
    const title = getFieldValue(itemFields(column), ['title']);
    const columnLinks = links.filter(link => Math.floor((link.sortOrder ?? 0) / 10) === (column.sortOrder ?? 0));
    return `<div class="footer-col"><div class="footer-col-title">${escapeHtml(title)}</div><ul>${columnLinks.map((link) => {
      const fields = itemFields(link);
      return `<li><a href="${safeUrl(getFieldValue(fields, ['url'], '#'))}">${escapeHtml(getFieldValue(fields, ['text', 'title']))}</a></li>`;
    }).join('')}</ul></div>`;
  }).join('');

  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="nav-logo-badge" style="display:inline-block"><span>${escapeHtml(getFieldValue(fields, ['logo_text'], 'PANASONIC'))}</span></div>
          <p class="footer-brand-text">${escapeHtml(getFieldValue(fields, ['description']))}</p>
        </div>
        ${columnHtml}
      </div>
      <div class="footer-bottom">
        <span class="footer-copy">${escapeHtml(getFieldValue(fields, ['copyright_text', 'copyright']))}</span>
        <span class="footer-note">${escapeHtml(getFieldValue(fields, ['disclaimer']))}</span>
      </div>
    </div>
  `;
  footer.classList.add('footer-loaded');
};

const applyCmsContent = (website) => {
  renderNavbar(getBlockByName(website, ['navbar_block']));
  renderHero(getBlockByName(website, ['hero_block']));
  renderSpecs(getBlockByName(website, ['specifications_block']));
  renderUseCases(getBlockByName(website, ['werksectoren_block']));
  renderDownloads(getBlockByName(website, ['downloads_block']));
  renderQuote(getBlockByName(website, ['quote_form_block']));
  renderContact(getBlockByName(website, ['contact_block']));
};

const loadCmsContent = async () => {
  try {
    const response = await fetch(cmsApiUrl, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache',
      },
    });

    if (!response.ok) {
      throw new Error(`CMS request failed with status ${response.status}`);
    }

    const payload = await response.json();
    applyCmsContent(payload.website || payload);

    const footerResponse = await fetch(sharedFooterApiUrl, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache',
      },
    });
    if (footerResponse.ok) {
      const footerPayload = await footerResponse.json();
      renderFooter(footerPayload.footer || getBlockByName(footerPayload.website, ['footer_block']));
    }
  } catch (error) {
    console.warn('Failed to load CMS content for the Rafi page.', error);
  }
};

function renderSpecTable() {
  const table = document.getElementById('spec-table');
  if (!table) return;
  const rows = specData[activeTab] || [];
  table.innerHTML = rows.map(row =>
    `<div class="spec-row"><div class="spec-row-label">${escapeHtml(row.label)}</div><div class="spec-row-value">${escapeHtml(row.value)}</div></div>`
  ).join('');
}

function setTab(tab, button) {
  activeTab = tab;
  document.querySelectorAll('.spec-tab').forEach(tabButton => tabButton.classList.remove('active'));
  button.classList.add('active');
  renderSpecTable();
}

function setHeroImg(index, element) {
  const mainImage = document.getElementById('hero-main-img');
  if (mainImage && heroImages[index]) {
    mainImage.src = heroImages[index];
  }
  document.querySelectorAll('.hero-thumb').forEach(thumb => thumb.classList.remove('active'));
  element.classList.add('active');
}

function syncHeroThumbs() {
  const mainImage = document.getElementById('hero-main-img');
  if (mainImage && heroImages[0]) {
    mainImage.src = heroImages[0];
    mainImage.onerror = () => {
      mainImage.onerror = null;
      mainImage.src = localHeroImages[0];
    };
  }

  document.querySelectorAll('.hero-thumb').forEach((thumb, index) => {
    const image = thumb.querySelector('img');
    if (image) {
      image.src = heroImages[index] || localHeroImages[index] || localHeroImages[0];
      image.onerror = () => {
        image.onerror = null;
        image.src = localHeroImages[index] || localHeroImages[0];
      };
    }
    thumb.classList.toggle('active', index === 0);
  });
}

function closeMobile() {
  document.getElementById('mobile-menu')?.classList.remove('open');
}

document.getElementById('hamburger')?.addEventListener('click', () => {
  document.getElementById('mobile-menu')?.classList.toggle('open');
});

document.getElementById('specs-dl-btn')?.addEventListener('click', function handleSpecDownload(event) {
  const href = this.getAttribute('href');
  if (!href || href === '#') {
    event.preventDefault();
  }
});

window.setTab = setTab;
window.setHeroImg = setHeroImg;
window.closeMobile = closeMobile;

applyLanguageChrome();
renderSpecTable();
void loadCmsContent();
