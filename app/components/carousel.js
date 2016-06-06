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
        this.interval = setTimeInterval(function(){
            self.start();
        },4000);
        // console.log(this.opt);
    },
    start:function(){
        var carousel = $(this.opt.carousel);
        carousel.each(function(){
            var self = $(this),
            $imgs = self.find(this.opt.imgs),
            $dots = self.find(this.opt.dots),
            current_idx = $dots.children('.active').index(),
            total_num = $dots.children().size();
            var next_idx = (current_idx+1) % total_num;
            $imgs.add($dots).children('.active').removeClass('active').end().eq(next_idx).addClass('active');
        });
    },
    stop:function(){
        clearTimeInterval(this.interval);
    }
}

module.exports = carousel;