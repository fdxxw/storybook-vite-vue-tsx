const vue = require("@vitejs/plugin-vue").default;
const vueJsx = require("@vitejs/plugin-vue-jsx").default;
const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions"],
  framework: "@storybook/vue3",
  features: {
    interactionsDebugger: true,
  },
  core: {
    builder: "storybook-builder-vite",
  },
  async viteFinal(config, { configType }) {
    config.plugins.push(vue());
    config.plugins.push(vueJsx());
    config.resolve = {
      alias: {
        vue: "vue/dist/vue.esm-bundler.js",
        "@": path.resolve(__dirname, "../src"), // 设置别名
      },
    };
    config.build = {
      assetsDir: "assets",
    };

    config.optimizeDeps =
      configType === "PRODUCTION"
        ? config.optimizeDeps
        : {
            ...(config.optimizeDeps || {}),
            include: [
              ...(config?.optimizeDeps?.include || []),
              // Fix: `@storybook/addon-interactions` exports is not defined or `jest-mock` does not provide an export named 'fn'
              "jest-mock",
              // Optional, but prevents error flashing in the Storybook component preview iframe:
              // Fix: failed to fetch dynamically import module, avoid cache miss for dependencies on the first load
              "@storybook/components",
              "@storybook/store",
              // Add all addons that imported in the `preview.js` or `preview.ts` file and used in exported constants
              "@storybook/addon-links",
              "@storybook/theming",
            ],
          };
    return config;
  },
};
