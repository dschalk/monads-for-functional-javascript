'use strict';

var O = {};

var count = 0;
var state, monadState, total;

var MonadStream = function MonadStream(g) {
  var _this = this;
  this.id = g;
  this.stream = mostSubject.subject()
  this.ret = function (a) {
    console.log('From ', _this.id, 'a is ', a);
    _this.stream.next(a);
    return _this;
  };
};

var CURRENT_ROLL = [];
var mM$1 = new MonadStream('mM$1');
var mM$taskList = new MonadStream('mM$taskList');
var mM$3 = new MonadStream('mM$3');
var mM$2 = new MonadStream('mM$2');
var mM$todo = new MonadStream('mM$todo');
var mM$task = new MonadStream('mM$task');
var mM$todo2 = new MonadStream('mM$todo2');
var mM$todo3 = new MonadStream('mM$todo3');
var mM$prime = new MonadStream('mM$prime');
var mM$primeFibs = new MonadStream('mM$primeFibs');
var mM$prime2 = new MonadStream('mM$prime2');
var mM$prime3 = new MonadStream('mM$prime3');
var mM$prime33 = new MonadStream('mM$prime33');
var mM$prime333 = new MonadStream('mM$prime333');
var mM$prime4 = new MonadStream('mM$prime4');
var mM$prime5 = new MonadStream('mM$prime5');

var mM$fib = new MonadStream('mM$fib');
var mM$fib2 = new MonadStream('mM$fib2');
var mM$fib3 = new MonadStream('mM$fib3');
var mM$fib4 = new MonadStream('mM$fib4');
var mM$fib5 = new MonadStream('mM$fib5');
var mM$PF = new MonadStream('mM#PF');

var emitevent;
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

