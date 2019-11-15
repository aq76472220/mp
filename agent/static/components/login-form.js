/*
* @Author: brooke
* @Date:   2018-10-29 14:32:15
* @Last Modified by:   brooke
* @Last Modified time: 2018-10-30 10:09:46
*/
var modules = [
    'text!../views/login-form.html',
    'css!../../static/assets/css/login.css',
];


define(modules, function(loginForm){
    return {
        name: 'loginForm',
        template: loginForm,
        props: {
            userNameRules: {
                type: Array,
                default: function(){
                    return [
                        { required: true, message: '账号不能为空', trigger: 'blur' }
                    ]
                }
            },
            passwordRules: {
                type: Array,
                default: function(){
                    return [
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ]
                }
            },
            verifyCodeRules: {
                type: Array,
                default: function(){
                    return [
                        { required: true, message: '验证码不能为空', trigger: 'blur' }
                    ]
                }
            }
        },
        data: function() {
            return {
                form: {
                    userName: '',
                    password: '',
                    verifyCode: '',
                    rememberMe: false
                },
                randNum: this.getRandNum()
            }
        },
        computed: {
            rules: function() {
                return {
                    userName: this.userNameRules,
                    password: this.passwordRules,
                    verifyCode: this.verifyCodeRules
                }
            },
            verifyImg: function(){
                const baseUrl = process.env.NODE_ENV === 'development' ? this.$config.baseUrl.dev : this.$config.baseUrl.pro;

                return baseUrl + 'auth/verifyimg/' + this.randNum;
            }
        },
        methods: {
            handleSubmit: function() {
                var _this = this;

                this.$refs.loginForm.validate(function(valid){
                    if (valid) {
                        _this.$emit('on-success-valid', {
                            userName: _this.form.userName,
                            password: _this.form.password,
                            verifyCode: _this.form.verifyCode,
                            rememberMe: _this.form.rememberMe
                        });
                    }
                })
            },
            getRandNum: function(){
                return new Date().getTime();
            }
        },
        created: function(){
            var _this = this;

            this.$on('login-end', function(){
                _this.randNum = _this.getRandNum();
            });
        }
    }
})