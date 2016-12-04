


self.onmessage = function(m) {
  console.log('In workerB.js m is ', m );
  var _self = self;
  var res;
  self.importScripts('script2.js');

  fibsMonad.run([1, 2 , parseInt(m.data,10), [0,1]])
  .bnd(fibsState => fibsMonad
    .bnd(fpTransformer, primesMonad)
      .bnd(primesState => tr3(fibsState[3], primesState[3])
      .bnd(ar => {
        console.log('In workerB.js __ ar is ', ar );
        _self.postMessage(ar);
      }) 
    ) 
  );
};


