import {h, pre} from '@cycle/dom'; 

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
        'prime Fibonacci number is ' + v[2].split(',')[v[2].split(',').length - 1]), '$mM36')
      primesMonad.s = JSON.parse(JSON.stringify(primesMonad.s));
      primesMonad.a = JSON.parse(JSON.stringify(primesMonad.a));
      primesMonad.s = m.data[3];
      primesMonad.a = m.data[3][3];
    });  `  )

  var fpTransformer = h('pre',  `    var fpTransformer = function fpTransformer(x, s) {
      var a = Math.ceil(Math.sqrt(x[3].slice(-1)[0]));
      var m = primesMonad.run([s,a]);
      var ar = [];
      x[3].map(function (v) {
        if (m.s[3].filter(x => x <= v).every(function (p) { return (v % p || v == p); }))
          ar.push(v);
      });
      return [x[3].join(', '), m.s[3].slice(-1).pop(), ar.join(', '), m.s];
    };   `  )

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
        test3(v, '$pMstyle')
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
          test3(v, '$pMstyle')
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
      else if (pMgoals.x === "2") {
        socket.send(\`CE#$42,${pMgroup.x},${pMname.x}\`);
        newRoll(0,0)
      }
      else {pMgoals.bnd(add, 1).bnd(pMgoals.ret).bnd(g => newRoll(0, g))};
    };  `  )

  var test10_11 = h('pre.turk5',  `    function test10 () {
        m.ret(4).bnd(mult,100,'$m1')
        .bnd(square,'$m2')
        .bnd(add,-m2.x + 3,'$m3')
        .bnd(mult,100,'$m4')
        .bnd(square,'$m5')
        .bnd(add,m2.x,'$m6') 
        .bnd(sqroot,'$m7')
        .bnd(() => { 
          mMar10.ret([m, m1, m2, m3, m4, m5, m6, m7]);
          console.log('The square root of the sum of ', m1.x,
            ' squared and ', m4.x, ' squared is ', m7.x); });
        return mMar10;
      }  
      
      function test11 () {
        m.ret(4).bnd(mult,100,'$m1')
        .bnd(square,'$m2')
        .bnd(add,-m2.x + 3,'$m3')
        .bnd(mult,100,'$m4')
        .bnd(square,'$m5')
        .bnd(add,m2.x,'$m6') 
        .bnd(sqroot,'$m7').bnd(m.ret)
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
          pMnums.ret(s[0]).bnd(test3, '$pMstyle');
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
            arr = args.filter(v => !(typeof v === 'string' && v.charAt() === '$' && v.slice(0,4) !== 'Math'))
              
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
          if (typeof v === 'string' && v.charAt() === '$') {
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
    console.log("executing t.bnd(\'add3\',3,\'$t2\').bnd(cube3, \'$t3\') ");
    t.bnd('add3',3,'$t2').bnd(cube3, '$t3')
    console.log('Values of t, t2, and t3', t.x,t2.x,t3.x)
    var t = new MonadEr(0,'t', []);
    var t2 = new MonadEr(0,'t2', []);
    var t3 = new MonadEr(0,'t3', []); 
    console.log('Values of t, t2, and t3', t.x,t2.x,t3.x)
    
    console.log("executing t.bnd('add3','three', '$t2').bnd(cube3, '$t3') " );
    t.bnd('add3','three','$t2').bnd(cube3, '$t3')
    console.log('Values of t, t2, and t3', t.x,t2.x,t3.x)
    
    console.log( 't.bnd(clean3)' );
    t.bnd(clean3);
    
    console.log("executing t.bnd('add3', 'Math.sqrt(-1)', '$t2').bnd(cube3, '$t3') " );
    t.bnd('add3','Math.sqrt(-1)','$t2').bnd(cube3, '$t3')
    console.log('Values of t, t2, and t3', t.x,t2.x,t3.x)
    console.log( 't.bnd(clean3)' );
    t.bnd(clean3);
    console.log("executing t.bnd(\'addd3\',3,\'$t2\').bnd(cube3, \'$t3\') ");
    t.bnd('addd3',3,'$t2').bnd(cube3, '$t3')
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

var wDriver = h('pre.green2',  `    var worker = new Worker("worker.js");

    function workerDriver () {
      return xs.create({
        start: listener => { worker.onmessage = msg => listener.next(msg)}, 
        stop: () => { worker.terminate() }
      });
    };  `  )


var worker$ = h('pre.green2',  `    const worker$ = sources.WW.map(v => {
      console.log('$essage from worker: ', v );
      v.preventDefault();
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
        window['primesMonad'] = new MonadState('primesMonad', v.data[1], primes_state);
      });
      next(v.data[0], 'CA#$41', mMZ21)
      next(v.data[0], 'CB#$41', mMZ22)
      next(v.data[0], 'CC#$41', mMZ23)
      next(v.data[0], 'CD#$41', mMZ24)
      next(v.data[0], 'CE#$41', mMZ25)
    });   `  )

var workerB_Driver = h('pre.red0',  `    function workerBDriver () {
      return xs.create({
        start: listener => { workerB.onmessage = msg => listener.next(msg)}, 
        stop: () => { workerB.terminate() }
      });
    };    `  )

var workerB = h('pre.green2',  `    var workerB = new Worker("workerB.js"); // In the main thread.

    onmessage = function(m) {
      var ar = m.data;
      importScripts('script2.js');
      var x = Date.now();
    
      var result = fibsMonad.run([1, 2 , ar[2], [0,1]])
      .bnd(fpTransformer, ar[1]);     // See below
      var y = Date.now() - x;
      result.push(y);  
      postMessage(result);
    };    
  
    var fpTransformer = function fpTransformer(x, s) {
      var a = Math.ceil(Math.sqrt(x[3].slice(-1)[0]));
      var m = primesMonad.run([s,a]);
      var ar = [];
      x[3].map(function (v) {
        if (m.s[3].filter(x => x <= v).every(function (p) { return (v % p || v == p); }))
          ar.push(v);
      });
      return [x[3].join(', '), m.s[3].slice(-1).pop(), ar.join(', '), m.s];
    };   `  )

var primes_state = h('pre',  `    function MonadState(g, state, p) {
      this.id = g;
      this.s = state;
      this.process = p;
      this.a = this.s[0];
      this.bnd = (func, ...args) => func(this.s, ...args);  
      this.run = ar => { 
        var ar2 = this.process(ar);
        this.s = ar2;
        self[this.id] = this;   // "self" is the global context in a worker.
        return self[this.id];
      }
    };

    var primesMonad = new MonadState('primesMonad', [3, [2,3], 3, [2,3]], primes_state);

    function primes_state(x) {
      var state = x[0].slice();
      var top = state[2];
      var primes = state[3];
      var newtop = x[1];
      if (newtop == state[0] || newtop == top) {
        return state;
      }
    
      else if (newtop < top) {
        var temp = primes.filter(v => v <= newtop);
        var q = temp.indexOf(temp[temp.length - 1]);
        temp.push(primes[q + 1]);
        return [primes[q+1], temp, top, primes];
      }
        
      else {
        while (true) {
          if (primes.every(e =>  (top / e != Math.floor(top / e))))  {
            primes.push(top);
            if (top > newtop) {  // Nesting assures that the new top is prime.
              return [top, primes, top, primes];
            }
          };
          top += 2;
          console.log('In primes_state. top is >>>>> ', top ); 
        }
      }
    };    `  )

var workerC = h('pre',  `    

