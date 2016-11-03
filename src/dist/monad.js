'use strict';
var todoData, mMt3VAL; 
var taskL = [];
var MESSAGES = [];
var res = [];
var todoDiv = 'none';
var gameDiv = 'none';
var chatDiv = 'none';
var captionDiv = 'none';
function tst (x) {return x};

function Snownad (z, ID = 'default') {
    var x = z;
    var ob = {
    id: ID,
    bnd: function (func, ...args) {
      return func(x, ...args)
    },
    ret: function (a) {
      return window[ob.id] = new Monad(a, ob.id);
    }
  };
  return ob;
}

// string.replace(RegExp('['+chars+']','g'), 


function stripchars(string, chars) {
  return string.replace(RegExp('['+chars+']','g'), '');
}

function testPrefix (x,y) {
  var t = y;
  var s;
  if (Array.isArray(x)) {
    x.some(v => {
      if (typeof v == 'string' && v.charAt() == 'M') {
         t = v.slice(1, v.length);
      }
    })
  }
  return t;
}

var jack = ['7554','abcdefghi', 'car', 'Mm3']
var c = testPrefix(jack)
console.log(c)

var Monad = function Monad(z = 42, g = 'generic') {
  var _this = this_;
  this.x = z;
  this.id = g;
  this.bnd = function (func, ...args) {
    var m = func(_this.x, ...args)
    var mon;
    if (m instanceof Monad) {
      mon = testPrefix(args,_this.id); 
      return window[mon] = new Monad(m.x, mon);
    }
    else return m;
  };
  this.ret = function (a) {
    return window[_this.id] = new Monad(a,_this.id);
  };
};


function Monad2 (z, ID = 'default') {
    var x = z;
    var ob = {
    id: ID,
    bnd: function (func, ...args) {
      return window[func](x, ...args)
    },
    ret: function (a) {
      return window[ob.id] = new Monad2(a, ob.id);
    }
  };
  return ob;
}

function get (m) {
  let v = m.bnd(x => x);
  return v;
}  

function get2 (m) {
  let v = m.bnd('x => x');  
  return v;
}  
var mMob = new Monad (0, 'mMob')
var pMname = new Monad('1v65n$%pqw3*@#9', 'pMname');
var pMgroup = new Monad('solo', 'pMgroup');
var pMscore = new Monad(0, 'pMscore');
var pMgoals = new Monad(0, 'pMgoals');
var pMnums = new Monad([8,8,8,8], 'pMnums');
var pMindex = new Monad(0, 'pMindex');
var pMdata = new Monad([], 'pMdata');
var pMelms = new Monad( [0,0,0,0], 'pMelms' );
var pMstyle = new Monad( ['inline','inline','inline','inline'], 'pMstyle' );
var pMdisplay = new Monad([], 'pMdisplay');

var mMnums = new Monad([0,0,0,0], 'mMnums');
var mMnumEls = new Monad([], 'mMnumEls');
var mMstyle = new Monad(['inline', 'inline', 'inline', 'inline'], 'mMstyle')

function setStyle (ar) {
  var style = [];
  for(let i of [1,2,3,4]) {
    Array.isArray(ar[i]) 
      style[i] = 'inline' 
      style[i] = 'none';
  }; 
  return ret(style);
};
 
function test2 (ar1, ar2) {
  var a = ar1.slice();
  var b = ar2.slice();
  for (let i of [0,1,2,3]) {
    a[i] = (b[i] == undefined) ? 'none' : 'inline'
  }
  return a;;
}

function test3 (a) {
  var b = [];
  for (let i of [0,1,2,3]) {
    b[i] = (a[i] == undefined) ? 'none' : 'inline'
  }
  return ret(b);
}

var a = 3;
var b = 4;
var c = a + b;

function ret(v, id = 'generic') {
  window[id] = new Monad(v, id);
  return window[id];
}

var equals = function equals (mon1, mon2) {
  if (mon1.id === mon2.id && get(mon1) === get(mon2)) return true;
  else return false
}

var mMtemp5 = new Monad(0, 'mMtemp5') 

  function add (x, b) {
      return ret(parseInt(x,10) + parseInt(b,10) );
  };

  function add3 (x, str) {
      return ret(x + str);
  };

  function cube (v) {
      return ret(v * v * v);
  };

var aD = function (x, b, id = 'mQfred') {
  return window[id] = new MonadMaybe (parseInt(x,10) + parseInt(b,10), id);
};

var cuB = function (v, id = 'default') {
  return window[id] = new MonadMaybe (v * v * v, id);
};

var m = new Monad(3, 'm');

function fmap(x, g, id) { 
  var mon = new Monad(g(x), id); 
  window[id] = mon;
  return mon;
}

var isFunc = function isFunc (x) { return eval("typeof(" + x + ") == 'function'")};

 function newR (ar) {
    mMnums.ret(ar[0]);
    mM3.ret([]);
    mM8.ret(0);   
    rollMonad.run(ar[0],ar[1],ar[2]);
    return ret(ar);
  };

var MonadSet = function MonadSet(set, str) {
  var ob = {
    ID: str,
    s: set,  
    bnd: (func, ...args) => func(ob.s, ...args),
    add: a => MonadSet(s.add(a), ob.id),
    delete: a => MonadSet(s.delete(a), ob.id),
    clear: () => MonadSet(s.clear(), ob.id)
  };
  return ob;
};

