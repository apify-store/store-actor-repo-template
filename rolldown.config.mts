import { defineConfig } from 'rolldown';

export default defineConfig({
    input: 'src/main.ts',
    platform: 'node',
    tsconfig: './tsconfig.json',
    output: {
        file: 'dist/main.js',
        codeSplitting: false,
        sourcemap: 'inline',
        strict: true,
        comments: false,
        minifyInternalExports: true,
        // minify: true,
    },
});