onmessage = function(ar) {
      importScripts('script2.js');
      var num = ar.data[1];
      var s = ar.data;
      s[2] = num;
      primesMonad.run(s)
      .bnd(s2 => fact(s2)
      .bnd(factors => postMessage(["The prime factors of " + num + 
        " are " + factors.join(', '), s2])));
    }    `  )

var fact_workerC = h('pre.red0',  `    onmessage = function(ar) {
      console.log('In workerC.js.  ar is ', ar );  
      importScripts('script2.js');
      execP(ar.data[0], ar.data[1] + 1)
      .bnd(primeState => pfactors(primeState, ar.data[1])
      .bnd(factors => postMessage(["The prime factors of " + ar.data[1] + 
        " are " + factors.join(', '), primeState])));
    }
    
    function execP (state, num) {
      var top = state[2];
      var top2 = state[2];
      var primes = state[3];
      var primes2 = state[3]
      var result;
      if (num == state[0] || num == top) {
        result = new MonadState('primesMonad', state);
      }
    
      else if (num < top) {
        var temp = primes.filter(v => v <= num);
        var q = temp.indexOf(temp[temp.length - 1]);
        temp.push(primes[q + 1]);
        result = new MonadState('primesMonad', [primes[q+1], temp, top, primes]);
      }
        
      else {
        while (top2 <=  num ) {
          if (primes2.every(e =>  (top / e != Math.floor(top / e))))  {
            primes.push(top);
            top2 = top;
          };
          top += 2;
        }
        result = new MonadState('primesMonad', [top2, primes, top2, primes] );
      }
      return result;
    };
    
    function execLCM (a, b, primeState) {
      pfactors(primeState, a).bnd(x => { 
        pfactors(primeState, b).bnd(y => { 
          postMessage([primeState, [a, b, lcm(x,y)]])
        })
      })
    }  `  )

var fact2_workerD = h('pre.red0',  `    onmessage = function(ar) {
      var n = 0;
      importScripts('script2.js');
      var res;
      var a = ar.data[1][0];
      var b = ar.data[1][1];
      var primeState = ar.data[0];
      var decompState = ar.data[2];
      var max = a > b ? a : b
      var c = ar.data[2][3];
      var d = c.length;
      var diff = max - d;
      execP(ar.data[0], max)
      .bnd(primeState => execLCM(a, b, primeState)) 
    }
      
    function execLCM (a, b, primeState) {
      pfactors(primeState, a).bnd(x => { 
        pfactors(primeState, b).bnd(y => { 
          postMessage([primeState, [a, b, lcm(x,y)]])
        })
      })
    }  `  )

var workerD$ = h('pre',  `    const workerD$ = sources.WWD.map(m => {
      console.log('Back in the main thread. m is', m );
      mMfactors6.ret(m.data[0]);
      window['primesMonad'] = new MonadState('primesMonad', m.data[1], primes_state);
      mMfactors8.ret(m.data[2]);
    });  `  )

var execP = h('pre',  `    function execP (x) {
      var state = primesMonad.s.slice();
      var top = state[2];
      var top2 = state[2];
      var primes = state[3];
      var primes2 = state[3].filter(v => v <= top)
      if (x == state[0] || x == top) {
        return (new MonadState('primesMonad', state, primes_state));
      }
    
      else if (x < top) {
        var temp = primes.filter(v => v <= x);
        var q = temp.indexOf(temp[temp.length - 1]);
        temp.push(primes[q + 1]);
        return (new MonadState('primesMonad', [primes[q+1], temp, top, primes], primes_state));
      }
        
      else {
        while (top2 <=  x ) {
          if (primes2.every(e =>  (top / e != Math.floor(top / e))))  {
            primes.push(top);
            top2 = top;
          };
          top += 2;
        }
        return (new MonadState('primesMonad', [top, primes, top, primes], primes_state));
      }
    };    `  )

var hardWay = h('div',  [  
h('h3', ' Doing Things The Hard Way ' ),
h('p', ' The next two demonstration generate the same results as the previous two; but in doing so, they also generate and add to a shared and persistent (for the duration of the browser session) array of arrays of prime decompositions of the positive integers. The array is the value of decompMonad.s. It is re-used as the starting point for generating larger arrays, or as a sort of lookup table if a required prime decomposition has already been computed. The index of an array is the number whose decomposition is in the array so, for example, array-of-arrays[12] is [2,2,3]. The actual code will be shown later and is also available at the Github repository. ' ) ])  

var hardWay2 = h('div', [  
h('p', ' The next demonstration shares the array of arrays of prime decompositions with the previous demonstration. That array is kept in a MonadState instance named "decompMonad". Computing prime decompositions of numbers that end up being ignored is clearly inefficient, so please bear in mind that a demonstration of a JS-monads way to keep mutable state in immutable, composable, globally accessable objects. ' ), 
h('label', ' Enter two comma-separated integers here: ' ),
h('input#factors_5b'),

h('br'),
h('br'),

])


var monad = h('div',  [  
h('h1', 'The Monads'),
h('p', ' The definition of Monad, which is the basic monad constructor, is somewhat obscure. It isn\'t intended as a puzzle, so a little explanation is in order. ' ),
h('p', ' The term "monad" will mean "instance of Monad". Monad could have been defined as a class, but the current definition suffices. ' ),
h('p', ' Monads are created by code such as "const m = new Monad("anything", "m")". The arguments will be the values of m.x and m.id. The first argument can be any Javascript value, such as string, array, or monad. The second argument should be the name of the monad. ' ),
h('p', ' A monad, say "m", can be replaced by another monad named "m" in the global space through the use of the method "ret()". It looks like m.x gets mutated, but that isn\'t what happens. Previously defined references to m retain their values, as demonstrated below: '),
h('pre.turk', 
`const m = new Monad (5, 'm');
var arr = [m]; 
var p = m;
m.ret(100);  
console.log(m.x, arr[0].x, p.x);  // 100, 5, 5 
` ),
h('p', ' In global scope (window in the browser), m.x changed to 100; but p and arr still refer to 5, the previous value of m.x. Similarly, when a monad uses its bnd() method to modify its x attribute, the change is seen globally, but nowhere else. Previous references to the monad remain stable, as this example illustrates: ' ),
h('pre.turk', 
`const m = new Monad (5, 'm');
var arr = [m]; 
var p = m;
m.bnd(add,95);  
console.log(m.x, arr[0].x, p.x);  // 100, 5, 5 
` ),
h('p', ' Had there been no reference to m, the previous instance would have been subject to removal by the garbage collector. ' ),
h('p', ' It is possible to mutate monads with code such as m.x = 888. That might be a good thing to do in a function with many recursions, but it seems like a misuse of monads. Monads are never mutated on this website. Object.freeze() is used to prevent mutation in the definition of primesMonad (shown below). '), 
  h('p', ' The bnd() method can leave the calling monad\'s global value unchanged while assigning a value (in the global space) to another previously defined monad, or to a freshly created monad. So regardless of whether or not "m2" is defined, m.ret(4) followed by m.bnd(cube,"$m2") causes m.x === 4 and m2.x === 64 to both return true. The definition of Monad (below) shows how bnd() checks to see if func(m.x, ...args) returns a monad. If it does, "testPrefix" looks for a pattern that matches "$val" in the arguments that were provided to m.bnd(func, ...args). If the pattern is found, the global space acquires a monad named "val" with val.x === func(m.x, ...args). If no monad named "val" previously existed, one is created. Otherwise, val\'s global definition gets superseded. val can be any sequence of characters that constitute a valid javascript identifier. ' ),
h('p', ' Instances of Monad facilitate changing values without mutation. They also provide a way to chain function calls. For example, m.ret(2).bnd(add, 1).bnd(cube) causes m.x === 27 to return true. This works because ret(), add, and cube all return monads when they are applied to m.x. The definition of add and cube are shown below and can be found in the Github repository. ' ),  
h('p', ' So, with that out of the way, here are the definitions of Monad and testPrefix: ' ),  
h('h3', ' Monad '),
h('pre.turk6',  `    var Monad = function Monad(z = 42, g = 'generic') {
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
          if (typeof v === 'string' && v.charAt() === '$') {
             t = v.slice(1, v.length);
          }
        })
      }
      return t;
    }  `  ),

h('br' ),
h('span.tao#monad', ' Instances of Monad, MonadState, MonadItter, and MonadEr facilitate programming in a functional style. The variety of these constructors suggests how developers might create their own constructors as the need arises. ' ),
h('a', { props: { href: '#state' } }, 'MonadState'),
h('span', ' instances memoizing computation results, '),
h('a', { props: { href: '#itterLink' } }, 'MonadItter'),
h('span', ' instances organizing nested callbacks into neat, easily maintainable blocks of code, and '),
h('a', { props: { href: '#err' } }, 'MonadEr' ),
h('span', ' catching NaN and preventing crashes when undefined variables are encountered. ' ),
h('p', ' Computations are easy to link if each result is returned in an instance of Monad. Here are a few examples of functions that return instances of Monad: '),
  h('pre.turk',  `  function ret(v, id = 'generic') {
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
    };  `  ),
h('p', ' The "$" prefix provides control over the destination of computation results. In the following example, m1, m2, and m3 have already been declared. Here is a comparison of the results obtained when the "$" prefix is used and when it is omitted: ' ), 

h('pre.red9', `    m1.ret(7).bnd(m2.ret).bnd(m3.ret)  // All three monads get the value 7.
    m1.ret(0).bnd(add,3,'m2').bnd(cube,'m3')  // \'m1\', \'m2\', and \'m3\' are ignored` ),
