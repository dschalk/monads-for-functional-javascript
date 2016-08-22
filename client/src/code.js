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
      window[_this.id] = new Monad(a,_this.id);
      return window[_this.id];
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
    console.log('<><><><><><><><><><><><><><><><>  INCING  <><><><><><><> >>> In messages. v is ', v );
    mMZ10.bnd(() => mM1.ret([v[3], v[4], v[5], v[6]]).bnd(ar => game(ar))) 
    mMZ11.bnd(() => socket.send('NN#$42,' + pMgroup.x + ',' + pMname.x))
    mMZ12.bnd(() => mM6.ret(v[2] + ' successfully logged in.'))
    mMZ13.bnd(() => updateMessages(v))
    mMZ14.bnd(() => mMgoals2.ret('The winner is ' + v[2] ))
    mMZ15.bnd(() => mMgoals2.ret('A player named ' + v[2] + ' is currently logged in. Page will refresh in 4 seconds.')
    .bnd(refresh))
    mMZ16.bnd(() => {if (pMname.x != v[2]) {mMgoals2.ret(v[2] + v[3])}})
    mMZ17.bnd(() => {
      if (v[3] == 'no file') {
        mMtaskList.ret([])
      } 
      else {
        process(e.data)
      }
    })
    mMZ18.bnd(() => player(v))
    mMZ19.bnd(() => {
      var names = v.slice(3);
      sMplayers.clear();
      names.forEach(player => sMplayers.add(player.trim()))
      game2();
    }) })
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
  });  `  )

var MonadSet = h('pre',  `  var MonadSet = function MonadSet(set, ID) {
    var _this = this;
  
    this.s = set;
  
    if (arguments.length === 1) this.id = 'anonymous';
    else this.id = ID;
  
    this.bnd = function (func) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      return func.apply(undefined, [_this.s].concat(args));
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
      var ar = Array.from(this.s);
      set = new Set(ar);
      set.clear();
      window[_this.id] = new MonadSet(set, _this.id);
      return window[_this.id];
    };
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
    let a = mM$taskList.x;
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
    mMZ3.bnd(a => 
    mMtemp.ret(a)           
    .bnd(display, 'quad6', '')         
    .bnd(display,'quad5', a + " * x * x ")
    .bnd(a => mMZ3
    .bnd(b =>  mMtemp.ret(b)
    .bnd(display, 'quad6', b + ' * x ').bnd(b => mMZ3
    .bnd(c => {
      let x = p(qS1(a,b,c));
      let y = p(qS2(a,b,c));
      document.getElementById('quad5').innerHTML =
        p(a).text + " * " + x.text + " * " + x.text + " + " + p(b).text + 
            " * " + x.text + " " + p(c).text + " = 0"
      document.getElementById('quad6').innerHTML =
        p(a).text + " * " + y.text + " * " + y.text + " + " + p(b).text + 
            " * " + y.text + " " + p(c).text + " = 0"   
      solve();
    }) ) ) ) ) 
  }();

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

var traverse = h('pre',  `  const forwardClick$ = sources.DOM
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

  var game = function game (z) {  // Runs each time a number is clicked
    var x = z.slice();
        mMindex.bnd(add, 1, mMindex)
          .bnd(i => mMhistorymM1.bnd(spliceAdd, i, x, mMhistorymM1)
            .bnd(() => mMplayerArchive.bnd(spliceAdd, i, playerMonad.s, mMplayerArchive)) 
            .bnd(() => mMsetArchive.bnd(spliceAdd, i, sMplayers.s, mMsetArchive) ) 
      document.getElementById('0').innerHTML = x[0];  
      document.getElementById('1').innerHTML = x[1];  
      document.getElementById('2').innerHTML = x[2];  
      document.getElementById('3').innerHTML = x[3]; 
      game2();
      cleanup();
  };

  var game2 = function game2 () {
      var ar = Array.from(sMplayers.s);
      document.getElementById('sb1').innerHTML = 'Name: ' +  pMname.x;  // kept current by playerMonad
      document.getElementById('sb2').innerHTML = 'Group: ' + pMgroup.x
      document.getElementById('sb3').innerHTML = 'Score: ' + pMscore.x
      document.getElementById('sb4').innerHTML = 'Goals: ' + pMgoals.x
      document.getElementById('sb5').innerHTML = 'Currently online: ';
      document.getElementById('sb6').innerHTML =  ar.join(', ');
      cleanup();
  };
 
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
  };  `  )

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

