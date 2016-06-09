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
          dataType:'json',
          success:function(d){
            //  console.log(d.result);
             vm.$data = d.result;
          },
          error:function(e){
             // console.log(e)
          }
        })

        // this.$http.post('https://mall.uboxs.com/api/item/detail?type=json', {id:19}, {
        //     headers: {
        //         "X-Requested-With": "XMLHttpRequest"
        //     },
        //     emulateJSON: true
        // }).then(function(response) {
        //     var data = response.data;
        //     console.log(data)
        // }, function(response) {
        // });
    },
    data:{

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
