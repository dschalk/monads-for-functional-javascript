'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

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
    monads[_this.id] = new Monad(a, _this.id);
    return monads[_this.id];
  };
};

var ret = function ret(v) {
  return new Monad(v);
};

var monads = {
  
Monad: function Monad(z, g) {
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
    monads[_this.id] = new Monad(a, _this.id);
    return monads[_this.id];
  };
},

MonadIter: function MonadIter() {
  var _this = this;
  this.p = function () {};

  this.release = function () {
    return _this.p();
  };

  this.bnd = function (func) {
    _this.p = func;
  };
},

ret: function(v) {
  return new Monad(v);
},

cube: function(v) {
  return ret(v*v*v);
},

double: function(v) {
  return ret(v+v);
},

add: function(a,b) {
  return ret(a+b);
},

addAr: function(a,b) {
  return ret(a.map(v => v*1 + b*1));
},

M: function M(a,b) {
  return new Monad(a,b);
},

MI: function MI() {
  return new MonadIter();
},

mM1: new Monad([],'mM1'),
mM2: new Monad(0,'mM2'),
mM3: new Monad(0,'mM3'),
mM4: new Monad([],'mM4'),
mM5: new Monad(0,'mM5'),
mM6: new Monad(0,'mM6'),
mM7: new Monad(0,'mM7'),
mM8: new Monad(0,'mM8'),
mM9: new Monad(0,'mM9'),
mM10: new Monad(0,'mM10'),
mM11: new Monad([],'mM11'),
mM12: new Monad(0,'mM12'),
mM13: new Monad(0,'mM13'),
mM14: new Monad(0,'mM14'),
mM15: new Monad(0,'mM15'),
mM16: new Monad(0,'mM16'),
mM17: new Monad(0,'mM17'),
mM18: new Monad(0,'mM18'),
mM19: new Monad(0,'mM19'),
mM20: new Monad(0,'mM20'),
mM21: new Monad(0,'mM21'),
mM22: new Monad(0,'mM22'),
mM23: new Monad(0,'mM23'),
mM24: new Monad(0,'mM24'),
mM25: new Monad(0,'mM25'),
mM26: new Monad(0,'mM26'),
mM27: new Monad(0,'mM27'),
mM28: new Monad(0,'mM28'),
mM29: new Monad(0,'mM29'),
mMscbd: new Monad([],'mMscbd'),
mMmessages: new Monad([],'mMmessages'),
mMscoreboard: new Monad([],'mMscoreboard'),
mMmsg: new Monad([],'mMmsg'),
mMgoals: new Monad(0,'mMgoals'),
mMgoals2: new Monad('','mMgoals2'),
mMnbrs: new Monad([],'mMnbrs'),
mMnumbers: new Monad([],'mMnumbers'),
mMname: new Monad('', 'mMname'),
mMar: new Monad([1,2,3,4,5], 'mMar'),
mMscores: new Monad('', 'mMscores'),
mMprefix: new Monad('', 'mMprefix'),
mMfib: new Monad([0,1], 'mMfib'),
mMmain: new Monad(null, 'mMmain'),
mMcalc: new Monad(null, 'mMcalc'),
mMadd: new Monad(0, 'mMadd'),
mMunit: new Monad(0, 'mMunit'),
mMprod: new Monad(0, 'mMprod'),
mMmult: new Monad({}, 'mMmult'),
mMpause: new Monad(0, 'mMpause'),
mMtem: new Monad(0, 'mMtem'),

mMZ1: new MonadIter(),
mMZ2: new MonadIter(),
mMZ3: new MonadIter(),
mMZ4: new MonadIter(),
mMZ5: new MonadIter(),
mMZ6: new MonadIter(),
mMZ7: new MonadIter(),
mMZ8: new MonadIter(),
mMZ9: new MonadIter(),

mMZ10: new MonadIter(),
mMZ11: new MonadIter(),
mMZ12: new MonadIter(),
mMZ13: new MonadIter(),
mMZ14: new MonadIter(),
mMZ15: new MonadIter(),
mMZ16: new MonadIter(),
mMZ17: new MonadIter(),
mMZ18: new MonadIter(),
mMZ19: new MonadIter(),

mMZ20: new MonadIter(),
mMZ21: new MonadIter(),
mMZ22: new MonadIter(),
mMZ23: new MonadIter(),
mMZ24: new MonadIter(),
mMZ25: new MonadIter(),
mMZ26: new MonadIter(),
mMZ27: new MonadIter(),
mMZ28: new MonadIter(),
mMZ29: new MonadIter(),

fib: function fib(x,k) {
  let j = k;
  while (j > 0) {
    x = [x[1], x[0] + x[1]];
    j -= 1;
  }
  return ret('fibonacci ' + k + ': ' + x[0]);
},

toNums: function toNums(x) {
  let y = x.map(x => parseFloat(x));
  return ret(y);
},

calc: function calc(a,op,b) { 
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
},

pause: function(x,t,mon2) {
  let time = t*1000;
  setTimeout( function() {
    mon2.release();
  },time );
  return mon2;
},

wait: function wait(x, y, mon2) {
  if (x === y) {
    mon2.release();
  }
  return mon2;
},

unshift: function unshift(x,v) {
  x.unshift(v);
  return ret(x);
},

toFloat: function toFloat(x) {
  newx: x.map(function (a) {
    return parseFloat(a);
  });
  return ret(newx);
},

push: function push(x, j) {
  if (Array.isArray(x)) {
    return ret(x.push(j));
  }
  return ret(x);
},

push: function push(x,v) {
  let ar = x;
  ar.push(v);
  let cleanX = ar.filter(v => (v !== "" && v !== undefined));
  return ret(cleanX);
},
splice: function splice(x, j, k) {
  if (Array.isArray(x)) {
    return ret(x.splice(j,k));
  }
  return ret(x);
},

clean: function clean(x) {
  return ret(x.filter(v => v !== ""));
},

filter: function filter(x, condition) {
  if (Array.isArray(x)) {
    return ret(x.filter(v => condition))
  }
  return ret(x);
},

map: function map(x, y) {
  if (Array.isArray(x)) {
    return ret(x.map(v => y))
  }
  return ret(x);
},

reduce: function reduce(x, y) {
  if (Array.isArray(x) && x.length > 0) {
    return ret(x.reduce(y))
  }
  return ret(x);
},

pop: function pop(x) {
  let v = x[x.length - 1];
  console.log('In pop. v: ',v);
  return ret(v);
},

next: function next(x, y, mon2) {
  if (x === y) {
    mon2.release();
  }
  return ret(x);
},

next2: function next(x, condition, mon2) {
  if (condition) {
    mon2.release();
  }
  return ret(x);
},

hyp: function hyp(x,y) {
  return Math.sqrt(x*x + y*y);
},

doub: function doub(v) {
  return ret(v + v);
},

square: function square(v) {
  return ret(v * v);
},

mult: function mult(x, y) {
  return ret(x * y);
},

log: function log(x,message) {
  console.log(message);
  let mon = new Monad(x);
  return mon;
},

delay: function delay(x, mon) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, 2000);
  });
}
}

