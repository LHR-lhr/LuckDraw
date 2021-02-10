module.exports = {
    chainWebpack: config => {
      config
        .plugin('html')
        .tap(args =>{
          args[0].title = '月隐晦明限时寻访'
          return args
        })
    }
}
