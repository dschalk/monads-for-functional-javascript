import {h, pre} from '@motorcycle/dom'; 

import {subject} from 'most-subject'

var sub = subject
var observer = sub.observer;
var stream = sub.stream;

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
    window[_this.id] = new Monad(a,_this.id);
    return window[_this.id];
  };
};

var mMname = new Monad('Fred', 'mMname');

const monads = h('pre', {style: {color: '#AFEEEE' }}, `  var Monad = function Monad(z, g) {
    var _this = this;

    this.x = z;
    if (arguments.length === 1) {
      this.id = 'anonymous';
    } else {
      this.id = g;
    };

    this.bnd = function (func, ...args) {
       return func(_this.x, ...args);
    };

    this.ret = function (a) {
      O.[_this.id] = new Monad(a, _this.id);
      return O.[_this.id]
    };
  };               

  class MonadIter {                

    constructor() {

      this.p = function() {};

      this.release = function () {
        return this.p();
      }
 
      this.bnd = function (func) {
          this.p = func;
      }
    }
  }; ` )

var fib = h('pre', `  var fib = function fib(x,k) {
    let j = k;
    while (j > 0) {
      x = [x[1], x[0] + x[1]];
      j -= 1;
    }
    return ret('fibonacci ' + k + ' = ' + x[0]);   // An anonymous monad holding the result.
  };
` )  


var driver = h('pre', `  var websocketsDriver = function () {
      return create((add) => {
        socket.onmessage = msg => add(msg)
      })
  };
` )

var messages = h('pre', `  const messages$ = (sources.WS).map(e => 
    mMar.ret(e.data.split(','))
    .bnd(array => mMscores.ret(array[3].split("<br>"))
    .bnd(() => mMsender.ret(O.mMar.x[2])
    .bnd(() => mMprefix.ret(O.mMar.x[0])
      .bnd(next, 'CA#$42', mMZ10)
      .bnd(next, 'CB#$42', mMZ11)
      .bnd(next, 'CC#$42', mMZ12)
      .bnd(next, 'CD#$42', mMZ13)
      .bnd(next, 'CE#$42', mMZ14)
      .bnd(next, 'EE#$42', mMZ15)))));
    mMZ10.bnd(() => mM$1
      .ret([O.mMar.x[3], O.mMar.x[4], O.mMar.x[5], O.mMar.x[6]])
      .bnd(() => mM$2.ret([]))
      .bnd(displayInline,'0')
      .bnd(displayInline,'1')
      .bnd(displayInline,'2')
      .bnd(displayInline,'3'));
    mMZ11.bnd(() => mMscbd
      .ret(O.mMscores.x)
      .bnd(updateScoreboard)
      .bnd(() => mM3.ret([])
      .bnd(() => mM8.ret(0) )));
    mMZ12.bnd(() => mM6
      .ret( O.mMsender.x + ' successfully logged in.'));
    mMZ13.bnd(() => O.mMar
      .bnd(splice, 0, 3, O.mMar)
      .bnd(reduce, (a,b) => a + ", " + b)
      .bnd(() => O.mMmsg
      .bnd(unshift, h('div', O.mMsender.x + ': ' + O.mMar.x), O.mMmsg)
      ));
    mMZ14.bnd(() => mMgoals2.ret('The winner is ' + O.mMname.x ));
    mMZ15.bnd(() => mMgoals2.ret('A player named ' + 
        O.mMname.x + 'is currently logged in. Page will refresh in 4 seconds.')
      .bnd(refresh));`  )

var next = h('pre',  `  var next = function next(x, y, mon2) {
    if (x === y) {
      mon2.release();
    }
    return ret(x);  // An anonymous monad with the value of the calling monad.
  } `  )


var Monad$ = h('pre',  `  var Monad$ = function Monad$(z, g) {
      var _this = this;
      this.subject = subject();
      this.observer = this.subject.observer;
      this.stream = this.subject.stream;
      this.x = z;
      this.id = g;

      this.bnd = function (func, ...args) {
         return func(_this.x, ...args);
      };

      this.ret = function (a) {
        O[_this.id] = new Monad$(a,_this.id);
        _this.observer.next(a);
        return O[_this.id];
      };
    };
  `  )

var updateCalc = h('pre',  `  function updateCalc() { 
     mMZ2.bnd(() => O.mM13
                  .bnd(score, 1)
                  .bnd(next2, (O.mM13.x % 5 === 0), mMZ5) 
                  .bnd(newRoll));
     mMZ4.bnd(() => O.mM13
                  .bnd(score, 3)
                  .bnd(next2, (O.mM13.x % 5 === 0), mMZ5) 
                  .bnd(newRoll));
         mMZ5.bnd(() => O.mM13
                      .bnd(score,5)
                      .bnd(v => mM13.ret(v)
                      .bnd(next, 25, mMZ6)));
             mMZ6.bnd(() => mM9.bnd(score2) 
                          .bnd(next,3,mMZ7));
                mMZ7.bnd(() => mM13.bnd(winner));               
     O.mM3.bnd(x => mM7
                  .ret(calc(x[0], O.mM8.x, x[1]))
                  .bnd(next, 18, mMZ4)  
                  .bnd(next, 20, mMZ2) // Releases mMZ2 (above)
                  .bnd(() => O.mM$1.bnd(push, O.mM7.x, mM$1)
                  .bnd(() => mM3
                  .ret([])
                  .bnd(() => mM4
                  .ret(0).bnd(mM8.ret)
                  .bnd(cleanup)
                  ))))
  }
  `  )

