
var debug = false;

if (debug) {
    require(['../config/config', './js/app']);
} else {
    require(['../config/config', '../build/js/app']);
}
