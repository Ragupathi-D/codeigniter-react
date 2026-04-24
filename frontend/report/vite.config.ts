import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// The CI3 sub-directory path (must match config.php base_url path segment)
const CI3_BASE = '/ragu/codeigniter-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // Base public path — must match the URL prefix Apache/CI3 serves this app on
  base: `${CI3_BASE}/report/`,

  server: {
    port: 5174,
    strictPort: true,

    // Proxy API calls to CI3 (Apache) so the session cookie works
    proxy: {
      [`${CI3_BASE}/api`]: {
        target: 'http://localhost',
        changeOrigin: false,
      },
    },
  },

  resolve: {
    alias: {
      // Shared code alias
      '@shared': path.resolve(__dirname, '../shared'),
      // Explicit aliases for packages used in frontend/shared/ — Vite/Rolldown
      // resolves imports from a file's own directory upward and would miss
      // node_modules that live in frontend/report (a sibling of shared).
      'react-router-dom': path.resolve(__dirname, 'node_modules/react-router-dom'),
      'react': path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
    },
  },

  build: {
    // Output to react-assets/report/ (relative to project root)
    outDir: '../../react-assets/report',
    emptyOutDir: true,
    manifest: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),
    },
  },
})
