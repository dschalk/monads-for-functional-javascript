'use strict';

var O = {};

var tempStyle = {display: 'inline'}
var tempStyle2 = {display: 'none'}

function _classCallCheck(instance, Constructor) { 
  if (!(instance instanceof Constructor)) { 
    throw new TypeError("Cannot call a class as a function"); 
  } 
}

var subject = mostSubject.subject;

var MonadStream = function MonadStream(g) {
  var _this = this;
  this.subject = subject();
  this.observer = this.subject.observer;
  this.stream = this.subject.stream;
  this.id = g;
  this.ret = function (a) {
    _this.observer.next(a);
    console.log('Streaming from ', _this.id);
    return _this;
  };
};

var mM$1 = new MonadStream('mM$1');

var mM$2 = new MonadStream('mM$2');

var mM$3 = new MonadStream('mM$3');

var mM$todo = new MonadStream('mM$todo');

var mM$task = new MonadStream('mM$task');

var mM$todo2 = new MonadStream('mM$todo2');

var mM$todo3 = new MonadStream('mM$todo3');

var emitEvent;
var data$;

var Monad = function Monad(z, g) {
  var _this = this;

  this.x = z;
  if (arguments.length === 1) {
    this.id = 'anonymous';
  } else {
    this.id = g;
  }

  this.bnd = function (func) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    return func.apply(undefined, [_this.x].concat(args));
  };

  this.ret = function (a) {
    O[_this.id] = new Monad(a,_this.id);
    return O[_this.id];
  };
};

var MonadIter = function MonadIter() {
  var _this = this;
  this.p = function () {};

  this.release = function () {
    return this.p.apply(this, arguments);
  };

  this.bnd = function (func) {
    _this.p = func;
  };
};

var ret = function ret(v, id) {
  if (arguments.length === 1) {
    return (new Monad(v, 'anonymous'));
  }
  window[id] = new Monad(v, id);
  return window[id];
}

var testScore = function testScore (v) {
  if ((v % 5) === 0) {
    mMZ25.release();
  };
  return ret(v);
};

var cube = function(v,mon) {
  if (arguments.length === 2) {
    return mon.ret(v*v*v);
  }
  return ret(v*v*v);
}

var double = function(v) {
  if (arguments.length === 2) {
    return mon.ret(v*v);
  }
  return ret(v + v);
}

var add = function(x,b,mon) {
  if (arguments.length === 3) {
    return mon.ret(x + b);
  }
  return ret(x+b);
}

var addAr = function(a,b) {
  return ret(a.map(v => v*1 + b*1));
}

var M = function M(a,b) {
  var mon = new Monad(a,b);
  return mon;
};

var MI = function MI(x) {
  return new MonadIter(x);
};

