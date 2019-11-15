/*
* @Author: brooke
* @Date:   2018-10-29 15:37:31
* @Last Modified by:   pigcms
* @Last Modified time: 2019-10-16 15:20:33
*/
define(['libs/api.request'], function(axios)
{
    const index = function(params){
        return axios.request({
            url: 'agent/api/auth/bill',
            method: 'get',
            auth: true,
            params: params
        })
    }

    const config = function(){
        return axios.request({
            url: 'agent/api/auth/bill/config',
            method: 'get',
            auth: true
        })
    }

    const applet = function(user_id){
        return axios.request({
            url: 'agent/api/auth/bill/get_applet',
            method: 'get',
            params:{
                user_id: user_id
            },
            auth: true
        })
    }

    const save = function(data){
        return axios.request({
            url: 'agent/api/auth/bill',
            method: 'post',
            data: data,
            auth: true
        })
    }

    const service = function(params) {
        return axios.request({
            url: 'agent/api/auth/bill/service',
            method: 'get',
            params: params,
            auth: true
        })
    }

    return { index: index, config: config, applet: applet, save: save, service: service }
});