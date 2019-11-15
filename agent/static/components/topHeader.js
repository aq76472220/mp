
var modules = [
    '_path',
    'text!../views/tpl-header.html'
];

define(modules, function(_path, tplHeader){
    return {
        name: 'topHeader',

        template: tplHeader,

        data: function(){
            return{
                agent_logo : ''
            }
        },

        mounted:function(){
            // oem‘ˆº”≈–∂œ
            var agent_web_info = JSON.parse(window.localStorage.getItem('agent_web_info'));
            if (agent_web_info.agent_isoem) {
                this.agent_logo = agent_web_info.agent_logo;
            } else {
                this.agent_logo = this._path('./assets/images/logo.png');
            }
        },
        mixins: [ _path ]
    }
})