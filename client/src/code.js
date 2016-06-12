import {h, pre} from '@motorcycle/dom'; 

/*
import {subject} from 'most-subject'
var sub = subject
var observer = sub.observer;
var stream = sub.stream;
*/
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

const monad = h('pre', {style: {color: '#AFEEEE' }}, `  var Monad = function Monad(z, g) {
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
  }; ` )

const monadStr = h('pre', {style: {color: '#AFEEEE' }}, `  var MonadStream = function MonadStream(g) {
        var _this = this;
        this.id = g;
        this.stream = mostSubject.subject()
        this.ret = function (a) {
          _this.stream.next(a);
          return _this;
        };
  }; ` )

const monadIt = h('pre', {style: {color: '#AFEEEE' }}, `  var MonadItter = function MonadItter() {
    var _this = this;
    this.p = function () {};
  
    this.release = function (...args) {
      return this.p(...args);
    };
  
    this.bnd = function (func) {
      _this.p = func;
    };
  }; ` )

const ret = h('pre', {style: {color: '#AFEEEE' }}, `  var ret = function ret(v, id) {
    if (arguments.length === 1) {
      return (new Monad(v, 'anonymous'));
    }
    window[id] = new Monad(v, id);
    return window[id];
  }; ` )

var fib = h('pre', `  mM$fib.stream.addListener({
    next: v => {
      if (v[2] > 1) {mM$fib.ret([v[1], v[0] + v[1], v[2] -1])}
      else {
        mM19.ret(v[1]);
      }
    },
    error: err => console.error(err),
    complete: () => console.log('completed')
  });

  const fibPress$ = sources.DOM
    .select('input#code').events('keydown');

  const fibPressAction$ = fibPress$.map(e => {
    if (e.target.value == '') {return};
    if( e.keyCode == 13 && Number.isInteger(e.target.value*1) ) {
      mM21.ret(e.target.value);
      mM$fib.ret([0, 1, e.target.value]);
    }
    if( e.keyCode == 13 && !Number.isInteger(e.target.value*1 )) {
      mM19.ret("You didn't provide an integer");
    }
  });  ` )  


var driver = h('pre', `  var websocketsDriver = function () {
      return create((add) => {
        socket.onmessage = msg => add(msg)
      })
  };
` )

