import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'

const env = loadEnv("", ".", [
    "BG_URL",
    "CHECK_HTTPS",
    "ALLOW_DOMAINS",
    "SHOW_GITHUB"
]);

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    define: {
        'import.meta.env.BG_URL': JSON.stringify(env.BG_URL),
        'import.meta.env.CHECK_HTTPS': JSON.stringify(env.CHECK_HTTPS),
        'import.meta.env.ALLOW_DOMAINS': JSON.stringify(env.ALLOW_DOMAINS),
        'import.meta.env.SHOW_GITHUB': JSON.stringify(env.SHOW_GITHUB)
    }
});
