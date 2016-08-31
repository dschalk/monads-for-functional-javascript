'use strict';

var state, monadState, total; 
var name = "start"
var group = "solo"
var score = 0;
var goals = 0;

var Monad = function Monad(z, ID = 'anonymous') {
    this.id = g;
    this.x = z;
    this.bnd = (func, ...args) => func(this.x, ...args);
    this.ret =  a => window[this.id] = new Monad(a,this.id);
}; 

var ret = function ret(v, id = 'anonymous') {
      window[id] = new Monad(v, id )
      return window[id]
}

function fmap2 (g, a, id) {return (new Monad(g(a.x), id))}

function fmap (x, g, id) {return (new Monad(g(x), id));}

function opM (a, op, b, id) {
  return (new Monad(a.x + op + b.x), id); 
}

const MonadSet = function (set, ID = 'anonymous')  {
    this.s = set;
    this.bnd = (func, ...args) => func(this.s, ...args);  
    this.add = a => new MonadSet(s.add(a), this.id);
    this.delete = a => new MonadSet(s.delete(a), this.id);
    this.clear = () => new MonadSet(s.clear(), this.id);
};
  
var s = new Set();

var sMplayers = new MonadSet(s, 'sMplayers')  // holds currently online players

const MonadState = function (g, state, value, p)  {
  this.id = g;
  this.s = state;
  this.a = value;
  this.process = p;
  this.bnd = (func, ...args) => func(this.s, ...args);  
  this.run = st => { 
    let s = this.process(st); 
    let a = s[3];
    window[this.id] = new MonadState(this.id, s, a, this.process);
    return window[this.id];
  }
}

var tr4 = function tr4 (state) {
  return state[1];
}

factor_state([3,[],24,[2,3]])
function factor_state(v) {
  v[3].map(p => {
    if (v[2]/p == Math.floor(v[2]/p)) {v[1].push(p)}
  })
  return v;
}
          
var mMfactors = new Monad(-1, 'mMfactors');

var prFactTransformer = function prFactTransformer (s, m) {
  return m.run([s[0], [], mMfactors.x, s[3]])
}

var fpTransformer = function transformer (s, m) {
var bound = Math.ceil(Math.sqrt(s[3][s[3].length - 1]));
  if (bound > m.a[m.a.length - 1] ) {
    m.run([m.s[0], "from the fibKeyPress5$ handler", bound, primesMonad.a])
  }
  return m;
}

var tr3 = function tr3 (fibsArray, primesArray) {
  var bound = Math.ceil(Math.sqrt(fibsArray[fibsArray.length - 1]))
  var primes = primesArray.slice();
  if (primesArray.slice(-1)[0] >= bound) {
    primes = primesArray.filter(v => v <= bound);
  } 
  var ar = [];
  var fibs = fibsArray.slice(3);
  fibs.map (v => {
    if (primesArray.every(p => (v % p || v == p))) ar.push(v);
  })
  return [fibsArray, primes, ar]
}

var fibs_state = function fibs_state(ar) {
  var a = ar.slice();
  while (a[3].length < a[2]) {
    a = [a[1], a[0] + a[1], a[2], a[3].concat(a[0])];
  }
  return a
}

var primes_state = function primes_state(x) {
  var v = x.slice();
    while (2 == 2) {
      if (v[3].every(e => ((v[0]/e) != Math.floor(v[0]/e)))) {
        v[3].push(v[0]);
      }
      if (v[3][v[3].length - 1] > v[2]) { break };
      v[0]+=2;
    }
  return v;
}

var mMplayer = new Monad([], 'mMplayer');

