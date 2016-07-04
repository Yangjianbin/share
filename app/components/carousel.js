var $ = require('jquery');
require('jquery-touchswipe');
var opts = {
    carousel:'.carousel',
    imgs:'.carousel-imgs',
    dots:'.carousel-dots'
};
var carousel = {
    name:'carousel',
    /*
    * opt = {
        carousel:'.carousel',
        imgs:'.carousel-imgs',
        dots:'.carousel-dots'
    }
    */
    init:function(opt){
        var self = this;
        this.opt = $.extend(opts,opt);
        this.interval = setInterval(function(){
            self.start();
        },3000);
        self.sp();
        // console.log(this.opt);
    },
    start:function(){
        var carousel = $(this.opt.carousel),opt = this.opt;
        carousel.each(function(){
            var self = $(this),
            $imgs = self.find(opt.imgs),
            $dots = self.find(opt.dots),
            current_idx = $dots.children('.active').index(),
            total_num = $dots.children().size();
            var next_idx = (current_idx+1) % total_num;
            $imgs.children('.active').removeClass('active').end().children().eq(next_idx).addClass('active');
            $dots.children('.active').removeClass('active').end().children().eq(next_idx).addClass('active');

        });
    },
    stop:function(){
        clearInterval(this.interval);
    },
    sp:function(){
        var $this = this;
        var opt = this.opt;
        var carousel = $(this.opt.carousel);
        carousel.swipe( {
            swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
                if(direction != 'left' && direction != 'right') return;
                if(event.target.tagName != 'IMG')return ;
                var $imgs = carousel.find(opt.imgs);
                var $dots = carousel.find(opt.dots);
                var total_num = $dots.children().size();
                var current_idx = $dots.children('.active').index();
                if(total_num<=1) return ;
                $this.stop();
                var dir = 1;
                if(direction == 'left'){
                    dir = 1;
                }else if(direction == 'right'){
                    dir = -1;
                    if(current_idx ==0){
                        current_idx = total_num -2;
                        dir =1;
                    }
                }

                var next_idx = (current_idx+dir) % total_num;
                $imgs.children('.active').removeClass('active').end().children().eq(next_idx).addClass('active');
                $dots.children('.active').removeClass('active').end().children().eq(next_idx).addClass('active');

                $this.interval = setInterval(function(){
                    $this.start();
                },3000);


            }
         });
    }
}

module.exports = carousel;
