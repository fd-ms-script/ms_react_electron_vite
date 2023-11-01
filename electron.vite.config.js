import { resolve } from "path"
import { defineConfig, externalizeDepsPlugin } from "electron-vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        "@main": resolve("src/main"),
        "@root": resolve("./"),
      },
      extensions: [".mjs", ".js", ".mts", ".ts", ".jsx", ".tsx", ".json"], // 导入时想要省略的扩展名列表
    },
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    base: "./", // 开发或生产环境服务的公共基础路径
    resolve: {
      alias: {
        "@renderer": resolve("src/renderer/src"),
        "@main": resolve("src/main"),
      },
      extensions: [".mjs", ".js", ".mts", ".ts", ".jsx", ".tsx", ".json"], // 导入时想要省略的扩展名列表
    },
    build: {
      sourcemap: true, // 构建后是否生成 source map 文件。如果为 true，将会创建一个独立的 source map 文件。
      assetsInlineLimit: 4096, // 图片转 base64 编码的阈值
      // 代码压缩配置
      terserOptions: {
        // 生产环境移除console
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    server: {
      host: "0.0.0.0", // 监听所有地址
    },
    css: {
      modules: {
        scopeBehaviour: "local",
      },
      preprocessorOptions: {
        scss: {
          /* .scss全局预定义变量，引入多个文件 以;(分号分割)*/
          // additionalData: `@import "./src/assets/css/global.scss";`,
        },
      },
      // 可以查看 CSS 的源码
      devSourcemap: true,
    },
    optimizeDeps: {
      // 是否开启强制依赖预构建。node_modules 中的依赖模块构建过一次就会缓存在 node_modules/.vite/deps 文件夹下，下一次会直接使用缓存的文件。
      // 而有时候我们想要修改依赖模块的代码，做一些测试或者打个补丁，这时候就要用到强制依赖预构建。
      // 除了这个方法，我们还可以通过删除 .vite 文件夹或运行 npx vite --force 来强制进行依赖预构建。
      force: true, // 强制进行依赖预构建
    },
    plugins: [react()],
  },
})
