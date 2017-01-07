









onmessage = function(ar) {
  importScripts('script2.js');
  var r = [];  
  var k = ar.data[2];
  primesMonad.run( [ar.data[0], ar.data[1]] ).bnd(s => {
    console.log('In workerD.js. k, ar.data[1], k <= ar.data[1]', k, ar.data[1], k <= ar.data[1] );
     while (k <= ar.data[1]) {
      next = fact2(k, s[1].filter(v => v <= k));
      r.push(next);
      k+=1;
    } 
    postMessage([r, s, ar.data[1]]);
  })
}

