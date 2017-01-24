










onmessage = function(v) {
  importScripts('script2.js');
  console.log('In worker.js *** v is', v );
  // primesMonad = new MonadState('primesState', v.data[1]);

  if (Array.isArray(v.data) && v.data.length === 3 && v.data[0] == "CE#$42") {
    postMessage( [ "CE#$41", execP(v.data[1], v.data[2]).s ] )
  }

  if (v.data.length === 2 && typeof v.data[0] === 'string' && typeof v.data[1] === 'string') {
    var a = v.data[0];
    var b = v.data[1];
    var r = Math.sqrt(a*a + b*b);
    console.log('In worker.js a,b',a,b )
    postMessage(["CA#$41", r]); 
    postMessage(["CB#$41", parseInt(a,10) + parseInt(b,10)]); 
    postMessage(["CC#$41", a * b]); 
    postMessage(["CD#$41", lcm(factors(a).x, factors(b).x)]);
  };
};