var factorsMonad = h('pre',  `  var factorsMonad = new MonadState('factorsMonad', [ 2, [], 4, [] ], [], factor_state); 

  function factor_state(v) {
    v[3].map(p => {
      if (v[2]/p == Math.floor(v[2]/p)) {v[1].push(p)}
    })
    return v;
  }  `  )

var factorsInput = h('pre',  `  var prFactTransformer = function prFactTransformer (s, m) {
    return m.run([s[0], [], mMfactors.x, s[3]])
  }

  const factorsPress$ = sources.DOM
    .select('input#factors_1').events('keydown');

  const factorsAction$ = factorsPress$.map(e => {
    mMfactors.ret(e.target.value);                  // Used in prFactTransformer (above)
    if (e.target.value == '') {return};
    if( e.keyCode == 13 && Number.isInteger(e.target.value*1) ) {
      var result;
      var factors = primesMonad.run([primesMonad.s[0], [], e.target.value, primesMonad.a])
      .bnd(prFactTransformer, factorsMonad).s[1];  // prFactTransformer (defined above) returns factorsMonad
      if (e.target.value == factors.slice().pop()){
        result = e.target.value + ' is a prime number'
      }
      else {
        result = 'The prime factors of ' + e.target.value + ' are ' + factors;
      }
      document.getElementById('factors_3').innerHTML = result;
    }
  });
             `  )

var playerMonad = h('pre',  `  var playerMonad = new MonadState('playerMonad', [name, group, score, goals], '', player_state);

  function player_state (v) {
    var x = v.slice();
    pMname.ret(x[0]);
    pMgroup.ret(x[1]);
    pMscore.ret(x[2]);
    pMgoals.ret(x[3]);
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

var e1 = h('pre',  `  var ret = function ret(v, id) {
    if (arguments.length === 1) {
      return (new Monad(v, 'anonymous'));
    }
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

var e2 = h('pre',  `  var c = m.ret(0).bnd(add,3).bnd(cube)
  .bnd(log,"m.x and a.x are  " + m.x + " and " + a.x + " respectively ")
  Output: In log. Entry:  m.x and a.x are  0 and 27 respectively 
  Note: m.x keeps its initial value of 0.

  m.bnd(() => add(0, 3).bnd(cube).bnd(m.ret).bnd(v => log("", "m.x is " + v))) 
  Output: In log. Entry:  m.x is 27
  Note: It doesn\'t matter what m.x was at the beginning of the computation.
 
  ret(3).bnd(v => ret(v*v).bnd(v2 => log("", "a squared is " + v2).bnd(() => 
  ret(4*4).bnd(v3 => log("", "a squared plus b squared is " + (v2 + v3), m)))))
  Output: In log. Entry:  a squared is 9
          In log. Entry:  a squared plus b squared is 25  `  )

var equals = h('pre',  `    var equals = function equals (mon1, mon2) {
      if (mon1.id === mon2.id && mon1.x === mon2.x) return true;
      else return false
    }  `  )

var p5 = h('pre',  `  
`  )

var p6 = h('pre',  `  
`  )

var p7 = h('pre',  `  
`  )





  export default {monad, equals, e1, e2, fib, driver, messages, next, monadIt, MonadSet, updateCalc, arrayFuncs, travel, nums, cleanup, ret, C42, newTask, process, mM$task, addString, colorClick, edit, testZ, quad, mdem1, runTest, todoStream, inc, ret_add_cube, seed,  add, traverse, MonadState, primesMonad, fibsMonad, primeFibInterface, tr3, fpTransformer, innerHTML, factorsMonad, factorsInput, playerMonad, MonadSet, promise, promiseSnippet, timeout, timeoutSnippet, examples, examples2, async }


