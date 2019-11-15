/*
* @Author: brooke
* @Date:   2018-10-29 20:39:56
* @Last Modified by:   brooke
* @Last Modified time: 2018-10-30 18:02:10
*/
({
    appDir: '../static', //需要打包的目录
    baseUrl: './js', //require依赖根目录
    dir: '../build', //打包输出路径
    mainConfigFile: './config.js', //依赖关系配制文件
    name: 'app', //需要打包的模块
    removeCombined: true
})