var s = new Set();

var sMplayers = MonadSet(s, 'sMplayers'); // holds currently online players

function JonadState(g, state, p) {
  var ob = {
    id: g,
    s: state,
    a: s[3],
    process: p,
    bnd: (func, ...args) => func(ob.s, ...args),  
    run: function (ar) {
      var ar2 = ob.process(ar);
      ob.s = ar2;
      ob.a = ar2[3];
      window[ob.id] = ob;
      return window[ob.id];
    }
  };
  return ob;
};

function MonadState(g, state, p) {
  var _this = this;
  this.id = g;
  this.s = state;
  this.process = p;
  this.a = s[3];
  this.bnd = (func, ...args) => func(_this.s, ...args);  
  this.run = ar => { 
    var ar2 = _this.process(ar);
    _this.s = ar2;
    _this.a = ar2[3];
    window[_this.id] = _this;
    return window[_this.id];
  }
};

var travMonad = new MonadState("travMonad", [[8,8,8,8], 0, 0, [ [ [], 0, 0 ] ] ], trav_state)


function trav_state (ar) {
  pMindex.bnd(add,1).bnd(pMindex.ret);
  pMnums.ret(ar[0]);
  pMscore.ret(ar[1]);
  pMgoals.ret(ar[2]);
  var next = travMonad.s.slice();
  var ar = [ ar[0], ar[1], ar[2] ];
  next[0] = ar[0];
  next[1] = ar[1];
  next[2] = ar[2];
  next[3].splice( pMindex.x, 0, ar );
  return next;
}

console.log('s in travMonad ', travMonad.run([ [0,0,0,0], 0, 0 ]).s);

function evalF(x) {
  var v;
  if (typeof x == "string") {v = eval("typeof x")}  
  else if (isNaN(x)) v = "NaN";
  else v = typeof x;
  console.log('In evalF. ', x, ' is ', v );
  return v;
}

function testPrefix (x,y) {
  var t = y;
  var s;
  if (Array.isArray(x)) {
    x.some(v => {
      if (typeof v == 'string' && v.charAt() == 'M') {
         t = v.slice(1, v.length);
      }
    })
  }
  return t;
}

function MonadE (val, ID, er = []) {
    var _this = this;
    this.x = val;
    this.e = er;
    this.id = ID;
    this.getx = function getx (x) {return _this.x};
    this.bnd = function (f, ...args) {
      if (f == 'clean') {
        ret2(_this.x, _this.id, []);
        return new MonadE(_this.x, _this.id, [])
      }
      if (_this.e.length > 0) {
        console.log('BYPASSING COMPUTATION in MonadE instance', _this.id, f, '.  PROPAGATING ERROR:',  _this.e[0]); 
        return _this;  
      }
      if (f == 'log2') {
        console.log(args[1])
        return new MonadE ( args[0], args[2], [] )
      }
      var a = ("typeof " + f);
      if (eval(a) == 'function') {
        var m = eval(f)(_this.x, ...args)

        if (m instanceof Monad) {
          let mon = testPrefix(args,_this.id); 
          return window[mon] = new Monad(m.x, mon);
        }
      for (let v of args) {
          let b = "typeof " + v
          if (eval(b) == 'undefined' &&  b.charAt() != 'M') {
            console.log(v, "is undefined. No further computations will be attempted");
            _this.e.push(v + " is undefined." );
            return _this;
          }
          if (eval(b) == 'NaN') {
            console.log(v, "is NaN. No further computations will be attempted");
            _this.e.push(v + " is NaN." );
            return _this;
          }
        }
        else return m;
      }
      else {
        _this.e.push(f + ' is not a function. ');
        console.log(f, 'is not a function. No further computations will be attempted');
        return ob;
      }
    };
    this.ret = function (a) {
      window[_this.id] = new MonadE(a, _this.id, []);
      return window[_this.id];
    }  
  };

  function add2 (x, y, str ) {
    window[str] = new MonadE(x+y, str, []);
    return window[str];
  }
  
  function square2 (x, str) {
    window[str] = new MonadE(x*x, str, []);
    return window[str];
  };
  
  function mult2 (x,y,str) {
    window[str] = new MonadE(x*y, str, []);
    return window[str];
  };
  
  function sqroot2 (x,str) {
    window[str] = new MonadE(Math.sqrt(x), str, []);
    return window[str];
  }

  function log2(x, message, str) {
    window[str] = new MonadE(x, str, []);
    console.log(message);
    return window[str];
  };

  function ret2(v, id = 'ret2') {
    window[id] = new MonadE(v, id, []);
    return window[id];
  }

function cube2 (x) {
  return ret2(x*x*x);
};

function push2(x, v) {
    var ar = x.slice();
    ar.push(v);
    return ret2(ar);
};

function unshift(x, y) {
  var ar = x.slice();
  ar.unshift(y);  
  return ret2(ar)
}  
  
function splice2(x, start, how_many) {
    var ar = x.slice();
    ar.splice(start, how_many)
    return ret2(ar);
};