h('pre', `    Result: m1.x === 27
            m2.x === 7
            m3.x === 7  ` ),
h('pre.red9', `    m1.ret(0).bnd(add,3,'$m2').bnd(cube,'$m3')   ` ),
h('pre', `    Result: m1.x === 0
            m2.x === 3
            m3.x === 27  ` ),
h('p', ' If the prefix "$" is absent, bnd() ignores the string argument. But when the "$" prefix is present, m1 retains its initial value, m2 retains the value it gets from from adding m\'s value (which is 0) to 3, and m3.x is the result of applying "cube" to m2.x. Both forms could be useful. ' ),
h('p', ' The following example shows lambda expressions sending variables v1 and v2 through a sequence of computations and v3 sending the final result to the string that is logged. It also shows monads a, b, c, d, e, f, and g being updated and preserved in an array that is not affected by further updates. That is because calling the ret() method does not mutate a monad; it creates a fresh instance with the same name. Here is the example, shown in a screen shot of the Chrome console:. ' ),  
h('br' ),
h('br' ),
h('img.image', {props: {src: "demo_000.png"}}  ),   
h('h3', ' The Monad Laws '), 
h('p', ' In the following discussion, "x === y" signifies that the expression x === y returns true. Let J be the collection of all Javascript values, including functions, instances of Monad, etc, and let F be the collection of all functions mapping values in J to instances of Monad with references (names) matching their ids; that is, with window[id] === m.id for some id which is a valid es2015 variable name. The collection of all such instances of Monad along and all of the functions in F is called "M". For any instances of Monad m, m1, and m2 in M and any functions f and g in F, the following relationships follow easily from the definition of Monad: '), 
h('div', 'Left Identity ' ),
h('pre.turk', `    m.ret(v, ...args).bnd(f, ...args).x === f(v, ...args).x 
    ret(v, ...args).bnd(f, ...args).x === f(v, ...args).x 
    Examples: m.ret(3).bnd(cube).x === cube(3).x  Tested and verified  
    ret(3).bnd(cube).x === cube(3).x     Tested and verified
    Haskell monad law: (return x) >>= f \u2261 f x  ` ),
