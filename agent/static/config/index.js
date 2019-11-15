/**
 * @Author: brooke
 * @Date:   2018-10-29 14:38:49
 */

define(function()
{
    var productUrl = window.location.protocol + '//' + document.domain + '/index.php/';

    return {
        /**
         * @description token在Cookie中存储的天数，默认1天
        */
        cookieExpires: 1,

        /**
        * @description api请求基础路径
        */
        baseUrl: {
            dev: 'http://qingxiaoyun.com/index.php/',
            pro: productUrl
        },

        /**
        * @description 首页地址
        */
        homeName: 'survey',
    }
});