var nums = h('pre',  `  
    const numClick$ = sources.DOM
      .select('.num').events('click');
       
    const numClickAction$ = numClick$.map(e => {
      console.log(e);
      if (O.mM3.x.length < 2) {
        O.mM3.bnd(push, e.target.innerHTML, O.mM3)
        mM28.ret(O.mMhistorymM1.x[O.mMindex2.x])
        .bnd(spliceRemove, e.target.id, O.mM$1)
        .bnd(mM$1.ret);
        if (O.mM3.x.length === 2 && O.mM8.x !== 0) {
          updateCalc();
        }
      };
    }).startWith([0,0,0,0]);

    const opClick$ = sources.DOM
      .select('.op').events('click');
  
    const opClickAction$ = opClick$.map(e => {
      mM8.ret(e.target.textContent);
      if (O.mM3.x.length === 2) {
        updateCalc();
      }
    })

    const mM$1Action$ = mM$1.stream.map(v => {
      if (Array.isArray(v)) {
        O.mMhistorymM1.bnd(spliceAdd, O.mMindex2.x, v, O.mMhistorymM1);
        document.getElementById('0').innerHTML = (O.mMhistorymM1.x[O.mMindex2.x])[0]; 
        document.getElementById('1').innerHTML = (O.mMhistorymM1.x[O.mMindex2.x])[1]; 
        document.getElementById('2').innerHTML = (O.mMhistorymM1.x[O.mMindex2.x])[2]; 
        document.getElementById('3').innerHTML = (O.mMhistorymM1.x[O.mMindex2.x])[3]; 
        cleanup()
      }
      else {
        console.log('O.mM$1.stream is providing defective data to O.mM$1Action');
      }
  });  `  )

  const arrayFuncs = h('pre',  `  var push = function push(y,v,mon) {
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
    
    var spliceRemove = function splice(x, j, mon) {
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
    
    var spliceAdd = function splice(x, index, value, mon) {
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
    
    var splice = function splice(x, start, end, mon) {
      if (Array.isArray(x)) {
        let ar = [];
        let keys = Object.keys(x);
        for (let k in keys) {ar[k] = x[k]};
        ar.splice(start, end);
        return mon.ret(ar);  
      }
      console.log('The value provided to spliceAdd is not an array');
      return ret(x);
    };
  `  )

var cleanup = h('pre',  `  function cleanup (x) {
      let target0 = document.getElementById('0');
      let target1 = document.getElementById('1');
      let target2 = document.getElementById('2');
      let target3 = document.getElementById('3');
      let targetAr = [target0, target1, target2, target3];
      for (let i in [0,1,2,3]) {
        if (targetAr[i].innerHTML == 'undefined' )    {
          targetAr[i].style.display = 'none';
        }
        else {
          targetAr[i].style.display = 'inline';
        }
      }
      return ret(x);
  }; `  )

  var travel = h('pre',  `  const forwardClick$ = sources.DOM
      .select('#forward2').events('click');
  
    const backClick$ = sources.DOM
      .select('#back2').events('click');
  
    const forwardClickAction$ = forwardClick$.map(() => {
      if (O.mMindex2.x < (O.mMhistorymM1.x.length - 1)) {
        inc(O.mMindex2.x, mMindex2)
        .bnd(() => mM$3.ret('Hello'))
      }
    });
  
    const backClickAction$ = backClick$.map(() => {
      if (O.mMindex2.x > 0) {
        dec(O.mMindex2.x, mMindex2)
        .bnd(() => mM$3.ret('You bet!'))
      }
    });

    const mM$3Action$ = mM$3.stream.map(v => {
      document.getElementById('0').innerHTML = (O.mMhistorymM1.x[O.mMindex2.x])[0]; 
      document.getElementById('1').innerHTML = (O.mMhistorymM1.x[O.mMindex2.x])[1]; 
      document.getElementById('2').innerHTML = (O.mMhistorymM1.x[O.mMindex2.x])[2]; 
      document.getElementById('3').innerHTML = (O.mMhistorymM1.x[O.mMindex2.x])[3]; 
      cleanup();
    })  `  )

  var ret = h('pre',  `  var ret = function ret(v) {
    var mon = new Monad(v, 'anonymous');
    return mon;
  }  `  )

  var C42 = h('pre',  `  mMZ10.bnd(() => mM$1
     .ret([O.mMar.x[3], O.mMar.x[4], O.mMar.x[5], O.mMar.x[6]])
     .bnd(() => mM$2.ret([]))
     .bnd(displayInline,'0')
     .bnd(displayInline,'1')
     .bnd(displayInline,'2')
     .bnd(displayInline,'3'));  `  )

  var p6 = h('pre',  `  
  `  )

  var p5 = h('pre',  `  
  `  )

  var p4 = h('pre',  `  
  `  )

  var p3 = h('pre',  `  
  `  )

  var p2 = h('pre',  `  
  `  )

  var p1 = h('pre',  `  
  `  )

  var p7 = h('pre',  `  
  `  )





export default {monads, fib, driver, messages, next, Monad$, updateCalc, stream, arrayFuncs, travel, nums, cleanup, ret, C42 }
