
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

function Monad(z = 19, g = 'generic') {
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

var primesMonad = new MonadState('primesMonad', [3, [], 3, [2,3]]);
Object.freeze(primesMonad);

//*************************************** BEGIN prime Fibonacci numbers

var fpTransformer = function fpTransformer(fibsState, primesState, then) {
  var ar = [];
  var top = Math.ceil(Math.sqrt(fibsState[1]));
  var state = execP(primesState, top);
  var top2 = state[2];
  postMessage(['green', 'green', 'red', 'color', 'done', 'done', 'computing prime fibs'])
  fibsState[3].map(fib => {
    if (state[1].every(p => (fib % p || fib == p))) {ar.push(fib)}
  })  
  postMessage(['green', 'green', 'green', 'color', 'done', 'done', 'done']);
  postMessage( [ [fibsState[3].join(', '), top2, ar.join(', '), then], state ] )
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

var fibsMonad = new MonadState('fibsMonad', [0, 1, 2, [0]]);
 
var decompMonad = new MonadState('decompMonad', [3, [[0],[1],[2]], 3, [[0],[1],[2]]]);
Object.freeze(decompMonad)


var count = 1;

function isPrime(n) {
   if (isNaN(n) || !isFinite(n) || n%1 || n<2) return false;
   var m = Math.sqrt(n);
   for (var i=2;i<=m;i++) if (n%i==0) return false;
   return true;
}

function *gen(x) {
  var x = x
  while(true) {
    if(isPrime(x)) yield x;
    x++;
  }
}

var primesIt = gen(primesMonad.s[2]+1);

function execP (state, num) {
  var x = state[2];
  var primes = state[3].slice();
  if (x < num) {
    var end = 0;
    while (end < num) {
      primes.push(primesIt.next().value);
      end = primes[primes.length - 1];
    }
    return [end, primes, end, primes]
  }
  else {
    var newP = primes.filter(v => (v <= num));
    return [newP[newP.length - 1], newP, x, primes];
  }
};

/function execF(n) {
  var a = [0,1];
  var b = [];
  while ((a[0] + a[1]) < n) {
   a = [a[1], a[0] + a[1]];
   b.push(a[0]);
  }
  b.push(a[1]);
  postMessage(['green', 'red', 'yellow', 'color', 'done', 'computing primes', 'pending'])
  console.log('Hello again Nurse');
  return new MonadState('fibsMonad', [a[0], a[1], n, b]);
};

function execD(decompState, primeState, n, a, b) {
  var c = decompState[3].slice();
  var d = decompState[2];
  var res;
  primesMonad = new MonadState('primesMonad', execP(primeState, n));
  primesMonad.bnd(newState => {
    while (d <= n) {
      fact2(newState[3], d)
      .bnd(factors => c.push(factors))
      d += 1;
    }
    var ds = [d, c, d, c]
    res = lcm(ds[3][a], ds[3][b]);
    gd = gcf(ds[3][a], ds[3][b]);
    postMessage([ newState, [a, b, res, gd], ds ])
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



