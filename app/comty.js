require('./comty.scss')
var $ = require('jquery');
var scale = parseInt($('html').css('font-size')) *  $(window).width() / 720;
$('html,body').css('font-size',scale );
var Vue = require('vue');
Vue.config.debug = false;
Vue.filter('datetime', function(value) {
    var date = new Date();
    date.setTime(value * 1000);
    return (1 + date.getMonth()) + ' 月 ' + date.getDate() + ' 日  ' + date.getHours() + ':' + date.getMinutes();
});
Vue.filter('lastMinutes', function(value) {

    var d = new Date(value*1000),
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

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
var vm = new Vue({
    el: '#app',
    ready: function() {
        $.ajax({
            url: 'https://sns.uboxs.com/api/post/detail?type=json',
            type: 'post',
            data: {
                id: getQueryString('id')
            },
            dataType: 'json'
        }).done(function(res){
            var d= res.result;
            $.ajax({
                url: 'https://api.uboxs.com/basic/schools?type=json&assoc=true&assign=schools',
                type: 'get',
                dataType: 'json',
                success: function(schools) {
                    var school = schools.result[d.Author.auth_school_id]['name'];
                    d.school_location = school ;
                    vm.$data = d;
                }
            })

            //vm.$data = d.result;
            var shareImgUrl = 'http://static-test.uboxs.com/html/images/logo.png';
            for(var i=0;i<d.attachments.length;i++){
              var o = d.attachments[i]; 
              if(o.type=='image'){
                shareImgUrl = 'http://img.uboxs.net/'+o.data.id+'-'+o.data.hash
                break;
              }
            }
            $.ajax({
              url:'https://v2.api.uboxs.com/weChatJsApiAuth',
              success:function(auth){
                  wx.ready(function(){
                  var shareData = {
                    title: res.result.title,
                    desc: res.result.content,
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



        });
    },
    data: {

    }
})

var vm2 = new Vue({
    el:'#app2',
    ready:function(){
        $.ajax({
          url:'https://sns.uboxs.com/api/post/reply/all?type=json',
          type:'post',
          data:{post_id:getQueryString('id'),page:1,limit:20},
          dataType:'json',
          success:function(d){
            //  console.log(d.result);
             vm2.$data = d;
          },
          error:function(e){
             // console.log(e)
          }
        })

    },
    data:{

    }
})
$('.do-open-in-app').click(function () {
    location.href = './open.php?t=post&id='+getQueryString('id');
})

$('#app').on('click','img',function(e){
    if(!$(this).hasClass('open-in-wx')) return ;
    var src = $(this).attr('src');
    var urls = [];
    $('.detail-img').find('img').map(function(){urls.push($(this).attr('src'))});
    wx.previewImage({
        'current': src,
        'urls':urls
    });
})
