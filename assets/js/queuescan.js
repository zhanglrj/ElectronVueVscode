
var wsscan;
function initscanWS() {
    if ("WebSocket" in window) {

        wsscan = new WebSocket("ws://127.0.0.1:2018/queue");
        wsscan.onerror = function (event) {
            onError(event);
        };
        wsscan.onopen = function () {
            console.log("Openened connection to websocket");

        };
        wsscan.onclose = function () {
            console.log("Close connection to websocket");
            // 断线重连
            initWS();
        }

        wsscan.onmessage = onscanMessage;
    } else {
        // 浏览器不支持 WebSocket
        alert("您的浏览器不支持 WebSocket!");
    }
}
initscanWS();

function scan() {


    wsscan && wsscan.send("");
}
function onscanMessage(e) {
    alert(e.data)
}
function onError(event) {
    alert(event.data)
}

