import Cycle from '@motorcycle/core';
import {h, p, span, h1, h2, h3, br, div, label, input, hr, makeDOMDriver} from '@motorcycle/dom';
import {just, create, merge, combine, fromEvent, periodic, observe, delay, filter, of} from 'most';
import code from './code.js';
import {subject} from 'most-subject'
var Datastore = require('nedb');
var db = new Datastore({data: './', autoload: true});
db.loadDatabase();

var ar = [1,2,3,4,5];
db.insert(ar);
var ar2 = db.find(ar);
console.log(ar2);

mM6.ret('');

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

const unitDriver = function () {
  return periodic(1000, 1);
}

mM3.ret([]);

window.onload = function (event) {
  console.log('onopen event: ', event);
};

function main(sources) {

  mMfib.ret([0,1]);
  mMpause.ret(0);
  
  const messages$ = (sources.WS).map(e => 
    mMar.ret(e.data.split(','))
    .bnd(v => {
      mMsender.ret(v[2]);
      mMextra.ret(v[3]);
      mMextra2.ret(v[4])
      .bnd(() => console.log('In messages$ e is ', e));
      mMprefix.ret(v[0])
      .bnd(next, 'CA#$42', mMZ10)
      .bnd(next, 'CB#$42', mMZ11)
      .bnd(next, 'CC#$42', mMZ12)
      .bnd(next, 'CD#$42', mMZ13)
      .bnd(next, 'CE#$42', mMZ14)
      .bnd(next, 'CF#$42', mMZ15)
      .bnd(next, 'EE#$42', mMZ16)
      .bnd(next, 'CH#$42', mMZ17)
      .bnd(next, 'CK#$42', mMZ18)
    } ));
    mMZ10.bnd(() => mM$1
      .ret([O.mMar.x[3], O.mMar.x[4], O.mMar.x[5], O.mMar.x[6]])
      .bnd(() => mM$2.ret([])))
    mMZ11.bnd(() => updateScoreboard(O.mMar.x[3]));
    mMZ12.bnd(() => mM6
      .ret(O.mMar.x[2] + ' successfully logged in.'));
    mMZ13.bnd(() => O.mMar
      .bnd(splice, 0, 3, mMhelper)
      .bnd(reduce, ((a,b) => {return a + ', ' + b}), mMhelper)
      .bnd(v => O.mMmsg.bnd(unshift, h('div', O.mMsender.x + ': ' + v), O.mMmsg)));
    mMZ14.bnd(() => mMgoals2.ret('The winner is ' + O.mMsender.x ));
    mMZ15.bnd(() => O.mMar
      .bnd(splice, 0, 5, mMhelper)
      .bnd(reduce, ((a,b) => {return a + ', ' + b}), mMhelper)
      .bnd(v => O.mM$task
           .bnd(unshift, {'task': v, 'author': O.mMextra.x, 'responsible': O.mMextra2.x},  mM$task)
          ));
    mMZ16.bnd(() => mMgoals2.ret('A player named ' + 
        O.mMname.x + 'is currently logged in. Page will refresh in 4 seconds.')
      .bnd(refresh));
    mMZ17.bnd(() => {
      console.log('sender and name: ', O.mMsender.x, O.mMname.x);
      if (O.mMsender.x == O.mMname.x) {
        checkBox2(O.mMextra.x);
        return;
      }
      checkBox(O.mMextra.x);
    });
    mMZ18.bnd(() => O.mM24.bnd(log, '************in mMZ18 ')
      .bnd(() => edit(O.mMextra.x, O.mMextra2.x)));
  
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
    }
  });

  const mM$taskAction$ = mM$task.stream.map(obList => refreshTasks(obList));

  const groupPress$ = sources.DOM
    .select('input#group').events('keypress');

  const groupPressAction$ = groupPress$.map(e => {
    let v = e.target.value;
    if (v == '' ) {
      return;
    } 
    if( e.keyCode == 13 ) 
      mMgroup.ret(e.target.value);
      socket.send(`CO#$42,${e.target.value},${O.mMname.x.trim()},${e.target.value}`);
  });

  const messagePress$ = sources.DOM
    .select('input.inputMessage').events('keydown');

  const messagePressAction$ = messagePress$.map(e => {
    if( e.keyCode == 13 ) {
      socket.send(`CD#$42,${O.mMgroup.x.trim()},${O.mMname.x.trim()},${e.target.value}`);
      e.target.value = '';
    }
  });

  const newTask$ = sources.DOM
    .select('input.newTask').events('keydown');

  const newTaskAction$ = newTask$.map(e => {
    if( e.keyCode == 13 ) {
      if ( e.target.value.split(',').length < 3 ) {
        console.log('You must enter "author, responsible party, task" separated by commas');
        return;
      }
      socket.send(`CF#$42,${O.mMgroup.x.trim()},${O.mMname.x.trim()},${e.target.value}`);
      e.target.value = '';
    }
  });

  const colorClick$ = sources.DOM
    .select('#cb').events('click')
    
  const colorAction$ = colorClick$.map(e => {
    let index = getIndex(e);
    console.log('In colorAction$  e and index are: ', e, index);
    socket.send(`CH#$42,${O.mMgroup.x.trim()},${O.mMname.x.trim()},${index}`);
  });

  function checkBox (index) {
    let elem = O.mM$taskList.x[index].children[0].elm;
    let elem2 = O.mM$taskList.x[index].children[6].elm;
    elem.style.color == 'yellow' ?
       elem.style.color = '#00ff6a' :
       elem.style.color = 'yellow'  

    elem.style.textDecoration == 'none' ?
      elem.style.textDecoration = 'line-through' :
      elem.style.textDecoration = 'none'  

    elem2.checked ?
      elem2.checked = false :
      elem2.checked = true  

  }

  function checkBox2 (index) {
    let elem = O.mM$taskList.x[index].children[0].elm;
    let elem2 = O.mM$taskList.x[index].children[6].elm;
    elem.style.color == 'yellow' ?
       elem.style.color = '#00ff6a' :
       elem.style.color = 'yellow'  

    elem.style.textDecoration == 'none' ?
      elem.style.textDecoration = 'line-through' :
      elem.style.textDecoration = 'none'  
  }

  const edit1$ = sources.DOM
    .select('#edit1').events('click')
    
  const edit1Action$ = edit1$.map(e => {
    let index = getIndex2(e);
    console.log('e and getIndex2(e) in colorAction$ ', e, index);
    O.mM$taskList.x[index].children[3].elm.style.display = 'block';
  });

  const edit2$ = sources.DOM
    .select('input#edit2').events('keydown');

  const edit2Action$ = edit2$.map(e => {
    if( e.keyCode == 13 ) {
      let index = getIndex2(e);
      socket.send('CK#$42,' + O.mMgroup.x.trim() + ',' + O.mMname.x.trim() + ',' + index + ',' + e.target.value);
      O.mM$taskList.x[index].children[3].elm.style.display = 'none';
    }
  });

  var edit = function edit (index, task) {
    O.mM$task.x[index].task = task;
    mM$task.ret(O.mM$task.x) 
  }

  const deleteClick$ = sources.DOM
    .select('.delete').events('click')
    
  const deleteAction$ = deleteClick$.map(e => {
    let index = getIndex(e);
    console.log('e and index in deleteAction$ ', e, index);
    O.mM$task.bnd(splice, index, 1, O.mM$task).bnd(ar => refreshTasks(ar))
  });

  function refreshTasks (ar) {
    mM28.ret([]);
    let keys = Object.keys(ar);
    for(let k in keys) {
      O.mM28.bnd(push,
        h('div.todo',  [
          h('span.task3', {style: {color: 'yellow', textDecoration: 'none'}}, 'Task: ' + ar[k].task  ),  
          h('br'),
          h('button#edit1', 'Edit'  ),
          h('input#edit2', {props: {type: 'textarea', value: ar[k].task}, style: {display: 'none'}}  ), 
          h('span#author.tao', 'Author: ' + ar[k].author  + ' / ' + 'Responsibility: ' + ar[k].responsible),
          h('br'),
          h('input#cb', {props: {type: 'checkbox'}}, ), 
          h('label.cbox', { props: {for: '#cb'}}, 'Completed' ),
          h('button.delete', 'Delete'  ),  
          h('br'),
          h('hr')]), mM28)
    }
    mM$taskList.ret(O.mM28.x);
  }

  const chatClick$ = sources.DOM
    .select('#chat2').events('click');

  const chatClickAction$ = chatClick$.map(() => {
    var el = document.getElementById('chatDiv');
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
  });
     
  const todoClick$ = sources.DOM
    .select('#todoButton').events('click')
    
  const todoClickAction$ = todoClick$.map(e => {
    var el = document.getElementById('todoDiv');
    (el.style.display == 'none') ?
    el.style.display = 'inline' :
    el.style.display = 'none' 
});

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

  const rollClick$ = sources.DOM
    .select('.roll').events('click');

  const rollClickAction$ = rollClick$.map(e => {  
    mM13.ret(O.mM13.x - 1);
    socket.send('CG#$42,' + O.mMgroup.x.trim() + ',' + O.mMname.x.trim() + ',' + -1 + ',' + O.mMgoals.x);
    socket.send(`CA#$42,${O.mMgroup.x},${O.mMname.x.trim()},6,6,12,20`);
  });

  const fibPress$ = sources.DOM
    .select('input#code').events('keydown');

  const fibPressAction$ = fibPress$.map(e => {
    let v = e.target.value;
    if (v == '' ) {
      return;
    } 
    if( e.keyCode == 13 && Number.isInteger(v*1) ) {
      var result = mMfib.bnd(fib,v).x;
      mM19.ret(result);
    }
    if( e.keyCode == 13 && !Number.isInteger(v*1) ) mM19.ret("You didn't provide an integer");
  });

  const forwardClick$ = sources.DOM
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

  const mM$1Action$ = mM$1.stream.map(v => {
    console.log('In mM$Action$ v is ', v);
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
  });

  const mM$3Action$ = mM$3.stream.map(v => {
    document.getElementById('0').innerHTML = (O.mMhistorymM1.x[O.mMindex2.x])[0]; 
    document.getElementById('1').innerHTML = (O.mMhistorymM1.x[O.mMindex2.x])[1]; 
    document.getElementById('2').innerHTML = (O.mMhistorymM1.x[O.mMindex2.x])[2]; 
    document.getElementById('3').innerHTML = (O.mMhistorymM1.x[O.mMindex2.x])[3]; 
    cleanup();
  })

  const mM$2Action$ = mM$2.stream.map(v => {
    O.mMhistorymM3.bnd(push, v, O.mMhistorymM3);
    console.log('From mM$2.stream: ', v);
  });

  const calcStream$ = merge( edit1Action$, edit2Action$,  mM$taskAction$, colorAction$, deleteAction$, newTaskAction$, chatClickAction$, gameClickAction$, todoClickAction$, mM$3Action$, mM$2Action$, mM$1Action$, backClickAction$, forwardClickAction$, fibPressAction$, groupPressAction$, rollClickAction$, messagePressAction$, loginPressAction$, messages$, numClickAction$, opClickAction$ );

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
        h('button#chat2',  {style: {fontSize: '16px'}}, 'TOGGLE CHAT'  )  ]),
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
          h('div#taskList', O.mM$taskList.x ),
          h('span', 'Author, Responsible Person, Task: '  ),  
          h('input.newTask', ) ]),
        h('br'),
        h('br'),
        h('br'),
        h('br'),

        h('div#chatDiv', [ 
        h('div#messages',  [
        h('span', 'Message: '  ),
        h('input.inputMessage', ),
        h('div', O.mMmsg.x  ) ]) ]) 
      ]),
      h('div.leftPanel', {  style: {width: '60%'   }},   [  
      h('br'),
      h('h2', 'JS-monads-part6 - Shared Todo List' ),
      h('span', ' Here are the basic rules:' ), 
      h('p', 'This installment of the Javascript monad series features a shared todo list, along with the game from the previous installment. Here are the rules: '   ),
      h('p', 'RULES: If clicking two numbers and an operator (in any order) results in 20 or 18, the score increases by 1 or 3, respectively. If the score becomes 0 mod 5, 5 points are added. A score of 25 results in one goal. That can only be achieved by arriving at a score of 20, which jumps the score to 25. Directly computing 25 results in a score of 30, and no goal. Each time ROLL is clicked, one point is deducted. Three goals wins the game. '    ),
      h('br'),
      h('br'),
      h('button#0.num'),
      h('button#1.num'),
      h('button#2.num'),
      h('button#3.num'),
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
      h('button#back2', 'FORWARD'  ),
      h('button#forward2', 'BACK'  ) ]),
      h('br'),
      h('div.winner', O.mMgoals2.x+''  ),
      h('div#log1', [
      h('p', 'IN ORDER TO SEE THE DEMONSTRATIONS, YOU MUSH ENTER SOMETHING BELOW.'  ),
      h('span', 'Name: ' ),
      h('input#login', ) ]),
      h('p', O.mM6.x.toString() ),
      h('div#log2', {style: {display: 'none'}}, [
      h('span', 'Change group: '  ),
      h('input#group', ) ]),
      h('br'),
      h('br'),
      h('span', 'People in the same group, other than solo, share text messages and dice rolls. '  ),
      h('hr',  ),
      h('p', 'As is apparent from the definition of Monad, when some monad "m" uses its "bnd" method on some function "f(x,v)", the first argument is the value of m (which is m.x). The return value of m.bnd(f,v) is f(m.x, v). Here is a function which takes two arguments: ' ),
      code.fib,
      h('p', 'If you enter some number "n" in the box below, mMfib, whose initial value is [0,1], uses its bnd method as follows:' ),  
      h('p', {style: {color: '#FF0000'}}, 'mMfib.bnd(fib,n)' ),
      h('p',   'The result will be displayed underneath the input box. ' ),
      h('br'),
      h('input#code', ),  
      h('p#code2', O.mM19.x ),  
      h('br', ),  
      h('p', ), 
      h('hr', ),  
      h('hr',),  
      h('p', ' . ' ), 
      h('p', ),  
      h('p', )  
      ])
    ])
  )}} 

