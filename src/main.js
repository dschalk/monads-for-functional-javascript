"use strict";
// import xs from 'xstream';
// import {run} from '@cycle/xstream-run';
// import {makeDOMDriver} from '@cycle/dom';
import Cycle from '@motorcycle/core';
import {create, merge} from 'most';
import {h, p, span, h1, h2, h3, pre, br, div, label, input, hr, makeDOMDriver} from '@motorcycle/dom';
import code from './code.js';

console.log('I cannot explain it XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX ');
var Greeter = (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    return Greeter;
})();

var greeter;
greeter = new Greeter("world");
console.log(greeter.greet());

function createWebSocket(path) {
    var host = window.location.hostname;
    if (host == '')
        host = 'localhost';
    var uri = 'ws://' + host + ':3055' + path;
    var Socket = "MozWebSocket" in window ? MozWebSocket : WebSocket;
    return new Socket(uri);
}

var socket = createWebSocket('/');
console.log('########## socket: ', socket);

const websocketsDriver = function () {
    return create((add) => socket.onmessage = msg => add(msg))
}

socket.onmessage = function (event) {
    console.log(event);
};

socket.onclose = function (event) {
    console.log('<><><> New message <><><> ', event);
};

var messageMonad = new MonadState('messageMonad', [], message_state); 

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
    console.log('In updateTasks uuuuuuuuuuuuuuuuuu  todoData ', todoData );
}; 


    console.log(h('button',  { style: { display: pMstyle.x[1]} }, pMnums.x[1] ))