h('div#discussion', ' Right Identity  ' ),  
h('pre.turk', `    m.bnd(m.ret) === m      Tested and verified 
    m.bnd(m.ret) === m   Tested and verified
    m.bnd(ret) === m  Tested and verified
    Haskell monad law: m >>= return \u2261 m `  ),
    h('div', ' Commutivity  ' ),  
    h('pre.turk', `    m.bnd(f1, ...args).bnd(f2, ...args).x === m.bnd(v => f1(v, ...args).bnd(f2, ...args)).x 
    Example: m.ret(0).bnd(add, 3).bnd(cube).x === 
    m.ret(0).bnd(v => add(v,3).bnd(cube)).x  Tested amd verified
    Haskell monad law: (m >>= f) >>= g \u2261 m >>= ( \\x -> (f x >>= g) ) `),
h('a', { props: { href: '#top' } }, 'Back To The Top'),
h('h3', ' Disussion ' ),
h('span.tao', ' The Haskell statement ' ),    
h('span.turk6', `f \u2261 g` ),
h('span', ' means that f x == g x for all Haskell values x of the appropriate type. That is the test applied to Javascript expressions in the "Monad Laws" section (above). Neither the == nor the === operator would provide useful information about the behavior of instances of Monad, which are objects. Those operators test objects for location in memory. If the left and right sides of predicates create new instances of m, then the left side m and the right side m wind up in different locations in memory. So we expect m.ret(3) === m.ret(3) to return false, and it does. The question we want answered is the question \u2261 answers in Haskell: Can the left and right sides be substituted for one another and still yield the same results.'),
h('br' ),
h('br' ),
h('span.tao', ' The Haskell programming language borrowed the term "monad" from the branch of mathematics known as category theory. This was apropriate because Haskell monads, along with the function return and the operator >>=, behave quite a bit like category theory monads, and the inspiration for them came out of category theory. For Haskell monads to actually be category theory monads, they would need to reside in a category-theory category. They don\'t, although the Haskell mystique tends to give newcommers to the language the impression that they do. See ' ),
h('a', { props: { href: "http://math.andrej.com/2016/08/06/hask-is-not-a-category/", target: "_blank" } }, 'Hask is not a category.'),
h('br' ),
h('p', ' Research into ways of defining a Haskell category appears to be ongoing. It involves tinkering with special constraints, omitted features, and definitions of morphisms that are not Haskell functions. When a definition of the category is established, Haskell monads are then shown to be, in some contrived context, category-theory monads. Devising such schemes are instructive academic exercises, but I don\'t think they can provide anything useful to programmers working on applications for industry, commerce, and the Internet. ' ),
h('p', ' However, imitating definitions and patterns found in category theory, as Haskell does in defining the functor, monoid, and monad type classes, was a stroke of genius that vastly enriched the Haskell programming language and brought it into the mainstream as a viable alternative to java, c++, etc.  This website runs efficiently on a Haskell websockets server. The modified Haskell Wai Websockets server has proven to be extraordinarily easy to maintain as new requirements become necessary. For example, modifying the server to send chat messages and shared todo lists only to members of the same group was a trivial task. It required just a tiny amount of pattern-matching code. Category theory patterns make the Haskell interface to the Cycle front end robust, versitile, and reliable. Those are the qualities that I strive to emulate with JS-monads.'  ), 
])

