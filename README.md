Vue-Cli3 中虽然提供了 TypeScript 写 Vue，但是由于插件的支持度不够，Vue 文件里写 Ts，体验貌似也没什么提升，所以，我决定使用 TSX 来写 Vue

接下来，我以 Vue 初始项目为例，演示怎么将 Vue 文件转换成 Tsx

## 新建项目

我们使用 Vue-Cli3 新建一个项目，配置如下

![vue-cli-options](screenshot/vue-cli-options.png)

## vue-tsx-support 增强提示

```
yarn add vue-tsx-support -D
```

专门为了 Vue Tsx 文件，而编写的一个依赖，详细请阅读[官网](https://github.com/wonderful-panda/vue-tsx-support)

或者参考我的项目里 https://github.com/JuZiSang/blog 的用法

## Tsx 热重置

### 所需依赖

```bash
yarn add vue-jsx-hot-loader -D
```

### vue.config.js

在 `chainWebpack` 增加如下 loader，支持热重置

```js
config.module
  .rule("tsx")
  .test(/\.tsx$/)
  .use("vue-jsx-hot-loader")
  .before("babel-loader")
  .loader("vue-jsx-hot-loader");
```

## CSSModule 支持

在 `Tsx` 中，`Vue` 原来的 `scoped` 方案就失效了，所以我决定使用 `css-module` 解决这个问题，并且配合 `typings-for-css-modules-loader` 生成 `*.d.ts` 增加提示

### 依赖

```bash
yarn add typings-for-css-modules-loader node-sass sass-loader -D
```

### vue.config.js

```js
["css", "less", "scss", "sass", "stylus", "postcss"].forEach(rule => {
  // rules for *.module.* files
  // 将 css-loader 替换为 typings-for-css-modules-loader
  const cssRule = config.module
    .rule(rule)
    .oneOf("normal-modules")
    .uses.get("css-loader")
    .set("loader", "typings-for-css-modules-loader");
});
```

我们可以继续在 `vue.config.js` 的 css 选项中配置我们的 css，详情[戳这里](https://cli.vuejs.org/zh/config/#css-modules)

```js
{
  loaderOptions: {
    css: {
      // name 导出
      namedExport: true,
      // 是否使用驼峰
      camelCase: true,
      // html 中 实际的 css 类名
      localIdentName: process.env.NODE_ENV !== "production" ? "[local]-[hash:base64:5]" : "[hash:base64:5]"
    }
  }
};
```

## 支持 sync v-model

### 依赖

```bash
yarn add babel-plugin-jsx-v-model babel-plugin-vue-jsx-sync -D
```

### babel.config.js

```js
module.exports = {
  presets: ["@vue/app"],
  plugins: ["vue-jsx-sync", "jsx-v-model"]
};
```

## 总结

```
yarn add vue-tsx-support vue-jsx-hot-loader typings-for-css-modules-loader node-sass sass-loader babel-plugin-jsx-v-model babel-plugin-vue-jsx-sync -D
```

经过如上改造，就能愉快的编写 Tsx 了
