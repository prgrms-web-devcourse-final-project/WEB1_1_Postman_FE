import { defineConfig } from 'vite';
import path from 'path';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    esbuild: {
        drop: ['console', 'debugger']
    },
    plugins: [svgr()]
});
