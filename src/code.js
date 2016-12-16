import {h, pre} from '@motorcycle/dom'; 

/*
import {subject} from 'most-subject'
var sub = subject
var observer = sub.observer;
var stream = sub.stream;
*/

var Monad = function Monad(z = 42, g = 'generic') {
  var _this = this;
  this.x = z;
  this.id = g;
  this.bnd = function (func, ...args) {
    var m = func(this.x, ...args)
    if (m instanceof Monad) {
      return window[this.id] = new Monad(m.x, this.id);
    }
    else return m;
  };
  this.ret = function (a) {
    return window[_this.id] = new Monad(a,_this.id);
  };
};

var monad = h('pre.turk6',  `    var Monad = function Monad(z = 42, g = 'generic') {
      this.x = z;
      this.id = g;
      this.bnd = function (func, ...args) {
        var m = func(this.x, ...args)
        var mon;
        if (m instanceof Monad) {
          mon = testPrefix(args,this.id); 
          return window[mon] = new Monad(m.x, mon);
        }
        else return m;
      };
      this.ret = function (a) {
        return window[_this.id] = new Monad(a,_this.id);
      };
    };  

    function testPrefix (x,y) {
      var t = y;
      var s;
      if (Array.isArray(x)) {
        x.some(v => {
          if (typeof v === 'string' && v.charAt() === 'M') {
             t = v.slice(1, v.length);
          }
        })
      }
      return t;
    }  `  )

const monadIt = h('pre', {style: {color: '#AFEEEE' }}, `  const MonadItter = () => {
    this.p = function () {};
    this.release = (...args) => this.p(...args);
    this.bnd = func => this.p = func;
  }; ` )

const ret = h('pre', {style: {color: '#AFEEEE' }}, `    function ret(v, id = 'default') {
      return window[id] = (new Monad(v, id));
    } ` )

var driver = h('pre', `  var websocketsDriver = function () {
      return create((add) => {
        socket.onmessage = msg => add(msg)
      })
  };
` )

var messages = h('pre', `  const messages$ = sources.WS.map( e => {
  mMtem.ret(e.data.split(',')).bnd( v => {
  console.log('<><><><><><><><><><><><><><><><>  INCOMING  <><><><><><><> >>> In messages. e amd v are ', e, v);
  mMZ10.bnd( () => {
    pMnums.ret([v[3], v[4], v[5], v[6]]).bnd(test3,"MpMstyle");
    travMonad.run([ [v[3], v[4], v[5], v[6]], v[7], v[8], [], 0 ]);
    pMscore.ret(v[7]);
    pMgoals.ret(v[8]) }); 
  mMZ12.bnd( () => mM6.ret(v[2] + ' successfully logged in.'));
  mMZ13.bnd( () => updateMessages(e.data));
  mMZ14.bnd( () => mMgoals2.ret('The winner is ' + v[2]));
  mMZ15.bnd( () => {
    mMgoals2.ret('A player named ' + v[2] + ' is currently logged in. Page will refresh in 4 seconds.')
    refresh() });
  mMZ17.bnd( () => testTask(v[2], v[3], e.data) ); 
  mMZ18.bnd( () => {
    if (pMgroup.x != 'solo' || pMname.x === v[2] ) updatePlayers(e.data)  });
  })       
  mMtemp.ret(e.data.split(',')[0])
  .bnd(next, 'CA#$42', mMZ10)
  .bnd(next, 'CD#$42', mMZ13)
  .bnd(next, 'CE#$42', mMZ14)
  .bnd(next, 'EE#$42', mMZ15)
  .bnd(next, 'DD#$42', mMZ17)
  .bnd(next, 'NN#$42', mMZ18)
  });  `  )

var MonadSet = h('pre',  `  var MonadSet = function MonadSet(set, ID) {
    this.s = set;
    this.bnd = (func, ...args) => func(this.s, ...args);  
    this.add = a => new MonadSet(s.add(a), this.id);
    this.delete = a => new MonadSet(s.delete(a), this.id);
    this.clear = () => new MonadSet(s.clear(), this.id);
  };  `  )

