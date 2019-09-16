var testboke = {
    "code": 200,
    "message": null,
    "data": {
        "total": 17,//总条数
        "size": 4,//分页大小-默认为0
        "pages": 5,//总页数
        "current": 1,//当前页数
        "records": [//author-riverLethe-double-slash-note数据部分
            {
                "id": 17,//项目id
                "name": "Night夜",//发起人名称
                "companyName": "康佰裕",//发起人公司名称
                "ptypeName": "13",//发起项目类别
                "pask": "13",
                "pname": "13",
                "pdesc": "13"
            },
            {
                "id": 16,
                "name": "Night夜",
                "companyName": "康佰裕",
                "ptypeName": "12",
                "pask": "12",
                "pname": "12",
                "pdesc": "12"
            },
            {
                "id": 15,
                "name": "BB机",
                "companyName": "北京电影",
                "ptypeName": "11",
                "pask": "11",
                "pname": "11",
                "pdesc": "11"
            },
            {
                "id": 14,
                "name": "BB机",
                "companyName": "北京电影",
                "ptypeName": "9",
                "pask": "9",
                "pname": "9",
                "pdesc": "9"
            },
            {
                "id": 13,
                "name": "BB机",
                "companyName": "北京电影",
                "ptypeName": "7",
                "pask": "7",
                "pname": "7",
                "pdesc": "7"
            },
            {
                "id": 12,
                "name": "Night夜",
                "companyName": "康佰裕",
                "ptypeName": "6",
                "pask": "6",
                "pname": "6",
                "pdesc": "6"
            },
            {
                "id": 11,
                "name": "BB机",
                "companyName": "北京电影",
                "ptypeName": "5",
                "pask": "5",
                "pname": "5",
                "pdesc": "5"
            },
            {
                "id": 10,
                "name": "Night夜",
                "companyName": "康佰裕",
                "ptypeName": "4",
                "pask": "4",
                "pname": "4",
                "pdesc": "4"
            },
            {
                "id": 9,
                "name": "BB机",
                "companyName": "北京电影",
                "ptypeName": "3",
                "pask": "3",
                "pname": "3",
                "pdesc": "3"
            },
            {
                "id": 8,
                "name": "Night夜",
                "companyName": "康佰裕",
                "ptypeName": "2",
                "pask": "2",
                "pname": "2",
                "pdesc": "2"
            },
            {
                "id": 7,
                "name": "Night夜",
                "companyName": "康佰裕",
                "ptypeName": "2",
                "pask": "2",
                "pname": "2",
                "pdesc": "2"
            },
            {
                "id": 6,
                "name": "Night夜",
                "companyName": "康佰裕",
                "ptypeName": "2",
                "pask": "2",
                "pname": "2",
                "pdesc": "2"
            },
            {
                "id": 5,
                "name": "Night夜",
                "companyName": "康佰裕",
                "ptypeName": "2",
                "pask": "2",
                "pname": "2",
                "pdesc": "2"
            },
            {
                "id": 4,
                "name": "Night夜",
                "companyName": "康佰裕",
                "ptypeName": "2",
                "pask": "2",
                "pname": "2",
                "pdesc": "2"
            },
            {
                "id": 3,
                "name": "Night夜",
                "companyName": "康佰裕",
                "ptypeName": "2",
                "pask": "2",
                "pname": "2",
                "pdesc": "2"
            },
            {
                "id": 2,
                "name": "Night夜",
                "companyName": "康佰裕",
                "ptypeName": "2",
                "pask": "2",
                "pname": "2",
                "pdesc": "2"
            },
            {
                "id": 1,
                "name": "Night夜",
                "companyName": "康佰裕",
                "ptypeName": "2",
                "pask": "2",
                "pname": "2",
                "pdesc": "2"
            }
        ]
    }
}
var requestjson = {
    "service": "",
    "busid": "",
    "phone": "",
    "iscallfirst": "",
    "idcarddata": "",
};
var jsonpserverroot = "http://127.0.0.1:2020";
$(function () {

    
    requestjson.service = "getalldept";
    
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

                var dataHtml = '<ul style="text-align:center">';

                $.each(response, function (index, item) {
                    dataHtml += '<li class="active"><p><button type="button" onclick="gobusiness(' + item.id + ');" class="btn btn-info">' + item.name + '</button></p></li>';
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
    })('#pagination-demo1');
    }

})

function onback() {
    window.history.back(-1);
}
function onhome() {
    window.location.href = "";
    window.location.href = "index.html";
}
function gobusiness(deptid) {
    var deptjson;
    var deptlist = testboke.data.records;
    $.each(deptlist, function (index, item) {
        if (item.id == deptid) deptjson = item;
    });
    var tooUrl = encodeURI("businesspage.html?dept=" + JSON.stringify(deptjson)); //使用encodeURI编码  
    location.href = tooUrl;
}