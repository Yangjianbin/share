webpackJsonp([2],{0:function(e,t,n){function o(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),n=window.location.search.substr(1).match(t);return null!=n?unescape(n[2]):null}function a(e){return document.querySelector(e)}function i(){return v||(v=new AudioContext),v}function s(e,t){var n=new FileReader;n.onload=function(e){var n=new Uint8Array(e.target.result);t(n)},n.readAsArrayBuffer(e)}function r(e,t){var n=new XMLHttpRequest;n.open("GET",e),n.responseType="blob",n.onload=function(){t(this.response)},n.onerror=function(e){console.log(e)},n.send()}function c(e,t){s(e,function(e){u(e)})}function u(e){var t=AMR.decode(e);t&&l(t)}function l(e){var t=i(),n=t.createBufferSource(),o=t.createBuffer(1,e.length,8e3);if(o.copyToChannel)o.copyToChannel(e,0,0);else{var a=o.getChannelData(0);a.set(e)}n.buffer=o,n.connect(t.destination),n.start()}n(13);var d=n(8),p=parseInt(d("html").css("font-size"))*d(window).width()/720;d("html,body").css("font-size",p);var h=n(9);h.config.debug=!1,h.filter("datetime",function(e){var t=new Date;return t.setTime(1e3*e),1+t.getMonth()+" 月 "+t.getDate()+" 日  "+t.getHours()+":"+t.getMinutes()}),h.filter("lastMinutes",function(e){if(!e)return"";var t,n=new Date(Date.parse(e.replace(/-/g,"/"))),o=new Date;return t=o.getFullYear()-n.getFullYear()>0?o.getFullYear()-n.getFullYear()+" 年":o.getMonth()-n.getMonth()>0?o.getMonth()-n.getMonth()+" 个月":o.getDate()-n.getDate()>0?o.getDate()-n.getDate()+" 天":o.getHours()-n.getHours()>0?o.getHours()-n.getHours()+" 小时":o.getMinutes()-n.getMinutes()+"分钟"});var f=new h({el:"#app",ready:function(){d.ajax({url:"http://v2.api.boxbuy.cc/getItemDetail?type=json",type:"post",data:{itemid:o("itemid")},dataType:"json"}).done(function(e){d.ajax({url:"https://api.uboxs.com/basic/schools?type=json&assoc=true&assign=schools",type:"get",dataType:"json",success:function(t){var n=t.result[e.Item.schoolid].name,o=t.result[e.Item.schoolid].campuses[e.Item.location].name;e.school_location=n+o,f.$data=e}});var t="http://static-test.uboxs.com/html/images/logo.png";e.Item.cover.length>1&&e.Cover.hash&&(t="http://img.uboxs.net/"+e.Item.cover+"-"+e.Cover.hash),d.ajax({url:"https://v2.api.uboxs.com/weChatJsApiAuth",success:function(n){wx.ready(function(){var n={title:e.Item.title,desc:e.Item.content_decode,imgUrl:t};wx.onMenuShareTimeline(n),wx.onMenuShareAppMessage(n),wx.onMenuShareQQ(n),wx.onMenuShareWeibo(n),wx.onMenuShareQZone(n)}),wx.config({debug:!1,appId:n.appid,timestamp:n.timestamp,nonceStr:n.noncestr,signature:n.signature,jsApiList:["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","onMenuShareQZone"]})}})})},data:{}}),g=new h({el:"#app2",ready:function(){d.ajax({url:"https://v3.api.uboxs.com/item/reply/list?type=json",type:"post",data:{item_id:o("itemid"),page:1,limit:20},dataType:"json",success:function(e){g.$data=e.result},error:function(e){}})},data:{}}),m=n(12);m.init();var v=new AudioContext;a(".story-listen")&&(a(".story-listen").onclick=function(){var e=a(".story-listen").getAttribute("source");r(e,function(e){c(e)})})},12:function(e,t,n){var o=n(8),a={carousel:".carousel",imgs:".carousel-imgs",dots:".carousel-dots"},i={name:"carousel",init:function(e){var t=this;this.opt=o.extend(a,e),this.interval=setInterval(function(){t.start()},3e3)},start:function(){var e=o(this.opt.carousel),t=this.opt;e.each(function(){var e=o(this),n=e.find(t.imgs),a=e.find(t.dots),i=a.children(".active").index(),s=a.children().size(),r=(i+1)%s;n.children(".active").removeClass("active").end().children().eq(r).addClass("active"),a.children(".active").removeClass("active").end().children().eq(r).addClass("active")})},stop:function(){clearInterval(this.interval)}};e.exports=i},13:function(e,t){}});