var messages = h('pre', `  const messages$ = (sources.WS).map(e => 
    mMtem.ret(e.data.split(',')).bnd(v => {
    mMZ10.bnd(() => mM$1.ret([v[3], v[4], v[5], v[6]]))
    mMZ11.bnd(() => updateScoreboard(v[3]));
    mMZ12.bnd(() => mM6
      .ret(v[2] + ' successfully logged in.'))
    mMZ13.bnd(() => updateMessages(v))
    mMZ14.bnd(() => mMgoals2.ret('The winner is ' + v[2] ))
    mMZ15.bnd(() => mMgoals2.ret('A player named ' + 
      O.mMname.x + 'is currently logged in. Page will refresh in 4 seconds.')
      .bnd(refresh))
    mMZ16.bnd(() => {if (O.mMname.x != v[2]) {mMgoals2.ret(v[2] + v[3])}})
    mMZ17.bnd(() => {
      if (v[3] == 'no file') {
        mMtaskList.ret([])
      } 
      else {
        process(e.data)
      }
    })
    mMtemp.ret(e.data.split(',')[0])
      .bnd(next, 'CA#$42', mMZ10)
      .bnd(next, 'CB#$42', mMZ11)
      .bnd(next, 'CC#$42', mMZ12)
      .bnd(next, 'CD#$42', mMZ13)
      .bnd(next, 'CE#$42', mMZ14)
      .bnd(next, 'EE#$42', mMZ15)
      .bnd(next, 'DE#$42', mMZ16)
      .bnd(next, 'DD#$42', mMZ17)
    }) 
  });
              
  var next = function next(x, y, mon2) {
    if (x === y) {
      mon2.release();
    }
    return ret(x);
  }`  )

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

  var C42 = h('pre',  `  mMZ10.bnd(() => mM$1
     .ret([O.mMar.x[3], O.mMar.x[4], O.mMar.x[5], O.mMar.x[6]])
     .bnd(() => mM$2.ret([]))
     .bnd(displayInline,'0')
     .bnd(displayInline,'1')
     .bnd(displayInline,'2')
     .bnd(displayInline,'3'));  `  )

  var taskStream = h('pre',  `  
    });  `  )

  var deleteTask2 = h('pre',  `  mMZ19.bnd(() => O.mM$task.bnd(spliceRemove, O.mMar.x[3], mM$task));
  `  )

  var newTask = h('pre',  `  const newTask$ = sources.DOM
    .select('input.newTask').events('keydown'); 

  const newTaskAction$ = newTask$.map(e => {
      let ob = {};
      var alert = '';
      var ar = e.target.value.split(',');
      var ar2 = ar.slice(2);
      var task = '';
      if (ar.length < 4) {
        task = ar[2];
      }
      if (ar.length > 3) {
        task = ar2.reduce((a,b) => a + '$*$*$' + b);
      }
      if( e.keyCode == 13 ) {
        if ( ar.length < 3 ) {
          alert = 'You should enter "author, responsible party, task" separated by commas';
          document.getElementById('alert').innerHTML = alert;
        }

        else if ( (O.mMar2.x.filter(v => (v.task == task)).length) > 0 ) {
          document.getElementById('alert').innerHTML = task + " is already listed.";
        }

        else if ( ar.length > 2 ) {
          O.mM$taskList.bnd(addString, task + ',yellow, none, false,' +  ar[0] + ',' + ar[1], mM$taskList);
          e.target.value = '';
          document.getElementById('alert').innerHTML = '';
        } 
      } 
  };  ` )

  var process = h('pre',  `  const process = function(str) {
    let a = str.split(",");
    console.log('In process. str and a are: ', str, a);
    if (a == undefined) {
      return;
    };
    if (a.length < 9) {
      return
    };
    let ob = {};
    let ar = a.slice(3)
    let s = ar.reduce((a,b) => a + ',' + b);
    if (mM$taskList.x.length < 5) {
      O.mM$taskList.ret(s);
    }
    let ar2 = [];
    let tempArray = [];
    if (ar.length < 6) {return};
    if ((ar.length % 6) !== 0) {
      document.getElementById('alert').innerHTML = 'Error: array length is: ' + length;
    } else {
      let keys = Array(ar.length/6).fill(1);
      keys.map(_ => {
        ar2.push(
          {
            task: convertBack(ar.shift()),
            color: ar.shift(),
            textDecoration: ar.shift(),
            checked: ar.shift() === 'true',
            author: ar.shift(),
            responsible: ar.shift()
          }
        )
      })
      console.log('In process  ar2 is: ', ar2)
      let keys2 = Object.keys(ar2);
      for (let k in keys) {
        tempArray.push(
          h('div.todo',  [
            h('span.task3', {style: {color: ar2[k].color, textDecoration: ar2[k].textDecoration}},
                'Task: ' + ar2[k].task  ),  
            h('br'),
            h('button#edit1', 'Edit'  ),
            h('input#edit2', {props: {type: 'textarea', value: ar2[k].task}, style: {display: 'none'}}  ), 
            h('span#author.tao', 'Author: ' + ar2[k].author  + ' / ' + 'Responsibility: ' + ar2[k].responsible),
            h('br'),
            h('input#cb', {props: {type: 'checkbox', checked: ar2[k].checked}, style: {color: ar2[k].color,
                 textDecoration: ar2[k].textDecoration} } ), 
            h('label.cbox', { props: {for: '#cb'}}, 'Completed' ),
            h('button.delete', 'Delete'  ),  
            h('br'),
            h('hr')])
        )
      }
      mMtaskList.ret(tempArray)
    }
  };  `  )

  var colorClick = h('pre',  `  const colorClick$ = sources.DOM
    .select('#cb').events('click')
    
  const colorAction$ = colorClick$.map(e => {
    let index = getIndex(e);
    let s = O.mM$taskList.x;
    let ar = s.split(',');
    let n = 6 * index + 3;
    let j = 6 * index + 2;
    let k = 6 * index + 1;
    let checked = ar[n];
    if (checked == 'true')  {
      ar[n] = 'false'; 
      ar[k] = 'yellow'; 
      ar[j] = 'none'; 
    }
    else {
      ar[n] = 'true'; 
      ar[k] = 'lightGreen'; 
      ar[j] = 'line-through'; 
    }
    mM$taskList.ret( ar.reduce((a,b) => a + ',' + b) )
  });  
                     
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
  }  `  )

  var edit = h('pre',  `  const edit1$ = sources.DOM
    .select('#edit1').events('click')
    
  const edit1Action$ = edit1$.map(e => {
    let index = getIndex2(e);
    O.mMtaskList.x[index].children[3].elm.style.display = 'block';
  });

  const edit2$ = sources.DOM
    .select('#edit2').events('keypress')
    
  const edit2Action$ = edit2$.map(e => {
    let v = e.target.value;
    let index = getIndex2(e);
    if( e.keyCode == 13 ) {
      process2(v, index);
    O.mMtaskList.x[index].children[3].elm.style.display = 'none';
    }
  });

  const process2 = function(str, index) {
    let a = O.mM$taskList.x;
    let ar = a.split(',');
    let task = str.split(',').reduce((a,b) => ar + '$*$*$' + b)
    ar[index * 6] = task;
    let s = ar.reduce((a,b) => a + ',' + b);
    mM$taskList.ret(s);
  };

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
  }  `  )

  var mM$task = h('pre',  `  const taskAction$ = mM$taskList.stream.map(str => {
    socket.send('TD#$42' + ',' + O.mMgroup.x.trim() + 
        ',' + O.mMname.x.trim() + ',' + '@' + str);
  });  `  )

  var updateCalc = h('pre',  `  function updateCalc() { 
    O.mM3.bnd(ar => mM7       // O.mM3 contributes O.mM3.x to the computation.
    .ret(calc(ar[0], O.mM8.x, ar[1]))      // O.mM8.x is the operator string.
    .bnd(result =>   // The return value of calc(), which is O.mM7.x, is used three times.
      {  O.mM1.bnd(push, result, mM1).bnd(z =>
         mM$1.ret(z));                         // Updates the display.             
        if (result == 20) {score(O.mM13.x, 1)}; 
         if (result == 18) {score(O.mM13.x, 3)};
      }
    )) 
    reset()
  };

  var score = function score(x,j) {
    if ((x + j) == 20) {
      mMgoals.ret(O.mMgoals.x == 2 ? 0 : (O.mMgoals.x + 1)); 
      mM13.ret(0).bnd(mMindex.ret);
      mMhistorymM1.ret([[0,0,0,0]]);
      socket.send('CG#$42,' + O.mMgroup.x + ',' + O.mMname.x + ',' + -x + ',' + O.mMgoals.x); 
      if (O.mMgoals.x == 0) {
        socket.send('CE#$42,' + O.mMgroup.x + ',' + O.mMname.x + ',nothing ');
      }
      socket.send('CA#$42,' + O.mMgroup.x.trim() + ',' + O.mMname.x.trim() + ',6,6,12,20');
      return;
    }
    if ((x + j) % 5 == 0) {
      socket.send('CG#$42,' + O.mMgroup.x + ',' + O.mMname.x + ','+ (j+5)+',' + O.mMgoals.x); 
      mM13.ret(x + j + 5);
      socket.send('CA#$42,' + O.mMgroup.x.trim() + ',' + O.mMname.x.trim() + ',6,6,12,20');
      return;
    } 
    socket.send('CG#$42,' + O.mMgroup.x + ',' + O.mMname.x + ','+j+',' + O.mMgoals.x); 
    mM13.ret(x + j);
    socket.send('CA#$42,' + O.mMgroup.x.trim() + ',' + O.mMname.x.trim() + ',6,6,12,20');
  }

  var reset = function reset () {
      mM3.ret([])
      .bnd(() => mM4.ret(0)
      .bnd(mM8.ret)
      .bnd(cleanup))    // Hides 'undefined' values in the display.
  }

  var updateScoreboard = function updateScoreboard(v) {  // v is received from the server.
    let ar2 = v.split("<br>");
    let ar = ar.slice();
    return mMscoreboard.ret(ar);
  };  `  )


  var testZ = h('pre',  `  mMZ1.bnd(v => O.mMt1.bnd(add,v,mMt1)
  .bnd(cube,mMt2)
  .bnd(() => mMt3.ret(O.mMt1.x + ' cubed is ' + O.mMt2.x)))  
  
  mMZ2.bnd(v => cube(v).bnd(w => mMt3.ret(v + ' cubed is ' + w)))  `  )

  var quad = h('pre',  `  var solve = (function solve () {
    mMZ3
    .bnd(a => mMquad1.ret(a + 'x**2')
    .bnd(() => mMquad2.ret('').bnd(mMquad3.ret) // Clear the display.
    .bnd(() => 
    mMZ3
    .bnd(b => mMquad1.ret(a + 'x**x ' + ' + ' + b + 'x')
    .bnd(() =>  
    mMZ3
    .bnd(c => mMquad1
    .ret('Solutions for ' + a + 'x**x ' + ' + ' + b + 'x' + ' + ' + c + ' = 0:')
    .bnd(() => mMquad2.bnd(sol1,a,b,c,mMquad2)
    .bnd(() => mMquad3.bnd(sol2,a,b,c,mMquad3) 
    .bnd(() => solve()    
        )))))))))
  })();

  const quad$ = sources.DOM
    .select('#quad').events('keypress')
  const quadAction$ = quad$.map((e) => {
    if( e.keyCode == 13 ) {
      mMZ3.release(e.target.value)
      document.getElementById('quad').value = '';
    }
  });

  var sol1 = function sol1 (x,a,b,c,mon) {
    let n = b*(-1) + Math.sqrt(b*b - 4*a*c);
    if (n != n) {   // Test for NaN
      return mon.ret("No solution");
    }
    return mon.ret(n/2*a);
  }
  
  var sol2 = function sol2 (x,a,b,c,mon) {
    let n = b*(-1) - Math.sqrt(b*b - 4*a*c)
    if (n != n) {
      return mon.ret("No solution");
    }
    return mon.ret(n/2*a);
  }  `  )

  var mdem1 = h('pre',  `  var equals = function equals (x, mon1, mon2, mon3) {
    if (mon1.id === mon2.id && mon1.x === mon2.x) {
      mon3.ret('true');
    } else mon3.ret('false');
    return ret(x);
  }
  
  var add = function(x,b,mon) {
    if (arguments.length === 3) {
      return mon.ret(x + b);
    }
    return ret(x+b);
  }

  var cube = function(v,mon) {
    if (arguments.length === 2) {
      return mon.ret(v*v*v);
    }
    return ret(v*v*v);
  }  `  )

  var runTest = h('pre',  `  var runTest = function monTest () {
  mM5.bnd( equals,  
    m.ret(0).bnd(v => add(v, 3, m).bnd(cube)), 
    m.ret(0).bnd(add, 3, m).bnd(cube), mMa)

  mM5.bnd(equals, m, m.bnd(m.ret), mMb)

  mM5.bnd(equals, m, m.ret(m.x), mMc)
  }  `  )

  
  var gameStream = h('pre',  `  const mM$1Action$ = mM$1.stream.map(v => {
      O.mMindex2.bnd(inc, mMindex2);
      O.mMallRolls.bnd(spliceAdd, O.mMindex2.x, v, mMallRolls);
      document.getElementById('0').innerHTML = (O.mMallRolls.x[O.mMindex2.x])[0]; 
      document.getElementById('1').innerHTML = (O.mMallRolls.x[O.mMindex2.x])[1]; 
      document.getElementById('2').innerHTML = (O.mMallRolls.x[O.mMindex2.x])[2]; 
      document.getElementById('3').innerHTML = (O.mMallRolls.x[O.mMindex2.x])[3]; 
      cleanup(7)
  });  `  )

  var inc = h('pre',  `  var inc = function inc(x, mon) {
      return mon.ret(x + 1);
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
  }  `  )

    var todoStream = h('pre',  `  const taskAction$ = mM$taskList.stream.map(str => {
    socket.send('TD#$42' + ',' + O.mMgroup.x.trim() + 
        ',' + O.mMname.x.trim() + ',' + '@' + str);
  });  `  )

    var p3 = h('pre',  `  
    `  )

    var p4 = h('pre',  `  
    `  )

    var p5 = h('pre',  `  
    `  )

