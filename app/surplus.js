require('./surplus.scss')
var $ = require('jquery');
var scale = parseInt($('html').css('font-size')) *  $(window).width() / 720;
$('html,body').css('font-size',scale );
var Vue = require('vue');
Vue.config.debug = false;
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
Vue.filter('datetime', function(value) {
    var date = new Date();
    date.setTime(value * 1000);
    return (1 + date.getMonth()) + ' 月 ' + date.getDate() + ' 日  ' + date.getHours() + ':' + date.getMinutes();
});
Vue.filter('lastMinutes', function(value) {
    if(!value) return '';
    var d = new Date(Date.parse(value.replace(/-/g,'/'))),
        now = new Date(),
        str;
    if (now.getFullYear() - d.getFullYear() > 0) {
        str = now.getFullYear() - d.getFullYear() + ' 年';
    } else if (now.getMonth() - d.getMonth() > 0) {
        str = now.getMonth() - d.getMonth() + ' 个月';
    } else if (now.getDate() - d.getDate() > 0) {
        str = now.getDate() - d.getDate() + ' 天';
    } else if (now.getHours() - d.getHours() > 0) {
        str = now.getHours() - d.getHours() + ' 小时';
    } else {
        str = now.getMinutes() - d.getMinutes() + '分钟';
    }
    return str;
})

var vm = new Vue({
    el: '#app',
    ready: function() {
        $.ajax({
            url: 'http://v2.api.boxbuy.cc/getItemDetail?type=json',
            type: 'post',
            data: {
                itemid: getQueryString('itemid')
            },
            dataType: 'json'
        }).done(function(d){
            $.ajax({
                url: 'https://api.uboxs.com/basic/schools?type=json&assoc=true&assign=schools',
                type: 'get',
                dataType: 'json',
                success: function(schools) {
                    var school = schools.result[d.Item.schoolid]['name'];
                    var location = schools.result[d.Item.schoolid]['campuses'][d.Item.location]['name'];
                    d.school_location = school + location;
                    vm.$data = d;
                }
            })
            var shareImgUrl = 'http://static-test.uboxs.com/html/images/logo.png';
            if(d.Item.cover.length>1 && d.Cover.hash){
                shareImgUrl = 'http://img.uboxs.net/'+d.Item.cover+'-'+d.Cover.hash
            }
            $.ajax({
              url:'https://v2.api.uboxs.com/weChatJsApiAuth',
              success:function(auth){
                  wx.ready(function(){
                  var shareData = {
                    title: d.Item.title,
                    desc: d.Item.content_decode,
                    imgUrl: shareImgUrl
                  }
                  wx.onMenuShareTimeline(shareData);
                  wx.onMenuShareAppMessage(shareData);
                  wx.onMenuShareQQ(shareData);
                  wx.onMenuShareWeibo(shareData);
                  wx.onMenuShareQZone(shareData);
                });
                wx.config({
                  debug: false,
                  appId: auth.appid,
                  timestamp: auth.timestamp,
                  nonceStr: auth.noncestr,
                  signature: auth.signature,
                  jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
                });
              }
            })

        })

    },
    data: {

    }
})

var vm2 = new Vue({
    el:'#app2',
    ready:function(){
        $.ajax({
          url:'https://v3.api.uboxs.com/item/reply/list?type=json',
          type:'post',
          data:{item_id:getQueryString('itemid'),page:1,limit:20},
          dataType:'json',
          success:function(d){
            //  console.log(d.result);
             vm2.$data = d.result;
          },
          error:function(e){
             // console.log(e)
          }
        })

    },
    data:{

    }
})

var carousel = require('./components/carousel');
carousel.init();

var gAudioContext = new AudioContext();

function E(selector) {
    return document.querySelector(selector);
}

function getAudioContext() {
    if (!gAudioContext) {
        gAudioContext = new AudioContext();
    }
    return gAudioContext;
}

function readBlob(blob, callback) {
    var reader = new FileReader();
    reader.onload = function(e) {
        var data = new Uint8Array(e.target.result);
        callback(data);
    };
    reader.readAsArrayBuffer(blob);
}

function fetchBlob(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.onload = function() {
        callback(this.response);
    };
    xhr.onerror = function(e) {
        console.log(e);
        // alert('Failed to fetch ' + url);
    };
    xhr.send();
}

function playAmrBlob(blob, callback) {
    readBlob(blob, function(data) {
        playAmrArray(data);
    });
}

function playAmrArray(array) {
    var samples = AMR.decode(array);
    if (!samples) {
        // alert('Failed to decode!');
        return;
    }
    playPcm(samples);
}

function playPcm(samples) {
    var ctx = getAudioContext();
    var src = ctx.createBufferSource();
    var buffer = ctx.createBuffer(1, samples.length, 8000);
    if (buffer.copyToChannel) {
        buffer.copyToChannel(samples, 0, 0)
    } else {
        var channelBuffer = buffer.getChannelData(0);
        channelBuffer.set(samples);
    }

    src.buffer = buffer;
    src.connect(ctx.destination);
    src.start();
}

if(E('.story-listen')){
    E('.story-listen').onclick = function() {
        var url = E('.story-listen').getAttribute('source');
        fetchBlob(url, function(blob) {
            playAmrBlob(blob);
        });
    };
}
