// vite.config.ts
import { rmSync } from "fs";
import { join } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import electron from "vite-plugin-electron";

// package.json
var package_default = {
  name: "tts-vue",
  version: "1.9.15",
  main: "dist/electron/main/index.js",
  description: "\u{1F3A4} \u5FAE\u8F6F\u8BED\u97F3\u5408\u6210\u5DE5\u5177\uFF0C\u4F7F\u7528 Electron + Vue + ElementPlus + Vite \u6784\u5EFA\u3002",
  author: "\u6CAB\u96E2Loker <loker80@qq.com>",
  license: "MIT",
  private: true,
  type: "module",
  scripts: {
    dev: "vite",
    build: "vue-tsc --noEmit && vite build && electron-builder"
  },
  engines: {
    node: ">=14.17.0"
  },
  devDependencies: {
    "@vitejs/plugin-vue": "^2.3.3",
    electron: "^19.1.9",
    "electron-builder": "^23.1.0",
    typescript: "^4.7.4",
    vite: "^2.9.13",
    "vite-plugin-electron": "^0.8.1",
    vue: "^3.2.37",
    "vue-tsc": "^0.38.3"
  },
  env: {
    VITE_DEV_SERVER_HOST: "127.0.0.1",
    VITE_DEV_SERVER_PORT: 3344
  },
  keywords: [
    "electron",
    "rollup",
    "vite",
    "vue3",
    "vue"
  ],
  dependencies: {
    "@types/ws": "^8.5.4",
    axios: "^0.27.2",
    "electron-log": "^4.4.8",
    "electron-store": "^8.0.2",
    "element-plus": "2.2.9",
    "microsoft-cognitiveservices-speech-sdk": "^1.30.1",
    "nodejs-websocket": "^1.7.2",
    pinia: "^2.0.17",
    uuid: "^8.3.2",
    "vue-i18n": "^9.6.5",
    ws: "^8.13.0"
  }
};

