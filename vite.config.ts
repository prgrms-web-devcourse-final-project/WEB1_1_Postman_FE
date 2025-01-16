import { defineConfig } from 'vite';
import path from 'path';
import svgr from 'vite-plugin-svgr';
import viteCompression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ command }) => ({
    build: {
        rollupOptions: {
            // 브라우저 캐시떄문에 해시값 적용
            output: {
                entryFileNames: '[name].[hash].js',
                chunkFileNames: '[name].[hash].js',
                assetFileNames: '[name].[hash].[ext]'
            },
            external: [/\.stories\.(t|j)sx?$/, /\.story\.(t|j)sx?$/]
        }
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    esbuild: {
        drop: command === 'build' ? ['console', 'debugger'] : []
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
}));
