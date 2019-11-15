
define('_path', ['require'], function(require){
    return {
        methods: {
            _path: function(path){
                return require.toUrl(path);
            }
        }
    }
});

var modules = [
    'vue',
    'ELEMENT',
    'museUi',
    'routes/index',
    'store/index',
    'config/index',
    'css!assets/css/base.css'
];

require(modules, function(Vue, element, museUi, router, store, config)
{
    Vue.prototype.$config = config

    Vue.use(element);

    Vue.use(museUi);

    new Vue({
        el: "#layout",
        router: router,
        store: store
    });
});