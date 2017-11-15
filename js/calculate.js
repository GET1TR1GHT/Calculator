window.onload=function(){
	"use strict";
	//消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;消除代码运行的一些不安全之处，保证代码运行的安全； 提高编译器效率，增加运行速度；为未来新版本的Javascript做好铺垫。

	// 创建的提取对象的快捷方式
    var el=function(element){
    	if (element.charAt(0) === "#")  {//元素的第一个字符串绝对等于#，时执行本次操作。
    		return document.querySelector(element);//获取页面进行el函数的属性元素。
    	}
    	else{//其他执行本次操作
    		return document.querySelectorAll(element);//在文档内找全部符合选择器描述的节点。（class元素，element本身）
    	}
    };

	//引用对象，定义变量
	var viewer = el("#viewer"),//计算器的显示
	equals = el("#equals"),//等于按钮
	nums = el(".num"),//数字按钮
	ops =el(".ops"),//（加减乘除）运算的按钮
	clear =el("#clear"),//清除按钮
	newNum ="",//新数字
	oldNum ="",//旧数字
	resultNum,//结果
	resultShown = false,
	quit=0;
    operator; //操作


    var displayNum =function(){
    	oldNum=parseFloat(oldNum);//因为前面是字符串，要先进行强制数字转换
    	newNum = parseFloat(newNum);
    	resultShown = false;
    	if(oldNum!=0 && quit!=1){
    	switch(operator){//四种情况的判断
    		case"加上":
    		resultNum=oldNum + newNum;break;

    		case"减去":
    		resultNum=oldNum - newNum;break;

			case"乘以":
    		resultNum=oldNum * newNum;break;

    		case"除以":
    		resultNum=oldNum / newNum;break;

    		 default: resultNum = newNum;//当没有按运算符号的时候就不执行以上，resultNum等于newNum
    	}

    	if (resultNum==Infinity) {
    		viewer.innerHTML="不能除以0！";
    	}
    	else{
    	viewer.innerHTML=resultNum;
    	resultShown = true;
    	equals.setAttribute("data-result", resultNum);
    	oldNum=0;
    	newNum=resultNum;
    	}
    	


    };

    var clearAll= function(){
    	oldNum="";
    	newNum ="";
    	viewer.innerHTML= "0";
    	equals.setAttribute("data-result", resultNum);//创建个元素返回resultNum的值
    };

    var setNum=function(){//提取出数字事件
    	if (resultShown){
    		newNum = this.getAttribute("data-num");//如果结果已经被显示过了，点击数字，就重新赋值给newNum,重新的一轮计算
    		resultNum = "";
    	}
    	else{
    		newNum += this.getAttribute("data-num");//如果没有显示过，还在输入数字，把新的数字加入在newNum后，newNum是一个字符串
    	}

    	viewer.innerHTML = newNum;
    };

    var setOps=function(){//提取出运算符事件
    	oldNum=newNum;//点击运算符后，newNum的值赋给oldNum的值
    	newNum="";//newNum的值为空
    	operator= this.getAttribute("data-ops");

    	equals.setAttribute("data-result", "");
    };


     clear. onclick = clearAll; //点击c事件触发clearAll事件
     equals. onclick = displayNum; //点击=事件触发displayNum事件
     for (var i=0; i<nums.length; i++) {
     	quit=0;
     	nums[i]. onclick= setNum; //点击数字事件触发setNum事件
     	quit=1;
     }
     for (var i=0; i<ops.length; i++) {
     	ops[i]. onclick= setOps;//点击运算符号事件触发setOps事件
     }
};