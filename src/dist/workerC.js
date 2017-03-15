










onmessage = function(ar) {
  console.log('Cordial greetings from workerD.js --- ar is', ar );
  console.log('In workerC.js.  ar is ', ar );  
  importScripts('script2.js');
  var primes = execP(ar.data[0], ar.data[1] + 1)
  pfactors(primes, ar.data[1])
  .bnd(factors => postMessage(["The prime factors of " + ar.data[1] + 
    " are ", factors.join(', '), primes]));
}