var p4 = h('pre',  `  
`  )

var p5 = h('pre',  `  
`  )






var cycle = h('div',  [
h('h3', ' A Few Words About Cycle.js ' ),
h('p', ' Opinionated frameworks tend to annoy and frustrate me. Cycle, on the other hand, is easy on my mind. I love it.' ),
h('p', ' In the early stages of developing this website, I had functions that mutated global variables. Sometimes, I directly mutated values in the DOM with statements like "document.getElementById(\'id\').innerHTML = newValue". Cycle didn\'t object. Over time, mutating variables and manhandling the DOM gave way to gentler techniques that I developed in conjunction with the "proof of concept" features that I was in a hurry to get up and running. ' ),
h('p', ' Handling events is a breeze. Instead of callbacks or explicit declarations of observers, I use drivers. Cycle\'s built-in DOM driver handles browser events like click and input. Simple application drivers handle asynchronous messages. Here are two examples:' ), 
h('pre.turk', `function workerDriver () {
  return xs.create({
    start: listener => { worker.onmessage = msg => listener.next(msg)}, 
    stop: () => { worker.terminate() }
  });
};

function websocketsDriver() {
  return xs.create({
    start: listener => { socket.onmessage = msg => listener.next(msg)},
    stop: () => { socket.close() }
  });
};   ` )      ])    