var add = h('pre',  `  var add = function(x,b,mon) {
    if (arguments.length === 3) {
      return mon.ret(x + b);
    }
    return ret(x+b);  
  };
  
  var m = new Monad(5, "m");
  m.bnd(add, 100)  // Returns an anonymous monad with id == "annonymous" and x == 105
  m.bnd(add, 100, ret('555', "m2"))  // Returns O.m2 with O.m2 == 105
  m.bnd(add, 100, m3)  // Returns O.m3 with O.m3.v == 105
  m.bnd(add, 100, m)   // returns m with m.x == 5 and O.m.x == 105
  m.bnd(add, 100).bnd(m.ret)  // Same result as above. O.m.x == 105  `  )

var ret_add_cube = h('pre',  `  var ret = function ret(v, id) {
    if (arguments.length === 1) {
      return (new Monad(v, 'anonymous'));
    }
    window[id] = new Monad(v, id);
    return window[id];
  }  

  var add = function(x,b,mon) {
    if (arguments.length === 3) {
      return mon.ret(x + b);
    }
    return ret(x+b);
  };

  var cube = function(v,mon) {
    if (arguments.length === 2) {
      return mon.ret(v*v*v);
    }
    return ret(v*v*v);
}  `  )

var primes = h('pre',  `  mM$prime.stream.addListener({
    next: v => {
      for (let i in v[0]) {
        if ((v[1] % v[0][i]) == 0) {
          mM$prime.ret([v[0], v[1] + 1, v[2]])
          return;
        }
        if (i == (v[0].length - 1)) {
          v[0].push(v[1]);
          document.getElementById('prime').innerHTML = v[0];
          mMitterPrime.bnd(() =>  mM$prime.ret([v[0], v[1] + 1])) 
        }
      }
    },
    error: err => console.error(err),
    complete: () => console.log('completed')
  });

  const primeClick$ = sources.DOM
    .select('#prime').events('click');

  const primeClickAction$ = primeClick$.map(() => {
    mMitterPrime.release()
  });  `  )

