import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
	const serverEnvDir = path.resolve(process.cwd(), '../server');
	const env = loadEnv(mode, serverEnvDir, '');
	const serverPort = env.PORT || '3000';

	return {
		plugins: [tailwindcss(), sveltekit()],
		server: {
			proxy: {
				'/api': `http://localhost:${serverPort}`
			}
		}
	};
});
