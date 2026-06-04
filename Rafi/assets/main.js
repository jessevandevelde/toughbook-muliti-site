 /* Spec data */
  const specData = {
    overview: [
      { label: 'Form Factor', value: '10.1" Fully-Rugged Convertible 2-in-1' },
      { label: 'Display', value: '10.1" WUXGA IPS, 1920×1200, 800 nit, Outdoor Readable' },
      { label: 'Battery Life', value: 'Up to 18.5 hours (hot-swappable)' },
      { label: 'Weight', value: 'From 1.30 kg (2.87 lbs)' },
      { label: 'Operating System', value: 'Windows 10 Pro / Windows 11 Pro' },
    ],
    performance: [
      { label: 'Processor', value: 'Intel® Core™ i5-10310U vPro® / i7-10810U vPro®' },
      { label: 'Memory', value: 'Up to 32 GB DDR4-2133' },
      { label: 'Storage', value: 'Up to 1 TB PCIe NVMe SSD (OPAL 2.0)' },
      { label: 'Graphics', value: 'Intel® UHD Graphics 620' },
      { label: 'TPM', value: 'TPM 2.0 (Firmware)' },
    ],
    durability: [
      { label: 'Military Standard', value: 'MIL-STD-810H certified' },
      { label: 'Ingress Protection', value: 'IP65 — dust & water sealed' },
      { label: 'Drop Resistance', value: '6-foot drop to concrete (26 angles)' },
      { label: 'Operating Temp', value: '-29 °C to +63 °C' },
      { label: 'Humidity', value: '95% non-condensing' },
    ],
    connectivity: [
      { label: 'WLAN', value: 'Wi-Fi 6 (802.11ax) + Bluetooth® 5.1' },
      { label: 'WWAN', value: '4G LTE (optional) / 5G Sub-6GHz (optional)' },
      { label: 'Ports', value: 'USB-C (Thunderbolt™ 4), 2× USB 3.1, HDMI, RJ-45, Serial (DB-9)' },
      { label: 'Security', value: 'Fingerprint reader, Smart card slot, NFC (optional)' },
      { label: 'GNSS', value: 'GPS / GLONASS (integrated)' },
    ],
  };

  let activeTab = 'overview';
  function renderSpecTable() {
    document.getElementById('spec-table').innerHTML = specData[activeTab].map(r =>
      `<div class="spec-row"><div class="spec-row-label">${r.label}</div><div class="spec-row-value">${r.value}</div></div>`
    ).join('');
  }
  function setTab(tab, btn) {
    activeTab = tab;
    document.querySelectorAll('.spec-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderSpecTable();
  }
  renderSpecTable();

  /* Hero gallery */
  const heroImages = [
    'https://images.unsplash.com/photo-1597237449706-921da64332dd?w=900',
    'https://images.unsplash.com/photo-1621692123555-37158f20e164?w=900',
    'https://images.unsplash.com/photo-1653567461945-162426401322?w=900',
    'https://images.unsplash.com/photo-1584985430144-4cb6ffd43f71?w=900',
  ];
  function setHeroImg(idx, el) {
    document.getElementById('hero-main-img').src = heroImages[idx];
    document.querySelectorAll('.hero-thumb').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
  }

  /* Mobile menu */
  document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.toggle('open');
  });
  function closeMobile() { document.getElementById('mobile-menu').classList.remove('open'); }

  /* Language */
  const t = {
    EN: { navSpecs:'Specifications', navDownloads:'Downloads', navQuote:'Get Quote', navContact:'Contact', navCta:'Request a Quote', heroTag:'Next Generation Rugged', heroSub:'The Ultimate Rugged 2-in-1 Convertible', heroDesc:'Engineered for extreme environments, the Toughbook G2 delivers uncompromising performance where reliability is non-negotiable — from emergency response to military operations.', heroCta1:'Request a Quote', heroCta2:'View Specifications', specsH:'Technical Specifications', specsSub:'Comprehensive specifications for the Toughbook G2 rugged convertible', specsDl:'Download Full Spec Sheet (PDF)', dlH:'Product Documentation', dlSub:'Official Panasonic Toughbook G2 documentation for procurement, IT, and field teams', quoteH:'Request a Quote', quoteSub:"Get a customised proposal tailored to your organisation's operational requirements", submit:'Submit Quote Request', sTitle:'Quote Request Submitted', sDesc:'Thank you for your interest. A specialist will contact you within one business day.', contactH:'Contact Us', contactSub:'Our specialists are ready to assist with your Toughbook G2 deployment' },
    NL: { navSpecs:'Specificaties', navDownloads:'Downloads', navQuote:'Offerte', navContact:'Contact', navCta:'Offerte Aanvragen', heroTag:'Volgende Generatie Robuust', heroSub:'De Ultieme Robuuste 2-in-1 Convertible', heroDesc:'Ontworpen voor extreme omstandigheden levert de Toughbook G2 oncompromitterende prestaties waar betrouwbaarheid niet onderhandelbaar is.', heroCta1:'Offerte Aanvragen', heroCta2:'Specificaties Bekijken', specsH:'Technische Specificaties', specsSub:'Volledige specificaties van de Toughbook G2 robuuste convertible', specsDl:'Volledige Specsheet Downloaden (PDF)', dlH:'Productdocumentatie', dlSub:'Officiële Panasonic Toughbook G2 documentatie voor inkoop, IT en velddiensten', quoteH:'Offerte Aanvragen', quoteSub:'Ontvang een op maat gemaakte offerte voor uw organisatie', submit:'Offerteverzoek Versturen', sTitle:'Offerteverzoek Ingediend', sDesc:'Bedankt voor uw interesse. Een specialist neemt binnen één werkdag contact met u op.', contactH:'Neem Contact Op', contactSub:'Onze specialisten staan klaar om uw Toughbook G2 implementatie te ondersteunen' },
    DE: { navSpecs:'Spezifikationen', navDownloads:'Downloads', navQuote:'Angebot', navContact:'Kontakt', navCta:'Angebot Anfordern', heroTag:'Nächste Generation Robust', heroSub:'Der ultimative robuste 2-in-1 Convertible', heroDesc:'Entwickelt für extreme Umgebungen liefert das Toughbook G2 kompromisslose Leistung, wo Zuverlässigkeit unverzichtbar ist.', heroCta1:'Angebot Anfordern', heroCta2:'Spezifikationen Ansehen', specsH:'Technische Spezifikationen', specsSub:'Vollständige Spezifikationen des Toughbook G2 robusten Convertibles', specsDl:'Vollständiges Datenblatt Herunterladen (PDF)', dlH:'Produktdokumentation', dlSub:'Offizielle Panasonic Toughbook G2 Dokumentation für Beschaffung, IT und Außendienst', quoteH:'Angebot Anfordern', quoteSub:'Erhalten Sie ein auf Ihre Organisation zugeschnittenes Angebot', submit:'Angebotsanfrage Absenden', sTitle:'Angebotsanfrage Eingereicht', sDesc:'Vielen Dank für Ihr Interesse. Ein Spezialist kontaktiert Sie innerhalb eines Werktages.', contactH:'Kontakt Aufnehmen', contactSub:'Unsere Spezialisten stehen für Ihre Toughbook G2 Implementierung bereit' },
    FR: { navSpecs:'Spécifications', navDownloads:'Téléchargements', navQuote:'Devis', navContact:'Contact', navCta:'Demander un Devis', heroTag:'Nouvelle Génération Robuste', heroSub:'Le convertible 2-en-1 robuste ultime', heroDesc:"Conçu pour les environnements extrêmes, le Toughbook G2 offre des performances inégalées là où la fiabilité est non négociable.", heroCta1:'Demander un Devis', heroCta2:'Voir les Spécifications', specsH:'Spécifications Techniques', specsSub:'Spécifications complètes du convertible robuste Toughbook G2', specsDl:'Télécharger la Fiche Technique Complète (PDF)', dlH:'Documentation Produit', dlSub:"Documentation officielle Panasonic Toughbook G2 pour les équipes d'achat, IT et terrain", quoteH:'Demander un Devis', quoteSub:"Obtenez une proposition personnalisée pour les besoins de votre organisation", submit:'Soumettre la Demande de Devis', sTitle:'Demande de Devis Soumise', sDesc:"Merci pour votre intérêt. Un spécialiste vous contactera dans un jour ouvrable.", contactH:'Nous Contacter', contactSub:'Nos spécialistes sont prêts à vous accompagner dans votre déploiement Toughbook G2' },
  };
  function applyLang(lang) {
    const l = t[lang];
    const s = (id, v) => { const e = document.getElementById(id); if(e) e.textContent = v; };
    s('nav-specs', l.navSpecs); s('nav-downloads', l.navDownloads); s('nav-quote', l.navQuote);
    s('nav-contact', l.navContact); s('nav-cta', l.navCta); s('hero-tag', l.heroTag);
    s('hero-sub', l.heroSub); s('hero-desc', l.heroDesc); s('hero-cta1', l.heroCta1);
    s('hero-cta2', l.heroCta2); s('specs-heading', l.specsH); s('specs-sub', l.specsSub);
    s('dl-heading', l.dlH); s('dl-sub', l.dlSub); s('quote-heading', l.quoteH);
    s('quote-sub', l.quoteSub); s('submit-label', l.submit); s('success-title', l.sTitle);
    s('success-desc', l.sDesc); s('contact-heading', l.contactH); s('contact-sub', l.contactSub);
    const dlBtn = document.getElementById('specs-dl-btn');
    if(dlBtn) dlBtn.lastChild.textContent = ' ' + l.specsDl;
  }
  document.getElementById('lang-select').addEventListener('change', e => applyLang(e.target.value));

  /* Form */
  function submitForm(e) {
    e.preventDefault();
    document.getElementById('quote-form').style.display = 'none';
    document.getElementById('form-success').classList.add('visible');
  }