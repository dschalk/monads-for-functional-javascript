'use strict';
var todoData, mMt3VAL; 
var taskL = [];
var MESSAGES = [];
function tst (x) {return x};
// just a horse and rabbit
function Monad (z, ID = 'default') {
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

function get (m) {
  let v = m.bnd(x => x);
  return v;
}  

var pMname = new Monad('1v65n$%pqw3*@#9', 'pMname');
var pMgroup = new Monad('solo', 'pMgroup');
var pMscore = new Monad(0, 'pMscore');
var pMgoals = new Monad(0, 'pMgoals');
var pMdata = new Monad([], 'pMdata');

var mMnums = new Monad([0,0,0,0], 'mMnums');
var mMnumEls = new Monad([], 'mMnumEls');
var mMstyle = new Monad(['inline', 'inline', 'inline', 'inline'], 'mMstyle')

function test2 (ar1, ar2) {
  var a = ar1.slice();
  var b = ar2.slice();
  for (let i of ['0','1','2','3']) {
    a[i] = (b[i] == undefined) ? 'none' : 'inline'
  }
  return a;;
}

/*
console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaa   get(mMstyle) after test2 ', get(mMstyle) );
mMstyle.ret(test2(get(mMstyle), get(mMnums)));
console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbb   get(mMstyle) after test2 ', get(mMstyle) ); 
*/
var a = 3;
var b = 4;
var c = a + b;

function ret(v, id = 'default') {
  return new Monad(v, id);
}

    var equals = function equals (mon1, mon2) {
      if (mon1.id === mon2.id && get(mon1) === get(mon2)) return true;
      else return false
    }  
var eaaquals = function equals(mon1, mon2) {
    if (mon1.id === mon2.id && get(mon1) === get(mon2))
        return true;
    else
        return false;
};

var mMtemp5 = new Monad(0, 'mMtemp5') 

var add = function add (x, b) {
    return ret(parseInt(x,10) + parseInt(b,10) );
};

var cube = function cube (v, id = 'default') {
    return ret(v * v * v, id);
};

var aD = function (x, b, id = 'mQfred') {
  return window[id] = new MonadMaybe (parseInt(x,10) + parseInt(b,10), id);
};

var cuB = function (v, id = 'default') {
  return window[id] = new MonadMaybe (v * v * v, id);
};

var m = new Monad(3, 'm');
console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>> testing m.bnd(m.ret) == m');
console.log(m.bnd(m.ret) == m);

console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>> testing equals(ret(3).bnd(cube), cube(3)) ' );
console.log(equals(ret(3).bnd(cube), cube(3)));

function fmap(x, g, id) { 
  var mon = new Monad(g(x), id); 
  window[id] = mon;
  return mon;
}

var isFunc = function isFunc (x) { return eval("typeof(" + x + ") == 'function'")};

function nothing () {return new MonadMaybe('Nothing', 'nothing')}

var MonadMaybe = function MonadMaybe(z) {
  var _this = this;
  var g = arguments.length <= 1 || arguments[1] === undefined ? 'default' : arguments[1];
  this.id = g;
  this.x = z;
  
  this.bnd = function (a) {
    console.log('<B><B><B>             Entering bnd()  <B><B><B>               The argument is ', a );
    var result;
    if (_this.x == 'Nothing' || a[1] == 'Nothing') {
      console.log('<B><N><B>             In bnd()        <B><N><B>      Propagating Nothing from bnd()');
      result = Nothing;
      console.log('<$><$><$>             In bnd()        <$><$><$>      The result is ', result, '   result.x:', result.x);
      return result;
    }
    if (a instanceof Function) return a();
    var b = a.slice(1);
    var res = test([a[0],_this.x.toString(), ... b]);    
    result = res;
    console.log('<$><$><$>             In bnd()        <$><$><$>      The result is ', result, '   result.x:', result.x);
    return result;
  }
  this.ret = function(a) {  
    var b = eval(`typeof(${a})`);
    console.log('<@><@><@>             In ret()  <@><@><@>            Creating a new instance of MonadMaybe ___  id:', '"' +_this.id +'"', '     value:', a );
    if (_this.x == 'Nothing') {
      console.log('<N><N><N>    Still in ret()   <N><N><N>      Propagating Nothing from ret()');
      return Nothing
    }  
    try {
      if (a == undefined) throw '    ' + a + " is not defined"
      return window[_this.id] = new MonadMaybe(a, _this.id);
    }
    catch(e) { 
      console.log("<N><N><N>   Still in ret()  <N><N><N>  In a catch block ", a, 'is not defined.    ', e) 
      return Nothing
    };
    try {
      if (a == 'NaN') throw '    ' + a + " is not a number"
      return window[_this.id] = new MonadMaybe(a, _this.id);
    }
    catch(e) { 
      console.log("<N><N><N>   Still in ret()  <N><N><N>  In a catch block ", a, 'is not a number.   ', e) 
      return Nothing
    };
  };
}
var Nothing = new MonadMaybe('Nothing', 'Nothing');

function run (x) {
  console.log('<O><O><O>  Left test(), now at the start of run()  <O><O><O>  The argument is ', x);  
  var f = eval(x[0]);
  var b = x.slice(1)
  return f(... b)
}

function test (a) {

  console.log('<T><T><T>  Left bnd(); now at the start of test()  <T><T><T>  The argument is ', a );
  
  for (let c of a) {
    try {if (eval(c).toString == undefined) {
      throw "Error " + c + "is not defined"}
    } 
    catch(e) {
      console.log("<E><E><E>             In test()       <E><E><E>      " + c + " is not defined");
      console.log("<T><N><T>             In test()       <T><N><T>      Propagating Nothing from test()");
      return Nothing;
    }
    try {if ((eval(c).toString()) == 'NaN') {
      throw "Error " + c + " is not a number"}
    } 
    catch(e) {
      console.log('<E><E><E>             In test()       <E><E><E>      " + c + " is not a number' );
      console.log("<T><N><T>             In test()       <T><N><T>      Propagating Nothing from test()");
      return Nothing;
    }
    try {if (a[1] == 'Nothing') {
      throw "Error The value of the argument\'s x attribute is 'Nothing' " }
    } 
    catch(e) {
      console.log('<E><E><E>             In test()       <E><E><E>      The substrate monad\'s x attribute is "Nothing' );
      console.log("<T><N><T>             In test()       <T><N><T>      Propagating Nothing from test()");
      return Nothing;
    }
  }
  return run(a);
}

console.log("Calling test(['ad', '25', '17']) Result:", ` ${test(['ad', '25', '17'])}` );  
    
var mQnothing = new MonadMaybe('Nothing', 'mMnothing')
var mQ1 = new MonadMaybe(0, 'mM1')
console.log("<><><><><><> Trying mQnothing.ret(['3'])");
mQnothing.ret('3');
console.log("<><><><><><> Trying mQnothing.bnd(['cuB', 'mQnothing'])");
mQnothing.bnd(['cuB', 'mQnothing']);
console.log("<><><><><><> Trying mQ1.ret(['cow'/2]))");
mQ1.ret("'cow'/2");

console.log("<><><><><><> Trying mQ1.bnd(['aD','3', 'mQ1']).bnd(['cuB',' mQ1']");
mQ1.bnd(['aD', 3, 'mQ1']).bnd(['cuB', 'mQ1']);

var MonadSet = function MonadSet(set) {
var _this = this;

var ID = arguments.length <= 1 || arguments[1] === undefined ? 'default' : arguments[1];

this.s = set;
this.bnd = function (func) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return func.apply(undefined, [_this.s].concat(args));
};
this.add = function (a) {
  return new MonadSet(s.add(a), _this.id);
};
this.delete = function (a) {
  return new MonadSet(s.delete(a), _this.id);
};
this.clear = function () {
  return new MonadSet(s.clear(), _this.id);
};
};

