<?php
header('Cache-Control: no-store, no-cache, must-revalidate, proxy-revalidate');
header('Pragma: no-cache');
header('Expires: 0');

// Load CMS API helpers
require_once __DIR__ . '/../api-config.php';

// Fetch CMS blocks from backend
$blocks = getBlocksFromBackend('toughbook-40-dutch.nl');

// Extract all blocks
$heroBlock = getBlockByType($blocks, 'hero');
$featuresBlock = getBlockByType($blocks, 'features');
$sectorsBlock = getBlockByType($blocks, 'sectors');
$specsBlock = getBlockByType($blocks, 'specs');
$galleryBlock = getBlockByType($blocks, 'gallery');
$downloadsBlock = getBlockByType($blocks, 'downloads');
$ctaBlock = getBlockByType($blocks, 'cta');
$footerBlock = getBlockByType($blocks, 'footer');
$navbarBlock = getBlockByType($blocks, 'navbar');
$specSheetButtonBlock = getBlockByType($blocks, 'spec_sheet_button');
$sharedFooterBlock = getSharedFooterFromBackend();

// Hero section data
$page_title = getBlockFieldValue($heroBlock, 'page_title', 'Panasonic Toughbook 40 MK2');
$hero_badge = getBlockFieldValue($heroBlock, 'badge', 'MISSION CRITICAL // MK-2 DEPLOYMENT');
$hero_h1_main = getBlockFieldValue($heroBlock, 'heading_main', 'ENGINEERED FOR');
$hero_h1_accent = getBlockFieldValue($heroBlock, 'heading_accent', 'EXTREME');
$hero_h1_secondary = getBlockFieldValue($heroBlock, 'heading_secondary', 'FRONTIERS');
$hero_description = getBlockFieldValue($heroBlock, 'description', 'De Toughbook 40 MK2 &mdash; het meest veelzijdige 14" volledig robuuste werkstation ooit gebouwd.');
$hero_cta_primary = getBlockFieldValue($heroBlock, 'cta_primary_text', 'Vraag Offerte Aan');
$hero_cta_secondary = getBlockFieldValue($heroBlock, 'cta_secondary_text', 'Bekijk Specs');
$hero_image = getAssetUrl(getBlockFieldValue($heroBlock, 'image_url'), '../images/toughbook-40-hero.jpg');
$spec_sheet_url = getBlockFieldValue($specSheetButtonBlock, 'url');
$spec_sheet_text = getBlockFieldValue($specSheetButtonBlock, 'text');
$spec_sheet_target = getBlockFieldValue($specSheetButtonBlock, 'target', '_blank');
$spec_sheet_download = getBlockFieldValue($specSheetButtonBlock, 'download', 'true');
$price_old = getBlockFieldValue($heroBlock, 'price_old', '€ 4.885,00');
$price_new = getBlockFieldValue($heroBlock, 'price_new', '€ 4.640,75');

// Get hero stats from items
$heroStats = getBlockItems($heroBlock);
?>
<!DOCTYPE html>
<html lang="nl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title><?php echo $page_title; ?></title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500;600&family=Share+Tech+Mono&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../styles/style.css">
</head>
<body>
 
<!-- NAV -->
<nav>
  <a href="#hero" class="nav-brand"><?php echo htmlspecialchars(getBlockFieldValue($navbarBlock, 'logo_text', 'TOUGHBOOK // 40')); ?></a>
  <ul class="nav-links">
    <li><a href="#features">01_FEATURES</a></li>
    <li><a href="#sectoren">02_SECTOREN</a></li>
    <li><a href="#specs">03_SPECS</a></li>
    <li><a href="#gallery">04_GALLERY</a></li>
    <li><a href="#downloads">05_DOWNLOADS</a></li>
  </ul>
  <a href="<?php echo htmlspecialchars(getBlockFieldValue($navbarBlock, 'button_url', '#offerte')); ?>" class="nav-cta"><?php echo htmlspecialchars(getBlockFieldValue($navbarBlock, 'button_text', 'OFFERTE')); ?></a>
</nav>
 