var seed = h('pre',  `  mM$prime.ret([[2],3])  `  )

var primeFib4 = h('pre',  `  mM$prime5.stream.observe(v => {
    f(v[2]);
    function f(x) {
      while ((v[0][v[0].length - 1]) < x) {
        for (let i in v[0]) {
          if ((v[1] % v[0][i]) == 0) {
            v[1]+=1;
            f(v[2]);
          }
          if (i == (v[0].length - 1)) {
            v[0].push(v[1]);
            f(v[2]);
          }
        }
      }
    }
    document.getElementById('prime5').innerHTML = v[0];
    var prFibs = v[0].filter(v => O.mMfibs8.x.includes(v));
    document.getElementById('primeFibs').innerHTML = prFibs;
    mMitterPrime5.bnd(arr => {
      var x = arr[0];
      var fibs = arr[1];
      if (x > (v[0][v[0].length - 1])) {
        mM$prime5.ret([v[0], v[1] + 1, x]);    // Puts the array in mM$prime5.stream.
      }
      else {
        let trunc = v[0].filter(a => a < x);
        let ar2 = v[0].slice(0, trunc.length + 1);
        document.getElementById('prime5').innerHTML = ar2;
        var primeFibs = fibs.filter(v => ar2.includes(v)); 
        document.getElementById('primeFibs').innerHTML = primeFibs;
         
      }
    })
  });  `  )

