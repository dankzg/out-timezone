/*
 * @Description: 
 * @Version: 
 * @Company: Dank
 * @Author: dank.zheng
 * @Date: 2023-08-19 07:23:25
 * @LastEditors: dank.zheng
 * @LastEditTime: 2023-08-30 08:57:40
 */
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

import { resolve, dirname } from 'node:path'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [NaiveUiResolver()],
    }),
    Components({
      resolvers: [NaiveUiResolver()],
    }),
    VueI18nPlugin({
      /* options */
      // locale messages resource pre-compile option
      include: resolve(dirname(fileURLToPath(import.meta.url)), 'i18n/**'),
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0',
  }
})
