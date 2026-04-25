import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
	const sharedEnv = loadEnv(mode, path.resolve(__dirname, "../shared"), "");
	const localEnv = loadEnv(mode, __dirname, "");
	const env = { ...sharedEnv, ...localEnv }; // local wins
	const VITE_MODULE = env.VITE_MODULE;
	const CI3_BASE = env.VITE_CI3_BASE;
	const DEV_PORT = Number(env.VITE_DEV_PORT ?? 5173);
	const NODE_ENV = env.NODE_ENV;
	return {
		plugins: [react()],
		base: NODE_ENV === "production" ? `${CI3_BASE}/${VITE_MODULE}/` : undefined,
		define: {
			// Expose merged env to import.meta.env
			...Object.fromEntries(
				Object.entries(env)
					.filter(([k]) => k.startsWith("VITE_"))
					.map(([k, v]) => [`import.meta.env.${k}`, JSON.stringify(v)]),
			),
		},

		server: {
			port: DEV_PORT,
			strictPort: true,
			proxy: {
				[`${CI3_BASE}/api`]: {
					target: "http://localhost",
					changeOrigin: true,
				},
			},
		},

		resolve: {
			alias: {
				"@shared": path.resolve(__dirname, "../shared"),
				"react-router-dom": path.resolve(
					__dirname,
					"node_modules/react-router-dom",
				),
				react: path.resolve(__dirname, "node_modules/react"),
				"react-dom": path.resolve(__dirname, "node_modules/react-dom"),
			},
		},

		build: {
			outDir: "../../react-assets/admin",
			emptyOutDir: true,
			manifest: true,
			rollupOptions: {
				input: path.resolve(__dirname, "index.html"),
			},
		},
	};
});