var primeFib3 = h('pre',  `  mM$fib5.stream.observe(x => {
      while (x[1] < x[2]) {
          x = [x[1], x[0] + x[1], x[2]];
          O.mMfibs8.bnd(push, x[1], mMfibs8)
      }
      var ar = O.mMfibs8.x.slice(0, O.mMfibs8.x.length - 1);
      document.getElementById('fib5').innerHTML = ar;
      mMitterPrime5.release([x[0], ar]);
      mMitterFib5.bnd(
        x => {
          let ar = O.mMfibs8.x.slice();
          if (x > ar[ar.length - 1]) {
            let a = ar.pop();
            let b = ar.pop();
            mM$fib5.ret([b, a, x]);
          }
          else {
            let ar2 = ar.filter(v => v <= x);
            document.getElementById('fib5').innerHTML = ar2;
            mMitterPrime5.release(([ar2[ar2.length-1], ar2]));
          }
      })
  });  `  )

var spreadsheet = h('pre',  `  const spread1Press$ = sources.DOM
    .select('#spread1').events('keypress');

  const spread1PressAction$ = spread1Press$.map(e => {
    console.log('Hello from spread1');
    let v = e.target.value;
    if( e.keyCode == 13 ) {
      mMcount.ret(e.target.value)
      .bnd(() => calculate());
    }
  });

  const spread2Press$ = sources.DOM
    .select('#spread2').events('keypress');

  const spread2PressAction$ = spread2Press$.map(e => {
    console.log('Hello from spread2');
    let v = e.target.value;
    if( e.keyCode == 13 ) {
      mMcount2.ret(e.target.value)
      .bnd(() => calculate());
    }
  });

  var calculate = function calculate() {
      let a = O.mMcount.x;
      let b = O.mMcount2.x
      let c = [ a + ' + ' + b + ' = ' + (a*1 + b*1),  
      a + ' - ' + b + ' = ' + (a - b),  
      a + ' * ' + b + ' = ' + (a * b),  
      a + ' / ' + b + ' = ' + (a / b) ];
      mMspreadsheet.ret(c);
  };  `  )

