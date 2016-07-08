<?php
    $ios_url = './open_ios.php?t='.$_GET['t'].'&id='.$_GET['id'];
    $ipad_url = './open_ipad.php?t='.$_GET['t'].'&id='.$_GET['id'];
    $android_url = './open_android.php?t='.$_GET['t'].'&id='.$_GET['id'];
//微信浏览器打开的时候
	if(stristr($_SERVER['HTTP_USER_AGENT'], 'micromessenger') !== false){
?><!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
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
		background-image:url(<?php

			if(stristr($_SERVER['HTTP_USER_AGENT'], 'iPhone') !== false){
				echo '../images/open_ios.jpg';
			}else if(stristr($_SERVER['HTTP_USER_AGENT'], 'iPad') !== false){
			    echo '../images/open_ios.jpg';
			}else{
			    echo '../images/open_android.jpg';
			}

		?>);
		background-repeat:no-repeat;
		background-position:center center;
		background-size:contain;
	}
</style>
</head>
<body>
<div></div>
</body>
</html><?php
		exit();
	}
    //iphone 浏览器
	if(stristr($_SERVER['HTTP_USER_AGENT'], 'iPhone') !== false){
		header('302 Found');
		header('Location: ' . ($ios_url != ''?$ios_url:'/sorry.php'));
		exit();
       //iPad
	}else if(stristr($_SERVER['HTTP_USER_AGENT'], 'iPad') !== false){
		header('302 Found');
		header('Location: ' . ($ipad_url != ''?$ipad_url:'/sorry.php'));
		exit();
		 //android 浏览器
	}elseif(stristr($_SERVER['HTTP_USER_AGENT'], 'android') !== false){
		header('302 Found');
		header('Location: ' . ($android_url != ''?$android_url:'/sorry.php'));
		exit();
	}
    //都不是
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<title>选择平台</title>
<style>
	body{
		padding:0px;
		margin:0px;
		color:#333;
		font-family: Microsoft YaHei,"宋体",Tahoma,Helvetica,Arial,"\5b8b\4f53",sans-serif;
		font-size:15px;
	}
	a{
		background-color:#9c27b0;
		color:#fff;
		border:none;
		border-radius:5px;
		height:35px;
		width:200px;
		display:inline-block;
		font-size:13px;
		text-decoration:none;
	}
	a:hover{
		background-color:#7b1fa2;
	}
	a.disabled{
		cursor:not-allowed;
		background-color:#CCC;
	}
	a.disabled:hover{
		background-color:#CCC;
	}
	body > div{
		text-align:center;
		line-height:35px;
	}
</style>
</head>
<body>
	<div>
		<p>
			抱歉，我们似乎无法判断您的系统类型。<br>
			请手动选择：
		</p>
        <p>
			<a class="" href="https://download.uboxs.net/app/boxbuy-3.0.1-release.apk">我是Android用户</a>
		</p>
		<p>
			<a class="" href="https://itunes.apple.com/cn/app/yun-ge-zi-pu-zui-hao-xiao/id967927811?mt=8">我是iOS用户</a>
		</p>
	</div>
</body>
</html>