var s = new Set();

var sMplayers = new MonadSet(s, 'sMplayers'); // holds currently online players

var MonadState = function MonadState(g, state, value, p) {
  var _this = this;
  this.id = g;
  this.s = state;
  this.a = value;
  this.process = p;
  this.bnd = (func, ...args) => func(this.s, ...args);  
  this.run = function (st) {
    var s = _this.process(st);
    var a = s[3];
    window[_this.id] = new MonadState(_this.id, s, a, _this.process);
    return window[_this.id];
  };
};

var tr4 = function tr4(state) {
  return state[1];
};

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
  return [fibsArray, primes, ar];
};
var fibs_state = function fibs_state(ar) {
  var a = ar.slice();
  while (a[3].length < a[2]) {
      a = [a[1], a[0] + a[1], a[2], a[3].concat(a[0])];
  }
  return a;
};
var primes_state = function primes_state(x) {
  var v = x.slice();
  while (2 == 2) {
      if (v[3].every(function (e) { return ((v[0] / e) != Math.floor(v[0] / e)); })) {
          v[3].push(v[0]);
      }
      if (v[3][v[3].length - 1] > v[2]) {
          break;
      }
      ;
      v[0] += 2;
  }
  return v;
};

var mMplayer = new Monad([], 'mMplayer');

