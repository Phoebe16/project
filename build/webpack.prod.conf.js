var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
/* 一个可以插入 html 并且创建新的 .html 文件的插件 */
var HtmlWebpackPlugin = require('html-webpack-plugin')
/* 一个 webpack 扩展，可以提取一些代码并且将它们和文件分离开 */ 
/* 如果我们想将 webpack 打包成一个文件 css js 分离开，那我们需要这个插件 */
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

var env = config.build.env

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
     /* 编译输出目录 */
    path: config.build.assetsRoot,
     /* 编译输出文件名 */
    filename: utils.assetsPath('js/[name].[chunkhash].js'),  // 我们可以在 hash 后加 :6 决定使用几位 hash 值
     // 没有指定输出名的文件输出的文件名
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    /* definePlugin 接收字符串插入到代码当中, 所以你需要的话可以写上 JS 的字符串 */
    new webpack.DefinePlugin({
      'process.env': env
    }),
    /* 压缩 js (同样可以压缩 css) */
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    /* 构建要输出的 index.html 文件， HtmlWebpackPlugin 可以生成一个 html 并且在其中插入你构建生成的资源 */
    new HtmlWebpackPlugin({
      filename: config.build.index,  // 生成的 html 文件名
      template: 'index.html',   // 使用的模板
      inject: true,  // 是否注入 html (有多重注入方式，可以选择注入的位置)
      minify: {  // 压缩的方式
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // split vendor js into its own file
     // CommonsChunkPlugin用于生成在入口点之间共享的公共模块（比如jquery，vue）的
     // 块并将它们分成独立的包。而为什么要new两次这个插件，这是一个很经典的bug的解决方案，
     //在webpack的一个issues有过深入的讨论webpack/webpack#1315 .----为了将项目中的第
     //三方依赖代码抽离出来，官方文档上推荐使用这个插件，当我们在项目里实际使用之后，
     //发现一旦更改了 app.js 内的代码，vendor.js 的 hash 也会改变，那么下次上线时，
     //用户仍然需要重新下载 vendor.js 与 app.js ???(复制的，不太懂)
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // 依赖的 node_modules 文件会被提取到 vendor 中
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

/* 开启 gzip 的情况下使用下方的配置 */
if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')
  /* 向webpackconfig.plugins中加入下方的插件 */
  webpackConfig.plugins.push(
    /* 使用 compression-webpack-plugin 插件进行压缩 */
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
