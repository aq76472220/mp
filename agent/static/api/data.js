/*
* @Author: brooke
* @Date:   2018-10-29 15:37:31
* @Last Modified by:   brooke
* @Last Modified time: 2018-11-08 18:30:25
*/
define(['libs/api.request'], function(axios)
{
    const saveErrorLogger = function(data){
        return axios.request({
            url: 'save_error_logger',
            data: data,
            method: 'post'
        });
    }

    const survey = function(data){
        return axios.request({
            url: 'agent/api/auth/agent/survey',
            method: 'get',
            auth: true
        });
    }

    return { saveErrorLogger: saveErrorLogger, survey: survey }
});