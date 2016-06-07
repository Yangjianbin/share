require('./detail.scss');
var $ = require('jquery');
var carousel = require('./components/carousel');
carousel.init();
var Vue = require('vue');
var vueResource = require('vue-resource');
Vue.use(vueResource);
var vm = new Vue({
    el:'#app',
    ready:function(){
        $.ajax({
          url:'https://mall.uboxs.com/api/item/detail?type=json',
          type:'post',
          data:{id:19},
          dataType:'json',
          success:function(d){
             console.log(d.result);
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
