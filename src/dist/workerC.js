










onmessage = function(ar) {
  console.log('In workerC.js.  ar is ', ar );  
  importScripts('script2.js');
  execP(ar.data[0], ar.data[1] + 1)
  .bnd(primeState => pfactorsTransformer(primeState, ar.data[1])
  .bnd(factors => postMessage(["The prime factors of " + ar.data[1] + 
    " are " + factors.join(', '), primeState])));
}


