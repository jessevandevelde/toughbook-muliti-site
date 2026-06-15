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

// Hero section data
$page_title = getBlockFieldValue($heroBlock, 'page_title', 'Panasonic Toughbook 40 MK2');
$hero_badge = getBlockFieldValue($heroBlock, 'badge', 'MISSION CRITICAL // MK-2 DEPLOYMENT');
$hero_h1_main = getBlockFieldValue($heroBlock, 'heading_main', 'ENGINEERED FOR');
$hero_h1_accent = getBlockFieldValue($heroBlock, 'heading_accent', 'EXTREME');
$hero_h1_secondary = getBlockFieldValue($heroBlock, 'heading_secondary', 'FRONTIERS');
$hero_description = getBlockFieldValue($heroBlock, 'description', 'De Panasonic Toughbook 40 MK2 &mdash; het meest veelzijdige 14" volledig robuuste werkstation ooit gebouwd.');
$hero_cta_primary = getBlockFieldValue($heroBlock, 'cta_primary_text', 'Vraag Offerte Aan');
$hero_cta_secondary = getBlockFieldValue($heroBlock, 'cta_secondary_text', 'Bekijk Specs');
$hero_image = getBlockFieldValue($heroBlock, 'image_url', '../images/toughbook-hero.jpg');
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
  <a href="#hero" class="nav-brand"><?php echo getBlockFieldValue($footerBlock, 'brand', 'TOUGHBOOK'); ?> <span>// <?php echo getBlockFieldValue($footerBlock, 'brand_accent', '40'); ?></span></a>
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
    <h2 class="section-title"><?php echo getBlockFieldValue($featuresBlock, 'heading', 'GEBOUWD VOOR'); ?><br><span class="accent"><?php echo getBlockFieldValue($featuresBlock, 'heading_accent', 'ZWAARSTE OMSTANDIGHEDEN'); ?></span></h2>
    <div class="divider"></div>
    <p style="color:var(--text);font-size:.9rem;line-height:1.7;">
      <?php echo getBlockFieldValue($featuresBlock, 'description', 'De Toughbook 40 MK2 combineert militaire robuustheid met enterprise performance. Elk onderdeel is ontworpen om te overleven waar andere laptops falen.'); ?>
    </p>
  </div>
  <div class="features-grid">
    <?php 
    $featureItems = getBlockItems($featuresBlock);
    foreach ($featureItems as $feature): 
    ?>
    <div class="feature-card">
      <div class="feature-icon"><?php echo getItemFieldValue($feature, 'icon', '&#9673;'); ?></div>
      <div class="feature-title"><?php echo htmlspecialchars(getItemFieldValue($feature, 'title')); ?></div>
      <p class="feature-text"><?php echo htmlspecialchars(getItemFieldValue($feature, 'description')); ?></p>
    </div>
    <?php endforeach; ?>
  </div>
</section>
 
<!-- SECTOREN -->
<section id="sectoren">
  <span class="section-label">02 // Sectoren</span>
  <h2 class="section-title"><?php echo getBlockFieldValue($sectorsBlock, 'heading', 'INGEZET IN'); ?><br><span class="accent"><?php echo getBlockFieldValue($sectorsBlock, 'heading_accent', 'ELKE SECTOR'); ?></span></h2>
  <div class="divider"></div>
  <div class="sectoren-grid">
    <?php 
    $sectorItems = getBlockItems($sectorsBlock);
    foreach ($sectorItems as $sector): 
    ?>
    <div class="sector-card">
      <span class="sector-num">// <?php echo htmlspecialchars(getItemFieldValue($sector, 'number')); ?></span>
      <div class="sector-name"><?php echo htmlspecialchars(getItemFieldValue($sector, 'title')); ?></div>
      <p class="sector-desc"><?php echo htmlspecialchars(getItemFieldValue($sector, 'description')); ?></p>
    </div>
    <?php endforeach; ?>
  </div>
</section>
 
