import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';
import javascriptObfuscator from 'vite-plugin-javascript-obfuscator';

export default defineConfig({
  build: {
    sourcemap: false,
    minify: 'terser'
  },
  plugins: [react(), svgr(),
  javascriptObfuscator({
    include: [/\.jsx?$/, /\.tsx?$/],
    exclude: [/node_modules/, /\.nuxt/],
    options: {
      compact: true,
      controlFlowFlattening: true,
    },
    debugger: false,
    apply: 'build',
  })
  ],
  server: {
    open: true,
  },
  css: {
    preprocessorOptions: {
      sass: {

      }
    }
  }
})
