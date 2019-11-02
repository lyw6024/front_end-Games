<!DOCTYPE HTML>
<html>
<head>
<link rel="stylesheet" type="text/css" href="style24.css">
<script>

function j8(f)
{
	s="         ";
	
	if (f.value.length>0)
		if (f.value==s.substring(0, f.value.length))
			f.value="";
}


</script>
</head>
<body>
<div style="width:800px;margin:0 auto;padding:50px;">
<p>本页面的数独提取自<a href="http://www.websudoku.com" target="_blank">www.websudoku.com</a>,每次刷新会再随机生成一个数独</p>
<?php
$level=mt_rand(1,4);
$ctx= file_get_contents("http://show.websudoku.com/?level=$level");

preg_match("/\<TABLE id=\"puzzle_grid\" .*?\<\/TABLE\>/",$ctx,$msg);
echo $msg[0];

?>
<br>
    <div style="padding:30px;">
    <button style="padding:10px;"onclick="main()">计算答案</button>
<!--    <button style="padding:10px;"onclick="fillToTable()">初始状态</button> -->
   </div>
</div>
<script src="solve.js"></script>
</body>
</html>