var fibsMonad = new MonadState('fibsMonad', [0, 1, 3, [0,1]], [0,1], fibs_state  ) 

  var factorsMonad = new MonadState('factorsMonad', [ 2, [], 4, [] ], [], factor_state); 

  var pMname = new Monad('1v65n$%pqw3*@#9', 'pMname');
  var pMgroup = new Monad('solo', 'pMgroup');
  var pMscore = new Monad(0, 'pMscore');
  var pMgoals = new Monad(0, 'pMgoals');
  pMgoals.ret(0);

  function player_state (v) {
    var x = v.slice();
    let ar = [ 
    pMscore.ret(x[0]),
    pMgoals.ret(x[1]) ]
    playerMonad.a = ar;
    playerMonad.s = ar;  
    return x; 
  };

  var playerMonad = new MonadState('playerMonad', [0,0], [0,0], player_state);

  playerMonad.run([0, 0]);

  var mMplayerArchive = new Monad(['start', 'solo', 0, 0], 'mMplayerArchive')
  mMplayerArchive.ret(mMplayerArchive.x);

  var mMsetArchive = new Monad([], 'mMsetArchive');
  mMsetArchive.ret([]);

  var clean = function clean (x: any, mon = mMtemp ) {
    mon.ret([]);
  }

  var runPrime = function runPrime (x) {
    let l = primesMonad.a[primesMonad.a.length - 1]
    if (l >= x+1) {
    let ar = primesMonad.a.filter(e => e <= x+1) ;
    return(ar);
    }
    primesMonad.run([primesMonad.s[0], '', x+1, primesMonad.a]);
    let prms = primesMonad.a;
    return prms;
  }

  // runPrime([Math.round(Math.sqrt(fibMonad.run([fibMonad.s[0], fibsMonad.s[1], 23, fibsMonad.a]).s[0]))])
  var runFib = function runFib (x) {
    if (fibsMonad.a.length >= x) { 
      let ar = fibsMonad.a.slice();
      ar.length = x;
      return ar;
    }
    fibsMonad.run([fibsMonad.s[0], fibsMonad.s[1], x, fibsMonad.a]);
    return fibsMonad.a;
  }

  var primesMonad = new MonadState('primesMonad', [2, '', 3, [2]], [2],  primes_state) 

  function pFib (fibs, primes) {
    console.log('Hello from pFib fibs, primes: ', fibs, primes );
    var ar = [];
    fibs.map (f => {
      if (f < 2) return;
      if ( primes.every(p => (f % p != 0 || f == p))) ar.push(f);
    });
    return ar;
  };

  fibsMonad.run([0,1,5,[]])

primesMonad.run([3, '', 5, [2]])

var CURRENT_ROLL = [];

var emitevent;
var data$;

const MonadItter = function ()  {
  this.p = function () {};
  this.release = (...args) => this.p(...args);
  this.bnd = func => this.p = func;
};

function rang (n, m) {
  return Array.from(new Array(m - n), (x,i) => i + n)
}

var ad = (a,b) => a + b

var cu = a => a*a*a

function primes (n, ar) {    
  var array = ar.slice();
  for (var i = array.slice(-1).pop(); i <= n; i += 2) {
      if (array.every(elem => i % elem)) array.push(i);
  };
  return array.join(", ");
}

var testscore = function testscore (v) {
  if ((v % 5) === 0) {
    mMZ25.release();
  };
  return ret(v);
};

var expand = function expand (a,b) {return a + ', ' + b}

var cube = function(v,mon) {
  if (arguments.length === 2) {
    return mon.ret(v*v*v);
  }
  return ret(v*v*v, 'fred');
}

var p = function p (x) {
  if (x >= 0) {return ' + ' + x}
  if (x < 0 ) {return ' - ' + Math.abs(x)}
}

var add = function(x,b,mon = mMtemp5) {
  return mon.ret(x+b);
}

var addar = function(a,b) {
  return ret(a.map(v => v*1 + b*1), 'sally');
}

var M = function M(a,b) {
  var mon = new Monad(a,b);
  return mon;
};

var MI = function MI() {
  return new MonadItter();
};

