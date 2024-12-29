import { defineConfig } from 'vite';
import path from 'path';
import svgr from 'vite-plugin-svgr';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
    build: {
        rollupOptions: {
            external: [/\.stories\.(t|j)sx?$/, /\.story\.(t|j)sx?$/]
        }
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    esbuild: {
        drop: ['console', 'debugger']
    },
    plugins: [
        svgr(),
        viteCompression({
            algorithm: 'gzip',
            ext: '.gz'
        })
    ]
});