function sliceM(x, howmany) {
    var ar = x.slice(howmany);
    return ret2(ar);
};

var mMEa = new MonadE(0, 'mMEa');

console.log('A MonadE instance running first without and nex with a reference error: ');
  ret2(0,'a')
  .bnd('add2',3, 'a')
  .bnd('mult2',100,'a')
    .bnd('square2','c')
    .bnd('ret2','c')
    .bnd('add2',-c.getx() + 4,'b')
    .bnd('ret2','b')
    .bnd('mult2',100,'b')
    .bnd('ret2','e')
    .bnd('square2','e')
    .bnd('add2',c.getx(),'e')
    .bnd('sqroot2','e')
  console.log('The square root of the sum of ' + a.getx() + 
    ' squared and ' + b.getx() + ' squared is ' + e.getx());


  ret2(0,'a')
  .bnd('add22',3, 'a')
  .bnd('mult2',100,'a')
    .bnd('square2','c')
    .bnd('ret2','c')
    .bnd('add2',-c.getx() + 4,'b')
    .bnd('ret2','b')
    .bnd('mult2',100,'b')
    .bnd('ret2','e')
    .bnd('square2','e')
    .bnd('add2',c.getx(),'e')
    .bnd('sqroot2','e')


var fpTransformer = function transformer(s, m) {
  var bound = Math.ceil(Math.sqrt(s[3][s[3].length - 1]));
  if (bound > m.a[m.a.length - 1]) {
      m.run([m.s[0], "from the fibKeyPress5$ handler", bound, primesMonad.a]);
  }
  return m;
};

var tr3 = function tr3(fibsArray, primesArray) {
  var bound = Math.ceil(Math.sqrt(fibsArray[fibsArray.length - 1]));
  var primes = primesArray.slice();
  if (primesArray.slice(-1)[0] >= bound) {
      primes = primesArray.filter(function (v) { return v <= bound; });
  }
  var ar = [];
  var fibs = fibsArray.slice(3);
  fibs.map(function (v) {
      if (primesArray.every(function (p) { return (v % p || v == p); }))
          ar.push(v);
  });
  console.log([fibsArray, primes, ar]);
  return [fibsArray.join(', '), primes.join(', '), ar.join(', ')];
};

var fibs_state = function fibs_state(ar) {
  var a = ar.slice();
  while (a[3].length < a[2]) {
      a = [a[1], a[0] + a[1], a[2], a[3].concat(a[0])];
  }
  return a;
};

var mMroll = new Monad([0,0,0,0], 'rollMonad');

var mMplayer = new Monad([0,0,0,0], 'mMplayer');

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
          console.log(v[2], v[1].slice());
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

console.log('VVVVVVVVVVVVVVVVVVVVVVVVVVVV  get(pMscore) and typeof get(pMscore) ', get(pMscore), typeof get(pMscore) );
console.log('VVVVVVVVVVVVVVVVVVVVVVVVVVVV get(pMgoals) and typeof get(pMgoals) ', get(pMgoals), typeof get(pMgoals) );
};

checkpM();

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

function message_state(v) {
  var ar = v[0].concat(v[3]);
  return [ v[0], [], [], ar ];
};

var mMsetArchive = new Monad([], 'mMsetArchive');
mMsetArchive.ret([]);

function clean(x, mon) {
  if (mon === void 0) { mon = mMtemp; }
  mon.ret([]);
};

var runFib = function runFib(x) {
  if (fibsMonad.a.length >= x) {
      var ar = fibsMonad.a.slice();
      ar.length = x;
      return ar;
  }
  fibsMonad.run([fibsMonad.s[0], fibsMonad.s[1], x, fibsMonad.a]);
  return fibsMonad.a;
};
var primesMonad = new MonadState('primesMonad', [3, '', 3, [2,3]], primes_state);
primesMonad.run([3, '', 12, [2, 3]]);
console.log('UUUUUUUUUU primesMonad initiated - - - primesMonad.a, primesMonad.s ', primesMonad.a, primesMonad.s );
function pFib(fibs, primes) {
  console.log('Hello from pFib fibs, primes: ', fibs, primes);
  var ar = [];
  fibs.map(function (f) {
      if (f < 2)
          return;
      if (primes.every(function (p) { return (f % p != 0 || f == p); }))
          ar.push(f);
  });
  return ar;
};

var CURRENT_ROLL = [];
var emitevent;
var data$;

var MonadItter = function MonadItter() {
var _this = this;
this.p = function () {};
this.release = function () {
  return _this.p.apply(_this, arguments);
};
this.bnd = function (func) {
  return _this.p = func;
};
};
function rang(n, m) {
  return Array.from(new Array(m - n), function (x, i) { return i + n; });
}


function ad (a, b) { return parseInt(a,10) + parseInt(b,10); };

function cu (a) { return a * a * a; };

