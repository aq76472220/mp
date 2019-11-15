
var modules = [
    "routes/agent-router",
    "tpl/agent",
    "tpl/login",
    "config/index"
];

define(modules, function(agentRouter, agent, login, config)
{
    return [
        {
            path: "/agent/login",
            name: 'login',
            component: login
        },
        {
            //path: '/agent',
            path: '/',
            name: '_home',
            redirect: '/agent/' + config.homeName,
            component: agent,
            children: agentRouter
        },
    ];
});

