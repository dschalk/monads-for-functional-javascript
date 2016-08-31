/// <reference path="./monad.ts" />
/// <reference path="monad.ts" />
/// <reference path="/home/e/MonadState/SRC/src/monad.ts" />
/// <reference path="./code.ts" />
"use strict";
var core_1 = require('@motorcycle/core');
var dom_1 = require('@motorcycle/dom');
var most_1 = require('most');
var code_js_1 = require('./code.js');
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
var websocketsDriver = function () {
    return most_1.create(function (add) {
        socket.onmessage = function (msg) { return add(msg); };
    });
};
socket.onmessage = function (event) {
    console.log(event);
};
socket.onclose = function (event) {
    console.log(event);
};
function main(sources) {
    mMindex.ret(0);
    var messages$ = (sources.WS).map(function (e) {
        mMtem.ret(e.data.split(',')).bnd(function (v) {
            console.log('<><><><><><><><><><><><><><><><>  INCOMING  <><><><><><><> >>> In messages. e amd v are ', e, v);
            mMZ10.bnd(function () { return mM1.ret(v.slice(3)).bnd(function (y) { return game([pMscore.x, pMgoals.x, y, mM3.x].concat(y)); }); });
            mMZ11.bnd(function () { return socket.send('CG#$42,' + pMgroup.x + ',' + pMname.x + ',' + pMscore + ',' + pMgoals); });
            mMZ12.bnd(function () { return mM6.ret(v[2] + ' successfully logged in.'); });
            mMZ13.bnd(function () { return updateMessages(v); });
            mMZ14.bnd(function () { return mMgoals2.ret('The winner is ' + v[2]); });
            mMZ15.bnd(function () { return mMgoals2.ret('A player named ' + v[2] + ' is currently logged in. Page will refresh in 4 seconds.')
                .bnd(refresh); });
            mMZ16.bnd(function () { if (pMname.x != v[2]) {
                mMgoals2.ret(v[2] + v[3]);
            } });
            mMZ17.bnd(function () {
                if (v[3] == 'no file') {
                    mMtaskList.ret([]);
                }
                else {
                    process(e.data);
                }
            });
            mMZ18.bnd(function () { if (pMname == v[2])
                playerMonad.run([v[3], v[4]]); });
            mMZ19.bnd(function () {
                sMplayers.clear();
                var namesL = e.data.split("<br>");
                var namesList = namesL.slice(1);
                updateScoreboard2(namesList);
                namesList.forEach(function (player) { return sMplayers.add(player.trim()); });
                game2();
                console.log('In mMZ19 <><><><><><> namesL, and namesList are ', namesL, namesList);
            });
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
            .bnd(next, 'NN#$42', mMZ19);
    });
    var updateScoreboard2 = function updateScoreboard(v) {
        var ar = [];
        for (var _i = 0, v_1 = v; _i < v_1.length; _i++) {
            var k = v_1[_i];
            ar.push(['  ' + k]);
        }
        ;
        return mMscoreboard.ret(ar);
    };
    var updateMessages = function updateMessages(ar) {
        console.log('In updateMessages ar is >>>>>>>>>>>>>>', ar);
        var sender = ar[2];
        mMhelper.ret(ar)
            .bnd(splice, 0, 3, mMhelper)
            .bnd(reduce)
            .bnd(function (v) { return mMmsg.bnd(unshift, dom_1.h('div', sender + ': ' + v), mMmsg); });
        console.log('In updateMessages ', socket.readyState);
    };
    var loginPress$ = sources.DOM
        .select('input#login').events('keypress');
    var loginPressAction$ = loginPress$.map(function (e) {
        var v = (e.target.value);
        if (v == '') {
            return;
        }
        if (e.keyCode == 13) {
            socket.send("CC#$42" + e.target.value);
            pMname.ret(e.target.value);
            console.log('33333333333333333333333333333333333333 login e.target.value ', e.target.value);
            game2();
            mM3.ret([]);
            document.getElementById('dice').style.display = 'block';
            document.getElementById('rightPanel').style.display = 'block';
            document.getElementById('log1').style.display = 'none';
            document.getElementById('log2').style.display = 'block';
            document.getElementById('gameDiv2').style.display = 'block';
            console.log('In loginPressAction$ ', socket.readyState);
        }
    });
    var groupPress$ = sources.DOM
        .select('input#group').events('keypress');
    var groupPressAction$ = groupPress$.map(function (e) {
        if (e.keyCode == 13) {
            pMgroup.ret(e.target.value);
            playerMonad.run([0, 0]);
            socket.send('CO#$42,' + pMgroup.x + ',' + pMname.x + ',' + e.target.value);
            game2();
            console.log('In groupPressAction$ ', socket.readyState);
            socket.send('CG#$42,' + pMgroup.x + ',' + pMname.x + ',' + 0 + ',' + 0);
        }
    });
    var messagePress$ = sources.DOM
        .select('input.inputMessage').events('keydown');
    var messagePressAction$ = messagePress$.map(function (e) {
        if (e.keyCode == 13) {
            socket.send("CD#$42," + pMgroup.x + "," + pMname.x + "," + e.target.value);
            e.target.value = '';
            console.log('In messagePressAction$ ', socket.readyState);
        }
    });
    var task2 = function task2(str) {
        console.log('In taskAction$. str is: ', str);
        socket.send('TD#$42' + ',' + pMgroup.x + ',' + pMname.x + ',' + '@' + str);
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
                alert = 'You should enter "author, responsible party, task" separated by commas';
                document.getElementById('alert').innerHTML = alert;
            }
            var ar2 = ar.slice(2);
            console.log('*************  newTaskAction$  ************************$$$$$$$$$$$  ar ', ar);
            if (ar2.length == 1) {
                task = ar[2];
            }
            if (ar2.length > 1) {
                task = ar2.reduce(function (a, b) { return a + '$*$*$' + b; });
            }
            if ((mMar2.x.filter(function (v) { return (v.task == task); }).length) > 0) {
                document.getElementById('alert').innerHTML = task + " is already listed.";
            }
            else if (ar.length > 2) {
                mMcurrentList.bnd(addString, task + ',yellow, none, false,' + ar[0] + ',' + ar[1], mMtemp);
                task2(mMcurrentList.x);
                e.target.value = '';
                document.getElementById('alert').innerHTML = '';
            }
        }
    });
    var process = function (str) {
        var a = str.split(",");
        if (a == undefined) {
            return;
        }
        ;
        if (a.length < 9) {
            return;
        }
        ;
        var ob = {};
        var ar = a.slice(3);
        var s = ar.reduce(function (a, b) { return a + ',' + b; });
        // console.log('In process. ar and s are: ', ar, s);
        var tempArray = [];
        if (ar.length < 6) {
            return;
        }
        ;
        if ((ar.length % 6) !== 0) {
            document.getElementById('alert').innerHTML = 'Error: array length is: ' + length;
        }
        mMcurrentList.ret(s);
        process3(ar);
    };
    var process3 = function (a) {
        if (a.length > 0 && (a.length % 6) == 0) {
            var ar5 = [];
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
            mMar2.ret(ar5);
            process4(ar5);
        }
        else {
            document.getElementById('alert2').innerHTML = 'The length of the game array is either 0 or is not divisible by 6';
        }
    };
    var process4 = function (a) {
        var tempArray = [];
        var keys = Object.keys(a);
        for (var k in keys) {
            tempArray.push(dom_1.h('div.todo', [
                dom_1.h('span.task3', { style: { color: a[k].color, textDecoration: a[k].textDecoration } }, 'Task: ' + a[k].task),
                dom_1.h('br'),
                dom_1.h('button#edit1', 'Edit'),
                dom_1.h('input#edit2', { props: { type: 'textarea', value: a[k].task }, style: { display: 'none' } }),
                dom_1.h('span#author.tao', 'Author: ' + a[k].author + ' / ' + 'Responsibility: ' + a[k].responsible),
                dom_1.h('br'),
                dom_1.h('input#cb', { props: { type: 'checkbox', checked: a[k].checked }, style: { color: a[k].color,
                        textDecoration: a[k].textDecoration } }),
                dom_1.h('label.cbox', { props: { for: '#cb' } }, 'Completed'),
                dom_1.h('button.delete', 'Delete'),
                dom_1.h('br'),
                dom_1.h('hr')]));
        }
        mMtaskList.ret(tempArray);
    };
    var colorClick$ = sources.DOM
        .select('#cb').events('click');
    var colorAction$ = colorClick$.map(function (e) {
        var ind = getIndex(e);
        var index = parseInt(ind, 10);
        var s = mMcurrentList.x;
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
        mMtaskList.x[index].children[3].elm.style.display = 'block';
    });
    var edit2$ = sources.DOM
        .select('#edit2').events('keypress');
    var edit2Action$ = edit2$.map(function (e) {
        var v = e.target.value;
        var index = getIndex2(e);
        if (e.keyCode == 13) {
            process2(v, index);
            mMtaskList.x[index].children[3].elm.style.display = 'none';
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
        var s = mMcurrentList.x;
        var ar = s.split(',');
        var str = '';
        ar.splice(index * 6, 6);
        if (ar.length > 0) {
            task2(ar.reduce(function (a, b) { return a + ',' + b; }));
        }
        else {
            socket.send('TX#$42' + ',' + pMgroup.x + ',' + pMname.x);
            mMtaskList.ret('');
        }
    });
    var timeoutClicks$ = sources.DOM.select('#timeout').events('click');
    var timeoutAction$ = timeoutClicks$.map(function () {
        document.getElementById('timeout2').innerHTML = '';
        document.getElementById('timeout3').innerHTML = '';
        m.ret(3, 'm')
            .bnd(timeout2, 1, m, [function () { return m
                .bnd(cube, m)
                .bnd(display, 'timeout2', 'm.x is ' + ' ' + m.x, m)
                .bnd(timeout2, 2, m, [function () { return m
                    .bnd(add, 15, m)
                    .bnd(display, 'timeout2', 'm.x is ' + ' ' + m.x, m)
                    .bnd(display, 'timeout3', 'The meaning of everything was computed to be' + ' ' + m.x, m); }
            ]); }]);
    });
    var chatClick$ = sources.DOM
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
    // **************************************   GAME   *********************************************** GAME START
    var gameClick$ = sources.DOM
        .select('#game').events('click');
    var gameClickAction$ = gameClick$.map(function () {
        var el = document.getElementById('gameDiv');
        (el.style.display == 'none') ?
            el.style.display = 'inline' :
            el.style.display = 'none';
        var el2 = document.getElementById('gameDiv2');
        (el2.style.display == 'none') ?
            el2.style.display = 'inline' :
            el2.style.display = 'none';
    });
    var rollClick$ = sources.DOM
        .select('.roll').events('click');
    var rollClickAction$ = rollClick$.map(function (e) {
        socket.send('CA#$42,' + pMgroup.x + ',' + pMname.x + ',6,6,12,20');
        mM3.ret([]);
        playerMonad.run([pMscore.bnd(add, -1, pMscore).x, pMgoals.x]);
        socket.send('CG#$42,' + pMgroup.x + ',' + pMname.x + ',' + pMscore.x + ',' + mMgoals.x);
    });
    var numClick$ = sources.DOM
        .select('.num').events('click');
    var numClickAction$ = numClick$.map(function (e) {
        if (mM3.x.length < 2) {
            mM3.bnd(push, e.target.innerHTML, mM3).bnd(function (nums) {
                return mM1.bnd(splice, e.target.id, 1, mM1).bnd(function (nums2) {
                    return game([pMscore.x, pMgoals.x, nums2, nums].concat(nums2));
                });
            });
        }
        if (mM3.x.length === 2 && mM8.x !== 0) {
            updateCalc();
        }
    }).startWith([0, 0, 0, 0]);
    var opClick$ = sources.DOM
        .select('.op').events('click');
    var opClickAction$ = opClick$.map(function (e) {
        mM8.ret(e.target.textContent);
        if (mM3.x.length === 2) {
            updateCalc();
        }
    });
    var forwardClick$ = sources.DOM
        .select('#forward').events('click');
    var backClick$ = sources.DOM
        .select('#back').events('click');
    var forwardAction$ = forwardClick$.map(function () {
        if (mMindex.x < (mMhistory.x.length - 1)) {
            mMindex.bnd(add, 1, mMindex)
                .bnd(function (v) { return trav(v); });
        }
    });
    var backAction$ = backClick$.map(function () {
        if (mMindex.x > 0) {
            mMindex.bnd(add, -1, mMindex)
                .bnd(function (v) { return trav(v); });
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
    function changeS(ar, name) {
        var x = ar.filter(function (v) { return v.split("|")[0].trim() != pMname.x; });
        return x;
    }
    function updateCalc() {
        mM3.bnd(function (x) {
            return mM7.ret(calc(x[0], mM8.x, x[1])).bnd(function (result) {
                mM1.bnd(push, result, mM1)
                    .bnd(function (nums) { return game([pMscore.x, pMgoals.x, nums, []].concat(nums)); });
                if (result == 20) {
                    score(pMscore.x * 1 + 1);
                }
                if (result == 18) {
                    score(pMscore.x * 1 + 3);
                }
            });
        });
        reset();
    }
    ;
    function cleanup(x) {
        var target0 = document.getElementById('0');
        var target1 = document.getElementById('1');
        var target2 = document.getElementById('2');
        var target3 = document.getElementById('3');
        var targetAr = [target0, target1, target2, target3];
        [0, 1, 2, 3].map(function (i) {
            if (targetAr[i].innerHTML == 'undefined') {
                targetAr[i].style.display = 'none';
            }
            else {
                targetAr[i].style.display = 'inline';
            }
        });
        return ret(x);
    }
    ;
    var score = function score(x) {
        socket.send('CA#$42,' + pMgroup.x + ',' + pMname.x + ',6,6,12,20');
        if (x !== 20) {
            console.log('In score *******<><><><><><><><><><><>********4444444444444444 x and pMscore.x is ', x, pMscore.x);
            pMscore.ret(x).bnd(addTest, pMscore).bnd(function (v) {
                playerMonad.run([v, pMgoals.x]);
                socket.send('CG#$42,' + pMgroup.x + ',' + pMname.x + ',' + v + ',' + mMgoals.x);
            });
        }
        else {
            mMplayer.ret([]);
            mM13.ret(0);
            mMgoals.bnd(add, 1, mMgoals).bnd(function (v) {
                if (v == 3) {
                    socket.send('CE#$42,' + pMgroup.x + ',' + pMname.x + ',nothing ');
                    mMgoals.ret(0).bnd(mMindex.ret);
                    mMhistory.ret([0, 0, 0, 0]);
                    playerMonad.run([0, 0]);
                    socket.send('CG#$42,' + pMgroup.x + ',' + pMname.x + ',' + 0 + ',' + 0);
                }
                else {
                    var g = pMgoals.x * 1 + 1;
                    playerMonad.run([0, g]);
                    socket.send('CG#$42,' + pMgroup.x + ',' + pMname.x + ',' + 0 + ',' + g);
                }
                ;
            });
        }
    };
    var reset = function reset() {
        mM3.ret([])
            .bnd(function () { return mM4.ret(0)
            .bnd(mM8.ret)
            .bnd(cleanup); });
        mMgoals2.ret('');
    };
    var updateScoreboard = function updateScoreboard(v) {
        mMscoreboard.push(dom_1.h('div', v));
    };
    //**************************************   GAME   *********************************************** GAME END
    var todoClick$ = sources.DOM
        .select('#todoButton').events('click');
    var todoClickAction$ = todoClick$.map(function (e) {
        var el = document.getElementById('todoDiv');
        (el.style.display == 'none') ?
            el.style.display = 'inline' :
            el.style.display = 'none';
    });
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
    // ************************************************************************* ENDOM iginal Fibonacci END
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> START PRIME FIB  
    var fibKeyPress5$ = sources.DOM
        .select('input#fib92').events('keydown');
    var primeFib$ = fibKeyPress5$.map(function (e) {
        if (e.keyCode == 13) {
            var res = fibsMonad
                .run([0, 1, e.target.value, []])
                .bnd(function (fibsState) { return fibsMonad
                .bnd(fpTransformer, primesMonad)
                .bnd(function (primesState) { return tr3(fibsState[3], primesState[3]); }); });
            document.getElementById('PF_9').innerHTML = res[0];
            document.getElementById('PF_22').innerHTML = res[1];
            document.getElementById('primeFibs').innerHTML = res[2];
        }
    });
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ENDOM basic prime END
    // <>>><>><><><><>>>><><><   prime factors   ><><><><><><>>><<><><><><><><>< START prime factors  
    var factorsPress$ = sources.DOM
        .select('input#factors_1').events('keydown');
    var factorsAction$ = factorsPress$.map(function (e) {
        mMfactors.ret(e.target.value);
        if (e.target.value == '') {
            return;
        }
        ;
        if (e.keyCode == 13 && (parseInt(e.target.value, 10) != null)) {
            var message;
            var factors = primesMonad.run([primesMonad.s[0], [], e.target.value, primesMonad.a])
                .bnd(prFactTransformer, factorsMonad).s[1];
            if (e.target.value == factors.slice().pop()) {
                message = e.target.value + ' is a prime number';
            }
            else {
                message = 'The prime factors of ' + e.target.value + ' are ' + factors;
            }
            document.getElementById('factors_3').innerHTML = message;
        }
    });
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ENDOM prime factors END
    // ?<>>><>><><><><>>>><><><  traversal  ><><><><><><>>><><><><><><><><><><><>< START traversal  
    window.onload = function (event) {
        console.log('onopen event: ', event);
        // document.querySelector('input#login').focus();
        mMitterfib5.release(200);
        // mM$prime5.ret([[2], 3, 3]);
    };
    // <>>><>><><><><>>>><><><  traversal  ><><><><><><>>><><><><><><><><><><><>< ENDOM traversal  
    // <>>><>><><><><>>>><><><  traversal  ><><><><><><>>><><><><><><><><><><><>< START Itterator  
    var testZ = sources.DOM
        .select('#testZ').events('click');
    var testZAction$ = testZ.map(function () {
        return mMZ1.release(1);
    });
    var testQ = sources.DOM
        .select('#testQ').events('click');
    var testQAction$ = testQ.map(function () {
        mMt1.ret(0).bnd(function (v) { return mMZ2.release(v); });
    });
    var testW = sources.DOM
        .select('#testW').events('keypress');
    var testWAction$ = testW.map(function (e) {
        if (e.keyCode == 13) {
            mMZ2.release(e.target.value);
        }
    });
    var solve = function solve() {
        mMZ3.bnd(function (a) {
            return mMtemp.ret(a)
                .bnd(display, 'quad4', '')
                .bnd(display, 'quad6', '')
                .bnd(display, 'quad5', a + " * x * x ")
                .bnd(function (a) { return mMZ3 // Blocks here until new user input comes in.
                .bnd(function (b) { return mMtemp.ret(b)
                .bnd(display, 'quad6', b + ' * x ').bnd(function (b) { return mMZ3 // Blocks again.
                .bnd(function (c) { return mMtemp.ret([a, b, c]).bnd(fmap, qS4, "mMtemp")
                .bnd(function (v) {
                var x = v[0];
                var y = v[1];
                console.log('Here is x and y: ', x, y);
                mMtemp.bnd(display, 'quad4', "Results: " + x + " and  " + y)
                    .bnd(display, 'quad5', dom_1.p(a).text + " * " + x + " * " + x + " + " + dom_1.p(b).text +
                    " * " + x + " " + dom_1.p(c).text + " = 0")
                    .bnd(display, 'quad6', dom_1.p(a).text + " * " + y + " * " + y + " + " + dom_1.p(b).text +
                    " * " + y + " " + dom_1.p(c).text + " = 0");
                solve();
            }); }); }); }); });
        });
    };
    solve();
    var quad$ = sources.DOM
        .select('#quad').events('keypress');
    var quadAction$ = quad$.map(function (e) {
        if (e.keyCode == 13) {
            mMZ3.release(e.target.value);
            document.getElementById('quad').innerHTML = '';
        }
    });
    var dummyClick$ = sources.DOM
        .select('#dummy').events('click');
    var dummyAction$ = dummyClick$.map(function (e) {
        mMdummy.bnd(add, 1, mMdummy);
        console.log('<><><><><><><><><> In dummyAction$ e is: ', e);
        console.log(document.getElementById('dummy').click);
        console.log('<><><><><><><><><>');
        var next = mM23.x[mM23.x.length - 1] * 1 + mM23.x[mM23.x.length - 2] * 1;
        mM23.bnd(push, next, mM23);
        document.getElementById('dummy2').innerHTML = mM23.x;
    });
    var calcStream$ = most_1.merge(timeoutAction$, factorsAction$, forwardAction$, backAction$, dummyAction$, primeFib$, fibPressAction$, quadAction$, testWAction$, testZAction$, testQAction$, edit1Action$, edit2Action$, colorAction$, deleteAction$, newTaskAction$, chatClickAction$, gameClickAction$, todoClickAction$, captionClickAction$, groupPressAction$, rollClickAction$, messagePressAction$, loginPressAction$, messages$, numClickAction$, opClickAction$);
    return {
        DOM: calcStream$.map(function () {
            return dom_1.h('div.content', [
                dom_1.h('div#rightPanel', { style: { display: 'none' } }, [
                    dom_1.h('span#tog', [
                        dom_1.h('button#game', { style: { fontSize: '16px' } }, 'TOGGLE GAME'),
                        dom_1.h('span.tao', ' '),
                        dom_1.h('button#todoButton', { style: { fontSize: '16px' } }, 'TOGGLE TODO_LIST'),
                        dom_1.h('br'),
                        dom_1.h('br'),
                        dom_1.h('button#chat2', { style: { fontSize: '16px' } }, 'TOGGLE CHAT'),
                        dom_1.h('span.tao', ' '),
                        dom_1.h('button#caption', { style: { fontSize: '16px' } }, 'TOGGLE CAPTION')]),
                    dom_1.h('br'),
                    dom_1.h('br'),
                    dom_1.h('br'),
                    dom_1.h('br'),
                    dom_1.h('div#gameDiv', [
                        dom_1.h('span#sb1'),
                        dom_1.h('br'),
                        dom_1.h('span#sb2'),
                        dom_1.h('br'),
                        dom_1.h('span#sb5'),
                        dom_1.h('br'),
                        dom_1.h('span#sb6')]),
                    dom_1.h('br'),
                    dom_1.h('br'),
                    dom_1.h('br'),
                    dom_1.h('div#todoDiv', [
                        dom_1.h('div#taskList', mMtaskList.x),
                        dom_1.h('span', 'Author, Responsible Person, Task: '),
                        dom_1.h('input.newTask')]),
                    dom_1.h('br'),
                    dom_1.h('span#alert'),
                    dom_1.h('br'),
                    dom_1.h('span#alert2'),
                    dom_1.h('br'),
                    dom_1.h('br'),
                    dom_1.h('div#chatDiv', [
                        dom_1.h('div#messages', [
                            dom_1.h('span', 'Message: '),
                            dom_1.h('input.inputMessage'),
                            dom_1.h('div', mMmsg.x)])])
                ]),
                dom_1.h('div#leftPanel', [
                    dom_1.h('br'),
                    dom_1.h('a.tao', { props: { href: '#common' } }, 'Common Patterns'),
                    dom_1.h('a.tao', { props: { href: '#async' } }, 'Asyc'),
                    dom_1.h('a.tao', { props: { href: '#monaditter' } }, 'MonadItter'),
                    dom_1.h('a.tao', { props: { href: '#monadset' } }, 'Set Monad '),
                    dom_1.h('a.tao', { props: { href: '#monadstate' } }, 'State Monad'),
                    // h('a.tao', {props: {href: '#monads'}}, 'Why Call Them Monads'   ),  
                    dom_1.h('div#captionDiv', [
                        dom_1.h('h1', 'Motorcycle.js With JS-monads'),
                        dom_1.h('span.tao1', ' A shared, persistent todo list, '),
                        dom_1.h('br'),
                        dom_1.h('span.tao1', ' A websockets simulated dice game with a traversable history, '),
                        dom_1.h('br'),
                        dom_1.h('span.tao1', ' Group chat rooms and more demonstrations of efficient, '),
                        dom_1.h('br'),
                        dom_1.h('span.tao2', ' maintainable code using Motorcycle.js and JS-monads.  ')]),
                    dom_1.h('br'),
                    dom_1.h('span.tao', 'This is a '),
                    dom_1.h('a', { props: { href: "https://github.com/motorcyclejs", target: "_blank" } }, 'Motorcycle.js'),
                    dom_1.h('span', ' application. Motorcycle.js is '),
                    dom_1.h('a', { props: { href: "https://github.com/cyclejs/core", target: "_blank" } }, 'Cycle.js'),
                    dom_1.h('span', ' using '),
                    dom_1.h('a', { props: { href: "https://github.com/cujojs/most", target: "_blank" } }, 'Most'),
                    dom_1.h('span', ' , '),
                    dom_1.h('span', ' and '),
                    dom_1.h('a', { props: { href: "https://github.com/paldepind/snabbdom", target: "_blank" } }, 'Snabbdom'),
                    dom_1.h('span', ' instead of RxJS and virtual-dom.  The code for this repository is at '),
                    dom_1.h('a', { props: { href: "https://github.com/dschalk/JS-monads-stable", target: "_blank" } }, 'JS-monads-stable'),
                    dom_1.h('div#gameDiv2', { style: { display: 'none' } }, [
                        dom_1.h('br'),
                        dom_1.h('p.red8', mMgoals2.x),
                        dom_1.h('span', ' Here are the basic rules:'),
                        dom_1.h('p', 'RULES: If clicking two numbers and an operator (in any order) results in 20 or 18, the score increases by 1 or 3, respectively. If the score becomes 0 or is evenly divisible by 5, 5 points are added. A score of 25 results in one goal. That can only be achieved by arriving at a score of 20, which jumps the score to 25. Directly computing 25 results in a score of 30, and no goal. Each time RL is clicked, one point is deducted. Three goals wins the game. '),
                        dom_1.h('button#0.num'),
                        dom_1.h('button#1.num'),
                        dom_1.h('button#2.num'),
                        dom_1.h('button#3.num'),
                        dom_1.h('br'),
                        dom_1.h('button#4.op', 'add'),
                        dom_1.h('button#5.op', 'subtract'),
                        dom_1.h('button#5.op', 'mult'),
                        dom_1.h('button#5.op', 'div'),
                        dom_1.h('button#5.op', 'concat'),
                        dom_1.h('br'),
                        dom_1.h('div#dice', { style: { display: 'none' } }, [
                            dom_1.h('button.roll', 'ROLL'),
                            dom_1.h('br'),
                            dom_1.h('button#back', 'BACK'),
                            dom_1.h('button#forward', 'FORWARD'),])]),
                    dom_1.h('div#log1', [
                        dom_1.h('p', 'IN ORDER TO SEE THE GAME, TODOLIST, AND CHAT DEMONSTRATIONS, YOU MUST ENTER SOMETHING .'),
                        dom_1.h('span', 'Name: '),
                        dom_1.h('input#login', { props: { placeholder: "focus on; start typing" } })]),
                    dom_1.h('p', mM6.x),
                    dom_1.h('div#log2', { style: { display: 'none' } }, [
                        dom_1.h('span', 'Change group: '),
                        dom_1.h('input#group')]),
                    dom_1.h('p', mMsoloAlert.x),
                    dom_1.h('p', 'People who are in the same group, other than solo, share the same todo list, messages, and simulated dice game. In order to see any of these, you must establish an identity on the server by logging in. The websockets connection terminates if the first message the server receives does not come from the sign in form. You can enter any random numbers or letters you like. The only check is to make sure someone hasn\t already signed in with whatever you have selected. If you log in with a name that is already in use, a message will appear and this page will be re-loaded in the browser after a four-second pause. '),
                    dom_1.h('p', ' Data for the traversable game history accumulates until a player scores. The data array is then re-set to [], the empty array. When a player clicks the BACK button, other group members are notified. It is up to the group to decide whether clicking the BACK button disqualifies a player. '),
                    dom_1.h('hr'),
                    dom_1.h('h1', 'The Monads'),
                    dom_1.h('h3', ' Monad '),
                    code_js_1["default"].monad,
                    dom_1.h('p', ' Monad instances are useful for chaining computations. Typically, the bnd() method provides its value to a computation that returns an instance of Monad. Here are some examples: '),
                    code_js_1["default"].e1,
                    dom_1.h('p', ' These functions can be used with instances of Monad in many ways, for example: '),
                    code_js_1["default"].e2,
                    dom_1.h('p', ' Each of the functions shown above can be used as a stand-alone function or as an argument to the bnd() method. Each monad in a chain of linked computations can do one of two things with the previous monad\s value: (1) It can ignore it, possibly letting it move past for use further down the chain or (2) use it, with the option of passing it on down the chain. Any computation can be inserted into the chain by giving it an additional first argument (which will be the previous monad\'s value), and having it return an instance of Monad. Say you have a function func(a,b,c) {...}. Put something ahead of a (it will have the previous monad\'s value) and return a monad. You can give the returned monad any value you like. For example, func\'(x,a,b,c) {...; return ret(x)} will work. Its bnd() method will pass along the value x, which is the previous monad\s value. '),
                    dom_1.h('h3', ' The Monad Laws '),
                    dom_1.h('p', ' In the following discussion, "x == y" signifies that x == y returns true. Let M be the collection of all instances of Monad, let J be the collection of all Javascript values, including functions, instances of Monad, etc, and let F be the collection of all functions mapping values in J to monads in M where the return values are the calling instance of Monad. For any m (with id == "m"), v, f, and f\' in M, J, F, and F, respectively, the following relationships hold: '),
                    dom_1.h('pre.lb', "    equals( m.ret(v).bnd(f), f(v) ) Left identity   Holds provided that f returns m.\n    Example: equals( m.ret(5).bnd(cube, m).x, cube(5, m) )   \n    Haskell monad law: (return x) >>= f \u2261 f x  \n    \n    m.bnd(m.ret) == m   Right identity   Works even with \"==\" and \"===\"\n    Haskell monad law: m >>= return \u2261 m  \n    \n    equals( m.bnd(f).bnd(f'), m.bnd(v => f(v).bnd(f')) )  Associativity\n    Haskell monad law: (m >>= f) >>= g \u2261 m >>= ( \\x -> (f x >>= g) ) "),
                    dom_1.h('p', ' where equals is defined as: '),
                    code_js_1["default"].equals,
                    dom_1.h('p', ' The function equals() was used because the == and === operators on objects check for location in memory, not equality of attributes and methods. If the left and right sides of predicates create new instances of m, then the left side m and the right side m wind up in different location in memory. That\'s why m.ret(3) == m.ret(3) returns false. If we define equality to mean equality of attributes, then ret is the left and right identity on objects in M and  the objects in M commute when their bind methods operate on functions in F. '),
                    dom_1.h('h3', ' The JS-monads-mutableInstances Branch  '),
                    dom_1.h('p', ' In the JS-monads-mutableInstances branch of this project, examples of the laws hold when the == operator is used. For example: '),
                    dom_1.h('pre', "    m.bnd(add, 3, m).bnd(cube, m) == m.bnd(v => add(v, 3, m).bnd(cube, m)\n    m.ret(5).bnd(cube, m) == cube(5, m)   "),
                    dom_1.h('p', ' Tests in the JS-monads-mutableInstance produce results closer to what we would expect in mathematics. For example: '),
                    dom_1.h('pre', "    m.ret(7) == m.ret(7)  Returns true in JS-monads-mutableIntances.  "),
                    dom_1.h('h3', ' Back to the master branch '),
                    dom_1.h('h3', ' fmap '),
                    dom_1.h('p', ' I showed you (abpve) some functions designed for instances of Monad, but it is easy to lift functions that return ordinary Javascript values into chains of monadic computations. One way of doing this is to use fmap(), as shown below in finding solutions to the quadratic equation.  '),
                    dom_1.h('h3', ' Monad Arithmetic with opM '),
                    code_js_1["default"].opM,
                    dom_1.h('p', ' Since the Monad instance ok had already been created, the second result could have been obtained by running: '),
                    dom_1.h('pre', "    ok.ret(m1.x + m2.x)   "),
                    dom_1.h('p', ' Just adding the suffix ".x" to an instance of Monad exposes its value. Doing that and running ret() on the return value is all that is needed for performing computations with ordinary functions and wrapping the results in instances of Monad. fmap is non-essential syntactic sugar. This is very different from Haskell, where fmap is an essential component of monadic computation. '),
                    dom_1.h('h3', ' Are They Category Theory Monads?  '),
                    dom_1.h('p#monaditter', ' Just as Javascript if very different from Haskell, so too are the JS-monads very different from Haskell monads. For example, the JS-monads carry bnd() and ret() internally whereas Haskell uses >>= and return. I think the essential takeaways from the above demonstration of similarities are not so much that JS-monads are like Haskell monads, but that (1) the Monad ret() method is the left and right identity on instances of Monad, and (2) instances of Monad compose associatively. Does that mean that members of M (defined above) are monoids in the category of endofunctors, just like Haskell monads? Well, it does sort of feel that way, but it hasn\'t been proven.   '),
                    // **************************************************************************** END MONAD       START MonadItter   
                    dom_1.h('h2', 'MonadItter'),
                    code_js_1["default"].monadIt,
                    dom_1.h('p', ' MonadItter instances do not have monadic properties, but they facilitate the work of monads. Here\'s how they work: '),
                    dom_1.h('p', 'For any instance of MonadItter, say "it", "it.bnd(func)" causes it.p == func. Calling the method "it.release(...args)" causes p(...args) to run, possibly with arguments supplied by the caller. Here is the definition: '),
                    dom_1.h('p', ' As shown later on this page, MonadItter instances control the routing of incoming websockets messages and the flow of action in the simulated dice game. In one of the demonstrations below, they behave much like ES2015 iterators. I prefer them over ES2015 iterators. They also provide promises-like functionality'),
                    dom_1.h('h3', ' A Basic Itterator '),
                    dom_1.h('p', 'The following example illustrates the use of release() with an argument. It also shows a lambda expressions being provided as an argument for the method mMZ1.bnd() (thereby becoming the value of mMZ1.p) and then mMZ1.release providing an arguments for the function mMZ1.p. The code is shown beneith the following two buttons. '),
                    dom_1.h('button#testZ', 'mMZ1.release(1)'),
                    dom_1.h('p.code2', mMt3.x),
                    dom_1.h('span', 'Refresh button: '),
                    dom_1.h('button#testQ', 'mMt1.ret(0).bnd(v => mMZ2.release(v)) '),
                    dom_1.h('br'),
                    code_js_1["default"].testZ,
                    dom_1.h('span.tao', ' mMt3.x sits permanently in the Motorcycle virtual DOM description. You can call '),
                    dom_1.h('span.green', 'mMZ2.release(v)'),
                    dom_1.h('span', ' by entering a value for v below: '),
                    dom_1.h('br'),
                    dom_1.h('span', 'Please enter an integer here: '),
                    dom_1.h('input#testW'),
                    dom_1.h('p', ' cube() is defined in the Monad section (above). If you click "mMZ1.release(1)" several times, the code (above) will run several times, each time with v == 1. The result, mMt3.x, is shown below the button. mMZ1.p (bnd()\'s argument) remains constant while mMZ1.release(1) is repeatedly called, incrementing the number being cubed each time. '),
                    dom_1.h('p', ' Here is another example. It demonstrates lambda expressions passing values to a remote location for use in a computation. If you enter three numbers consecutively below, call them a, b, and c, then the quadratic equation will be used to find solutions for a*x**2 + b*x + c = 0. The a, b, and c you select might not have a solution. If a and b are positive numbers, you are likely to see solutions if c is a negative number. For example, 12, 12, and -24 yields the solutions 1 and -2. '),
                    dom_1.h('p#quad4.red2'),
                    dom_1.h('p#quad5.red2'),
                    dom_1.h('p#quad6.red2'),
                    dom_1.h('p', 'Run mMZ3.release(v) three times for three numbers. The numbers are a, b, and c in ax*x + b*x + c = 0: '),
                    dom_1.h('input#quad'),
                    dom_1.h('p', 'Here is the code:'),
                    code_js_1["default"].quad,
                    dom_1.h('p', ' fmap (above) facilitated using qS4 in a monadic sequence. qS4 returns an array, not an instance of Monad, but fmap lifts qS4 into the monadic sequence. '),
                    dom_1.h('span'),
                    dom_1.h('p#monadstate'),
                    // ***************************************************************************************************** START MonadState
                    dom_1.h('h2', 'MonadState and MonadState Transformers'),
                    dom_1.h('p', ' An instance of MonadState holds the current state and value of a computation. For any instance of MonadState, say m, these can be accessed through m.s and m.a, respectively.  '),
                    code_js_1["default"].MonadState,
                    dom_1.h('p', ' MonadState reproduces some of the functionality found in the Haskell Module "Control.Monad.State.Lazy", inspired by the paper "Functional Programming with erloading and Higher-der Polymorphism", Mark P Jones (http://web.cecs.pdx.edu/~mpj/) Advanced School of Functional Programming, 1995. The following demonstrations use the MonadState instances fibsMonad and primesMonad to create and store arrays of Fibonacci numbers and arrays of prime numbers, respectively. fibsMonad and primesMonad provide a simple way to compute lists of prime Fibonacci numbers.  Because the results of computations are stored in the a and s attributes of MonadState instances, it was easy to make sure that no prime number had to be computed more than once in the prime Fibonacci demonstration. '),
                    dom_1.h('p', ' Here is the definition of fibsMonad, along with the definition of the function that becomes fibsMonad.process. '),
                    code_js_1["default"].fibsMonad,
                    dom_1.h('p', ' The other MonadState instance used in this demonstration is primesMonad. Here is its definition along with the function that becomes primesMonad.process:  '),
                    code_js_1["default"].primesMonad,
                    dom_1.h('h3', ' MonadState transformers '),
                    dom_1.h('p', ' Transformers take instances of MonadState and return different instances of MonadState, possibly in a modified state. The method call "fibsMonad.bnd(fpTransformer, primesMonad)" returns primesMonad. Here is the definition of fpTransformer: '),
                    code_js_1["default"].fpTransformer,
                    dom_1.h('p', ' If the largest number in primesMonad.a is less than the square root of the largest number in fibsMonad.a, primesMonad is updated so that the largest number in primesMonad.a is greater than the square root of the largest number in fibsMonad.a. herwise, primesMonad is returned unchanged.  '),
                    dom_1.h('p', ' The final computation in the prime Fibonacci numbers demonstration occurs when "tr3(fibsState[3],primesState[3]" is called. tr3() takes an array of Fibonacci numbers and an array of prime numbers and returns an array containing an array of Fibonacci numbers, an array of prime numbers, and an array of prime Fibonacci numbers. Here is the definition of tr3: '),
                    code_js_1["default"].tr3,
                    dom_1.h('p', ' User input is handled by a chain of computations.  first to update fibsMonad, second to extract fibsMonad.s, third to run fpTransformer to modify and then return primesMonad, and fourth to extract primesMonad.s and run tr3(fibsState[3],primesState[3]). Here is the code: '),
                    code_js_1["default"].primeFibInterface,
                    dom_1.h('p', 'ly 48 Fibonacci numbers need to be generated in order to get the eleventh prime Fibonacci number. But 5546 prime numbers need to be generated to test for divisibility into 2971215073. Finding the next Fibonacci number is just a matter of adding the previous two. Getting the next prime number is a more elaborate and time-consuming procedure. In this context, the time needed to compute 48 Fibonacci numbers is insignificant, so I didn\'t bother to save previously computed Fibonacci numbers in the prime Fibonacci demonstration. When a user enters a number smaller than the current length of fibsMonad.a, fibsMonad is modified such that its length becomes exactly what the user entered.'),
                    dom_1.h('p', ' Entering 50 in my desktop Ubuntu Chrome and Firefox browsers got the first eleven prime Fibonacci numbers in about one second. I tried gradually incrementing upwards from 50, but when I got to 61 I stopped due to impatience with the lag time. The 61st Fibonacci number was computed to be 1,548,008,755,920. 76,940 prime numbers were needed to check the 60th Fibonacci number. 96,043 prime numbers were needed to check the 61st Fibonacci number.  At Fibonacci number 61, no new prime Fibonacci numbers had appeared.'),
                    dom_1.h('p', ' According to multiple sources, these are the first eleven proven prime Fibonacci numbers:'),
                    dom_1.h('span.lb', ' 2, 3, 5, 13, 89, 233, 1597, 28657, 514229, 433494437, and 2971215073 '),
                    dom_1.h('br'),
                    dom_1.h('p', ' The number you enter below is the length of the list of Fibonacci numbers you want to generate.  '),
                    dom_1.h('p'),
                    dom_1.h('input#fib92'),
                    dom_1.h('br'),
                    dom_1.h('span#PF_7.red6', 'Fibonacci Numbers'),
                    dom_1.h('br'),
                    dom_1.h('span#PF_9.red7'),
                    dom_1.h('br'),
                    dom_1.h('span#PF_21.red6', 'Prime Numbers'),
                    dom_1.h('br'),
                    dom_1.h('span#PF_22.red7'),
                    dom_1.h('br'),
                    dom_1.h('span#PF_8.red6', 'Prime Fibonacci Numbers'),
                    dom_1.h('br'),
                    dom_1.h('span#primeFibs.red7'),
                    dom_1.h('p', ' The next demonstration uses two instances of MonadState to find the prime factors of numbers. Each prime factor is listed once.  my desktop computer, it took several seconds to verify that 514229 is a prime number. After that, due to persistent (until the web page closes) memoization, numbers below 514229 or not too far above it evaluated rapidly. Here\'s where you can enter a number to see its prime factors: '),
                    dom_1.h('input#factors_1'),
                    dom_1.h('br'),
                    dom_1.h('span#factors_2.red6'),
                    dom_1.h('br'),
                    dom_1.h('span#factors_3.red7'),
                    dom_1.h('br'),
                    dom_1.h('p', ' The demonstration uses primesMonad and factorsMonad. Here are the definitions of factosMonad and factor_state, the function that is factorsMonad.process: '),
                    code_js_1["default"].factorsMonad,
                    dom_1.h('p#async', ' And this is how user input is handled: '),
                    code_js_1["default"].factorsInput,
                    //************************************************************************** ENDOM MonadState
                    //************************************************************************** BEGIN Promises
                    dom_1.h('h2', ' Asynchronous Composition: Promises, MonadItter, or Neither '),
                    dom_1.h('p', ' Using the ES2015 Promises API inside of monads is easy. For example, consider the function "promise", defined as follows: '),
                    code_js_1["default"].promise,
                    dom_1.h('p', ' Running the following code causes m.x == 42 after two seconds. '),
                    code_js_1["default"].promiseSnippet,
                    dom_1.h('p', ' After a two-second delay, the Promise returns an anonymous monad with a value of 27 (anonymous.x == 27). The then statement passes 27 to m and adds 15 to it, resulting in m.x == 42. This pattern can be used to define less trivial functions that handle database calls, functions that don\'t return immediately, etc. And, of course, ES2015 Promises API error handling can be added. '),
                    dom_1.h('p', ' The same result can be achieved with MonadItter and the following function '),
                    code_js_1["default"].timeout,
                    dom_1.h('p', ' If you click RUN, "m.x is 27" appears after one second. Two seconds later, "m.x is 42" is displayed along with a blurb. The blurb confirms the chain can continue, without the encumbrance and limitations of "then" clauses, after the delayed computations complete. '),
                    code_js_1["default"].timeoutSnippet,
                    dom_1.h('p', ' '),
                    dom_1.h('button#timeout', ' Run '),
                    dom_1.h('span#timeout2'),
                    dom_1.h('span#timeout3'),
                    dom_1.h('p', ' The final blurb confirms that the chained code waits for completion of the asynchronous code. Similar code could be made to wait for database calls, Ajax requests, or long-running processes to return before running subsequent chained code. In fact, messages$, the stream that handles incoming websockets messages, does just that. When a message is sent to the server, messages$ listens for the response. The functions waiting in MonadItter bnd() expressions are released according to the prefix of the incoming message from the server. Essentially, messages$ contains callbacks. MonadItter provides an uncluttered alternative to "if - then" or "case" blocks of code, separating the code to be executed from the listening code.'),
                    dom_1.h('p', ' I could have provided for error handling but therehere doesn\'t seem to be any need for it. If I were getting information from a remote database or Ajax server, I would handle errors with "window.addEventListener("error", function (e) { ...".'),
                    dom_1.h('a', { props: { href: '#top' } }, 'Back To The Top'),
                    //************************************************************************** ENDOM Promises
                    dom_1.h('h2', 'Immutable Data And The State Object " '),
                    dom_1.h('h3', ' Mutations   '),
                    dom_1.h('p', ' Mutations in this application are confined to MonadItter instances and internal function operations. Functions in this application do not have side effects. If a function argument is an array, say "ar", I make a clone by calling "var ar = ar.slice()" or "let ar2 = ar.slice()" before mutating ar or ar2 inside the function. That way, the original ar remains unaffected. MonadItter instances don\'t have monadic properties. When their bnd() method is called, they sit idly until their release() method is called. I don\t see any reason to make a clone each time bnd() or release() is called. As demonstrated below, a MonadItter instance can hold several different expressions simultaneously, executing them one at a time in the order in which they appear in the code, once each time the release() method is called, In the quadratic equation demonstration, the second call to release() takes the result from the first call  '),
                    dom_1.h('h3', ' The simulated dice game '),
                    dom_1.h('p', ' A score increases by 1 or 3 if the result of a computation is 20 or 18, respectively. 5 additional points are added each time the result is a multiple of 5. A computation that results in a score of 25 earns 1 goal. So if a score is 17 and a player multiplies 3 * 6, 3 points are awarded resulting in 20 + 5 = 25 points. Goal! When a goal is earned, the traversable history is deleted and prepared for a fresh start. Here is the code involved in the simulated dice game: '),
                    code_js_1["default"].updateCalc,
                    dom_1.h('p', ' The history of the number display and scoreboard in the game can be traversed in either direction until a player scores a goal. After that, the traversable history is deleted and then builds up until another goal is achieves. Players can score points using historical displays, so to keep competition fair, group members are notified when another member clicks the BACK button. The code is shown below, in the MonadSet section; but first, here is some background. '),
                    dom_1.h('h3', ' playerMonad '),
                    dom_1.h('p', ' playerMonad and its process attribute are defined as follows: '),
                    code_js_1["default"].playerMonad,
                    dom_1.h('p#monadset', ' As you see, playerMonad.run does one simple thing; it updates the four monads in the player_state function. There are various ways of achieving the same result, but MonadState provides a convenient alternative. Next, I will show how the list of currently online group members is maintained through the use of an instance of MonadSet. '),
                    dom_1.h('h2', ' MonadSet '),
                    dom_1.h('p', ' The list of online group members at the bottom of the scoreboard is very responsive to change. When someone joins the group, a message prefixed by NN#$42 prompts the server to send out the current list of group members. When someone closes their browser window, the server is programmed to send out the new list of group members. All updating is done in the websockets messages function. MonadSet\'s add and delete methods provide convenient alternatives to using Monad\'s bnd method with the push and splice functions. Here are the definitions of MonadSet and the MonadSet instance sMplayers '),
                    code_js_1["default"].MonadSet,
                    dom_1.h('p', ' Because sMplayerss is immutable, its most recent state can be safely stored in the mMsetArchive instance of Monad. This is done so the traversable game history shows who was online in each step. Here is the code that keeps the browser window current and, at the same time, maintains a history of the sate of game play. '),
                    code_js_1["default"].traverse,
                    dom_1.h('p', ' You must log in and enter something in the "Change group" box in order to see currently online members. You can open this page in more windows and see how promptly additions and exits show up in the scoreboard. '),
                    dom_1.h('a', { props: { href: '#top' } }, 'Back To The Top'),
                    dom_1.h('h2', 'Updating the DOM'),
                    dom_1.h('p', ' Two general methods work in Motorcycle. Sometimes I keep m.x in the virtual DOM code for some monad m. If a user performs some action that cause m.x to have a new value, the actual DOM changes accordingly. her times I use document.getElementById("someId").innerHTML = newValue.'),
                    dom_1.h('br'),
                    dom_1.h('h3', 'Dice Game DOM updates'),
                    dom_1.h('p', ' mMcurrentRoll.ret() is called only when (1) a new dice roll comes in from the server, (2) when a player clicks a number, and (3) when clicking a number or operator results in a computation being performed. These are the three things that require a DOM update. When a player clicks a number, it disappears from number display. When a computation is performed, the result is added to the number display, unless the result is 18 or 20. A result of 18 or 20 results in a new roll coming in from the server '),
                    dom_1.h('p', ' I like the way Cycle.js and Motorcycle.js are unopinionated. DOM updates can be accomplished by permanently placing a mutating list of strings in the virtual DOM description, or by calling element.innerHTML = newValue. Either way, the actual DOM gets mutated immediately, and mutating the DOM is what interactive applications are all about. Well, unless you load fresh pages every time something changes. I guess some people are still doing that.  '),
                    dom_1.h('hr'),
                    dom_1.h('h2', 'Concise Code Blocks For Information Control'),
                    dom_1.h('p', ' Incoming websockets messages trigger updates to the game display, the chat display, and the todo list display. The members of a group see what other members are doing; and in the case of the todo list, they see the current list when they sign in to the group. When any member of a group adds a task, crosses it out as completed, edits its description, or removes it, the server updates the persistent file and all members of the group immediately see the revised list.  '),
                    dom_1.h('p', 'The code below shows how incoming websockets messages are routed. For example, mMZ10.release() is called when a new dice roll (prefixed by CA#$42) comes in.   '),
                    code_js_1["default"].messages,
                    dom_1.h('p', ' The "mMZ" prefix designates instances of MonadItter. The bnd() method assigns its argument to the "p" attribute. "p" runs if and when the release() method is called. The next() function releases a specified MonadItter instance when the calling monad\'s value matches the specified value. next2() releases the specified monad when the specified condition returns true. The release method in next() has no argument, but next does take arguments, as illustrated below.'),
                    dom_1.h('span.tao', ' The incoming messages block is just a syntactic variation of a switch block, but that isn\'t all that MonadItter instances can do. They can provide fine-grained control over the lazy evaluation of blocks of code. Calling release() after a function completes some task provides Promise-like behavior. Error handling is optional. The MonadItter release(...args) method facilitates sequential evaluation of code blocks, reminiscent of video and blog explanations of ES6 iterators and generators. I prefer doing it with MonadItter over "yield" and "next". For one thing, ES6 generator "yield" blocks must be evaluated in a predetermined order. This link takes you back to the MonadItter section with interactive examples of the use of release() with arguments.  '),
                    dom_1.h('a#tdList2', { props: { href: '#iterLink' } }, 'release() with arguments'),
                    dom_1.h('br'),
                    dom_1.h('br'),
                    dom_1.h('a', { props: { href: '#top' } }, 'Back To The Top'),
                    dom_1.h('br'),
                    dom_1.h('h3', 'The Todo List'),
                    dom_1.h('p', ' Next, I\'ll go over some features of the todo list application. This will show how Motorcycle.js and the monads work together.'),
                    dom_1.h('p', 'Creation  A Task: If you enter something like Susan, Fred, Pay the water bill, the editable task will appear in your browser and in the browsers of any members a group you might have created or joined. If you have loaded this page in another tab and changed to the same group in both, you will see the task in both tabs, barring some malfunction. The task has a delete button, an edit button, and a "Completed" checkbox. It shows that Susan authorized the task and Fred is responsible for making sure it gets done. Instead of entering an authority and responsible person, you can just enter two commas before the task description. Without two commas, a message appears requesting more information. '),
                    code_js_1["default"].newTask,
                    dom_1.h('p', 'mM$taskList caries a string representing the task list. mMtaskList.x.split(",") produces an array whose length is a multiple of six. Commas in the task description are replaced by "$*$*$" so split(",") will put the entire task description in a single element. Commas are re-inserted when the list arrives from the server for rendering. Although a task list is a nested virtual DOM object (Snabbdom vnode), it can be conveniently passed back and forth to the server as a string without resorting to JS.stringify. Its type is Text on the server and String in the front end, becoming a virtual DOM node only once, when it arrives from the server prefixed by "DD#$42" causing "process(e.data) to execute. Here is process(): '),
                    code_js_1["default"].process,
                    dom_1.h('span.tao', 'As you see, the string becomes a list of six-element objects, then those objects are used to create a Snabbdom vnode which is handed to mM$taskList.ret() leading to the update of mMtaskList. mMtaskList.x sits permanently in the main virtual DOM description. '),
                    dom_1.h('a', { props: { href: "https://github.com/dschalk/JS-monads-stable" } }, 'https://github.com/dschalk/JS-monads-stable'),
                    dom_1.h('br'),
                    dom_1.h('p', ' Clicking "Completed": When the "Completed" button is clicked, the following code runs:         '),
                    code_js_1["default"].colorClick,
                    dom_1.h('p', 'mMtaskList is split into an array. Every sixth element is the start of a new task. colorAction$ toggles the second, third, and fourth element in the task pinpointed by "index" * 6. getIndex finds the index of the first and only the element whose task description matches the one that is being marked "Completed". I say "only" because users are prevented from adding duplicate tasks. After the changes are made, the array of strings is reduced to one string and sent to the server by task2(). '),
                    dom_1.h('p', ' This is the code involved in editing a task description: '),
                    code_js_1["default"].edit,
                    dom_1.h('p', 'Clicking "Edit" causes a text box to be displayed. Pressing <ENTER> causes it to disappear. edit2Action$ obtains the edited description of the task and the index of the task item and provides them as arguments to process. Process exchanges $*$*$ for any commas in the edited version and assigns the amended task description to the variable "task". mMtaskList.x is copied and split into an array. "index * 6" is replaced with "task" and the list of strings is reduced back to a single string and sent to the server for distribution. This pattern, - (1) split the string representation of the todo list into an array of strings, (2) do something, (3) reduce the list of strings back to a single string - is repeated when the "Delete" button is clicked. If the last item gets deleted, the server is instructed to delete the persistent file bearing the name of the group whose member deleted the last task. '),
                    dom_1.h('p#common', 'Cycle.js has been criticized for not keeping state in a single location, the way React.js does. Motorcycle.js didn\'t do it for me, or try to force me to do it, but it so happens that the current state of all active monads is in the object ". I have written applications in Node.js and React.js, and I can say without a doubt that Motorcycle.js provides the best reactive interface for my purposes.  '),
                    dom_1.h('hr'),
                    dom_1.h('a', { props: { href: '#top' } }, 'Back To The Top'),
                    dom_1.h('h2', 'Common Patterns'),
                    dom_1.h('p', 'Anyone not yet familiar with functional programming can learn by studying the definition of the Monad bnd() method and considering the common patterns presented below. ten, we want to give a named monad the value of an anonymous monad returned by a monadic computation. Here are some ways to accomplish that: '),
                    dom_1.h('p', 'For any monads m1 and m2 with values a and b respectively (in other words, m1.x == a and m2.x == b return true), m1.bnd(m2.ret) provides m1\'s value to m2.ret() causing m2 to have m1\'s value. So, after m1.bnd(m2.ret), m1.x == a, m2.x == b, m2.x == a all return true. The definition of Monad\s bnd() method shows that the function m2.ret() operates on m1.x. m1.bnd(m2.ret) is equivalent to m2.ret(m1.x). The stand-alone ret() function can be used to alter the current value of m2, rather than altering the value of m2. Here is one way of accomplishing this: m1.bnd(x => ret(x,"m2")). These relationships are demonstrated in the following tests: '),
                    code_js_1["default"].examples,
                    dom_1.h('p'),
                    dom_1.h('p', ' Here are two basic ways to create a monad named "m" with id = "m" and value v: '),
                    code_js_1["default"].examples2,
                    dom_1.h('a', { props: { href: '#top' } }, 'Back To The Top'),
                    dom_1.h('hr'),
                    dom_1.h('hr'),
                    dom_1.h('a', { props: { href: '#top' } }, 'Back To The Top'),
                    dom_1.h('p'),
                    dom_1.h('br'),
                    dom_1.h('br'),
                    dom_1.h('br'),
                    dom_1.h('br'),
                    dom_1.h('br'),
                    dom_1.h('br'),
                    dom_1.h('br'),
                    dom_1.h('br'),
                    dom_1.h('span#dummy2.red3'),
                    dom_1.h('hr'),
                    dom_1.h('button#dummy', mMdummy.x),
                    dom_1.h('p'),
                    dom_1.h('p'),
                    dom_1.h('p', '.'),
                    dom_1.h('p', '.'),
                    dom_1.h('p', '.'),
                    dom_1.h('p', '.'),
                    dom_1.h('p', '.'),
                    dom_1.h('p'),
                    dom_1.h('p'),
                    dom_1.h('p'),
                    dom_1.h('p'),
                    dom_1.h('p')
                ])
            ]);
        }) };
}
var displayf = function displayf(x, a) {
    document.getElementById(a).style.display = 'none';
    return ret(x);
};
var displayInline = function displayInline(x, a) {
    if (document.getElementById(a))
        document.getElementById(a).style.display = 'inline';
    return ret(x);
};
var newRoll = function (v) {
    socket.send('CA#$42,' + pMgroup.x + ',' + pMname.x + ',6,6,12,20');
    return ret(v);
};
var refresh = function () {
    setTimeout(function () {
        document.location.reload(false);
    }, 4000);
};
var sources = {
    DOM: dom_1.makeDOMDriver('#main-container'),
    WS: websocketsDriver
};
core_1["default"].run(main, sources);
