/*
* @Author: brooke
* @Date:   2018-10-29 15:37:31
* @Last Modified by:   brooke
* @Last Modified time: 2018-10-30 14:08:43
*/
define(['libs/api.request'], function(axios)
{
    const index = function(params){
        return axios.request({
            url: 'agent/api/auth/bill/get_apply',
            method: 'get',
            auth: true,
            params: params
        })
    }

    return { index: index }
});