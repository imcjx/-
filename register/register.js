window.onload=function(){
    //密码与掩码转换
    let pwEye=document.getElementById("pwEye")
        ,cmpwEye=document.getElementById("cmpwEye");
    let flag1=false,flag2=false;
    pwEye.onclick=function(){
        if (this.previousElementSibling.value!="")
        {
            flag1=!flag1;
            document.getElementById("password").type=flag1?"text":"password";          
        }
    }
    cmpwEye.onclick=function(){
        if (this.previousElementSibling.value!="")
        {
            flag2=!flag2;
            document.getElementById("confirmPassword").type=flag2?"text":"password";          
        }
    }
    //按钮不可被点击
    function lock(obj){
        obj.className="lock";
        obj.onclick=function(){
            return false;
        }
    }
    //按钮可被点击
    function unlock(obj){
        obj.className="rgt";
        obj.onclick=function(){
            alert("注册成功!");
            return true;
        };
    }
    //为提交按钮绑定事件
    let btn=document.getElementsByClassName("rgt")[0];
    btn.onclick=function(){
        alert("注册成功!");
    }
    lock(btn);
    let flgPw=false,flgMb=false,flgCmpw=false,flgUs=false;
    //密码的正则判断
    let pw=document.getElementById("password");
    pw.onblur=function(){
        let cnt=0;
        let falseContent=document.getElementById("pwFalse").getElementsByClassName("pwFalseContent")[0];
        //密码中必须含有三个的大写字母
        let reg3=/([A-Z])[^\1]*([A-Z])[^\1\2]*[A-Z]/;
        if (!reg3.test(pw.value))
        {
            falseContent.innerHTML="密码中应含有三个或以上不同的大写字母";
            falseContent.parentNode.className="clearFix false";
        }
        else {falseContent.parentNode.className="clearFix false hidden";cnt++};
        //判断密码是否存在重复字符
        let reg2=/([A-z2345678#&*?])[^\1]*\1/
        // let reg2=/(.).*\1/;
        if (reg2.test(pw.value))
        {
            falseContent.innerHTML="密码中不应存在相同字符";
            falseContent.parentNode.className="clearFix false";
        }
        else if(reg3.test(pw.value)) {falseContent.parentNode.className="clearFix false hidden";cnt++};
        //判断密码长度是否为（9-15）位
        let reg1=/^[A-z2345678#&*?]{9,15}$/
        if (!reg1.test(pw.value))
        {
            falseContent.innerHTML="密码应为9-15位(且仅有A-z,2-8,#&*?)";
            falseContent.parentNode.className="clearFix false";
        }
        else if(!reg2.test(pw.value)&&reg3.test(pw.value))
        {
            falseContent.parentNode.className="clearFix false hidden";
            cnt++;
        }
        if (cnt==3) flgPw=true;
        else flgPw=false;
        //更新密码后对确认密码再进行判定
        if (cmpw.value!="")
        {
            let falseContent=document.getElementById("cmpwFalse").getElementsByClassName("cmpwFalseContent")[0];
            if (cmpw.value!=pw.value)
            {
                falseContent.innerHTML="请确认密码是否一致";
                falseContent.parentNode.className="false";
                flgCmpw=false;
            }
            else {falseContent.parentNode.className="false hidden";flgCmpw=true;};
        }
        if (flgPw&&flgMb&&flgCmpw&&flgUs) unlock(btn);
        else lock(btn);
    }

    //邮箱的正则判断
    let mb=document.getElementById("mailbox");
    mb.onblur=function(){
        let falseContent=document.getElementById("mbFalse").getElementsByClassName("mbFalseContent")[0];
        //abcxyz@mail.com.(cn)
        //字母数字下划线 @ 字母数字 .字母 (.字母)
        // ^  \w+  @  [A-z0-9]+  (\.[A-z]+){1,2} $
        let reg=/^\w+@[0-9A-Za-z]+(\.[A-z]+){1,2}$/;
        if (!reg.test(mb.value))
        {
            falseContent.innerHTML="邮箱格式应为:a1_cz@mail2.com.(cn)";
            falseContent.parentNode.className="false";
            flgMb=false;
        }
        else {falseContent.parentNode.className="false hidden";flgMb=true};
        if (flgPw&&flgMb&&flgCmpw&&flgUs) unlock(btn);
        else lock(btn);
    }

    //再次确认密码
    let cmpw=document.getElementById("confirmPassword");
    cmpw.onblur=function(){
        let falseContent=document.getElementById("cmpwFalse").getElementsByClassName("cmpwFalseContent")[0];
        if (cmpw.value!=pw.value)
        {
            falseContent.innerHTML="请确认密码是否一致";
            falseContent.parentNode.className="false";
            flgCmpw=false;
        }
        else {falseContent.parentNode.className="false hidden";flgCmpw=true};
        if (flgPw&&flgMb&&flgCmpw&&flgUs) unlock(btn);
        else lock(btn);
    }

    //用户名的正则判断
    let us=document.getElementById("username");
    us.onblur=function(){
        let falseContent=document.getElementById("usFalse").getElementsByClassName("usFalseContent")[0];
        let reg=/^[\u4e00-\u9fa5A-z0-9]{2,10}$/
        if (!reg.test(us.value))
        {
            falseContent.innerHTML="用户名为2-10位(中文、英文、数字)";
            falseContent.parentNode.className="false";
            flgUs=false;
        }
        else {falseContent.parentNode.className="false hidden";flgUs=true};
        if (flgPw&&flgMb&&flgCmpw&&flgUs) unlock(btn);
        else lock(btn);
    }
    
}

    
