

var ws;
function initWS() {
    if ("WebSocket" in window) {

        ws = new WebSocket("ws://127.0.0.1:2018/queue");
        ws.onerror = function (event) {
            onError(event);
        };
        ws.onopen = function () {
            console.log("Openened connection to websocket");

        };
        ws.onclose = function () {
            console.log("Close connection to websocket");
            // 断线重连
            //initWS();
        }

        ws.onmessage = onmessage;
    } else {
        // 浏览器不支持 WebSocket
        alert("您的浏览器不支持 WebSocket!");
    }
}


function send(json) {
    initscanWS();
    ws && ws.send(json);

}

function onError(event) {
    alert(event.data)
}



//作为get获取数据的回调对象存储
this.messageList = {};
//自定义Ws消息接收函数：服务器向前端推送消息时触发
this.onmessage = ((e) => {
    //处理各种推送消息
    const message = JSON.parse(e.data);
    const eventName = message.action.splice('Rsp', '')
    //执行回调
    this.messageList[eventName](message);
})

//发送消息后回调
this.sendMsg = function (obj, callback) {
    const name = obj.service;
    //存储事件
    this.messageList[name] = callback;
    this.ws.send(JSON.stringify(obj));
}
//
sendMsgAndGetData(loginParam, function (data) {
    return data;
})
