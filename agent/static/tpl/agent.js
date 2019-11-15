/*
* @Author: brooke
* @Date:   2018-10-29 13:30:41
* @Last Modified by:   brooke
* @Last Modified time: 2018-10-31 18:28:09
*/
var modules = [
    'api/user',
    'components/topHeader',
    'components/user/index',
    'components/leftBar',
    'components/footerBt',
    'components/accountSetting',
    'text!../views/agent.html',
    'css!../../static/assets/css/agent.css',
];

define(modules, function(UserApi, topHeader, user, leftBar, footerBt, accountSetting, agent)
{
    return {
        name : 'agent',
        template: agent,
        data: function(){
            return {
                settingModal: false
            }
        },
        components: {
            user: user,
            topHeader: topHeader,
            leftBar: leftBar,
            footerBt: footerBt,
            accountSetting: accountSetting
        },

        methods: {
            turnToPage: function(route) {
                var name, params, query;

                if (typeof route === 'string') name = route

                else {
                    name = route.name
                    params = route.params
                    query = route.query
                }

                if (name.indexOf('isTurnByHref_') > -1) {
                    window.open(name.split('_')[1])
                    return
                }

                this.$router.push({
                    name: name,
                    params: params,
                    query: query
                })
            },
            handleClick: function(item) {
                this.turnToPage(item)
            },
            tanShow: function(state){
                this.settingModal = state;
            },
            handleSubmit: function(data){
                var that = this;

                var submit = function(data){
                    return new Promise(function(resolve, reject){
                        UserApi.update(data).then(function(res){
                            resolve(res.data);
                        }).catch(function(msg){
                            reject(msg);
                        });
                    });
                }

                this.$refs.accountSetting.$emit('handleSubmit', submit(data));
            }
        },

        computed: {
            menuList: function() {
                return this.$store.getters.menuList
            },
            userAvator: function() {
                return this.$store.state.user.avatorImgPath
            },
            userAccount: function() {
                return this.$store.state.user.userAccount
            },
            hasReadErrorPage: function() {
                return this.$store.state.app.hasReadErrorPage
            }
        }
    }
});