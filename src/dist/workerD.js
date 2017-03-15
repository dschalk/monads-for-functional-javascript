
















onmessage = function(ar) {
  console.log('Cordial greetings from workerD.js --- ar is', ar );
  var n = 0;
  importScripts('script2.js');
  var res;
  var a = ar.data[1][0];
  var b = ar.data[1][1];
  var primeState = ar.data[0];
  var decompState = ar.data[2];
  var max = a > b ? a : b
  var c = ar.data[2][3];
  var d = c.length;
  var diff = max - d;
  var primes = execP(ar.data[0], max)
  execLCM(a, b, primes) 
}



 /* execP(max)
  .bnd(newState => {
    while (d <= max) {
      fact2(newState[3], d)
      .bnd(factors => c.push(factors))
      d += 1;
    }
    res = lcm(c[a], c[b]);
    postMessage([ c, newState, [ar.data[1][0], ar.data[1][1], res] ])
   });  */
 

