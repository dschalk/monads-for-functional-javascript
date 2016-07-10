import {h, pre} from '@motorcycle/dom'; 

/*
import {subject} from 'most-subject'
var sub = subject
var observer = sub.observer;
var stream = sub.stream;
*/
var Monad = function Monad(value, ID) {
  var _this = this;

  this.x = value;

  if (arguments.length === 1) this.id = 'anonymous';
  else this.id = ID;

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
    mMZ10.bnd(() => game([v[3], v[4], v[5], v[6]]))
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
        .bnd(spliceRemove, e.target.id, mMtemp)
        .bnd(v => game(v));
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

    var game = function game (v) {
        mM1.ret(v);
        O.mMindex.bnd(add, 1, mMindex)
        .bnd(i => O.mMhistorymM1.bnd(spliceAdd, i, O.mM1, O.mMhistorymM1))
        document.getElementById('0').innerHTML = O.mM1.x[0];  
        document.getElementById('1').innerHTML = O.mM1.x[1];  
        document.getElementById('2').innerHTML = O.mM1.x[2];  
        document.getElementById('3').innerHTML = O.mM1.x[3];  
        cleanup()
    };
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

  var quad = h('pre',  `  const quad$ = sources.DOM
    .select('#quad').events('keypress')  // Motorcycle way to get user input.
  
  const quadAction$ = quad$.map((e) => {
    if( e.keyCode == 13 ) {
      mMZ3.release(e.target.value)       // Releases mMZ (below).
      document.getElementById('quad').value = '';
    }
  });

  var solve = function solve () {
    mMZ3.bnd(a => 
    mMtemp.ret(a)           
    .bnd(innerHTML, '', 'quad6', mMtemp)         
    .bnd(innerHTML, a + " * x * x ", 'quad5', mMtemp)
    .bnd(a =>
        mMZ3.bnd(b =>  mMtemp.ret(b)
        .bnd(innerHTML, " + " + b + " * x ", 'quad6', mMtemp).bnd(b =>
            mMZ3.bnd(c => {
                let x = qS1(a,b,c);
                let y = qS2(a,b,c);  
                document.getElementById('quad5').innerHTML = 
                  'The results are: x = ' + x + ' and x =';
                document.getElementById('quad6').innerHTML = y; 
                solve();
            })))))
  }();

  var qS1 = function qS1 (a, b, c) {
    let n = (b*(-1)) + (Math.sqrt(b*b - 4*a*c));
    if (n != n) {
      return "No solution";
    }
    return n/(2*a);
  }

  var qS2 = function qS2 (a, b, c) {
    let n = (b*(-1)) - (Math.sqrt(b*b - 4*a*c));
    if (n != n) {
      return "No solution";
    }
    return n/(2*a);
  
  var innerHTML = function innerHTML (x, v, u, m) { 
    document.getElementById(u).innerHTML = v;
    return m.ret(x);
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
  }; ` )
  
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

var seed = h('pre',  `  mM$prime.ret([[2],3])  `  )

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

  var game = function game (v) {
      mM1.ret(v);
      O.mMindex.bnd(add, 1, mMindex)
      .bnd(i => O.mMhistorymM1.bnd(spliceAdd, i, O.mM1, O.mMhistorymM1))
      document.getElementById('0').innerHTML = O.mM1.x[0];  
      document.getElementById('1').innerHTML = O.mM1.x[1];  
      document.getElementById('2').innerHTML = O.mM1.x[2];  
      document.getElementById('3').innerHTML = O.mM1.x[3];  
      cleanup()
  };

  var trav = function trav (v) {
    document.getElementById('0').innerHTML = (O.mMhistorymM1.x[v].x)[0]; 
    document.getElementById('1').innerHTML = (O.mMhistorymM1.x[v].x)[1]; 
    document.getElementById('2').innerHTML = (O.mMhistorymM1.x[v].x)[2]; 
    document.getElementById('3').innerHTML = (O.mMhistorymM1.x[v].x)[3]; 
    cleanup();
  }  `  )

var MonadState = h('pre',  `  var MonadState = function MonadState (g, state, value, p) {
    var _this = this;
    this.id = g;
    this.s = state;
    this.a = value;
    this.process = p;
    this.bnd = function (func, ...args) {
       return func(_this.s, ...args);   // bnd provides instances' state to func.
    };
    this.run = function(st) { 
      let s = _this.process(st); 
      let a = s[3];
      window[_this.id] = new MonadState(_this.id, s, a, _this.process);
      return window[_this.id];
    }
  }  `  )

var primesMonad = h('pre',  `  var primesMonad = new MonadState('primesMonad', [2, '', 3, [2]], [2],  primes_state) 

  var primes_state = function primes_state(x) {
    var v = x.slice();
      while (2 == 2) {
        if (v[3].every(e => ((v[0]/e) != Math.floor(v[0]/e)))) {
          v[3].push(v[0]);
        }
        if (v[3][v[3].length - 1] > v[2]) { break }; // Not an infinite loop afterall
        v[0]+=2;
      }
    return v;
  }  `  )

var fibsMonad = h('pre',  `  var fibsMonad = new MonadState('fibsMonad', [0, 1, 3, [0,1]], [0,1], fibs_state  ) 

  var fibs_state = function fibs_state(ar) {
    var a = ar.slice();
    while (a[3].length < a[2]) {
      a = [a[1], a[0] + a[1], a[2], a[3].concat(a[0])];
    }
    return a
  }  `  )

var tr3 = h('pre',  `  var tr3 = function tr (fibsArray, primesArray) {
    var ar = [];
    var fibs = fibsArray.slice();
    var primes = primesArray.slice();
    var bound = Math.round(Math.sqrt(fibs[fibs.length - 1]));
    if (bound < primesArray[primesArray.length - 1]) {
      primes = primes.filter(v => v <= bound);
    }
    fibs.map (f => {
      if ( f < 2 ) return;
      if ( primes.every(p => (f % p != 0 || f == p))) ar.push(f);
    })
    return [fibs, primes, ar]
  }  `  )

var primeFibInterface = h('pre',  `  const fibKeyPress5$ = sources.DOM
    .select('input#fib92').events('keydown');

  const primeFib$ = fibKeyPress5$.map(e => {
    if( e.keyCode == 13 ) {
      var bound;
      fibsMonad.run([0, 1, e.target.value, []])
      .bnd(s => bound = Math.round(Math.sqrt(s[0])));
      if (bound > primesMonad.a[primesMonad.a.length - 1] ) {
        primesMonad.run([primesMonad.s[0], "from the fibKeyPress5$ handler", bound, primesMonad.a])
      }
      var res = fibsMonad
      .bnd(fibsState => fibsMonad                    // Gets the current state of fibsMonad
      .bnd(fpTransformer, primesMonad)               // Returnes the (possibly modified) state of primesMonad
      .bnd(primesState => tr3(fibsState[3],primesState[3])))  // Runs tr3 on fibsMonad.s and the new primesMonad
      document.getElementById('PF_9').innerHTML = res[0];     // res is the return value of tr3 (above)
      document.getElementById('PF_22').innerHTML = res[1];
      document.getElementById('primeFibs').innerHTML = res[2];
    }
  });  `  )

var fpTransformer = h('pre',  `  var fpTransformer = function fpTransformer (s, m) {
    let bound = Math.round(Math.sqrt(s[1]));
    if (bound <= m.a[m.a.length - 1]) {
      return m;
    }
    return m.run([m.s[0], "From fpTransformer", bound, m.a])
  }  `  )

var innerHTML = h('pre',  `  var innerHTML = function innerHTML (x, v, u, m) { 
    document.getElementById(u).innerHTML = v;
    return m.ret(x);
  }  `  )

var seed2 = h('pre',  ` 
             `  )





  export default {monad, monadIt, fib, driver, messages, next, Monad$, updateCalc, arrayFuncs, travel, nums, cleanup, ret, C42, taskStream, newTask, process, mM$task, addString, colorClick, edit, testZ, quad, mdem1, runTest, todoStream, inc, ret_add_cube, seed,  add, traverse, MonadState, primesMonad, fibsMonad, primeFibInterface, tr3, fpTransformer, innerHTML  }


