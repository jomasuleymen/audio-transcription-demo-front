import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
	test: {
		include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		globals: true,
		environment: 'jsdom',
		isolate: true,
		css: false,
	},
	plugins: [
		react({
			tsDecorators: true,
			devTarget: 'es2023',
		}),
		tsconfigPaths(),
	].filter(Boolean),
	server: {
		port: 5173,
		host: true,
		hmr: {
			overlay: false,
		},
		watch: {
			ignored: ['**/node_modules/**', '**/dist/**', '**/public/**', '**/.git/**'],
		},
	},
	build: {
		target: 'es2023',
		minify: isProd ? 'esbuild' : false,
		sourcemap: !isProd,
		cssCodeSplit: true,
		emptyOutDir: true,
		reportCompressedSize: false,
		chunkSizeWarningLimit: 1500,
	},
	esbuild: {
		target: 'es2023',
		minifyIdentifiers: isProd,
		minifySyntax: isProd,
		minifyWhitespace: isProd,
	},
	define: {
		global: 'window',
	},
	optimizeDeps: {
		esbuildOptions: {
			target: 'es2023',
		},
	},
});