var fibsMonad = new MonadState('fibsMonad', [0, 1, 3, [0, 1]], [0, 1], fibs_state);

factor_state([[], [], 24, [2, 3, 5]]);

factor_state2([[], [], 24, [2, 3, 5]]);

var factorsMonad = new MonadState('factorsMonad', [[], [], 2, []], [], factor_state);
var factorsMonad = new MonadState('factorsMonad', [[], [], 2, []], [], factor_state2);

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
  func(v);
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

var mMfactors = new Monad(-1, 'mMfactors');

var prFactTransformer = function prFactTransformer(s, n) {
  return factorsMonad.run([[], [], n, s[3]]);
};

var prFactTransformer2 = function prFactTransformer2(s, n) {
  return factorsMonad.run([[], [], n, s[3]]);
};

console.log('VVVVVVVVVVVVVVVVVVVVVVVVVVVV  get(pMname) and typeof get(pMname) ', get(pMname), typeof get(pMname) );
pMname.ret('Fred');
console.log('VVVVVVVVVVVVVVVVVVVVVVVVVVVV get(pMname) and typeof get(pMname) ', get(pMname), typeof get(pMname) );

console.log('VVVVVVVVVVVVVVVVVVVVVVVVVVVV  get(pMscore) and typeof get(pMscore) ', get(pMscore), typeof get(pMscore) );
pMname.ret('Fred');
console.log('VVVVVVVVVVVVVVVVVVVVVVVVVVVV get(pMscore) and typeof get(pMscore) ', get(pMscore), typeof get(pMscore) );

var messages = [];

var messageMonad = new MonadState('messageMonad', messages, messages, message_state); 

// messageMonad.run([messageMonad.s[3],[]]);

console.log('messageMonad ', messageMonad )
console.log('Array.isArray(messageMonad.a) ', Array.isArray(messageMonad.a) );
console.log('Array.isArray(messageMonad.s) ', Array.isArray(messageMonad.s) );


var playerMonad = new MonadState('playerMMMnad', [0,0,[[]]], [[0,0,0,0]], player_state);

playerMonad.s = [ 0, 0, 0, [[0,0,0,0]] ]   

var elms = [0,0,0,0];

function player_state (score, goals, elms) {
  pMscore.ret(a);
  pMgoals.ret(b);
  // var ar = playerMonad.s[3[0]].slice();
  var history = playerMonad.s[3].unshift(a);
  var uptick = mMindex.bnd(add,1).bnd(mMindex.ret).bnd(v => v)
  return [a, b, uptick, [a,b,history]];     
}

console.log('________________________ playerMonad ', playerMonad);

function message_state(v) {
  var ar = v[0].concat(v[3]);
  return [ v[0], [], [], ar ];
};

