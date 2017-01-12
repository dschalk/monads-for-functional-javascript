

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
  this.a = this.s[0];
  this.bnd = (func, ...args) => func(this.s, ...args);  
  this.run = ar => { 
    var ar2 = this.process(ar);
    this.s = ar2;
    console.log('In MonadState. this.process, ar2 >>> ', this.process, ar2);
    self[this.id] = this;
    return self[this.id];
  }
};

function primes_state(x) {
  var state = x[0].slice();
  var top = state[2];
  var primes = state[3];
  var newtop = x[1];
  if (newtop == state[0] || newtop == top) {
    return state;
  }

  else if (newtop < top) {
    var temp = primes.filter(v => v <= newtop);
    var q = temp.indexOf(temp[temp.length - 1]);
    temp.push(primes[q + 1]);
    return [primes[q+1], temp, top, primes];
  }
    
  else {
    while (true) {
      if (primes.every(e =>  (top / e != Math.floor(top / e))))  {
        primes.push(top);
        if (top > newtop) {  // Nesting assures that the new top is prime.
          return [top, primes, top, primes];
        }
      };
      top += 2;
      console.log('In primes_state. top is >>>>> ', top ); 
    }
  }
};

var primesMonad = new MonadState('primesMonad', [3, [], 3, [2,3]], primes_state);

function fact(v) {
  var ar = [];
  console.log('Entering fact. v2 and v[1] are:', v2, v[1] );
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

function fact2(a,b) {
  console.log('In fact2 a an b are', a, b );
  var ar = [];
  var n = b;
  while (n != 1) {
    a.map(p => {
      if (n/p === Math.floor(n/p)) {
        console.log('In fact2. ar is', ar );
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
 
function lcm (cx,dx) {
  console.log('************In lcm cx, dx ', cx, dx );
  var ar= [];
  var r;
  var c = cx.slice();
  var d = dx.slice();
  d.map(v => {
    console.log('Hello from lcm, most excellent friend of mine.');
    if (c.some(x => x === v)) {
      ar.push(v)
      c.splice(c.indexOf(v),1)
      d.splice(d.indexOf(v),1)
    }
      r = ar.concat(d).concat(c).reduce(function (a,b) {return a*b})
      console.log('Bottom of map in lcm ar, d, c, r', ar, d, c, r );
    }
  )
  return r
}
