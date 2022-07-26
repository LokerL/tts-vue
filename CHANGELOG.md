## 2022-06-04

[v2.0.0](https://github.com/electron-vite/electron-vite-vue/pull/156)

- 🖖 Based on the `vue-ts` template created by `npm create vite`, integrate `vite-plugin-electron`
- ⚡️ More simplify, is in line with Vite project structure

## 2022-01-30

[v1.0.0](https://github.com/electron-vite/electron-vite-vue/releases/tag/v1.0.0)

- ⚡️ Main、Renderer、preload, all built with vite

## 2022-01-27
- Refactor the scripts part.
- Remove `configs` directory.

## 2021-11-11
- Refactor the project. Use vite.config.ts build `Main-process`, `Preload-script` and `Renderer-process` alternative rollup.
- Scenic `Vue>=3.2.13`, `@vue/compiler-sfc` is no longer necessary.
- If you prefer Rollup, Use rollup branch.

```bash
Error: @vitejs/plugin-vue requires vue (>=3.2.13) or @vue/compiler-sfc to be present in the dependency tree.
```
