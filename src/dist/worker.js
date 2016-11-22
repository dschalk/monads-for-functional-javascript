


onmessage = function(v) {

  function MonadState(g, state, p) {
    this.id = g;
    this.s = state;
    this.process = p;
    this.a = this.s[3];
    this.bnd = (func, ...args) => func(this.s, ...args);  
    this.run = ar => { 
      var ar2 = this.process(ar);
      this.s = ar2;
      this.a = ar2[3];
      self[this.id] = this;
      return self[this.id];
    }
  };
  
  function primes_state(x) {
    var v = x.slice();
    while (2 == 2) {
        if ( v[3].every(e =>  (v[0] / e) != Math.floor(v[0] / e)) ) {
            v[3].push(v[0]);
        }
        if (v[3][v[3].length - 1] > v[2]) {
            break;
        };
        v[0] += 2;
    }
    return v;
  };
  
  var primesMonad = new MonadState('primesMonad', [3, '', 3, [2,3]], primes_state);
  primesMonad.run([3, '', 12, [2, 3]]);
  function pFib(fibs, primes) {
    var ar = [];
    fibs.map(function (f) {
        if (f < 2)
            return;
        if (primes.every(function (p) { return (f % p != 0 || f == p); }))
            ar.push(f);
    });
    return ar;
  };
  
  function prFactTransformer3(s, n) {
    return factors_state3([[], [], n, s[3]]);
  };
  
  function factors_state3(a) {
    var b = a.slice();
    var result;
    func(b);
    function func (v) {
      for (let p of v[3]) {
        if (v[2] / p == Math.floor(v[2] / p)) {
          v[1].push(p);
          v[2] = v[2]/p;
          if (v[2] != 1) {
            func(v);
          }
        };
        v[1].sort(function(a, b) {
          return a - b;
        });
        result = v[1];
      }; 
    }
    return result;
  }
  
  function checkpM () {
  
  };
  
  function factors (num) {
    return primesMonad.run([primesMonad.s[0], [], num, primesMonad.a])
    .bnd(s => prFactTransformer3(s, num))
  }
  
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


