
onmessage = function(m) {
  
  console.log('In workerC.js m.data is ', m.data );
  importScripts('script2.js');

  primesMonad.run([primesMonad.s[0], [], m.data, primesMonad.s[3]])
  .bnd(s => prFactTransformer3(s, m.data)
  .bnd(factors => postMessage(["The prime factors of " + m.data + " are " + factors.join(', '), s])));
 } 
