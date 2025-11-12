import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import { PluginOption } from 'vite'
function forceAssetsPathReplace(): PluginOption {
  return {
    name: 'force-absolute-assets',
    apply: 'build',
    transformIndexHtml(html: string) {
      return html
        .replace(/(src|href)="\.\/assets\//g, '$1="/assets/')
        .replace(/url\(\.\/assets\//g, 'url(/assets/')
    }
  }
}
export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    build: {
      commonjsOptions: { ignoreTryCatch: true },
      rollupOptions: {
        external: ['bufferutil', 'utf-8-validate']
      }
    },
    resolve: {
      alias: {
        '@db': resolve('src/db'),
        '@main': resolve('src/main'),
        '@renderer': resolve('src/renderer/src'),
        '@models': resolve('src/models')
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    base: '/',
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@models': resolve('src/models')
      }
    },
    plugins: [vue(), forceAssetsPathReplace()]
  }
})
