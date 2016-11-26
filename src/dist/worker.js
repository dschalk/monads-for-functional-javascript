


onmessage = function(v) {
  console.log('In worker.js v is ', v );
  
  importScripts('script2.js');

  if(Array.isArray(v.data) && v.data.length === 4) {
    postMessage(["CE#$41", primesMonad.run(v.data).s]);
  }

  if (v.data.length === 2 && typeof v.data[0] === 'string' && typeof v.data[1] === 'string') {
    function lcm (c1,d1) {
      var ar= [];
      var c = c1.slice()
      var d = d1.slice()
      var r;
      d1.map(v => {
        if (c.some(x => x === v)) {
          ar.push(v)
          c.splice(c.indexOf(v),1)
          d.splice(d.indexOf(v),1)}
          r = ar.concat(d).concat(c).reduce(function (a,b) {return a*b})
        }
      )
      return r
    }
  
    var a = v.data[0];
    var b = v.data[1];
    var r = Math.sqrt(a*a + b*b);
    console.log('In worker.js a,b',a,b )
    postMessage(["CA#$41", r]); 
    postMessage(["CB#$41", parseInt(a,10) + parseInt(b,10)]); 
    postMessage(["CC#$41", a * b]); 
    postMessage(["CD#$41", lcm(factors(a),factors(b))]);
  };
};


