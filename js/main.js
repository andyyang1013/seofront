//设置cookie
function setCookie(key,value,expires){
    document.cookie=encodeURIComponent(key)+'='+encodeURIComponent(value)+';expires='+ddate(expires);
  }
    function ddate(expires){
      var ddate=new Date()
        ddate.setDate(ddate.getDate()+expires)
        return ddate
    }
//读取cookie
function getCookie(name){
  var arrStr=document.cookie.split('; ');
  //alert(arrStr)
  for(var i=0;i<arrStr.length;i++){
    var arr=arrStr[i].split('=')
    //alert(arr[0]+'\n'+arr[1])
    if(arr[0]==name){return decodeURIComponent(arr[1]) }
  }
 return ''
}
var token = getCookie('token');
var ajaxHead = {
                "HTTP_TOKEN":token
                }
// 关遮罩
$(".closeMask").click(function() {
    $(".mask").hide();
});
// 返回
$(".goBack").click(function() {
    window.history.back();
});
// var apiKey = {apiKey:"e1a2c53d16666ece99cd63f669350e5e"}
// 操作：新增-删除-上下架-修改-
function ajaxBox(data, interface, backUrl) {
    $.ajax({
        type: 'POST',
        headers:ajaxHead,
        dataType: "json",
        url: ajaxUrl + interface,
        data: data + apiKey,
        success: function(msg) {
            if (msg.code == '0') {
                layer.alert('操作成功', { icon: 6 }, function() {
                    if (backUrl) {
                        window.location.href = backUrl
                    } else {
                        layer.closeAll();
                    }
                });
            } else {
                layer.alert('操作失败，请重试', { icon: 5 });
            }
        }
    });
}
// 首页-频道
function channel() {
    $.ajax({
        type: 'GET',
        headers:ajaxHead,
        dataType: "json",
        url: ajaxUrl + '/channel/listByPage',
        success: function(msg) {
            if (msg.code == '0') {
                $(".content-channel").find('input[name$="title"]').val(msg.data[0].title)
                $(".content-channel").find('input[name$="keyword"]').val(msg.data[0].keyword)
                $(".content-channel").find('textarea[name$="desc"]').val(msg.data[0].desc)
                // 修改
                $(".mask-pd-edit").find('input[name$="id"]').val(msg.data[0].id)
                $(".mask-pd-edit").find('input[name$="title"]').val(msg.data[0].title)
                $(".mask-pd-edit").find('input[name$="keyword"]').val(msg.data[0].keyword)
                $(".mask-pd-edit").find('textarea[name$="desc"]').val(msg.data[0].desc)
            } else {
                layer.msg('数据异常，请重试', { icon: 5 });
            }
        }
    });
}
// 栏目-下拉列表
function columnSelect() {
    $.ajax({
        type: 'POST',
        headers:ajaxHead,
        data: { 
            pageSize: '99' },
        dataType: "json",
        url: ajaxUrl + '/column/listByPage',
        success: function(msg) {
            var data = msg.data,x = '';
            for (var i = 0; i < data.length; i++) {
                x += "<option value='" + data[i].id + "'>" + data[i].name + "</option>";
            }
            $(".column-select").append(x)
        }
    });
}
// 登录
function login(){
    var psw = hex_md5($("#password").val())
    $.ajax({
        type: 'POST',
        headers:ajaxHead,
        data: {
            account:$("#admin").val(),
            password:psw,
        },
        dataType: "json",
        url: ajaxUrl + '/api/login',
        success: function(msg) {
             if (msg.code == '0') {
                window.location.href = "index.html"
            } else {
                $(".error-tips").html(msg.msg);
            }
        }
    });
}

// function ajaxYN(interface, backUrl, idNum) {
//     layer.open({
//         type: 1,
//         area: ['250px', '150px'],
//         shade: 0,
//         content: '<p style="text-align: center;height:50px;line-height:50px;">确定进行此操作吗？</p>',
//         btn: ['确定', '取消'],
//         yes: function() {
//             $.ajax({
//                 url: ajaxUrl + interface,
//                 type: "POST",
//                 dataType: "json",
//                 data: {
//                     id: idNum
//                 },
//                 success: function() {
//                     if (msg.code == '0') {
//                         layer.alert('操作成功', { icon: 6 }, function() {
//                             // window.location.href = backUrl
//                         });
//                     } else {
//                         layer.alert('操作失败，请重试', { icon: 5 }, function() {
//                             // layer.closeAll();
//                         });
//                     }
//                 }
//             })
//         },
//         btn2: function() {
//             layer.closeAll();
//         }
//     })
// }