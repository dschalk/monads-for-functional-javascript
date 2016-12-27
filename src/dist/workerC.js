













onmessage = function(ar) {
  
  console.log('In workerC.js ar.data is ', ar.data );
  importScripts('script2.js');
  var num = ar.data[0];
  var s = ar.data[1];
  s[2] = num;

  primesMonad.run(s)
  .bnd(s2 => fact(s2)
  .bnd(factors => postMessage(["The prime factors of " + num + 
    " are " + factors.join(', '), [s2[0], [], 42, s2[3]]])));
 }


