<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * react_helper
 *
 * Reads Vite's manifest.json to output cache-busted <script> and <link>
 * tags for a given React module's built assets.
 *
 * Usage (inside a CI3 view):
 *   react_assets('admin');   // outputs <link> + <script> tags
 *
 * In development:  loads from Vite dev server (hot reload)
 * In production:   loads from react-assets/{module}/manifest.json
 */

// ----------------------------------------------------------------

/**
 * Output <link> and <script> tags for a React module.
 *
 * @param string $module  'admin' or 'report'
 */
function react_assets(string $module)
{   
    // react_assets_prod($module);
    if (ENVIRONMENT === 'development') {
        react_assets_dev($module);
    } else {
        react_assets_prod($module);
    }
}

// ----------------------------------------------------------------

/**
 * Dev mode: point directly at Vite dev server.
 * The base URL per module matches vite.config.ts `base` setting.
 */
function react_assets_dev(string $module)
{
    $ports = [
        'admin'  => 5173,
        'report' => 5174,
    ];

    $port = $ports[$module] ?? 5173;
    $base = base_url();

    // Strip trailing slash and extract just the path portion for the base
    $parsed   = parse_url($base);
    $basePath = rtrim($parsed['path'] ?? '', '/');

    $vite_base = "http://localhost:{$port}{$basePath}/{$module}";

    // Vite client (HMR) + app entry point
    echo '<script type="module" src="http://localhost:' . $port . '/@vite/client"></script>' . "\n";
    echo '<script type="module" src="' . $vite_base . '/src/main.tsx"></script>' . "\n";
}

// ----------------------------------------------------------------

/**
 * Production mode: read manifest.json and output hashed asset paths.
 */
function react_assets_prod(string $module)
{
    $manifest_path = FCPATH . 'react-assets/' . $module . '/.vite/manifest.json';

    if ( ! file_exists($manifest_path)) {
        echo "<!-- react-assets/{$module}/.vite/manifest.json not found. Run: npm run build -->\n";
        return;
    }

    $manifest = json_decode(file_get_contents($manifest_path), true);

    if ( ! $manifest) {
        echo "<!-- Could not parse manifest.json for module: {$module} -->\n";
        return;
    }

    // The entry point key in Vite's manifest (matches rollupOptions.input)
    $entry_key = 'index.html';

    if ( ! isset($manifest[$entry_key])) {
        echo "<!-- Entry '{$entry_key}' not found in manifest for module: {$module} -->\n";
        return;
    }

    $entry = $manifest[$entry_key];

    // CSS
    if ( ! empty($entry['css'])) {
        foreach ($entry['css'] as $css_file) {
            $href = base_url("react-assets/{$module}/{$css_file}");
            echo '<link rel="stylesheet" href="' . $href . '">' . "\n";
        }
    }

    // JS
    $js_file = $entry['file'];
    $src     = base_url("react-assets/{$module}/{$js_file}");
    echo '<script type="module" src="' . $src . '"></script>' . "\n";
}
