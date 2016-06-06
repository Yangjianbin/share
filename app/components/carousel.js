var $ = require('jquery');
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
    init:function(opt = {}){
        var self = this;
        this.opt = $.extend(opts,opt);
        this.interval = setInterval(function(){
            self.start();
        },3000);
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
    }
}

module.exports = carousel;
