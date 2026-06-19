// eslint-disable-next-line import-x/no-extraneous-dependencies
import { defineConfig } from 'rolldown';

// eslint-disable-next-line import-x/no-default-export
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
