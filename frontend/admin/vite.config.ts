import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const CI3_BASE = "/ragu/codeigniter-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],

	base: `${CI3_BASE}/admin/`,
	server: {
		proxy: {
			[`${CI3_BASE}/api`]: {
				target: "http://localhost",
				changeOrigin: true,
			},
		},
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
});
