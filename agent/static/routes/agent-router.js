
var modules = [
    "tpl/survey",
    "tpl/balance",
    "tpl/custom",
    "tpl/bill",
    "tpl/applet"
];

define(modules, function(survey, balance, custom, bill, applet)
{
    return [
        {
            path: '/agent/survey',
            name: 'survey',
            image: 'survey.png',
            meta: {
                title: '概况',
            },
            component: survey
        },
        {
            path: '/agent/balance',
            name: 'balance',
            image: 'balance.png',
            meta: {
                title: '收支明细'
            },
            component: balance
        },
        {
            path: '/agent/custom',
            name: 'custom',
            image: 'custom.png',
            meta: {
                title: '客户管理',
            },
            component: custom
        },
        {
            path: '/agent/bill',
            name: 'bill',
            image: 'bill.png',
            meta: {
                title: '提单管理'
            },
            component: bill
        },
        {
            path: '/agent/applet',
            name: 'applet',
            image: 'applet.png',
            meta: {
                title: '项目管理'
            },
            component: applet
        }
    ];
});