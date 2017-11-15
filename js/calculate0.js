window.onload=function(){
    var el= function(element){
        if (element.charAt(0)==="#") {
          return document.querySelector(element);
      }
      else{
          return document.querySelectorAll(element);
      }
  }

  var clear=el("#clear"),
  viewer=el("#viewer"),
  equals=el("#equals"),
  ops=el(".ops"),
  nums=el(".num"),
  back=el("#back"),
  viewerops=el("#viewerops"),
  newNum="",
  oldNum="",
  resultNum,
  operator;



  var setNum=function(){
    if (resultNum) {
        newNum=this.getAttribute("data-num");
        resultNum="";
    }
    else{
        newNum+=this.getAttribute("data-num");
    }
    viewer.innerHTML=newNum;
};

    var backNum=function(){
    if (resultNum) { 
        viewer.innerHTML="0";}
        else{newNum=newNum.substring(0,newNum.length-1);
           viewer.innerHTML=newNum;}
       };

       var setPos=function(){
        if (oldNum!=""&&newNum!="") {
          displayNum();
          oldNum=newNum;
          newNum="";
          operator=this.getAttribute("data-ops");
          viewerops.innerHTML=operator;
        }
        else{
        if (operator) {  
           newNum="";                
          operator=false;
          operator=this.getAttribute("data-ops");
          viewerops.innerHTML=operator; }
        else{
        oldNum=newNum;
        newNum="";
        operator=this.getAttribute("data-ops");
        viewerops.innerHTML=operator;
        flag=true;

        equals.setAttribute("data-result","");}
      }
    };

    var clearAll=function(){
        newNum="";
        oldNum="";
        viewer.innerHTML="0";
        viewerops.innerHTML="";
        operator=false;
        equals.setAttribute("data-result", resultNum);
    };

    var displayNum=function(){

        oldNum=parseFloat(oldNum);
        newNum=parseFloat(newNum);

        switch(operator){
            case("+"):
            resultNum=oldNum + newNum;break;

            case("-"):
            resultNum=oldNum - newNum;break;

            case("*"):
            resultNum=oldNum * newNum;break;

            case("/"):
            resultNum=oldNum / newNum;break;

            default:
            resultNum=newNum;
        }

          operator=false;
            if (resultNum==Infinity) {
                    viewer.innerHTML="不能除0！";
                }
            else{
                    if (isNaN(resultNum)) { 
                    viewer.innerHTML="AC";}

                        else{viewer.innerHTML=resultNum;
                            equals.setAttribute("data-result", resultNum);
                            viewerops.innerHTML="";

                            oldNum=0;
                            newNum=resultNum;
                        }
                }
        
     };



           clear.onclick=clearAll;
        equals.onclick=displayNum;

        for(var i=0; i < nums.length;i++){
            nums[i].onclick=setNum;
        }
        for(var i=0; i < ops.length;i++){
          ops[i].onclick=setPos; 
        }
        back.onclick=backNum
    };