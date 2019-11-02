
function convertNum2Arr(x)
{
	c=new Array();
	for(i=8;i>=0;i--)
	{
		c[i]=(x%10);
		x=Math.floor(x/10);
	}
	return c;
}

function convertArr2Num(c)
{
	x=0;
	for(i=0;i<9;i++)
	{
		x=x*10+c[i];
	}
	return x;
}

function numGoUp(x)
{
	z=convertNum2Arr(x);
	pos0=z.indexOf(0);
	posZ=pos0-3;
	if(pos0>=0)
	{
		tmp=z[posZ];
		z[posZ]=z[pos0];
		z[pos0]=tmp;
	}
	return convertArr2Num(z);
}
function numGoDown(x)
{
	z=convertNum2Arr(x);
	pos0=z.indexOf(0);
	posZ=pos0+3;
	if(posZ<9)
	{
		tmp=z[posZ];
		z[posZ]=z[pos0];
		z[pos0]=tmp;
	}
	return convertArr2Num(z);
}
function numGoLeft(x)
{
	z=convertNum2Arr(x);
	pos0=z.indexOf(0);
	posZ=pos0-1;
	if(posZ>=0 && posZ%3<2)
	{
		tmp=z[posZ];
		z[posZ]=z[pos0];
		z[pos0]=tmp;
	}
	return convertArr2Num(z);
}
function numGoRight(x)
{
	z=convertNum2Arr(x);
	pos0=z.indexOf(0);
	posZ=pos0+1;
	if(posZ<9 && posZ%3!=0)
	{
		tmp=z[posZ];
		z[posZ]=z[pos0];
		z[pos0]=tmp;
	}
	return convertArr2Num(z);
}

function findPath(a)
{
	x=convertArr2Num(a);
	move=new Array(numGoUp,numGoDown,numGoLeft,numGoRight);
	dir=new Array("W","S","A","D");
	queue = new Array();
	used = new Array();
	node={value:x,path:""};
	queue.push(node)
	used.push(node.value);

	while(queue.length>0)
	{
		node=queue.shift();
		v=node.value;
		for(k=0;k<4;k++)
		{
			nextV=move[k](v);
			if(!used.includes(nextV))
			{
				nowPath=node.path+dir[k];
				if(nextV==123456780)
				{
					return nowPath;
				}
				used.push(nextV);
				queue.push({value:x,path:nowPath});
			}
		}
	}

}

function autoSolve()
{
	s=findPath(a);
	autoSolveStep(s);
}

function autoSolveStep(s)
{
	if(s.length>0)
	{
		if(s[0]=='D')
		{
			moveRight();
		}
		else if(s[0]=='A') //a
		{
			moveLeft();
		}
		else if(s[0]=='W') //w
		{
			moveUp();
		}
		else if(s[0]=='S') //s
		{
			moveDown();
		}
		drawToTable(a);
		setTimeout('autoSolveStep("'+s.substring(1)+'")',200);
	}
	else
	{
		winState();
	}
}
