
require.config({
    // urlArgs: 's='+(new Date()).getTime(),
    baseUrl: '/agent/build/',
    // baseUrl: '/agent/static/',
    paths: {
        vue: 'https://cdn.staticfile.org/vue/2.5.17-beta.0/vue',
        router: 'https://cdn.staticfile.org/vue-router/3.0.1/vue-router',
        axios: 'https://cdn.staticfile.org/axios/0.19.0-beta.1/axios',
        ELEMENT: 'https://cdn.staticfile.org/element-ui/2.4.9/index',
        vuex: 'https://cdn.staticfile.org/vuex/3.0.1/vuex.min',
        echarts: 'https://cdn.staticfile.org/echarts/4.2.0-rc.2/echarts',
        museUi: 'assets/js/muse-ui',
        text: 'assets/js/text',
        css: 'assets/js/css',
        'css-builder': 'assets/js/css-builder',
        normalize: 'assets/js/normalize'
    },
    shim: {
        router: {
            deps: ['vue']
        },
        vuex: {
            deps: ['vue']
        },
        ELEMENT: {
            deps: ['vue']
        },
        museUi: {
            deps: ['vue']
        }
    }
});