/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {"use strict";

	var _xstreamRun = __webpack_require__(2);

	var _dom = __webpack_require__(10);

	var _code = __webpack_require__(125);

	var _code2 = _interopRequireDefault(_code);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import {EventEmitter} from 'events'
	console.log('If you can read this you are in main.js <@><@><@><@><@><@><@><@>');
	var textA = (0, _dom.h)('textarea', 'You bet!');
	var formA = (0, _dom.h)('form#horses', 'You bet!');
	console.log('textA is: ', textA);
	console.log('formA is: ', formA);

	function workerBDriver() {
	  return xs.create({
	    start: function start(listener) {
	      workerB.onmessage = function (msg) {
	        return listener.next(msg);
	      };
	    },
	    stop: function stop() {
	      workerB.terminate();
	    }
	  });
	};

	function workerCDriver() {
	  return xs.create({
	    start: function start(listener) {
	      workerC.onmessage = function (msg) {
	        return listener.next(msg);
	      };
	    },
	    stop: function stop() {
	      workerC.terminate();
	    }
	  });
	};

	function workerDDriver() {
	  return xs.create({
	    start: function start(listener) {
	      workerD.onmessage = function (msg) {
	        return listener.next(msg);
	      };
	    },
	    stop: function stop() {
	      workerD.terminate();
	    }
	  });
	};

	function workerEDriver() {
	  return xs.create({
	    start: function start(listener) {
	      workerE.onmessage = function (msg) {
	        return listener.next(msg);
	      };
	    },
	    stop: function stop() {
	      workerE.terminate();
	    }
	  });
	};

	function workerFDriver() {
	  return xs.create({
	    start: function start(listener) {
	      workerF.onmessage = function (msg) {
	        return listener.next(msg);
	      };
	    },
	    stop: function stop() {
	      workerF.terminate();
	    }
	  });
	};

	function workerDriver() {
	  return xs.create({
	    start: function start(listener) {
	      worker.onmessage = function (msg) {
	        return listener.next(msg);
	      };
	    },
	    stop: function stop() {
	      worker.terminate();
	    }
	  });
	};

	/*function eM2Driver () {
	  return xs.create({
	    start: listener => { mM2.on = msg => listener.next(msg)},
	    stop: () => { mM2.removeAllListeners() }
	  });
	};

	function mMstreamDriver () {
	  return xs.create({
	    start: listener => { mMstream.x.on = msg => listener.next(msg)},
	    stop: () => { mMstream.removeAllListeners() }
	  });
	};*/

	socket.onmessage = function (event) {
	  console.log('Socket message', event);
	};

	socket.onmessage = function (event) {
	  console.log(event);
	};

	socket.onclose = function (event) {
	  console.log('<><><> New message <><><> ', event);
	};

	function updateTasks(obArray) {
	  var todoData = [];
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;

	  try {
	    for (var _iterator = obArray[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var ob = _step.value;

	      todoData = todoData.concat([(0, _dom.h)('span.task3', '{ style: { color: ' + ob.color + ', textDecoration: ' + ob.textDecoration + ' } }, \'Task: \' + ' + ob.task), (0, _dom.h)('br'), (0, _dom.h)('button#edit1', 'Edit'), (0, _dom.h)('input#edit2', '{ props: { type: textarea, value: ' + ob.task + '}}'), (0, _dom.h)('span#author.tao', 'Author: ' + ob.author + '  /  Responsibility: ' + ob.responsible), (0, _dom.h)('br'), (0, _dom.h)('input#cb', '{ props: { type: \'checkbox\', checked: ' + ob.checked + '}},\n           {style: { color: ' + ob.color + ', textDecoration: ' + ob.textDecoration + '}}'), (0, _dom.h)('label.cbox', { props: { for: '#cb' } }, 'Completed'), (0, _dom.h)('button.delete', 'Delete'), (0, _dom.h)('br'), (0, _dom.h)('hr')]);
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }
	};

	function main(sources) {

	  var worker$ = sources.WW.map(function (v) {
	    console.log('Message from worker: ', v);
	    v.preventDefault();
	    mMZ21.bnd(function () {
	      mM11.ret(v.data[1]);
	    });
	    mMZ22.bnd(function () {
	      mM12.ret(v.data[1]);
	    });
	    mMZ23.bnd(function () {
	      mM13.ret(v.data[1]);
	    });
	    mMZ24.bnd(function () {
	      mM14.ret(v.data[1]);
	    });
	    mMZ25.bnd(function () {
	      console.log('??????????????????????????????????????????? mMZ25.bnd - - - v', v);
	      if (typeof v.data[1] === 'string') {
	        console.log('Major malfunction in worker.js  Reporting from main thread', v.data[1]);
	      } else {
	        mMres.ret(v.data[0]);
	        console.log('In main thread. Re-instanciating primesMonad with ', v.data[1]);
	        primesMonad = new MonadState('primesMonad', v.data[1]);
	      }
	    });
	    next(v.data[0], 'CA#$41', mMZ21);
	    next(v.data[0], 'CB#$41', mMZ22);
	    next(v.data[0], 'CC#$41', mMZ23);
	    next(v.data[0], 'CD#$41', mMZ24);
	    next(v.data[0], 'CE#$41', mMZ25);
	  });

	  var messages$ = sources.WS.map(function (e) {
	    console.log(e);
	    mMtem.ret(e.data.split(',')).bnd(function (v) {
	      console.log('Websockets e.data.split message v: ', v);
	      mMZ10.bnd(function () {
	        gameMonad.run([v[7], v[8], 0, [], [v[3], v[4], v[5], v[6]]]);
	      });
	      mMZ12.bnd(function () {
	        return mM6.ret(v[2] + ' successfully logged in.');
	      });
	      mMZ13.bnd(function () {
	        var message = v.slice(3, v.length).join(', ');
	        var str = v[2] + ': ' + message;
	        messages.unshift((0, _dom.h)('span', str), (0, _dom.h)('br'));
	      });
	      mMZ14.bnd(function () {
	        mMgoals2.ret('The winner is ' + v[2]);
	        setTimeout(function () {
	          return mMgoals2.ret('');
	        }, 5000);
	      });
	      mMZ15.bnd(function () {
	        mMgoals2.ret('A player named ' + v[2] + ' is currently logged in. Page will refresh in 4 seconds.');
	        refresh();
	      });
	      mMZ16.bnd(function () {
	        return testComments(e.data);
	      });
	      mMZ17.bnd(function () {
	        return testTask(v[2], v[3], e.data);
	      });
	      mMZ18.bnd(function () {
	        if (pMgroup.x != 'solo' || pMname.x === v[2]) updatePlayers(e.data);
	      });
	      mMZ19.bnd(function () {
	        return testComments(e.data);
	      });
	    });
	    mMtemp.ret(e.data.split(',')[0]).bnd(next, 'CA#$42', mMZ10).bnd(next, 'CD#$42', mMZ13).bnd(next, 'CE#$42', mMZ14).bnd(next, 'EE#$42', mMZ15).bnd(next, 'TG#$41', mMZ16).bnd(next, 'DD#$42', mMZ17).bnd(next, 'NN#$42', mMZ18).bnd(next, 'GG#$42', mMZ19).bnd(next, 'TG#$40', mMZ20);
	  });

	  function next(x, y, instance, z) {
	    if (x == y) {
	      instance.release(z);
	    }
	    return ret(x);
	  };

	  function testComments(data) {
	    console.log('In testComments data is >>>>>>>>>>>>>>>>>>>>', data);
	    var a1 = data.split('@');
	    var a2 = a1[1];
	    console.log('In testComments a2 is >>>>>>>>>>>>>>>>>>>>', a2);
	    var arr = a2.split('\n');
	    mM26.ret([]);
	    var _iteratorNormalCompletion2 = true;
	    var _didIteratorError2 = false;
	    var _iteratorError2 = undefined;

	    try {
	      for (var _iterator2 = arr[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	        var k = _step2.value;

	        mM26.bnd(push, k, 'mM26');
	        mM26.bnd(push, (0, _dom.h)('br'), 'mM26');
	      }
	    } catch (err) {
	      _didIteratorError2 = true;
	      _iteratorError2 = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion2 && _iterator2.return) {
	          _iterator2.return();
	        }
	      } finally {
	        if (_didIteratorError2) {
	          throw _iteratorError2;
	        }
	      }
	    }

	    console.log('In testComment ar is >>>>>>>>>>>>>>>>>>>>', mM26.x);
	  };

	  var comClick$ = sources.DOM.select('textarea#comment').events('click');

	  var comClickAction$ = comClick$.map(function (e) {
	    if (e.target.value !== '') socket.send('TG#$42,' + get(pMgroup) + ',' + get(pMname) + ',@' + e.target.value + '\n*****************************');
	  });

	  var loginPress$ = sources.DOM.select('input.login').events('keypress');

	  var loginPressAction$ = loginPress$.map(function (e) {
	    var v = e.target.value;
	    if (e.keyCode === 13) {
	      pMname.ret(v);
	      pMgroup.ret('solo');
	      socket.send('CC#$42' + v);
	      pMclicked.ret([]);
	      socket.send('TG#$41,solo,' + v);
	      mMdice.ret('block');
	      mMrightPanel.ret('block');
	      mMrightPanel2.ret('none');
	      mMgameDiv2.ret('block');
	      mMlogin.ret('none');
	      mMlog1.ret('none');
	      mMlog2.ret('block');
	      mMcaptionDiv.ret('block');
	      mMchatDiv.ret('block');
	      mMtodoDiv.ret('block');
	      mMgameDiv.ret('block');
	      mMchat.ret('inline');
	      mMcaption.ret('inline');
	      mMgame.ret('inline');
	      mMtodo.ret('inline');
	      mMcom2.ret('none');
	      mMcom3.ret('block');
	      socket.send('CG#$42,' + pMgroup.x + ',' + pMname.x + ',0,0');
	      socket.send('TG#$40,' + pMgroup.x + ',' + pMname.x);
	    };
	  });

	  var groupPress$ = sources.DOM.select('input#group').events('keypress');

	  var groupPressAction$ = groupPress$.map(function (e) {
	    if (e.keyCode === 13) {
	      socket.send('CO#$42,' + pMgroup.x + ',' + pMname.x + ',' + e.target.value);
	      pMgroup.ret(e.target.value).bnd(function (gr) {
	        return socket.send('CG#$42,' + pMgroup.x + ',' + pMname.x + ',0,0');
	      });
	    }
	  });

	  var messagePress$ = sources.DOM.select('input.inputMessage').events('keydown');

	  var messagePressAction$ = messagePress$.map(function (e) {
	    if (e.keyCode === 13) {
	      socket.send('CD#$42,' + pMgroup.x + ',' + pMname.x + ',' + e.target.value);
	      e.target.value = '';
	    }
	  });

	  var updatePlayers = function updatePlayers(data) {
	    sMplayers.s.clear();
	    var namesL = data.split("<br>");
	    namesList = namesL.slice(1);
	    updateScoreboard2(namesList);
	    namesList.forEach(function (player) {
	      return sMplayers.s.add(player.trim());
	    });
	  };

	  function updateScoreboard2(v) {
	    var ar = [];
	    var _iteratorNormalCompletion3 = true;
	    var _didIteratorError3 = false;
	    var _iteratorError3 = undefined;

	    try {
	      for (var _iterator3 = v[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	        var k = _step3.value;

	        ar.push(['  ' + k]);
	      }
	    } catch (err) {
	      _didIteratorError3 = true;
	      _iteratorError3 = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion3 && _iterator3.return) {
	          _iterator3.return();
	        }
	      } finally {
	        if (_didIteratorError3) {
	          throw _iteratorError3;
	        }
	      }
	    }

	    ;
	    pMdata.ret(ar);
	  };

	  var rollClick$ = sources.DOM.select('#roll').events('click');

	  var rollClickAction$ = rollClick$.map(function () {
	    var a = gameMonad.fetch0().valueOf() - 1;
	    var b = gameMonad.fetch1().valueOf();
	    socket.send('CA#$42,' + pMgroup.x + ',' + pMname.x + ',6,6,12,20,' + a + ',' + b);
	  });

	  var numClick$ = sources.DOM.select('.num').events('click');

	  var numClickAction$ = numClick$.map(function (e) {
	    if (gameMonad.fetch3().length < 2) {
	      var score = gameMonad.fetch0();
	      var goals = gameMonad.fetch1();
	      var op = gameMonad.fetch2();
	      var a = gameMonad.fetch3();
	      var b = gameMonad.fetch4();
	      a.push(b.splice(e.target.id, 1)[0]);
	      console.log('In numClickAction$ - - - gameMonad.index and gameMonad.s ', gameMonad.index, gameMonad.s);
	      gameMonad.run([score, goals, op, a, b]);
	      if (a.length === 2 && gameMonad.fetch2() != 0) {
	        updateCalc(a, gameMonad.fetch2());
	      }
	    }
	  }).startWith([0, 0, 0, 0]);

	  var opClick$ = sources.DOM.select('.op').events('click');

	  var opClickAction$ = opClick$.map(function (e) {
	    var s3 = gameMonad.fetch3();
	    var score = gameMonad.fetch0();
	    var goals = gameMonad.fetch1();
	    var a = gameMonad.fetch3().slice();
	    var b = gameMonad.fetch4().slice();
	    if (s3.length === 2) {
	      updateCalc(s3, e.target.innerHTML);
	    } else {
	      gameMonad.run([score, goals, e.target.innerHTML, a, b]);
	    }
	  });

	  var forwardClick$ = sources.DOM.select('#ahead.tao1').events('click');

	  var backClick$ = sources.DOM.select('#back.tao100').events('click');

	  var backAction$ = backClick$.map(function () {
	    if (gameMonad.s[1] > 0) {
	      gameMonad.dec();
	    }
	  });

	  var forwardAction$ = forwardClick$.map(function () {
	    if (gameMonad.s[1] < gameMonad.s[0].length - 1) {
	      gameMonad.inc();
	    }
	  });

	  var fib2 = function fib2(v) {
	    if (v[2] > 1) {
	      mMfib.ret([v[1], v[0] + v[1], v[2] - 1]);
	    } else {
	      mM19.ret(v[0]);
	    }
	  };

	  var fibPress$ = sources.DOM.select('input#code').events('keydown');

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

	  var workerB$ = sources.WWB.map(function (m) {
	    console.log('In workerB$ stream in the main thread. m, m[3] ', m, m.data[3]);
	    if (m.data[3] === 'color') {
	      fill1Monad.ret(m.data[0]);
	      fill2Monad.ret(m.data[1]);
	      fill3Monad.ret(m.data[2]);
	      mMprimeBlurb.ret(m.data[5]);
	      mMfibBlurb.ret(m.data[4]);
	      mMprimeFibBlurb.ret(m.data[6]);
	    } else {
	      console.log('m.data[3] ********************', m.data[3]);
	      mMelapsed.ret(elapsed(m.data[0][3])).bnd(function (v) {
	        return console.log(v);
	      });
	      mMres.ret(m.data[0]);
	      window['primesMonad'] = new MonadState('primesMonad', m.data[1], primes_state);
	    }
	  });

	  var fibKeyPress5$ = sources.DOM.select('input#fib92').events('keyup');

	  var primeFib$ = fibKeyPress5$.map(function (e) {
	    workerB.postMessage([primesMonad.s, e.target.value]);
	  });

	  var clearprimes$ = sources.DOM.select('#clearprimes').events('click').map(function () {
	    return mMres.ret([mMres.x[0], '', mMres.x[2], mMres.x[3]]);
	  });

	  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  Begin Easy

	  var factorsPress$ = sources.DOM.select('input#factors_1').events('keydown');
	  var factorsAction$ = factorsPress$.map(function (e) {
	    console.log('&&&&&>>> ^ ^ ^   * * *   >>Cordial greetings from factorsAction$. e is', e);
	    var factors = [];
	    mMfactors3.ret('');
	    if (e.keyCode === 13) {
	      var num = e.target.value;
	      if (!num.match(/^[0-9]+$/)) {
	        mMfactors3.ret('This works only if you enter a number. ' + num + ' is not a number');
	      } else {
	        var n = parseInt(num, 10);
	        workerC.postMessage([primesMonad.s, n]);
	      }
	    }
	  });

	  var workerC$ = sources.WWC.map(function (m) {
	    console.log('Back in the main thread. m is', m);
	    mMfactors.ret(m.data[0]);
	    mMfactors23.ret(m.data[1]);
	    window['primesMonad'] = new MonadState('primesMonad', m.data[2]);
	  });

	  var factorsP$ = sources.DOM.select('input#factors_5').events('keyup');

	  var fA$ = factorsP$.map(function (e) {
	    mMfactors7.ret('');
	    var factors = [];
	    if (e.keyCode === 13) {
	      var ar = e.target.value.split(',').map(function (v) {
	        return parseInt(v, 10);
	      });
	      console.log('In fA$ ar is', ar);
	      if (ar[0] !== ar[0] || ar[1] !== ar[1] || typeof ar[0] !== 'number' || typeof ar[1] !== 'number') {
	        mMfactors7.ret('It works only if you enter two integers separated by a comma.');
	        return;
	      } else {
	        //workerD.postMessage([primesMonad.s, ar, mMfactors6.x]);
	        workerD.postMessage([primesMonad.s, ar, decompMonad.s, 'Happy, happy']);
	      }
	    }
	  });

	  var workerD$ = sources.WWD.map(function (m) {
	    console.log('Back in the main thread. m is', m);
	    mMfactors6.ret(m.data[0][3]);
	    window['primesMonad'] = new MonadState('primesMonad', m.data[0], primes_state);
	    mMfactors8.ret(m.data[1]);
	  });

	  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  End Easy

	  var factorsPress_b$ = sources.DOM.select('input#factors_1b').events('keydown');

	  var factorsAction_b$ = factorsPress_b$.map(function (e) {
	    console.log('Cordial greetings from factorsAction$_b$. e is', e);
	    var factors = [];
	    mMfactors3_b.ret('');
	    if (e.keyCode === 13) {
	      var num = e.target.value;
	      if (!num.match(/^[0-9]+$/)) {
	        mMfactors3_b.ret('This works only if you enter a number. ' + num + ' is not a number');
	      } else {
	        var n = parseInt(num, 10);
	        workerE.postMessage([primesMonad.s, n, decompMonad.s]);
	      }
	    }
	  });

	  var workerE$ = sources.WWE.map(function (m) {
	    // console.log('Back in the main thread. m is', m );
	    mMfactors_b.ret(m.data[0]);
	    window['primesMonad'] = new MonadState('primesMonad', m.data[1]);
	    window['decompMonad'] = new MonadState('decompMonad', m.data[2]);
	  });

	  var factorsP_b$ = sources.DOM.select('input#factors_5b').events('keyup');

	  var fA_b$ = factorsP_b$.map(function (e) {
	    mMfactors7.ret('');
	    var factors = [];
	    if (e.keyCode === 13) {
	      var ar = e.target.value.split(',').map(function (v) {
	        return parseInt(v, 10);
	      });
	      console.log('In fA$ ar is', ar);
	      if (ar[0] !== ar[0] || ar[1] !== ar[1] || typeof ar[0] !== 'number' || typeof ar[1] !== 'number') {
	        mMfactors7.ret('It works only if you enter two integers separated by a comma.');
	        return;
	      } else {
	        workerF.postMessage([primesMonad.s, ar, decompMonad.s]);
	      }
	    }
	  });

	  var workerF$ = sources.WWF.map(function (m) {
	    console.log('Back in the main thread. m is', m);
	    mMfactors6_b.ret(m.data[2][3]);
	    window['primesMonad'] = new MonadState('primesMonad', m.data[0], primes_state);
	    window['decompMonad'] = new MonadState('decompMonad', m.data[2], primes_state);
	    mMfactors8_b.ret(m.data[1]);
	  });

	  var factorsP_c$ = sources.DOM.select('input#factors800').events('keyup');

	  var fA_c$ = factorsP_c$.map(function (e) {
	    console.log('In fa_c$ *************************************************************'), mMfactors800.ret('');
	    var factors = [];
	    var ar = e.target.value.split(',').map(function (v) {
	      return parseInt(v, 10);
	    });
	    if (e.keyCode === 13) {
	      console.log('In fA_c$ ar is', ar);
	      if (ar[0] !== ar[0] || ar[1] !== ar[1] || typeof ar[0] !== 'number' || typeof ar[1] !== 'number') {
	        mMfactors7.ret('It works only if you enter two integers separated by a comma.');
	        return;
	      } else {
	        console.log('In fA_c$ else block. ar is', ar);
	        mMfactors800.ret(simpleWay(ar[0], ar[1]));
	      }
	    }
	  });

	  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ENDOM prime factors END
	  // ?<>>><>><><><><>>>><><><  traversal  ><><><><><><>>><><><><><><><><><><><>< START traversal
	  document.onload = function (event) {
	    console.log('onload event: ', event);
	    mMitterfib5.release(200);
	  };

	  // document.getElementById('login').focus();
	  // <>>><>><><><><>>>><><><  traversal  ><><><><><><>>><><><><><><><><><><><>< ENDOM traversal
	  // <>>><>><><><><>>>><><><  traversal  ><><><><><><>>><><><><><><><><><><><>< START Itterator


	  mMZ1.bnd(function (v) {
	    return mMt1.bnd(add, v).bnd(function (w) {
	      mMt1.ret(w).bnd(cube).bnd(function (x) {
	        return mMt3.ret(w + ' cubed is ' + x);
	      });
	    });
	  });

	  mMZ2.bnd(function (v) {
	    return cube(v).bnd(function (w) {
	      return mMt3.ret(v + ' cubed is ' + w);
	    });
	  });

	  var testZ = sources.DOM.select('#testZ').events('click');

	  var testZAction$ = testZ.map(function () {
	    mMZ1.release(1);
	  });

	  var testQ = sources.DOM.select('#testQ').events('click');

	  var testQAction$ = testQ.map(function () {
	    mMt1.ret(0).bnd(function (v) {
	      return mMZ2.release(v);
	    });
	  });

	  var testW = sources.DOM.select('#testW').events('keypress');

	  var testWAction$ = testW.map(function (e) {
	    if (e.keyCode === 13) {
	      mMZ2.release(e.target.value);
	    }
	  });

	  var solve = function solve() {
	    mMZ3.bnd(function (a) {
	      mMquad4.ret('');
	      mMquad6.ret('');
	      mMquad5.ret(a + " * x * x ");
	      mMZ3.bnd(function (b) {
	        mMquad6.ret(b + ' * x ');
	        mMZ3.bnd(function (c) {
	          mMtemp.ret([a, b, c]).bnd(fmap, qS4, 'mMtemp2').bnd(function (result) {
	            var x = result[0];
	            var y = result[1];
	            if (x === 0) {
	              mMquad5.ret('No solution', mMtemp);
	              mMquad6.ret(' ');
	              solve();
	              return;
	            }
	            if (y === 0) {
	              mMquad5.ret('No solution');
	              mMquad6.ret(' ');
	              solve();
	              return;
	            };
	            mMquad4.ret("Solutiions for " + a + ", " + b + " and " + c + " are " + x + " and  " + y);
	            mMquad5.ret((0, _dom.p)(a).text + " * " + x + " * " + x + " + " + (0, _dom.p)(b).text + " * " + x + " " + (0, _dom.p)(c).text + " = 0");
	            mMquad6.ret((0, _dom.p)(a).text + " * " + y + " * " + y + " + " + (0, _dom.p)(b).text + " * " + y + " " + (0, _dom.p)(c).text + " = 0");
	            solve(); // Continuing the endless loop.
	          });
	        });
	      });
	    });
	  };
	  solve();

	  var quad$ = sources.DOM.select('#quad').events('keypress');

	  var quadAction$ = quad$.map(function (e) {
	    if (e.keyCode === 13) {
	      mMZ3.release(e.target.value);
	      document.getElementById('quad').value = null;
	    }
	  });

	  // *******************************************************************BEGIN TODO LIST

	  var task2 = function task2(str) {
	    socket.send('TD#$42,' + get(pMgroup) + ',' + get(pMname) + ',@' + str);
	  };

	  function comment2(str) {
	    socket.send('TD#$42,' + get(pMgroup) + ',' + get(pMname) + ',@' + str);
	  };

	  var newTask$ = sources.DOM.select('input.newTask').events('keydown');

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
	        task = ar2.reduce(function (a, b) {
	          return a + '$*$*$' + b;
	        });
	      }
	      if (get(mMar2).filter(function (v) {
	        return v.task === task;
	      }).length > 0) {
	        mMalert.ret(task + " is already listed.");
	      } else if (ar.length > 2) {
	        mMcurrentList.bnd(addString, task + ',yellow, none, false,' + ar[0] + ',' + ar[1], mMcurrentList);
	        task2(get(mMcurrentList));
	        e.target.value = '';
	        mMalert.ret('');
	      }
	    }
	  });

	  function testTask(v2, v3, data) {
	    if (v3 === 'no file' || v3 === 'empty') {
	      mMtaskList.ret([]);
	      taskL = (0, _dom.h)('span');
	      return;
	    }
	    if (get(pMgroup) != 'solo' || get(pMgroup) === 'solo' && get(pMname) === v2) {
	      process(data);
	    }
	  };

	  var process = function process(str) {
	    var a = str.split(",");
	    if (a === undefined) {
	      return;
	    };

	    if (a.length < 9) {
	      return;
	    };

	    var ar = a.slice(3);
	    var s = ar.reduce(function (a, b) {
	      return a + ',' + b;
	    });
	    var tempArray = [];
	    mMcurrentList.ret(s);
	    process3(ar);
	  };

	  var process3 = function process3(a) {
	    var ar5 = [];
	    if (a.length % 6 === 0) {
	      var keys = rang(0, a.length / 6);
	      keys.map(function (_) {
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

	  var process4 = function process4(a) {
	    var tempArray = [];
	    var keys = Object.keys(a);
	    for (var k in keys) {
	      tempArray.push((0, _dom.h)('div.todo', [(0, _dom.h)('span.task3', { style: { color: a[k].color, textDecoration: a[k].textDecoration } }, 'Task: ' + a[k].task), (0, _dom.h)('br'), (0, _dom.h)('button#edit1', 'Edit'), (0, _dom.h)('input#edit2', { props: { type: 'textarea', value: a[k].task }, style: { display: 'none' } }), (0, _dom.h)('span#author.tao', 'Author: ' + a[k].author + ' / ' + 'Responsibility: ' + a[k].responsible), (0, _dom.h)('br'), (0, _dom.h)('input#cb', { props: { type: 'checkbox', checked: a[k].checked }, style: { color: a[k].color,
	          textDecoration: a[k].textDecoration } }), (0, _dom.h)('label.cbox', { props: { for: '#cb' } }, 'Completed'), (0, _dom.h)('button.delete', 'Delete'), (0, _dom.h)('br'), (0, _dom.h)('hr')]));
	    }

	    mMtaskList.ret(tempArray);
	    taskL = tempArray;
	  };

	  var colorClick$ = sources.DOM.select('#cb').events('click');

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
	    } else {
	      ar[n] = 'true';
	      ar[k] = 'lightGreen';
	      ar[j] = 'line-through';
	    }
	    task2(ar.reduce(function (a, b) {
	      return a + ',' + b;
	    }));
	  });

	  var edit1$ = sources.DOM.select('#edit1').events('click');

	  var edit1Action$ = edit1$.map(function (e) {
	    var index = getIndex2(e);
	    get(mMtaskList)[index].children[3].elm.style.display = 'block';
	  });

	  var edit2$ = sources.DOM.select('#edit2').events('keypress');

	  var edit2Action$ = edit2$.map(function (e) {
	    var v = noComma(e.target.value);
	    var index = getIndex2(e);
	    if (e.keyCode === 13) {
	      process2(v, index);
	      mMtaskList.x[index].children[3].elm.style.display = 'none';
	      updateScoreboard2(namesList);
	    }
	  });

	  var process2 = function process2(str, index) {
	    var ar = str.split(',');
	    var task;
	    if (ar.length === 1) {
	      task = ar;
	    }
	    if (ar.length > 1) {
	      task = ar.reduce(function (a, b) {
	        return a + '$*$*$' + b;
	      });
	    }
	    console.log('In process2. str, ar and task are', str, ar, task);
	    var a = mMcurrentList.x.split(',');
	    a[6 * index] = task;
	    var b = a.reduce(function (a, b) {
	      return a + ',' + b;
	    });
	    console.log('Still in process2. task, a and b are', task, a, b);
	    task2(b);
	  };

	  var deleteClick$ = sources.DOM.select('.delete').events('click');

	  var deleteAction$ = deleteClick$.map(function (e) {
	    var index = parseInt(getIndex(e), 10);
	    var s = get(mMcurrentList);
	    var ar = s.split(',');
	    if (ar.length < 7) {
	      task2('empty');
	      socket.send('TX#$42,' + get(pMgroup) + ',' + get(pMname));
	      return;
	    }
	    var str = '';
	    ar.splice(index * 6, 6);
	    task2(ar.reduce(function (a, b) {
	      return a + ',' + b;
	    }));
	  });

	  // **********************************************************************END TODO LIST
	  var chatClick$ = sources.DOM.select('#chat2').events('click');

	  var chatClickAction$ = chatClick$.map(function () {
	    var el = document.getElementById('chatDiv');
	    el.style.display === 'none' ? el.style.display = 'inline' : el.style.display = 'none';
	  });

	  var captionClick$ = sources.DOM.select('#caption').events('click');
	  var captionClickAction$ = captionClick$.map(function () {
	    var el = document.getElementById('captionDiv');
	    el.style.display === 'none' ? el.style.display = 'inline' : el.style.display = 'none';
	  });

	  var todoClick$ = sources.DOM.select('#todoButton').events('click');

	  var todoClickAction$ = todoClick$.map(function (e) {
	    var el = document.getElementById('todoDiv');
	    el.style.display === 'none' ? el.style.display = 'inline' : el.style.display = 'none';
	  });

	  var gameClick$ = sources.DOM.select('#game').events('click');

	  var gameClickAction$ = gameClick$.map(function () {
	    var el = document.getElementById('gameDiv');
	    el.style.display === 'none' ? el.style.display = 'inline' : el.style.display = 'none';

	    // updateScoreboard2(namesList)
	    var el2 = document.getElementById('gameDiv2');
	    el2.style.display === 'none' ? el2.style.display = 'inline' : el2.style.display = 'none';
	  });

	  var todoClick$ = sources.DOM.select('#todoButton').events('click');

	  var todoClickAction$ = todoClick$.map(function (e) {
	    get(mMtodoDiv) === 'none' ? mMtodoDiv.ret('block') : mMtodoDiv.ret('none');
	  });

	  var chatClick$ = sources.DOM.select('#chat2').events('click');

	  var chatClickAction$ = chatClick$.map(function () {
	    get(mMchatDiv) === 'none' ? mMchatDiv.ret('block') : mMchatDiv.ret('none');
	  });

	  var captionClick$ = sources.DOM.select('#caption').events('click');

	  var captionClickAction$ = captionClick$.map(function () {
	    get(mMcaptionDiv) === 'none' ? mMcaptionDiv.ret('block') : mMcaptionDiv.ret('none');
	  });

	  var gameClick$ = sources.DOM.select('#game').events('click');

	  var gameClickAction$ = gameClick$.map(function () {
	    get(mMgameDiv) === 'none' ? mMgameDiv.ret('block') : mMgameDiv.ret('none');
	  });

	  var clearPicked$ = sources.DOM.select('#clear').events('click');

	  var clearAction$ = clearPicked$.map(function () {
	    gameMonad.clearPicked();
	  });

	  var elemB$ = sources.DOM.select('input#message2').events('keyup').map(function (e) {
	    mM10.ret(e.target.value);
	    worker.postMessage([mM9.x, e.target.value]);
	  });

	  mMrightPanel.ret('none');

	  var pr$ = sources.DOM.select('#primeNumbers').events('keypress');

	  var prAction$ = pr$.map(function (e) {
	    if (e.keyCode === 13) {
	      worker.postMessage(["CE#$42", primesMonad.s, e.target.value]);
	    }
	  });

	  function tNode(author, responsible, task, ch, dec, col) {
	    var todo = (0, _dom.h)('div', [(0, _dom.h)('div', { style: { color: col, textDecoration: dec, checked: ch } }, task), (0, _dom.h)('p', 'Author: ' + author + ', Responsible Person: ' + responsible)]);
	    return todo;
	  };

	  function MonadState3(g, state) {
	    var _this = this;

	    this.id = g;
	    this.s = state;
	    this.c = new MonadEmitter();
	    this.d = "task";
	    this.bnd = function (func) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      return func.apply(undefined, [_this.s].concat(args));
	    };
	    this.ret = function (a) {
	      return window[this.id] = new MonadState(this.id, a);
	    };
	    this.c.on(a, function (b) {
	      _this.s.push(b);
	      todoNode = _this.s.map(function (v) {
	        return tNode(v);
	      });
	      console.log('In MonadState3 - - - this.s and todoNode are', _this.s, todoNode);
	      // window[this.id] = new MonadState3(this.id, list)
	    });
	  };

	  var todoMonad = new MonadState3('todoMonad', [['dummy task', 'yellow', 'none', false, 'default author', 'default responsible']]);

	  var calcStream$ = xs.merge(comClickAction$, messagePressAction$, fA_c$, forwardAction$, backAction$, prAction$, factorsAction_b$, fA$, factorsP$, fA_b$, factorsP_b$, clearprimes$, worker$, workerB$, workerC$, workerD$, workerE$, workerF$, clearAction$, factorsAction$, primeFib$, fibPressAction$, quadAction$, edit1Action$, edit2Action$, testWAction$, testZAction$, testQAction$, colorAction$, deleteAction$, newTaskAction$, chatClickAction$, gameClickAction$, todoClickAction$, captionClickAction$, groupPressAction$, rollClickAction$, loginPressAction$, messages$, numClickAction$, opClickAction$);
	  return {
	    DOM: calcStream$.map(function () {
	      return (0, _dom.h)('div.main', [(0, _dom.h)('div.preContent', [(0, _dom.h)('br'), (0, _dom.h)('br'), (0, _dom.h)('div', 'FUNCTIONAL REACTIVE PROGRAMMING'), (0, _dom.h)('div', 'WITH CUSTOM MONADS AND CYCLE.JS')]), (0, _dom.h)('br'), (0, _dom.h)('div.image_3', [(0, _dom.h)('img.image_2', { props: { src: "logo.svg" } }), (0, _dom.h)('span', ' '), (0, _dom.h)('a', { props: { href: "https://cycle.js.org/", target: "_blank" } }, 'A Cycle.js application')]), (0, _dom.h)('div.content', [(0, _dom.h)('p', ' Front-end web developers might be interested in seeing how I encapsule procedures and state in objects whose methods conform to a JavaScript version of the Haskell monad laws. It is fascinating to see how reactivity is achieved in Cycle.js. The Haskell server might also be of interest. '), (0, _dom.h)('p', 'People who are developing a feel for function reactive programming can cut through to its essence by seeing it implemented in various contexts. The combination of Lodash, Immutable.js, and RxJS running in Node.js is one possibility. Here we demonstrate how a front-end developer can create monads to suit their purposes, and obtain amazing reactivity by implementing them in a Cycle.js framework. '), (0, _dom.h)('span.tao1b', 'You can comment at '), (0, _dom.h)('a', { props: { href: 'https://redd.it/60c2xx' } }, 'Reddit'), (0, _dom.h)('span.tao1b', ' or in the '), (0, _dom.h)('a', { props: { href: '#comment' } }, 'comments'), (0, _dom.h)('br'), (0, _dom.h)('p', ' Snabbdom, Xstream, EventEmitter, and most of the monads and functions presented here are available in browser developer tools consoles and scratch pads. A production site would load these as modules, but this site is for experimention and learning. '), (0, _dom.h)('span#italic', ' These monads are like the Haskell monads in that they resemble the monads of category theory without actually being mathematical monads. See '), (0, _dom.h)('a', { props: { href: "http://math.andrej.com/2016/08/06/hask-is-not-a-category/", target: "_blank" } }, 'Hask is not a category.'), (0, _dom.h)('span', ' by Andrej Bauer and the '), (0, _dom.h)('a', { props: { href: '#discussion' } }, 'Discussion'), (0, _dom.h)('span', ' below. They provide a convenient interface for dealing with uncertainty and side effects in a purely functional manner. Adherence to the monad laws (see below) helps make the monads robust, versatile, and reliable tools for isolating and chaining sequences of javascript functions. State is modified in monads without mutating anything outside of them.'), (0, _dom.h)('p', ' The demonstrations include persistent, shared todo lists, text messaging, and a simulated dice game with a traversable history (all group members see your score decrease or increase as you navegate backwards and forwards). Monads are shown performing lengthy mathematical computations asycronously in web workers. Monads encapsulate state. The error checking monad carries occurances of NaN and runtime errors through sequences of computations much like the Haskell Maybe monad. '), (0, _dom.h)('span.tao', 'This project was created by, and is actively maintained by David Schalk. The code repository is at '), (0, _dom.h)('a', { props: { href: "https://github.com/dschalk/JS-monads-stable", target: "_blank" } }, 'https://github.com/dschalk/JS-monads-stable. '), (0, _dom.h)('span', 'The master branch is a Motorcycle.js application using the Most.js library. That branch has been abandoned. This is a Cycle.js application using Xstream instead of Most. The primary branch is named "xstream". '), (0, _dom.h)('br'), (0, _dom.h)('br'), (0, _dom.h)('span.tao', ' The game code is fairly concise and intuitive. A quick walk-through is presented '), (0, _dom.h)('a', { props: { href: '#gameExplanation' } }, 'here'), (0, _dom.h)('span', '. To see monadic functionality at work, I suggest that you take a look at the section captioned '), (0, _dom.h)('a', { props: { href: '#asyncExplanation' } }, 'Asynchronous Processes'), (0, _dom.h)('br'), (0, _dom.h)('p', ' But it might be best to first proceed down the page and see the examples of Monad instances manipulating data. If you are trying to wrap you head around the concept of pure, chainable functions, such as the functions in the Underscore and Jquery libraries, understanding Monad instances might finally put you in the comfort zone you seek. '), (0, _dom.h)('br'), (0, _dom.h)('h3', 'The Game'), (0, _dom.h)('p', 'People who are in the same group, other than the default group named "solo", share the same todo list, chat messages, and simulated dice game. In order to see any of these, you must establish a unique identity on the server by logging in. The websockets connection terminates if the first message the server receives does not come from the sign in form. You can enter any random numbers, letters, or special characters you like. The server checks only to make sure someone hasn\'t already signed in with the sequence you have selected. If you log in with a name that is already in use, a message will appear and this page will be re-loaded in the browser after a four-second pause. '), (0, _dom.h)('p', ' Data for the traversable game history accumulates until a player scores three goals and wins. The data array is then erased and the application is ready to start accumulating a new history. '), (0, _dom.h)('div#log1', { style: { display: mMlog1.x } }, [(0, _dom.h)('p', 'IN ORDER TO SEE THE GAME, TODOLIST, AND CHAT DEMONSTRATIONS, YOU MUST ENTER SOMETHING TO ESTABLISH A WEBSOCKET CONNECTION.'), (0, _dom.h)('span', 'Name: '), (0, _dom.h)('input.login')]), (0, _dom.h)('p', mM6.x)]), (0, _dom.h)('hr.len90', { style: { display: mMgameDiv2.x } }), (0, _dom.h)('br.len90', { style: { display: mMgameDiv2.x } }), (0, _dom.h)('div.heading', { style: { display: mMgameDiv2.x } }, 'Game, Todo List, Text Messages'), (0, _dom.h)('div#gameDiv2', { style: { display: mMgameDiv2.x } }, [(0, _dom.h)('br'), (0, _dom.h)('div#leftPanel', { style: { display: mMgameDiv2.x } }, [(0, _dom.h)('p', 'RULES: If clicking two numbers and an operator (in any order) results in 20 or 18, the score increases by 1 or 3, respectively. If the score becomes 0 or is evenly divisible by 5, 5 points are added. A score of 25 results in one goal. That can only be achieved by arriving at a score of 20, which jumps the score to 25. Directly computing 25 results in a score of 30, and no goal. Each time RL is clicked, one point is deducted. Three goals wins the game. '), (0, _dom.h)('br'), buttonNode, (0, _dom.h)('br'), (0, _dom.h)('button#4.op', 'add'), (0, _dom.h)('button#5.op', 'subtract'), (0, _dom.h)('button#6.op', 'mult'), (0, _dom.h)('button#7.op', 'div'), (0, _dom.h)('button#8.op', 'concat'), (0, _dom.h)('br'), (0, _dom.h)('br'), (0, _dom.h)('div#dice', { style: { display: mMdice.x } }, [(0, _dom.h)('button#roll.tao1', 'ROLL'), (0, _dom.h)('button#back.tao100', 'BACK'), (0, _dom.h)('button#ahead.tao1', 'FORWARD'), (0, _dom.h)('div.tao', 'Selected numbers: ' + gameMonad.fetch3().join(', ') + ' '), (0, _dom.h)('div.tao', 'Operator: ' + gameMonad.fetch2() + ' '), (0, _dom.h)('div.tao', 'Index: ' + gameMonad.s[1]), (0, _dom.h)('button#clear', 'Clear selected numbers'), (0, _dom.h)('div#log2', { style: { display: mMlog2.x } }, [(0, _dom.h)('span', 'Change group: '), (0, _dom.h)('input#group')]), (0, _dom.h)('p', mMsoloAlert.x)])]), (0, _dom.h)('div#rightPanel', { style: { display: mMrightPanel.x } }, [(0, _dom.h)('br'), (0, _dom.h)('br'), (0, _dom.h)('br'), (0, _dom.h)('br'), (0, _dom.h)('br'), (0, _dom.h)('br'), (0, _dom.h)('button#todoButton', { style: { fontSize: '16px', display: 'inline' } }, 'TOGGLE TODO_LIST'), (0, _dom.h)('br'), (0, _dom.h)('br'), (0, _dom.h)('button#chat2', { style: { fontSize: '16px', display: 'inline' } }, 'TOGGLE CHAT'), (0, _dom.h)('br'), (0, _dom.h)('br'), (0, _dom.h)('br'), (0, _dom.h)('br'),
	      //    h('div.game', 'Name: ' + pMname.x ),
	      //    h('div.game', 'Group: ' + pMgroup.x ),
	      (0, _dom.h)('pre.game', 'Currently online:\n(Name score | goals) '), (0, _dom.h)('div.game', { props: { color: "gold" } }, '' + pMdata.x), (0, _dom.h)('br'), (0, _dom.h)('br'), (0, _dom.h)('div#a100', ' _________________________________________________ '), (0, _dom.h)('br'), (0, _dom.h)('div#todoDiv', { style: { display: mMtodoDiv.x } }, [(0, _dom.h)('div#taskList', taskL), (0, _dom.h)('div', 'Enter author, responsible rerson, and task here: '), (0, _dom.h)('br'), (0, _dom.h)('input.newTask')]), (0, _dom.h)('br'), (0, _dom.h)('span#alert', mMalert.x), (0, _dom.h)('br'), (0, _dom.h)('span#alert2'), (0, _dom.h)('br'), (0, _dom.h)('div#chatDiv', { style: { display: mMchatDiv.x } }, [(0, _dom.h)('div#messages', [(0, _dom.h)('span', 'Message: '), (0, _dom.h)('input.inputMessage'), (0, _dom.h)('div', messages), (0, _dom.h)('br')])])])]),
	      // h('div#a100', ' ____________________________________________________________________________________________________________ ' ),
	      (0, _dom.h)('div.content', [

	      // **************************************************************************** START MONAD
	      _code2.default.monad, _code2.default.variations,
	      // **************************************************************************** END MONAD
	      _code2.default.cycle, (0, _dom.h)('p#asyncExplanation', ' '), (0, _dom.h)('p', ' '), (0, _dom.h)('p', ' '), (0, _dom.h)('p', ' '), (0, _dom.h)('p', ' '), (0, _dom.h)('p', ' '), (0, _dom.h)('p', ' '), (0, _dom.h)('p', ' '), (0, _dom.h)('p', ' '), (0, _dom.h)('p', ' '), (0, _dom.h)('p', ' '),
	      // ************************************************** OOOOOOOOOOOOOO ********    BEGIN ASYNC

	      (0, _dom.h)('a', { props: { href: '#top' } }, 'Back To The Top'), (0, _dom.h)('h2', ' Asynchronous Processes '), _code2.default.async1, (0, _dom.h)('br'), (0, _dom.h)('span', '' + mMfibBlurb.x), (0, _dom.h)('span', [(0, _dom.h)('svg', { attrs: { width: 50, height: 50 } }, [(0, _dom.h)('circle', { attrs: { cx: 25, cy: 25, r: 20, stroke: 'purple', 'stroke-width': 4, fill: fill1Monad.x } })])]), (0, _dom.h)('span', '' + mMprimeBlurb.x), (0, _dom.h)('span', [(0, _dom.h)('svg', { attrs: { width: 50, height: 50 } }, [(0, _dom.h)('circle', { attrs: { cx: 25, cy: 25, r: 20, stroke: 'purple', 'stroke-width': 4, fill: fill2Monad.x } })])]), (0, _dom.h)('span', '' + mMprimeFibBlurb.x), (0, _dom.h)('span', [(0, _dom.h)('svg', { attrs: { width: 50, height: 50 } }, [(0, _dom.h)('circle', { attrs: { cx: 25, cy: 25, r: 20, stroke: 'purple', 'stroke-width': 4, fill: fill3Monad.x } })])]), (0, _dom.h)('br'), (0, _dom.h)('p.red', 'The elapsed time is ' + mMelapsed.x + ' milliseconds.'), (0, _dom.h)('input#fib92'), (0, _dom.h)('br'), (0, _dom.h)('span#PF_7.red6', 'Fibonacci Numbers'), (0, _dom.h)('br'), (0, _dom.h)('span#PF_9.turk', mMres.x[0]), (0, _dom.h)('br'), (0, _dom.h)('span#PF_8.red6', 'Prime Fibonacci Numbers'), (0, _dom.h)('br'), (0, _dom.h)('span#primeFibs.turk', mMres.x[2]), (0, _dom.h)('br'), (0, _dom.h)('span#PF_21.red6', 'The largest generated prime number.'), (0, _dom.h)('br'), (0, _dom.h)('span#PF_22.turk', mMres.x[1]), (0, _dom.h)('bpr'), (0, _dom.h)('p', ' The second demonstration in this series decomposes numbers into its their prime factors. Testing with sequences of 9\'s, the first substantial lag occurs at 9,999,999 - unless a large array of prime numbers has already been generated in the previous demonstration or elsewhere. Here it is:'), (0, _dom.h)('input#factors_1'), (0, _dom.h)('br'), (0, _dom.h)('br'), (0, _dom.h)('span', mMfactors.x), (0, _dom.h)('span.tao3', mMfactors23.x), (0, _dom.h)('p', ' Next, two comma-separated numbers are decomposed into arrays of their prime factors, and those arrays are used to compute their lowest common multiple (lcm). For example, the lcm of 6 and 9 is 18 because 3*6 and 2*9 are both 18. The lcm of the denominators of two fractions is useful in fraction arithmetic; specifically, addition and subtraction. On my desktop computer, two seven digit numbers resulted in a lag of a few seconds when prime numbers had not been previously generated. '), (0, _dom.h)('input#factors_5'), (0, _dom.h)('br'), (0, _dom.h)('br'), (0, _dom.h)('div.tao3', mMfactors7.x), (0, _dom.h)('span', 'The least common multiple of  ' + mMfactors8.x[0] + ' and ' + mMfactors8.x[1] + ' is '), (0, _dom.h)('span.tao3', '' + mMfactors8.x[2]), (0, _dom.h)('br'), (0, _dom.h)('span', 'The largest common factor of ' + mMfactors8.x[0] + ' and ' + mMfactors8.x[1] + ' is '), (0, _dom.h)('span.tao3', '' + mMfactors8.x[3]), (0, _dom.h)('br'), (0, _dom.h)('div', 'TEST: ' + mMfactors8.x[0] + ' * ' + mMfactors8.x[1] + ' === ' + mMfactors8.x[2] + ' * ' + mMfactors8.x[3] + ' '), (0, _dom.h)('span', 'RESULT: '), (0, _dom.h)('span.tao3', '' + (mMfactors8.x[0] * mMfactors8.x[1] === mMfactors8.x[2] * mMfactors8.x[3])), _code2.default.hardWay, (0, _dom.h)('label', ' Enter a number here: '), (0, _dom.h)('input#factors_1b'), (0, _dom.h)('br'), (0, _dom.h)('br'), (0, _dom.h)('div.tao3', mMfactors_b.x), _code2.default.hardWay2, (0, _dom.h)('div.tao3', mMfactors7_b.x), (0, _dom.h)('span', 'The least common multiple of  ' + mMfactors8_b.x[0] + ' and ' + mMfactors8_b.x[1] + ' is '), (0, _dom.h)('span.tao3', '' + mMfactors8_b.x[2]), (0, _dom.h)('br'), (0, _dom.h)('span', 'The largest common factor of ' + mMfactors8_b.x[0] + ' and ' + mMfactors8_b.x[1] + ' is '), (0, _dom.h)('span.tao3', '' + mMfactors8_b.x[3]), (0, _dom.h)('br'), (0, _dom.h)('div', 'TEST: ' + mMfactors8_b.x[0] + ' * ' + mMfactors8_b.x[1] + ' === ' + mMfactors8_b.x[2] + ' * ' + mMfactors8_b.x[3] + ' '), (0, _dom.h)('span', 'RESULT: '), (0, _dom.h)('span.tao3', '' + (mMfactors8_b.x[0] * mMfactors8_b.x[1] === mMfactors8_b.x[2] * mMfactors8_b.x[3])), (0, _dom.h)('h3', ' The Easy Way '), (0, _dom.h)('p', ' This has been a demonstration of MonadState and MonadState transformers. If you really want the least common multiple or the largest common factor of two positive integers, there is no need to generate prime numbers. The next and final demonstration in this section does not use a web worker. The computations block the main thread, but only for a few microseconds.'), (0, _dom.h)('br'), (0, _dom.h)('input#factors800'), (0, _dom.h)('br'), (0, _dom.h)('span', 'The least common multiple of  ' + mMfactors800.x[0] + ' and ' + mMfactors800.x[1] + ' is '), (0, _dom.h)('span.tao3', '' + mMfactors800.x[2]), (0, _dom.h)('br'), (0, _dom.h)('span', 'The largest common factor of ' + mMfactors800.x[0] + ' and ' + mMfactors800.x[1] + ' is '), (0, _dom.h)('span.tao3', '' + mMfactors800.x[3]), (0, _dom.h)('br'), (0, _dom.h)('div', 'TEST: ' + mMfactors800.x[0] + ' * ' + mMfactors800.x[1] + ' === ' + mMfactors800.x[2] + ' * ' + mMfactors800.x[3] + ' '), (0, _dom.h)('span', 'RESULT: '), (0, _dom.h)('span.tao3', '' + (mMfactors800.x[0] * mMfactors800.x[1] === mMfactors800.x[2] * mMfactors800.x[3])), (0, _dom.h)('p', ' The code for the previous demonstrations is available at the Github repository, and will soon be available here in an appendex. primesMonad and the functions primarily involved in its transformation are shown below: '), _code2.default.primes, (0, _dom.h)('p', ' primesMonad state updates are generated in workerB.js and stored in the main thread. Users set new upper bounds on the size of the largest Fibonacci number in the series to be considered by entering a number in a browser input box. Here is the rele2ant code: '), _code2.default.primes3, (0, _dom.h)('p', ' The user\'s selected number along with the current state of primesMonad (primesMonad.s) gets posted to workerB, which gets functionality beyond its prototype from workerB.js, which orchestrates preparation of the return message that will be posted back to the main thread. workerB.js delegates the job to functions in script2.js by calling: '), _code2.default.primes4, (0, _dom.h)('p', ' execF prepares the Fibonacci series and sends its state, along with the state of primesMonad that it received from workerB.js, to fpTransformer. execP is called with the current state and the largest Fibonacci number that had been recently produced by execF as arguments. The updated state is an array with four elements, [new upper bound, new series, largest prime produced in the current browser session, largest series]. If the new result is larger than any previous one, the first and second elements of the state array are identical to the third and fourth. Otherwise, they are smaller. As is apparent in the following code, primesMonad is re-created in the main thread using the state array that was posted by workerB. '), _code2.default.primes2, (0, _dom.h)('h2', ' MonadEr - An Error-Catching Monad '), (0, _dom.h)('p', ' Instances of MonadEr function much the same as instances of Monad, but when an instance of MonadEr encounters an error, it ceases to perform any further computations. Instead, it passes through every subsequent stage of a sequence of MonadEr expressions, reporting where it is and repeating the error message. It will continue to do this until it is re-instantiated or until its bnd() method runs on the function clean(). '), (0, _dom.h)('p', 'Functions used as arguments to the MonadEr bnd() method can be placed in quotation marks to prevent the browser engine from throwing reference errors. Arguments can be protected in the same manner. Using MonadEr can prevent the silent proliferation of NaN results in math computations, and can prevent browser crashes due to attempts to evaluate undefined variables. Sometimes crashes are desired when testing code, but MonadEr provides instant feedback pinpointing the exact location of the error. '), (0, _dom.h)('p', ' The following demonstration shows the Chrome console log entries that result from running '), (0, _dom.h)('pre', '    t.bnd(\'add3\', 3, \'$t2\').bnd(cube3, \'$t3\')\n    t.bnd(\'add3\',\'three\', \'$t2\').bnd(cube3, \'$t3\')\n    t.bnd(\'add3\',\'Math.sqrt(-1)\', \'$t2\').bnd(cube3, \'$t3\')\n    t.bnd(\'addd3\', 3, \'$t2\').bnd(cube3, \'$t3\' '), (0, _dom.h)('br'), (0, _dom.h)('img.image', { props: { src: "error2.png" } }), (0, _dom.h)('br'), (0, _dom.h)('p.tao1b', ' The monad laws hold for MonadEr instances. The following relationships were verified in the Chrome console: '), (0, _dom.h)('pre', '    ret3(0,\'t\',[])  // t is now an instance of MonadEr with t.x = 0 and t.e = [].\n\n    t.ret(3).bnd(cube3).x === cube(3).x\n    ret3(3).bnd(cube3).x === cube3(3).x\n\n    t.bnd(t.ret) === t\n    t.bnd(ret) === t\n\n    t.ret(0).bnd(add3, 3).bnd(cube3).x ===\n    t.ret(0).bnd(v => add3(v,3).bnd(cube3)).x  '), (0, _dom.h)('br'), (0, _dom.h)('br'), (0, _dom.h)('a', { props: { href: '#top' } }, 'Back To The Top'), (0, _dom.h)('h2', 'MonadItter'), _code2.default.monadIt, (0, _dom.h)('p', ' MonadItter instances don\'t link to one another. They exist to facilitate the work of instances of Monad, MonadState, etc. Here\'s how they work: '), (0, _dom.h)('p', 'For any instance of MonadItter, say "it", "it.bnd(func)" causes it.p === func. Calling the method "it.release(...args)" causes p(...args) to run, possibly with arguments supplied by the caller. '), (0, _dom.h)('p', ' As shown later on this page, MonadItter instances control the routing of incoming websockets messages. In one of the demonstrations below, they behave much like ES2015 iterators.'), (0, _dom.h)('h3', ' A Basic Itterator '), (0, _dom.h)('p', 'The following example illustrates the use of release() with an argument. It also shows a lambda expressions being provided as an argument for the method mMZ1.bnd() (thereby becoming the value of mMZ1.p), and then mMZ1.release providing an arguments for the function mMZ1.p. The code is shown beneith the following two buttons. '), (0, _dom.h)('button#testZ', 'mMZ1.release(1)'), (0, _dom.h)('p.code2', mMt3.x), (0, _dom.h)('span', 'Refresh button: '), (0, _dom.h)('button#testQ', 'mMt1.ret(0).bnd(v => mMZ2.release(v)) '), (0, _dom.h)('br'), _code2.default.testZ, (0, _dom.h)('span.tao', ' The expression mMt3.x sits permanently in the Motorcycle virtual DOM description. You can call '), (0, _dom.h)('span.green', 'mMZ2.release(v)'), (0, _dom.h)('span', ' by entering a value for v below: '), (0, _dom.h)('br'), (0, _dom.h)('span', 'Please enter an integer here: '), (0, _dom.h)('input#testW'), (0, _dom.h)('p', ' cube() is defined in the Monad section (above). If you click "mMZ1.release(1)" several times, the code (above) will run several times, each time with v === 1. The result, mMt3.x, is shown below the button. mMZ1.p (bnd()\'s argument) remains constant while mMZ1.release(1) is repeatedly called, incrementing the number being cubed each time. '), (0, _dom.h)('p', ' Here is another example. It demonstrates lambda expressions passing values to a remote location for use in a computation. If you enter three numbers consecutively below, call them a, b, and c, then the quadratic equation will be used to find solutions for a*x**2 + b*x + c = 0. The a, b, and c you select might not have a solution. If a and b are positive numbers, you are likely to see solutions if c is a negative number. For example, 12, 12, and -24 yields the solutions 1 and -2. '), (0, _dom.h)('p#quad4.red2', mMquad4.x), (0, _dom.h)('p#quad5.red2', mMquad5.x), (0, _dom.h)('p#quad6.red2', mMquad6.x), (0, _dom.h)('p', 'Run mMZ3.release(v) three times for three numbers. The numbers are a, b, and c in ax*x + b*x + c = 0: '), (0, _dom.h)('input#quad'), (0, _dom.h)('p', 'Here is the code:'), _code2.default.quad, (0, _dom.h)('p', ' fmap (above) facilitated using qS4 in a monadic sequence. qS4 returns an array, not an instance of Monad, but fmap lifts qS4 into the monadic sequence. '), (0, _dom.h)('p', ' The function solve() is recursive. It invokes itself after release() executes three times. The expression "solve()" resets solve to the top, where mMZ3.p becomes a function containing two nested occurrances of mMZ3.bnd. After mMZ3.release() executes, mMZ3.p becomes the function that is the argument to the next occurrance of mMZ3.bnd. That function contains yet another occurrance of mMZ3.bnd. MonadItter is syntactic sugar for nested callbacks. '),

	      // **************************************************************************
	      (0, _dom.h)('p#gameExplanation', ' '), (0, _dom.h)('p', ' '), (0, _dom.h)('p', ' '), (0, _dom.h)('p', ' '), (0, _dom.h)('p', ' '), (0, _dom.h)('a', { props: { href: '#top' } }, 'Back To The Top'),

	      //************************************************************************** START GAME

	      (0, _dom.h)('h2', 'The Simulated Dice Game'), (0, _dom.h)('p', ' The game is controlled by gameMonad, which is an instance of MonadState. The state of the game after each click on one of the displayed numbers is saved in an array of five-member arrays comprised of three numbers and two arrays. '), (0, _dom.h)('p', ' The array of state arrays is kept in gameMonad.s[0]. The elements of the five-member arrays correspond to score, goals, operator, selected numbers, and displayed numbers. '), (0, _dom.h)('p', ' gameMonad.s[0][ganeMonad.s[1]] is the state in gameMonad.s[0] that is displayd in the browser. As the previous sentence implies, the index number of the displayed state is the value of gameMonad.s[1]. History traversal is accomplished by changing gameMonad.s[1]. Here is how the application responds to clickes of the BACK and FORWARD buttons:'), _code2.default.backAction, (0, _dom.h)('p', ' gameMonad methods are responsible for everything that happens when the BACK or FORWARD buttons are clicked. These methods do not obtain information outside of the scope of gameMonad, and their side effects are confined to sending websockets messages and updating the DOM. gameMonad was designed to be secure against unpredictable behavior caused by code outside of its scope, and to also not interfere with code that is outside of its scope. gameMonad is an object whose methods conform to functional programming best practices. '), (0, _dom.h)('p', ' The traversal methods are additions to MonadState.prototype as defined in the monad.js file. monad.js is accessed only by functions working in the main thread. Web workers access an identical version of MonadState, only without the prototype additions. It is available to them in the script2.js file, which is never accessed by functions operating in the main thread. Here are the additions to MonadState.prototype: '), _code2.default.prototypeAdditions, (0, _dom.h)('h3', 'Scoring'), (0, _dom.h)('p', ' One goal is awarded each time a player lands on the number 25. The limit for the number of score changes in one turn is two. If the number of increases were not limited, landing on 5 would launch you into an series of increases through all the multiples of five terminating with a stack overflow error message. As a consequence of this rule, only one five-point jump is allowed per turn. '), (0, _dom.h)('p', ' Another way to increase a score, other than computing an number which equals 0 modulo 5, is to compute the number 20 for one additional point, or the number 18 for three additional points. A quick way to arrive at 20 is to start at -1, compute 18 twice, which takes you from -1 to 2 to 5 and jumps you to 10. Then click roll, which sets you back to 9, and compute 18 twice. That takes you from 9 to 12, to 15, jumping you to 20. You don\'t get another jump, so click ROLL and compute 20 or click ROLL three times and compute 18, taking your score from 19 or 17 to 20 and then on to 25 and back to 0, with an increase of one goal. If it is your third goal, you win the game. '), (0, _dom.h)('p', ' Now let\'s take a look at the code that responds to number and operator clicks: '), _code2.default.num_op, (0, _dom.h)('p', ' Three types of events cause a state array to be added to gameMonad.s[0]. Clicking a number removes the clicked number from the display, and the new state is preserved in gameMonad.s[0]. Clicking an operator when two numbers have been selected causes a computation to be made, adding a number to the display or, if the result of the computation is 18 or 20, causing a score increase and a new roll of the dice. Either way, the result is preserved in gameMonad.s[0]. Finally, clicking the ROLL button reduces the clicker\'s score by 1 and causes four new numbers to be displayed. The resulting state is spliced into the gameMonad.s[0] array. '), (0, _dom.h)('p', ' Requests for new rolls include the name and group of the player making the request. That information is used by the server to deduct one point and to limit broadcast of the new roll to only members of the requesting player\'s group. The request also incudes the requesting player\'s score and goals. These are returned by the server (with one point deducted) and are v[7] and v[8] in the messages$ stream. '), (0, _dom.h)('p', ' Game traversal is controlled by changing the value of mMindex.x. Here is the code that is called when the BACK button is clicked: '), _code2.default.backAction, (0, _dom.h)('p', ' numClickAction$ and opClickAction$ call updateCalc() when gameMonad.s[0][1]][3] contains two numbers and gameMonad.s[0][1][2] is no longer 0 (implying that an operator has been selected). updateCalc takes two arguments, the selected numbers and the selected operator. This is what happens when updateCalc receives that information: '), _code2.default.updateCalc, (0, _dom.h)('p', '  If parseInt(calc(ar[0], op, ar[1]), 10) is not 18 or 20, updateCalc sets the operator back to 0 and empties the picked numbers array. It also pushes the result of the calculation into the display array. '), (0, _dom.h)('p', ' If the calculation yields 18 or 20, score(result) is called. Here is the definition of score() '), _code2.default.score, (0, _dom.h)('p', ' If the score is computed to be 25, the result of increasing goals by 1 determines how state is modified. If the result is not 3, goals is incremented and newRoll() is called with arguments score and goals. If the result is 3, a winner is declared and gameMonad.s reverts to [[[0,0,0,[],[0,0,0,0]]], 0]. '), (0, _dom.h)('p', ' gameMonad does not use its bnd() method, but I stayed with the usual practice of preserving state in instances of MonadState. “A foolish consistency is the hobgoblin of little minds, adored by little statesmen and philosophers and divines." - Ralph Waldo Emerson. Very true, but keeping code easy to reason about is never foolish. '),

	      //************************************************************************** END GAME


	      //************************************************************************** END GameTraversal


	      (0, _dom.h)('h2', ' MonadSet '), (0, _dom.h)('p', ' The list of online group members at the bottom of the scoreboard is very responsive to change. When someone joins the group, changes to a different group, or closes a browser session, a message prefixed by NN#$42 goes out from the server providing group members with the updated list of group members. MonadSet acts upon messages prefixed by NN#$42. Here are the definitions of MonadSet and the MonadSet instance sMplayers '), _code2.default.MonadSet, (0, _dom.h)('h3', ' Websocket messages'), (0, _dom.h)('p#demo', ' Incoming websockets messages trigger updates to the game display, the chat display, and the todo list display. The members of a group see what other members are doing; and in the case of the todo list, they see the current list when they sign in to the group. When any member of a group adds a task, crosses it out as completed, edits its description, or removes it, the server updates the persistent file and all members of the group immediately see the revised list.  '), (0, _dom.h)('p', 'The code below shows how incoming websockets messages are routed. For example, mMZ10.release() is called when a new dice roll (prefixed by CA#$42) comes in.   '), _code2.default.messages, (0, _dom.h)('p', ' The "mMZ" prefix designates instances of MonadItter. An instance\'s bnd() method assigns its argument to its "p" attribute. "p" runs if and when its release() method is called. The next() function releases a specified MonadItter instance when the calling monad\'s value matches the specified value in the expression. In the messages$ stream, the MonadItter instance\'s bnd methods do not take argumants, but next is capable of sending arguments when bnd() is called on functions requiring them. Here is an example: '), (0, _dom.h)('a#tdList2', { props: { href: '#itterLink' } }, 'release() with arguments'), (0, _dom.h)('span#comment', ''), (0, _dom.h)('br'), (0, _dom.h)('br'), (0, _dom.h)('br'), (0, _dom.h)('h2', 'COMMENTS'), (0, _dom.h)('div#com2', { style: { display: mMcom2.x } }, [(0, _dom.h)('span', 'In order to write a comment, please log in here: '), (0, _dom.h)('input.login')]), (0, _dom.h)('br'), (0, _dom.h)('div#com2', { style: { display: mMcom3.x } }, [(0, _dom.h)('label#label', 'Click the Comment Box to Save Comment'), (0, _dom.h)('br'), (0, _dom.h)('textarea#comment'), (0, _dom.h)('div', mM26.x)]), (0, _dom.h)('br'), (0, _dom.h)('br'), (0, _dom.h)('a', { props: { href: '#top' } }, 'Back To The Top'), (0, _dom.h)('h2', 'Appendix - Under Construction '), (0, _dom.h)('h3', 'The functions that produce the examples'), (0, _dom.h)('p', ' Here are the definitions of MonadEr, its helper functions, and the function that serve as parameters to the bnd() method in the demonstration. '), _code2.default.monadEr, (0, _dom.h)('p', ' and here is the code that produced the Chrome console log entries: '), _code2.default.errorDemo, (0, _dom.h)('span.tao', ' When  a MonadEr instance encounters a function or an argument in quotation marks of types "undefined" or "NaN", a string gets pushed into the instance\'s e attribue. After that, the  bnd() method will not process any function other than clean(). It will stop at the'), (0, _dom.h)('span.turk', 'if (e.length > 0)'), (0, _dom.h)('span', 'block. clean() resets an instance to normal functioning mode by setting its e attribute back to []. '), (0, _dom.h)('br'), (0, _dom.h)('p'), (0, _dom.h)('p'), (0, _dom.h)('p', '.'), (0, _dom.h)('p', '.'), (0, _dom.h)('p', '.'), (0, _dom.h)('p', '.'), (0, _dom.h)('p', '.'), (0, _dom.h)('p'), (0, _dom.h)('p'), (0, _dom.h)('p'), (0, _dom.h)('p'), (0, _dom.h)('p')])]);
	    })
	  };
	}

	var sources = {
	  DOM: (0, _dom.makeDOMDriver)('#main-container'),
	  WS: websocketsDriver,
	  WWB: workerBDriver,
	  WWC: workerCDriver,
	  WWD: workerDDriver,
	  WWE: workerEDriver,
	  WWF: workerFDriver,
	  WW: workerDriver
	};
	(0, _xstreamRun.run)(main, sources);

	console.log(sources.DOM);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 1 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var base_1 = __webpack_require__(3);
	var xstream_adapter_1 = __webpack_require__(4);
	/**
	 * Takes a `main` function and circularly connects it to the given collection
	 * of driver functions.
	 *
	 * **Example:**
	 * ```js
	 * import {run} from '@cycle/xstream-run';
	 * const dispose = run(main, drivers);
	 * // ...
	 * dispose();
	 * ```
	 *
	 * The `main` function expects a collection of "source" streams (returned from
	 * drivers) as input, and should return a collection of "sink" streams (to be
	 * given to drivers). A "collection of streams" is a JavaScript object where
	 * keys match the driver names registered by the `drivers` object, and values
	 * are the streams. Refer to the documentation of each driver to see more
	 * details on what types of sources it outputs and sinks it receives.
	 *
	 * @param {Function} main a function that takes `sources` as input and outputs
	 * `sinks`.
	 * @param {Object} drivers an object where keys are driver names and values
	 * are driver functions.
	 * @return {Function} a dispose function, used to terminate the execution of the
	 * Cycle.js program, cleaning up resources used.
	 * @function run
	 */
	function run(main, drivers) {
	    var _a = base_1.default(main, drivers, { streamAdapter: xstream_adapter_1.default }), run = _a.run, sinks = _a.sinks;
	    if (typeof window !== 'undefined' && window['CyclejsDevTool_startGraphSerializer']) {
	        window['CyclejsDevTool_startGraphSerializer'](sinks);
	    }
	    return run();
	}
	exports.run = run;
	/**
	 * A function that prepares the Cycle application to be executed. Takes a `main`
	 * function and prepares to circularly connects it to the given collection of
	 * driver functions. As an output, `Cycle()` returns an object with three
	 * properties: `sources`, `sinks` and `run`. Only when `run()` is called will
	 * the application actually execute. Refer to the documentation of `run()` for
	 * more details.
	 *
	 * **Example:**
	 * ```js
	 * import Cycle from '@cycle/xstream-run';
	 * const {sources, sinks, run} = Cycle(main, drivers);
	 * // ...
	 * const dispose = run(); // Executes the application
	 * // ...
	 * dispose();
	 * ```
	 *
	 * @param {Function} main a function that takes `sources` as input and outputs
	 * `sinks`.
	 * @param {Object} drivers an object where keys are driver names and values
	 * are driver functions.
	 * @return {Object} an object with three properties: `sources`, `sinks` and
	 * `run`. `sources` is the collection of driver sources, `sinks` is the
	 * collection of driver sinks, these can be used for debugging or testing. `run`
	 * is the function that once called will execute the application.
	 * @function Cycle
	 */
	var Cycle = function (main, drivers) {
	    var out = base_1.default(main, drivers, { streamAdapter: xstream_adapter_1.default });
	    if (typeof window !== 'undefined' && window['CyclejsDevTool_startGraphSerializer']) {
	        window['CyclejsDevTool_startGraphSerializer'](out.sinks);
	    }
	    return out;
	};
	Cycle.run = run;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Cycle;
	//# sourceMappingURL=index.js.map

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	function logToConsoleError(err) {
	    var target = err.stack || err;
	    if (console && console.error) {
	        console.error(target);
	    }
	    else if (console && console.log) {
	        console.log(target);
	    }
	}
	function makeSinkProxies(drivers, streamAdapter) {
	    var sinkProxies = {};
	    for (var name_1 in drivers) {
	        if (drivers.hasOwnProperty(name_1)) {
	            var subject = streamAdapter.makeSubject();
	            var driverStreamAdapter = drivers[name_1].streamAdapter || streamAdapter;
	            var stream = driverStreamAdapter.adapt(subject.stream, streamAdapter.streamSubscribe);
	            sinkProxies[name_1] = {
	                stream: stream,
	                observer: subject.observer,
	            };
	        }
	    }
	    return sinkProxies;
	}
	function callDrivers(drivers, sinkProxies, streamAdapter) {
	    var sources = {};
	    for (var name_2 in drivers) {
	        if (drivers.hasOwnProperty(name_2)) {
	            var driverOutput = drivers[name_2](sinkProxies[name_2].stream, streamAdapter, name_2);
	            var driverStreamAdapter = drivers[name_2].streamAdapter;
	            if (driverStreamAdapter && driverStreamAdapter.isValidStream(driverOutput)) {
	                sources[name_2] = streamAdapter.adapt(driverOutput, driverStreamAdapter.streamSubscribe);
	            }
	            else {
	                sources[name_2] = driverOutput;
	            }
	            if (sources[name_2] && typeof sources[name_2] === 'object') {
	                sources[name_2]._isCycleSource = name_2;
	            }
	        }
	    }
	    return sources;
	}
	function replicateMany(sinks, sinkProxies, streamAdapter) {
	    var sinkNames = Object.keys(sinks).filter(function (name) { return !!sinkProxies[name]; });
	    var buffers = {};
	    var replicators = {};
	    sinkNames.forEach(function (name) {
	        buffers[name] = { next: [], error: [], complete: [] };
	        replicators[name] = {
	            next: function (x) { return buffers[name].next.push(x); },
	            error: function (x) { return buffers[name].error.push(x); },
	            complete: function (x) { return buffers[name].complete.push(x); },
	        };
	    });
	    var subscriptions = sinkNames.map(function (name) {
	        return streamAdapter.streamSubscribe(sinks[name], {
	            next: function (x) {
	                replicators[name].next(x);
	            },
	            error: function (err) {
	                logToConsoleError(err);
	                replicators[name].error(err);
	            },
	            complete: function (x) {
	                replicators[name].complete(x);
	            },
	        });
	    });
	    var disposeFunctions = subscriptions
	        .filter(function (fn) { return typeof fn === 'function'; });
	    sinkNames.forEach(function (name) {
	        var observer = sinkProxies[name].observer;
	        var next = observer.next;
	        var error = observer.error;
	        var complete = observer.complete;
	        buffers[name].next.forEach(next);
	        buffers[name].error.forEach(error);
	        buffers[name].complete.forEach(complete);
	        replicators[name].next = next;
	        replicators[name].error = error;
	        replicators[name].complete = complete;
	    });
	    return function () {
	        disposeFunctions.forEach(function (dispose) { return dispose(); });
	    };
	}
	function disposeSources(sources) {
	    for (var k in sources) {
	        if (sources.hasOwnProperty(k) && sources[k]
	            && typeof sources[k].dispose === 'function') {
	            sources[k].dispose();
	        }
	    }
	}
	var isObjectEmpty = function (obj) { return Object.keys(obj).length === 0; };
	function Cycle(main, drivers, options) {
	    if (typeof main !== "function") {
	        throw new Error("First argument given to Cycle must be the 'main' " +
	            "function.");
	    }
	    if (typeof drivers !== "object" || drivers === null) {
	        throw new Error("Second argument given to Cycle must be an object " +
	            "with driver functions as properties.");
	    }
	    if (isObjectEmpty(drivers)) {
	        throw new Error("Second argument given to Cycle must be an object " +
	            "with at least one driver function declared as a property.");
	    }
	    var streamAdapter = options.streamAdapter;
	    if (!streamAdapter || isObjectEmpty(streamAdapter)) {
	        throw new Error("Third argument given to Cycle must be an options object " +
	            "with the streamAdapter key supplied with a valid stream adapter.");
	    }
	    var sinkProxies = makeSinkProxies(drivers, streamAdapter);
	    var sources = callDrivers(drivers, sinkProxies, streamAdapter);
	    var sinks = main(sources);
	    if (typeof window !== 'undefined') {
	        window.Cyclejs = { sinks: sinks };
	    }
	    var run = function () {
	        var disposeReplication = replicateMany(sinks, sinkProxies, streamAdapter);
	        return function () {
	            disposeSources(sources);
	            disposeReplication();
	        };
	    };
	    return { sinks: sinks, sources: sources, run: run };
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Cycle;
	//# sourceMappingURL=index.js.map

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var xstream_1 = __webpack_require__(5);
	var XStreamAdapter = {
	    adapt: function (originStream, originStreamSubscribe) {
	        if (XStreamAdapter.isValidStream(originStream)) {
	            return originStream;
	        }
	        ;
	        var dispose = null;
	        return xstream_1.default.create({
	            start: function (out) {
	                var observer = out;
	                dispose = originStreamSubscribe(originStream, observer);
	            },
	            stop: function () {
	                if (typeof dispose === 'function') {
	                    dispose();
	                }
	            },
	        });
	    },
	    makeSubject: function () {
	        var stream = xstream_1.default.create();
	        var observer = {
	            next: function (x) { stream.shamefullySendNext(x); },
	            error: function (err) { stream.shamefullySendError(err); },
	            complete: function () { stream.shamefullySendComplete(); },
	        };
	        return { observer: observer, stream: stream };
	    },
	    remember: function (stream) {
	        return stream.remember();
	    },
	    isValidStream: function (stream) {
	        return (typeof stream.addListener === 'function' &&
	            typeof stream.shamefullySendNext === 'function');
	    },
	    streamSubscribe: function (stream, observer) {
	        stream.addListener(observer);
	        return function () { return stream.removeListener(observer); };
	    },
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = XStreamAdapter;
	//# sourceMappingURL=index.js.map

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var symbol_observable_1 = __webpack_require__(6);
	var NO = {};
	exports.NO = NO;
	function noop() { }
	function copy(a) {
	    var l = a.length;
	    var b = Array(l);
	    for (var i = 0; i < l; ++i) {
	        b[i] = a[i];
	    }
	    return b;
	}
	function and(f1, f2) {
	    return function andFn(t) {
	        return f1(t) && f2(t);
	    };
	}
	function _try(c, t, u) {
	    try {
	        return c.f(t);
	    }
	    catch (e) {
	        u._e(e);
	        return NO;
	    }
	}
	var NO_IL = {
	    _n: noop,
	    _e: noop,
	    _c: noop,
	};
	exports.NO_IL = NO_IL;
	// mutates the input
	function internalizeProducer(producer) {
	    producer._start =
	        function _start(il) {
	            il.next = il._n;
	            il.error = il._e;
	            il.complete = il._c;
	            this.start(il);
	        };
	    producer._stop = producer.stop;
	}
	var StreamSub = (function () {
	    function StreamSub(_stream, _listener) {
	        this._stream = _stream;
	        this._listener = _listener;
	    }
	    StreamSub.prototype.unsubscribe = function () {
	        this._stream.removeListener(this._listener);
	    };
	    return StreamSub;
	}());
	var Observer = (function () {
	    function Observer(_listener) {
	        this._listener = _listener;
	    }
	    Observer.prototype.next = function (value) {
	        this._listener._n(value);
	    };
	    Observer.prototype.error = function (err) {
	        this._listener._e(err);
	    };
	    Observer.prototype.complete = function () {
	        this._listener._c();
	    };
	    return Observer;
	}());
	var FromObservable = (function () {
	    function FromObservable(observable) {
	        this.type = 'fromObservable';
	        this.ins = observable;
	        this.active = false;
	    }
	    FromObservable.prototype._start = function (out) {
	        this.out = out;
	        this.active = true;
	        this._sub = this.ins.subscribe(new Observer(out));
	        if (!this.active)
	            this._sub.unsubscribe();
	    };
	    FromObservable.prototype._stop = function () {
	        if (this._sub)
	            this._sub.unsubscribe();
	        this.active = false;
	    };
	    return FromObservable;
	}());
	var Merge = (function () {
	    function Merge(insArr) {
	        this.type = 'merge';
	        this.insArr = insArr;
	        this.out = NO;
	        this.ac = 0;
	    }
	    Merge.prototype._start = function (out) {
	        this.out = out;
	        var s = this.insArr;
	        var L = s.length;
	        this.ac = L;
	        for (var i = 0; i < L; i++) {
	            s[i]._add(this);
	        }
	    };
	    Merge.prototype._stop = function () {
	        var s = this.insArr;
	        var L = s.length;
	        for (var i = 0; i < L; i++) {
	            s[i]._remove(this);
	        }
	        this.out = NO;
	    };
	    Merge.prototype._n = function (t) {
	        var u = this.out;
	        if (u === NO)
	            return;
	        u._n(t);
	    };
	    Merge.prototype._e = function (err) {
	        var u = this.out;
	        if (u === NO)
	            return;
	        u._e(err);
	    };
	    Merge.prototype._c = function () {
	        if (--this.ac <= 0) {
	            var u = this.out;
	            if (u === NO)
	                return;
	            u._c();
	        }
	    };
	    return Merge;
	}());
	var CombineListener = (function () {
	    function CombineListener(i, out, p) {
	        this.i = i;
	        this.out = out;
	        this.p = p;
	        p.ils.push(this);
	    }
	    CombineListener.prototype._n = function (t) {
	        var p = this.p, out = this.out;
	        if (out === NO)
	            return;
	        if (p.up(t, this.i)) {
	            out._n(p.vals);
	        }
	    };
	    CombineListener.prototype._e = function (err) {
	        var out = this.out;
	        if (out === NO)
	            return;
	        out._e(err);
	    };
	    CombineListener.prototype._c = function () {
	        var p = this.p;
	        if (p.out === NO)
	            return;
	        if (--p.Nc === 0) {
	            p.out._c();
	        }
	    };
	    return CombineListener;
	}());
	var Combine = (function () {
	    function Combine(insArr) {
	        this.type = 'combine';
	        this.insArr = insArr;
	        this.out = NO;
	        this.ils = [];
	        this.Nc = this.Nn = 0;
	        this.vals = [];
	    }
	    Combine.prototype.up = function (t, i) {
	        var v = this.vals[i];
	        var Nn = !this.Nn ? 0 : v === NO ? --this.Nn : this.Nn;
	        this.vals[i] = t;
	        return Nn === 0;
	    };
	    Combine.prototype._start = function (out) {
	        this.out = out;
	        var s = this.insArr;
	        var n = this.Nc = this.Nn = s.length;
	        var vals = this.vals = new Array(n);
	        if (n === 0) {
	            out._n([]);
	            out._c();
	        }
	        else {
	            for (var i = 0; i < n; i++) {
	                vals[i] = NO;
	                s[i]._add(new CombineListener(i, out, this));
	            }
	        }
	    };
	    Combine.prototype._stop = function () {
	        var s = this.insArr;
	        var n = s.length;
	        var ils = this.ils;
	        for (var i = 0; i < n; i++) {
	            s[i]._remove(ils[i]);
	        }
	        this.out = NO;
	        this.ils = [];
	        this.vals = [];
	    };
	    return Combine;
	}());
	var FromArray = (function () {
	    function FromArray(a) {
	        this.type = 'fromArray';
	        this.a = a;
	    }
	    FromArray.prototype._start = function (out) {
	        var a = this.a;
	        for (var i = 0, l = a.length; i < l; i++) {
	            out._n(a[i]);
	        }
	        out._c();
	    };
	    FromArray.prototype._stop = function () {
	    };
	    return FromArray;
	}());
	var FromPromise = (function () {
	    function FromPromise(p) {
	        this.type = 'fromPromise';
	        this.on = false;
	        this.p = p;
	    }
	    FromPromise.prototype._start = function (out) {
	        var prod = this;
	        this.on = true;
	        this.p.then(function (v) {
	            if (prod.on) {
	                out._n(v);
	                out._c();
	            }
	        }, function (e) {
	            out._e(e);
	        }).then(noop, function (err) {
	            setTimeout(function () { throw err; });
	        });
	    };
	    FromPromise.prototype._stop = function () {
	        this.on = false;
	    };
	    return FromPromise;
	}());
	var Periodic = (function () {
	    function Periodic(period) {
	        this.type = 'periodic';
	        this.period = period;
	        this.intervalID = -1;
	        this.i = 0;
	    }
	    Periodic.prototype._start = function (out) {
	        var self = this;
	        function intervalHandler() { out._n(self.i++); }
	        this.intervalID = setInterval(intervalHandler, this.period);
	    };
	    Periodic.prototype._stop = function () {
	        if (this.intervalID !== -1)
	            clearInterval(this.intervalID);
	        this.intervalID = -1;
	        this.i = 0;
	    };
	    return Periodic;
	}());
	var Debug = (function () {
	    function Debug(ins, arg) {
	        this.type = 'debug';
	        this.ins = ins;
	        this.out = NO;
	        this.s = noop;
	        this.l = '';
	        if (typeof arg === 'string') {
	            this.l = arg;
	        }
	        else if (typeof arg === 'function') {
	            this.s = arg;
	        }
	    }
	    Debug.prototype._start = function (out) {
	        this.out = out;
	        this.ins._add(this);
	    };
	    Debug.prototype._stop = function () {
	        this.ins._remove(this);
	        this.out = NO;
	    };
	    Debug.prototype._n = function (t) {
	        var u = this.out;
	        if (u === NO)
	            return;
	        var s = this.s, l = this.l;
	        if (s !== noop) {
	            try {
	                s(t);
	            }
	            catch (e) {
	                u._e(e);
	            }
	        }
	        else if (l) {
	            console.log(l + ':', t);
	        }
	        else {
	            console.log(t);
	        }
	        u._n(t);
	    };
	    Debug.prototype._e = function (err) {
	        var u = this.out;
	        if (u === NO)
	            return;
	        u._e(err);
	    };
	    Debug.prototype._c = function () {
	        var u = this.out;
	        if (u === NO)
	            return;
	        u._c();
	    };
	    return Debug;
	}());
	var Drop = (function () {
	    function Drop(max, ins) {
	        this.type = 'drop';
	        this.ins = ins;
	        this.out = NO;
	        this.max = max;
	        this.dropped = 0;
	    }
	    Drop.prototype._start = function (out) {
	        this.out = out;
	        this.dropped = 0;
	        this.ins._add(this);
	    };
	    Drop.prototype._stop = function () {
	        this.ins._remove(this);
	        this.out = NO;
	    };
	    Drop.prototype._n = function (t) {
	        var u = this.out;
	        if (u === NO)
	            return;
	        if (this.dropped++ >= this.max)
	            u._n(t);
	    };
	    Drop.prototype._e = function (err) {
	        var u = this.out;
	        if (u === NO)
	            return;
	        u._e(err);
	    };
	    Drop.prototype._c = function () {
	        var u = this.out;
	        if (u === NO)
	            return;
	        u._c();
	    };
	    return Drop;
	}());
	var EndWhenListener = (function () {
	    function EndWhenListener(out, op) {
	        this.out = out;
	        this.op = op;
	    }
	    EndWhenListener.prototype._n = function () {
	        this.op.end();
	    };
	    EndWhenListener.prototype._e = function (err) {
	        this.out._e(err);
	    };
	    EndWhenListener.prototype._c = function () {
	        this.op.end();
	    };
	    return EndWhenListener;
	}());
	var EndWhen = (function () {
	    function EndWhen(o, ins) {
	        this.type = 'endWhen';
	        this.ins = ins;
	        this.out = NO;
	        this.o = o;
	        this.oil = NO_IL;
	    }
	    EndWhen.prototype._start = function (out) {
	        this.out = out;
	        this.o._add(this.oil = new EndWhenListener(out, this));
	        this.ins._add(this);
	    };
	    EndWhen.prototype._stop = function () {
	        this.ins._remove(this);
	        this.o._remove(this.oil);
	        this.out = NO;
	        this.oil = NO_IL;
	    };
	    EndWhen.prototype.end = function () {
	        var u = this.out;
	        if (u === NO)
	            return;
	        u._c();
	    };
	    EndWhen.prototype._n = function (t) {
	        var u = this.out;
	        if (u === NO)
	            return;
	        u._n(t);
	    };
	    EndWhen.prototype._e = function (err) {
	        var u = this.out;
	        if (u === NO)
	            return;
	        u._e(err);
	    };
	    EndWhen.prototype._c = function () {
	        this.end();
	    };
	    return EndWhen;
	}());
	var Filter = (function () {
	    function Filter(passes, ins) {
	        this.type = 'filter';
	        this.ins = ins;
	        this.out = NO;
	        this.f = passes;
	    }
	    Filter.prototype._start = function (out) {
	        this.out = out;
	        this.ins._add(this);
	    };
	    Filter.prototype._stop = function () {
	        this.ins._remove(this);
	        this.out = NO;
	    };
	    Filter.prototype._n = function (t) {
	        var u = this.out;
	        if (u === NO)
	            return;
	        var r = _try(this, t, u);
	        if (r === NO || !r)
	            return;
	        u._n(t);
	    };
	    Filter.prototype._e = function (err) {
	        var u = this.out;
	        if (u === NO)
	            return;
	        u._e(err);
	    };
	    Filter.prototype._c = function () {
	        var u = this.out;
	        if (u === NO)
	            return;
	        u._c();
	    };
	    return Filter;
	}());
	var FlattenListener = (function () {
	    function FlattenListener(out, op) {
	        this.out = out;
	        this.op = op;
	    }
	    FlattenListener.prototype._n = function (t) {
	        this.out._n(t);
	    };
	    FlattenListener.prototype._e = function (err) {
	        this.out._e(err);
	    };
	    FlattenListener.prototype._c = function () {
	        this.op.inner = NO;
	        this.op.less();
	    };
	    return FlattenListener;
	}());
	var Flatten = (function () {
	    function Flatten(ins) {
	        this.type = 'flatten';
	        this.ins = ins;
	        this.out = NO;
	        this.open = true;
	        this.inner = NO;
	        this.il = NO_IL;
	    }
	    Flatten.prototype._start = function (out) {
	        this.out = out;
	        this.open = true;
	        this.inner = NO;
	        this.il = NO_IL;
	        this.ins._add(this);
	    };
	    Flatten.prototype._stop = function () {
	        this.ins._remove(this);
	        if (this.inner !== NO)
	            this.inner._remove(this.il);
	        this.out = NO;
	        this.open = true;
	        this.inner = NO;
	        this.il = NO_IL;
	    };
	    Flatten.prototype.less = function () {
	        var u = this.out;
	        if (u === NO)
	            return;
	        if (!this.open && this.inner === NO)
	            u._c();
	    };
	    Flatten.prototype._n = function (s) {
	        var u = this.out;
	        if (u === NO)
	            return;
	        var _a = this, inner = _a.inner, il = _a.il;
	        if (inner !== NO && il !== NO_IL)
	            inner._remove(il);
	        (this.inner = s)._add(this.il = new FlattenListener(u, this));
	    };
	    Flatten.prototype._e = function (err) {
	        var u = this.out;
	        if (u === NO)
	            return;
	        u._e(err);
	    };
	    Flatten.prototype._c = function () {
	        this.open = false;
	        this.less();
	    };
	    return Flatten;
	}());
	var Fold = (function () {
	    function Fold(f, seed, ins) {
	        var _this = this;
	        this.type = 'fold';
	        this.ins = ins;
	        this.out = NO;
	        this.f = function (t) { return f(_this.acc, t); };
	        this.acc = this.seed = seed;
	    }
	    Fold.prototype._start = function (out) {
	        this.out = out;
	        this.acc = this.seed;
	        out._n(this.acc);
	        this.ins._add(this);
	    };
	    Fold.prototype._stop = function () {
	        this.ins._remove(this);
	        this.out = NO;
	        this.acc = this.seed;
	    };
	    Fold.prototype._n = function (t) {
	        var u = this.out;
	        if (u === NO)
	            return;
	        var r = _try(this, t, u);
	        if (r === NO)
	            return;
	        u._n(this.acc = r);
	    };
	    Fold.prototype._e = function (err) {
	        var u = this.out;
	        if (u === NO)
	            return;
	        u._e(err);
	    };
	    Fold.prototype._c = function () {
	        var u = this.out;
	        if (u === NO)
	            return;
	        u._c();
	    };
	    return Fold;
	}());
	var Last = (function () {
	    function Last(ins) {
	        this.type = 'last';
	        this.ins = ins;
	        this.out = NO;
	        this.has = false;
	        this.val = NO;
	    }
	    Last.prototype._start = function (out) {
	        this.out = out;
	        this.has = false;
	        this.ins._add(this);
	    };
	    Last.prototype._stop = function () {
	        this.ins._remove(this);
	        this.out = NO;
	        this.val = NO;
	    };
	    Last.prototype._n = function (t) {
	        this.has = true;
	        this.val = t;
	    };
	    Last.prototype._e = function (err) {
	        var u = this.out;
	        if (u === NO)
	            return;
	        u._e(err);
	    };
	    Last.prototype._c = function () {
	        var u = this.out;
	        if (u === NO)
	            return;
	        if (this.has) {
	            u._n(this.val);
	            u._c();
	        }
	        else {
	            u._e('TODO show proper error');
	        }
	    };
	    return Last;
	}());
	var MapFlattenListener = (function () {
	    function MapFlattenListener(out, op) {
	        this.out = out;
	        this.op = op;
	    }
	    MapFlattenListener.prototype._n = function (r) {
	        this.out._n(r);
	    };
	    MapFlattenListener.prototype._e = function (err) {
	        this.out._e(err);
	    };
	    MapFlattenListener.prototype._c = function () {
	        this.op.inner = NO;
	        this.op.less();
	    };
	    return MapFlattenListener;
	}());
	var MapFlatten = (function () {
	    function MapFlatten(mapOp) {
	        this.type = mapOp.type + "+flatten";
	        this.ins = mapOp.ins;
	        this.out = NO;
	        this.mapOp = mapOp;
	        this.inner = NO;
	        this.il = NO_IL;
	        this.open = true;
	    }
	    MapFlatten.prototype._start = function (out) {
	        this.out = out;
	        this.inner = NO;
	        this.il = NO_IL;
	        this.open = true;
	        this.mapOp.ins._add(this);
	    };
	    MapFlatten.prototype._stop = function () {
	        this.mapOp.ins._remove(this);
	        if (this.inner !== NO)
	            this.inner._remove(this.il);
	        this.out = NO;
	        this.inner = NO;
	        this.il = NO_IL;
	    };
	    MapFlatten.prototype.less = function () {
	        if (!this.open && this.inner === NO) {
	            var u = this.out;
	            if (u === NO)
	                return;
	            u._c();
	        }
	    };
	    MapFlatten.prototype._n = function (v) {
	        var u = this.out;
	        if (u === NO)
	            return;
	        var _a = this, inner = _a.inner, il = _a.il;
	        var s = _try(this.mapOp, v, u);
	        if (s === NO)
	            return;
	        if (inner !== NO && il !== NO_IL)
	            inner._remove(il);
	        (this.inner = s)._add(this.il = new MapFlattenListener(u, this));
	    };
	    MapFlatten.prototype._e = function (err) {
	        var u = this.out;
	        if (u === NO)
	            return;
	        u._e(err);
	    };
	    MapFlatten.prototype._c = function () {
	        this.open = false;
	        this.less();
	    };
	    return MapFlatten;
	}());
	var MapOp = (function () {
	    function MapOp(project, ins) {
	        this.type = 'map';
	        this.ins = ins;
	        this.out = NO;
	        this.f = project;
	    }
	    MapOp.prototype._start = function (out) {
	        this.out = out;
	        this.ins._add(this);
	    };
	    MapOp.prototype._stop = function () {
	        this.ins._remove(this);
	        this.out = NO;
	    };
	    MapOp.prototype._n = function (t) {
	        var u = this.out;
	        if (u === NO)
	            return;
	        var r = _try(this, t, u);
	        if (r === NO)
	            return;
	        u._n(r);
	    };
	    MapOp.prototype._e = function (err) {
	        var u = this.out;
	        if (u === NO)
	            return;
	        u._e(err);
	    };
	    MapOp.prototype._c = function () {
	        var u = this.out;
	        if (u === NO)
	            return;
	        u._c();
	    };
	    return MapOp;
	}());
	var FilterMapFusion = (function (_super) {
	    __extends(FilterMapFusion, _super);
	    function FilterMapFusion(passes, project, ins) {
	        _super.call(this, project, ins);
	        this.type = 'filter+map';
	        this.passes = passes;
	    }
	    FilterMapFusion.prototype._n = function (t) {
	        if (!this.passes(t))
	            return;
	        var u = this.out;
	        if (u === NO)
	            return;
	        var r = _try(this, t, u);
	        if (r === NO)
	            return;
	        u._n(r);
	    };
	    return FilterMapFusion;
	}(MapOp));
	var Remember = (function () {
	    function Remember(ins) {
	        this.type = 'remember';
	        this.ins = ins;
	        this.out = NO;
	    }
	    Remember.prototype._start = function (out) {
	        this.out = out;
	        this.ins._add(out);
	    };
	    Remember.prototype._stop = function () {
	        this.ins._remove(this.out);
	        this.out = NO;
	    };
	    return Remember;
	}());
	var ReplaceError = (function () {
	    function ReplaceError(replacer, ins) {
	        this.type = 'replaceError';
	        this.ins = ins;
	        this.out = NO;
	        this.f = replacer;
	    }
	    ReplaceError.prototype._start = function (out) {
	        this.out = out;
	        this.ins._add(this);
	    };
	    ReplaceError.prototype._stop = function () {
	        this.ins._remove(this);
	        this.out = NO;
	    };
	    ReplaceError.prototype._n = function (t) {
	        var u = this.out;
	        if (u === NO)
	            return;
	        u._n(t);
	    };
	    ReplaceError.prototype._e = function (err) {
	        var u = this.out;
	        if (u === NO)
	            return;
	        try {
	            this.ins._remove(this);
	            (this.ins = this.f(err))._add(this);
	        }
	        catch (e) {
	            u._e(e);
	        }
	    };
	    ReplaceError.prototype._c = function () {
	        var u = this.out;
	        if (u === NO)
	            return;
	        u._c();
	    };
	    return ReplaceError;
	}());
	var StartWith = (function () {
	    function StartWith(ins, val) {
	        this.type = 'startWith';
	        this.ins = ins;
	        this.out = NO;
	        this.val = val;
	    }
	    StartWith.prototype._start = function (out) {
	        this.out = out;
	        this.out._n(this.val);
	        this.ins._add(out);
	    };
	    StartWith.prototype._stop = function () {
	        this.ins._remove(this.out);
	        this.out = NO;
	    };
	    return StartWith;
	}());
	var Take = (function () {
	    function Take(max, ins) {
	        this.type = 'take';
	        this.ins = ins;
	        this.out = NO;
	        this.max = max;
	        this.taken = 0;
	    }
	    Take.prototype._start = function (out) {
	        this.out = out;
	        this.taken = 0;
	        if (this.max <= 0) {
	            out._c();
	        }
	        else {
	            this.ins._add(this);
	        }
	    };
	    Take.prototype._stop = function () {
	        this.ins._remove(this);
	        this.out = NO;
	    };
	    Take.prototype._n = function (t) {
	        var u = this.out;
	        if (u === NO)
	            return;
	        var m = ++this.taken;
	        if (m < this.max) {
	            u._n(t);
	        }
	        else if (m === this.max) {
	            u._n(t);
	            u._c();
	        }
	    };
	    Take.prototype._e = function (err) {
	        var u = this.out;
	        if (u === NO)
	            return;
	        u._e(err);
	    };
	    Take.prototype._c = function () {
	        var u = this.out;
	        if (u === NO)
	            return;
	        u._c();
	    };
	    return Take;
	}());
	var Stream = (function () {
	    function Stream(producer) {
	        this._prod = producer || NO;
	        this._ils = [];
	        this._stopID = NO;
	        this._dl = NO;
	        this._d = false;
	        this._target = NO;
	        this._err = NO;
	    }
	    Stream.prototype._n = function (t) {
	        var a = this._ils;
	        var L = a.length;
	        if (this._d)
	            this._dl._n(t);
	        if (L == 1)
	            a[0]._n(t);
	        else {
	            var b = copy(a);
	            for (var i = 0; i < L; i++)
	                b[i]._n(t);
	        }
	    };
	    Stream.prototype._e = function (err) {
	        if (this._err !== NO)
	            return;
	        this._err = err;
	        var a = this._ils;
	        var L = a.length;
	        this._x();
	        if (this._d)
	            this._dl._e(err);
	        if (L == 1)
	            a[0]._e(err);
	        else {
	            var b = copy(a);
	            for (var i = 0; i < L; i++)
	                b[i]._e(err);
	        }
	        if (!this._d && L == 0)
	            throw this._err;
	    };
	    Stream.prototype._c = function () {
	        var a = this._ils;
	        var L = a.length;
	        this._x();
	        if (this._d)
	            this._dl._c();
	        if (L == 1)
	            a[0]._c();
	        else {
	            var b = copy(a);
	            for (var i = 0; i < L; i++)
	                b[i]._c();
	        }
	    };
	    Stream.prototype._x = function () {
	        if (this._ils.length === 0)
	            return;
	        if (this._prod !== NO)
	            this._prod._stop();
	        this._err = NO;
	        this._ils = [];
	    };
	    Stream.prototype._stopNow = function () {
	        // WARNING: code that calls this method should
	        // first check if this._prod is valid (not `NO`)
	        this._prod._stop();
	        this._err = NO;
	        this._stopID = NO;
	    };
	    Stream.prototype._add = function (il) {
	        var ta = this._target;
	        if (ta !== NO)
	            return ta._add(il);
	        var a = this._ils;
	        a.push(il);
	        if (a.length > 1)
	            return;
	        if (this._stopID !== NO) {
	            clearTimeout(this._stopID);
	            this._stopID = NO;
	        }
	        else {
	            var p = this._prod;
	            if (p !== NO)
	                p._start(this);
	        }
	    };
	    Stream.prototype._remove = function (il) {
	        var _this = this;
	        var ta = this._target;
	        if (ta !== NO)
	            return ta._remove(il);
	        var a = this._ils;
	        var i = a.indexOf(il);
	        if (i > -1) {
	            a.splice(i, 1);
	            if (this._prod !== NO && a.length <= 0) {
	                this._err = NO;
	                this._stopID = setTimeout(function () { return _this._stopNow(); });
	            }
	            else if (a.length === 1) {
	                this._pruneCycles();
	            }
	        }
	    };
	    // If all paths stemming from `this` stream eventually end at `this`
	    // stream, then we remove the single listener of `this` stream, to
	    // force it to end its execution and dispose resources. This method
	    // assumes as a precondition that this._ils has just one listener.
	    Stream.prototype._pruneCycles = function () {
	        if (this._hasNoSinks(this, [])) {
	            this._remove(this._ils[0]);
	        }
	    };
	    // Checks whether *there is no* path starting from `x` that leads to an end
	    // listener (sink) in the stream graph, following edges A->B where B is a
	    // listener of A. This means these paths constitute a cycle somehow. Is given
	    // a trace of all visited nodes so far.
	    Stream.prototype._hasNoSinks = function (x, trace) {
	        if (trace.indexOf(x) !== -1) {
	            return true;
	        }
	        else if (x.out === this) {
	            return true;
	        }
	        else if (x.out && x.out !== NO) {
	            return this._hasNoSinks(x.out, trace.concat(x));
	        }
	        else if (x._ils) {
	            for (var i = 0, N = x._ils.length; i < N; i++) {
	                if (!this._hasNoSinks(x._ils[i], trace.concat(x))) {
	                    return false;
	                }
	            }
	            return true;
	        }
	        else {
	            return false;
	        }
	    };
	    Stream.prototype.ctor = function () {
	        return this instanceof MemoryStream ? MemoryStream : Stream;
	    };
	    /**
	     * Adds a Listener to the Stream.
	     *
	     * @param {Listener} listener
	     */
	    Stream.prototype.addListener = function (listener) {
	        listener._n = listener.next || noop;
	        listener._e = listener.error || noop;
	        listener._c = listener.complete || noop;
	        this._add(listener);
	    };
	    /**
	     * Removes a Listener from the Stream, assuming the Listener was added to it.
	     *
	     * @param {Listener<T>} listener
	     */
	    Stream.prototype.removeListener = function (listener) {
	        this._remove(listener);
	    };
	    /**
	     * Adds a Listener to the Stream returning a Subscription to remove that
	     * listener.
	     *
	     * @param {Listener} listener
	     * @returns {Subscription}
	     */
	    Stream.prototype.subscribe = function (listener) {
	        this.addListener(listener);
	        return new StreamSub(this, listener);
	    };
	    /**
	     * Add interop between most.js and RxJS 5
	     *
	     * @returns {Stream}
	     */
	    Stream.prototype[symbol_observable_1.default] = function () {
	        return this;
	    };
	    /**
	     * Creates a new Stream given a Producer.
	     *
	     * @factory true
	     * @param {Producer} producer An optional Producer that dictates how to
	     * start, generate events, and stop the Stream.
	     * @return {Stream}
	     */
	    Stream.create = function (producer) {
	        if (producer) {
	            if (typeof producer.start !== 'function'
	                || typeof producer.stop !== 'function') {
	                throw new Error('producer requires both start and stop functions');
	            }
	            internalizeProducer(producer); // mutates the input
	        }
	        return new Stream(producer);
	    };
	    /**
	     * Creates a new MemoryStream given a Producer.
	     *
	     * @factory true
	     * @param {Producer} producer An optional Producer that dictates how to
	     * start, generate events, and stop the Stream.
	     * @return {MemoryStream}
	     */
	    Stream.createWithMemory = function (producer) {
	        if (producer) {
	            internalizeProducer(producer); // mutates the input
	        }
	        return new MemoryStream(producer);
	    };
	    /**
	     * Creates a Stream that does nothing when started. It never emits any event.
	     *
	     * Marble diagram:
	     *
	     * ```text
	     *          never
	     * -----------------------
	     * ```
	     *
	     * @factory true
	     * @return {Stream}
	     */
	    Stream.never = function () {
	        return new Stream({ _start: noop, _stop: noop });
	    };
	    /**
	     * Creates a Stream that immediately emits the "complete" notification when
	     * started, and that's it.
	     *
	     * Marble diagram:
	     *
	     * ```text
	     * empty
	     * -|
	     * ```
	     *
	     * @factory true
	     * @return {Stream}
	     */
	    Stream.empty = function () {
	        return new Stream({
	            _start: function (il) { il._c(); },
	            _stop: noop,
	        });
	    };
	    /**
	     * Creates a Stream that immediately emits an "error" notification with the
	     * value you passed as the `error` argument when the stream starts, and that's
	     * it.
	     *
	     * Marble diagram:
	     *
	     * ```text
	     * throw(X)
	     * -X
	     * ```
	     *
	     * @factory true
	     * @param error The error event to emit on the created stream.
	     * @return {Stream}
	     */
	    Stream.throw = function (error) {
	        return new Stream({
	            _start: function (il) { il._e(error); },
	            _stop: noop,
	        });
	    };
	    /**
	     * Creates a stream from an Array, Promise, or an Observable.
	     *
	     * @factory true
	     * @param {Array|Promise|Observable} input The input to make a stream from.
	     * @return {Stream}
	     */
	    Stream.from = function (input) {
	        if (typeof input[symbol_observable_1.default] === 'function') {
	            return Stream.fromObservable(input);
	        }
	        else if (typeof input.then === 'function') {
	            return Stream.fromPromise(input);
	        }
	        else if (Array.isArray(input)) {
	            return Stream.fromArray(input);
	        }
	        throw new TypeError("Type of input to from() must be an Array, Promise, or Observable");
	    };
	    /**
	     * Creates a Stream that immediately emits the arguments that you give to
	     * *of*, then completes.
	     *
	     * Marble diagram:
	     *
	     * ```text
	     * of(1,2,3)
	     * 123|
	     * ```
	     *
	     * @factory true
	     * @param a The first value you want to emit as an event on the stream.
	     * @param b The second value you want to emit as an event on the stream. One
	     * or more of these values may be given as arguments.
	     * @return {Stream}
	     */
	    Stream.of = function () {
	        var items = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            items[_i - 0] = arguments[_i];
	        }
	        return Stream.fromArray(items);
	    };
	    /**
	     * Converts an array to a stream. The returned stream will emit synchronously
	     * all the items in the array, and then complete.
	     *
	     * Marble diagram:
	     *
	     * ```text
	     * fromArray([1,2,3])
	     * 123|
	     * ```
	     *
	     * @factory true
	     * @param {Array} array The array to be converted as a stream.
	     * @return {Stream}
	     */
	    Stream.fromArray = function (array) {
	        return new Stream(new FromArray(array));
	    };
	    /**
	     * Converts a promise to a stream. The returned stream will emit the resolved
	     * value of the promise, and then complete. However, if the promise is
	     * rejected, the stream will emit the corresponding error.
	     *
	     * Marble diagram:
	     *
	     * ```text
	     * fromPromise( ----42 )
	     * -----------------42|
	     * ```
	     *
	     * @factory true
	     * @param {Promise} promise The promise to be converted as a stream.
	     * @return {Stream}
	     */
	    Stream.fromPromise = function (promise) {
	        return new Stream(new FromPromise(promise));
	    };
	    /**
	     * Converts an Observable into a Stream.
	     *
	     * @factory true
	     * @param {any} observable The observable to be converted as a stream.
	     * @return {Stream}
	     */
	    Stream.fromObservable = function (observable) {
	        return new Stream(new FromObservable(observable));
	    };
	    /**
	     * Creates a stream that periodically emits incremental numbers, every
	     * `period` milliseconds.
	     *
	     * Marble diagram:
	     *
	     * ```text
	     *     periodic(1000)
	     * ---0---1---2---3---4---...
	     * ```
	     *
	     * @factory true
	     * @param {number} period The interval in milliseconds to use as a rate of
	     * emission.
	     * @return {Stream}
	     */
	    Stream.periodic = function (period) {
	        return new Stream(new Periodic(period));
	    };
	    Stream.prototype._map = function (project) {
	        var p = this._prod;
	        var ctor = this.ctor();
	        if (p instanceof Filter) {
	            return new ctor(new FilterMapFusion(p.f, project, p.ins));
	        }
	        return new ctor(new MapOp(project, this));
	    };
	    /**
	     * Transforms each event from the input Stream through a `project` function,
	     * to get a Stream that emits those transformed events.
	     *
	     * Marble diagram:
	     *
	     * ```text
	     * --1---3--5-----7------
	     *    map(i => i * 10)
	     * --10--30-50----70-----
	     * ```
	     *
	     * @param {Function} project A function of type `(t: T) => U` that takes event
	     * `t` of type `T` from the input Stream and produces an event of type `U`, to
	     * be emitted on the output Stream.
	     * @return {Stream}
	     */
	    Stream.prototype.map = function (project) {
	        return this._map(project);
	    };
	    /**
	     * It's like `map`, but transforms each input event to always the same
	     * constant value on the output Stream.
	     *
	     * Marble diagram:
	     *
	     * ```text
	     * --1---3--5-----7-----
	     *       mapTo(10)
	     * --10--10-10----10----
	     * ```
	     *
	     * @param projectedValue A value to emit on the output Stream whenever the
	     * input Stream emits any value.
	     * @return {Stream}
	     */
	    Stream.prototype.mapTo = function (projectedValue) {
	        var s = this.map(function () { return projectedValue; });
	        var op = s._prod;
	        op.type = op.type.replace('map', 'mapTo');
	        return s;
	    };
	    /**
	     * Only allows events that pass the test given by the `passes` argument.
	     *
	     * Each event from the input stream is given to the `passes` function. If the
	     * function returns `true`, the event is forwarded to the output stream,
	     * otherwise it is ignored and not forwarded.
	     *
	     * Marble diagram:
	     *
	     * ```text
	     * --1---2--3-----4-----5---6--7-8--
	     *     filter(i => i % 2 === 0)
	     * ------2--------4---------6----8--
	     * ```
	     *
	     * @param {Function} passes A function of type `(t: T) +> boolean` that takes
	     * an event from the input stream and checks if it passes, by returning a
	     * boolean.
	     * @return {Stream}
	     */
	    Stream.prototype.filter = function (passes) {
	        var p = this._prod;
	        if (p instanceof Filter) {
	            return new Stream(new Filter(and(p.f, passes), p.ins));
	        }
	        return new Stream(new Filter(passes, this));
	    };
	    /**
	     * Lets the first `amount` many events from the input stream pass to the
	     * output stream, then makes the output stream complete.
	     *
	     * Marble diagram:
	     *
	     * ```text
	     * --a---b--c----d---e--
	     *    take(3)
	     * --a---b--c|
	     * ```
	     *
	     * @param {number} amount How many events to allow from the input stream
	     * before completing the output stream.
	     * @return {Stream}
	     */
	    Stream.prototype.take = function (amount) {
	        return new (this.ctor())(new Take(amount, this));
	    };
	    /**
	     * Ignores the first `amount` many events from the input stream, and then
	     * after that starts forwarding events from the input stream to the output
	     * stream.
	     *
	     * Marble diagram:
	     *
	     * ```text
	     * --a---b--c----d---e--
	     *       drop(3)
	     * --------------d---e--
	     * ```
	     *
	     * @param {number} amount How many events to ignore from the input stream
	     * before forwarding all events from the input stream to the output stream.
	     * @return {Stream}
	     */
	    Stream.prototype.drop = function (amount) {
	        return new Stream(new Drop(amount, this));
	    };
	    /**
	     * When the input stream completes, the output stream will emit the last event
	     * emitted by the input stream, and then will also complete.
	     *
	     * Marble diagram:
	     *
	     * ```text
	     * --a---b--c--d----|
	     *       last()
	     * -----------------d|
	     * ```
	     *
	     * @return {Stream}
	     */
	    Stream.prototype.last = function () {
	        return new Stream(new Last(this));
	    };
	    /**
	     * Prepends the given `initial` value to the sequence of events emitted by the
	     * input stream. The returned stream is a MemoryStream, which means it is
	     * already `remember()`'d.
	     *
	     * Marble diagram:
	     *
	     * ```text
	     * ---1---2-----3---
	     *   startWith(0)
	     * 0--1---2-----3---
	     * ```
	     *
	     * @param initial The value or event to prepend.
	     * @return {MemoryStream}
	     */
	    Stream.prototype.startWith = function (initial) {
	        return new MemoryStream(new StartWith(this, initial));
	    };
	    /**
	     * Uses another stream to determine when to complete the current stream.
	     *
	     * When the given `other` stream emits an event or completes, the output
	     * stream will complete. Before that happens, the output stream will behaves
	     * like the input stream.
	     *
	     * Marble diagram:
	     *
	     * ```text
	     * ---1---2-----3--4----5----6---
	     *   endWhen( --------a--b--| )
	     * ---1---2-----3--4--|
	     * ```
	     *
	     * @param other Some other stream that is used to know when should the output
	     * stream of this operator complete.
	     * @return {Stream}
	     */
	    Stream.prototype.endWhen = function (other) {
	        return new (this.ctor())(new EndWhen(other, this));
	    };
	    /**
	     * "Folds" the stream onto itself.
	     *
	     * Combines events from the past throughout
	     * the entire execution of the input stream, allowing you to accumulate them
	     * together. It's essentially like `Array.prototype.reduce`. The returned
	     * stream is a MemoryStream, which means it is already `remember()`'d.
	     *
	     * The output stream starts by emitting the `seed` which you give as argument.
	     * Then, when an event happens on the input stream, it is combined with that
	     * seed value through the `accumulate` function, and the output value is
	     * emitted on the output stream. `fold` remembers that output value as `acc`
	     * ("accumulator"), and then when a new input event `t` happens, `acc` will be
	     * combined with that to produce the new `acc` and so forth.
	     *
	     * Marble diagram:
	     *
	     * ```text
	     * ------1-----1--2----1----1------
	     *   fold((acc, x) => acc + x, 3)
	     * 3-----4-----5--7----8----9------
	     * ```
	     *
	     * @param {Function} accumulate A function of type `(acc: R, t: T) => R` that
	     * takes the previous accumulated value `acc` and the incoming event from the
	     * input stream and produces the new accumulated value.
	     * @param seed The initial accumulated value, of type `R`.
	     * @return {MemoryStream}
	     */
	    Stream.prototype.fold = function (accumulate, seed) {
	        return new MemoryStream(new Fold(accumulate, seed, this));
	    };
	    /**
	     * Replaces an error with another stream.
	     *
	     * When (and if) an error happens on the input stream, instead of forwarding
	     * that error to the output stream, *replaceError* will call the `replace`
	     * function which returns the stream that the output stream will replicate.
	     * And, in case that new stream also emits an error, `replace` will be called
	     * again to get another stream to start replicating.
	     *
	     * Marble diagram:
	     *
	     * ```text
	     * --1---2-----3--4-----X
	     *   replaceError( () => --10--| )
	     * --1---2-----3--4--------10--|
	     * ```
	     *
	     * @param {Function} replace A function of type `(err) => Stream` that takes
	     * the error that occurred on the input stream or on the previous replacement
	     * stream and returns a new stream. The output stream will behave like the
	     * stream that this function returns.
	     * @return {Stream}
	     */
	    Stream.prototype.replaceError = function (replace) {
	        return new (this.ctor())(new ReplaceError(replace, this));
	    };
	    /**
	     * Flattens a "stream of streams", handling only one nested stream at a time
	     * (no concurrency).
	     *
	     * If the input stream is a stream that emits streams, then this operator will
	     * return an output stream which is a flat stream: emits regular events. The
	     * flattening happens without concurrency. It works like this: when the input
	     * stream emits a nested stream, *flatten* will start imitating that nested
	     * one. However, as soon as the next nested stream is emitted on the input
	     * stream, *flatten* will forget the previous nested one it was imitating, and
	     * will start imitating the new nested one.
	     *
	     * Marble diagram:
	     *
	     * ```text
	     * --+--------+---------------
	     *   \        \
	     *    \       ----1----2---3--
	     *    --a--b----c----d--------
	     *           flatten
	     * -----a--b------1----2---3--
	     * ```
	     *
	     * @return {Stream}
	     */
	    Stream.prototype.flatten = function () {
	        var p = this._prod;
	        return new Stream(p instanceof MapOp && !(p instanceof FilterMapFusion) ?
	            new MapFlatten(p) :
	            new Flatten(this));
	    };
	    /**
	     * Passes the input stream to a custom operator, to produce an output stream.
	     *
	     * *compose* is a handy way of using an existing function in a chained style.
	     * Instead of writing `outStream = f(inStream)` you can write
	     * `outStream = inStream.compose(f)`.
	     *
	     * @param {function} operator A function that takes a stream as input and
	     * returns a stream as well.
	     * @return {Stream}
	     */
	    Stream.prototype.compose = function (operator) {
	        return operator(this);
	    };
	    /**
	     * Returns an output stream that behaves like the input stream, but also
	     * remembers the most recent event that happens on the input stream, so that a
	     * newly added listener will immediately receive that memorised event.
	     *
	     * @return {MemoryStream}
	     */
	    Stream.prototype.remember = function () {
	        return new MemoryStream(new Remember(this));
	    };
	    /**
	     * Returns an output stream that identically behaves like the input stream,
	     * but also runs a `spy` function fo each event, to help you debug your app.
	     *
	     * *debug* takes a `spy` function as argument, and runs that for each event
	     * happening on the input stream. If you don't provide the `spy` argument,
	     * then *debug* will just `console.log` each event. This helps you to
	     * understand the flow of events through some operator chain.
	     *
	     * Please note that if the output stream has no listeners, then it will not
	     * start, which means `spy` will never run because no actual event happens in
	     * that case.
	     *
	     * Marble diagram:
	     *
	     * ```text
	     * --1----2-----3-----4--
	     *         debug
	     * --1----2-----3-----4--
	     * ```
	     *
	     * @param {function} labelOrSpy A string to use as the label when printing
	     * debug information on the console, or a 'spy' function that takes an event
	     * as argument, and does not need to return anything.
	     * @return {Stream}
	     */
	    Stream.prototype.debug = function (labelOrSpy) {
	        return new (this.ctor())(new Debug(this, labelOrSpy));
	    };
	    /**
	     * *imitate* changes this current Stream to emit the same events that the
	     * `other` given Stream does. This method returns nothing.
	     *
	     * This method exists to allow one thing: **circular dependency of streams**.
	     * For instance, let's imagine that for some reason you need to create a
	     * circular dependency where stream `first$` depends on stream `second$`
	     * which in turn depends on `first$`:
	     *
	     * <!-- skip-example -->
	     * ```js
	     * import delay from 'xstream/extra/delay'
	     *
	     * var first$ = second$.map(x => x * 10).take(3);
	     * var second$ = first$.map(x => x + 1).startWith(1).compose(delay(100));
	     * ```
	     *
	     * However, that is invalid JavaScript, because `second$` is undefined
	     * on the first line. This is how *imitate* can help solve it:
	     *
	     * ```js
	     * import delay from 'xstream/extra/delay'
	     *
	     * var secondProxy$ = xs.create();
	     * var first$ = secondProxy$.map(x => x * 10).take(3);
	     * var second$ = first$.map(x => x + 1).startWith(1).compose(delay(100));
	     * secondProxy$.imitate(second$);
	     * ```
	     *
	     * We create `secondProxy$` before the others, so it can be used in the
	     * declaration of `first$`. Then, after both `first$` and `second$` are
	     * defined, we hook `secondProxy$` with `second$` with `imitate()` to tell
	     * that they are "the same". `imitate` will not trigger the start of any
	     * stream, it just binds `secondProxy$` and `second$` together.
	     *
	     * The following is an example where `imitate()` is important in Cycle.js
	     * applications. A parent component contains some child components. A child
	     * has an action stream which is given to the parent to define its state:
	     *
	     * <!-- skip-example -->
	     * ```js
	     * const childActionProxy$ = xs.create();
	     * const parent = Parent({...sources, childAction$: childActionProxy$});
	     * const childAction$ = parent.state$.map(s => s.child.action$).flatten();
	     * childActionProxy$.imitate(childAction$);
	     * ```
	     *
	     * Note, though, that **`imitate()` does not support MemoryStreams**. If we
	     * would attempt to imitate a MemoryStream in a circular dependency, we would
	     * either get a race condition (where the symptom would be "nothing happens")
	     * or an infinite cyclic emission of values. It's useful to think about
	     * MemoryStreams as cells in a spreadsheet. It doesn't make any sense to
	     * define a spreadsheet cell `A1` with a formula that depends on `B1` and
	     * cell `B1` defined with a formula that depends on `A1`.
	     *
	     * If you find yourself wanting to use `imitate()` with a
	     * MemoryStream, you should rework your code around `imitate()` to use a
	     * Stream instead. Look for the stream in the circular dependency that
	     * represents an event stream, and that would be a candidate for creating a
	     * proxy Stream which then imitates the target Stream.
	     *
	     * @param {Stream} target The other stream to imitate on the current one. Must
	     * not be a MemoryStream.
	     */
	    Stream.prototype.imitate = function (target) {
	        if (target instanceof MemoryStream) {
	            throw new Error('A MemoryStream was given to imitate(), but it only ' +
	                'supports a Stream. Read more about this restriction here: ' +
	                'https://github.com/staltz/xstream#faq');
	        }
	        this._target = target;
	        for (var ils = this._ils, N = ils.length, i = 0; i < N; i++) {
	            target._add(ils[i]);
	        }
	        this._ils = [];
	    };
	    /**
	     * Forces the Stream to emit the given value to its listeners.
	     *
	     * As the name indicates, if you use this, you are most likely doing something
	     * The Wrong Way. Please try to understand the reactive way before using this
	     * method. Use it only when you know what you are doing.
	     *
	     * @param value The "next" value you want to broadcast to all listeners of
	     * this Stream.
	     */
	    Stream.prototype.shamefullySendNext = function (value) {
	        this._n(value);
	    };
	    /**
	     * Forces the Stream to emit the given error to its listeners.
	     *
	     * As the name indicates, if you use this, you are most likely doing something
	     * The Wrong Way. Please try to understand the reactive way before using this
	     * method. Use it only when you know what you are doing.
	     *
	     * @param {any} error The error you want to broadcast to all the listeners of
	     * this Stream.
	     */
	    Stream.prototype.shamefullySendError = function (error) {
	        this._e(error);
	    };
	    /**
	     * Forces the Stream to emit the "completed" event to its listeners.
	     *
	     * As the name indicates, if you use this, you are most likely doing something
	     * The Wrong Way. Please try to understand the reactive way before using this
	     * method. Use it only when you know what you are doing.
	     */
	    Stream.prototype.shamefullySendComplete = function () {
	        this._c();
	    };
	    /**
	     * Adds a "debug" listener to the stream. There can only be one debug
	     * listener, that's why this is 'setDebugListener'. To remove the debug
	     * listener, just call setDebugListener(null).
	     *
	     * A debug listener is like any other listener. The only difference is that a
	     * debug listener is "stealthy": its presence/absence does not trigger the
	     * start/stop of the stream (or the producer inside the stream). This is
	     * useful so you can inspect what is going on without changing the behavior
	     * of the program. If you have an idle stream and you add a normal listener to
	     * it, the stream will start executing. But if you set a debug listener on an
	     * idle stream, it won't start executing (not until the first normal listener
	     * is added).
	     *
	     * As the name indicates, we don't recommend using this method to build app
	     * logic. In fact, in most cases the debug operator works just fine. Only use
	     * this one if you know what you're doing.
	     *
	     * @param {Listener<T>} listener
	     */
	    Stream.prototype.setDebugListener = function (listener) {
	        if (!listener) {
	            this._d = false;
	            this._dl = NO;
	        }
	        else {
	            this._d = true;
	            listener._n = listener.next || noop;
	            listener._e = listener.error || noop;
	            listener._c = listener.complete || noop;
	            this._dl = listener;
	        }
	    };
	    /**
	     * Blends multiple streams together, emitting events from all of them
	     * concurrently.
	     *
	     * *merge* takes multiple streams as arguments, and creates a stream that
	     * behaves like each of the argument streams, in parallel.
	     *
	     * Marble diagram:
	     *
	     * ```text
	     * --1----2-----3--------4---
	     * ----a-----b----c---d------
	     *            merge
	     * --1-a--2--b--3-c---d--4---
	     * ```
	     *
	     * @factory true
	     * @param {Stream} stream1 A stream to merge together with other streams.
	     * @param {Stream} stream2 A stream to merge together with other streams. Two
	     * or more streams may be given as arguments.
	     * @return {Stream}
	     */
	    Stream.merge = function merge() {
	        var streams = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            streams[_i - 0] = arguments[_i];
	        }
	        return new Stream(new Merge(streams));
	    };
	    /**
	     * Combines multiple input streams together to return a stream whose events
	     * are arrays that collect the latest events from each input stream.
	     *
	     * *combine* internally remembers the most recent event from each of the input
	     * streams. When any of the input streams emits an event, that event together
	     * with all the other saved events are combined into an array. That array will
	     * be emitted on the output stream. It's essentially a way of joining together
	     * the events from multiple streams.
	     *
	     * Marble diagram:
	     *
	     * ```text
	     * --1----2-----3--------4---
	     * ----a-----b-----c--d------
	     *          combine
	     * ----1a-2a-2b-3b-3c-3d-4d--
	     * ```
	     *
	     * Note: to minimize garbage collection, *combine* uses the same array
	     * instance for each emission.  If you need to compare emissions over time,
	     * cache the values with `map` first:
	     *
	     * ```js
	     * import pairwise from 'xstream/extra/pairwise'
	     *
	     * const stream1 = xs.of(1);
	     * const stream2 = xs.of(2);
	     *
	     * xs.combine(stream1, stream2).map(
	     *   combinedEmissions => ([ ...combinedEmissions ])
	     * ).compose(pairwise)
	     * ```
	     *
	     * @factory true
	     * @param {Stream} stream1 A stream to combine together with other streams.
	     * @param {Stream} stream2 A stream to combine together with other streams.
	     * Multiple streams, not just two, may be given as arguments.
	     * @return {Stream}
	     */
	    Stream.combine = function combine() {
	        var streams = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            streams[_i - 0] = arguments[_i];
	        }
	        return new Stream(new Combine(streams));
	    };
	    return Stream;
	}());
	exports.Stream = Stream;
	var MemoryStream = (function (_super) {
	    __extends(MemoryStream, _super);
	    function MemoryStream(producer) {
	        _super.call(this, producer);
	        this._has = false;
	    }
	    MemoryStream.prototype._n = function (x) {
	        this._v = x;
	        this._has = true;
	        _super.prototype._n.call(this, x);
	    };
	    MemoryStream.prototype._add = function (il) {
	        var ta = this._target;
	        if (ta !== NO)
	            return ta._add(il);
	        var a = this._ils;
	        a.push(il);
	        if (a.length > 1) {
	            if (this._has)
	                il._n(this._v);
	            return;
	        }
	        if (this._stopID !== NO) {
	            if (this._has)
	                il._n(this._v);
	            clearTimeout(this._stopID);
	            this._stopID = NO;
	        }
	        else if (this._has)
	            il._n(this._v);
	        else {
	            var p = this._prod;
	            if (p !== NO)
	                p._start(this);
	        }
	    };
	    MemoryStream.prototype._stopNow = function () {
	        this._has = false;
	        _super.prototype._stopNow.call(this);
	    };
	    MemoryStream.prototype._x = function () {
	        this._has = false;
	        _super.prototype._x.call(this);
	    };
	    MemoryStream.prototype.map = function (project) {
	        return this._map(project);
	    };
	    MemoryStream.prototype.mapTo = function (projectedValue) {
	        return _super.prototype.mapTo.call(this, projectedValue);
	    };
	    MemoryStream.prototype.take = function (amount) {
	        return _super.prototype.take.call(this, amount);
	    };
	    MemoryStream.prototype.endWhen = function (other) {
	        return _super.prototype.endWhen.call(this, other);
	    };
	    MemoryStream.prototype.replaceError = function (replace) {
	        return _super.prototype.replaceError.call(this, replace);
	    };
	    MemoryStream.prototype.remember = function () {
	        return this;
	    };
	    MemoryStream.prototype.debug = function (labelOrSpy) {
	        return _super.prototype.debug.call(this, labelOrSpy);
	    };
	    return MemoryStream;
	}(Stream));
	exports.MemoryStream = MemoryStream;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Stream;
	//# sourceMappingURL=index.js.map

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(7);


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, module) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _ponyfill = __webpack_require__(9);

	var _ponyfill2 = _interopRequireDefault(_ponyfill);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var root; /* global window */


	if (typeof self !== 'undefined') {
	  root = self;
	} else if (typeof window !== 'undefined') {
	  root = window;
	} else if (typeof global !== 'undefined') {
	  root = global;
	} else if (true) {
	  root = module;
	} else {
	  root = Function('return this')();
	}

	var result = (0, _ponyfill2['default'])(root);
	exports['default'] = result;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(8)(module)))

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports['default'] = symbolObservablePonyfill;
	function symbolObservablePonyfill(root) {
		var result;
		var _Symbol = root.Symbol;

		if (typeof _Symbol === 'function') {
			if (_Symbol.observable) {
				result = _Symbol.observable;
			} else {
				result = _Symbol('observable');
				_Symbol.observable = result;
			}
		} else {
			result = '@@observable';
		}

		return result;
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var thunk = __webpack_require__(11);
	exports.thunk = thunk;
	/**
	 * A factory for the DOM driver function.
	 *
	 * Takes a `container` to define the target on the existing DOM which this
	 * driver will operate on, and an `options` object as the second argument. The
	 * input to this driver is a stream of virtual DOM objects, or in other words,
	 * Snabbdom "VNode" objects. The output of this driver is a "DOMSource": a
	 * collection of Observables queried with the methods `select()` and `events()`.
	 *
	 * `DOMSource.select(selector)` returns a new DOMSource with scope restricted to
	 * the element(s) that matches the CSS `selector` given.
	 *
	 * `DOMSource.events(eventType, options)` returns a stream of events of
	 * `eventType` happening on the elements that match the current DOMSource. The
	 * returned stream is an *xstream* Stream if you use `@cycle/xstream-run` to run
	 * your app with this driver, or it is an RxJS Observable if you use
	 * `@cycle/rxjs-run`, and so forth. The `options` parameter can have the field
	 * `useCapture`, which is by default `false`, except it is `true` for event
	 * types that do not bubble. Read more here
	 * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
	 * about the `useCapture` and its purpose.
	 *
	 * `DOMSource.elements()` returns a stream of the DOM element(s) matched by the
	 * selectors in the DOMSource. Also, `DOMSource.select(':root').elements()`
	 * returns a stream of DOM element corresponding to the root (or container) of
	 * the app on the DOM.
	 *
	 * @param {(String|HTMLElement)} container the DOM selector for the element
	 * (or the element itself) to contain the rendering of the VTrees.
	 * @param {DOMDriverOptions} options an object with two optional fields:
	 * `transposition: boolean` enables/disables transposition of inner streams in
	 * the virtual DOM tree, `modules: array` contains additional Snabbdom modules.
	 * @return {Function} the DOM driver function. The function expects a stream of
	 * of VNode as input, and outputs the DOMSource object.
	 * @function makeDOMDriver
	 */
	var makeDOMDriver_1 = __webpack_require__(15);
	exports.makeDOMDriver = makeDOMDriver_1.makeDOMDriver;
	/**
	 * A factory for the HTML driver function.
	 *
	 * Takes an `effect` callback function and an `options` object as arguments. The
	 * input to this driver is a stream of virtual DOM objects, or in other words,
	 * Snabbdom "VNode" objects. The output of this driver is a "DOMSource": a
	 * collection of Observables queried with the methods `select()` and `events()`.
	 *
	 * The HTML Driver is supplementary to the DOM Driver. Instead of producing
	 * elements on the DOM, it generates HTML as strings and does a side effect on
	 * those HTML strings. That side effect is described by the `effect` callback
	 * function. So, if you want to use the HTML Driver on the server-side to render
	 * your application as HTML and send as a response (which is the typical use
	 * case for the HTML Driver), you need to pass something like the
	 * `html => response.send(html)` function as the `effect` argument. This way,
	 * the driver knows what side effect to cause based on the HTML string it just
	 * rendered.
	 *
	 * The HTML driver is useful only for that side effect in the `effect` callback.
	 * It can be considered a sink-only driver. However, in order to serve as a
	 * transparent replacement to the DOM Driver when rendering from the server, the
	 * HTML driver returns a source object that behaves just like the DOMSource.
	 * This helps reuse the same application that is written for the DOM Driver.
	 * This fake DOMSource returns empty streams when you query it, because there
	 * are no user events on the server.
	 *
	 * `DOMSource.select(selector)` returns a new DOMSource with scope restricted to
	 * the element(s) that matches the CSS `selector` given.
	 *
	 * `DOMSource.events(eventType, options)` returns an empty stream. The returned
	 * stream is an *xstream* Stream if you use `@cycle/xstream-run` to run your app
	 * with this driver, or it is an RxJS Observable if you use `@cycle/rxjs-run`,
	 * and so forth.
	 *
	 * `DOMSource.elements()` returns the stream of HTML string rendered from your
	 * sink virtual DOM stream.
	 *
	 * @param {Function} effect a callback function that takes a string of rendered
	 * HTML as input and should run a side effect, returning nothing.
	 * @param {HTMLDriverOptions} options an object with one optional field:
	 * `transposition: boolean` enables/disables transposition of inner streams in
	 * the virtual DOM tree.
	 * @return {Function} the HTML driver function. The function expects a stream of
	 * of VNode as input, and outputs the DOMSource object.
	 * @function makeHTMLDriver
	 */
	var makeHTMLDriver_1 = __webpack_require__(95);
	exports.makeHTMLDriver = makeHTMLDriver_1.makeHTMLDriver;
	/**
	 * A factory function to create mocked DOMSource objects, for testing purposes.
	 *
	 * Takes a `streamAdapter` and a `mockConfig` object as arguments, and returns
	 * a DOMSource that can be given to any Cycle.js app that expects a DOMSource in
	 * the sources, for testing.
	 *
	 * The `streamAdapter` parameter is a package such as `@cycle/xstream-adapter`,
	 * `@cycle/rxjs-adapter`, etc. Import it as `import a from '@cycle/rx-adapter`,
	 * then provide it to `mockDOMSource. This is important so the DOMSource created
	 * knows which stream library should it use to export its streams when you call
	 * `DOMSource.events()` for instance.
	 *
	 * The `mockConfig` parameter is an object specifying selectors, eventTypes and
	 * their streams. Example:
	 *
	 * ```js
	 * const domSource = mockDOMSource(RxAdapter, {
	 *   '.foo': {
	 *     'click': Rx.Observable.of({target: {}}),
	 *     'mouseover': Rx.Observable.of({target: {}}),
	 *   },
	 *   '.bar': {
	 *     'scroll': Rx.Observable.of({target: {}}),
	 *     elements: Rx.Observable.of({tagName: 'div'}),
	 *   }
	 * });
	 *
	 * // Usage
	 * const click$ = domSource.select('.foo').events('click');
	 * const element$ = domSource.select('.bar').elements();
	 * ```
	 *
	 * The mocked DOM Source supports isolation. It has the functions `isolateSink`
	 * and `isolateSource` attached to it, and performs simple isolation using
	 * classNames. *isolateSink* with scope `foo` will append the class `___foo` to
	 * the stream of virtual DOM nodes, and *isolateSource* with scope `foo` will
	 * perform a conventional `mockedDOMSource.select('.__foo')` call.
	 *
	 * @param {Object} mockConfig an object where keys are selector strings
	 * and values are objects. Those nested objects have `eventType` strings as keys
	 * and values are streams you created.
	 * @return {Object} fake DOM source object, with an API containing `select()`
	 * and `events()` and `elements()` which can be used just like the DOM Driver's
	 * DOMSource.
	 *
	 * @function mockDOMSource
	 */
	var mockDOMSource_1 = __webpack_require__(123);
	exports.mockDOMSource = mockDOMSource_1.mockDOMSource;
	/**
	 * The hyperscript function `h()` is a function to create virtual DOM objects,
	 * also known as VNodes. Call
	 *
	 * ```js
	 * h('div.myClass', {style: {color: 'red'}}, [])
	 * ```
	 *
	 * to create a VNode that represents a `DIV` element with className `myClass`,
	 * styled with red color, and no children because the `[]` array was passed. The
	 * API is `h(tagOrSelector, optionalData, optionalChildrenOrText)`.
	 *
	 * However, usually you should use "hyperscript helpers", which are shortcut
	 * functions based on hyperscript. There is one hyperscript helper function for
	 * each DOM tagName, such as `h1()`, `h2()`, `div()`, `span()`, `label()`,
	 * `input()`. For instance, the previous example could have been written
	 * as:
	 *
	 * ```js
	 * div('.myClass', {style: {color: 'red'}}, [])
	 * ```
	 *
	 * There are also SVG helper functions, which apply the appropriate SVG
	 * namespace to the resulting elements. `svg()` function creates the top-most
	 * SVG element, and `svg.g`, `svg.polygon`, `svg.circle`, `svg.path` are for
	 * SVG-specific child elements. Example:
	 *
	 * ```js
	 * svg({width: 150, height: 150}, [
	 *   svg.polygon({
	 *     attrs: {
	 *       class: 'triangle',
	 *       points: '20 0 20 150 150 20'
	 *     }
	 *   })
	 * ])
	 * ```
	 *
	 * @function h
	 */
	var hyperscript_1 = __webpack_require__(29);
	exports.h = hyperscript_1.h;
	var hyperscript_helpers_1 = __webpack_require__(124);
	exports.svg = hyperscript_helpers_1.default.svg;
	exports.a = hyperscript_helpers_1.default.a;
	exports.abbr = hyperscript_helpers_1.default.abbr;
	exports.address = hyperscript_helpers_1.default.address;
	exports.area = hyperscript_helpers_1.default.area;
	exports.article = hyperscript_helpers_1.default.article;
	exports.aside = hyperscript_helpers_1.default.aside;
	exports.audio = hyperscript_helpers_1.default.audio;
	exports.b = hyperscript_helpers_1.default.b;
	exports.base = hyperscript_helpers_1.default.base;
	exports.bdi = hyperscript_helpers_1.default.bdi;
	exports.bdo = hyperscript_helpers_1.default.bdo;
	exports.blockquote = hyperscript_helpers_1.default.blockquote;
	exports.body = hyperscript_helpers_1.default.body;
	exports.br = hyperscript_helpers_1.default.br;
	exports.button = hyperscript_helpers_1.default.button;
	exports.canvas = hyperscript_helpers_1.default.canvas;
	exports.caption = hyperscript_helpers_1.default.caption;
	exports.cite = hyperscript_helpers_1.default.cite;
	exports.code = hyperscript_helpers_1.default.code;
	exports.col = hyperscript_helpers_1.default.col;
	exports.colgroup = hyperscript_helpers_1.default.colgroup;
	exports.dd = hyperscript_helpers_1.default.dd;
	exports.del = hyperscript_helpers_1.default.del;
	exports.dfn = hyperscript_helpers_1.default.dfn;
	exports.dir = hyperscript_helpers_1.default.dir;
	exports.div = hyperscript_helpers_1.default.div;
	exports.dl = hyperscript_helpers_1.default.dl;
	exports.dt = hyperscript_helpers_1.default.dt;
	exports.em = hyperscript_helpers_1.default.em;
	exports.embed = hyperscript_helpers_1.default.embed;
	exports.fieldset = hyperscript_helpers_1.default.fieldset;
	exports.figcaption = hyperscript_helpers_1.default.figcaption;
	exports.figure = hyperscript_helpers_1.default.figure;
	exports.footer = hyperscript_helpers_1.default.footer;
	exports.form = hyperscript_helpers_1.default.form;
	exports.h1 = hyperscript_helpers_1.default.h1;
	exports.h2 = hyperscript_helpers_1.default.h2;
	exports.h3 = hyperscript_helpers_1.default.h3;
	exports.h4 = hyperscript_helpers_1.default.h4;
	exports.h5 = hyperscript_helpers_1.default.h5;
	exports.h6 = hyperscript_helpers_1.default.h6;
	exports.head = hyperscript_helpers_1.default.head;
	exports.header = hyperscript_helpers_1.default.header;
	exports.hgroup = hyperscript_helpers_1.default.hgroup;
	exports.hr = hyperscript_helpers_1.default.hr;
	exports.html = hyperscript_helpers_1.default.html;
	exports.i = hyperscript_helpers_1.default.i;
	exports.iframe = hyperscript_helpers_1.default.iframe;
	exports.img = hyperscript_helpers_1.default.img;
	exports.input = hyperscript_helpers_1.default.input;
	exports.ins = hyperscript_helpers_1.default.ins;
	exports.kbd = hyperscript_helpers_1.default.kbd;
	exports.keygen = hyperscript_helpers_1.default.keygen;
	exports.label = hyperscript_helpers_1.default.label;
	exports.legend = hyperscript_helpers_1.default.legend;
	exports.li = hyperscript_helpers_1.default.li;
	exports.link = hyperscript_helpers_1.default.link;
	exports.main = hyperscript_helpers_1.default.main;
	exports.map = hyperscript_helpers_1.default.map;
	exports.mark = hyperscript_helpers_1.default.mark;
	exports.menu = hyperscript_helpers_1.default.menu;
	exports.meta = hyperscript_helpers_1.default.meta;
	exports.nav = hyperscript_helpers_1.default.nav;
	exports.noscript = hyperscript_helpers_1.default.noscript;
	exports.object = hyperscript_helpers_1.default.object;
	exports.ol = hyperscript_helpers_1.default.ol;
	exports.optgroup = hyperscript_helpers_1.default.optgroup;
	exports.option = hyperscript_helpers_1.default.option;
	exports.p = hyperscript_helpers_1.default.p;
	exports.param = hyperscript_helpers_1.default.param;
	exports.pre = hyperscript_helpers_1.default.pre;
	exports.progress = hyperscript_helpers_1.default.progress;
	exports.q = hyperscript_helpers_1.default.q;
	exports.rp = hyperscript_helpers_1.default.rp;
	exports.rt = hyperscript_helpers_1.default.rt;
	exports.ruby = hyperscript_helpers_1.default.ruby;
	exports.s = hyperscript_helpers_1.default.s;
	exports.samp = hyperscript_helpers_1.default.samp;
	exports.script = hyperscript_helpers_1.default.script;
	exports.section = hyperscript_helpers_1.default.section;
	exports.select = hyperscript_helpers_1.default.select;
	exports.small = hyperscript_helpers_1.default.small;
	exports.source = hyperscript_helpers_1.default.source;
	exports.span = hyperscript_helpers_1.default.span;
	exports.strong = hyperscript_helpers_1.default.strong;
	exports.style = hyperscript_helpers_1.default.style;
	exports.sub = hyperscript_helpers_1.default.sub;
	exports.sup = hyperscript_helpers_1.default.sup;
	exports.table = hyperscript_helpers_1.default.table;
	exports.tbody = hyperscript_helpers_1.default.tbody;
	exports.td = hyperscript_helpers_1.default.td;
	exports.textarea = hyperscript_helpers_1.default.textarea;
	exports.tfoot = hyperscript_helpers_1.default.tfoot;
	exports.th = hyperscript_helpers_1.default.th;
	exports.thead = hyperscript_helpers_1.default.thead;
	exports.title = hyperscript_helpers_1.default.title;
	exports.tr = hyperscript_helpers_1.default.tr;
	exports.u = hyperscript_helpers_1.default.u;
	exports.ul = hyperscript_helpers_1.default.ul;
	exports.video = hyperscript_helpers_1.default.video;
	//# sourceMappingURL=index.js.map

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var h = __webpack_require__(12);

	function copyToThunk(vnode, thunk) {
	  thunk.elm = vnode.elm;
	  vnode.data.fn = thunk.data.fn;
	  vnode.data.args = thunk.data.args;
	  thunk.data = vnode.data;
	  thunk.children = vnode.children;
	  thunk.text = vnode.text;
	  thunk.elm = vnode.elm;
	}

	function init(thunk) {
	  var i, cur = thunk.data;
	  var vnode = cur.fn.apply(undefined, cur.args);
	  copyToThunk(vnode, thunk);
	}

	function prepatch(oldVnode, thunk) {
	  var i, old = oldVnode.data, cur = thunk.data, vnode;
	  var oldArgs = old.args, args = cur.args;
	  if (old.fn !== cur.fn || oldArgs.length !== args.length) {
	    copyToThunk(cur.fn.apply(undefined, args), thunk);
	  }
	  for (i = 0; i < args.length; ++i) {
	    if (oldArgs[i] !== args[i]) {
	      copyToThunk(cur.fn.apply(undefined, args), thunk);
	      return;
	    }
	  }
	  copyToThunk(oldVnode, thunk);
	}

	module.exports = function(sel, key, fn, args) {
	  if (args === undefined) {
	    args = fn;
	    fn = key;
	    key = undefined;
	  }
	  return h(sel, {
	    key: key,
	    hook: {init: init, prepatch: prepatch},
	    fn: fn,
	    args: args
	  });
	};


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var VNode = __webpack_require__(13);
	var is = __webpack_require__(14);

	function addNS(data, children) {
	  data.ns = 'http://www.w3.org/2000/svg';
	  if (children !== undefined) {
	    for (var i = 0; i < children.length; ++i) {
	      addNS(children[i].data, children[i].children);
	    }
	  }
	}

	module.exports = function h(sel, b, c) {
	  var data = {}, children, text, i;
	  if (c !== undefined) {
	    data = b;
	    if (is.array(c)) { children = c; }
	    else if (is.primitive(c)) { text = c; }
	  } else if (b !== undefined) {
	    if (is.array(b)) { children = b; }
	    else if (is.primitive(b)) { text = b; }
	    else { data = b; }
	  }
	  if (is.array(children)) {
	    for (i = 0; i < children.length; ++i) {
	      if (is.primitive(children[i])) children[i] = VNode(undefined, undefined, undefined, children[i]);
	    }
	  }
	  if (sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g') {
	    addNS(data, children);
	  }
	  return VNode(sel, data, children, text, undefined);
	};


/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = function(sel, data, children, text, elm) {
	  var key = data === undefined ? undefined : data.key;
	  return {sel: sel, data: data, children: children,
	          text: text, elm: elm, key: key};
	};


/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = {
	  array: Array.isArray,
	  primitive: function(s) { return typeof s === 'string' || typeof s === 'number'; },
	};


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var snabbdom_1 = __webpack_require__(16);
	var xstream_1 = __webpack_require__(5);
	var MainDOMSource_1 = __webpack_require__(18);
	var VNodeWrapper_1 = __webpack_require__(28);
	var utils_1 = __webpack_require__(24);
	var modules_1 = __webpack_require__(33);
	var isolateModule_1 = __webpack_require__(40);
	var transposition_1 = __webpack_require__(94);
	var xstream_adapter_1 = __webpack_require__(4);
	var MapPolyfill = __webpack_require__(41);
	function makeDOMDriverInputGuard(modules) {
	    if (!Array.isArray(modules)) {
	        throw new Error("Optional modules option must be " +
	            "an array for snabbdom modules");
	    }
	}
	function domDriverInputGuard(view$) {
	    if (!view$
	        || typeof view$.addListener !== "function"
	        || typeof view$.fold !== "function") {
	        throw new Error("The DOM driver function expects as input a Stream of " +
	            "virtual DOM elements");
	    }
	}
	function makeDOMDriver(container, options) {
	    if (!options) {
	        options = {};
	    }
	    var transposition = options.transposition || false;
	    var modules = options.modules || modules_1.default;
	    var isolateModule = new isolateModule_1.IsolateModule((new MapPolyfill()));
	    var patch = snabbdom_1.init([isolateModule.createModule()].concat(modules));
	    var rootElement = utils_1.getElement(container);
	    var vnodeWrapper = new VNodeWrapper_1.VNodeWrapper(rootElement);
	    var delegators = new MapPolyfill();
	    makeDOMDriverInputGuard(modules);
	    function DOMDriver(vnode$, runStreamAdapter, name) {
	        domDriverInputGuard(vnode$);
	        var transposeVNode = transposition_1.makeTransposeVNode(runStreamAdapter);
	        var preprocessedVNode$ = (transposition ? vnode$.map(transposeVNode).flatten() : vnode$);
	        var sanitation$ = xstream_1.default.create();
	        var rootElement$ = xstream_1.default.merge(preprocessedVNode$.endWhen(sanitation$), sanitation$)
	            .map(function (vnode) { return vnodeWrapper.call(vnode); })
	            .fold(patch, rootElement)
	            .drop(1)
	            .map(function unwrapElementFromVNode(vnode) { return vnode.elm; })
	            .compose(function (stream) { return xstream_1.default.merge(stream, xstream_1.default.never()); }) // don't complete this stream
	            .startWith(rootElement);
	        rootElement$.addListener({ next: function () { }, error: function () { }, complete: function () { } });
	        return new MainDOMSource_1.MainDOMSource(rootElement$, sanitation$, runStreamAdapter, [], isolateModule, delegators, name);
	    }
	    ;
	    DOMDriver.streamAdapter = xstream_adapter_1.default;
	    return DOMDriver;
	}
	exports.makeDOMDriver = makeDOMDriver;
	//# sourceMappingURL=makeDOMDriver.js.map

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// jshint newcap: false
	/* global require, module, document, Node */
	'use strict';

	var VNode = __webpack_require__(13);
	var is = __webpack_require__(14);
	var domApi = __webpack_require__(17);

	function isUndef(s) { return s === undefined; }
	function isDef(s) { return s !== undefined; }

	var emptyNode = VNode('', {}, [], undefined, undefined);

	function sameVnode(vnode1, vnode2) {
	  return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
	}

	function createKeyToOldIdx(children, beginIdx, endIdx) {
	  var i, map = {}, key;
	  for (i = beginIdx; i <= endIdx; ++i) {
	    key = children[i].key;
	    if (isDef(key)) map[key] = i;
	  }
	  return map;
	}

	var hooks = ['create', 'update', 'remove', 'destroy', 'pre', 'post'];

	function init(modules, api) {
	  var i, j, cbs = {};

	  if (isUndef(api)) api = domApi;

	  for (i = 0; i < hooks.length; ++i) {
	    cbs[hooks[i]] = [];
	    for (j = 0; j < modules.length; ++j) {
	      if (modules[j][hooks[i]] !== undefined) cbs[hooks[i]].push(modules[j][hooks[i]]);
	    }
	  }

	  function emptyNodeAt(elm) {
	    return VNode(api.tagName(elm).toLowerCase(), {}, [], undefined, elm);
	  }

	  function createRmCb(childElm, listeners) {
	    return function() {
	      if (--listeners === 0) {
	        var parent = api.parentNode(childElm);
	        api.removeChild(parent, childElm);
	      }
	    };
	  }

	  function createElm(vnode, insertedVnodeQueue) {
	    var i, data = vnode.data;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.init)) {
	        i(vnode);
	        data = vnode.data;
	      }
	    }
	    var elm, children = vnode.children, sel = vnode.sel;
	    if (isDef(sel)) {
	      // Parse selector
	      var hashIdx = sel.indexOf('#');
	      var dotIdx = sel.indexOf('.', hashIdx);
	      var hash = hashIdx > 0 ? hashIdx : sel.length;
	      var dot = dotIdx > 0 ? dotIdx : sel.length;
	      var tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;
	      elm = vnode.elm = isDef(data) && isDef(i = data.ns) ? api.createElementNS(i, tag)
	                                                          : api.createElement(tag);
	      if (hash < dot) elm.id = sel.slice(hash + 1, dot);
	      if (dotIdx > 0) elm.className = sel.slice(dot+1).replace(/\./g, ' ');
	      if (is.array(children)) {
	        for (i = 0; i < children.length; ++i) {
	          api.appendChild(elm, createElm(children[i], insertedVnodeQueue));
	        }
	      } else if (is.primitive(vnode.text)) {
	        api.appendChild(elm, api.createTextNode(vnode.text));
	      }
	      for (i = 0; i < cbs.create.length; ++i) cbs.create[i](emptyNode, vnode);
	      i = vnode.data.hook; // Reuse variable
	      if (isDef(i)) {
	        if (i.create) i.create(emptyNode, vnode);
	        if (i.insert) insertedVnodeQueue.push(vnode);
	      }
	    } else {
	      elm = vnode.elm = api.createTextNode(vnode.text);
	    }
	    return vnode.elm;
	  }

	  function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      api.insertBefore(parentElm, createElm(vnodes[startIdx], insertedVnodeQueue), before);
	    }
	  }

	  function invokeDestroyHook(vnode) {
	    var i, j, data = vnode.data;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.destroy)) i(vnode);
	      for (i = 0; i < cbs.destroy.length; ++i) cbs.destroy[i](vnode);
	      if (isDef(i = vnode.children)) {
	        for (j = 0; j < vnode.children.length; ++j) {
	          invokeDestroyHook(vnode.children[j]);
	        }
	      }
	    }
	  }

	  function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      var i, listeners, rm, ch = vnodes[startIdx];
	      if (isDef(ch)) {
	        if (isDef(ch.sel)) {
	          invokeDestroyHook(ch);
	          listeners = cbs.remove.length + 1;
	          rm = createRmCb(ch.elm, listeners);
	          for (i = 0; i < cbs.remove.length; ++i) cbs.remove[i](ch, rm);
	          if (isDef(i = ch.data) && isDef(i = i.hook) && isDef(i = i.remove)) {
	            i(ch, rm);
	          } else {
	            rm();
	          }
	        } else { // Text node
	          api.removeChild(parentElm, ch.elm);
	        }
	      }
	    }
	  }

	  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {
	    var oldStartIdx = 0, newStartIdx = 0;
	    var oldEndIdx = oldCh.length - 1;
	    var oldStartVnode = oldCh[0];
	    var oldEndVnode = oldCh[oldEndIdx];
	    var newEndIdx = newCh.length - 1;
	    var newStartVnode = newCh[0];
	    var newEndVnode = newCh[newEndIdx];
	    var oldKeyToIdx, idxInOld, elmToMove, before;

	    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
	      if (isUndef(oldStartVnode)) {
	        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
	      } else if (isUndef(oldEndVnode)) {
	        oldEndVnode = oldCh[--oldEndIdx];
	      } else if (sameVnode(oldStartVnode, newStartVnode)) {
	        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
	        oldStartVnode = oldCh[++oldStartIdx];
	        newStartVnode = newCh[++newStartIdx];
	      } else if (sameVnode(oldEndVnode, newEndVnode)) {
	        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
	        oldEndVnode = oldCh[--oldEndIdx];
	        newEndVnode = newCh[--newEndIdx];
	      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
	        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
	        api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm));
	        oldStartVnode = oldCh[++oldStartIdx];
	        newEndVnode = newCh[--newEndIdx];
	      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
	        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
	        api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
	        oldEndVnode = oldCh[--oldEndIdx];
	        newStartVnode = newCh[++newStartIdx];
	      } else {
	        if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
	        idxInOld = oldKeyToIdx[newStartVnode.key];
	        if (isUndef(idxInOld)) { // New element
	          api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
	          newStartVnode = newCh[++newStartIdx];
	        } else {
	          elmToMove = oldCh[idxInOld];
	          patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
	          oldCh[idxInOld] = undefined;
	          api.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
	          newStartVnode = newCh[++newStartIdx];
	        }
	      }
	    }
	    if (oldStartIdx > oldEndIdx) {
	      before = isUndef(newCh[newEndIdx+1]) ? null : newCh[newEndIdx+1].elm;
	      addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
	    } else if (newStartIdx > newEndIdx) {
	      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
	    }
	  }

	  function patchVnode(oldVnode, vnode, insertedVnodeQueue) {
	    var i, hook;
	    if (isDef(i = vnode.data) && isDef(hook = i.hook) && isDef(i = hook.prepatch)) {
	      i(oldVnode, vnode);
	    }
	    var elm = vnode.elm = oldVnode.elm, oldCh = oldVnode.children, ch = vnode.children;
	    if (oldVnode === vnode) return;
	    if (!sameVnode(oldVnode, vnode)) {
	      var parentElm = api.parentNode(oldVnode.elm);
	      elm = createElm(vnode, insertedVnodeQueue);
	      api.insertBefore(parentElm, elm, oldVnode.elm);
	      removeVnodes(parentElm, [oldVnode], 0, 0);
	      return;
	    }
	    if (isDef(vnode.data)) {
	      for (i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode);
	      i = vnode.data.hook;
	      if (isDef(i) && isDef(i = i.update)) i(oldVnode, vnode);
	    }
	    if (isUndef(vnode.text)) {
	      if (isDef(oldCh) && isDef(ch)) {
	        if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue);
	      } else if (isDef(ch)) {
	        if (isDef(oldVnode.text)) api.setTextContent(elm, '');
	        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
	      } else if (isDef(oldCh)) {
	        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
	      } else if (isDef(oldVnode.text)) {
	        api.setTextContent(elm, '');
	      }
	    } else if (oldVnode.text !== vnode.text) {
	      api.setTextContent(elm, vnode.text);
	    }
	    if (isDef(hook) && isDef(i = hook.postpatch)) {
	      i(oldVnode, vnode);
	    }
	  }

	  return function(oldVnode, vnode) {
	    var i, elm, parent;
	    var insertedVnodeQueue = [];
	    for (i = 0; i < cbs.pre.length; ++i) cbs.pre[i]();

	    if (isUndef(oldVnode.sel)) {
	      oldVnode = emptyNodeAt(oldVnode);
	    }

	    if (sameVnode(oldVnode, vnode)) {
	      patchVnode(oldVnode, vnode, insertedVnodeQueue);
	    } else {
	      elm = oldVnode.elm;
	      parent = api.parentNode(elm);

	      createElm(vnode, insertedVnodeQueue);

	      if (parent !== null) {
	        api.insertBefore(parent, vnode.elm, api.nextSibling(elm));
	        removeVnodes(parent, [oldVnode], 0, 0);
	      }
	    }

	    for (i = 0; i < insertedVnodeQueue.length; ++i) {
	      insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);
	    }
	    for (i = 0; i < cbs.post.length; ++i) cbs.post[i]();
	    return vnode;
	  };
	}

	module.exports = {init: init};


/***/ },
/* 17 */
/***/ function(module, exports) {

	function createElement(tagName){
	  return document.createElement(tagName);
	}

	function createElementNS(namespaceURI, qualifiedName){
	  return document.createElementNS(namespaceURI, qualifiedName);
	}

	function createTextNode(text){
	  return document.createTextNode(text);
	}


	function insertBefore(parentNode, newNode, referenceNode){
	  parentNode.insertBefore(newNode, referenceNode);
	}


	function removeChild(node, child){
	  node.removeChild(child);
	}

	function appendChild(node, child){
	  node.appendChild(child);
	}

	function parentNode(node){
	  return node.parentElement;
	}

	function nextSibling(node){
	  return node.nextSibling;
	}

	function tagName(node){
	  return node.tagName;
	}

	function setTextContent(node, text){
	  node.textContent = text;
	}

	module.exports = {
	  createElement: createElement,
	  createElementNS: createElementNS,
	  createTextNode: createTextNode,
	  appendChild: appendChild,
	  removeChild: removeChild,
	  insertBefore: insertBefore,
	  parentNode: parentNode,
	  nextSibling: nextSibling,
	  tagName: tagName,
	  setTextContent: setTextContent
	};


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var xstream_adapter_1 = __webpack_require__(4);
	var DocumentDOMSource_1 = __webpack_require__(19);
	var BodyDOMSource_1 = __webpack_require__(21);
	var xstream_1 = __webpack_require__(5);
	var ElementFinder_1 = __webpack_require__(22);
	var fromEvent_1 = __webpack_require__(20);
	var isolate_1 = __webpack_require__(26);
	var EventDelegator_1 = __webpack_require__(27);
	var utils_1 = __webpack_require__(24);
	var matchesSelector;
	try {
	    matchesSelector = __webpack_require__(25);
	}
	catch (e) {
	    matchesSelector = Function.prototype;
	}
	var eventTypesThatDontBubble = [
	    "blur",
	    "canplay",
	    "canplaythrough",
	    "change",
	    "durationchange",
	    "emptied",
	    "ended",
	    "focus",
	    "load",
	    "loadeddata",
	    "loadedmetadata",
	    "mouseenter",
	    "mouseleave",
	    "pause",
	    "play",
	    "playing",
	    "ratechange",
	    "reset",
	    "scroll",
	    "seeked",
	    "seeking",
	    "stalled",
	    "submit",
	    "suspend",
	    "timeupdate",
	    "unload",
	    "volumechange",
	    "waiting",
	];
	function determineUseCapture(eventType, options) {
	    var result = false;
	    if (typeof options.useCapture === 'boolean') {
	        result = options.useCapture;
	    }
	    if (eventTypesThatDontBubble.indexOf(eventType) !== -1) {
	        result = true;
	    }
	    return result;
	}
	function filterBasedOnIsolation(domSource, scope) {
	    return function filterBasedOnIsolationOperator(rootElement$) {
	        return rootElement$
	            .fold(function shouldPass(state, element) {
	            var hasIsolated = !!domSource._isolateModule.getIsolatedElement(scope);
	            var shouldPass = hasIsolated && !state.hadIsolatedMutable;
	            return { hadIsolatedMutable: hasIsolated, shouldPass: shouldPass, element: element };
	        }, { hadIsolatedMutable: false, shouldPass: false, element: null })
	            .drop(1)
	            .filter(function (s) { return s.shouldPass; })
	            .map(function (s) { return s.element; });
	    };
	}
	var MainDOMSource = (function () {
	    function MainDOMSource(_rootElement$, _sanitation$, _runStreamAdapter, _namespace, _isolateModule, _delegators, _name) {
	        if (_namespace === void 0) { _namespace = []; }
	        this._rootElement$ = _rootElement$;
	        this._sanitation$ = _sanitation$;
	        this._runStreamAdapter = _runStreamAdapter;
	        this._namespace = _namespace;
	        this._isolateModule = _isolateModule;
	        this._delegators = _delegators;
	        this._name = _name;
	        this.__JANI_EVAKALLIO_WE_WILL_MISS_YOU_PLEASE_COME_BACK_EVENTUALLY = false;
	        this.isolateSource = isolate_1.isolateSource;
	        this.isolateSink = isolate_1.isolateSink;
	        this.__JANI_EVAKALLIO_WE_WILL_MISS_YOU_PLEASE_COME_BACK_EVENTUALLY = true;
	    }
	    MainDOMSource.prototype.elements = function () {
	        var output$;
	        if (this._namespace.length === 0) {
	            output$ = this._rootElement$;
	        }
	        else {
	            var elementFinder_1 = new ElementFinder_1.ElementFinder(this._namespace, this._isolateModule);
	            output$ = this._rootElement$.map(function (el) { return elementFinder_1.call(el); });
	        }
	        var runSA = this._runStreamAdapter;
	        var out = runSA.remember(runSA.adapt(output$, xstream_adapter_1.default.streamSubscribe));
	        out._isCycleSource = this._name;
	        return out;
	    };
	    Object.defineProperty(MainDOMSource.prototype, "namespace", {
	        get: function () {
	            return this._namespace;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    MainDOMSource.prototype.select = function (selector) {
	        if (typeof selector !== 'string') {
	            throw new Error("DOM driver's select() expects the argument to be a " +
	                "string as a CSS selector");
	        }
	        if (selector === 'document') {
	            return new DocumentDOMSource_1.DocumentDOMSource(this._runStreamAdapter, this._name);
	        }
	        if (selector === 'body') {
	            return new BodyDOMSource_1.BodyDOMSource(this._runStreamAdapter, this._name);
	        }
	        var trimmedSelector = selector.trim();
	        var childNamespace = trimmedSelector === ":root" ?
	            this._namespace :
	            this._namespace.concat(trimmedSelector);
	        return new MainDOMSource(this._rootElement$, this._sanitation$, this._runStreamAdapter, childNamespace, this._isolateModule, this._delegators, this._name);
	    };
	    MainDOMSource.prototype.events = function (eventType, options) {
	        if (options === void 0) { options = {}; }
	        if (typeof eventType !== "string") {
	            throw new Error("DOM driver's events() expects argument to be a " +
	                "string representing the event type to listen for.");
	        }
	        var useCapture = determineUseCapture(eventType, options);
	        var namespace = this._namespace;
	        var scope = utils_1.getScope(namespace);
	        var keyParts = [eventType, useCapture];
	        if (scope) {
	            keyParts.push(scope);
	        }
	        var key = keyParts.join('~');
	        var domSource = this;
	        var rootElement$;
	        if (scope) {
	            rootElement$ = this._rootElement$
	                .compose(filterBasedOnIsolation(domSource, scope));
	        }
	        else {
	            rootElement$ = this._rootElement$.take(2);
	        }
	        var event$ = rootElement$
	            .map(function setupEventDelegatorOnTopElement(rootElement) {
	            // Event listener just for the root element
	            if (!namespace || namespace.length === 0) {
	                return fromEvent_1.fromEvent(rootElement, eventType, useCapture);
	            }
	            // Event listener on the top element as an EventDelegator
	            var delegators = domSource._delegators;
	            var top = domSource._isolateModule.getIsolatedElement(scope) || rootElement;
	            var delegator;
	            if (delegators.has(key)) {
	                delegator = delegators.get(key);
	                delegator.updateTopElement(top);
	            }
	            else {
	                delegator = new EventDelegator_1.EventDelegator(top, eventType, useCapture, domSource._isolateModule);
	                delegators.set(key, delegator);
	            }
	            if (scope) {
	                domSource._isolateModule.addEventDelegator(scope, delegator);
	            }
	            var destinationId = delegator.createDestinationId();
	            var subject = xstream_1.default.create({
	                start: function () { },
	                stop: function () {
	                    if ('requestIdleCallback' in window) {
	                        requestIdleCallback(function () {
	                            delegator.removeDestinationId(destinationId);
	                        });
	                    }
	                    else {
	                        delegator.removeDestinationId(destinationId);
	                    }
	                },
	            });
	            delegator.addDestination(subject, namespace, destinationId);
	            return subject;
	        })
	            .flatten();
	        var out = this._runStreamAdapter.adapt(event$, xstream_adapter_1.default.streamSubscribe);
	        out._isCycleSource = domSource._name;
	        return out;
	    };
	    MainDOMSource.prototype.dispose = function () {
	        this._sanitation$.shamefullySendNext('');
	        this._isolateModule.reset();
	    };
	    return MainDOMSource;
	}());
	exports.MainDOMSource = MainDOMSource;
	//# sourceMappingURL=MainDOMSource.js.map

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var xstream_1 = __webpack_require__(5);
	var xstream_adapter_1 = __webpack_require__(4);
	var fromEvent_1 = __webpack_require__(20);
	var DocumentDOMSource = (function () {
	    function DocumentDOMSource(_runStreamAdapter, _name) {
	        this._runStreamAdapter = _runStreamAdapter;
	        this._name = _name;
	    }
	    DocumentDOMSource.prototype.select = function (selector) {
	        // This functionality is still undefined/undecided.
	        return this;
	    };
	    DocumentDOMSource.prototype.elements = function () {
	        var runSA = this._runStreamAdapter;
	        var out = runSA.remember(runSA.adapt(xstream_1.default.of(document), xstream_adapter_1.default.streamSubscribe));
	        out._isCycleSource = this._name;
	        return out;
	    };
	    DocumentDOMSource.prototype.events = function (eventType, options) {
	        if (options === void 0) { options = {}; }
	        var stream;
	        if (options && typeof options.useCapture === 'boolean') {
	            stream = fromEvent_1.fromEvent(document, eventType, options.useCapture);
	        }
	        else {
	            stream = fromEvent_1.fromEvent(document, eventType);
	        }
	        var out = this._runStreamAdapter.adapt(stream, xstream_adapter_1.default.streamSubscribe);
	        out._isCycleSource = this._name;
	        return out;
	    };
	    return DocumentDOMSource;
	}());
	exports.DocumentDOMSource = DocumentDOMSource;
	//# sourceMappingURL=DocumentDOMSource.js.map

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var xstream_1 = __webpack_require__(5);
	function fromEvent(element, eventName, useCapture) {
	    if (useCapture === void 0) { useCapture = false; }
	    return xstream_1.Stream.create({
	        element: element,
	        next: null,
	        start: function start(listener) {
	            this.next = function next(event) { listener.next(event); };
	            this.element.addEventListener(eventName, this.next, useCapture);
	        },
	        stop: function stop() {
	            this.element.removeEventListener(eventName, this.next, useCapture);
	        },
	    });
	}
	exports.fromEvent = fromEvent;
	//# sourceMappingURL=fromEvent.js.map

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var xstream_1 = __webpack_require__(5);
	var xstream_adapter_1 = __webpack_require__(4);
	var fromEvent_1 = __webpack_require__(20);
	var BodyDOMSource = (function () {
	    function BodyDOMSource(_runStreamAdapter, _name) {
	        this._runStreamAdapter = _runStreamAdapter;
	        this._name = _name;
	    }
	    BodyDOMSource.prototype.select = function (selector) {
	        // This functionality is still undefined/undecided.
	        return this;
	    };
	    BodyDOMSource.prototype.elements = function () {
	        var runSA = this._runStreamAdapter;
	        var out = runSA.remember(runSA.adapt(xstream_1.default.of(document.body), xstream_adapter_1.default.streamSubscribe));
	        out._isCycleSource = this._name;
	        return out;
	    };
	    BodyDOMSource.prototype.events = function (eventType, options) {
	        if (options === void 0) { options = {}; }
	        var stream;
	        if (options && typeof options.useCapture === 'boolean') {
	            stream = fromEvent_1.fromEvent(document.body, eventType, options.useCapture);
	        }
	        else {
	            stream = fromEvent_1.fromEvent(document.body, eventType);
	        }
	        var out = this._runStreamAdapter.adapt(stream, xstream_adapter_1.default.streamSubscribe);
	        out._isCycleSource = this._name;
	        return out;
	    };
	    return BodyDOMSource;
	}());
	exports.BodyDOMSource = BodyDOMSource;
	//# sourceMappingURL=BodyDOMSource.js.map

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ScopeChecker_1 = __webpack_require__(23);
	var utils_1 = __webpack_require__(24);
	var matchesSelector;
	try {
	    matchesSelector = __webpack_require__(25);
	}
	catch (e) {
	    matchesSelector = Function.prototype;
	}
	function toElArray(input) {
	    return Array.prototype.slice.call(input);
	}
	var ElementFinder = (function () {
	    function ElementFinder(namespace, isolateModule) {
	        this.namespace = namespace;
	        this.isolateModule = isolateModule;
	    }
	    ElementFinder.prototype.call = function (rootElement) {
	        var namespace = this.namespace;
	        if (namespace.join("") === "") {
	            return rootElement;
	        }
	        var scope = utils_1.getScope(namespace);
	        var scopeChecker = new ScopeChecker_1.ScopeChecker(scope, this.isolateModule);
	        var selector = utils_1.getSelectors(namespace);
	        var topNode = rootElement;
	        var topNodeMatches = [];
	        if (scope.length > 0) {
	            topNode = this.isolateModule.getIsolatedElement(scope) || rootElement;
	            if (selector && matchesSelector(topNode, selector)) {
	                topNodeMatches.push(topNode);
	            }
	        }
	        return toElArray(topNode.querySelectorAll(selector))
	            .filter(scopeChecker.isStrictlyInRootScope, scopeChecker)
	            .concat(topNodeMatches);
	    };
	    return ElementFinder;
	}());
	exports.ElementFinder = ElementFinder;
	//# sourceMappingURL=ElementFinder.js.map

/***/ },
/* 23 */
/***/ function(module, exports) {

	"use strict";
	var ScopeChecker = (function () {
	    function ScopeChecker(scope, isolateModule) {
	        this.scope = scope;
	        this.isolateModule = isolateModule;
	    }
	    ScopeChecker.prototype.isStrictlyInRootScope = function (leaf) {
	        for (var el = leaf; el; el = el.parentElement) {
	            var scope = this.isolateModule.isIsolatedElement(el);
	            if (scope && scope !== this.scope) {
	                return false;
	            }
	            if (scope) {
	                return true;
	            }
	        }
	        return true;
	    };
	    return ScopeChecker;
	}());
	exports.ScopeChecker = ScopeChecker;
	//# sourceMappingURL=ScopeChecker.js.map

/***/ },
/* 24 */
/***/ function(module, exports) {

	"use strict";
	function isElement(obj) {
	    return typeof HTMLElement === "object" ?
	        obj instanceof HTMLElement || obj instanceof DocumentFragment :
	        obj && typeof obj === "object" && obj !== null &&
	            (obj.nodeType === 1 || obj.nodeType === 11) &&
	            typeof obj.nodeName === "string";
	}
	exports.SCOPE_PREFIX = "$$CYCLEDOM$$-";
	function getElement(selectors) {
	    var domElement = typeof selectors === 'string' ?
	        document.querySelector(selectors) :
	        selectors;
	    if (typeof selectors === 'string' && domElement === null) {
	        throw new Error("Cannot render into unknown element `" + selectors + "`");
	    }
	    else if (!isElement(domElement)) {
	        throw new Error("Given container is not a DOM element neither a " +
	            "selector string.");
	    }
	    return domElement;
	}
	exports.getElement = getElement;
	function getScope(namespace) {
	    return namespace
	        .filter(function (c) { return c.indexOf(exports.SCOPE_PREFIX) > -1; })
	        .slice(-1) // only need the latest, most specific, isolated boundary
	        .join("");
	}
	exports.getScope = getScope;
	function getSelectors(namespace) {
	    return namespace.filter(function (c) { return c.indexOf(exports.SCOPE_PREFIX) === -1; }).join(" ");
	}
	exports.getSelectors = getSelectors;
	//# sourceMappingURL=utils.js.map

/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';

	var proto = Element.prototype;
	var vendor = proto.matches
	  || proto.matchesSelector
	  || proto.webkitMatchesSelector
	  || proto.mozMatchesSelector
	  || proto.msMatchesSelector
	  || proto.oMatchesSelector;

	module.exports = match;

	/**
	 * Match `el` to `selector`.
	 *
	 * @param {Element} el
	 * @param {String} selector
	 * @return {Boolean}
	 * @api public
	 */

	function match(el, selector) {
	  if (vendor) return vendor.call(el, selector);
	  var nodes = el.parentNode.querySelectorAll(selector);
	  for (var i = 0; i < nodes.length; i++) {
	    if (nodes[i] == el) return true;
	  }
	  return false;
	}

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var utils_1 = __webpack_require__(24);
	function isolateSource(source, scope) {
	    return source.select(utils_1.SCOPE_PREFIX + scope);
	}
	exports.isolateSource = isolateSource;
	function isolateSink(sink, scope) {
	    return sink.map(function (vTree) {
	        if (vTree.data && vTree.data.isolate) {
	            var existingScope = parseInt(vTree.data.isolate.split(utils_1.SCOPE_PREFIX + 'cycle')[1]);
	            var _scope = parseInt(scope.split('cycle')[1]);
	            if (isNaN(existingScope) || isNaN(_scope) || existingScope > _scope) {
	                return vTree;
	            }
	        }
	        vTree.data = vTree.data || {};
	        vTree.data.isolate = utils_1.SCOPE_PREFIX + scope;
	        if (typeof vTree.key === 'undefined') {
	            vTree.key = utils_1.SCOPE_PREFIX + scope;
	        }
	        return vTree;
	    });
	}
	exports.isolateSink = isolateSink;
	//# sourceMappingURL=isolate.js.map

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ScopeChecker_1 = __webpack_require__(23);
	var utils_1 = __webpack_require__(24);
	var matchesSelector;
	try {
	    matchesSelector = __webpack_require__(25);
	}
	catch (e) {
	    matchesSelector = Function.prototype;
	}
	var gDestinationId = 0;
	function findDestinationId(arr, searchId) {
	    var minIndex = 0;
	    var maxIndex = arr.length - 1;
	    var currentIndex;
	    var currentElement;
	    while (minIndex <= maxIndex) {
	        currentIndex = (minIndex + maxIndex) / 2 | 0; // tslint:disable-line:no-bitwise
	        currentElement = arr[currentIndex];
	        var currentId = currentElement.destinationId;
	        if (currentId < searchId) {
	            minIndex = currentIndex + 1;
	        }
	        else if (currentId > searchId) {
	            maxIndex = currentIndex - 1;
	        }
	        else {
	            return currentIndex;
	        }
	    }
	    return -1;
	}
	/**
	 * Attaches an actual event listener to the DOM root element,
	 * handles "destinations" (interested DOMSource output subjects), and bubbling.
	 */
	var EventDelegator = (function () {
	    function EventDelegator(topElement, eventType, useCapture, isolateModule) {
	        var _this = this;
	        this.topElement = topElement;
	        this.eventType = eventType;
	        this.useCapture = useCapture;
	        this.isolateModule = isolateModule;
	        this.destinations = [];
	        this.roof = topElement.parentElement;
	        if (useCapture) {
	            this.domListener = function (ev) { return _this.capture(ev); };
	        }
	        else {
	            this.domListener = function (ev) { return _this.bubble(ev); };
	        }
	        topElement.addEventListener(eventType, this.domListener, useCapture);
	    }
	    EventDelegator.prototype.bubble = function (rawEvent) {
	        if (!document.body.contains(rawEvent.currentTarget)) {
	            return;
	        }
	        var ev = this.patchEvent(rawEvent);
	        for (var el = ev.target; el && el !== this.roof; el = el.parentElement) {
	            if (!document.body.contains(el)) {
	                ev.stopPropagation();
	            }
	            if (ev.propagationHasBeenStopped) {
	                return;
	            }
	            this.matchEventAgainstDestinations(el, ev);
	        }
	    };
	    EventDelegator.prototype.matchEventAgainstDestinations = function (el, ev) {
	        for (var i = 0, n = this.destinations.length; i < n; i++) {
	            var dest = this.destinations[i];
	            if (!dest.scopeChecker.isStrictlyInRootScope(el)) {
	                continue;
	            }
	            if (matchesSelector(el, dest.selector)) {
	                this.mutateEventCurrentTarget(ev, el);
	                dest.subject._n(ev);
	            }
	        }
	    };
	    EventDelegator.prototype.capture = function (ev) {
	        for (var i = 0, n = this.destinations.length; i < n; i++) {
	            var dest = this.destinations[i];
	            if (matchesSelector(ev.target, dest.selector)) {
	                dest.subject._n(ev);
	            }
	        }
	    };
	    EventDelegator.prototype.addDestination = function (subject, namespace, destinationId) {
	        var scope = utils_1.getScope(namespace);
	        var selector = utils_1.getSelectors(namespace);
	        var scopeChecker = new ScopeChecker_1.ScopeChecker(scope, this.isolateModule);
	        this.destinations.push({ subject: subject, scopeChecker: scopeChecker, selector: selector, destinationId: destinationId });
	    };
	    EventDelegator.prototype.createDestinationId = function () {
	        return gDestinationId++;
	    };
	    EventDelegator.prototype.removeDestinationId = function (destinationId) {
	        var i = findDestinationId(this.destinations, destinationId);
	        if (i >= 0) {
	            this.destinations.splice(i, 1);
	        }
	    };
	    EventDelegator.prototype.patchEvent = function (event) {
	        var pEvent = event;
	        pEvent.propagationHasBeenStopped = false;
	        var oldStopPropagation = pEvent.stopPropagation;
	        pEvent.stopPropagation = function stopPropagation() {
	            oldStopPropagation.call(this);
	            this.propagationHasBeenStopped = true;
	        };
	        return pEvent;
	    };
	    EventDelegator.prototype.mutateEventCurrentTarget = function (event, currentTargetElement) {
	        try {
	            Object.defineProperty(event, "currentTarget", {
	                value: currentTargetElement,
	                configurable: true,
	            });
	        }
	        catch (err) {
	            console.log("please use event.ownerTarget");
	        }
	        event.ownerTarget = currentTargetElement;
	    };
	    EventDelegator.prototype.updateTopElement = function (newTopElement) {
	        this.topElement.removeEventListener(this.eventType, this.domListener, this.useCapture);
	        newTopElement.addEventListener(this.eventType, this.domListener, this.useCapture);
	        this.topElement = newTopElement;
	    };
	    return EventDelegator;
	}());
	exports.EventDelegator = EventDelegator;
	//# sourceMappingURL=EventDelegator.js.map

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var hyperscript_1 = __webpack_require__(29);
	var classNameFromVNode_1 = __webpack_require__(30);
	var selectorParser_1 = __webpack_require__(31);
	var VNodeWrapper = (function () {
	    function VNodeWrapper(rootElement) {
	        this.rootElement = rootElement;
	    }
	    VNodeWrapper.prototype.call = function (vnode) {
	        var _a = selectorParser_1.default(vnode.sel), selectorTagName = _a.tagName, selectorId = _a.id;
	        var vNodeClassName = classNameFromVNode_1.default(vnode);
	        var vNodeData = vnode.data || {};
	        var vNodeDataProps = vNodeData.props || {};
	        var _b = vNodeDataProps.id, vNodeId = _b === void 0 ? selectorId : _b;
	        var isVNodeAndRootElementIdentical = vNodeId.toUpperCase() === this.rootElement.id.toUpperCase() &&
	            selectorTagName.toUpperCase() === this.rootElement.tagName.toUpperCase() &&
	            vNodeClassName.toUpperCase() === this.rootElement.className.toUpperCase();
	        if (isVNodeAndRootElementIdentical) {
	            return vnode;
	        }
	        var _c = this.rootElement, tagName = _c.tagName, id = _c.id, className = _c.className;
	        var elementId = id ? "#" + id : "";
	        var elementClassName = className ?
	            "." + className.split(" ").join(".") : "";
	        return hyperscript_1.h("" + tagName.toLowerCase() + elementId + elementClassName, {}, [
	            vnode,
	        ]);
	    };
	    return VNodeWrapper;
	}());
	exports.VNodeWrapper = VNodeWrapper;
	//# sourceMappingURL=VNodeWrapper.js.map

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var is = __webpack_require__(14);
	var vnode = __webpack_require__(13);
	function isGenericStream(x) {
	    return !Array.isArray(x) && typeof x.map === "function";
	}
	function mutateStreamWithNS(vNode) {
	    addNS(vNode.data, vNode.children, vNode.sel);
	    return vNode;
	}
	function addNS(data, children, selector) {
	    data.ns = "http://www.w3.org/2000/svg";
	    if (selector !== "foreignObject" && typeof children !== 'undefined' && is.array(children)) {
	        for (var i = 0; i < children.length; ++i) {
	            if (isGenericStream(children[i])) {
	                children[i] = children[i].map(mutateStreamWithNS);
	            }
	            else {
	                addNS(children[i].data, children[i].children, children[i].sel);
	            }
	        }
	    }
	}
	function h(sel, b, c) {
	    var data = {};
	    var children;
	    var text;
	    if (arguments.length === 3) {
	        data = b;
	        if (is.array(c)) {
	            children = c;
	        }
	        else if (is.primitive(c)) {
	            text = c;
	        }
	    }
	    else if (arguments.length === 2) {
	        if (is.array(b)) {
	            children = b;
	        }
	        else if (is.primitive(b)) {
	            text = b;
	        }
	        else {
	            data = b;
	        }
	    }
	    if (is.array(children)) {
	        children = children.filter(function (x) { return x; });
	        for (var i = 0; i < children.length; ++i) {
	            if (is.primitive(children[i])) {
	                children[i] = vnode(undefined, undefined, undefined, children[i]);
	            }
	        }
	    }
	    if (sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g') {
	        addNS(data, children, sel);
	    }
	    return vnode(sel, data, children, text, undefined);
	}
	exports.h = h;
	;
	//# sourceMappingURL=hyperscript.js.map

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = classNameFromVNode;

	var _selectorParser2 = __webpack_require__(31);

	var _selectorParser3 = _interopRequireDefault(_selectorParser2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function classNameFromVNode(vNode) {
	  var _selectorParser = (0, _selectorParser3.default)(vNode.sel);

	  var cn = _selectorParser.className;


	  if (!vNode.data) {
	    return cn;
	  }

	  var _vNode$data = vNode.data;
	  var dataClass = _vNode$data.class;
	  var props = _vNode$data.props;


	  if (dataClass) {
	    var c = Object.keys(vNode.data.class).filter(function (cl) {
	      return vNode.data.class[cl];
	    });
	    cn += ' ' + c.join(' ');
	  }

	  if (props && props.className) {
	    cn += ' ' + props.className;
	  }

	  return cn.trim();
	}

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = selectorParser;

	var _browserSplit = __webpack_require__(32);

	var _browserSplit2 = _interopRequireDefault(_browserSplit);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var classIdSplit = /([\.#]?[a-zA-Z0-9\u007F-\uFFFF_:-]+)/;
	var notClassId = /^\.|#/;

	function selectorParser() {
	  var selector = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

	  var tagName = void 0;
	  var id = '';
	  var classes = [];

	  var tagParts = (0, _browserSplit2.default)(selector, classIdSplit);

	  if (notClassId.test(tagParts[1]) || selector === '') {
	    tagName = 'div';
	  }

	  var part = void 0;
	  var type = void 0;
	  var i = void 0;

	  for (i = 0; i < tagParts.length; i++) {
	    part = tagParts[i];

	    if (!part) {
	      continue;
	    }

	    type = part.charAt(0);

	    if (!tagName) {
	      tagName = part;
	    } else if (type === '.') {
	      classes.push(part.substring(1, part.length));
	    } else if (type === '#') {
	      id = part.substring(1, part.length);
	    }
	  }

	  return {
	    tagName: tagName,
	    id: id,
	    className: classes.join(' ')
	  };
	}

/***/ },
/* 32 */
/***/ function(module, exports) {

	/*!
	 * Cross-Browser Split 1.1.1
	 * Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
	 * Available under the MIT License
	 * ECMAScript compliant, uniform cross-browser split method
	 */

	/**
	 * Splits a string into an array of strings using a regex or string separator. Matches of the
	 * separator are not included in the result array. However, if `separator` is a regex that contains
	 * capturing groups, backreferences are spliced into the result each time `separator` is matched.
	 * Fixes browser bugs compared to the native `String.prototype.split` and can be used reliably
	 * cross-browser.
	 * @param {String} str String to split.
	 * @param {RegExp|String} separator Regex or string to use for separating the string.
	 * @param {Number} [limit] Maximum number of items to include in the result array.
	 * @returns {Array} Array of substrings.
	 * @example
	 *
	 * // Basic use
	 * split('a b c d', ' ');
	 * // -> ['a', 'b', 'c', 'd']
	 *
	 * // With limit
	 * split('a b c d', ' ', 2);
	 * // -> ['a', 'b']
	 *
	 * // Backreferences in result array
	 * split('..word1 word2..', /([a-z]+)(\d+)/i);
	 * // -> ['..', 'word', '1', ' ', 'word', '2', '..']
	 */
	module.exports = (function split(undef) {

	  var nativeSplit = String.prototype.split,
	    compliantExecNpcg = /()??/.exec("")[1] === undef,
	    // NPCG: nonparticipating capturing group
	    self;

	  self = function(str, separator, limit) {
	    // If `separator` is not a regex, use `nativeSplit`
	    if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
	      return nativeSplit.call(str, separator, limit);
	    }
	    var output = [],
	      flags = (separator.ignoreCase ? "i" : "") + (separator.multiline ? "m" : "") + (separator.extended ? "x" : "") + // Proposed for ES6
	      (separator.sticky ? "y" : ""),
	      // Firefox 3+
	      lastLastIndex = 0,
	      // Make `global` and avoid `lastIndex` issues by working with a copy
	      separator = new RegExp(separator.source, flags + "g"),
	      separator2, match, lastIndex, lastLength;
	    str += ""; // Type-convert
	    if (!compliantExecNpcg) {
	      // Doesn't need flags gy, but they don't hurt
	      separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
	    }
	    /* Values for `limit`, per the spec:
	     * If undefined: 4294967295 // Math.pow(2, 32) - 1
	     * If 0, Infinity, or NaN: 0
	     * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
	     * If negative number: 4294967296 - Math.floor(Math.abs(limit))
	     * If other: Type-convert, then use the above rules
	     */
	    limit = limit === undef ? -1 >>> 0 : // Math.pow(2, 32) - 1
	    limit >>> 0; // ToUint32(limit)
	    while (match = separator.exec(str)) {
	      // `separator.lastIndex` is not reliable cross-browser
	      lastIndex = match.index + match[0].length;
	      if (lastIndex > lastLastIndex) {
	        output.push(str.slice(lastLastIndex, match.index));
	        // Fix browsers whose `exec` methods don't consistently return `undefined` for
	        // nonparticipating capturing groups
	        if (!compliantExecNpcg && match.length > 1) {
	          match[0].replace(separator2, function() {
	            for (var i = 1; i < arguments.length - 2; i++) {
	              if (arguments[i] === undef) {
	                match[i] = undef;
	              }
	            }
	          });
	        }
	        if (match.length > 1 && match.index < str.length) {
	          Array.prototype.push.apply(output, match.slice(1));
	        }
	        lastLength = match[0].length;
	        lastLastIndex = lastIndex;
	        if (output.length >= limit) {
	          break;
	        }
	      }
	      if (separator.lastIndex === match.index) {
	        separator.lastIndex++; // Avoid an infinite loop
	      }
	    }
	    if (lastLastIndex === str.length) {
	      if (lastLength || !separator.test("")) {
	        output.push("");
	      }
	    } else {
	      output.push(str.slice(lastLastIndex));
	    }
	    return output.length > limit ? output.slice(0, limit) : output;
	  };

	  return self;
	})();


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ClassModule = __webpack_require__(34);
	exports.ClassModule = ClassModule;
	var PropsModule = __webpack_require__(35);
	exports.PropsModule = PropsModule;
	var AttrsModule = __webpack_require__(36);
	exports.AttrsModule = AttrsModule;
	var EventsModule = __webpack_require__(37);
	exports.EventsModule = EventsModule;
	var StyleModule = __webpack_require__(38);
	exports.StyleModule = StyleModule;
	var HeroModule = __webpack_require__(39);
	exports.HeroModule = HeroModule;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = [StyleModule, ClassModule, PropsModule, AttrsModule];
	//# sourceMappingURL=modules.js.map

/***/ },
/* 34 */
/***/ function(module, exports) {

	function updateClass(oldVnode, vnode) {
	  var cur, name, elm = vnode.elm,
	      oldClass = oldVnode.data.class || {},
	      klass = vnode.data.class || {};
	  for (name in oldClass) {
	    if (!klass[name]) {
	      elm.classList.remove(name);
	    }
	  }
	  for (name in klass) {
	    cur = klass[name];
	    if (cur !== oldClass[name]) {
	      elm.classList[cur ? 'add' : 'remove'](name);
	    }
	  }
	}

	module.exports = {create: updateClass, update: updateClass};


/***/ },
/* 35 */
/***/ function(module, exports) {

	function updateProps(oldVnode, vnode) {
	  var key, cur, old, elm = vnode.elm,
	      oldProps = oldVnode.data.props || {}, props = vnode.data.props || {};
	  for (key in oldProps) {
	    if (!props[key]) {
	      delete elm[key];
	    }
	  }
	  for (key in props) {
	    cur = props[key];
	    old = oldProps[key];
	    if (old !== cur && (key !== 'value' || elm[key] !== cur)) {
	      elm[key] = cur;
	    }
	  }
	}

	module.exports = {create: updateProps, update: updateProps};


/***/ },
/* 36 */
/***/ function(module, exports) {

	var booleanAttrs = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "compact", "controls", "declare", 
	                "default", "defaultchecked", "defaultmuted", "defaultselected", "defer", "disabled", "draggable", 
	                "enabled", "formnovalidate", "hidden", "indeterminate", "inert", "ismap", "itemscope", "loop", "multiple", 
	                "muted", "nohref", "noresize", "noshade", "novalidate", "nowrap", "open", "pauseonexit", "readonly", 
	                "required", "reversed", "scoped", "seamless", "selected", "sortable", "spellcheck", "translate", 
	                "truespeed", "typemustmatch", "visible"];
	    
	var booleanAttrsDict = {};
	for(var i=0, len = booleanAttrs.length; i < len; i++) {
	  booleanAttrsDict[booleanAttrs[i]] = true;
	}
	    
	function updateAttrs(oldVnode, vnode) {
	  var key, cur, old, elm = vnode.elm,
	      oldAttrs = oldVnode.data.attrs || {}, attrs = vnode.data.attrs || {};
	  
	  // update modified attributes, add new attributes
	  for (key in attrs) {
	    cur = attrs[key];
	    old = oldAttrs[key];
	    if (old !== cur) {
	      // TODO: add support to namespaced attributes (setAttributeNS)
	      if(!cur && booleanAttrsDict[key])
	        elm.removeAttribute(key);
	      else
	        elm.setAttribute(key, cur);
	    }
	  }
	  //remove removed attributes
	  // use `in` operator since the previous `for` iteration uses it (.i.e. add even attributes with undefined value)
	  // the other option is to remove all attributes with value == undefined
	  for (key in oldAttrs) {
	    if (!(key in attrs)) {
	      elm.removeAttribute(key);
	    }
	  }
	}

	module.exports = {create: updateAttrs, update: updateAttrs};


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var is = __webpack_require__(14);

	function arrInvoker(arr) {
	  return function() {
	    if (!arr.length) return;
	    // Special case when length is two, for performance
	    arr.length === 2 ? arr[0](arr[1]) : arr[0].apply(undefined, arr.slice(1));
	  };
	}

	function fnInvoker(o) {
	  return function(ev) { 
	    if (o.fn === null) return;
	    o.fn(ev); 
	  };
	}

	function updateEventListeners(oldVnode, vnode) {
	  var name, cur, old, elm = vnode.elm,
	      oldOn = oldVnode.data.on || {}, on = vnode.data.on;
	  if (!on) return;
	  for (name in on) {
	    cur = on[name];
	    old = oldOn[name];
	    if (old === undefined) {
	      if (is.array(cur)) {
	        elm.addEventListener(name, arrInvoker(cur));
	      } else {
	        cur = {fn: cur};
	        on[name] = cur;
	        elm.addEventListener(name, fnInvoker(cur));
	      }
	    } else if (is.array(old)) {
	      // Deliberately modify old array since it's captured in closure created with `arrInvoker`
	      old.length = cur.length;
	      for (var i = 0; i < old.length; ++i) old[i] = cur[i];
	      on[name]  = old;
	    } else {
	      old.fn = cur;
	      on[name] = old;
	    }
	  }
	  if (oldOn) {
	    for (name in oldOn) {
	      if (on[name] === undefined) {
	        var old = oldOn[name];
	        if (is.array(old)) {
	          old.length = 0;
	        }
	        else {
	          old.fn = null;
	        }
	      }
	    }
	  }
	}

	module.exports = {create: updateEventListeners, update: updateEventListeners};


/***/ },
/* 38 */
/***/ function(module, exports) {

	var raf = (typeof window !== 'undefined' && window.requestAnimationFrame) || setTimeout;
	var nextFrame = function(fn) { raf(function() { raf(fn); }); };

	function setNextFrame(obj, prop, val) {
	  nextFrame(function() { obj[prop] = val; });
	}

	function updateStyle(oldVnode, vnode) {
	  var cur, name, elm = vnode.elm,
	      oldStyle = oldVnode.data.style || {},
	      style = vnode.data.style || {},
	      oldHasDel = 'delayed' in oldStyle;
	  for (name in oldStyle) {
	    if (!style[name]) {
	      elm.style[name] = '';
	    }
	  }
	  for (name in style) {
	    cur = style[name];
	    if (name === 'delayed') {
	      for (name in style.delayed) {
	        cur = style.delayed[name];
	        if (!oldHasDel || cur !== oldStyle.delayed[name]) {
	          setNextFrame(elm.style, name, cur);
	        }
	      }
	    } else if (name !== 'remove' && cur !== oldStyle[name]) {
	      elm.style[name] = cur;
	    }
	  }
	}

	function applyDestroyStyle(vnode) {
	  var style, name, elm = vnode.elm, s = vnode.data.style;
	  if (!s || !(style = s.destroy)) return;
	  for (name in style) {
	    elm.style[name] = style[name];
	  }
	}

	function applyRemoveStyle(vnode, rm) {
	  var s = vnode.data.style;
	  if (!s || !s.remove) {
	    rm();
	    return;
	  }
	  var name, elm = vnode.elm, idx, i = 0, maxDur = 0,
	      compStyle, style = s.remove, amount = 0, applied = [];
	  for (name in style) {
	    applied.push(name);
	    elm.style[name] = style[name];
	  }
	  compStyle = getComputedStyle(elm);
	  var props = compStyle['transition-property'].split(', ');
	  for (; i < props.length; ++i) {
	    if(applied.indexOf(props[i]) !== -1) amount++;
	  }
	  elm.addEventListener('transitionend', function(ev) {
	    if (ev.target === elm) --amount;
	    if (amount === 0) rm();
	  });
	}

	module.exports = {create: updateStyle, update: updateStyle, destroy: applyDestroyStyle, remove: applyRemoveStyle};


/***/ },
/* 39 */
/***/ function(module, exports) {

	var raf = (typeof window !== 'undefined' && window.requestAnimationFrame) || setTimeout;
	var nextFrame = function(fn) { raf(function() { raf(fn); }); };

	function setNextFrame(obj, prop, val) {
	  nextFrame(function() { obj[prop] = val; });
	}

	function getTextNodeRect(textNode) {
	  var rect;
	  if (document.createRange) {
	    var range = document.createRange();
	    range.selectNodeContents(textNode);
	    if (range.getBoundingClientRect) {
	        rect = range.getBoundingClientRect();
	    }
	  }
	  return rect;
	}

	function calcTransformOrigin(isTextNode, textRect, boundingRect) {
	  if (isTextNode) {
	    if (textRect) {
	      //calculate pixels to center of text from left edge of bounding box
	      var relativeCenterX = textRect.left + textRect.width/2 - boundingRect.left;
	      var relativeCenterY = textRect.top + textRect.height/2 - boundingRect.top;
	      return relativeCenterX + 'px ' + relativeCenterY + 'px';
	    }
	  }
	  return '0 0'; //top left
	}

	function getTextDx(oldTextRect, newTextRect) {
	  if (oldTextRect && newTextRect) {
	    return ((oldTextRect.left + oldTextRect.width/2) - (newTextRect.left + newTextRect.width/2));
	  }
	  return 0;
	}
	function getTextDy(oldTextRect, newTextRect) {
	  if (oldTextRect && newTextRect) {
	    return ((oldTextRect.top + oldTextRect.height/2) - (newTextRect.top + newTextRect.height/2));
	  }
	  return 0;
	}

	function isTextElement(elm) {
	  return elm.childNodes.length === 1 && elm.childNodes[0].nodeType === 3;
	}

	var removed, created;

	function pre(oldVnode, vnode) {
	  removed = {};
	  created = [];
	}

	function create(oldVnode, vnode) {
	  var hero = vnode.data.hero;
	  if (hero && hero.id) {
	    created.push(hero.id);
	    created.push(vnode);
	  }
	}

	function destroy(vnode) {
	  var hero = vnode.data.hero;
	  if (hero && hero.id) {
	    var elm = vnode.elm;
	    vnode.isTextNode = isTextElement(elm); //is this a text node?
	    vnode.boundingRect = elm.getBoundingClientRect(); //save the bounding rectangle to a new property on the vnode
	    vnode.textRect = vnode.isTextNode ? getTextNodeRect(elm.childNodes[0]) : null; //save bounding rect of inner text node
	    var computedStyle = window.getComputedStyle(elm, null); //get current styles (includes inherited properties)
	    vnode.savedStyle = JSON.parse(JSON.stringify(computedStyle)); //save a copy of computed style values
	    removed[hero.id] = vnode;
	  }
	}

	function post() {
	  var i, id, newElm, oldVnode, oldElm, hRatio, wRatio,
	      oldRect, newRect, dx, dy, origTransform, origTransition,
	      newStyle, oldStyle, newComputedStyle, isTextNode,
	      newTextRect, oldTextRect;
	  for (i = 0; i < created.length; i += 2) {
	    id = created[i];
	    newElm = created[i+1].elm;
	    oldVnode = removed[id];
	    if (oldVnode) {
	      isTextNode = oldVnode.isTextNode && isTextElement(newElm); //Are old & new both text?
	      newStyle = newElm.style;
	      newComputedStyle = window.getComputedStyle(newElm, null); //get full computed style for new element
	      oldElm = oldVnode.elm;
	      oldStyle = oldElm.style;
	      //Overall element bounding boxes
	      newRect = newElm.getBoundingClientRect();
	      oldRect = oldVnode.boundingRect; //previously saved bounding rect
	      //Text node bounding boxes & distances
	      if (isTextNode) {
	        newTextRect = getTextNodeRect(newElm.childNodes[0]);
	        oldTextRect = oldVnode.textRect;
	        dx = getTextDx(oldTextRect, newTextRect);
	        dy = getTextDy(oldTextRect, newTextRect);
	      } else {
	        //Calculate distances between old & new positions
	        dx = oldRect.left - newRect.left;
	        dy = oldRect.top - newRect.top;
	      }
	      hRatio = newRect.height / (Math.max(oldRect.height, 1));
	      wRatio = isTextNode ? hRatio : newRect.width / (Math.max(oldRect.width, 1)); //text scales based on hRatio
	      // Animate new element
	      origTransform = newStyle.transform;
	      origTransition = newStyle.transition;
	      if (newComputedStyle.display === 'inline') //inline elements cannot be transformed
	        newStyle.display = 'inline-block';        //this does not appear to have any negative side effects
	      newStyle.transition = origTransition + 'transform 0s';
	      newStyle.transformOrigin = calcTransformOrigin(isTextNode, newTextRect, newRect);
	      newStyle.opacity = '0';
	      newStyle.transform = origTransform + 'translate('+dx+'px, '+dy+'px) ' +
	                               'scale('+1/wRatio+', '+1/hRatio+')';
	      setNextFrame(newStyle, 'transition', origTransition);
	      setNextFrame(newStyle, 'transform', origTransform);
	      setNextFrame(newStyle, 'opacity', '1');
	      // Animate old element
	      for (var key in oldVnode.savedStyle) { //re-apply saved inherited properties
	        if (parseInt(key) != key) {
	          var ms = key.substring(0,2) === 'ms';
	          var moz = key.substring(0,3) === 'moz';
	          var webkit = key.substring(0,6) === 'webkit';
	      	  if (!ms && !moz && !webkit) //ignore prefixed style properties
	        	  oldStyle[key] = oldVnode.savedStyle[key];
	        }
	      }
	      oldStyle.position = 'absolute';
	      oldStyle.top = oldRect.top + 'px'; //start at existing position
	      oldStyle.left = oldRect.left + 'px';
	      oldStyle.width = oldRect.width + 'px'; //Needed for elements who were sized relative to their parents
	      oldStyle.height = oldRect.height + 'px'; //Needed for elements who were sized relative to their parents
	      oldStyle.margin = 0; //Margin on hero element leads to incorrect positioning
	      oldStyle.transformOrigin = calcTransformOrigin(isTextNode, oldTextRect, oldRect);
	      oldStyle.transform = '';
	      oldStyle.opacity = '1';
	      document.body.appendChild(oldElm);
	      setNextFrame(oldStyle, 'transform', 'translate('+ -dx +'px, '+ -dy +'px) scale('+wRatio+', '+hRatio+')'); //scale must be on far right for translate to be correct
	      setNextFrame(oldStyle, 'opacity', '0');
	      oldElm.addEventListener('transitionend', function(ev) {
	        if (ev.propertyName === 'transform')
	          document.body.removeChild(ev.target);
	      });
	    }
	  }
	  removed = created = undefined;
	}

	module.exports = {pre: pre, create: create, destroy: destroy, post: post};


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var MapPolyfill = __webpack_require__(41);
	var IsolateModule = (function () {
	    function IsolateModule(isolatedElements) {
	        this.isolatedElements = isolatedElements;
	        this.eventDelegators = new MapPolyfill();
	    }
	    IsolateModule.prototype.setScope = function (elm, scope) {
	        this.isolatedElements.set(scope, elm);
	    };
	    IsolateModule.prototype.removeScope = function (scope) {
	        this.isolatedElements.delete(scope);
	    };
	    IsolateModule.prototype.cleanupVNode = function (_a) {
	        var data = _a.data, elm = _a.elm;
	        data = data || {};
	        var scope = data.isolate || '';
	        var isCurrentElm = this.isolatedElements.get(scope) === elm;
	        if (scope && isCurrentElm) {
	            this.removeScope(scope);
	            if (this.eventDelegators.get(scope)) {
	                this.eventDelegators.set(scope, []);
	            }
	        }
	    };
	    IsolateModule.prototype.getIsolatedElement = function (scope) {
	        return this.isolatedElements.get(scope);
	    };
	    IsolateModule.prototype.isIsolatedElement = function (elm) {
	        var iterator = this.isolatedElements.entries();
	        for (var result = iterator.next(); !!result.value; result = iterator.next()) {
	            var _a = result.value, scope = _a[0], element = _a[1];
	            if (elm === element) {
	                return scope;
	            }
	        }
	        return false;
	    };
	    IsolateModule.prototype.addEventDelegator = function (scope, eventDelegator) {
	        var delegators = this.eventDelegators.get(scope);
	        if (!delegators) {
	            delegators = [];
	            this.eventDelegators.set(scope, delegators);
	        }
	        delegators[delegators.length] = eventDelegator;
	    };
	    IsolateModule.prototype.reset = function () {
	        this.isolatedElements.clear();
	    };
	    IsolateModule.prototype.createModule = function () {
	        var self = this;
	        return {
	            create: function (oldVNode, vNode) {
	                var _a = oldVNode.data, oldData = _a === void 0 ? {} : _a;
	                var elm = vNode.elm, _b = vNode.data, data = _b === void 0 ? {} : _b;
	                var oldScope = oldData.isolate || "";
	                var scope = data.isolate || "";
	                if (scope) {
	                    if (oldScope) {
	                        self.removeScope(oldScope);
	                    }
	                    self.setScope(elm, scope);
	                    var delegators = self.eventDelegators.get(scope);
	                    if (delegators) {
	                        for (var i = 0, len = delegators.length; i < len; ++i) {
	                            delegators[i].updateTopElement(elm);
	                        }
	                    }
	                    else if (delegators === void 0) {
	                        self.eventDelegators.set(scope, []);
	                    }
	                }
	                if (oldScope && !scope) {
	                    self.removeScope(scope);
	                }
	            },
	            update: function (oldVNode, vNode) {
	                var _a = oldVNode.data, oldData = _a === void 0 ? {} : _a;
	                var elm = vNode.elm, _b = vNode.data, data = _b === void 0 ? {} : _b;
	                var oldScope = oldData.isolate || "";
	                var scope = data.isolate || "";
	                if (scope && scope !== oldScope) {
	                    if (oldScope) {
	                        self.removeScope(oldScope);
	                    }
	                    self.setScope(elm, scope);
	                }
	                if (oldScope && !scope) {
	                    self.removeScope(scope);
	                }
	            },
	            remove: function (vNode, cb) {
	                self.cleanupVNode(vNode);
	                cb();
	            },
	            destroy: function (vNode) {
	                self.cleanupVNode(vNode);
	            },
	        };
	    };
	    return IsolateModule;
	}());
	exports.IsolateModule = IsolateModule;
	//# sourceMappingURL=isolateModule.js.map

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(42)() ? Map : __webpack_require__(43);


/***/ },
/* 42 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function () {
		var map, iterator, result;
		if (typeof Map !== 'function') return false;
		try {
			// WebKit doesn't support arguments and crashes
			map = new Map([['raz', 'one'], ['dwa', 'two'], ['trzy', 'three']]);
		} catch (e) {
			return false;
		}
		if (String(map) !== '[object Map]') return false;
		if (map.size !== 3) return false;
		if (typeof map.clear !== 'function') return false;
		if (typeof map.delete !== 'function') return false;
		if (typeof map.entries !== 'function') return false;
		if (typeof map.forEach !== 'function') return false;
		if (typeof map.get !== 'function') return false;
		if (typeof map.has !== 'function') return false;
		if (typeof map.keys !== 'function') return false;
		if (typeof map.set !== 'function') return false;
		if (typeof map.values !== 'function') return false;

		iterator = map.entries();
		result = iterator.next();
		if (result.done !== false) return false;
		if (!result.value) return false;
		if (result.value[0] !== 'raz') return false;
		if (result.value[1] !== 'one') return false;

		return true;
	};


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var clear          = __webpack_require__(44)
	  , eIndexOf       = __webpack_require__(46)
	  , setPrototypeOf = __webpack_require__(52)
	  , callable       = __webpack_require__(57)
	  , validValue     = __webpack_require__(45)
	  , d              = __webpack_require__(58)
	  , ee             = __webpack_require__(70)
	  , Symbol         = __webpack_require__(71)
	  , iterator       = __webpack_require__(76)
	  , forOf          = __webpack_require__(80)
	  , Iterator       = __webpack_require__(90)
	  , isNative       = __webpack_require__(93)

	  , call = Function.prototype.call
	  , defineProperties = Object.defineProperties, getPrototypeOf = Object.getPrototypeOf
	  , MapPoly;

	module.exports = MapPoly = function (/*iterable*/) {
		var iterable = arguments[0], keys, values, self;
		if (!(this instanceof MapPoly)) throw new TypeError('Constructor requires \'new\'');
		if (isNative && setPrototypeOf && (Map !== MapPoly)) {
			self = setPrototypeOf(new Map(), getPrototypeOf(this));
		} else {
			self = this;
		}
		if (iterable != null) iterator(iterable);
		defineProperties(self, {
			__mapKeysData__: d('c', keys = []),
			__mapValuesData__: d('c', values = [])
		});
		if (!iterable) return self;
		forOf(iterable, function (value) {
			var key = validValue(value)[0];
			value = value[1];
			if (eIndexOf.call(keys, key) !== -1) return;
			keys.push(key);
			values.push(value);
		}, self);
		return self;
	};

	if (isNative) {
		if (setPrototypeOf) setPrototypeOf(MapPoly, Map);
		MapPoly.prototype = Object.create(Map.prototype, {
			constructor: d(MapPoly)
		});
	}

	ee(defineProperties(MapPoly.prototype, {
		clear: d(function () {
			if (!this.__mapKeysData__.length) return;
			clear.call(this.__mapKeysData__);
			clear.call(this.__mapValuesData__);
			this.emit('_clear');
		}),
		delete: d(function (key) {
			var index = eIndexOf.call(this.__mapKeysData__, key);
			if (index === -1) return false;
			this.__mapKeysData__.splice(index, 1);
			this.__mapValuesData__.splice(index, 1);
			this.emit('_delete', index, key);
			return true;
		}),
		entries: d(function () { return new Iterator(this, 'key+value'); }),
		forEach: d(function (cb/*, thisArg*/) {
			var thisArg = arguments[1], iterator, result;
			callable(cb);
			iterator = this.entries();
			result = iterator._next();
			while (result !== undefined) {
				call.call(cb, thisArg, this.__mapValuesData__[result],
					this.__mapKeysData__[result], this);
				result = iterator._next();
			}
		}),
		get: d(function (key) {
			var index = eIndexOf.call(this.__mapKeysData__, key);
			if (index === -1) return;
			return this.__mapValuesData__[index];
		}),
		has: d(function (key) {
			return (eIndexOf.call(this.__mapKeysData__, key) !== -1);
		}),
		keys: d(function () { return new Iterator(this, 'key'); }),
		set: d(function (key, value) {
			var index = eIndexOf.call(this.__mapKeysData__, key), emit;
			if (index === -1) {
				index = this.__mapKeysData__.push(key) - 1;
				emit = true;
			}
			this.__mapValuesData__[index] = value;
			if (emit) this.emit('_add', index, key);
			return this;
		}),
		size: d.gs(function () { return this.__mapKeysData__.length; }),
		values: d(function () { return new Iterator(this, 'value'); }),
		toString: d(function () { return '[object Map]'; })
	}));
	Object.defineProperty(MapPoly.prototype, Symbol.iterator, d(function () {
		return this.entries();
	}));
	Object.defineProperty(MapPoly.prototype, Symbol.toStringTag, d('c', 'Map'));


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	// Inspired by Google Closure:
	// http://closure-library.googlecode.com/svn/docs/
	// closure_goog_array_array.js.html#goog.array.clear

	'use strict';

	var value = __webpack_require__(45);

	module.exports = function () {
		value(this).length = 0;
		return this;
	};


/***/ },
/* 45 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (value) {
		if (value == null) throw new TypeError("Cannot use null or undefined");
		return value;
	};


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toPosInt = __webpack_require__(47)
	  , value    = __webpack_require__(45)

	  , indexOf = Array.prototype.indexOf
	  , hasOwnProperty = Object.prototype.hasOwnProperty
	  , abs = Math.abs, floor = Math.floor;

	module.exports = function (searchElement/*, fromIndex*/) {
		var i, l, fromIndex, val;
		if (searchElement === searchElement) { //jslint: ignore
			return indexOf.apply(this, arguments);
		}

		l = toPosInt(value(this).length);
		fromIndex = arguments[1];
		if (isNaN(fromIndex)) fromIndex = 0;
		else if (fromIndex >= 0) fromIndex = floor(fromIndex);
		else fromIndex = toPosInt(this.length) - floor(abs(fromIndex));

		for (i = fromIndex; i < l; ++i) {
			if (hasOwnProperty.call(this, i)) {
				val = this[i];
				if (val !== val) return i; //jslint: ignore
			}
		}
		return -1;
	};


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toInteger = __webpack_require__(48)

	  , max = Math.max;

	module.exports = function (value) { return max(0, toInteger(value)); };


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var sign = __webpack_require__(49)

	  , abs = Math.abs, floor = Math.floor;

	module.exports = function (value) {
		if (isNaN(value)) return 0;
		value = Number(value);
		if ((value === 0) || !isFinite(value)) return value;
		return sign(value) * floor(abs(value));
	};


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(50)()
		? Math.sign
		: __webpack_require__(51);


/***/ },
/* 50 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function () {
		var sign = Math.sign;
		if (typeof sign !== 'function') return false;
		return ((sign(10) === 1) && (sign(-20) === -1));
	};


/***/ },
/* 51 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (value) {
		value = Number(value);
		if (isNaN(value) || (value === 0)) return value;
		return (value > 0) ? 1 : -1;
	};


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(53)()
		? Object.setPrototypeOf
		: __webpack_require__(54);


/***/ },
/* 53 */
/***/ function(module, exports) {

	'use strict';

	var create = Object.create, getPrototypeOf = Object.getPrototypeOf
	  , x = {};

	module.exports = function (/*customCreate*/) {
		var setPrototypeOf = Object.setPrototypeOf
		  , customCreate = arguments[0] || create;
		if (typeof setPrototypeOf !== 'function') return false;
		return getPrototypeOf(setPrototypeOf(customCreate(null), x)) === x;
	};


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	// Big thanks to @WebReflection for sorting this out
	// https://gist.github.com/WebReflection/5593554

	'use strict';

	var isObject      = __webpack_require__(55)
	  , value         = __webpack_require__(45)

	  , isPrototypeOf = Object.prototype.isPrototypeOf
	  , defineProperty = Object.defineProperty
	  , nullDesc = { configurable: true, enumerable: false, writable: true,
			value: undefined }
	  , validate;

	validate = function (obj, prototype) {
		value(obj);
		if ((prototype === null) || isObject(prototype)) return obj;
		throw new TypeError('Prototype must be null or an object');
	};

	module.exports = (function (status) {
		var fn, set;
		if (!status) return null;
		if (status.level === 2) {
			if (status.set) {
				set = status.set;
				fn = function (obj, prototype) {
					set.call(validate(obj, prototype), prototype);
					return obj;
				};
			} else {
				fn = function (obj, prototype) {
					validate(obj, prototype).__proto__ = prototype;
					return obj;
				};
			}
		} else {
			fn = function self(obj, prototype) {
				var isNullBase;
				validate(obj, prototype);
				isNullBase = isPrototypeOf.call(self.nullPolyfill, obj);
				if (isNullBase) delete self.nullPolyfill.__proto__;
				if (prototype === null) prototype = self.nullPolyfill;
				obj.__proto__ = prototype;
				if (isNullBase) defineProperty(self.nullPolyfill, '__proto__', nullDesc);
				return obj;
			};
		}
		return Object.defineProperty(fn, 'level', { configurable: false,
			enumerable: false, writable: false, value: status.level });
	}((function () {
		var x = Object.create(null), y = {}, set
		  , desc = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__');

		if (desc) {
			try {
				set = desc.set; // Opera crashes at this point
				set.call(x, y);
			} catch (ignore) { }
			if (Object.getPrototypeOf(x) === y) return { set: set, level: 2 };
		}

		x.__proto__ = y;
		if (Object.getPrototypeOf(x) === y) return { level: 2 };

		x = {};
		x.__proto__ = y;
		if (Object.getPrototypeOf(x) === y) return { level: 1 };

		return false;
	}())));

	__webpack_require__(56);


/***/ },
/* 55 */
/***/ function(module, exports) {

	'use strict';

	var map = { 'function': true, object: true };

	module.exports = function (x) {
		return ((x != null) && map[typeof x]) || false;
	};


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	// Workaround for http://code.google.com/p/v8/issues/detail?id=2804

	'use strict';

	var create = Object.create, shim;

	if (!__webpack_require__(53)()) {
		shim = __webpack_require__(54);
	}

	module.exports = (function () {
		var nullObject, props, desc;
		if (!shim) return create;
		if (shim.level !== 1) return create;

		nullObject = {};
		props = {};
		desc = { configurable: false, enumerable: false, writable: true,
			value: undefined };
		Object.getOwnPropertyNames(Object.prototype).forEach(function (name) {
			if (name === '__proto__') {
				props[name] = { configurable: true, enumerable: false, writable: true,
					value: undefined };
				return;
			}
			props[name] = desc;
		});
		Object.defineProperties(nullObject, props);

		Object.defineProperty(shim, 'nullPolyfill', { configurable: false,
			enumerable: false, writable: false, value: nullObject });

		return function (prototype, props) {
			return create((prototype === null) ? nullObject : prototype, props);
		};
	}());


/***/ },
/* 57 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (fn) {
		if (typeof fn !== 'function') throw new TypeError(fn + " is not a function");
		return fn;
	};


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assign        = __webpack_require__(59)
	  , normalizeOpts = __webpack_require__(65)
	  , isCallable    = __webpack_require__(66)
	  , contains      = __webpack_require__(67)

	  , d;

	d = module.exports = function (dscr, value/*, options*/) {
		var c, e, w, options, desc;
		if ((arguments.length < 2) || (typeof dscr !== 'string')) {
			options = value;
			value = dscr;
			dscr = null;
		} else {
			options = arguments[2];
		}
		if (dscr == null) {
			c = w = true;
			e = false;
		} else {
			c = contains.call(dscr, 'c');
			e = contains.call(dscr, 'e');
			w = contains.call(dscr, 'w');
		}

		desc = { value: value, configurable: c, enumerable: e, writable: w };
		return !options ? desc : assign(normalizeOpts(options), desc);
	};

	d.gs = function (dscr, get, set/*, options*/) {
		var c, e, options, desc;
		if (typeof dscr !== 'string') {
			options = set;
			set = get;
			get = dscr;
			dscr = null;
		} else {
			options = arguments[3];
		}
		if (get == null) {
			get = undefined;
		} else if (!isCallable(get)) {
			options = get;
			get = set = undefined;
		} else if (set == null) {
			set = undefined;
		} else if (!isCallable(set)) {
			options = set;
			set = undefined;
		}
		if (dscr == null) {
			c = true;
			e = false;
		} else {
			c = contains.call(dscr, 'c');
			e = contains.call(dscr, 'e');
		}

		desc = { get: get, set: set, configurable: c, enumerable: e };
		return !options ? desc : assign(normalizeOpts(options), desc);
	};


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(60)()
		? Object.assign
		: __webpack_require__(61);


/***/ },
/* 60 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function () {
		var assign = Object.assign, obj;
		if (typeof assign !== 'function') return false;
		obj = { foo: 'raz' };
		assign(obj, { bar: 'dwa' }, { trzy: 'trzy' });
		return (obj.foo + obj.bar + obj.trzy) === 'razdwatrzy';
	};


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var keys  = __webpack_require__(62)
	  , value = __webpack_require__(45)

	  , max = Math.max;

	module.exports = function (dest, src/*, …srcn*/) {
		var error, i, l = max(arguments.length, 2), assign;
		dest = Object(value(dest));
		assign = function (key) {
			try { dest[key] = src[key]; } catch (e) {
				if (!error) error = e;
			}
		};
		for (i = 1; i < l; ++i) {
			src = arguments[i];
			keys(src).forEach(assign);
		}
		if (error !== undefined) throw error;
		return dest;
	};


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(63)()
		? Object.keys
		: __webpack_require__(64);


/***/ },
/* 63 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function () {
		try {
			Object.keys('primitive');
			return true;
		} catch (e) { return false; }
	};


/***/ },
/* 64 */
/***/ function(module, exports) {

	'use strict';

	var keys = Object.keys;

	module.exports = function (object) {
		return keys(object == null ? object : Object(object));
	};


/***/ },
/* 65 */
/***/ function(module, exports) {

	'use strict';

	var forEach = Array.prototype.forEach, create = Object.create;

	var process = function (src, obj) {
		var key;
		for (key in src) obj[key] = src[key];
	};

	module.exports = function (options/*, …options*/) {
		var result = create(null);
		forEach.call(arguments, function (options) {
			if (options == null) return;
			process(Object(options), result);
		});
		return result;
	};


/***/ },
/* 66 */
/***/ function(module, exports) {

	// Deprecated

	'use strict';

	module.exports = function (obj) { return typeof obj === 'function'; };


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(68)()
		? String.prototype.contains
		: __webpack_require__(69);


/***/ },
/* 68 */
/***/ function(module, exports) {

	'use strict';

	var str = 'razdwatrzy';

	module.exports = function () {
		if (typeof str.contains !== 'function') return false;
		return ((str.contains('dwa') === true) && (str.contains('foo') === false));
	};


/***/ },
/* 69 */
/***/ function(module, exports) {

	'use strict';

	var indexOf = String.prototype.indexOf;

	module.exports = function (searchString/*, position*/) {
		return indexOf.call(this, searchString, arguments[1]) > -1;
	};


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var d        = __webpack_require__(58)
	  , callable = __webpack_require__(57)

	  , apply = Function.prototype.apply, call = Function.prototype.call
	  , create = Object.create, defineProperty = Object.defineProperty
	  , defineProperties = Object.defineProperties
	  , hasOwnProperty = Object.prototype.hasOwnProperty
	  , descriptor = { configurable: true, enumerable: false, writable: true }

	  , on, once, off, emit, methods, descriptors, base;

	on = function (type, listener) {
		var data;

		callable(listener);

		if (!hasOwnProperty.call(this, '__ee__')) {
			data = descriptor.value = create(null);
			defineProperty(this, '__ee__', descriptor);
			descriptor.value = null;
		} else {
			data = this.__ee__;
		}
		if (!data[type]) data[type] = listener;
		else if (typeof data[type] === 'object') data[type].push(listener);
		else data[type] = [data[type], listener];

		return this;
	};

	once = function (type, listener) {
		var once, self;

		callable(listener);
		self = this;
		on.call(this, type, once = function () {
			off.call(self, type, once);
			apply.call(listener, this, arguments);
		});

		once.__eeOnceListener__ = listener;
		return this;
	};

	off = function (type, listener) {
		var data, listeners, candidate, i;

		callable(listener);

		if (!hasOwnProperty.call(this, '__ee__')) return this;
		data = this.__ee__;
		if (!data[type]) return this;
		listeners = data[type];

		if (typeof listeners === 'object') {
			for (i = 0; (candidate = listeners[i]); ++i) {
				if ((candidate === listener) ||
						(candidate.__eeOnceListener__ === listener)) {
					if (listeners.length === 2) data[type] = listeners[i ? 0 : 1];
					else listeners.splice(i, 1);
				}
			}
		} else {
			if ((listeners === listener) ||
					(listeners.__eeOnceListener__ === listener)) {
				delete data[type];
			}
		}

		return this;
	};

	emit = function (type) {
		var i, l, listener, listeners, args;

		if (!hasOwnProperty.call(this, '__ee__')) return;
		listeners = this.__ee__[type];
		if (!listeners) return;

		if (typeof listeners === 'object') {
			l = arguments.length;
			args = new Array(l - 1);
			for (i = 1; i < l; ++i) args[i - 1] = arguments[i];

			listeners = listeners.slice();
			for (i = 0; (listener = listeners[i]); ++i) {
				apply.call(listener, this, args);
			}
		} else {
			switch (arguments.length) {
			case 1:
				call.call(listeners, this);
				break;
			case 2:
				call.call(listeners, this, arguments[1]);
				break;
			case 3:
				call.call(listeners, this, arguments[1], arguments[2]);
				break;
			default:
				l = arguments.length;
				args = new Array(l - 1);
				for (i = 1; i < l; ++i) {
					args[i - 1] = arguments[i];
				}
				apply.call(listeners, this, args);
			}
		}
	};

	methods = {
		on: on,
		once: once,
		off: off,
		emit: emit
	};

	descriptors = {
		on: d(on),
		once: d(once),
		off: d(off),
		emit: d(emit)
	};

	base = defineProperties({}, descriptors);

	module.exports = exports = function (o) {
		return (o == null) ? create(base) : defineProperties(Object(o), descriptors);
	};
	exports.methods = methods;


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(72)() ? Symbol : __webpack_require__(73);


/***/ },
/* 72 */
/***/ function(module, exports) {

	'use strict';

	var validTypes = { object: true, symbol: true };

	module.exports = function () {
		var symbol;
		if (typeof Symbol !== 'function') return false;
		symbol = Symbol('test symbol');
		try { String(symbol); } catch (e) { return false; }

		// Return 'true' also for polyfills
		if (!validTypes[typeof Symbol.iterator]) return false;
		if (!validTypes[typeof Symbol.toPrimitive]) return false;
		if (!validTypes[typeof Symbol.toStringTag]) return false;

		return true;
	};


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	// ES2015 Symbol polyfill for environments that do not (or partially) support it

	'use strict';

	var d              = __webpack_require__(58)
	  , validateSymbol = __webpack_require__(74)

	  , create = Object.create, defineProperties = Object.defineProperties
	  , defineProperty = Object.defineProperty, objPrototype = Object.prototype
	  , NativeSymbol, SymbolPolyfill, HiddenSymbol, globalSymbols = create(null)
	  , isNativeSafe;

	if (typeof Symbol === 'function') {
		NativeSymbol = Symbol;
		try {
			String(NativeSymbol());
			isNativeSafe = true;
		} catch (ignore) {}
	}

	var generateName = (function () {
		var created = create(null);
		return function (desc) {
			var postfix = 0, name, ie11BugWorkaround;
			while (created[desc + (postfix || '')]) ++postfix;
			desc += (postfix || '');
			created[desc] = true;
			name = '@@' + desc;
			defineProperty(objPrototype, name, d.gs(null, function (value) {
				// For IE11 issue see:
				// https://connect.microsoft.com/IE/feedbackdetail/view/1928508/
				//    ie11-broken-getters-on-dom-objects
				// https://github.com/medikoo/es6-symbol/issues/12
				if (ie11BugWorkaround) return;
				ie11BugWorkaround = true;
				defineProperty(this, name, d(value));
				ie11BugWorkaround = false;
			}));
			return name;
		};
	}());

	// Internal constructor (not one exposed) for creating Symbol instances.
	// This one is used to ensure that `someSymbol instanceof Symbol` always return false
	HiddenSymbol = function Symbol(description) {
		if (this instanceof HiddenSymbol) throw new TypeError('Symbol is not a constructor');
		return SymbolPolyfill(description);
	};

	// Exposed `Symbol` constructor
	// (returns instances of HiddenSymbol)
	module.exports = SymbolPolyfill = function Symbol(description) {
		var symbol;
		if (this instanceof Symbol) throw new TypeError('Symbol is not a constructor');
		if (isNativeSafe) return NativeSymbol(description);
		symbol = create(HiddenSymbol.prototype);
		description = (description === undefined ? '' : String(description));
		return defineProperties(symbol, {
			__description__: d('', description),
			__name__: d('', generateName(description))
		});
	};
	defineProperties(SymbolPolyfill, {
		for: d(function (key) {
			if (globalSymbols[key]) return globalSymbols[key];
			return (globalSymbols[key] = SymbolPolyfill(String(key)));
		}),
		keyFor: d(function (s) {
			var key;
			validateSymbol(s);
			for (key in globalSymbols) if (globalSymbols[key] === s) return key;
		}),

		// To ensure proper interoperability with other native functions (e.g. Array.from)
		// fallback to eventual native implementation of given symbol
		hasInstance: d('', (NativeSymbol && NativeSymbol.hasInstance) || SymbolPolyfill('hasInstance')),
		isConcatSpreadable: d('', (NativeSymbol && NativeSymbol.isConcatSpreadable) ||
			SymbolPolyfill('isConcatSpreadable')),
		iterator: d('', (NativeSymbol && NativeSymbol.iterator) || SymbolPolyfill('iterator')),
		match: d('', (NativeSymbol && NativeSymbol.match) || SymbolPolyfill('match')),
		replace: d('', (NativeSymbol && NativeSymbol.replace) || SymbolPolyfill('replace')),
		search: d('', (NativeSymbol && NativeSymbol.search) || SymbolPolyfill('search')),
		species: d('', (NativeSymbol && NativeSymbol.species) || SymbolPolyfill('species')),
		split: d('', (NativeSymbol && NativeSymbol.split) || SymbolPolyfill('split')),
		toPrimitive: d('', (NativeSymbol && NativeSymbol.toPrimitive) || SymbolPolyfill('toPrimitive')),
		toStringTag: d('', (NativeSymbol && NativeSymbol.toStringTag) || SymbolPolyfill('toStringTag')),
		unscopables: d('', (NativeSymbol && NativeSymbol.unscopables) || SymbolPolyfill('unscopables'))
	});

	// Internal tweaks for real symbol producer
	defineProperties(HiddenSymbol.prototype, {
		constructor: d(SymbolPolyfill),
		toString: d('', function () { return this.__name__; })
	});

	// Proper implementation of methods exposed on Symbol.prototype
	// They won't be accessible on produced symbol instances as they derive from HiddenSymbol.prototype
	defineProperties(SymbolPolyfill.prototype, {
		toString: d(function () { return 'Symbol (' + validateSymbol(this).__description__ + ')'; }),
		valueOf: d(function () { return validateSymbol(this); })
	});
	defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toPrimitive, d('', function () {
		var symbol = validateSymbol(this);
		if (typeof symbol === 'symbol') return symbol;
		return symbol.toString();
	}));
	defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toStringTag, d('c', 'Symbol'));

	// Proper implementaton of toPrimitive and toStringTag for returned symbol instances
	defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toStringTag,
		d('c', SymbolPolyfill.prototype[SymbolPolyfill.toStringTag]));

	// Note: It's important to define `toPrimitive` as last one, as some implementations
	// implement `toPrimitive` natively without implementing `toStringTag` (or other specified symbols)
	// And that may invoke error in definition flow:
	// See: https://github.com/medikoo/es6-symbol/issues/13#issuecomment-164146149
	defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toPrimitive,
		d('c', SymbolPolyfill.prototype[SymbolPolyfill.toPrimitive]));


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isSymbol = __webpack_require__(75);

	module.exports = function (value) {
		if (!isSymbol(value)) throw new TypeError(value + " is not a symbol");
		return value;
	};


/***/ },
/* 75 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (x) {
		if (!x) return false;
		if (typeof x === 'symbol') return true;
		if (!x.constructor) return false;
		if (x.constructor.name !== 'Symbol') return false;
		return (x[x.constructor.toStringTag] === 'Symbol');
	};


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isIterable = __webpack_require__(77);

	module.exports = function (value) {
		if (!isIterable(value)) throw new TypeError(value + " is not iterable");
		return value;
	};


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArguments    = __webpack_require__(78)
	  , isString       = __webpack_require__(79)
	  , iteratorSymbol = __webpack_require__(71).iterator

	  , isArray = Array.isArray;

	module.exports = function (value) {
		if (value == null) return false;
		if (isArray(value)) return true;
		if (isString(value)) return true;
		if (isArguments(value)) return true;
		return (typeof value[iteratorSymbol] === 'function');
	};


/***/ },
/* 78 */
/***/ function(module, exports) {

	'use strict';

	var toString = Object.prototype.toString

	  , id = toString.call((function () { return arguments; }()));

	module.exports = function (x) { return (toString.call(x) === id); };


/***/ },
/* 79 */
/***/ function(module, exports) {

	'use strict';

	var toString = Object.prototype.toString

	  , id = toString.call('');

	module.exports = function (x) {
		return (typeof x === 'string') || (x && (typeof x === 'object') &&
			((x instanceof String) || (toString.call(x) === id))) || false;
	};


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArguments = __webpack_require__(78)
	  , callable    = __webpack_require__(57)
	  , isString    = __webpack_require__(79)
	  , get         = __webpack_require__(81)

	  , isArray = Array.isArray, call = Function.prototype.call
	  , some = Array.prototype.some;

	module.exports = function (iterable, cb/*, thisArg*/) {
		var mode, thisArg = arguments[2], result, doBreak, broken, i, l, char, code;
		if (isArray(iterable) || isArguments(iterable)) mode = 'array';
		else if (isString(iterable)) mode = 'string';
		else iterable = get(iterable);

		callable(cb);
		doBreak = function () { broken = true; };
		if (mode === 'array') {
			some.call(iterable, function (value) {
				call.call(cb, thisArg, value, doBreak);
				if (broken) return true;
			});
			return;
		}
		if (mode === 'string') {
			l = iterable.length;
			for (i = 0; i < l; ++i) {
				char = iterable[i];
				if ((i + 1) < l) {
					code = char.charCodeAt(0);
					if ((code >= 0xD800) && (code <= 0xDBFF)) char += iterable[++i];
				}
				call.call(cb, thisArg, char, doBreak);
				if (broken) break;
			}
			return;
		}
		result = iterable.next();

		while (!result.done) {
			call.call(cb, thisArg, result.value, doBreak);
			if (broken) return;
			result = iterable.next();
		}
	};


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArguments    = __webpack_require__(78)
	  , isString       = __webpack_require__(79)
	  , ArrayIterator  = __webpack_require__(82)
	  , StringIterator = __webpack_require__(89)
	  , iterable       = __webpack_require__(76)
	  , iteratorSymbol = __webpack_require__(71).iterator;

	module.exports = function (obj) {
		if (typeof iterable(obj)[iteratorSymbol] === 'function') return obj[iteratorSymbol]();
		if (isArguments(obj)) return new ArrayIterator(obj);
		if (isString(obj)) return new StringIterator(obj);
		return new ArrayIterator(obj);
	};


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var setPrototypeOf = __webpack_require__(52)
	  , contains       = __webpack_require__(67)
	  , d              = __webpack_require__(58)
	  , Iterator       = __webpack_require__(83)

	  , defineProperty = Object.defineProperty
	  , ArrayIterator;

	ArrayIterator = module.exports = function (arr, kind) {
		if (!(this instanceof ArrayIterator)) return new ArrayIterator(arr, kind);
		Iterator.call(this, arr);
		if (!kind) kind = 'value';
		else if (contains.call(kind, 'key+value')) kind = 'key+value';
		else if (contains.call(kind, 'key')) kind = 'key';
		else kind = 'value';
		defineProperty(this, '__kind__', d('', kind));
	};
	if (setPrototypeOf) setPrototypeOf(ArrayIterator, Iterator);

	ArrayIterator.prototype = Object.create(Iterator.prototype, {
		constructor: d(ArrayIterator),
		_resolve: d(function (i) {
			if (this.__kind__ === 'value') return this.__list__[i];
			if (this.__kind__ === 'key+value') return [i, this.__list__[i]];
			return i;
		}),
		toString: d(function () { return '[object Array Iterator]'; })
	});


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var clear    = __webpack_require__(44)
	  , assign   = __webpack_require__(59)
	  , callable = __webpack_require__(57)
	  , value    = __webpack_require__(45)
	  , d        = __webpack_require__(58)
	  , autoBind = __webpack_require__(84)
	  , Symbol   = __webpack_require__(71)

	  , defineProperty = Object.defineProperty
	  , defineProperties = Object.defineProperties
	  , Iterator;

	module.exports = Iterator = function (list, context) {
		if (!(this instanceof Iterator)) return new Iterator(list, context);
		defineProperties(this, {
			__list__: d('w', value(list)),
			__context__: d('w', context),
			__nextIndex__: d('w', 0)
		});
		if (!context) return;
		callable(context.on);
		context.on('_add', this._onAdd);
		context.on('_delete', this._onDelete);
		context.on('_clear', this._onClear);
	};

	defineProperties(Iterator.prototype, assign({
		constructor: d(Iterator),
		_next: d(function () {
			var i;
			if (!this.__list__) return;
			if (this.__redo__) {
				i = this.__redo__.shift();
				if (i !== undefined) return i;
			}
			if (this.__nextIndex__ < this.__list__.length) return this.__nextIndex__++;
			this._unBind();
		}),
		next: d(function () { return this._createResult(this._next()); }),
		_createResult: d(function (i) {
			if (i === undefined) return { done: true, value: undefined };
			return { done: false, value: this._resolve(i) };
		}),
		_resolve: d(function (i) { return this.__list__[i]; }),
		_unBind: d(function () {
			this.__list__ = null;
			delete this.__redo__;
			if (!this.__context__) return;
			this.__context__.off('_add', this._onAdd);
			this.__context__.off('_delete', this._onDelete);
			this.__context__.off('_clear', this._onClear);
			this.__context__ = null;
		}),
		toString: d(function () { return '[object Iterator]'; })
	}, autoBind({
		_onAdd: d(function (index) {
			if (index >= this.__nextIndex__) return;
			++this.__nextIndex__;
			if (!this.__redo__) {
				defineProperty(this, '__redo__', d('c', [index]));
				return;
			}
			this.__redo__.forEach(function (redo, i) {
				if (redo >= index) this.__redo__[i] = ++redo;
			}, this);
			this.__redo__.push(index);
		}),
		_onDelete: d(function (index) {
			var i;
			if (index >= this.__nextIndex__) return;
			--this.__nextIndex__;
			if (!this.__redo__) return;
			i = this.__redo__.indexOf(index);
			if (i !== -1) this.__redo__.splice(i, 1);
			this.__redo__.forEach(function (redo, i) {
				if (redo > index) this.__redo__[i] = --redo;
			}, this);
		}),
		_onClear: d(function () {
			if (this.__redo__) clear.call(this.__redo__);
			this.__nextIndex__ = 0;
		})
	})));

	defineProperty(Iterator.prototype, Symbol.iterator, d(function () {
		return this;
	}));
	defineProperty(Iterator.prototype, Symbol.toStringTag, d('', 'Iterator'));


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var copy             = __webpack_require__(85)
	  , normalizeOptions = __webpack_require__(65)
	  , ensureCallable   = __webpack_require__(57)
	  , map              = __webpack_require__(86)
	  , callable         = __webpack_require__(57)
	  , validValue       = __webpack_require__(45)

	  , bind = Function.prototype.bind, defineProperty = Object.defineProperty
	  , hasOwnProperty = Object.prototype.hasOwnProperty
	  , define;

	define = function (name, desc, options) {
		var value = validValue(desc) && callable(desc.value), dgs;
		dgs = copy(desc);
		delete dgs.writable;
		delete dgs.value;
		dgs.get = function () {
			if (!options.overwriteDefinition && hasOwnProperty.call(this, name)) return value;
			desc.value = bind.call(value, options.resolveContext ? options.resolveContext(this) : this);
			defineProperty(this, name, desc);
			return this[name];
		};
		return dgs;
	};

	module.exports = function (props/*, options*/) {
		var options = normalizeOptions(arguments[1]);
		if (options.resolveContext != null) ensureCallable(options.resolveContext);
		return map(props, function (desc, name) { return define(name, desc, options); });
	};


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assign = __webpack_require__(59)
	  , value  = __webpack_require__(45);

	module.exports = function (obj) {
		var copy = Object(value(obj));
		if (copy !== obj) return copy;
		return assign({}, obj);
	};


/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var callable = __webpack_require__(57)
	  , forEach  = __webpack_require__(87)

	  , call = Function.prototype.call;

	module.exports = function (obj, cb/*, thisArg*/) {
		var o = {}, thisArg = arguments[2];
		callable(cb);
		forEach(obj, function (value, key, obj, index) {
			o[key] = call.call(cb, thisArg, value, key, obj, index);
		});
		return o;
	};


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(88)('forEach');


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	// Internal method, used by iteration functions.
	// Calls a function for each key-value pair found in object
	// Optionally takes compareFn to iterate object in specific order

	'use strict';

	var callable = __webpack_require__(57)
	  , value    = __webpack_require__(45)

	  , bind = Function.prototype.bind, call = Function.prototype.call, keys = Object.keys
	  , propertyIsEnumerable = Object.prototype.propertyIsEnumerable;

	module.exports = function (method, defVal) {
		return function (obj, cb/*, thisArg, compareFn*/) {
			var list, thisArg = arguments[2], compareFn = arguments[3];
			obj = Object(value(obj));
			callable(cb);

			list = keys(obj);
			if (compareFn) {
				list.sort((typeof compareFn === 'function') ? bind.call(compareFn, obj) : undefined);
			}
			if (typeof method !== 'function') method = list[method];
			return call.call(method, list, function (key, index) {
				if (!propertyIsEnumerable.call(obj, key)) return defVal;
				return call.call(cb, thisArg, obj[key], key, obj, index);
			});
		};
	};


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	// Thanks @mathiasbynens
	// http://mathiasbynens.be/notes/javascript-unicode#iterating-over-symbols

	'use strict';

	var setPrototypeOf = __webpack_require__(52)
	  , d              = __webpack_require__(58)
	  , Iterator       = __webpack_require__(83)

	  , defineProperty = Object.defineProperty
	  , StringIterator;

	StringIterator = module.exports = function (str) {
		if (!(this instanceof StringIterator)) return new StringIterator(str);
		str = String(str);
		Iterator.call(this, str);
		defineProperty(this, '__length__', d('', str.length));

	};
	if (setPrototypeOf) setPrototypeOf(StringIterator, Iterator);

	StringIterator.prototype = Object.create(Iterator.prototype, {
		constructor: d(StringIterator),
		_next: d(function () {
			if (!this.__list__) return;
			if (this.__nextIndex__ < this.__length__) return this.__nextIndex__++;
			this._unBind();
		}),
		_resolve: d(function (i) {
			var char = this.__list__[i], code;
			if (this.__nextIndex__ === this.__length__) return char;
			code = char.charCodeAt(0);
			if ((code >= 0xD800) && (code <= 0xDBFF)) return char + this.__list__[this.__nextIndex__++];
			return char;
		}),
		toString: d(function () { return '[object String Iterator]'; })
	});


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var setPrototypeOf    = __webpack_require__(52)
	  , d                 = __webpack_require__(58)
	  , Iterator          = __webpack_require__(83)
	  , toStringTagSymbol = __webpack_require__(71).toStringTag
	  , kinds             = __webpack_require__(91)

	  , defineProperties = Object.defineProperties
	  , unBind = Iterator.prototype._unBind
	  , MapIterator;

	MapIterator = module.exports = function (map, kind) {
		if (!(this instanceof MapIterator)) return new MapIterator(map, kind);
		Iterator.call(this, map.__mapKeysData__, map);
		if (!kind || !kinds[kind]) kind = 'key+value';
		defineProperties(this, {
			__kind__: d('', kind),
			__values__: d('w', map.__mapValuesData__)
		});
	};
	if (setPrototypeOf) setPrototypeOf(MapIterator, Iterator);

	MapIterator.prototype = Object.create(Iterator.prototype, {
		constructor: d(MapIterator),
		_resolve: d(function (i) {
			if (this.__kind__ === 'value') return this.__values__[i];
			if (this.__kind__ === 'key') return this.__list__[i];
			return [this.__list__[i], this.__values__[i]];
		}),
		_unBind: d(function () {
			this.__values__ = null;
			unBind.call(this);
		}),
		toString: d(function () { return '[object Map Iterator]'; })
	});
	Object.defineProperty(MapIterator.prototype, toStringTagSymbol,
		d('c', 'Map Iterator'));


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(92)('key',
		'value', 'key+value');


/***/ },
/* 92 */
/***/ function(module, exports) {

	'use strict';

	var forEach = Array.prototype.forEach, create = Object.create;

	module.exports = function (arg/*, …args*/) {
		var set = create(null);
		forEach.call(arguments, function (name) { set[name] = true; });
		return set;
	};


/***/ },
/* 93 */
/***/ function(module, exports) {

	// Exports true if environment provides native `Map` implementation,
	// whatever that is.

	'use strict';

	module.exports = (function () {
		if (typeof Map === 'undefined') return false;
		return (Object.prototype.toString.call(new Map()) === '[object Map]');
	}());


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var xstream_adapter_1 = __webpack_require__(4);
	var xstream_1 = __webpack_require__(5);
	function createVTree(vnode, children) {
	    return {
	        sel: vnode.sel,
	        data: vnode.data,
	        text: vnode.text,
	        elm: vnode.elm,
	        key: vnode.key,
	        children: children,
	    };
	}
	function makeTransposeVNode(runStreamAdapter) {
	    function internalTransposeVNode(vnode) {
	        if (!vnode) {
	            return null;
	        }
	        else if (vnode && vnode.data && vnode.data.static) {
	            return xstream_1.default.of(vnode);
	        }
	        else if (runStreamAdapter.isValidStream(vnode)) {
	            var xsStream = xstream_adapter_1.default.adapt(vnode, runStreamAdapter.streamSubscribe);
	            return xsStream.map(internalTransposeVNode).flatten();
	        }
	        else if (typeof vnode === "object") {
	            if (!vnode.children || vnode.children.length === 0) {
	                return xstream_1.default.of(vnode);
	            }
	            var vnodeChildren = vnode.children
	                .map(internalTransposeVNode)
	                .filter(function (x) { return x !== null; });
	            if (vnodeChildren.length === 0) {
	                return xstream_1.default.of(createVTree(vnode, []));
	            }
	            else {
	                return xstream_1.default.combine.apply(xstream_1.default, vnodeChildren)
	                    .map(function (children) { return createVTree(vnode, children.slice()); });
	            }
	        }
	        else {
	            throw new Error("Unhandled vTree Value");
	        }
	    }
	    ;
	    return function transposeVNode(vnode) {
	        return internalTransposeVNode(vnode);
	    };
	}
	exports.makeTransposeVNode = makeTransposeVNode;
	//# sourceMappingURL=transposition.js.map

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var xstream_adapter_1 = __webpack_require__(4);
	var transposition_1 = __webpack_require__(94);
	var HTMLSource_1 = __webpack_require__(96);
	var toHTML = __webpack_require__(97);
	var noop = function () { };
	function makeHTMLDriver(effect, options) {
	    if (!options) {
	        options = {};
	    }
	    var transposition = options.transposition || false;
	    function htmlDriver(vnode$, runStreamAdapter, name) {
	        var transposeVNode = transposition_1.makeTransposeVNode(runStreamAdapter);
	        var preprocessedVNode$ = (transposition ? vnode$.map(transposeVNode).flatten() : vnode$);
	        var html$ = preprocessedVNode$.map(toHTML);
	        html$.addListener({
	            next: effect || noop,
	            error: noop,
	            complete: noop,
	        });
	        return new HTMLSource_1.HTMLSource(html$, runStreamAdapter, name);
	    }
	    ;
	    htmlDriver.streamAdapter = xstream_adapter_1.default;
	    return htmlDriver;
	}
	exports.makeHTMLDriver = makeHTMLDriver;
	//# sourceMappingURL=makeHTMLDriver.js.map

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var xstream_1 = __webpack_require__(5);
	var xstream_adapter_1 = __webpack_require__(4);
	var HTMLSource = (function () {
	    function HTMLSource(html$, runSA, _name) {
	        this.runSA = runSA;
	        this._name = _name;
	        this._html$ = html$;
	        this._empty$ = runSA.adapt(xstream_1.default.empty(), xstream_adapter_1.default.streamSubscribe);
	    }
	    HTMLSource.prototype.elements = function () {
	        var out = this.runSA.adapt(this._html$, xstream_adapter_1.default.streamSubscribe);
	        out._isCycleSource = this._name;
	        return out;
	    };
	    HTMLSource.prototype.select = function (selector) {
	        return new HTMLSource(xstream_1.default.empty(), this.runSA, this._name);
	    };
	    HTMLSource.prototype.events = function (eventType, options) {
	        var out = this._empty$;
	        out._isCycleSource = this._name;
	        return out;
	    };
	    return HTMLSource;
	}());
	exports.HTMLSource = HTMLSource;
	//# sourceMappingURL=HTMLSource.js.map

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	
	var init = __webpack_require__(98);

	module.exports = init([__webpack_require__(102), __webpack_require__(119)]);

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	
	var parseSelector = __webpack_require__(99);
	var VOID_ELEMENTS = __webpack_require__(100);
	var CONTAINER_ELEMENTS = __webpack_require__(101);

	module.exports = function init(modules) {
	  function parse(data) {
	    return modules.reduce(function (arr, fn) {
	      arr.push(fn(data));
	      return arr;
	    }, []).filter(function (result) {
	      return result !== '';
	    });
	  }

	  return function renderToString(vnode) {
	    if (!vnode.sel && vnode.text) {
	      return vnode.text;
	    }

	    vnode.data = vnode.data || {};

	    // Support thunks
	    if (typeof vnode.sel === 'string' && vnode.sel.slice(0, 5) === 'thunk') {
	      vnode = vnode.data.fn.apply(null, vnode.data.args);
	    }

	    var tagName = parseSelector(vnode.sel).tagName;
	    var attributes = parse(vnode);
	    var svg = vnode.data.ns === 'http://www.w3.org/2000/svg';
	    var tag = [];

	    // Open tag
	    tag.push('<' + tagName);
	    if (attributes.length) {
	      tag.push(' ' + attributes.join(' '));
	    }
	    if (svg && CONTAINER_ELEMENTS[tagName] !== true) {
	      tag.push(' /');
	    }
	    tag.push('>');

	    // Close tag, if needed
	    if (VOID_ELEMENTS[tagName] !== true && !svg || svg && CONTAINER_ELEMENTS[tagName] === true) {
	      if (vnode.data.props && vnode.data.props.innerHTML) {
	        tag.push(vnode.data.props.innerHTML);
	      } else if (vnode.text) {
	        tag.push(vnode.text);
	      } else if (vnode.children) {
	        vnode.children.forEach(function (child) {
	          tag.push(renderToString(child));
	        });
	      }
	      tag.push('</' + tagName + '>');
	    }

	    return tag.join('');
	  };
	};

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	
	// https://github.com/Matt-Esch/virtual-dom/blob/master/virtual-hyperscript/parse-tag.js

	var split = __webpack_require__(32);

	var classIdSplit = /([\.#]?[a-zA-Z0-9\u007F-\uFFFF_:-]+)/;
	var notClassId = /^\.|#/;

	module.exports = function parseSelector(selector, upper) {
	  selector = selector || '';
	  var tagName;
	  var id = '';
	  var classes = [];

	  var tagParts = split(selector, classIdSplit);

	  if (notClassId.test(tagParts[1]) || selector === '') {
	    tagName = 'div';
	  }

	  var part, type, i;

	  for (i = 0; i < tagParts.length; i++) {
	    part = tagParts[i];

	    if (!part) {
	      continue;
	    }

	    type = part.charAt(0);

	    if (!tagName) {
	      tagName = part;
	    } else if (type === '.') {
	      classes.push(part.substring(1, part.length));
	    } else if (type === '#') {
	      id = part.substring(1, part.length);
	    }
	  }

	  return {
	    tagName: upper === true ? tagName.toUpperCase() : tagName,
	    id: id,
	    className: classes.join(' ')
	  };
	};

/***/ },
/* 100 */
/***/ function(module, exports) {

	
	// http://www.w3.org/html/wg/drafts/html/master/syntax.html#void-elements

	module.exports = {
	  area: true,
	  base: true,
	  br: true,
	  col: true,
	  embed: true,
	  hr: true,
	  img: true,
	  input: true,
	  keygen: true,
	  link: true,
	  meta: true,
	  param: true,
	  source: true,
	  track: true,
	  wbr: true
	};

/***/ },
/* 101 */
/***/ function(module, exports) {

	
	// All SVG children elements, not in this list, should self-close

	module.exports = {
	  // http://www.w3.org/TR/SVG/intro.html#TermContainerElement
	  'a': true,
	  'defs': true,
	  'glyph': true,
	  'g': true,
	  'marker': true,
	  'mask': true,
	  'missing-glyph': true,
	  'pattern': true,
	  'svg': true,
	  'switch': true,
	  'symbol': true,

	  // http://www.w3.org/TR/SVG/intro.html#TermDescriptiveElement
	  'desc': true,
	  'metadata': true,
	  'title': true
	};

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	
	var forOwn = __webpack_require__(103);
	var escape = __webpack_require__(110);
	var union = __webpack_require__(112);

	var parseSelector = __webpack_require__(99);

	// data.attrs, data.props, data.class

	module.exports = function attributes(vnode) {
	  var selector = parseSelector(vnode.sel);
	  var parsedClasses = selector.className.split(' ');

	  var attributes = [];
	  var classes = [];
	  var values = {};

	  if (selector.id) {
	    values.id = selector.id;
	  }

	  setAttributes(vnode.data.props, values);
	  setAttributes(vnode.data.attrs, values); // `attrs` override `props`, not sure if this is good so

	  if (vnode.data.class) {
	    // Omit `className` attribute if `class` is set on vnode
	    values.class = undefined;
	  }
	  forOwn(vnode.data.class, function (value, key) {
	    if (value === true) {
	      classes.push(key);
	    }
	  });
	  classes = union(classes, values.class, parsedClasses).filter(function (x) {
	    return x !== '';
	  });

	  if (classes.length) {
	    values.class = classes.join(' ');
	  }

	  forOwn(values, function (value, key) {
	    attributes.push(value === true ? key : key + '="' + escape(value) + '"');
	  });

	  return attributes.length ? attributes.join(' ') : '';
	};

	function setAttributes(values, target) {
	  forOwn(values, function (value, key) {
	    if (key === 'htmlFor') {
	      target['for'] = value;
	      return;
	    }
	    if (key === 'className') {
	      target['class'] = value.split(' ');
	      return;
	    }
	    if (key === 'innerHTML') {
	      return;
	    }
	    target[key] = value;
	  });
	}

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var baseFor = __webpack_require__(104),
	    bindCallback = __webpack_require__(105),
	    keys = __webpack_require__(106);

	/**
	 * The base implementation of `_.forOwn` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return baseFor(object, iteratee, keys);
	}

	/**
	 * Creates a function for `_.forOwn` or `_.forOwnRight`.
	 *
	 * @private
	 * @param {Function} objectFunc The function to iterate over an object.
	 * @returns {Function} Returns the new each function.
	 */
	function createForOwn(objectFunc) {
	  return function(object, iteratee, thisArg) {
	    if (typeof iteratee != 'function' || thisArg !== undefined) {
	      iteratee = bindCallback(iteratee, thisArg, 3);
	    }
	    return objectFunc(object, iteratee);
	  };
	}

	/**
	 * Iterates over own enumerable properties of an object invoking `iteratee`
	 * for each property. The `iteratee` is bound to `thisArg` and invoked with
	 * three arguments: (value, key, object). Iteratee functions may exit iteration
	 * early by explicitly returning `false`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @param {*} [thisArg] The `this` binding of `iteratee`.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.forOwn(new Foo, function(value, key) {
	 *   console.log(key);
	 * });
	 * // => logs 'a' and 'b' (iteration order is not guaranteed)
	 */
	var forOwn = createForOwn(baseForOwn);

	module.exports = forOwn;


/***/ },
/* 104 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.3 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/**
	 * The base implementation of `baseForIn` and `baseForOwn` which iterates
	 * over `object` properties returned by `keysFunc` invoking `iteratee` for
	 * each property. Iteratee functions may exit iteration early by explicitly
	 * returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();

	/**
	 * Creates a base function for methods like `_.forIn`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var index = -1,
	        iterable = Object(object),
	        props = keysFunc(object),
	        length = props.length;

	    while (length--) {
	      var key = props[fromRight ? length : ++index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}

	module.exports = baseFor;


/***/ },
/* 105 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/**
	 * A specialized version of `baseCallback` which only supports `this` binding
	 * and specifying the number of arguments to provide to `func`.
	 *
	 * @private
	 * @param {Function} func The function to bind.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {number} [argCount] The number of arguments to provide to `func`.
	 * @returns {Function} Returns the callback.
	 */
	function bindCallback(func, thisArg, argCount) {
	  if (typeof func != 'function') {
	    return identity;
	  }
	  if (thisArg === undefined) {
	    return func;
	  }
	  switch (argCount) {
	    case 1: return function(value) {
	      return func.call(thisArg, value);
	    };
	    case 3: return function(value, index, collection) {
	      return func.call(thisArg, value, index, collection);
	    };
	    case 4: return function(accumulator, value, index, collection) {
	      return func.call(thisArg, accumulator, value, index, collection);
	    };
	    case 5: return function(value, other, key, object, source) {
	      return func.call(thisArg, value, other, key, object, source);
	    };
	  }
	  return function() {
	    return func.apply(thisArg, arguments);
	  };
	}

	/**
	 * This method returns the first argument provided to it.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * _.identity(object) === object;
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = bindCallback;


/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.1.2 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var getNative = __webpack_require__(107),
	    isArguments = __webpack_require__(108),
	    isArray = __webpack_require__(109);

	/** Used to detect unsigned integer values. */
	var reIsUint = /^\d+$/;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeKeys = getNative(Object, 'keys');

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}

	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');

	/**
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
	}

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * A fallback implementation of `Object.keys` which creates an array of the
	 * own enumerable property names of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function shimKeys(object) {
	  var props = keysIn(object),
	      propsLength = props.length,
	      length = propsLength && object.length;

	  var allowIndexes = !!length && isLength(length) &&
	    (isArray(object) || isArguments(object));

	  var index = -1,
	      result = [];

	  while (++index < propsLength) {
	    var key = props[index];
	    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	var keys = !nativeKeys ? shimKeys : function(object) {
	  var Ctor = object == null ? undefined : object.constructor;
	  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
	      (typeof object != 'function' && isArrayLike(object))) {
	    return shimKeys(object);
	  }
	  return isObject(object) ? nativeKeys(object) : [];
	};

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  if (object == null) {
	    return [];
	  }
	  if (!isObject(object)) {
	    object = Object(object);
	  }
	  var length = object.length;
	  length = (length && isLength(length) &&
	    (isArray(object) || isArguments(object)) && length) || 0;

	  var Ctor = object.constructor,
	      index = -1,
	      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
	      result = Array(length),
	      skipIndexes = length > 0;

	  while (++index < length) {
	    result[index] = (index + '');
	  }
	  for (var key in object) {
	    if (!(skipIndexes && isIndex(key, length)) &&
	        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = keys;


/***/ },
/* 107 */
/***/ function(module, exports) {

	/**
	 * lodash 3.9.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** `Object#toString` result references. */
	var funcTag = '[object Function]';

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 equivalents which return 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
	}

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}

	module.exports = getNative;


/***/ },
/* 108 */
/***/ function(module, exports) {

	/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
	    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction(value);
	}

	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8-9 which returns 'object' for typed array and other constructors.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	module.exports = isArguments;


/***/ },
/* 109 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** `Object#toString` result references. */
	var arrayTag = '[object Array]',
	    funcTag = '[object Function]';

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeIsArray = getNative(Array, 'isArray');

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(function() { return arguments; }());
	 * // => false
	 */
	var isArray = nativeIsArray || function(value) {
	  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
	};

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 equivalents which return 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
	}

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}

	module.exports = isArray;


/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.2.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var root = __webpack_require__(111);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/** Used to match HTML entities and HTML characters. */
	var reUnescapedHtml = /[&<>"'`]/g,
	    reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

	/** Used to map characters to HTML entities. */
	var htmlEscapes = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;',
	  "'": '&#39;',
	  '`': '&#96;'
	};

	/**
	 * Used by `_.escape` to convert characters to HTML entities.
	 *
	 * @private
	 * @param {string} chr The matched character to escape.
	 * @returns {string} Returns the escaped character.
	 */
	function escapeHtmlChar(chr) {
	  return htmlEscapes[chr];
	}

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Built-in value references. */
	var Symbol = root.Symbol;

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolToString = Symbol ? symbolProto.toString : undefined;

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}

	/**
	 * Converts `value` to a string if it's not one. An empty string is returned
	 * for `null` and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (value == null) {
	    return '';
	  }
	  if (isSymbol(value)) {
	    return Symbol ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	/**
	 * Converts the characters "&", "<", ">", '"', "'", and "\`" in `string` to
	 * their corresponding HTML entities.
	 *
	 * **Note:** No other characters are escaped. To escape additional
	 * characters use a third-party library like [_he_](https://mths.be/he).
	 *
	 * Though the ">" character is escaped for symmetry, characters like
	 * ">" and "/" don't need escaping in HTML and have no special meaning
	 * unless they're part of a tag or unquoted attribute value.
	 * See [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
	 * (under "semi-related fun fact") for more details.
	 *
	 * Backticks are escaped because in IE < 9, they can break out of
	 * attribute values or HTML comments. See [#59](https://html5sec.org/#59),
	 * [#102](https://html5sec.org/#102), [#108](https://html5sec.org/#108), and
	 * [#133](https://html5sec.org/#133) of the [HTML5 Security Cheatsheet](https://html5sec.org/)
	 * for more details.
	 *
	 * When working with HTML you should always [quote attribute values](http://wonko.com/post/html-escaping)
	 * to reduce XSS vectors.
	 *
	 * @static
	 * @memberOf _
	 * @category String
	 * @param {string} [string=''] The string to escape.
	 * @returns {string} Returns the escaped string.
	 * @example
	 *
	 * _.escape('fred, barney, & pebbles');
	 * // => 'fred, barney, &amp; pebbles'
	 */
	function escape(string) {
	  string = toString(string);
	  return (string && reHasUnescapedHtml.test(string))
	    ? string.replace(reUnescapedHtml, escapeHtmlChar)
	    : string;
	}

	module.exports = escape;


/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module, global) {/**
	 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** Used to determine if values are of the language type `Object`. */
	var objectTypes = {
	  'function': true,
	  'object': true
	};

	/** Detect free variable `exports`. */
	var freeExports = (objectTypes[typeof exports] && exports && !exports.nodeType)
	  ? exports
	  : undefined;

	/** Detect free variable `module`. */
	var freeModule = (objectTypes[typeof module] && module && !module.nodeType)
	  ? module
	  : undefined;

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = checkGlobal(freeExports && freeModule && typeof global == 'object' && global);

	/** Detect free variable `self`. */
	var freeSelf = checkGlobal(objectTypes[typeof self] && self);

	/** Detect free variable `window`. */
	var freeWindow = checkGlobal(objectTypes[typeof window] && window);

	/** Detect `this` as the global object. */
	var thisGlobal = checkGlobal(objectTypes[typeof this] && this);

	/**
	 * Used as a reference to the global object.
	 *
	 * The `this` value is used if it's the global object to avoid Greasemonkey's
	 * restricted `window` object, otherwise the `window` object is used.
	 */
	var root = freeGlobal ||
	  ((freeWindow !== (thisGlobal && thisGlobal.window)) && freeWindow) ||
	    freeSelf || thisGlobal || Function('return this')();

	/**
	 * Checks if `value` is a global object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {null|Object} Returns `value` if it's a global object, else `null`.
	 */
	function checkGlobal(value) {
	  return (value && value.Object === Object) ? value : null;
	}

	module.exports = root;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)(module), (function() { return this; }())))

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.1.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var baseFlatten = __webpack_require__(113),
	    baseUniq = __webpack_require__(114),
	    restParam = __webpack_require__(118);

	/**
	 * Creates an array of unique values, in order, of the provided arrays using
	 * `SameValueZero` for equality comparisons.
	 *
	 * **Note:** [`SameValueZero`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
	 * comparisons are like strict equality comparisons, e.g. `===`, except that
	 * `NaN` matches `NaN`.
	 *
	 * @static
	 * @memberOf _
	 * @category Array
	 * @param {...Array} [arrays] The arrays to inspect.
	 * @returns {Array} Returns the new array of combined values.
	 * @example
	 *
	 * _.union([1, 2], [4, 2], [2, 1]);
	 * // => [1, 2, 4]
	 */
	var union = restParam(function(arrays) {
	  return baseUniq(baseFlatten(arrays, false, true));
	});

	module.exports = union;


/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.1.4 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var isArguments = __webpack_require__(108),
	    isArray = __webpack_require__(109);

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Appends the elements of `values` to `array`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to append.
	 * @returns {Array} Returns `array`.
	 */
	function arrayPush(array, values) {
	  var index = -1,
	      length = values.length,
	      offset = array.length;

	  while (++index < length) {
	    array[offset + index] = values[index];
	  }
	  return array;
	}

	/**
	 * The base implementation of `_.flatten` with added support for restricting
	 * flattening and specifying the start index.
	 *
	 * @private
	 * @param {Array} array The array to flatten.
	 * @param {boolean} [isDeep] Specify a deep flatten.
	 * @param {boolean} [isStrict] Restrict flattening to arrays-like objects.
	 * @param {Array} [result=[]] The initial result value.
	 * @returns {Array} Returns the new flattened array.
	 */
	function baseFlatten(array, isDeep, isStrict, result) {
	  result || (result = []);

	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    var value = array[index];
	    if (isObjectLike(value) && isArrayLike(value) &&
	        (isStrict || isArray(value) || isArguments(value))) {
	      if (isDeep) {
	        // Recursively flatten arrays (susceptible to call stack limits).
	        baseFlatten(value, isDeep, isStrict, result);
	      } else {
	        arrayPush(result, value);
	      }
	    } else if (!isStrict) {
	      result[result.length] = value;
	    }
	  }
	  return result;
	}

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}

	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');

	/**
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
	}

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = baseFlatten;


/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.0.3 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var baseIndexOf = __webpack_require__(115),
	    cacheIndexOf = __webpack_require__(116),
	    createCache = __webpack_require__(117);

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * The base implementation of `_.uniq` without support for callback shorthands
	 * and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Function} [iteratee] The function invoked per iteration.
	 * @returns {Array} Returns the new duplicate-value-free array.
	 */
	function baseUniq(array, iteratee) {
	  var index = -1,
	      indexOf = baseIndexOf,
	      length = array.length,
	      isCommon = true,
	      isLarge = isCommon && length >= LARGE_ARRAY_SIZE,
	      seen = isLarge ? createCache() : null,
	      result = [];

	  if (seen) {
	    indexOf = cacheIndexOf;
	    isCommon = false;
	  } else {
	    isLarge = false;
	    seen = iteratee ? [] : result;
	  }
	  outer:
	  while (++index < length) {
	    var value = array[index],
	        computed = iteratee ? iteratee(value, index, array) : value;

	    if (isCommon && value === value) {
	      var seenIndex = seen.length;
	      while (seenIndex--) {
	        if (seen[seenIndex] === computed) {
	          continue outer;
	        }
	      }
	      if (iteratee) {
	        seen.push(computed);
	      }
	      result.push(value);
	    }
	    else if (indexOf(seen, computed, 0) < 0) {
	      if (iteratee || isLarge) {
	        seen.push(computed);
	      }
	      result.push(value);
	    }
	  }
	  return result;
	}

	module.exports = baseUniq;


/***/ },
/* 115 */
/***/ function(module, exports) {

	/**
	 * lodash 3.1.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/**
	 * The base implementation of `_.indexOf` without support for binary searches.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseIndexOf(array, value, fromIndex) {
	  if (value !== value) {
	    return indexOfNaN(array, fromIndex);
	  }
	  var index = fromIndex - 1,
	      length = array.length;

	  while (++index < length) {
	    if (array[index] === value) {
	      return index;
	    }
	  }
	  return -1;
	}

	/**
	 * Gets the index at which the first occurrence of `NaN` is found in `array`.
	 * If `fromRight` is provided elements of `array` are iterated from right to left.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {number} fromIndex The index to search from.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {number} Returns the index of the matched `NaN`, else `-1`.
	 */
	function indexOfNaN(array, fromIndex, fromRight) {
	  var length = array.length,
	      index = fromIndex + (fromRight ? 0 : -1);

	  while ((fromRight ? index-- : ++index < length)) {
	    var other = array[index];
	    if (other !== other) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = baseIndexOf;


/***/ },
/* 116 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/**
	 * Checks if `value` is in `cache` mimicking the return signature of
	 * `_.indexOf` by returning `0` if the value is found, else `-1`.
	 *
	 * @private
	 * @param {Object} cache The cache to search.
	 * @param {*} value The value to search for.
	 * @returns {number} Returns `0` if `value` is found, else `-1`.
	 */
	function cacheIndexOf(cache, value) {
	  var data = cache.data,
	      result = (typeof value == 'string' || isObject(value)) ? data.set.has(value) : data.hash[value];

	  return result ? 0 : -1;
	}

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	module.exports = cacheIndexOf;


/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * lodash 3.1.2 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var getNative = __webpack_require__(107);

	/** Native method references. */
	var Set = getNative(global, 'Set');

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeCreate = getNative(Object, 'create');

	/**
	 *
	 * Creates a cache object to store unique values.
	 *
	 * @private
	 * @param {Array} [values] The values to cache.
	 */
	function SetCache(values) {
	  var length = values ? values.length : 0;

	  this.data = { 'hash': nativeCreate(null), 'set': new Set };
	  while (length--) {
	    this.push(values[length]);
	  }
	}

	/**
	 * Adds `value` to the cache.
	 *
	 * @private
	 * @name push
	 * @memberOf SetCache
	 * @param {*} value The value to cache.
	 */
	function cachePush(value) {
	  var data = this.data;
	  if (typeof value == 'string' || isObject(value)) {
	    data.set.add(value);
	  } else {
	    data.hash[value] = true;
	  }
	}

	/**
	 * Creates a `Set` cache object to optimize linear searches of large arrays.
	 *
	 * @private
	 * @param {Array} [values] The values to cache.
	 * @returns {null|Object} Returns the new cache object if `Set` is supported, else `null`.
	 */
	function createCache(values) {
	  return (nativeCreate && Set) ? new SetCache(values) : null;
	}

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	// Add functions to the `Set` cache.
	SetCache.prototype.push = cachePush;

	module.exports = createCache;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 118 */
/***/ function(module, exports) {

	/**
	 * lodash 3.6.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * Creates a function that invokes `func` with the `this` binding of the
	 * created function and arguments from `start` and beyond provided as an array.
	 *
	 * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters).
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var say = _.restParam(function(what, names) {
	 *   return what + ' ' + _.initial(names).join(', ') +
	 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
	 * });
	 *
	 * say('hello', 'fred', 'barney', 'pebbles');
	 * // => 'hello fred, barney, & pebbles'
	 */
	function restParam(func, start) {
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        rest = Array(length);

	    while (++index < length) {
	      rest[index] = args[start + index];
	    }
	    switch (start) {
	      case 0: return func.call(this, rest);
	      case 1: return func.call(this, args[0], rest);
	      case 2: return func.call(this, args[0], args[1], rest);
	    }
	    var otherArgs = Array(start + 1);
	    index = -1;
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = rest;
	    return func.apply(this, otherArgs);
	  };
	}

	module.exports = restParam;


/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var forOwn = __webpack_require__(103);
	var escape = __webpack_require__(110);
	var kebabCase = __webpack_require__(120);

	// data.style

	module.exports = function style(vnode) {
	  var styles = [];
	  var style = vnode.data.style || {};

	  // merge in `delayed` properties
	  if (style.delayed) {
	    _extends(style, style.delayed);
	  }

	  forOwn(style, function (value, key) {
	    // omit hook objects
	    if (typeof value === 'string') {
	      styles.push(kebabCase(key) + ': ' + escape(value));
	    }
	  });

	  return styles.length ? 'style="' + styles.join('; ') + '"' : '';
	};

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.1.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var deburr = __webpack_require__(121),
	    words = __webpack_require__(122);

	/**
	 * A specialized version of `_.reduce` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {*} [accumulator] The initial value.
	 * @param {boolean} [initAccum] Specify using the first element of `array` as the initial value.
	 * @returns {*} Returns the accumulated value.
	 */
	function arrayReduce(array, iteratee, accumulator, initAccum) {
	  var index = -1,
	      length = array.length;

	  if (initAccum && length) {
	    accumulator = array[++index];
	  }
	  while (++index < length) {
	    accumulator = iteratee(accumulator, array[index], index, array);
	  }
	  return accumulator;
	}

	/**
	 * Creates a function like `_.camelCase`.
	 *
	 * @private
	 * @param {Function} callback The function to combine each word.
	 * @returns {Function} Returns the new compounder function.
	 */
	function createCompounder(callback) {
	  return function(string) {
	    return arrayReduce(words(deburr(string)), callback, '');
	  };
	}

	/**
	 * Converts `string` to [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
	 *
	 * @static
	 * @memberOf _
	 * @category String
	 * @param {string} [string=''] The string to convert.
	 * @returns {string} Returns the kebab cased string.
	 * @example
	 *
	 * _.kebabCase('Foo Bar');
	 * // => 'foo-bar'
	 *
	 * _.kebabCase('fooBar');
	 * // => 'foo-bar'
	 *
	 * _.kebabCase('__foo_bar__');
	 * // => 'foo-bar'
	 */
	var kebabCase = createCompounder(function(result, word, index) {
	  return result + (index ? '-' : '') + word.toLowerCase();
	});

	module.exports = kebabCase;


/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.2.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var root = __webpack_require__(111);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/** Used to match latin-1 supplementary letters (excluding mathematical operators). */
	var reLatin1 = /[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g;

	/** Used to compose unicode character classes. */
	var rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23',
	    rsComboSymbolsRange = '\\u20d0-\\u20f0';

	/** Used to compose unicode capture groups. */
	var rsCombo = '[' + rsComboMarksRange + rsComboSymbolsRange + ']';

	/**
	 * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
	 * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
	 */
	var reComboMark = RegExp(rsCombo, 'g');

	/** Used to map latin-1 supplementary letters to basic latin letters. */
	var deburredLetters = {
	  '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
	  '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
	  '\xc7': 'C',  '\xe7': 'c',
	  '\xd0': 'D',  '\xf0': 'd',
	  '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
	  '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
	  '\xcC': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
	  '\xeC': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
	  '\xd1': 'N',  '\xf1': 'n',
	  '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
	  '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
	  '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
	  '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
	  '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
	  '\xc6': 'Ae', '\xe6': 'ae',
	  '\xde': 'Th', '\xfe': 'th',
	  '\xdf': 'ss'
	};

	/**
	 * Used by `_.deburr` to convert latin-1 supplementary letters to basic latin letters.
	 *
	 * @private
	 * @param {string} letter The matched letter to deburr.
	 * @returns {string} Returns the deburred letter.
	 */
	function deburrLetter(letter) {
	  return deburredLetters[letter];
	}

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Built-in value references. */
	var Symbol = root.Symbol;

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolToString = Symbol ? symbolProto.toString : undefined;

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}

	/**
	 * Converts `value` to a string if it's not one. An empty string is returned
	 * for `null` and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (value == null) {
	    return '';
	  }
	  if (isSymbol(value)) {
	    return Symbol ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	/**
	 * Deburrs `string` by converting [latin-1 supplementary letters](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
	 * to basic latin letters and removing [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
	 *
	 * @static
	 * @memberOf _
	 * @category String
	 * @param {string} [string=''] The string to deburr.
	 * @returns {string} Returns the deburred string.
	 * @example
	 *
	 * _.deburr('déjà vu');
	 * // => 'deja vu'
	 */
	function deburr(string) {
	  string = toString(string);
	  return string && string.replace(reLatin1, deburrLetter).replace(reComboMark, '');
	}

	module.exports = deburr;


/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.2.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var root = __webpack_require__(111);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/** Used to compose unicode character classes. */
	var rsAstralRange = '\\ud800-\\udfff',
	    rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23',
	    rsComboSymbolsRange = '\\u20d0-\\u20f0',
	    rsDingbatRange = '\\u2700-\\u27bf',
	    rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
	    rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
	    rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
	    rsQuoteRange = '\\u2018\\u2019\\u201c\\u201d',
	    rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
	    rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
	    rsVarRange = '\\ufe0e\\ufe0f',
	    rsBreakRange = rsMathOpRange + rsNonCharRange + rsQuoteRange + rsSpaceRange;

	/** Used to compose unicode capture groups. */
	var rsBreak = '[' + rsBreakRange + ']',
	    rsCombo = '[' + rsComboMarksRange + rsComboSymbolsRange + ']',
	    rsDigits = '\\d+',
	    rsDingbat = '[' + rsDingbatRange + ']',
	    rsLower = '[' + rsLowerRange + ']',
	    rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
	    rsFitz = '\\ud83c[\\udffb-\\udfff]',
	    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
	    rsNonAstral = '[^' + rsAstralRange + ']',
	    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
	    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
	    rsUpper = '[' + rsUpperRange + ']',
	    rsZWJ = '\\u200d';

	/** Used to compose unicode regexes. */
	var rsLowerMisc = '(?:' + rsLower + '|' + rsMisc + ')',
	    rsUpperMisc = '(?:' + rsUpper + '|' + rsMisc + ')',
	    reOptMod = rsModifier + '?',
	    rsOptVar = '[' + rsVarRange + ']?',
	    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
	    rsSeq = rsOptVar + reOptMod + rsOptJoin,
	    rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq;

	/** Used to match non-compound words composed of alphanumeric characters. */
	var reBasicWord = /[a-zA-Z0-9]+/g;

	/** Used to match complex or compound words. */
	var reComplexWord = RegExp([
	  rsUpper + '?' + rsLower + '+(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
	  rsUpperMisc + '+(?=' + [rsBreak, rsUpper + rsLowerMisc, '$'].join('|') + ')',
	  rsUpper + '?' + rsLowerMisc + '+',
	  rsUpper + '+',
	  rsDigits,
	  rsEmoji
	].join('|'), 'g');

	/** Used to detect strings that need a more robust regexp to match words. */
	var reHasComplexWord = /[a-z][A-Z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Built-in value references. */
	var Symbol = root.Symbol;

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolToString = Symbol ? symbolProto.toString : undefined;

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}

	/**
	 * Converts `value` to a string if it's not one. An empty string is returned
	 * for `null` and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (value == null) {
	    return '';
	  }
	  if (isSymbol(value)) {
	    return Symbol ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	/**
	 * Splits `string` into an array of its words.
	 *
	 * @static
	 * @memberOf _
	 * @category String
	 * @param {string} [string=''] The string to inspect.
	 * @param {RegExp|string} [pattern] The pattern to match words.
	 * @param- {Object} [guard] Enables use as an iteratee for functions like `_.map`.
	 * @returns {Array} Returns the words of `string`.
	 * @example
	 *
	 * _.words('fred, barney, & pebbles');
	 * // => ['fred', 'barney', 'pebbles']
	 *
	 * _.words('fred, barney, & pebbles', /[^, ]+/g);
	 * // => ['fred', 'barney', '&', 'pebbles']
	 */
	function words(string, pattern, guard) {
	  string = toString(string);
	  pattern = guard ? undefined : pattern;

	  if (pattern === undefined) {
	    pattern = reHasComplexWord.test(string) ? reComplexWord : reBasicWord;
	  }
	  return string.match(pattern) || [];
	}

	module.exports = words;


/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var xstream_adapter_1 = __webpack_require__(4);
	var xstream_1 = __webpack_require__(5);
	var SCOPE_PREFIX = '___';
	var MockedDOMSource = (function () {
	    function MockedDOMSource(_streamAdapter, _mockConfig) {
	        this._streamAdapter = _streamAdapter;
	        this._mockConfig = _mockConfig;
	        if (_mockConfig.elements) {
	            this._elements = _mockConfig.elements;
	        }
	        else {
	            this._elements = _streamAdapter.adapt(xstream_1.default.empty(), xstream_adapter_1.default.streamSubscribe);
	        }
	    }
	    MockedDOMSource.prototype.elements = function () {
	        var out = this._elements;
	        out._isCycleSource = 'MockedDOM';
	        return out;
	    };
	    MockedDOMSource.prototype.events = function (eventType, options) {
	        var mockConfig = this._mockConfig;
	        var keys = Object.keys(mockConfig);
	        var keysLen = keys.length;
	        for (var i = 0; i < keysLen; i++) {
	            var key = keys[i];
	            if (key === eventType) {
	                var out_1 = mockConfig[key];
	                out_1._isCycleSource = 'MockedDOM';
	                return out_1;
	            }
	        }
	        var out = this._streamAdapter.adapt(xstream_1.default.empty(), xstream_adapter_1.default.streamSubscribe);
	        out._isCycleSource = 'MockedDOM';
	        return out;
	    };
	    MockedDOMSource.prototype.select = function (selector) {
	        var mockConfig = this._mockConfig;
	        var keys = Object.keys(mockConfig);
	        var keysLen = keys.length;
	        for (var i = 0; i < keysLen; i++) {
	            var key = keys[i];
	            if (key === selector) {
	                return new MockedDOMSource(this._streamAdapter, mockConfig[key]);
	            }
	        }
	        return new MockedDOMSource(this._streamAdapter, {});
	    };
	    MockedDOMSource.prototype.isolateSource = function (source, scope) {
	        return source.select('.' + SCOPE_PREFIX + scope);
	    };
	    MockedDOMSource.prototype.isolateSink = function (sink, scope) {
	        return sink.map(function (vnode) {
	            if (vnode.sel && vnode.sel.indexOf(SCOPE_PREFIX + scope) !== -1) {
	                return vnode;
	            }
	            else {
	                vnode.sel += "." + SCOPE_PREFIX + scope;
	                return vnode;
	            }
	        });
	    };
	    return MockedDOMSource;
	}());
	exports.MockedDOMSource = MockedDOMSource;
	function mockDOMSource(streamAdapter, mockConfig) {
	    return new MockedDOMSource(streamAdapter, mockConfig);
	}
	exports.mockDOMSource = mockDOMSource;
	//# sourceMappingURL=mockDOMSource.js.map

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var hyperscript_1 = __webpack_require__(29);
	function isValidString(param) {
	    return typeof param === 'string' && param.length > 0;
	}
	function isSelector(param) {
	    return isValidString(param) && (param[0] === '.' || param[0] === '#');
	}
	function createTagFunction(tagName) {
	    return function hyperscript(first, b, c) {
	        if (isSelector(first)) {
	            if (typeof b !== 'undefined' && typeof c !== 'undefined') {
	                return hyperscript_1.h(tagName + first, b, c);
	            }
	            else if (typeof b !== 'undefined') {
	                return hyperscript_1.h(tagName + first, b);
	            }
	            else {
	                return hyperscript_1.h(tagName + first, {});
	            }
	        }
	        else if (!!b) {
	            return hyperscript_1.h(tagName, first, b);
	        }
	        else if (!!first) {
	            return hyperscript_1.h(tagName, first);
	        }
	        else {
	            return hyperscript_1.h(tagName, {});
	        }
	    };
	}
	var SVG_TAG_NAMES = [
	    'a', 'altGlyph', 'altGlyphDef', 'altGlyphItem', 'animate', 'animateColor',
	    'animateMotion', 'animateTransform', 'circle', 'clipPath', 'colorProfile',
	    'cursor', 'defs', 'desc', 'ellipse', 'feBlend', 'feColorMatrix',
	    'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting',
	    'feDisplacementMap', 'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB',
	    'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode',
	    'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting',
	    'feSpotlight', 'feTile', 'feTurbulence', 'filter', 'font', 'fontFace',
	    'fontFaceFormat', 'fontFaceName', 'fontFaceSrc', 'fontFaceUri',
	    'foreignObject', 'g', 'glyph', 'glyphRef', 'hkern', 'image', 'line',
	    'linearGradient', 'marker', 'mask', 'metadata', 'missingGlyph', 'mpath',
	    'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'script',
	    'set', 'stop', 'style', 'switch', 'symbol', 'text', 'textPath', 'title',
	    'tref', 'tspan', 'use', 'view', 'vkern',
	];
	var svg = createTagFunction('svg');
	SVG_TAG_NAMES.forEach(function (tag) {
	    svg[tag] = createTagFunction(tag);
	});
	var TAG_NAMES = [
	    'a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base',
	    'bdi', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption',
	    'cite', 'code', 'col', 'colgroup', 'dd', 'del', 'dfn', 'dir', 'div', 'dl',
	    'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form',
	    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html',
	    'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend',
	    'li', 'link', 'main', 'map', 'mark', 'menu', 'meta', 'nav', 'noscript',
	    'object', 'ol', 'optgroup', 'option', 'p', 'param', 'pre', 'progress', 'q',
	    'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small',
	    'source', 'span', 'strong', 'style', 'sub', 'sup', 'table', 'tbody', 'td',
	    'textarea', 'tfoot', 'th', 'thead', 'title', 'tr', 'u', 'ul', 'video',
	];
	var exported = { SVG_TAG_NAMES: SVG_TAG_NAMES, TAG_NAMES: TAG_NAMES, svg: svg, isSelector: isSelector, createTagFunction: createTagFunction };
	TAG_NAMES.forEach(function (n) {
	    exported[n] = createTagFunction(n);
	});
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = exported;
	//# sourceMappingURL=hyperscript-helpers.js.map

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _calculations$prototy;

	var _dom = __webpack_require__(10);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var score = 0;
	var goals = 0;
	var operator = 'add';
	var Monad = function Monad() {
	  var z = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 42;
	  var g = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'generic';

	  var _this = this;
	  this.x = z;
	  this.id = g;
	  this.bnd = function (func) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    var m = func.apply(undefined, [this.x].concat(args));
	    if (m instanceof Monad) {
	      return window[this.id] = new Monad(m.x, this.id);
	    } else return m;
	  };
	  this.ret = function (a) {
	    return window[_this.id] = new Monad(a, _this.id);
	  };
	};

	var monadIt = (0, _dom.h)('pre', { style: { color: '#AFEEEE' } }, '  var MonadItter = function MonadItter() {\n    this.p = function () {};\n    this.release = function () {\n      return this.p.apply(this, arguments);\n    };\n    this.bnd = function (func) {\n      return this.p = func;\n    };\n  }; ');

	var ret = (0, _dom.h)('pre', { style: { color: '#AFEEEE' } }, '    function ret(v, id = \'temp\') {\n      return window[id] = (new Monad(v, id));\n    } ');

	var driver = (0, _dom.h)('pre', '  var websocketsDriver = function () {\n      return create((add) => {\n        socket.onmessage = msg => add(msg)\n      })\n  };\n');

	var messages = (0, _dom.h)('pre', '  const messages$ = sources.WS.map( e => {\n    console.log(e);\n    mMtem.ret(e.data.split(\',\')).bnd( v => {\n  console.log(\'Websockets e.data.split message v: \', v );    \n  mMZ10.bnd( () => {\n    updateNums([v[7], v[8], 0, [], [v[3], v[4], v[5], v[6]]]);\n  }); \n    mMZ12.bnd( () => mM6.ret(v[2] + \' successfully logged in.\'));\n    mMZ13.bnd( () => {\n      var message = v.slice(3,v.length).join(\', \');\n      var str = v[2] + \': \' + message;\n      messages.unshift(h(\'span\', str ),h(\'br\'));  \n   });\n  mMZ14.bnd( () => {\n    mMgoals2.ret(\'The winner is \' + v[2]);\n    setTimeout(() => mMgoals2.ret(\'\'), 5000 );\n  });\n  mMZ15.bnd( () => {\n    mMgoals2.ret(\'A player named \' + v[2] + \n      \' is currently logged in. Page will refresh in 4 seconds.\')\n    refresh() });\n  mMZ16.bnd( () => testComments(e.data));\n  mMZ17.bnd( () => testTask(v[2], v[3], e.data) ); \n  mMZ18.bnd( () => {\n    if (pMgroup.x != \'solo\' || pMname.x === v[2] ) updatePlayers(e.data)  });\n  mMZ19.bnd( () => testComments(e.data)); \n  })       \n  mMtemp.ret(e.data.split(\',\')[0])\n  .bnd(next, \'CA#$42\', mMZ10)\n  .bnd(next, \'CD#$42\', mMZ13)\n  .bnd(next, \'CE#$42\', mMZ14)\n  .bnd(next, \'EE#$42\', mMZ15)\n  .bnd(next, \'TG#$41\', mMZ16)\n  .bnd(next, \'DD#$42\', mMZ17)\n  .bnd(next, \'NN#$42\', mMZ18)\n  .bnd(next, \'GG#$42\', mMZ19)\n  .bnd(next, \'TG#$40\', mMZ20)\n  });\n        \nfunction next(x, y, instance, z) {\n  if (x == y) {\n      instance.release(z);\n  }\n  return ret(x);\n};  ');

	var MonadSet = (0, _dom.h)('pre', '  var MonadSet = function MonadSet(set, ID) {\n    this.s = set;\n    this.bnd = (func, ...args) => func(this.s, ...args);\n    this.add = a => new MonadSet(s.add(a), this.id);\n    this.delete = a => new MonadSet(s.delete(a), this.id);\n    this.clear = () => new MonadSet(s.clear(), this.id);\n  };  ');

	var arrayFuncs = (0, _dom.h)('pre', '  var push = function push(y,v,mon) {\n      if (Array.isArray(y)) {\n        let ar = [];\n        let keys = Object.keys(y);\n        for (let k in keys) {ar[k] = y[k]};\n        ar.push(v);\n        return mon.ret(ar);\n      }\n      console.log(\'The value provided to push is not an array\');\n      return ret(y);\n    };\n\n    var spliceRemove = function splice(x, j, mon) {\n      if (Array.isArray(x)) {\n        let ar = [];\n        let keys = Object.keys(x);\n        for (let k in keys) {ar[k] = x[k]};\n        ar.splice(j,1);\n        return mon.ret(ar);\n      }\n      console.log(\'The value provided to spliceRemove is not an array\');\n      return ret(x);\n    };\n\n    var spliceAdd = function splice(x, index, value, mon) {\n      if (Array.isArray(x)) {\n        let ar = [];\n        let keys = Object.keys(x);\n        for (let k in keys) {ar[k] = x[k]};\n        ar.splice(index, 0, value);\n        return mon.ret(ar);\n      }\n      console.log(\'The value provided to spliceAdd is not an array\');\n      return ret(x);\n    };\n\n    var splice = function splice(x, start, end, mon) {\n      if (Array.isArray(x)) {\n        let ar = [];\n        let keys = Object.keys(x);\n        for (let k in keys) {ar[k] = x[k]};\n        ar.splice(start, end);\n        return mon.ret(ar);\n      }\n      console.log(\'The value provided to spliceAdd is not an array\');\n      return ret(x);\n    };\n  ');

	var cleanup = (0, _dom.h)('pre', '  function cleanup (x) {\n      let target0 = document.getElementById(\'0\');\n      let target1 = document.getElementById(\'1\');\n      let target2 = document.getElementById(\'2\');\n      let target3 = document.getElementById(\'3\');\n      let targetAr = [target0, target1, target2, target3];\n      for (let i in [0,1,2,3]) {\n        if (targetAr[i].innerHTML === \'undefined\' )    {\n          targetAr[i].style.display = \'none\';\n        }\n        else {\n          targetAr[i].style.display = \'inline\';\n        }\n      }\n      return ret(x);\n  }; ');

	var C42 = (0, _dom.h)('pre', '  mMZ10.bnd(() => mM$1\n     .ret([mMar.x[3], mMar.x[4], mMar.x[5], mMar.x[6]])\n     .bnd(() => mM$2.ret([]))\n     .bnd(displayInline,\'0\')\n     .bnd(displayInline,\'1\')\n     .bnd(displayInline,\'2\')\n     .bnd(displayInline,\'3\'));  ');

	var taskStream = (0, _dom.h)('pre', '\n      ');

	var deleteTask2 = (0, _dom.h)('pre', '  mMZ19.bnd(() => mM$task.bnd(spliceRemove, mMar.x[3], mM$task));\n  ');

	var newTask = (0, _dom.h)('pre', '  const newTask$ = sources.DOM\n    .select(\'input.newTask\').events(\'keydown\');\n\n  const newTaskAction$ = newTask$.map(e => {\n      let ob = {};\n      var alert = \'\';\n      var ar = e.target.value.split(\',\');\n      var ar2 = ar.slice(2);\n      var task = \'\';\n      if (ar.length < 4) {\n        task = ar[2];\n      }\n      if (ar.length > 3) {\n        task = ar2.reduce((a,b) => a + \'$*$*$\' + b);\n      }\n      if( e.keyCode === 13 ) {\n        if ( ar.length < 3 ) {\n          alert = \'You should enter "author, responsible party, task" separated by commas\';\n          document.getElementById(\'alert\').innerHTML = alert;\n        }\n\n        else if ( (mMar2.x.filter(v => (v.task === task)).length) > 0 ) {\n          document.getElementById(\'alert\').innerHTML = task + " is already listed.";\n        }\n\n        else if ( ar.length > 2 ) {\n          mM$taskList.bnd(addString, task + \',yellow, none, false,\' +  ar[0] + \',\' + ar[1], mM$taskList);\n          e.target.value = \'\';\n          document.getElementById(\'alert\').innerHTML = \'\';\n        }\n      }\n  };  ');

	var process = (0, _dom.h)('pre', '  const process = function(str) {\n    let a = str.split(",");\n    console.log(\'In process. str and a are: \', str, a);\n    if (a === undefined) {\n      return;\n    };\n    if (a.length < 9) {\n      return\n    };\n    let ob = {};\n    let ar = a.slice(3)\n    let s = ar.reduce((a,b) => a + \',\' + b);\n    if (mM$taskList.x.length < 5) {\n      mM$taskList.ret(s);\n    }\n    let ar2 = [];\n    let tempArray = [];\n    if (ar.length < 6) {return};\n    if ((ar.length % 6) !== 0) {\n      document.getElementById(\'alert\').innerHTML = \'Error: array length is: \' + length;\n    } else {\n      let keys = Array(ar.length/6).fill(1);\n      keys.map(_ => {\n        ar2.push(\n          {\n            task: convertBack(ar.shift()),\n            color: ar.shift(),\n            textDecoration: ar.shift(),\n            checked: ar.shift() === \'true\',\n            author: ar.shift(),\n            responsible: ar.shift()\n          }\n        )\n      })\n      console.log(\'In process  ar2 is: \', ar2)\n      let keys2 = Object.keys(ar2);\n      for (let k in keys) {\n        tempArray.push(\n          h(\'div.todo\',  [\n            h(\'span.task3\', {style: {color: ar2[k].color, textDecoration: ar2[k].textDecoration}},\n                \'Task: \' + ar2[k].task  ),\n            h(\'br\'),\n            h(\'button#edit1\', \'Edit\'  ),\n            h(\'input#edit2\', {props: {type: \'textarea\', value: ar2[k].task}, style: {display: \'none\'}}  ),\n            h(\'span#author.tao\', \'Author: \' + ar2[k].author  + \' / \' + \'Responsibility: \' + ar2[k].responsible),\n            h(\'br\'),\n            h(\'input#cb\', {props: {type: \'checkbox\', checked: ar2[k].checked}, style: {color: ar2[k].color,\n                 textDecoration: ar2[k].textDecoration} } ),\n            h(\'label.cbox\', { props: {for: \'#cb\'}}, \'Completed\' ),\n            h(\'button.delete\', \'Delete\'  ),\n            h(\'br\'),\n            h(\'hr\')])\n        )\n      }\n      mMtaskList.ret(tempArray)\n    }\n  };  ');

	var colorClick = (0, _dom.h)('pre', '  const colorClick$ = sources.DOM\n    .select(\'#cb\').events(\'click\')\n\n  const colorAction$ = colorClick$.map(e => {\n    let index = getIndex(e);\n    let s = mM$taskList.x;\n    let ar = s.split(\',\');\n    let n = 6 * index + 3;\n    let j = 6 * index + 2;\n    let k = 6 * index + 1;\n    let checked = ar[n];\n    if (checked === \'true\')  {\n      ar[n] = \'false\';\n      ar[k] = \'yellow\';\n      ar[j] = \'none\';\n    }\n    else {\n      ar[n] = \'true\';\n      ar[k] = \'lightGreen\';\n      ar[j] = \'line-through\';\n    }\n    mM$taskList.ret( ar.reduce((a,b) => a + \',\' + b) )\n  });\n\n  var getIndex = function getIndex (event_object) {\n    var task = event_object.currentTarget.parentNode.innerText;\n    var possibilities = event_object.currentTarget.parentNode.parentNode.childNodes;\n    var keys = Object.keys(possibilities);\n    for (let k in keys) {\n      if (task === possibilities[k].innerText) {\n        return k\n      }\n    }\n    console.log(\'In getIndex. No match\');\n  }  ');

	var edit = (0, _dom.h)('pre', '  const edit1$ = sources.DOM\n    .select(\'#edit1\').events(\'click\')\n\n  const edit1Action$ = edit1$.map(e => {\n    let index = getIndex2(e);\n    mMtaskList.x[index].children[3].elm.style.display = \'block\';\n  });\n\n  const edit2$ = sources.DOM\n    .select(\'#edit2\').events(\'keypress\')\n\n  const edit2Action$ = edit2$.map(e => {\n    let v = e.target.value;\n    let index = getIndex2(e);\n    if( e.keyCode === 13 ) {\n      process2(v, index);\n    mMtaskList.x[index].children[3].elm.style.display = \'none\';\n    }\n  });\n\n  const process2 = function(str, index) {\n    var a = mMcurrentList.x.split(\',\');\n    a[6*index] = str;\n    var b = a.reduce((a,b) => a + \',\' + b)\n    task2(b);\n  };\n\n  var getIndex2 = function getIndex2 (e) {\n    var elem = e.currentTarget.parentNode.children[0].innerHTML\n    var elem2 = e.currentTarget.parentNode.parentNode.childNodes\n    var keys = Object.keys(elem2);\n    for (let k in keys) {\n      if (elem === elem2[k].childNodes[0].innerHTML) {\n        return k\n      }\n      console.log(\'In getIndex2. No match\');\n    }\n  }  ');

	var mM$task = (0, _dom.h)('pre', '  const taskAction$ = mM$taskList.stream.map(str => {\n    socket.send(\'TD#$42\' + \',\' + mMgroup.x.trim() +\n        \',\' + mMname.x.trim() + \',\' + \'@\' + str);\n  });  ');

	var updateCalc = (0, _dom.h)('pre', '  function updateCalc(ar, op) {\n    var result = calc(ar[0], op, ar[1]);\n    if (result === 18 || result === 20) {\n      score(result);\n    }\n    else {\n      var sco = gameMonad.fetch0();\n      var goals = gameMonad.fetch1();\n      var a = gameMonad.fetch4().slice();\n      a.push(result);\n      gameMonad.run([sco,goals,0,[],a]);\n    }\n  };  ');

	var score = (0, _dom.h)('pre', '  function score(result) {\n    var sc = parseInt(gameMonad.fetch0());\n    var sco = result === 18 ? sc + 3 : sc + 1;\n    var scor = sco % 5 === 0 ? sco + 5 : sco;\n    var goals = gameMonad.fetch1();\n\n    if (scor === 25 && gameMonad.fetch1() === "1") {\n      mMindex.ret(0);\n      gameMonad = new MonadState(\'gameMonad\', [[0,0,0,[],[0,0,0,0]]]);\n      socket.send(`CE#$42,${pMgroup.x},${pMname.x}`);\n      scor = 0;\n      goals = 0;\n    }\n    if (scor === 25 && gameMonad.fetch1() === "0") {\n      scor = 0;\n      goals = 1;\n    }\n    newRoll(scor, goals);\n  }; ');

	var testZ = (0, _dom.h)('pre', '  mMZ1.bnd(v => mMt1\n  .bnd(add,v).bnd(w => {\n    mMt1.ret(w)\n    .bnd(cube)\n    .bnd(x => mMt3VAL = w + \' cubed is \' + x)}));\n\n  mMZ2.bnd(v => cube(v)\n  .bnd(w => mMt3VAL = v + \' cubed is \' + w));  ');

	var quad = (0, _dom.h)('pre', '  const quad$ = sources.DOM\n    .select(\'#quad\').events(\'keypress\')  // Motorcycle way to get user input.\n\n  const quadAction$ = quad$.map((e) => {\n    if( e.keyCode === 13 ) {\n      mMZ3.release(e.target.value)       // Releases mMZ (below).\n      document.getElementById(\'quad\').value = null;\n    }\n  });\n\n  var solve = function solve () {\n     mMZ3.bnd(a => {\n     mMquad4.ret(\'\');\n     mMquad6.ret(\'\');\n     mMquad5.ret(a + " * x * x ")\n     mMZ3.bnd(b => {\n     mMquad6.ret(b + \' * x \')\n     mMZ3.bnd(c => {\n     mMtemp.ret([a,b,c])\n    .bnd(fmap, qS4,\'mMtemp2\')\n    .bnd(result => {\n      let x = result[0]\n      let y = result[1]\n      if (x === 0) {\n        mMquad5.ret(\'No solution\', mMtemp)\n        mMquad6.ret(\' \');\n        solve();\n        return;\n      }\n      if (y === 0) {\n        mMquad5.ret(\'No solution\')\n        mMquad6.ret(\' \')\n        solve();\n        return;\n      };\n      mMquad4.ret("Results: " + x + " and  " + y)\n      mMquad5.ret(p(a).text + " * " + x + " * " + x + " + " + p(b).text +\n              " * " + x + " " + p(c).text + " = 0")\n      mMquad6.ret(p(a).text + " * " + y + " * " + y + " + " + p(b).text +\n              " * " + y + " " + p(c).text + " = 0")\n      solve();\n      }) }) }) })\n  };\n\n  var p = function p (x) {\n    if (x >= 0) {return \' + \' + x}\n    if (x < 0 ) {return \' - \' + Math.abs(x)}\n  }\n\n  var qS1 = function qS1 (a, b, c) {\n    let n = (b*(-1)) + (Math.sqrt(b*b - 4*a*c));\n    if (n != n) {\n      return "No solution";\n    }\n    return n/(2*a);\n  }\n\n  var qS2 = function qS2 (a, b, c) {\n    let n = (b*(-1)) - (Math.sqrt(b*b - 4*a*c));\n    if (n != n) {\n      return "No solution";\n    }\n    return n/(2*a);\n\n  function fmap(x, g, id) {\n    var mon = new Monad(g(x), id);\n    window[id] = mon;\n    return mon;\n  }  ');

	var runTest = (0, _dom.h)('pre', '  var runTest = function monTest () {\n  mM5.bnd( equals,\n    m.ret(0).bnd(v => add(v, 3, m).bnd(cube)),\n    m.ret(0).bnd(add, 3, m).bnd(cube), mMa)\n\n  mM5.bnd(equals, m, m.bnd(m.ret), mMb)\n\n  mM5.bnd(equals, m, m.ret(m.x), mMc)\n  }  ');

	var inc = (0, _dom.h)('pre', '  var inc = function inc(x, mon) {\n      return mon.ret(x + 1);\n  };\n\n  var spliceAdd = function spliceAdd(x, index, value, mon) {\n    if (Array.isArray(x)) {\n      let ar = [];\n      let keys = Object.keys(x);\n      for (let k in keys) {ar[k] = x[k]};\n      ar.splice(index, 0, value);\n      return mon.ret(ar);\n    }\n    console.log(\'The value provided to spliceAdd is not an array\');\n    return ret(x);\n  }  ');

	var todoStream = (0, _dom.h)('pre', '  const taskAction$ = mM$taskList.stream.map(str => {\n    socket.send(\'TD#$42\' + \',\' + mMgroup.x.trim() +\n        \',\' + mMname.x.trim() + \',\' + \'@\' + str);\n  });  ');

	var add = (0, _dom.h)('pre', '  var add = function(x,b,mon) {\n    if (arguments.length === 3) {\n      return mon.ret(x + b);\n    }\n    return ret(x+b);\n  }; ');

	var seed = (0, _dom.h)('pre', '  mM$prime.ret([[2],3])  ');

	var MonadState = (0, _dom.h)('pre', '  function MonadState(g, state) {\n    this.id = g;\n    this.s = state;\n    this.bnd = (func, ...args) => func(this.s, ...args);  \n    this.ret = function (a) {\n      return window[this.id] = new MonadState(this.id, a);\n    };\n  };  ');

	var primesMonad = (0, _dom.h)('pre', '    var primesMonad = new MonadState(\'primesMonad\', [2, \'\', 3, [2]], [2],  primes_state)\n\n    var primes_state = function primes_state(x) {\n      var v = x.slice();\n      console.log(\'In script2.js >>> primes_state v is \', v );\n      while (2 == 2) {\n          if ( v[3].every(e =>  (v[0] / e) != Math.floor(v[0] / e)) ) {\n              v[3].push(v[0]);\n          }\n          if (v[3][v[3].length - 1] > v[2]) {\n             return v;\n          };\n          v[0] += 2;\n      }\n    }  ');

	var fibsMonad = (0, _dom.h)('pre', '  var primesMonad = new MonadState(\'primesMonad\', [3, \'\', 3, [2,3]], primes_state);\n\n  var fibs_state = function fibs_state(ar) {\n    var a = ar.slice();\n    while (a[3].length < a[2]) {\n      a = [a[1], a[0] + a[1], a[2], a[3].concat(a[0])];\n    }\n    return a\n  }  ');

	var tr3 = (0, _dom.h)('pre', '  var tr3 = function tr (fibsArray, primesArray) {\n    var bound = Math.ceil(Math.sqrt(fibsArray[fibsArray.length - 1]))\n    var primes = primesArray.slice();\n    if (primesArray.slice(-1)[0] >= bound) {\n      primes = primesArray.filter(v => v <= bound);\n    }\n    var ar = [];\n    var fibs = fibsArray.slice(3);\n    fibs.map (v => {\n      if (primesArray.every(p => (v % p || v === p))) ar.push(v);\n    })\n    return [fibsArray, primes, ar]\n  }  ');

	var primeFibInterface = (0, _dom.h)('pre', '    const fibKeyPress5$ = sources.DOM\n      .select(\'input#fib92\').events(\'keyup\');\n\n    var primeFib$ = fibKeyPress5$.map(e => {\n      workerB.postMessage(e.target.value)\n    });\n\n    const workerB$ = sources.WWB.map(m => {\n      console.log(\'In workerB$ stream in the main thread. m is \', m );\n      mMres.ret(m.data)\n      .bnd(v => mM36.ret(\'Asynchronous addendum. The largest computed \' +\n        \'prime Fibonacci number is \' + v[2].split(\',\')[v[2].split(\',\').length - 1]), \'$mM36\')\n      primesMonad.s = JSON.parse(JSON.stringify(primesMonad.s));\n      primesMonad.a = JSON.parse(JSON.stringify(primesMonad.a));\n      primesMonad.s = m.data[3];\n      primesMonad.a = m.data[3][3];\n    });  ');

	var fpTransformer = (0, _dom.h)('pre', '    var fpTransformer = function fpTransformer(x, s) {\n      var a = Math.ceil(Math.sqrt(x[3].slice(-1)[0]));\n      var m = primesMonad.run([s,a]);\n      var ar = [];\n      x[3].map(function (v) {\n        if (m.s[3].filter(x => x <= v).every(function (p) { return (v % p || v == p); }))\n          ar.push(v);\n      });\n      return [x[3].join(\', \'), m.s[3].slice(-1).pop(), ar.join(\', \'), m.s];\n    };   ');

	var factorsMonad = (0, _dom.h)('pre', '  var factorsMonad = new MonadState(\'factorsMonad\', [[], [], 2, []], factor_state);\n\n    function factor_state(v) {\n      v[3].map(function (p) {\n        if (v[2] / p === Math.floor(v[2] / p)) {\n            v[0].push(p);\n        }\n      });\n      return v;\n    }  ');

	var factorsInput = (0, _dom.h)('pre', '  var factorsPress$ = sources.DOM\n        .select(\'input#factors_1\').events(\'keydown\');\n\n    var factorsAction$ = factorsPress$.map(function (e) {\n      var factors = [];\n      mMfactors3.ret(\'\');\n      if (e.keyCode === 13) {\n        var num = e.target.value\n        if (!num.match(/^[0-9]+$/)) {\n          mMfactors3.ret(\'This works only if you enter a number. \' + num + \' is not a number\');\n        }\n        else {\n          factors = primesMonad.run([primesMonad.s[0], [], num, primesMonad.a])\n          .bnd(s => prFactTransformer3(s, num));\n          mMfactors.ret("The prime factors of " + num + " are " + factors.join(\', \'));\n        }\n      }\n    });  ');

	var MonadSet = (0, _dom.h)('pre', '    var MonadSet = function MonadSet(set, str) {\n        var this = this;\n        this.id = str;\n        this.s = new Set();\n    };\n\n    var s = new Set();\n\n    var sMplayers = MonadSet(s, \'sMplayers\'); // holds currently online players  ');

	var promise = (0, _dom.h)('pre', '      var promise = function promise(x, t, mon, args) {\n          return (new Promise((resolve) => {\n            setTimeout(function() {\n              resolve(eval("mon.ret(x).bnd(" + args + ")"))   // eval! Get over it, Douglas.\n            },t*1000  );\n          }));\n        };  ');

	var promiseSnippet = (0, _dom.h)('pre', '  m.ret(3).bnd(promise, 2, m, "cube").then(data => m.ret(data.x).bnd(add, 15, m))  ');

	var timeoutSnippet = (0, _dom.h)('pre', '  const timeoutClicks$ = sources.DOM.select(\'#timeout\').events(\'click\')\n      const timeoutAction$ = timeoutClicks$.map(() => {\n        document.getElementById(\'timeout2\').innerHTML = \'\'\n        document.getElementById(\'timeout3\').innerHTML = \'\'\n        m.ret(3).bnd(m.ret)\n          .bnd(display, \'timeout2\', \'m) is \' + \' \' + m)).bnd(m.ret)\n          .bnd(timeout2, 1, m, [() => m\n          .bnd(cube).bnd(m.ret)\n          .bnd(display, \'timeout2\', \'m) is \' + \' \' + m)).bnd(m.ret)\n          .bnd(timeout2, 2, m, [() => m\n          .bnd(add, 15).bnd(m.ret)\n          .bnd(display, \'timeout2\',  \'m) is \' + \' \' + m)).bnd(m.ret)\n          .bnd(display, \'timeout3\', \'The meaning of everything was computed to be\' + \' \' + m))\n        ])]);\n      });\n    });  ');

	var timeout = (0, _dom.h)('pre', '  var timeout2 = function timeout (x, t, m, args) {\n      setTimeout(function () {\n        mMZ9.release();\n      }, t * 1000  );\n      return mMZ9.bnd(() => m.bnd(... args))\n    };  ');

	var examples = (0, _dom.h)('pre', '\n               ret(\'m1Val\',\'m1\')\n               m1.x === \'m1Val\'   // true\n               ret(\'m2Val\', \'m2\')\n               m2.x === \'m2Val\'   // true\n\n               m1.bnd(m2.ret)\n               m2.x === \'m1Val\' // true\n               m2.x === \'m2Val\'   // still true\n\n               m1.ret(\'newVal\')\n               m1.bnd(v => ret(v, \'m2\'))\n               m2.x === \'newVal\'  // true\n               m2.x === \'m1Val\' // true   still the same  ');

	var examples2 = (0, _dom.h)('pre', '\n    var m = new Monad(v, "m");\n    ret(v, "m");\n               ');

	var e2 = (0, _dom.h)('pre', '  var c = m.ret(0).bnd(add,3).bnd(cube).bnd(log, "The values of m\'s and c\'s\n    x attributes are " + m.x + " and " + c.x + " respectively." )   ');

	var e2x = (0, _dom.h)('pre', '   Output: The values of m\'s and c\'s x attributes are 0 and 27 respectively.  ');

	var e3 = (0, _dom.h)('p', ' Note: m\'s x attribute keeps its initial value of 0 because each computation creates a fresh instance of Monad with id === "default". In the next example, m\'s x attribute becomes the computation result due to the addition of ".bnd(m.ret)". ');

	var e4 = (0, _dom.h)('pre', '  var c = m.ret(0).bnd(add,3).bnd(cube).bnd(m.ret).bnd(log,\n     "The values m\'s and c\'s x attributes are " + m.x + " and " + c.x + " respectively.") ');

	var e4x = (0, _dom.h)('pre', '   Output: The values of m\'s and c\'s x attributes are 27 and 27 respectively.  ');

	var e6 = (0, _dom.h)('pre', '  m.ret(0).bnd(add,3).bnd(m2.ret).bnd(cube,m3).bnd(m3.ret)\n    .bnd(log,"m), m2.x, and m3.x are  " + m.x + ", " + m2.x + " and " +\n    m3.x + " respectively. "); ');
	var e6x = (0, _dom.h)('pre', '   Output: m.x and m2.x and m3) are  0, 3 and 27 respectively.  ');

	var equals = (0, _dom.h)('pre', '    var equals = function equals (mon1, mon2) {\n        if (mon1.id === mon2.id && mon1) === mon2)) return true;\n        else return false\n      }  ');

	var fmap = (0, _dom.h)('pre', '    function fmap (x, g, id) {window[id] = new Monad(g(x), id); return window[id]}\n\n      var qS1 = function qS1 (a, b, c) {\n        let n = (b*(-1)) + (Math.sqrt(b*b - 4*a*c));\n        if (n != n) {\n          return "No solution";\n        }\n        return n/(2*a);\n      }\n\n      var qS2 = function qS2 (a, b, c) {\n        let n = (b*(-1)) - (Math.sqrt(b*b - 4*a*c));\n        if (n != n) {\n          return "No solution";\n        }\n        return n/(2*a);\n      }\n\n      var qS4 = function qS4 ([x,y,z]) {\n        let [a,b,c] = [x,y,z]\n        return [qS1(a,b,c), qS2(a,b,c)]\n      }\n\n      m.ret([12,12,-144])\n\n      m.bnd(fmap, qS4, "temp").bnd(lg)   logs [3, -4] ');

	var opM = (0, _dom.h)('pre', '    function opM (a, op, b, id) {\n        window[id] = new Monad(eval(a.x + op + b.x), id);\n        return window[id];\n      }\n\n      m1.ret(42)\n\n      m2.ret(7)\n\n      opM(m1, "%", m2, "ok").bnd(lg)  logs 0\n\n      opM(m1, "+", m2, "ok").bnd(lg)  logs 49  ');

	var a = 'acorn';

	var messageMonad = (0, _dom.h)('pre', '    var messageMonad = new MonadState(\'messageMonad\', messages, messages, message_state);\n\n      function message_state(v) {\n        var ar = v[0].concat(v[3]);\n        return [ v[0], [], [], ar ];\n      };  ');

	var test3 = (0, _dom.h)('pre', '  function test3 (a) {\n      var b = [];\n      for (let i of [0,1,2,3]) {\n        b[i] = (a[i] === undefined) ? \'none\' : \'inline\'\n      }\n      return ret(b);\n    }\n\n    pMnums.bnd(test3).bnd(pMstyle.ret);  ');

	var mMZ10 = (0, _dom.h)('pre', '  mMZ10.bnd( () => {\n      pMnums.ret([v[3], v[4], v[5], v[6]]).bnd(test3).bnd(pMstyle.ret)\n      travMonad.run([ [v[3], v[4], v[5], v[6]], v[7], v[8] ]);\n      pMscore.ret(v[7]);\n      pMgoals.ret(v[8]) });  ');

	var test10_11 = (0, _dom.h)('pre.turk5', '    function test10 () {\n        m.ret(4).bnd(mult,100,\'$m1\')\n        .bnd(square,\'$m2\')\n        .bnd(add,-m2.x + 3,\'$m3\')\n        .bnd(mult,100,\'$m4\')\n        .bnd(square,\'$m5\')\n        .bnd(add,m2.x,\'$m6\')\n        .bnd(sqroot,\'$m7\')\n        .bnd(() => {\n          mMar10.ret([m, m1, m2, m3, m4, m5, m6, m7]);\n          console.log(\'The square root of the sum of \', m1.x,\n            \' squared and \', m4.x, \' squared is \', m7.x); });\n        return mMar10;\n      }\n\n      function test11 () {\n        m.ret(4).bnd(mult,100,\'$m1\')\n        .bnd(square,\'$m2\')\n        .bnd(add,-m2.x + 3,\'$m3\')\n        .bnd(mult,100,\'$m4\')\n        .bnd(square,\'$m5\')\n        .bnd(add,m2.x,\'$m6\')\n        .bnd(sqroot,\'$m7\').bnd(m.ret)\n        .bnd(() => {\n          mMar11.ret([m, m1, m2, m3, m4, m5, m6, m7]);\n          console.log(\'The square root of the sum of \', m1.x,\n            \' squared and \', m4.x, \' squared is \', m7.x); });\n        return mMar11;\n      }  ');

	var backAction = (0, _dom.h)('pre', '  var rollClick$ = sources.DOM\n    .select(\'#roll\').events(\'click\');\n\n  var rollClickAction$ = rollClick$.map(() => {\n    var a = gameMonad.fetch0().valueOf() - 1;    // Lose one point for clicking ROLL.\n    var b = gameMonad.fetch1().valueOf();\n    socket.send(`CA#$42,${pMgroup.x},${pMname.x},6,6,12,20,${a},${b}`);\n  });\n  \n  var backClick$ = sources.DOM\n      .select(\'#back.tao100\').events(\'click\');\n\n  var backAction$ = backClick$.map(() => {\n    if (gameMonad.s[1] > 0) {\n      gameMonad.dec(); \n    }\n  });\n\n  var forwardClick$ = sources.DOM\n      .select(\'#ahead.tao1\').events(\'click\')\n\n  var forwardAction$ = forwardClick$.map(() => {\n    if (gameMonad.s[1] < gameMonad.s[0].length - 1) {\n      gameMonad.inc();\n    }\n  }); ');

	var monadEr = (0, _dom.h)('pre', '    function MonadEr (val, ID, er = []) {\n          var test;\n          var arr = arr = [];\n          this.x = val;\n          this.e = er;\n          this.id = ID;\n          this.getx = function getx (x) {return this.x};\n          this.bnd = function (f, ...args) {\n            var args = args;\n            if (f === \'clean3\' || f === clean3) {\n              this.e = [];\n              window[this.id] = new MonadEr(this.x, this.id, []);\n              return window[this.id];\n            }\n          if (this.e.length > 0) {\n            console.log(\'BYPASSING COMPUTATION in MonadEr instance\', this.id, f,\n                \'.  PROPAGATING ERROR:\',  this.e[0]);\n            return this;\n          }\n\n          if (args.length > 0) {\n            arr = args.filter(v => !(typeof v === \'string\' && v.charAt() === \'$\' && \n                v.slice(0,4) !== \'Math\'))\n\n            arr.map(v => {\n              test = testP(v, this.id)\n              if (test === \'STOP\') {\n                console.log(\'"STOP" returned from testP. Ending code execution in \',\n                    this.id, \'.\' )\n                this.e.push(\'STOP\');\n                return this;\n              }\n            });\n          }\n          if (test !== "STOP") {\n          try {\n            var testId = testPrefix(args, this.id);\n            var ar = arr.map(v => eval(v))\n            var m = eval(f)(this.x, ...ar)\n            var id = testPrefix(ar, this.id);\n            window[testId] = new MonadEr(m.x, testId, []);\n            return window[testId];\n            }\n            catch(error) {\n              this.e.push(\'STOP -- Execution Aborted. \');\n              console.log(f, \'ERROR in \',id,error,\' No further computations will be attempted\');\n              return this;\n            }\n          }\n          else {\n            this.e.push(\'STOP -- Execution Aborted. \');\n            console.log(f, \'ERROR "STOP" returned from testP. No further \' +\n                \'computations will be attempted\');\n            return this;\n          }\n        }\n        this.ret = function (a) {\n          window[this.id] = new MonadEr(a, this.id, []);\n          return window[this.id];\n        }\n      };\n\n    function testPrefix (x,y) {\n      var t = y;\n      var s;\n      if (Array.isArray(x)) {\n        x.some(v => {\n          if (typeof v === \'string\' && v.charAt() === \'$\') {\n             t = v.slice(1);\n          }\n        })\n      }\n      return t;\n    }\n\n    function testP (x,id) {\n        if ( eval(\'typeof \' + x) === \'undefined\') {\n          console.log(`............... ERROR parameter ${x} is not defined`);\n          window[id].e = [`${x} is not defined`]\n          return \'STOP\';\n        }\n        if (eval(x) !== eval(x)) {\n          console.log(`............... ERROR parameter ${x} is not a number`);\n          window[id].e = [`${x} is not a number`];\n          return \'STOP\';\n        }\n        mMZ12.release([]);\n        return []\n    }\n\n    function ret3(v, id = \'generic\') {\n        window[id] = new MonadEr(v, id, []);\n        return window[id];\n      }\n\n    function add3(x, y) {\n        return ret3(x*1 + y*1);\n      }\n\n    function cube3(x) {\n        return ret3(x*x*x);\n    }\n\n    function clean3 (x, id) {\n      window[id] = new MonadEr(x, id, []);\n      return window[id];\n    }    ');

	var errorDemo = (0, _dom.h)('pre', '    var t = new MonadEr(0,\'t\', []);\n    var t2 = new MonadEr(0,\'t2\', []);\n    var t3 = new MonadEr(0,\'t3\', []);\n    console.log(\'Values of t, t2, and t3\', t.x,t2.x,t3.x)\n    console.log("executing t.bnd(\'add3\',3,\'$t2\').bnd(cube3, \'$t3\') ");\n    t.bnd(\'add3\',3,\'$t2\').bnd(cube3, \'$t3\')\n    console.log(\'Values of t, t2, and t3\', t.x,t2.x,t3.x)\n    var t = new MonadEr(0,\'t\', []);\n    var t2 = new MonadEr(0,\'t2\', []);\n    var t3 = new MonadEr(0,\'t3\', []);\n    console.log(\'Values of t, t2, and t3\', t.x,t2.x,t3.x)\n\n    console.log("executing t.bnd(\'add3\',\'three\', \'$t2\').bnd(cube3, \'$t3\') " );\n    t.bnd(\'add3\',\'three\',\'$t2\').bnd(cube3, \'$t3\')\n    console.log(\'Values of t, t2, and t3\', t.x,t2.x,t3.x)\n\n    console.log( \'t.bnd(clean3)\' );\n    t.bnd(clean3);\n\n    console.log("executing t.bnd(\'add3\', \'Math.sqrt(-1)\', \'$t2\').bnd(cube3, \'$t3\') " );\n    t.bnd(\'add3\',\'Math.sqrt(-1)\',\'$t2\').bnd(cube3, \'$t3\')\n    console.log(\'Values of t, t2, and t3\', t.x,t2.x,t3.x)\n    console.log( \'t.bnd(clean3)\' );\n    t.bnd(clean3);\n    console.log("executing t.bnd(\'addd3\',3,\'$t2\').bnd(cube3, \'$t3\') ");\n    t.bnd(\'addd3\',3,\'$t2\').bnd(cube3, \'$t3\')\n    console.log(\'Values of t, t2, and t3\', t.x,t2.x,t3.x)    ');

	var tests = (0, _dom.h)('pre', '    function atest () {\n      ret(2,\'a\')\n      .bnd(add,1)\n      a.bnd(v => ret(v*100,\'b\'))\n      .bnd(v2 => ret(v2*v2,\'c\')\n      .bnd(v3 => ret(4,\'d\')\n      .bnd(v4 => ret(v4*100))\n      .bnd(v5 => ret(v5*v5,\'e\')\n      .bnd(v6 => ret(Math.sqrt(v6+v3),\'f\')\n      .bnd(v7 => console.log(\'The square root of the sum of\',v2,\'and\',v5,\'is\', v7,\'.\'))))))\n      return [a,b,c,d,e,f]\n    }\n\n    console.log(\'// Now setting a, b, c, d, e and f to 7 and \' +\n        \'logging a.x, b.x, c.x, d.x, e.x, and f.x.)\');\n    ret(7,\'a\');ret(7,\'b\');ret(7,\'c\');ret(7,\'d\');ret(7,\'e\');ret(7,\'f\');\n    console.log(a.x, b.x, c.x, d.x, e.x,f.x)\n    console.log(\'// Now running atest and making demoAr a reference to its return value. \');\n    demoAr = atest();\n    console.log(\'// Now logging a.x, b.x, c.x, d.x, e.x, and f.x.\');\n    console.log(a.x, b.x, c.x, d.x, e.x,f.x)\n    console.log(\'// Now logging demoAr.map(v => v.x).join(", ").\');\n    console.log(demoAr.map(v => v.x).join(\', \'));\n    console.log(\'// Now setting a, b, c, d, e and f to 6 and \' +\n        \'logging a.x, b.x, c.x, d.x, e.x, and f.x.)\');\n    ret(6,\'a\');ret(6,\'b\');ret(6,\'c\');ret(6,\'d\');ret(6,\'e\');ret(6,\'f\');\n    console.log(a.x, b.x, c.x, d.x, e.x,f.x)\n    console.log(\'// Now logging demoAr.map(v => v.x).join(", ").\');\n    console.log(demoAr.map(v => v.x).join(\', \'));\n    console.log(\'// The monads in DemoAr were not mutated or replaced \' +\n        \'when monads with the same \' );\n    console.log(\'// names (a, b, c, d, and e) updated to 6, 6, 6, 6, 6, 6 by  \' +\n        \'using their bnd() methods. \');\n    }  ');

	var wDriver = (0, _dom.h)('pre.green2', '    var worker = new Worker("worker.js");\n\n    function workerDriver () {\n      return xs.create({\n        start: listener => { worker.onmessage = msg => listener.next(msg)},\n        stop: () => { worker.terminate() }\n      });\n    };  ');

	var worker$ = (0, _dom.h)('pre.green2', '    const worker$ = sources.WW.map(v => {\n      console.log(\'$essage from worker: \', v );\n      v.preventDefault();\n      mMZ21.bnd(() => {\n        mM11.ret(v.data[1]);\n        });\n      mMZ22.bnd(() => {\n        mM12.ret(v.data[1])\n      });\n      mMZ23.bnd(() => {\n        mM13.ret(v.data[1])\n      });\n      mMZ24.bnd(() => {\n        mM14.ret(v.data[1])\n      });\n      mMZ25.bnd(() => {\n        window[\'primesMonad\'] = new MonadState(\'primesMonad\', v.data[1], primes_state);\n      });\n      next(v.data[0], \'CA#$41\', mMZ21)\n      next(v.data[0], \'CB#$41\', mMZ22)\n      next(v.data[0], \'CC#$41\', mMZ23)\n      next(v.data[0], \'CD#$41\', mMZ24)\n      next(v.data[0], \'CE#$41\', mMZ25)\n    });   ');

	var workerB_Driver = (0, _dom.h)('pre.red0', '    function workerBDriver () {\n      return xs.create({\n        start: listener => { workerB.onmessage = msg => listener.next(msg)},\n        stop: () => { workerB.terminate() }\n      });\n    };    ');

	var primes_state = (0, _dom.h)('pre', '    function MonadState(g, state, p) {\n      this.id = g;\n      this.s = state;\n      this.process = p;\n      this.a = this.s[0];\n      this.bnd = (func, ...args) => func(this.s, ...args);\n      this.run = ar => {\n        var ar2 = this.process(ar);\n        this.s = ar2;\n        self[this.id] = this;   // "self" is the global context in a worker.\n        return self[this.id];\n      }\n    };\n\n    var primesMonad = new MonadState(\'primesMonad\', [3, [2,3], 3, [2,3]], primes_state);\n\n    function primes_state(x) {\n      var state = x[0].slice();\n      var top = state[2];\n      var primes = state[3];\n      var newtop = x[1];\n      if (newtop == state[0] || newtop == top) {\n        return state;\n      }\n\n      else if (newtop < top) {\n        var temp = primes.filter(v => v <= newtop);\n        var q = temp.indexOf(temp[temp.length - 1]);\n        temp.push(primes[q + 1]);\n        return [primes[q+1], temp, top, primes];\n      }\n\n      else {\n        while (true) {\n          if (primes.every(e =>  (top / e != Math.floor(top / e))))  {\n            primes.push(top);\n            if (top > newtop) {  // Nesting assures that the new top is prime.\n              return [top, primes, top, primes];\n            }\n          };\n          top += 2;\n          console.log(\'In primes_state. top is >>>>> \', top );\n        }\n      }\n    };    ');

	var workerC = (0, _dom.h)('pre', '\n\nonmessage = function(ar) {\n      importScripts(\'script2.js\');\n      var num = ar.data[1];\n      var s = ar.data;\n      s[2] = num;\n      primesMonad.run(s)\n      .bnd(s2 => fact(s2)\n      .bnd(factors => postMessage(["The prime factors of " + num +\n        " are " + factors.join(\', \'), s2])));\n    }    ');

	var fact_workerC = (0, _dom.h)('pre.red0', '    onmessage = function(ar) {\n      console.log(\'In workerC.js.  ar is \', ar );\n      importScripts(\'script2.js\');\n      execP(ar.data[0], ar.data[1] + 1)\n      .bnd(primeState => pfactors(primeState, ar.data[1])\n      .bnd(factors => postMessage(["The prime factors of " + ar.data[1] +\n        " are " + factors.join(\', \'), primeState])));\n    }\n\n    function execP (state, num) {\n      var top = state[2];\n      var top2 = state[2];\n      var primes = state[3];\n      var primes2 = state[3]\n      var result;\n      if (num == state[0] || num == top) {\n        result = new MonadState(\'primesMonad\', state);\n      }\n\n      else if (num < top) {\n        var temp = primes.filter(v => v <= num);\n        var q = temp.indexOf(temp[temp.length - 1]);\n        temp.push(primes[q + 1]);\n        result = new MonadState(\'primesMonad\', [primes[q+1], temp, top, primes]);\n      }\n\n      else {\n        while (top2 <=  num ) {\n          if (primes2.every(e =>  (top / e != Math.floor(top / e))))  {\n            primes.push(top);\n            top2 = top;\n          };\n          top += 2;\n        }\n        result = new MonadState(\'primesMonad\', [top2, primes, top2, primes] );\n      }\n      return result;\n    };\n\n    function execLCM (a, b, primeState) {\n      pfactors(primeState, a).bnd(x => {\n        pfactors(primeState, b).bnd(y => {\n          postMessage([primeState, [a, b, lcm(x,y)]])\n        })\n      })\n    }  ');

	var fact2_workerD = (0, _dom.h)('pre', '    onmessage = function(ar) {\n      var n = 0;\n      importScripts(\'script2.js\');\n      var res;\n      var a = ar.data[1][0];\n      var b = ar.data[1][1];\n      var primeState = ar.data[0];\n      var decompState = ar.data[2];\n      var max = a > b ? a : b\n      var c = ar.data[2][3];\n      var d = c.length;\n      var diff = max - d;\n      execP(ar.data[0], max)\n      .bnd(primeState => execLCM(a, b, primeState))\n    }\n\n    function execLCM (a, b, primeState) {\n      pfactors(primeState, a).bnd(x => {\n        pfactors(primeState, b).bnd(y => {\n          postMessage([primeState, [a, b, lcm(x,y)]])\n        })\n      })\n    }  ');

	var workerD$ = (0, _dom.h)('pre', '    const workerD$ = sources.WWD.map(m => {\n      console.log(\'Back in the main thread. m is\', m );\n      mMfactors6.ret(m.data[0]);\n      window[\'primesMonad\'] = new MonadState(\'primesMonad\', m.data[1], primes_state);\n      mMfactors8.ret(m.data[2]);\n    });  ');

	var execP = (0, _dom.h)('pre', '    function execP (x) {\n      var state = primesMonad.s.slice();\n      var top = state[2];\n      var top2 = state[2];\n      var primes = state[3];\n      var primes2 = state[3].filter(v => v <= top)\n      if (x == state[0] || x == top) {\n        return (new MonadState(\'primesMonad\', state, primes_state));\n      }\n\n      else if (x < top) {\n        var temp = primes.filter(v => v <= x);\n        var q = temp.indexOf(temp[temp.length - 1]);\n        temp.push(primes[q + 1]);\n        return (new MonadState(\'primesMonad\', [primes[q+1], temp, top, primes], primes_state));\n      }\n\n      else {\n        while (top2 <=  x ) {\n          if (primes2.every(e =>  (top / e != Math.floor(top / e))))  {\n            primes.push(top);\n            top2 = top;\n          };\n          top += 2;\n        }\n        return (new MonadState(\'primesMonad\', [top, primes, top, primes], primes_state));\n      }\n    };    ');

	var hardWay = (0, _dom.h)('div', [(0, _dom.h)('h3', ' Doing Things The Hard Way '), (0, _dom.h)('p', ' The next two demonstration generate the same results as the previous two; but in doing so, they also generate and add to a shared and persistent (for the duration of the browser session) array of arrays of prime decompositions of the positive integers. The array is the value of decompMonad.s. It is re-used as the starting point for generating larger arrays, or as a sort of lookup table if a required prime decomposition has already been computed. The index of an array is the number whose decomposition is in the array so, for example, array-of-arrays[12] is [2,2,3]. The actual code will be shown later and is also available at the Github repository. ')]);

	var hardWay2 = (0, _dom.h)('div', [(0, _dom.h)('p', ' The next demonstration shares the array of arrays of prime decompositions with the previous demonstration. That array is kept in a MonadState instance named "decompMonad". Computing prime decompositions of numbers that end up being ignored is clearly inefficient, so please bear in mind that a demonstration of a JS-monads way to keep mutable state in immutable, composable, globally accessable objects. '), (0, _dom.h)('label', ' Enter two comma-separated integers here: '), (0, _dom.h)('input#factors_5b'), (0, _dom.h)('br'), (0, _dom.h)('br')]);

	var monad = (0, _dom.h)('div', [(0, _dom.h)('h1', 'The Monads'), (0, _dom.h)('p', ' The definition of Monad, which is the basic monad constructor, is a little complicated. It isn\'t intended as a puzzle, so a little explanation is in order. '), (0, _dom.h)('p', ' The term "monad" will mean "instance of Monad". Monad could have been defined as a class, but the current definition suffices. '), (0, _dom.h)('p', ' Monads are created by code such as "const m = new Monad("anything", "m")". The arguments will be the values of m.x and m.id. The first argument can be any Javascript value, such as string, array, or monad. The second argument should be the name of the monad. '), (0, _dom.h)('p', ' A monad, say "m", can be replaced by another monad named "m" in the global space through the use of the method "ret()". It looks like m.x gets mutated, but that isn\'t what happens. Previously defined references to m retain their values, as demonstrated below: '), (0, _dom.h)('pre', 'var m = new Monad (5, \'m\');\nvar arr = [m];\nvar p = m;\nm.ret(100);\nconsole.log(m.x, arr[0].x, p.x);  // 100, 5, 5\n'), (0, _dom.h)('p', ' In global scope (window in the browser), m.x changed to 100; but p and arr still refer to 5, the previous value of m.x. Similarly, when a monad uses its bnd() method to modify its x attribute, the change is seen globally, but nowhere else. Previous references to the monad remain stable, as this example illustrates: '), (0, _dom.h)('pre', 'var m = new Monad (5, \'m\');\nvar arr = [m];\nvar p = m;\nm.bnd(add,95);\nconsole.log(m.x, arr[0].x, p.x);  // 100, 5, 5\n'), (0, _dom.h)('p', ' Had there been no reference to m, the previous instance would have been subject to removal by the garbage collector. '), (0, _dom.h)('p', ' It is possible to mutate monads with code such as m.x = 888. That might be a good thing to do in a function with many recursions, but it seems like a misuse of monads. Monads are never mutated on this website. Object.freeze() is used to prevent mutation in the definition of primesMonad (shown below). '), (0, _dom.h)('p', ' The bnd() method can leave the calling monad\'s global value unchanged while assigning a value (in the global space) to another previously defined monad, or to a freshly created monad. So regardless of whether or not "m2" is defined, m.ret(4).bnd(cube,"$m2") causes m.x === 4 and m2.x === 64 to both return true. '), (0, _dom.h)('pre', 'm.ret(4).bnd(cube,"$m2")\nconsole.log(m.x, m2.x)   // 4 64\nm.ret(0).bnd(add,3,"$m2").bnd(cube,"$m3")\nconsole.log(m.x, m2.x, m3.x)  // 0 3 27\n'), (0, _dom.h)('p', ' The definition of Monad (below) shows how bnd() checks to see if func(m.x, ...args) returns a monad. If it does, "testPrefix" looks for a pattern that matches "$val" in the arguments that were provided to m.bnd(func, ...args). If the pattern is found, the global space acquires a monad named "val" with val.x === func(m.x, ...args). If no monad named "val" previously existed, one is created. Otherwise, val\'s global definition gets superseded. val can be any sequence of characters that constitute a valid javascript identifier. '), (0, _dom.h)('p', ' Instances of Monad facilitate changing values without mutation. They also provide a way to chain function calls. For example, m.ret(2).bnd(add, 1).bnd(cube) causes m.x === 27 to return true. This works because ret(), add, and cube all return monads when they are applied to m.x. The definition of add and cube are shown below and can be found in the Github repository. '), (0, _dom.h)('p', ' If the three numbers from the previous sequence were all that we required, we could obtain them more efficiently by running: '), (0, _dom.h)('pre', 'var demoResult = ret(0).bnd(x => add(x, 3).bnd(y => cube(y).bnd(z => [x,y,z])));\nconsole.log(\'We started with\', demoResult[0], \n    \'and got\', demoResult[1], \'and\', demoResult[2]);\nThe console displays "We started with 0 and got 3 and 27"\n'), (0, _dom.h)('p', ' Doing it that was leaves only one monad - the one named "temp" - for the garbage collector. It also eliminates concern about name collisions among the monads. There is little danger that a monad named "temp" is being used to store a value somewhere else in the application code. The temp monad is obviously not a monad for preserving values. The result could have been logged to the console or used in further computations without creating a reference to it.'), (0, _dom.h)('pre', 'ret(0).bnd(x => add(x, 3).bnd(y => cube(y).bnd(z =>\nconsole.log(\'We started with\', x, \'and got\', y, \'and\', z))));\nThe console displays "We started with 0 and got 3 and 27"\n'), (0, _dom.h)('p', ' More complex, multi-stage computations in sequenced monads are demonstrated later in this presentation. If such monads don\'t depend on information that exists outside of their scope, their effects in a running application are easier to grasp, and opportunities for unintended behavior in edge cases are minimized. Developers can gain further control and confidence in their applications by allowing only the last monad in any sequence to make changes in global scope. Code is easier to write and maintain when you can readily pinpoint a minimal number of places where an application\'s state gets updated. '), (0, _dom.h)('p', ' So, with that out of the way, here are the definitions of Monad and testPrefix: '), (0, _dom.h)('h3', ' Monad '), (0, _dom.h)('pre', '  var Monad = function Monad(z = 42, g = \'generic\') {\n    this.x = z;\n    this.id = g;\n    this.bnd = function (func, ...args) {\n      var m = func(this.x, ...args)\n      var mon;\n      if (m instanceof Monad) {\n        mon = testPrefix(args,this.id);\n        return window[mon] = new Monad(m.x, mon);\n      }\n      else return m;\n    };\n    this.ret = function (a) {\n      return window[_this.id] = new Monad(a,_this.id);\n    };\n  };\n\n  function testPrefix (x,y) {\n    var t = y;\n    var s;\n    if (Array.isArray(x)) {\n      x.some(v => {\n        if (typeof v === \'string\' && v.charAt() === \'$\') {\n           t = v.slice(1, v.length);\n        }\n      })\n    }\n    return t;\n  }  ')]);

	var variations = (0, _dom.h)('div', [(0, _dom.h)('h3', 'Variations on the Theme'), (0, _dom.h)('p', ' Variations on the Monad theme serve diverse purposes. Instances of MonadState preserve computations so they won\'t have to be performed again. An instance of MonadState2 keeps a record of game play allowing players to back up and resume play from a previous display of numbers. It also keeps the current game parameters - score, goals, operator, selected numbers, and remaining numbers - in a single array which is stored in the archive whenever a new state is created. MonadItter instances are used to parse websockets messages and organize the callbacks neatly. MonadEr catches NaN and prefents crashes when undefined variables are encountered. I defined a message emitting monad but it seemed useless in this Cycle application where reactivity is pervasive. When you want to emit and listen for messages, it is better to build a driver and merge its stream of messages into the application cycle. '), (0, _dom.h)('p', ' The various monad constructors demonstrate a way of encapsulating procedures and state in chainable objects. You might incorporate Monad or one of the other constructors presented here in your application, but I think the thing that is most valuable is the general concept. I prefer Cycle.js, but I think the monads might make Node, React and some of the other frameworks more manageable. '), (0, _dom.h)('h3', 'Computations'), (0, _dom.h)('p', ' Computations are easy to link if each result is returned in an instance of Monad. Here are a few examples of functions that return instances of Monad: '), (0, _dom.h)('pre', '  function ret(v, id = \'temp\') {\n      window[id] = new Monad(v, id);\n      return window[id];\n    }\n\n    function cube (v, id) {\n      return ret(v * v * v);\n    };\n\n    function add (x, b) {\n      return ret(parseInt(x,10) + parseInt(b,10) );\n    };\n\n    function log(x,y) {\n        console.log(y)\n        return ret(x);\n    };  '), (0, _dom.h)('p', ' The "$" prefix provides control over the destination of computation results. In the following example, m1, m2, and m3 have already been declared. Here is a comparison of the results obtained when the "$" prefix is used and when it is omitted: '), (0, _dom.h)('pre', '    m1.ret(7).bnd(m2.ret).bnd(m3.ret)  // All three monads get the value 7.\n    m1.ret(0).bnd(add,3,\'m2\').bnd(cube,\'m3\')  // \'m1\', \'m2\', and \'m3\' are ignored'), (0, _dom.h)('pre', '    Result: m1.x === 27\n            m2.x === 7\n            m3.x === 7  '), (0, _dom.h)('pre', '    m1.ret(0).bnd(add,3,\'$m2\').bnd(cube,\'$m3\')   '), (0, _dom.h)('pre', '    Result: m1.x === 0\n            m2.x === 3\n            m3.x === 27  '), (0, _dom.h)('p', ' If the prefix "$" is absent, bnd() ignores the string argument. But when the "$" prefix is present, m1 retains its initial value, m2 retains the value it gets from from adding m\'s value (which is 0) to 3, and m3.x is the result of applying "cube" to m2.x. Both forms could be useful. '), (0, _dom.h)('p', ' The following example shows lambda expressions sending variables v1 and v2 through a sequence of computations and v3 sending the final result to the string that is logged. It also shows monads a, b, c, d, e, f, and g being updated and preserved in an array that is not affected by further updates. That is because calling the ret() method does not mutate a monad; it creates a fresh instance with the same name. Here is the example, shown in a screen shot of the Chrome console:. '), (0, _dom.h)('img.image', { props: { src: "demo_000.png" } }), (0, _dom.h)('h3', ' The Monad Laws '), (0, _dom.h)('p', ' In the following discussion, "x === y" signifies that the expression x === y returns true. Let J be the collection of all Javascript values, including functions, instances of Monad, etc, and let F be the collection of all functions mapping values in J to instances of Monad with references (names) matching their ids; that is, with window[id] === m.id for some id which is a valid es2015 variable name. The collection of all such instances of Monad along and all of the functions in F is called "M". For any instances of Monad m, m1, and m2 in M and any functions f and g in F, the following relationships follow easily from the definition of Monad: '), (0, _dom.h)('div', 'Left Identity '), (0, _dom.h)('pre', '    m.ret(v, ...args).bnd(f, ...args).x === f(v, ...args).x\n    ret(v, ...args).bnd(f, ...args).x === f(v, ...args).x\n    Examples: m.ret(3).bnd(cube).x === cube(3).x  Tested and verified\n    ret(3).bnd(cube).x === cube(3).x     Tested and verified\n    Haskell monad law: (return x) >>= f \u2261 f x  '), (0, _dom.h)('div#discussion', ' Right Identity  '), (0, _dom.h)('pre', '    m.bnd(m.ret) === m      Tested and verified\n    m.bnd(m.ret) === m   Tested and verified\n    m.bnd(ret) === m  Tested and verified\n    Haskell monad law: m >>= return \u2261 m '), (0, _dom.h)('div', ' Commutivity  '), (0, _dom.h)('pre', '    m.bnd(f1, ...args).bnd(f2, ...args).x === m.bnd(v => f1(v, ...args).bnd(f2, ...args)).x\n    Example: m.ret(0).bnd(add, 3).bnd(cube).x ===\n    m.ret(0).bnd(v => add(v,3).bnd(cube)).x  Tested amd verified\n    Haskell monad law: (m >>= f) >>= g \u2261 m >>= ( \\x -> (f x >>= g) ) '), (0, _dom.h)('a', { props: { href: '#top' } }, 'Back To The Top'), (0, _dom.h)('h3', ' Disussion '), (0, _dom.h)('span.tao', ' The Haskell statement '), (0, _dom.h)('span.turk6', 'f \u2261 g'), (0, _dom.h)('span', ' means that f x == g x for all Haskell values x of the appropriate type. That is the test applied to Javascript expressions in the "Monad Laws" section (above). Neither the == nor the === operator would provide useful information about the behavior of instances of Monad, which are objects. Those operators test objects for location in memory. If the left and right sides of predicates create new instances of m, then the left side m and the right side m wind up in different locations in memory. So we expect m.ret(3) === m.ret(3) to return false, and it does. The question we want answered is the question \u2261 answers in Haskell: Can the left and right sides be substituted for one another and still yield the same results.'), (0, _dom.h)('br'), (0, _dom.h)('br'), (0, _dom.h)('span.tao', ' The Haskell programming language borrowed the term "monad" from the branch of mathematics known as category theory. This was apropriate because Haskell monads, along with the function return and the operator >>=, behave quite a bit like category theory monads, and the inspiration for them came out of category theory. For Haskell monads to actually be category theory monads, they would need to reside in a category-theory category. They don\'t, although the Haskell mystique tends to give newcommers to the language the impression that they do. See '), (0, _dom.h)('a', { props: { href: "http://math.andrej.com/2016/08/06/hask-is-not-a-category/", target: "_blank" } }, 'Hask is not a category.'), (0, _dom.h)('br'), (0, _dom.h)('p', ' Research into ways of defining a Haskell category appears to be ongoing. It involves tinkering with special constraints, omitted features, and definitions of morphisms that are not Haskell functions. When a definition of the category is established, Haskell monads are then shown to be, in some contrived context, category-theory monads. Devising such schemes are instructive academic exercises, but I don\'t think they can provide anything useful to programmers working on applications for industry, commerce, and the Internet. '), (0, _dom.h)('p', ' However, imitating definitions and patterns found in category theory, as Haskell does in defining the functor, monoid, and monad type classes, was a stroke of genius that vastly enriched the Haskell programming language and brought it into the mainstream as a viable alternative to java, c++, etc.  This website runs efficiently on a Haskell websockets server. The modified Haskell Wai Websockets server has proven to be extraordinarily easy to maintain as new requirements become necessary. For example, modifying the server to send chat messages and shared todo lists only to members of the same group was a trivial task. It required just a tiny amount of pattern-matching code. Category theory patterns make the Haskell interface to the Cycle front end robust, versitile, and reliable. Those are the qualities that I strive to emulate with JS-monads.')]);

	var p503j = (0, _dom.h)('pre', '\n');

	var cycle = (0, _dom.h)('div', [(0, _dom.h)('h3', ' A Few Words About Cycle.js '), (0, _dom.h)('p', ' Opinionated frameworks tend to annoy and frustrate me. Cycle, on the other hand, is easy on my mind. I love it.'), (0, _dom.h)('p', ' In the early stages of developing this website, I had functions that mutated global variables. Sometimes, I directly mutated values in the DOM with statements like "document.getElementById(\'id\').innerHTML = newValue". Cycle didn\'t object. Over time, mutating variables and manhandling the DOM gave way to gentler techniques that I developed in conjunction with the "proof of concept" features that I was in a hurry to get up and running. '), (0, _dom.h)('p', ' Handling events is a breeze. Drivers eliminate the need to name event emitters or observers. Driver output in main() is available to any function or block of code that is interested. The result of any callback is in an event in a stream of events that automatically merge with the other streams that define main\'s return value, a blueprint for the updated user interface. This is breathtakingly elegant. main() is called only once, when the application loads. After that, the application hums like an enchanted perpetual motion machine. '), (0, _dom.h)('pre', 'function workerDriver () {\n  return xs.create({\n    start: listener => { worker.onmessage = msg => listener.next(msg)},\n    stop: () => { worker.terminate() }\n  });\n};\n\nfunction websocketsDriver() {\n  return xs.create({\n    start: listener => { socket.onmessage = msg => listener.next(msg)},\n    stop: () => { socket.close() }\n  });\n};   ')]);

	var async1 = (0, _dom.h)('div', [(0, _dom.h)('p', ' The next five demonstrations involve computations of prime numbers, Fibonacci numbers, prime Fibonacci numbers, and prime factors of numbers. Several instances of a constructor named "MonadState" (simple and not an ES6 class) are utilyzed, three of which maintain and share share an array of prime numbers maintained in the MonadState instance named "primesState". An array of arrays of prime factors of numbers is maintained in MonadState instance "decompMonad", which is shared by the fourth and fifth examples in this series of async examples. Here is the definition of MonadState: '), (0, _dom.h)('pre', '\n    function MonadState(g, state) {\n      this.id = g;\n      this.s = state;\n      this.bnd = (func, ...args) => func(this.s, ...args);\n    }    '), (0, _dom.h)('p', ' The first demonstration displays the Fibonacci series up to an upper bound entered in the browser by a user. It also displays a list of the prime Fibonacci numbers in the list of Fibonacci numbers, along with the largest prime number that was generated during a computation. '), (0, _dom.h)('p', ' The progress display confirmed that it took almost no time to generate the list of Fibonacci numbers or to select the ones that are prime. The bottleneck was computing the primes. To see the effectiveness of saving computed prime numbers, I deleted three zeros and then added them back again. At 100,000,000,000,000 and 1,000,000,000,000, the lag times were  67 microseconds and 124 microseconds, respectively. The display, in a brief flash, showed that those delays occorred mostly during the selection of prime Fibonacci numbers from the array of Fibonacci numbers. Firefox\'s performance was comparable to Chrome\'s. I entered 1,000,000.000,000,000 in the Firefox browser, and after approximately 35 seconds five additional Fibonacci numbers appeared, topped by 806,515,533,049,393. The largest prime number that had to generated to achieve that result was 28,399,249. A total of 2,640,405 prime numbers were generated. '), (0, _dom.h)('p', ' The demonstrations do not block the main execution thread. Computations are performed in web workers and the results are stored for further use in the main thread. '), (0, _dom.h)('span', ' According to the '), (0, _dom.h)('a', { props: { href: "https://oeis.org/A005478", target: "_blank" } }, 'The On-Line Encyclopedia of Integer Sequences '), (0, _dom.h)('span', ' these are the first eleven proven prime Fibonacci numbers:'), (0, _dom.h)('span.red', ' 2, 3, 5, 13, 89, 233, 1597, 28657, 514229, 433494437, 2971215073, and 99194853094755497. '), (0, _dom.h)('span', ' The eleventh number, 2971215073, is as far as you can go on an ordinary desktop computer. '), (0, _dom.h)('br'), (0, _dom.h)('p', ' The circles below are red during the computation of A. Fibonacci numbers, B. Prime numbers, and C. prime fibonacci numbers. A, B, and C are shown from left to right. On my desktop computer, the middle circle in the red state starts bcoming briefly discernable a 10,000,000, which is where the largest attainable prime Fibonacci number (2971215073), first appears. The lag time in the Chrome browser at 1,000,000,000,000,000 was a little over thirty-five seconds. After deleting and then replacing the last 0, the delay was under five seconds, demonstrating a significant benefit derived from retrieving previously generated prime numbers instead of computing them again. But once a large array of primes has been generated, lookup times for small number exceeds the time it would take to generate a fresh array of primes. When the square root of the number in the box is less than the largest prime number in primesMonad.s[3], the only circle that turns red is the right one, corresponding to picking out the prime Fibonacci numbers. ')]);

	var async2 = (0, _dom.h)('div', [(0, _dom.h)('div.tao3', mMfactors3.x), (0, _dom.h)('p#monadstate'), (0, _dom.h)('h3', 'MonadState and MonadState Transformers'), p(' The preceding demonstrations used three instances of MonadState: primesMonad, fibsMonad, and factorsMonad. The chat message demonstration uses another instance of MonadState; namely, messageMonadn. Instance of MonadState holds a current state along with a method for updating state. Here again is the definition of MonadState: '),
	//code.MonadState,
	(0, _dom.h)('p', ' MonadState reproduces some of the functionality found in the Haskell Module "Control.Monad.State.Lazy", inspired by the paper "Functional Programming with Overloading and Higher-der Polymorphism", Mark P Jones (http://web.cecs.pdx.edu/~mpj/) Advanced School of Functional Programming, 1995. Transformers take instances of MonadState and return different instances of MonadState. In the prime Fibonacci example, the method call "fibsMonad.bnd(fpTransformer, primesMonad)" returns primesMonad updated so that the largest prime number in primesMonad.s[1] is only slightly larger than the square root of the largest Fibonacci number in fibsMonad.s[3]. Here is the definition of fpTransformer: '),
	//code.fpTransformer,
	(0, _dom.h)('a#err', { props: { href: '#top' } }, 'Back To The Top')]);

	var MonadState2 = (0, _dom.h)('pre', '    class MonadEmitter extends EventEmitter {}; \n\n    function MonadState2(g, state) {\n      this.id = g;\n      this.s = state;\n      this.c = new EventEmitter();\n      this.bnd = (func, ...args) => func(this.s, ...args);  \n      this.ret = function (a) {\n        return window[this.id] = new MonadState(this.id, a);\n      };\n      this.c.on(a, st => {\n        mMindex.ret(mMindex.x + 1);\n        st[5] = this.s[5].slice();\n        st[5].splice(mMindex.x, 0, [st[0], st[1], st[2], st[3], st[4]]);\n        window[this.id] = new MonadState2(this.id, st);\n      })\n    }; ');

	var gameMonad = (0, _dom.h)('pre', '    var gameMonad = new MonadState2(\'gameMonad\',\n      [ 0,0,0,[],[0,0,0,0],[[0,0,0,[],[0,0,0,0]]]]);\n');

	var clicks = (0, _dom.h)('pre', '  var numClick$ = sources.DOM\n      .select(\'.num\').events(\'click\');\n\n  var numClickAction$ = numClick$.map(e => {\n    if (gameMonad.fetch3().length < 2)  {\n      var score = gameMonad.fetch0();\n      var goals = gameMonad.fetch1();\n      var op = gameMonad.fetch2();\n      var a = gameMonad.fetch3();\n      var b = gameMonad.fetch4();\n      a.push(b.splice(e.target.id, 1)[0]);\n      gameMonad.run([score,goals,op,a,b]);\n      if (a.length === 2 && gameMonad.fetch2() != 0) {\n        updateCalc(a, gameMonad.fetch2())\n      }\n    }\n  });\n\n  var opClick$ = sources.DOM\n      .select(\'.op\').events(\'click\');\n\n  var opClickAction$ = opClick$.map(e => {\n    var s3 = gameMonad.fetch3();\n      var score = gameMonad.fetch0();\n      var goals = gameMonad.fetch1();\n      var a = gameMonad.fetch3().slice();\n      var b = gameMonad.fetch4().slice();\n    if (s3.length === 2) {\n      updateCalc(s3, e.target.innerHTML);\n    }\n    else {\n      gameMonad.run([score,goals,e.target.innerHTML,a,b]);\n    }\n  });\n');

	var MonadEmitter = (0, _dom.h)('pre', '\n');

	var primes = (0, _dom.h)('pre', '    function MonadState(g, state) {\n      this.id = g;\n      this.s = state;\n      this.bnd = (func, ...args) => func(this.s, ...args);  \n    };\n\n    var primesMonad = new MonadState(\'primesMonad\', [3, [], 3, [2,3]]);\n    Object.freeze(primesMonad);\n\n    function isPrime(n) {\n       if (isNaN(n) || !isFinite(n) || n%1 || n<2) return false;\n       var m = Math.sqrt(n);\n       for (var i=2;i<=m;i++) if (n%i==0) return false;\n       return true;\n    }\n\n    function *gen(x) {\n      var x = x\n      while(true) {\n        if(isPrime(x)) yield x;\n        x++;\n      }\n    }\n\n    var primesIt = gen(primesMonad.s[2]+1);\n\n    function execP (state, num) {   // This function is used to update primesMonad.\n      var x = state[2];\n      var primes = state[3].slice();\n      if (x < num) {\n        var end = 0;\n        while (end < num) {\n          primes.push(primesIt.next().value);\n          end = primes[primes.length - 1];\n        }\n        return [end, primes, end, primes]\n      }\n      else {\n        var number = primes.indexOf(num) + 1;\n        var newP = primes.slice(number);\n        return [newP[newP.length - 1], newP, x, primes];\n      }\n    }  ');

	var primes2 = (0, _dom.h)('pre', '    const workerB$ = sources.WWB.map(m => {\n      console.log(\'In workerB$ stream in the main thread. m, m[3] \', m, m.data[3] );\n      if (m.data[3] === \'color\') {  // Updates the color display.\n        fill1Monad.ret(m.data[0]);\n        fill2Monad.ret(m.data[1]);\n        fill3Monad.ret(m.data[2]);\n        mMprimeBlurb.ret(m.data[5]);\n        mMfibBlurb.ret(m.data[4]);\n        mMprimeFibBlurb.ret(m.data[6]);  \n      }\n      else {\n        console.log(\'m.data[3] ********************\', m.data[3] );\n        mMelapsed.ret(elapsed(m.data[0][3]))\n        .bnd(v =>  console.log(v));\n        mMres.ret(m.data[0])\n        window[\'primesMonad\'] = new MonadState(\'primesMonad\', m.data[1], primes_state);\n      }\n    }); ');

	var primes3 = (0, _dom.h)('pre', '    var fibKeyPress5$ = sources.DOM\n        .select(\'input#fib92\').events(\'keyup\');\n\n    var primeFib$ = fibKeyPress5$.map(e => {\n      workerB.postMessage([primesMonad.s, e.target.value]);\n    });   ');

	var primes4 = (0, _dom.h)('pre', '    execF(ar[1]).bnd(fpTransformer, ar[0], x)  ');

	var gameMonad_2 = (0, _dom.h)('pre', '  function MonadState(g, state) {\n    this.id = g;\n    this.s = state;\n    this.bnd = (func, ...args) => func(this.s, ...args);  \n    this.ret = function (a) {\n      return window[this.id] = new MonadState(this.id, a);\n    };\n  };\n\n  gameMonad = new MonadState(\'gameMonad\', [ [0,0,0,[],[0,0,0,0] ]]); ');

	var styl = (0, _dom.h)('pre', '  function styl (s) {\n    switch(s) {\n      case (0): return [\'none\', \'none\', \'none\', \'none\'];\n      break;\n      case (1): return [\'inline\', \'none\', \'none\', \'none\'];\n      break;\n      case (2): return [\'inline\', \'inline\', \'none\', \'none\'];\n      break;\n      case (3): return [\'inline\', \'inline\', \'inline\', \'none\'];\n      break;\n      case (4): return [\'inline\', \'inline\', \'inline\', \'inline\'];\n      break;\n      default: return;  //console.log(\'Bad argument in styl. s is\', s );\n    }\n  }\n\n  function bNode (arr) {\n    console.log(\'In bNode - - - arr is\', arr);\n    var x = styl(arr.length);\n    var node = h(\'div\', [\n      h(\'button#0.num\', { style: { display: x[0] }}, arr[0] ),\n      h(\'button#1.num\', { style: { display: x[1] }}, arr[1] ),\n      h(\'button#2.num\', { style: { display: x[2] }}, arr[2] ),\n      h(\'button#3.num\', { style: { display: x[3] }}, arr[3] )\n    ]);\n    return node;\n  }  ');

	var monCon = (0, _dom.h)('pre', '\n');

	var newRoll = (0, _dom.h)('pre', '  var rollClick$ = sources.DOM\n    .select(\'#roll\').events(\'click\');\n\n  var rollClickAction$ = rollClick$.map(() => {\n    var a = gameMonad.fetch0().valueOf() - 1;    // Lose one point for clicking ROLL.\n    var b = gameMonad.fetch1().valueOf();\n    socket.send(`CA#$42,' + pMgroup.x + ',' + pMname.x + ',6,6,12,20,' + a + ',' + b + '`);\n  });\n');

	var num_op = (0, _dom.h)('pre', '  var rollClick$ = sources.DOM\n    .select(\'#roll\').events(\'click\');\n\n  var rollClickAction$ = rollClick$.map(() => {\n    var a = gameMonad.fetch0().valueOf() - 1;\n    var b = gameMonad.fetch1().valueOf();\n    socket.send(`CA#$42,' + pMgroup.x + ',' + pMname.x + ',6,6,12,20,' + a + ',' + b + '`);\n  });\n\n  var numClick$ = sources.DOM\n      .select(\'.num\').events(\'click\');\n\n  var numClickAction$ = numClick$.map(e => {\n    if (gameMonad.fetch3().length < 2)  {\n      var score = gameMonad.fetch0();\n      var goals = gameMonad.fetch1();\n      var op = gameMonad.fetch2();\n      var a = gameMonad.fetch3();\n      var b = gameMonad.fetch4();\n      a.push(b.splice(e.target.id, 1)[0]);\n      console.log(\'In numClickAction$ - - - gameMonad.index and gameMonad.s \', gameMonad.index, gameMonad.s ); \n      gameMonad.run([score,goals,op,a,b]);\n      if (a.length === 2 && gameMonad.fetch2() != 0) {\n        updateCalc(a, gameMonad.fetch2())\n      }\n    }\n  }).startWith([0, 0, 0, 0]);\n\n  var opClick$ = sources.DOM\n      .select(\'.op\').events(\'click\');\n\n  var opClickAction$ = opClick$.map(e => {\n    var s3 = gameMonad.fetch3();\n      var score = gameMonad.fetch0();\n      var goals = gameMonad.fetch1();\n      var a = gameMonad.fetch3().slice();\n      var b = gameMonad.fetch4().slice();\n    if (s3.length === 2) {\n      updateCalc(s3, e.target.innerHTML);\n    }\n    else {\n      gameMonad.run([score,goals,e.target.innerHTML,a,b]);\n    }\n  });  ');

	var prototypeAdditions = (0, _dom.h)('pre', '  var gameMonad = new MonadState(\'gameMonad\', \n    [[[0,0,0,[],[1,2,3,4]], [0,0,0,[],[0,0,0,0]]],1 ]);\n\n  MonadState.prototype.dec = function () {\n    this.s[1] -= 1;\n    buttonNode = bNode(this.s[0][this.s[1]][4]);\n    socket.send(`CG#$42,' + pMgroup.x + ',' + pMname.x + ',${this.s[0][this.s[1]][0]},${this.s[0][this.s[1]][1]}`)\n    window[this.id] = this;\n    return this;\n  };\n\n  MonadState.prototype.inc = function () {\n    this.s[1] += 1\n    buttonNode = bNode(this.s[0][this.s[1]][4]);\n    socket.send(`CG#$42,' + pMgroup.x + ',' + pMname.x + ',${this.s[0][this.s[1]][0]},${this.s[0][this.s[1]][1]}`)\n    window[this.id] = this;\n    return this;\n  };\n\n  MonadState.prototype.fetch0 = function () {\n      return this.s[0][this.s[1]][0];\n  }\n   \n  MonadState.prototype.fetch1 = function () {\n      return this.s[0][this.s[1]][1];\n  }\n   \n  MonadState.prototype.fetch2 = function () {\n      return this.s[0][this.s[1]][2];\n  }\n   \n  MonadState.prototype.fetch3 = function () {\n      return this.s[0][this.s[1]][3].slice();\n  }\n   \n  MonadState.prototype.fetch4 = function () {\n      return this.s[0][this.s[1]][4].slice();\n  }\n   \n  MonadState.prototype.clearPicked = function () {\n    var st = this.s.slice();\n    st[0][st[1]][3] = [];\n    st[1] += 1;\n    st.splice(this.s[1]+1, 0, st[0]); \n    return window[\'gameMonad\'] = new MonadState(\'gameMonad\', st);\n  }\n\n  MonadState.prototype.run = function ([\n    score = this.s[0][this.s[1]][0], \n    goals = this.s[0][this.s[1]][1],\n    operator = this.s[0][this.s[1]][2],\n    picked = this.s[0][this.s[1]][3].slice(),\n    display = this.s[0][this.s[1]][4].slice()\n  ]) {\n    this.s[1] += 1;\n    var newState = this.s.slice();\n    newState[0].splice(this.s[1], 0, [score, goals, operator, picked, display])  \n     console.log(\'[score, goals, operator, picked, display]\', \n      [score, goals, operator, picked, display]);  \n    this.s = newState;\n    buttonNode = bNode(display);\n    return window[\'gameMonad\'] = new MonadState(\'gameMonad\', newState);\n  }  ');

	var calculations = (0, _dom.h)('pre', '  function updateCalc(ar, op) {\n    console.log(\'In updateCalc. ar and op are\', ar, op);\n    var result = calc(ar[0], op, ar[1]);\n    console.log(\'In updateCalc. result is\', result);\n    console.log(\'In updateCalc. score is\', score);\n    if (result === 18 || result === 20) {\n      score(result);\n    }\n    else {\n      var sco = gameMonad.fetch0();\n      var goals = gameMonad.fetch1();\n      var a = gameMonad.fetch4().slice();\n      a.push(result);\n      gameMonad.run([sco,goals,0,[],a]);\n    }\n  };\n\n  function score(result) {\n    var sc = parseInt(gameMonad.fetch0());\n    var sco = result === 18 ? sc + 3 : sc + 1;\n    var scor = sco % 5 === 0 ? sco + 5 : sco;\n    var goals = gameMonad.fetch1();\n\n    if (scor === 25 && gameMonad.fetch1() === "1") {\n      mMindex.ret(0);\n      gameMonad = new MonadState(\'gameMonad\', [[0,0,0,[],[0,0,0,0]]]);\n      socket.send(`CE#$42,' + pMgroup.x + ',' + pMname.x + '`);\n      scor = 0;\n      goals = 0;\n    }\n    if (scor === 25 && gameMonad.fetch1() === "0") {\n      scor = 0;\n      goals = 1;\n    }\n    newRoll(scor, goals);\n  };  ');

	exports.default = (_calculations$prototy = { calculations: calculations, prototypeAdditions: prototypeAdditions, styl: styl, num_op: num_op, fetch: fetch, gameMonad_2: gameMonad_2, newRoll: newRoll, primes3: primes3, primes2: primes2, primes: primes, variations: variations, MonadEmitter: MonadEmitter, clicks: clicks, bNode: bNode, MonadState2: MonadState2, gameMonad: gameMonad, cycle: cycle, monad: monad, hardWay: hardWay, hardWay2: hardWay2, async1: async1, async2: async2, execP: execP, workerD$: workerD$, fact_workerC: fact_workerC, fact2_workerD: fact2_workerD, primes_state: primes_state, workerB_Driver: workerB_Driver, workerC: workerC, worker$: worker$, errorDemo: errorDemo, monadEr: monadEr, backAction: backAction, tests: tests, mMZ10: mMZ10, test3: test3 }, _defineProperty(_calculations$prototy, 'monad', monad), _defineProperty(_calculations$prototy, 'equals', equals), _defineProperty(_calculations$prototy, 'fmap', fmap), _defineProperty(_calculations$prototy, 'opM', opM), _defineProperty(_calculations$prototy, 'e2', e2), _defineProperty(_calculations$prototy, 'e2x', e2x), _defineProperty(_calculations$prototy, 'e3', e3), _defineProperty(_calculations$prototy, 'e4', e4), _defineProperty(_calculations$prototy, 'e4x', e4x), _defineProperty(_calculations$prototy, 'e6', e6), _defineProperty(_calculations$prototy, 'e6x', e6x), _defineProperty(_calculations$prototy, 'driver', driver), _defineProperty(_calculations$prototy, 'messages', messages), _defineProperty(_calculations$prototy, 'monadIt', monadIt), _defineProperty(_calculations$prototy, 'MonadSet', MonadSet), _defineProperty(_calculations$prototy, 'updateCalc', updateCalc), _defineProperty(_calculations$prototy, 'arrayFuncs', arrayFuncs), _defineProperty(_calculations$prototy, 'nums', nums), _defineProperty(_calculations$prototy, 'cleanup', cleanup), _defineProperty(_calculations$prototy, 'ret', ret), _defineProperty(_calculations$prototy, 'C42', C42), _defineProperty(_calculations$prototy, 'newTask', newTask), _defineProperty(_calculations$prototy, 'process', process), _defineProperty(_calculations$prototy, 'mM$task', mM$task), _defineProperty(_calculations$prototy, 'colorClick', colorClick), _defineProperty(_calculations$prototy, 'edit', edit), _defineProperty(_calculations$prototy, 'testZ', testZ), _defineProperty(_calculations$prototy, 'quad', quad), _defineProperty(_calculations$prototy, 'runTest', runTest), _defineProperty(_calculations$prototy, 'todoStream', todoStream), _defineProperty(_calculations$prototy, 'inc', inc), _defineProperty(_calculations$prototy, 'seed', seed), _defineProperty(_calculations$prototy, 'add', add), _defineProperty(_calculations$prototy, 'MonadState', MonadState), _defineProperty(_calculations$prototy, 'primesMonad', primesMonad), _defineProperty(_calculations$prototy, 'fibsMonad', fibsMonad), _defineProperty(_calculations$prototy, 'primeFibInterface', primeFibInterface), _defineProperty(_calculations$prototy, 'tr3', tr3), _defineProperty(_calculations$prototy, 'fpTransformer', fpTransformer), _defineProperty(_calculations$prototy, 'factorsMonad', factorsMonad), _defineProperty(_calculations$prototy, 'factorsInput', factorsInput), _defineProperty(_calculations$prototy, 'promise', promise), _defineProperty(_calculations$prototy, 'promiseSnippet', promiseSnippet), _defineProperty(_calculations$prototy, 'timeout', timeout), _defineProperty(_calculations$prototy, 'timeoutSnippet', timeoutSnippet), _defineProperty(_calculations$prototy, 'examples', examples), _defineProperty(_calculations$prototy, 'examples2', examples2), _calculations$prototy);

/***/ }
/******/ ]);