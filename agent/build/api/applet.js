define(["libs/api.request"],function(e){return{index:function(t){return e.request({url:"agent/api/auth/bill/get_apply",method:"get",auth:!0,params:t})}}});