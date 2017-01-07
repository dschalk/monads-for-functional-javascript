










  onmessage = function(m) {
  var ar = m.data;
  importScripts('script2.js');
  var x = Date.now();

  var result = fibsMonad.run([1, 2 , ar[2], [0,1]])
  .bnd(fpTransformer, ar[1]);
  var y = Date.now() - x;
  result.push(y);  
  postMessage(result);
};
