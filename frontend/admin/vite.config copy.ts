import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// The CI3 sub-directory path (must match config.php base_url path segment)
const CI3_BASE = "/ragu/codeigniter-react";

// https://vite.dev/config/
export default defineConfig(({ command }) => {
	const isDev = command === "serve";
	console.log("command", command);
	return {
		plugins: [react()],

		// In dev use "/" so the browser hits localhost:5173/ directly.
		// In production build use the full sub-path that Apache serves.
		base: isDev ? "/" : `${CI3_BASE}/admin/`,
		proxy: {
			"/api": {
				target: "http://127.0.0.1", // PHP on port 80
				changeOrigin: true,
			},
		},
		server: {
			port: 5173,
			strictPort: true,
			// No proxy needed — in dev the API client calls Apache directly
			// (cross-origin). CI3 returns Access-Control-Allow-Origin +
			// Access-Control-Allow-Credentials so the session cookie is shared.
		},

		resolve: {
			alias: {
				// Shared code alias
				"@shared": path.resolve(__dirname, "../shared"),
				// Explicit aliases for packages used in frontend/shared/ — Vite/Rolldown
				// resolves imports from a file's own directory upward and would miss
				// node_modules that live in frontend/admin (a sibling of shared).
				"react-router-dom": path.resolve(
					__dirname,
					"node_modules/react-router-dom",
				),
				react: path.resolve(__dirname, "node_modules/react"),
				"react-dom": path.resolve(__dirname, "node_modules/react-dom"),
			},
		},

		build: {
			// Output to react-assets/admin/ (relative to project root)
			outDir: "../../react-assets/admin",
			emptyOutDir: true,
			manifest: true,
			rollupOptions: {
				input: path.resolve(__dirname, "index.html"),
			},
		},
	};
});
