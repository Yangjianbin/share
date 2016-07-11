<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title>云格子铺手机客户端打开</title>
    <style>
        body, body > div{
        padding:0px;
        margin:0px;
    }
    body > div{
        position:fixed;
        left:0px;
        right:0px;
        top:0px;
        bottom:0px;
        background-color:#ebebeb;
        background-image:url('../images/open_ios.jpg');
        background-repeat:no-repeat;
        background-position:center center;
        background-size:contain;
    }
    </style>
</head>
<body>
<div></div>
</body>
<script>
    window.onload = function(){
        var isrefresh = getUrlParam('refresh'); // 获得refresh参数
        if(isrefresh == 1) {
            return;
        }
        var loadDateTime = new Date();
        window.setTimeout(function() {
            var timeOutDateTime = new Date();
            if (timeOutDateTime - loadDateTime < 2000) {
                window.location.href += '&refresh=1';
            } else {
                //window.close();
            }
        },  1000);  
        window.location = 'ygzp://j?t='+getUrlParam('t')+'&id='+getUrlParam('id');
    }
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
        var r = window.location.search.substr(1).match(reg);
        if (r!=null)
           return unescape(r[2]);
        return null;
    }
</script>
</html>
