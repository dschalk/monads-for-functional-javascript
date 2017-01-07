

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
  var a = Math.ceil(Math.sqrt(x[3].slice(-1)[0]));
  var m = primesMonad.run([s,a]);
  var ar = [];
  x[3].map(function (v) {
    if (m.s[3].filter(x => x <= v).every(function (p) { return (v % p || v == p); }))
      ar.push(v);
  });
  return [x[3].join(', '), m.s[3].slice(-1).pop(), ar.join(', '), m.s];
};

//*************************************** END prime Fibonacci numbers

function ret(v, id = 'generic') {
  self[id] = new Monad(v, id);
  return self[id];
}

var mMfactors = new Monad('', 'mMfactors');

function MonadState(g, state, p) {
  this.id = g;
  this.s = state;
  this.process = p;
  this.a = this.s[2];
  this.bnd = (func, ...args) => func(this.s, ...args);  
  this.run = ar => { 
    var ar2 = this.process(ar);
    this.s = ar2;
    this.a = ar2[2];
    self[this.id] = this;
    return self[this.id];
  }
};

function primes_state(x) {
  console.log('Entering primes_state. x is', x );
  var v = x[0];
  var a = x[1];
  if (a == v[2]) {
    return v;
  }

  else if (a < v[0]) {
    v[1] = v[3].filter(v => v <= a);
    v[2] = a;
    return v;
  }
    
  else {
    while (v[0] < a) {
      if ( v[3].filter(x => x <= v[0]).every(e =>  (v[0] / e) != Math.floor(v[0] / e)) ) {
        v[3].push(v[0]);
      };
      v[0] += 2;
    }
    v[2] = a;
    v[1] = v[3];
    return v;
  }
};

var primesMonad = new MonadState('primesMonad', [3, [], 3, [2,3]], primes_state);

function fact(v) {
  var ar = [];
  console.log('Entering fact. v is', v );
  while (v[2] != 1) {
    for (let p of v[1]) {
      if (v[2] / p === Math.floor(v[2] / p)) {
        ar.push(p);
        v[2] = v[2]/p;
      };
    }
  }
  ar.sort(function(a, b) {
    return a - b;
  });
  return ret(ar);
}

function fact2(k,b) {
  var ar = [];
  var n = k;
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

var fibs_state = function fibs_state(ar) {
  var a = ar.slice();
  while (a[0] < a[2]) {
      a = [a[1], a[0] + a[1], a[2], a[3].concat(a[0])];
  }
  return a;
};

var fibsMonad = new MonadState('fibsMonad', [0, 1, 2, [0]], fibs_state);
 
function lcm (c,d) {
  console.log('In lcm c, d ', c, d );
  var ar= [];
  var r;
  d.map(v => {
    if (c.some(x => x === v)) {
      ar.push(v)
      c.splice(c.indexOf(v),1)
      d.splice(d.indexOf(v),1)}
      r = ar.concat(d).concat(c).reduce(function (a,b) {return a*b})
    }
  )
  return r
}
