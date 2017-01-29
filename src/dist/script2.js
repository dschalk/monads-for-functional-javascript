

function testPrefix (x,y) {
  var t = y;
  var s;
  if (Array.isArray(x)) {
    x.some(v => {
      if (typeof v == 'string' && v.charAt() == 'M') {
         t = v.slice(1);
      }
    })
  }
  return t;
}

var Monad = function Monad(z = 19, g = 'generic') {
  var _this = this;
  this.x = z;
  this.id = g;
  this.bnd = function (func, ...args) {
    var m = func(this.x, ...args)
    var ID;
    if (m instanceof Monad) {
      ID = testPrefix(args, _this.id); 
      self[ID] = new Monad(m.x, ID);
      return self[ID];
    }
    else return m;
  };
  this.ret = function (a) {
    return self[_this.id] = new Monad(a,_this.id);
  };
};

//*************************************** BEGIN prime Fibonacci numbers

var fpTransformer = function fpTransformer(fibsState, primeState, then) {
  var ar = [];
  execP (primeState, Math.ceil(Math.sqrt(fibsState[1]))).bnd(ps => {
    fibsState[3].map(fs => {
      if (ps[3].filter(r => r <= fs).every(p => (fs % p || fs == p))) {ar.push(fs)};
    })
    var now = Date.now();
    var elapsed = now - then;
    postMessage( [ [fibsState[3].join(', '), ps[2], ar.join(', '), elapsed], ps ] )
  })
}



//*************************************** END prime Fibonacci numbers

function fdTransformer (primeState, n, decompState) {
  var factors = decompState[3].slice();
  var factors2 = decompState[3].slice();
  var ar = [];
  var d = decompState[2];
  var k;
  var result;
  if (n <= d) {result = new MonadState('decompMonad', decompState)};
  if (n > d) {
    while (d < n) {
      k = d;
      while (k != 1) {
        primeState[3].map(p => {
          if (k/p === Math.floor(k/p)) {
            ar.push(p);
            k = k/p;
          };
        })
      }
      ar.sort(function(x,y) {
        return (x - y);
      });
      factors.push(ar);
      ar = [];
      d += 1;
    }
    result = new MonadState('decompMonad', [d, factors, d , factors]);
  }
  Object.freeze(result);
  console.log('In fdTransformer  ***  result is', result);
  return result;
}

function pfactors (primeState, n) {
  var ar = [];
  while (n != 1) {
    primeState[3].map(p => {
      if (n/p === Math.floor(n/p)) {
        ar.push(p);
        n = n/p;
      };
    })
  }
  ar.sort(function(x,y) {
    return (x - y);
  });
  return ret(ar);
}

function ret(v, id = 'generic') {
  self[id] = new Monad(v, id);
  return self[id];
}

var mMfactors = new Monad('', 'mMfactors');

function MonadState(g, state) {
  this.id = g;
  this.s = state;
  this.bnd = (func, ...args) => func(this.s, ...args);  
};

var primesMonad = new MonadState('primesMonad', [3, [], 3, [2,3]]);
Object.freeze(primesMonad);

var fibsMonad = new MonadState('fibsMonad', [0, 1, 2, [0]]);
 
var decompMonad = new MonadState('decompMonad', [3, [[0],[1],[2]], 3, [[0],[1],[2]]]);
Object.freeze(decompMonad)

function execP (state, num) {
  console.log('********** Salutations from execP. state and num are', state, num );
  var top = state[2];
  var top2 = state[2];
  var primes = state[3];
  var primes2 = state[3]
  var result;
  if (num == state[0] || num == top) {
    result = new MonadState('primesMonad', state);
  }

  else if (num < top) {
    var temp = primes.filter(v => v <= num);
    var q = temp.indexOf(temp[temp.length - 1]);
    temp.push(primes[q + 1]);
    result = new MonadState('primesMonad', [primes[q+1], temp, top, primes]);
  }
    
  else {
    while (top2 <=  num ) {
      if (primes2.every(e =>  (top / e != Math.floor(top / e))))  {
        primes.push(top);
        top2 = top;
      };
      top += 2;
    }
    result = new MonadState('primesMonad', [top2, primes, top2, primes] );
  }
  Object.freeze(result)
  return result;
};

function execF(n) {
  var a = [0,1];
  var b = [];
  while ((a[0] + a[1]) < n) {
   a = [a[1], a[0] + a[1]];
   b.push(a[0]);
  }
  b.push(a[1]);
  return new MonadState('fibsMonad', [a[0], a[1], n, b]);
};

function execD(decompState, primeState, n, a, b) {
  var c = decompState[3].slice();
  var d = decompState[2];
  var res;
  execP(primeState, n)
  .bnd(newState => {
    while (d <= n) {
      fact2(newState[3], d)
      .bnd(factors => c.push(factors))
      d += 1;
    }
    new MonadState('decompMonad', [d, c, d, c.slice()])
    .bnd(dsx => {
      var ds = dsx.slice();
      res = lcm(ds[3][a], ds[3][b]);
      gd = gcf(ds[3][a], ds[3][b]);
      postMessage([ newState, [a, b, res, gd], ds ])
    })
  })
}

function execLCM (a, b, primeState) {
  console.log('Kind regards from execLCM');
  pfactors(primeState, a).bnd(x => { 
    pfactors(primeState, b).bnd(y => { 
      postMessage([primeState, [a, b, lcm(x,y), gcf(x,y)]])
    })
  })
}

function fact(v) {
  var ar = [];
  while (v2 != 1) {
    for (let p of v[1]) {
      if (v2 / p === Math.floor(v2 / p)) {
        ar.push(p);
        v2 = v2/p;
      };
    }
  }
  ar.sort(function(a, b) {
    return a - b;
  });
  return ret(ar);
}

function fact2(s, b) {
  var ar = [];
  var n = b;
  while (n != 1) {
    s.map(p => {
      if (n/p === Math.floor(n/p)) {
        ar.push(p);
        n = n/p;
      };
    })
  }
  ar.sort(function(x,y) {
    return (x - y);
  });
  return ret(ar);
}

var fibs_state = function fibs_state(ar) {
  var a = ar.slice();
  while (a[0] < a[2]) {
      a = [a[1], a[0] + a[1], a[2], a[3].concat(a[0])];
  }
  return a;
};

function lcm (cx,dx) {
  var r;
  var c = cx.slice();
  var d = dx.slice();
  d.map(v => {
    if (c.some(x => x === v)) {
      c.splice(c.indexOf(v),1)
    }
      r = d.concat(c).reduce(function (a,b) {return a*b})
    }
  )
  return r
}

function gcf (a, bx) {
  var b = bx.slice();
  var ar = [];
  a.map(x => {
    if (b.includes(x)) {
      ar.push(x)
      b.splice(b.indexOf(x),1)
    }
  })
  if (ar.length > 0) {
    return ar.reduce((j,k) => j*k)
  }
  else return 1;
}