var MonadItter = function MonadItter() {
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

var testscore = function testscore (v) {
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

var addar = function(a,b) {
  return ret(a.map(v => v*1 + b*1));
}

var M = function M(a,b) {
  var mon = new Monad(a,b);
  return mon;
};

var MI = function MI(x) {
  return new MonadItter(x);
};

var count = 0;
var mM1 = M([],'mM1');
mM1.ret(mM1.x);
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
mM22.ret(mM22.x);
var mM23 = M([0,1,1],'mM23');
mM23.ret(mM23.x);
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
var mMfib2 = M([0,1], 'mMfib2');
mMfib2.ret(mMfib.x);
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
var mMsavear = new Monad([ret([0,0,0,0])], 'mMsavear');
var mMindex = new Monad(0, 'mMindex');
mMindex.ret(mMindex.x)
var mMhistory = new Monad([], 'mMhistory');
var mMhistorymM1 = new Monad([ret([0,0,0,0],'start')], 'mMhistorymM1');
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
var fibmon = new Monad([0,1]);
var mMmax = new Monad(0, 'mMmax');
var mMfibSave = new Monad(0, 'mMfibSave');
var mMfibSave2 = new Monad(0, 'mMfibSave2');
mMmax.ret(mMmax.x);
var mMscoreChange = new Monad(0, 'mMscoreChange');
mMscoreChange.ret(mMscoreChange.x);
var mMcurrentRoll = new Monad([0,0,0,0], 'mMcurrentRoll');
mMcurrentRoll.ret(mMcurrentRoll.x);

var mMfibs8 = M([0,1], 'mMfibs8');
mMfibs8.ret(mMfibs8.x);

var mMallRolls = new Monad([[0,0,0,0]], 'mMallRolls');
mMallRolls.ret(mMallRolls.x);

var mMcurrentList = new Monad([], 'mMcurrentList');
mMcurrentList.ret(mMcurrentList.x);

var mMtaskList = new Monad([], 'mMtaskList');
mMtaskList.ret(mMtaskList.x);

var mMsenderList = new Monad([], 'mMsenderList');
mMsenderList.ret(mMsenderList.x);

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

var m = new Monad([2],'m')
m.ret(m.x)

var m1 = new Monad(0,'m1')
m1.ret(m1.x)

var m2 = new Monad(0,'m2')
m2.ret(m2.x)

var m3 = new Monad(0,'m3')
m3.ret(m3.x)

var mMprime = new Monad([2],'mMprime')
mMprime.ret(mMprime.x)

var mMprime2 = new Monad([2],'mMprime2')
mMprime2.ret(mMprime2.x)

var mMprime = new Monad([2],'mMprime3')
mMprime.ret(mMprime.x)

var mMspreadsheet = new Monad([0,0,0,0], 'mMspreadsheet');
mMspreadsheet.ret(mMspreadsheet.x)

var mMspreadsheet2 = new Monad([0,0,0,0], 'mMspreadsheet2');
mMspreadsheet2.ret(mMspreadsheet2.x)

var mMdummy = new Monad(0, 'mMdummy');
mMdummy.ret(mMdummy.x);

var RESULT =[0,0,0,0];

var mMdisplayFibs = new Monad([0,1], 'mMdisplayFibs');
mMdisplayFibs.ret(mMdisplayFibs.x);

var mMcount = new Monad(0, 'mMcount');
var mMcount2 = new Monad(0, 'mMcount2');
var mMcount3 = new Monad(0, 'mMcount3');
var mMcount4 = new Monad(0, 'mMcount4');
mMcount.ret(mMcount.x);
mMcount2.ret(mMcount2.x);
mMcount3.ret(mMcount3.x);
mMcount4.ret(mMcount4.x);

mMgoals2.ret(mMgoals2.x)
mM3.ret(mM3.x)
mM6.ret(mM6.x)
mM24.ret(mM24.x)
mM25.ret(mM25.x)
mM26.ret(mM26.x)
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
mMhelper.ret(mMhelper.x);
mMtasks.ret(mMtasks.x);
mMalert.ret(mMalert.x);
mMfib.ret(mMfib.x);
fibmon.ret(fibmon.x);
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

var mMitterPrime = MI();
var mMitterPrime4 = MI();
var mMitterPrime5 = MI();
var mMitterFib = MI();
var mMitterFib2 = MI();
var mMitterFib3 = MI();
var mMitterFib4 = MI();
var mMitterFib5 = MI();
var mMitterFib6 = MI();
var mMitterFib7 = MI();
var mMitterFib8 = MI();
var mMitterFib9 = MI();
var mMitterPrimeFibs = MI();
var mMitterPF = MI();
var mMitterPF2 = MI();

var sol1 = function sol1 (x,a,b,c,mon) {
  let n = (b*(-1)) + (Math.sqrt(b*b - 4*a*c));
  if (n != n) {
    return mon.ret("no solution");
  }
  console.log('in sol1. n is: ', n);
  let solution = n/(2*a);
  return mon.ret(solution);
}

var sol2 = function sol2 (x,a,b,c,mon) {
  let n = (b*(-1)) - (Math.sqrt(b*b - 4*a*c))
  if (n != n) {
    return mon.ret("no solution");
  }
  console.log('in sol2. n is: ', n);
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

var split = function split(x, mon) {
  return mon.ret(x.split(','));
}

var stringify = function stringify (ob) {
  let str = ob.task + ',' + ob.color  + ',' + ob.textdecoration + ',' + ob.checked.tostring() + 
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

var intersection = function (a, b, mon) {
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

var intArray = function intArray (x, n) {
  let ar = Array(n).fill().map((_, i) => i + 1);
  return ret(ar);
}

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
      default : 'major malfunction in calc.';
  }
  return result;
};

var equals = function equals (x, mon1, mon2, mon3) {
  if (mon1.id === mon2.id && mon1.x === mon2.x) {
    mon3.ret('true');
  } else mon3.ret('false');
  return ret(x);
}

var runtest = function runtest () {
  mM5.bnd( equals,  
    m.ret(0).bnd(v => add(v, 3, m).bnd(cube)), 
    m.ret(0).bnd(add, 3, m).bnd(cube), mMa)

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
    if (y.length == 0) { ar = [v]; } else { let keys = Object.keys(y); for (let k in keys) {ar[k] = y[k]}; ar.push(v);
    }
    return mon.ret(ar);
};

var spliceRemove = function spliceRemove(x, index, location, mon) {
  if (Array.isArray(x)) {
    let ar = x[index].slice();
    console.log('In spliceRemove. ar is: ', ar )
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
    let ar = x.slice();
    ar.splice(start, n);
    return mon.ret(ar);  
  }
  console.log('The value provided to splice is not an array');
  return ret(x);
};

var concat = function concat(x, v, mon) {
  if (Array.isArray(v)) {
    let ar = x.slice();
    let ar2 = ar.concat(v);
    mon.ret(ar2);
  }
  console.log('In concat. x and v are: ',x, v);
  mon.ret(x + v)
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

var log2 = function log2(x) {
  console.log('In log2.  x is: ', x);
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


var tempstyle = {display: 'inline'}
var tempstyle2 = {display: 'none'}

/*
var delay = function delay(x, mon) {
  return new Promise(function (resolve) {
    setTimeout(resolve, 2000);
  });
};
*/