var nums = h('pre',  `    const numClick$ = sources.DOM
      .select('.num').events('click');
       
    const numClickAction$ = numClick$.map(e => {
      if (mM3.x.length < 2) {
        mM3.bnd(push, e.target.innerHTML, mM3)
        var ar = mMhistorymM1.x[mMindex.x].slice()
        ar.splice(e.target.id, 1)
        mM1.ret(ar);
        game(ar);
      }
      if (mM3.x.length === 2 && mM8.x !== 0) {
        console.log('7777777777777777777777777777  In numClickAction$ heading for updateCalc.  mM1.x is ', mM1.x);
        updateCalc();
      }
    }).startWith([0,0,0,0]);
      
    const opClick$ = sources.DOM
      .select('.op').events('click');
   
    const opClickAction$ = opClick$.map(e => {
      mM8.ret(e.target.textContent);
      if (mM3.x.length === 2) {
        updateCalc();
      }
    })
   
    var game = function game (z) {
      console.log('>>>>>>>>>>>>>>> game has been called. mMindex.x and z are ', mMindex.x, z);
      var x = z.slice();
      var onlinePlayers;
          mMindex.bnd(add, 1, mMindex).bnd(i => mMhistorymM1.bnd(spliceAdd, i, x, mMhistorymM1)
            .bnd(() => mMplayerArchive.bnd(spliceAdd, i, playerMonad.s, mMplayerArchive)) 
            .bnd(() => mMsetArchive.bnd(spliceAdd, i, sMplayers.s, mMsetArchive) ) 
            .bnd(() => console.log('In game. >>>>>>>>>>>>>>>>>>>>>>>>>> i is ', i))  )          
        document.getElementById('0').innerHTML = x[0];  
        document.getElementById('1').innerHTML = x[1];  
        document.getElementById('2').innerHTML = x[2];  
        document.getElementById('3').innerHTML = x[3]; 
        game2();
        cleanup();
    };
  
    var game2 = function game2 () {
        var ar = Array.from(sMplayers.s);
        document.getElementById('sb1').innerHTML = 'Name: ' +  pMname.x;
        document.getElementById('sb2').innerHTML = 'Group: ' + pMgroup.x
        document.getElementById('sb3').innerHTML = 'Score: ' + pMscore.x
        document.getElementById('sb4').innerHTML = 'Goals: ' + pMgoals.x
        document.getElementById('sb5').innerHTML = 'Currently online: ';
        document.getElementById('sb6').innerHTML =  ar.join(', ');
        cleanup();
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
        if (targetAr[i].innerHTML === 'undefined' )    {
          targetAr[i].style.display = 'none';
        }
        else {
          targetAr[i].style.display = 'inline';
        }
      }
      return ret(x);
  }; `  )

  var C42 = h('pre',  `  mMZ10.bnd(() => mM$1
     .ret([mMar.x[3], mMar.x[4], mMar.x[5], mMar.x[6]])
     .bnd(() => mM$2.ret([]))
     .bnd(displayInline,'0')
     .bnd(displayInline,'1')
     .bnd(displayInline,'2')
     .bnd(displayInline,'3'));  `  )

  var taskStream = h('pre',  `  
      `  )

  var deleteTask2 = h('pre',  `  mMZ19.bnd(() => mM$task.bnd(spliceRemove, mMar.x[3], mM$task));
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
      if( e.keyCode === 13 ) {
        if ( ar.length < 3 ) {
          alert = 'You should enter "author, responsible party, task" separated by commas';
          document.getElementById('alert').innerHTML = alert;
        }

        else if ( (mMar2.x.filter(v => (v.task === task)).length) > 0 ) {
          document.getElementById('alert').innerHTML = task + " is already listed.";
        }

        else if ( ar.length > 2 ) {
          mM$taskList.bnd(addString, task + ',yellow, none, false,' +  ar[0] + ',' + ar[1], mM$taskList);
          e.target.value = '';
          document.getElementById('alert').innerHTML = '';
        } 
      } 
  };  ` )

  var process = h('pre',  `  const process = function(str) {
    let a = str.split(",");
    console.log('In process. str and a are: ', str, a);
    if (a === undefined) {
      return;
    };
    if (a.length < 9) {
      return
    };
    let ob = {};
    let ar = a.slice(3)
    let s = ar.reduce((a,b) => a + ',' + b);
    if (mM$taskList.x.length < 5) {
      mM$taskList.ret(s);
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
    let s = mM$taskList.x;
    let ar = s.split(',');
    let n = 6 * index + 3;
    let j = 6 * index + 2;
    let k = 6 * index + 1;
    let checked = ar[n];
    if (checked === 'true')  {
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
      if (task === possibilities[k].innerText) {
        return k
      }
    }
    console.log('In getIndex. No match');
  }  `  )

  var edit = h('pre',  `  const edit1$ = sources.DOM
    .select('#edit1').events('click')
    
  const edit1Action$ = edit1$.map(e => {
    let index = getIndex2(e);
    mMtaskList.x[index].children[3].elm.style.display = 'block';
  });

  const edit2$ = sources.DOM
    .select('#edit2').events('keypress')
    
  const edit2Action$ = edit2$.map(e => {
    let v = e.target.value;
    let index = getIndex2(e);
    if( e.keyCode === 13 ) {
      process2(v, index);
    mMtaskList.x[index].children[3].elm.style.display = 'none';
    }
  });

  const process2 = function(str, index) {
    var a = mMcurrentList.x.split(',');
    a[6*index] = str;
    var b = a.reduce((a,b) => a + ',' + b)
    task2(b);  
  };

  var getIndex2 = function getIndex2 (e) {
    var elem = e.currentTarget.parentNode.children[0].innerHTML
    var elem2 = e.currentTarget.parentNode.parentNode.childNodes
    var keys = Object.keys(elem2);
    for (let k in keys) {
      if (elem === elem2[k].childNodes[0].innerHTML) {
        return k
      }
      console.log('In getIndex2. No match');
    }
  }  `  )

  var mM$task = h('pre',  `  const taskAction$ = mM$taskList.stream.map(str => {
    socket.send('TD#$42' + ',' + mMgroup.x.trim() + 
        ',' + mMname.x.trim() + ',' + '@' + str);
  });  `  )

  var updateCalc = h('pre',  `  function updateCalc() { 
    mM3.bnd(ar => mM7       // mM3 contributes mM3.x to the computation.
    .ret(calc(ar[0], mM8.x, ar[1]))      // mM8.x is the operator string.
    .bnd(result =>   // The return value of calc(), which is mM7.x, is used three times.
      {  mM1.bnd(push, result, mM1).bnd(z =>
         mM$1.ret(z));                         // Updates the display.             
        if (result === 20) {score(mM13.x, 1)}; 
        if (result === 18) {score(mM13.x, 3)};
      }
    )) 
    reset()
  };

  var score = function score(x,j) {
    socket.send('CA#$42,' + pMgroup.x + ',' + pMname.x + ',6,6,12,20');
    if ((x + j) === 20) {
      mMplayer.ret([]);
      mM13.ret(0).bnd(mMindex.ret);
      mMhistorymM1.ret([0,0,0,0]);   
      mMgoals.bnd(add, 1, mMgoals).bnd(v => {
        if (v === 3) {
          socket.send('CG#$42,' + pMgroup.x + ',' + pMname.x + ',' + -x + ',' + 0); 
          socket.send('CE#$42,' + pMgroup.x + ',' + pMname.x + ',nothing ')
          mMgoals.ret(0);
        }
        else socket.send('CG#$42,' + pMgroup.x + ',' + pMname.x + ',' + -x + ',' + v); 
      })
      return;
    }
    if ((x + j) % 5 === 0) {
      socket.send('CG#$42,' + pMgroup.x + ',' + pMname.x + ','+ (j+5)+',' + mMgoals.x); 
      mM13.ret(x + j + 5);
      return;
    } 
    socket.send('CG#$42,' + pMgroup.x + ',' + pMname.x + ','+ j + ',' + mMgoals.x); 
    mM13.ret(x + j);
 };

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


  var testZ = h('pre',  `  mMZ1.bnd(v => mMt1
  .bnd(add,v).bnd(w => {
    mMt1.ret(w)
    .bnd(cube)
    .bnd(x => mMt3VAL = w + ' cubed is ' + x)}));  
  
  mMZ2.bnd(v => cube(v)
  .bnd(w => mMt3VAL = v + ' cubed is ' + w));  `  )

  var quad = h('pre',  `  const quad$ = sources.DOM
    .select('#quad').events('keypress')  // Motorcycle way to get user input.
  
  const quadAction$ = quad$.map((e) => {
    if( e.keyCode === 13 ) {
      mMZ3.release(e.target.value)       // Releases mMZ (below).
      document.getElementById('quad').value = null;
    }
  });

  var solve = function solve () {
     mMZ3.bnd(a => {
     mMquad4.ret(''); 
     mMquad6.ret('');  
     mMquad5.ret(a + " * x * x ")    
     mMZ3.bnd(b => {
     mMquad6.ret(b + ' * x ')
     mMZ3.bnd(c => {
     mMtemp.ret([a,b,c])
    .bnd(fmap, qS4,'mMtemp2')
    .bnd(result => {  
      let x = result[0]
      let y = result[1]
      if (x === 0) {
        mMquad5.ret('No solution', mMtemp)
        mMquad6.ret(' ');
        solve(); 
        return;
      }
      if (y === 0) {
        mMquad5.ret('No solution')
        mMquad6.ret(' ')   
        solve(); 
        return;
      };
      mMquad4.ret("Results: " + x + " and  " + y)  
      mMquad5.ret(p(a).text + " * " + x + " * " + x + " + " + p(b).text + 
              " * " + x + " " + p(c).text + " = 0")
      mMquad6.ret(p(a).text + " * " + y + " * " + y + " + " + p(b).text + 
              " * " + y + " " + p(c).text + " = 0")   
      solve();  
      }) }) }) }) 
  };
  
  var p = function p (x) { 
    if (x >= 0) {return ' + ' + x}
    if (x < 0 ) {return ' - ' + Math.abs(x)}
  }

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
  
  function fmap(x, g, id) { 
    var mon = new Monad(g(x), id); 
    window[id] = mon;
    return mon;
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
    socket.send('TD#$42' + ',' + mMgroup.x.trim() + 
        ',' + mMname.x.trim() + ',' + '@' + str);
  });  `  )

var add = h('pre',  `  var add = function(x,b,mon) {
    if (arguments.length === 3) {
      return mon.ret(x + b);
    }
    return ret(x+b);  
  }; ` )
  
var seed = h('pre',  `  mM$prime.ret([[2],3])  `  )

var MonadState = h('pre',  `    function MonadState(g, state, p) {
      this.id = g;
      this.s = state;
      this.process = p;
      this.a = s[3];
      this.bnd = (func, ...args) => func(this.s, ...args);  
      this.run = ar => { 
        var ar2 = this.process(ar);
        this.s = ar2;
        this.a = ar2[3];
        window[this.id] = this;
        return window[this.id];
      }
    };  `  )

var primesMonad = h('pre',  `    var primesMonad = new MonadState('primesMonad', [2, '', 3, [2]], [2],  primes_state) 

    var primes_state = function primes_state(x) {
      var v = x.slice();
      console.log('In script2.js >>> primes_state v is ', v );
      while (2 == 2) {
          if ( v[3].every(e =>  (v[0] / e) != Math.floor(v[0] / e)) ) {
              v[3].push(v[0]);
          }
          if (v[3][v[3].length - 1] > v[2]) {
             return v; 
          };
          v[0] += 2;
      }
    }  `  )

var fibsMonad = h('pre',  `  var primesMonad = new MonadState('primesMonad', [3, '', 3, [2,3]], primes_state);


  var fibs_state = function fibs_state(ar) {
    var a = ar.slice();
    while (a[3].length < a[2]) {
      a = [a[1], a[0] + a[1], a[2], a[3].concat(a[0])];
    }
    return a
  }  `  )

var tr3 = h('pre',  `  var tr3 = function tr (fibsArray, primesArray) {
    var bound = Math.ceil(Math.sqrt(fibsArray[fibsArray.length - 1]))
    var primes = primesArray.slice();
    if (primesArray.slice(-1)[0] >= bound) {
      primes = primesArray.filter(v => v <= bound);
    } 
    var ar = [];
    var fibs = fibsArray.slice(3);
    fibs.map (v => {
      if (primesArray.every(p => (v % p || v === p))) ar.push(v);
    })
    return [fibsArray, primes, ar]
  }  `  )

  var primeFibInterface = h('pre',  `    const fibKeyPress5$ = sources.DOM
      .select('input#fib92').events('keyup');

    var primeFib$ = fibKeyPress5$.map(e => {
      workerB.postMessage(e.target.value)
    });

    const workerB$ = sources.WWB.map(m => {
      console.log('In workerB$ stream in the main thread. m is ', m );
      mMres.ret(m.data)
      .bnd(v => mM36.ret('Asynchronous addendum. The largest computed ' +
        'prime Fibonacci number is ' + v[2].split(',')[v[2].split(',').length - 1]), 'MmM36')
      primesMonad.s = JSON.parse(JSON.stringify(primesMonad.s));
      primesMonad.a = JSON.parse(JSON.stringify(primesMonad.a));
      primesMonad.s = m.data[3];
      primesMonad.a = m.data[3][3];
    });  `  )

  var fpTransformer = h('pre',  `  var fpTransformer = function fpTransformer (s, m) {
      var bound = Math.ceil(Math.sqrt(s[3][s[3].length - 1]));
      if (bound > m.a[m.a.length - 1] ) {
        m.run([m.s[0], "from the fibKeyPress5$ handler", bound, primesMonad.a])
      }
      return m;
    }  `  )

  var factorsMonad = h('pre',  `  var factorsMonad = new MonadState('factorsMonad', [[], [], 2, []], factor_state);
    
    function factor_state(v) {
      v[3].map(function (p) {
        if (v[2] / p === Math.floor(v[2] / p)) {
            v[0].push(p);
        }
      });
      return v;
    }  `  )

  var factorsInput = h('pre',  `  var factorsPress$ = sources.DOM
        .select('input#factors_1').events('keydown');

    var factorsAction$ = factorsPress$.map(function (e) {
      var factors = [];
      mMfactors3.ret('');
      if (e.keyCode === 13) {
        var num = e.target.value
        if (!num.match(/^[0-9]+$/)) {
          mMfactors3.ret('This works only if you enter a number. ' + num + ' is not a number');
        }
        else {
          factors = primesMonad.run([primesMonad.s[0], [], num, primesMonad.a])
          .bnd(s => prFactTransformer3(s, num));
          mMfactors.ret("The prime factors of " + num + " are " + factors.join(', '));
        }
      }
    });  `  )

  var playerMonad = h('pre',  `  var playerMonad = new MonadState('playerMonad', [0,0], [0,0], player_state);

    function player_state (v) {
      var x = v.slice();
      let ar = [ 
      pMscore.ret(x[0]),
      pMgoals.ret(x[1]) ]
      playerMonad.a = ar;
      playerMonad.s = ar;  
      return x; 
    };  `  )

  var MonadSet = h('pre',  `    var MonadSet = function MonadSet(set, str) {
        var this = this;
        this.id = str;
        this.s = new Set();  
    };

    var s = new Set();

    var sMplayers = MonadSet(s, 'sMplayers'); // holds currently online players  `  );

  var promise = h('pre',  `      var promise = function promise(x, t, mon, args) {
          return (new Promise((resolve) => {
            setTimeout(function() {
              resolve(eval("mon.ret(x).bnd(" + args + ")"))   // eval! Get over it, Douglas.
            },t*1000  );
          }));
        };  `  )

  var promiseSnippet = h('pre',  `  m.ret(3).bnd(promise, 2, m, "cube").then(data => m.ret(data.x).bnd(add, 15, m))  `  )

  var timeoutSnippet = h('pre',  `  const timeoutClicks$ = sources.DOM.select('#timeout').events('click')
      const timeoutAction$ = timeoutClicks$.map(() => {
        document.getElementById('timeout2').innerHTML = ''
        document.getElementById('timeout3').innerHTML = ''
        m.ret(3).bnd(m.ret)
          .bnd(display, 'timeout2', 'm) is ' + ' ' + m)).bnd(m.ret)
          .bnd(timeout2, 1, m, [() => m
          .bnd(cube).bnd(m.ret)
          .bnd(display, 'timeout2', 'm) is ' + ' ' + m)).bnd(m.ret)
          .bnd(timeout2, 2, m, [() => m
          .bnd(add, 15).bnd(m.ret)
          .bnd(display, 'timeout2',  'm) is ' + ' ' + m)).bnd(m.ret)
          .bnd(display, 'timeout3', 'The meaning of everything was computed to be' + ' ' + m))   
        ])]);  
      });  
    });  `  )

  var timeout = h('pre',  `  var timeout2 = function timeout (x, t, m, args) {
      setTimeout(function () {
        mMZ9.release();
      }, t * 1000  );
      return mMZ9.bnd(() => m.bnd(... args))
    };  `  )

  var examples = h('pre',  ` 
               ret('m1Val','m1')
               m1.x === 'm1Val'   // true
               ret('m2Val', 'm2')
               m2.x === 'm2Val'   // true

               m1.bnd(m2.ret)
               m2.x === 'm1Val' // true
               m2.x === 'm2Val'   // still true

               m1.ret('newVal')
               m1.bnd(v => ret(v, 'm2'))
               m2.x === 'newVal'  // true
               m2.x === 'm1Val' // true   still the same  `   )

  var examples2 = h('pre',  ` 
    var m = new Monad(v, "m");
    ret(v, "m");
               `  )

    var async = h('pre',  `  const LOCKED = ret(true, 'LOCKED');
    LOCKED.ret(true);   // Creates LOCKED

    const messages2$ = (sources.WS).map(e => {
      if (!LOCKED.x) {
        var v2 = e.data.split(',');
        ret(v2.slice(3))
        .bnd(v => mMtemp.bnd(display,'request2', 'The current online members of ' + pMgroup.x + ' are:')
        .bnd(() => mMtemp.bnd(display,'request3', v) 
        .bnd(() => mMtemp.bnd(log, "The members are " + v )
        .bnd(() => LOCKED.ret(true)))))
      }
    });

    const requestClicks$ = sources.DOM.select('#request').events('click');

    const requestAction$ = requestClicks$.map(() => {
      if (pMgroup.x != 'solo') {         // The default non-group
        LOCKED.ret(false);
        socket.send('NN#$42,' + pMgroup.x  + ',' + pMname.x + ',' + pMgroup ); 
      }
    });

    var display = function display (x, id, string) {
      document.getElementById(id).innerHTML = string;
      return ret(x);
    }  `  )

  var e1 = h('pre.turk',  `  function ret(v, id = 'generic') {
      window[id] = new Monad(v, id);
      return window[id];
    }

    function cube (v, id) {
      return ret(v * v * v);
    };

    function add (x, b) {
      return ret(parseInt(x,10) + parseInt(b,10) );
    };

    function log(x,y) {
        console.log(y)
        return ret(x);
    };  `  )

  var e2 = h('pre.turk',  `  var c = m.ret(0).bnd(add,3).bnd(cube).bnd(log, "The values of m\'s and c\'s 
    x attributes are " + m.x + " and " + c.x + " respectively." )   ` )   

  var e2x = h('pre', `   Output: The values of m\'s and c\'s x attributes are 0 and 27 respectively.  ` )

     var e3 = h('p',  ' Note: m\'s x attribute keeps its initial value of 0 because each computation creates a fresh instance of Monad with id === "default". In the next example, m\'s x attribute becomes the computation result due to the addition of ".bnd(m.ret)". '  )   
    
   var e4 = h('pre.turk',  `  var c = m.ret(0).bnd(add,3).bnd(cube).bnd(m.ret).bnd(log, 
     "The values m\'s and c\'s x attributes are " + m.x + " and " + c.x + " respectively.") ` )

   var e4x = h('pre', `   Output: The values of m\'s and c\'s x attributes are 27 and 27 respectively.  ` )

   var e6 = h('pre.turk',  `  m.ret(0).bnd(add,3).bnd(m2.ret).bnd(cube,m3).bnd(m3.ret)
    .bnd(log,"m), m2.x, and m3.x are  " + m.x + ", " + m2.x + " and " + 
    m3.x + " respectively. "); ` )
  var e6x = h('pre', `   Output: m.x and m2.x and m3) are  0, 3 and 27 respectively.  ` )

  var equals = h('pre',  `    var equals = function equals (mon1, mon2) {
        if (mon1.id === mon2.id && mon1) === mon2)) return true;
        else return false
      }  `  )

  var fmap = h('pre',  `    function fmap (x, g, id) {window[id] = new Monad(g(x), id); return window[id]}
    
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
      }
    
      var qS4 = function qS4 ([x,y,z]) {
        let [a,b,c] = [x,y,z]
        return [qS1(a,b,c), qS2(a,b,c)]    
      }  
      
      m.ret([12,12,-144])
    
      m.bnd(fmap, qS4, "temp").bnd(lg)   logs [3, -4] `  )

  var opM = h('pre',  `    function opM (a, op, b, id) {
        window[id] = new Monad(eval(a.x + op + b.x), id); 
        return window[id];
      }  
      
      m1.ret(42)

      m2.ret(7)

      opM(m1, "%", m2, "ok").bnd(lg)  logs 0

      opM(m1, "+", m2, "ok").bnd(lg)  logs 49  `  )

  var a = 'acorn'

  var messageMonad = h('pre',  `    var messageMonad = new MonadState('messageMonad', messages, messages, message_state); 

      function message_state(v) {
        var ar = v[0].concat(v[3]);
        return [ v[0], [], [], ar ];
      };  `  )

  var updateMessages = h('pre',  `    var updateMessages = function updateMessages(e) {
          var ar = e.split(',');
          var sender = ar[2];
          ar.splice(0,3);
          var str = ar.join(',');
          messageMonad.run([ [h('br'), sender + ': ' + str], [], [], messageMonad.s[3] ]);
      }  ;  `  )

  var travMonad = h('pre',  `  var travMonad = new MonadState("travMonad", [[8,8,8,8], 0, 0, [ [ [], 0, 0 ] ] ], trav_state)
    
    function trav_state (ar) {
      pMindex.bnd(add,1).bnd(pMindex.ret);
      var nums = ar[0];
      var score = ar[1];
      var goals = ar[2];
      var next = travMonad.s.slice();
      var ar = [nums, score, goals];
      next[0] = nums;
      next[1] = score;
      next[2] = goals;
      next[3].splice( pMindex.x, 0, ar );
      return next;         // This results in travMonad.s === next.
    }  `  )



  var test3 = h('pre',  `  function test3 (a) {
      var b = [];
      for (let i of [0,1,2,3]) {
        b[i] = (a[i] === undefined) ? 'none' : 'inline'
      }
      return ret(b);
    }  
    
    pMnums.bnd(test3).bnd(pMstyle.ret);  `  )

  var mMZ10 = h('pre',  `  mMZ10.bnd( () => {
      pMnums.ret([v[3], v[4], v[5], v[6]]).bnd(test3).bnd(pMstyle.ret)
      travMonad.run([ [v[3], v[4], v[5], v[6]], v[7], v[8] ]);
      pMscore.ret(v[7]);
      pMgoals.ret(v[8]) });  `  )

  var numClick1 = h('pre.blue',  `  var numClick$ = sources.DOM
        .select('.num').events('click'); 

    var numClickAction$ = numClick$.map(e => {
      console.log('In numClickAction. @@@@@@@@@@@@@@@@@@@@@@@@ e.target.id, e, and pMnums are ', e.target.id, e, pMnums.x );
      if (pMclicked.x.length === 2) {return};
      pMnums.bnd(spliceM, e.target.id, 1)
      .bnd(v => {
        test3(v, 'MpMstyle')
        socket.send(\`CG#$42,\${pMgroup.x},\${pMname.x},\${pMscore.x},\${pMgoals.x}\`);
        pMclicked
        .bnd(push, e.target.innerHTML)
        .bnd(pMclicked.ret)
        .bnd(w => {
          travMonad.run([v, pMscore.x, pMgoals.x, w, pMop.x])
          if (w.length === 2 && pMop.x != 0) {
            console.log('In numClickAction# if block >>>>>> @@@@@@@@@@@@@@@@@@@@@@ ' );
            updateCalc(w, pMop.x) 
          }
        })
      })
    }).startWith([0, 0, 0, 0]);

    var opClick$ = sources.DOM
        .select('.op').events('click');

    var opClickAction$ = opClick$.map(e => {
      pMop.ret(e.target.innerHTML).bnd(v => { 
        var ar = pMclicked.x
        if (ar.length === 2) {
          updateCalc(ar, v)
        }
      }) 
    });  `  )

  var numClick2 = h('pre.blue',  `  function updateCalc(ar, op) {
      var result = calc(ar[0], op, ar[1]);
      mM3.ret([]);
      mM8.ret(0)
      if (result === 20) { 
        pMscore.bnd(add,1)
        .bnd(testscore)
        .bnd(pMscore.ret)
        .bnd(v => score(v));
        return; 
      } 
      else if (result === 18) { 
        pMscore.bnd(add,3)
        .bnd(testscore)
        .bnd(pMscore.ret)
        .bnd(v => score(v));
        return; 
      }

      else {
        pMnums.bnd(push,result)
        .bnd(v => {
          travMonad.run([v, pMscore.x, pMgoals.x, [], 0])
          test3(v, 'MpMstyle')
        }); 
      }
    };  

    var testscore = function testscore(v) {
      if ((v % 5) === 0) return ret(v+5)
      else return ret(v);
    };

    function score(scor) {
      if (scor != 25) {
        newRoll(scor, pMgoals.x)
      }
      else if (pMgoals.x === 2) {
        socket.send(\`CE#$42,${pMgroup.x},${pMname.x}\`);
        newRoll(0,0)
      }
      else {pMgoals.bnd(add, 1).bnd(pMgoals.ret).bnd(g => newRoll(0, g))};
    };  `  )

  var test10_11 = h('pre.turk5',  `    function test10 () {
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
      }  `  )

  var monadArchive2 = h('pre.blue',  `    function MonadArchive(g, state, p) {
        this.id = g;
        this.s = state;
        this.process = p;
        this.a = s[0];
        this.bnd = (func, ...args) => func(this.s, ...args);  
        this.run = ar => { 
          var ar2 = this.process(ar);
          this.a = ar2[pMindex.x];
          this.s = ar2;
          console.log('In MonadState instance this.a, this.s ', this.a, this.s) 
          window[this.id] = this;
          return window[this.id];
        }
      };

      var travMonad = new MonadArchive("travMonad", [ [ [ 0,0,0,0 ], 0, 0, [], 0 ] ] , trav_archive)
      
      function trav_archive (ar) {
        var ind = pMindex.x + 1;
        pMindex.ret(ind);
        pMnums.ret(ar[0]);
        pMscore.ret(ar[1]);
        pMgoals.ret(ar[2]);
        ar[3] = (typeof ar[3] === "undefined") ? pMclicked.x : ar[3]
        ar[4] = (typeof ar[4] === "undefined") ? pMop.x : ar[4]
        pMclicked.ret(ar[3]);
        pMop.ret(ar[4]); 
        var next = travMonad.s.slice();
        next.splice( ind, 0, ar );
        return next;                // The new value of travMonad.s.
      }  `  )

  var backAction = h('pre',  `  
      var backAction$ = backClick$.map(() => {
        if (pMindex.x > 1) {   
          pMop.ret(0);
          var ind = pMindex.x - 1;
          var s = travMonad.s[ind];
          pMnums.ret(s[0]).bnd(test3, 'MpMstyle');
          pMscore.ret(s[1]);
          pMgoals.ret(s[2]);
          pMclicked.ret(s[3]);
          pMop.ret(s[4]);
          socket.send(\`CG#$42,${pMgroup.x},${pMname.x},${pMscore.x},${pMgoals.x}\`);
        pMindex.bnd(add,-1);
        } 
      });    `  )

  var monadEr = h('pre.red9',  `    function MonadEr (val, ID, er = []) {
          var test;
          var arr = arr = [];
          this.x = val;
          this.e = er;
          this.id = ID;
          this.getx = function getx (x) {return this.x};
          this.bnd = function (f, ...args) {
            var args = args;
            if (f === 'clean3' || f === clean3) {
              this.e = [];
              window[this.id] = new MonadEr(this.x, this.id, []);
              return window[this.id];
            }
          if (this.e.length > 0) {
            console.log('BYPASSING COMPUTATION in MonadEr instance', this.id, f, '.  PROPAGATING ERROR:',  this.e[0]); 
            return this;  
          }
          
          if (args.length > 0) {
            arr = args.filter(v => !(typeof v === 'string' && v.charAt() === 'M' && v.slice(0,4) !== 'Math'))
              
            arr.map(v => {
              test = testP(v, this.id)
              if (test === 'STOP') {
                console.log('\"STOP\" returned from testP. Ending code execution in ',this.id, '.' ) 
                this.e.push('STOP');
                return this;
              } 
            }); 
          }
          if (test !== "STOP") {
          try {
            var testId = testPrefix(args, this.id);  
            var ar = arr.map(v => eval(v))
            var m = eval(f)(this.x, ...ar)  
            var id = testPrefix(ar, this.id);
            window[testId] = new MonadEr(m.x, testId, []);
            return window[testId];
            }      
            catch(error) {
              this.e.push('STOP -- Execution Aborted. ');
              console.log(f, 'ERROR in ',id,error,' No further computations will be attempted');
              return this;
            } 
          }
          else {
            this.e.push('STOP -- Execution Aborted. ');
            console.log(f, 'ERROR "STOP" returned from testP. No further computations will be attempted');
            return this;
          }  
        }
        this.ret = function (a) {
          window[this.id] = new MonadEr(a, this.id, []);
          return window[this.id];
        }  
      };

    function testPrefix (x,y) {
      var t = y;
      var s;
      if (Array.isArray(x)) {
        x.some(v => {
          if (typeof v === 'string' && v.charAt() === 'M') {
             t = v.slice(1);
          }
        })
      }
      return t;
    }
    
    function testP (x,id) {
        if ( eval('typeof ' + x) === 'undefined') {
          console.log(\`............... ERROR parameter \${x} is not defined\`);
          window[id].e = [\`\${x} is not defined\`]
          return 'STOP';
        }
        if (eval(x) !== eval(x)) {
          console.log(\`............... ERROR parameter \${x} is not a number\`);
          window[id].e = [\`\${x} is not a number\`]; 
          return 'STOP';
        } 
        mMZ12.release([]);
        return []  
    }
    
    function ret3(v, id = 'generic') {
        window[id] = new MonadEr(v, id, []);
        return window[id];
      }
    
    function add3(x, y) {
        return ret3(x*1 + y*1);
      }
    
    function cube3(x) {
        return ret3(x*x*x);
    }
    
    function clean3 (x, id) {
      window[id] = new MonadEr(x, id, []);
      return window[id];
    }    `  )

