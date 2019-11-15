/*
* @Author: brooke
* @Date:   2018-10-29 13:30:41
* @Last Modified by:   brooke
* @Last Modified time: 2018-10-31 20:57:32
*/
var modules = [
    'echarts',
    '_path',
    'api/data',
    'text!../views/survey.html',
    'css!../../static/assets/css/survey.css',
];

define(modules, function(echarts, _path, DataApi, survey) {
    return {
        name : 'survey',
        template: survey,
        data: function(){
            return{
                options: [{
                    value: '选项1',
                    label: '最近1天'
                }, {
                    value: '选项2',
                    label: '最近3天'
                }],
                value: '',

                customNum: 0,
                billNum: 0,
                expendNum: 0,
                upcomingDueAppletNum: 0
            }
        },
        methods:{
            get: function(){
                var that = this;

                return new Promise(function(resolve){
                    DataApi.survey().then(function(res){
                        resolve(res.data);
                    }).catch(function(msg){
                        reject(msg);
                    })
                });
            },
            customView: function(){
                this.$router.push({name: 'custom'});
            }
        },
        mounted: function() {
            /*ECharts图表*/
            var myChart = echarts.init(document.getElementById('myChart'));
            myChart.setOption({
                title: {
    //               text: '堆叠区域图'
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
                    data:['SIDE1','SIDE2']
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : ['2011','2012','2013','2014','2015','2016','2017']
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'SIDE1',
                        type:'line',
    //                  stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                color: '#fff', // 数字颜色
                                position: 'top'
                            }
                        },
                        itemStyle: {
                            normal: {
                                borderColor: 'red', // 边框颜色
                                color: '#fafafa', // 折线上标记点的颜色 和 图例的颜色

                                lineStyle: {
                                    width: 1, //  折线图的粗细
                                    color: '#6ce6d9' // 折线的颜色
                                }

                            }

                        },
                         areaStyle: {
                            normal: {
                                type: 'default',
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#6ce6d9' // 区域颜色

                                }, {
                                    offset: 1,
                                    color: '#6ce6d9' // 区域颜色

                                }], false)

                         }
                       },
                        data:[120, 132, 101, 200, 90, 230, 210]
                    },
                    {
                        name:'SIDE2',
                        type:'line',
    //                  stack: '总量',
                      label: {
                            normal: {
                                show: true,
                                color: '#fff', // 数字颜色
                                position: 'top'
                            }
                        },
                        itemStyle: {
                            normal: {
                                borderColor: '#', // 边框颜色
                                color: '#fafafa', // 折线上标记点的颜色 和 图例的颜色
                                lineStyle: {
                                    width: 1, //  折线图的粗细
                                    color: '#959dfa' // 折线的颜色
                                }
                            }

                        },
                         areaStyle: {
                            normal: {
                                type: 'default',
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#959dfa' // 区域颜色

                                }, {
                                    offset: 1,
                                    color: '#959dfa' // 区域颜色

                                }], false)

                         }
                      },
                      data:[220, 182, 191, 234, 290, 130, 310]
                    },

                ]

            })
        },
        created: function(){
            var that = this;

            this.get().then(function(result){
                var data = result.data;

                that.customNum = data.customNum;
                that.billNum = data.billNum;
                that.expendNum = data.expendNum;
                that.upcomingDueAppletNum = data.upcomingDueAppletNum;
            })
        },
        mixins: [ _path ]
    }
});