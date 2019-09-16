var wsscan;
var jsonpserverroot = "http://127.0.0.1:2020";
var busjson="";
var idcardjson = {
    "service": "getidcard",
    "succ": false,
    "data": {
        "number": "",
        "name": "",
        "sex": "",
        "birth": "",
        "address": "",
        "nation": "",
        "authority": "",
        "validitydatestart": "",
        "validitydateend": "",
        "photobase64": ""
    }
};
var requestjson = {
    "service": "",
    "busid": "",
    "phone": "",
    "iscallfirst": "",
    "idcarddata":"",
};
$(function () {
    //获取 上一个搜索页面传来的参数 
    var searchUrl = window.location.href;
    var searchData = searchUrl.split("="); //截取 url中的“=”,获得“=”后面的参数
    var busstr = decodeURI(searchData[1]); //decodeURI解码
    busjson = JSON.parse(busstr);

    
    initscanWS();

  
        $(".numkeyboard").ioskeyboard({
            keyboardRadix: 80,//键盘大小基数，实际大小比为9.4，即设置为100时实际大小为940X330
            keyboardRadixMin: 40,//键盘大小的最小值，默认为60，实际大小为564X198
            keyboardRadixChange: true,//是否允许用户改变键盘大小,该功能仅能完美支持Chrome26；仅当keyboardRadixMin不小于60时才较好支持Safari内核浏览器
            clickeve: true,//是否绑定元素click事件
            colorchange: false,//是否开启按键记忆功能，如果开启，将随着按键次数的增加加深相应按键的背景颜色
            colorchangeStep: 1,//按键背景颜色改变步伐，采用RBG值，默认为RGB(255,255,255),没按一次三个数字都减去步伐值
            colorchangeMin: 154//按键背影颜色的最小值，默认为RGB(154,154,154)
    });
})
function initscanWS() {
    if ("WebSocket" in window) {

        wsscan = new WebSocket("ws://127.0.0.1:2018/scan");
        wsscan.onmessage = function (e) {
            idcardjson = JSON.parse(e.data);
            $("#txtidcard").val(idcardjson.data.number)
            //alert(e.data)
        };
        wsscan.onerror = function (event) {
            onError(event);
        };
        wsscan.onopen = function () {
            console.log("Openened connection to websocket");

        };
        wsscan.onclose = function () {
            console.log("Close connection to websocket");
            // 断线重连
            //initWS();
        }

        
    } else {
        // 浏览器不支持 WebSocket
        alert("您的浏览器不支持 WebSocket!");
    }
}
function scan() {
    wsscan && wsscan.send("scan");
}
function onok() {
    var phone = $("#txtphone").val();
    var idcard = $("#txtidcard").val();
    if (IdentityCodeValid(idcard) && checkphonenumber(phone)) {

        if ($.trim(busjson) != "") {
            getqueueno();
        } else {
            reserveclick();
        }
    }
}
function oncancel() {
    $("#txtidcard").val("")
    $("#txtphone").val("")
}

function getqueueno() {
    if (idcardjson.data.number == "") idcardjson.data.number = $("#txtidcard").val();
    var phone = $("#txtphone").val();
    requestjson.busid = busjson.id;
    requestjson.service = "getqueueno";
    requestjson.phone = phone;
    requestjson.iscallfirst = "0";
    requestjson.idcarddata = idcardjson;
    $.ajax({
        url: encodeURI(jsonpserverroot + "?paramjson=" + encodeURIComponent(JSON.stringify(requestjson)) + ""),
        type: "GET",
        scriptCharset: "utf-8",
        dataType: "jsonp",  //指定服务器返回的数据类型
        //jsonpCallback: "showData",  //指定回调函数名称
        success: function (data) {
            returnData(data);
        }
    });
}
//function myAjax(myurl, mytype, mycharset, mydatatype, myreturnfunc) {
//    myurl = decodeURI(myurl);
//    $.ajax({
//        url: myurl,
//        type: mytype,
//        scriptCharset: mycharset,
//        dataType: mydatatype,  //指定服务器返回的数据类型
//        jsonpCallback: myreturnfunc,  //指定回调函数名称
        
//    });
//}
function returnData(data) {

    if (data.code == 200) {
        alert("取号成功,正在打印。。。");
        //倒数10秒后执行

        loaddata(data);
       
    }
    else {
        alert(data.message);
    }
}
function loaddata(printdata) {

    var $myIframe = $('#myIframe');
    //// 注意：必须是在框架内容加载完成后才能触发 message 事件哦
    //$myIframe.on('load', function () {
       
        // 不限制域名则填写 * 星号, 否则请填写对应域名如 http://www.b.com
        $myIframe[0].contentWindow.postMessage(printdata, '*');
    ////});

    // 注册消息事件监听，对来自 myIframe 框架的消息进行处理
    window.addEventListener('message', function (e) {
        if (e.data.succ ) {
            alert(e.data.msg);
            $('body').oneTime('1das', function () {

                //do something...
                onhome();
            });
        } else {
            alert(e.data.msg);
        }
    }, false);
}

function reserveclick() {
    if (idcardjson.data.number == "") idcardjson.data.number = $("#txtidcard").val();
    var phone = $("#txtphone").val();
    
    requestjson.service = "reservequeue";
    requestjson.phone = phone;
    requestjson.iscallfirst = "0";
    requestjson.idcarddata = idcardjson;
    $.ajax({
        url: encodeURI(jsonpserverroot + "?paramjson=" + encodeURIComponent(JSON.stringify(requestjson)) + ""),
        type: "GET",
        scriptCharset: "utf-8",
        dataType: "jsonp",  //指定服务器返回的数据类型
        //jsonpCallback: "showData",  //指定回调函数名称
        success: function (data) {
            returnData(data);
        }
    });
}

function onback() {
    window.history.back(-1);
}
function onhome() {
    window.location.href = "";
    window.location.href = "index.html";
}
