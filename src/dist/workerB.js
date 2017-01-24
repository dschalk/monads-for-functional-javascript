










onmessage = function(m) {
  var ar = m.data.slice();
  importScripts('script2.js');
  var x = Date.now();

  var arr = execF(ar[1])  
  .bnd(fpTransformer, ar[0], x)
}




