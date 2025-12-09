import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import path from "path";

export default defineConfig({
  plugins: [tsconfigPaths()],
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
  // 配置入口文件
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
      },
    },
  },
  // 配置根目录和公共目录
  root: ".",
  publicDir: "public",
  // 配置路径别名
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "app"),
    },
  },
});
