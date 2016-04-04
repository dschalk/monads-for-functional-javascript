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

var Monad$ = function Monad$(z, g) {
  var _this = this;
  this.subject = subject();
  this.observer = this.subject.observer;
  this.stream = this.subject.stream;
  this.x = z;
  this.id = g;
  this.bnd = function (func) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    return func.apply(undefined, [_this.x].concat(args));
  };
  this.ret = function (a) {
    O[_this.id] = new Monad$(a,_this.id);
    _this.observer.next(a);
    console.log('Streaming from ', _this.id);
    return O[_this.id];
  };
};

var MonadSave = function MonadSave(z, g, h) {
  var _this = this;

  this.history = h;

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
    _this.history.push(a);
    window[_this.id] = new MonadSave(a,_this.id, _this.history);
    return window[_this.id];
  };
};

var mM$1 = new Monad$([], 'mM$1');
mM$1.ret(mM$1.x);

var mM$2 = new Monad$([], 'mM$2');
mM$2.ret(mM$2.x);

var mM$3 = new Monad$([], 'mM$3');
mM$3.ret(mM$3.x);

var mM$todo = new Monad$(['alpha', 'beta', 'gamma'], 'mM$todo');
mM$todo.ret(mM$todo.x);

var mM$task = new Monad$([], 'mM$task');
mM$task.ret(mM$task.x);

var mM$todo2 = new Monad$([], 'mM$todo2');
mM$todo2.ret(mM$todo2.x);

var mM$todo3 = new Monad$([], 'mM$todo3');
mM$todo3.ret(mM$todo3.x);





var mMsaved = new MonadSave({}, 'mMsaved');
var mMid = new MonadSave('waiting', 'mMid');
var mMnewval = new MonadSave('waiting', 'mMnewval');
var mMdata = new MonadSave(['start'], 'mMdata');
var mMdata2 = new MonadSave(['start'], 'mMdata2');
var mMlatest = new MonadSave({}, 'mMlatest');

var retSaveVal = ['start'];
var retSaveId = ['start'];
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
    return _this.p();
  };

  this.bnd = function (func) {
    _this.p = func;
  };
};

var ret = function ret(v) {
  var mon = new Monad(v, 'anonymous');
  return mon;
}

var cube = function(v,mon) {
  if (arguments.length === 2) {
    return mon(v*v*v);
  }
  return ret(v*v*v);
}

var double = function(v) {
  if (arguments.length === 2) {
    return mon(v*v);
  }
  return ret(v + v);
}

var add = function(x,b,mon) {
  if (arguments.length === 3) {
    return mon(x + b);
  }
  return ret(a+b);
}

var addAr = function(a,b) {
  return ret(a.map(v => v*1 + b*1));
}

var M = function M(a,b) {
  var mon = new Monad(a,b);
  return mon;
};

