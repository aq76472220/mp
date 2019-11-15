/*
* @Author: brooke
* @Date:   2018-10-29 15:48:06
* @Last Modified by:   brooke
* @Last Modified time: 2018-11-01 11:13:04
*/

define(['require', 'axios', 'libs/util'], function(require, axios, util)
{
    const addErrorLog = function(errorInfo){
        var statusText = errorInfo.statusText,
            status = errorInfo.status,
            responseURL = errorInfo.request.responseURL;

        var info = {
            type: 'ajax',
            code: status,
            mes: statusText,
            url: responseURL
        }

        var store = require('../store/index');

        if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
    }

    var HttpRequest = function(baseUrl){
        this.baseUrl = baseUrl
        this.queue = {}
    }

    HttpRequest.prototype.getInsideConfig = function(){
        const config = {
            baseURL: this.baseUrl,
            headers: {
            //
            },
            auth: false
        }
        return config
    }

    HttpRequest.prototype.destroy = function(url) {
        delete this.queue[url]
        if (!Object.keys(this.queue).length) {
            // Spin.hide()
        }
    }

    HttpRequest.prototype.interceptors = function(instance, options) {
        var url = options.url;
        var that = this;

        // 请求拦截
        instance.interceptors.request.use(function(config){
            // 添加全局的loading...
            if (!Object.keys(that.queue).length) {
                // Spin.show() // 不建议开启，因为界面不友好
            }
            that.queue[url] = true

            if(options.auth){
                config.headers['x-token'] = util.getToken();
            }

            return config

        }, function(error){
            return Promise.reject(error)
        })

        // 响应拦截
        instance.interceptors.response.use(function(res){
            that.destroy(url)

            var data = res.data,
                status = res.status;

            if(data.code == 400){
                /*var info = {
                    type: 'ajax',
                    code: data.code,
                    mes: data.error,
                    url: res.request.responseURL
                }
                util.addError(info);*/
                return Promise.reject(data.error);
            }else if(data.code == 201){
                return Promise.reject(data.error);
            }

            if(res.headers.http_x_auth_token != undefined){

                var store = require('../store/index');

                store.commit('setToken', res.headers.http_x_auth_token);
            }

            return { data: data, status: status }
        }, function(error){
            that.destroy(url)
            addErrorLog(error.response)
            return Promise.reject(error)
        })
    }

    HttpRequest.prototype.request = function(options) {
        const instance = axios.create()
        options = Object.assign(this.getInsideConfig(), options)
        this.interceptors(instance, options)
        return instance(options)
    }

    return HttpRequest;
})
