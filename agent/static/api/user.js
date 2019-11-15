/*
* @Author: brooke
* @Date:   2018-10-29 15:37:31
* @Last Modified by:   brooke
* @Last Modified time: 2018-10-31 18:10:33
*/
define(['libs/api.request'], function(axios)
{
    const login = function(data){
        return axios.request({
            url: 'agent/api/login',
            data: data,
            method: 'post'
        })
    }

    const getUserInfo = function(token){
        return axios.request({
            url: 'agent/api/get_info',
            params: {
                token: token
            },
            method: 'get'
        })
    }

    const logout = function(token){
        return axios.request({
            url: 'agent/api/logout',
            method: 'post',
            data: {
                token: token
            }
        })
    }

    const update = function(data){
        return axios.request({
            url: 'agent/api/auth/agent',
            method: 'post',
            data: data,
            auth: true
        })
    }

    return { login: login, getUserInfo: getUserInfo, logout: logout, update: update }
});