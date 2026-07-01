<?php
/**
 * CMS API Configuration & Helpers
 */

// Backend API base URL
define('API_BASE_URL', 'http://localhost:3000/api');
define('CACHE_DIR', __DIR__ . '/cache');

// Ensure cache directory exists
if (!is_dir(CACHE_DIR)) {
    mkdir(CACHE_DIR, 0755, true);
}

/**
 * Fetch content from CMS API with caching
 * 
 * @param string $endpoint API endpoint (e.g., 'content/by-domain/toughbook')
 * @param int $cacheTTL Cache time to live in seconds (0 = no cache)
 * @return array|null Content data or null on failure
 */
function getContentFromAPI($endpoint, $cacheTTL = 0) {
    $cacheFile = CACHE_DIR . '/' . md5($endpoint) . '.json';
    
    // Try to get from cache
    if ($cacheTTL > 0 && file_exists($cacheFile)) {
        $cacheTime = filemtime($cacheFile);
        if ((time() - $cacheTime) < $cacheTTL) {
            return json_decode(file_get_contents($cacheFile), true);
        }
    }
    
    // Fetch from API
    $url = API_BASE_URL . '/' . $endpoint;
    
    if (function_exists('curl_init')) {
        $ch = curl_init();
        curl_setopt_array($ch, [
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 5,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_SSL_VERIFYPEER => false,
        ]);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
    } else {
        $context = stream_context_create([
            'http' => [
                'timeout' => 5,
                'ignore_errors' => true,
            ],
        ]);
        $response = @file_get_contents($url, false, $context);
        $httpCode = 0;

        foreach ($http_response_header ?? [] as $header) {
            if (preg_match('/^HTTP\/\S+\s+(\d{3})/', $header, $matches)) {
                $httpCode = (int) $matches[1];
                break;
            }
        }
    }
    
    if ($httpCode !== 200) {
        error_log("API Error: $endpoint returned HTTP $httpCode");
        return null;
    }
    
    $data = json_decode($response, true);
    
    // Cache the response
    if ($cacheTTL > 0 && $data) {
        file_put_contents($cacheFile, json_encode($data));
    }
    
    return $data;
}

/**
 * Get block content by type and website
 * 
 * @param array $content Website content tree
 * @param string $blockType Block type name (e.g., 'hero', 'features')
 * @return array|null Block data or null if not found
 */
function getBlockByType($content, $blockType) {
    if (isset($content['website'])) {
        $content = $content['website'];
    }

    if (!$content || !isset($content['blocks'])) {
        return null;
    }

    $blockTypeAliases = [
        'hero' => 'hero_block',
        'features' => 'features_block',
        'sectors' => 'werksectoren_block',
        'specs' => 'specifications_block',
        'gallery' => 'gallery_block',
        'downloads' => 'downloads_block',
        'cta' => 'quote_form_block',
        'footer' => 'footer_block',
        'navbar' => 'navbar_block',
    ];
    $targetBlockType = $blockTypeAliases[$blockType] ?? $blockType;
    
    foreach ($content['blocks'] as $block) {
        if ($block['blockTypeName'] === $targetBlockType) {
            return $block;
        }
    }
    
    return null;
}

/**
 * Get field value from block
 * 
 * @param array $block Block data
 * @param string $fieldName Field name to retrieve
 * @param string $default Default value if not found
 * @return string Field value
 */
function getBlockFieldValue($block, $fieldName, $default = '') {
    if (!$block || !isset($block['fields'])) {
        return $default;
    }
    
    foreach ($block['fields'] as $field) {
        if ($field['fieldName'] === $fieldName) {
            return $field['fieldValue'];
        }
    }
    
    return $default;
}

/**
 * Get all items from block (for lists like features, sectors)
 * 
 * @param array $block Block data
 * @return array Items array
 */
function getBlockItems($block) {
    return $block['items'] ?? [];
}

/**
 * Get field value from block item
 * 
 * @param array $item Block item data
 * @param string $fieldName Field name to retrieve
 * @param string $default Default value if not found
 * @return string Field value
 */
function getItemFieldValue($item, $fieldName, $default = '') {
    if (!isset($item['fields'])) {
        return $default;
    }
    
    foreach ($item['fields'] as $field) {
        if ($field['fieldName'] === $fieldName) {
            return $field['fieldValue'];
        }
    }
    
    return $default;
}

/**
 * Convert CMS image paths from the original site into paths available in this project.
 *
 * @param string $url CMS image path
 * @param string $fallback Local fallback image path
 * @return string
 */
function getAssetUrl($url, $fallback = '') {
    $filename = basename((string) $url);
    $legacyImageMap = [
        'toughbook-40-hero.jpg' => 'toughbook-hero.jpg',
        'toughbook-gallery-1.jpg' => 'toughbook-1.jpg',
        'toughbook-gallery-2.jpg' => 'toughbook-2.jpg',
        'toughbook-gallery-3.jpg' => 'toughbook-3.jpg',
        'toughbook-gallery-4.jpg' => 'toughbook-4.jpg',
    ];

    $resolvedFilename = $legacyImageMap[$filename] ?? $filename;
    $projectImagePath = __DIR__ . '/images/' . $resolvedFilename;

    if ($resolvedFilename && file_exists($projectImagePath)) {
        return '/Soufian/images/' . $resolvedFilename;
    }

    return $fallback;
}
?>