function primes(n, ar) {
  var array = ar.slice();
  for (var i = array.slice(-1).pop(); i <= n; i += 2) {
      if (array.every(function (elem) { return i % elem; }))
          array.push(i);
  }
  ;
  return array.join(", ");
}

  var testscore = function testscore(v) {
    if ((v % 5) === 0) return ret(v+5)
    else return ret(v);
  };

  var tscore = function tcore(v) {
    if ((v % 5) === 0) return ret(v+5)
    else return ret(v);
  };

  var expand = function expand(a, b) { return a + ', ' + b; };

  var p = function p(x) {
    if (x >= 0) {
        return ' + ' + x;
    }
    if (x < 0) {
        return '  ' + Math.abs(x);
    }
  };

  var addar = function (a, b) {
    return ret(a.map(function (v) { return v * 1 + b * 1; }), 'sally');
  };

  var M = function M(a, b) {
    var mon = new Monad(a, b);
    return mon;
  };

  var MI = function MI() {
    return new MonadItter();
  };

  var count = 0;
  var mM1 = M([], 'mM1');
  var mMbound = M(0, 'mMbound');
  var mM2 = M(0, 'mM2');
  var mM3 = M([], 'mM3');
  var mM4 = M([], 'mM4');
  var mM5 = M(0, 'mM5');
  var mM6 = M('', 'mM6');
  var mM7 = M(0, 'mM7');
  var mM8 = M(0, 'mM8');
  var mM9 = M(0, 'mM9');
  var mM11 = M([], 'mM11');
  var mM12 = M(0, 'mM12');
  var mM13 = M(0, 'mM13');
  var mM14 = M(0, 'mM14');
  var mM15 = M(0, 'mM15');
  var mM16 = M(0, 'mM16');
  var mM17 = M(0, 'mM17');
  var mM18 = M(0, 'mM18');
  var mM19 = M('waiting', 'mM19');
  var mM20 = M(0, 'mM20');
  var mM21 = M('Yes', 'mM21');
  var mM22 = M(0, 'mM22');
  var mM23 = M([0, 1, 1], 'mM23');
  var mM24 = M([[2, 3], 4, 9], 'mM24');
  var mM25 = M(0, 'mM25');
  var mM26 = M(0, 'mM26');
  var mM27 = M(0, 'mM27');
  var mM28 = M([], 'mM28');
  var mM29 = M([], 'mM29');
  var mMscbd = M([], 'mMscbd');
  var mMmessages = M([], 'mMmessages');
  var mMscoreboard = M([], 'mMscoreboard');
  var mMmsg = M([], 'mMmsg');
  var mMgoals2 = M('', 'mMgoals2');
  var mMname = M('', 'mMname');
  var mMar = M([1, 2, 3, 4, 5], 'mMar');
  var mMar2 = M([], 'mMar2');
  var mMscores = M('', 'mMscores');
  var mMprefix = M('', 'mMprefix');
  var mMfib = M([0, 1], 'mMfib');
  var mMfib2 = M([0, 1], 'mMfib2');
  var mMmain = M(null, 'mMmain');
  var mMcalc = M(null, 'mMcalc');
  var mMadd = new Monad(0, 'mMadd');
  var mMunit = new Monad(0, 'mMunit');
  var mMprod = new Monad(0, 'mMprod');
  var mMmult = new Monad({}, 'mMmult');
  var mMmult2 = new Monad({}, 'mMmult2');
  var mMpause = new Monad(0, 'mMpause');
  var mMpause2 = new Monad(0, 'mMpause2');
  var mMtem = new Monad(0, 'mMtem');
  var mMtem2 = new Monad(0, 'mMtem2');
  var mMt = new Monad(0, 'mMt');
  var mMtest = new Monad(0, 'mMtest');
  var mMhistory = new Monad(0, 'mMhistory');
  var mMcursor = new Monad(0, 'mMcursor');
  var mMgroup = new Monad('solo', 'mMgroup');
  var mMgoals = new Monad(0, 'mMgoals');
  var mMname = new Monad('', 'mMname');
  var mMob = new Monad({}, 'mMob');
  var mMsender = new Monad('nobody', 'mMsender');
  var mMextra = new Monad('nothing', 'mMextra');
  var mMextra2 = new Monad('nothing', 'mMextra2');
  var mMsave = new Monad({ x: 'start' }, 'mMsave');
  var mMindex = new Monad(0, 'mMindex');
  var mMindex3 = new Monad(0, 'mMindex3');
  var mMhistory = new Monad([], 'mMhistory');
  var mMhistorymM1 = new Monad([0, 0, 0, 0], 'mMhistorymM1');
  var mMhistorymM3 = new Monad([], 'mMhistorymM3');
  var mMhistorymMtask = new Monad([], 'mMhistorymMtask');
  var mMtemp = new Monad('temp', 'mMtemp');
  var mMtemp2 = new Monad('temp2', 'mMtemp2');
  var mMtemp3 = new Monad('temp3', 'mMtemp3');
  var mMtemp4 = new Monad('temp4', 'mMtemp4');
  var mMtemp5 = new Monad('temp5', 'mMtemp5');
  var mMte = new Monad(0, 'mMte');
  var mMid = new Monad('cow', 'mMid');
  var mMhelper = new Monad('helper', 'mMhelper');
  var mMtasks = new Monad([], 'mMtasks');
  var mMid = new Monad(42, 'mMid');
  var mMalert = new Monad('', 'mMalert');
  var fibmon = new Monad([0, 1]);
  var mMmax = new Monad(0, 'mMmax');
  var mMfibSave = new Monad(0, 'mMfibSave');
  var mMfibSave2 = new Monad(0, 'mMfibSave2');
  var mMscoreChange = new Monad(0, 'mMscoreChange');
  var mMcurrentRoll = new Monad([0, 0, 0, 0], 'mMcurrentRoll');
  var mMfibs8 = M([0, 1], 'mMfibs8');
  var mMallRolls = new Monad([[0, 0, 0, 0]], 'mMallRolls');
  var mMcurrentList = new Monad([], 'mMcurrentList');
  var mMtaskList = new Monad([], 'mMtaskList');
  var mMtaskL = new Monad([], 'mMtaskL');
  var mMsenderList = new Monad([], 'mMsenderList');
  var mMsoloAlert = new Monad('', 'mMsoloAlert');
  var mMe = new Monad('', 'mMe');
  var mMgoals = M(0, 'mMgoals');
  var mMt1 = new Monad(0, 'mMt1');
  var mMt2 = new Monad(0, 'mMt2');
  var mMt3 = new Monad('', 'mMt3');
  var mMa = new Monad('waiting', 'mMa');
  var mMx = new Monad([], 'mMx');
  var mMy = new Monad('waiting', 'mMy');
  var mMb = new Monad('waiting', 'mMb');
  var mMc = new Monad('waiting', 'mMc');
  var mMquad1 = new Monad('', 'mMquad1');
  var mMquad2 = new Monad('', 'mMquad2');
  var mMquad3 = new Monad('', 'mMquad3');
  var m = new Monad(42, 'm');
  var m1 = new Monad(1, 'm1');
  var m2 = new Monad(2, 'm2');
  var m3 = new Monad(3, 'm3');
  var m4 = new Monad(4, 'm4');
  var m5 = new Monad(5, 'm5');
  var m6 = new Monad(6, 'm6');
  var m7 = new Monad(7, 'm7');
  var m8 = new Monad(8, 'm8');
  var m9 = new Monad(9, 'm9');
  var m10 = new Monad(10, 'm10');
  var m11 = new Monad(11, 'm11');
  var mMprime = new Monad([2], 'mMprime');
  var mMprime2 = new Monad([2], 'mMprime2');
  var mMprimes = new Monad([2], 'mMprimes');
  var mMspreadsheet = new Monad([0, 0, 0, 0], 'mMspreadsheet');
  var mMspreadsheet2 = new Monad([0, 0, 0, 0], 'mMspreadsheet2');
  var mMdummy = new Monad(0, 'mMdummy');
  var mMpf = new Monad(0, 'mMpf');
  var mMpFib = new Monad([], 'mMpFib');
  var RESULT = [0, 0, 0, 0];
  var mMdisplayFibs = new Monad([0, 1], 'mMdisplayFibs');
  var mMmembers = ret([], 'mMmembers');
  var mMcount = new Monad(0, 'mMcount');
  var mMcount2 = new Monad(0, 'mMcount2');
  var mMcount3 = new Monad(0, 'mMcount3');
  var mMcount4 = new Monad(0, 'mMcount4');
  var updateGameFunc = new Monad('start', 'updateGameFunc');
  var cleanup2Func = new Monad('start', 'cleanup2Func');
  var mMres = new Monad(['','',''], 'mMres');
  var mMquad4 = new Monad('', 'mMquad4');
  var mMquad5 = new Monad('', 'mMquad5');
  var mMquad6 = new Monad('', 'mMquad6');
  var mMfactors3 = new Monad('', 'mMfactors3');
  var mMfactors4 = new Monad('', 'mMfactors4');



  var mMZ1 = MI();
  var mMZ2 = MI();
  var mMZ3 = MI();
  var mMZ4 = MI();
  var mMZ5 = MI();
  var mMZ6 = MI();
  var mMZ7 = MI();
  var mMZ8 = MI();
  var mMZ9 = MI();
  var mMZ10 = MI();
  var mMZ11 = MI();
  var mMZ12 = MI();
  var mMZ13 = MI();
  var mMZ14 = MI();
  var mMZ15 = MI();
  var mMZ16 = MI();
  var mMZ17 = MI();
  var mMZ18 = MI();
  var mMZ19 = MI();
  var mMZ20 = MI();
  var mMZ21 = MI();
  var mMZ22 = MI();
  var mMZ23 = MI();
  var mMZ24 = MI();
  var mMZ25 = MI();
  var mMZ26 = MI();
  var mMZ27 = MI();
  var mMZ28 = MI();
  var mMZ29 = MI();
  var mMitterPrime = MI();
  var mMitterPrime4 = MI();
  var mMitterPrime5 = MI();
  var mMitterFib = MI();
  var mMitterFib2 = MI();
  var mMitterFib3 = MI();
  var mMitterFib4 = MI();
  var mMitterfib5 = MI();
  var mMitterFib6 = MI();
  var mMitterFib7 = MI();
  var mMitterFib8 = MI();
  var mMitterFib9 = MI();
  var mMitterPrimeFibs = MI();
  var mMitterPF = MI();
  var mMitterPF2 = MI();
  var style = ['inline', 'inline', 'inline', 'inline'];
  var nums = [0,0,0,0];  