function cleanup (x) {
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
};

function updateCalc() { 
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

var updateScoreboard = function updateScoreboard(v) {
  let ar2 = v.split("<br>");
  let keys = Object.keys(ar2);
  let ar = [];
  for (let k in keys) {
    ar.push(h('div', ar2[k]))
  }
  return mMscoreboard.ret(ar);
}

var displayOff = function displayOff(x,a) {
    document.getElementById(a).style.display = 'none';
    return ret(x);
};

var displayInline = function displayInline(x,a) {
    if (document.getElementById(a)) document.getElementById(a).style.display = 'inline';
    return ret(x);
};

var score = function score(v,j) {
  socket.send('CG#$42,' + O.mMgroup.x + ',' + O.mMname.x + ',' + j + ',' + O.mMgoals.x);
  return mM13.ret(v + j);
}

var score2 = function score2() {
  mMgoals.ret(mMgoals.x + 1);
  let j = -25;
  socket.send('CG#$42,' + O.mMgroup.x + ',' + O.mMname.x + ',' + j + ',' + O.mMgoals.x);
  mM13.ret(0);
  return mMgoals;
}

var winner = function winner() {
  let k = -3
  mMgoals.ret(mMgoals.x - 3);
  socket.send('CG#$42,' + O.mMgroup.x + ',' + O.mMname.x + ',' + 0 + ',' + O.mMgoals.x);
  socket.send('CE#$42,' + O.mMgroup.x + ',' + O.mMname.x + ',nothing ');
  return ret(0);
}

var newRoll = function(v) {
  socket.send(`CA#$42,${O.mMgroup.x},${O.mMname.x.trim()},6,6,12,20`);
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
  UNIT: unitDriver
}

Cycle.run(main, sources);


