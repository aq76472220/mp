define(["require","libs/cookie","config/index"],function(e,n,t){const o=function(e,n){return!n.meta||!n.meta.access||hasOneOf(e,n.meta.access)};return{TOKEN_KEY:"token",setToken:function(e){n.set("token",e,{expires:t.cookieExpires||1})},getToken:function(){const e=n.get("token");return e||!1},addError:function(n){var t=Object.assign({time:Date.parse(new Date)},t);e("../store/index").dispatch("addError",t)},localSave:function(e,n){localStorage.setItem(e,n)},localRead:function(e){return localStorage.getItem(e)||""},doCustomTimes:function(e,n){for(var t=-1;++t<e;)n(t)},canTurnTo:function(e,n,t){return function(t){return t.some(function(t){if(t.name===e)return o(n,t)})}(t)}}});