var count = 0;
var mM1 = M([],'mM1');
mM1.ret(mM1.x);
var mMbound = M(0, 'mMbound');
var mM2 = M(0,'mM2');
var mM3 = M([],'mM3');
var mM4 = M([],'mM4');
var mM5 = M(0,'mM5');
var mM6 = M('','mM6');
var mM7 = M(0,'mM7');
var mM8 = M(0,'mM8');
var mM9 = M(0,'mM9');
var m = M(0,'m');
var mM11 = M([],'mM11');
var mM12 = M(0,'mM12');
var mM13 = M(0,'mM13');
var mM14 = M(0,'mM14');
var mM15 = M(0,'mM15');
var mM16 = M(0,'mM16');
var mM17 = M(0,'mM17');
var mM18 = M(0,'mM18');
var mM19 = M('waiting','mM19');
var mM20 = M(0,'mM20');
var mM21 = M('Yes','mM21');
var mM22 = M(0,'mM22');
mM22.ret(mM22.x);
var mM23 = M([0,1,1],'mM23');
mM23.ret(mM23.x);
var mM24 = M([[2,3],4,9],'mM24');
var mM25 = M(0,'mM25');
var mM26 = M(0,'mM26');
var mM27 = M(0,'mM27');
var mM28 = M([],'mM28');
var mM29 = M([],'mM29');
var mMscbd = M([],'mMscbd');
var mMmessages = M([],'mMmessages');
var mMscoreboard = M([],'mMscoreboard');
var mMmsg = M([],'mMmsg');
var mMgoals2 = M('','mMgoals2');
var mMnbrs = M([],'mMnbrs');
var mMnumbers = M([],'mMnumbers');
var mMname = M('', 'mMname');
var mMar = M([1,2,3,4,5], 'mMar');
var mMar2 = M([], 'mMar2');
var mMscores = M('', 'mMscores');
var mMprefix = M('', 'mMprefix');
var mMfib = M([0,1], 'mMfib');
var mMfib2 = M([0,1], 'mMfib2');
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
var mMsave = new Monad({x: 'start'}, 'mMsave');
var mMindex = new Monad(0, 'mMindex');
var mMindex3 = new Monad(0, 'mMindex3');
var mMhistory = new Monad([], 'mMhistory');
var mMhistorymM1 = new Monad([0,0,0,0], 'mMhistorymM1');
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
var fibmon = new Monad([0,1]);
var mMmax = new Monad(0, 'mMmax');
var mMfibSave = new Monad(0, 'mMfibSave');
var mMfibSave2 = new Monad(0, 'mMfibSave2');
var mMscoreChange = new Monad(0, 'mMscoreChange');
var mMcurrentRoll = new Monad([0,0,0,0], 'mMcurrentRoll');
var mMfibs8 = M([0,1], 'mMfibs8');
var mMallRolls = new Monad([[0,0,0,0]], 'mMallRolls');
var mMcurrentList = new Monad([], 'mMcurrentList');
var mMtaskList = new Monad([], 'mMtaskList');
var mMsenderList = new Monad([], 'mMsenderList');
var mMsoloAlert = new Monad('', 'mMsoloAlert');
var mMe = new Monad('', 'mMe');
var mMgoals = M(0,'mMgoals');
var mMt1 = new Monad(0,'mMt1')
var mMt2 = new Monad(0,'mMt2')
var mMt3 = new Monad('','mMt3')
var mMa = new Monad('waiting','mMa')
var mMx = new Monad([],'mMx')
var mMy = new Monad('waiting','mMy')
var mMb = new Monad('waiting','mMb')
var mMc = new Monad('waiting','mMc')
var mMquad1 = new Monad('','mMquad1')
var mMquad2 = new Monad('','mMquad2')
var mMquad3 = new Monad('','mMquad3')
var m = new Monad([2],'m')
var m1 = new Monad(0,'m1')
var m2 = new Monad(0,'m2')
var m3 = new Monad(0,'m3')
var mMprime = new Monad([2],'mMprime')
var mMprime2 = new Monad([2],'mMprime2')
var mMprimes = new Monad([2],'mMprimes')
var mMspreadsheet = new Monad([0,0,0,0], 'mMspreadsheet');
var mMspreadsheet2 = new Monad([0,0,0,0], 'mMspreadsheet2');
var mMdummy = new Monad(0, 'mMdummy');
var mMpf = new Monad(0, 'mMpf');
var mMpFib = new Monad([], 'mMpFib');
var RESULT =[0,0,0,0];
var mMdisplayFibs = new Monad([0,1], 'mMdisplayFibs');
var mMmembers = ret([], 'mMmembers');
var mMcount = new Monad(0, 'mMcount');
var mMcount2 = new Monad(0, 'mMcount2');
var mMcount3 = new Monad(0, 'mMcount3');
var mMcount4 = new Monad(0, 'mMcount4');
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

