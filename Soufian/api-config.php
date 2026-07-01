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
 * Request the CMS blocks for a website domain from the backend.
 *
 * @param string $domain Website domain
 * @param int $cacheTTL Cache time to live in seconds (0 = no cache)
 * @return array Website blocks
 */
function getBlocksFromBackend($domain, $cacheTTL = 0) {
    $content = getContentFromAPI('content/by-domain/' . $domain, $cacheTTL);

    return $content['website']['blocks'] ?? [];
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

    if (isset($content[0]['blockTypeName'])) {
        $blocks = $content;
    } elseif (isset($content['blocks'])) {
        $blocks = $content['blocks'];
    } else {
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
    $targetBlockTypes = array_unique([
        $blockType,
        $blockTypeAliases[$blockType] ?? $blockType,
    ]);
    
    foreach ($blocks as $block) {
        if (in_array($block['blockTypeName'], $targetBlockTypes, true)) {
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
 * Return CMS image paths for the frontend.
 *
 * @param string $url CMS image path
 * @param string $fallback Local fallback image path
 * @return string
 */
function getAssetUrl($url, $fallback = '') {
    $url = trim((string) $url);

    if ($url === '') {
        return $fallback;
    }

    if (preg_match('/^https?:\/\//i', $url)) {
        return $url;
    }

    return str_replace('\\', '/', $url);
}
?>
