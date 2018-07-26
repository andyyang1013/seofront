// 关遮罩
$(".closeMask").click(function() {
    $(".mask").hide();
});
// 返回
$(".goBack").click(function() {
    window.history.back();
});
var ajaxUrl = "http://10.10.67.5:9902/seoInformation"

// 操作：新增-删除-上下架-修改-
function ajaxBox(data, interface, backUrl) {
    $.ajax({
        type: 'POST',
        dataType: "json",
        url: ajaxUrl + interface,
        data: data,
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
function channel(){
    $.ajax({
        type: 'GET',
        dataType: "json",
        url: ajaxUrl + '/channel/listByPage',
        success: function(msg) {
            if (msg.code == '0') {
               $(".content-channel").find('input[name$="title"]').val(msg.data[0].title)
               $(".content-channel").find('input[name$="keyword"]').val(msg.data[0].keyword)
               $(".content-channel").find('textarea[name$="desc"]').val(msg.data[0].desc)
               // 修改
               $(".mask-pd-edit").find('input[name$="title"]').val(msg.data[0].title)
               $(".mask-pd-edit").find('input[name$="keyword"]').val(msg.data[0].keyword)
               $(".mask-pd-edit").find('textarea[name$="desc"]').val(msg.data[0].desc)
            } else {
                layer.msg('数据异常，请重试', { icon: 5 });
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