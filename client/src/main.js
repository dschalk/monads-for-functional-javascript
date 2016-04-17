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
  
  const messages$ = (sources.WS).map(e => {
    console.log('In messages$  e.data is: ', e.data)
    mMtem.ret(e.data.split(',')).bnd(v => {
    mMZ10.bnd(() => mM$1
      .ret([v[3], v[4], v[5], v[6]])
      .bnd(() => mM$2.ret([])))
    mMZ11.bnd(() => updateScoreboard(v[3]));
    mMZ12.bnd(() => mM6
      .ret(v[2] + ' successfully logged in.'))
    mMZ13.bnd(() => updateMessages(v))
    mMZ14.bnd(() => mMgoals2.ret('The winner is ' + O.mMsender.x ))
    mMZ15.bnd(() => mMgoals2.ret('A player named ' + 
        O.mMname.x + 'is currently logged in. Page will refresh in 4 seconds.')
      .bnd(refresh))
    mMZ16.bnd(() => process(e.data))
    mMtemp.ret(e.data.split(',')[0])
      .bnd(next, 'CA#$42', mMZ10)
      .bnd(next, 'CB#$42', mMZ11)
      .bnd(next, 'CC#$42', mMZ12)
      .bnd(next, 'CD#$42', mMZ13)
      .bnd(next, 'CE#$42', mMZ14)
      .bnd(next, 'EE#$42', mMZ15)
      .bnd(next, 'DD#$42', mMZ16)
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
    }
  });

  const groupPress$ = sources.DOM
    .select('input#group').events('keypress');

  const groupPressAction$ = groupPress$.map(e => {
    let v = e.target.value;
    if( e.keyCode == 13 ) {
      mMgroup.ret(v);
      socket.send(`CO#$42,${v},${O.mMname.x.trim()},${v}`);
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

  const newTask$ = sources.DOM
    .select('input.newTask').events('keydown');

  const newTaskAction$ = newTask$.map(e => {
      console.log('In newTaskAction.  e is: ', e);
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
        if ( ar.length > 2 ) {
          O.mM$taskList.bnd(addString, task + ',yellow, none, false,' +  ar[0] + ',' + ar[1], mM$taskList);
          e.target.value = '';
          document.getElementById('alert').innerHTML = '';
        } 
      } 
  });

  const process = function(str) {
    let a = str.split(",");
    console.log('In process. str and a are: ', str, a);
    if (a == undefined) {
      console.log('a is undefined');
      return;
    };
    if (a.length < 9) {
      console.log('In process. a.length is less than 9. a: ', a)
      return
    };
    console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^In process.  str is: ', str);
    let ob = {};
    let ar = a.slice(3)
    let s = ar.reduce((a,b) => a + ',' + b);
    if (mM$taskList.x.length < 5) {
      console.log('In process, in length < 5  s is: ', s);
      O.mM$taskList.ret(s);
    }
    let ar2 = [];
    let tempArray = [];
    if (ar.length < 6) {return};
    if ((ar.length % 6) !== 0) {
      document.getElementById('alert').innerHTML = 'Error: array length is: ' + length;
    }
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
  };

  const colorClick$ = sources.DOM
    .select('#cb').events('click')
    
  const colorAction$ = colorClick$.map(e => {
    let index = getIndex(e);
    let ar = O.mM$taskList.x.split(',');
    let n = 6 * index + 3;
    let j = 6 * index + 2;
    let k = 6 * index + 1;
    let checked = ar[n];
    console.log('In colorAction$  checked is: ', checked);
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
    let s = ar.reduce((a,b) => a + ',' + b)
    mM$taskList.ret(s);
    console.log('index and s in colorAction$ ', index, s);
  });

  const edit1$ = sources.DOM
    .select('#edit1').events('click')
    
  const edit1Action$ = edit1$.map(e => {
    let index = getIndex2(e);
    console.log('e and getIndex2(e) in edit1Action$ ', e, index);
    O.mMtaskList.x[index].children[3].elm.style.display = 'block';
  });

  const edit2$ = sources.DOM
    .select('#edit2').events('keypress')
    
  const edit2Action$ = edit2$.map(e => {
    let v = e.target.value;
    let index = getIndex2(e);
    console.log('e and getIndex2(e) in edit2Action$ ', e, index);
    if( e.keyCode == 13 ) {
      process2(v, index);
    O.mMtaskList.x[index].children[3].elm.style.display = 'none';
    }
  });

  const process2 = function(str, index) {
    let a = O.mM$taskList.x.split(',');
    let task = str.split(',').reduce((a,b) => a + '$*$*$' + b)
    console.log('In process2  a is: ', a );
    a[index * 6] = task;
    let s = a.reduce((a,b) => a + ',' + b);
    console.log('In process2  s is: ', s );
    mM$taskList.ret(s);
  };

  var edit = function edit (index, task) {
    let ar = [];
    let keys = Object.keys(O.mM$taskList.x);
    for (let k in keys) {
      ar[k] = O.mM$taskList.x[k];
    };
    ar[index].task = task;
    mM$taskList.ret(ar);
  }

  const deleteClick$ = sources.DOM
    .select('.delete').events('click')
    
  const deleteAction$ = deleteClick$.map(e => {
    let index = getIndex(e);
    let s = O.mM$taskList.x;
    let ar = s.split(',');
    let str = '';
    ar.splice(index*6, 6);
    if (ar.length > 0) {
      mM$taskList.ret(ar.reduce((a,b) => a + ',' + b));
    } else {
      socket.send('TX#$42' + ',' + O.mMgroup.x.trim() + ',' + O.mMname.x.trim() ); 
      mMtaskList.ret('');
    } 
  });

  const taskAction$ = mM$taskList.stream.map(ar => {
    var mess = 'TD#$42' + ',' + O.mMgroup.x.trim() + ',' + O.mMname.x.trim() + ',' + '@' + ar
    console.log('In taskAction$. ar is: ', ar);
    socket.send(mess);
    });

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
        mM19.bnd(fibCalc,e.target.value*1).bnd(mM19.ret);
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

    const calcStream$ = merge( edit1Action$, edit2Action$, taskAction$, colorAction$, deleteAction$, newTaskAction$, chatClickAction$, gameClickAction$, todoClickAction$, mM$3Action$, mM$2Action$, mM$1Action$, backClickAction$, forwardClickAction$, fibPressAction$, groupPressAction$, rollClickAction$, messagePressAction$, loginPressAction$, messages$, numClickAction$, opClickAction$ );

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
        h('p', ' O.mMsoloAlert.x ' ),
        h('br'),
        h('br'),
        h('span', 'People in the same group, other than solo, share text messages and dice rolls. '  ),
        h('br'),
        h('hr', ),
        h('h2', 'Monad Definitions'  ),
        h('p', 'This JS-monads project began as an exploration into the potential usefulness of simple composable objects whose "bnd()" and "ret()" methods behave like Haskell\'s ">=" (prornounced "bind") and "return". The stand-alone function "ret()" is also similar to Haskell\'s "return". I named the little objects "monads" and demonstrated, earlier in this series, that in their simplest use cases they obey the Haskell monad laws. In other cases, they might do anything Javascript allows. '),
        h('p', 'I have settled on definitions of Monad and Monad$ that provide for updating the values they carry without mutating them. For any monad m, m.x = newValue mutates m. But m.ret(newValue) creates a new monad O.m carrying newValue instead of oldValue. ret(newValue, "m") returns a new monad named "m" whose value is newValue. The earlier version can be preserved; for example, by assigning it to a variable or placing it in an array. ' ),
        h('span.tao', ' Earlier pages in this series. some of which define Monad differently, are still available at ' ),
        h('a', {props: {href: "http://schalk.net"}}, 'schalk.net' ),
        h('span', '. They contain examples and detailed explanations which the reader might find enlightening, despite the sometimes differnt definitions of Monad. This is how Monad, Monad$, MonadIter, and ret() are currently defined: '),
        code.monads,  
        h('p', 'MonadIter instances can be given arguments for the functions they store on the fly. I haven\'t needed this functionality. ' ),
        h('hr', ),   
        h('h2', 'Common Patterns' ),
        h('p', 'Anyone not yet familiar with functional programming can learn by studying the definition of the Monad bnd() method and considering the common patterns presented below. Often, we want to give a named monad the value of an anonymous monad returned by a monadic computation. Here are some ways to accomplish that: '  ),
        h('p', 'For any monads m1 and m2 with values a and b respectively (in other words, m1.x == a and m2.x == b return true), m1.bnd(m2.ret) provides m1\'s value to m2. So, after m1.bnd(m2.ret), m1.x == a, m2.x == b, O.m2.x == a all return true. The definition of Monad\s bnd() method shows that the function m2.ret() operates on m1.x. m1.bnd(m2.ret) is equivalent to m2.ret(m1.x). The stand-alone ret() function can be used to alter the current value of m2, rather than altering the value of O.m2. Here is one way of accomplishing this: m1.bnd(x => ret(x,"m2"). These relationships are verified in the following tests: ' ),
        h('pre', 
`             ret('m1Val','m1')
             m1.x === 'm1Val'  // true
             ret('m2Val', 'm2')
             m2.x === 'm2Val'  // true

             m1.bnd(m2.ret)
             O.m2.x === 'm1Val' // true

             m1.ret('newVal')
             O.m1.bnd(v => ret(v, 'm2'))
             m2.x === 'newVal'  // true
             O.m2.x === 'm1Val' // true   still the same  `   ),
        h('p', 'The bnd() method does not have to return anonymous monads. Consider, for example, the trivial function f = function(x, mon) {return mon.ret(x)}. The monad that calls its bnd() method with the argument f gives the monad designated as "mon" its value. So m1.bnd(f, m2) results in m1.x == a, m2.x == b, O.m2.x == a all returning true. ' ), 
        h('p',   ), 
        h('p', 'Frequently, some monad "m" will use its "bnd" method on some function which takes two arguments, say "f(x,v)". The first argument is the value of m (which is m.x). m.bnd(f,v) is equivalent to f(m.x, v). The following example demonstates the use of a two-argument function: ' ),
        code.fib,
        h('span.tao', 'In both functions, the "x" argument is ignored. It must be included, however, in order to make the bnd() method return the desired result. If you enter some number "n" in the box below, '  ),
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
        h('p', ),  
        h('p', ),  
        h('p','.' ),  
        h('p', ),  
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