var async = h('div', [  
h('p', ' The next five demonstrations involve computations of prime numbers, Fibonacci numbers, prime Fibonacci numbers, and prime factors of numbers. Several instances of a constructor named "MonadState" (simple and not an ES6 class) are utilyzed, three of which maintain and share share an array of prime numbers maintained in the MonadState instance named "primesState". An array of arrays of prime factors of numbers is maintained in MonadState instance "decompMonad", which is shared by the fourth and fifth examples in this series of async examples. Some code snippets and explanations follow the demonstrations. ' ),
h('pre', `    
    function MonadState(g, state) {
      this.id = g;
      this.s = state;
      this.bnd = (func, ...args) => func(this.s, ...args);  
    }    ` ),  

h('p', ' The first demonstration displays the Fibonacci series up to an upper bound entered in the browser by a user. It also displays a list of the prime Fibonacci numbers in the list of Fibonacci numbers, along with the largest prime number that was generated during a computation.  I tested performance in Chrome and Firefox on my Ubuntu 16.04 box by entering "1" and then, one at a time, 0\'s. Lag times in Chrome and Firefox were almost identical. were not noticeable until I reached 10,000,000,000 where there was a 831 microsecond pause before the prime Fibonacci number 2,971,215,073 appeared. At 100,000,000,000 the lag time in Chrome was 7,230 and at 1,000,000,000,000 it was 65.524 microseconds. At this point, the larges generated prime number was 978,149 and the largest Fibonacci number was  956,722,026,041. ' ),
h('p', ' The graphical progress display confirmed that it took almost no time to generate the list of Fibonacci numbers or to select the ones that are prime. The bottleneck was computing the primes. To see the effectiveness of saving computed prime numbers, I deleted three zeros and then added them back again. At 100,000,000,000,000 and 1,000,000,000,000,, the lag times were  67 microseconds and 124 microseconds, respectively. The display, in a brief flash, showed that those delays occorred mostly during the selection of prime Fibonacci numbers from the array of Fibonacci numbers. In Firefox, the lags were again almost exactily identical to the ones in Chrome. '  ),   

h('p', ' The demonstrations do not block the main execution thread. Computations are performed in web workers and the results are stored for further use in the main thread. ' ),    
h('span', ' According to the '),    
h('a', { props: { href: "https://oeis.org/A005478", target: "_blank" } }, 'The On-Line Encyclopedia of Integer Sequences '),
h('span', ' these are the first eleven proven prime Fibonacci numbers:'),
h('span.purp', ' 2, 3, 5, 13, 89, 233, 1597, 28657, 514229, 433494437, 2971215073, and 99194853094755497. The eleventh number, 2971215073, is as far as you can go on an ordinary desktop computer. ' ),
h('br' )   ])   



