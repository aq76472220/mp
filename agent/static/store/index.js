/*
* @Author: brooke
* @Date:   2018-10-29 11:21:50
* @Last Modified by:   brooke
* @Last Modified time: 2018-10-30 15:07:27
*/
var modules = [
    'vue',
    'vuex',
    'store/module/user',
    'store/module/app'
];

define(modules, function(Vue, Vuex, user, app)
{
    Vue.use(Vuex)

    return new Vuex.Store({
        state: {

        },
        mutations: {

        },
        actions: {

        },
        modules: {
            user: user,
            app: app
        }
    })
});