var MI = function MI() {
  return new MonadIter();
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
var mM19 = M(0,'mM19');
var mM20 = M(0,'mM20');
var mM21 = M(0,'mM21');
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
var mMgoals = M(0,'mMgoals');
var mMgoals2 = M('','mMgoals2');
var mMnbrs = M([],'mMnbrs');
var mMnumbers = M([],'mMnumbers');
var mMname = M('', 'mMname');
var mMar = M([1,2,3,4,5], 'mMar');
var mMar2 = M([1,2,3,4,5], 'mMar2');
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
var mMindex2 = new Monad(0, 'mMindex2');
var mMindex3 = new Monad(0, 'mMindex3');
var mMcount = new Monad(0, 'mMcount');
var mMcount2 = new Monad(0, 'mMcount2');
var mMhistory = new Monad([], 'mMhistory');
var mMhistorymM1 = new Monad([[0,0,0,0]], 'mMhistorymM1');
var mMhistorymM3 = new Monad([], 'mMhistorymM3');
var mMhistorymMtask = new Monad([], 'mMhistorymMtask');
var mMtemp = new Monad('temp', 'mMtemp');
var mMte = new Monad(0, 'mMte');
var mMid = new Monad('cow', 'mMid');
var mMhelper = new Monad('helper', 'mMhelper');
var mMtasks = new Monad([], 'mMtasks');
var mMid = new Monad(42, 'mMid');

var mMtasksPersist = new Monad(['Be here now'], 'mMtasksPersist');
mMtasksPersist.ret(mMtasksPersist.x)
var mMtodoList = new Monad([], 'mMtodoList');
mMtodoList.ret(mMtodoList.x);

var mMtaskList = new Monad([], 'mMtaskList');
mMtaskList.ret(mMtaskList.x);

var mM$taskList = new Monad$([], 'mM$taskList');
mM$taskList.ret(mM$taskList.x);

var mMsenderList = new Monad([], 'mMsenderList');
mMsenderList.ret(mMsenderList.x);

var mMauthorList = new Monad([], 'mMauthorList');
mMauthorList.ret(mMauthorList.x);

mMgoals.ret(mMgoals.x)
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

var trim = function trim(x,str) {
  return ret(str.trim());
};

var fib = function fib(x,k) {
  let j = k;

  while (j > 0) {
    x = [x[1], x[0] + x[1]];
    j -= 1;
  }
  return ret('fibonacci ' + k + ' = ' + x[0]);
};

var toNums = function toNums(x) {
  let y = x.map(x => parseFloat(x));
  return ret(y);
};

var calc = function calc(a,op,b) { 
  console.log('From calc. a, op, b ', a, op, b)
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
  console.log(mon);
  if (Array.isArray(y)) {
    let ar = [];
    let keys = Object.keys(y);
    for (let k in keys) {ar[k] = y[k]};
    ar.push(v);
    return mon.ret(ar);  
  }
  console.log('The value provided to push is not an array');
  return ret(y);
};

var spliceRemove = function spliceRemove(x, j, mon) {
  if (Array.isArray(x)) {
    let ar = [];
    let keys = Object.keys(x);
    for (let k in keys) {ar[k] = x[k]};
    ar.splice(j,1);
    return mon.ret(ar);  
  }
  console.log('The value provided to spliceRemove is not an array');
  return ret(x);
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

var sliceFront = function sliceFront(x, n, mon) {
  if (Array.isArray(x)) {
    let ar = x.slice(n);
    return mon.ret(ar);  
  }
  console.log('The value provided to splice is not an array');
  return ret(x);
};

var inc = function inc(x, mon) {
  return mon.ret(x + 1);
}

var dec = function inc(x, mon) {
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
  console.log('The value provided to splice is not an array');
  return ret(x);
};

var reduce = function reduce(x, f, mon) {
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

var next = function next(x, y, mon2) {
  if (x === y) {
    mon2.release();
  }
  return ret(x);
}

var next2 = function next(x, condition, mon2) {
  if (condition) {
    mon2.release();
  }
  return ret(x);
}

var doub = function doub(v,mon) {
  if (arguments.length === 2) {
    return mon(v + v);
  }
  return ret(v + v);
};

var square = function square(v,mon) {
  if (arguments.length === 2) {
    return mon(x * b);
  }
  return ret(v * v);
};

var mult = function mult(x, y, mon) {
  if (arguments.length === 3) {
    return mon(x * y);
  }
  return ret(x * y);
};

var log = function log(x, message, mon) {
  console.log('In log.  message is: ', message);
  if (Array.isArray(message) && message.length > 0) {
    let str = message.reduce((a,b) => {a + b});
    console.log(str);
    return mon.ret(x);
  }
  console.log('log message must be a non-empty array');
  return ret(x);
};


  function newId() {
    let keys = Object.keys(O.mM$taskList.x)
    let ar = [];
    let i = 0;
    let uniqueId;
    for (let k in keys) {
      ar.push(O.mM$taskList.x[k].children[0].elm.id);
    }
    function f(n) {  
      var j = n;
      if (ar.includes(n)) {
        f(n + 1)
      }  
      uniqueId = j;
      console.log('uniqueId, j, n ', uniqueId, j, n);
    }(10);
    console.log('uniqueId', uniqueId);
    return uniqueId;
  }

    var getIndex = function getIndex (event_object) {
      var task = event_object.currentTarget.parentNode.innerText;
      var possibilities = event_object.currentTarget.parentNode.parentNode.childNodes;
      var keys = Object.keys(possibilities);
      for (let k in keys) {
        if (task == possibilities[k].innerText) {
          return k
        }
        console.log('In getIndex. No match');
      }
    }

    var getIndex2 = function getIndex2 (e) {
      var elem = e.currentTarget.parentNode.children[0].innerHTML
      var elem2 = e.currentTarget.parentNode.parentNode.childNodes
      var keys = Object.keys(elem2);
      for (let k in keys) {
        console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& ', elem == elem2[k].childNodes[0].innerHTML);
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