<!-- HERO -->
<section id="hero">
  <div class="hero-left">
    <span class="hero-badge"><?php echo htmlspecialchars($hero_badge); ?></span>
    <h1 class="hero-h1">
      <?php echo htmlspecialchars($hero_h1_main); ?><br>
      <span class="accent"><?php echo htmlspecialchars($hero_h1_accent); ?></span> <?php echo htmlspecialchars($hero_h1_secondary); ?>
    </h1>
    <p class="hero-sub">
      <?php echo $hero_description; ?>
    </p>
    <div class="hero-btns">
      <a href="#offerte" class="btn-primary"><?php echo htmlspecialchars($hero_cta_primary); ?></a>
      <a href="#specs" class="btn-secondary"><?php echo htmlspecialchars($hero_cta_secondary); ?></a>
      <?php if ($spec_sheet_url && $spec_sheet_text): ?>
      <a
        href="<?php echo htmlspecialchars($spec_sheet_url); ?>"
        target="<?php echo htmlspecialchars($spec_sheet_target); ?>"
        class="btn-secondary"
        <?php echo $spec_sheet_download === 'true' ? 'download' : ''; ?>
      >
        <?php echo htmlspecialchars($spec_sheet_text); ?>
      </a>
      <?php endif; ?>
    </div>
    <div class="hero-stats">
      <?php foreach ($heroStats as $stat): ?> 
      <div class="stat">
        <span class="stat-label"><?php echo htmlspecialchars(getItemFieldValue($stat, 'label')); ?></span>
        <span class="stat-value"><?php echo htmlspecialchars(getItemFieldValue($stat, 'value')); ?></span>
      </div>
      <?php endforeach; ?>
    </div>
  </div>
  <div class="hero-right">
    <img src="<?php echo htmlspecialchars($hero_image); ?>" alt="<?php echo htmlspecialchars($page_title); ?>">
    <div class="hero-price">
      <span class="price-old"><?php echo htmlspecialchars($price_old); ?></span>
      <span class="price-new"><?php echo htmlspecialchars($price_new); ?></span>
      <span class="price-note">EXCL. BTW • ONLINE PRIJS</span>
    </div>
  </div>
</section>
 
<!-- FEATURES -->
<section id="features">
  <div class="features-intro">
    <span class="section-label">01 // Features</span>
    <h2 class="section-title"><?php echo getBlockFieldValue($featuresBlock, 'title', 'GEBOUWD VOOR ZWAARSTE OMSTANDIGHEDEN'); ?></h2>
    <div class="divider"></div>
    <p style="color:var(--text);font-size:.9rem;line-height:1.7;">
      <?php echo getBlockFieldValue($featuresBlock, 'description', 'De Toughbook 40 MK2 combineert militaire robuustheid met enterprise performance. Elk onderdeel is ontworpen om te overleven waar andere laptops falen.'); ?>
    </p>
  </div>
  <div class="features-grid">
    <?php 
    $featureItems = getBlockItems($featuresBlock);
    foreach ($featureItems as $feature):
      $featureIcon = getItemFieldValue($feature, 'icon');
      $featureTitle = getItemFieldValue($feature, 'title');
      $featureDescription = getItemFieldValue($feature, 'description');
      if (!$featureIcon && !$featureTitle && !$featureDescription) continue;
    ?>
    <div class="feature-card">
      <div class="feature-icon"><?php echo $featureIcon ?: '&#9673;'; ?></div>
      <div class="feature-title"><?php echo htmlspecialchars($featureTitle); ?></div>
      <p class="feature-text"><?php echo htmlspecialchars($featureDescription); ?></p>
    </div>
    <?php endforeach; ?>
  </div>
</section>
 
<!-- SECTOREN -->
<section id="sectoren">
  <span class="section-label"><?php echo getBlockFieldValue($sectorsBlock, 'section_label', '02 // Sectoren'); ?></span>
  <h2 class="section-title"><?php echo getBlockFieldValue($sectorsBlock, 'title', 'INGEZET IN ELKE SECTOR'); ?></h2>
  <div class="divider"></div>
  <div class="sectoren-grid">
    <?php 
    $sectorItems = getBlockItems($sectorsBlock);
    foreach ($sectorItems as $sector): 
    ?>
    <div class="sector-card">
      <span class="sector-num">// <?php echo htmlspecialchars(getItemFieldValue($sector, 'label')); ?></span>
      <div class="sector-name"><?php echo htmlspecialchars(getItemFieldValue($sector, 'title')); ?></div>
      <p class="sector-desc"><?php echo htmlspecialchars(getItemFieldValue($sector, 'text')); ?></p>
    </div>
    <?php endforeach; ?>
  </div>
</section>
 
