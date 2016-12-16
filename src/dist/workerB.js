


















  onmessage = function(m) {
  var ar = m.data;
  console.log('In workerB.js ar is ', ar );
  importScripts('script2.js');

  var result = fibsMonad.run([1, 2 , ar[0], [0,1]])
  .bnd(fpTransformer, ar[1])
  console.log('In workerB.js __ ar and result are ', ar, result );
  postMessage(result);
};
