require('./detail.scss');
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
Vue.filter('datetime', function (value) {
  var date = new Date();
  date.setTime(value*1000);
   return  (1+date.getMonth())+' 月 '+date.getDate()+' 日  '+date.getHours()+':'+date.getMinutes();
})
var vm = new Vue({
    el:'#app',
    ready:function(){
        $.ajax({
          url:'https://mall.uboxs.com/api/item/detail?type=json',
          type:'post',
          data:{id:getQueryString('id')},
          dataType:'json'
        }).done(function(d){
            vm.$data = d.result;
            $.ajax({
              url:'https://v2.api.uboxs.com/weChatJsApiAuth',
              success:function(auth){
                  wx.ready(function(){
                  var shareData = {
                    title: d.result.title,
                    desc: '￥'+d.result.Price.lowest/100+'官网价格：￥'+d.result.OldPrice.lowest/100,
                    imgUrl: 'http://img.uboxs.net/'+d.result.Cover.id+'-'+d.result.Cover.hash
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
    data:{
        Images:[],
        Price:{},
        OldPrice:{}
    }
})

var vm2 = new Vue({
    el:'#app2',
    ready:function(){
        $.ajax({
          url:'https://v3.api.uboxs.com/item/reply/list?type=json',
          type:'post',
          data:{item_id:getQueryString('id'),page:1,limit:20},
          dataType:'json',
          success:function(d){
             vm2.$data = d.result;
          },
          error:function(e){
          }
        })

    },
    data:{
        Replies:[]
    }
})

var carousel = require('./components/carousel');
carousel.init();

$('.carousel').on('click','img',function(e){
    var src = $(this).attr('src');
    var urls = [];
    $('.carousel').find('img').map(function(){urls.push($(this).attr('src'))});
    wx.previewImage({
        'current': src,
        'urls':urls
    });
})

$('.open-btn').click(function () {
    location.href = './open.php?t=oitem&id='+getQueryString('id');
})
