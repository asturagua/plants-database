import {defineConfig} from 'vitest/config';
import {fileURLToPath} from "node:url";

export default defineConfig({
    test: {
        environment: 'node',
        globals: true,
        exclude: ['**/node_modules/**', '**/.git/**', '**/dist/**']
    },
    resolve: {
        alias: {
            '#app': fileURLToPath(new URL('./src/app', import.meta.url)),
        },
    },
});