import { defineConfig } from 'rolldown';

// oxlint-disable-next-line import/no-default-export
export default defineConfig({
    input: 'src/main.ts',
    treeshake: true,
    platform: 'node',
    tsconfig: './tsconfig.json',
    moduleTypes: {
        '.node': 'binary',
    },
    output: {
        file: 'dist/main.js',
        codeSplitting: false,
        sourcemap: 'inline',
        strict: true,
        comments: false,
        minifyInternalExports: true,
    },
});
