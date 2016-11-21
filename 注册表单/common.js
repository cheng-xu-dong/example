/**
 * Created by zhouzixing on 2016-08-22.
 */

var comm = {
    // 参数尽量体现类型
    renderBtn : function(node){
        node.onmouseover = function() {
            node.style.backgroundColor = "#317ef3";
        }
        node.onmousedown = function() {
            node.style.backgroundColor = "#2964bb";
        }
        node.onmouseup = function() {
            node.style.backgroundColor = "#317ef3";
        }
        node.onmouseout = function() {
            node.style.backgroundColor = "";
        }
    },

    /**
     * 阻止浏览器的默认行为
     * @param ev
     */
    stopDefault : function(ev) {
        // 表示非IE
        if (ev) {
            ev.preventDefault();
        } else {
            event.returnValue = false;
        }
    },

    stopBubble : function(ev) {
        //if ()
    },

    addEventListener : function(node, type, handler, isBubble) {

        if (typeof attachEvent == "undefined") {
            node.addEventListener(type, handler, isBubble);
        } else {
            node.attachEvent("on" + type, handler, isBubble);
        }

    },

    $ : function() {

    }
}

var CookieUitl = {
    /**
     * 设置cookie
     * @param key cookie名
     * @param value cookie值
     * @param expires 有效时间 number型 如：输入7 表示有效期为7天
     * @param path cookie 路径
     * @param domain 域名
     * @param isSecure 是否安全标志
     */
    setCookie : function(key, value, expires, path, domain, isSecure) {
        var str = encodeURIComponent(key) + "=" + encodeURIComponent(value);

        if (typeof expires == "number") {
            var date = new Date();
            date.setDate(date.getDate() + expires);
            str += ";expires=" + date;
        }
        if (path) {
            str += ";path=" + path;
        }
        if (domain) {
            str += ";domain=" + domain;
        }
        if (isSecure) {
            str += ";secure";
        }

        document.cookie = str;
    },
    removeCookie : function(key) {
        //this 表示当前对象
        this.setCookie(key, "", -1);
    },
    getCookie :function (key) {
        //user=456; user2=abc; user3=123

        //user=周自兴&password=123&name=xxxx; user2=周自兴2&password=456&name=xxxx
        var str = document.cookie;
        //[user=456,user2=abc,user3=123]
        var arr = str.split("; ");

        for (var i = 0; i < arr.length; i++) {
            if (arr[i].indexOf(key) != -1) {
                var temp = arr[i].split("=");
                if (temp[0] == key){
                    return decodeURIComponent(temp[1]);
                }
            }
        }

        return null;
    },

    /**
     * 从cookie 串中获取子cookie值
     *
     * @param key1 表示第一个key
     * @param key2 后面的子cookie key
     * @returns {*}
     */
    //sno_123=name=苹果&price=5&num=2;
    getCookieFromMulti : function (key1,key2){
        //周自兴2&password=456&name=xxxx
        var value1 = CookieUitl.getCookie(key1);
        //[周自兴2, password=456,name=xxxx]
        if (!value1) {
            return;
        }
        var valueArr = value1.split("&");

        if(!key2) {
            return valueArr[0];
        }
        for (var i = 0; i < valueArr.length; i++) {
            //password=456
            if (valueArr[i].indexOf(key2) != -1) {
                //valueArr[i]--password=456
                // [password, 456]
                var tempArr = valueArr[i].split("=");
                //tempArr[0]--password  key--password
                if (tempArr[0] == key2) {
                    //456
                    return decodeURIComponent(tempArr[1]);
                }
            }
        }
        return null;
    },

    //sno_123=name=苹果&price=5&num=2;
    setCookieAtMulti : function(key1, key2, value, expires){
        //name=苹果&num=2&price=5
        var val = this.getCookie(key1);
        //[name=苹果,num=2,tnum=4, price=5]
        var subValList = val.split("&");

        for (var i = 0; i < subValList.length; i++) {
            if (subValList[i].indexOf(key2) != -1) {
                //num=2
                var temp = subValList[i].split("=");
                if (temp[0] == key2) {
                    subValList[i] = key2 + "=" + value;
                    //[name=苹果,num=2,tnum=4, price=5]
                    //转为 name=苹果&num=2&tnum=4&price=5
                    val = subValList.join("&");
                    this.setCookie(key1, val, expires || 7);
                    break;
                }
            }

        }

    }

}

/**
 * Created by zhouzixing on 2016-09-01.
 */
//        1)	$(“#box”) 用于获取id名为box的DOM元素。6分
//        2)	$(“.active”) 用于获取class名为active的所有DOM元6分
//        3)	$(“input”) 用于获取标签名为input的所有DOM元素 6分

// #box .active input
function $(str) {

    if (str.charAt(0) == "#") {
        return document.getElementById(str.substring(1));
    } else if (str.charAt(0) == ".") {
        // 表示非IE
        if (document.getElementsByClassName) {
            return document.getElementsByClassName(str.substring(1));
        } else {
            var all = document.getElementsByTagName("*");
            var result = [];
            for (var i = 0; i < all.length; i++) {
                // 获取某一个元素上所有的样式名字
                var nameList = all[i].className.split(" ");
                for (var j = 0; j < nameList.length; j++) {
                    // 判断样式列表里面是否存在我们想要获取的样式
                    // 若有则存入返回数组对象中
                    if (nameList[j] == str.substring(1)) {
                        result.push(all[i]);
                        break;
                    }
                }
            }
            return result;
        }

    }

    return document.getElementsByTagName(str);
}

var SpecialUtil = {

    /**
     * 让元素节点逐渐消失
     * @param msgNode 页面元素
     * @param errMsg 元素上显示的消息
     */
    gradDisappear : function(msgNode, errMsg, time, step) {
        var count = 100;
        time *= 1000;

        // 只需要在页面搜索一次就可以
        if (errMsg) {
            msgNode.innerHTML = errMsg;
        }

        // 2000ms
        // 总共2s做20次变化
        var timer = setInterval(function(){
            var num = time / step
            count -=  1 * 100 / num;
            msgNode.style.opacity = count / 100;
            //filter : alpha(opacity = 0);
            msgNode.style.filter = "alpha(opacity=" + count + ")";
            if (count == 0) {
                clearInterval(timer);
            }
        }, step);
    }
}

var DragUtil = {
    dragAble : function(dragNode, panel) {
        dragNode.onmousedown = function(ev) {
            ev = ev || event;
            var preX =  ev.offsetX;
            var preY = ev.offsetY;

            function dragMove(ev2) {
                ev2 = ev2 || event;
                panel.style.left = ev2.clientX - preX + "px";
                panel.style.top = ev2.clientY - preY + "px";
            }
            document.onmousemove = dragMove;

            dragNode.onmouseup = function(){
                document.onmousemove = null;

            }
        }

    }
}