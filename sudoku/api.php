<?php
$level=mt_rand(1,4);
$lines= file_get_contents("http://show.websudoku.com/?level=$level");
//print_r($lines);
preg_match_all('/<INPUT(.*?)>/',$lines,$res);
$idx=0;
echo "[";
foreach($res[0] as $it)
{
    if($idx>0 && $idx%9==0)
        echo "],[";
    if($idx%9>0)
        echo ",";
    if(preg_match("/READONLY/",$it))
    {
        preg_match_all('/VALUE="\\d"/',$it,$num);
        $tmp=preg_replace('/VALUE="/',"",$num[0][0]);
        echo preg_replace('/\"/',"",$tmp);  
    }
    else
        echo '0';

     
    $idx+=1;
}
echo ']';
?>

