/*
* @Author: brooke
* @Date:   2018-10-29 20:07:56
* @Last Modified by:   brooke
* @Last Modified time: 2018-10-31 14:12:15
*/
var modules = [
    'api/custom',
    'libs/tools',
    'text!../views/custom.html',
    'css!../../static/assets/css/custom.css',
];

define(modules, function(CustomApi, tools, custom){
    return {
        name: 'custom',
        template: custom,
        data: function(){
            return{
                dialogFormVisible: false,
                formLabelWidth: '100px',

                size: 0,
                total: 0,
                tableCustomer:[],

                form:{
                    name:'',
                    region:'',
                    page: 1
                },

                status: 0,
                error: '',
                model: {
                    phone:'',
                    password:'',
                    nickname:'',
                    validateCode:''
                },

                rules: {
                    phone: [
                        { required: true, message: '请输入客户手机号', trigger: 'blur' },
                        { min: 11, max: 11, message: '长度为 11 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入登录密码', trigger: 'blur' },
                        { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                    ],
                    validateCode: [
                        { required: true, message: '请输入验证码', trigger: 'blur' }
                    ],
                },

                types: []
            }
        },
        created: function(){
            var that = this;

            this.list().then(function(result){
                var data = result.data;

                that.types = data.types;
                that.total = data.users.total;
                that.size = data.users.per_page;
                that.tableCustomer = data.users.data;
            })
        },
        watch:{
            'form.page': function(){
                this.getInfo();
            },
            status: function(status){
                if(status < 0) this.error = status == -1 ? '该用户已是其他代理客户' : '该用户已添加';
            }
        },
        methods:{
            list: function(){
                var that = this;

                return new Promise(function(resolve){
                    CustomApi.index(that.form).then(function(res){
                        resolve(res.data);
                    }).catch(function(msg){
                        reject(msg);
                    })
                });
            },

            save: function(){
                var that = this;

                return new Promise(function(resolve){
                    CustomApi.save(that.model).then(function(res){
                        resolve(res.data);
                    })
                });
            },

            getInfo: function(){
                var that = this;

                this.list().then(function(result){
                    var data = result.data;

                    that.total = data.users.total;
                    that.tableCustomer = data.users.data;
                })
            },

            pageChange: function(page){
                this.form.page = page;
            },

            search: function(){
                this.form.page = 1;

                this.getInfo();
            },

            checkPhone: function(){
                this.status = 0; this.error = '';

                if(this.model.phone == '' || this.model.phone.length < 11 || this.model.phone.length > 11) return;

                if(! tools.isPhone(this.model.phone)){
                    this.error = '请输入正确的手机号码';
                    return;
                }

                var that = this;

                var getCustomerPhone = function(phone){
                    return new Promise(function(resolve){
                        CustomApi.check_phone(phone).then(function(res){
                            resolve(res.data);
                        })
                    })
                }

                getCustomerPhone(this.model.phone).then(function(result){
                    that.status = result.data.status;
                })
            },

            sendCode: function(){
                var that = this;

                var sendCode = function(phone){
                    return new Promise(function(resolve,reject){
                        CustomApi.send_code(phone).then(function(res){
                            resolve(res.data);
                        }).catch(function(msg){
                            reject(msg);
                        })
                    })
                }

                sendCode(this.model.phone).then(function(res){
                    that.$message.success('发送成功');
                }).catch(function(msg){
                    that.$message.error(msg);
                });
            },

            confirm: function(){
                var that = this;

                this.$refs.addForm.validate(function(valid){
                    if (valid) {
                        if(! tools.isPhone(that.model.phone)){
                            that.error = '请输入正确的手机号码';
                            return;
                        }

                        that.save().then(function(res){
                            that.$message.success('开通成功');
                            that.$refs.addForm.resetFields();
                            that.dialogFormVisible = false;
                            that.getInfo();
                        }).catch(function(msg){
                            that.$message.error(msg);
                        });
                    }
                });
            },
            empty: function(){
                this.form.name = '';
                this.form.region = '';
            },
            applt_view: function(id){
                this.$router.push({ name: 'applet', query:{user_id: id} });
            }
        }
    }
})