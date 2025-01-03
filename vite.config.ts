import { defineConfig } from 'vite';
import path from 'path';
import svgr from 'vite-plugin-svgr';
import viteCompression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';

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
        }),
        visualizer({
            filename: 'stats.html',
            open: true,
            gzipSize: true
        })
    ]
});
