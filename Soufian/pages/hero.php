<?php
// Load CMS API helpers
require_once __DIR__ . '/../api-config.php';

// Fetch content from backend CMS
$websiteContent = getContentFromAPI('content/by-domain/souf.nl');

// Extract all blocks
$heroBlock = getBlockByType($websiteContent, 'hero');
$featuresBlock = getBlockByType($websiteContent, 'features');
$sectorsBlock = getBlockByType($websiteContent, 'sectors');
$specsBlock = getBlockByType($websiteContent, 'specs');
$galleryBlock = getBlockByType($websiteContent, 'gallery');
$downloadsBlock = getBlockByType($websiteContent, 'downloads');
$ctaBlock = getBlockByType($websiteContent, 'cta');
$footerBlock = getBlockByType($websiteContent, 'footer');
$navbarBlock = getBlockByType($websiteContent, 'navbar');

// Hero section data
$page_title = getBlockFieldValue($heroBlock, 'page_title', 'Panasonic Toughbook 40 MK2');
$hero_badge = getBlockFieldValue($heroBlock, 'label', 'MISSION CRITICAL // MK-2 DEPLOYMENT');
$hero_h1_main = getBlockFieldValue($heroBlock, 'title', 'ENGINEERED FOR EXTREME FRONTIERS');
$hero_h1_accent = '';
$hero_h1_secondary = '';
$hero_description = getBlockFieldValue($heroBlock, 'subtitle', 'De Toughbook 40 MK2 &mdash; het meest veelzijdige 14" volledig robuuste werkstation ooit gebouwd.');
$hero_cta_primary = getBlockFieldValue($heroBlock, 'primary_button_text', 'Vraag Offerte Aan');
$hero_cta_secondary = getBlockFieldValue($heroBlock, 'secondary_button_text', 'Bekijk Specs');
$hero_image = getAssetUrl(getBlockFieldValue($heroBlock, 'image_url'), '/Soufian/images/toughbook-hero.jpg');
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
    ?>
    <div class="gallery-item">
      <img src="<?php echo htmlspecialchars(getAssetUrl(getItemFieldValue($item, 'image_url'), '/Soufian/images/toughbook-1.jpg')); ?>" alt="<?php echo htmlspecialchars(getItemFieldValue($item, 'label', 'Gallery image')); ?>">
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
  <a href="mailto:<?php echo htmlspecialchars(getBlockFieldValue($ctaBlock, 'email_value', 'info@toughbook.nl')); ?>" class="btn-dark"><?php echo htmlspecialchars(getBlockFieldValue($ctaBlock, 'button_text', 'Vraag Offerte Aan →')); ?></a>
</section>
 
<!-- FOOTER -->
<footer>
  <div class="footer-brand"><?php echo htmlspecialchars(getBlockFieldValue($footerBlock, 'logo_text', 'TOUGHBOOK')); ?> <span>// <?php echo htmlspecialchars(getBlockFieldValue($footerBlock, 'model_text', '40 MK2')); ?></span></div>
  <div class="footer-copy"><?php echo htmlspecialchars(getBlockFieldValue($footerBlock, 'copyright', '© ' . date('Y') . ' PANASONIC CONNECT • ALLE RECHTEN VOORBEHOUDEN')); ?></div>
</footer>
 
</body>
</html>