var mMdice = new Monad('none','mMdice');
var mMrightPanel = new Monad('none','mMrightPanel');
var mMgameDiv2 = new Monad('none','mMgameDiv2');
var mMgameDiv = new Monad('block','mMgameDiv');
var mMlogin = new Monad('inline','mMlogin');
var mMlog1 = new Monad('inline','mMlog1');
var mMlog2 = new Monad('none','mMlog2');
var mMtodoDiv = new Monad('block','mMtodoDiv');
var mMchatDiv = new Monad('block','mMchatDiv');
var mMcaptionDiv = new Monad('block','mMcaptionDiv');
var mMtodoDiv = new Monad('block','mMtodoDiv');
var mMtodo = new Monad('inline','mMtodo');
var mMchat = new Monad('inline','mMchatDiv');
var mMcaption = new Monad('inline','mMcaptionDiv');
var mMtodo = new Monad('inline','mMtodoDiv');
var mMgame = new Monad('none','mMgameDiv');

  function numProtect (x) {return (new Number (x))*1; }; 

  var qS1 = function qS1(a, b, c) {
      var n = (b * (-1)) + (Math.sqrt(b * b - 4 * a * c));
      if (n != n) {
          return 0;
      }
      return n / (2 * a);
  };
  var qS2 = function qS2(a, b, c) {
      var n = (b * (-1)) - (Math.sqrt(b * b - 4 * a * c));
      if (n != n) {
          return 0;
      }
      return n / (2 * a);
  };
  var qS3 = function qS3(a, b, c) {
      return [qS1(a, b, c), qS2(a, b, c)];
  };
      var qS4 = function qS4 ([x,y,z]) {
        let [a,b,c] = [numProtect(x),numProtect(y),numProtect(z)]
        return [qS1(a,b,c), qS2(a,b,c)]    
      }  
      
  var qS4 = function qS4(_a) {
      var x = _a[0], y = _a[1], z = _a[2];
      var _b = [x, y, z], a = _b[0], b = _b[1], c = _b[2];
      return qS3(a, b, c);
  };
  var trim = function trim(str) {
      return ret(str.trim(), 'fred');
  };
  var convertBack = function convertBack(str) {
      var ar = str.split('$*$*$');
      var s = str;
      if (ar.length > 1) {
          s = ar.reduce(function (a, b) { return a + ', ' + b; });
      }
      return s;
  };

  var split = function split(x, mon) {
      return mon.ret(x.split(','));
  };
  var stringify = function stringify(ob) {
      var str = ob.task + ',' + ob.color + ',' + ob.textdecoration + ',' + ob.checked.tostring() +
          ',' + ob.author + ',' + ob.responsible;
      return str;
  };
  var addString = function addString(x, str, mon) {
      if (mon === void 0) { mon = mMtemp5; }
      var s = str;
      if (x.length > 4) {
          s = x + ',' + str;
      }
      return mon.ret(s);
  };
  var intersection = function (a, b, mon) {
      if (mon === void 0) { mon = mMtemp5; }
      var ar3 = [];
      for (var _i = 0, a_1 = a; _i < a_1.length; _i++) {
          var x = a_1[_i];
          for (var _a = 0, b_1 = b; _a < b_1.length; _a++) {
              var y = b_1[_a];
              if (x == y) {
                  ar3.push(x);
              }
          }
      }
      return mon.ret(ar3);
  };

  var calc = function calc(a, op, b) {
      console.log('CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC   in calc  a,op,b', a, op, b );
      var result;
      switch (op) {
          case "add":
              result = parseInt(a, 10) + parseInt(b, 10);
              break;
          case "subtract":
              result = parseInt(a, 10) - parseInt(b, 10);
              break;
          
          case "mult":
              result = parseInt(a, 10) * parseInt(b, 10);
              break;
          case "div":
              result = parseInt(a, 10) / parseInt(b, 10);
              break;
          case "concat":
              result = (a + b);
              break;
          default: 'major malfunction in calc.';
      }
      return result;
  };

  function noComma (s) {
    s.trim();
    while (s.trim()[0] == ",") { 
      s.trim();
      s = s.slice(1);
    }
    return s;
  }
  
  var equals2 = function equals(x, mon1, mon2) {
      if (mon1.id === mon2.id && get(mon1) === get(mon2)) {
          ret.ret('true');
      }
      else
          mon3.ret('false');
      return ret(x, 'Mtemp3');
  };
  var pause = function (x, t, mon2) {
      var time = t * 1000;
      setTimeout(function () {
          mon2.release();
      }, time);
      return mon2;
  };
  var wait = function wait(x, y, mon) {
      if (mon === void 0) { mon = mMtemp5; }
      if (x === y) {
          mon.release();
      }
      return mon;
  };

  var toFloat = function toFloat(x) {
      return ret(parseFloat(x));
  };

  var par = function par(x) {
      var ar = x.slice();
      ar.splice(0,3)
      return ret(ar)
  }
    
  function sqroot (x) {
    return ret(Math.sqrt(x));
  }

  var push = function push(x, v) {
      var ar = x.slice();
      ar.push(v);
      return ret(ar, 'pushFunc');
  };

  var spliceRemove = function spliceRemove(x, index) {
      var ar = x.slice();
      ar.splice(index, 1)
      return ret(ar);
  };

  var unshift = function unshift(x, y) {
      var ar = x.slice();
      ar.unshift(y);
      return ret(ar);
  };

  var spliceRemove2 = function spliceRemove(x, index) {
      var ar = x.slice();
      ar.splice(index, 1)
      return ret2(ar);
  };
  var clone = function clone(x) {
    var array = x.slice()
    return ret(array, 'cloneFunc')
  }

  var spliceAdd = function spliceAdd(x, index, array) {
      var ar = x.slice();
      ar.splice(index, 0, array);
      return ret(ar);
  };

  var spliceM = function spliceM(x, start, how_many) {
    console.log('In spliceM. x, start, how_many ', x, start, how_many );
      var ar = x.slice();
      ar.splice(start, how_many)
      return ret(ar);
  };

  var sliceM = function sliceM(x, howmany) {
      var ar = x.slice(howmany);
      return ret(ar);
  };

  var concat = function concat(x, v) {    // Polymorphic. Works with arrays, strings, and numbers.
      var ar = x.slice();
      var ar2 = ar.concat(v);
      return ret(ar2);
  };
  var sliceFront = function sliceFront(x, n) {
      var ar = x.slice(n);
      return ret(ar);
  };
  var filter = function filter(x, condition) {
      var ar = x.slice();
      return ret(ar.filter(function (v) { return condition; }));
  };
  var map = function map(x, f) {
          var ar = [];
          var keys = Object.keys(x);
          for (let k in x) { ar[k] = f(x[k]) };
      return ret(ar);
  };
  var intersperse = function intersperse(x) {
      console.log('In intersperse (.)(.)(.)(.)(.)(.)(.)(.)(.) x is ', x);
      var ar = x.reduce(function (a, b) { return (a + ', ' + b); });
      return ret(ar);
  };
  var addTest = function addTest(x) {
      if (x % 5 == 0)
          return ret(x + 5);
      else
          return ret(x);
  };

  var addTest2 = function addTest2(x) {
      if (x % 5 == 0)
          return ret2(x + 5);
      else
          return ret2(x);
  };

  var double = function double(v, mon) {
      return ret(v + v);
  };
  var square = function square(v) {
      return ret(v * v);
  };

  function mult(x, y) {
    return ret(x * y);
    }

