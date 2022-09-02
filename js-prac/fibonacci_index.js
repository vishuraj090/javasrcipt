(function(limit) {

    let n1 = 0, n2 = 1, next;
	var sumFibonacci = 0;
    next = n1 + n2;

    while (n1 < 4000000) {
	//console.log(next);
        
        n1 = n2;
        n2 = next;
        next = n1 + n2;
		
		if(n1%2==0){
			//console.log(n1);
			sumFibonacci += n1;
			//console.log(sumFibonacci);
		}
		
		
    }
	
	// console.log(sumFibonacci);
	 
	 document.write(sumFibonacci);
}(4000000))


