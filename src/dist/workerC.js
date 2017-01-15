










onmessage = function(ar) {
  console.log('In workerC.js.  ar is ', ar );  
  importScripts('script2.js');
  var num = ar.data[1];
  primesState = new StateMonad('primesState', ar.data[0], primes_state);
  var sa = ar.data;

  execP(num)
  .bnd(newState => fact2(newState[3],num)
  .bnd(factors => postMessage(["The prime factors of " + num + 
    " are " + factors.join(', '), newState])));
 }


