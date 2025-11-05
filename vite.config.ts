import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
import obfuscatorPlugin from "vite-plugin-javascript-obfuscator";
import {viteSingleFile} from "vite-plugin-singlefile";

const env = loadEnv("", ".", [
    "BG_URL",
    "CHECK_HTTPS",
    "ALLOW_DOMAINS",
    "SHOW_GITHUB",
    "FAVICON_URL"
]);

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        obfuscatorPlugin({
            apply: "build",
            options: {
                compact: true,
                controlFlowFlattening: false,
                deadCodeInjection: false,
                debugProtection: true,
                debugProtectionInterval: 1,
                disableConsoleOutput: true,
                identifierNamesGenerator: 'hexadecimal',
                log: false,
                numbersToExpressions: false,
                renameGlobals: false,
                selfDefending: false,
                simplify: true,
                splitStrings: true,
                splitStringsChunkLength: 10,
                stringArray: true,
                stringArrayCallsTransform: false,
                stringArrayCallsTransformThreshold: 0.5,
                stringArrayEncoding: [],
                stringArrayIndexShift: true,
                stringArrayRotate: true,
                stringArrayShuffle: true,
                stringArrayWrappersCount: 1,
                stringArrayWrappersChainedCalls: true,
                stringArrayWrappersParametersMaxCount: 2,
                stringArrayWrappersType: 'variable',
                stringArrayThreshold: 0.75,
                transformObjectKeys: false,
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
    }
});