var Count = 0;
// var mM1 = M([],'mM1');
var mM2 = M(0,'mM2');
var mM3 = M([],'mM3');
var mM4 = M([],'mM4');
var mM5 = M(0,'mM5');
var mM6 = M('','mM6');
var mM7 = M(0,'mM7');
var mM8 = M(0,'mM8');
var mM9 = M(0,'mM9');
var mM10 = M(0,'mM10');
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
var mM21 = M('waiting','mM21');
var mM22 = M(0,'mM22');
var mM23 = M(0,'mM23');
var mM24 = M(0,'mM24');
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
mMar2.ret(mMar2.x);
var mMscores = M('', 'mMscores');
var mMprefix = M('', 'mMprefix');
var mMfib = M([0,1], 'mMfib');
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
var mMindex = new Monad(0, 'mMindex');
var mMcursor = new Monad(0, 'mMcursor');
var mMgroup = new Monad('solo', 'mMgroup');
var mMgoals = new Monad(0, 'mMgoals');
var mMname = new Monad(0, 'mMname');
var mMob = new Monad({}, 'mMob');
var mMsender = new Monad('nobody', 'mMsender');
var mMextra = new Monad('nothing', 'mMextra');
var mMextra2 = new Monad('nothing', 'mMextra2');
var mMsave = new Monad({x: 'start'}, 'mMsave');
var mMsaveAr = new Monad([ret([0,0,0,0])], 'mMsaveAr');
var mMindex = new Monad(0, 'mMindex');
var mMindex2 = new Monad(-1, 'mMindex2');
var mMindex3 = new Monad(0, 'mMindex3');
var mMcount = new Monad(0, 'mMcount');
var mMcount2 = new Monad(0, 'mMcount2');
var mMhistory = new Monad([], 'mMhistory');
var mMhistorymM1 = new Monad([[0,0,0,0]], 'mMhistorymM1');
var mMhistorymM3 = new Monad([], 'mMhistorymM3');
var mMhistorymMtask = new Monad([], 'mMhistorymMtask');
var mMtemp = new Monad('temp', 'mMtemp');
var mMtemp2 = new Monad('temp', 'mMtemp2');
var mMte = new Monad(0, 'mMte');
var mMid = new Monad('cow', 'mMid');
var mMhelper = new Monad('helper', 'mMhelper');
var mMtasks = new Monad([], 'mMtasks');
var mMid = new Monad(42, 'mMid');
var mMalert = new Monad('nothing');
var fibMon = new Monad([0,1]);
var mMscoreChange = new Monad(0, 'mMscoreChange');
mMscoreChange.ret(mMscoreChange.x);
var mMtasksPersist = new Monad(['Be here now'], 'mMtasksPersist');
mMtasksPersist.ret(mMtasksPersist.x)
var mMtodoList = new Monad([], 'mMtodoList');
mMtodoList.ret(mMtodoList.x);

var mMcurrentRoll = new Monad([], 'mMcurrentRoll');
mMcurrentRoll.ret(mMcurrentRoll.x);

var mMallRolls = new Monad([], 'mMallRolls');
mMallRolls.ret(mMallRolls.x);

var mMcurrentList = new Monad([], 'mMcurrentList');
mMcurrentList.ret(mMcurrentList.x);

var mMtaskList = new Monad([], 'mMtaskList');
mMtaskList.ret(mMtaskList.x);

var mM$taskList = new MonadStream('mM$taskList');

var mMsenderList = new Monad([], 'mMsenderList');
mMsenderList.ret(mMsenderList.x);

var mMauthorList = new Monad([], 'mMauthorList');
mMauthorList.ret(mMauthorList.x);

var mMsoloAlert = new Monad('', 'mMsoloAlert');
mMsoloAlert.ret(mMsoloAlert.x);

var mMe = new Monad('', 'mMe');
mMe.ret(mMe.x);

var mMtaskList2 = new MonadStream('mMtaskList2');

var mMgoals = M(0,'mMgoals');
mMgoals.ret(mMgoals.x);

var mMt1 = new Monad(0,'mMt1')
mMt1.ret(mMt1.x)

var mMt2 = new Monad(0,'mMt2')
mMt2.ret(mMt2.x)

var mMt3 = new Monad('','mMt3')
mMt3.ret(mMt3.x)

var mMa = new Monad('waiting','mMa')
mMa.ret(mMa.x)

var mMb = new Monad('waiting','mMb')
mMb.ret(mMb.x)

var mMc = new Monad('waiting','mMc')
mMc.ret(mMc.x)

var mMquad1 = new Monad('','mMquad1')
mMquad1.ret(mMquad1.x)

var mMquad2 = new Monad('','mMquad2')
mMquad2.ret(mMquad2.x)

var mMquad3 = new Monad('','mMquad3')
mMquad3.ret(mMquad3.x)

var m = new Monad(0,'m')
m.ret(m.x)