function log3(x, message) {
    console.log(message.join(', '));
    return ret(x);
};

function log(x,y) {
    console.log(y)
    return ret(x);
};

function logX(x,y) {
    console.log(x)
    return ret(x);
};

function acc (x, y, str) {
  return window[str] = new MonadAcc(x + y, str);
}

var lg = function lg(x) {
    console.log(x);
    return ret(x);
};
var getIndex = function getIndex(event_object) {
    var task = event_object.currentTarget.parentNode.innerText;
    var possibilities = event_object.currentTarget.parentNode.parentNode.childNodes;
    var keys = Object.keys(possibilities);
    for (var k in keys) {
        if (task == possibilities[k].innerText) {
            return k;
        }
    }
    console.log('In getIndex. No match');
};
var getIndex2 = function getIndex2(e) {
    var elem = e.currentTarget.parentNode.children[0].innerHTML;
    var elem2 = e.currentTarget.parentNode.parentNode.childNodes;
    var keys = Object.keys(elem2);
    for (var k in keys) {
        if (elem == elem2[k].childNodes[0].innerHTML) {
            return k;
        }
        console.log('In getIndex2. No match');
    }
};
var tempstyle = { display: 'inline' };
var tempstyle2 = { display: 'none' };
var timeout = function timeout(x, t, m, args) {
    setTimeout(function () {
        m.bnd.apply(m, args);
    }, t * 1000);
    return m;
};
var timeout2 = function timeout(x, t, m, args) {
    setTimeout(function () {
        mMZ9.release();
    }, t * 1000);
    return mMZ9.bnd(function () { return m.bnd.apply(m, args); });
};

