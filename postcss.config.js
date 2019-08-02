// postcss是后处理css工具，生成css后，再对css进行优化

const autoprefixer = require('autoprefixer')

module.exports = {
  plugins: [
    autoprefixer()  // 可以为css代码加各种前缀
  ]
}