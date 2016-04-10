import Cycle from '@motorcycle/core';
import {h, p, span, h1, h2, h3, br, div, label, input, hr, makeDOMDriver} from '@motorcycle/dom';
import {just, create, merge, combine, fromEvent, periodic, observe, delay, filter, of} from 'most';
import code from './code.js';
import {subject} from 'most-subject'

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
      .bnd(next, 'CQ#$42', mMZ19)
      .bnd(next, 'DD#$42', mMZ20)
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
    mMZ15.bnd(() => {
      var ob = {'color': 'yellow', 'textDecoration': 'none', 'checked': false, 
        'author': O.mMar.x[6], 'responsible': O.mMar.x[7]} 
       O.mMar.bnd(sliceFront, 8, mMar)
        .bnd(reduce, ((a,b) => {return a + ', ' + b}), mMar)
      ob.task = O.mMar.x
      O.mM$task.bnd(unshift, ob, mM$task) });
    mMZ16.bnd(() => mMgoals2.ret('A player named ' + 
        O.mMname.x + 'is currently logged in. Page will refresh in 4 seconds.')
      .bnd(refresh));
    mMZ17.bnd(() => {
      console.log('sender and name: ', O.mMsender.x, O.mMname.x);
      if (O.mMsender.x == O.mMname.x) {
        checkBox2(O.mMextra.x);
        return;
      }
      else if (O.mMsender.x != O.mMname.x) {
        checkBox1(O.mMextra.x);
      }
    });
    mMZ18.bnd(() => O.mM24.bnd(log, '************in mMZ18 ')
      .bnd(() => edit(O.mMextra.x, O.mMextra2.x)));
    mMZ19.bnd(() => O.mM$task.bnd(spliceRemove, O.mMar.x[3], mM$task));
    mMZ20.bnd(() => process(O.mMar.x));
  
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
        let alert = 'You should enter "author, responsible party, task" separated by commas';
        document.getElementById('alert').innerHTML = alert;
      }
      else {
        socket.send('CF#$42,' + O.mMgroup.x.trim() + ',' + O.mMname.x.trim() + ',false, yellow, none,' + e.target.value );
        e.target.value = '';
        document.getElementById('alert').innerHTML = '';
      } 
    } 
  });

  const fetchTasks$ = sources.DOM
    .select('#fetchTasks').events('click')

  const fetchAction$ = fetchTasks$.map(e => {
    socket.send('DD#$42,' + O.mMgroup.x.trim() + ',' + O.mMname.x.trim() + ',nothing');
  });

  const process = function(a) {
    let newArray = [];
    let ob = {};
    if (a.length < 6) {
      console.log('________________________Ran process on short array ');
      return
    }
    let ar = a.slice(3);
    let n = ar.length/6;
    let keys = Array(n).fill(1);
    for (let k in keys) {
      newArray.push(
        {
          task: ar.shift(),
          color: ar.shift(),
          textDecoration: ar.shift(),
          checked: ar.shift() === 'true',
          author: ar.shift(),
          responsible: ar.shift()
        }
      )
    }
    mM$task.ret(newArray);
  };

  const colorClick$ = sources.DOM
    .select('#cb').events('click')
    
  const colorAction$ = colorClick$.map(e => {
    let index = getIndex(e);
    console.log('In colorAction$  e and index are: ', e, index);
    socket.send(`CH#$42,${O.mMgroup.x.trim()},${O.mMname.x.trim()},${index}`);
  });

  function checkBox1 (index) {
    let elem2 = O.mMtaskList.x[index].children[6].elm;

    if (elem2.checked) {
      console.log('In checkBox1  elem2.checked is false');
      O.mM$task.x[index].checked = false; 
      O.mM$task.x[index].color = 'yellow'; 
      O.mM$task.x[index].textDecoration = 'none'; 
      mM$task.ret(O.mM$task.x)
    }
    else if (!elem2.checked) {
      console.log('In checkBox1  elem2.checked is true');
      O.mM$task.x[index].checked = true; 
      O.mM$task.x[index].color = 'lightGreen'; 
      O.mM$task.x[index].textDecoration = 'line-through'; 
      mM$task.ret(O.mM$task.x)
    }
    mM$task.ret(O.mM$task.x);
    console.log('index and O.mM$task.x in checkbox ', index, O.mM$task.x);
  }

  function checkBox2 (index) {
    let elem2 = O.mMtaskList.x[index].children[6].elm;
    if (elem2.checked) {
      console.log('In checkBox2  elem2.checked is true');
      O.mM$task.x[index].checked = true; 
      O.mM$task.x[index].color = 'lightGreen'; 
      O.mM$task.x[index].textDecoration = 'line-through'; 
    } else {
      console.log('In checkBox2  elem2.checked is false');
      O.mM$task.x[index].checked = false; 
      O.mM$task.x[index].color = 'yellow'; 
      O.mM$task.x[index].textDecoration = 'none'; 
    }
    mM$task.ret(O.mM$task.x);
    console.log('index and O.mM$task.x in checkBox2 ', index, O.mM$task.x);
  }

  const edit1$ = sources.DOM
    .select('#edit1').events('click')
    
  const edit1Action$ = edit1$.map(e => {
    let index = getIndex2(e);
    console.log('e and getIndex2(e) in colorAction$ ', e, index);
    O.mMtaskList.x[index].children[3].elm.style.display = 'block';
  });

  const edit2$ = sources.DOM
    .select('input#edit2').events('keydown');

  const edit2Action$ = edit2$.map(e => {
    if( e.keyCode == 13 ) {
      let index = getIndex2(e);
      socket.send('CK#$42,' + O.mMgroup.x.trim() + ',' + O.mMname.x.trim() + ',' + index + ',' + e.target.value);
      O.mMtaskList.x[index].children[3].elm.style.display = 'none';
    }
  });

  var edit = function edit (index, task) {
    let ar = [];
    let keys = Object.keys(O.mM$task.x);
    for (let k in keys) {
      ar[k] = O.mM$task.x[k];
    };
    ar[index].task = task;
    mM$task.ret(ar);
  }

  const deleteClick$ = sources.DOM
    .select('.delete').events('click')
    
  const deleteAction$ = deleteClick$.map(e => {
    let index = getIndex(e);
    socket.send('CQ#$42,' + O.mMgroup.x.trim() + ',' + O.mMname.x.trim() + ',' + index);
  });

  var deleteTask = function deleteTask (index) {
    console.log('In deleteTask  index is: ', index);
    O.mM$task.bnd(spliceRemove, index, mM$task)
  };

  const taskAction$ = mM$task.stream.map(v => {
    refreshTasks(v);
    console.log('In taskAction$  v (O.mM$task.x) is: ', v);
  });

  function refreshTasks (ar) {
    console.log('In refreshTasks. ar is: ', ar);
    mMtemp.ret([]);
    let keys = Object.keys(ar);
    for(let k in keys) {
      console.log('ar[k] in refreshTasks: ', ar[k]);
      O.mMtemp.bnd(push,
        h('div.todo',  [
          h('span.task3', {style: {color: ar[k].color, textDecoration: ar[k].textDecoration}}, 'Task: ' + ar[k].task  ),  
          h('br'),
          h('button#edit1', 'Edit'  ),
          h('input#edit2', {props: {type: 'textarea', value: ar[k].task}, style: {display: 'none'}}  ), 
          h('span#author.tao', 'Author: ' + ar[k].author  + ' / ' + 'Responsibility: ' + ar[k].responsible),
          h('br'),
          h('input#cb', {props: {type: 'checkbox', checked: ar[k].checked}, style: {color: ar[k].color,
               textDecoration: ar[k].textDecoration} } ), 
          h('label.cbox', { props: {for: '#cb'}}, 'Completed' ),
          h('button.delete', 'Delete'  ),  
          h('br'),
          h('hr')]), mMtemp)
    }
    mMtaskList.ret(O.mMtemp.x)
    var tasks = (ar.map(stringify)).toString();
    console.log('***_In refreshTasks_***************tasks: ', tasks);
    console.log('O.mM$task.x in refreshTasks ', mM$task.x);
    socket.send('TD#$42,' + O.mMgroup.x.trim() + ',' + O.mMname.x.trim() + ',@' + tasks);
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
      
      var el2 = document.getElementById('gameDiv2');
      (el2.style.display == 'none') ?
      el2.style.display = 'inline' :
      el2.style.display = 'none' 
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
        mMtemp.ret(O.mMhistorymM1.x[O.mMindex2.x])
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
      socket.send('CA#$42,' + O.mMgroup.x.trim() + ',' + O.mMname.x.trim() + ',6,6,12,20')
    });

    const fibPress$ = sources.DOM
      .select('input#code').events('keydown');

    const fibPressAction$ = fibPress$.map(e => {
      if (e.target.value == '') {return};
      if( e.keyCode == 13 && Number.isInteger(e.target.value*1) ) {
        console.log('In fibPressAction$  e.target.value ', e.target.value);
        mM19.bnd(fibCalc,e.target.value*1).bnd(mM19.ret);
        console.log('Still in fibPressAction$  mM19.x is ', mM19.x);
      }
      if( e.keyCode == 13 && !Number.isInteger(e.target.value*1) ) mM19.ret("You didn't provide an integer");
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

    const calcStream$ = merge( fetchAction$, edit1Action$, edit2Action$,  taskAction$, colorAction$, deleteAction$, newTaskAction$, chatClickAction$, gameClickAction$, todoClickAction$, mM$3Action$, mM$2Action$, mM$1Action$, backClickAction$, forwardClickAction$, fibPressAction$, groupPressAction$, rollClickAction$, messagePressAction$, loginPressAction$, messages$, numClickAction$, opClickAction$ );

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
            h('div#taskList', O.mMtaskList.x ),
            h('span', 'Author, Responsible Person, Task: '  ),  
            h('input.newTask', ) ]),
          h('br'),
          h('span#alert' ),
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
        h('p', 'This installment of the Javascript monad series features a shared todo list, along with chat messaging and the game from the previous installment. If any of these are distracting, please note that they can be hidden using the toggle buttons in the upper right corner. '  ),
        h('p', 'People who are in the same group, other than solo, share the same todo list, messages, and simulated dice game. In order to see any of these, you must establish a unique socket by logging in. '  ),
         
        h('div#gameDiv2', [
        h('p', 'RULES: If clicking two numbers and an operator (in any order) results in 20 or 18, the score increases by 1 or 3, respectively. If the score becomes 0 mod 5, 5 points are added. A score of 25 results in one goal. That can only be achieved by arriving at a score of 20, which jumps the score to 25. Directly computing 25 results in a score of 30, and no goal. Each time ROLL is clicked, one point is deducted. Three goals wins the game. '    ),
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
        h('button#forward2', 'BACK'  ) ]) ]),
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
        h('br'),
        h('p', 'If you join a group that has a task list, you can obtain it here:
        h('button#fetchTasks', 'Fetch Tasks'  ),
        h('hr', ),
        h('p', 'The definition of Monad has evolved to accomodate this presentation application as its functionality grew more complex. MonadIter came along to organize the control information flowing through independent branches of the game and the websockets message handler. Monad$, featuring most-subject streams, has proven very useful in conjuntion with Motorcycle.js. ' ),
        h('span.tao', 'The earlier pages in this series are still available at' ),
        h('a', {props: {href: "http://schalk.net"}}, ' schalk.net ' ),
        h('span', 'for anyone interested in detailed explanations and examples. Those looking for something to use in their own applications might find the earlier definition of Monad more appealing. I like the new one. '),
        h('hr', ),  
        h('h2', 'Common Patterns' ),
        h('p', 'Anyone not yet familiar with functional programming can learn by studying the definition of the Monad bnd() method and considering the common patterns presented below. Often, we want the value of an anonymous monad returned by a monadic computation to be the value of a named monad. Here is how that can be accomplished: '  ),
        h('p', 'For any monads m1 and m2 with values a and b respectively (in other words, m1.x == a and m2.x == b return true), m1.bnd(m2.ret) provides m1\'s value to m2. So, after m1.bnd(m2.ret), m1.x == a, m2.x == b, O.m2.s == a all return true. The definition of Monad\s bnd() method shows that the function m2.ret() operates on m1.x. m1.bnd(m2.ret) is equivalent to m2.ret(m1.x). ' ),
        h('p', 'The bnd() method does not have to return anonymous monads. Consider, for example, the trivial function f = function(x, mon) {return mon.ret(x)}. The monad that calls its bnd() method with the argument f gives the monad designated as "mon" its value. So m1.bnd(f, m2) results in m1.x == a, m2.x == b, O.m2.s == a all returning true. As long as we update using only the ret() method, and refrain from mutating m2 with the anit-pattern m2.x = someValue, m2.x == b will always return true.' ),   
        h('p', 'Frequently, some monad "m" will use its "bnd" method on some function which takes two arguments, say "f(x,v)". The first argument is the value of m (which is m.x). The return value of m.bnd(f,v) is f(m.x, v). The following example demonstates this: ' ),
        code.fib,
        h('span.tao', 'In both functions, the first argument is ignored. It must be included, however, in order to make the bnd() method return the desired result. If you enter some number "n" in the box below, '  ),
        h('pre',  '  mM19.bnd(fibCalc, e.target.value*1).bnd(mM19.ret)' ),
        h('span', ' will execute and O.mM19.x will be displayed under the input box. ' ),
        h('br'),
        h('br'),
        h('input#code', ),  
        h('br'),
        h('p#code2', O.mM19.x ),  
        h('br', ),  
        h('p', ), 
        h('hr', ),  
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
    UNIT: unitDriver
  }

  Cycle.run(main, sources);


