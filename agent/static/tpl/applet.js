/*
* @Author: brooke
* @Date:   2018-10-29 20:07:59
* @Last Modified by:   brooke
* @Last Modified time: 2018-11-01 09:45:56
*/
var modules = [
    'api/applet',
    'libs/tools',
    'text!../views/applet.html',
    'css!../../static/assets/css/bill.css',
];

define(modules, function(AppletApi, tools, applet){
    return {
        name: 'applet',
        template: applet,
        data: function(){
            return{
                form:{
                    name:'',
                    state:'',
                    page: 1,
                    user_id: ''
                },

                tableSmallProgram:[],

                total: 0,
                size: 0,

                states: []
            }
        },
        watch:{
            'form.page': function(){
                this.getInfo();
            }
        },
        methods:{
            list: function(){
                var that = this;

                return new Promise(function(resolve){
                    AppletApi.index(that.form).then(function(res){
                        resolve(res.data);
                    })
                });
            },
            formatting: function(){
                tools.forEach(this.tableSmallProgram, function(apply){
                    apply.app_id = parseInt(apply.app_id) + 8000;
                    apply.authorize = apply.applet_name ? '是' : '否'
                    apply.applet_name = apply.applet_name || '未授权小程序';
                    apply.package_name = apply.package_name + '套餐/' + apply.original_money
                });
            },
            getInfo: function(){
                var that = this;

                this.list().then(function(result){
                    var data = result.data;

                    that.total = data.applys.total;
                    that.tableSmallProgram = data.applys.data;

                    that.formatting();
                });
            },
            empty: function(){
                this.form.name = '';
                this.form.state = '';
            },
            pageChange: function(page){
                this.form.page = page;
            },
            search: function(){
                this.form.page = 1;

                this.getInfo();
            }
        },
        created: function(){
            this.form.user_id = this.$route.query.user_id || '';

            var that = this;

            this.list().then(function(result){
                var data = result.data;

                that.states = data.states;
                that.total = data.applys.total;
                that.size = data.applys.per_page;
                that.tableSmallProgram = data.applys.data;

                that.formatting();
            });
        }
    }
})