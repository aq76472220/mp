/*
* @Author: brooke
* @Date:   2018-11-01 15:04:21
* @Last Modified by:   brooke
* @Last Modified time: 2018-11-01 17:09:30
*/
/*
Date.prototype.isLeapYear 判断闰年
Date.prototype.Format 日期格式化
Date.prototype.DateAdd 日期计算
Date.prototype.DateDiff 比较日期差
Date.prototype.toString 日期转字符串
Date.prototype.toArray 日期分割为数组
Date.prototype.DatePart 取日期的部分信息
Date.prototype.MaxDayOfDate 取日期所在月的最大天数
Date.prototype.WeekNumOfYear 判断日期所在年的第几周
StringToDate 字符串转日期型
IsValidDate 验证日期有效性
CheckDateTime 完整日期时间检查
daysBetween 日期天数差
*/
define(function(){
    var brookeDate = function(date){
        this.date = date || new Date();
    }

    //---------------------------------------------------
    // 判断闰年
    //---------------------------------------------------
    brookeDate.prototype.isLeapYear = function()
    {
        return (0==this.date.getYear()%4&&((this.date.getYear()%100!=0)||(this.date.getYear()%400==0)));
    }

    //---------------------------------------------------
    // 日期格式化
    // 格式 YYYY/yyyy/YY/yy 表示年份
    // MM/M 月份
    // W/w 星期
    // dd/DD/d/D 日期
    // hh/HH/h/H 时间
    // mm/m 分钟
    // ss/SS/s/S 秒
    //---------------------------------------------------
    brookeDate.prototype.Format = function(formatStr)
    {
        var str = formatStr;
        var Week = ['日','一','二','三','四','五','六'];

        str=str.replace(/yyyy|YYYY/,this.date.getFullYear());
        str=str.replace(/yy|YY/,(this.date.getYear() % 100)>9?(this.date.getYear() % 100).toString():'0' + (this.date.getYear() % 100));
        str=str.replace(/MM/,this.date.getMonth()>9?(this.date.getMonth() + 1).toString():'0' + (this.date.getMonth() + 1));
        str=str.replace(/M/g,(this.date.getMonth() + 1));

        str=str.replace(/w|W/g,Week[this.date.getDay()]);

        str=str.replace(/dd|DD/,this.date.getDate()>9?this.date.getDate().toString():'0' + this.date.getDate());
        str=str.replace(/d|D/g,this.date.getDate());

        str=str.replace(/hh|HH/,this.date.getHours()>9?this.date.getHours().toString():'0' + this.date.getHours());
        str=str.replace(/h|H/g,this.date.getHours());
        str=str.replace(/mm/,this.date.getMinutes()>9?this.date.getMinutes().toString():'0' + this.date.getMinutes());
        str=str.replace(/m/g,this.date.getMinutes());

        str=str.replace(/ss|SS/,this.date.getSeconds()>9?this.date.getSeconds().toString():'0' + this.date.getSeconds());
        str=str.replace(/s|S/g,this.date.getSeconds());

        return str;
    }

    //+---------------------------------------------------
    //| 求两个时间的天数差 日期格式为 YYYY-MM-dd
    //+---------------------------------------------------
    brookeDate.daysBetween = function(DateOne,DateTwo){
        var OneMonth = DateOne.substring(5,DateOne.lastIndexOf ('-'));
        var OneDay = DateOne.substring(DateOne.length,DateOne.lastIndexOf ('-')+1);
        var OneYear = DateOne.substring(0,DateOne.indexOf ('-'));

        var TwoMonth = DateTwo.substring(5,DateTwo.lastIndexOf ('-'));
        var TwoDay = DateTwo.substring(DateTwo.length,DateTwo.lastIndexOf ('-')+1);
        var TwoYear = DateTwo.substring(0,DateTwo.indexOf ('-'));

        var cha=((Date.parse(OneMonth+'/'+OneDay+'/'+OneYear)- Date.parse(TwoMonth+'/'+TwoDay+'/'+TwoYear))/86400000);
        return Math.abs(cha);
    }


    //+---------------------------------------------------
    //| 日期计算
    //+---------------------------------------------------
    brookeDate.prototype.DateAdd = function(strInterval, Number) {
        var dtTmp = this.date;
        switch (strInterval) {
            case 's' :return new Date(Date.parse(dtTmp) + (1000 * Number));
            case 'n' :return new Date(Date.parse(dtTmp) + (60000 * Number));
            case 'h' :return new Date(Date.parse(dtTmp) + (3600000 * Number));
            case 'd' :return new Date(Date.parse(dtTmp) + (86400000 * Number));
            case 'w' :return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number));
            case 'q' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number*3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
            case 'm' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
            case 'y' :return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
        }
    }

    //+---------------------------------------------------
    //| 比较日期差 dtEnd 格式为日期型或者有效日期格式字符串
    //+---------------------------------------------------
    brookeDate.prototype.DateDiff = function(strInterval, dtEnd) {
        var dtStart = this.date;
        if (typeof dtEnd == 'string' )//如果是字符串转换为日期型
        {
            dtEnd = StringToDate(dtEnd);
        }
        switch (strInterval) {
            case 's' :return parseInt((dtEnd - dtStart) / 1000);
            case 'n' :return parseInt((dtEnd - dtStart) / 60000);
            case 'h' :return parseInt((dtEnd - dtStart) / 3600000);
            case 'd' :return parseInt((dtEnd - dtStart) / 86400000);
            case 'w' :return parseInt((dtEnd - dtStart) / (86400000 * 7));
            case 'm' :return (dtEnd.getMonth()+1)+((dtEnd.getFullYear()-dtStart.getFullYear())*12) - (dtStart.getMonth()+1);
            case 'y' :return dtEnd.getFullYear() - dtStart.getFullYear();
        }
    }

    //+---------------------------------------------------
    //| 日期输出字符串，重载了系统的toString方法
    //+---------------------------------------------------
    brookeDate.prototype.toString = function(showWeek)
    {
        var myDate= this.date;
        var str = myDate.toLocaleDateString();
        if (showWeek)
        {
            var Week = ['日','一','二','三','四','五','六'];
            str += ' 星期' + Week[myDate.getDay()];
        }
        return str;
    }

    //+---------------------------------------------------
    //| 日期合法性验证
    //| 格式为：YYYY-MM-DD或YYYY/MM/DD
    //+---------------------------------------------------
    brookeDate.IsValidDate = function(DateStr){
        var sDate=DateStr.replace(/(^\s+|\s+$)/g,''); //去两边空格;
        if(sDate=='') return true;
        //如果格式满足YYYY-(/)MM-(/)DD或YYYY-(/)M-(/)DD或YYYY-(/)M-(/)D或YYYY-(/)MM-(/)D就替换为''
        //数据库中，合法日期可以是:YYYY-MM/DD(2003-3/21),数据库会自动转换为YYYY-MM-DD格式
        var s = sDate.replace(/[\d]{ 4,4 }[\-/]{ 1 }[\d]{ 1,2 }[\-/]{ 1 }[\d]{ 1,2 }/g,'');
        if (s=='') //说明格式满足YYYY-MM-DD或YYYY-M-DD或YYYY-M-D或YYYY-MM-D
        {
            var t=new Date(sDate.replace(/\-/g,'/'));
            var ar = sDate.split(/[-/:]/);
            if(ar[0] != t.getYear() || ar[1] != t.getMonth()+1 || ar[2] != t.getDate())
            {
                //alert('错误的日期格式！格式为：YYYY-MM-DD或YYYY/MM/DD。注意闰年。');
                return false;
            }
        }
        else
        {
            //alert('错误的日期格式！格式为：YYYY-MM-DD或YYYY/MM/DD。注意闰年。');
            return false;
        }
        return true;
    }

    //+---------------------------------------------------
    //| 日期时间检查
    //| 格式为：YYYY-MM-DD HH:MM:SS
    //+---------------------------------------------------
    brookeDate.CheckDateTime = function(str)
    {
        var reg = /^(\d+)-(\d{ 1,2 })-(\d{ 1,2 }) (\d{ 1,2 }):(\d{ 1,2 }):(\d{ 1,2 })$/;
        var r = str.match(reg);
        if(r==null)return false;
        r[2]=r[2]-1;
        var d= new Date(r[1],r[2],r[3],r[4],r[5],r[6]);
        if(d.getFullYear()!=r[1])return false;
        if(d.getMonth()!=r[2])return false;
        if(d.getDate()!=r[3])return false;
        if(d.getHours()!=r[4])return false;
        if(d.getMinutes()!=r[5])return false;
        if(d.getSeconds()!=r[6])return false;
        return true;
    }

    //+---------------------------------------------------
    //| 把日期分割成数组
    //+---------------------------------------------------
    brookeDate.prototype.toArray = function()
    {
        var myDate = this.date;
        var myArray = Array();
        myArray[0] = myDate.getFullYear();
        myArray[1] = myDate.getMonth();
        myArray[2] = myDate.getDate();
        myArray[3] = myDate.getHours();
        myArray[4] = myDate.getMinutes();
        myArray[5] = myDate.getSeconds();
        return myArray;
    }

    //+---------------------------------------------------
    //| 取得日期数据信息
    //| 参数 interval 表示数据类型
    //| y 年 m月 d日 w星期 ww周 h时 n分 s秒
    //+---------------------------------------------------
    brookeDate.prototype.DatePart = function(interval)
    {
        var myDate = this.date;
        var partStr='';
        var Week = ['日','一','二','三','四','五','六'];
        switch (interval)
        {
            case 'y' :partStr = myDate.getFullYear();break;
            case 'm' :partStr = myDate.getMonth()+1;break;
            case 'd' :partStr = myDate.getDate();break;
            case 'w' :partStr = Week[myDate.getDay()];break;
            case 'ww' :partStr = myDate.WeekNumOfYear();break;
            case 'h' :partStr = myDate.getHours();break;
            case 'n' :partStr = myDate.getMinutes();break;
            case 's' :partStr = myDate.getSeconds();break;
        }
        return partStr;
    }

    //+---------------------------------------------------
    //| 取得当前日期所在月的最大天数
    //+---------------------------------------------------
    brookeDate.prototype.MaxDayOfDate = function()
    {
        var myDate = this.date;
        var ary = myDate.toArray();
        var date1 = (new Date(ary[0],ary[1]+1,1));
        var date2 = date1.dateAdd(1,'m',1);
        var result = dateDiff(date1.Format('yyyy-MM-dd'),date2.Format('yyyy-MM-dd'));
        return result;
    }


    //+---------------------------------------------------
    //| 字符串转成日期类型
    //| 格式 MM/dd/YYYY MM-dd-YYYY YYYY/MM/dd YYYY-MM-dd
    //+---------------------------------------------------
    brookeDate.StringToDate = function(DateStr){
        var converted = Date.parse(DateStr);
        var myDate = new Date(converted);
        if (isNaN(myDate))
        {
            //var delimCahar = DateStr.indexOf('/')!=-1?'/':'-';
            var arys= DateStr.split('-');
            myDate = new Date(arys[0],--arys[1],arys[2]);
        }
        return myDate;
    }


    //若要显示:当前日期加时间(如:2009-06-12 12:00)

    brookeDate.CurentTime = function CurentTime(){
        var now = new Date();

        var year = now.getFullYear();       //年
        var month = now.getMonth() + 1;     //月
        var day = now.getDate();            //日

        var hh = now.getHours();            //时
        var mm = now.getMinutes();          //分

        var clock = year + "-";

        if(month < 10)
            clock += "0";

        clock += month + "-";

        if(day < 10)
            clock += "0";

        clock += day + " ";

        if(hh < 10)
            clock += "0";

        clock += hh + ":";
        if (mm < 10) clock += '0';
            clock += mm;
        return(clock);
    }

    return brookeDate;
})