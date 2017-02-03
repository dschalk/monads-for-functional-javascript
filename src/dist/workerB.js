










onmessage = function(m) {
  console.log('In workerB. m is', m);
  var ar = m.data.slice();
  importScripts('script2.js');
  var x = Date.now();

  postMessage(['red', 'yellow', 'yellow', 'color', 'computing fibs', 'pending', 'pending']);
  console.log('Hello Nurse');
  var arr = execF(ar[1])  
  .bnd(fpTransformer, ar[0], x)
}




