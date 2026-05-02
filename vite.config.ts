import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    dts({ insertTypesEntry: true }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ArcGaslessReact',
      fileName: (format) => `arc-gasless-react.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@circle-fin/w3s-pw-web-sdk', 'viem'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@circle-fin/w3s-pw-web-sdk': 'CircleW3S',
          'viem': 'Viem'
        },
      },
    },
  },
});
