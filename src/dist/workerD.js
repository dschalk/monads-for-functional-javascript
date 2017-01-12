









/*

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
*/

onmessage = function(ar) {
  importScripts('script2.js');
  console.log('In workerD.js ar is', ar );
  var state = ar.data[0];
  var b = ar.data[1].sort();
  var c = ar.data[2];
  var n = c.length;
  var top;
  primesMonad.run( [state, b[0]] );
  console.log('In workerD. primesMonad.s[3]', primesMonad.s[3] );
  primesMonad.run( [state, (b[1]+1) ])
  .bnd(v => {
    top = v[1][v[1].length - 1]
    for (let j = n; j <= top; j+=1) {
      next = fact2(v[1],j)
      c.push(next.x)
      console.log('In workerD.js. top, next and c are', top, next, c);
    }
    console.log('In workerD.js at the bottom. c and b are', c, b );
    var res = lcm(c[b[0]], c[b[1]]);
    postMessage([ c, v, [ar.data[1][0], ar.data[1][1], res] ]);
  })
}


/*
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
*/
