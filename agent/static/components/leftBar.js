/*
* @Author: brooke
* @Date:   2018-10-29 18:26:02
* @Last Modified by:   brooke
* @Last Modified time: 2018-10-30 10:02:31
*/
var modules = [
    '_path',
    'text!../views/left-bar.html'
];

define(modules, function(_path, leftBar)
{
    return {
        name: 'leftBar',

        template: leftBar,

        props: ['menuList', 'activeName'],

        data: function(){
            return {}
        },

        methods: {
            handleSelect: function(name) {
              this.$emit('on-select', name)
            },
            getNameOrHref: function (item) {
                return item.href ? 'isTurnByHref_' + item.href : item.name
            }
        },

        mixins: [ _path ]
    }
});