/*
* @Author: brooke
* @Date:   2018-10-29 15:48:06
* @Last Modified by:   brooke
* @Last Modified time: 2018-10-30 15:53:13
*/

define(function(){
    const forEach = function(arr, fn){ //导出
        if (!arr.length || !fn) return
        var i = -1
        var len = arr.length
        while (++i < len) {
            var item = arr[i]
            fn(item, i, arr)
        }
    }

    /**
     * @param {Array} arr1
     * @param {Array} arr2
     * @description 得到两个数组的交集, 两个数组的元素为数值或字符串
     */
    const getIntersection = function(arr1, arr2){ //导出
        var len = Math.min(arr1.length, arr2.length)
        var i = -1
        var res = []
        while (++i < len) {
            const item = arr2[i]
            if (arr1.indexOf(item) > -1) res.push(item)
        }
        return res
    }

    /**
     * @param {Array} arr1
     * @param {Array} arr2
     * @description 得到两个数组的并集, 两个数组的元素为数值或字符串
     */
    const getUnion = function(arr1, arr2){ //导出
        return Array.from(new Set(arr1.concat(arr2)))
    }

    /**
     * @param {Array} target 目标数组
     * @param {Array} arr 需要查询的数组
     * @description 判断要查询的数组是否至少有一个元素包含在目标数组中
     */
    const hasOneOf = function(targetarr, arr){ //导出
      return targetarr.some(function(_){ return arr.indexOf(_) > -1 })
    }

    /**
     * @param {String|Number} value 要验证的字符串或数值
     * @param {*} validList 用来验证的列表
     */
    const oneOf = function(value, validList) { //导出
        for (var i = 0; i < validList.length; i++) {
            if (value === validList[i]) {
                return true
            }
        }
        return false
    }

    /**
     * @param {Number} timeStamp 判断时间戳格式是否是毫秒
     * @returns {Boolean}
     */
    const isMillisecond = function(timeStamp){
        const timeStr = String(timeStamp)
        return timeStr.length > 10
    }

    /**
     * @param {Number} timeStamp 传入的时间戳
     * @param {Number} currentTime 当前时间时间戳
     * @returns {Boolean} 传入的时间戳是否早于当前时间戳
     */
    const isEarly = function(timeStamp, currentTime){
        return timeStamp < currentTime
    }

    /**
     * @param {Number} num 数值
     * @returns {String} 处理后的字符串
     * @description 如果传入的数值小于10，即位数只有1位，则在前面补充0
     */
    const getHandledValue = function(num){
        return num < 10 ? '0' + num : num
    }

    /**
     * @param {Number} timeStamp 传入的时间戳
     * @param {Number} startType 要返回的时间字符串的格式类型，传入'year'则返回年开头的完整时间
     */
    const getDate = function(timeStamp, startType){
        const d = new Date(timeStamp * 1000)
        const year = d.getFullYear()
        const month = getHandledValue(d.getMonth() + 1)
        const date = getHandledValue(d.getDate())
        const hours = getHandledValue(d.getHours())
        const minutes = getHandledValue(d.getMinutes())
        const second = getHandledValue(d.getSeconds())
        var resStr = ''
        if (startType === 'year') resStr = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + second
        else resStr = month + '-' + date + ' ' + hours + ':' + minutes
        return resStr
    }

    /**
     * @param {String|Number} timeStamp 时间戳
     * @returns {String} 相对时间字符串
     */
    const getRelativeTime = function(timeStamp){ //导出
        // 判断当前传入的时间戳是秒格式还是毫秒
        const IS_MILLISECOND = isMillisecond(timeStamp)
        // 如果是毫秒格式则转为秒格式
        if (IS_MILLISECOND) Math.floor(timeStamp /= 1000)
        // 传入的时间戳可以是数值或字符串类型，这里统一转为数值类型
        timeStamp = Number(timeStamp)
        // 获取当前时间时间戳
        const currentTime = Math.floor(Date.parse(new Date()) / 1000)
        // 判断传入时间戳是否早于当前时间戳
        const IS_EARLY = isEarly(timeStamp, currentTime)
        // 获取两个时间戳差值
        var diff = currentTime - timeStamp
        // 如果IS_EARLY为false则差值取反
        if (!IS_EARLY) diff = -diff
        var resStr = ''
        const dirStr = IS_EARLY ? '前' : '后'
        // 少于等于59秒
        if (diff <= 59) resStr = diff + '秒' + dirStr
        // 多于59秒，少于等于59分钟59秒
        else if (diff > 59 && diff <= 3599) resStr = Math.floor(diff / 60) + '分钟' + dirStr
        // 多于59分钟59秒，少于等于23小时59分钟59秒
        else if (diff > 3599 && diff <= 86399) resStr = Math.floor(diff / 3600) + '小时' + dirStr
        // 多于23小时59分钟59秒，少于等于29天59分钟59秒
        else if (diff > 86399 && diff <= 2623859) resStr = Math.floor(diff / 86400) + '天' + dirStr
        // 多于29天59分钟59秒，少于364天23小时59分钟59秒，且传入的时间戳早于当前
        else if (diff > 2623859 && diff <= 31567859 && IS_EARLY) resStr = getDate(timeStamp)
        else resStr = getDate(timeStamp, 'year')
        return resStr
    }

    /**
     * @returns {String} 当前浏览器名称
     */
    const getExplorer = function(){ //导出
        const ua = window.navigator.userAgent
        const isExplorer = function(exp){
            return ua.indexOf(exp) > -1
        }
        if (isExplorer('MSIE')) return 'IE'
        else if (isExplorer('Firefox')) return 'Firefox'
        else if (isExplorer('Chrome')) return 'Chrome'
        else if (isExplorer('Opera')) return 'Opera'
        else if (isExplorer('Safari')) return 'Safari'
    }

    /**
     * @description 绑定事件 on(element, event, handler)
     */
    const on = function(element, event, handler){ //导出
        if (element && event && handler) {
            if (document.addEventListener) {
                element.addEventListener(event, handler, false)
            }else{
                element.attachEvent('on' + event, handler)
            }
        }
    }

    /**
     * @description 解绑事件 off(element, event, handler)
     */
    const off = function(element, event, handler){ //导出
        if (element && event) {
            if (document.removeEventListener) {
                element.removeEventListener(event, handler, false)
            }else{
                element.detachEvent('on' + event, handler)
            }
        }
    }

    /**
     * 判断一个对象是否存在key，如果传入第二个参数key，则是判断这个obj对象是否存在key这个属性
     * 如果没有传入key这个参数，则判断obj对象是否有键值对
     */
    const hasKey = function(obj, key){ //导出
        if (key) return key in obj
        else {
            var keysArr = Object.keys(obj)
            return keysArr.length
        }
    }

    /**
     * @param {*} obj1 对象
     * @param {*} obj2 对象
     * @description 判断两个对象是否相等，这两个对象的值只能是数字或字符串
     */
    const objEqual = function(obj1, obj2){ //导出
        const keysArr1 = Object.keys(obj1)
        const keysArr2 = Object.keys(obj2)
        if (keysArr1.length !== keysArr2.length) return false
        else if (keysArr1.length === 0 && keysArr2.length === 0) return true
        /* eslint-disable-next-line */
        else return !keysArr1.some(function(key){ return obj1[key] != obj2[key] })
    }

    /**
     * @param {String} query
     * @description query转为对象
     */

    const parseQuery = function(query){ //导出
        var reg = /([^=&\s]+)[=\s]*([^&\s]*)/g;
        var obj = {};
        while (reg.exec(query)) {
            obj[RegExp.$1] = RegExp.$2;
        }
        return obj;
    }

    /**
     * @param {String} url
     * @description 从URL中解析参数
     */

    const getParams = function(url){ //导出
        const keyValueArr = url.split('?')[1].split('&')
        var paramObj = {}
        keyValueArr.forEach(function(item){
            const keyValue = item.split('=')
            paramObj[keyValue[0]] = keyValue[1]
        })
        return paramObj
    }

    const isPhone = function(phone){ //导出
        return (/^[1][3,4,5,7,8,9][0-9]{9}$/).test(phone);
    }

    return {
        forEach: forEach,
        getIntersection: getIntersection,
        getUnion: getUnion,
        hasOneOf: hasOneOf,
        oneOf: oneOf,
        getRelativeTime: getRelativeTime,
        getExplorer: getExplorer,
        on: on,
        off: off,
        hasKey: hasKey,
        objEqual: objEqual,
        parseQuery: parseQuery,
        getParams: getParams,
        isPhone: isPhone
    }
})