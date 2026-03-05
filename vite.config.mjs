import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import path from 'node:path'

export default defineConfig({
  base: '',
  plugins: [
    vue(),
    viteStaticCopy({
      targets: [
        {
          src: 'dist/index.html',
          dest: '',   // 复制到 dist 根目录
          rename: '404.html'
        }
      ]
    }),
  ],
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx'
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }  
})
