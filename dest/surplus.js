webpackJsonp([2],[function(e,t,n){function i(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),n=window.location.search.substr(1).match(t);return null!=n?unescape(n[2]):null}function r(e){return document.querySelector(e)}function o(){return w||(w=new AudioContext),w}function a(e,t){var n=new FileReader;n.onload=function(e){var n=new Uint8Array(e.target.result);t(n)},n.readAsArrayBuffer(e)}function u(e,t){var n=new XMLHttpRequest;n.open("GET",e),n.responseType="blob",n.onload=function(){t(this.response)},n.onerror=function(e){console.log(e)},n.send()}function l(e,t){a(e,function(e){s(e)})}function s(e){var t=AMR.decode(e);t&&c(t)}function c(e){var t=o(),n=t.createBufferSource(),i=t.createBuffer(1,e.length,8e3);if(i.copyToChannel)i.copyToChannel(e,0,0);else{var r=i.getChannelData(0);r.set(e)}n.buffer=i,n.connect(t.destination),n.start()}n(15);var p=n(8);n(13);var d=parseInt(p("html").css("font-size"))*p(window).width()/720;p("html,body").css("font-size",d);var h=n(9);h.config.debug=!1,h.filter("datetime",function(e){var t=new Date;return t.setTime(1e3*e),1+t.getMonth()+" 月 "+t.getDate()+" 日  "+t.getHours()+":"+t.getMinutes()}),h.filter("lastMinutes",function(e){if(!e)return"";var t,n=new Date(Date.parse(e.replace(/-/g,"/"))),i=new Date;return t=i.getFullYear()-n.getFullYear()>0?i.getFullYear()-n.getFullYear()+" 年":i.getMonth()-n.getMonth()>0?i.getMonth()-n.getMonth()+" 个月":i.getDate()-n.getDate()>0?i.getDate()-n.getDate()+" 天":i.getHours()-n.getHours()>0?i.getHours()-n.getHours()+" 小时":i.getMinutes()-n.getMinutes()+"分钟"});var f=new h({el:"#app",ready:function(){p.ajax({url:"http://v2.api.boxbuy.cc/getItemDetail?type=json",type:"post",data:{itemid:i("itemid")},dataType:"json"}).done(function(e){p.ajax({url:"https://api.uboxs.com/basic/schools?type=json&assoc=true&assign=schools",type:"get",dataType:"json",success:function(t){var n=t.result[e.Item.schoolid].name,i=t.result[e.Item.schoolid].campuses[e.Item.location].name;e.school_location=n+i,f.$data=e,f.$data.ok=!0}});var t="http://static-test.uboxs.com/html/images/logo.png";e.Item.cover.length>1&&e.Cover.hash&&(t="http://img.uboxs.net/"+e.Item.cover+"-"+e.Cover.hash),p.ajax({url:"https://v2.api.uboxs.com/weChatJsApiAuth",success:function(n){wx.ready(function(){var n={title:e.Item.title,desc:e.Item.content_decode,imgUrl:t};wx.onMenuShareTimeline(n),wx.onMenuShareAppMessage(n),wx.onMenuShareQQ(n),wx.onMenuShareWeibo(n),wx.onMenuShareQZone(n)}),wx.config({debug:!1,appId:n.appid,timestamp:n.timestamp,nonceStr:n.noncestr,signature:n.signature,jsApiList:["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","onMenuShareQZone"]})}})})},data:{}}),g=new h({el:"#app2",ready:function(){p.ajax({url:"https://v3.api.uboxs.com/item/reply/list?type=json",type:"post",data:{item_id:i("itemid"),page:1,limit:20},dataType:"json",success:function(e){g.$data=e.result},error:function(e){}})},data:{}}),v=n(12);v.init(),p(".carousel").on("click","img",function(e){var t=p(this).attr("src"),n=[];p(".carousel").find("img").map(function(){n.push(p(this).attr("src"))}),wx.previewImage({current:t,urls:n})}),p(".story").on("click","a",function(e){e.preventDefault(),e.stopPropagation();var t=p(this).attr("href"),n=[];p(".story .detail-img-thumb").find("a").map(function(){n.push(p(this).attr("href"))}),wx.previewImage({current:t,urls:n})}),p(".open-btn").click(function(){var e,t=navigator.userAgent.toLowerCase(),n={scheme_IOS:"ygzp://j?t=item&id=21479",scheme_Adr:"ygzp://j?t=item&id=1008",download_url:"http://app.uboxs.com/download.php",timeout:600},i=Date.now(),r=document.createElement("iframe");r.src=t.indexOf("os")>0?n.scheme_IOS:n.scheme_Adr,r.style.display="none",document.body.appendChild(r);var e=setTimeout(function(){var e=Date.now();(!i||e-i<n.timeout+200)&&(window.location=n.download_url)},n.timeout);window.onblur=function(){clearTimeout(e)}});var w=new AudioContext;window.onload=function(){setTimeout(function(){r(".story-listen")&&(r(".story-listen").onclick=function(){var e=r(".story-listen").getAttribute("source");u(e,function(e){l(e)})})},3e3)}},,,,,,,,,,,,function(e,t,n){var i=n(8);n(13);var r={carousel:".carousel",imgs:".carousel-imgs",dots:".carousel-dots"},o={name:"carousel",init:function(e){var t=this;this.opt=i.extend(r,e),this.interval=setInterval(function(){t.start()},3e3),t.sp()},start:function(){var e=i(this.opt.carousel),t=this.opt;e.each(function(){var e=i(this),n=e.find(t.imgs),r=e.find(t.dots),o=r.children(".active").index(),a=r.children().size(),u=(o+1)%a;n.children(".active").removeClass("active").end().children().eq(u).addClass("active"),r.children(".active").removeClass("active").end().children().eq(u).addClass("active")})},stop:function(){clearInterval(this.interval)},sp:function(){var e=this,t=this.opt,n=i(this.opt.carousel);n.swipe({swipe:function(i,r,o,a,u,l){if(("left"==r||"right"==r)&&"IMG"==i.target.tagName){var s=n.find(t.imgs),c=n.find(t.dots),p=c.children().size(),d=c.children(".active").index();if(!(1>=p)){e.stop();var h=1;"left"==r?h=1:"right"==r&&(h=-1,0==d&&(d=p-2,h=1));var f=(d+h)%p;s.children(".active").removeClass("active").end().children().eq(f).addClass("active"),c.children(".active").removeClass("active").end().children().eq(f).addClass("active"),e.interval=setInterval(function(){e.start()},3e3)}}}})}};e.exports=o},function(e,t,n){var i,r,o;!function(a){n(14)&&n(14).jQuery?(r=[n(8)],i=a,o="function"==typeof i?i.apply(t,r):i,!(void 0!==o&&(e.exports=o))):a("undefined"!=typeof e&&e.exports?n(8):jQuery)}(function(e){function t(t){return!t||void 0!==t.allowPageScroll||void 0===t.swipe&&void 0===t.swipeStatus||(t.allowPageScroll=c),void 0!==t.click&&void 0===t.tap&&(t.tap=t.click),t||(t={}),t=e.extend({},e.fn.swipe.defaults,t),this.each(function(){var i=e(this),r=i.data(I);r||(r=new n(this,t),i.data(I,r))})}function n(t,n){function i(t){if(!(se()||e(t.target).closest(n.excludedElements,ze).length>0)){var i,r=t.originalEvent?t.originalEvent:t,o=r.touches,a=o?o[0]:r;return We=y,o?Xe=o.length:n.preventDefaultEvents!==!1&&t.preventDefault(),ke=0,Re=null,_e=null,qe=null,He=0,Ue=0,Ne=0,Qe=1,Fe=0,Ye=ve(),ue(),pe(0,a),!o||Xe===n.fingers||n.fingers===T||Y()?(Be=Ee(),2==Xe&&(pe(1,o[1]),Ue=Ne=Te($e[0].start,$e[1].start)),(n.swipeStatus||n.pinchStatus)&&(i=R(r,We))):i=!1,i===!1?(We=M,R(r,We),i):(n.hold&&(et=setTimeout(e.proxy(function(){ze.trigger("hold",[r.target]),n.hold&&(i=n.hold.call(ze,r,r.target))},this),n.longTapThreshold)),ce(!0),null)}}function A(e){var t=e.originalEvent?e.originalEvent:e;if(We!==S&&We!==M&&!le()){var i,r=t.touches,o=r?r[0]:t,a=de(o);if(Ge=Ee(),r&&(Xe=r.length),n.hold&&clearTimeout(et),We=x,2==Xe&&(0==Ue?(pe(1,r[1]),Ue=Ne=Te($e[0].start,$e[1].start)):(de(r[1]),Ne=Te($e[0].end,$e[1].end),qe=ye($e[0].end,$e[1].end)),Qe=be(Ue,Ne),Fe=Math.abs(Ue-Ne)),Xe===n.fingers||n.fingers===T||!r||Y()){if(Re=Me(a.start,a.end),_e=Me(a.last,a.end),F(e,_e),ke=xe(a.start,a.end),He=me(),fe(Re,ke),i=R(t,We),!n.triggerOnTouchEnd||n.triggerOnTouchLeave){var u=!0;if(n.triggerOnTouchLeave){var l=De(this);u=Oe(a.end,l)}!n.triggerOnTouchEnd&&u?We=k(x):n.triggerOnTouchLeave&&!u&&(We=k(S)),We!=M&&We!=S||R(t,We)}}else We=M,R(t,We);i===!1&&(We=M,R(t,We))}}function C(e){var t=e.originalEvent?e.originalEvent:e,i=t.touches;if(i){if(i.length&&!le())return ae(t),!0;if(i.length&&le())return!0}return le()&&(Xe=Ze),Ge=Ee(),He=me(),U()||!H()?(We=M,R(t,We)):n.triggerOnTouchEnd||0==n.triggerOnTouchEnd&&We===x?(n.preventDefaultEvents!==!1&&e.preventDefault(),We=S,R(t,We)):!n.triggerOnTouchEnd&&V()?(We=S,_(t,We,f)):We===x&&(We=M,R(t,We)),ce(!1),null}function L(){Xe=0,Ge=0,Be=0,Ue=0,Ne=0,Qe=1,ue(),ce(!1)}function P(e){var t=e.originalEvent?e.originalEvent:e;n.triggerOnTouchLeave&&(We=k(S),R(t,We))}function j(){ze.unbind(Ae,i),ze.unbind(je,L),ze.unbind(Ce,A),ze.unbind(Le,C),Pe&&ze.unbind(Pe,P),ce(!1)}function k(e){var t=e,i=Q(),r=H(),o=U();return!i||o?t=M:!r||e!=x||n.triggerOnTouchEnd&&!n.triggerOnTouchLeave?!r&&e==S&&n.triggerOnTouchLeave&&(t=M):t=S,t}function R(e,t){var n,i=e.touches;return($()||X())&&(n=_(e,t,d)),(z()||Y())&&n!==!1&&(n=_(e,t,h)),re()&&n!==!1?n=_(e,t,g):oe()&&n!==!1?n=_(e,t,v):ie()&&n!==!1&&(n=_(e,t,f)),t===M&&(X()&&(n=_(e,t,d)),Y()&&(n=_(e,t,h)),L(e)),t===S&&(i?i.length||L(e):L(e)),n}function _(t,i,c){var p;if(c==d){if(ze.trigger("swipeStatus",[i,Re||null,ke||0,He||0,Xe,$e,_e]),n.swipeStatus&&(p=n.swipeStatus.call(ze,t,i,Re||null,ke||0,He||0,Xe,$e,_e),p===!1))return!1;if(i==S&&W()){if(clearTimeout(Ke),clearTimeout(et),ze.trigger("swipe",[Re,ke,He,Xe,$e,_e]),n.swipe&&(p=n.swipe.call(ze,t,Re,ke,He,Xe,$e,_e),p===!1))return!1;switch(Re){case r:ze.trigger("swipeLeft",[Re,ke,He,Xe,$e,_e]),n.swipeLeft&&(p=n.swipeLeft.call(ze,t,Re,ke,He,Xe,$e,_e));break;case o:ze.trigger("swipeRight",[Re,ke,He,Xe,$e,_e]),n.swipeRight&&(p=n.swipeRight.call(ze,t,Re,ke,He,Xe,$e,_e));break;case a:ze.trigger("swipeUp",[Re,ke,He,Xe,$e,_e]),n.swipeUp&&(p=n.swipeUp.call(ze,t,Re,ke,He,Xe,$e,_e));break;case u:ze.trigger("swipeDown",[Re,ke,He,Xe,$e,_e]),n.swipeDown&&(p=n.swipeDown.call(ze,t,Re,ke,He,Xe,$e,_e))}}}if(c==h){if(ze.trigger("pinchStatus",[i,qe||null,Fe||0,He||0,Xe,Qe,$e]),n.pinchStatus&&(p=n.pinchStatus.call(ze,t,i,qe||null,Fe||0,He||0,Xe,Qe,$e),p===!1))return!1;if(i==S&&q())switch(qe){case l:ze.trigger("pinchIn",[qe||null,Fe||0,He||0,Xe,Qe,$e]),n.pinchIn&&(p=n.pinchIn.call(ze,t,qe||null,Fe||0,He||0,Xe,Qe,$e));break;case s:ze.trigger("pinchOut",[qe||null,Fe||0,He||0,Xe,Qe,$e]),n.pinchOut&&(p=n.pinchOut.call(ze,t,qe||null,Fe||0,He||0,Xe,Qe,$e))}}return c==f?i!==M&&i!==S||(clearTimeout(Ke),clearTimeout(et),Z()&&!ee()?(Je=Ee(),Ke=setTimeout(e.proxy(function(){Je=null,ze.trigger("tap",[t.target]),n.tap&&(p=n.tap.call(ze,t,t.target))},this),n.doubleTapThreshold)):(Je=null,ze.trigger("tap",[t.target]),n.tap&&(p=n.tap.call(ze,t,t.target)))):c==g?i!==M&&i!==S||(clearTimeout(Ke),clearTimeout(et),Je=null,ze.trigger("doubletap",[t.target]),n.doubleTap&&(p=n.doubleTap.call(ze,t,t.target))):c==v&&(i!==M&&i!==S||(clearTimeout(Ke),Je=null,ze.trigger("longtap",[t.target]),n.longTap&&(p=n.longTap.call(ze,t,t.target)))),p}function H(){var e=!0;return null!==n.threshold&&(e=ke>=n.threshold),e}function U(){var e=!1;return null!==n.cancelThreshold&&null!==Re&&(e=ge(Re)-ke>=n.cancelThreshold),e}function N(){return null!==n.pinchThreshold?Fe>=n.pinchThreshold:!0}function Q(){var e;return e=n.maxTimeThreshold?!(He>=n.maxTimeThreshold):!0}function F(e,t){if(n.preventDefaultEvents!==!1)if(n.allowPageScroll===c)e.preventDefault();else{var i=n.allowPageScroll===p;switch(t){case r:(n.swipeLeft&&i||!i&&n.allowPageScroll!=w)&&e.preventDefault();break;case o:(n.swipeRight&&i||!i&&n.allowPageScroll!=w)&&e.preventDefault();break;case a:(n.swipeUp&&i||!i&&n.allowPageScroll!=m)&&e.preventDefault();break;case u:(n.swipeDown&&i||!i&&n.allowPageScroll!=m)&&e.preventDefault()}}}function q(){var e=B(),t=G(),n=N();return e&&t&&n}function Y(){return!!(n.pinchStatus||n.pinchIn||n.pinchOut)}function z(){return!(!q()||!Y())}function W(){var e=Q(),t=H(),n=B(),i=G(),r=U(),o=!r&&i&&n&&t&&e;return o}function X(){return!!(n.swipe||n.swipeStatus||n.swipeLeft||n.swipeRight||n.swipeUp||n.swipeDown)}function $(){return!(!W()||!X())}function B(){return Xe===n.fingers||n.fingers===T||!E}function G(){return 0!==$e[0].end.x}function V(){return!!n.tap}function Z(){return!!n.doubleTap}function J(){return!!n.longTap}function K(){if(null==Je)return!1;var e=Ee();return Z()&&e-Je<=n.doubleTapThreshold}function ee(){return K()}function te(){return(1===Xe||!E)&&(isNaN(ke)||ke<n.threshold)}function ne(){return He>n.longTapThreshold&&b>ke}function ie(){return!(!te()||!V())}function re(){return!(!K()||!Z())}function oe(){return!(!ne()||!J())}function ae(e){Ve=Ee(),Ze=e.touches.length+1}function ue(){Ve=0,Ze=0}function le(){var e=!1;if(Ve){var t=Ee()-Ve;t<=n.fingerReleaseThreshold&&(e=!0)}return e}function se(){return!(ze.data(I+"_intouch")!==!0)}function ce(e){ze&&(e===!0?(ze.bind(Ce,A),ze.bind(Le,C),Pe&&ze.bind(Pe,P)):(ze.unbind(Ce,A,!1),ze.unbind(Le,C,!1),Pe&&ze.unbind(Pe,P,!1)),ze.data(I+"_intouch",e===!0))}function pe(e,t){var n={start:{x:0,y:0},last:{x:0,y:0},end:{x:0,y:0}};return n.start.x=n.last.x=n.end.x=t.pageX||t.clientX,n.start.y=n.last.y=n.end.y=t.pageY||t.clientY,$e[e]=n,n}function de(e){var t=void 0!==e.identifier?e.identifier:0,n=he(t);return null===n&&(n=pe(t,e)),n.last.x=n.end.x,n.last.y=n.end.y,n.end.x=e.pageX||e.clientX,n.end.y=e.pageY||e.clientY,n}function he(e){return $e[e]||null}function fe(e,t){t=Math.max(t,ge(e)),Ye[e].distance=t}function ge(e){return Ye[e]?Ye[e].distance:void 0}function ve(){var e={};return e[r]=we(r),e[o]=we(o),e[a]=we(a),e[u]=we(u),e}function we(e){return{direction:e,distance:0}}function me(){return Ge-Be}function Te(e,t){var n=Math.abs(e.x-t.x),i=Math.abs(e.y-t.y);return Math.round(Math.sqrt(n*n+i*i))}function be(e,t){var n=t/e*1;return n.toFixed(2)}function ye(){return 1>Qe?s:l}function xe(e,t){return Math.round(Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2)))}function Se(e,t){var n=e.x-t.x,i=t.y-e.y,r=Math.atan2(i,n),o=Math.round(180*r/Math.PI);return 0>o&&(o=360-Math.abs(o)),o}function Me(e,t){var n=Se(e,t);return 45>=n&&n>=0?r:360>=n&&n>=315?r:n>=135&&225>=n?o:n>45&&135>n?u:a}function Ee(){var e=new Date;return e.getTime()}function De(t){t=e(t);var n=t.offset(),i={left:n.left,right:n.left+t.outerWidth(),top:n.top,bottom:n.top+t.outerHeight()};return i}function Oe(e,t){return e.x>t.left&&e.x<t.right&&e.y>t.top&&e.y<t.bottom}var n=e.extend({},n),Ie=E||O||!n.fallbackToMouseEvents,Ae=Ie?O?D?"MSPointerDown":"pointerdown":"touchstart":"mousedown",Ce=Ie?O?D?"MSPointerMove":"pointermove":"touchmove":"mousemove",Le=Ie?O?D?"MSPointerUp":"pointerup":"touchend":"mouseup",Pe=Ie?O?"mouseleave":null:"mouseleave",je=O?D?"MSPointerCancel":"pointercancel":"touchcancel",ke=0,Re=null,_e=null,He=0,Ue=0,Ne=0,Qe=1,Fe=0,qe=0,Ye=null,ze=e(t),We="start",Xe=0,$e={},Be=0,Ge=0,Ve=0,Ze=0,Je=0,Ke=null,et=null;try{ze.bind(Ae,i),ze.bind(je,L)}catch(tt){e.error("events not supported "+Ae+","+je+" on jQuery.swipe")}this.enable=function(){return ze.bind(Ae,i),ze.bind(je,L),ze},this.disable=function(){return j(),ze},this.destroy=function(){j(),ze.data(I,null),ze=null},this.option=function(t,i){if("object"==typeof t)n=e.extend(n,t);else if(void 0!==n[t]){if(void 0===i)return n[t];n[t]=i}else{if(!t)return n;e.error("Option "+t+" does not exist on jQuery.swipe.options")}return null}}var i="1.6.15",r="left",o="right",a="up",u="down",l="in",s="out",c="none",p="auto",d="swipe",h="pinch",f="tap",g="doubletap",v="longtap",w="horizontal",m="vertical",T="all",b=10,y="start",x="move",S="end",M="cancel",E="ontouchstart"in window,D=window.navigator.msPointerEnabled&&!window.navigator.pointerEnabled&&!E,O=(window.navigator.pointerEnabled||window.navigator.msPointerEnabled)&&!E,I="TouchSwipe",A={fingers:1,threshold:75,cancelThreshold:null,pinchThreshold:20,maxTimeThreshold:null,fingerReleaseThreshold:250,longTapThreshold:500,doubleTapThreshold:200,swipe:null,swipeLeft:null,swipeRight:null,swipeUp:null,swipeDown:null,swipeStatus:null,pinchIn:null,pinchOut:null,pinchStatus:null,click:null,tap:null,doubleTap:null,longTap:null,hold:null,triggerOnTouchEnd:!0,triggerOnTouchLeave:!1,allowPageScroll:"auto",fallbackToMouseEvents:!0,excludedElements:"label, button, input, select, textarea, a, .noSwipe",preventDefaultEvents:!0};e.fn.swipe=function(n){var i=e(this),r=i.data(I);if(r&&"string"==typeof n){if(r[n])return r[n].apply(this,Array.prototype.slice.call(arguments,1));e.error("Method "+n+" does not exist on jQuery.swipe")}else if(r&&"object"==typeof n)r.option.apply(this,arguments);else if(!(r||"object"!=typeof n&&n))return t.apply(this,arguments);return i},e.fn.swipe.version=i,e.fn.swipe.defaults=A,e.fn.swipe.phases={PHASE_START:y,PHASE_MOVE:x,PHASE_END:S,PHASE_CANCEL:M},e.fn.swipe.directions={LEFT:r,RIGHT:o,UP:a,DOWN:u,IN:l,OUT:s},e.fn.swipe.pageScroll={NONE:c,HORIZONTAL:w,VERTICAL:m,AUTO:p},e.fn.swipe.fingers={ONE:1,TWO:2,THREE:3,FOUR:4,FIVE:5,ALL:T}})},function(e,t){(function(t){e.exports=t}).call(t,{})},function(e,t){}]);