mMgoals2.ret(mMgoals2.x)
mM3.ret(mM3.x)
mM6.ret(mM6.x)
mM24.ret(mM24.x)
mMmsg.ret(mMmsg.x)
mMmessages.ret(mMmessages.x)
mMgroup.ret(mMgroup.x)
mMname.ret(mMname.x)
mMscoreboard.ret(mMscoreboard.x)
mMscbd.ret(mMscbd.x)
mM13.ret(mM13.x)
mM3.ret(mM3.x)
mM8.ret(mM8.x)
mM19.ret(mM19.x)
mMhistorymM1.ret(mMhistorymM1.x)
mMhistorymM3.ret(mMhistorymM3.x)
mMhistory.ret(mMhistory.x)
mMindex2.ret(mMindex2.x);
mMhelper.ret(mMhelper.x);
mMtasks.ret(mMtasks.x);
mMalert.ret(mMalert.x);
mMfib.ret(mMfib.x);
fibMon.ret(fibMon.x);
mM5.ret(mM5.x);
mM6.ret(mM6.x);
mM27.ret(mM27.x);
mM21.ret(mM21.x);


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

var sol1 = function sol1 (x,a,b,c,mon) {
  let n = (b*(-1)) + (Math.sqrt(b*b - 4*a*c));
  if (n != n) {
    return mon.ret("No solution");
  }
  console.log('In sol1. n is: ', n);
  let solution = n/(2*a);
  return mon.ret(solution);
}

var sol2 = function sol2 (x,a,b,c,mon) {
  let n = (b*(-1)) - (Math.sqrt(b*b - 4*a*c))
  if (n != n) {
    return mon.ret("No solution");
  }
  console.log('In sol2. n is: ', n);
  let solution = n/(2*a);
  return mon.ret(solution);
}

var trim = function trim(str) {
  return ret(str.trim());
};

var convertBack = function convertBack(str) {
  let ar = str.split('$*$*$');
  let s = str;
  if (ar.length > 1) {
    s = ar.reduce((a,b) => a + ', ' + b)
  }
  return s
}

var convertFromString = function convertBack(str) {
  return str.split(',').reduce((a,b) => a + '$*$*$' + b)
}

var split = function split(x, mon) {
  return mon.ret(x.split(','));
}

var convertFromArray = function convert(ar) {
  return ar.reduce((a,b) => a + '$*$*$' + b)
}

var stringify = function stringify (ob) {
  let str = ob.task + ',' + ob.color  + ',' + ob.textDecoration + ',' + ob.checked.toString() + 
    ',' +  ob.author + ',' + ob.responsible;
  return str;
}

var addString = function addString (x, str, mon) {
  var s = str;
  if (x.length > 4) {
  s = x + ',' + str;
  }
  return mon.ret(s);
}

var fib = function fib(x) {
  return mMfib.ret([ O.mMfib.x[1], O.mMfib.x[0] + O.mMfib.x[1] ]);
}

var fibCalc = function(x, n) {
  mMfib.ret([0,1])
  for(let k in Array(n).fill(1)) mMfib.bnd(fib)
  return ret(O.mMfib.x[0])
}

var intArray = function intArray (x, n) {
  let ar = Array(n).fill().map((_, i) => i + 1);
  return ret(ar);
}

var toNums = function toNums(x) {
  let y = x.map(x => parseFloat(x));
  return ret(y);
};

var calc = function calc(a,op,b) { 
  var result;
  switch (op) {
      case "add": result = (parseFloat(a) + parseFloat(b));
      break;
      case "subtract": result = (a - b);
      break;
      case "mult": result = (a * b);
      break;
      case "div": result = (a / b);
      break;
      case "concat": result = (a+""+b)*1.0;
      break;
      default : 'Major Malfunction in calc.';
  }
  return result;
};

var equals = function equals (x, mon1, mon2, mon3) {
  if (mon1.id === mon2.id && mon1.x === mon2.x) {
    mon3.ret('true');
  } else mon3.ret('false');
  return ret(x);
}

var runTest = function runTest () {
  mM5.bnd( equals, 
  m.ret(0).bnd(v => add(v, 3, m).bnd(cube, m)), 
  m.ret(0).bnd(add, 3, m).bnd(cube, m), 
  mMa 
  )

  mM5.bnd(equals, m, m.bnd(m.ret), mMb)

  mM5.bnd(equals, m, m.ret(m.x), mMc)
}

var pause = function(x,t,mon2) {
  let time = t*1000;
  setTimeout( function() {
    mon2.release();
  },time );
  return mon2;
};

var wait = function wait(x, y, mon) {
  if (x === y) {
    mon2.release();
  }
  return mon;
};

