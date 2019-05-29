const {override, fixBabelImports, addLessLoader} = require('customize-cra')

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  /* less-loader配置访问：http://lesscss.org/usage/#less-options */
  addLessLoader({
    javascriptEnabled: true
  })
)