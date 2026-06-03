<?php
if (!isset($page_title) || $page_title === '') {
    $page_title = 'Panasonic Toughbook 40 MK2';
}
if (!isset($img_base64) || $img_base64 === '') {
    $img_base64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIHWP4////GQAJ/wP+E/sjAAAAAElFTkSuQmCC';
}
?>
<!DOCTYPE html>
<html lang="nl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title><?php echo $page_title; ?></title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500;600&family=Share+Tech+Mono&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
 
  :root {
    --yellow: #F5C400;
    --black: #0A0A0A;
    --dark: #111111;
    --mid: #1A1A1A;
    --border: #2A2A2A;
    --text: #CCCCCC;
    --white: #FFFFFF;
    --red: #CC2200;
    --mono: 'Share Tech Mono', monospace;
  }
 
  html { scroll-behavior: smooth; }
 
  body {
    background: var(--black);
    color: var(--white);
    font-family: 'Barlow', sans-serif;
    font-size: 15px;
    line-height: 1.6;
    overflow-x: hidden;
  }
 
  /* ── NAV ── */
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    background: rgba(10,10,10,0.95);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 2rem; height: 56px;
  }
  .nav-brand {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800; font-size: 1.1rem;
    letter-spacing: 0.1em; color: var(--white);
    text-decoration: none;
  }
  .nav-brand span { color: var(--yellow); }
  .nav-links { display: flex; gap: 2rem; list-style: none; }
  .nav-links a {
    font-family: var(--mono);
    font-size: 0.7rem; letter-spacing: 0.12em;
    color: var(--text); text-decoration: none;
    transition: color .2s;
  }
  .nav-links a:hover { color: var(--yellow); }
  .nav-cta {
    background: var(--yellow); color: var(--black);
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800; font-size: 0.85rem;
    letter-spacing: 0.15em; padding: 0.45rem 1.2rem;
    text-decoration: none; text-transform: uppercase;
    transition: background .2s;
  }
  .nav-cta:hover { background: #ffd700; }
 
  /* ── HERO ── */
  #hero {
    min-height: 100vh; display: grid;
    grid-template-columns: 1fr 1fr;
    margin-top: 56px;
  }
  .hero-left {
    background: var(--black);
    display: flex; flex-direction: column;
    justify-content: center;
    padding: 5rem 4rem 5rem 5rem;
  }
  .hero-badge {
    display: inline-block;
    border: 1px solid var(--yellow);
    color: var(--yellow);
    font-family: var(--mono);
    font-size: 0.65rem; letter-spacing: 0.2em;
    padding: 0.3rem 0.75rem;
    margin-bottom: 1.8rem;
    text-transform: uppercase;
  }
  .hero-h1 {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900; font-size: clamp(2.8rem, 5vw, 4.2rem);
    line-height: 1.0; text-transform: uppercase;
    margin-bottom: 1.2rem;
  }
  .hero-h1 .accent { color: var(--yellow); }
  .hero-sub {
    color: var(--text); font-size: 0.95rem;
    max-width: 420px; margin-bottom: 2.2rem; line-height: 1.7;
  }
  .hero-btns { display: flex; gap: 0.75rem; margin-bottom: 3.5rem; }
  .btn-primary {
    background: var(--yellow); color: var(--black);
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800; font-size: 0.85rem;
    letter-spacing: 0.15em; text-transform: uppercase;
    padding: 0.75rem 1.6rem; text-decoration: none;
    transition: background .2s, transform .15s;
    display: inline-block;
  }
  .btn-primary:hover { background: #ffd700; transform: translateY(-1px); }
  .btn-secondary {
    border: 1px solid #444; color: var(--white);
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700; font-size: 0.85rem;
    letter-spacing: 0.15em; text-transform: uppercase;
    padding: 0.75rem 1.6rem; text-decoration: none;
    transition: border-color .2s, color .2s;
    display: inline-block;
  }
  .btn-secondary:hover { border-color: var(--yellow); color: var(--yellow); }
  .hero-stats { display: flex; gap: 0; }
  .stat {
    padding: 0 2rem 0 0;
    border-right: 1px solid var(--border);
    margin-right: 2rem;
  }
  .stat:last-child { border-right: none; margin-right: 0; }
  .stat-label {
    font-family: var(--mono); font-size: 0.6rem;
    letter-spacing: 0.18em; color: #666; text-transform: uppercase;
    display: block; margin-bottom: 0.2rem;
  }
  .stat-value {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700; font-size: 1.5rem; color: var(--white);
  }
 
  .hero-right {
    background: #0f0f0f;
    position: relative; overflow: hidden;
    display: flex; align-items: center; justify-content: center;
  }
  .hero-right img {
    width: 100%; height: 100%;
    object-fit: cover; object-position: center;
    display: block;
  }
  .hero-price {
    position: absolute; bottom: 1.5rem; right: 1.5rem;
    background: rgba(10,10,10,0.9);
    border: 1px solid var(--border);
    padding: 0.9rem 1.3rem;
    text-align: right;
  }
  .price-old {
    font-family: var(--mono); font-size: 0.75rem;
    color: #555; text-decoration: line-through;
    display: block; margin-bottom: 0.15rem;
  }
  .price-new {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800; font-size: 1.9rem; color: var(--yellow);
  }
  .price-note {
    font-family: var(--mono); font-size: 0.6rem;
    color: #555; letter-spacing: 0.1em;
    display: block; margin-top: 0.15rem; text-transform: uppercase;
  }
 
  /* ── SECTION COMMON ── */
  section { padding: 5rem 5rem; }
  .section-label {
    font-family: var(--mono); font-size: 0.65rem;
    letter-spacing: 0.25em; color: var(--yellow);
    text-transform: uppercase; margin-bottom: 0.6rem;
    display: block;
  }
  .section-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800; font-size: clamp(2rem, 3vw, 2.8rem);
    text-transform: uppercase; line-height: 1.1;
    margin-bottom: 1.2rem;
  }
  .section-title .accent { color: var(--yellow); }
  .divider {
    width: 3rem; height: 3px;
    background: var(--yellow); margin-bottom: 2rem;
  }
 
  /* ── FEATURES ── */
  #features { background: var(--dark); }
  .features-intro { max-width: 560px; margin-bottom: 3.5rem; }
  .features-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px; background: var(--border);
  }
  .feature-card {
    background: var(--dark);
    padding: 2.2rem;
    transition: background .2s;
  }
  .feature-card:hover { background: var(--mid); }
  .feature-icon {
    width: 44px; height: 44px;
    border: 1px solid var(--yellow);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 1.2rem; color: var(--yellow); font-size: 1.2rem;
  }
  .feature-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700; font-size: 1.05rem;
    text-transform: uppercase; letter-spacing: 0.08em;
    margin-bottom: 0.6rem; color: var(--white);
  }
  .feature-text { color: var(--text); font-size: 0.88rem; line-height: 1.65; }
 
  /* ── SECTOREN ── */
  #sectoren { background: var(--black); }
  .sectoren-grid {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;
    margin-top: 2.5rem;
  }
  .sector-card {
    border: 1px solid var(--border);
    padding: 1.8rem 1.5rem;
    position: relative; overflow: hidden;
    transition: border-color .2s, transform .2s;
    cursor: default;
  }
  .sector-card::before {
    content: ''; position: absolute; left: 0; top: 0; bottom: 0;
    width: 3px; background: var(--yellow);
    transform: scaleY(0); transform-origin: bottom;
    transition: transform .25s;
  }
  .sector-card:hover { border-color: var(--yellow); transform: translateY(-3px); }
  .sector-card:hover::before { transform: scaleY(1); }
  .sector-num {
    font-family: var(--mono); font-size: 0.65rem;
    color: var(--yellow); letter-spacing: 0.15em;
    display: block; margin-bottom: 0.8rem;
  }
  .sector-name {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700; font-size: 1.2rem;
    text-transform: uppercase; margin-bottom: 0.5rem;
  }
  .sector-desc { color: var(--text); font-size: 0.83rem; line-height: 1.6; }
 
  /* ── SPECS ── */
  #specs { background: var(--dark); }
  .specs-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; margin-top: 2.5rem; }
  .spec-group { margin-bottom: 2rem; }
  .spec-group-title {
    font-family: var(--mono); font-size: 0.65rem;
    letter-spacing: 0.2em; color: var(--yellow);
    text-transform: uppercase; margin-bottom: 1rem;
    padding-bottom: 0.5rem; border-bottom: 1px solid var(--border);
  }
  .spec-row {
    display: flex; justify-content: space-between;
    padding: 0.6rem 0; border-bottom: 1px solid var(--border);
    font-size: 0.88rem;
  }
  .spec-key { color: var(--text); }
  .spec-val { color: var(--white); font-weight: 600; text-align: right; max-width: 55%; }
 
  /* ── GALLERY ── */
  #gallery { background: var(--black); }
  .gallery-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    grid-template-rows: 250px 250px;
    gap: 4px; margin-top: 2.5rem;
  }
  .gallery-item {
    background: var(--mid);
    overflow: hidden; position: relative;
  }
  .gallery-item:first-child { grid-row: 1 / 3; }
  .gallery-item img {
    width: 100%; height: 100%;
    object-fit: cover;
    transition: transform .4s;
    display: block;
  }
  .gallery-item:hover img { transform: scale(1.04); }
  .gallery-placeholder {
    width: 100%; height: 100%;
    display: flex; align-items: center; justify-content: center;
    background: var(--mid);
    color: #333;
    font-family: var(--mono); font-size: 0.7rem;
    letter-spacing: 0.1em;
  }
 
  /* ── DOWNLOADS ── */
  #downloads { background: var(--dark); }
  .downloads-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1rem; margin-top: 2.5rem; }
  .download-card {
    border: 1px solid var(--border);
    padding: 1.5rem; display: flex;
    align-items: center; gap: 1rem;
    text-decoration: none; color: var(--white);
    transition: border-color .2s, background .2s;
  }
  .download-card:hover { border-color: var(--yellow); background: var(--mid); }
  .dl-icon {
    width: 40px; height: 40px; min-width: 40px;
    background: var(--border);
    display: flex; align-items: center; justify-content: center;
    color: var(--yellow); font-size: 1.1rem;
  }
  .dl-name {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700; font-size: 0.95rem;
    text-transform: uppercase; letter-spacing: 0.05em;
  }
  .dl-type {
    font-family: var(--mono); font-size: 0.65rem;
    color: #555; letter-spacing: 0.1em; margin-top: 0.2rem;
  }
 
  /* ── OFFERTE CTA ── */
  #offerte {
    background: var(--yellow); padding: 4.5rem 5rem;
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 2rem;
  }
  .offerte-text h2 {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900; font-size: 2.4rem;
    color: var(--black); text-transform: uppercase;
  }
  .offerte-text p { color: #333; margin-top: 0.4rem; }
  .btn-dark {
    background: var(--black); color: var(--yellow);
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800; font-size: 0.95rem;
    letter-spacing: 0.15em; text-transform: uppercase;
    padding: 1rem 2.2rem; text-decoration: none;
    transition: background .2s;
    display: inline-block;
  }
  .btn-dark:hover { background: #111; }
 
  /* ── FOOTER ── */
  footer {
    background: #050505;
    border-top: 1px solid var(--border);
    padding: 2rem 5rem;
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 1rem;
  }
  .footer-brand {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800; font-size: 1rem;
    letter-spacing: 0.1em; color: var(--white);
  }
  .footer-brand span { color: var(--yellow); }
  .footer-copy {
    font-family: var(--mono); font-size: 0.65rem;
    color: #444; letter-spacing: 0.1em;
  }
 
  /* ── RESPONSIVE ── */
  @media (max-width: 1024px) {
    #hero { grid-template-columns: 1fr; }
    .hero-right { height: 50vw; min-height: 300px; }
    .features-grid { grid-template-columns: 1fr 1fr; }
    .sectoren-grid { grid-template-columns: 1fr 1fr; }
    .specs-layout { grid-template-columns: 1fr; }
  }
  @media (max-width: 768px) {
    section { padding: 3rem 1.5rem; }
    nav { padding: 0 1rem; }
    .nav-links { display: none; }
    .hero-left { padding: 3rem 1.5rem; }
    .features-grid { grid-template-columns: 1fr; }
    .downloads-grid { grid-template-columns: 1fr; }
    .gallery-grid { grid-template-columns: 1fr; grid-template-rows: auto; }
    .gallery-item:first-child { grid-row: auto; }
    .gallery-item { height: 220px; }
    #offerte { flex-direction: column; padding: 3rem 1.5rem; }
    footer { padding: 2rem 1.5rem; flex-direction: column; align-items: flex-start; }
    .hero-stats { flex-wrap: wrap; gap: 1rem; }
    .stat { border-right: none; }
  }
</style>
</head>
<body>
 
<!-- NAV -->
<nav>
  <a href="#hero" class="nav-brand">TOUGHBOOK <span>// 40</span></a>
  <ul class="nav-links">
    <li><a href="#features">01_FEATURES</a></li>
    <li><a href="#sectoren">02_SECTOREN</a></li>
    <li><a href="#specs">03_SPECS</a></li>
    <li><a href="#gallery">04_GALLERY</a></li>
    <li><a href="#downloads">05_DOWNLOADS</a></li>
  </ul>
  <a href="#offerte" class="nav-cta">OFFERTE</a>
</nav>
 
<!-- HERO -->
<section id="hero">
  <div class="hero-left">
    <span class="hero-badge">MISSION CRITICAL // MK-2 DEPLOYMENT</span>
    <h1 class="hero-h1">
      ENGINEERED FOR<br>
      <span class="accent">EXTREME</span> FRONTIERS
    </h1>
    <p class="hero-sub">
      De Panasonic Toughbook 40 MK2 &mdash; het meest veelzijdige 14&quot;
      volledig robuuste werkstation ooit gebouwd. Voor defensie,
      industrie en de meest vijandige omstandigheden ter wereld.
    </p>
    <div class="hero-btns">
      <a href="#offerte" class="btn-primary">Vraag Offerte Aan</a>
      <a href="#specs" class="btn-secondary">Bekijk Specs</a>
    </div>
    <div class="hero-stats">
      <div class="stat">
        <span class="stat-label">Drop Rating</span>
        <span class="stat-value">180cm</span>
      </div>
      <div class="stat">
        <span class="stat-label">Display</span>
        <span class="stat-value">1.200 NIT</span>
      </div>
      <div class="stat">
        <span class="stat-label">Ingress</span>
        <span class="stat-value">IP66</span>
      </div>
      <div class="stat">
        <span class="stat-label">Thermal</span>
        <span class="stat-value">-29° / +63°C</span>
      </div>
    </div>
  </div>
  <div class="hero-right">
    <img src="../images/toughbook-hero.jpg" alt="Panasonic Toughbook 40 MK2">
    <div class="hero-price">
      <span class="price-old">&euro; 4.885,00</span>
      <span class="price-new">&euro;&nbsp;4.640,75</span>
      <span class="price-note">EXCL. BTW &bull; ONLINE PRIJS</span>
    </div>
  </div>
</section>
 
<!-- FEATURES -->
<section id="features">
  <div class="features-intro">
    <span class="section-label">01 // Features</span>
    <h2 class="section-title">GEBOUWD VOOR<br><span class="accent">ZWAARSTE OMSTANDIGHEDEN</span></h2>
    <div class="divider"></div>
    <p style="color:var(--text);font-size:.9rem;line-height:1.7;">
      De Toughbook 40 MK2 combineert militaire robuustheid met enterprise performance.
      Elk onderdeel is ontworpen om te overleven waar andere laptops falen.
    </p>
  </div>
  <div class="features-grid">
    <div class="feature-card">
      <div class="feature-icon">&#9673;</div>
      <div class="feature-title">MIL-STD-810H Gecertificeerd</div>
      <p class="feature-text">Getest volgens strenge militaire normen. Schokbestendig, trillingbestendig en valbescherming tot 180cm.</p>
    </div>
    <div class="feature-card">
      <div class="feature-icon">&#127783;</div>
      <div class="feature-title">IP66 Waterbestendig</div>
      <p class="feature-text">Volledig beschermd tegen stof en krachtige waterstralen. Operationeel bij extreme weersomstandigheden.</p>
    </div>
    <div class="feature-card">
      <div class="feature-icon">&#9728;</div>
      <div class="feature-title">1.200 Nit Display</div>
      <p class="feature-text">Helder leesbaar scherm in direct zonlicht. Touch- en handschoenbediening standaard inbegrepen.</p>
    </div>
    <div class="feature-card">
      <div class="feature-icon">&#9889;</div>
      <div class="feature-title">Hot-Swap Batterij</div>
      <p class="feature-text">Twee hotswap-batterijen voor non-stop operaties. Tot 18 uur autonomie in het veld zonder opladen.</p>
    </div>
    <div class="feature-card">
      <div class="feature-icon">&#128268;</div>
      <div class="feature-title">Modulaire Uitbreidingen</div>
      <p class="feature-text">Configureerbaar met barcode-reader, smartcard, RFID, vingerafdrukscanner en extra I/O-poorten.</p>
    </div>
    <div class="feature-card">
      <div class="feature-icon">&#128246;</div>
      <div class="feature-title">5G &amp; Satelliet Klaar</div>
      <p class="feature-text">Ingebouwde 5G LTE-module. Optioneel uitbreidbaar met satellietcommunicatie voor remote operaties.</p>
    </div>
  </div>
</section>
 
<!-- SECTOREN -->
<section id="sectoren">
  <span class="section-label">02 // Sectoren</span>
  <h2 class="section-title">INGEZET IN<br><span class="accent">ELKE SECTOR</span></h2>
  <div class="divider"></div>
  <div class="sectoren-grid">
    <div class="sector-card">
      <span class="sector-num">// 01</span>
      <div class="sector-name">Defensie &amp; Veiligheid</div>
      <p class="sector-desc">Ingezet door krijgsmacht en politie voor veldoperaties, surveillance en commandovoering.</p>
    </div>
    <div class="sector-card">
      <span class="sector-num">// 02</span>
      <div class="sector-name">Olie &amp; Gas</div>
      <p class="sector-desc">Operationeel op offshore-platforms en in explosiegevaarlijke zones (ATEX-gereed).</p>
    </div>
    <div class="sector-card">
      <span class="sector-num">// 03</span>
      <div class="sector-name">Utilities &amp; Energie</div>
      <p class="sector-desc">Voor inspectie van infrastructuur, netbeheer en storingsdiagnose in het veld.</p>
    </div>
    <div class="sector-card">
      <span class="sector-num">// 04</span>
      <div class="sector-name">Transport &amp; Logistiek</div>
      <p class="sector-desc">Betrouwbare data-invoer en tracking in havens, magazijnen en bij last-mile delivery.</p>
    </div>
    <div class="sector-card">
      <span class="sector-num">// 05</span>
      <div class="sector-name">Brandweer &amp; Hulpverlening</div>
      <p class="sector-desc">Hitte- en rook-resistent voor gebruik bij incidenten en rampbestrijding.</p>
    </div>
    <div class="sector-card">
      <span class="sector-num">// 06</span>
      <div class="sector-name">Industrie &amp; Productie</div>
      <p class="sector-desc">Robuuste werkplek voor fabrieks- en productieomgevingen met zware trillingen en vuil.</p>
    </div>
    <div class="sector-card">
      <span class="sector-num">// 07</span>
      <div class="sector-name">Gezondheidszorg</div>
      <p class="sector-desc">Ontsmet-baar chassis voor gebruik in ziekenhuizen, ambulances en militaire medische posten.</p>
    </div>
    <div class="sector-card">
      <span class="sector-num">// 08</span>
      <div class="sector-name">Mijnbouw &amp; Constructie</div>
      <p class="sector-desc">Bedrijfszeker onder extreme druk, stof en temperatuurwisselingen op de werkplaats.</p>
    </div>
  </div>
</section>
 
<!-- SPECS -->
<section id="specs">
  <span class="section-label">03 // Specificaties</span>
  <h2 class="section-title">TECHNISCHE<br><span class="accent">SPECIFICATIES</span></h2>
  <div class="divider"></div>
  <div class="specs-layout">
    <div>
      <div class="spec-group">
        <div class="spec-group-title">// Processor &amp; Geheugen</div>
        <div class="spec-row"><span class="spec-key">Processor</span><span class="spec-val">Intel Core i5 / i7 12e Gen vPro</span></div>
        <div class="spec-row"><span class="spec-key">RAM</span><span class="spec-val">8 / 16 / 32 GB DDR4</span></div>
        <div class="spec-row"><span class="spec-key">Opslag</span><span class="spec-val">256 GB / 512 GB / 1 TB SSD</span></div>
        <div class="spec-row"><span class="spec-key">GPU</span><span class="spec-val">Intel Iris Xe Graphics</span></div>
        <div class="spec-row"><span class="spec-key">OS</span><span class="spec-val">Windows 11 Pro</span></div>
      </div>
      <div class="spec-group">
        <div class="spec-group-title">// Display</div>
        <div class="spec-row"><span class="spec-key">Schermgrootte</span><span class="spec-val">14&quot; FHD (1920 x 1080)</span></div>
        <div class="spec-row"><span class="spec-key">Helderheid</span><span class="spec-val">1.200 NIT</span></div>
        <div class="spec-row"><span class="spec-key">Touch</span><span class="spec-val">Capacitief + Handschoen-mode</span></div>
        <div class="spec-row"><span class="spec-key">Antireflectie</span><span class="spec-val">Ja, incl. ITO-coating</span></div>
      </div>
    </div>
    <div>
      <div class="spec-group">
        <div class="spec-group-title">// Robuustheid</div>
        <div class="spec-row"><span class="spec-key">Certificering</span><span class="spec-val">MIL-STD-810H</span></div>
        <div class="spec-row"><span class="spec-key">IP-klasse</span><span class="spec-val">IP66 (stof + water)</span></div>
        <div class="spec-row"><span class="spec-key">Valbestendigheid</span><span class="spec-val">180 cm</span></div>
        <div class="spec-row"><span class="spec-key">Temperatuur operatie</span><span class="spec-val">-29°C tot +63°C</span></div>
        <div class="spec-row"><span class="spec-key">Opslag temperatuur</span><span class="spec-val">-57°C tot +71°C</span></div>
      </div>
      <div class="spec-group">
        <div class="spec-group-title">// Connectiviteit &amp; Batterij</div>
        <div class="spec-row"><span class="spec-key">Draadloos</span><span class="spec-val">Wi-Fi 6E, Bluetooth 5.2</span></div>
        <div class="spec-row"><span class="spec-key">Mobiel internet</span><span class="spec-val">5G Sub-6 GHz</span></div>
        <div class="spec-row"><span class="spec-key">Batterij</span><span class="spec-val">2x Hot-Swap (tot 18 uur)</span></div>
        <div class="spec-row"><span class="spec-key">Gewicht</span><span class="spec-val">Vanaf 2,36 kg</span></div>
        <div class="spec-row"><span class="spec-key">Poorten</span><span class="spec-val">USB-A x3, USB-C, HDMI, LAN, SD</span></div>
      </div>
    </div>
  </div>
</section>
 
<!-- GALLERY -->
<section id="gallery">
  <span class="section-label">04 // Gallery</span>
  <h2 class="section-title">IN HET<br><span class="accent">VELD GETEST</span></h2>
  <div class="divider"></div>
  <div class="gallery-grid">
    <div class="gallery-item">
      <img src="../images/toughbook-1.jpg" alt="Toughbook 40 MK2 Field">
    </div>
    <div class="gallery-item">
      <img src="../images/toughbook-2.jpg" alt="DETAIL // KEYBOARD">
    </div>
    <div class="gallery-item">
      <img src="../images/toughbook-3.jpg" alt="DETAIL // PORTS">
    </div>
    <div class="gallery-item">
      <img src="../images/toughbook-4.jpg" alt="IN USE // OUTDOOR">
    </div>
  </div>
</section>
 
<!-- DOWNLOADS -->
<section id="downloads">
  <span class="section-label">05 // Downloads</span>
  <h2 class="section-title">DOCUMENTEN &amp;<br><span class="accent">DOWNLOADS</span></h2>
  <div class="divider"></div>
  <div class="downloads-grid">
    <a href="#" class="download-card">
      <div class="dl-icon">&#8595;</div>
      <div>
        <div class="dl-name">Productdatasheet</div>
        <div class="dl-type">PDF // 2.4 MB</div>
      </div>
    </a>
    <a href="#" class="download-card">
      <div class="dl-icon">&#8595;</div>
      <div>
        <div class="dl-name">Technische Handleiding</div>
        <div class="dl-type">PDF // 8.1 MB</div>
      </div>
    </a>
    <a href="#" class="download-card">
      <div class="dl-icon">&#8595;</div>
      <div>
        <div class="dl-name">MIL-STD-810H Certificaat</div>
        <div class="dl-type">PDF // 1.2 MB</div>
      </div>
    </a>
    <a href="#" class="download-card">
      <div class="dl-icon">&#8595;</div>
      <div>
        <div class="dl-name">Configuratie Gids</div>
        <div class="dl-type">PDF // 3.7 MB</div>
      </div>
    </a>
    <a href="#" class="download-card">
      <div class="dl-icon">&#8595;</div>
      <div>
        <div class="dl-name">CE &amp; Compliancy Docs</div>
        <div class="dl-type">ZIP // 4.0 MB</div>
      </div>
    </a>
    <a href="#" class="download-card">
      <div class="dl-icon">&#8595;</div>
      <div>
        <div class="dl-name">Driver Package Win 11</div>
        <div class="dl-type">ZIP // 512 MB</div>
      </div>
    </a>
  </div>
</section>
 
<!-- OFFERTE CTA -->
<section id="offerte">
  <div class="offerte-text">
    <h2>KLAAR VOOR DEPLOYMENT?</h2>
    <p>Vraag een offerte aan of neem contact op met onze rugged specialist.</p>
  </div>
  <a href="mailto:info@toughbook.nl" class="btn-dark">Vraag Offerte Aan &rarr;</a>
</section>
 
<!-- FOOTER -->
<footer>
  <div class="footer-brand">TOUGHBOOK <span>// 40 MK2</span></div>
  <div class="footer-copy">&copy; <?php echo date('Y'); ?> PANASONIC CONNECT &bull; ALLE RECHTEN VOORBEHOUDEN</div>
</footer>
 
</body>
</html>