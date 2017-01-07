










onmessage = function(ar) {
  console.log('In workerC.js.  ar is ', ar );  
  importScripts('script2.js');
  var num = ar.data[1];
  var sa = ar.data;

  primesMonad.run(sa)
  .bnd(newState => fact(newState)
  .bnd(factors => postMessage(["The prime factors of " + num + 
    " are " + factors.join(', '), newState])));
 }


