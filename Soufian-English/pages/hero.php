<?php
header('Cache-Control: no-store, no-cache, must-revalidate, proxy-revalidate');
header('Pragma: no-cache');
header('Expires: 0');

// Load CMS API helpers
require_once __DIR__ . '/../api-config.php';

$language = ($_GET['lang'] ?? 'en') === 'nl' ? 'nl' : 'en';
$websiteDomain = $language === 'en' ? 'toughbook-40-english.nl' : 'toughbook-40-dutch.nl';
$switchLanguage = $language === 'en' ? 'nl' : 'en';
$switchTitle = $language === 'en' ? 'Naar de Nederlandse versie' : 'Switch to English';
$switchFlag = $language === 'en' ? 'nl' : 'gb';
$switchAlt = $language === 'en' ? 'Nederlands' : 'English';
$pageCopy = $language === 'en' ? [
  'nav_features' => '01_FEATURES',
  'nav_sectors' => '02_SECTORS',
  'nav_specs' => '03_SPECS',
  'nav_gallery' => '04_GALLERY',
  'nav_downloads' => '05_DOWNLOADS',
  'features_label' => '01 // Features',
  'gallery_label' => '04 // Gallery',
  'downloads_label' => '05 // Downloads',
  'spec_alt' => 'Gallery image',
] : [
  'nav_features' => '01_KENMERKEN',
  'nav_sectors' => '02_SECTOREN',
  'nav_specs' => '03_SPECIFICATIES',
  'nav_gallery' => '04_GALERIJ',
  'nav_downloads' => '05_DOWNLOADS',
  'features_label' => '01 // Kenmerken',
  'gallery_label' => '04 // Galerij',
  'downloads_label' => '05 // Downloads',
  'spec_alt' => 'Galerij afbeelding',
];
$formCopy = $language === 'en' ? [
  'name_label' => 'Name *',
  'name_placeholder' => 'Your full name',
  'company_label' => 'Company',
  'company_placeholder' => 'Company name',
  'email_label' => 'Email *',
  'email_placeholder' => 'name@company.com',
  'phone_label' => 'Phone',
  'quantity_label' => 'Quantity *',
  'quantity_placeholder' => 'For example 10',
  'message_label' => 'Message *',
  'message_placeholder' => 'What do you need a quote for?',
  'button_text' => 'Request a Quote',
  'required_error' => 'Please fill in your name, email, model, quantity and message.',
  'sending' => 'Sending...',
  'success' => 'Your request has been sent.',
  'failed' => 'Sending failed. Please try again later.',
] : [
  'name_label' => 'Naam *',
  'name_placeholder' => 'Je volledige naam',
  'company_label' => 'Bedrijf',
  'company_placeholder' => 'Bedrijfsnaam',
  'email_label' => 'E-mail *',
  'email_placeholder' => 'naam@bedrijf.nl',
  'phone_label' => 'Telefoon',
  'quantity_label' => 'Aantal *',
  'quantity_placeholder' => 'Bijv. 10',
  'message_label' => 'Bericht *',
  'message_placeholder' => 'Waar heeft u een offerte voor nodig?',
  'button_text' => 'Vraag Offerte Aan',
  'required_error' => 'Vul je naam, e-mail, model, aantal en bericht in.',
  'sending' => 'Verzenden...',
  'success' => 'Je aanvraag is verzonden.',
  'failed' => 'Verzenden mislukt. Probeer het later opnieuw.',
];

// Fetch CMS blocks from backend
$blocks = getBlocksFromBackend($websiteDomain);

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

function getLocalizedBlockFieldValue($block, $fieldName, $language, $default = '') {
    return getBlockFieldValue($block, $fieldName . '_' . $language, getBlockFieldValue($block, $fieldName, $default));
}

function getLocalizedItemFieldValue($item, $fieldName, $language, $default = '') {
    return getItemFieldValue($item, $fieldName . '_' . $language, getItemFieldValue($item, $fieldName, $default));
}

