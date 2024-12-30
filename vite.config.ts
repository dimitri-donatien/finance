import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
// import devtools from 'solid-devtools/vite';

export default defineConfig({
  plugins: [
    /* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools(),
    solidPlugin(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use "@/scss/base/colors.scss" as *;
        @use "@/scss/base/typography.scss" as *;
        @use "@/scss/utils" as *;
      `,
      },
    },
  },
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
