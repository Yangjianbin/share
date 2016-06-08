require('./surplus.scss')
var $ = require('jquery');
var Vue = require('vue');
var vueResource = require('vue-resource');
Vue.use(vueResource);
Vue.filter('datetime', function (value) {
  var date = new Date();
  date.setTime(value*1000);
  return  (1+date.getMonth())+' 月 '+date.getDate()+' 日  '+date.getHours()+':'+date.getMinutes();
});
Vue.filter('lastMinutes', function (value) {
    var d = new Date(value), now = new  Date(),str;
    if( now.getFullYear() - d.getFullYear()>0){
        str = now.getFullYear() - d.getFullYear() + ' 年';
    }else if(now.getMonth() - d.getMonth()>0){
        str = now.getMonth() - d.getMonth() + ' 月';
    }else if(now.getDate() - d.getDate()>0){
        str = now.getDate() - d.getDate() + ' 天';
    }else if(now.getHours() - d.getHours() >0){
        str = now.getHours() - d.getHours() + ' 小时';
    }else{
        str = now.getMinutes() - d.getMinutes() + '分钟';
    }
    return str;
})

var vm = new Vue({
    el:'#app',
    ready:function(){
        $.ajax({
          url:'http://v2.api.boxbuy.cc/getItemDetail?type=json',
          type:'post',
          data:{itemid:21479},
          dataType:'json',
          success:function(d){

              $.ajax({
                url:'https://api.uboxs.com/basic/schools?type=json&assoc=true&assign=schools',
                type:'get',
                dataType:'json',
                success:function(schools){
                    var school = schools.result[d.Item.schoolid]['name'];
                    var location = schools.result[d.Item.schoolid]['campuses'][d.Item.location]['name'];
                    d.school_location = school + location;
                    vm.$data = d;
                }
              })

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
