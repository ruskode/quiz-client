// vite.config.ts
import path from "path";
import { defineConfig } from "file:///home/neioar/Work/fotk/node_modules/.pnpm/vite@3.2.7_sass@1.67.0/node_modules/vite/dist/node/index.js";
import Vue from "file:///home/neioar/Work/fotk/node_modules/.pnpm/@vitejs+plugin-vue@3.2.0_vite@3.2.7+vue@3.3.4/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import Pages from "file:///home/neioar/Work/fotk/node_modules/.pnpm/vite-plugin-pages@0.26.0_vite@3.2.7/node_modules/vite-plugin-pages/dist/index.mjs";
import generateSitemap from "file:///home/neioar/Work/fotk/node_modules/.pnpm/vite-ssg-sitemap@0.4.3/node_modules/vite-ssg-sitemap/dist/index.js";
import Layouts from "file:///home/neioar/Work/fotk/node_modules/.pnpm/vite-plugin-vue-layouts@0.7.0_gyhcruoupozek3ivl5ttibofza/node_modules/vite-plugin-vue-layouts/dist/index.mjs";
import Components from "file:///home/neioar/Work/fotk/node_modules/.pnpm/unplugin-vue-components@0.22.12_vue@3.3.4/node_modules/unplugin-vue-components/dist/vite.mjs";
import AutoImport from "file:///home/neioar/Work/fotk/node_modules/.pnpm/unplugin-auto-import@0.11.5_@vueuse+core@9.13.0/node_modules/unplugin-auto-import/dist/vite.js";
import VueI18n from "file:///home/neioar/Work/fotk/node_modules/.pnpm/@intlify+vite-plugin-vue-i18n@6.0.3_vite@3.2.7+vue-i18n@9.4.1/node_modules/@intlify/vite-plugin-vue-i18n/lib/index.mjs";
import Inspect from "file:///home/neioar/Work/fotk/node_modules/.pnpm/vite-plugin-inspect@0.7.38_vite@3.2.7/node_modules/vite-plugin-inspect/dist/index.mjs";
import Unocss from "file:///home/neioar/Work/fotk/node_modules/.pnpm/unocss@0.45.30_vite@3.2.7/node_modules/unocss/dist/vite.mjs";
import { ElementPlusResolver } from "file:///home/neioar/Work/fotk/node_modules/.pnpm/unplugin-vue-components@0.22.12_vue@3.3.4/node_modules/unplugin-vue-components/dist/resolvers.mjs";
var __vite_injected_original_dirname = "/home/neioar/Work/fotk";
var vite_config_default = defineConfig(({ mode }) => {
  console.log("ENV_MODE: ", mode);
  return {
    resolve: {
      alias: {
        "~/": `${path.resolve(__vite_injected_original_dirname, "src")}/`
      }
    },
    plugins: [
      Vue({
        include: [/\.vue$/],
        reactivityTransform: true
      }),
      Pages({
        extensions: ["vue"],
        exclude: mode === "development" || mode === "stage" ? [] : ["**/dev/*.vue"]
      }),
      Layouts({
        layoutsDirs: "src/layouts",
        defaultLayout: "default"
      }),
      AutoImport({
        imports: [
          "vue",
          "vue-router",
          "vue-i18n",
          "vue/macros",
          "@vueuse/head",
          "@vueuse/core",
          "pinia",
          {
            axios: [["default", "axios"]]
          }
        ],
        resolvers: [ElementPlusResolver({ importStyle: "css", ssr: false })],
        dts: "src/auto-imports.d.ts",
        dirs: ["src/composables", "src/store/**", "src/hooks/**", "src/keys/**"],
        vueTemplate: true
      }),
      Components({
        extensions: ["vue"],
        include: [/\.vue$/, /\.vue\?vue/],
        resolvers: [ElementPlusResolver({ importStyle: "css", ssr: false })],
        dts: "src/components.d.ts",
        deep: true,
        directoryAsNamespace: true
      }),
      Unocss(),
      VueI18n({
        runtimeOnly: true,
        compositionOnly: true,
        include: [path.resolve(__vite_injected_original_dirname, "locales/**")]
      }),
      Inspect()
    ],
    ssr: {
      noExternal: [/vue-i18n/, "element-plus"]
    },
    ssgOptions: {
      script: "async",
      formatting: "minify",
      onFinished() {
        generateSitemap();
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9uZWlvYXIvV29yay9mb3RrXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9uZWlvYXIvV29yay9mb3RrL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL25laW9hci9Xb3JrL2ZvdGsvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCBWdWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiO1xuaW1wb3J0IFBhZ2VzIGZyb20gXCJ2aXRlLXBsdWdpbi1wYWdlc1wiO1xuaW1wb3J0IGdlbmVyYXRlU2l0ZW1hcCBmcm9tIFwidml0ZS1zc2ctc2l0ZW1hcFwiO1xuaW1wb3J0IExheW91dHMgZnJvbSBcInZpdGUtcGx1Z2luLXZ1ZS1sYXlvdXRzXCI7XG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tIFwidW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZVwiO1xuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSBcInVucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGVcIjtcbmltcG9ydCBWdWVJMThuIGZyb20gXCJAaW50bGlmeS92aXRlLXBsdWdpbi12dWUtaTE4blwiO1xuaW1wb3J0IEluc3BlY3QgZnJvbSBcInZpdGUtcGx1Z2luLWluc3BlY3RcIjtcbmltcG9ydCBVbm9jc3MgZnJvbSBcInVub2Nzcy92aXRlXCI7XG5pbXBvcnQgeyBFbGVtZW50UGx1c1Jlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJ1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xuXHRjb25zb2xlLmxvZygnRU5WX01PREU6ICcsIG1vZGUpXG5cdHJldHVybiB7XG5cdFx0cmVzb2x2ZToge1xuXHRcdFx0YWxpYXM6IHtcblx0XHRcdFx0XCJ+L1wiOiBgJHtwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcInNyY1wiKX0vYCxcblx0XHRcdH0sXG5cdFx0fSxcblxuXHRcdHBsdWdpbnM6IFtcblx0XHRcdFZ1ZSh7XG5cdFx0XHRcdGluY2x1ZGU6IFsvXFwudnVlJC9dLFxuXHRcdFx0XHRyZWFjdGl2aXR5VHJhbnNmb3JtOiB0cnVlLFxuXHRcdFx0fSksXG5cblx0XHRcdFBhZ2VzKHtcblx0XHRcdFx0ZXh0ZW5zaW9uczogW1widnVlXCJdLFxuXHRcdFx0XHRleGNsdWRlOlxuXHRcdFx0XHRcdG1vZGUgPT09IFwiZGV2ZWxvcG1lbnRcIiB8fCBtb2RlID09PSBcInN0YWdlXCJcblx0XHRcdFx0XHRcdD8gW11cblx0XHRcdFx0XHRcdDogWycqKi9kZXYvKi52dWUnXSxcblx0XHRcdH0pLFxuXHRcdFx0TGF5b3V0cyh7XG5cdFx0XHRcdGxheW91dHNEaXJzOiAnc3JjL2xheW91dHMnLFxuXHRcdFx0XHRkZWZhdWx0TGF5b3V0OiAnZGVmYXVsdCdcblx0XHRcdCAgfSksXG5cdFx0XHRBdXRvSW1wb3J0KHtcblx0XHRcdFx0aW1wb3J0czogW1xuXHRcdFx0XHRcdFwidnVlXCIsXG5cdFx0XHRcdFx0XCJ2dWUtcm91dGVyXCIsXG5cdFx0XHRcdFx0XCJ2dWUtaTE4blwiLFxuXHRcdFx0XHRcdFwidnVlL21hY3Jvc1wiLFxuXHRcdFx0XHRcdFwiQHZ1ZXVzZS9oZWFkXCIsXG5cdFx0XHRcdFx0XCJAdnVldXNlL2NvcmVcIixcblx0XHRcdFx0XHRcInBpbmlhXCIsXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0YXhpb3M6IFtbXCJkZWZhdWx0XCIsIFwiYXhpb3NcIl1dLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdF0sXG5cdFx0XHRcdHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoe2ltcG9ydFN0eWxlOiAnY3NzJywgc3NyOiBmYWxzZX0pXSxcblx0XHRcdFx0ZHRzOiBcInNyYy9hdXRvLWltcG9ydHMuZC50c1wiLFxuXHRcdFx0XHRkaXJzOiBbXCJzcmMvY29tcG9zYWJsZXNcIiwgXCJzcmMvc3RvcmUvKipcIiwgXCJzcmMvaG9va3MvKipcIiwgXCJzcmMva2V5cy8qKlwiXSxcblx0XHRcdFx0dnVlVGVtcGxhdGU6IHRydWUsXG5cdFx0XHR9KSxcblxuXHRcdFx0Q29tcG9uZW50cyh7XG5cdFx0XHRcdGV4dGVuc2lvbnM6IFtcInZ1ZVwiXSxcblx0XHRcdFx0aW5jbHVkZTogWy9cXC52dWUkLywgL1xcLnZ1ZVxcP3Z1ZS9dLFxuXHRcdFx0XHRyZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKHtpbXBvcnRTdHlsZTogJ2NzcycsIHNzcjogZmFsc2V9KV0sXG5cdFx0XHRcdGR0czogXCJzcmMvY29tcG9uZW50cy5kLnRzXCIsXG5cdFx0XHRcdGRlZXA6IHRydWUsXG5cdFx0XHRcdGRpcmVjdG9yeUFzTmFtZXNwYWNlOiB0cnVlLFxuXHRcdFx0fSksXG5cblx0XHRcdFVub2NzcygpLFxuXG5cdFx0XHRWdWVJMThuKHtcblx0XHRcdFx0cnVudGltZU9ubHk6IHRydWUsXG5cdFx0XHRcdGNvbXBvc2l0aW9uT25seTogdHJ1ZSxcblx0XHRcdFx0aW5jbHVkZTogW3BhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwibG9jYWxlcy8qKlwiKV0sXG5cdFx0XHR9KSxcblxuXHRcdFx0SW5zcGVjdCgpLFxuXHRcdF0sXG5cblx0XHRzc3I6IHtcblx0XHRcdC8vIFNTRyBWdWUtaTE4biB3b3JrYXJvdW5kXG5cdFx0XHRub0V4dGVybmFsOiBbL3Z1ZS1pMThuLywgJ2VsZW1lbnQtcGx1cyddLFxuXHRcdH0sXG5cblx0XHRzc2dPcHRpb25zOiB7XG5cdFx0XHRzY3JpcHQ6IFwiYXN5bmNcIixcblx0XHRcdGZvcm1hdHRpbmc6IFwibWluaWZ5XCIsXG5cdFx0XHRvbkZpbmlzaGVkKCkge1xuXHRcdFx0XHRnZW5lcmF0ZVNpdGVtYXAoKTtcblx0XHRcdH0sXG5cdFx0fSxcblx0fVxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW9QLE9BQU8sVUFBVTtBQUNyUSxTQUFTLG9CQUE2QjtBQUN0QyxPQUFPLFNBQVM7QUFDaEIsT0FBTyxXQUFXO0FBQ2xCLE9BQU8scUJBQXFCO0FBQzVCLE9BQU8sYUFBYTtBQUNwQixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGFBQWE7QUFDcEIsT0FBTyxhQUFhO0FBQ3BCLE9BQU8sWUFBWTtBQUNuQixTQUFTLDJCQUEyQjtBQVhwQyxJQUFNLG1DQUFtQztBQVl6QyxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssTUFBTTtBQUN6QyxVQUFRLElBQUksY0FBYyxJQUFJO0FBQzlCLFNBQU87QUFBQSxJQUNOLFNBQVM7QUFBQSxNQUNSLE9BQU87QUFBQSxRQUNOLE1BQU0sR0FBRyxLQUFLLFFBQVEsa0NBQVcsS0FBSztBQUFBLE1BQ3ZDO0FBQUEsSUFDRDtBQUFBLElBRUEsU0FBUztBQUFBLE1BQ1IsSUFBSTtBQUFBLFFBQ0gsU0FBUyxDQUFDLFFBQVE7QUFBQSxRQUNsQixxQkFBcUI7QUFBQSxNQUN0QixDQUFDO0FBQUEsTUFFRCxNQUFNO0FBQUEsUUFDTCxZQUFZLENBQUMsS0FBSztBQUFBLFFBQ2xCLFNBQ0MsU0FBUyxpQkFBaUIsU0FBUyxVQUNoQyxDQUFDLElBQ0QsQ0FBQyxjQUFjO0FBQUEsTUFDcEIsQ0FBQztBQUFBLE1BQ0QsUUFBUTtBQUFBLFFBQ1AsYUFBYTtBQUFBLFFBQ2IsZUFBZTtBQUFBLE1BQ2QsQ0FBQztBQUFBLE1BQ0gsV0FBVztBQUFBLFFBQ1YsU0FBUztBQUFBLFVBQ1I7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsWUFDQyxPQUFPLENBQUMsQ0FBQyxXQUFXLE9BQU8sQ0FBQztBQUFBLFVBQzdCO0FBQUEsUUFDRDtBQUFBLFFBQ0EsV0FBVyxDQUFDLG9CQUFvQixFQUFDLGFBQWEsT0FBTyxLQUFLLE1BQUssQ0FBQyxDQUFDO0FBQUEsUUFDakUsS0FBSztBQUFBLFFBQ0wsTUFBTSxDQUFDLG1CQUFtQixnQkFBZ0IsZ0JBQWdCLGFBQWE7QUFBQSxRQUN2RSxhQUFhO0FBQUEsTUFDZCxDQUFDO0FBQUEsTUFFRCxXQUFXO0FBQUEsUUFDVixZQUFZLENBQUMsS0FBSztBQUFBLFFBQ2xCLFNBQVMsQ0FBQyxVQUFVLFlBQVk7QUFBQSxRQUNoQyxXQUFXLENBQUMsb0JBQW9CLEVBQUMsYUFBYSxPQUFPLEtBQUssTUFBSyxDQUFDLENBQUM7QUFBQSxRQUNqRSxLQUFLO0FBQUEsUUFDTCxNQUFNO0FBQUEsUUFDTixzQkFBc0I7QUFBQSxNQUN2QixDQUFDO0FBQUEsTUFFRCxPQUFPO0FBQUEsTUFFUCxRQUFRO0FBQUEsUUFDUCxhQUFhO0FBQUEsUUFDYixpQkFBaUI7QUFBQSxRQUNqQixTQUFTLENBQUMsS0FBSyxRQUFRLGtDQUFXLFlBQVksQ0FBQztBQUFBLE1BQ2hELENBQUM7QUFBQSxNQUVELFFBQVE7QUFBQSxJQUNUO0FBQUEsSUFFQSxLQUFLO0FBQUEsTUFFSixZQUFZLENBQUMsWUFBWSxjQUFjO0FBQUEsSUFDeEM7QUFBQSxJQUVBLFlBQVk7QUFBQSxNQUNYLFFBQVE7QUFBQSxNQUNSLFlBQVk7QUFBQSxNQUNaLGFBQWE7QUFDWix3QkFBZ0I7QUFBQSxNQUNqQjtBQUFBLElBQ0Q7QUFBQSxFQUNEO0FBQ0QsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