var mMdisplay = new Monad('display', 'mMdisplay');

function refresh () {
    setTimeout(function () {
    document.location.reload(false);
    }, 4000);
};

var MonadAcc = function MonadAcc(z = 0, g = 'generic') {
  var _this = this;
  this.x = z;
  this.id = g;
  this.bnd = function(func, ...args) {
    return func(_this.x, ...args);
  }
  this.reset = function () {
    return window[_this.id] = new MonadAcc('', _this.id);
  };
  this.ret = function (a) {
    var str = _this.x + a;
    return window[_this.id] = new MonadAcc(str, _this.id);
  };
};

var acc1 = new MonadAcc('', 'acc1');

console.log('Test of MonadAcc, a logging monad:\n ',
acc1.reset().ret('The square root of the sum of ')
.bnd(() => m.ret(3).bnd(mult,100)
.bnd(acc1.ret)).ret(' squared and ')
.bnd(() => m2.ret(0).bnd(add,4).bnd(mult,100)
.bnd(acc1.ret))
.ret(' squared is ').bnd(() => m3.ret(m.x * m.x + m2.x * m2.x).bnd(sqroot).bnd(acc1.ret)).x);

function acc (x, y, str) {
  return window[str] = new MonadAcc(x + y, str);0
}

var mMob10 = new Monad ({}, 'mMob10');
var mMob11 = new Monad ([], 'mMob11');
var mMar10 = new Monad ([], 'mMar10');
var mMar11 = new Monad ([], 'mMar11');
var mMar12 = new Monad ([], 'mMar12');
var ob10;
var ob11;
var ob12;
m.ret(4), m1.ret(1), m2.ret(2), m3.ret(3),
  m4.ret(4), m5.ret(5), m6.ret(6), m7.ret(7), m8.ret(8);

