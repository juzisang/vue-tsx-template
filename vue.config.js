const path = require("path");
const fs = require("fs");

module.exports = {
  chainWebpack(config) {
    if (process.env.NODE_ENV !== "production") {
      config.module
        .rule("tsx")
        .test(/\.tsx$/)
        .use("vue-jsx-hot-loader")
        .before("babel-loader")
        .loader("vue-jsx-hot-loader");

      ["css", "less", "scss", "sass", "stylus", "postcss"].forEach(rule => {
        ["vue-modules", "vue", "normal-modules", "normal"].forEach(oneOf => {
          config.module
            .rule(rule)
            .oneOf(oneOf)
            .uses.delete("css-loader");
          config.module
            .rule(rule)
            .oneOf(oneOf)
            .use("typings-for-css-modules-loader")
            .before("postcss-loader")
            .loader("typings-for-css-modules-loader")
            .options({
              modules: true,
              namedExport: true,
              camelCase: true
            });
        });
      });
    }
  },
  css: {
    modules: true
  }
};
