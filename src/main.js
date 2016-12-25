"use strict";
import {run} from '@cycle/xstream-run'
// import {merge, fromEvent} from 'most';
// import {create} from '@most/create';
import {h, p, span, h1, h2, h3, pre, br, div, label, input, hr, makeDOMDriver} from '@cycle/dom';
import code from './code.js';
// import {EventEmitter} from 'events'

var updateMessages = function updateMessages(e) {
  var ar = e.split(',');
  var sender = ar[2];
  ar.splice(0,3);
  var str = ar.join(',');
  messageMonad.run([ [h('br'), sender + ': ' + str], [], [], messageMonad.s[3] ]);
};

function createWebSocket(path) {
    var host = window.location.hostname;
    if (host === '')
        host = 'localhost';
    var uri = 'ws://' + host + ':3055' + path;
    var Socket = "MozWebSocket" in window ? MozWebSocket : WebSocket;
    return new Socket(uri);
}

var socket = createWebSocket('/');
console.log('########## socket: ', socket);

function websocketsDriver(/* no sinks */) {
  return xs.create({
    start: listener => { socket.onmessage = msg => listener.next(msg)},
    stop: () => { socket.close() }
  });
};

function workerBDriver () {
  return xs.create({
    start: listener => { workerB.onmessage = msg => listener.next(msg)}, 
    stop: () => { workerB.terminate() }
  });
};

function workerCDriver () {
  return xs.create({
    start: listener => { workerC.onmessage = msg => listener.next(msg)}, 
    stop: () => { workerC.terminate() }
  });
};

function workerDriver () {
  return xs.create({
    start: listener => { worker.onmessage = msg => listener.next(msg)}, 
    stop: () => { worker.terminate() }
  });
};

function eM2Driver () {
  return xs.create({
    start: listener => { mM2.on = msg => listener.next(msg)}, 
    stop: () => { worker.terminate() }
  });
};

socket.onmessage = function (event) {
    console.log('Socket message',event);
};
  
/* 
socket.onmessage = function (event) {
    console.log(event);
};
  
socket.onclose = function (event) {
    console.log('<><><> New message <><><> ', event);
};

console.log('socket.onmessage',socket.onmessage);

const emDriver = function () {@jk
    return em.on = msg => msg.subscribe(msg => console.log('message:', msg))
}

const workerDriverA = function () {
    return create((add) => worker.onmessage = msg => add(msg))
}

console.log('worker.onmessage',worker.onmessage);

const workerDriverC = function () {
    return create((add) => workerC.onmessage = msg => {
      add(msg)
    })
}

const eM2Driver = function () {
  return create((add) => eM2.emit = msg => {
    console.log('In eM2Driver');
    add(msg)
  })
};
*/

em.emit("em says Hello World");
em.emit("emDriver says Hello World?");
em.emit("emDriver says Hello World");

function updateTasks (obArray) {
  var todoData = [];
  for (let ob of obArray) { 
  todoData = todoData.concat([ 
    h('span.task3', `{ style: { color: ${ob.color}, textDecoration: ${ob.textDecoration} } }, 'Task: ' + ${ob.task}`),
    h('br'),
    h('button#edit1', 'Edit'),
    h('input#edit2', `{ props: { type: textarea, value: ${ob.task}}}`),
    h('span#author.tao', `Author: ${ob.author}  /  Responsibility: ${ob.responsible}`),
    h('br'),
    h('input#cb', `{ props: { type: 'checkbox', checked: ${ob.checked }}}, 
           {style: { color: ${ob.color}, textDecoration: ${ob.textDecoration}}}` ),
    h('label.cbox',   { props: { for: '#cb' } }, 'Completed'   ),
    h('button.delete', 'Delete'),
    h('br'),
    h('hr') ])   
    }
}; 

// window.postMessage("Can you hear me?","http://localhost:3055") 

