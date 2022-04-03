module.exports = {
  'stories': ["../src/**/*.stories.mdx", "../src/**/*.stories.js"],
  'addons': [
    "@storybook/addon-docs", 
    "@storybook/addon-links", 
    "@storybook/addon-essentials",
    "@storybook/addon-actions",
    "@storybook/addon-backgrounds"
  ],
  'framework': "@storybook/vue3",
  'webpackFinal': config => {
    config.module.rules.push({
      test: /.scss$/i,
      use: ['style-loader', 'css-loader', 'sass-loader']
    });
    return config;
  },
  core: {
    builder: "webpack5"
  }
};