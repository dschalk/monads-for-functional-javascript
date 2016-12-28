

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
      ID = testPrefix(args, this.id); 
      window[ID] = new Monad(m.x, ID);
      return window[ID];
    }
    else return m;
  };
  this.ret = function (a) {
    return window[_this.id] = new Monad(a,_this.id);
  };
};

//*************************************** BEGIN prime Fibonacci numbers

var fpTransformer = function fpTransformer(x, s) {
  s[2] = Math.ceil(Math.sqrt(x[3].slice(-1)[0]));
  var m = primesMonad.run(s);
  var ar = [];
  x[3].map(function (v) {
    if (m.s[3].every(function (p) { return (v % p || v == p); }))
      ar.push(v);
  });
  return [x[3].join(', '), m.s[3].join(', '), ar.join(', '), m.s];
};

//*************************************** END prime Fibonacci numbers

function ret(v, id = 'generic') {
  self[id] = new Monad(v, id);
  return self[id];
}

var fibs_state = function fibs_state(ar) {
  var a = ar.slice();
  while (a[0] < a[2]) {
      a = [a[1], a[0] + a[1], a[2], a[3].concat(a[0])];
  }
  return a;
};

var fibsMonad = new MonadState('fibsMonad', [0, 1, 2, [0]], fibs_state);
 
fibsMonad.run([1, 2 ,7, [0,1]]);

factor_state([[], [], 24, [2, 3, 5]]);

factor_state2([[], [], 24, [2, 3, 5]]);

var factorsMonad = new MonadState('factorsMonad', [[], [], 2, []], factor_state);

function factor_state(v) {
  v[3].map(function (p) {
      if (v[2] / p == Math.floor(v[2] / p)) {
          v[0].push(p);
      }
  });
  return v;
}

function factor_state2(a) {
  var v = a.slice();
  var result;
  function func (v) {
    for (let p of v[3]) {
      if (v[2] / p == Math.floor(v[2] / p)) {
          v[0].push(p);
          func([v[0], v[1], v[2]/p, v[3]])
          break;
      };
      result = v;
    }; 
  }
  return result;
}

var mMfactors = new Monad('', 'mMfactors');

var prFactTransformer = function prFactTransformer(s, n) {
  return factorsMonad.run([[], [], n, s[3]]);
};

var prFactTransformer2 = function prFactTransformer2(s, n) {
  return factorsMonad.run([[], [], n, s[3]]);
};

function prFactTransformer3(s, n) {
  return factors_state3([[], [], n, s[3]]);
};

var mMroll = new Monad([0,0,0,0], 'rollMonad');

var mMplayer = new Monad([0,0,0,0], 'mMplayer');

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
    console.log('Entering primes_state. x is', x );
    var v = x.slice();
    while (2 == 2) {
        if ( v[3].every(e =>  (v[0] / e) != Math.floor(v[0] / e)) ) {
            v[3].push(v[0]);
        }
        if (v[0] > v[2]) {
           console.log('Leaving primes_state. x is', x );
           return v; 
        };
        v[0] += 2;
    }
  };
  
  var primesMonad = new MonadState('primesMonad', [3, [], 3, [2,3]], primes_state);

  function pFib(fibs, primes) {
    var ar = [];
    fibs.map(function (f) {
        if (f < 2) return;
        if (primes.every(function (p) { return (f % p != 0 || f == p); })) ar.push(f);
    });
    return ar;
  };
  
  function prFactTransformer3(s, n) {
    return fact([[], [], n, s[3]]);
  };
  
  function fact(a) {
    console.log('Entering fact. a is', a );
    var v = a.slice();
    while (v[2] != 1) {
      for (let p of v[3]) {
        if (v[2] / p === Math.floor(v[2] / p)) {
          v[1].push(p);
          v[2] = v[2]/p;
        };
      }
    }
    v[1].sort(function(a, b) {
      return a - b;
    });
    return ret(v[1]);
  }
  
  function fact2(a,b) {
    var ar = [];
    var n = a;
    while (n != 1) {
      for (let p of b) {
        if (n/p === Math.floor(n/p)) {
          ar.push(p);
          n = n/p;
        };
      }
    }
    ar.sort(function(a, b) {
      return a - b;
    });
    return ar;
  }
  
  function factors (num) {
    return primesMonad.run([primesMonad.s[0], [], num, primesMonad.a])
    .bnd(s => prFactTransformer3(s, num))
  }
  