function main(sources) {

  var numsDisplay = [4,4,4,4];

  var newTasks = [];

  const messages$ = (sources.WS).map( e => {
  mMtem.ret(e.data.split(',')).bnd( v => {
  console.log('<><><><><><><><><><><><><><><><>  INCOMING  <><><><><><><> >>> In messages. e amd v are ', e, v);
  mMZ10.bnd( () => {
    mMtemp.ret([v[3], v[4], v[5], v[6]]).bnd(pMnums.ret).bnd(test3).bnd(pMstyle.ret)
    travMonad.run([ [v[3], v[4], v[5], v[6]], v[7], v[8] ]);
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
      if (pMgroup.x != 'solo' || pMname.x == v[2] ) updatePlayers(e.data)  });
  })       
  mMtemp.ret(e.data.split(',')[0])
  .bnd(next, 'CA#$42', mMZ10)
  .bnd(next, 'CD#$42', mMZ13)
  .bnd(next, 'CE#$42', mMZ14)
  .bnd(next, 'EE#$42', mMZ15)
  .bnd(next, 'DD#$42', mMZ17)
  .bnd(next, 'NN#$42', mMZ18)
  });
        
  function next(x, y, instance) {
    if (x == y) {
        instance.release();
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
    if (e.keyCode == 13) {
      pMname.ret(v);
      socket.send('CC#$42' + v );
      mM3.ret([]);

      mMdice.ret('block');
      mMrightPanel.ret('block');
      mMgameDiv2.ret('block')
      mMlogin.ret('none');
      mMlog1.ret('none');
      mMlog2.ret('block');

      /*
      mMcaptionDiv.ret('block')
      mMchatDiv.ret('block')
      mMtodoDiv.ret('block')
      mMgameDiv.ret('block')
      mMchat.ret('inline')
      mMcaption.ret('inline');
      mMgame.ret('inline')
      mMtodo.ret('inline')
      */
      // document.getElementById('group').focus(); 
      newRoll(0,0);
    }
  });

  var groupPress$ = sources.DOM
      .select('input#group').events('keypress');

  var groupPressAction$ = groupPress$.map(e => {
      if (e.keyCode == 13) {
          socket.send(`CO#$42,${pMgroup.x},${pMname.x},${e.target.value}`);
          pMgroup.ret(e.target.value)
          .bnd(pMgroup.ret)
          .bnd(gr =>
          socket.send(`CG#$42,${pMgroup.x},${pMname.x},0,0`));
      }
  });

  var messagePress$ = sources.DOM
      .select('input.inputMessage').events('keydown');

  var messagePressAction$ = messagePress$.map(function (e) {
      if (e.keyCode == 13) {
          socket.send(`CD#$42,${pMgroup.x},${pMname.x},${e.target.value}`);
          e.target.value = '';
          console.log('In messagePressAction$ ', socket.readyState);
      }
  });

  var updatePlayers = function updatePlayers (data) { 
        sMplayers.clear();
        var namesL = data.split("<br>");
        var namesList = namesL.slice(1);
        updateScoreboard2(namesList);
        namesList.forEach(player => sMplayers.add(player.trim()));
        console.log('In mMZ19 <><><>OOO<><><> namesL, sMplayers.s, and namesList are ', namesL, sMplayers.s, namesList);
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
    if (mM3.x.length == 2) {return};
    pMnums
    .bnd(spliceM, e.target.id, 1)
    .bnd(pMnums.ret)
    .bnd(mMtemp.ret)
    .bnd(test3)
    .bnd(pMstyle.ret)
    mM3
    .bnd(push, e.target.innerHTML)
    .bnd(mM3.ret)
    .bnd(v => {
      if (v.length == 2 && mM8.x != 0) {
        updateCalc(v, mM8.x) 
      }
    })
    }).startWith([0, 0, 0, 0]);

  var opClick$ = sources.DOM
      .select('.op').events('click');

  var opClickAction$ = opClick$.map(e => {
    mM8.ret(e.target.innerHTML).bnd(v => { 
      var ar = mM3.x
      if (ar.length === 2) {
        updateCalc(ar, v)
      }
    }) 
  });

  function updateCalc(ar, op) {
    mMgoals2.ret('');
    var result = calc(ar[0], op, ar[1]);
    mM3.ret([]);
    mM8.ret(0)
    if (result == 20) { 
      pMscore.bnd(add,1)
      .bnd(testscore)
      .bnd(pMscore.ret)
      .bnd(v => score(v));
      return; 
    } 
    else if (result == 18) { 
      pMscore.bnd(add,3)
      .bnd(testscore)
      .bnd(pMscore.ret)
      .bnd(v => score(v));
      return; 
    }
    else {
      pMnums.bnd(push,result)
      .bnd(pMnums.ret)
      .bnd(v => {
        travMonad.run([v, pMscore.x, pMgoals.x])
        test3(v)
        .bnd(pMstyle.ret)
      }); 
      mM8.ret(0);
      mM3.ret([]);
      console.log('in updateCalc 1111111111 pMnums.x, pMstyle.x ', pMnums.x, pMstyle.x );
    }
  };  

  function score(scor) {
    if (scor != 25) {
      newRoll(scor, pMgoals.x)
    }
    else if (pMgoals.x == 2) {
      socket.send(`CE#$42,${pMgroup.x},${pMname.x}`);
      newRoll(0,0)
    }
    else {pMgoals.bnd(add, 1).bnd(pMgoals.ret).bnd(g => newRoll(0, g))};
  };
  // ************************************************************************* Original Fibonacci enter
  var fib2 = function fib2(v) {
      if (v[2] > 1) {
          mMfib.ret([v[1], v[0] + v[1], v[2] - 1]);
      }
      else {
          console.log(v[0]);
          mM19.ret(v[0]);
      }
  };
  var fibPress$ = sources.DOM
      .select('input#code').events('keydown');
  var fibPressAction$ = fibPress$.map(function (e) {
      if (e.target.value == '') {
          return;
      }
      ;
      if (e.keyCode == 13) {
          mM21.ret(e.target.value);
          fib2([0, 1, e.target.value]);
      }
  });
  // *******************************************n****************************** ENDOM iginal Fibonacci END
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> START PRIME FIB  
  var fibKeyPress5$ = sources.DOM
      .select('input#fib92').events('keydown');

  var primeFib$ = fibKeyPress5$.map(function (e) {
    console.log('In primeFib$ VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV primesMonad.s, primesMonad.a ', primesMonad.s, primesMonad.a );
    console.log('In primeFib$ VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV fibsMonad.s, fibsMonad.a ', fibsMonad.s, fibsMonad.a );
      if (e.keyCode == 13) {
          mMres.ret(fibsMonad
              .run([1, 2 ,e.target.value, [0,1]])
              .bnd(fibsState => 
              fibsMonad
              .bnd(fpTransformer, primesMonad)
              .bnd(primesState => tr3(fibsState[3], primesState[3]) ) ) );
      }
  });
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ENDOM basic prime END
  // <>>><>><><><><>>>><><><   prime factors   ><><><><><><>>><<><><><><><><>< START prime factors  
  var factorsPress$ = sources.DOM
      .select('input#factors_1').events('keydown');


  var factorsAction$ = factorsPress$.map(function (e) {
    var factors = [];
    mMfactors3.ret('');
    if (e.keyCode == 13) {
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

    // document.getElementById('login').focus(); 
  };
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
      console.log('WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW in testZaction$')
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
      if (e.keyCode == 13) {
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
      if (x == 0) {
        mMquad5.ret('No solution', mMtemp)
        mMquad6.ret(' ');
        solve(); 
        return;
      }
      if (y == 0) {
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
      if (e.keyCode == 13) {
          mMZ3.release(e.target.value);
          document.getElementById('quad').value = null;
      }
  });

    var updateMessages = function updateMessages(e) {
      var ar = e.split(',');
      var sender = ar[2];
      ar.splice(0,3);
      var str = ar.join(',');
      messageMonad.run([ [h('br'), sender + ': ' + str], [], [], messageMonad.s[3] ]);
    };

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
        if (e.keyCode == 13) {
            var ar = e.target.value.split(',');
            if (ar.length < 3) {
              mMalert.ret('You should enter "author, responsible party, task" separated by commas');
              return;
            }
            var ar2 = ar.slice(2);
            console.log('*************  newTaskAction$  ************************$$$$$$$$$$$  ar ', ar);
            if (ar2.length == 1) {
                task = ar[2];
            }
            if (ar2.length > 1) {
                task = ar2.reduce(function (a, b) { return a + '$*$*$' + b; });
            }
            if ((get(mMar2).filter(function (v) { return (v.task == task); }).length) > 0) {
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
    if (v3 == 'no file' || v3 == 'empty') {
      mMtaskList.ret([]);
      taskL = h('span' ); 
      return;
    }
    if (get(pMgroup) != 'solo' || get(pMgroup) == 'solo' &&  get(pMname) == v2) {   
      process(data);  
    } 
  };

  var process = function (str) {
      var a = str.split(",");
      if (a == undefined) {
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
      if (a.length % 6 == 0) {
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
      else console.log(a, "is not an appropriate size");
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
        if (checked == 'true') {
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
        if (e.keyCode == 13) {
            process2(v, index);
            mMtaskList.x[index].children[3].elm.style.display = 'none';
        updateScoreboard2(namesList);
        }
    });

    var process2 = function (str, index) {
        var a = mMcurrentList.x.split(',');
        console.log('In process2 VVVVVVVVVVVV a is ', a );
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
  /*  var chatClick$ = sources.DOM
        .select('#chat2').events('click');

    var chatClickAction$ = chatClick$.map(function () {
        var el = document.getElementById('chatDiv');
        (el.style.display == 'none') ?
            el.style.display = 'inline' :
            el.style.display = 'none';
    });

    var captionClick$ = sources.DOM
        .select('#caption').events('click');
    var captionClickAction$ = captionClick$.map(function () {
        var el = document.getElementById('captionDiv');
        (el.style.display == 'none') ?
            el.style.display = 'inline' :
            el.style.display = 'none';
    });

    var todoClick$ = sources.DOM
        .select('#todoButton').events('click');
  
    var todoClickAction$ = todoClick$.map(function (e) {
        var el = document.getElementById('todoDiv');
        (el.style.display == 'none') ?
            el.style.display = 'inline' :
            el.style.display = 'none';
    });

    var gameClick$ = sources.DOM
        .select('#game').events('click');

    var gameClickAction$ = gameClick$.map(function () {
        var el = document.getElementById('gameDiv');
        (el.style.display == 'none') ?
        updateScoreboard2(namesList);
            el.style.display = 'inline' :
            el.style.display = 'none';
        var el2 = document.getElementById('gameDiv2');
        (el2.style.display == 'none') ?
            el2.style.display = 'inline' :
            el2.style.display = 'none';
    });
*/

    var todoClick$ = sources.DOM
        .select('#todoButton').events('click');
  
    var todoClickAction$ = todoClick$.map(function (e) {
        (get(mMtodoDiv)  == 'none') ?
            mMtodoDiv.ret('block') :
            mMtodoDiv.ret('none') 
    });

    var chatClick$ = sources.DOM
        .select('#chat2').events('click');

    var chatClickAction$ = chatClick$.map(function () {
        (get(mMchatDiv)  == 'none') ?
            mMchatDiv.ret('block') :
            mMchatDiv.ret('none') 
    });

    var captionClick$ = sources.DOM
        .select('#caption').events('click');

    var captionClickAction$ = captionClick$.map(function () {
        (get(mMcaptionDiv)  == 'none') ?
            mMcaptionDiv.ret('block') :
            mMcaptionDiv.ret('none') 
    });

    var gameClick$ = sources.DOM
        .select('#game').events('click');

    var gameClickAction$ = gameClick$.map(function () {
        (get(mMgameDiv)  == 'none') ?
            mMgameDiv.ret('block') :
            mMgameDiv.ret('none') 
    });

    var forwardClick$ = sources.DOM
        .select('#forward').events('click');

    var backClick$ = sources.DOM
        .select('#back').events('click');
  
    var backAction$ = backClick$.map(() => {
      if (get(pMindex) > 1) {
        let a = travMonad.a[travMonad.a.length + 1 - get(pMindex) ];
        pMnums.ret(a[0]).bnd(test3).bnd(pMstyle.ret);
        pMscore.ret(a[1]);
        pMgoals.ret(a[2]);
        pMindex.bnd(add,-1).bnd(pMindex.ret);
        if (get(pMnums).length == 4) {
          socket.send(`CG#$42,${get(pMgroup)},${get(pMname)},${get(pMscore)},${get(pMgoals)}`);
        }
      }
    });

    var forwardAction$ = forwardClick$.map(function () {
      if (get(pMindex) < travMonad.a.length) {
        let a = travMonad.a[travMonad.a.length - get(pMindex) -1 ]
        pMnums.ret(a[0]).bnd(mMtemp.ret).bnd(test3).bnd(pMstyle.ret);
        updateScoreboard2(namesList);
        pMscore.ret(a[1]);
        pMgoals.ret(a[2]);
        pMindex.bnd(add,1).bnd(pMindex.ret);
        if (get(pMnums).length == 4) {
          socket.send(`CG#$42,${get(pMgroup)},${get(pMname)},${get(pMscore)},${get(pMgoals)}`);
        }
      }
    });

  var calcStream$ = merge(  backAction$, forwardAction$, factorsAction$, primeFib$, fibPressAction$, quadAction$, edit1Action$, edit2Action$, testWAction$, testZAction$, testQAction$, colorAction$, deleteAction$, newTaskAction$, chatClickAction$, gameClickAction$, todoClickAction$, captionClickAction$, groupPressAction$, rollClickAction$, messagePressAction$, loginPressAction$, messages$, numClickAction$, opClickAction$);
  return {
  DOM: calcStream$.map(function () {
  return h('div.content', [
  h('div#rightPanel', { style: { display: `${get(mMrightPanel)}` } }, [
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
      h('div#chatDiv',  { style: { display: mMchatDiv.x } }, [
        h('div#messages', [
          h('span', 'Message: '),
          h('input.inputMessage'),
          h('div', messageMonad.s[3] ) ])  ]) ]),
  h('div#leftPanel', [  
      h('br'),
      h('div#captionDiv', { style: { display: mMcaptionDiv.x } },  [
          h('h1', 'Motorcycle.js With JS-monads') ]),
          h('span#italic', ' Not category theory monads; monads in the Haskell monads tradition. See ' ),
      h('a', { props: { href: "http://math.andrej.com/2016/08/06/hask-is-not-a-category/", target: "_blank" } }, 'Hask is not a category.'),
          h('span', ' by Andrej Bauer and . ' ),
          h('a', { props: { href: '#discussion' } }, 'Discussion'),
          h('span', ' below. ' ),
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
      h('span.tao', 'This is a '),
      h('a', { props: { href: "https://github.com/motorcyclejs", target: "_blank" } }, 'Motorcycle.js'),
      h('span', ' application. Motorcycle.js is '),
      h('a', { props: { href: "https://github.com/cyclejs/core", target: "_blank" } }, 'Cycle.js'),
      h('span', ' using '),
      h('a', { props: { href: "https://github.com/cujojs/most", target: "_blank" } }, 'Most'),
      h('span', ' , '),
      h('span', ' and '),
      h('a', { props: { href: "https://github.com/paldepind/snabbdom", target: "_blank" } }, 'Snabbdom'),
      h('span', ' instead of RxJS and virtual-dom.  The code for this repository is at '),
      h('a', { props: { href: "https://github.com/dschalk/JS-monads-stable", target: "_blank" } }, 'JS-monads-stable'),  
      h('div#gameDiv2', { style: { display: mMgameDiv2.x } }, [
          h('br'),
          h('span', ' Here are the basic rules:'),
          h('p', 'RULES: If clicking two numbers and an operator (in any order) results in 20 or 18, the score increases by 1 or 3, respectively. If the score becomes 0 or is evenly divisible by 5, 5 points are added. A score of 25 results in one goal. That can only be achieved by arriving at a score of 20, which jumps the score to 25. Directly computing 25 results in a score of 30, and no goal. Each time RL is clicked, one point is deducted. Three goals wins the game. '),
          h('p.red4', mMgoals2.x ),
          h('button#0.num',  { style: { display: pMstyle.x[0] }}, pMnums.x[0] ),
          h('button#0.num',  { style: { display: pMstyle.x[1] }}, pMnums.x[1] ),
          h('button#0.num',  { style: { display: pMstyle.x[2] }}, pMnums.x[2] ),
          h('button#0.num',  { style: { display: pMstyle.x[3] }}, pMnums.x[3] ),
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
              h('button#forward', 'FORWARD'),])]),
h('div#log1',  { style: { display: mMlog1.x } }, [
h('p', 'IN ORDER TO SEE THE GAME, TODOLIST, AND CHAT DEMONSTRATIONS, YOU MUST ENTER SOMETHING .'),
h('span', 'Name: '),
h('input#login', )]),
h('p', mM6.x ),
h('div#log2', { style: { display: mMlog2.x } }, [
    h('span', 'Change group: '),
    h('input#group')]),
h('p', mMsoloAlert.x ),
h('p', 'People who are in the same group, other than solo, share the same todo list, messages, and simulated dice game. In order to see any of these, you must establish an identity on the server by logging in. The websockets connection terminates if the first message the server receives does not come from the sign in form. You can enter any random numbers or letters you like. The only check is to make sure someone hasn\t already signed in with whatever you have selected. If you log in with a name that is already in use, a message will appear and this page will be re-loaded in the browser after a four-second pause. '),
h('p', ' Data for the traversable game history accumulates until a player scores three goals and wins. The data array is then erased and the application is ready to start accumulating a new history. '),
h('hr'),
h('h1', 'The Monads'),
h('h3', ' Monad '),
code.monad,
h('p', ' In most sequences of operationns, the arguments provided to each link\'s bnd() method are functions that return an instance of Monad. Here are some examples of functions that return instances of Monad: '),
code.e1,
h('p', ' These functions can be used with instances of Monad in many ways, for example: '),
code.e7,    
code.e7x,    
h('h3', ' The Monad Laws '), 
h('p', ' In the following discussion, "x == y" signifies that the expression x == y returns true. Let J be the collection of all Javascript values, including functions, instances of Monad, etc, and let F be the collection of all functions mapping values in J to instances of Monad with references (names) matching their ids; that is, with window[id] == m.id for some id which is a valid es2015 variable name. The collection of all such instances of Monad along and all of the functions in F is called "M". For any instances of Monad m, m1, and m2 in M and any functions f and g in F, the following relationships follow easily from the definition of Monad: '), 
h('div.bh3', 'Left Identity ' ),
h('pre.turk', `    equals( m.ret(v, ...args).bnd(f, ...args), f(v, ...args) )    
    equals( ret(v, ...args).bnd(f, ...args), f(v, ...args) ) 
    Examples: equals( m.ret(3).bnd(cube), cube(3) )  Tested and verified  
    equals( ret(3).bnd(cube), cube(3) )     Tested and verified
    Haskell monad law: (return x) >>= f \u2261 f x  ` ),
h('div.bh3', ' Right Identity  ' ),  
h('pre.turk', `    equals(m.bnd(m.ret), m)      Tested and verified 
    m.bnd(m.ret) === m   Tested and verified
    equals(m.bnd(ret, 'm'), m)  Tested and verified
    Haskell monad law: m >>= return \u2261 m `  ),
    h('div.bh3', ' Commutivity  ' ),  
    h('pre.turk', `    equals( m.bnd(f1, ...args).bnd(f2, ...args), m.bnd(v => f1(v, ...args).bnd(f2, ...args)) ) 
    Example: equals( m.ret(0).bnd(add, 3).bnd(cube), 
    m.ret(0).bnd(v => add(v,3).bnd(cube)) )  Tested amd verified
    Haskell monad law: (m >>= f) >>= g \u2261 m >>= ( \\x -> (f x >>= g) ) `),
    h('p', ' where equals is defined as: '),
    code.equals,
h('p#discussion', ' and ' ),
h('pre.turk', `f \u2261 g` ),
h('span', ' means f x == g x for all Haskell values x. ' ),
h('br' ),    
h('br' ),    
h('a', { props: { href: '#top' } }, 'Back To The Top'),
h('h3', ' Disussion ' ),
h('p', ' The function equals() was used because the == and === operators on objects check for location in memory, not equality of attributes and equivalence of methods. If the left and right sides of predicates create new instances of m, then the left side m and the right side m wind up in different locations in memory and the == operator returns false. So we expect m.ret(3) == m.ret(3) to return false, and it does. The question we want answered is this: Can the left side be substituted for the right side and vice versa? That question is answered by equals() - and also by \u2261. '),

h('span.tao', ' The Haskell programming language borrowed the name "monad" from the branch of mathematics known as category theory. This was apropriate because Haskell monads, along with the function return and the operator >>=, behave like category theory monads, and the inspiration for them came out of category theory. For Haskell monads to be category theory monads, they would need to reside in a category-theory category. It is generally acknowledged within the Haskell community that they do not.  See ' ),
h('a', { props: { href: "http://math.andrej.com/2016/08/06/hask-is-not-a-category/", target: "_blank" } }, 'Hask is not a category.'),
h('span', ' Attempts have been made to find a subset of Haskell, usually with  special constraints and new definitions of morphisms, that is an actual category. That would be the first step in finding a way to prove that Haskell monads are, at least in some contrived context, category-theory monads. Devising such a thing might be an instructive academic excercise, but I don\'t see how it could be of any value beyond that. Imatating definitions and patterns found in category theory, as Haskell does in defining the type classes functor, monoid, and monad, was a stroke of genius that vastly enriched the Haskell programming language. These are useful patterns in Javascript too.'  ), 
    
 // **************************************************************************** END MONAD       START MonadItter   
h('h2', 'MonadItter'),
code.monadIt,
h('p', ' MonadItter instances don\'t link to one another. They exist to facilitate the work of instances of Mmonad, MonadState, etc. Here\'s how they work: '),
h('p', 'For any instance of MonadItter, say "it", "it.bnd(func)" causes it.p == func. Calling the method "it.release(...args)" causes p(...args) to run, possibly with arguments supplied by the caller. '),
h('p', ' As shown later on this page, MonadItter instances control the routing of incoming websockets messages. In one of the demonstrations below, they behave much like ES2015 iterators. I prefer them over ES2015 iterators, at least for what I am demonstrating.'),
h('h3#itterLink', ' A Basic Itterator '),
h('p', 'The following example illustrates the use of release() with an argument. It also shows a lambda expressions being provided as an argument for the method mMZ1.bnd() (thereby becoming the value of mMZ1.p) and then mMZ1.release providing an arguments for the function mMZ1.p. The code is shown beneith the following two buttons. '),
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
h('p', ' cube() is defined in the Monad section (above). If you click "mMZ1.release(1)" several times, the code (above) will run several times, each time with v == 1. The result, mMt3.x, is shown below the button. mMZ1.p (bnd()\'s argument) remains constant while mMZ1.release(1) is repeatedly called, incrementing the number being cubed each time. '),
                  h('p', ' Here is another example. It demonstrates lambda expressions passing values to a remote location for use in a computation. If you enter three numbers consecutively below, call them a, b, and c, then the quadratic equation will be used to find solutions for a*x**2 + b*x + c = 0. The a, b, and c you select might not have a solution. If a and b are positive numbers, you are likely to see solutions if c is a negative number. For example, 12, 12, and -24 yields the solutions 1 and -2. '),
h('p#quad4.red2', mMquad4.x  ),
h('p#quad5.red2', mMquad5.x  ),
h('p#quad6.red2', mMquad6.x  ),
h('p', 'Run mMZ3.release(v) three times for three numbers. The numbers are a, b, and c in ax*x + b*x + c = 0: '),
h('input#quad'),
h('p', 'Here is the code:'),
code.quad,
h('p', ' fmap (above) facilitated using qS4 in a monadic sequence. qS4 returns an array, not an instance of Monad, but fmap lifts qS4 into the monadic sequence. '),
  
// ************************************************************************** START MonadState
h('p#monadstate'),
h('h2', 'MonadState and MonadState Transformers'),
h('p', ' An instance of MonadState holds the current state and value of a computation. For any instance of MonadState, say m, these can be accessed through m.s and m.a, respectively.  '),
code.MonadState,
h('p', ' MonadState reproduces some of the functionality found in the Haskell Module "Control.Monad.State.Lazy", inspired by the paper "Functional Programming with erloading and Higher-der Polymorphism", Mark P Jones (http://web.cecs.pdx.edu/~mpj/) Advanced School of Functional Programming, 1995. The following demonstrations use the MonadState instances fibsMonad and primesMonad to create and store arrays of Fibonacci numbers and arrays of prime numbers, respectively. fibsMonad and primesMonad provide a simple way to compute lists of prime Fibonacci numbers.  Because the results of computations are stored in the a and s attributes of MonadState instances, it was easy to make sure that no prime number had to be computed more than once in the prime Fibonacci demonstration. '),
h('p', ' Here is the definition of fibsMonad, along with the definition of the function that becomes fibsMonad.process. '),
code.fibsMonad,
h('p', ' Another MonadState instance used in this demonstration is primesMonad. Here is its definition along with the function that becomes primesMonad.process:  '),
code.primesMonad,
h('h3', ' MonadState transformers '),
h('p', ' Transformers take instances of MonadState and return different instances of MonadState, possibly in a modified state. The method call "fibsMonad.bnd(fpTransformer, primesMonad)" returns primesMonad. Here is the definition of fpTransformer: '),
code.fpTransformer,
h('p', ' If the largest number in primesMonad.a is less than the square root of the largest number in fibsMonad.a, primesMonad is updated so that the largest number in primesMonad.a is greater than the square root of the largest number in fibsMonad.a. herwise, primesMonad is returned unchanged.  '),
h('p', ' The final computation in the prime Fibonacci numbers demonstration occurs when "tr3(fibsState[3],primesState[3]" is called. tr3() takes an array of Fibonacci numbers and an array of prime numbers and returns an array containing an array of Fibonacci numbers, an array of prime numbers, and an array of prime Fibonacci numbers. Here is the definition of tr3: '),
code.tr3,
h('p', ' User input is handled by a chain of computations. first to update fibsMonad, second to extract fibsMonad.s, third to run fpTransformer to modify and then return primesMonad, and fourth to extract primesMonad.s and run tr3(fibsState[3],primesState[3]). Monad instance mMres obtains the result. mMres.x[0], mMres.x[1], and mMres.x[2], are permanent features of the virtual DOM.  Here is the code: '),
code.primeFibInterface,
h('p', 'Only 48 Fibonacci numbers need to be generated in order to get the eleventh prime Fibonacci number. But 5546 prime numbers need to be generated to test for divisibility into 2971215073. Finding the next Fibonacci number is just a matter of adding the previous two. Getting the next prime number is a more elaborate and time-consuming procedure. In this context, the time needed to compute 48 Fibonacci numbers is insignificant, so I didn\'t bother to save previously computed Fibonacci numbers in the prime Fibonacci demonstration. When a user enters a number smaller than the current length of fibsMonad.a, fibsMonad is modified such that its length becomes exactly what the user entered.'),
h('p', ' Entering 50 in my desktop Ubuntu Chrome and Firefox browsers got the first eleven prime Fibonacci numbers in about one second. I tried gradually incrementing upwards from 50, but when I got to 61 I stopped due to impatience with the lag time. The 61st Fibonacci number was computed to be 1,548,008,755,920. 76,940 prime numbers were needed to check the 60th Fibonacci number. 96,043 prime numbers were needed to check the 61st Fibonacci number.  At Fibonacci number 61, no new prime Fibonacci numbers had appeared.'),
h('p', ' According to multiple sources, these are the first eleven proven prime Fibonacci numbers:'),
h('span.lb', ' 2, 3, 5, 13, 89, 233, 1597, 28657, 514229, 433494437, and 2971215073 '),
h('br'),
h('p', ' The number you enter below is the length of the list of Fibonacci numbers you want to generate.  '),
h('p'),
h('input#fib92'),
h('br'),
h('span#PF_7.red6', 'Fibonacci Numbers'),
h('br'),
h('span#PF_9.turk', mMres.x[0]  ),
h('br'),
h('span#PF_21.red6', 'Prime Numbers'),
h('br'),
h('span#PF_22.turk', mMres.x[1]  ),
h('br'),
h('span#PF_8.red6', 'Prime Fibonacci Numbers'),
h('br'),
h('span#primeFibs.turk', mMres.x[2]  ),
h('p', ' The next demonstration uses two instances of MonadState to find the prime factors of numbers. Each prime factor is listed once.  my desktop computer, it took several seconds to verify that 514229 is a prime number. After that, due to persistent (until the web page closes) memoization, numbers below 514229 or not too far above it evaluated rapidly. Here\'s where you can enter a number to see its prime factors: '),
h('input#factors_1'),
h('br'),
h('br'),
h('div.tao3', mMfactors.x ),    
h('div.tao3', mMfactors3.x ),    
h('p', ' The demonstration uses primesMonad and factorsMonad. Here are the definitions of factosMonad and factor_state, the function that is factorsMonad.process: '),
code.factorsMonad,
h('p#async', ' And this is how user input is handled: '),
code.factorsInput,
h('p', ' The expressions get(mMfactors) and get(mMfactors) are permanent fixtures of the virtual DOM. The click handler is a stream which receives input from the virtual DOM and is merged into the stream that feeds data to the virtual DOM. Since changes to mMfactors and mMfactors3 are in the cycle initiated by user input and culminating in a modification of the virtual DOM, there is no need to explicitly create observers. Reactivity stems from being in the cycle. ' ),   
h('a', { props: { href: '#top' } }, 'Back To The Top'),
h('h3', ' Traversal of the dice game history. ' ),
h('p', ' MonadState instance travMonad facilitates traversal of the game history. travMonad.s is a four member array holding the current numbers, current score, current goals, and an array of arrays containing numbers, score, and goals corresponding to past states of the game.. Here is the definition of travMonad and its auxiliary function:' ),
  code.travMonad,
h('p', ' The number display is generated  by four virtual button nodes with id = i, st yle: {display: get(pMstyle)[i]} and text get(pMnums)[i] for i = 0, 1, 2, and 3. The virtual button nodes rest permanently in the virtual DOM.  pMnums and pMstyle are updated in the messages$ stream whenever a new dice roll is received from the server. pMnums and pMstyle are also re-set when a user clicks a number, causing it to disappear from the display and when when a user clicks a number or an operator button prompting a call to updateCalc, which either causes a new roll or a computed number to be added to the display. numClickAction$ and opClickAction$ are merged into the stream that feeds the virtual DOM, so updates are seen almost instantaneously. '),
h('p', ' Whenever pMnums changes, the expression pMnums.bnd(test3).bnd(pMstyle.ret) updates pMstyle so as to hide undefined values of get(pMnumes)[i] for i = 0, 1, 2, and 3. ' ),
  code.test3,
h('p', ' New dice rolls always correspond to score changes. One point is lost each time a player clicks ROLL. Scores increase whenever players put together expressions that return 18 or 20. An increase in score is always accompanied by a call to newRoll() with two arguments: score and goals. The server updates its ServerState TMVar and broadcasts the new roll to all group members with the prefix "CA#$42. The server also broadcasts the updated score and goal information, with the prefix NN#$42. These messages are caught, parsed, and acted upon in the message$ stream in the Motorcycle front end. pMnums, pMstyle, and travMonad get updated during the course of this process.' ),
  code.mMZ10,  
h('h3', ' Updating the numbers ' ),
h('p', ' The previous discusion was about traversal of the game history. This seems like a good place to look at the algorithm for generating new numbers when players click on the number and operator buttons. Here is the code: ' ),  
    code.numClick1,
h('p', ' The clicked number is removed from pMnums and added to mM3 in the numClickAction$ stream. If two numbers and an operator have been selected, numClickAction$ and opClickAction$ call updateCalc, giving it the two member array (which is held in mM3) of selected numbers and the selected operator. After each roll, mM8 is given the value 0 so mM8.x != 0 means an operator has been selected. ' ),
  code.numClick2,
h('p', ' updateCalc calls calc on the numbers and operater given to it by numCalcAction$ or opCalcAction$, giving the value to a variable named "result". If the value of result is 18 or 20, the resulting score is checked to see if it should be augmented by five and then score(scor) is called, providing the new score to the function score(). score() performs some more tests and calls for a new roll with the values of score and goals it has determined depending on whether or not there is a score and, if so, a winner. ' ),
//************************************************************************** ENDOM MonadState
h('h2', ' MonadSet '),
h('p', ' The list of online group members at the bottom of the scoreboard is very responsive to change. When someone joins the group, changes to a different group, or closes a browser session, a message prefixed by NN#$42 goes out from the server providing group members with the updated list of group members. MonadSet acts upon messages prefixed by NN#$42. Here are the definitions of MonadSet and the MonadSet instance sMplayers '),
code.MonadSet,
h('a', { props: { href: '#top' } }, 'Back To The Top'),
  h('h3', ' Websocket messages'  ),  
  h('p', ' Incoming websockets messages trigger updates to the game display, the chat display, and the todo list display. The members of a group see what other members are doing; and in the case of the todo list, they see the current list when they sign in to the group. When any member of a group adds a task, crosses it out as completed, edits its description, or removes it, the server updates the persistent file and all members of the group immediately see the revised list.  '),
  h('p', 'The code below shows how incoming websockets messages are routed. For example, mMZ10.release() is called when a new dice roll (prefixed by CA#$42) comes in.   '),
  code.messages,
  h('p', ' The "mMZ" prefix designates instances of MonadItter. An instance\'s bnd() method assigns its argument to its "p" attribute. "p" runs if and when its release() method is called. The next() function releases a specified MonadItter instance when the calling monad\'s value matches the specified value in the expression. In the messages$ stream, the MonadItter instance\'s bnd methods do not take argumants, but next is capable of sending arguments when bnd() is called on functions requiring them. Here is an example: '),
  h('a#tdList2', { props: { href: '#itterLink' } }, 'release() with arguments'),
  h('br'),
  h('h2', ' MonadE - An Error-Catching Monad ' ),
  h('p', ' Instances of MonadE function much the same as instances of Monad, but when an instance of MonadE encounters an error, it ceases to perform any further computations. Instead, it passes through every subsequent stage of a sequence of MonadE expressions, reporting where it is and repeating the error message. It will continue to do this until it is re-instantiated or until its bnd() method runs on the function clean(). ' ),
  h('p', 'Functions used as arguments to the MonadE bnd() method are placed in quotation marks to prevent the browser engine from throwing reference errors. Arguments can be protected in the same manner. ' ), 
  h('p', ' The variable test1 was defined as shown below. When test1 was entered in the Chrome developer console, "The square root of the sum of 300 squared and 400 squared is 500" was displayed. Here is the code. The screen shot is shown below. ' ),
    code.screenshot1,
  h('p', ' Next, I tried to define test2 in the Chrome developer scratch pad, which runs in the Chrome developer tools. Like the console, it is accessable by pressing F12 while in the running application in Chrome. Firefox provides similar tools. The attempt to define test2 resulted in the sequence of reports shown in the screenshot below. I defined test2 in monad.js, which loads as a script in the index.html file. The application loaded successfully, and when I looked in the console, I saw the same series of reports (screenshot below). When I entered test2 in the console, 0 was displayed. That was the value of the MonadE instance "a" when the error occurred. Here is test2 and the screenshot: ' ),  
    code.screenshot2,
  h('br'),
  h('img#image', {props: {src: "MonadE_a.png"}}  ),   
  h('br'),
  h('br'),
  h('div.tao1', ' Here are the definitions of MonadE and the functions used in the demonstration: ' ),
    code.monadE,
  h('span.tao', ' When  a MonadE instance encounters a function or an argument in quotation marks of types undefined or NaN, a message string gets pushed into its e attribue. After that, the  bnd() method will not process any function other than clean() and log2(). It will stop at the' ),
  h('span.turk', 'if (e.length > 0)' ), 
  h('span', 'block. clean() resets an instance to normal functioning mode by setting its e attribute back to []. MonadE instances are created on the flyin the error-free version. In the version with an error, these MonadE instances have already been created and ret2, by creating fresh instances, effectively re-sets their values to 0. . ' ), 
  h('p', ' The final test in the bnd() method occurs in a try-catch block. If a function and its quoted arguments are not of types undefined or NaN but the system returns an error, the error message gets logged and a browser crash is averted. ' ),    
  h('br'),
  h('br'),
  h('br'),
  h('a', { props: { href: '#top' } }, 'Back To The Top'),
  h('br'),
  h('br'),
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
}

Cycle.run(main, sources);
