import { defineConfig } from 'rolldown';

export default defineConfig({
    input: 'src/main.ts',
    treeshake: true,
    platform: 'node',
    tsconfig: './tsconfig.json',
    output: {
        dir: 'dist',
        codeSplitting: true,
        sourcemap: 'inline',
        strict: true,
        comments: false,
        minifyInternalExports: true,
    },
});