var errorDemo = h('pre.turk5',  `    var t = new MonadEr(0,'t', []);
    var t2 = new MonadEr(0,'t2', []);
    var t3 = new MonadEr(0,'t3', []);
    console.log('Values of t, t2, and t3', t.x,t2.x,t3.x)
    console.log("executing t.bnd(\'add3\',3,\'Mt2\').bnd(cube3, \'Mt3\') ");
    t.bnd('add3',3,'Mt2').bnd(cube3, 'Mt3')
    console.log('Values of t, t2, and t3', t.x,t2.x,t3.x)
    var t = new MonadEr(0,'t', []);
    var t2 = new MonadEr(0,'t2', []);
    var t3 = new MonadEr(0,'t3', []); 
    console.log('Values of t, t2, and t3', t.x,t2.x,t3.x)
    
    console.log("executing t.bnd('add3','three', 'Mt2').bnd(cube3, 'Mt3') " );
    t.bnd('add3','three','Mt2').bnd(cube3, 'Mt3')
    console.log('Values of t, t2, and t3', t.x,t2.x,t3.x)
    
    console.log( 't.bnd(clean3)' );
    t.bnd(clean3);
    
    console.log("executing t.bnd('add3', 'Math.sqrt(-1)', 'Mt2').bnd(cube3, 'Mt3') " );
    t.bnd('add3','Math.sqrt(-1)','Mt2').bnd(cube3, 'Mt3')
    console.log('Values of t, t2, and t3', t.x,t2.x,t3.x)
    console.log( 't.bnd(clean3)' );
    t.bnd(clean3);
    console.log("executing t.bnd(\'addd3\',3,\'Mt2\').bnd(cube3, \'Mt3\') ");
    t.bnd('addd3',3,'Mt2').bnd(cube3, 'Mt3')
    console.log('Values of t, t2, and t3', t.x,t2.x,t3.x)    `  )