var async2 = h('div', [  
h('div.tao3', mMfactors3.x ),    
// ********************************************************************** Begin MonadState

h('p#monadstate'),
h('a#state', { props: { href: '#monad' } }, 'Back to Monad discussion'),
h('h3', 'MonadState and MonadState Transformers'),
p(' The preceding demonstrations used three instances of MonadState: primesMonad, fibsMonad, and factorsMonad. The chat message demonstration uses another instance of MonadState; namely, messageMonadn. Instance of MonadState holds a current state along with a method for updating state. Here again is the definition of MonadState: '),
     //code.MonadState,
h('p', ' MonadState reproduces some of the functionality found in the Haskell Module "Control.Monad.State.Lazy", inspired by the paper "Functional Programming with Overloading and Higher-der Polymorphism", Mark P Jones (http://web.cecs.pdx.edu/~mpj/) Advanced School of Functional Programming, 1995. Transformers take instances of MonadState and return different instances of MonadState. In the prime Fibonacci example, the method call "fibsMonad.bnd(fpTransformer, primesMonad)" returns primesMonad updated so that the largest prime number in primesMonad.s[1] is only slightly larger than the square root of the largest Fibonacci number in fibsMonad.s[3]. Here is the definition of fpTransformer: '),
     //code.fpTransformer,
h('a#err', { props: { href: '#top' } }, 'Back To The Top'),
h('br' ),
])

var svgNode_1 = h('div', [
  h('svg', {attrs: {width: 100, height: 100}}, [
    h('circle', {attrs: {cx: 50, cy: 50, r: 40, stroke: 'green', 'stroke-width': 4, fill: 'yellow'}})
  ])
]);

  export default { svgNode_1, cycle, monad, hardWay, hardWay2, async, async2, execP, workerD$, fact_workerC, fact2_workerD, primes_state, workerB, workerB_Driver, workerC, worker$, errorDemo, monadEr, backAction, monadArchive2, tests, numClick1, numClick2, mMZ10, test3, travMonad, monad, equals, fmap, opM, e2, e2x, e3, e4, e4x, e6, e6x, driver, messages, monadIt, MonadSet, updateCalc, arrayFuncs, nums, cleanup, ret, C42, newTask, process, mM$task, colorClick, edit, testZ, quad, runTest, todoStream, inc, seed,  add, MonadState, primesMonad, fibsMonad, primeFibInterface, tr3, fpTransformer, factorsMonad, factorsInput, playerMonad, promise, promiseSnippet, timeout, timeoutSnippet, examples, examples2, async }
 





