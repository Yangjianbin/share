webpackJsonp([0],[function(e,t,a){function n(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),a=window.location.search.substr(1).match(t);return null!=a?unescape(a[2]):null}a(1);var s=a(8),o=parseInt(s("html").css("font-size"))*s(window).width()/720;s("html,body").css("font-size",o);var i=a(9);i.config.debug=!1,i.filter("datetime",function(e){var t=new Date;return t.setTime(1e3*e),1+t.getMonth()+" 月 "+t.getDate()+" 日  "+t.getHours()+":"+t.getMinutes()}),i.filter("lastMinutes",function(e){var t,a=new Date(1e3*e),n=new Date;return t=n.getFullYear()-a.getFullYear()>0?n.getFullYear()-a.getFullYear()+" 年":n.getMonth()-a.getMonth()>0?n.getMonth()-a.getMonth()+" 个月":n.getDate()-a.getDate()>0?n.getDate()-a.getDate()+" 天":n.getHours()-a.getHours()>0?n.getHours()-a.getHours()+" 小时":n.getMinutes()-a.getMinutes()+"分钟"});var u=new i({el:"#app",ready:function(){s.ajax({url:"https://sns.uboxs.com/api/post/detail?type=json",type:"post",data:{id:n("id")},dataType:"json"}).done(function(e){var t=e.result;s.ajax({url:"https://api.uboxs.com/basic/schools?type=json&assoc=true&assign=schools",type:"get",dataType:"json",success:function(e){var a=e.result[t.Author.auth_school_id].name;t.school_location=a,u.$data=t}});for(var a="http://static-test.uboxs.com/html/images/logo.png",n=0;n<t.attachments.length;n++){var o=t.attachments[n];if("image"==o.type){a="http://img.uboxs.net/"+o.data.id+"-"+o.data.hash;break}}s.ajax({url:"https://v2.api.uboxs.com/weChatJsApiAuth",success:function(t){wx.ready(function(){var t={title:e.result.title,desc:e.result.content,imgUrl:a};wx.onMenuShareTimeline(t),wx.onMenuShareAppMessage(t),wx.onMenuShareQQ(t),wx.onMenuShareWeibo(t),wx.onMenuShareQZone(t)}),wx.config({debug:!1,appId:t.appid,timestamp:t.timestamp,nonceStr:t.noncestr,signature:t.signature,jsApiList:["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","onMenuShareQZone"]})}})})},data:{}}),r=new i({el:"#app2",ready:function(){s.ajax({url:"https://sns.uboxs.com/api/post/reply/all?type=json",type:"post",data:{post_id:n("id"),page:1,limit:20},dataType:"json",success:function(e){r.$data=e},error:function(e){}})},data:{}})},function(e,t){}]);