var tests = h('pre',  `    function atest () {
      ret(2,'a')
      .bnd(add,1)
      a.bnd(v => ret(v*100,'b'))
      .bnd(v2 => ret(v2*v2,'c')
      .bnd(v3 => ret(4,'d')
      .bnd(v4 => ret(v4*100))
      .bnd(v5 => ret(v5*v5,'e')
      .bnd(v6 => ret(Math.sqrt(v6+v3),'f')
      .bnd(v7 => console.log('The square root of the sum of',v2,'and',v5,'is', v7,'.'))))))
      return [a,b,c,d,e,f]  
    }

    console.log('// Now setting a, b, c, d, e and f to 7 and logging a.x, b.x, c.x, d.x, e.x, and f.x.)');
    ret(7,'a');ret(7,'b');ret(7,'c');ret(7,'d');ret(7,'e');ret(7,'f');  
    console.log(a.x, b.x, c.x, d.x, e.x,f.x)
    console.log('// Now running atest and making demoAr a reference to its return value. ');
    demoAr = atest();
    console.log('// Now logging a.x, b.x, c.x, d.x, e.x, and f.x.');
    console.log(a.x, b.x, c.x, d.x, e.x,f.x)
    console.log('// Now logging demoAr.map(v => v.x).join(", ").');
    console.log(demoAr.map(v => v.x).join(', '));
    console.log('// Now setting a, b, c, d, e and f to 6 and logging a.x, b.x, c.x, d.x, e.x, and f.x.)');
    ret(6,'a');ret(6,'b');ret(6,'c');ret(6,'d');ret(6,'e');ret(6,'f');  
    console.log(a.x, b.x, c.x, d.x, e.x,f.x)
    console.log('// Now logging demoAr.map(v => v.x).join(", ").');
    console.log(demoAr.map(v => v.x).join(', '));
    console.log('// The monads in DemoAr were not mutated or replaced when monads with the same ' );
    console.log('// names (a, b, c, d, and e) updated to 6, 6, 6, 6, 6, 6 by using their bnd() methods. '); 
    }  `  )

