<?php
$websiteId = 1;
$websiteDomain = 'jibrail.nl';
$apiBase = 'http://127.0.0.1:3000';
$apiBase = rtrim($apiBase, '/');
?>
<!doctype html>
<html lang="nl">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Toughbook Site</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Manrope:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="assets/css/styles.css" />
</head>

<body>
    <div class="noise" aria-hidden="true"></div>

    <div id="loading" class="loading" aria-live="polite">
        <div class="loading-ring" aria-hidden="true"></div>
        <p class="loading-text">Loading site content...</p>
    </div>

    <main id="content" class="site-main">
        <section id="hero" class="section hero" hidden></section>
        <section id="features" class="section features" hidden></section>
        <section id="specifications" class="section specs" hidden></section>
        <section id="sectors" class="section sectors" hidden></section>
        <section id="contact" class="section contact" hidden></section>
    </main>

    <footer id="footer" class="site-footer" hidden></footer>

    <script>
        window.APP_CONFIG = <?php echo json_encode([
                                'websiteId' => $websiteId,
                                'websiteDomain' => $websiteDomain,
                                'apiBase' => $apiBase,
                            ], JSON_UNESCAPED_SLASHES); ?>;
    </script>
    <script src="assets/js/app.js"></script>
</body>

</html>