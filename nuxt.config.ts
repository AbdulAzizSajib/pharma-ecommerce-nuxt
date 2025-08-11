import { resolve } from "path";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  alias: {
    "@": resolve(__dirname, ""),
  },
  css: ["@/assets/css/style.scss"],
  // plugins: ["~/plugins/pinia-persistedstate.js"],
  modules: [
    "@nuxtjs/tailwindcss",
    "@ant-design-vue/nuxt",
    "@pinia/nuxt",
    // "@pinia-plugin-persistedstate/nuxt",
  ],
});