var wDriver = h('pre.green2',  `  const workerA = new Worker("worker.js");

  const workerDriver = function () {
    return create((add) => workerA.onmessage = msg => add(msg))
  }  `  )


var worker$ = h('pre.green2',  `  
    const worker$ = sources.WK.map(v => {
      v.preventDefault();
      console.log('In worker$  v is ', v );
      mMZ21.bnd(() => {
        mM11.ret(v.data[1]);
        }); 
      mMZ22.bnd(() => {
        mM12.ret(v.data[1])
      }); 
      mMZ23.bnd(() => {
        mM13.ret(v.data[1])
      }); 
      mMZ24.bnd(() => {
        mM14.ret(v.data[1])
      }); 
      mMZ25.bnd(() => {
        primesMonad.s = v.data[1];
        primesMonad.a = v.data[1][3];
        console.log('Prime number', primesMonad.a.length,'is', primesMonad.s[0] )
      });
      next(v.data[0], 'CA#$41', mMZ21)
      next(v.data[0], 'CB#$41', mMZ22)
      next(v.data[0], 'CC#$41', mMZ23)
      next(v.data[0], 'CD#$41', mMZ24)
      next(v.data[0], 'CE#$41', mMZ25)
    });   `  )

var workerPrimeFibs_2 = h('pre.red0',  `    const workerDriverB = function () {
      return create((add) => workerB.onmessage = msg => add(msg))   
    }    `  )