// Hero section data
$page_title = getBlockFieldValue($heroBlock, 'page_title', 'Panasonic Toughbook 40 MK2');
$hero_badge = getBlockFieldValue($heroBlock, 'badge', 'MISSION CRITICAL // MK-2 DEPLOYMENT');
$hero_h1_main = getBlockFieldValue($heroBlock, 'heading_main', 'ENGINEERED FOR');
$hero_h1_accent = getBlockFieldValue($heroBlock, 'heading_accent', 'EXTREME');
$hero_h1_secondary = getBlockFieldValue($heroBlock, 'heading_secondary', 'FRONTIERS');
$hero_description = getBlockFieldValue($heroBlock, 'description', 'The Toughbook 40 MK2 &mdash; the most versatile 14" fully rugged workstation ever built.');
$hero_cta_primary = getBlockFieldValue($heroBlock, 'cta_primary_text', 'Request a Quote');
$hero_cta_secondary = getBlockFieldValue($heroBlock, 'cta_secondary_text', 'View Specs');
$hero_image = getAssetUrl(getBlockFieldValue($heroBlock, 'image_url'), '../images/toughbook-40-hero.jpg');
$spec_sheet_url = getBlockFieldValue($specSheetButtonBlock, 'url');
$spec_sheet_text = getBlockFieldValue($specSheetButtonBlock, 'text');
$spec_sheet_target = getBlockFieldValue($specSheetButtonBlock, 'target', '_blank');
$spec_sheet_download = getBlockFieldValue($specSheetButtonBlock, 'download', 'true');
$price_old = getBlockFieldValue($heroBlock, 'price_old', 'EUR 4,885.00');
$price_new = getBlockFieldValue($heroBlock, 'price_new', 'EUR 4,640.75');

// Get hero stats from items
$heroStats = getBlockItems($heroBlock);
?>
<!DOCTYPE html>
<html lang="<?php echo htmlspecialchars($language); ?>">
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
    <li><a href="#features"><?php echo htmlspecialchars($pageCopy['nav_features']); ?></a></li>
    <li><a href="#sectoren"><?php echo htmlspecialchars($pageCopy['nav_sectors']); ?></a></li>
    <li><a href="#specs"><?php echo htmlspecialchars($pageCopy['nav_specs']); ?></a></li>
    <li><a href="#gallery"><?php echo htmlspecialchars($pageCopy['nav_gallery']); ?></a></li>
    <li><a href="#downloads"><?php echo htmlspecialchars($pageCopy['nav_downloads']); ?></a></li>
  </ul>
  <a href="<?php echo htmlspecialchars(getBlockFieldValue($navbarBlock, 'button_url', '#offerte')); ?>" class="nav-cta"><?php echo htmlspecialchars(getBlockFieldValue($navbarBlock, 'button_text', 'QUOTE')); ?></a>
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
      <span class="price-note">EXCL. VAT &bull; ONLINE PRICE</span>
    </div>
  </div>
</section>
 
<!-- FEATURES -->
<section id="features">
  <div class="features-intro">
    <span class="section-label"><?php echo htmlspecialchars($pageCopy['features_label']); ?></span>
    <h2 class="section-title"><?php echo getBlockFieldValue($featuresBlock, 'title', 'BUILT FOR THE TOUGHEST CONDITIONS'); ?></h2>
    <div class="divider"></div>
    <p style="color:var(--text);font-size:.9rem;line-height:1.7;">
      <?php echo getBlockFieldValue($featuresBlock, 'description', 'The Toughbook 40 MK2 combines military-grade ruggedness with enterprise performance. Every component is designed to survive where other laptops fail.'); ?>
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
 
