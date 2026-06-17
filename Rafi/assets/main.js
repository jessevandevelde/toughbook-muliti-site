/* Spec data */
  const specData = {
    overview: [
      { label: 'Vormfactor', value: '10,1" volledig robuuste tablet / 2-in-1 met optioneel afneembaar toetsenbord' },
      { label: 'Beeldscherm', value: '10,1" WUXGA IPS, 1920×1200, maximaal 1000 nits, anti-reflectie, geschikt voor buiten' },
      { label: 'Batterijduur', value: 'Tot 18,5 uur (68 Wh Li-ion; optionele brugbatterij voor hot-swap)' },
      { label: 'Gewicht', value: 'Vanaf ca. 1.315 g (tablet, zonder toetsenbord)' },
      { label: 'Afmetingen', value: '279,4 × 188 × 28 mm (tablet)' },
      { label: 'Besturingssysteem', value: 'Windows 11 Pro (Windows 10 Pro downgrade beschikbaar)' },
    ],
    performance: [
      { label: 'Processor', value: 'Intel® Core™ i5-10310U vPro® (tot 4,4 GHz) / i7-10810U vPro® (tot 4,9 GHz)' },
      { label: 'Geheugen', value: '16 GB of 32 GB DDR4' },
      { label: 'Opslag', value: '512 GB of 1 TB OPAL 2.0 quick-release SSD (PCIe NVMe)' },
      { label: 'Grafische chip', value: 'Intel® UHD Graphics' },
      { label: 'TPM', value: 'TPM 2.0 (firmware)' },
      { label: 'Camera', value: 'Infrarood-webcam (Windows Hello) + 8 MP achtercamera' },
    ],
    durability: [
      { label: 'Militaire norm', value: 'MIL-STD-810H gecertificeerd' },
      { label: 'Stof- en waterbestendigheid', value: 'IP65 — volledig afgedicht tegen stof en waterstralen' },
      { label: 'Valbestendigheid', value: '180 cm valduurzaamheid (tablet + optioneel toetsenbord)' },
      { label: 'Bedrijfstemperatuur', value: '-20 °C tot +60 °C' },
      { label: 'Opslagtemperatuur', value: '-30 °C tot +70 °C' },
      { label: 'Luchtvochtigheid', value: 'Tot 95% niet-condenserend' },
    ],
    connectivity: [
      { label: 'WLAN', value: 'Wi-Fi 6 (802.11ax) + Bluetooth® 5.1' },
      { label: 'WWAN', value: 'Optioneel 4G LTE / 5G Sub-6 GHz (incl. standalone & privé 5G-netwerken)' },
      { label: 'Poorten (tablet)', value: 'USB-A 3.1, USB-C, Nano-SIM-sleuf, audio-aansluiting (3,5 mm)' },
      { label: 'Poorten (met toetsenbord)', value: 'Extra USB-A 3.1, RJ-45, HDMI, via xPAK: serieel (DB-9), extra LAN, enz.' },
      { label: 'Modulaire uitbreiding', value: '2 xPAK-gebieden — meer dan 20 combinaties (o.a. thermische camera, barcodescanner, HF-RFID, smartcard)' },
      { label: 'Beveiliging', value: 'TPM 2.0, IR-webcam (Windows Hello), smartcardslot, optionele NFC' },
      { label: 'Satellietnavigatie', value: 'GPS / A-GPS (geïntegreerd)' },
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
    'assets/images/toughbook2.jpeg',
    'assets/images/toughbook.jpeg',
    'assets/images/toughbook3.jpeg',
    'assets/images/toughbook4.jpeg',
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
    NL: { navSpecs:'Specificaties', navDownloads:'Downloads', navQuote:'Offerte', navContact:'Contact', navCta:'Offerte Aanvragen', heroTag:'Volgende Generatie Robuust', heroSub:'Het Ultieme Robuuste 2-in-1 Tablet', heroDesc:'De TOUGHBOOK G2 combineert militaire robuustheid met modulaire flexibiliteit in een compact 10,1-inch ontwerp. Getest volgens MIL-STD-810H en officieel IP65-gecertificeerd — gebouwd voor professionals die geen uitval kunnen veroorloven.', heroCta1:'Offerte Aanvragen', heroCta2:'Specificaties Bekijken', specsH:'Technische Specificaties', specsSub:'Volledige technische specificaties van de Panasonic TOUGHBOOK G2 (FZ-G2) robuuste tablet', specsDl:'Volledige Specsheet Downloaden (PDF)', dlH:'Productdocumentatie', dlSub:'Officiële Panasonic TOUGHBOOK G2 documentatie voor inkoop, IT en velddiensten', quoteH:'Offerte Aanvragen', quoteSub:'Ontvang een op maat gemaakt voorstel afgestemd op de operationele behoeften van uw organisatie', submit:'Offerteverzoek Versturen', sTitle:'Offerteverzoek Verzonden', sDesc:'Bedankt voor uw interesse. Een specialist neemt binnen één werkdag contact met u op.', contactH:'Neem Contact Op', contactSub:'Onze specialisten staan klaar om u te helpen bij uw TOUGHBOOK G2-implementatie' },
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

  document.getElementById('specs-dl-btn').addEventListener('click', function(e) {
    e.preventDefault();
    const pdfUrl = 'assets/TOUGHBOOK_G2_Series_Specification.pdf'; // Update with your actual PDF path
    
    fetch(pdfUrl)
        .then(response => response.blob())
        .then(blob => {
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'TOUGHBOOK_G2_Specificaties.pdf';
            link.click();
        })
        .catch(() => alert('Download mislukt. Controleer of het bestand wel bestaat.'));});