var mMplayerArchive = new Monad(['start', 'solo', 0, 0], 'mMplayerArchive');
mMplayerArchive.ret(get(mMplayerArchive));
var mMsetArchive = new Monad([], 'mMsetArchive');
mMsetArchive.ret([]);
var clean = function clean(x, mon) {
  if (mon === void 0) { mon = mMtemp; }
  mon.ret([]);
};
var runPrime = function runPrime(x) {
  var l = primesMonad.a[primesMonad.a.length - 1];
  if (l >= x + 1) {
      var ar = primesMonad.a.filter(function (e) { return e <= x + 1; });
      return (ar);
  }
  primesMonad.run([primesMonad.s[0], '', x + 1, primesMonad.a]);
  var prms = primesMonad.a;
  return prms;
};
// runPrime([Math.round(Math.sqrt(fibMonad.run([fibMonad.s[0], fibsMonad.s[1], 23, fibsMonad.a]).s[0]))])
var runFib = function runFib(x) {
  if (fibsMonad.a.length >= x) {
      var ar = fibsMonad.a.slice();
      ar.length = x;
      return ar;
  }
  fibsMonad.run([fibsMonad.s[0], fibsMonad.s[1], x, fibsMonad.a]);
  return fibsMonad.a;
};
var primesMonad = new MonadState('primesMonad', [2, '', 3, [2]], [2], primes_state);
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
}
;
fibsMonad.run([0, 1, 5, []]);
primesMonad.run([3, '', 5, [2]]);
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
    if ((v % 5) === 0) return v+5
    else return v;
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
  var mMnbrs = M([], 'mMnbrs');
  var mMnumbers = M([], 'mMnumbers');
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
  var mMalert = new Monad('nothing');
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
  var m = new Monad([2], 'm');
  var m1 = new Monad(0, 'm1');
  var m2 = new Monad(0, 'm2');
  var m3 = new Monad(0, 'm3');
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

  var unshift = function unshift(x, y) {
      var ar = x.slice();
      ar.unshift(y);
      return ret(ar);
  };

  var toFloat = function toFloat(x) {
      return ret(parseFloat(x));
  };

  var par = function par(x) {
      var ar = x.slice();
      ar.splice(0,3)
      return ret(ar)
  }
    

  var push = function push(x, v) {
      var ar = x.slice();
      ar.push(v);
      return ret(ar, 'pushFunc');
  };

  var push2 = function push2(x, v) {
     console.log('pppppppppppppppppppppppppppppppppppppppppppppp   in push2  x, v ', x, v );
      var ar = x.slice();
      ar.push(v);
      return ret2(ar, 'push2Func');
  };

  var spliceRemove = function spliceRemove(x, index) {
      var ar = x.slice();
      ar.splice(index, 1)
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
      var ar = x.slice();
      ar.splice(start, how_many);
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

  var next = function next(x, y, instance) {
      if (x == y) {
          instance.release();
      }
      return ret(x);
  };
  var next2 = function next(x, condition, mon2) {
      if (condition) {
          mon2.release();
      }
      return ret(x);
  };
  var next3 = function next(x, y, z, mon2) {
      if (x === y) {
          mon2.ret(z);
          mon2.release();
      }
      return ret(x);
  };

  var double = function double(v, mon) {
      return ret(v + v);
  };
  var square = function square(v) {
      return ret(v * v);
  };

var mult = function mult(x, y) {
    return mon.ret(x * y);
    }

var log = function log(x, message, mon) {
    console.log("From " + mon + ': ' + message);
    return ret(x);
};
var log2 = function log2(x) {
    console.log('In log2.  x is: ', x);
    return ret(x);
};
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
var promise = function promise(x, t, mon, args) {
    return (new Promise(function (resolve) {
        setTimeout(function () {
            resolve(eval("mon.ret(x).bnd(" + args + ")"));
        }, t * 1000);
    }));
};

var mMdisplay = new Monad('display', 'mMdisplay');

var display = function display(x, id, string, mon = mMdisplay) {
    document.getElementById(id).innerHTML = string;
    return mon.ret(x);
};




