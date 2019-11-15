/*
* @Author: brooke
* @Date:   2018-10-29 15:41:05
* @Last Modified by:   brooke
* @Last Modified time: 2018-10-29 15:55:53
*/
define(['libs/axios', 'config/index'], function(HttpRequest, config){
    const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

    const axios = new HttpRequest(baseUrl)

    return axios;
})
