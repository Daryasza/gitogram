const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

// gitogram/demo - path for GitHub pages
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/gitogram/'
    : '/gitogram/demo'
}
