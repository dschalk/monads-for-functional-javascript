

















onmessage = function(ar) {
  var [prState, num, decompState] = ar.data;
  importScripts('script2.js');
  execP(prState, num)
  .bnd(newPrimeState => {
      fdTransformer(newPrimeState, num +1, decompState)
      .bnd(newFactorState => {
          self.postMessage(["The prime factors of " + num + " are " + 
          newFactorState[3][num].join(', '), newPrimeState, newFactorState])
    })
  });
}