<!-- SECTORS -->
<section id="sectoren">
  <span class="section-label"><?php echo getBlockFieldValue($sectorsBlock, 'section_label', '02 // Sectors'); ?></span>
  <h2 class="section-title"><?php echo getBlockFieldValue($sectorsBlock, 'title', 'DEPLOYED ACROSS EVERY SECTOR'); ?></h2>
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
  <span class="section-label"><?php echo getBlockFieldValue($specsBlock, 'section_label', '03 // Specifications'); ?></span>
  <h2 class="section-title"><?php echo getBlockFieldValue($specsBlock, 'title', 'TECHNICAL SPECIFICATIONS'); ?></h2>
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
        <div class="spec-group-title">// Specifications</div>
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
        <div class="spec-group-title">// Specifications</div>
        <?php foreach ($ruggedSpecs as $spec): ?>
        <div class="spec-row">
          <span class="spec-key"><?php echo htmlspecialchars(getItemFieldValue($spec, 'label', 'N/A')); ?></span>
          <span class="spec-val"><?php echo htmlspecialchars(getItemFieldValue($spec, 'value', 'N/A')); ?></span>
        </div>
        <?php endforeach; ?>
      </div>
      <div class="spec-group">
        <div class="spec-group-title">// Connectivity &amp; Battery</div>
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
  <span class="section-label"><?php echo getBlockFieldValue($galleryBlock, 'section_label', $pageCopy['gallery_label']); ?></span>
  <h2 class="section-title"><?php echo getBlockFieldValue($galleryBlock, 'title', 'FIELD-TESTED PRODUCT GALLERY'); ?></h2>
  <div class="divider"></div>
  <div class="gallery-grid">
    <?php 
    $galleryItems = getBlockItems($galleryBlock);
    foreach ($galleryItems as $item): 
      $galleryImage = getAssetUrl(getItemFieldValue($item, 'image_url'));
      if (!$galleryImage) continue;
    ?>
    <div class="gallery-item">
      <img src="<?php echo htmlspecialchars($galleryImage); ?>" alt="<?php echo htmlspecialchars(getItemFieldValue($item, 'alt_text', $pageCopy['spec_alt'])); ?>">
    </div>
    <?php endforeach; ?>
  </div>
</section>
 
<!-- DOWNLOADS -->
<section id="downloads">
  <span class="section-label"><?php echo getBlockFieldValue($downloadsBlock, 'section_label', $pageCopy['downloads_label']); ?></span>
  <h2 class="section-title"><?php echo getBlockFieldValue($downloadsBlock, 'title', 'DOCUMENTS & DOWNLOADS'); ?></h2>
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
 
<!-- QUOTE CTA -->
<section id="offerte">
  <div class="offerte-text">
    <h2><?php echo htmlspecialchars(getBlockFieldValue($ctaBlock, 'title', 'READY FOR DEPLOYMENT?')); ?></h2>
    <p><?php echo htmlspecialchars(getBlockFieldValue($ctaBlock, 'subtitle', 'Request a quote or contact us.')); ?></p>
  </div>
  <form id="quote-form" class="quote-form" autocomplete="off">
    <div class="quote-form-grid">
      <label><span><?php echo htmlspecialchars($formCopy['name_label']); ?></span><input type="text" name="name" placeholder="<?php echo htmlspecialchars($formCopy['name_placeholder']); ?>" required></label>
      <label><span><?php echo htmlspecialchars($formCopy['company_label']); ?></span><input type="text" name="company" placeholder="<?php echo htmlspecialchars($formCopy['company_placeholder']); ?>"></label>
      <label><span><?php echo htmlspecialchars($formCopy['email_label']); ?></span><input type="email" name="email" placeholder="<?php echo htmlspecialchars($formCopy['email_placeholder']); ?>" required></label>
      <label><span><?php echo htmlspecialchars($formCopy['phone_label']); ?></span><input type="tel" name="phone" placeholder="+31 6 1234 5678"></label>
      <label><span>Model *</span><input type="text" name="model" value="Toughbook 40" required></label>
      <label><span><?php echo htmlspecialchars($formCopy['quantity_label']); ?></span><input type="number" name="quantity" min="1" placeholder="<?php echo htmlspecialchars($formCopy['quantity_placeholder']); ?>" required></label>
      <label class="quote-form-message"><span><?php echo htmlspecialchars($formCopy['message_label']); ?></span><textarea name="message" rows="5" placeholder="<?php echo htmlspecialchars($formCopy['message_placeholder']); ?>" required></textarea></label>
    </div>
    <button type="submit" class="btn-dark"><?php echo htmlspecialchars(getBlockFieldValue($ctaBlock, 'button_text', $formCopy['button_text'])); ?></button>
    <p id="quote-form-status" class="quote-form-status" aria-live="polite"></p>
  </form>
  <a href="mailto:<?php echo htmlspecialchars(getBlockFieldValue($ctaBlock, 'email_value', 'info@toughbook.nl')); ?>" class="btn-dark"><?php echo htmlspecialchars(getBlockFieldValue($ctaBlock, 'button_text', 'Request a Quote ->')); ?></a>