<!-- SPECS -->
<section id="specs">
  <span class="section-label"><?php echo getBlockFieldValue($specsBlock, 'section_label', '03 // Specificaties'); ?></span>
  <h2 class="section-title"><?php echo getBlockFieldValue($specsBlock, 'title', 'TECHNISCHE SPECIFICATIES'); ?></h2>
  <div class="divider"></div>
  <div class="specs-layout">
    <div>
      <?php 
      $specItems = getBlockItems($specsBlock);
      
      // The CMS provides one ordered list, so split it evenly across the two columns.
      $processorSpecs = array_slice($specItems, 0, (int) ceil(count($specItems) / 2));
      $displaySpecs = [];
      $ruggedSpecs = array_slice($specItems, (int) ceil(count($specItems) / 2));
      $connectivitySpecs = [];
      ?>
      <div class="spec-group">
        <div class="spec-group-title">// Specificaties</div>
        <?php foreach ($processorSpecs as $spec): ?>
        <div class="spec-row">
          <span class="spec-key"><?php echo htmlspecialchars(getItemFieldValue($spec, 'label', 'N/A')); ?></span>
          <span class="spec-val"><?php echo htmlspecialchars(getItemFieldValue($spec, 'value', 'N/A')); ?></span>
        </div>
        <?php endforeach; ?>
      </div>
      <div class="spec-group">
        <div class="spec-group-title">// Display</div>
        <?php foreach ($displaySpecs as $spec): ?>
        <div class="spec-row">
          <span class="spec-key"><?php echo htmlspecialchars(getItemFieldValue($spec, 'label', 'N/A')); ?></span>
          <span class="spec-val"><?php echo htmlspecialchars(getItemFieldValue($spec, 'value', 'N/A')); ?></span>
        </div>
        <?php endforeach; ?>
      </div>
    </div>
    <div>
      <div class="spec-group">
        <div class="spec-group-title">// Specificaties</div>
        <?php foreach ($ruggedSpecs as $spec): ?>
        <div class="spec-row">
          <span class="spec-key"><?php echo htmlspecialchars(getItemFieldValue($spec, 'label', 'N/A')); ?></span>
          <span class="spec-val"><?php echo htmlspecialchars(getItemFieldValue($spec, 'value', 'N/A')); ?></span>
        </div>
        <?php endforeach; ?>
      </div>
      <div class="spec-group">
        <div class="spec-group-title">// Connectiviteit &amp; Batterij</div>
        <?php foreach ($connectivitySpecs as $spec): ?>
        <div class="spec-row">
          <span class="spec-key"><?php echo htmlspecialchars(getItemFieldValue($spec, 'label', 'N/A')); ?></span>
          <span class="spec-val"><?php echo htmlspecialchars(getItemFieldValue($spec, 'value', 'N/A')); ?></span>
        </div>
        <?php endforeach; ?>
      </div>
    </div>
  </div>
</section>
 
<!-- GALLERY -->
<section id="gallery">
  <span class="section-label"><?php echo getBlockFieldValue($galleryBlock, 'section_label', '04 // Gallery'); ?></span>
  <h2 class="section-title"><?php echo getBlockFieldValue($galleryBlock, 'title', 'IN HET VELD GETEST'); ?></h2>
  <div class="divider"></div>
  <div class="gallery-grid">
    <?php 
    $galleryItems = getBlockItems($galleryBlock);
    foreach ($galleryItems as $item): 
      $galleryImage = getAssetUrl(getItemFieldValue($item, 'image_url'));
      if (!$galleryImage) continue;
    ?>
    <div class="gallery-item">
      <img src="<?php echo htmlspecialchars($galleryImage); ?>" alt="<?php echo htmlspecialchars(getItemFieldValue($item, 'alt_text', 'Gallery image')); ?>">
    </div>
    <?php endforeach; ?>
  </div>
</section>
 
<!-- DOWNLOADS -->
<section id="downloads">
  <span class="section-label"><?php echo getBlockFieldValue($downloadsBlock, 'section_label', '05 // Downloads'); ?></span>
  <h2 class="section-title"><?php echo getBlockFieldValue($downloadsBlock, 'title', 'DOCUMENTEN & DOWNLOADS'); ?></h2>
  <div class="divider"></div>
  <div class="downloads-grid">
    <?php 
    $downloadItems = getBlockItems($downloadsBlock);
    foreach ($downloadItems as $item): 
    ?>
    <a href="<?php echo htmlspecialchars(getItemFieldValue($item, 'file_url', '#')); ?>" class="download-card">
      <div class="dl-icon">&#8595;</div>
      <div>
        <div class="dl-name"><?php echo htmlspecialchars(getItemFieldValue($item, 'title')); ?></div>
        <div class="dl-type"><?php echo htmlspecialchars(getItemFieldValue($item, 'category') . ' // ' . getItemFieldValue($item, 'meta')); ?></div>
      </div>
    </a>
    <?php endforeach; ?>
  </div>
</section>
 
