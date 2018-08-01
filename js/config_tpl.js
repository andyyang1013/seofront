var ajaxUrl = "http://120.25.246.51:8003/news/api";
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
var tokenNum = getCookie('token');
var ajaxHead = {"Token":tokenNum};
