import { defineConfig } from 'vite';
import path from 'path';
import removeConsole from 'vite-plugin-remove-console';

// command 매개변수 추가
export default defineConfig(({ command }) => ({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    plugins: [
        command === 'build' &&
            removeConsole({
                includes: ['log', 'warn', 'error']
            })
    ].filter(Boolean)
}));
