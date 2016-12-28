













onmessage = function(ar) {
  importScripts('script2.js');
  var r = [];
  var n = parseInt(ar.data[0]);
  var k = ar.data[2];
  var p = ar.data[1];
  var a;
  p[2] = n;
  primesMonad.run(p).bnd(s => {
    while (k <= n) {
      a = s[3].filter(v => v <= n)
      next = fact2(k, a);
      r.push(next)
      k+=1;
    } 
    postMessage([r,s,(n)]);
  })
}


