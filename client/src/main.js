import Cycle from '@motorcycle/core';
import {h, p, span, h1, h2, h3, br, div, label, input, hr, makeDOMDriver} from '@motorcycle/dom';
import {just, create, merge, combine, fromEvent, periodic, observe, delay, filter, of} from 'most';
import code from './code.js';

function createWebSocket(path) {
    let host = window.location.hostname;
    if(host == '') host = 'localhost';
    let uri = 'ws://' + host + ':3055' + path;
    let Socket = "MozWebSocket" in window ? MozWebSocket : WebSocket;
    return new Socket(uri);
}

const socket = createWebSocket('/');

const websocketsDriver = function () {
    return create((add) => {
      socket.onmessage = msg => add(msg)
    })
}

function main(sources) {
  mMindex.ret(0);

  mMZ1.bnd(v => O.mMt1.bnd(add,v,mMt1)
  .bnd(cube,mMt2)
  .bnd(() => mMt3.ret(O.mMt1.x + ' cubed is ' + O.mMt2.x)))
  
  mMZ2.bnd(v => cube(v).bnd(w => mMt3.ret(v + ' cubed is ' + w)))
  
  const messages$ = (sources.WS).map(e => {
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
  
  const updateMessages = function updateMessages (ar) {
    var sender = ar[2];
    mMhelper.ret(ar)
      .bnd(splice, 0, 3, mMhelper)
      .bnd(reduce, ((a,b) => {return a + ', ' + b}), mMhelper)
      .bnd(v => O.mMmsg.bnd(unshift, h('div', sender + ': ' + v), O.mMmsg));
  }

  const loginPress$ = sources.DOM
    .select('input#login').events('keypress');

  const loginPressAction$ = loginPress$.map(e => {
    let v = (e.target.value);
    if (v == '' ) {
      return;
    } 
    if( e.keyCode == 13 ) {
      socket.send("CC#$42" + v);
      mMname.ret(v.trim())
      mM3.ret([]).bnd(mM2.ret);
      e.target.value = '';
      document.getElementById('dice').style.display = 'block';
      document.getElementById('rightPanel').style.display = 'block';
      document.getElementById('log1').style.display = 'none';
      document.getElementById('log2').style.display = 'block';
      document.getElementById('gameDiv2').style.display = 'block';
    }
  });

  const groupPress$ = sources.DOM
    .select('input#group').events('keypress');

  const groupPressAction$ = groupPress$.map(e => {
    let v = e.target.value;
    if( e.keyCode == 13 ) {
      mMgroup.ret(v);
      socket.send(`CO#$42,${v},${O.mMname.x.trim()},${v}`);
      mMgoals.ret(0);
    }
  });

  const messagePress$ = sources.DOM
    .select('input.inputMessage').events('keydown');

  const messagePressAction$ = messagePress$.map(e => {
    if( e.keyCode == 13 ) {
      socket.send(`CD#$42,${O.mMgroup.x.trim()},${O.mMname.x.trim()},${e.target.value}`);
      e.target.value = '';
    }
  });

  var task2 = function task (str) { 
    console.log('In taskAction$. str is: ', str)
    socket.send('TD#$42' + ',' + O.mMgroup.x.trim() + 
        ',' + O.mMname.x.trim() + ',' + '@' + str);
  };

  const newTask$ = sources.DOM
    .select('input.newTask').events('keydown');

  const newTaskAction$ = newTask$.map(e => {
      let ob = {};
      var alert = '';
      var task = '';
      if( e.keyCode == 13 ) {
        var ar = e.target.value.split(',');
        if ( ar.length < 3 ) {
          alert = 'You should enter "author, responsible party, task" separated by commas';
          document.getElementById('alert').innerHTML = alert;
        }
        var ar2 = ar.slice(2);
        console.log('*************************************$$$$$$$$$$$_ar ', ar);
        if (ar2.length == 1) {
          task = ar[2];
        }
        if (ar2.length > 1) {
          task = ar2.reduce((a,b) => a + '$*$*$' + b);
        }
        if ( (O.mMar2.x.filter(v => (v.task == task)).length) > 0 ) {
          document.getElementById('alert').innerHTML = task + " is already listed.";
        }
        else if ( ar.length > 2 ) {
          O.mMcurrentList.bnd(addString, task + ',yellow, none, false,' +  ar[0] + ',' + ar[1], mMtemp)
          .bnd(v => task2(v));
          e.target.value = '';
          document.getElementById('alert').innerHTML = '';
        } 
      } 
  });

  const process = function(str) {
    var a = str.split(",");
    if (a == undefined) {
      return;
    };
    if (a.length < 9) {
      return
    };
    var ob = {};
    var ar = a.slice(3)
    var s = ar.reduce((a,b) => a + ',' + b);
    console.log('In process. ar and s are: ', ar, s);
    var tempArray = [];
    if (ar.length < 6) {return};
    if ((ar.length % 6) !== 0) {
      document.getElementById('alert').innerHTML = 'Error: array length is: ' + length;
    } 
    mMcurrentList.ret(s);
    process3(ar);
  }
    
  const process3 = function(a) {
    var ar5 = [];
    var keys = Array(a.length/6).fill(1);
    keys.map(_ => {
      ar5.push(
        {
          task: convertBack(a.shift()),
          color: a.shift(),
          textDecoration: a.shift(),
          checked: a.shift() === 'true',
          author: a.shift(),
          responsible: a.shift()
        }
      )
   })
    mMar2.ret(ar5);
    process4(ar5);
  };

  const process4 = function(a) {
    var tempArray = [];
    let keys = Object.keys(a);
    for (let k in keys) {
      tempArray.push(
        h('div.todo',  [
          h('span.task3', {style: {color: a[k].color, textDecoration: a[k].textDecoration}},
              'Task: ' + a[k].task  ),  
          h('br'),
          h('button#edit1', 'Edit'  ),
          h('input#edit2', {props: {type: 'textarea', value: a[k].task}, style: {display: 'none'}}  ), 
          h('span#author.tao', 'Author: ' + a[k].author  + ' / ' + 'Responsibility: ' + a[k].responsible),
          h('br'),
          h('input#cb', {props: {type: 'checkbox', checked: a[k].checked}, style: {color: a[k].color,
               textDecoration: a[k].textDecoration} } ), 
          h('label.cbox', { props: {for: '#cb'}}, 'Completed' ),
          h('button.delete', 'Delete'  ),  
          h('br'),
          h('hr')])
      )
    }
    mMtaskList.ret(tempArray)
  }

  const colorClick$ = sources.DOM
    .select('#cb').events('click')
    
  const colorAction$ = colorClick$.map(e => {
    let index = getIndex(e);
    let s = O.mMcurrentList.x;
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
    task2( ar.reduce((a,b) => a + ',' + b) )
  });

  const edit1$ = sources.DOM
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
    let a = O.mMcurrentList.x;
    let ar = a.split(',');
    let task = str.split(',').reduce((a,b) => ar + '$*$*$' + b)
    ar[index * 6] = task;
    let s = ar.reduce((a,b) => a + ',' + b);
    task2(s);
  };

  const deleteClick$ = sources.DOM
    .select('.delete').events('click')
    
  const deleteAction$ = deleteClick$.map(e => {
    let index = getIndex(e);
    let s = O.mMcurrentList.x;
    let ar = s.split(',');
    let str = '';
    ar.splice(index*6, 6);
    if (ar.length > 0) {
      task2(ar.reduce((a,b) => a + ',' + b));
    } else {
      socket.send('TX#$42' + ',' + O.mMgroup.x.trim() + ',' + O.mMname.x.trim() ); 
      mMtaskList.ret('');
    } 
  });

  const chatClick$ = sources.DOM
    .select('#chat2').events('click');

  const chatClickAction$ = chatClick$.map(() => {
    var el = document.getElementById('chatDiv');
    (el.style.display == 'none') ?
    el.style.display = 'inline' :
    el.style.display = 'none' 
  });
     
  const captionClick$ = sources.DOM
    .select('#caption').events('click');

  const captionClickAction$ = captionClick$.map(() => {
    var el = document.getElementById('captionDiv');
    (el.style.display == 'none') ?
    el.style.display = 'inline' :
    el.style.display = 'none' 
  });
     
  const gameClick$ = sources.DOM
    .select('#game').events('click');

  const gameClickAction$ = gameClick$.map(() => {
    var el = document.getElementById('gameDiv');
    (el.style.display == 'none') ?
    el.style.display = 'inline' :
    el.style.display = 'none' 
    
    var el2 = document.getElementById('gameDiv2');
    (el2.style.display == 'none') ?
    el2.style.display = 'inline' :
    el2.style.display = 'none' 
  });
     
  const runTest$ = sources.DOM
    .select('#runTest').events('click')
    
  const runTestAction$ = runTest$.map(() => {
    runTest();
});

  const todoClick$ = sources.DOM
    .select('#todoButton').events('click')
    
  const todoClickAction$ = todoClick$.map(e => {
    var el = document.getElementById('todoDiv');
    (el.style.display == 'none') ?
    el.style.display = 'inline' :
    el.style.display = 'none' 
});

  const rollClick$ = sources.DOM
    .select('.roll').events('click');

  const rollClickAction$ = rollClick$.map(e => {  
    mM13.ret(O.mM13.x - 1);
    mM8.ret(0);
    mM3.ret([]);
    socket.send('CG#$42,' + O.mMgroup.x.trim() + ',' + 
        O.mMname.x.trim() + ',' + -1 + ',' + O.mMgoals.x);
    socket.send('CA#$42,' + O.mMgroup.x.trim() + ',' + O.mMname.x.trim() + ',6,6,12,20')
  });

  // ************************************************************************* Original Fibonacci enter
  var fib2 = function fib2 (v) {
      if (v[2] > 1) {mM$fib.ret([v[1], v[0] + v[1], v[2] -1])}
      else {
        console.log(v[0]);
        mM19.ret(v[0]);
      }
  };

  const fibPress$ = sources.DOM
    .select('input#code').events('keydown');

  const fibPressAction$ = fibPress$.map(e => {
    if (e.target.value == '') {return};
    if( e.keyCode == 13 && Number.isInteger(e.target.value*1) ) {
      mM21.ret(e.target.value);
      fib2([0, 1, e.target.value]);
    }
    if( e.keyCode == 13 && !Number.isInteger(e.target.value*1 )) {
      mM19.ret("You didn't provide an integer");
    }
  });
// ************************************************************************* END Original Fibonacci END

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> START PRIME FIB  
  
  const fibKeyPress5$ = sources.DOM
    .select('input#fib3335').events('keydown');

  const fibKeyPressAction5$ = fibKeyPress5$.map(e => {
    if (e.target.value == '') {return};
    if( e.keyCode == 13 ) {
      var fibs = runFib(e.target.value)
      var fibs2 = fibs.filter(v => v <= Math.round(Math.sqrt(fibs[fibs.length - 1])));
      var c = fibs[fibs2.length];
      console.log('>>>>>>>>>>>> fibs2, c ', fibs2, c );
      var primes = runPrime(c);
      var primeFibs = pFib(fibs, primes);
      document.getElementById('PF_9').innerHTML = fibs;
      document.getElementById('PF_22').innerHTML = primes;
      document.getElementById('primeFibs').innerHTML = primeFibs;
    }
  });

  window.onload = function (event) {
    console.log('onopen event: ', event);
    document.querySelector('input#login').focus();
    mMitterfib5.release(200);
    // mM$prime5.ret([[2], 3, 3]);
  };

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> END basic prime END

// <>>><>><><><><>>>><><><  traversal  ><><><><><><>>><><><><><><><><><><><>< START traversal  



    const forwardClick$ = sources.DOM
      .select('#forward').events('click');

    const backClick$ = sources.DOM
      .select('#back').events('click');

    const forwardAction$ = forwardClick$.map(() => {
      if (O.mMindex.x < (O.mMhistorymM1.x.length - 1)) {
        O.mMindex.bnd(add, 1, mMindex)
        .bnd(v => trav(v))
      }
    });

    const backAction$ = backClick$.map(() => {
      if (O.mMindex.x > 0) {
        O.mMindex.bnd(add, -1, mMindex)
        .bnd(v => trav(v))
        socket.send('DE#$42,' + O.mMgroup.x.trim() + ',' + O.mMname.x.trim() + ', clicked the BACK button. ');
      }
    });

    const numClick$ = sources.DOM
      .select('.num').events('click');
       
    const numClickAction$ = numClick$.map(e => {
      console.log(e);
      if (O.mM3.x.length < 2) {
        O.mM3.bnd(push, e.target.innerHTML, O.mM3)
        mMtemp.ret(O.mMhistorymM1.x[O.mMindex.x].x)
        .bnd(splice, e.target.id, 1, mMtemp)
        .bnd(v => game(v));
      };
      if (O.mM3.x.length === 2 && O.mM8.x !== 0) {
        updateCalc();
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

    var trav = function trav (v) {
      document.getElementById('0').innerHTML = (O.mMhistorymM1.x[v].x)[0]; 
      document.getElementById('1').innerHTML = (O.mMhistorymM1.x[v].x)[1]; 
      document.getElementById('2').innerHTML = (O.mMhistorymM1.x[v].x)[2]; 
      document.getElementById('3').innerHTML = (O.mMhistorymM1.x[v].x)[3]; 
      cleanup();
    };

  function updateCalc() { 
    O.mM3.bnd(x => mM7
    .ret(calc(x[0], O.mM8.x, x[1]))
    .bnd(result => 
      {  O.mM1.bnd(push, result, mM1).bnd(z =>
         game(z));                                      
        if (result == 20) {score(O.mM13.x, 1)}; 
         if (result == 18) {score(O.mM13.x, 3)};
      }
    )) 
    reset()
  };

// <>>><>><><><><>>>><><><  traversal  ><><><><><><>>><><><><><><><><><><><>< END traversal  

  const testZ = sources.DOM
    .select('#testZ').events('click')
  const testZAction$ = testZ.map(() =>
    mMZ1.release(1));                                

  const testQ = sources.DOM
    .select('#testQ').events('click')
  const testQAction$ = testQ.map(() =>
    mMt1.ret(-1).bnd(mM2.ret)
    .bnd(() => mMZ1.release(1)));                                

  const testW = sources.DOM
    .select('#testW').events('keypress')
  const testWAction$ = testW.map((e) => {
    if( e.keyCode == 13 ) {
      mMZ2.release(e.target.value)
    }
  });

  var solve = (function solve () {
    mMZ3
    .bnd(a => mMquad1.ret(a + 'x**2')
    .bnd(() => mMquad2.ret('').bnd(mMquad3.ret) // Clear the display.
    .bnd(() => 
      mMZ3
      .bnd(b => mMquad1.ret(a + 'x**2 ' + ' + ' + b + 'x')
      .bnd(() =>  
        mMZ3
        .bnd(c => mMquad1
        .ret('Solutions for ' + a + 'x**2 ' + ' + ' + b + 'x' + ' + ' + c + ' = 0:')
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

  const dummyClick$ = sources.DOM
    .select('#dummy').events('click');

  const dummyAction$ = dummyClick$.map(e => {
    O.mMdummy.bnd(add, 1, mMdummy);
    console.log('<><><><><><><><><> In dummyAction$ e is: ', e);
    console.log(document.getElementById('dummy').click);
    console.log('<><><><><><><><><>');
    var next = O.mM23.x[O.mM23.x.length - 1]*1 +  O.mM23.x[O.mM23.x.length - 2]*1 
    O.mM23.bnd(push, next , mM23);
    document.getElementById('dummy2').innerHTML = O.mM23.x;
  });

  const calcStream$ = merge( forwardAction$, backAction$, dummyAction$, fibKeyPressAction5$, fibPressAction$, runTestAction$, quadAction$, testWAction$, testZAction$, testQAction$, edit1Action$, edit2Action$, colorAction$, deleteAction$, newTaskAction$, chatClickAction$, gameClickAction$, todoClickAction$, captionClickAction$, groupPressAction$, rollClickAction$, messagePressAction$, loginPressAction$, messages$, numClickAction$, opClickAction$ );
  
    return {
      DOM: 
        calcStream$.map(() => 
        h('div.content', [ 
        h('div#rightPanel',  {style: {display: 'none'}}, [
          h('span#tog', [
          h('button#game',  {style: {fontSize: '16px'}}, 'TOGGLE GAME'  ), 
          h('span.tao',' ' ),
          h('button#todoButton',  {style: {fontSize: '16px'}}, 'TOGGLE TODO LIST'  ),  
          h('br'),
          h('br'),
          h('button#chat2',  {style: {fontSize: '16px'}}, 'TOGGLE CHAT'  ),
          h('span.tao',' ' ),
          h('button#caption',  {style: {fontSize: '16px'}}, 'TOGGLE CAPTION'  )  ]),
          h('br'),
          h('br'),
          h('br'),
          h('br'),

          h('div#gameDiv',   [
          h('span',  'Group: ' + O.mMgroup.x ),
          h('br'),
          h('span',  'Goals: ' + O.mMgoals.x ),
          h('br'),
          h('span',  'Name: ' + O.mMname.x ),
          h('br'),
          h('span', 'player[score][goals]' ),
          h('div', O.mMscoreboard.x ) ]) ,
          h('br'),
          h('br'),  
          h('br'),  
    
          h('div#todoDiv',  [ 
            h('div#taskList', O.mMtaskList.x ),
            h('span', 'Author, Responsible Person, Task: '  ),  
            h('input.newTask' ) ]),
          h('br'),
          h('span#alert' ),
          h('br'),
          h('br'),

          h('div#chatDiv', [ 
          h('div#messages',  [
          h('span', 'Message: '  ),
          h('input.inputMessage' ),
          h('div', O.mMmsg.x  ) ]) ]) 
        ]),
        h('div.leftPanel', {  style: {width: '60%'   }},   [  
        h('br'),
        h('a.tao', {props: {href: '#common'}}, 'Common Patterns'   ),  
        h('a.tao', {props: {href: '#tdList'}}, 'Todo List Explanation'   ),  
        // h('a.tao', {props: {href: '#monads'}}, 'Why Call Them Monads'   ),  
        h('div#captionDiv', [
        h('h1', 'Motorcycle.js With JS-monads' ),
        h('span.tao1', ' A shared, persistent todo list, ' ),
        h('br'),
        h('span.tao1', ' A websockets simulated dice game with a traversable history, ' ),
        h('br'),
        h('span.tao1', ' Group chat rooms and more demonstrations of efficient, ' ),
        h('br'),
        h('span.tao2', ' maintainable code using Motorcycle.js and JS-monads.  ' ) ] ),
        h('br'),
        h('span.tao', 'This is a ' ),
        h('a', {props: {href: "https://github.com/motorcyclejs", target: "_blank" }}, 'Motorcycle.js' ),
        h('span', ' application. Motorcycle.js is ' ), 
        h('a', {props: {href: "https://github.com/cyclejs/core", target: "_blank" }}, 'Cycle.js' ),
        h('span', ' using ' ),
        h('a', {props: {href: "https://github.com/cujojs/most", target: "_blank" }}, 'Most' ),
        h('span', ' , ' ),
        h('span', ' and '  ), 
        h('a', {props: {href: "https://github.com/paldepind/snabbdom", target: "_blank" }}, 'Snabbdom' ),
        h('span', ' instead of RxJS and virtual-dom.  The code for this repository is at ' ),
        h('div#gameDiv2',  {style: {display: 'none'}}, [
        h('br'),
        h('span', ' Here are the basic rules:' ), 
        h('p', 'RULES: If clicking two numbers and an operator (in any order) results in 20 or 18, the score increases by 1 or 3, respectively. If the score becomes 0 or is evenly divisible by 5, 5 points are added. A score of 25 results in one goal. That can only be achieved by arriving at a score of 20, which jumps the score to 25. Directly computing 25 results in a score of 30, and no goal. Each time ROLL is clicked, one point is deducted. Three goals wins the game. '    ),
        h('button#0.num',   ),
        h('button#1.num',   ),
        h('button#2.num',   ),
        h('button#3.num',   ),
        h('br'),
        h('button#4.op', 'add'  ),
        h('button#5.op', 'subtract' ),
        h('button#5.op', 'mult' ),
        h('button#5.op', 'div' ),
        h('button#5.op', 'concat' ),
        h('br'),
        h('div#dice', {style: {display: 'none'}}, [ 
        h('button.roll', 'ROLL' ), 
        h('br'),
        h('button#back', 'BACK' ), 
        h('button#forward', 'FORWARD' ), ]) ]),
        h('div.winner', O.mMgoals2.x+''  ),
        h('div#log1', [
        h('p', 'IN ORDER TO SEE THE GAME, TODO LIST, AND CHAT DEMONSTRATIONS, YOU MUST ENTER SOMETHING BELOW.'  ),
        h('span', 'Name: ' ),
        h('input#login', {props: {placeholder: "focus on; start typing"}} ) ]),
        h('p', O.mM6.x.toString() ),
        h('div#log2', {style: {display: 'none'}}, [
        h('span', 'Change group: '  ),
        h('input#group' ) ]),
        h('p',  O.mMsoloAlert.x  ),
        h('p', 'People who are in the same group, other than solo, share the same todo list, messages, and simulated dice game. In order to see any of these, you must establish an identity on the server by logging in. The websockets connection terminates if the first message the server receives does not come from the sign in form. You can enter any random numbers or letters you like. The only check is to make sure someone hasn\t already signed in with whatever you have selected. '  ),
        h('hr' ),
        h('h1', 'The Monads'  ),     
        h('p', ' I call instances of the Monad and MonadState constructors "monads". Instances of Monad can probably be shown to be category theory monads in a restricted space where the bnd() method takes only a single argument, and that argument is a function mapping any Javascript value to some instance of Monad. But bnd() can take multiple arguments, and the return value doesn\'t have to be an instance of Monad. As you will see, I impose some restrictions on what I do with Monad instances for the sake of maintainability, predictability, and organization. If I had helpers on a project, I would ask them to do the same. I wouldn\'t modify the code to make it throw whenever someone attempted to deviate from the restrictions. Some would say that such a modification would be helpful, catching potential bugs before things went too far. I think it would be insulting; and who knows, there might be occasions when deviating would be the sensible thing to do. Anyway, here is Monad:  '  ),
        h('h2', ' Monad ' ),
        code.monad,
        h('p', ' Monad\'s bnd() and ret() methods provide functionality similar to the Haskell ">>=" (pronounced "bind") operator and the Haskell "return" function. They even conform to the optional Haskell monad laws. The following equality expressions demonstrate how the monads work. For any instance of Monad, say "m", and any Javascript value v, the following expressions return true: '),
        h('pre', `    m.ret(v).x = m.ret(v).bnd(m.ret).x   // m.ret(v) re-sets m.x to v
    m.ret(v).x == m.ret(v).ret(m.x).x
    mm.ret(v).bnd(add, 3).bnd(cube).x. == ret(v).bnd(v => add(v, 3).bnd(cube)).x  // Associativity
    ret(v).x == ret(v).bnd(ret).x
    ret(v).x == ret(ret(v)).x  ` ),
        h('p', ' where '  ),
        code.ret_add_cube,
       h('p', ' If the values of Monad instances are updated only through the use of the Monad ret() method, then the current state of the Monad instances exists in the mutable, global object named "O". Keeping changing monad state in one place (on the object "O") makes applications easier to reason about and easier to maintain. I treat Monad instances as though they were immutable, updating them only through the use of their ret() methods.   ' ),
        h('p', ' In the examples shown on this page, the initial values of instances of Monad remain unchaged. The ret() method places updated instances of the monad calling ret() on O. From the definition of ret() we know that for any monad m and value v, m.ret(v) updates O.m such that O.m.x = v. The ret() method does not mutate the instances of Monad referenced by the attributes of O. For any instance of Monad named "m" with id "m" and value v (i.e., m.x == v is true), m.ret(v2) creates a new attribute of O with key "m" or, if O.m already exists. m.ret(v2) mutates O by changing the value to which O.m refers. Before the change, O.m.x == v. After m.ret(v2), O.m.x == v2. For most practical purposes, it is as if O.m.x is the only thing that changed. But O.m is not mutated. If there is a reference to the original O.m, it will be preserved and calls to m.ret() will not affect it. Every time m.ret() is called, O.m refers to a newly created semi-clone of m with m.x referring to a (usually) different value. The traversable game display keeps replaced monads named "O.mM1" in an array named "O.mMhistorymM1".  ' ),
        h('h3', 'Examples' ),
        h('p', ' The convention "a == b" in this presentation signifies that a == b is true.' ), 
        h('p', ' From the definition of Monad, you can see that m1.bnd(m2.ret) results in m2.ret(m1.x) being called. After that operation, O.m2.x == v where m1.x == v. And if O.m1.x == v2, O.m1.bnd(m2.ret) results in O.m2.x == v2. If these assertions are perplexing, just take another look at the definition of Monad and work through the transformations one step at a time. Here are some examples of the use of the Monad methods bnd() and ret(): '  ),
        h('span.red3', 'cube(3)' ),
        h('span.td2', ' creates an anonymous monad with x == 27 and id == "anonymous". ' ),
        h('br' ),  
        h('br' ),  
        h('span.red3', 'cube(3).bnd(m.ret)' ),
        h('span.td2', ' O.m.x == 27 and O.m.id == "m". ' ),
        h('br' ),  
        h('br' ),  
        h('span.red3', 'cube(10).ret(cube(3).x)' ),
        h('span.td2', ' O.anonymous.x == 27 ' ),
        h('br' ),  
        h('br' ),  
        h('span.red3', 'cube(3).ret(cube(10).x)' ),
        h('span.td2', ' O.anonymous.x == 1000 ' ),
        h('br' ),  
        h('br' ),  
        h('span.red3', 'cube(3).bnd(cube(10).ret)' ),
        h('span.td2', ' O.anonymous.x == 27 ' ),
        h('br' ),  
        h('br' ),  
        h('span.red3', 'cube(5, m)' ), 
        h('span.td2', ' leaves the monad m unchanged, O.m.x == 125, and O.m.id == "m". ' ), 
        h('br' ),  
        h('br' ),  
        h('span.red3', 'cube(5).bnd(m.ret)' ), 
        h('span.td2', ' is equivalent to the previous example. m is unchanged and O.m.x == 125. ' ), 
        h('br' ),  
        h('br' ),  
        h('span.red3', 'ret(5).bnd(cube).bnd(m.ret)' ), 
        h('span.td2', ' is equivalent to the previous two examples. O.m.x == 125. ' ), 
        h('br' ),  
        h('br' ),  
        h('span.red3', 'm.ret(4).bnd(cube)' ), 
        h('span.td2', 'causes O.m.x == 4, and creates an anonymous monad with x == 64. ' ),
        h('br' ),  
        h('br' ),  
        h('span.red3', 'm.ret(4).bnd(cube, m)' ), 
        h('span.td2', ' leaves m unchanged, O.m.x == 64, and O.m.id == "m". ' ),
        h('br' ),  
        h('br' ),  
        h('span.tao', ' By the way, If you want to mutate m, ' ),
        h('span.red3', 'ret(newVal, "m")' ),
        h('span', ' will do the job. Now m.x == newVal and m.id = "m". I haven\'t found a need to do that sort of thing. I like to confine changing monad state to the mutable, global object "O", and leave the plain monads alone. That keeps the application tidy and manageable.  '  ),   
        h('p', ' Here are some examples using the function add(): '  ),
        h('span.red3', 'add(3, 4)' ),
        h('span.td2', ' creates a useless anonymous monad with x == 7 and id == "anonymous". ' ),
        h('br' ),  
        h('br' ),  
        h('span.red3', 'add(3, 4).bnd(m.ret)' ),
        h('span.td2', ' causes O.m.x == 7 and O.m.id == "m". ' ),
        h('br' ),  
        h('br' ),  
        h('span.red3', 'add(3, 4, m)' ), 
        h('span.td2', ' is equivalent to the prior example. The result is O.m.x == 7, and O.m.id == "m". ' ), 
        h('br' ),  
        h('br' ),  
        h('span.red3', 'm.ret(0).bnd(add, 3).bnd(cube)' ), 
        h('span.td2', 'leaves m unchanged, O.m.x == 0, and creates an anonymous monad with x == 27. ' ),
        h('br' ),  
        h('br' ),  
        h('span.red3', 'ret(0).bnd(add, 3).bnd(cube).bnd(m.ret)' ), 
        h('span.td2', 'causes O.m.x == 27, and O.m.id = "m". ' ),
        h('br' ),  
        h('br#iterLink', ),
        h('br' ),  
        h('span.red3', 'ret(0).bnd(add, 2, m).bnd(cube, m2)' ), 
        h('span.td2', ' causes O.m.x == 2, and O.m2.x == 8. ' ),
        h('br' ),  
        h('h2', 'MonadItter' ),
        h('p', ' MonadItter instances do not have monadic properties. I will eventually change the name to "Itter". ' ), 
        h('p', 'For any instance of MonadIter, say "m", the statement "m.bnd(func)" causes m.p == func to be true. The statement "m.release(...args) causes p(...args) to execute. Here is the definition: ' ), 
        code.monadIt,
        h('p', ' As shown later on this page, MonadIter instances control the routing of incoming websockets messages and the flow of action in the simulated dice game. In the demonstrations below, they behave much like ES2016 itterators. I prefer them over ES2016 itterators. '  ), 
        h('p', 'The following example illustrates the use of release() with an argument. It also shows lambda expressions being provided as arguments for bnd() and the release() method providing arguments to the expressions captured by bnd(). The initial values of mMt1, mMt2, and mMt3 are 0, 0, and "" respectively. When this page loads, the following code runs: ' ),
        code.testZ,
        h('p', ' add() and cube() are defined in the Monad section (above). If you click "mMZ1.release(1)" several times, the code (above) beginning with "mMZ1" will run several times, each time with v == 1. The result, O.mMt3.x, is shown below the button. mMZ1.p (bnd()\'s argument) remains constant while mMZ1.release(1) is repeatedly called, yielding a different result each time. ' ),
        h('button#testZ', 'mMZ1.release(1)'  ),
        h('p.code2', O.mMt3.x ),
        h('span', 'Refresh button: '  ),
        h('button#testQ', 'mMt1.ret(0).bnd(mMt2.ret)'  ),
        h('br' ),
        h('br' ),
        h('span.tao', '  You can call ' ),
        h('span.green', 'mMZ2.release(v)' ),
        h('span', ' by entering a value for v below: ' ), 
        h('br' ),
        h('span', 'Please enter an integer here: ' ), 
        h('input#testW' ), 
        h('p', ' Here is another example. It demonstrates lambda expressions passing values to a remote location for use in a computation. If you enter three numbers consecutively below, I\'ll call them a, b, and c, then the quadratic equation will be used to find solutions for a*x**2 + b*x + c = 0. The a, b, and c you select might not have a solution. If a and b are positive numbers, you are likely to see solutions if c is a negative number. For example, 12, 12, and -24 yields the solutions 1 and -2. ' ),
        h('p.code2#quad4', O.mMquad1.x ),
        h('span.red2', O.mMquad2.x ),
        h('span.red2', O.mMquad3.x ),
        h('br' ),
        h('span.tao' , 'Run mMZ3.release(v) three times for three numbers. The numbers are a, b, and c in ax*x + b*x + c = 0: ' ),
        h('input#quad' ),  
        h('p', 'Here is the code:' ),
        code.quad,
        h('span#tdList' ),
// ***************************************************************************************************** START MonadState
        h('h2', 'The State Monad: MonadState' ),  
        h('p', ' An instance of MonadState holds the current state and value of a computation. For any instance of MonadState, say m, these can be accessed through m.s and m.a, respectively.  '   ),  
        code.MonadState,
        h('p', ' MonadState reproduces some of the functionality found in the Haskel Module "Control.Monad.State.Lazy", inspired by the paper "Functional Programming with Overloading and Higher-Order Polymorphism", Mark P Jones (http://web.cecs.pdx.edu/~mpj/) Advanced School of Functional Programming, 1995. The following demonstrations use the MonadState instances fibsMonad and primesMonad to create and store arrays of fibonacci numbers and arrays of prime numbers, respectively. fibsMonad and primesMonad provide a simple way to compute lists of prime fibonacci numbers.  Because of the memoization inherent in instances of MonadState, it was easy to make sure that no number is ever computed twice. Here is the definition of fibsMonad, along with the function it uses. ' ), 
       code.fibsMonad, 
        h('p', ' The other MonadState instance used in this demonstration is primesMonad. The function primes_state is primesMonad\'s process attribute. The value returned by the method run() of any instance of MonadPrimes must be an array, let\'s call it arr, whose fourth element (arr[3]) is the value that will be the monad\'s "a" attribute. The third element (arr[2]) is not used by primesMonad, but might be used for diagnostic purposes. For example, the function calling primesMonad.run() could identify itself in arr[2]. Here is the definition of primesMonad along with its auxiliary function:  ' ),  
        code.primesMonad,
        h('p', ' pFib takes an array of Fibonacci numbers and an array of prime number, returning an array of prime Fibonacci number. Here is the definition of pFib: ' ),
        code.pFib,
        h('p', ' Two abstractions over fibsState.run and primesState.run provide convenience, assure that no number is computed more than once, and assure that propper boilerplate is supplied to the StateMonad instances. Here are the definitions of runFib and runPrime: ' ),
        code.helperFunctions,
        h('p', ' With these support functions in place, the user interface is very simple. Here it is: ' ),
        code.primeFibInterface,
        h('p', ' These are the first eleven proven prime Fibonacci numbers: ' ),
        h('pre', `2,3,5,13,89,
233,1597,28657,514229,433494437,
2971215073 ` ),
        h('p', ' I entered 44 in the Firefox browser to generate the prime Fibonacci number 433,494,437. It took only a few seconds. I entered 50 and got all eleven of the numbers shown above. The wait was arround one minute, and the desktop computer cooling fan could be heard spinning a little faster than normal during the process. My Chrome browser is much slower, and sometimes fails to display the prime fibonacci numbers when large arrays smaller than previously computed arrays are requested. Firefox consistently shows all three arrays.  ' ),
        h('p', ' The number you enter below is the length of the list of Fibonacci numbers you want to generate.  ' ),  
        h('p',  ),  
        h('input#fib3335',  ),
        h('br' ),
        h('span#PF_7.red6', 'Fibonacci Numbers' ),  
        h('br' ),
        h('span#PF_9.red7',  ),  
        h('br' ),
        h('span#PF_21.red6', 'Prime Numbers' ),  
        h('br' ),
        h('span#PF_22.red7',  ),  
        h('br' ),
        h('span#PF_8.red6', 'Prime Fibonacci Numbers' ),  
        h('br' ),
        h('span#primeFibs.red7',  ),  
//************************************************************************************************************* END MonadState
        h('h2', 'Immutable Data And The State Object "O" ' ),
        h('h3', ' Mutations   ' ),
       h('p', ' Mutations in this application are confined to the global state object "O", MonadIter instances, and within function scopte. Functions in this application do not have side effects. If a function argument is an array, say "ar", I make a clone by calling "ar = ar.slice()" before mutating ar. That way, the original ar is uneffected by whatever happens inside the function. ' ),
       h('p', ' Regarding mutations of MonadItter instances: In the MonadItter examples (above), bnd() is called only once on each instance of MonadItter. Essentially, the bnd() method defines the MonadItter instances. The definitions of MonadItter instances create generic templates waiting for their bnd() methods to give them meaning. The p attribute of a MonadItter instance starts out referencing "f () {}" and refers to something useful when an argument is provided to its bnd() method. In this case, mutation can\'t possibly cause any mischief. ' ),
         h('h3', ' Monad Updates ' ),
         
       h('p', 'All monad updates caused by the monad ret() method are stored in the object "O". When a monad m executes m.ret(v) for some value "v", m remains unchanged and the O attribute O.m is created or, if it already exists, is replaced by the update; i.e., O.m.x == v becomes true. Older versions of m are subject to garbage collection unless there is a reference to them or to an object (arrays are objects) containing m.  This is illustrated in the score-keeping code below.  All score changes are captured by mM13.ret(). Therefore, O.mM13.x is always the current score. Replacing monad attributes in O is vaguely analogous to swapping out ServerState in the Haskell server\'s state TMVar. Older versions of ServerState can be preserved in the server just as prior versions of O.mM13 can be preserved in the front end. ' ),     
       h('h3', 'Storing Monads That Have Been Replaced In O'  ),
       h('p', ' The history of the number display in the game can be traversed in either direction until a player achieves a goal. After that, the traversable history builds up until another goal is achieves. Players can use historical displays, so to keep competition fair, group members are notified when another member clicks the BACK button. '  ),
       code.traverse,  
       h('p', ' It would have been more efficient to just save the arrays rather than the monads that hold them. But this isn\'t about recommended practices right now. It is a demonstration of a use of the not-mutated monads on the mutable global object "O". I write "not-mutated" because the monads can be clobbered anytime you want. But if values are replaced using the Monad ret() method, as is the case in this demonstration, monads on "O" are replaced, not mutated. '  ),
 


        h('h2', 'Updating the DOM'  ),
        h('h3', 'Todo List DOM Updates' ),
        h('br' ),
        h('h3', 'Dice Game DOM updates' ),
        h('p', ' mMcurrentRoll.ret() is called only when (1) a new dice roll comes in from the server, (2) when a player clicks a number, and (3) when clicking a number or operator results in a computation being performed. These are the three things that require a DOM update. When a player clicks a number, it disappears from number display. When a computation is performed, the result is added to the number display, unless the result is 18 or 20. A result of 18 or 20 results in a new roll coming in from the server ' ),
        h('p', ' I like the way Cycle.js and Motorcycle.js are unopinionated. DOM updates can be accomplished by permanently placing a mutating list of strings in the virtual DOM description, or by calling element.innerHTML = newValue. Either way, the actual DOM gets mutatated immediately, and mutating the DOM is what interactive applications are all about. Well, unless you load fresh pages every time something changes. I guess some people are still doing that.  ' ),
        h('hr' ),  
        h('h2', 'Concise Code Blocks For Information Control' ),
        h('p', ' Incoming websockets messages trigger updates to the game display, the chat display, and the todo list display. The members of a group see what other members are doing; and in the case of the todo list, they see the current list when they sign in to the group. When any member of a group adds a task, crosses it out as completed, edits its description, or removes it, the server updates the persistent file and all members of the group immediately see the revised list.  '  ),
        h('p', 'The code below shows how incoming websockets messages are routed. For example, mMZ10.release() is called when a new dice roll (prefixed by CA#$42) comes in.   ' ),
        code.messages,
        h('p', ' The "mMZ" prefix designates instances of MonadIter. The bnd() method assigns its argument to the "p" attribute. "p" runs if and when the release() method is called. The next() function releases a specified MonadIter instance when the calling monad\'s value matches the specified value. next2() releases the specified monad when the specified condition returns true. The release method in next() has no argument, but next does take arguments, as illustrated below.' ),
        h('span.tao', ' The incoming messages block is just a syntactic variation of a switch block, but that isn\'t all that MonadIter instances can do. They can provide fine-grained control over the lazy evaluation of blocks of code. Calling release() after a function completes some task provides Promise-like behavior. Error handling is optional. The MonadInter release(...args) method facilitates sequential evaluation of code blocks, remeniscent of video and blog explanations of ES6 iterators and generators. I prefer doing it with MonadIter over "yield" and "next". For one thing, ES6 generator "yield" blocks must be evaluated in a predetermined order. This link takes you back to the MonadIter section with interactive examples of the use of release() with arguments.  ' ),
        h('a#tdList2', {props: {href: '#iterLink'}}, 'release() with arguments'   ),  
        h('br' ),
        h('br' ),
        h('a', {props: {href: '#top'}}, 'Back To The Top'   ),  
        h('br' ),
        h('h3', 'The Todo List' ),
        h('p', ' Next, I\'ll go over some features of the todo list application. This will show how Motorcycle.js and the monads work together.' ),
        h('p', 'Creation Of A Task: If you enter something like Susan, Fred, Pay the water bill, the editable task will appear in your browser and in the browsers of any members a group you might have created or joined. If you have loaded this page in another tab and changed to the same group in both, you will see the task in both tabs, barring some malfunction. The task has a delete button, an edit button, and a "Completed" checkbox. It shows that Susan authorized the task and Fred is responsible for making sure it gets done. Instead of entering an authority and responsible person, you can just enter two commas before the task description. Without two commas, a message appears requesting more information. ' ),
        code.newTask,
        h('p', 'mM$taskList caries a string representing the task list. mMtaskList.x.split(",") produces an array whose length is a multiple of six. Commas in the task description are replaced by "$*$*$" so split(",") will put the entire task description in a single element. Commas are re-inserted when the list arrives from the server for rendering. Although a task list is a nested virtual DOM object (Snabbdom vnode), it can be conveniently passed back and forth to the server as a string without resorting to JSON.stringify. Its type is Text on the server and String in the front end, becomming a virtual DOM node only once, when it arrives from the server prefixed by "DD#$42" causing "process(e.data) to execute. Here is process(): ' ),
        code.process,
        h('span.tao', 'As you see, the string becomes a list of six-element objects, then those objects are used to create a Snabbdom vnode which is handed to mM$taskList.ret() leading to the update of O.mMtaskList. O.mMtaskList.x sits permanently in the main virtual DOM description. '  ),
        h('a', {props: {href: "https://github.com/dschalk/JS-monads-stable"}}, 'https://github.com/dschalk/JS-monads-stable' ),
        h('br'),
        h('p', ' Clicking "Completed": When the "Completed" button is clicked, the following code runs:         '  ),
        code.colorClick,
        h('p', 'O.mMtaskList is split into an array. Every sixth element is the start of a new task. colorAction$ toggles the second, third, and fourth element in the task pinpointed by "index" * 6. getIndex finds the index of the first and only the element whose task description matches the one that is being marked "Completed". I say "only" because users are prevented from adding duplicate tasks. After the changes are made, the array of strings is reduced to one string and sent to the server by task2(). '  ),  
        
        h('p', ' This is the code involved in editing a task description: '  ),
        code.edit,
        h('p', 'Clicking "Edit" causes a text box to be displayed. Pressing <ENTER> causes it to diappear. edit2Action$ obtains the edited description of the task and the index of the task iten and provides them as arguments to process. Process exchanges $*$*$ for any commas in the edited version and assigns the amended task description to the variable "task". O.mMtaskList.x is copied and split into an array. "index * 6" is replaced with "task" and the list of strings is reduced back to a single string and sent to the server for distribution. This pattern, - (1) split the string representation of the todo list into an array of strings, (2) do something, (3) reduce the list of strings back to a single string - is repeated when the "Delete" button is clicked. If the last item gets deleted, the server is instructed to delete the persistent file bearing the name of the group whose member deleted the last task. ' ), 
        h('p#common', 'Cycle.js has been criticized for not keeping state in a single location, the way React.js does. Motorcycle.js didn\'t do it for me, or try to force me to do it, but it so happens that the current state of all active monads is in the object "O". I have written applications in Node.js and React.js, and I can say without a doubt that Motorcycle.js provides the best reactive interface for my purposes.  ' ),
        h('hr'),
        h('a', {props: {href: '#top'}}, 'Back To The Top'   ),  
        h('h2', 'Common Patterns' ),
        h('p', 'Anyone not yet familiar with functional programming can learn by studying the definition of the Monad bnd() method and considering the common patterns presented below. Often, we want to give a named monad the value of an anonymous monad returned by a monadic computation. Here are some ways to accomplish that: '  ),
        h('p', 'For any monads m1 and m2 with values a and b respectively (in other words, m1.x == a and m2.x == b return true), m1.bnd(m2.ret) provides m1\'s value to m2.ret() causing O.m2 to have m1\'s value. So, after m1.bnd(m2.ret), m1.x == a, m2.x == b, O.m2.x == a all return true. The definition of Monad\s bnd() method shows that the function m2.ret() operates on m1.x. m1.bnd(m2.ret) is equivalent to m2.ret(m1.x). The stand-alone ret() function can be used to alter the current value of m2, rather than altering the value of O.m2. Here is one way of accomplishing this: m1.bnd(x => ret(x,"m2"). These relationships are demonstrated in the following tests: ' ),
        h('pre', 
`             ret('m1Val','m1')
             m1.x === 'm1Val'   // true
             ret('m2Val', 'm2')
             m2.x === 'm2Val'   // true

             m1.bnd(m2.ret)
             O.m2.x === 'm1Val' // true
             m2.x === 'm2Val'   // still true

             m1.ret('newVal')
             O.m1.bnd(v => ret(v, 'm2'))
             m2.x === 'newVal'  // true
             O.m2.x === 'm1Val' // true   still the same  `   ),
        h('p', ' Here are two basic ways to create a monad named "m" with id = "m" and value v: '  ),
        h('pre',
`  var m = new Monad(v, "m");
  ret(v, "m");  `  ),  
        h('p', 'Let m be a monad with id == "m" and value v. Its bnd() method can return an anonymous monad, a new named monad, or a previously existing monad containing the computation result. To illustrate, here is the definition of "add" along with five uses of it: ' ),
        code.add,  
        h('p'  ), 
        h('hr'),
        h('hr' ),  
        h('a', {props: {href: '#top'}}, 'Back To The Top'   ),  
        h('a', {props: {href: '#top'}}, 'Back To The Top'   ),  
        h('p',  ),  
        h('p',  ),  
        h('p',  ),  
        h('br'),  
        h('br'),  
        h('br'),  
        h('br'),  
        h('br'),  
        h('br'),  
        h('br'),  
        h('br'),  
        h('br'),  
        h('br'),  
        h('br'),  
        h('br'),  
        h('br'),  
        h('br'),  
        h('br'),  
        h('span#dummy2.red3' ),  
        h('hr'),  
        h('button#dummy', O.mMdummy.x ),  
        h('p' ),  
        h('p' ),  
        h('p', '.' ),  
        h('p', '.' ),  
        h('p', '.' ),  
        h('p', '.' ),  
        h('p', '.' ),  
        h('p' ),  
        h('p' ),  
        h('p' ),  
        h('p' ),  
        h('p' )  
        ])
      ])
    )}} 

  function cleanup (x) {
      let target0 = document.getElementById('0');
      let target1 = document.getElementById('1');
      let target2 = document.getElementById('2');
      let target3 = document.getElementById('3');
      let targetAr = [target0, target1, target2, target3];
      [0,1,2,3].map(i => {
        if (targetAr[i].innerHTML == 'undefined' )    {
          targetAr[i].style.display = 'none';
        }
        else {
          targetAr[i].style.display = 'inline';
        }
      });
      return ret(x);
  };

  var score = function score(x,j) {
    if ((x + j) == 20) {
      mMgoals.ret(O.mMgoals.x == 2 ? 0 : (O.mMgoals.x + 1)); 
      mM13.ret(0).bnd(mMindex.ret);
      mMhistorymM1.ret([ret([0,0,0,0])]);   
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
 };

  var reset = function reset () {
      mM3.ret([])
      .bnd(() => mM4.ret(0)
      .bnd(mM8.ret)
      .bnd(cleanup))
  }

  var updateScoreboard = function updateScoreboard(v) {
    let ar2 = v.split("<br>");
    let keys = Object.keys(ar2);
    let ar = [];
    keys.map(k => {
      ar.push(h('div', ar2[k]))
    });
    return mMscoreboard.ret(ar);
  };

  var displayOff = function displayOff(x,a) {
      document.getElementById(a).style.display = 'none';
      return ret(x);
  };

  var displayInline = function displayInline(x,a) {
      if (document.getElementById(a)) document.getElementById(a).style.display = 'inline';
      return ret(x);
  };

  var newRoll = function(v) {
    socket.send('CA#$42,' + O.mMgroup.x.trim() + ',' + O.mMname.x.trim() + ',6,6,12,20' )
    return ret(v);
  };

  var refresh = function() {
    setTimeout( function () {
       document.location.reload(false);
     },4000);
  };

  const sources = {
    DOM: makeDOMDriver('#main-container'),
    WS: websocketsDriver,
  }

  Cycle.run(main, sources);


