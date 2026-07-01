(() => {
  const config = window.APP_CONFIG || {};
  const apiBase = String(config.apiBase || '').replace(/\/$/, '');
  const websiteId = config.websiteId;
  const websiteDomain = config.websiteDomain;
  const selectedLanguage = websiteDomain === 'toughbook-56-english.nl' ? 'en' : 'nl';
  const byDomainEndpoint = apiBase && websiteDomain
    ? `${apiBase}/api/content/by-domain/${encodeURIComponent(websiteDomain)}`
    : '';
  const byIdEndpoint = apiBase && websiteId
    ? `${apiBase}/api/content/websites/${websiteId}`
    : '';
  const endpoints = [byDomainEndpoint, byIdEndpoint].filter(Boolean);
  const sharedFooterEndpoint = apiBase ? `${apiBase}/api/content/by-domain/shared-footer` : '';

  const elements = {
    loading: document.getElementById('loading'),
    navbar: document.getElementById('navbar'),
    hero: document.getElementById('hero'),
    features: document.getElementById('features'),
    specs: document.getElementById('specifications'),
    sectors: document.getElementById('sectors'),
    contact: document.getElementById('contact'),
    footer: document.getElementById('footer'),
  };

  const escapeHtml = (value) => {
    const text = String(value ?? '');
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  };

  const safeUrl = (value) => {
    const raw = String(value || '').trim();
    if (!raw) {
      return '#';
    }
    if (raw.startsWith('/images/')) {
      return `assets/Images/${raw.split('/').pop()}`;
    }
    if (raw.startsWith('#') || raw.startsWith('/') || raw.startsWith('./') || raw.startsWith('../')) {
      return raw;
    }
    if (raw.startsWith('//')) {
      return '#';
    }
    if (raw.startsWith('mailto:') || raw.startsWith('tel:')) {
      return raw;
    }
    if (!raw.includes(':')) {
      return raw;
    }
    try {
      const url = new URL(raw);
      if (url.protocol === 'http:' || url.protocol === 'https:') {
        return url.href;
      }
    }
    catch {
      return '#';
    }
    return '#';
  };

  const mapFields = (fields = []) => fields.reduce((acc, field) => {
    acc[field.fieldName] = field.fieldValue ?? '';
    return acc;
  }, {});

  const mapItems = (items = []) => {
    return items
      .map((item) => {
        const fieldMap = item.fields.reduce((acc, field) => {
          acc[field.fieldName] = field.fieldValue ?? '';
          return acc;
        }, {});

        return {
          ...fieldMap,
          itemType: item.itemType,
          sortOrder: item.sortOrder,
        };
      })
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
  };

  const pick = (fields, key, fallback = '') => {
    const value = fields[key];
    if (value === undefined || value === null || String(value).trim() === '') {
      return fallback;
    }
    return String(value);
  };

  const pickLocalized = (fields, key, fallback = '') => pick(fields, `${key}_${selectedLanguage}`, pick(fields, key, fallback));

  const iconMap = {
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 2l7 4v5c0 5-3.5 9.5-7 10-3.5-.5-7-5-7-10V6l7-4z"/></svg>',
    droplet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 2s7 7 7 12a7 7 0 11-14 0c0-5 7-12 7-12z"/></svg>',
    drop: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 2s7 7 7 12a7 7 0 11-14 0c0-5 7-12 7-12z"/></svg>',
    expand: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 3h6v6M9 21H3v-6M21 9V3h-6M3 15v6h6"/></svg>',
    shock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10"/></svg>',
    battery: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="6" width="16" height="12" rx="2"/><path d="M8 6V4h8v2"/></svg>',
    chip: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="5" width="14" height="14" rx="2"/><path d="M9 9h6v6H9z"/></svg>',
    bolt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/></svg>',
    default: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M8 12l2 2 4-4"/></svg>',
  };

  const buttonIcons = {
    'arrow-right': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 5l7 7-7 7"/></svg>',
    'file-text': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path stroke-linecap="round" stroke-linejoin="round" d="M14 2v6h6"/><path stroke-linecap="round" stroke-linejoin="round" d="M16 13H8"/><path stroke-linecap="round" stroke-linejoin="round" d="M16 17H8"/></svg>',
  };

  const showSection = (element) => {
    if (!element) {
      return;
    }
    element.hidden = false;
  };

  const renderNavbar = (fields, items) => {
    if (!elements.navbar) return;
    const links = items
      .filter((item) => item.itemType === 'nav_link')
      .map((item) => `<li><a href="${safeUrl(item.url)}">${escapeHtml(item.text || item.title || '')}</a></li>`)
      .join('');

    const buttonText = pick(fields, 'button_text');
    const buttonUrl = safeUrl(pick(fields, 'button_url', '#'));
    const brandText = pick(fields, 'logo_text');
    const mark = pick(fields, 'logo_mark');

    elements.navbar.innerHTML = `
      <div class="nav-inner">
        <a class="nav-brand" href="#hero">
          ${mark ? `<span class="nav-mark">${escapeHtml(mark)}</span>` : ''}
          ${brandText ? `<span>${escapeHtml(brandText)}</span>` : ''}
        </a>
        <ul class="nav-links">${links}</ul>
        <div class="nav-actions">
          ${buttonText ? `<a class="btn btn-primary" href="${buttonUrl}">${escapeHtml(buttonText)}</a>` : ''}
          <button class="nav-toggle" type="button" data-nav-toggle>Menu</button>
        </div>
      </div>
    `;

    showSection(elements.navbar);

    const toggle = elements.navbar.querySelector('[data-nav-toggle]');
    const navLinksEl = elements.navbar.querySelector('.nav-links');
    if (toggle && navLinksEl) {
      toggle.addEventListener('click', () => {
        navLinksEl.classList.toggle('is-open');
      });
    }

    const onScroll = () => {
      elements.navbar.classList.toggle('is-scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  };

  const renderHero = (fields) => {
    const eyebrow = pick(fields, 'text_above_title');
    const title = pick(fields, 'title');
    const subtitle = pick(fields, 'subtitle', pick(fields, 'description'));
    const buttonText = pick(fields, 'button_text');
    const buttonUrl = safeUrl(pick(fields, 'button_url', '#features'));
    const buttonIconKey = pick(fields, 'button_icon').toLowerCase();
    const buttonIcon = buttonIcons[buttonIconKey] || buttonIcons['arrow-right'];

    const heroImage = pick(fields, 'image_url', pick(fields, 'hero_image_url', pick(fields, 'image')));
    const heroImageAlt = pick(fields, 'image_alt', 'Hero image');

    elements.hero.innerHTML = `
      <div class="section-inner hero-grid">
        <div class="hero-copy reveal">
          ${eyebrow ? `<span class="eyebrow">${escapeHtml(eyebrow)}</span>` : ''}
          ${title ? `<h1 class="hero-title">${escapeHtml(title)}</h1>` : ''}
          ${subtitle ? `<p class="hero-text">${escapeHtml(subtitle)}</p>` : ''}
          ${buttonText ? `
            <div class="hero-actions">
              <a class="btn btn-primary" href="${buttonUrl}">
                ${buttonIcon ? `<span class="btn-icon">${buttonIcon}</span>` : ''}
                <span>${escapeHtml(buttonText)}</span>
              </a>
            </div>
          ` : ''}
        </div>
        <div class="hero-visual reveal">
          <div class="hero-card">
            ${heroImage ? `<img src="${safeUrl(heroImage)}" alt="${escapeHtml(heroImageAlt)}" />` : '<div class="hero-image-placeholder" aria-hidden="true"></div>'}
          </div>
        </div>
      </div>
    `;

    showSection(elements.hero);
  };

  const renderFeatures = (fields, items) => {
    const title = pick(fields, 'title');
    const subtitle = pick(fields, 'subtitle');

    const cards = items.map((item) => {
      const iconKey = String(item.icon || 'default').toLowerCase().trim();
      const icon = iconMap[iconKey] || iconMap.default;
      const text = item.text || item.description || '';

      return `
        <article class="feature-card reveal">
          <div class="feature-icon">${icon}</div>
          <h3 class="feature-title">${escapeHtml(item.title || '')}</h3>
          <p class="feature-text">${escapeHtml(text)}</p>
        </article>
      `;
    }).join('');

    elements.features.innerHTML = `
      <div class="section-inner">
        <div class="reveal">
          ${title ? `<h2 class="section-title">${escapeHtml(title)}</h2>` : ''}
          ${subtitle ? `<p class="section-desc">${escapeHtml(subtitle)}</p>` : ''}
        </div>
        <div class="features-grid">${cards}</div>
      </div>
    `;

    showSection(elements.features);
  };

  const buildSpecRows = (items) => {
    const rows = [];

    items.forEach((item) => {
      if (item.label || item.value) {
        rows.push({ label: item.label, value: item.value });
      }

      if (item.title && item.description) {
        rows.push({ label: item.title, value: item.description });
      }

      ['1', '2', '3'].forEach((index) => {
        const labelKey = `row_${index}_label`;
        const valueKey = `row_${index}_value`;
        if (item[labelKey] || item[valueKey]) {
          rows.push({ label: item[labelKey], value: item[valueKey] });
        }
      });
    });

    return rows.filter((row) => row.label || row.value);
  };

  const renderSpecifications = (fields, items) => {
    const title = pick(fields, 'title');
    const subtitle = pick(fields, 'subtitle');
    const buttonText = pick(fields, 'button_text');
    const rawButtonUrl = pick(fields, 'button_url');
    const buttonUrl = safeUrl(rawButtonUrl || '#');
    const isPdfDownload = !!rawButtonUrl && rawButtonUrl.toLowerCase().endsWith('.pdf');
    const buttonIconKey = pick(fields, 'button_icon').toLowerCase();
    const buttonIcon = buttonIcons[buttonIconKey] || buttonIcons['file-text'];

    const badges = items
      .filter((item) => item.itemType === 'badge')
      .map((item) => item.text || item.title || '')
      .filter(Boolean);

    const rows = buildSpecRows(items.filter((item) => item.itemType === 'spec'));

    elements.specs.innerHTML = `
      <div class="section-inner">
        <div class="reveal">
          ${title ? `<h2 class="section-title">${escapeHtml(title)}</h2>` : ''}
        </div>
        <div class="specs-grid">
          <div class="specs-card reveal">
            ${subtitle ? `<p class="section-desc">${escapeHtml(subtitle)}</p>` : ''}
            ${badges.length ? `<div class="specs-badges">${badges.map((tag) => `<span class="specs-badge">${escapeHtml(tag)}</span>`).join('')}</div>` : ''}
          </div>
          <div class="specs-card specs-panel reveal">
            <div class="specs-table">
              ${rows.map((row) => `
                <div class="spec-row">
                  <span class="spec-label">${escapeHtml(row.label || '')}</span>
                  <span class="spec-value">${escapeHtml(row.value || '')}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
        ${buttonText ? `
          <div class="specs-actions reveal">
            <a class="btn btn-primary" href="${buttonUrl}"${isPdfDownload ? ' download' : ''}>
              ${buttonIcon ? `<span class="btn-icon">${buttonIcon}</span>` : ''}
              <span>${escapeHtml(buttonText)}</span>
            </a>
          </div>
        ` : ''}
      </div>
    `;

    showSection(elements.specs);
  };

  const renderSectors = (fields, items) => {
    const title = pick(fields, 'title');

    const cards = items.map((item) => {
      const imageUrl = pick(item, 'image', pick(item, 'image_url', pick(item, 'image_src')));
      const subtitle = item.subtitle || item.text || '';

      return `
        <article class="sector-card reveal">
          ${imageUrl ? `<img src="${safeUrl(imageUrl)}" alt="${escapeHtml(item.title || '')}" />` : ''}
          <div class="sector-overlay">
            <h3 class="sector-title">${escapeHtml(item.title || '')}</h3>
            ${subtitle ? `<p class="sector-text">${escapeHtml(subtitle)}</p>` : ''}
          </div>
        </article>
      `;
    }).join('');

    elements.sectors.innerHTML = `
      <div class="section-inner">
        <div class="reveal">
          ${title ? `<h2 class="section-title">${escapeHtml(title)}</h2>` : ''}
        </div>
        <div class="sectors-grid">${cards}</div>
      </div>
    `;

    showSection(elements.sectors);
  };

  const renderContactForm = (fields) => {
    const title = pick(fields, 'contact_title');
    const text = pick(fields, 'contact_text');
    const phone = pick(fields, 'contact_phone');
    const email = pick(fields, 'contact_email');
    const formTitle = pick(fields, 'form_title');
    const buttonText = pick(fields, 'form_button_text', pick(fields, 'button_text'));

    const formFields = [
      {
        id: 'contact-name',
        type: 'text',
        span: 1,
        label: pick(fields, 'form_name_label'),
        placeholder: pick(fields, 'form_name_placeholder'),
      },
      {
        id: 'contact-company',
        type: 'text',
        span: 1,
        label: pick(fields, 'form_company_label'),
        placeholder: pick(fields, 'form_company_placeholder'),
      },
      {
        id: 'contact-email',
        type: 'email',
        span: 1,
        label: pick(fields, 'form_email_label'),
        placeholder: pick(fields, 'form_email_placeholder'),
      },
      {
        id: 'contact-phone',
        type: 'tel',
        span: 1,
        label: pick(fields, 'form_phone_label', 'Phone'),
        placeholder: pick(fields, 'form_phone_placeholder', '+31 6 1234 5678'),
      },
      {
        id: 'contact-model',
        type: 'text',
        span: 1,
        label: pick(fields, 'form_model_label', 'Model'),
        placeholder: pick(fields, 'form_model_placeholder', 'Toughbook 56'),
        value: pick(fields, 'model_name', 'Toughbook 56'),
        required: true,
      },
      {
        id: 'contact-quantity',
        type: 'number',
        span: 1,
        label: pick(fields, 'form_quantity_label', 'Quantity'),
        placeholder: pick(fields, 'form_quantity_placeholder', 'For example 10'),
        min: '1',
        required: true,
      },
      {
        id: 'contact-message',
        type: 'textarea',
        span: 2,
        label: pick(fields, 'form_message_label'),
        placeholder: pick(fields, 'form_message_placeholder'),
      },
    ];

    const fieldMarkup = formFields.map((field) => {
      const spanClass = field.span === 2 ? ' span-2' : '';
      if (field.type === 'textarea') {
        return `
            <div class="input-row${spanClass}">
              ${field.label ? `<label class="input-label" for="${field.id}">${escapeHtml(field.label)}</label>` : ''}
              <textarea id="${field.id}" class="input-control" rows="4" placeholder="${escapeHtml(field.placeholder || '')}"></textarea>
            </div>
          `;
      }

      return `
          <div class="input-row${spanClass}">
            ${field.label ? `<label class="input-label" for="${field.id}">${escapeHtml(field.label)}</label>` : ''}
            <input id="${field.id}" class="input-control" type="${escapeHtml(field.type)}" placeholder="${escapeHtml(field.placeholder || '')}"${field.value ? ` value="${escapeHtml(field.value)}"` : ''}${field.min ? ` min="${escapeHtml(field.min)}"` : ''}${field.required ? ' required' : ''} />
          </div>
        `;
    }).join('');

    elements.contact.innerHTML = `
      <div class="section-inner contact-grid">
        <div class="contact-info reveal">
          ${title ? `<h2 class="section-title">${escapeHtml(title)}</h2>` : ''}
          ${text ? `<p class="section-desc">${escapeHtml(text)}</p>` : ''}
          ${(phone || email) ? `
          <div class="contact-list">
            ${phone ? `<div class="contact-item"><a class="contact-link" href="tel:${escapeHtml(phone.replace(/\s/g, ''))}">${escapeHtml(phone)}</a></div>` : ''}
            ${email ? `<div class="contact-item"><a class="contact-link" href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></div>` : ''}
          </div>` : ''}
        </div>
        <div class="contact-form reveal">
          ${formTitle ? `<div class="form-title">${escapeHtml(formTitle)}</div>` : ''}
          <div class="form-grid form-grid--two">
            ${fieldMarkup}
          </div>
          ${buttonText ? `<button class="btn btn-primary" type="button">${escapeHtml(buttonText)}</button>` : ''}
        </div>
      </div>
    `;

    showSection(elements.contact);
  };

  const renderContactBlock = (fields, items) => {
    renderSectors(fields, items);
    renderContactForm(fields);
  };

  const renderDownloads = (fields, items) => {
    if (!elements.downloads) return;
    const title = pick(fields, 'title');
    const subtitle = pick(fields, 'subtitle');

    const cards = items.map((item) => {
      const imageUrl = pick(item, 'image_url', pick(item, 'image', pick(item, 'background_url')));
      const buttonText = pick(item, 'button_text');
      const buttonUrl = safeUrl(pick(item, 'url', '#'));
      const tag = pick(item, 'tag', pick(item, 'kicker'));

      return `
        <article class="download-card reveal">
          ${imageUrl ? `<img src="${safeUrl(imageUrl)}" alt="" />` : ''}
          <div class="download-card-content">
            ${tag ? `<div class="download-chip">${escapeHtml(tag)}</div>` : ''}
            <h3 class="download-title">${escapeHtml(item.title || '')}</h3>
            <p class="download-text">${escapeHtml(item.description || '')}</p>
            ${buttonText ? `<a class="btn btn-primary" href="${buttonUrl}">${escapeHtml(buttonText)}</a>` : ''}
          </div>
        </article>
      `;
    }).join('');

    elements.downloads.innerHTML = `
      <div class="section-inner">
        <div class="reveal">
          ${title ? `<h2 class="section-title">${escapeHtml(title)}</h2>` : ''}
          ${subtitle ? `<p class="section-desc">${escapeHtml(subtitle)}</p>` : ''}
        </div>
        <div class="downloads-grid">${cards}</div>
      </div>
    `;

    showSection(elements.downloads);
  };

  const renderCta = (fields, items) => {
    const title = pick(fields, 'title');
    const subtitle = pick(fields, 'subtitle', pick(fields, 'text'));
    const badge = pick(fields, 'badge_text');
    const contactPhone = pick(fields, 'contact_phone');
    const contactEmail = pick(fields, 'contact_email');
    const contactLocation = pick(fields, 'contact_location');

    const benefitItems = items.filter((item) => !String(item.itemType || '').includes('form'));

    const contactInfo = elements.contact && elements.contact.querySelector('.contact-info');
    if (!contactInfo) {
      return;
    }

    // Only patch if contact_block left no title in .contact-info
    if (contactInfo.querySelector('.section-title')) {
      return;
    }

    contactInfo.innerHTML = `
      ${badge ? `<span class="eyebrow">${escapeHtml(badge)}</span>` : ''}
      ${title ? `<h2 class="section-title">${escapeHtml(title)}</h2>` : ''}
      ${subtitle ? `<p class="section-desc">${escapeHtml(subtitle)}</p>` : ''}
      ${(contactPhone || contactEmail || contactLocation) ? `
        <div class="contact-list">
          ${contactPhone ? `<div class="contact-item">${escapeHtml(contactPhone)}</div>` : ''}
          ${contactEmail ? `<div class="contact-item"><a href="mailto:${escapeHtml(contactEmail)}">${escapeHtml(contactEmail)}</a></div>` : ''}
          ${contactLocation ? `<div class="contact-item">${escapeHtml(contactLocation)}</div>` : ''}
        </div>
      ` : ''}
      ${benefitItems.length ? `
        <div class="contact-list">
          ${benefitItems.map((item) => {
            const label = escapeHtml(item.title || item.label || '');
            const body = item.description || item.value || '';
            const href = item.href || '';
            const bodyHtml = href && body
              ? `<a href="${safeUrl(href)}">${escapeHtml(body)}</a>`
              : `<span>${escapeHtml(body)}</span>`;
            return `
              <div class="contact-item">
                ${label ? `<span class="cta-item-label">${label}</span>` : ''}
                ${body ? `<span class="cta-item-value">${bodyHtml}</span>` : ''}
              </div>`;
          }).join('')}
        </div>
      ` : ''}
    `;
  };

  const renderFooter = (fields, items) => {
    const brandText = pickLocalized(fields, 'logo_text');
    const description = pickLocalized(fields, 'description');
    // CMS uses copyright_text; fall back to copyright for older setups
    const copyright = pickLocalized(fields, 'copyright_text', pickLocalized(fields, 'copyright'));
    const disclaimer = pickLocalized(fields, 'disclaimer');
    const sharedColumns = items.filter(item => item.itemType === 'footer_column');
    const sharedLinks = items.filter(item => item.itemType === 'footer_link');

    if (sharedColumns.length) {
      const columnMarkup = sharedColumns.map((column) => {
        const title = pickLocalized(column, 'title');
        const links = sharedLinks
          .filter(link => Math.floor((link.sortOrder || 0) / 10) === (column.sortOrder || 0))
          .map(link => `<li><a href="${safeUrl(pickLocalized(link, 'url', '#'))}">${escapeHtml(pickLocalized(link, 'text', pickLocalized(link, 'title')))}</a></li>`)
          .join('');

        return `
          <div>
            <div class="footer-col-title">${escapeHtml(title)}</div>
            <ul class="footer-links">${links}</ul>
          </div>
        `;
      }).join('');

      elements.footer.innerHTML = `
        <div class="footer-grid">
          <div>
            ${brandText ? `<div class="footer-brand">${escapeHtml(brandText)}</div>` : ''}
            ${description ? `<p class="footer-text">${escapeHtml(description)}</p>` : ''}
          </div>
          ${columnMarkup}
        </div>
        <div class="footer-bottom">
          ${copyright ? `<span>${escapeHtml(copyright)}</span>` : ''}
          ${disclaimer ? `<span>${escapeHtml(disclaimer)}</span>` : ''}
        </div>
      `;

      showSection(elements.footer);
      return;
    }

    const navLinks = items
      .filter((item) => item.itemType === 'nav_link')
      .map((item) => `<li><a href="${safeUrl(item.url)}">${escapeHtml(item.text || item.title || '')}</a></li>`)
      .join('');

    const productLinks = items
      .filter((item) => item.itemType === 'product_link')
      .map((item) => `<li><a href="${safeUrl(item.url)}">${escapeHtml(item.text || item.title || '')}</a></li>`)
      .join('');

    // Support both new CMS field names (privacy_text / terms_text) and old ones
    const legalLinksFromFields = [
      {
        label: pick(fields, 'privacy_text', pick(fields, 'privacy_policy_label')),
        url: pick(fields, 'privacy_url', pick(fields, 'privacy_policy_url')),
      },
      {
        label: pick(fields, 'terms_text', pick(fields, 'terms_label')),
        url: pick(fields, 'terms_url'),
      },
      {
        label: pick(fields, 'cookies_text', pick(fields, 'cookies_label')),
        url: pick(fields, 'cookies_url'),
      },
    ].filter((link) => link.url && link.label);

    // Fallback: footer_link items used as bottom-bar links when no field-based links exist
    const legalLinksFromItems = !legalLinksFromFields.length
      ? items
        .filter((item) => item.itemType === 'footer_link')
        .map((item) => ({ label: item.text || item.title || '', url: item.url || '' }))
        .filter((link) => link.url && link.label)
      : [];

    const legalLinks = legalLinksFromFields.length ? legalLinksFromFields : legalLinksFromItems;

    // CMS-driven titles only — no fallback strings; omit title element entirely if empty
    const colNav     = pick(fields, 'col_nav_title');
    const colProd    = pick(fields, 'col_products_title');
    const colContact = pick(fields, 'col_contact_title');

    const phone    = pick(fields, 'contact_phone');
    const email    = pick(fields, 'contact_email');
    const location = pick(fields, 'contact_location');

    const hasColumns = navLinks || productLinks || phone || email || location;

    elements.footer.innerHTML = `
      ${hasColumns ? `
      <div class="footer-grid">
        <div>
          ${brandText ? `<div class="footer-brand">${escapeHtml(brandText)}</div>` : ''}
          ${description ? `<p class="footer-text">${escapeHtml(description)}</p>` : ''}
        </div>
        ${navLinks ? `
        <div>
          ${colNav ? `<div class="footer-col-title">${escapeHtml(colNav)}</div>` : ''}
          <ul class="footer-links">${navLinks}</ul>
        </div>` : ''}
        ${productLinks ? `
        <div>
          ${colProd ? `<div class="footer-col-title">${escapeHtml(colProd)}</div>` : ''}
          <ul class="footer-links">${productLinks}</ul>
        </div>` : ''}
        ${(phone || email || location) ? `
        <div>
          ${colContact ? `<div class="footer-col-title">${escapeHtml(colContact)}</div>` : ''}
          <ul class="footer-links">
            ${phone    ? `<li><a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></li>` : ''}
            ${email    ? `<li><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></li>` : ''}
            ${location ? `<li>${escapeHtml(location)}</li>` : ''}
          </ul>
        </div>` : ''}
      </div>` : ''}
      <div class="footer-bottom">
        ${!hasColumns && brandText ? `<span class="footer-bottom-brand">${escapeHtml(brandText)}</span>` : ''}
        ${copyright ? `<span>${escapeHtml(copyright)}</span>` : ''}
        ${legalLinks.length ? `
        <span>
          ${legalLinks.map((link) => `<a href="${safeUrl(link.url)}">${escapeHtml(link.label)}</a>`).join('  ')}
        </span>` : ''}
      </div>
    `;

    showSection(elements.footer);
  };

  const renderers = {
    navbar_block: renderNavbar,
    hero_block: renderHero,
    image_block: renderFeatures,
    text_block: renderSpecifications,
    contact_block: renderContactBlock,
    cta_block: renderCta,
  };

  const startReveal = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        element.classList.add('is-visible');
      } else {
        observer.observe(element);
      }
    });
  };

  const showError = (message) => {
    if (!elements.loading) {
      return;
    }
    elements.loading.innerHTML = `<p class="loading-text">${escapeHtml(message)}</p>`;
  };

  const init = async () => {
    try {
      if (!endpoints.length) {
        throw new Error('Missing CMS configuration.');
      }

      let payload = null;
      let lastStatus = 0;

      for (const url of endpoints) {
        const response = await fetch(url, {
          credentials: 'include',
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
          },
        });
        if (response.ok) {
          payload = await response.json();
          break;
        }
        lastStatus = response.status;
      }

      if (!payload) {
        throw new Error(`Request failed: ${lastStatus || 'unknown'}`);
      }
      const blocks = (payload.website?.blocks || []).slice().sort((a, b) => a.sortOrder - b.sortOrder);

      blocks.forEach((block) => {
        const fields = mapFields(block.fields || []);
        const items = mapItems(block.items || []);
        const renderer = renderers[block.blockTypeName];
        if (renderer) {
          renderer(fields, items);
        }
      });

      if (sharedFooterEndpoint) {
        const footerResponse = await fetch(sharedFooterEndpoint, {
          credentials: 'include',
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
          },
        });

        if (footerResponse.ok) {
          const footerPayload = await footerResponse.json();
          const sharedFooterBlock = footerPayload.footer || footerPayload.website?.blocks?.find(block => block.blockTypeName === 'footer_block');
          if (sharedFooterBlock) {
            renderFooter(mapFields(sharedFooterBlock.fields || []), mapItems(sharedFooterBlock.items || []));
          }
        }
      }

      if (elements.loading) {
        elements.loading.style.display = 'none';
      }
      startReveal();
      initContactForm();
    }
    catch (error) {
      console.error('Failed to load website content', error);
      showError('Failed to load content. Check backend connection.');
    }
  };

  const initContactForm = () => {
    const form = elements.contact;
    if (!form) return;

    const btn = form.querySelector('.contact-form .btn');
    if (!btn) return;

    let statusEl = form.querySelector('.form-status');
    if (!statusEl) {
      statusEl = document.createElement('p');
      statusEl.className = 'form-status';
      btn.after(statusEl);
    }

    btn.addEventListener('click', async () => {
      const name    = form.querySelector('#contact-name')?.value?.trim() || '';
      const company = form.querySelector('#contact-company')?.value?.trim() || '';
      const email   = form.querySelector('#contact-email')?.value?.trim() || '';
      const phone   = form.querySelector('#contact-phone')?.value?.trim() || '';
      const model   = form.querySelector('#contact-model')?.value?.trim() || '';
      const quantity = form.querySelector('#contact-quantity')?.value?.trim() || '';
      const message = form.querySelector('#contact-message')?.value?.trim() || '';

      if (!name || !email || !model || !quantity || !message) {
        statusEl.textContent = 'Please fill in your name, email, model, quantity and message.';
        statusEl.className = 'form-status form-status--error';
        return;
      }

      btn.disabled = true;
      statusEl.textContent = 'Sending...';
      statusEl.className = 'form-status form-status--info';

      try {
        const res = await fetch(`${apiBase}/api/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ name, company, email, phone, model, quantity, message }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Server error');
        statusEl.textContent = data.message || 'Sent!';
        statusEl.className = 'form-status form-status--success';
        form.querySelectorAll('.input-control').forEach((el) => { el.value = ''; });
      }
      catch (err) {
        statusEl.textContent = 'Sending failed. Please try again later.';
        statusEl.className = 'form-status form-status--error';
      }
      finally {
        btn.disabled = false;
      }
    });
  };

  init();
})();
