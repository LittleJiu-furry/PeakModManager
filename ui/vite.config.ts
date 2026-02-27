import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Component from 'unplugin-vue-components/vite'


// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            imports: ['vue', 'pinia', 'vue-router'],
            dts: 'src/auto-imports.d.ts',
            dirs: ['src/composables', 'src/stores', "src/views"],
        }),
        Component({
            dirs: ['src/components', 'src/views'],
            extensions: ['vue'],
            dts: 'src/components.d.ts',
        })
    ],
})
