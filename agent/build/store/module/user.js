define("store/module/user",["libs/util","api/user"],function(t,e){return{state:{userId:"",userName:"",userAccount:"",avatorImgPath:"",token:t.getToken(),hasGetInfo:!1},mutations:{setAvator:function(t,e){t.avatorImgPath=e},setUserId:function(t,e){t.userId=e},setUserName:function(t,e){t.userName=e},setAccess:function(t,e){t.access=e},setToken:function(e,n){e.token=n,t.setToken(n)},setHasGetInfo:function(t,e){t.hasGetInfo=e},setAccount:function(t,e){t.userAccount=e}},actions:{handleLogin:function(t,n){return n.userName=n.userName.trim(),n.verifyCode=n.verifyCode.trim(),new Promise(function(o,c){e.login(n).then(function(e){const n=e.data.data;t.commit("setToken",n.token),o()}).catch(function(t){c(t)})})},handleLogOut:function(t){return new Promise(function(n,o){e.logout(t.state.token).then(function(){t.commit("setToken",""),t.commit("setAccess",[]),n()}).catch(function(t){o(t)})})},getUserInfo:function(t){return new Promise(function(n,o){try{e.getUserInfo(t.state.token).then(function(e){const o=e.data.data;t.commit("setAccount",o.account),t.commit("setAvator",o.avator),t.commit("setUserName",o.name),t.commit("setUserId",o.id),t.commit("setAccess",o.access),t.commit("setHasGetInfo",!0),n(o)}).catch(function(t){o(t)})}catch(t){o(t)}})}}}});