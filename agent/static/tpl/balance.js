/*
* @Author: brooke
* @Date:   2018-10-29 20:06:58
* @Last Modified by:   brooke
* @Last Modified time: 2018-11-01 17:07:58
*/
var modules = [
    'api/balance',
    'assets/js/date',
    'text!../views/balance.html',
    'css!../../static/assets/css/balance.css',
];

define(modules, function(BalanceApi, BrookeDate, balance)
{
    return {
        name: 'balance',
        template: balance,
        data: function(){
            return{
                forms: [],
                model: {
                    page: 1,
                    form: '',
                    date: ''
                },
                balanceLogs: [],
                total: 0,
                size: 0,
                balance: 0,
                incomeNum: 0,
                expendNum: 0,
                format: 'yyyy-MM-dd'
            }
        },
        created: function(){
            var that = this;

            this.list().then(function(result){
                var data = result.data;

                that.forms = data.forms;
                that.balance = data.balance;
                that.incomeNum = data.incomeNum;
                that.expendNum = data.expendNum;
                that.total = data.balanceLogs.total;
                that.size = data.balanceLogs.per_page;
                that.balanceLogs = data.balanceLogs.data;
            })
        },
        watch:{
            'model.page': function(){
                this.getInfo();
            },
            'model.date': function(date){
                if(typeof date == 'string') return;

                var dateObject = new BrookeDate(date);

                this.model.date = dateObject.Format(this.format);
            }
        },
        methods:{
            empty: function(){
                this.model.form = '';
                this.model.date = '';
            },

            getInfo: function()
            {
                var that = this;

                this.list().then(function(result){
                    var data = result.data;

                    that.total = data.balanceLogs.total;
                    that.balanceLogs = data.balanceLogs.data;
                })
            },

            pageChange: function(page){
                this.model.page = page;
            },

            search: function(){
                this.model.page = 1;

                this.getInfo();
            },

            list: function(){
                this.model.date = this.model.date || '';

                var that = this;

                return new Promise(function(resolve){
                    BalanceApi.index(that.model).then(function(res){
                        resolve(res.data);
                    })
                });
            }
        },
    }
})