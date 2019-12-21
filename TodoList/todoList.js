window.onload=function(){
    let undone=[],done=[];
    let storage=window.localStorage;
    // storage.clear();
    function show(){
        getData();
        let cmt=document.getElementById("cmt");
        let notCmt=document.getElementById("notCmt");
        for (let i=0;i<done.length;i++)
            cmt.innerHTML+='<li>'+'<input type="checkbox" checked="checked">'
                 +'<span class="content">'+done[i]+'</span>'
                 +'<a href="javascript:;" id="del">&#128465;</a>'
                 +'<a href="javascript:;" id="edit">&#9998;</a>'+'</li>';
        for (let i=0;i<undone.length;i++)
            notCmt.innerHTML+='<li>'+'<input type="checkbox">'
            +'<span class="content">'+undone[i]+'</span>'
            +'<a href="javascript:;" id="del">&#128465;</a>'
            +'<a href="javascript:;" id="edit">&#9998;</a>'+'</li>';
    }  
    show();

    //增加
    let addButton=document.getElementById("addButton");
    addButton.onclick=function(){
        let li=document.createElement("li");
        let inputVal=document.getElementById("in").value;
        if (inputVal!="")
        {
            li.innerHTML='<input type="checkbox">'
                    +'<span class="content">'+inputVal+'</span>'
                    +'<a href="javascript:;" id="del">&#128465;</a>'
                    +'<a href="javascript:;" id="edit">&#9998;</a>';
            let notCmt=document.getElementById("notCmt");
            notCmt.appendChild(li);
            updata();
            document.getElementById("in").value="";
        }
    }

    //编辑与删除
    let container=document.getElementsByClassName("container")[0];
    container.onclick=function(event){
        event=event||window.event;
        let target=event.target;
        if (target.id=="del")
            target.parentNode.remove();
        else if (target.id=="edit")
        {
                let span=target.parentNode.children[1];
                // let str=null;
                // if (span.children.length==0)
                //     str=span.innerHTML;
                // else  str=span.children[0].value;
                let str=span.children.length?span.children[0].value:span.innerHTML;
                span.innerHTML=`<input id="inputEdit" type="text" class="inputStyle" value="${str}">`;
                let input=span.getElementsByClassName("inputStyle")[0];
                input.onblur=function(){
                    let str=input.value;
                    span.innerHTML=str;
                    updata();
                }
        }
        //复选框
        else if (target.tagName.toLowerCase()=="input"&&target.id!="allChoose2"&&target.id!="inputEdit"
        &&target.id!="allChoose1"&&target.id!="clearAll1"&&target.id!="clearAll2")
        {
            let cmt=document.getElementById("cmt")
                ,notCmt=document.getElementById("notCmt")
                ,tmp=target.parentNode;
            target.checked?cmt.appendChild(tmp):notCmt.appendChild(tmp);
        }
        //清除所有
        else if (target.id=="clearAll1"||target.id=="clearAll2")
        {
            if (target.id=="clearAll1")
            {
                let cmtdata=document.getElementById("cmt").getElementsByTagName("li");
                let length=cmtdata.length;
                for (let i=0;i<length;i++) cmtdata[0].remove();
            }
            else
            {
                let notCmtdata=document.getElementById("notCmt").getElementsByTagName("li");
                let length=notCmtdata.length;
                for (let i=0;i<length;i++) notCmtdata[0].remove();
            }
        }
        //全部选中
        else if(target.id=="allChoose1"||target.id=="allChoose2")
        {
            if (target.id=="allChoose1")
            {
                let allCmtLi=document.getElementById("cmt").getElementsByTagName("li");
                let ulNotCmt=document.getElementById("notCmt");
                while (allCmtLi.length)
                {
                    allCmtLi[0].getElementsByTagName("input")[0].checked=false;
                    ulNotCmt.appendChild(allCmtLi[0]);
                }   
            }
            else
            {
                let allNotCmtLi=document.getElementById("notCmt").getElementsByTagName("li");
                let ulCmt=document.getElementById("cmt");
                while (allNotCmtLi.length)
                {
                    allNotCmtLi[0].getElementsByTagName("input")[0].checked=true;
                    ulCmt.appendChild(allNotCmtLi[0]);
                }  
            }
        }
        updata();
    }
    
    //获取所有的已完成的li和未完成的li
    function getLi(){
        let d=document.getElementsByClassName("completed")[0];
        let n=document.getElementsByClassName("notCompleted")[0];
        let donespan=d.getElementsByTagName("span");
        let undonespan=n.getElementsByTagName("span");
        for (let i=0;i<donespan.length;i++)
            done[i]=donespan[i].innerText;
        done.length=donespan.length;
        for (let i=0;i<undonespan.length;i++)
            undone[i]=undonespan[i].innerText;
        undone.length=undonespan.length;
    }

    //更新数据
    function updata(){
        getLi();
        storage.setItem("undone", JSON.stringify(undone));
        storage.setItem("done", JSON.stringify(done));
    }

    //获取数据
    function getData(){
        let doneTmp=storage.getItem("done"),
            undoneTmp=storage.getItem("undone");
        if (doneTmp!=null)
            done=JSON.parse(doneTmp);
        if (undoneTmp!=null)
            undone=JSON.parse(undoneTmp); 
    }

}