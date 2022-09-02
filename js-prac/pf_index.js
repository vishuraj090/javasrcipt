// // function isPrime(n) {
// //   for (var i = 3; i < n; i += 2) {
// //     if (n % i === 0) {
// //       return false;
// //     }
// //   }
// //   return true;
// // }

// var a = 60085147;
// checkfactor(a);

// function checkfactor(num) {
//   //let num = 99999999999;

//   let j = 3;
//   while (j < num) {
//     if (num % j === 0) {
//       console.log(j);

//       //   var isIt = isPrime(j);
//       //   if (isIt) {
//       //   x.push(j);
//       // }
//     }
//     j += 2;
//     // console.log(x);
//   }
// }
function largestPrimeFactor(n) {
  var i = 2;
  let v = [];   // array where we push the number i
  while (i <= n) {
    if (n % i == 0) {
      n /= i;
      v.push(i); // it will push the number 
    } else {
      i++;
    }
  }
  console.log(v);
}
var a = 600851475143;
largestPrimeFactor(a);