</section>
 
<!-- FOOTER -->
<footer>
  <div class="footer-brand"><?php echo htmlspecialchars(getLocalizedBlockFieldValue($sharedFooterBlock, 'logo_text', $language, 'TOUGHBOOK')); ?> <span>// <?php echo $language === 'en' ? 'NETWORK' : 'NETWERK'; ?></span></div>
  <div class="footer-columns">
    <?php
    $footerItems = getBlockItems($sharedFooterBlock);
    foreach ($footerItems as $column):
      if (($column['itemType'] ?? '') !== 'footer_column') continue;
      $columnSort = (int) ($column['sortOrder'] ?? 0);
    ?>
    <div class="footer-col">
      <div class="footer-col-title"><?php echo htmlspecialchars(getLocalizedItemFieldValue($column, 'title', $language)); ?></div>
      <?php foreach ($footerItems as $link): ?>
        <?php if (($link['itemType'] ?? '') !== 'footer_link' || (int) floor(((int) ($link['sortOrder'] ?? 0)) / 10) !== $columnSort) continue; ?>
        <a href="<?php echo htmlspecialchars(getLocalizedItemFieldValue($link, 'url', $language, '#')); ?>"><?php echo htmlspecialchars(getLocalizedItemFieldValue($link, 'text', $language)); ?></a>
      <?php endforeach; ?>
    </div>
    <?php endforeach; ?>
  </div>
  <div class="footer-copy"><?php echo htmlspecialchars(getLocalizedBlockFieldValue($sharedFooterBlock, 'copyright', $language, date('Y') . ' Panasonic. All rights reserved.')); ?></div>
</footer>

<script>
const quoteForm = document.getElementById('quote-form');
const quoteStatus = document.getElementById('quote-form-status');
const quoteCopy = <?php echo json_encode($formCopy); ?>;

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
      quoteStatus.textContent = quoteCopy.required_error;
      quoteStatus.className = 'quote-form-status quote-form-status--error';
      return;
    }

    submitButton.disabled = true;
    quoteStatus.textContent = quoteCopy.sending;
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

      quoteStatus.textContent = data.message || quoteCopy.success;
      quoteStatus.className = 'quote-form-status quote-form-status--success';
      quoteForm.reset();
    } catch (error) {
      quoteStatus.textContent = quoteCopy.failed;
      quoteStatus.className = 'quote-form-status quote-form-status--error';
    } finally {
      submitButton.disabled = false;
    }
  });
}
</script>
 
<a href="?lang=<?php echo htmlspecialchars($switchLanguage); ?>" class="lang-switch" title="<?php echo htmlspecialchars($switchTitle); ?>"><img src="https://flagcdn.com/w40/<?php echo htmlspecialchars($switchFlag); ?>.png" width="28" height="20" alt="<?php echo htmlspecialchars($switchAlt); ?>" /></a>
</body>
</html>

