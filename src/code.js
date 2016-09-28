import {h, pre} from '@motorcycle/dom'; 

/*
import {subject} from 'most-subject'
var sub = subject
var observer = sub.observer;
var stream = sub.stream;
*/

var Monad = function Monad(z) {
    var _this = this;

    var g = arguments.length <= 1 || arguments[1] === undefined ? 'anonymous' : arguments[1];

    this.id = g;
    this.x = z;
    this.bnd = function (func) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }

        return func.apply(undefined, [_this.x].concat(args));
    };
    this.ret = function (a) {
        return window[_this.id] = new Monad(a, _this.id);
    };
};

var mMname = new Monad('Fred', 'mMname');

const monad = h('pre', {style: {color: '#AFEEEE' }}, `    function Monad (z, ID = 'default') {
        var x = z;
        var ob = {
        id: ID,
        bnd: function (func, ...args) {
          return func(x, ...args)
        },
        ret: function (a) {
          return window[ob.id] = new Monad(a, ob.id);
        }
      };
      return window[ob.id] = ob
    }

    function get (m) {    // Getter for the x attribute, which is not exposed.
      let v = m.bnd(x => x);
      return v;
    }; ` )

const monadIt = h('pre', {style: {color: '#AFEEEE' }}, `  const MonadItter = () => {
    this.p = function () {};
    this.release = (...args) => this.p(...args);
    this.bnd = func => this.p = func;
  }; ` )

