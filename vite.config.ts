import { defineConfig } from 'vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
    cacheDir: 'vite_cache',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    }
});