m.bnd(m1.ret).bnd(cube)       // m1.x == 4
.bnd(m2.ret).bnd(add,-m2.x)  // m2.x == 64
.bnd(m3.ret).bnd(add,3)      // m3.x == 0
.bnd(m4.ret).bnd(cube)       // m4.x == 3
.bnd(m5.ret).bnd(add,-m5.x)  // m5.x == 27
.bnd(m6.ret).bnd(add,10)     // m6.x == 0
.bnd(m7.ret).bnd(cube)       // m7.x == 10 
.bnd(m8.ret).bnd(() => {     // m8.x == 1000
mMar10.ret([m, m1, m2, m3, m4, m5, m6, m7, m8]); });

function test10 () {
  m.ret(4).bnd(mult,100,'Mm1')
  .bnd(square,'Mm2')
  .bnd(add,-m2.x + 3,'Mm3')
  .bnd(mult,100,'Mm4')
  .bnd(square,'Mm5')
  .bnd(add,m2.x,'Mm6') 
  .bnd(sqroot,'Mm7')
  .bnd(() => { 
    mMar10.ret([m, m1, m2, m3, m4, m5, m6, m7]);
    console.log('The square root of the sum of ', m1.x,
      ' squared and ', m4.x, ' squared is ', m7.x); });
  return mMar10;
}  

function test11 () {
  m.ret(4).bnd(mult,100,'Mm1')
  .bnd(square,'Mm2')
  .bnd(add,-m2.x + 3,'Mm3')
  .bnd(mult,100,'Mm4')
  .bnd(square,'Mm5')
  .bnd(add,m2.x,'Mm6') 
  .bnd(sqroot,'Mm7').bnd(m.ret)
  .bnd(() => { 
    mMar11.ret([m, m1, m2, m3, m4, m5, m6, m7]);
    console.log('The square root of the sum of ', m1.x,
      ' squared and ', m4.x, ' squared is ', m7.x); });
  return mMar11;
}  

console.log('.');
console.log('.');
console.log('test10 ', test10());
console.log('m.x, m1.x, m2.x, m3.x, m4.x, m5.x, m6.x, m7.x');
console.log(m.x, m1.x, m2.x, m3.x, m4.x, m5.x, m6.x, m7.x);
console.log( `m.ret(4), m1.ret(1), m2.ret(2), m3.ret(3),0
  m4.ret(4), m5.ret(5), m6.ret(6)` );
m.ret(4), m1.ret(1), m2.ret(2), m3.ret(3), m4.ret(4),
  m5.ret(5), m6.ret(6), m7.ret(7);
console.log('m.x, m1.x, m2.x, m3.x, m4.x, m5.x, m6.x, m7.x');
console.log(m.x, m1.x, m2.x, m3.x, m4.x, m5.x, m6.x, m7.x);                             // The monads have new values.
console.log(`mMar10.x[0].x, mMar10.x[1].x, mMar10.x[2].x, mMar10.x[3].x,
  mMar10.x[4].x, mMar10.x[5].x, mMar10.x[6].x`); 
console.log(mMar10.x[0].x, mMar10.x[1].x, mMar10.x[2].x, mMar10.x[3].x, mMar10.x[4].x, mMar10.x[5].x, mMar10.x[6].x, mMar10.x[7].x); // The stored monads are unaffected.  m.x is the result of the computation.
console.log('.');
console.log('test11 ', test11());
console.log('m.x, m1.x, m2.x, m3.x, m4.x, m5.x, m6.x, m7.x');
console.log(m.x, m1.x, m2.x, m3.x, m4.x, m5.x, m6.x, m7.x);
console.log( `m.ret(4), m1.ret(1), m2.ret(2), m3.ret(3),0
  m4.ret(4), m5.ret(5), m6.ret(6)` );
m.ret(4), m1.ret(1), m2.ret(2), m3.ret(3), m4.ret(4), m5.ret(5), m6.ret(6), m7.ret(7)
console.log('m.x, m1.x, m2.x, m3.x, m4.x, m5.x, m6.x');                                
console.log(m.x, m1.x, m2.x, m3.x, m4.x, m5.x, m6.x);                                    // The monads have new values.
console.log(`mMar11.x[0].x, mMar11.x[1].x, mMar11.x[2].x, mMar11.x[3].x,
  mMar11.x[4].x, mMar11.x[5].x, mMar11.x[6].x, mMar11.x[7].x`); 
console.log(mMar11.x[0].x, mMar11.x[1].x, mMar11.x[2].x, mMar11.x[3].x, mMar11.x[4].x, mMar11.x[5].x, mMar11.x[6].x, mMar11.x[7].x);  // The stored monads do not change. m has its initial value
console.log('.');
console.log('.');
console.log('cows and horses');

