import { defineConfig } from 'vite';
import path from 'path';
import svgr from 'vite-plugin-svgr';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
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
