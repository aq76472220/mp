
var modules = [
    '_path',
    'components/login-form',
    'text!../views/login.html',
    'css!../../static/assets/css/login.css',
];

define(modules, function(_path, loginForm, login)
{
    return {
        name : 'login',

        template: login,

        components: { loginForm: loginForm },

        data: function(){
            return {
                form_box_left: '25%',
                agent_login_img : '',
            }
        },

        methods:{
            handleSubmit: function(data){
                var _that = this;

                var submit = function(data){
                    return new Promise(function(resolve, reject){
                        _that.$store.dispatch('handleLogin', data).then(function(res){
                            _that.$store.dispatch('getUserInfo').then(function(res){
                                resolve(res);
                            }).catch( function(msg){
                                reject(msg);
                            });
                        }).catch(function(msg){
                            reject(msg);
                        });
                    });
                }

                submit(data).then(function(res){
                    _that.$router.push({
                        name: _that.$config.homeName
                    })
                }).catch(function(msg){
                    _that.$message.error(msg);
                    _that.$refs.login.$emit('login-end');
                })
            }
        },

        mounted:function(){
            var w = document.documentElement.clientWidth || document.body.clientWidth;

            var blank = w - 900;

            this.form_box_left = blank / 2 + 'px';

            // oem‘ˆº”≈–∂œ
            var agent_web_info = JSON.parse(window.localStorage.getItem('agent_web_info'));

            if (agent_web_info.agent_isoem) {
                this.agent_login_img = agent_web_info.agent_login_img;
            } else {
                this.agent_login_img = this._path('./assets/images/login-logo.png');
            }
        },

        mixins: [ _path ]
    }
});