// vite.config.ts
rmSync("dist", { recursive: true, force: true });
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "@": join("D:\\xampp\\htdocs\\Transformes\\tts-vue", "./src"),
      "@components": join("D:\\xampp\\htdocs\\Transformes\\tts-vue", "./src/components")
    }
  },
  plugins: [
    vue(),
    electron({
      main: {
        entry: "electron/main/index.ts",
        vite: withDebug({
          build: {
            outDir: "dist/electron/main"
          }
        })
      },
      preload: {
        input: {
          index: join("D:\\xampp\\htdocs\\Transformes\\tts-vue", "electron/preload/index.ts")
        },
        vite: {
          build: {
            sourcemap: "inline",
            outDir: "dist/electron/preload"
          }
        }
      },
      renderer: {}
    })
  ],
  server: {
    host: package_default.env.VITE_DEV_SERVER_HOST,
    port: package_default.env.VITE_DEV_SERVER_PORT
  }
});
function withDebug(config) {
  if (process.env.VSCODE_DEBUG) {
    if (!config.build)
      config.build = {};
    config.build.sourcemap = true;
    config.plugins = (config.plugins || []).concat({
      name: "electron-vite-debug",
      configResolved(config2) {
        const index = config2.plugins.findIndex(
          (p) => p.name === "electron-main-watcher"
        );
        config2.plugins.splice(index, 1);
      }
    });
  }
  return config;
}
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IHJtU3luYyB9IGZyb20gXCJmc1wiO1xyXG5pbXBvcnQgeyBqb2luIH0gZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBQbHVnaW4sIFVzZXJDb25maWcgfSBmcm9tIFwidml0ZVwiO1xyXG5pbXBvcnQgdnVlIGZyb20gXCJAdml0ZWpzL3BsdWdpbi12dWVcIjtcclxuaW1wb3J0IGVsZWN0cm9uIGZyb20gXCJ2aXRlLXBsdWdpbi1lbGVjdHJvblwiO1xyXG5pbXBvcnQgcGtnIGZyb20gXCIuL3BhY2thZ2UuanNvblwiO1xyXG5cclxucm1TeW5jKFwiZGlzdFwiLCB7IHJlY3Vyc2l2ZTogdHJ1ZSwgZm9yY2U6IHRydWUgfSk7IC8vIHYxNC4xNC4wXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHJlc29sdmU6IHtcclxuICAgIC8vICsrK1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgXCJAXCI6IGpvaW4oXCJEOlxcXFx4YW1wcFxcXFxodGRvY3NcXFxcVHJhbnNmb3JtZXNcXFxcdHRzLXZ1ZVwiLCBcIi4vc3JjXCIpLFxyXG4gICAgICBcIkBjb21wb25lbnRzXCI6IGpvaW4oXCJEOlxcXFx4YW1wcFxcXFxodGRvY3NcXFxcVHJhbnNmb3JtZXNcXFxcdHRzLXZ1ZVwiLCBcIi4vc3JjL2NvbXBvbmVudHNcIiksXHJcbiAgICB9LCAvLyArKytcclxuICB9LFxyXG4gIHBsdWdpbnM6IFtcclxuICAgIHZ1ZSgpLFxyXG4gICAgZWxlY3Ryb24oe1xyXG4gICAgICBtYWluOiB7XHJcbiAgICAgICAgZW50cnk6IFwiZWxlY3Ryb24vbWFpbi9pbmRleC50c1wiLFxyXG4gICAgICAgIHZpdGU6IHdpdGhEZWJ1Zyh7XHJcbiAgICAgICAgICBidWlsZDoge1xyXG4gICAgICAgICAgICBvdXREaXI6IFwiZGlzdC9lbGVjdHJvbi9tYWluXCIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0pLFxyXG4gICAgICB9LFxyXG4gICAgICBwcmVsb2FkOiB7XHJcbiAgICAgICAgaW5wdXQ6IHtcclxuICAgICAgICAgIC8vIFlvdSBjYW4gY29uZmlndXJlIG11bHRpcGxlIHByZWxvYWQgaGVyZVxyXG4gICAgICAgICAgaW5kZXg6IGpvaW4oXCJEOlxcXFx4YW1wcFxcXFxodGRvY3NcXFxcVHJhbnNmb3JtZXNcXFxcdHRzLXZ1ZVwiLCBcImVsZWN0cm9uL3ByZWxvYWQvaW5kZXgudHNcIiksXHJcbiAgICAgICAgfSxcclxuICAgICAgICB2aXRlOiB7XHJcbiAgICAgICAgICBidWlsZDoge1xyXG4gICAgICAgICAgICAvLyBGb3IgRGVidWdcclxuICAgICAgICAgICAgc291cmNlbWFwOiBcImlubGluZVwiLFxyXG4gICAgICAgICAgICBvdXREaXI6IFwiZGlzdC9lbGVjdHJvbi9wcmVsb2FkXCIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICAgIC8vIEVuYWJsZXMgdXNlIG9mIE5vZGUuanMgQVBJIGluIHRoZSBSZW5kZXJlci1wcm9jZXNzXHJcbiAgICAgIHJlbmRlcmVyOiB7fSxcclxuICAgIH0pLFxyXG4gIF0sXHJcbiAgc2VydmVyOiB7XHJcbiAgICBob3N0OiBwa2cuZW52LlZJVEVfREVWX1NFUlZFUl9IT1NULFxyXG4gICAgcG9ydDogcGtnLmVudi5WSVRFX0RFVl9TRVJWRVJfUE9SVCxcclxuICB9LFxyXG59KTtcclxuXHJcbmZ1bmN0aW9uIHdpdGhEZWJ1Zyhjb25maWc6IFVzZXJDb25maWcpOiBVc2VyQ29uZmlnIHtcclxuICBpZiAocHJvY2Vzcy5lbnYuVlNDT0RFX0RFQlVHKSB7XHJcbiAgICBpZiAoIWNvbmZpZy5idWlsZCkgY29uZmlnLmJ1aWxkID0ge307XHJcbiAgICBjb25maWcuYnVpbGQuc291cmNlbWFwID0gdHJ1ZTtcclxuICAgIGNvbmZpZy5wbHVnaW5zID0gKGNvbmZpZy5wbHVnaW5zIHx8IFtdKS5jb25jYXQoe1xyXG4gICAgICBuYW1lOiBcImVsZWN0cm9uLXZpdGUtZGVidWdcIixcclxuICAgICAgY29uZmlnUmVzb2x2ZWQoY29uZmlnKSB7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSBjb25maWcucGx1Z2lucy5maW5kSW5kZXgoXHJcbiAgICAgICAgICAocCkgPT4gcC5uYW1lID09PSBcImVsZWN0cm9uLW1haW4td2F0Y2hlclwiXHJcbiAgICAgICAgKTtcclxuICAgICAgICAvLyBBdCBwcmVzZW50LCBWaXRlIGNhbiBvbmx5IG1vZGlmeSBwbHVnaW5zIGluIGNvbmZpZ1Jlc29sdmVkIGhvb2suXHJcbiAgICAgICAgKGNvbmZpZy5wbHVnaW5zIGFzIFBsdWdpbltdKS5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIHJldHVybiBjb25maWc7XHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFBLFNBQVMsY0FBYztBQUN2QixTQUFTLFlBQVk7QUFDckIsU0FBUyxvQkFBd0M7QUFDakQsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHckIsT0FBTyxRQUFRLEVBQUUsV0FBVyxNQUFNLE9BQU8sS0FBSyxDQUFDO0FBRy9DLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUVQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSywyQ0FBMkMsT0FBTztBQUFBLE1BQzVELGVBQWUsS0FBSywyQ0FBMkMsa0JBQWtCO0FBQUEsSUFDbkY7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixTQUFTO0FBQUEsTUFDUCxNQUFNO0FBQUEsUUFDSixPQUFPO0FBQUEsUUFDUCxNQUFNLFVBQVU7QUFBQSxVQUNkLE9BQU87QUFBQSxZQUNMLFFBQVE7QUFBQSxVQUNWO0FBQUEsUUFDRixDQUFDO0FBQUEsTUFDSDtBQUFBLE1BQ0EsU0FBUztBQUFBLFFBQ1AsT0FBTztBQUFBLFVBRUwsT0FBTyxLQUFLLDJDQUEyQywyQkFBMkI7QUFBQSxRQUNwRjtBQUFBLFFBQ0EsTUFBTTtBQUFBLFVBQ0osT0FBTztBQUFBLFlBRUwsV0FBVztBQUFBLFlBQ1gsUUFBUTtBQUFBLFVBQ1Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BRUEsVUFBVSxDQUFDO0FBQUEsSUFDYixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTSxnQkFBSSxJQUFJO0FBQUEsSUFDZCxNQUFNLGdCQUFJLElBQUk7QUFBQSxFQUNoQjtBQUNGLENBQUM7QUFFRCxTQUFTLFVBQVUsUUFBZ0M7QUFDakQsTUFBSSxRQUFRLElBQUksY0FBYztBQUM1QixRQUFJLENBQUMsT0FBTztBQUFPLGFBQU8sUUFBUSxDQUFDO0FBQ25DLFdBQU8sTUFBTSxZQUFZO0FBQ3pCLFdBQU8sV0FBVyxPQUFPLFdBQVcsQ0FBQyxHQUFHLE9BQU87QUFBQSxNQUM3QyxNQUFNO0FBQUEsTUFDTixlQUFlQSxTQUFRO0FBQ3JCLGNBQU0sUUFBUUEsUUFBTyxRQUFRO0FBQUEsVUFDM0IsQ0FBQyxNQUFNLEVBQUUsU0FBUztBQUFBLFFBQ3BCO0FBRUEsUUFBQ0EsUUFBTyxRQUFxQixPQUFPLE9BQU8sQ0FBQztBQUFBLE1BQzlDO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUNBLFNBQU87QUFDVDsiLAogICJuYW1lcyI6IFsiY29uZmlnIl0KfQo=
