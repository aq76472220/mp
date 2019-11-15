
var modules = [
    '_path',
    'text!../views/footer-bt.html'
];

define(modules, function(_path, footerBt)
{
    return {
        name: 'footerBt',

        template: footerBt,

        data: function(){
            return {
                bot_logo:''
            }
        },

        mounted(){
            // oem增加判断
            var agent_web_info = JSON.parse(window.localStorage.getItem('agent_web_info'));
            if (agent_web_info.agent_isoem) {
                this.bot_logo = '/static/oem/' + window.location.host + '/img/agent_bot_logo.png';
            } else {
                this.bot_logo = this._path('./assets/images/logo2.png');
            }
        },
        mixins: [ _path ]
    }
})