var spreadsheet2 = h('pre',  `  
                     
                     
                     
                     
                     const spread1Press$ = sources.DOM
    .select('#spread1').events('keypress');

  const spread1PressAction$ = spread1Press$.map(e => {
    if( e.keyCode == 13 ) {
      mMcount.ret(e.target.value)
      calcFunc();
    }
  });

  const spread2Press$ = sources.DOM
    .select('#spread2').events('keypress');

  const spread2PressAction$ = spread2Press$.map(e => {
    if( e.keyCode == 13 ) {
      mMcount2.ret(e.target.value)
      calcFunc();
    }
  });

 var calcFunc = function calcFunc() {
   let A = O.mMcount.x;
   let B = O.mMcount2.x;
   mMspreadsheet.ret(
   [A + ' + ' + B + ' = ' + (A*1 + B*1),  
    A + ' - ' + B + ' = ' + (A - B),  
    A + ' * ' + B + ' = ' + (A * B),  
    A + ' / ' + B + ' = ' + (A / B)])};  

 autorun(() => {O.mMspreadsheet.x});  `  )

var reactiveFib = h('pre',  `  const newFibpress$ = sources.DOM
    .select('input#fibF').events('keypress');

  const newFibAction$ = newFibpress$.map(e => {
    if( e.keyCode == 13 ) {
      var a = observable(1);
      var ar = ['0, 1'];
      var k = 0;
      a.observe(function(b, c) {
          k+=1;
          ar.push(', '+c);
          if (k < (e.target.value - 2)) {
              a.set(b + c);
          }
          mMfib2.ret(ar)
          .bnd(v => {
            console.log(v);
          })
      })
      a.set(1);
      a.set(2);
    }
  });  `  )

var traverse = h('pre',  ` 
  const forwardClick$ = sources.DOM
    .select('#forward').events('click');

  const backClick$ = sources.DOM
    .select('#back').events('click');

  const forwardAction$ = forwardClick$.map(() => {
    if (O.mMindex.x < (O.mMhistorymM1.x.length - 1)) {
      O.mMindex.bnd(add, 1, mMindex)
      .bnd(mM$3.ret)
    }
  });

  const backAction$ = backClick$.map(() => {
    if (O.mMindex.x > 0) {
      O.mMindex.bnd(add, -1, mMindex)
      .bnd(mM$3.ret)
      socket.send('DE#$42,' + O.mMgroup.x.trim() + ',' + O.mMname.x.trim() + ', clicked the BACK button. ');
    }
  });

  const mM$1Action$ = mM$1.stream.observe(v => {
      mM1.ret(v);
      O.mMindex.bnd(add, 1, mMindex)
      .bnd(i => O.mMhistorymM1.bnd(spliceAdd, i, O.mM1, O.mMhistorymM1))
      document.getElementById('0').innerHTML = O.mM1.x[0];  
      document.getElementById('1').innerHTML = O.mM1.x[1];  
      document.getElementById('2').innerHTML = O.mM1.x[2];  
      document.getElementById('3').innerHTML = O.mM1.x[3];  
      cleanup()
  });

  const mM$3Action$ = mM$3.stream.observe(v => {
    document.getElementById('0').innerHTML = (O.mMhistorymM1.x[v].x)[0]; 
    document.getElementById('1').innerHTML = (O.mMhistorymM1.x[v].x)[1]; 
    document.getElementById('2').innerHTML = (O.mMhistorymM1.x[v].x)[2]; 
    document.getElementById('3').innerHTML = (O.mMhistorymM1.x[v].x)[3]; 
    cleanup();
  })  `  )

var seed5 = h('pre',  ` 
             `  )

var seed6 = h('pre',  ` 
             `  )

var seed7 = h('pre',  ` 
             `  )

var seed8 = h('pre',  ` 
             `  )

var seed9 = h('pre',  ` 
             `  )

var seed1 = h('pre',  ` 
             `  )

var seed2 = h('pre',  ` 
             `  )





  export default {monad, monadStr, monadIt, fib, driver, messages, next, Monad$, updateCalc, arrayFuncs, travel, nums, cleanup, ret, C42, taskStream, newTask, process, mM$task, addString, colorClick, edit, testZ, quad, mdem1, runTest, todoStream, gameStream, inc, ret_add_cube, primes, seed, primeFib4, primeFib3, spreadsheet, spreadsheet2, add, reactiveFib, traverse}