var unshift = function unshift(y,v,mon) {
  if (Array.isArray(y)) {
    let ar = [];
    let keys = Object.keys(y);
    for (let k in keys) {ar[k] = y[k]};
    ar.unshift(v);
    return mon.ret(ar);  
  }
  console.log('The value provided to unshift is not an array');
  return ret(y);
};

var unshift2 = function unshift(y,v,mon) {
  return mon.ret(ret(y).x.unshift(v));
};

var toFloat = function toFloat(x) {
    return ret(parseFloat(x));
};

var clean = function clean(x, mon) {
  let ar = ret(x);
  return mon.ret(ar.x.filter(v => v !== "" && v!== undefined));
}

var push = function push(y,v,mon) {
  console.log('In push. y, v, mon are: ', y, v, mon);
    let ar = [];
    if (y.length == 0) {
      ar = [v];
    }
    else {
      let keys = Object.keys(y);
      for (let k in keys) {ar[k] = y[k]};
      ar.push(v);
    }
    return mon.ret(ar);
};

var spliceRemove = function spliceRemove(x, index, location, mon) {
  if (Array.isArray(x)) {
    let ar = [];
    let keys = Object.keys(x[index]);
    for (let k in keys) {
      ar[k] = x[index][k];
    }
    ar.splice(location,1);
    return mon.ret(ar);  
  }
  console.log('Major malfunction in spliceRemove. x, index, location, mon: ', x, index, location, mon);
};

var spliceAdd = function spliceAdd(x, index, value, mon) {
  if (Array.isArray(x)) {
    let ar = [];
    let keys = Object.keys(x);
    for (let k in keys) {ar[k] = x[k]};
    ar.splice(index, 0, value);
    return mon.ret(ar);  
  }
  console.log('The value provided to spliceAdd is not an array');
  return ret(x);
};

var splice = function splice(x, start, n, mon) {
  if (Array.isArray(x)) {
    let ar = [];
    let keys = Object.keys(x);
    for (let k in keys) {ar[k] = x[k]};
    ar.splice(start, n);
    return mon.ret(ar);  
  }
  console.log('The value provided to splice is not an array');
  return ret(x);
};

var concat = function concat(x, str, mon) {
  mon.ret(x + str)
}

var sliceFront = function sliceFront(x, n, mon) {
  if (Array.isArray(x)) {
    let ar = x.slice(n);
    return mon.ret(ar);  
  }
  console.log('The value provided to sliceFront is not an array');
  return ret(x);
};

var inc = function inc(x, mon) {
  return mon.ret(x + 1);
}

var dec = function dec(x, mon) {
  return mon.ret(x - 1);
}

var filter = function filter(x, condition) {
  if (Array.isArray(x)) {
    let ar = ret(x);
    return ret(ar.x.filter(v => condition))
  }
  return ret(x);
}

var map = function map(x, f, mon) {
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

var reduce = function reduce(x, f, mon) {
  console.log('In reduce.  Array.isArray(x), x.length: ', Array.isArray(x), x.length);
  if (Array.isArray(x) && x.length > 0) {
    let ar = [];
    let keys = Object.keys(x);
    for (let k in keys) {ar[k] = x[k]};
    console.log('ar in reduce is ', ar);
    return mon.ret(ar.reduce(f));  
  }
  console.log('The value provided to reduce is not an array or is empty . Value: ', x);
  return ret(x);
};

var next = function next(x, y, mon2, a1, a2) {
  if (x === y) {
    mon2.release(a1, a2);
  }
  return ret(x);
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

var square = function square(v,mon) {
  if (arguments.length === 2) {
    return mon.ret(x * b);
  }
  return ret(v * v);
};

var mult = function mult(x, y, mon) {
  if (arguments.length === 3) {
    return mon.ret(x * y);
  }
  return ret(x * y);
};

var log = function log(x, message) {
  console.log('In log.  message is: ', message);
    return ret(x);
};

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

/*
var delay = function delay(x, mon) {
  return new Promise(function (resolve) {
    setTimeout(resolve, 2000);
  });
};
*/

