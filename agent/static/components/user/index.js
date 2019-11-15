/*
* @Author: brooke
* @Date:   2018-10-29 18:25:35
* @Last Modified by:   brooke
* @Last Modified time: 2018-10-31 17:31:28
*/
var modules = [
    'text!../../views/user.html'
];

define(modules, function(user)
{
    return {
        name: 'user',
        template: user,
        props: [ 'userAccount', 'tanShow' ],
        data: function(){
            return {
                'isShow': false
            };
        },
        methods: {
            handleClick: function(name) {
                var _this = this;

                switch (name) {
                    case 'logout':
                        this.$store.dispatch('handleLogOut').then(function(){
                            _this.$emit('handleClick', 'login');
                        })
                    case 'setting':
                        this.tanShow(true);
                    break
                }
            },
            bt_show: function(){
                this.isShow=true;
            },
            btn_hide: function(){
                this.isShow=false;
            }
        }
    }
})