mMZ1.bnd(v => mMt1.bnd(add,v,mMt1)
.bnd(cube,mMt2)          // Returns mMt2.
.bnd(() => mMt3.ret(mMt1.x + ' cubed is ' + mMt2.x)))
  
  var qS1 = function qS1 (a, b, c) {
    let n = (b*(-1)) + (Math.sqrt(b*b - 4*a*c));
    if (n != n) {
      return 0;
    }
    return n/(2*a);
  }

  var qS2 = function qS2 (a, b, c) {
    let n = (b*(-1)) - (Math.sqrt(b*b - 4*a*c));
    if (n != n) {
      return 0;
    }
    return n/(2*a);
  }

  var qS3 = function qS3 (a, b, c) {
    return [qS1(a,b,c), qS2(a,b,c)]
  }

  var qS4 = function qS4 ([x,y,z]) {
    let [a,b,c] = [x,y,z]
    return qS3(a,b,c) 
  }

var trim = function trim(str) {
  return ret(str.trim(), 'fred');
};

var convertBack = function convertBack(str) {
  let ar = str.split('$*$*$');
  let s = str;
  if (ar.length > 1) {
    s = ar.reduce((a,b) => a + ', ' + b)
  }
  return s
}

var split = function split(x, mon) {
  return mon.ret(x.split(','));
}

var stringify = function stringify (ob) {
  let str = ob.task + ',' + ob.color  + ',' + ob.textdecoration + ',' + ob.checked.tostring() + 
    ',' +  ob.author + ',' + ob.responsible;
  return str;
}

var addString = function addString (x, str, mon = mMtemp5) {
  var s = str;
  if (x.length > 4) {
  s = x + ',' + str;
  }
  return mon.ret(s);
}
var intersection = function (a, b, mon = mMtemp5) {
  let ar3 = []
  for (let x of a) {
    for (let y of b) {
      if (x == y) {
        ar3.push(x)
      }
    }
  }
  return mon.ret(ar3);
}

var calc = function calc(a: string, op: string, b: string) { 
  var result;
  switch (op) {
      case "add": result = parseInt(a,10) + parseInt(b,10);
      break;
      case "subtract": result = parseInt(a,10) - parseInt(b,10);
      break;
      case "mult": result = parseInt(a,10) * parseInt(b,10);
      break;
      case "div": result = parseInt(a,10) / parseInt(b,10);
      break;
      case "concat": result = (a + b);
      break;
      default : 'major malfunction in calc.';
  }
  return result;
};

var equals = function equals (mon1, mon2) {
  if (mon1.id === mon2.id && mon1.x === mon2.x) return true;
  else return false
}

var equals2 = function equals (x, mon1, mon2, mon3) {
  if (mon1.id === mon2.id && mon1.x === mon2.x) {
    mon3.ret('true');
  } else mon3.ret('false');
  return ret(x, 'Mtemp3');
}

var pause = function(x,t,mon2) {
  let time = t*1000;
  setTimeout( function() {
    mon2.release();
  },time );
  return mon2;
};

var wait = function wait(x, y, mon = mMtemp5) {
  if (x === y) {
    mon.release();
  }
  return mon;
};

var unshift = function unshift(x, y, mon = ret(x, 'mMunshift')) {
    var ar = x.slice();
    ar.unshift(y);
    return mon.ret(ar)
};

var toFloat = function toFloat(x) {
    return ret(parseFloat(x));
};

var push = function push(y, v, mon = mMtemp5) {
  let ar = y.slice();
  ar.push(v);
  return mon.ret(ar);
}

var spliceRemove = function spliceRemove(x, index, location, mon = mMtemp) {
  if (Array.isArray(x)) {
    let ar = x[index].slice();
    console.log('In spliceRemove. ar is: ', ar )
    ar.splice(location,1);
    return mon.ret(ar); 
  } 
  console.log('Major malfunction in spliceRemove. x, index, location, mon: ', x, index, location, mon);
};

var spliceAdd = function spliceAdd(x, index, value, mon = mMtemp5) {
    let ar = x.slice(); 
    ar.splice(index, 0, value);
    return mon.ret(ar);  
};

var splice = function splice(x, start, howmany, mon = mMtemp5) {
  let ar = x.slice();
  ar.splice(start, howmany);
  return mon.ret(ar);  
};

var slice = function splice(x, y, mon = new Monad(x, 'mMslice')) {
  let ar = x.slice(y);
  return mon.ret(ar);  
};

var concat = function concat(x, v, mon = mMtemp5) {
  if (Array.isArray(v)) {
    let ar = x.slice();
    let ar2 = ar.concat(v);
    mon.ret(ar2);
  }
  console.log('In concat. x and v are: ',x, v);
  mon.ret(x + v)
}

