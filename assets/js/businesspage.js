var testboke = {}
var jsonpserverroot = "http://127.0.0.1:2020";
var requestjson = {
    "service": "",
    "busid": "",
    "phone": "",
    "iscallfirst": "",
    "idcarddata": "",
    "deptid":""
};
$(function () {
    //获取 上一个搜索页面传来的参数 
    var searchUrl = window.location.href;
    var searchData = searchUrl.split("="); //截取 url中的“=”,获得“=”后面的参数
    var deptstr = decodeURI(searchData[1]); //decodeURI解码
    var deptjson = JSON.parse(deptstr);

    requestjson.service = "getbusiness";
    requestjson.deptid = deptjson.id;
   
    $.ajax({
        url: encodeURI(jsonpserverroot + "?paramjson=" + encodeURIComponent(JSON.stringify(requestjson)) + ""),
        type: "GET",
        scriptCharset: "utf-8",
        dataType: "jsonp",  //指定服务器返回的数据类型
        //jsonpCallback: "showData",  //指定回调函数名称
        success: function (data) {
            showData(data);
        }
    });

function showData(data) {
    console.info("调用showData");

    //var result = JSON.stringify(data); //json对象转成字符串
    //$(('#text')).val(result);
    testboke = data;
    binddata();
}

function binddata() {
    (function (name) {

        var container = $(name);
        var sources = function () {
            var result = [];
            result = testboke.data.records;
            //for (var i = 1; i < 150; i++) {
            //    result.push(i);
            //}

            return result;
        }();

        var options = {
            dataSource: sources,
            callback: function (response, pagination) {
                window.console && console.log(response, pagination);

                var dataHtml = '<ul >';

                $.each(response, function (index, item) {
                    dataHtml += '<li class="active"><p><button type="button" onclick="goinput(\'' + item.id + '\');" class="btn btn-info">' + item.name + '</button></p></li>';
                });

                dataHtml += '</ul>';

                container.prev().html(dataHtml);
            }
        };

        //$.pagination(container, options);

        container.addHook('beforeInit', function () {
            window.console && console.log('beforeInit...');
        });
        container.pagination(options);

        container.addHook('beforePageOnClick', function () {
            window.console && console.log('beforePageOnClick...');
            //return false
        });
    })('#busdiv');
    }

})

function onback() {
    window.history.back(-1);
}
function onhome() {
    window.location.href = "";
    window.location.href = "index.html";
}
function goinput(busid) {
    
    var busjson;
    var buslist = testboke.data.records;
    $.each(buslist, function (index, item) {
        if (item.id == busid) busjson = item;
    });
    var tooUrl = encodeURI("inputpage.html?business=" + JSON.stringify(busjson)); //使用encodeURI编码  
    location.href = tooUrl;
}