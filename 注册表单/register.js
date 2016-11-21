/**
 * Created by zhouzixing on 2016-09-02.
 */


    //用户名称只能包含数字、字母、下划线，长度不小于6位
    $("#account").onchange = function() {
        if (!/^\w{6,}$/.test($("#account").value)){
            showErrMsg("请输数字、字母、下划线且长度不小于6位！");

           // SpecialUtil.gradDisappear($("#reg_btn"), "消失", 5, 2500);
        }
    }

    //
    ////两次密码输入必须一致，长度在6-20位之间
    $("#pwd").onchange = function() {
        if (!/^.{6,20}$/.test($("#pwd").value)) {
           showErrMsg("长度在6-20位之间!");
           // SpecialUtil.gradDisappear($("#panel"));
        }
    }

    $("#rePwd").onchange = function() {
        if ($("#pwd").value != $("#rePwd").value){
            showErrMsg("前后两次密码输入不一致！");
        }
    }

    $("#mobile").onchange = function() {
        var val = this.value;
        // isNaN 如果为true 表示val是非数字
        if (val.length != 11 || isNaN(val)) {
            showErrMsg("请输入11纯数字！");
        }
    }

    $("#email").onchange = function() {
        if (!/^\w+@\w+(\.\w+)+$/.test(this.value)) {
            showErrMsg("请输入正确的邮箱格式！");
        }
    }

    $("#random_code").onclick = getRandomCode;

    getRandomCode();

    //和声明顺序是没有关系的
    function getRandomCode() {
        var num1 = Math.floor(Math.random() * 10);
        var num2 = Math.floor(Math.random() * 10);
        var num3 = Math.floor(Math.random() * 10);
        var num4 = Math.floor(Math.random() * 10);
        $("#random_code").innerHTML = "" + num1 + num2 + num3 + num4;
    }

    $("#reg_btn").onclick = function() {
        if (!/^\w{6,}$/.test($("#account").value)
            || !/^.{6,20}$/.test($("#pwd").value)
            || $("#pwd").value != $("#rePwd").value
            || $("#mobile").value.length != 11 || isNaN($("#mobile").value)
            || !/^\w+@\w+(\.\w+)+$/.test($("#email").value)
            || !$("#realName").value
            || $("#code_input").value != $("#random_code").innerHTML
        )   {
            alert("表单输入有误！");
        } else {
            alert("注册成功");
            if ($("#remember").checked) {
                CookieUitl.setCookie("account", $("#account").value, 10);
                CookieUitl.setCookie("pwd", $("#pwd").value, 10);
            } else {
                CookieUitl.removeCookie("account");
                CookieUitl.removeCookie("pwd");
            }
        }
    }

    comm.renderBtn($("#reg_btn"));

    DragUtil.dragAble($("#drag"), $("#panel"));

    //当输入文本框值发生变化的触发事件
    // 非IE oninput
    // IE onpropertychange
    $("#rePwd").onpropertychange = checkSafeLevel;
    $("#rePwd").oninput = checkSafeLevel;

    function checkSafeLevel() {
        var val = this.value;
        var count = 0;
        var activeDiv = $("#safe-active");
        if (/\d/.test(val)) {
            count++;
        }
        if (/[a-z]/.test(val)) {
            count++;
        }
        if (/[A-Z]/.test(val)) {
            count++;
        }
        if (/[\\\~\!\@\#\$\%\^\&]/.test(val)) {
            count++;
        }

        if (count <= 2) {
            activeDiv.innerHTML = "低";
            activeDiv.style.background = "red";
            activeDiv.style.marginLeft = 0;
        }else if (count == 3) {
            activeDiv.innerHTML = "中";
            activeDiv.style.background = "orange";
            activeDiv.style.marginLeft = "33%";
        } else {
            activeDiv.innerHTML = "高";
            activeDiv.style.background = "green";
            activeDiv.style.marginLeft = "66%";
        }
    }
    function showErrMsg(errMsg) {

        var count = 100;
        // 只需要在页面搜索一次就可以
        var msgNode = $("#errMsg");
        msgNode.innerHTML = errMsg;

        // 2000ms
        // 总共2s做20次变化
        var timer = setInterval(function(){
            var num = 2000 / 100
            // 成
            count -=  1 * 100 / num;
            msgNode.style.opacity = count / 100;
            //filter : alpha(opacity = 0);
            msgNode.style.filter = "alpha(opacity=" + count + ")";
            if (count == 0) {
                clearInterval(timer);
            }
        }, 100);
    }