<!-- SPECS -->
<section id="specs">
  <span class="section-label"><?php echo getBlockFieldValue($specsBlock, 'section_label', '03 // Specificaties'); ?></span>
  <h2 class="section-title"><?php echo getBlockFieldValue($specsBlock, 'title', 'TECHNISCHE'); ?><br><span class="accent"><?php echo getBlockFieldValue($specsBlock, 'title_accent', 'SPECIFICATIES'); ?></span></h2>
  <div class="divider"></div>
  <div class="specs-layout">
    <div>
      <?php 
      $specItems = getBlockItems($specsBlock);
      
      // Group specs by category
      $processorSpecs = [];
      $displaySpecs = [];
      $ruggedSpecs = [];
      $connectivitySpecs = [];
      
      foreach ($specItems as $spec) {
        $category = getItemFieldValue($spec, 'category', 'other');
        if ($category === 'processor') $processorSpecs[] = $spec;
        elseif ($category === 'display') $displaySpecs[] = $spec;
        elseif ($category === 'rugged') $ruggedSpecs[] = $spec;
        elseif ($category === 'connectivity') $connectivitySpecs[] = $spec;
      }
      ?>
      <div class="spec-group">
        <div class="spec-group-title">// Processor &amp; Geheugen</div>
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
        <div class="spec-group-title">// Robuustheid</div>
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
  <h2 class="section-title"><?php echo getBlockFieldValue($galleryBlock, 'title', 'IN HET'); ?><br><span class="accent"><?php echo getBlockFieldValue($galleryBlock, 'title_accent', 'VELD GETEST'); ?></span></h2>
  <div class="divider"></div>
  <div class="gallery-grid">
    <?php 
    $galleryItems = getBlockItems($galleryBlock);
    foreach ($galleryItems as $item): 
    ?>
    <div class="gallery-item">
      <img src="<?php echo htmlspecialchars(getItemFieldValue($item, 'image_url')); ?>" alt="<?php echo htmlspecialchars(getItemFieldValue($item, 'alt_text', 'Gallery image')); ?>">
    </div>
    <?php endforeach; ?>
  </div>
</section>
 
<!-- DOWNLOADS -->
<section id="downloads">
  <span class="section-label"><?php echo getBlockFieldValue($downloadsBlock, 'section_label', '05 // Downloads'); ?></span>
  <h2 class="section-title"><?php echo getBlockFieldValue($downloadsBlock, 'title', 'DOCUMENTEN &'); ?><br><span class="accent"><?php echo getBlockFieldValue($downloadsBlock, 'title_accent', 'DOWNLOADS'); ?></span></h2>
  <div class="divider"></div>
  <div class="downloads-grid">
    <?php 
    $downloadItems = getBlockItems($downloadsBlock);
    foreach ($downloadItems as $item): 
    ?>
    <a href="<?php echo htmlspecialchars(getItemFieldValue($item, 'file_url', '#')); ?>" class="download-card">
      <div class="dl-icon">&#8595;</div>
      <div>
        <div class="dl-name"><?php echo htmlspecialchars(getItemFieldValue($item, 'name')); ?></div>
        <div class="dl-type"><?php echo htmlspecialchars(getItemFieldValue($item, 'file_type') . ' // ' . getItemFieldValue($item, 'file_size')); ?></div>
      </div>
    </a>
    <?php endforeach; ?>
  </div>
</section>
 
<!-- OFFERTE CTA -->
<section id="offerte">
  <div class="offerte-text">
    <h2><?php echo htmlspecialchars(getBlockFieldValue($ctaBlock, 'title', 'KLAAR VOOR DEPLOYMENT?')); ?></h2>
    <p><?php echo htmlspecialchars(getBlockFieldValue($ctaBlock, 'description', 'Vraag een offerte aan of neem contact op.')); ?></p>
  </div>
  <a href="<?php echo htmlspecialchars(getBlockFieldValue($ctaBlock, 'cta_url', 'mailto:info@toughbook.nl')); ?>" class="btn-dark"><?php echo htmlspecialchars(getBlockFieldValue($ctaBlock, 'cta_text', 'Vraag Offerte Aan →')); ?></a>
</section>
 
<!-- FOOTER -->
<footer>
  <div class="footer-brand"><?php echo htmlspecialchars(getBlockFieldValue($footerBlock, 'brand', 'TOUGHBOOK')); ?> <span>// <?php echo htmlspecialchars(getBlockFieldValue($footerBlock, 'brand_accent', '40 MK2')); ?></span></div>
  <div class="footer-copy">&copy; <?php echo date('Y'); ?> <?php echo htmlspecialchars(getBlockFieldValue($footerBlock, 'copyright', 'PANASONIC CONNECT • ALLE RECHTEN VOORBEHOUDEN')); ?></div>
</footer>
 
</body>
</html>