var workerPrimeFibsjs = h('pre.green2',  `    onmessage = function(m) {
    var ar = m.data;
    importScripts('script2.js');
  
    var result = fibsMonad.run([1, 2 , ar[0], [0,1]])
    .bnd(fpTransformer, ar[1])
    postMessage(result);    `  )

var workerFactors_2 = h('pre',  `    const workerDriverC = function () {
      return create((add) => workerC.onmessage = msg => add(msg));
    ;}

    const workerC$ = sources.WWC.map(m => {
      mMfactors.ret(m.data[0]);
      primesMonad.s = m.data[1];
      primesMonad.a = m.data[1][3];
    });    `  )

var workerFactorsjs = h('pre',  `  
onmessage = function(m) {
  
  console.log('In workerC.js m.data is ', m.data );
  importScripts('script2.js');

  primesMonad.run([primesMonad.s[0], [], m.data, primesMonad.s[3]])
  .bnd(s => prFactTransformer3(s, m.data)
  .bnd(factors => postMessage(["The prime factors of " + m.data + " are " + factors.join(', '), s])));
 } 
`  )

var worker_js = h('pre',  ` onmessage = function(v) {
  
    importScripts('script2.js');
  
    if(Array.isArray(v.data) && v.data.length === 4) {
      postMessage(["CE#$41", primesMonad.run(v.data).s])
    }
  
    if (v.data.length === 2 && typeof v.data[0] === 'string' && typeof v.data[1] === 'string') {
      function lcm (c,d) {
        console.log('In worker.js c, d ', c, d );
        var ar= [];
        var r;
        d.map(v => {
          if (c.some(x => x === v)) {
            ar.push(v)
            c.splice(c.indexOf(v),1)
            d.splice(d.indexOf(v),1)}
            r = ar.concat(d).concat(c).reduce(function (a,b) {return a*b})
          }
        )
        return r
      }
    
      var a = v.data[0];
      var b = v.data[1];
      var r = Math.sqrt(a*a + b*b);
      console.log('In worker.js a,b',a,b )
      postMessage(["CA#$41", r]); 
      postMessage(["CB#$41", parseInt(a,10) + parseInt(b,10)]); 
      postMessage(["CC#$41", a * b]); 
      postMessage(["CD#$41", lcm(factors(a).x, factors(b).x)]);
    };  `  )

