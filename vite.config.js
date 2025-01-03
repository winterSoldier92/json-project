import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import checker from 'vite-plugin-checker'
import path, { resolve } from 'path'
import { sync } from 'glob'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig( {
	base:'/json-project/',
	esbuild: {
		jsxFactory: 'create',
		jsxInject: `import {create} from './create'`,
	},
	plugins: [
		Inspect(),
		checker({
			typescript: true,
		}),
		ViteImageOptimizer({
			png: {
				
				quality: 100,
			  },
			  jpeg: {
				
				quality: 100,
			  },
			  jpg: {
				
				quality: 80,
			  },
		  }),
	],
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'index.html'),
				login: resolve(__dirname, 'src/pages/login/login.html'),
			},
			// external:['collect.js']
		},
	},
	envPrefix: 'APP_',

	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
})
