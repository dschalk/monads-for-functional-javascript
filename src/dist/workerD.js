













onmessage = function(ar) {
  importScripts('script2.js');
  var r = [];  
  var k = ar.data[2];
  var s = primesMonad.run( [ ar.data[1][0], ar.data[1][1], ar.data[0], ar.data[1][3] ] ).s;
  console.log('In workerD.js. ****************** s, k, ar.data[0] are', s, k, ar.data[0] );
   while (k <= ar.data[0]) {
    next = fact2(k, s[3]);
    r.push(next);
    k+=1;
  } 
  console.log('Leaving workerD.js. r',r );
  postMessage([r, s, ar.data[0]]);
}


