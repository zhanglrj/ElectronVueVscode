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
                "userName": "Night夜",//发起人名称
                "companyName": "康佰裕",//发起人公司名称
                "ptypeName": "13",//发起项目类别
                "pask": "13",
                "pname": "13",
                "pdesc": "13"
            },
            {
                "id": 16,
                "userName": "Night夜",
                "companyName": "康佰裕",
                "ptypeName": "12",
                "pask": "12",
                "pname": "12",
                "pdesc": "12"
            },
            {
                "id": 15,
                "userName": "BB机",
                "companyName": "北京电影",
                "ptypeName": "11",
                "pask": "11",
                "pname": "11",
                "pdesc": "11"
            },
            {
                "id": 14,
                "userName": "BB机",
                "companyName": "北京电影",
                "ptypeName": "9",
                "pask": "9",
                "pname": "9",
                "pdesc": "9"
            },
            {
                "id": 13,
                "userName": "BB机",
                "companyName": "北京电影",
                "ptypeName": "7",
                "pask": "7",
                "pname": "7",
                "pdesc": "7"
            },
            {
                "id": 12,
                "userName": "Night夜",
                "companyName": "康佰裕",
                "ptypeName": "6",
                "pask": "6",
                "pname": "6",
                "pdesc": "6"
            },
            {
                "id": 11,
                "userName": "BB机",
                "companyName": "北京电影",
                "ptypeName": "5",
                "pask": "5",
                "pname": "5",
                "pdesc": "5"
            },
            {
                "id": 10,
                "userName": "Night夜",
                "companyName": "康佰裕",
                "ptypeName": "4",
                "pask": "4",
                "pname": "4",
                "pdesc": "4"
            },
            {
                "id": 9,
                "userName": "BB机",
                "companyName": "北京电影",
                "ptypeName": "3",
                "pask": "3",
                "pname": "3",
                "pdesc": "3"
            },
            {
                "id": 8,
                "userName": "Night夜",
                "companyName": "康佰裕",
                "ptypeName": "2",
                "pask": "2",
                "pname": "2",
                "pdesc": "2"
            },
            {
                "id": 7,
                "userName": "Night夜",
                "companyName": "康佰裕",
                "ptypeName": "2",
                "pask": "2",
                "pname": "2",
                "pdesc": "2"
            },
            {
                "id": 6,
                "userName": "Night夜",
                "companyName": "康佰裕",
                "ptypeName": "2",
                "pask": "2",
                "pname": "2",
                "pdesc": "2"
            },
            {
                "id": 5,
                "userName": "Night夜",
                "companyName": "康佰裕",
                "ptypeName": "2",
                "pask": "2",
                "pname": "2",
                "pdesc": "2"
            },
            {
                "id": 4,
                "userName": "Night夜",
                "companyName": "康佰裕",
                "ptypeName": "2",
                "pask": "2",
                "pname": "2",
                "pdesc": "2"
            },
            {
                "id": 3,
                "userName": "Night夜",
                "companyName": "康佰裕",
                "ptypeName": "2",
                "pask": "2",
                "pname": "2",
                "pdesc": "2"
            },
            {
                "id": 2,
                "userName": "Night夜",
                "companyName": "康佰裕",
                "ptypeName": "2",
                "pask": "2",
                "pname": "2",
                "pdesc": "2"
            },
            {
                "id": 1,
                "userName": "Night夜",
                "companyName": "康佰裕",
                "ptypeName": "2",
                "pask": "2",
                "pname": "2",
                "pdesc": "2"
            }
        ]
    }
}
function getalldept() {

   
}
$(function () {
    
    $.ajax({
        url: "http://127.0.0.1:2019",
        async: false,
        crossDomain: true == !(document.all),
        dataType: "json",
        method: "POST",
        data: { "username": "11" },
        contentType: "application/json",
        success: function (result) {
            testboke=result;
        },
        error: function (xhr, status, p3, p4) {
            var err = "Error " + " " + status + " " + p3;
            if (xhr.responseText && xhr.responseText[0] == "{")
                err = JSON.parse(xhr.responseText).message;
            alert(err);
        }
    });
    
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
                    dataHtml += '<li class="active"><p><button type="button" onclick="onhome()" class="btn btn-info">' + item.name + '</button></p></li>';
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

   
})

function onback() {
    window.history.back(-1);
}
function onhome() {
    window.location.href = "";
    window.location.href =  "index.html";
}