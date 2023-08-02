import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
// import VueMacros from "unplugin-vue-macros/vite";
import VueI18n from "@intlify/unplugin-vue-i18n/vite";

const __DEV__ = process.env.NODE_ENV !== "production";
const __STORYBOOK__ = process.env.DEV_ENV === "storybook";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    dts(),
    tsconfigPaths(),
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      fullInstall: true,
      include: [path.resolve(__dirname, "src/locales/**")],
    }),
    AutoImport({
      imports: [
        "vue",
        "vue-i18n",
        "@vueuse/head",
        "@vueuse/core",
        "vue/macros",
      ],
      dts: "src/auto-imports.d.ts",
      dirs: ["src/composables"],
      vueTemplate: true,
    }),
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ["vue", "md"],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: "src/components.d.ts",
		}),
		// Bug found in build
		// VueMacros({
		// 	plugins: {
		// 		vue: vue({
		// 			include: [/\.vue$/, /\.md$/],
		// 		}),
		// 	},
		// })
  ],
  define: {
		__DEV__,
		__STORYBOOK__
  },
  resolve: {},
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      name: "gdsComponent",
      fileName: (format) => `index.${format}.js`,
      formats: ["es", "umd", "iife"],
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
