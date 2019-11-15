<?php
$agent_name = '轻晓云';
$agent_login_img = '/static/favicon.ico';
$agent_logo = '';
$agent_isoem = false;

$oen_list = [
    'zhan.zaokework.cn'     => ['造壳小站', '/static/oem/zhan.zaokework.cn/agent_login_img.png', '/static/oem/zhan.zaokework.cn/logovue.png'],
    'h5.zaokework.cn'       => ['造壳小站', '/static/oem/zhan.zaokework.cn/agent_login_img.png', '/static/oem/zhan.zaokework.cn/logovue.png'],
    // 'qingxiaoyun.com'       => ['造壳小站', '/static/oem/zhan.zaokework.cn/agent_login_img.png', '/static/oem/zhan.zaokework.cn/logovue.png'],
];
if (array_key_exists($_SERVER["SERVER_NAME"], $oen_list)) {
    $agent_name = $oen_list[$_SERVER["SERVER_NAME"]][0];
    $agent_login_img = $oen_list[$_SERVER["SERVER_NAME"]][1];
    $agent_logo = $oen_list[$_SERVER["SERVER_NAME"]][2];
    $agent_isoem = true;
}
?>
<script type="text/javascript">
    window.localStorage.removeItem('agent_web_info');
    let data = {
        agent_name : '<?php echo $agent_name; ?>',
        agent_login_img: '<?php echo $agent_login_img; ?>',
        agent_logo: '<?php echo $agent_logo; ?>',
        agent_isoem: '<?php echo $agent_isoem; ?>'
    };
    window.localStorage.setItem('agent_web_info', JSON.stringify(data));
</script>
<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <meta content="width=device-width,initial-scale=1" name="viewport" servergenerated="true">
        <meta content="<?php echo $agent_name; ?>, 小程序, 企业展示, 小程序装修, 小程序推广, 小程序展示" name="description">
        <title><?php echo $agent_name; ?></title>
        <link href="/favicon.ico" rel="icon" data-n-head="true" type="image/x-icon">
        <link rel="stylesheet" href="/agent/static/assets/css/muse-ui.css">
        <link rel="stylesheet" href="https://cdn.staticfile.org/element-ui/2.4.9/theme-chalk/index.css">
        <script type="text/javascript" src ="https://cdn.polyfill.io/v2/polyfill.min.js?features=es6"></script>
        <script src="https://cdn.staticfile.org/require.js/2.3.6/require.min.js" data-main="/agent/static/main.js"></script>
        <style>
            html,body,#layout{
                width: 100%;
                height: 100%;
            }
            html,body{
                overflow: hidden;
                margin: 0;
                padding: 0;
            }

            [v-cloak] {
                display: none !important;
            }
        </style>
    </head>
    <body>
        <div id="layout" v-cloak>
            <router-view ref="routeView"></router-view>
        </div>
        <script>
            const process = {
                env: {
                    // NODE_ENV: 'development',
                    NODE_ENV: 'product'
                }
            }
        </script>
    </body>
</html>