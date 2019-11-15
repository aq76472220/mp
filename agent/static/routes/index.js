/*
* @Author: brooke
* @Date:   2018-10-29 13:30:41
* @Last Modified by:   pigcms
* @Last Modified time: 2018-10-31 09:48:22
*/

var modules = [
    "vue",
    "router",
    "routes/routers",
    "config/index",
    "libs/util",
    "store/index"
];

define(modules, function(Vue, VueRouter, Routers, config, util, store)
{
    Vue.use(VueRouter);

    const router = new VueRouter({
        routes: Routers,
        //mode: 'history'
    });

    const LOGIN_PAGE_NAME = 'login'

    router.beforeEach(function(to, from, next){
        //iView.LoadingBar.start()
        const token = util.getToken()

        if (!token && to.name !== LOGIN_PAGE_NAME) {
            // 未登录且要跳转的页面不是登录页
            next({
                name: LOGIN_PAGE_NAME // 跳转到登录页
            })
        } else if (!token && to.name === LOGIN_PAGE_NAME) {
            // 未登陆且要跳转的页面是登录页
            next() // 跳转
        } else if (token && to.name === LOGIN_PAGE_NAME) {
            // 已登录且要跳转的页面是登录页
            next({
                name: config.homeName // 跳转到homeName页
            })
        } else {
            if (store.state.user.hasGetInfo) {
                next()
            } else {
                store.dispatch('getUserInfo').then(function(user){
                    // 拉取用户信息，通过用户权限和跳转的页面的name来判断是否有权限访问;access必须是一个数组，如：['super_admin'] ['super_admin', 'admin']
                    next()
                }).catch(function(){
                    //退出  跳到登录页面
                    store.dispatch('handleLogOut').then(function(user){
                        next({
                            name: LOGIN_PAGE_NAME
                        })
                    })
                })
            }
        }
    })

    router.afterEach(function(to){
        //iView.LoadingBar.finish()
        window.scrollTo(0, 0)
    })

    return router;
});

