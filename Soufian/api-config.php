<?php
/**
 * CMS API Configuration & Helpers
 */

// Backend API base URL
define('API_BASE_URL', 'http://localhost:3001/api');
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
function getContentFromAPI($endpoint, $cacheTTL = 3600) {
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
    if (!$content || !isset($content['blocks'])) {
        return null;
    }
    
    foreach ($content['blocks'] as $block) {
        if ($block['blockTypeName'] === $blockType) {
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
?>
