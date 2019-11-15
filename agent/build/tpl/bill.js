/*
 * @Author: brooke
 * @Date:   2018-10-29 20:07:57
 */
var modules = ['api/bill', 'libs/jquery', 'libs/tools', 'text!../views/bill.html', 'css!../../static/assets/css/bill.css', ];
define(modules, function(BillApi, jquery, tools, bill) {
    return {
        name: 'bill',
        template: bill,
        data: function() {
            return {
                formLabelWidth: '100px',
                dialogFormVisible: false,
                size: 0,
                total: 0,
                form: {
                    name: '',
                    type: '',
                    page: 1
                },
                tableBill: [],
                // service:{ // 选择服务类型等
                //     type:'',
                //     id:0,
                //     active1:'',
                //     active3:[],
                //     price:0
                // },
                active:0,
                activeCon1:[], // 应用的内容
                activeCon3:[], // 套餐的内容
                serviceContent:[],
                strategy:[], // 购买按钮内容
                formBill: {
                    user_id: '',
                    app_id: '',
                    package_id: '',
                    type: '',
                    cycle: '',
                    id:0,
                    active1:'',
                    active3:[],
                    price:0,
                    strategy_index:-1,
                    service_id:0,
                    service_strategy_id:0,
                    service_name:'',
                },
                formBillBf: {},
                applets: [],
                packages: [],
                types: [],
                customs: [],
                agent:[]
            }
        },
        watch: {
            'form.page': function() {
                this.getInfo();
            },
            'formBill.user_id': function() {
                this.formBill.app_id = '';
                this.getApplet();
            },
            'formBill.app_id': function(app_id) {
                var app = this.applets.filter(function(item) { //返回数组，filter函数获取满足条件的项
                    return item.id == app_id
                }).shift();
                // this.formBill.type = app ? app.type : ''; // 暂时没用
            },
            'formBill.type': function() {
                this.formBill.active1 = '';
                // this.formBill.active3 = [];
                this.formBill.strategy_index = -1;
                this.formBill.service_id = 0;
                this.formBill.service_strategy_id = 0;
                this.formBill.service_name = '';
                this.formBill.price = 0;
                this.strategy = [];
                this.serviceList();
            },
            'formBill.active1': function() {
                if (this.formBill.active1 != "") {
                    this.formBill.strategy_index = -1;
                    this.formBill.price = 0;
                    console.log('formBill', this.formBill);
                    console.log('active1', this.formBill.active1);
                    this.strategy = this.activeCon1[this.formBill.active1].sales.strategy;
                    console.log(this.strategy);
                    this.formBill.service_id = this.activeCon1[this.formBill.active1].id;
                    this.formBill.service_name = this.activeCon1[this.formBill.active1].name;
                }
            },
            'formBill.active3': function() {
                if (this.formBill.active3) {
                    this.formBill.strategy_index = -1;
                    this.formBill.price = 0;
                    console.log('active3', this.formBill.active3);
                    this.strategy = this.activeCon3[this.formBill.active3[0]].children[this.formBill.active3[1]].sales.strategy;
                    console.log(this.strategy);
                    this.formBill.service_id = this.activeCon3[this.formBill.active3[0]].children[this.formBill.active3[1]].id;
                    this.formBill.service_name = this.activeCon3[this.formBill.active3[0]].name
                         + '（'
                         + this.activeCon3[this.formBill.active3[0]].children[this.formBill.active3[1]].name
                         + '）';
                }
            }
        },
        methods: {
            changeActive: function (index) {
                console.log('选中：', index);
                // this.active = index;
                this.formBill.strategy_index = index;

                if (this.formBill.type == 1) {
                    this.formBill.price = this.activeCon1[this.formBill.active1].sales.strategy[index].fee;
                    this.formBill.service_strategy_id = this.activeCon1[this.formBill.active1].sales.strategy[index].id;
                } else if (this.formBill.type == 3) {
                    this.formBill.price = this.activeCon3[this.formBill.active3[0]].children[this.formBill.active3[1]].sales.strategy[index].fee;
                    this.formBill.service_strategy_id = this.activeCon3[this.formBill.active3[0]].children[this.formBill.active3[1]].sales.strategy[index].id;
                }
            },
            serviceList: function () {
                var that = this;
                this.getService().then(function(result) {
                    var data = result.data;
                    that.serviceContent = data;
                    that.activeList();
                    console.log('333', that.serviceContent);
                });
            },
            getService: function() {
                var that = this;
                return new Promise(function(resolve) {
                    BillApi.service(that.formBill).then(function(res) {
                        resolve(res.data);
                    })
                });
            },
            activeList: function () {
                if (this.formBill.type == 1) {
                    this.activeCon1 = this.serviceContent.service_list;
                    console.log('activeCon1', this.activeCon1);
                } else if (this.formBill.type == 3) {
                    this.activeCon3 = this.serviceContent.service_list;
                    for (var i = 0; i < this.activeCon3.length; i++) {
                        this.activeCon3[i].children = this.activeCon3[i].detail;
                        this.activeCon3[i].value = i;
                        this.activeCon3[i].label = this.activeCon3[i].name;

                        for (var j = 0; j < this.activeCon3[i].children.length; j++) {
                            this.activeCon3[i].children[j].value = j;
                            this.activeCon3[i].children[j].label = this.activeCon3[i].children[j].name;
                        }
                    }
                    console.log('activeCon3', this.activeCon3);
                }
            },

            list: function() {
                var that = this;
                return new Promise(function(resolve) {
                    BillApi.index(that.form).then(function(res) {
                        resolve(res.data);
                    })
                });
            },
            config: function() {
                var that = this;
                return new Promise(function(resolve) {
                    BillApi.config().then(function(res) {
                        resolve(res.data);
                    })
                });
            },
            applet: function() {
                var that = this;
                return new Promise(function(resolve) {
                    BillApi.applet(that.formBill.user_id).then(function(res) {
                        resolve(res.data);
                    })
                });
            },
            save: function() {
                var that = this;
                return new Promise(function(resolve, reject) {
                    BillApi.save(that.formBill).then(function(res) {
                        resolve(res.data);
                    }).catch(function(msg) {
                        reject(msg);
                    })
                });
            },
            formatting: function() {
                tools.forEach(this.tableBill, function(order) {
                    order.username = order.username || '--';
                    order.applet_name = order.applet_name || '未授权小程序(ID:' + (8000 + order.app_id) + ')';
                });
            },
            empty: function() {
                this.form.name = '';
                this.form.type = '';
            },
            pageChange: function(page) {
                this.form.page = page;
            },
            search: function() {
                this.form.page = 1;
                this.getInfo();
            },
            getInfo: function() {
                var that = this;
                this.list().then(function(result) {
                    var data = result.data;
                    that.total = data.orders.total;
                    that.tableBill = data.orders.data;
                    that.formatting();
                });
            },
            getApplet: function() {
                this.applets = [];
                var that = this;
                this.applet().then(function(result) {
                    that.applets = result.data;
                });
            },
            confirm: function() {
                if (this.formBill.service_id == 0 || this.formBill.service_strategy_id == 0 || this.formBill.type == '' || this.formBill.user_id == '') {
                    this.$message.error('每一项都必选');
                    return;
                }

                var that = this;
                var userPhone = '';
                var userName = '';
                for (var i = 0; i < that.customs.length; i++) {
                    if (that.formBill.user_id == that.customs[i].id) {
                        userPhone = that.customs[i].phone ? that.customs[i].phone : '出现错误';
                        userName = that.customs[i].nickname ? that.customs[i].nickname : '出现错误';
                    }
                }
                // var appletObj = that.applets.find(function(x) {
                //     return x.app_id = that.formBill.app_id;
                // });
                var appletName = '小程序';
                for (var i = 0; i < that.applets.length; i++) {
                    if (that.formBill.app_id == that.applets[i].id) {
                        appletName = that.applets[i].name ? that.applets[i].name : appletName + (i + 1);
                    }
                }

                if (that.formBill.type == 1) {
                    var serviceType = '应用';
                    var serviceName = that.activeCon1[that.formBill.active1].name;
                    var serviceStrategy = that.activeCon1[that.formBill.active1].sales.strategy[that.formBill.strategy_index].title;
                    var fee = that.activeCon1[that.formBill.active1].sales.strategy[that.formBill.strategy_index].fee;
                } else {
                    var serviceType = '套餐';
                    var serviceName = that.activeCon3[that.formBill.active3[0]].children[that.formBill.active3[1]].name;
                    var serviceStrategy = that.activeCon3[that.formBill.active3[0]].children[that.formBill.active3[1]].sales.strategy[that.formBill.strategy_index].title;
                    var fee = that.activeCon3[that.formBill.active3[0]].children[that.formBill.active3[1]].sales.strategy[that.formBill.strategy_index].fee;
                }


                // var packageName = '';
                // for (var i = 0; i < that.packages.length; i++) {
                //     if (that.formBill.package_id == that.packages[i].id) {
                //         packageName = that.packages[i].name ? that.packages[i].name : packageName;
                //     }
                // }
                // var typeName = '新开';
                // for (var i = 0; i < that.types.length; i++) {
                //     if (that.formBill.type == that.types[i].id) {
                //         typeName = that.types[i].msg ? that.types[i].msg : typeName;
                //     }
                // }
                // this.$confirm('<table class="tidan_confirm"><tr><td class="tidan_left">客户：</td><td>' + userPhone + '（' + userName + '）</td></tr><tr><td class="tidan_left">小程序：</td><td>' + appletName + '</td></tr><tr><td class="tidan_left">套餐：</td><td>' + packageName + '</td></tr><tr><td class="tidan_left">类型：</td><td>' + typeName + '</td></tr><tr><td class="tidan_left">周期：</td><td>' + that.formBill.cycle + ' 年</td></tr></table>', '请确认你的提单信息，提交后将不能更改', {
                this.$confirm('<table class="tidan_confirm"><tr><td class="tidan_left">客户：</td><td>'
                     + userPhone
                     + '（' + userName + '）</td></tr><tr><td class="tidan_left">小程序：</td><td>'
                     + appletName
                     + '</td></tr><tr><td class="tidan_left">类型：</td><td>'
                     + serviceType + '</td></tr><tr><td class="tidan_left">产品：</td><td>'
                     + serviceName + '</td></tr><tr><td class="tidan_left">周期：</td><td>'
                     + serviceStrategy + '</td></tr><tr><td class="tidan_left">价格：</td><td>'
                     + fee + '（代理价：'+ (fee * that.agent.discount)/10 +'）</td></tr></table>', '请确认你的提单信息，提交后将不能更改',
                 {
                    dangerouslyUseHTMLString: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    // this.$message({
                    //     type: 'success',
                    //     message: '成功!'
                    // });
                    this.save().then(function(res) {
                        console.log('save return:', res);
                        if (res.code == 200) {
                            that.$message.success('提单成功');
                            that.formBill = jquery.extend(that.formBill, that.formBillBf);
                            that.dialogFormVisible = false;
                            that.getInfo();
                        } else {
                            that.$message.success(res.error);
                            that.formBill = jquery.extend(that.formBill, that.formBillBf);
                            that.dialogFormVisible = false;
                            that.getInfo();
                        }
                    }).catch(function(msg) {
                        that.$message.error(msg);
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
        },
        created: function() {
            var that = this;
            this.config().then(function(result) {
                var data = result.data;
                that.customs = data.customs;
                that.agent = data.agent;
                that.packages = data.packages;
                tools.forEach(that.packages, function(item, index) {
                    if (index == 0) that.formBill.package_id = item.id;
                });
                that.list().then(function(result) {
                    var data = result.data;
                    that.types = data.types;
                    that.size = data.orders.per_page;
                    that.total = data.orders.total;
                    that.tableBill = data.orders.data;
                    that.formatting();
                });
            })
            this.formBillBf = jquery.extend(this.formBillBf, this.formBill);
        }
    }
})