import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  const CI3_BASE = env.VITE_CI3_BASE || '/ragu/codeigniter-react';
  const DEV_PORT = Number(env.VITE_REPORT_PORT || 5174);

  return {
    plugins: [
      react(),
      {
        name: 'inject-report-entry',
        transformIndexHtml: {
          order: 'pre',
          handler(html) {
            return html.replace(
              '<!-- entry injected by vite config -->',
              '<script type="module" src="/src/main-report.tsx"></script>',
            );
          },
        },
      },
    ],

    base: mode === 'production' ? `${CI3_BASE}/report/` : '/',

    server: {
      port: DEV_PORT,
      strictPort: true,
      proxy: {
        [`${CI3_BASE}/api`]: {
          target: 'http://localhost',
          changeOrigin: true,
        },
      },
    },

    resolve: {
      alias: {
        '@shared': path.resolve(__dirname, 'src/shared'),
      },
    },

    build: {
      outDir: '../react-assets/report',
      emptyOutDir: true,
      manifest: true,
      rollupOptions: {
        input: path.resolve(__dirname, 'index.html'),
      },
    },
  };
});
