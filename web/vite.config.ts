import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from "path"

export default (({ mode }: any) => {

  const http = loadEnv(mode, process.cwd());

  return defineConfig({
    plugins: [
      react(),
    ],
    server: {
      open: false,
      https: false,
      strictPort: false,
      proxy: {
        "/api": {
          target: http.VITE_BASR_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "")
        },
      },
    },
    define: {
      "process.env": {},
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
    // css: {
    //   preprocessorOptions: {
    //     less: {
    //       javascriptEnabled: true,
    //     },
    //   },
    // },
    build: {
      // minify: "terser",
      // assetsDir: "static",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
  });
})

