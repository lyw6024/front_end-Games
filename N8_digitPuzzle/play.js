

 function shuffle(a)
 {
 	var i,T=2*N;
 	for(i=0;i<T;i++)
 	{
 		var x=Math.floor(a.length*Math.random());
 		var y=Math.floor(a.length*Math.random());
 		var tmp=a[x];
 		a[x]=a[y];
 		a[y]=tmp;
 	}

 }
function drawBlock(text,x,y,Width,Height)
{
	ctx.fillStyle="#FFC";
	ctx.fillRect(x,y,Width,Height);
	ctx.fillStyle="#000";
	ctx.font="30px Verdana";
	if(text<10)
	{
		ctx.fillText(text,x+(Width-20)/2,y+(Height+20)/2);
	}
	else
	{
		ctx.fillText(text,x+(Width-20)/2-10,y+(Height+20)/2);
	}
	ctx.strokeRect(x,y,Width,Height);
}
function drawToTable(a)
{
	var x,y;
	for(i=0;i<N;i++)
	{
		x=i%ORDER;
		y=Math.floor(i/ORDER);
		currX=startX+x*(blockWidth+gap);
		currY=startY+y*(blockHeight+gap);
		if(a[i]>0)
		{
			drawBlock(a[i],currX,currY,blockWidth,blockHeight);
		}
		else
		{
			drawBlock("",currX,currY,blockWidth,blockHeight);
		}
	}
}

function judge(a)
{

	for(i=0;i<a.length-1;i++)
	{
		if(a[i]!=i+1)
			return false;
	}	
	return true;
}
function inversions(a)
{
	var count,i,j;
	count=0;
	for(i=1;i<a.length-1;i++)
	{
		for(j=0;j<i;j++)
			if(a[j]<a[i])
				count++;
	}
	return count;
}

var sx,sy;
function winState()
{
    document.getElementById("btn").disabled=true;
	winFlag=true;
	sy=- Math.random() * 16;
	sx=Math.floor( Math.random()*6-3)*2;
	if ( sx === 0 ) sx = 2;

	var i=0;
	x=i%ORDER;
	y=Math.floor(i/ORDER);
	currX=startX+x*(blockWidth+gap);
	currY=startY+y*(blockHeight+gap);
	fly(i);
}

function fly(k)
{
	if(k<N-1)
	{
		if(currX>-60 && currX<canvas.width)
		{
			currY+=sy;
			
			if(currY>canvas.height-blockHeight-gap)
			{
				currY=canvas.height-blockHeight-gap;
				sy=-sy*0.85;
			}
			sy+=0.98;
			drawBlock(a[k],currX,currY,blockWidth,blockHeight);
			currX+=sx;
			setTimeout("fly("+k+")",20);
		}
		else
		{
			sy=- Math.random() * 16;
			sx=Math.floor( Math.random()*6-3)*2;
			if ( sx === 0 ) sx = 2;
			var i=k+1;
			x=i%ORDER;
			y=Math.floor(i/ORDER);
			currX=startX+x*(blockWidth+gap);
			currY=startY+y*(blockHeight+gap);
			fly(i);
		}
	}
	else
	{
		
		setTimeout('ctx.fillStyle="#CCC";ctx.fillRect(startX,startY,ORDER*(blockWidth+gap),ORDER*(blockHeight+gap));ctx.font="18px Verdana";ctx.fillStyle="#000";ctx.fillText("fresh to replay",startX+5*gap,startY+1.5*blockHeight);',1000);
		return ;
	}
	

}
function moveUp()
{
	p=a.indexOf(0);
	x=p%ORDER;
	y=Math.floor(p/ORDER);
	if(y-1>=0 && ORDER*(y-1)+x>=0)
		y-=1;
	q=ORDER*y+x;

	tmp=a[p];
	a[p]=a[q];
	a[q]=tmp;
}
function moveDown()
{
	p=a.indexOf(0);
	x=p%ORDER;
	y=Math.floor(p/ORDER);
	if(y+1<ORDER && ORDER*(y+1)+x<N)
		y+=1;
	q=ORDER*y+x;

	tmp=a[p];
	a[p]=a[q];
	a[q]=tmp;
}
function moveLeft()
{
	p=a.indexOf(0);
	x=p%ORDER;
	y=Math.floor(p/ORDER);
	if(x-1>=0 && ORDER*(y)+(x-1)>=0)
		x-=1;
	q=ORDER*y+x;

	tmp=a[p];
	a[p]=a[q];
	a[q]=tmp;
}
function moveRight()
{
	p=a.indexOf(0);
	x=p%ORDER;
	y=Math.floor(p/ORDER);
	if(x+1<ORDER && ORDER*y+(x+1)<N)
		x+=1;
	q=ORDER*y+x;

	tmp=a[p];
	a[p]=a[q];
	a[q]=tmp;
}

function getKey()
{
	if(!winFlag)
	{
		var k=event.keyCode;
		if(k==68) //d
		{
			moveRight();
		}
		else if(k==65) //a
		{
			moveLeft();
		}
		else if(k==87) //w
		{
			moveUp();
		}
		else if(k==83) //s
		{
			moveDown();
		}
		drawToTable(a);
		if(judge(a)==true)
			winState();
	}
}

function becomeWinState()
{
    document.getElementById("btn").innerText="计算中";
    document.getElementById("btn").disabled=true;
    setTimeout("autoSolve()",1);
}


initState();
