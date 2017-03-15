

















onmessage = function(ar) {
  var [prState, num, decompState] = ar.data;
  importScripts('script2.js');
  var primesState = execP(prState, num);
  fdTransformer(primesState, num +1, decompState)
  .bnd(newFactorState => {
     self.postMessage(["The prime factors of " + num + " are " + 
     newFactorState[3][num].join(', '), primesState, newFactorState])
  })
};


