/*
* @Author: brooke
* @Date:   2018-10-29 11:21:50
* @Last Modified by:   brooke
* @Last Modified time: 2018-11-01 11:15:55
*/

define('store/module/user', ['libs/util', 'api/user'], function(util, UserApi)
{
    return {
        state: {
            userId: '',
            userName: '',
            userAccount: '',
            avatorImgPath: '',
            token: util.getToken(),
            hasGetInfo: false,
        },

        mutations: {
            setAvator: function(state, avatorPath) {
                state.avatorImgPath = avatorPath
            },
            setUserId: function(state, id) {
                state.userId = id
            },
            setUserName: function(state, name) {
                state.userName = name
            },
            setAccess: function(state, access) {
                state.access = access
            },
            setToken: function(state, token) {
                state.token = token
                util.setToken(token)
            },
            setHasGetInfo: function(state, status) {
                state.hasGetInfo = status
            },
            setAccount: function(state, account) {
                state.userAccount = account
            },
        },
        actions: {
            handleLogin: function(context, data) {
                data.userName = data.userName.trim()
                data.verifyCode = data.verifyCode.trim()

                return new Promise(function(resolve, reject){
                    UserApi.login(data).then(function(res){
                        const data = res.data.data;
                        context.commit('setToken', data.token)
                        resolve()
                    }).catch(function(err){
                        reject(err)
                    })
                })
            },
            // 退出登录
            handleLogOut: function(context) {
                return new Promise(function(resolve, reject){
                    UserApi.logout(context.state.token).then(function(){
                        context.commit('setToken', '')
                        context.commit('setAccess', [])
                        resolve()
                    }).catch(function(err){
                        reject(err)
                    })
                    // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
                    // context.commit('setToken', '')
                    // context.commit('setAccess', [])
                    // resolve()
                })
            },
            // 获取用户相关信息
            getUserInfo: function(context) {
                return new Promise(function(resolve, reject){
                    try {
                        UserApi.getUserInfo(context.state.token).then(function(res){
                            const data = res.data.data;
                            context.commit('setAccount', data.account)
                            context.commit('setAvator', data.avator)
                            context.commit('setUserName', data.name)
                            context.commit('setUserId', data.id)
                            context.commit('setAccess', data.access)
                            context.commit('setHasGetInfo', true)
                            resolve(data)
                        }).catch(function(err){
                            reject(err)
                        })
                    } catch (error) {
                        reject(error)
                    }
                })
            }
        }
    }
});