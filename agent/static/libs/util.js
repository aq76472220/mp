/*
* @Author: brooke
* @Date:   2018-10-29 15:41:05
* @Last Modified by:   brooke
* @Last Modified time: 2018-10-30 15:47:52
*/
define(['require', 'libs/cookie', 'config/index'], function(require, Cookies, config){
    const TOKEN_KEY = 'token'

    const setToken = function(token){
        Cookies.set(TOKEN_KEY, token, {expires: config.cookieExpires || 1})
    }

    const getToken = function(){
        const token = Cookies.get(TOKEN_KEY)
        if (token) return token
        else return false
    }

    const addError = function(info){
        var data = Object.assign({ time: Date.parse(new Date()) }, data);

        var store = require('../store/index');

        store.dispatch('addError', data);
    }

    const localSave = function(key, value){
        localStorage.setItem(key, value)
    }

    const localRead = function(key){
        return localStorage.getItem(key) || ''
    }

    const doCustomTimes = function(times, callback){
        var i = -1
            while (++i < times) {
            callback(i)
        }
    }

    /**
     * @param {*} access 用户权限数组，如 ['super_admin', 'admin']
     * @param {*} route 路由列表
     */
    const hasAccess = function(access, route){
        if (route.meta && route.meta.access) return hasOneOf(access, route.meta.access)
        else return true
    }

    /**
     * 权鉴
     * @param {*} name 即将跳转的路由name
     * @param {*} access 用户权限数组
     * @param {*} routes 路由列表
     * @description 用户是否可跳转到该页
     */
    const canTurnTo = function(name, access, routes){ //导出
        const routePermissionJudge = function(list){
            return list.some(function(item){
                if (item.name === name) {
                    return hasAccess(access, item)
                }
            })
        }

        return routePermissionJudge(routes)
    }

    return {
        TOKEN_KEY: TOKEN_KEY,
        setToken: setToken,
        getToken: getToken,
        addError: addError,
        localSave: localSave,
        localRead: localRead,
        doCustomTimes: doCustomTimes,
        canTurnTo: canTurnTo
    }
});