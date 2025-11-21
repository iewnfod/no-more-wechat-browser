import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
import obfuscatorPlugin from "vite-plugin-javascript-obfuscator";
import {viteSingleFile} from "vite-plugin-singlefile";

const env = loadEnv("", ".", [
    "BG_URL",
    "CHECK_HTTPS",
    "ALLOW_DOMAINS",
    "SHOW_GITHUB",
    "FAVICON_URL",
    "HTTPS_AUTO_UPGRADE"
]);

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        obfuscatorPlugin({
            apply: "build",
            options: {
                compact: true,
                controlFlowFlattening: true,
                controlFlowFlatteningThreshold: 1,
                deadCodeInjection: true,
                deadCodeInjectionThreshold: 1,
                debugProtection: true,
                debugProtectionInterval: 4000,
                disableConsoleOutput: true,
                identifierNamesGenerator: 'hexadecimal',
                log: false,
                numbersToExpressions: true,
                renameGlobals: false,
                selfDefending: true,
                simplify: true,
                splitStrings: true,
                splitStringsChunkLength: 5,
                stringArray: true,
                stringArrayCallsTransform: true,
                stringArrayEncoding: ['rc4'],
                stringArrayIndexShift: true,
                stringArrayRotate: true,
                stringArrayShuffle: true,
                stringArrayWrappersCount: 5,
                stringArrayWrappersChainedCalls: true,    
                stringArrayWrappersParametersMaxCount: 5,
                stringArrayWrappersType: 'function',
                stringArrayThreshold: 1,
                transformObjectKeys: true,
                unicodeEscapeSequence: false
            }
        }),
        viteSingleFile()
    ],
    define: {
        'import.meta.env.BG_URL': JSON.stringify(env.BG_URL),
        'import.meta.env.CHECK_HTTPS': JSON.stringify(env.CHECK_HTTPS),
        'import.meta.env.ALLOW_DOMAINS': JSON.stringify(env.ALLOW_DOMAINS),
        'import.meta.env.SHOW_GITHUB': JSON.stringify(env.SHOW_GITHUB),
        'import.meta.env.FAVICON_URL': JSON.stringify(env.FAVICON_URL),
        'import.meta.env.HTTPS_AUTO_UPGRADE': JSON.stringify(env.HTTPS_AUTO_UPGRADE),
    }
});