const ret = h('pre', {style: {color: '#AFEEEE' }}, `  var ret = function ret(v, id = "anonymous") {
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

var messages = h('pre', `  const messages$ = (sources.WS).map( e => {

function main(sources) {
    mMindex.ret(0);
    const messages$ = (sources.WS).map( e => {
      mMtem.ret(e.data.split(',')).bnd( v => {
        console.log('<><><><><><><><><><><><><><><><>  INCOMING  <><><><><><><> >>> In messages. e amd v are ', e, v);
        mMZ10.bnd( () => mM1.ret(v.slice(3)).bnd(function (y) { return game([pMscore.x, pMgoals.x, y, mM3.x].concat(y))}));
        mMZ11.bnd( () => socket.send('CG#$42,' + pMgroup.x + ',' + pMname.x + ',' + pMscore + ',' + pMgoals));
        mMZ12.bnd( () => mM6.ret(v[2] + ' successfully logged in.'));
        mMZ13.bnd( () => updateMessages(v));
        mMZ14.bnd( () => mMgoals2.ret('The winner is ' + v[2]));
        mMZ15.bnd( () => mMgoals2.ret('A player named ' + v[2] + ' is currently logged in. Page will refresh in 4 seconds.')
        .bnd(refresh));
        mMZ16.bnd( () => { if (pMname.x != v[2]) {
            mMgoals2.ret(v[2] + v[3]);
        } });
        mMZ17.bnd( () => {
            if (v[3] == 'no file') mMtaskList.ret([]);
            else process(e.data);
        });
        mMZ18.bnd( () => { if (pMname == v[2]) playerMonad.run([v[3], v[4]]); });
        mMZ19.bnd( () => updatePlayers(e.data));
      });
      mMtemp.ret(e.data.split(',')[0])
      .bnd(next, 'CA#$42', mMZ10)
      .bnd(next, 'XX#$42', mMZ11)
      .bnd(next, 'CC#$42', mMZ12)
      .bnd(next, 'CD#$42', mMZ13)
      .bnd(next, 'CE#$42', mMZ14)
      .bnd(next, 'EE#$42', mMZ15)
      .bnd(next, 'DE#$42', mMZ16)
      .bnd(next, 'DD#$42', mMZ17)
      .bnd(next, 'CG#$42', mMZ18)
      .bnd(next, 'NN#$42', mMZ19)
    });
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
        if (targetAr[i].innerHTML == 'undefined' )    {
          targetAr[i].style.display = 'none';
        }
        else {
          targetAr[i].style.display = 'inline';
        }
      }
      return ret(x);
  }; `  )

  var travel = h('pre',  `    const forwardClick$ = sources.DOM
      .select('#forward').events('click');
   
      const backClick$ = sources.DOM
        .select('#back').events('click');
     
      const forwardAction$ = forwardClick$.map(() => {
        if (mMindex.x < (mMhistorymM1.x.length - 1)) {
          mMindex.bnd(add, 1, mMindex)
          .bnd(v => trav(v))
        }
      });
     
      const backAction$ = backClick$.map(() => {
        if (mMindex.x > 0) {
          mMindex.bnd(add, -1, mMindex)
          .bnd(v => trav(v))
          socket.send('DE#$42,' + pMgroup.x + ',' + pMname.x + ', clicked the BACK button. ');
        }
      });
    
    var trav = function trav (index) {       
      document.getElementById('0').innerHTML = mMhistorymM1.x[index][0]; 
      document.getElementById('1').innerHTML = mMhistorymM1.x[index][1]; 
      document.getElementById('2').innerHTML = mMhistorymM1.x[index][2]; 
      document.getElementById('3').innerHTML = mMhistorymM1.x[index][3];
      document.getElementById('sb3').innerHTML = 'Score: ' + mMplayerArchive.x[index][2];
      document.getElementById('sb4').innerHTML = 'Goals: ' + mMplayerArchive.x[index][3];
      if (pMgroup.x != 'solo') {
        document.getElementById('sb6').innerHTML =  Array.from(mMsetArchive.x[index].s);
      }
      cleanup();
    };    `  )

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
      if( e.keyCode == 13 ) {
        if ( ar.length < 3 ) {
          alert = 'You should enter "author, responsible party, task" separated by commas';
          document.getElementById('alert').innerHTML = alert;
        }

        else if ( (mMar2.x.filter(v => (v.task == task)).length) > 0 ) {
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
    mMtaskList.x[index].children[3].elm.style.display = 'block';
  });

  const edit2$ = sources.DOM
    .select('#edit2').events('keypress')
    
  const edit2Action$ = edit2$.map(e => {
    let v = e.target.value;
    let index = getIndex2(e);
    if( e.keyCode == 13 ) {
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
      if (elem == elem2[k].childNodes[0].innerHTML) {
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
        if (result == 20) {score(mM13.x, 1)}; 
        if (result == 18) {score(mM13.x, 3)};
      }
    )) 
    reset()
  };

  var score = function score(x,j) {
    socket.send('CA#$42,' + pMgroup.x + ',' + pMname.x + ',6,6,12,20');
    if ((x + j) == 20) {
      mMplayer.ret([]);
      mM13.ret(0).bnd(mMindex.ret);
      mMhistorymM1.ret([0,0,0,0]);   
      mMgoals.bnd(add, 1, mMgoals).bnd(v => {
        if (v == 3) {
          socket.send('CG#$42,' + pMgroup.x + ',' + pMname.x + ',' + -x + ',' + 0); 
          socket.send('CE#$42,' + pMgroup.x + ',' + pMname.x + ',nothing ')
          mMgoals.ret(0);
        }
        else socket.send('CG#$42,' + pMgroup.x + ',' + pMname.x + ',' + -x + ',' + v); 
      })
      return;
    }
    if ((x + j) % 5 == 0) {
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


  var testZ = h('pre',  `  mMZ1.bnd(v => mMt1.bnd(add,v,mMt1)
  .bnd(cube,mMt2)
  .bnd(() => mMt3.ret(mMt1.x + ' cubed is ' + mMt2.x)))  
  
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
    mMZ3.bnd(a => ret(a)
    .bnd(display, 'quad4', '')         
    .bnd(display, 'quad6', '')         
    .bnd(display,'quad5', a + " * x * x ")
    .bnd(a => mMZ3    // Blocks here until new user input comes in.
    .bnd(b => ret(b)
    .bnd(display, 'quad6', b + ' * x ').bnd(b => mMZ3  // Blocks again.
    .bnd(c => mMtemp.ret([a,b,c]).bnd(fmap, qS4,'mMtemp2')
    .bnd(result => {  
      let x = result[0]
      let y = result[1]
      console.log('Here is x and y: ', x, y)
    mMtemp.bnd(display, 'quad4', "Results: " + x + " and  " + y)  
    .bnd(display, 'quad5', p(a).text + " * " + x + " * " + x + " + " + p(b).text + 
            " * " + x + " " + p(c).text + " = 0")
    .bnd(display, 'quad6', p(a).text + " * " + y + " * " + y + " + " + p(b).text + 
            " * " + y + " " + p(c).text + " = 0")   
    solve();  
    } )))))) 
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
  }

  var display = function display (x, id, string) {
    document.getElementById(id).innerHTML = string;
    return ret(x);
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
    socket.send('TD#$42' + ',' + mMgroup.x.trim() + 
        ',' + mMname.x.trim() + ',' + '@' + str);
  });  `  )

var add = h('pre',  `  var add = function(x,b,mon) {
    if (arguments.length === 3) {
      return mon.ret(x + b);
    }
    return ret(x+b);  
  }; ` )
  
var ret_add_cube = h('pre',  `  var ret = function ret(v, id = 'anonymous') {
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

var traverse = h('pre',  `  const forwardClick$ = sources.DOM
        .select('#forward').events('click');

    var backClick$ = sources.DOM
        .select('#back').events('click');

    var forwardAction$ = forwardClick$.map(function () {
        if (mMindex.x < (mMhistory.x.length - 1)) {
          mMindex.bnd(add, 1, mMindex)
          .bnd(v => trav(v));
        }
    });

    var backAction$ = backClick$.map(function () {
        if (mMindex.x > 0) {
          mMindex.bnd(add, -1, mMindex)
          .bnd(v => trav(v));
          socket.send('DE#$42,' + pMgroup.x + ',' + pMname.x + ', clicked the BACK button. ');
        }
    });

    var game = function game(z) {
        var x = z.slice();
        mMindex.bnd(add, 1, mMindex)
            .bnd(function (i) { return mMhistory.bnd(spliceAdd, i, x, mMhistory); });
        document.getElementById('0').innerHTML = x[4];
        document.getElementById('1').innerHTML = x[5];
        document.getElementById('2').innerHTML = x[6];
        document.getElementById('3').innerHTML = x[7];
        game2();
        cleanup('cow');
    };

    var game2 = function game2() {
        document.getElementById('sb1').innerHTML = 'Name: ' + pMname.x;
        document.getElementById('sb2').innerHTML = 'Group: ' + pMgroup.x;
        document.getElementById('sb5').innerHTML = 'Currently online: Name | score | goals';
        document.getElementById('sb6').innerHTML = mMscoreboard.x;
        cleanup('fred');
    };
    var trav = function trav(index) {
        document.getElementById('0').innerHTML = mMhistory.x[index][4];
        document.getElementById('1').innerHTML = mMhistory.x[index][5];
        document.getElementById('2').innerHTML = mMhistory.x[index][6];
        document.getElementById('3').innerHTML = mMhistory.x[index][7];
        var a = mMhistory.x[index];
        mM1.ret(a[2]);
        mM3.ret(a[3]);
        socket.send('CG#$42,' + mMgroup.x + ',' + pMname.x + ',' + a[0] + ',' + a[1]);
        mM8.ret(0);
        cleanup('steve');
    };
  };  `  )

var MonadState = h('pre',  `  const MonadState = function (g, state, value, p)  {
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
  }  `  )

var primeFibInterface = h('pre',  `  const fibKeyPress5$ = sources.DOM
    .select('input#fib92').events('keydown');

  const primeFib$ = fibKeyPress5$.map(e => {
    if( e.keyCode == 13 ) {
      var res = fibsMonad
      .run([0, 1, e.target.value, []])
      .bnd(fibsState => fibsMonad
      .bnd(fpTransformer, primesMonad)
      .bnd(primesState => tr3(fibsState[3],primesState[3])))
      document.getElementById('PF_9').innerHTML = res[0];
      document.getElementById('PF_22').innerHTML = res[1];
      document.getElementById('primeFibs').innerHTML = res[2];
    }
  });  `  )

var fpTransformer = h('pre',  `  var fpTransformer = function fpTransformer (s, m) {
    var bound = Math.ceil(Math.sqrt(s[3][s[3].length - 1]));
    if (bound > m.a[m.a.length - 1] ) {
      m.run([m.s[0], "from the fibKeyPress5$ handler", bound, primesMonad.a])
    }
    return m;
  }  `  )

var innerHTML = h('pre',  `  var innerHTML = function innerHTML (x, v, u, m) { 
    document.getElementById(u).innerHTML = v;
    return m.ret(x);
  }  `  )

var factorsMonad = h('pre',  `  var factorsMonad = new MonadState('factorsMonad', [[], [], 2, []], [], factor_state);
  var factorsMonad2 = new MonadState('factorsMonad2', [[], [], 2, []], [], factor_state2);
  
  function factor_state(v) {
      v[3].map(function (p) {
          if (v[2] / p == Math.floor(v[2] / p)) {
              v[0].push(p);
          }
      });
      return v;
  }
  
  function factor_state2(a) {
      var v = a.slice();
      var result;
      func(v);
      function func (v) {
        for (let p of v[3]) {
          if (v[2] / p == Math.floor(v[2] / p)) {
              v[0].push(p);
              func([v[0], v[1], v[2]/p, v[3]])
              break;
          };
          result = v;
        }; 
      }
      return result;
  }  `  )

var factorsInput = h('pre',  `  var factorsPress$ = sources.DOM
      .select('input#factors_1').events('keydown');

    var factorsAction$ = factorsPress$.map(function (e) {
      if (e.keyCode == 13) {
        var num = e.target.value
        if (!num.match(/^[0-9]+$/)) {
          document.getElementById('factors_3').innerHTML = 
            'This works only if you enter a number.';
          document.getElementById('factors_4').innerHTML = num + ' is not a number';
        }
        else {
          var factors = primesMonad.run([primesMonad.s[0], [], num, primesMonad.a])
          .bnd(v => [prFactTransformer(v, num), prFactTransformer2(v, num)]);
          document.getElementById('factors_3').innerHTML = 
            'The distinct prime factors of ' + num + ' are ' + factors[0].s[0] ;
          document.getElementById('factors_4').innerHTML = 
            'All of the prime factors of ' + num + ' are ' + factors[1].s[0];
        }
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

var MonadSet = h('pre',  `  var MonadSet = function MonadSet(set, ID) {
    var _this = this;
  
    this.s = set;
  
    if (arguments.length === 1) this.id = 'anonymous';
    else this.id = ID;
  
    this.bnd = function (func, ...args) {
       return func(_this.x, ...args);
    };
  
    this.add = function (a) {
      var ar = Array.from(_this.s);
      set = new Set(ar);
      set.add(a);
      window[_this.id] = new MonadSet(set, _this.id);
      return window[_this.id];
    };
  
    this.delete = function (a) {
      var ar = Array.from(_this.s);
      set = new Set(ar);
      set.delete(a);
      window[_this.id] = new MonadSet(set, _this.id);
      return window[_this.id];
    };
  
    this.clear = function () {
      set = new Set([]);
      window[_this.id] = new MonadSet(set, _this.id);
      return window[_this.id];
    };
  };
  
  var s = new Set();
  
  var sMplayers = new MonadSet( s, 'sMplayers' )  `  )

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
    m.ret(3, 'm')
      .bnd(timeout2, 1, m, [() => m
      .bnd(cube, m)
      .bnd(display, 'timeout2', 'm.x is ' + ' ' + m.x, m)
      .bnd(timeout2, 2, m, [() => m
      .bnd(add, 15, m)
      .bnd(display, 'timeout2',  'm.x is ' + ' ' + m.x, m)
      /* Continue chaining from here */
      .bnd(display, 'timeout3', 'The meaning of everything was computed to be' + ' ' + m.x, m)   
    ])]);  
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

var e1 = h('pre.turk',  `  var ret = function ret(v, id = 'anonymous') {
    window[id] = new Monad(v, id);
    return window[id];
  }
  
  var cube = function(v,mon) {
    if (arguments.length === 2) {
      return mon.ret(v*v*v);
    }
    return ret(v*v*v);
  }
  
  var add = function(x,b,mon) {
    if (arguments.length === 3) {
      return mon.ret(x + b);
    }
    return ret(x+b);
  }
  
  var log = function log(x, message, mon) {
    console.log('In log. Entry: ', message);
    if (arguments.length === 3) return mon
    return ret(x);
  };  `  )

var e2 = h('pre.turk3',  `  var c = m.ret(0).bnd(add,3).bnd(cube)
  .bnd(log,"m.x and a.x are  " + m.x + " and " + a.x + " respectively ")
  Output: In log. Entry:  m.x and a.x are  0 and 27 respectively  ` )

 var e3 = h('pre.turk2',  ` Note: m.x keeps its initial value of 0 because each computation 
       creates a fresh instance of Monad with id == "anonymous".  ` )
  
 var e4 = h('pre.turk3',  `  m.bnd(() => add(0, 3).bnd(cube).bnd(m.ret).bnd(v => log("", "m.x is " + v))) 
  Output: In log. Entry:  m.x is 27 ` )

 var e5 = h('pre.turk2',  ` Note: The value of m.x at the beginning of the computation is ignored. 
       "m.ret" after the final computation creates a fresh instance of Monad 
       with id == "m" and m.x == 27. If there is a reference to the original m, 
       it will be preserved with its original value, otherwise it is subject to 
       removal by the gargane collector.  ` )
  
 var e6 = h('pre.turk3',  `  m.ret(0).bnd(add,3,m2).bnd(cube,m3)
  .bnd(log,"m.x and m2.x and m3.x are  " + m.x + ", " + m2.x + " and " + m3.x + " respectively ")

  Output:  In log. Entry:  m.x and m2.x and m3.x are  0, 3 and 27 respectively
  Note: This time, add got three arguments and cube got two.  ` )

var equals = h('pre',  `    var equals = function equals (mon1, mon2) {
    if (mon1.id === mon2.id && mon1.x === mon2.x) return true;
    else return false  }  `  )

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

var fmapA = h('pre',  `  function fmapA(x, g, id) { 
    var mon = (new Monad(x.map(g), id)); 
    window[id] = mon;
    return mon;
}  

  m.ret([1,2,3,4,5]).bnd(fmapA, (x => x*x*x), 'm2')
  
  m2.x == [1,8,27,64,125]  tested and verified.  `  )

var a = 'acorn'

var MonadMaybe = h('pre',  `  var MonadMaybe = function MonadMaybe(z) {
  var _this = this;
  var g = arguments.length <= 1 || arguments[1] === undefined ? 'anonymous' : arguments[1];
  this.id = g;
  this.x = z;
  
  this.bnd = function (a) {
    console.log('<B><B><B>             Entering bnd()  <B><B><B>               The argument is ', a );
    var result;
    if (_this.x == 'Nothing' || a[1] == 'Nothing') {
      console.log('<B><N><B>             In bnd()        <B><N><B>      Propagating Nothing from bnd()');
      result = Nothing;
      console.log('<$><$><$>             In bnd()        <$><$><$>      The result is ', result, '   result.x:', result.x);
    }
    else if (a instanceof Function) return a();
    else {
      var b = a.slice(1);
      var res = test([a[0],_this.x.toString(), ... b]);    
      result = res;
      console.log('<$><$><$>             In bnd()        <$><$><$>      The result is ', result, '   result.x:', result.x);
    }
    return result;
  }
  
  this.ret = function (a) { 
    var b = eval(\`typeof(${a})\`);
    console.log('<@><@><@>             In ret()  <@><@><@>            Creating a new instance of MonadMaybe ___  id:', '"' +_this.id +'"', '     value:', a );
    if (_this.x == 'Nothing') {
      console.log('<N><N><N>    Still in ret()   <N><N><N>      Propagating Nothing from ret()');
      return Nothing
    }  
    try {
      if (a == undefined) throw '    ' + a + " is not defined"
      return window[_this.id] = new MonadMaybe(a, _this.id);
    }
    catch(e) { 
      console.log("<N><N><N>   Still in ret()  <N><N><N>  In a catch block ", a, 'is not defined.    ', e) 
      return Nothing
    };
    try {
      if (a == 'NaN') throw '    ' + a + " is not a number"
      return window[_this.id] = new MonadMaybe(a, _this.id);
    }
    catch(e) { 
      console.log("<N><N><N>   Still in ret()  <N><N><N>  In a catch block ", a, 'is not a number.   ', e) 
      return Nothing
    };
  };
};
  
  var Nothing = new MonadMaybe('Nothing', 'Nothing');
  
  function run (x) {
    console.log('<O><O><O>  Left test(), now at the start of run()  <O><O><O>  The argument is ', x);  
    var f = eval(x[0]);
    var b = x.slice(1)
    return f(... b)
  }
  
function test (a) {

  console.log('<T><T><T>  Left bnd(); now at the start of test()  <T><T><T>  The argument is ', a );
  
  for (let c of a) {
    try {if (eval(c).toString == undefined) {
      throw "Error " + c + "is not defined"}
    } 
    catch(e) {
      console.log("<E><E><E>             In test()       <E><E><E>      " + c + " is not defined");
      console.log("<T><N><T>             In test()       <T><N><T>      Propagating Nothing from test()");
      return Nothing;
    }
    try {if ((eval(c).toString()) == 'NaN') {
      throw "Error " + c + " is not a number"}
    } 
    catch(e) {
      console.log('<E><E><E>             In test()       <E><E><E>      " + c + " is not a number' );
      console.log("<T><N><T>             In test()       <T><N><T>      Propagating Nothing from test()");
      return Nothing;
    }
    try {if (a[1] == 'Nothing') {
      throw "Error The value of the argument\'s x attribute is 'Nothing' " }
    } 
    catch(e) {
      console.log('<E><E><E>             In test()       <E><E><E>      The substrate monad\'s x attribute is "Nothing' );
      console.log("<T><N><T>             In test()       <T><N><T>      Propagating Nothing from test()");
      return Nothing;
    }
  return run(a);
  }  `  )

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

var p5 = h('pre',  `  
`  )

var p6 = h('pre',  `  
`  )

var p7 = h('pre',  `  
`  )


  export default { MonadMaybe, fmapA, monad, equals, fmap, opM, e1, e2, e3, e4, e5, e6, fib, driver, messages, next, monadIt, MonadSet, updateCalc, arrayFuncs, travel, nums, cleanup, ret, C42, newTask, process, mM$task, addString, colorClick, edit, testZ, quad, mdem1, runTest, todoStream, inc, ret_add_cube, seed,  add, traverse, MonadState, primesMonad, fibsMonad, primeFibInterface, tr3, fpTransformer, innerHTML, factorsMonad, factorsInput, playerMonad, promise, promiseSnippet, timeout, timeoutSnippet, examples, examples2, async }
 





