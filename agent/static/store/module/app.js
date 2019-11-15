/*
* @Author: brooke
* @Date:   2018-10-29 11:21:50
* @Last Modified by:   brooke
* @Last Modified time: 2018-10-30 15:23:31
*/

define('store/module/app', ['api/data', 'libs/util', 'routes/agent-router'], function(DataApi, util, agentRouter)
{
    return {
        state: {
            errorList: [],
            hasReadErrorPage: false,
        },

        getters:{
            menuList: function(state, getters, rootState){
                return agentRouter
            },
            errorCount: function(state){
                return state.errorList.length
            }
        },

        mutations: {
            addError: function(state, error) {
                state.errorList.push(error)
            },
            setHasReadErrorLoggerStatus: function(state, status) {
                state.hasReadErrorPage = status || true;
            }
        },

        actions: {
            addErrorLog: function(context, info) {
                if (!window.location.href.includes('error_logger_page')) context.commit('setHasReadErrorLoggerStatus', false)

                var token = context.rootState.user.token,
                    userId = context.rootState.user.userId,
                    userName = context.rootState.user.userName;

                var data = Object.assign({
                    time: Date.parse(new Date()),
                    token: token,
                    userId: userId,
                    userName: userName
                }, info);

                DataApi.saveErrorLogger(info).then(function(){
                    util.addError(info);
                })
            },
            addError: function(context, data){
                var token = context.rootState.user.token,
                    userId = context.rootState.user.userId,
                    userName = context.rootState.user.userName;

                var user = {
                    token: token,
                    userId: userId,
                    userName: userName
                };

                data = Object.assign(data, user);

                context.commit('addError', data);
            }
        }
    }
});