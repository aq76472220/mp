/*
* @Author: brooke
* @Date:   2018-10-29 15:37:31
* @Last Modified by:   brooke
* @Last Modified time: 2018-10-30 13:14:06
*/
define(['libs/api.request'], function(axios)
{
    const index = function(params){
        return axios.request({
            url: 'agent/api/auth/balance',
            method: 'get',
            params: params,
            auth: true
        })
    }

    return { index: index }
});