var primes_state = h('pre',  `    function primes_state(x) {
      console.log('Entering primes_state. x is', x );
      var v = x.slice();
      while (2 == 2) {
          if ( v[3].every(e =>  (v[0] / e) != Math.floor(v[0] / e)) ) {
              v[3].push(v[0]);
          }
          if (v[3][v[3].length - 1] > v[2]) {
             console.log('Leaving primes_state. x is', x );
             return v; 
          };
          v[0] += 2;
      }
    };    `  )

var p3 = h('pre',  `  
`  )

var p4 = h('pre',  `  
`  )

var p8 = h('pre',  `  
`  )

var p9 = h('pre',  `  
`  )



  export default { primes_state, workerPrimeFibsjs, workerPrimeFibs_2, workerFactors_2, workerFactorsjs, worker_js, worker$, errorDemo, monadEr, backAction, monadArchive2, tests, numClick1, numClick2, mMZ10, test3, travMonad, monad, equals, fmap, opM, e1, e2, e2x, e3, e4, e4x, e6, e6x, driver, messages, monadIt, MonadSet, updateCalc, arrayFuncs, nums, cleanup, ret, C42, newTask, process, mM$task, colorClick, edit, testZ, quad, runTest, todoStream, inc, seed,  add, MonadState, primesMonad, fibsMonad, primeFibInterface, tr3, fpTransformer, factorsMonad, factorsInput, playerMonad, promise, promiseSnippet, timeout, timeoutSnippet, examples, examples2, async }
 





