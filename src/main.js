"use strict";
import {run} from '@cycle/xstream-run';
import {h, p, span, h1, h2, h3, pre, br, div, label, input, hr, makeDOMDriver} from '@cycle/dom';
import code from './code.js';
// import {EventEmitter} from 'events'
console.log('If you can read this you are in main.js <@><@><@><@><@><@><@><@>');
var textA = h('textarea', 'You bet!' );
var formA = h('form#horses', 'You bet!' );

socket.addEventListener('message', function (event) {
  console.log('<$><$><$><$><$><$><$><$><$> $$ Message from server: event.data ', event.data);
});

socket.onopen = function login () {
  var v = rand();
  var v2 = rand();
  mMshowRegister.ret('inline');
  pMname.ret(v);
  pMoldName.ret(v);
  pMgroup.ret('solo');
  var combo = v + '<o>' + v2;
  socket.send('CC#$42' + combo );
  pMcombo.ret(combo);
  pMclicked.ret([]);
  socket.send(`GZ#$42,solo,${v}`);
};

function main(sources) {
 console.log('0^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ got this far');

 const messages$ = sources.WS.map( e => {
   console.log(e);
   mMtem.ret(e.data.split(',')).bnd( v => {
    var group = v[1]
    var sender =  v[2];
    var extra = v[3];
    var extra2 = v[4];
    console.log('Websockets e.data.split message v: ', v );
    mMZ10.bnd( () => {
      gameMonad.run([v[7], v[8], 0, [], [v[3], v[4], v[5], v[6]]]);
    });
    mMZ11.bnd( () => {
      console.log('The message arrived', messages);
      var message = v.slice(3,v.length).join(', ');
      var str = v[2] + ': ' + message;
      messages.unshift(h('span', str ), h('br'));
      console.log('The message was added to messages', messages);
    });
    mMZ12.bnd( () => {
      mMgoals2.ret('The winner is ' + v[2]);
      setTimeout( function () {mMgoals2.ret('')},7000);
    });
    mMZ13.bnd( () => {
      mMgoals2.ret('A player named ' + v[2] +
        ' is currently logged in. Page will refresh in 4 seconds.')
      refresh() });
    mMZ14.bnd( () => {
      if (v[3] === "no file" || typeof v[3] == 'undefined') {
        console.log('"no file" or "undefined" arrived at mMZ17');
        taskMonad.s = [];
        taskMonad.html = "";
      }
      else {
        var str = e.data.substring(e.data.indexOf('@')+1, e.data.length) ;
        taskMonad.run2(str);
      }
    });
    mMZ15.bnd( () => {
      var ar = [];
      var g = e.data.split('<br>')
      g.shift()
      g.map(v => {
        ar.push(h('div', v));
      });     
      gameData = ar;
    });

    mMZ16.bnd( () => {                          // Prefix ZZ#$42
      var a = extra.replace(/(\r\n|\n|\r)/gm,"");   // Remove newlines
      mMcomments.ret(commentMonad.run(extra));
    });

    mMZ17.bnd( () => {                          // Prefix RR#$42
      var str = mMcommentStr.x;
      if (extra2 === "code1") {
        mMregister.ret('The registered name ' + extra + ' and the associated password were recognized. ' ); 
        socket.send('GZ#$42,' + pMgroup.x + ',' + pMname.x + ',<@>' + str);
      } 
      if (extra2 === "code2") {
        mMregister.ret('The new name ' + extra + ' was registered.' );  
        socket.send('GZ#$42,' + pMgroup.x + ',' + pMname.x + ',<@>' + str);
      }
      if (extra2 === "code3") {
        pMname.ret(sender);
        mMregister.ret('The password you entered is not the password that is registered for ' + extra + '.' ); 
      }
    });

    mMZ19.bnd( () => {                          // Prefix ZN#$42  NEW COMMENT
      var a = commentMonad.s[0];
      var b = a + '<@>' + sender + '<o>' + extra + '<@>'
      mMcomments.ret(commentMonad.run(b));
    });

    mMZ20.bnd( () => {                 
      var ar = commentMonad.s[1].slice()
      .map(v => v = v.join('<o>'));
      ar[extra] = extra2;   // The comment at index extra becomes extra2 
      var str = ar.join('<@>');
      mMcomments.ret(commentMonad.run(str));
    });

    mMZ21.bnd( () => {                          // Prefix ZD#$42  DELETE A COMMENT
      var a = commentMonad.s[1].slice();        // commentMonad.s[1] is useful.
      a.splice(extra,1);                        // Remove a comment.
      var b = a.map(v => v.join('<o>'));        // re-stringify the comments.
      var c = b.join('<@>'); 
      mMcomments.ret(commentMonad.run(c));      // Re-set the div ids and update the display.
    });

  })
  ret(e.data.split(',')[0])
  .bnd(next, 'CA#$42', mMZ10)
  .bnd(next, 'CD#$42', mMZ11)
  .bnd(next, 'CE#$42', mMZ12)
  .bnd(next, 'EE#$42', mMZ13)
  .bnd(next, 'DD#$42', mMZ14)
  .bnd(next, 'NN#$42', mMZ15)
  .bnd(next, 'ZZ#$42', mMZ16)
  .bnd(next, 'RR#$42', mMZ17)
  .bnd(next, 'WW#$42', mMZ18)
  .bnd(next, 'ZN#$42', mMZ19)
  .bnd(next, 'ZE#$42', mMZ20)
  .bnd(next, 'ZD#$42', mMZ21)
  });

 console.log('1^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ got this far');
function next(x, y, instance, z) {
  if (x == y) {
      instance.release(z);
  }
  return ret(x);
};

var comment$ = sources.DOM.select('#comment').events('keydown');

var commentAction$ = comment$.map(e => {
  if (e.keyCode == 13) {
    var com = e.target.value.replace(/,/g, "<<>>");
    var comm = com.replace(/(\r\n|\n|\r)/gm,"");   // Remove newlines
    socket.send(`GN#$42,${pMgroup.x},${pMname.x},<@>${pMname.x}<o>${comm}<@>`);
  }
});

var deleteClick2$ = sources.DOM
    .select('#deleteB').events('click');

var deleteAction2$ = deleteClick2$.map(function (e) {
    var i = e.target.parentNode.id;
    console.log('In deleteAction2 ***   ***   ***   ***   ***   ***   ***   *** i is', i );
    socket.send(`GD#$42,${pMgroup.x},${pMname.x},${i}`);
});

var editB$ = sources.DOM
    .select('input#editB').events('keydown');

var editBAction$ = editB$.map( function (e) {
  if (e.keyCode == 13) {
    console.log('Editing a comment. Here is e', e);
    var i = e.target.parentNode.id;
    var comment = e.target.value.replace(/,/g, "<<>>");
    console.log('Still in edit. Here is comment:', comment);
    socket.send('GE#$42,' + pMgroup.x + ',' + pMname.x + ',' + i + ',' + pMname.x + "<o>" + comment);
  }
})

var abcde = 'inline';
var fghij = 'inline';

  var registerPress$ = sources.DOM
      .select('input.register').events('keypress');

  var registerPressAction$ = registerPress$.map(e => {
    mMerror.ret('');
    var str = e.target.value;
    var ar = str.split(',');
    if (e.keyCode === 13) {
      mMerror.ret('');
      if (ar.length != 2) {
        mMerror.ret(' There should be one and only one comma' );
        return;
      }
      else {
        var name = ar[0];
        var x = ar.join('<o>');
        mMshowRegister.ret('none');
        pMname.bnd(backupMonad.ret)
        console.log('In registerPressAction$. str and ar are', str, ar );
        pMname.ret(name);
        console.log('pMname.x is', pMname.x );
        socket.send(`RR#$42,${pMgroup.x},${pMoldName.x},${x}`); }
    }
  });

  var groupPress$ = sources.DOM
      .select('input#group').events('keypress');

  var groupPressAction$ = groupPress$.map(e => {
      if (e.keyCode === 13) {
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
          console.log('In messagePressAction$ pMname.x is', pMname.x );
          console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
          e.target.value = '';
      }
  });

  var updatePlayers = function updatePlayers (data) {
    sMplayers.s.clear();
    var namesL = data.split("<br>");
    namesList = namesL.slice(1);
    updateScore(namesList);
    namesList.forEach(player => sMplayers.s.add(player.trim()));
  }

  function updateScore(v) {
    var g = [];
    for (let k of v) {
        g.push(h('div', '  ' + k));
    };
    return g
  };

  var rollClick$ = sources.DOM
    .select('#roll').events('click');

  var rollClickAction$ = rollClick$.map(() => {
    var a = gameMonad.fetch0() - 1;
    var b = gameMonad.fetch1();
    socket.send(`CA#$42,${pMgroup.x},${pMname.x},6,6,12,20,${a},${b}`);
  });

  var numClick$ = sources.DOM
      .select('.num').events('click');

  var numClickAction$ = numClick$.map(e => {
    if (gameMonad.fetch3().length < 2)  {
      var score = gameMonad.fetch0();
      var goals = gameMonad.fetch1();
      var op = gameMonad.fetch2();
      var a = gameMonad.fetch3();
      var b = gameMonad.fetch4();
      a.push(b.splice(e.target.id, 1)[0]);
      console.log('In numClickAction$ - - - gameMonad.index and gameMonad.s ', gameMonad.index, gameMonad.s );
      gameMonad.run([score,goals,op,a,b]);
      if (a.length === 2 && gameMonad.fetch2() != 0) {
        updateCalc(a, gameMonad.fetch2())
      }
    }
  }).startWith([0, 0, 0, 0]);

  var opClick$ = sources.DOM
      .select('.op').events('click');

  var opClickAction$ = opClick$.map(e => {
    var s3 = gameMonad.fetch3();
      var score = gameMonad.fetch0();
      var goals = gameMonad.fetch1();
      var a = gameMonad.fetch3().slice();
      var b = gameMonad.fetch4().slice();
    if (s3.length === 2) {
      updateCalc(s3, e.target.innerHTML);
    }
    else {
      gameMonad.run([score,goals,e.target.innerHTML,a,b]);
    }
  });

  var forwardClick$ = sources.DOM
      .select('#ahead.tao1').events('click')

  var backClick$ = sources.DOM
      .select('#back.tao100').events('click');

var backAction$ = backClick$.map(() => {
  if (gameMonad.s[1] > 0) {
    gameMonad.dec();
  }
});

var forwardAction$ = forwardClick$.map(() => {
  if (gameMonad.s[1] < gameMonad.s[0].length - 1) {
    gameMonad.inc();
  }
});

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

  var fibPressAction$ = fibPress$.map(function (e) { if (e.target.value === '') {
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
    console.log('In workerB$ stream in the main thread. m, m[3] ', m, m.data[3] );
    if (m.data[3] === 'color') {
      fill1Monad.ret(m.data[0]);
      fill2Monad.ret(m.data[1]);
      fill3Monad.ret(m.data[2]);
      mMprimeBlurb.ret(m.data[5]);
      mMfibBlurb.ret(m.data[4]);
      mMprimeFibBlurb.ret(m.data[6]);
    }
    else {
      console.log('m.data[3] ********************', m.data[3] );
      mMelapsed.ret(elapsed(m.data[0][3]))
      .bnd(v =>  console.log(v));
      mMres.ret(m.data[0])
      window['primesMonad'] = new MonadState('primesMonad', m.data[1], primes_state);
    }
  });

  var fibKeyPress5$ = sources.DOM
      .select('input#fib92').events('keyup');

  var primeFib$ = fibKeyPress5$.map(e => {
    workerB.postMessage([primesMonad.s, e.target.value]);
  });

  var clearprimes$ = sources.DOM
    .select('#clearprimes').events('click')
    .map(() => mMres.ret([mMres.x[0], '', mMres.x[2], mMres.x[3]]));


// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  Begin Easy

  var factorsPress$ = sources.DOM
      .select('input#factors_1').events('keydown');
  var factorsAction$ = factorsPress$.map(function (e) {
  console.log('&&&&&>>> ^ ^ ^   * * *   >>Cordial greetings from factorsAction$. e is', e );
    var factors = [];
    mMfactors3.ret('');
    if (e.keyCode === 13) {
      var num = e.target.value;
      if (!num.match(/^[0-9]+$/)) {
        mMfactors3.ret('This works only if you enter a number. ' + num + ' is not a number');
      }
      else {
        var n = parseInt(num, 10);
        workerC.postMessage([primesMonad.s, n]);
      }
    }
  });

  const workerC$ = sources.WWC.map(m => {
    console.log('Back in the main thread. m is', m );
    mMfactors.ret(m.data[0]);
    mMfactors23.ret(m.data[1]);
    window['primesMonad'] = new MonadState('primesMonad', m.data[2]);
  });


  var factorsP$ = sources.DOM
    .select('input#factors_5').events('keyup');

  var fA$ = factorsP$.map(function (e) {
    mMfactors7.ret('');
    var factors = [];
    if (e.keyCode === 13) {
      var ar = (e.target.value).split(',').map(v => parseInt(v,10));
      console.log('In fA$ ar is', ar );
      if (ar[0] !== ar[0] || ar[1] !== ar[1] || typeof ar[0] !== 'number' || typeof ar[1] !== 'number') {
        mMfactors7.ret('It works only if you enter two integers separated by a comma.');
        return;
      }
    else {
        //workerD.postMessage([primesMonad.s, ar, mMfactors6.x]);
        workerD.postMessage([primesMonad.s, ar, decompMonad.s, 'Happy, happy']);
      }
    }
  });

  const workerD$ = sources.WWD.map(m => {
    console.log('Back in the main thread. m is', m );
    mMfactors6.ret(m.data[0][3]);
    window['primesMonad'] = new MonadState('primesMonad', m.data[0], primes_state);
    mMfactors8.ret(m.data[1]);
  });


// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  End Easy

  var factorsPress_b$ = sources.DOM
      .select('input#factors_1b').events('keydown');

  var factorsAction_b$ = factorsPress_b$.map(function (e) {
  console.log('Cordial greetings from factorsAction$_b$. e is', e );
    var factors = [];
    mMfactors3_b.ret('');
    if (e.keyCode === 13) {
      var num = e.target.value;
      if (!num.match(/^[0-9]+$/)) {
        mMfactors3_b.ret('This works only if you enter a number. ' + num + ' is not a number');
      }
      else {
        var n = parseInt(num, 10);
        workerE.postMessage([primesMonad.s, n, decompMonad.s]);
      }
    }
  });

  const workerE$ = sources.WWE.map(m => {
    // console.log('Back in the main thread. m is', m );
    mMfactors_b.ret(m.data[0]);
    window['primesMonad'] = new MonadState('primesMonad', m.data[1]);
    window['decompMonad'] = new MonadState('decompMonad', m.data[2]);
  });

  var factorsP_b$ = sources.DOM
    .select('input#factors_5b').events('keyup');

  var fA_b$ = factorsP_b$.map(function (e) {
    mMfactors7.ret('');
    var factors = [];
    if (e.keyCode === 13) {
      var ar = (e.target.value).split(',').map(v => parseInt(v,10));
      console.log('In fA$ ar is', ar );
      if (ar[0] !== ar[0] || ar[1] !== ar[1] || typeof ar[0] !== 'number' || typeof ar[1] !== 'number') {
        mMfactors7.ret('It works only if you enter two integers separated by a comma.');
        return;
      }
    else {
        workerF.postMessage([primesMonad.s, ar, decompMonad.s]);
      }
    }
  });

  const workerF$ = sources.WWF.map(m => {
    console.log('Back in the main thread. m is', m );
    mMfactors6_b.ret(m.data[2][3]);
    window['primesMonad'] = new MonadState('primesMonad', m.data[0], primes_state);
    window['decompMonad'] = new MonadState('decompMonad', m.data[2], primes_state);
    mMfactors8_b.ret(m.data[1]);
  });

    var factorsP_c$ = sources.DOM
      .select('input#factors800').events('keyup');

    var fA_c$ = factorsP_c$.map(function (e) {
      console.log('In fa_c$ *************************************************************'),
      mMfactors800.ret('');
      var factors = [];
      var ar = (e.target.value).split(',').map(v => parseInt(v,10));
      if (e.keyCode === 13) {
        console.log('In fA_c$ ar is', ar );
        if (ar[0] !== ar[0] || ar[1] !== ar[1] || typeof ar[0] !== 'number' || typeof ar[1] !== 'number') {
          mMfactors7.ret('It works only if you enter two integers separated by a comma.');
          return;
        }
      else {
        console.log('In fA_c$ else block. ar is', ar );
        mMfactors800.ret(simpleWay(ar[0], ar[1]));
        }
      }
    });

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ENDOM prime factors END
  // ?<>>><>><><><><>>>><><><  traversal  ><><><><><><>>><><><><><><><><><><><>< START traversal
  document.onload = function (event) {
    console.log('onload event: ', event);
    mMitterfib5.release(200);
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
      mMquad4.ret("Solutiions for " + a + ", " + b + " and " + c + " are " + x + " and  " + y)
      mMquad5.ret(p(a).text + " * " + x + " * " + x + " + " + p(b).text +
              " * " + x + " " + p(c).text + " = 0")
      mMquad6.ret(p(a).text + " * " + y + " * " + y + " + " + p(b).text +
              " * " + y + " " + p(c).text + " = 0")
      solve();   // Continuing the endless loop.
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

    function comment2(str) {
        socket.send(`TD#$42,${get(pMgroup)},${get(pMname)},@${str}`)
    };

  var process2 = function (str, index) {
    var ar = str.split(',');
    var task;
    if (ar.length === 1) {
        task = ar;
    }
    if (ar.length > 1) {
        task = ar.reduce(function (a, b) { return a + '$*$*$' + b; });
    }
    console.log('In process2. str, ar and task are', str, ar, task );
    var a = mMcurrentList.x.split(',');
    a[6 * index] = task;
    var b = a.reduce(function (a, b) { return a + ',' + b; });
    console.log('Still in process2. task, a and b are', task, a, b );
    task2(b);
  };

// **********************************************************************END TODO LIST
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
      gameMonad.clearPicked();
    });

var elemB$ = sources.DOM.select('input#message2').events('keyup')
  .map(e => {
  mM10.ret(e.target.value);
  worker.postMessage([mM9.x, e.target.value]);
});

var pr$ = sources.DOM
    .select('#primeNumbers').events('keypress');

var prAction$ = pr$.map(function (e) {
    if (e.keyCode === 13) {
      worker.postMessage(["CE#$42", primesMonad.s, e.target.value]);
    }
});


// Clicking the checkbox to indicate that a task has been finished.
var cbx$ = sources.DOM.select('input#cbx').events('click');

var cbxAction$ = cbx$.map(e => {
  console.log('************************************ event detected');
  var s = taskMonad.s.slice();
  console.log('1 in cbxAction$. s is', s );
  var index = e.target.parentNode.id;
  s[index][1] = eval(s[index][1]) === true ? false : true
  s.map(v => v[0] = v[0].replace(/','/g, "<<>>"));
  console.log('2 in cbxAction$. s is', s );
  var str = s.join('@');
  console.log('3 in cbxAction$. str is', str);
  socket.send(`TD#$42,${get(pMgroup)},${get(pMname)},@${str}`);
});

// Clicking the completed / not completed buttons.
var chbox1Click$ = sources.DOM.select('#chbox1').events('click');

var chbox1Action$ = chbox1Click$.map( e => {
  console.log('************************************ event detected');
  var s = taskMonad.s.slice();
  console.log('In chbox1Action. $$$$$$$$$$$$$$$$$$$$$ e and s are', e, s);
  var index = e.target.parentNode.id;
  s[index][1] = false;
  s.map(v => v[0] = v[0].replace(/,/g, "<<>>"));
  var str = s.join('@');
  console.log('In chbox1Action. str is', str);
  socket.send(`TD#$42,${get(pMgroup)},${get(pMname)},@${str}`);
});

var chbox2Click$ = sources.DOM.select('#chbox2').events('click');

var chbox2Action$ = chbox2Click$.map( e => {
  console.log('************************************ event detected');
  var s = taskMonad.s.slice();
  console.log('In chbox2Action. e and s are', e, s);
  var index = e.target.parentNode.id;
  s[index][1] = true;
  s.map(v => v[0] = v[0].replace(/,/g, "<<>>"));
  var str = s.join('@');
  socket.send(`TD#$42,${get(pMgroup)},${get(pMname)},@${str}`);
});

// Clicking the DELETE button.
var deleteClick$ = sources.DOM
    .select('#delete').events('click');

var deleteAction$ = deleteClick$.map(function (e) {
  console.log('************************************ event detected');
  if (taskMonad.s.length < 2) {
    console.log('Now removing the',pMgroup.x,'file');
    taskMonad.html = '';
    taskMonad.s = [];
    socket.send(`TX#$42,${get(pMgroup)},${get(pMname)}`);
  }
  else {
    var s = taskMonad.s.slice();
    var index = e.target.parentNode.id;
    s.splice(index, 1);
    s.map(v => v[0] = v[0].replace(/,/g, "<<>>"));
    var str = s.join('@');
    socket.send(`TD#$42,${get(pMgroup)},${get(pMname)},@${str}`);
  }
});

// Editing a task.
var edit1$ = sources.DOM
    .select('button#edit1').events('click');

var edit1Action$ = edit1$.map(function (e) {
  console.log('************************************ event detected');
  console.log('In edit1Action$. e is', e );
  var index = getIndex2(e);
  var s = taskMonad.s.slice();
  var str;
  s.map(v => v[0] = v[0].replace(/','/g, "<<>>"));
  s[index][4] = 'inline-block';
  str = s.join('@');
  taskMonad.run2(str);
});

var edit2$ = sources.DOM
    .select('#edit2').events('keypress');

var edit2Action$ = edit2$.map(function (e) {
  console.log('************************************ event detected');
  console.log('In edit2Action$. e is', e );
  var arr;
  var str;
  if (e.keyCode === 13) {
    var s = taskMonad.s.slice();
    var index = e.target.parentNode.id;
    s[index][0] = e.target.value
      .split(",")
      .join("<<>>")
    s[index][1] = false;
    s[index][4] = "none";
    var str = s.join('@');
    socket.send(`TD#$42,${get(pMgroup)},${get(pMname)},@${str}`);
  }
});

// Editting a comment.
/*var edit4B$ = sources.DOM
    .select('.edit4B').events('keypress');

var edit4BAction$ = edit4B$.map(function (e) {
  console.log('************************************ event detected');
  console.log('In edit4BAction$. e is', e );
  var arr;
  var str;
  if (e.keyCode === 13) {
    var s = commentMonad.s.slice().split('@');
    s.push(pMname.x + '<o>' + e.target.value);
    var str = s.join('@');
    console.log('<*><*><*><*>*<*><*><*><*> In edit4BAction$. s and str are', s, str);
    socket.send(`TD#$42,${get(pMgroup)},${get(pMname)},@${str}`);
    showEditB = 'none';
  }
});   */

// Creating a new task
var newTask$ = sources.DOM
    .select('input.newTask').events('keydown');

var newTaskAction$ = newTask$.map(function (e) {
  console.log('************************************ event detected, e',e);
  if (e.keyCode === 13) {
  var alert = '';
  var s = taskMonad.s.slice();
  s.map(v => v[0] = v[0].replace(/,/g, "<<>>"));
  console.log('In newTaskAction$. <><><><><><><> s is', s);
  var todo = [];
    var ar = e.target.value.split(',');
    if (ar.length < 2) {
      mMalert.ret('You should enter "author, responsible party, task" separated by commas');
      return;
    }
    else {
      todo[2] = ar.shift();
      todo[3] = ar.shift();
      todo[0] = ar.join('<<>>')
      todo[1] = false;
      todo[4] = "none";
      s.push(todo);
      console.log('In newTask. s is', s );
      var str = s.join('@');
      console.log('<><><><><><><><><><><><><><><><><><> In newTaskAction$. str is', str);
      socket.send(`TD#$42,${get(pMgroup)},${get(pMname)},@${str}`);
      e.target.value = '';
    }
  }
});

console.log('Just before calcStream@');

var chatClick$ = sources.DOM
    .select('#chat2').events('click')
    .map(() => showChatDiv = showChatDiv === "none" ? "block" : "none")

 var todoClick$ = sources.DOM
    .select('#todoButton').events('click')
    .map(() => showTodoDiv = showTodoDiv === "none" ? "block" : "none")

  var calcStream$ = xs.merge( commentAction$, cbxAction$, chbox1Action$, chbox2Action$, messagePressAction$, fA_c$, forwardAction$, backAction$, prAction$, factorsAction_b$, fA$, factorsP$, fA_b$, factorsP_b$, clearprimes$, workerB$, workerC$, workerD$, workerE$, workerF$, clearAction$, factorsAction$, primeFib$, fibPressAction$, quadAction$, edit1Action$, edit2Action$, editBAction$, testWAction$, testZAction$, testQAction$, deleteAction$, deleteAction2$, newTaskAction$, chatClick$, gameClickAction$, todoClick$, captionClickAction$, groupPressAction$, rollClickAction$, registerPressAction$, messages$, numClickAction$, opClickAction$);
  return {
  DOM: calcStream$.map(function () {
  return h('div.main', [
    h('div.preContent', [
    h('br'),
      h('br'),
      h('div', 'FUNCTIONAL REACTIVE PROGRAMMING'),
      h('div', 'WITH CUSTOM MONADS AND CYCLE.JS') ]),
      h('br'),
      h('div.image_3', [
      h('img.image_2', {props: {src: "logo.svg" }}  ),
      h('span', ' ' ),
      h('a', { props: { href: "https://cycle.js.org/", target: "_blank" } }, 'A Cycle.js application') ]),
h('div.content', [
h('p', ' This site started as a place for me (David Schalk) to experiment. But now this project is mature enough to possibly be of some interest or use to others. ' ),
h('p', ' Front-end web developers might be interested in seeing how I encapsulate procedures and state in objects whose methods conform to a JavaScript version of the Haskell monad laws. It is fascinating to see how reactivity is achieved in Cycle.js. The Haskell server, which I wouldn\'t swap for anything, might also be of interest. '),
h('p', 'People who are developing a feel for function reactive programming can cut through to its essence by seeing it implemented in various contexts. The combination of Lodash, Immutable.js, and RxJS running in Node.js is one possibility. Here I demonstrate how easy it is to create monads to suit various purposes, and make them reactive by implementing them in a Cycle.js framework. ' ),

h('p', ' This site is not a paradyme of functional programming. If it were, the user name and score would not be maintained in the globally accessable monads pMname and pMscore. But with few exceptions, the unctions you will see here do not_fish for values in the global space. As refactoring continues, mutable state will increasingly be confined to streams.'),

h('span.tao', 'None of the monads currently being employed in these demonstrations emit or listen for events, and the virtual DOM elements contain no callbacks. DOM updates are prompted by adding elements to driver streams or by changing the values of monads embedded in the virtual DOM. A video presentation by the author of Cycle.js showing how it so elegantly performs its magic can be fount at '),
  
h('a', { props: { href: "https://egghead.io/lessons/rxjs-overview-of-cycle-js", target: "_blank" } }, 'Overview of Cycle.js.'),
h('br' ),
h('br' ),
h('span.tao', 'This project was created by, and is actively maintained by me, David Schalk. The code repository is at '),
h('a', { props: { href: "https://github.com/dschalk/JS-monads-stable", target: "_blank" } }, 'JS-monads'),
h('span', ' The master branch is a Motorcycle.js application using the Most.js library. That branch has been abandoned. This is an '),
h('span', ' application using xstream instead of Most. The primary branch is named "xstream". '),
h('span', ' You can comment at ' ),
h('a', { props: { href: 'https://redd.it/60c2xx' }}, 'Reddit' ),
h('span', ' or in the ' ),
h('a', { props: { href: '#cmment'}}, 'comment' ),
h('span', ' section below. '),
h('br' ),
      h('p', ' Snabbdom, xstream, and most of the monads and functions presented here are available in browser developer tools consoles and scratch pads. A production site would load these as modules, but this site is for experimention and learning. ' ),
      h('span.italic', ' These monads are like the Haskell monads in that they resemble the monads of category theory without actually being mathematical monads. See ' ),
      h('a', { props: { href: "http://math.andrej.com/2016/08/06/hask-is-not-a-category/", target: "_blank" } }, 'Hask is not a category.'),
          h('span', ' by Andrej Bauer and the ' ),
          h('a', { props: { href: '#discussion' } }, 'Discussion'),
          h('span', ' below. They provide a convenient interface for dealing with uncertainty and side effects in a purely functional manner. Adherence to the monad laws (see below) helps make the monads robust, versatile, and reliable tools for isolating and chaining sequences of javascript functions. State is modified in monads without mutating anything outside of them.' ),

          h('p', ' The demonstrations include comments, shared todo lists, text messaging, and a simulated dice game with a traversable history (all group members see your score decrease or increase as you navegate backwards and forwards, optionally branching out from an earlier state). The game history is a persistent, immutable data structure. The comments and todo lists are persistent mutable data structures. '),
  h('p', ' The monad demonstrations range from showing the versitility and potential utility of members of the Monad class. Their bnd() methods accept functions which return instances of Monad, so     performing lengthy mathematical computations asycronously in web workers. Monads encapsulate state. The error checking monad carries occurances of NaN and runtime errors through sequences of computations much like the Haskell Maybe monad. ' ),
      h('span.tao', ' The game code is fairly concise and intuitive. A quick walk-through is presented ' ),
      h('a', { props: { href: '#gameExplanation' } }, 'here'),
      h('span', '. To see monadic functionality at work, I suggest that you take a look at the section captioned ' ),
      h('a', { props: { href: '#asyncExplanation' } }, 'Asynchronous Processes'),
      h('br'),
      h('p', ' But it might be best to first proceed down the page and see the examples of Monad instances manipulating data. If you are trying to wrap you head around the concept of pure, chainable functions, such as the functions in the Underscore and Jquery libraries, understanding Monad instances might finally put you in the comfort zone you seek. ' ),
h('p', ' More and more, I am transforming this project into a showcase of functional reactive programming. I still have global objects holding things together, such as pMscore, pMname, and pMgroup. These are instances of Monad, so it is convenient to avoid mutation. pMscore.ret(x) seems to replace the value held by pMscore with x, but underneath the hood an instance of Monad is created during each update. The next refactoring will put almost everything that updates into streams. "A foolish consistency is the hobgoblin of little minds" -- Emerson. JavaScript allows the mutation of objects. It, along with "eval" and other frowned-upon features, can be useful. ' ), 
h('h3', 'The Game'),
h('p', 'People who are in the same group, other than the default group named "solo", share the same todo list, chat messages, and simulated dice game. In order to see any of these, you must establish a unique identity on the server by logging in. The websockets connection terminates if the first message the server receives does not come from the sign in form. You can enter any random numbers, letters, or special characters you like. The server checks only to make sure someone hasn\'t already signed in with the sequence you have selected. If you log in with a name that is already in use, a message will appear and this page will be re-loaded in the browser after a four-second pause. '),
h('p', ' Data for the traversable game history accumulates until a player scores three goals and wins. The data array is then erased and the application is ready to start accumulating a new history. '),
h('p', ' Your user name for trying out the game, todo list, and chat demonstrations is a random permutation of the first 14 letters of the alphabet. In the comments section, near the bottom of this page, you can chose your own user name and a password. These facilitate leaving comments which can later be revised or removed.' ),
h('br') ]),
h('hr.len90', {style: { display: mMgameDiv2.x }}, ),
h('br.len90', {style: { display: mMgameDiv2.x }}, ),
h('div.heading',  {style: { display: mMgameDiv2.x }}, 'Game, Todo List, Text Messages' ),

h('div#gameDiv2', {style: { display: mMgameDiv2.x }}, [
  h('br'),
  h('div#leftPanel', {style: { display: mMgameDiv2.x }}, [
    h('p', 'RULES: If clicking two numbers and an operator (in any order) results in 20 or 18, the score increases by 1 or 3, respectively. If the score becomes 0 or is evenly divisible by 5, 5 points are added. A score of 25 results in one goal. That can only be achieved by arriving at a score of 20, which jumps the score to 25. Directly computing 25 results in a score of 30, and no goal. Each time RL is clicked, one point is deducted. Three goals wins the game. '),
    h('p', {style: {color:'red', fontSize:  '20px'}}, mMgoals2.x ),
    buttonNode,
    h('br'),
    h('button#4.op', 'add'),
    h('button#5.op', 'subtract'),
    h('button#6.op', 'mult'),
    h('button#7.op', 'div'),
    h('button#8.op', 'concat'),
    h('br'),
    h('br'),
    h('div#dice', { style: { display: mMdice.x } }, [
      h('button#roll.tao1', 'ROLL'),
      h('button#back.tao100', 'BACK'),
      h('button#ahead.tao1', 'FORWARD'),
      h('div.tao', `Selected numbers: ${gameMonad.fetch3().join(', ')} ` ),
      h('div.tao', `Operator: ${gameMonad.fetch2()} ` ),
      h('div.tao', 'Index: ' + gameMonad.s[1] ),
      h('button#clear', 'Clear selected numbers' ),
      h('p', ' When traversing the game history, any time there are two selected numbers you can click any operator to obtain a result; or you can clear the selected numbers and click numbers of your choice. You can do anything you want with displayed numbers, but if there is a previously selected operater and you click a second number (shown after "Selected numbers:"), a computation will be performed using the previously selected operator. If that happens and it isn\'t what you want, you can back up and select a different operater before clicking a second number.'),
          h('span', 'Change group: '),
          h('input#group', 'test' ),
      h('p', mMsoloAlert.x ),
    ])
  ]),

  h('div#rightPanel', { style: { display: 'block' } }, [
    h('br'),
    h('br'),
    h('br'),
    h('br'),
    h('br'),
    h('br'),
    h('button#todoButton.cow', 'TOGGLE TODO_LIST'),
    h('br'),
    h('br'),
    h('button#chat2.cow', 'TOGGLE CHAT'),
    h('br'),
    h('br'),
    h('br'),
    h('br'),
    h('div.game', 'Name: ' + pMname.x ),
    h('div.game', 'Group: ' + pMgroup.x ),
    h('br'),
    h('div', gameData ),
    h('br'),
    h('div#a100', ' _________________________________________________ ' ),
    h('p.italic', ' Join group "t" if you want to see some previously created tasks. ' ),
    h('div',  { style: { display: showTodoDiv } }, [
      h('div', taskMonad.html ),
      h('div', 'Enter author, responsible person, and task here: '),
      h('input.newTask') ]),
    h('br'),
    h('span#alert', mMalert.x ),
    h('br'),
    h('span#alert2'),

    h('br'),
    h('div#chatDiv', { style: { display: showChatDiv } }, [
      h('div#messages', [
        h('span', 'Message: '),
        h('input.inputMessage'),
        h('div', messages  ),
        h('br'),
      ])
    ])
  ])
]),
h('div#a100', ' ____________________________________________________________________________________________________________ ' ),
h('div.content', [


 // **************************************************************************** START MONAD
   code.monad,
    code.variations,
 // **************************************************************************** END MONAD
   code.cycle,
h('p#asyncExplanation', ' ' ),
h('p', ' ' ),
h('p', ' ' ),
h('p', ' ' ),
h('p', ' ' ),
h('p', ' ' ),
h('p', ' ' ),
h('p', ' ' ),
h('p', ' ' ),
h('p', ' ' ),
h('p', ' ' ),
 // ************************************************** OOOOOOOOOOOOOO ********    BEGIN ASYNC

  h('a', { props: { href: '#top' } }, 'Back To The Top'),

  h('h2', ' Asynchronous Processes ' ),
    code.async1,

h('br'),
h('span', `${mMfibBlurb.x}`  ),
h('span', [
  h('svg', {attrs: {width: 50, height: 50}}, [
    h('circle', {attrs: {cx: 25, cy: 25, r: 20, stroke: 'purple', 'stroke-width': 4, fill: fill1Monad.x }})
  ])
]),

h('span', `${mMprimeBlurb.x}`  ),
h('span', [
  h('svg', {attrs: {width: 50, height: 50}}, [
    h('circle', {attrs: {cx: 25, cy: 25, r: 20, stroke: 'purple', 'stroke-width': 4, fill: fill2Monad.x }})
  ])
]),

h('span', `${mMprimeFibBlurb.x}`  ),
h('span', [
  h('svg', {attrs: {width: 50, height: 50}}, [
    h('circle', {attrs: {cx: 25, cy: 25, r: 20, stroke: 'purple', 'stroke-width': 4, fill: fill3Monad.x }})
  ])
]),
h('br'),

h('p.red',  'The elapsed time is ' + mMelapsed.x + ' milliseconds.' ),
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
h('span#PF_21.red6', 'The largest generated prime number.'),
h('br'),
h('span#PF_22.turk', mMres.x[1]  ),
h('br'),


h('p', ' The second demonstration in this series decomposes numbers into its their prime factors. Testing with sequences of 9\'s, the first substantial lag occurs at 9,999,999 - unless a large array of prime numbers has already been generated in the previous demonstration or elsewhere. Here it is:' ),
h('input#factors_1'),
h('br'),
h('br'),
h('span', mMfactors.x ),
h('span.tao3', mMfactors23.x ),

h('p', ' Next, two comma-separated numbers are decomposed into arrays of their prime factors, and those arrays are used to compute their lowest common multiple (lcm). For example, the lcm of 6 and 9 is 18 because 3*6 and 2*9 are both 18. The lcm of the denominators of two fractions is useful in fraction arithmetic; specifically, addition and subtraction. On my desktop computer, two seven digit numbers resulted in a lag of a few seconds when prime numbers had not been previously generated. ' ),

h('input#factors_5'),

h('br'),
h('br'),
h('div.tao3', mMfactors7.x ),
h('span', `The least common multiple of  ${mMfactors8.x[0]} and ${mMfactors8.x[1]} is ` ),
h('span.tao3', `${mMfactors8.x[2]}` ),
h('br'),
h('span', `The largest common factor of ${mMfactors8.x[0]} and ${mMfactors8.x[1]} is ` ),
h('span.tao3', `${mMfactors8.x[3]}` ),
h('br'),
h('div', `TEST: ${mMfactors8.x[0]} * ${mMfactors8.x[1]} === ${mMfactors8.x[2]} * ${mMfactors8.x[3]} `  ),
h('span', 'RESULT: ' ),
h('span.tao3', `${ (mMfactors8.x[0]  *  mMfactors8.x[1])  ===  (mMfactors8.x[2]  *  mMfactors8.x[3]) }` ),

    code.hardWay,

h('label', ' Enter a number here: ' ),
h('input#factors_1b'),
h('br'),
h('br'),
h('div.tao3', mMfactors_b.x ),

    code.hardWay2,
h('div.tao3', mMfactors7_b.x ),
h('span', `The least common multiple of  ${mMfactors8_b.x[0]} and ${mMfactors8_b.x[1]} is ` ),
h('span.tao3', `${mMfactors8_b.x[2]}` ),
h('br'),
h('span', `The largest common factor of ${mMfactors8_b.x[0]} and ${mMfactors8_b.x[1]} is ` ),
h('span.tao3', `${mMfactors8_b.x[3]}` ),
h('br'),
h('div', `TEST: ${mMfactors8_b.x[0]} * ${mMfactors8_b.x[1]} === ${mMfactors8_b.x[2]} * ${mMfactors8_b.x[3]} `  ),
h('span', 'RESULT: ' ),
h('span.tao3', `${ (mMfactors8_b.x[0]  *  mMfactors8_b.x[1])  ===  (mMfactors8_b.x[2]  *  mMfactors8_b.x[3]) }` ),
  h('h3', ' The Easy Way ' ),
  h('p', ' This has been a demonstration of MonadState and MonadState transformers. If you really want the least common multiple or the largest common factor of two positive integers, there is no need to generate prime numbers. The next and final demonstration in this section does not use a web worker. The computations block the main thread, but only for a few microseconds.' ),
  h('br' ),
  h('input#factors800'),
  h('br' ),
  h('span', `The least common multiple of  ${mMfactors800.x[0]} and ${mMfactors800.x[1]} is ` ),
  h('span.tao3', `${mMfactors800.x[2]}` ),
  h('br'),
  h('span', `The largest common factor of ${mMfactors800.x[0]} and ${mMfactors800.x[1]} is ` ),
  h('span.tao3', `${mMfactors800.x[3]}` ),
  h('br'),
  h('div', `TEST: ${mMfactors800.x[0]} * ${mMfactors800.x[1]} === ${mMfactors800.x[2]} * ${mMfactors800.x[3]} `  ),
  h('span', 'RESULT: ' ),
  h('span.tao3', `${ (mMfactors800.x[0]  *  mMfactors800.x[1])  ===  (mMfactors800.x[2]  *  mMfactors800.x[3]) }` ),
h('p', ' The code for the previous demonstrations is available at the Github repository, and will soon be available here in an appendex. primesMonad and the functions primarily involved in its transformation are shown below: ' ),
  code.primes,
  h('p', ' primesMonad state updates are generated in workerB.js and stored in the main thread. Users set new upper bounds on the size of the largest Fibonacci number in the series to be considered by entering a number in a browser input box. Here is the rele2ant code: ' ),
  code.primes3,
h('p', ' The user\'s selected number along with the current state of primesMonad (primesMonad.s) gets posted to workerB, which gets functionality beyond its prototype from workerB.js, which orchestrates preparation of the return message that will be posted back to the main thread. workerB.js delegates the job to functions in script2.js by calling: ' ),
    code.primes4,
h('p', ' execF prepares the Fibonacci series and sends its state, along with the state of primesMonad that it received from workerB.js, to fpTransformer. execP is called with the current state and the largest Fibonacci number that had been recently produced by execF as arguments. The updated state is an array with four elements, [new upper bound, new series, largest prime produced in the current browser session, largest series]. If the new result is larger than any previous one, the first and second elements of the state array are identical to the third and fourth. Otherwise, they are smaller. As is apparent in the following code, primesMonad is re-created in the main thread using the state array that was posted by workerB. ' ),
    code.primes2,
  h('h2', ' MonadEr - An Error-Catching Monad ' ),
  h('p', ' Instances of MonadEr function much the same as instances of Monad, but when an instance of MonadEr encounters an error, it ceases to perform any further computations. Instead, it passes through every subsequent stage of a sequence of MonadEr expressions, reporting where it is and repeating the error message. It will continue to do this until it is re-instantiated or until its bnd() method runs on the function clean(). ' ),
  h('p', 'Functions used as arguments to the MonadEr bnd() method can be placed in quotation marks to prevent the browser engine from throwing reference errors. Arguments can be protected in the same manner. Using MonadEr can prevent the silent proliferation of NaN results in math computations, and can prevent browser crashes due to attempts to evaluate undefined variables. Sometimes crashes are desired when testing code, but MonadEr provides instant feedback pinpointing the exact location of the error. ' ),
  h('p', ' The following demonstration shows the Chrome console log entries that result from running ' ),
  h('pre', `    t.bnd('add3', 3, '$t2').bnd(cube3, '$t3')
    t.bnd('add3','three', '$t2').bnd(cube3, '$t3')
    t.bnd('add3','Math.sqrt(-1)', '$t2').bnd(cube3, '$t3')
    t.bnd('addd3', 3, '$t2').bnd(cube3, '$t3' ` ),
  h('br'),
  h('img.image', {props: {src: "error2.png"}}  ),
  h('br'),
  h('p.tao1b', ' The monad laws hold for MonadEr instances. The following relationships were verified in the Chrome console: ' ),
  h('pre', `    ret3(0,'t',[])  // t is now an instance of MonadEr with t.x = 0 and t.e = [].

    t.ret(3).bnd(cube3).x === cube(3).x
    ret3(3).bnd(cube3).x === cube3(3).x

    t.bnd(t.ret) === t
    t.bnd(ret) === t

    t.ret(0).bnd(add3, 3).bnd(cube3).x ===
    t.ret(0).bnd(v => add3(v,3).bnd(cube3)).x  ` ),





  h('h2', 'COMMENTS' ),
  // h('div#com2',  { style: { display: abcde} }, ),

h('p', ' When this page loads in the browser, a user name is automatically generated in order to establish a unique Websocket connection. This makes it possible to exchange text messages with other group members, play the game, and work on a shared todo list.'),

h('h2', 'More About State'),
h('p', ' Comments are distributed to all groups. If you want to leave a comment, you need to log in with some text containing one comma. What you enter before the comma will be your user name and what you put after the comma will be your password. This information will be permanently stored in a text file accessible by the Haskell server. The server, on start up, loads the file into a TVar to prevent clashes when two or more browsers simultaneously yupload user names and passwords. The permanent file will make it possible for you to log in and modify or delete your comment in the future.' ),

h('p', ' If you enter user name that is already recorded with a different password, you will be asked to try again. Otherwise, you will be logged in as the user whose name you entered. If you enter a user name that has not been recorded, you will be logged in with that name when you register. Group membership and game scores will not be affected. '),

  h('br'),  
  h('h3', 'Register' ),
  h('span.red', mMregister.x ),
  h('input.register', {style: {display: mMshowRegister.x }} ),
  // h('a', { props: {href: "mailto:pyschalk@gmail.com"}}, 'email' ),
  // h('span', ' or send a personal tweet to @schalk1234' ),
  h('br' ),
  h('br' ),
  h('h3', 'COMMENTS' ),
  h('textarea#comment', ),
  h('br' ),
  h('br' ),
  h('div', mMcomments.x ),
  h('br'),
  h('p', ' When the server starts, the following code puts the comments file in a TVar ' ),
      code.comments0,
  h('p', ' When a browser loads, the server responds as follows: ' ),
      code.comments1, 
  h('p', ' The browser then processes the information it receives as follows: ' ),
      code.comments2,
  h('p', ' mMcomments.x is embedded in the virtual DOM code, so when a browser loads, the comments are automatically displayed. commentMonad (above) and its method "run" are defined below.' ),
      code.comments3,
  h('p', ' commentMonad.run places a string containing all of the comments in commentMonad.s[0]. It places in commentMonad.s[1] an array of the comments produced by splitting up the comments (attached by "<@>") and splitting the commenter from the comment (attached by "<O>"). This array of arrays is used to produce the html that is displayed, and to modify comments. There is no reason to use JSON or a Haskell parsing library. The JavaScript methods "join" and "split" make it easy to send and receive strings over a socket and parse them into arrays for display. Here is what the server does when it receives an id and modified comment:  ' ),
  h('p', ' Each comment is placed in a div with a unique numerical id. This id is used for deleting comments and for modifying them. Here is the code that executes when the server receives an id and revised comment: ' ),
      code.comments4,
  h('p', ' And here is what the browsers do with the index number and text broadcast by the server: ' ),
      code.comments5, 
  h('p', ' The code for deleting a comment is similar: ' ),
      code.comments6,
  h('br'),  











  
  
  
  h('a', { props: { href: '#top' } }, 'Back To The Top'),

  h('br#itterLink'),
  h('br'),
  h('a', { props: { href: '#top' } }, 'Back To The Top'),
h('h2', 'MonadItter'),
code.monadIt,
h('p', ' MonadItter instances don\'t link to one another. They exist to facilitate the work of instances of Monad, MonadState, etc. Here\'s how they work: '),
h('p', 'For any instance of MonadItter, say "it", "it.bnd(func)" causes it.p === func. Calling the method "it.release(...args)" causes p(...args) to run, possibly with arguments supplied by the caller. '),
h('p',' As shown later on this page, MonadItter instances control the routing of incoming websockets messages. In one of the demonstrations below, they behave much like ES2015 iterators.'),
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
h('p', 'Run mMZ3.release(v) three times for three numbers. The numbers are a, b, and c in ax*x + b*x + c = 0. Remember to press <ENTER> after each number. '),
h('input#quad'),
h('p', 'Here is the code:'),
code.quad,
h('p', ' fmap (above) facilitated using qS4 in a monadic sequence. qS4 returns an array, not an instance of Monad, but fmap lifts qS4 into the monadic sequence. '),
h('p', ' The function solve() is recursive. It invokes itself after release() executes three times. The expression "solve()" resets solve to the top, where mMZ3.p becomes a function containing two nested occurrances of mMZ3.bnd. After mMZ3.release() executes, mMZ3.p becomes the function that is the argument to the next occurrance of mMZ3.bnd. That function contains yet another occurrance of mMZ3.bnd. MonadItter is syntactic sugar for nested callbacks. ' ),

// **************************************************************************
h('p#gameExplanation', ' ' ),
h('p', ' ' ),
h('p', ' ' ),
h('p', ' ' ),
h('p', ' ' ),

h('a', { props: { href: '#top' } }, 'Back To The Top'),

//************************************************************************** START GAME

h('h2', 'The Simulated Dice Game' ),
h('p', ' The game is controlled by gameMonad, which is an instance of MonadState. The state of the game after each click on one of the displayed numbers is saved in an array of five-member arrays comprised of three numbers and two arrays. ' ),
h('p', ' The array of state arrays is kept in gameMonad.s[0]. The elements of the five-member arrays correspond to score, goals, operator, selected numbers, and displayed numbers. ' ),
h('p', ' gameMonad.s[0][ganeMonad.s[1]] is the state in gameMonad.s[0] that is displayd in the browser. As the previous sentence implies, the index number of the displayed state is the value of gameMonad.s[1]. History traversal is accomplished by changing gameMonad.s[1]. Here is how the application responds to clickes of the BACK and FORWARD buttons:' ),
    code.backAction,
h('p', ' gameMonad methods are responsible for everything that happens when the BACK or FORWARD buttons are clicked. These methods do not obtain information outside of the scope of gameMonad, and their side effects are confined to sending websockets messages and updating the DOM. gameMonad was designed to be secure against unpredictable behavior caused by code outside of its scope, and to also not interfere with code that is outside of its scope. gameMonad is an object whose methods conform to functional programming best practices. ' ),
h('p', ' The traversal methods are additions to MonadState.prototype as defined in the monad.js file. monad.js is accessed only by functions working in the main thread. Web workers access an identical version of MonadState, only without the prototype additions. It is available to them in the script2.js file, which is never accessed by functions operating in the main thread. Here are the additions to MonadState.prototype: ' ),
    code.prototypeAdditions,
h('h3', 'Scoring' ),
h('p', ' One goal is awarded each time a player lands on the number 25. The limit for the number of score changes in one turn is two. If the number of increases were not limited, landing on 5 would launch you into an series of increases through all the multiples of five terminating with a stack overflow error message. As a consequence of this rule, only one five-point jump is allowed per turn. '),
h('p', ' Another way to increase a score, other than computing an number which equals 0 modulo 5, is to compute the number 20 for one additional point, or the number 18 for three additional points. A quick way to arrive at 20 is to start at -1, compute 18 twice, which takes you from -1 to 2 to 5 and jumps you to 10. Then click roll, which sets you back to 9, and compute 18 twice. That takes you from 9 to 12, to 15, jumping you to 20. You don\'t get another jump, so click ROLL and compute 20 or click ROLL three times and compute 18, taking your score from 19 or 17 to 20 and then on to 25 and back to 0, with an increase of one goal. If it is your third goal, you win the game. ' ),
h('p', ' Now let\'s take a look at the code that responds to number and operator clicks: ' ),
    code.num_op,
h('p', ' Three types of events cause a state array to be added to gameMonad.s[0]. Clicking a number removes the clicked number from the display, and the new state is preserved in gameMonad.s[0]. Clicking an operator when two numbers have been selected causes a computation to be made, adding a number to the display or, if the result of the computation is 18 or 20, causing a score increase and a new roll of the dice. Either way, the result is preserved in gameMonad.s[0]. Finally, clicking the ROLL button reduces the clicker\'s score by 1 and causes four new numbers to be displayed. The resulting state is spliced into the gameMonad.s[0] array. ' ),
h('p', ' Requests for new rolls include the name and group of the player making the request. That information is used by the server to deduct one point and to limit broadcast of the new roll to only members of the requesting player\'s group. The request also incudes the requesting player\'s score and goals. These are returned by the server (with one point deducted) and are v[7] and v[8] in the messages$ stream. ' ),
h('p', ' Game traversal is controlled by changing the value of mMindex.x. Here is the code that is called when the BACK button is clicked: ' ),
    code.backAction,
h('p', ' numClickAction$ and opClickAction$ call updateCalc() when gameMonad.s[0][1]][3] contains two numbers and gameMonad.s[0][1][2] is no longer 0 (implying that an operator has been selected). updateCalc takes two arguments, the selected numbers and the selected operator. This is what happens when updateCalc receives that information: ' ),
    code.updateCalc,
h('p', '  If parseInt(calc(ar[0], op, ar[1]), 10) is not 18 or 20, updateCalc sets the operator back to 0 and empties the picked numbers array. It also pushes the result of the calculation into the display array. ' ),
h('p', ' If the calculation yields 18 or 20, score(result) is called. Here is the definition of score(): ' ),
    code.sco,
h('p', ' If the score is computed to be 25, the result of increasing goals by 1 determines how state is modified. If the result is not 3, goals is incremented and newRoll() is called with arguments score and goals. If the result is 3, a winner is declared and gameMonad.s reverts to [[[0,0,0,[],[0,0,0,0]]], 0]. ' ),
h('p', ' gameMonad does not use its bnd() method, but I stayed with the usual practice of preserving state in instances of MonadState. “A foolish consistency is the hobgoblin of little minds, adored by little statesmen and philosophers and divines." - Ralph Waldo Emerson. Very true, but keeping code easy to reason about is never foolish. ' ),

h('br'),
//************************************************************************** END GAME
h('h2', 'The Todo List' ),
h('p', ' The todo list is shared be the members of each group. It is stored by the server in a file bearing the groups name. Changing to a group causes that group\'s todo list to display. Changes made by one member are immediately seen by other members. ' ),
h('p', ' Tasks are held in taskMonad.s (Nested arrays of values) and in taskMonad.html (finished HTML residing in the virtural DOM). MonadState2 has the same basic definition as MonadState, but the run 2() method added to its prototype is not the same as MonadState.run. Rather than burden MonadState.prototype with both run() and run2(), I named taskMonad\'s constructor MonadState2. ' ),
h('p', ' When a todo is created, edited, marked as completed, or deleteted, the modified list of all todos is sent to the server, where the new version replaces the former version in the file named after the group and the new version is broadcast to all group members. Here is the code that runs when a todo list arrives at a browser: ' ),
    code.todo1,
h('p', ' And here is the code that creates, modifies and adds to a list of tasks. It is the entire contents of a file named "tasks.js", which is placed in script tags in index.html. Code in script tags is readily available in the browser consoles, unlike modules loaded in main.js. '),
    code.todo2,
h('p', ' Tasks can be marked a complete or not complete by clicking the checkbox or the complete / not complete buttons. When the checkbox is clicked, the index of the todo is determined and the value of a clone of taskMonad.s named "s" is changed at s[index][1]. If its value is true, it becomes false and if it is false, it becomes true. The color of the task and the line-through attribute are controlled by s[index][1]. Whether or not the completed or not completed button shows also depends on the value of s[index][1]. When one of those buttons is clicked, the value of s[index][1] is changed, causing the check mark in the checkbox to appear or diappear, changing the task color and its line-through attribute, and changing which button ("complete" or "not complete") displays.  ' ),

//************************************************************************** END GameTraversal


h('h2', ' MonadSet '),
h('p', ' The list of online group members at the bottom of the scoreboard is very responsive to change. When someone joins the group, changes to a different group, or closes a browser session, a message prefixed by NN#$42 goes out from the server providing group members with the updated list of group members. MonadSet acts upon messages prefixed by NN#$42. Here are the definitions of MonadSet and the MonadSet instance sMplayers '),
code.MonadSet,
  h('h3', ' Websocket messages'  ),
  h('p#demo', ' Incoming websockets messages trigger updates to the game display, the chat display, and the todo list display. The members of a group see what other members are doing; and in the case of the todo list, they see the current list when they sign in to the group. When any member of a group adds a task, crosses it out as completed, edits its description, or removes it, the server updates the persistent file and all members of the group immediately see the revised list.  '),
  h('p', 'The code below shows how incoming websockets messages are routed. For example, mMZ10.release() is called when a new dice roll (prefixed by CA#$42) comes in.   '),
  code.messages,
  h('p#cmment', ' The "mMZ" prefix designates instances of MonadItter. An instance\'s bnd() method assigns its argument to its "p" attribute. "p" runs if and when its release() method is called. The next() function releases a specified MonadItter instance when the calling monad\'s value matches the specified value in the expression. In the messages$ stream, the MonadItter instance\'s bnd methods do not take argumants, but next is capable of sending arguments when bnd() is called on functions requiring them. Here is an example: '),
  h('a#tdList2', { props: { href: '#itterLink' } }, 'release() with arguments'),
  h('br'),

  h('p', ' *************************************************************************** ' ),
  h('p', ' *************************************************************************** ' ),
  h('p', ' *************************************************************************** ' ),
  h('p', ' *************************************************************************** ' ),
  h('p', ' *************************************************************************** ' ),
  h('p', ' *************************************************************************** ' ),
  h('p', ' *************************************************************************** ' ),
  h('p', ' *************************************************************************** ' ),
  h('p', ' *************************************************************************** ' ),
  h('h2', 'Appendix - Under Construction ' ),
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
  WWD: workerDDriver,
  WWE: workerEDriver,
  WWF: workerFDriver,
  WW: workerDriver
}
run(main, sources);

