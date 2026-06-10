(() => {
  const config = window.APP_CONFIG || {};
  const apiBase = String(config.apiBase || '').replace(/\/$/, '');
  const websiteId = config.websiteId;
  const websiteDomain = config.websiteDomain;
  const byDomainEndpoint = apiBase && websiteDomain
    ? `${apiBase}/api/content/by-domain/${encodeURIComponent(websiteDomain)}`
    : '';
  const byIdEndpoint = apiBase && websiteId
    ? `${apiBase}/api/content/websites/${websiteId}`
    : '';
  const endpoints = [byDomainEndpoint, byIdEndpoint].filter(Boolean);

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
    const links = items
      .filter((item) => item.itemType === 'nav_link')
      .map((item) => `<li><a href="${safeUrl(item.url)}">${escapeHtml(item.text || item.title || '')}</a></li>`)
      .join('');

    const buttonText = pick(fields, 'button_text');
    const buttonUrl = safeUrl(pick(fields, 'button_url', '#'));
    const brandText = pick(fields, 'logo_text', 'Toughbook');
    const mark = pick(fields, 'logo_mark', brandText.charAt(0) || 'T');

    elements.navbar.innerHTML = `
      <div class="nav-inner">
        <a class="nav-brand" href="#hero">
          <span class="nav-mark">${escapeHtml(mark)}</span>
          <span>${escapeHtml(brandText)}</span>
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
    const navLinks = elements.navbar.querySelector('.nav-links');
    if (toggle && navLinks) {
      toggle.addEventListener('click', () => {
        navLinks.classList.toggle('is-open');
      });
    }
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
    const buttonUrl = safeUrl(pick(fields, 'button_url', '#'));
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
            <a class="btn btn-primary" href="${buttonUrl}">
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
    const buttonText = pick(fields, 'form_button_text', pick(fields, 'button_text', 'OFFERTE AANVRAGEN'));

    const formFields = [
      {
        id: 'contact-name',
        type: 'text',
        span: 1,
        label: pick(fields, 'form_name_label', 'NAAM'),
        placeholder: pick(fields, 'form_name_placeholder', 'Uw volledige naam'),
      },
      {
        id: 'contact-company',
        type: 'text',
        span: 1,
        label: pick(fields, 'form_company_label', 'BEDRIJF'),
        placeholder: pick(fields, 'form_company_placeholder', 'Bedrijfsnaam'),
      },
      {
        id: 'contact-email',
        type: 'email',
        span: 2,
        label: pick(fields, 'form_email_label', 'E-MAIL'),
        placeholder: pick(fields, 'form_email_placeholder', 'e-mail@bedrijf.nl'),
      },
      {
        id: 'contact-message',
        type: 'textarea',
        span: 2,
        label: pick(fields, 'form_message_label', 'BERICHT'),
        placeholder: pick(fields, 'form_message_placeholder', 'Hoe kunnen wij u helpen?'),
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
            <input id="${field.id}" class="input-control" type="${escapeHtml(field.type)}" placeholder="${escapeHtml(field.placeholder || '')}" />
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
            ${phone ? `<div class="contact-item">${escapeHtml(phone)}</div>` : ''}
            ${email ? `<div class="contact-item">${escapeHtml(email)}</div>` : ''}
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
    const subtitle = pick(fields, 'subtitle');
    const badge = pick(fields, 'badge_text');
    const contactPhone = pick(fields, 'contact_phone');
    const contactEmail = pick(fields, 'contact_email');
    const contactLocation = pick(fields, 'contact_location');

    const formItems = items.filter((item) => String(item.itemType || '').includes('form'));
    const benefitItems = items.filter((item) => !String(item.itemType || '').includes('form'));

    const formTitle = pick(fields, 'form_title', pick(fields, 'form_heading', 'Contact'));
    const formButtonText = pick(fields, 'form_button_text', pick(fields, 'primary_button_text', 'Send request'));

    const defaultFormItems = [
      {
        label: pick(fields, 'form_name_label', 'Name'),
        placeholder: pick(fields, 'form_name_placeholder', 'Your name'),
        input_type: 'text',
      },
      {
        label: pick(fields, 'form_email_label', 'Email'),
        placeholder: pick(fields, 'form_email_placeholder', 'you@company.com'),
        input_type: 'email',
      },
      {
        label: pick(fields, 'form_message_label', 'Message'),
        placeholder: pick(fields, 'form_message_placeholder', 'How can we help?'),
        input_type: 'textarea',
      },
    ];

    const formFields = (formItems.length ? formItems : defaultFormItems).map((item, index) => {
      const label = item.label || item.title || item.name || `Field ${index + 1}`;
      const placeholder = item.placeholder || '';
      const inputType = item.input_type || item.type || (String(item.itemType || '').includes('textarea') ? 'textarea' : 'text');
      const fieldId = `form-field-${index}`;

      if (inputType === 'textarea') {
        return `
          <div class="input-row">
            <label class="input-label" for="${fieldId}">${escapeHtml(label)}</label>
            <textarea id="${fieldId}" class="input-control" rows="4" placeholder="${escapeHtml(placeholder)}"></textarea>
          </div>
        `;
      }

      return `
        <div class="input-row">
          <label class="input-label" for="${fieldId}">${escapeHtml(label)}</label>
          <input id="${fieldId}" class="input-control" type="${escapeHtml(inputType)}" placeholder="${escapeHtml(placeholder)}" />
        </div>
      `;
    }).join('');

    elements.cta.innerHTML = `
      <div class="section-inner cta-shell">
        <div class="cta-grid">
          <div class="reveal">
            ${badge ? `<span class="eyebrow">${escapeHtml(badge)}</span>` : ''}
            ${title ? `<h2 class="section-title">${escapeHtml(title)}</h2>` : ''}
            ${subtitle ? `<p class="section-desc">${escapeHtml(subtitle)}</p>` : ''}
            ${(contactPhone || contactEmail || contactLocation) ? `
              <div class="contact-stack">
                ${contactPhone ? `<div class="contact-line">Phone: <a href="tel:${escapeHtml(contactPhone)}">${escapeHtml(contactPhone)}</a></div>` : ''}
                ${contactEmail ? `<div class="contact-line">Email: <a href="mailto:${escapeHtml(contactEmail)}">${escapeHtml(contactEmail)}</a></div>` : ''}
                ${contactLocation ? `<div class="contact-line">Location: ${escapeHtml(contactLocation)}</div>` : ''}
              </div>
            ` : ''}
            ${benefitItems.length ? `
              <div class="cta-list">
                ${benefitItems.map((item) => `
                  <div class="cta-item">
                    <div class="cta-item-title">${escapeHtml(item.title || '')}</div>
                    <div class="cta-item-text">${escapeHtml(item.description || '')}</div>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
          <div class="form-card reveal">
            <div class="form-title">${escapeHtml(formTitle)}</div>
            <div class="form-grid">${formFields}</div>
            <button class="btn btn-primary" type="button">${escapeHtml(formButtonText)}</button>
          </div>
        </div>
      </div>
    `;

    showSection(elements.cta);
  };

  const renderFooter = (fields, items) => {
    const brandText = pick(fields, 'logo_text');
    const description = pick(fields, 'description');
    const copyright = pick(fields, 'copyright');

    const navLinks = items
      .filter((item) => item.itemType === 'nav_link')
      .map((item) => `<li><a href="${safeUrl(item.url)}">${escapeHtml(item.text || item.title || '')}</a></li>`)
      .join('');

    const productLinks = items
      .filter((item) => item.itemType === 'product_link')
      .map((item) => `<li><a href="${safeUrl(item.url)}">${escapeHtml(item.text || item.title || '')}</a></li>`)
      .join('');

    const legalLinks = [
      { label: pick(fields, 'privacy_policy_label'), url: pick(fields, 'privacy_policy_url') },
      { label: pick(fields, 'terms_label'), url: pick(fields, 'terms_url') },
      { label: pick(fields, 'cookies_label'), url: pick(fields, 'cookies_url') },
    ].filter((link) => link.url && link.label);

    elements.footer.innerHTML = `
      <div class="footer-grid">
        <div>
          ${brandText ? `<div class="footer-brand">${escapeHtml(brandText)}</div>` : ''}
          ${description ? `<p class="footer-text">${escapeHtml(description)}</p>` : ''}
        </div>
        <div>
          <div class="footer-col-title">Navigation</div>
          <ul class="footer-links">${navLinks}</ul>
        </div>
        <div>
          <div class="footer-col-title">Products</div>
          <ul class="footer-links">${productLinks}</ul>
        </div>
        <div>
          <div class="footer-col-title">Contact</div>
          <ul class="footer-links">
            ${pick(fields, 'contact_phone') ? `<li><a href="tel:${escapeHtml(pick(fields, 'contact_phone'))}">${escapeHtml(pick(fields, 'contact_phone'))}</a></li>` : ''}
            ${pick(fields, 'contact_email') ? `<li><a href="mailto:${escapeHtml(pick(fields, 'contact_email'))}">${escapeHtml(pick(fields, 'contact_email'))}</a></li>` : ''}
            ${pick(fields, 'contact_location') ? `<li>${escapeHtml(pick(fields, 'contact_location'))}</li>` : ''}
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        ${copyright ? `<span>${escapeHtml(copyright)}</span>` : ''}
        ${legalLinks.length ? `
        <span>
          ${legalLinks.map((link) => `<a href="${safeUrl(link.url)}">${escapeHtml(link.label)}</a>`).join(' ')}
        </span>` : ''}
      </div>
    `;

    showSection(elements.footer);
  };

  const ensureFooterFromWebsite = (website) => {
    if (!elements.footer || elements.footer.innerHTML.trim()) {
      return;
    }
    if (!website) {
      return;
    }

    const brandText = String(website.name || '').trim();
    const domain = String(website.domain || '').trim();
    const year = new Date().getFullYear();

    const description = domain ? `Bezoek ons op ${domain}` : '';
    const copyright = brandText ? `(c) ${year} ${brandText}.` : `(c) ${year}`;

    renderFooter({
      logo_text: brandText,
      description,
      copyright,
    }, []);
  };

  const renderers = {
    hero_block: renderHero,
    image_block: renderFeatures,
    text_block: renderSpecifications,
    contact_block: renderContactBlock,
    footer_block: renderFooter,
  };

  const startReveal = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
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
        const response = await fetch(url, { credentials: 'include', cache: 'no-store' });
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

      ensureFooterFromWebsite(payload.website);

      if (elements.loading) {
        elements.loading.style.display = 'none';
      }
      startReveal();
    }
    catch (error) {
      console.error('Failed to load website content', error);
      showError('Failed to load content. Check backend connection.');
    }
  };

  init();
})();