var sliceFront = function sliceFront(x, n, mon = mMtemp5) {
  if (Array.isArray(x)) {
    let ar = x.slice(n);
    return mon.ret(ar);  
  }
  console.log('The value provided to sliceFront is not an array');
  return ret(x);
};

var inc = function inc(x, mon = mMtemp5) {
  return mon.ret(x + 1);
}

var dec = function dec(x, mon = mMtemp5) {
  return mon.ret(x - 1);
}

var filter = function filter(x, condition) {
    let ar = x.slice();
    return ret(ar.filter(v => condition))
}

var map = function map(x, f, mon = mMtemp) {
  if (Array.isArray(x)) {
    let ar = [];
    let keys = Object.keys(x);
    for (let k in keys) {
      ar[k] = f(x[k]);
      return mon.ret(ar);  
    }
  }
  console.log('The value provided to map is not an array');
  return ret(x);
};

var intersperse = function intersperse(x, mon = ret(42, 'mMintersperse')) {
  console.log('In intersperse ()()()()()()()()() x is ', x)
  let ar = x.reduce((a,b) => (a + ', ' + b))
  return mon.ret(ar);  
};

var addTest = function test (x,  mon) {
  console.log('>>>>>>>>>>>>>>>>>>> in addTest  x and mon are ', x, mon );
  if (x % 5 == 0) return mon.ret(x + 5)
  else return mon.ret(x);
}

var next = function next(x, y, instance, mon = ret(x,'mMnext')) {
  console.log('000000000000000000000000000000 In next. x, y and instance are: ', x, y, instance)
  if (x == y) {
    instance.release();
  }
  return mon.ret(x);
}

var next2 = function next(x, condition, mon2) {
  if (condition) {
    mon2.release();
  }
  return ret(x);
}

var next3 = function next(x, y, z, mon2) {
  if (x === y) {
    mon2.ret(z);
    mon2.release();
  }
  return ret(x);
}

var doub = function doub(v,mon) {
  if (arguments.length === 2) {
    return mon.ret(v + v);
  }
  return ret(v + v);
};

var double = function double(v: number, mon = new Monad(1, 'anonymous')) {
  return mon.ret(v + v)
}

var square = function square(v: number,mon = new Monad(1, 'anonymous')) {
  return mon.ret(v * v)
};

var mult = function mult(x, y, mon) {
  if (arguments.length === 3) {
    return mon.ret(x * y);
  }
  return ret(x * y);
};

var log = function log(x, message, mon) {
  console.log('In log. Entry: ', message);
  if (arguments.length === 3) return mon
  return ret(x);
};

var log2 = function log2(x) {
  console.log('In log2.  x is: ', x);
    return ret(x);
};

var lg = function lg (x) {
  console.log(x);
  return ret(x);
}

  var getIndex = function getIndex (event_object) {
    var task = event_object.currentTarget.parentNode.innerText;
    var possibilities = event_object.currentTarget.parentNode.parentNode.childNodes;
    var keys = Object.keys(possibilities);
    for (let k in keys) {
      if (task == possibilities[k].innerText) {
        return k
      }
    }
    console.log('In getIndex. No match');
  }

  var getIndex2 = function getIndex2 (e) {
    var elem = e.currentTarget.parentNode.children[0].innerHTML
    var elem2 = e.currentTarget.parentNode.parentNode.childNodes
    var keys = Object.keys(elem2);
    for (let k in keys) {
      if (elem == elem2[k].childNodes[0].innerHTML) {
        return k
      }
      console.log('In getIndex2. No match');
    }
  }

var tempstyle = {display: 'inline'}
var tempstyle2 = {display: 'none'}

var timeout = function timeout (x, t, m, args) {
  setTimeout(function () {
    m.bnd(... args);
  }, t * 1000  );
  return m;
};

var timeout2 = function timeout (x, t, m, args) {
    setTimeout(function () {
      mMZ9.release();
    }, t * 1000  );
    return mMZ9.bnd(() => m.bnd(... args))
  };  

var promise = function promise (x, t, mon, args) {
  return (new Promise((resolve) => {
    setTimeout(function() {
      resolve(eval("mon.ret(x).bnd(" + args + ")"))
    },t*1000  );
  }));
};

var display = function display (x, id, string, mon) {
  document.getElementById(id).innerHTML = string;
  if (arguments.length == 4) return mon(x)
  else return ret(x);
}

