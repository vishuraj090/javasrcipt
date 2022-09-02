
function isPalin(x){
    x = x.toString().split('');
    var len = x.length;
 //   console.log(len);
    for(var i=0; i<len/2;i++){
        if(x[i] !== x[len-1-i]){
 //           console.log(x[len-1-i]);
            return false;
        }
    }
    return true;
};

function largestPalindrome(){

    var arr = [];    
    for(var i =999; i>800; i--){
        for(var j = 999; j>800; j--){
            var mult = i*j;
            if(isPalin(mult)){
                arr.push(mult);
            }
        }
    }

    // document.write(arr);
    // document.write("<br>");
    return Math.max.apply(Math, arr);
   
}


document.write(largestPalindrome());