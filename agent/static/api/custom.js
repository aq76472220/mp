/*
* @Author: brooke
* @Date:   2018-10-29 15:37:31
* @Last Modified by:   brooke
* @Last Modified time: 2018-10-30 15:10:31
*/
define(['libs/api.request'], function(axios)
{
    const index = function(params){
        return axios.request({
            url: 'agent/api/auth/customer',
            method: 'get',
            params: params,
            auth: true
        })
    }

    const check_phone = function(phone){
        return axios.request({
            url: 'agent/api/auth/customer/check_phone',
            method: 'get',
            params: {
                phone: phone
            },
            auth: true
        })
    }

    const send_code = function(phone){
        return axios.request({
            url: 'auth/verify',
            method: 'post',
            data: {
                phone: phone
            }
        })
    }

    const save = function(data){
        return axios.request({
            url: 'agent/api/auth/customer',
            method: 'post',
            data: data,
            auth: true
        })
    }

    return { index: index, check_phone: check_phone, send_code: send_code, save: save }
});