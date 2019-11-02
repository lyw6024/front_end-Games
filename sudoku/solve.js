var sudoku=new Array();
var res=new Array();
var editable=new Array();
for(var i=0;i<9;i++)
{
    sudoku[i]=new Array();
    editable[i]=new Array();
    res[i]=new Array();
}

 var stack=new Array();

function generator()
{
    var i,j;
    for(i=0;i<9;i++)
        for(j=0;j<9;j++)
        {
            var elem=document.getElementById('f'+j+i);
            if(elem.value=='')
            {
                sudoku[i][j]=0;
                editable[i][j]=1;
                stack.push({x:j,y:i});
            }
            else
            {
                sudoku[i][j]=parseInt(elem.value);
                editable[i][j]=0;
            }
        }
}


function judge()
{
var i,j,k1,k2;
  var winFlag=1;
  var bucket=new Array();
  for(i=0;i<9;i++)
  {
  for(j=0;j<=9;j++)
      bucket[j]=0;
   for(j=0;j<9;j++)
     {
    bucket[sudoku[i][j]]+=1;
     }
   for(j=1;j<=9;j++)
      if(bucket[j]>1)
        return -1;
   if(bucket[0]>0)
     winFlag=0;
  }
  
  for(i=0;i<9;i++)
  {
  for(j=0;j<=9;j++)
      bucket[j]=0;
   for(j=0;j<9;j++)
     bucket[sudoku[j][i]]+=1;
   for(j=1;j<=9;j++)
      if(bucket[j]>1)
        return -1;
   if(bucket[0]>0)
     winFlag=0;
  }
  for(k1=0;k1<9;k1+=3)
   {
   for(k2=0;k2<9;k2+=3)
  {
    for(j=0;j<=9;j++)
      bucket[j]=0;
    for(i=0;i<3;i++)
      for(j=0;j<3;j++)
        bucket[sudoku[k1+i][k2+j]]+=1;
    for(j=1;j<9;j++)
      if(bucket[j]>1)
        return -1;
    if(bucket[0]>0)
      winFlag=0;
  }
}
   return winFlag;
   
}

function fill(x,y)
{
    if(judge()==1)
        return;

    var i,j,val,passFlag=0;
    for(i=x;i<9;i++)
    {
        for(j=0;j<9;j++)
            if(editable[i][j]==1)
            {
                passFlag=1;
                break;
            }
        if(passFlag==1)
            break;
    }
    for(val=1;val<=9;val++)
    {
        sudoku[i][j]=val;
        var key=judge();
        
        if(key==0){
            editable[i][j]=0;
            fill(i,j);
        }
        else if(key==1)
        {
            getRes();
            return ;
        }
    }
    sudoku[i][j]=0;
    editable[i][j]=1;
}

function getRes()
{
    for(i=0;i<9;i++)
        for(j=0;j<9;j++)
            res[i][j]=sudoku[i][j];
    rec();
}
function rec()
{
    if(stack.length>0)
    {
            var idx=Math.floor(stack.length*Math.random());
            var tmp=stack[idx];
            stack[idx]=stack[stack.length-1];
            stack[stack.length-1]=tmp;

            stack.pop();

            var j=tmp.x,i=tmp.y;
            var elem=document.getElementById("f"+j+i);
            elem.value=res[i][j];
            setTimeout("rec()",20);
    }
}

function fillToTable()
{
    var i,j;
    for(i=0;i<9;i++)
        for(j=0;j<9;j++)
        {
            var elem=document.getElementById('f'+j+i);
            if(editable[i][j]==1)
                elem.value="";
        }
}
function main()
{
    generator();
    fill(0,0);
}