function main(sources) {
  
  var numsDisplay = [4,4,4,4];
  var newTasks = [];

  const eM2$ = sources.EM2.map(v => {
   console.log('______** ! **_______eM2$ received message: ', v) 
  mMZ31.bnd(() => mM34.ret(mM31.ret(v[1]).x + mM32.x + mM33.x).bnd(log5));
  mMZ32.bnd(() => mM34.ret(mM31.x + mM32.ret(v[1]).x + mM33.x).bnd(log5));
  mMZ33.bnd(() => mM34.ret(mM31.x + mM32.x + mM33.ret(v[1]).x).bnd(log5));
  next(v[0], '1', mMZ31)
  next(v[0], '2', mMZ32)
  next(v[0], '3', mMZ33)
  });

  // eM2.on('3', (x,y,z) => m.ret(z*z*z).bnd((a) => console.log(a,x,y))) 

  eM2.emit(['1', 1])
  eM2.emit(['2', 1])
  eM2.emit(['3', 1])

  const workerC$ = sources.WWC.map(m => {
    mMfactors.ret(m.data[0]);
    primesMonad.s = m.data[1];
    primesMonad.a = m.data[1][3];
  });

  const worker$ = sources.WW.map(v => {
    console.log('Message from worker: ', v );
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
      primesMonad.s = v.data[1];
      primesMonad.a = v.data[1][3];
      console.log('Back in main thread, in worker$. Prime number', primesMonad.a.length,'is', primesMonad.s[0] )
    });
    next(v.data[0], 'CA#$41', mMZ21)
    next(v.data[0], 'CB#$41', mMZ22)
    next(v.data[0], 'CC#$41', mMZ23)
    next(v.data[0], 'CD#$41', mMZ24)
    next(v.data[0], 'CE#$41', mMZ25)
    });

  const messages$ = sources.WS.map( e => {
    mMtem.ret(e.data.split(',')).bnd( v => {
  console.log('Websockets data.split message v: ', v ),    
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
  });
        
  function next(x, y, instance, z) {
    if (x == y) {
        instance.release(z);
    }
    return ret(x);
  };
  
  function newRoll (a,b) {
    socket.send(`CA#$42,${pMgroup.x},${pMname.x},6,6,12,20,${a},${b}`);
  }

  var loginPress$ = sources.DOM
      .select('input#login').events('keypress');

  var loginPressAction$ = loginPress$.map(e => {
    var v = e.target.value;
    if (e.keyCode === 13) {
      pMname.ret(v);
      socket.send('CC#$42' + v );
      pMclicked.ret([]);

      mMdice.ret('block');
      mMrightPanel.ret('block');
      mMgameDiv2.ret('block')
      mMlogin.ret('none');
      mMlog1.ret('none');
      mMlog2.ret('block');

      mMcaptionDiv.ret('block')
      mMchatDiv.ret('block')
      mMtodoDiv.ret('block')
      mMgameDiv.ret('block')
      mMchat.ret('inline')
      mMcaption.ret('inline');
      mMgame.ret('inline')
      mMtodo.ret('inline')
      // document.getElementById('group').focus(); 
      newRoll(0,0);
    }
  });

  var groupPress$ = sources.DOM
      .select('input#group').events('keypress');

  var groupPressAction$ = groupPress$.map(e => {
      if (e.keyCode === 13) {
        travMonad.run([ [], 0, 0 ]);
        socket.send(`CO#$42,${pMgroup.x},${pMname.x},${e.target.value}`);
        pMgroup.ret(e.target.value)
        .bnd(gr =>
        socket.send(`CG#$42,${pMgroup.x},${pMname.x},0,0`));
      }
  });

  var messagePress$ = sources.DOM
      .select('input.inputMessage').events('keydown');

  var messagePressAction$ = messagePress$.map(function (e) {
      if (e.keyCode === 13) {
          socket.send(`CD#$42,${pMgroup.x},${pMname.x},${e.target.value}`);
          e.target.value = '';
      }
  });

  var updatePlayers = function updatePlayers (data) { 
        sMplayers.s.clear();
        var namesL = data.split("<br>");
        var namesList = namesL.slice(1);
        updateScoreboard2(namesList);
        namesList.forEach(player => sMplayers.s.add(player.trim()));
  }

  var updateScoreboard2 = function updateScoreboard2(v) {
    var ar = [];
    for (let k of v) {
        ar.push(['  ' + k]);
    };
    pMdata.ret(ar);
  };

  var rollClick$ = sources.DOM
    .select('.roll').events('click');

  var rollClickAction$ = rollClick$.map(() => {
    var a = pMscore.x - 1;
    var b = pMgoals.x;
    newRoll(a,b);
  }); 

  var numClick$ = sources.DOM
      .select('.num').events('click'); 


  var numClickAction$ = numClick$.map(e => {
    if (pMclicked.x.length === 2) {return};
    pMnums.bnd(spliceM, e.target.id, 1)
    .bnd(v => {
      test3(v, 'MpMstyle')
      socket.send(`CG#$42,${pMgroup.x},${pMname.x},${pMscore.x},${pMgoals.x}`);
      pMclicked
      .bnd(push, e.target.innerHTML)
      .bnd(pMclicked.ret)
      .bnd(w => {
        travMonad.run([v, pMscore.x, pMgoals.x, w, pMop.x])
        if (w.length === 2 && pMop.x != 0) {
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
  });

  function updateCalc(ar, op) {
    mMgoals2.ret('');
    var result = calc(ar[0], op, ar[1]);

    if (result === 20 || result === '20') { 
      pMscore.bnd(add,1)
      .bnd(testscore)
      .bnd(pMscore.ret)
      .bnd(v => score(v));
      return; 
    } 
    else if (result === 18 || result === '18') { 
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

  function score(scor) {
    if (scor != 25) {
      newRoll(scor, pMgoals.x)
    }
    else if (pMgoals.x === 2) {
      socket.send(`CE#$42,${pMgroup.x},${pMname.x}`);
      newRoll(0,0)
    }
    else {pMgoals.bnd(add, 1).bnd(pMgoals.ret).bnd(g => newRoll(0, g))};
  };

  var fib2 = function fib2(v) {
      if (v[2] > 1) {
          mMfib.ret([v[1], v[0] + v[1], v[2] - 1]);
      }
      else {
          mM19.ret(v[0]);
      }
  };

  var fibPress$ = sources.DOM
      .select('input#code').events('keydown');

  var fibPressAction$ = fibPress$.map(function (e) {
      if (e.target.value === '') {
          return;
      }
      ;
      if (e.keyCode === 13) {
          mM21.ret(e.target.value);
          fib2([0, 1, e.target.value]);
      }
  });
  // *******************************************n****************************** ENDOM iginal Fibonacci END
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> START PRIME FIB  
  
  const workerB$ = sources.WWB.map(m => {
    console.log('In workerB$ stream in the main thread. m is ', m );
    mMres.ret(m.data)
    .bnd(v => mM36.ret('Asynchronous addendum. The largest computed ' +
      'prime Fibonacci number is ' + v[2].split(',')[v[2].split(',').length - 1]), 'MmM36')
    primesMonad.s = JSON.parse(JSON.stringify(primesMonad.s));
    primesMonad.a = JSON.parse(JSON.stringify(primesMonad.a));
    primesMonad.s = m.data[3];
    primesMonad.a = m.data[3][3];
  });

  var fibKeyPress5$ = sources.DOM
      .select('input#fib92').events('keyup');

  var primeFib$ = fibKeyPress5$.map(e => {
    workerB.postMessage([e.target.value, primesMonad.s]);
  });

  var clearprimes$ = sources.DOM
    .select('#clearprimes').events('click')
    .map(() => mMres.ret([mMres.x[0], '', mMres.x[2], mMres.x[3]])); 



  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ENDOM basic prime END
  // <>>><>><><><><>>>><><><   prime factors   ><><><><><><>>><<><><><><><><>< START prime factors  
  var factorsPress$ = sources.DOM
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
        var ar = primesMonad.s.slice();
        ar[2] = num;
        worker.postMessage(['CE#$41', ar])
        workerC.postMessage(num);
      }
    }
  });
  
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ENDOM prime factors END
  // ?<>>><>><><><><>>>><><><  traversal  ><><><><><><>>><><><><><><><><><><><>< START traversal  
  document.onload = function (event) {
    console.log('onload event: ', event);
    mMitterfib5.release(200);

    var change = (a,b) => {
      document.getElementById(a).blur(); 
      document.getElementById(b).focus(); 
    };
  }

    // document.getElementById('login').focus(); 
  // <>>><>><><><><>>>><><><  traversal  ><><><><><><>>><><><><><><><><><><><>< ENDOM traversal  
  // <>>><>><><><><>>>><><><  traversal  ><><><><><><>>><><><><><><><><><><><>< START Itterator 
  
  
   mMZ1.bnd(v => mMt1
  .bnd(add,v).bnd(w => {
    mMt1.ret(w)
    .bnd(cube)
    .bnd(x => mMt3.ret(w + ' cubed is ' + x))}));  
  
  mMZ2.bnd(v => cube(v)
  .bnd(w => mMt3.ret(v + ' cubed is ' + w)));

  var testZ = sources.DOM
      .select('#testZ').events('click');

  var testZAction$ = testZ.map(function () {
      mMZ1.release(1);
  });
  
  var testQ = sources.DOM
      .select('#testQ').events('click');

  var testQAction$ = testQ.map(() => {
    mMt1.ret(0)
    .bnd(v => mMZ2.release(v))});

  var testW = sources.DOM
      .select('#testW').events('keypress');

  var testWAction$ = testW.map(function (e) {
      if (e.keyCode === 13) {
          mMZ2.release(e.target.value);
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
  
    solve();

  var quad$ = sources.DOM
      .select('#quad').events('keypress');

  var quadAction$ = quad$.map(function (e) {
      if (e.keyCode === 13) {
          mMZ3.release(e.target.value);
          document.getElementById('quad').value = null;
      }
  });

// *******************************************************************BEGIN TODO LIST           
            
    var task2 = function task2(str) {
        socket.send(`TD#$42,${get(pMgroup)},${get(pMname)},@${str}`)  
    };

    var newTask$ = sources.DOM
        .select('input.newTask').events('keydown');

    var newTaskAction$ = newTask$.map(function (e) {
        var ob = {};
        var alert = '';
        var task = '';
        if (e.keyCode === 13) {
            var ar = e.target.value.split(',');
            if (ar.length < 3) {
              mMalert.ret('You should enter "author, responsible party, task" separated by commas');
              return;
            }
            var ar2 = ar.slice(2);
            if (ar2.length === 1) {
                task = ar[2];
            }
            if (ar2.length > 1) {
                task = ar2.reduce(function (a, b) { return a + '$*$*$' + b; });
            }
            if ((get(mMar2).filter(function (v) { return (v.task === task); }).length) > 0) {
                mMalert.ret(task + " is already listed.");
            }
            else if (ar.length > 2) {
                mMcurrentList.bnd(addString, task + ',yellow, none, false,' + ar[0] + ',' + ar[1], mMcurrentList);
                task2(get(mMcurrentList));
                e.target.value = '';
                mMalert.ret('');
            }
        }
    });

  function testTask (v2, v3, data)  {
    if (v3 === 'no file' || v3 === 'empty') {
      mMtaskList.ret([]);
      taskL = h('span' ); 
      return;
    }
    if (get(pMgroup) != 'solo' || get(pMgroup) === 'solo' &&  get(pMname) === v2) {   
      process(data);  
    } 
  };

  var process = function (str) {
      var a = str.split(",");
      if (a === undefined) {
          return;
      };

      if (a.length < 9) {
          return;
      };

      var ar = a.slice(3);
      var s = ar.reduce(function (a, b) { return a + ',' + b; });
      var tempArray = [];
      mMcurrentList.ret(s);
      process3(ar);
  };

    var process3 = function (a) {
      var ar5 = [];
      if (a.length % 6 === 0) {
        var keys = rang(0, a.length / 6);
        keys.map( _ => {
          ar5.push({
            task: convertBack(a.shift()),
            color: a.shift(),
            textDecoration: a.shift(),
            checked: a.shift() === 'true',
            author: a.shift(),
            responsible: a.shift()
          });
        });
      }
      mMar2.ret(ar5);
      process4(ar5);
    };

    var process4 = function (a) {
        var tempArray = [];
        var keys = Object.keys(a);
        for (var k in keys) {
            tempArray.push(h('div.todo', [
                h('span.task3', { style: { color: a[k].color, textDecoration: a[k].textDecoration } }, 'Task: ' + a[k].task),
                h('br'),
                h('button#edit1', 'Edit'),
                h('input#edit2', { props: { type: 'textarea', value: a[k].task }, style: { display: 'none' } }),
                h('span#author.tao', 'Author: ' + a[k].author + ' / ' + 'Responsibility: ' + a[k].responsible),
                h('br'),
                h('input#cb', { props: { type: 'checkbox', checked: a[k].checked }, style: { color: a[k].color,
                        textDecoration: a[k].textDecoration } }),
                h('label.cbox', { props: { for: '#cb' } }, 'Completed'),
                h('button.delete', 'Delete'),
                h('br'),
                h('hr')]));
        }

        mMtaskList.ret(tempArray);
        taskL = tempArray;
    };

    var colorClick$ = sources.DOM
        .select('#cb').events('click');

    var colorAction$ = colorClick$.map(function (e) {
        var ind = getIndex(e);
        var index = parseInt(ind, 10);
        var s = get(mMcurrentList);
        var ar = s.split(',');
        var n = 6 * index + 3;
        var j = 6 * index + 2;
        var k = 6 * index + 1;
        var checked = ar[n];
        if (checked === 'true') {
            ar[n] = 'false';
            ar[k] = 'yellow';
            ar[j] = 'none';
        }
        else {
            ar[n] = 'true';
            ar[k] = 'lightGreen';
            ar[j] = 'line-through';
        }
        task2(ar.reduce(function (a, b) { return a + ',' + b; }));
    });

    var edit1$ = sources.DOM
        .select('#edit1').events('click');

    var edit1Action$ = edit1$.map(function (e) {
        var index = getIndex2(e);
        get(mMtaskList)[index].children[3].elm.style.display = 'block';
    });

    var edit2$ = sources.DOM
        .select('#edit2').events('keypress');

    var edit2Action$ = edit2$.map(function (e) {
        var v = noComma(e.target.value);
        var index = getIndex2(e);
        if (e.keyCode === 13) {
            process2(v, index);
            mMtaskList.x[index].children[3].elm.style.display = 'none';
        updateScoreboard2(namesList);
        }
    });

    var process2 = function (str, index) {
        var a = mMcurrentList.x.split(',');
        a[6 * index] = str;
        var b = a.reduce(function (a, b) { return a + ',' + b; });
        task2(b);
    };

    var deleteClick$ = sources.DOM
        .select('.delete').events('click');

    var deleteAction$ = deleteClick$.map(function (e) {
        var index = parseInt(getIndex(e), 10);
        var s = get(mMcurrentList);
        var ar = s.split(',');
        if (ar.length < 7) {
          task2('empty');
          socket.send( `TX#$42,${get(pMgroup)},${get(pMname)}` );
          return;
        }
        var str = '';
        ar.splice(index * 6, 6);
        task2(ar.reduce(function (a, b) { return a + ',' + b; }));
    });

// **********************************************************************END TODO LIST                       
    var chatClick$ = sources.DOM
        .select('#chat2').events('click');

    var chatClickAction$ = chatClick$.map(function () {
        var el = document.getElementById('chatDiv');
        (el.style.display === 'none') ?
            el.style.display = 'inline' :
            el.style.display = 'none';
    });

    var captionClick$ = sources.DOM
        .select('#caption').events('click');
    var captionClickAction$ = captionClick$.map(function () {
        var el = document.getElementById('captionDiv');
        (el.style.display === 'none') ?
            el.style.display = 'inline' :
            el.style.display = 'none';
    });

    var todoClick$ = sources.DOM
        .select('#todoButton').events('click');
  
    var todoClickAction$ = todoClick$.map(function (e) {
        var el = document.getElementById('todoDiv');
        (el.style.display === 'none') ?
            el.style.display = 'inline' :
            el.style.display = 'none';
    });

    var gameClick$ = sources.DOM
        .select('#game').events('click');

    var gameClickAction$ = gameClick$.map(function () {
        var el = document.getElementById('gameDiv');
        (el.style.display === 'none') ?
            el.style.display = 'inline' :
            el.style.display = 'none';

        updateScoreboard2(namesList)
        var el2 = document.getElementById('gameDiv2');
        (el2.style.display === 'none') ?
            el2.style.display = 'inline' :
            el2.style.display = 'none';
    });

    var todoClick$ = sources.DOM
        .select('#todoButton').events('click');
  
    var todoClickAction$ = todoClick$.map(function (e) {
        (get(mMtodoDiv)  === 'none') ?
            mMtodoDiv.ret('block') :
            mMtodoDiv.ret('none') 
    });

    var chatClick$ = sources.DOM
        .select('#chat2').events('click');

    var chatClickAction$ = chatClick$.map(function () {
        (get(mMchatDiv)  === 'none') ?
            mMchatDiv.ret('block') :
            mMchatDiv.ret('none') 
    });

    var captionClick$ = sources.DOM
        .select('#caption').events('click');

    var captionClickAction$ = captionClick$.map(function () {
        (get(mMcaptionDiv)  === 'none') ?
            mMcaptionDiv.ret('block') :
            mMcaptionDiv.ret('none') 
    });

    var gameClick$ = sources.DOM
        .select('#game').events('click');

    var gameClickAction$ = gameClick$.map(function () {
        (get(mMgameDiv)  === 'none') ?
            mMgameDiv.ret('block') :
            mMgameDiv.ret('none') 
    });

    var clearPicked$ = sources.DOM
        .select('#clear').events('click');

    var clearAction$ = clearPicked$.map( () => {
    });

    var forwardClick$ = sources.DOM
        .select('#forward').events('click');

    var backClick$ = sources.DOM
        .select('#back').events('click');

  
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
        socket.send(`CG#$42,${pMgroup.x},${pMname.x},${pMscore.x},${pMgoals.x}`);
      pMindex.bnd(add,-1);
      } 
    });

    var forwardAction$ = forwardClick$.map(() => {
      if (pMindex.x < travMonad.s.length - 1) {   
        pMop.ret(0);
        var ind = pMindex.x + 1;
        var s = travMonad.s[ind];
        pMnums.ret(s[0]).bnd(test3, 'MpMstyle');
        pMscore.ret(s[1]);
        pMgoals.ret(s[2]);
        pMclicked.ret(s[3]);
        pMop.ret(s[4]);
        socket.send(`CG#$42,${pMgroup.x},${pMname.x},${pMscore.x},${pMgoals.x}`);
      pMindex.bnd(add, +1);
      } 
    });

var elemA$ = sources.DOM.select('input#message1').events('keyup')
  .map(e => {
  mM9.ret(e.target.value);  
  worker.postMessage([e.target.value, mM10.x]);
});

var elemB$ = sources.DOM.select('input#message2').events('keyup')
  .map(e => {
  mM10.ret(e.target.value);
  worker.postMessage([mM9.x, e.target.value]);
});

mMrightPanel.ret('none');
clog.emit("A")
clog.emit("B")
clog.emit(5000);

  var calcStream$ = xs.merge( clearprimes$, worker$, workerB$, workerC$, clearAction$, backAction$, forwardAction$, factorsAction$, primeFib$, fibPressAction$, quadAction$, edit1Action$, edit2Action$, testWAction$, testZAction$, testQAction$, colorAction$, deleteAction$, newTaskAction$, chatClickAction$, gameClickAction$, todoClickAction$, captionClickAction$, groupPressAction$, rollClickAction$, messagePressAction$, loginPressAction$, messages$, numClickAction$, opClickAction$);
   
  return {
  DOM: calcStream$.map(function () {
  return h('div.content', [
      h('br'),     
      h('div#rightPanel', { style: { display: mMrightPanel.x } }, [ 
    
      h('span#tog', [
          h('button#game', { style: { fontSize: '16px', display: 'inline' } }, 'TOGGLE GAME'),
          h('span.tao', ' '),
          h('button#todoButton', { style: { fontSize: '16px', display: 'inline' } }, 'TOGGLE TODO_LIST'),
          h('br'),
          h('br'),
          h('button#chat2', { style: { fontSize: '16px', display: 'inline' } }, 'TOGGLE CHAT'),
          h('span.tao', ' '),
          h('button#caption', { style: { fontSize: '16px', display: 'inline' } }, 'TOGGLE CAPTION')]),
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
      h('br'), 
      h('div#gameDiv', { style: { display: `mMgameDiv.x` } }, [
      h('div.game', 'Name: ' + pMname.x ),
      h('div.game', 'Group: ' + pMgroup.x ),
      h('div.game', `Currently online: Name score | goals`  ),
      h('div.game', '' + pMdata.x  ) ] ), 
      h('br'),
      h('br'),
      h('div#todoDiv',  { style: { display: mMtodoDiv.x } }, [
        h('div#taskList', taskL  ),
        h('span', 'Author, Responsible Person, Task: '),
        h('input.newTask') ]),
      h('br'),
      h('span#alert', mMalert.x ),
      h('br'),
      h('span#alert2'),
        
      h('br'),  
      h('div#chatDiv', { style: { display: mMchatDiv.x } }, [
        h('div#messages', [
          h('span', 'Message: '),
          h('input.inputMessage'),
          h('div', messageMonad.s[3] ),  ])  ]),
      h('br'),
      h('br'), 
      h('br'), 
      h('div', `pMclicked.x: ${pMclicked.x.join(', ')}`    ), 
      h('div', 'pMop.x: ' + pMop.x ), 
      h('div', 'pMindex.x: ' + pMindex.x ), 
      h('div', 'travMonad.s.length: ' + travMonad.s.length  ),
      h('div', 'travMonad.s[pMindex.x][0]: ' + travMonad.s[pMindex.x][0] ),
      h('div', 'travMonad.s[pMindex.x][1]: ' + travMonad.s[pMindex.x][1] ),
      h('div', 'travMonad.s[pMindex.x][2]: ' + travMonad.s[pMindex.x][2] ),
      h('div', 'travMonad.s[pMindex.x][3]: ' + travMonad.s[pMindex.x][3] ),
      h('div', 'travMonad.s[pMindex.x][4]: ' + travMonad.s[pMindex.x][4] ),
  ]),
  h('div#leftPanel', [  
      h('br'),
      h('div#captionDiv', { style: { display: mMcaptionDiv.x } },  [
          h('h1', 'Motorcycle.js With JS-monads') ]),
          h('span#italic', ' Not category theory monads. These monads are like the Haskell monads, They use patterns and conform to rules borrowed from category theory. See ' ),
      h('a', { props: { href: "http://math.andrej.com/2016/08/06/hask-is-not-a-category/", target: "_blank" } }, 'Hask is not a category.'),
          h('span', ' by Andrej Bauer and . ' ),
          h('a', { props: { href: '#discussion' } }, 'Discussion'),
          h('span', ' below. ' ),
          h('br'),
          h('br'),
          h('br'),
          h('span.tao1', ' The demonstrations include persisternt, shared todo lists; '),
          h('br'),
          h('span.tao1', ' An interactive simulated dice game with a traversable history (all group members see your score decrease or increase as you navegate backwards and forwards); '),
          h('br'),
          h('span.tao1', ' Chat rooms where members can compete in the simulated dice game, chat, and share a project todo list; '),
          h('br'),
          h('span.tao1', ' And other demonstrations of the power and convenience of JS-monads in a Motorcycle application.  '),
          h('br'),
      h('br'),
      h('span.tao', 'The code for this repository is at '),
      h('a', { props: { href: "https://github.com/dschalk/JS-monads-stable", target: "_blank" } }, 'JS-monads-stable'),  
      h('div#gameDiv2', { style: { display: mMgameDiv2.x } }, [
          h('br'),
          h('span', ' Here are the basic rules:'),
          h('p', 'RULES: If clicking two numbers and an operator (in any order) results in 20 or 18, the score increases by 1 or 3, respectively. If the score becomes 0 or is evenly divisible by 5, 5 points are added. A score of 25 results in one goal. That can only be achieved by arriving at a score of 20, which jumps the score to 25. Directly computing 25 results in a score of 30, and no goal. Each time RL is clicked, one point is deducted. Three goals wins the game. '),
          h('p.red4', mMgoals2.x ),
          h('button#0.num',  { style: { display: pMstyle.x[0] }}, pMnums.x[0] ),
          h('button#1.num',  { style: { display: pMstyle.x[1] }}, pMnums.x[1] ),
          h('button#2.num',  { style: { display: pMstyle.x[2] }}, pMnums.x[2] ),
          h('button#3.num',  { style: { display: pMstyle.x[3] }}, pMnums.x[3] ),
          h('br'),
          h('button#4.op', 'add'),
          h('button#5.op', 'subtract'),
          h('button#5.op', 'mult'),
          h('button#5.op', 'div'),
          h('button#5.op', 'concat'),
          h('br'),
          h('div#dice', { style: { display: mMdice.x } }, [
            h('button.roll', 'ROLL'),
            h('br'),
            h('button#back', 'BACK'),
            h('button#forward', 'FORWARD'),
            h('div.tao', `Selected numbers: ${pMclicked.x.join(', ')} ` ),  
            h('div.tao', `Operator: ${pMop.x} ` ),  
            h('button#clear', 'Clear selected numbers (Possibly useful after clicking the BACK button) ' ),
          ])]),
h('div#log1',  { style: { display: mMlog1.x } }, [
h('p', 'IN ORDER TO SEE THE GAME, TODOLIST, AND CHAT DEMONSTRATIONS, YOU MUST ENTER SOMETHING .'),
h('span', 'Name: '),
h('input#login', )]),
h('p', mM6.x ),
h('div#log2', { style: { display: mMlog2.x } }, [
    h('span', 'Change group: '),
    h('input#group')]),
h('p', mMsoloAlert.x ),
h('p', 'People who are in the same group, other than solo, share the same todo list, messages, and simulated dice game. In order to see any of these, you must establish an identity on the server by loggin g in. The websockets connection terminates if the first message the server receives does not come from the sign in form. You can enter any random numbers or letters you like. The only check is to make sure someone hasn\t already signed in with whatever you have selected. If you log in with a name that is already in use, a message will appear and this page will be re-loaded in the browser after a four-second pause. '),
h('p', ' Data for the traversable game history accumulates until a player scores three goals and wins. The data array is then erased and the application is ready to start accumulating a new history. '),
h('hr'),
h('h1', 'The Monads'),
h('h3', ' Monad '),
code.monad,
h('br' ),
h('span.tao#monad', ' Instances of Monad, MonadState, MonadItter, and MonadEr facilitate programming in a functional style. Additional constructors can be invented as special needs arise. In this presentation we see, among other things, Monad instances linking computations and assigning results to Monad instances, ' ),
h('a', { props: { href: '#state' } }, 'MonadState'),
h('span', ' instances memoizing computation results, '),
h('a', { props: { href: '#itterLink' } }, 'MonadItter'),
h('span', ' instances organizing nested callbacks into neat, easily maintainable blocks of code, and '),
h('a', { props: { href: '#err' } }, 'MonadEr' ),
h('span', ' catching NaN and preventing crashes when undefined variables are encountered. ' ),
h('p', ' Computations are easy to link if each result is returned in an instance of Monad. Here are a few examples of functions that return instances of Monad: '),
code.e1,
h('p', ' The "M" prefix provides constrol over the destination of computation results. In the following example, m1, m2, and m3 have already been declared. Here is a comparrison of the results obtained when the "M" prefix is used and when it is omitted: ' ), 

h('pre.red9', `    m1.ret(7).bnd(m2.ret).bnd(m3.ret)  // All three monads get the value 7.
    m1.ret(0).bnd(add,3,'m2').bnd(cube,'m3')  // \'m1\', \'m2\', and \'m3\' are ignored` ),
h('pre', `    Result: m1.x === 27
            m2.x === 7
            m3.x === 7  ` ),
h('pre.red9', `    m1.ret(0).bnd(add,3,'Mm2').bnd(cube,'Mm3')   ` ),
h('pre', `    Result: m1.x === 0
            m2.x === 3
            m3.x === 27  ` ),
h('p', ' If the prefix "M" is absent, bnd() ignores the string argument. But when the "M" prefix is present, m1 retains its initial value, m2 retains the value it gets from from adding m\'s value (which is 0) to 3, and m3.x is the result. Both forms could be useful. ' ),
h('p', ' The following example shows lambda expressions sending variables v1 and v2 through a sequence of computations and v3 sending the final result to the string that is logged. It also shows monads a, b, c, d, e, f, and g being updated and preserved in an array that is not affected by further updates. That is because calling the ret() method does not mutate a monad; it creates a fresh instance with the same name. Here is the example, shown in a screen shot of the Chrome console log:. ' ),  
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
h('span', ' means that f x == g x for all Haskell values x of the appropriate type. That is the test applied to Javascript expressions in "Monad Laws" section (above). Neither the === nor the === operator would provide useful information about the behavior of instances of Monad, which are objects. Those operators test objects for location in memory. If the left and right sides of predicates create new instances of m, then the left side m and the right side m wind up in different locations in memory. So we expect m.ret(3) === m.ret(3) to return false, and it does. The question we want answered is the question \u2261 answers in Haskell: Can the left and right sides be substituted for one another and still yield the same results.'),
h('br' ),
h('br' ),
h('span.tao', ' The Haskell programming language borrowed the term "monad" from the branch of mathematics known as category theory. This was apropriate because Haskell monads, along with the function return and the operator >>=, behave quite a bit like category theory monads, and the inspiration for them came out of category theory. For Haskell monads to be category theory monads, they would need to reside in a category-theory category. They don\'t, although the Haskell mystique tends to give newcommers to the language the impression that they do. See ' ),
h('a', { props: { href: "http://math.andrej.com/2016/08/06/hask-is-not-a-category/", target: "_blank" } }, 'Hask is not a category.'),
h('br' ),
h('p', ' Research into ways of defining a Haskell category appears to be ongoing. It involves tinkering with special constraints, omitted features, and definitions of morphisms that are not Haskell functions. When a definition of the category is established, Haskell monads are then be shown to be, in some contrived context, category-theory monads. Devising such schemes are instructive academic excercises, but I don\'t think they can provide anything useful to programmers working on applications for industry, commerce, and the Internet. ' ),
h('p', ' However, imitating definitions and patterns found in category theory, as Haskell does in defining the functor, monoid, and monad type classes, was a stroke of genius that vastly enriched the Haskell programming language and brought it into the mainstream as a viable alternative to java, c++, etc.  This website runs efficiently on a Haskell websockets server. Category theory patterns are less needed, but neverthless useful, in Javascript. Code that adheres to them tends to be robust and predictable. '  ), 
    
 // **************************************************************************** END MONAD       START ERROR   
    //
    //
    //
    //
    //
   //
  h('h2', ' Asynchronous Processes ' ),
  h('p', ' The next demonstration involves a computation that can take a while to complete. It memoizes computed prime numbers and does not block the browser engine\'s primary execuation thread. The number you enter below is a cap on the size of the largest number in the Fibonacci sequence which is produced. If you enter 3 and then, one at a time, 0\'s until you reach three billion (3000000000), you should see the display updating quickly until the final 0. That will get you the prime number 2,971,215,073. If you add another 0, you can expect a descernable lag time. Removing the final 0 and then putting it back demonstrates the effectiveness of memoization. ' ),
h('p', ' I entered 300,000,000,000 (without the commas) and had to wait almost 20 seconds for the result. The computation required 19,423 microsecomds. The largest Fibonacci number displayed was 225,851,433,717; the largest prime number generated during the computation was 2013163, and the largest prime Fibonacci number was still 2,971,215,073. 20365011074. I deleted the final 0 and the displayed Fibonacci numbers promptly reverted to a shorter list, topped by 20,365,011,074. The long list of primes remained unchanged. I re-inserted a final 0 and the list of Fibonacci numbers promptly increased to where it had been, with the largest number again shown as 225,851,433,717. The "computation", which was nothing more than obtaining numbers from a pre-existing list, required only 2 microseconds.  ' ),
h('br' ),
h('span', ' According to the '), 
h('a', { props: { href: "https://oeis.org/A005478", target: "_blank" } }, 'The On-Line Encyclopedia of Integer Sequences '),
h('span', ' these are the first eleven proven prime Fibonacci numbers:'),
h('span.purp', ' 2, 3, 5, 13, 89, 233, 1597, 28657, 514229, 433494437, 2971215073, and 99194853094755497. The eleventh number, 2971215073, is as far as you can go on an ordinary desktop computer. Incrementally taking the cap up to five trillion didn\'t get me close. ' ),
h('br' ),
h('p.red',  mM36.x),
h('input#fib92'),
h('br'),
h('span#PF_7.red6', 'Fibonacci Numbers'),
h('br'),
h('span#PF_9.turk', mMres.x[0]  ),
h('br'),
h('span#PF_8.red6', 'Prime Fibonacci Numbers'),
h('br'),
h('span#primeFibs.turk', mMres.x[2]  ),
h('br'),
h('span#PF_21.red6', 'Prime Numbers'),
h('button#clearprimes', 'Clear primes display' ),    
h('br'),
h('span#PF_22.turk', mMres.x[1]  ),
h('br'),
h('p', ' The code runs in two threads, a main thread and a web worker thread. Here is a look at what happens in the main thread. A function named workerDriverB is an attribute (with key "WWB") of the the object named "source" which, along with main, is ab argynebt of the function "ru". The sources object      cycle object provides a stream of message events from workerB to the virtual DOM, which is listens for messages from workerB., using create and add from the most library, is defined as follows: ' ), 
    code.workerPrimeFibs_2,
h('p', ' The driver is merged into the stream that feeds the virtual DOM, and it is also an element of the resources object (named WWB) which supports the user interface. I still marvel at the elegance of the cycle provided by the Motorcycle and Cycle libraries. The driver listens for messages from the worker, updating primesMonad and the browser display whenever one come in. Here is the code that runs in the main thread: ' ), 
    code.primeFibInterface,
h('p', ' Here is the definition of workerB.js. MonadState and fpTransformer are discussed in the MonadState and MonadStart Transformers section below.' ),
    code.workerPrimeFibsjs,


  
h('p', ' The next demonstration uses two instances of MonadState to find the prime factors of numbers. Each prime factor is listed once.  On my desktop computer, it took several seconds to verify that 514229 is a prime number. After that, due to memoization, numbers below 514229 or not too far above it evaluated rapidly. Here\'s where you can enter a number to see its prime factors: '),
h('input#factors_1'),
h('br'),
h('div.tao3', `${mMfactors.x}` ),    
h('div.tao3', mMfactors3.x ),    

  
// ********************************************************************** Begin MonadState

h('p#monadstate'),
h('a#state', { props: { href: '#monad' } }, 'Back to Monad discussion'),
h('h2', 'MonadState and MonadState Transformers'),
p(' The preceding demonstrations used three instances of MonadState: primesMonad, fibsMonad, and factorsMonad. The chat message demonstration uses another instance of MonadState; namely, messageMonadn. Here is messageMonad along with some more information about MonadState. '),
    code.messageMonad,    
h('p', ' An instance of MonadState holds the current state along with a method for updating state. For any instance of MonadState, say m, these can be accessed through m.a and m.p, respectively.  '),
code.MonadState,
h('p', ' MonadState reproduces some of the functionality found in the Haskell Module "Control.Monad.State.Lazy", inspired by the paper "Functional Programming with Overloading and Higher-der Polymorphism", Mark P Jones (http://web.cecs.pdx.edu/~mpj/) Advanced School of Functional Programming, 1995. The following demonstrations use the MonadState instances fibsMonad and primesMonad to create and store arrays of Fibonacci numbers and arrays of prime numbers, respectively. fibsMonad and primesMonad combine, with the help of prFactTransformer3, to produce arrays of prime Fibonacci numbers. Until a browser tab is closed, the largest arrays of prime numbers that have been computed are stored in primesMonad.a and primesMonad.s[3]. When smaller arrays of prime numbers are required, thay are obtained from the large arrays and are not re-computed. '),
h('p', ' Here is the definition of fibsMonad, along with the definition of the function that becomes fibsMonad.process. '),
h('p', ' Transformers take instances of MonadState and return different instances of MonadState, possibly in a modified state. The method call "fibsMonad.bnd(fpTransformer, primesMonad)" returns primesMonad. Here is the definition of fpTransformer: '),
code.fpTransformer,
h('p', ' If the largest number in primesMonad.a is less than the square root of the largest number in fibsMonad.a, primesMonad is updated so that the largest number in primesMonad.a is greater than the square root of the largest number in fibsMonad.a. herwise, primesMonad is returned unchanged.  '),
h('p', ' The final computation in the prime Fibonacci numbers demonstration occurs when "tr3(fibsState[3],primesState[3]" is called. tr3() takes an array of Fibonacci numbers and an array of prime numbers and returns an array containing an array of Fibonacci numbers, an array of prime numbers, and an array of prime Fibonacci numbers. Here is the definition of tr3: '),
code.tr3,
h('p', ' User input is handled by a chain of computations in a web worker named workerB. first to update fibsMonad, second to extract fibsMonad.s, third to run fpTransformer to modify and then return primesMonad, and fourth to extract primesMonad.s and run tr3(fibsState[3],primesState[3]). Monad instance mMres obtains the result. mMres.x[0], mMres.x[1], and mMres.x[2], are permanent features of the virtual DOM.  Here is the code: '),
code.primeFibInterface,
h('p', 'Only 48 Fibonacci numbers need to be generated in order to get the eleventh prime Fibonacci number. But 5546 prime numbers need to be generated to test for divisibility into 2971215073. Finding the next Fibonacci number is just a matter of adding the previous two. Getting the next prime number is a more elaborate and time-consuming procedure. In this context, the time needed to compute 48 Fibonacci numbers is insignificant, so I didn\'t bother to save previously computed Fibonacci numbers in the prime Fibonacci demonstration. '),
h('p', ' Entering 50 in my desktop Ubuntu Chrome and Firefox browsers got the first eleven prime Fibonacci numbers in about one second. I tried gradually incrementing upwards from 50, but when I got to 61 I stopped due to impatience with the lag time. The 61st Fibonacci number was computed to be 1,548,008,755,920. 76,940 prime numbers were needed to check the 60th Fibonacci number. 96,043 prime numbers were needed to check the 61st Fibonacci number.  At Fibonacci number 61, no new prime Fibonacci numbers had appeared.'),
h('p', ' The demonstration uses primesMonad and factorsMonad. Here are the definitions of factosMonad and factor_state, the function that is factorsMonad.process: '),
code.factorsMonad,
h('p#async', ' And this is how user input is handled: '),
code.factorsInput,
h('p', ' The expressions get(mMfactors) and get(mMfactors) are permanent fixtures of the virtual DOM. The click handler is a stream which receives input from the virtual DOM and is merged into the stream that feeds data to the virtual DOM. Since changes to mMfactors and mMfactors3 are in the cycle initiated by user input and culminating in a modification of the virtual DOM, there is no need to explicitly create observers. Reactivity stems from being in the cycle. ' ),   
h('a', { props: { href: '#top' } }, 'Back To The Top'),

// ********************************************************************** End MonadState

  h('br', ),  















  h('h2', ' MonadEr - An Error-Catching Monad ' ),
  h('p', ' Instances of MonadEr function much the same as instances of Monad, but when an instance of MonadEr encounters an error, it ceases to perform any further computations. Instead, it passes through every subsequent stage of a sequence of MonadEr expressions, reporting where it is and repeating the error message. It will continue to do this until it is re-instantiated or until its bnd() method runs on the function clean(). ' ),
  h('p', 'Functions used as arguments to the MonadEr bnd() method can be placed in quotation marks to prevent the browser engine from throwing reference errors. Arguments can be protected in the same manner. Using MonadEr can prevent the silent proliferation of NaN results in math computations, and can prevent browser crashes due to attempts to evaluate undefined variables. Sometimes crashes are desired when testing code, but MonadEr provides instant feedback pinpointing the exact location of the error. ' ), 
  h('p', ' The following demonstration shows the Chrome console log entries that result from running ' ),
  h('pre', `    t.bnd('add3", 3, 'Mt2').bnd(cube3, 'Mt3'
    t.bnd('add3",'three', 'Mt2').bnd(cube3, 'Mt3'    
    t.bnd('add3",'Math.sqrt(-1)', 'Mt2').bnd(cube3, 'Mt3' 
    t.bnd('addd3", 3, 'Mt2').bnd(cube3, 'Mt3' ` ),
  h('br'),
  h('img.image', {props: {src: "error2.png"}}  ),   
  h('br'),
  h('p.tao1b', ' The monad laws hold for MonadVEr instances. The following relationships were verified in the Chrome console: ' ),  
  h('pre', `    ret3(0,'t',[])  // t is now an instance of MonadEr with t.x = 0 and t.e = [].

    t.ret(3).bnd(cube3).x === cube(3).x  
    ret3(3).bnd(cube3).x === cube3(3).x    

    t.bnd(t.ret) === t   
    t.bnd(ret) === t  
   
    t.ret(0).bnd(add3, 3).bnd(cube3).x === 
    t.ret(0).bnd(v => add3(v,3).bnd(cube3)).x  ` ),
  h('br'),
  h('a#itterLink', { props: { href: '#monad' } }, 'Back to Monad discussion'), 
  h('br'),  
  h('a', { props: { href: '#top' } }, 'Back To The Top'),
h('h2', 'MonadItter'),
code.monadIt,
h('p', ' MonadItter instances don\'t link to one another. They exist to facilitate the work of instances of Monad, MonadState, etc. Here\'s how they work: '),
h('p', 'For any instance of MonadItter, say "it", "it.bnd(func)" causes it.p === func. Calling the method "it.release(...args)" causes p(...args) to run, possibly with arguments supplied by the caller. '),
h('p',' As shown later on this page, MonadItter instances control the routing of incoming websockets messages. In one of the demonstrations below, they behave much like ES2015 iterators. I prefer them over ES2015 iterators, at least for what I am demonstrating.'),
h('h3', ' A Basic Itterator '),
h('p', 'The following example illustrates the use of release() with an argument. It also shows a lambda expressions being provided as an argument for the method mMZ1.bnd() (thereby becoming the value of mMZ1.p), and then mMZ1.release providing an arguments for the function mMZ1.p. The code is shown beneith the following two buttons. '),
h('button#testZ', 'mMZ1.release(1)'),
h('p.code2', mMt3.x  ) ,
h('span', 'Refresh button: '),
h('button#testQ', 'mMt1.ret(0).bnd(v => mMZ2.release(v)) '),
h('br'),
    code.testZ,
h('span.tao', ' The expression mMt3.x sits permanently in the Motorcycle virtual DOM description. You can call '),
h('span.green', 'mMZ2.release(v)'),
h('span', ' by entering a value for v below: '),
h('br'),
h('span', 'Please enter an integer here: '),
h('input#testW'),
h('p', ' cube() is defined in the Monad section (above). If you click "mMZ1.release(1)" several times, the code (above) will run several times, each time with v === 1. The result, mMt3.x, is shown below the button. mMZ1.p (bnd()\'s argument) remains constant while mMZ1.release(1) is repeatedly called, incrementing the number being cubed each time. '),
                  h('p', ' Here is another example. It demonstrates lambda expressions passing values to a remote location for use in a computation. If you enter three numbers consecutively below, call them a, b, and c, then the quadratic equation will be used to find solutions for a*x**2 + b*x + c = 0. The a, b, and c you select might not have a solution. If a and b are positive numbers, you are likely to see solutions if c is a negative number. For example, 12, 12, and -24 yields the solutions 1 and -2. '),
h('p#quad4.red2', mMquad4.x  ),
h('p#quad5.red2', mMquad5.x  ),
h('p#quad6.red2', mMquad6.x  ),
h('p', 'Run mMZ3.release(v) three times for three numbers. The numbers are a, b, and c in ax*x + b*x + c = 0: '),
h('input#quad'),
h('p', 'Here is the code:'),
code.quad,
h('p', ' fmap (above) facilitated using qS4 in a monadic sequence. qS4 returns an array, not an instance of Monad, but fmap lifts qS4 into the monadic sequence. '),
h('p', ' The function solve() is recursive. It invokes itself after release() executes three times. The expression "solve()" resets solve to the top, where mMZ3.p becomes a function containing two nested occurrances of mMZ3.bnd. After mMZ3.release() executes, mMZ3.p becomes the function that is the argument to the next occurrance of mMZ3.bnd. That function contains yet another occurrance of mMZ3.bnd. MonadItter is syntactic sugar for nested callbacks. ' ), 
h('p', ' The final example before moving on to MonadState shows how the web worker file, worker.js, handles messages it recieves. worker$ and the worker driver are shown again for the reader\'s convenience. ' ),
    code.wDriver,
    code.worker$,
    code.worker_js,
  
// ************************************************************************** START MonadState


// ***********************************************************************************************  MonadArchive


h('h2', ' MonadArchive ' ),
h('h3', ' Traversal of the dice game history. ' ),
h('p', ' The state of the simulated dice game is maintained in travMonad, an instance of MonadArchive. Here are the definitions of MonadArchive, travMonad, and the helper function trav_archive: '),
    code.monadArchive2,  
h('p', ' The method travMonad.run() executes in: ' ),
h('pre', `    messages$.          Runs when a new dice roll comes in from the websockets server.
    groupPressAction$.  Clears game data when a new group is jointed.
    nunClickAction$     Updates travMonad when numbers are clicked.
    clearAction$        Clears saved data when the button under the display is clicked.
    updateCalc          A function called by numsClickAction$ and opClickAction during game play.  ` ),
h('p', ' travMonad keeps a record of the "x" attributes of pMnums (displayed numbers), pMscore, pMgoals, pMclicked (selected numbers), and pMop (the selected operator). Whenever pMnums changes, the expression pMnums.bnd(test3, "MpMstyle") executes, updating pMstyle in order to maintain a well-formated numbers display. In is, therefor, not necessary to keep a record of pMstyle in travMonad. Here is the definition of clear():' ),
  code.test3,
h('p', ' Whenever a new roll is requested from the server, a player\'s score and the number of goals is sent to the server. The server responds by sending all group members two messages; one for updating their numbers display, the other for updating their scoreboards. Messages from browsers to the server requesting updated numbers and scoreboard information are prefixed by CA#$42. This serves the interests of efficiency because mew rolls are automaticlly requested when scores change, and score changes are always associate with requests for new numbers. One point is deducted when a player clickes ROLL. ' ),  
h('p', ' Scores increase whenever players put together expressions that return 18 or 20. An increase in score is accompanied by a call to newRoll() with two arguments: score and goals. The Haskell server updates its ServerState TMVar and broadcasts the new numbers to all group members with the prefix "CA#$42, along with a message prefixed by NN#$42 containing the updated score and goal information. NN#$42 and CA#$42 messages are parsed and acted upon in the message$ stream, where each player\'s travMonad object is augmented by the addition of a new state information array. travMonad.s is an array of arrays containing the collection of these state arrays. ' ),
h('p', ' Here is the code that runs when the back button is clicked: ' ),
    code.backAction,
h('h3', ' Updating the numbers ' ),
h('p', ' The following code shows what happens when a player clicks a number: ' ),  
    code.numClick1,
h('p', ' The clicked number is removed from pMnums and added to pMclicked in the numClickAction$ stream. If two numbers and an operator have been selected, numClickAction$ or opClickAction$ (depending on whether the most recent click was on a number or an operator) calls updateCalc with two arguments, the pMclicked.x array of selected numbers and the chosen operator. After each roll, pMop.x is updated to 0. pMop.x != 0 indicates that an operator has been selected. ' ),
  code.numClick2,
h('p', ' updateCalc calls calc on the numbers and operater provided to it by numCalcAction$ or opCalcAction$.  The return value is assigned to the variable result. If the value of result is 18 or 20, pMscore.x is augmented by 3 or 1, respectively, and checked to see if another five points should be added. score() is then called with the new value of pMscore.x as its argument. score() performs some additional tests to determine whether or not pMgoals.x should be augmented or, if the result is 3, set back to 0 to begin another game. newRoll is called in score() with the (possible newly calculated) values of pMscore.x and pMgoals.x. ' ),


//************************************************************************** END MonadArchive 
    

h('h2', ' MonadSet '),
h('p', ' The list of online group members at the bottom of the scoreboard is very responsive to change. When someone joins the group, changes to a different group, or closes a browser session, a message prefixed by NN#$42 goes out from the server providing group members with the updated list of group members. MonadSet acts upon messages prefixed by NN#$42. Here are the definitions of MonadSet and the MonadSet instance sMplayers '),
code.MonadSet,
h('a', { props: { href: '#top' } }, 'Back To The Top'),
  h('h3', ' Websocket messages'  ),  
  h('p#demo', ' Incoming websockets messages trigger updates to the game display, the chat display, and the todo list display. The members of a group see what other members are doing; and in the case of the todo list, they see the current list when they sign in to the group. When any member of a group adds a task, crosses it out as completed, edits its description, or removes it, the server updates the persistent file and all members of the group immediately see the revised list.  '),
  h('p', 'The code below shows how incoming websockets messages are routed. For example, mMZ10.release() is called when a new dice roll (prefixed by CA#$42) comes in.   '),
  code.messages,
  h('p', ' The "mMZ" prefix designates instances of MonadItter. An instance\'s bnd() method assigns its argument to its "p" attribute. "p" runs if and when its release() method is called. The next() function releases a specified MonadItter instance when the calling monad\'s value matches the specified value in the expression. In the messages$ stream, the MonadItter instance\'s bnd methods do not take argumants, but next is capable of sending arguments when bnd() is called on functions requiring them. Here is an example: '),
  h('a#tdList2', { props: { href: '#itterLink' } }, 'release() with arguments'),
  h('br'),
  h('br'),
  h('a', { props: { href: '#top' } }, 'Back To The Top'),


  h('h2', 'Appendix A - MonadState and Transformers' ),
  h('h3', 'Prime Numbers and the Fibonacci Series Examples' ),
code.fibsMonad,
  h('p', '.'),
code.primesMonad,
  h('br'),
  h('h2', 'Appendix B - MonadEr ' ),
  h('h3', 'The functions that produce the examples' ),  
    

  h('p', ' Here are the definitions of MonadEr, its helper functions, and the function that serve as parameters to the bnd() method in the demonstration. ' ),
    code.monadEr,
  h('p', ' and here is the code that produced the Chrome console log entries: ' ),
    code.errorDemo,  
  h('span.tao', ' When  a MonadEr instance encounters a function or an argument in quotation marks of types "undefined" or "NaN", a string gets pushed into the instance\'s e attribue. After that, the  bnd() method will not process any function other than clean(). It will stop at the' ),
  h('span.turk', 'if (e.length > 0)' ), 
  h('span', 'block. clean() resets an instance to normal functioning mode by setting its e attribute back to []. ' ), 

  h('br'),
  h('p'),
  h('p'),
  h('p', '.'),
  h('p', '.'),
  h('p', '.'),
  h('p', '.'),
  h('p', '.'),
  h('p'),
  h('p'),
  h('p'),
  h('p'),
  h('p')
    
       ])
     ])
   }) 
  } 
}   


       
  
      
      

const sources = {
  DOM: makeDOMDriver('#main-container'),
  WS: websocketsDriver,
  WWB: workerBDriver,
  WWC: workerCDriver,
  WW: workerDriver,
  EM2: eM2Driver
}

run(main, sources);
