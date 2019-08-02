module.exports = (isDev) => {
  return {
    preserveWhitespace: true,  // 清除模板中的一些不必要的空格
    extractCSS: !isDev,  // 将vue文件中的css提取出来
    cssModules: {},
    // hotReload: false, // 根据环境变量生成，不需要手动配置
  }
}