<!-- OFFERTE CTA -->
<section id="offerte">
  <div class="offerte-text">
    <h2><?php echo htmlspecialchars(getBlockFieldValue($ctaBlock, 'title', 'KLAAR VOOR DEPLOYMENT?')); ?></h2>
    <p><?php echo htmlspecialchars(getBlockFieldValue($ctaBlock, 'subtitle', 'Vraag een offerte aan of neem contact op.')); ?></p>
  </div>
  <form id="quote-form" class="quote-form" autocomplete="off">
    <div class="quote-form-grid">
      <label><span>Naam *</span><input type="text" name="name" placeholder="Je volledige naam" required></label>
      <label><span>Bedrijf</span><input type="text" name="company" placeholder="Bedrijfsnaam"></label>
      <label><span>E-mail *</span><input type="email" name="email" placeholder="naam@bedrijf.nl" required></label>
      <label><span>Telefoon</span><input type="tel" name="phone" placeholder="+31 6 1234 5678"></label>
      <label><span>Model *</span><input type="text" name="model" value="Toughbook 40" required></label>
      <label><span>Aantal *</span><input type="number" name="quantity" min="1" placeholder="Bijv. 10" required></label>
      <label class="quote-form-message"><span>Bericht *</span><textarea name="message" rows="5" placeholder="Waar heeft u een offerte voor nodig?" required></textarea></label>
    </div>
    <button type="submit" class="btn-dark"><?php echo htmlspecialchars(getBlockFieldValue($ctaBlock, 'button_text', 'Vraag Offerte Aan')); ?></button>
    <p id="quote-form-status" class="quote-form-status" aria-live="polite"></p>
  </form>
  <a href="mailto:<?php echo htmlspecialchars(getBlockFieldValue($ctaBlock, 'email_value', 'info@toughbook.nl')); ?>" class="btn-dark"><?php echo htmlspecialchars(getBlockFieldValue($ctaBlock, 'button_text', 'Vraag Offerte Aan →')); ?></a>
</section>
 
<!-- FOOTER -->
<footer>
  <div class="footer-brand"><?php echo htmlspecialchars(getBlockFieldValue($sharedFooterBlock, 'logo_text', 'TOUGHBOOK')); ?> <span>// NETWORK</span></div>
  <div class="footer-columns">
    <?php
    $footerItems = getBlockItems($sharedFooterBlock);
    foreach ($footerItems as $column):
      if (($column['itemType'] ?? '') !== 'footer_column') continue;
      $columnSort = (int) ($column['sortOrder'] ?? 0);
    ?>
    <div class="footer-col">
      <div class="footer-col-title"><?php echo htmlspecialchars(getItemFieldValue($column, 'title')); ?></div>
      <?php foreach ($footerItems as $link): ?>
        <?php if (($link['itemType'] ?? '') !== 'footer_link' || (int) floor(((int) ($link['sortOrder'] ?? 0)) / 10) !== $columnSort) continue; ?>
        <a href="<?php echo htmlspecialchars(getItemFieldValue($link, 'url', '#')); ?>"><?php echo htmlspecialchars(getItemFieldValue($link, 'text')); ?></a>
      <?php endforeach; ?>
    </div>
    <?php endforeach; ?>
  </div>
  <div class="footer-copy"><?php echo htmlspecialchars(getBlockFieldValue($sharedFooterBlock, 'copyright', date('Y') . ' Panasonic. All rights reserved.')); ?></div>
</footer>

<script>
const quoteForm = document.getElementById('quote-form');
const quoteStatus = document.getElementById('quote-form-status');

if (quoteForm) {
  quoteForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const submitButton = quoteForm.querySelector('button[type="submit"]');
    const formData = new FormData(quoteForm);
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
      quoteStatus.textContent = 'Vul je naam, e-mail, model, aantal en bericht in.';
      quoteStatus.className = 'quote-form-status quote-form-status--error';
      return;
    }

    submitButton.disabled = true;
    quoteStatus.textContent = 'Verzenden...';
    quoteStatus.className = 'quote-form-status quote-form-status--info';

    try {
      const response = await fetch('http://127.0.0.1:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Server error');
      }

      quoteStatus.textContent = data.message || 'Je aanvraag is verzonden.';
      quoteStatus.className = 'quote-form-status quote-form-status--success';
      quoteForm.reset();
    } catch (error) {
      quoteStatus.textContent = 'Verzenden mislukt. Probeer het later opnieuw.';
      quoteStatus.className = 'quote-form-status quote-form-status--error';
    } finally {
      submitButton.disabled = false;
    }
  });
}
</script>
 
<a href="../../Soufian-English/" class="lang-switch" title="Switch to English"><img src="https://flagcdn.com/w40/gb.png" width="28" height="20" alt="English" /></a>
</body>
</html>

