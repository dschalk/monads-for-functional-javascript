  <a name="back"></a>

# JS-monads-stable

PLEAE NOTE: This project has gone through many changes. My most recent thoughts are being presented with the help of Svelte and Sapper at [http://blog.schalk.site](http://blog.schalk.site). Before that I used Cycle.js, React, and Node. The WebSockets server has always been written in Haskell. Currently, my "monads" are closures, unlike the objects with bnd() methods shown below.  -- David Schalk

 These monads are like the Haskell monads in that they resemble the monads of category theory while not actually being mathematical monads. See [Hask is not a category](http://math.andrej.com/2016/08/06/hask-is-not-a-category/) by Andrej Bauer. They provide a convenient interface for dealing with uncertainty and side effects in a pure functional manner, assigning new values to identifiers (variables) without mutation. Adherence to the monad laws (see below) helps make the monads robust, versetile, and reliable tools for isolating and chaining sequences of Javascript functions.

 This is the open source repository for the application running online at [JS-monads-stable](http://schalk.net:3055). Aside from being a place to share my ideas and techniques with any developers who might be interested, this repository and the online demonstration can serve as a learning tools for people who are getting familiar with the usefulness of functions that take functions as arguments.

  The server is a modified clone of the Haskell Wai Websockets server. Haskell pattern matching and list comprehension made it easy to configure the server to broadcast selectively to members of groups, who share the dice game, todo list, and chat room. I use Babel and Webpack to prepare the front end and Stack to compile everything into a single executable which I upload to my Digital Ocean "droplet".

  The code here is not annotated, but detailed examinations of the code behind the multiplayer simulated dice game, persistent todo list, chat feature, and several other demonstrations can be found at [http://schalk.net:3055](http://schalk.net:3055), where the code is running online.

## Basic Monad

The definition of Monad, which is the basic monad constructor, is somewhat obscure. It isn't intended as a puzzle, so a little explanation is in order.

The term "monad" will mean "instance of Monad". Monad could have been defined as a class, but the current definition suffices.

Monads are created by code such as "const m = new Monad("anything", "m")". The arguments will be the values of m.x and m.id. The first argument can be any Javascript value, such as string, array, or monad. The second argument should be the name of the monad.

A monad, say "m", can be replaced by another monad named "m" in the global space through the use of the method "ret()". It looks like m.x gets mutated, but that isn't what happens. Previously defined references to m retain their values, as demonstrated below:
```javascript
const m = new Monad (5, 'm');
var arr = [m];
var p = m;
m.ret(100);  
console.log(m.x, arr[0].x, p.x);  // 100, 5, 5
```
console.log(m.x, arr[0].x, p.x);  // 100, 5, 5
In global scope (window in the browser), m.x changed to 100; but p and arr still refer to 5, the previous value of m.x. Similarly, when a monad uses its bnd() method to modify its x attribute, the change is seen globally, but nowhere else. Previous references to the monad remain stable, as this example illustrates:
```javascript
const m = new Monad (5, 'm');
var arr = [m];
var p = m;
m.bnd(add,95);  
console.log(m.x, arr[0].x, p.x);  // 100, 5, 5
```
Had there been no reference to m, the previous instance would have been subject to removal by the garbage collector.

It is possible to mutate monads with code such as m.x = 888. That might be a good thing to do in a function with many recursions, but it seems like a misuse of monads. Monads are never mutated on this website. Object.freeze() is used to prevent mutation in the definition of primesMonad (shown below).

The bnd() method can leave the calling monad's global value unchanged while assigning a value (in the global space) to another previously defined monad, or to a freshly created monad. So regardless of whether or not "m2" is defined, m.ret(4).bnd(cube,"$m2") causes m.x === 4 and m2.x === 64 to both return true.
```javascript
m.ret(4).bnd(cube,"$m2")
console.log(m.x, m2.x)   // 4 64
m.ret(0).bnd(add,3,"$m2").bnd(cube,"$m3")
console.log(m.x, m2.x, m3.x)  // 0 3 27
```
The definition of Monad (below) shows how bnd() checks to see if func(m.x, ...args) returns a monad. If it does, "testPrefix" looks for a pattern that matches "$val" in the arguments that were provided to m.bnd(func, ...args). If the pattern is found, the global space acquires a monad named "val" with val.x === func(m.x, ...args). If no monad named "val" previously existed, one is created. Otherwise, val's global definition gets superseded. val can be any sequence of characters that constitute a valid javascript identifier.

Instances of Monad facilitate changing values without mutation. They also provide a way to chain function calls. For example, m.ret(2).bnd(add, 1).bnd(cube) causes m.x === 27 to return true. This works because ret(), add, and cube all return monads when they are applied to m.x. The definition of add and cube are shown below and can be found in the Github repository.

So, with that out of the way, here are the definitions of Monad and testPrefix:
  ```javascript    
    var Monad = function Monad(z = 19, g = 'generic') {
      this.x = z;
      this.id = g;
      this.bnd = function (func, ...args) {
        var m = func(this.x, ...args)
        var ID;
        if (m instanceof Monad) {
          ID = testPrefix(args, this.id);
          window[ID] = new Monad(m.x, ID);
          return window[ID];
        }
        else return m;
      };
      this.ret = function (a) {
        return window[_this.id] = new Monad(a,_this.id);
      };
    };

    function testPrefix (x,y) {
      var t = y;
      var s;
      if (Array.isArray(x)) {
        x.some(v => {
          if (typeof v === 'string' && v.charAt() === 'M') {
            t = v.slice(1, v.length);
          }
        })
      }
      return t;
    }

  ```
Variations on the Theme

Variations on the Monad theme serve diverse purposes. Instances of MonadState preserve computations so they won't have to be performed again. An instance of MonadState2 keeps a record of game play allowing players to back up and resume play from a previous display of numbers. It also keeps the current game parameters - score, goals, operator, selected numbers, and remaining numbers - in a single array which is stored in the archive whenever a new state is created. MonadItter instances are used to parse websockets messages and organize the callbacks neatly. MonadEr catches NaN and prevents crashes when undefined variables are encountered. I defined a message emitting monad but it seemed useless in this Cycle application where reactivity is pervasive. When you want to emit and listen for messages, it is better to build a driver and merge its stream of messages into the application cycle.

The various monad constructors demonstrate a coding style and philosophy, and are not intended to serve as a static library. You might find Monad useful as it is, and of course you are welcome to use it, but you might also take the general idea and eliminate some features and add others to suits your needs. Or you might prefer an entirely different way of organizing your code. You can incorporate your own monad constructors into any framework, just I have make mine part of this Cycle application.

Computations

Computations are easy to link if each result is returned in an instance of Monad. Here are a few examples of functions that return instances of Monad:
```javascript
  function ret(v, id = 'temp') {
      window[id] = new Monad(v, id);
      return window[id];
    }

    function cube (v, id) {
      return ret(v * v * v);
    };

    function add (x, b) {
      return ret(parseInt(x,10) + parseInt(b,10) );
    };

    function log(x,y) {
        console.log(y)
        return ret(x);
    };  
```    
The "$" prefix provides control over the destination of computation results. In the following example, m1, m2, and m3 have already been declared. Here is a comparison of the results obtained when the "$" prefix is used and when it is omitted:
```javascript
    m1.ret(7).bnd(m2.ret).bnd(m3.ret)  // All three monads get the value 7.
    m1.ret(0).bnd(add,3,'m2').bnd(cube,'m3')  // 'm1', 'm2', and 'm3' are ignored
    Result: m1.x === 27
            m2.x === 7
            m3.x === 7  
    m1.ret(0).bnd(add,3,'$m2').bnd(cube,'$m3')   
    Result: m1.x === 0
            m2.x === 3
            m3.x === 27  
```            
If the prefix "$" is absent, bnd() ignores the string argument. But when the "$" prefix is present, m1 retains its initial value, m2 retains the value it gets from from adding m's value (which is 0) to 3, and m3.x is the result of applying "cube" to m2.x. Both forms could be useful.

The following example shows lambda expressions sending variables v1 and v2 through a sequence of computations and v3 sending the final result to the string that is logged. It also shows monads a, b, c, d, e, f, and g being updated and preserved in an array that is not affected by further updates. That is because calling the ret() method does not mutate a monad; it creates a fresh instance with the same name. Here is the example, shown in a screen shot of the Chrome console:.

  ![Alt text](demo_000.png?raw=true)

##A Few Words About Cycle.js

Opinionated frameworks tend to annoy and frustrate me. Cycle, on the other hand, is easy on my mind. I love it.

In the early stages of developing this website, I had functions that mutated global variables. Sometimes, I directly mutated values in the DOM with statements like "document.getElementById('id').innerHTML = newValue". Cycle didn't object. Over time, mutating variables and manhandling the DOM gave way to gentler techniques that I developed in conjunction with the "proof of concept" features that I was in a hurry to get up and running.

Handling events is a breeze. Cycle's bult-in DOM driver handles browser events like click and input. Simple application drivers handle asynchronous messages. Here are two examples:
```javascript
function workerDriver () {
  return xs.create({
    start: listener => { worker.onmessage = msg => listener.next(msg)},
    stop: () => { worker.terminate() }
  });
};

function websocketsDriver() {
  return xs.create({
    start: listener => { socket.onmessage = msg => listener.next(msg)},
    stop: () => { socket.close() }
  });
};   
```
##Asynchronous Processes

Five demonstrations involving instances of MonadState are presented at [Demonstration](http://schalk.net:3055). They involve computations of prime numbers, Fibonacci numbers, prime Fibonacci numbers, and prime factors of numbers. Several instances of a constructor named "MonadState" (simple and not an ES6 class) are utilyzed, three of which maintain and share share an array of prime numbers maintained in the MonadState instance named "primesState". An array of arrays of prime factors of numbers is maintained in MonadState instance "decompMonad", which is shared by the fourth and fifth examples in this series of async examples. Some code snippets and explanations follow the demonstrations.
```javascript    
function MonadState(g, state) {
  this.id = g;
  this.s = state;
  this.bnd = (func, ...args) => func(this.s, ...args);  
}    
```
The first demonstration displays the Fibonacci series up to an upper bound entered in the browser by a user. It also displays a list of the prime Fibonacci numbers in the list of Fibonacci numbers, along with the largest prime number that was generated during a computation. I tested performance in Firefox on my Ubuntu 16.04 box by entering "3" and then, one at a time, 0's. Lag times were not noticeable, even at the ninth zero, where there was a 351 microsecond pause before the prime Fibonacci number 2,971,215,073 appeared. I added another zero (resulting in 30,000,000,000) and after 1,878 microseconds four more Fibonacci numbers appeared on my monitor. After adding one final zero, there was a delay of 17,550 microseconds before five more Fibonacci numbers appeared, topped by 225,851,433,717. I deleted a zero and then put it back. This time the delay was only 206 microseconds, showing the effectiveness of using the previously stored list of prime numbers.

The demonstrations do not block the main execution thread. Computations are performed in web workers and the results are stored for further use in the main thread.

According to the The On-Line Encyclopedia of Integer Sequences these are the first eleven proven prime Fibonacci numbers: 2, 3, 5, 13, 89, 233, 1597, 28657, 514229, 433494437, 2971215073, and 99194853094755497. The eleventh number, 2971215073, is as far as you can go on an ordinary desktop computer.

The second demonstration in this series decomposes numbers into its their prime factors. Unless a large array of prime numbers has already been generated, five digits is the limit for a quick response. After running 300,000,000,000 in the first demonstration, 444,444 was decomposed in a little over 100 microseconds. To see it in action, enter a number below.

Next, two comma-separated numbers are decomposed into arrays of their prime factors, and those arrays are used to compute their lowest common multiple (lcm). For example, the lcm of 6 and 9 is 18 because 3*6 and 2*9 are both 18. The lcm of the denominators of two fractions is useful in fraction arithmetic; specifically, addition and subtraction.

###Doing Things The Hard Way

The next two demonstration generate the same results as the previous two; but in doing so, they also generate and add to a shared and persistent (for the duration of the browser session) array of arrays of prime decompositions of the positive integers. The array is the value of decompMonad.s. It is re-used as the starting point for generating larger arrays, or as a sort of lookup table if a required prime decomposition has already been computed. The index of an array is the number whose decomposition is in the array so, for example, array-of-arrays[12] is [2,2,3].

The fifth demonstration shares the array of arrays of prime decompositions with the previous demonstration. That array is kept in a MonadState instance named "decompMonad". Computing prime decompositions of numbers that end up being ignored is clearly inefficient, so please bear in mind that a demonstration of a JS-monads way to keep mutable state in immutable, composable, globally accessible objects.

According to the The On-Line Encyclopedia of Integer Sequences these are the first eleven proven prime Fibonacci numbers: 2, 3, 5, 13, 89, 233, 1597, 28657, 514229, 433494437, 2971215073, and 99194853094755497. The eleventh number, 2971215073, is as far as you can go on an ordinary desktop computer.

Code for the demonstrations is presented and discussed in the online presentation.

### MonadState and MonadState Transformers

The preceding demonstrations used three instances of MonadState: primesMonad, fibsMonad, and factorsMonad. The chat message demonstration uses another instance of MonadState; namely, messageMonadn. Instance of MonadState holds a current state along with a method for updating state. Here again is the definition of MonadState:
```js
    function MonadState(g, state) {
      this.id = g;
      this.s = state;
      this.bnd = (func, ...args) => func(this.s, ...args);  
      this.ret = function (a) {
        return window[this.id] = new MonadState(this.id, a);
      };
    };
```    
MonadState reproduces some of the functionality found in the Haskell Module "Control.Monad.State.Lazy", inspired by the paper "Functional Programming with Overloading and Higher-der Polymorphism", Mark P Jones (http://web.cecs.pdx.edu/~mpj/) Advanced School of Functional Programming, 1995. Transformers take instances of MonadState and return different instances of MonadState. The method call "fibsMonad.bnd(fpTransformer, primesMonad)" returns primesMonad updated so that the largest prime number in primesMonad.s[1] is the square root of the largest Fibonacci number in fibsMonad.s[3]. Here is the definition of fpTransformer:

```js
    var fpTransformer = function fpTransformer(x, s) {
      var a = Math.ceil(Math.sqrt(x[3].slice(-1)[0]));
      var m = primesMonad.run([s,a]);
      var ar = [];
      x[3].map(function (v) {
        if (m.s[3].filter(x => x <= v).every(function (p) { return (v % p || v == p); }))
          ar.push(v);
      });
      return [x[3].join(', '), m.s[3].slice(-1).pop(), ar.join(', '), m.s];
    };   
```
## MonadItter

  MonadItter instances do not have monadic properties, but they facilitate the work of monads. Here's how they work:

  For any instance of MonadItter, say "it", "it.bnd(func)" causes it.p === func. Calling the method "it.release(...args)" causes p(...args) to run, possibly with arguments supplied by the caller. Here is the definition:
  ```javascript
  const MonadItter = function ()  {
    this.p = function () {};
    this.release = (...args) => this.p(...args);
    this.bnd = func => this.p = func;
  };
  ```
  As shown later in the online demonstration, MonadItter instances control the routing of incoming websockets messages and the flow of action in the simulated dice game. In one of the demonstrations, they behave much like ES2015 iterators. I prefer them over ES2015 iterators. They can also help to provide promises-like functionality without promises.

##The Simulated Dice Game
playerMonad saves the state of the game whenever the number display changes. It works in conjunction with mMindex, gameMonad, and bNode() to maintain the game interface, with or without traversal of past states.

gameMonad is an instance of MonadState2. gameMonad.s is a six item array holding score, goals, selected operator, selected numbers, display numbers, and an array of arrays of past scores, goals, selected numbers. and display numbers. gameMonad.s[5][2] is a place holder for selected operater. It is always set to 0 in gameMonad.s[5]. gameMonad.run() increments mMindex.x and inserts its argument in gameMonad.s[5]. gameMonad.s[5] is an array of past states of the game. Here is the definitions of MonadState2
```javascript
    function MonadState2(g, state) {
      this.id = g;
      this.s = state;
      this.bnd = (func, ...args) => func(this.s, ...args);  
      this.ret = function (a) {
        return window[this.id] = new MonadState(this.id, a);
      };
      this.run = function (st) {
        mMindex.bnd(add,1);
        st[5] = this.s[5].slice();
        st[5].splice(mMindex.x, 0, [st[0], st[1], st[2], st[3], st[4]]);
        return window[this.id] = new MonadState2(this.id, st);
      }
    };
```    
And here is the definition of gameMonad:
```javascript
    var gameMonad = new MonadState2('gameMonad',
      [ 0,0,0,[],[0,0,0,0],[[0,0,0,[],[0,0,0,0]]]]);
```
When one of the operator buttons is clicked, gameMonad.s[5][mMindex.x][2] changes from 0 to either "add", "subtract", "multiply", "divide", or "concat". When a number is clicked, it moves from gameMonad.s[5][mMindex.x][4] to gameMonad.s[5][mMindex.x][3]. If gameMonad.s[5][mMindex.x][3] contains two numbers and gameMonad.s[5][mMindex.x][2] is not zero (meaning an operator has been selected), updateCalc() is called. Similarly, if an operator is clicked after two numbers have been put in gameMonad.s[5][mMindex.x][3], updateCalc() is called. updateCalc()'s arguments are an array containing the two selected numbers and a string designating the operator.

If the calculated number in updateCalc() is 18 or 20, score() is called. Otherwise, the update is performed in updateCalc. Here are the definitions of updateCalc() and score():
```javascript
    var numClick$ = sources.DOM
      .select('.num').events('click');

    var numClickAction$ = numClick$.map(e => {
      if (gameMonad.s[5][mMindex.x][3].length > 1) {
      }
      else {
        var x = gameMonad.s[5][mMindex.x].slice();
        x[3] = gameMonad.s[5][mMindex.x][3].slice();
        x[4] = gameMonad.s[5][mMindex.x][4].slice();
        x[3].push(x[4].splice(e.target.id,1)[0]); // Push the item spliced from x[4] into x[3].
        var s3 = x[3].slice();
        buttonNode = bNode(x[4]);
        console.log('In numClickAction$ ???????? s3 is', s3 );
        gameMonad.run(x);
        if (s3.length === 2 && x[2] != 0) {
          updateCalc(x[3], x[2])
        }
      }
    }).startWith([0, 0, 0, 0]);

    var opClick$ = sources.DOM
        .select('.op').events('click');

    var opClickAction$ = opClick$.map(e => {
      if (gameMonad.s[3].length === 2) {
        var s3 = gameMonad.s[3].slice();
        updateCalc(s3, e.target.textContent);
      }
      else {
        var state = gameMonad.s.slice();
        state[5][mMindex.x][2] = e.target.innerHTML;
        gameMonad = new MonadState2('gameMonad', state);
      }  
```      
gameMonad.s[5][mMindex.x][3] is the array of numbers which are displayed in the browser. Changes take place inside of a Snabbdom vNode named "buttonNode". buttonNode is the value returned by the function bNode() whose only argument is the array of numbers to be displayed. Here is the definitions of bNode:
```javascript
    function bNode (arr) {
      var x = styl(arr.length);
      var node = h('div', [
        h('button#0.num', { style: { display: x[0] }}, arr[0] ),
        h('button#1.num', { style: { display: x[1] }}, arr[1] ),
        h('button#2.num', { style: { display: x[2] }}, arr[2] ),
        h('button#3.num', { style: { display: x[3] }}, arr[3] )
      ]);
      return node;
    }  
```    
The interface is kept clean by means of the function styl(), which determines whether the display is "inline" or "none", depending on the length of the array of numbers displayed. Here is the definition of styl():
```javascript
    function styl (s) {
      switch(s) {
        case (0): return ['none', 'none', 'none', 'none'];
        break;
        case (1): return ['inline', 'none', 'none', 'none'];
        break;
        case (2): return ['inline', 'inline', 'none', 'none'];
        break;
        case (3): return ['inline', 'inline', 'inline', 'none'];
        break;
        case (4): return ['inline', 'inline', 'inline', 'inline'];
        break;
        default: return;  //console.log('Bad argument in styl. s is', s );
      }
  };
```  
###Traversing the Game's History

As you might expect, game traversal is controlled by changes in the value of mMindex.x. Here is how it is done:
```javascript
    var forwardClick$ = sources.DOM
      .select('#ahead').events('click')

    var backClick$ = sources.DOM
      .select('#back').events('click');

    var backAction$ = backClick$.map(() => {
      if (mMindex.x > 0) {  
        mMindex.ret(mMindex.x - 1)
        buttonNode = bNode(fetch(mMindex.x));
        sMplayers.s.clear();
        var score = gameMonad.s[5][mMindex.x][0]
        var goals = gameMonad.s[5][mMindex.x][1];
        socket.send("CG#$42," + pMgroup.x + "," + pMname.x + "," + score + "," + goals)
      }
    })

    var forwardAction$ = forwardClick$.map(() => {
      if (mMindex.x < gameMonad.s[5].length - 1) {
        mMindex.ret(mMindex.x + 1);
        buttonNode = bNode(fetch(mMindex.x));
        var score = gameMonad.s[5][mMindex.x][0]
        var goals = gameMonad.s[5][mMindex.x][1];
        socket.send("CG#$42," + pMgroup.x + "," + pMname.x + "," + score + "," + goals)
      }
    });

    function fetch (n) {
        return gameMonad.s[5][n][4];
    }  
```    
The socket message prompts the server to notify all group members of changes in the player's score and goals. The numbers that are generated remain private.

## MonadSet

The list of online group members at the bottom of the scoreboard is very responsive to change. When someone joins the group, changes to a different group, or closes a browser session, a message prefixed by NN#$42 goes out from the server providing group members with the updated list of group members. MonadSet acts upon messages prefixed by NN#$42. Here are the definitions of MonadSet and the MonadSet instance sMplayers:
  ```javascript  
    var MonadSet = function MonadSet(set, str) {
      var ob = {
        ID: str,
        s: set,  
        bnd: (func, ...args) => func(ob.s, ...args),
        add: a => MonadSet(s.add(a), ob.id),
        delete: a => MonadSet(s.delete(a), ob.id),
        clear: () => MonadSet(s.clear(), ob.id)
      };
      return ob;
    };

     var s = new Set();

    var sMplayers = MonadSet(s, 'sMplayers'); // holds currently online players
  ```
## MonadE - An Error-Catching Monad

  Instances of MonadE function much the same as instances of Monad, but when an instance of MonadE encounters an error, it ceases to perform any further computations. Instead, it passes through every subsequent stage of a sequence of MonadE expressions, reporting where it is and repeating the error message. It will continue to do this until it is re-instantiated or until its bnd() method runs on the function clean().

  Functions used as arguments to the MonadE bnd() method can be placed in quotation marks to prevent the browser engine from throwing reference errors. Arguments can be protected in the same manner.

  The following demonstration shows the Chrome console log entries that result from running
  ```javascriptt.bnd('add3', 3, '$t2').bnd(cube3, '$t3')
    t.bnd('add3','three', '$t2').bnd(cube3, '$t3')    
    t.bnd('add3','Math.sqrt(-1)', '$t2').bnd(cube3, '$t3')
    t.bnd('addd3', 3, '$t2').bnd(cube3, '$t3'
  ```    
  ![Alt text](error2.png?raw=true)

  Here are the definitions of MonadE and the functions used in the demonstration:
  ```Javascript
    function MonadEr (val, ID, er = []) {
      var test;
      var arr = arr = [];
      this.x = val;
      this.e = er;
      this.id = ID;
      this.getx = function getx (x) {return this.x};
      this.bnd = function (f, ...args) {
        var args = args;
        if (f === 'clean3' || f === clean3) {
          this.e = [];
          window[this.id] = new MonadEr(this.x, this.id, []);
          return window[this.id];
        }
        if (this.e.length > 0) {
          console.log('BYPASSING COMPUTATION in MonadE instance', this.id, f, '.  PROPAGATING ERROR:',  this.e[0]);
          return this;  
        }

        if (args.length > 0) {
          arr = args.filter(v => !(typeof v === 'string' && v.charAt() === 'M' && v.slice(0,4) !== 'Math'))

          arr.map(v => {
            test = testP(v, this.id)
            if (test === 'STOP') {
              console.log('\"STOP\" returned from testP. Ending code execution in ',this.id, '.' )
              this.e.push('STOP');
              return this;
            }
          });
        }
        if (test !== "STOP") {
        try {
          var testId = testPrefix(args, this.id);  
          var ar = arr.map(v => eval(v))
          var m = eval(f)(this.x, ...ar)  
          var id = testPrefix(ar, this.id);
          window[testId] = new MonadEr(m.x, testId, []);
          return window[testId];
          }      
          catch(error) {
            this.e.push('STOP -- Execution Aborted. ');
            console.log(f, 'ERROR in ',id,error,' No further computations will be attempted');
            return this;
          }
        }
        else {
          this.e.push('STOP -- Execution Aborted. ');
          console.log(f, 'ERROR "STOP" returned from testP. No further computations will be attempted');
          return this;
        }  
      }
      this.ret = function (a) {
        window[this.id] = new MonadEr(a, this.id, []);
        return window[this.id];
      }  
    };


    function testPrefix (x,y) {
      var t = y;
      var s;
      if (Array.isArray(x)) {
        x.some(v => {
          if (typeof v === 'string' && v.charAt() === 'M') {
             t = v.slice(1);
          }
        })
      }
      return t;
    }

    function testP (x,id) {
        if ( eval('typeof ' + x) === 'undefined') {
          console.log(`............... ERROR parameter ${x} is not defined`);
          window[id].e = [`${x} is not defined`]
          return 'STOP';
        }
        if (eval(x) !== eval(x)) {
          console.log(`............... ERROR parameter ${x} is not a number`);
          window[id].e = [`${x} is not a number`];
          return 'STOP';
        }
        mMZ12.release([]);
        return []  
    }

    function ret3(v, id = 'generic') {
        window[id] = new MonadEr(v, id, []);
        return window[id];
      }

    function add3(x, y) {
        return ret3(x*1 + y*1);
      }

    function cube3(x) {
        return ret3(x*x*x);
    }

    function clean3 (x, id) {
      window[id] = new MonadEr(x, id, []);
      return window[id];
    }
  ```
  And here is the code that generated the log entries shown in the screen shot:
  ```javascript
      var t = new MonadEr(0,'t', []);
      var t2 = new MonadEr(0,'t2', []);
      var t3 = new MonadEr(0,'t3', []);
      console.log('Values of t, t2, and t3', t.x,t2.x,t3.x)
      console.log("executing t.bnd(\'add3\',3,\'Mt2\').bnd(cube3, \'Mt3\') ");
      t.bnd('add3',3,'Mt2').bnd(cube3, 'Mt3')
      console.log('Values of t, t2, and t3', t.x,t2.x,t3.x)
      var t = new MonadEr(0,'t', []);
      var t2 = new MonadEr(0,'t2', []);
      var t3 = new MonadEr(0,'t3', []);
      console.log('Values of t, t2, and t3', t.x,t2.x,t3.x)

      console.log("executing t.bnd('add3','three', 'Mt2').bnd(cube3, 'Mt3') " );
      t.bnd('add3','three','Mt2').bnd(cube3, 'Mt3')
      console.log('Values of t, t2, and t3', t.x,t2.x,t3.x)

      console.log( 't.bnd(clean3)' );
      t.bnd(clean3);

      console.log("executing t.bnd('add3', 'Math.sqrt(-1)', 'Mt2').bnd(cube3, 'Mt3') " );
      t.bnd('add3','Math.sqrt(-1)','Mt2').bnd(cube3, 'Mt3')
      console.log('Values of t, t2, and t3', t.x,t2.x,t3.x)
      console.log( 't.bnd(clean3)' );
      t.bnd(clean3);
      console.log("executing t.bnd(\'addd3\',3,\'Mt2\').bnd(cube3, \'Mt3\') ");
      t.bnd('addd3',3,'Mt2').bnd(cube3, 'Mt3')
      console.log('Values of t, t2, and t3', t.x,t2.x,t3.x)
  ```
  When a MonadE instance encounters a function or an argument in quotation marks of types undefined or NaN, a message string gets pushed into its e attribue. After that, the bnd() method will not process any function other than clean() and log2(). It will stop at theif (e.length > 0)block. clean() resets an instance to normal functioning mode by setting its e attribute back to []. MonadE instances are created on the flyin the error-free version. In the version with an error, these MonadE instances have already been created and ret2, by creating fresh instances, effectively re-sets their values to 0.

  The final test in the bnd() method occurs in a try-catch block. If a function and its quoted arguments are not of types undefined or NaN but the system returns an error, the error message gets logged and a browser crash is averted.

## Websocket messages

  Incoming websockets messages trigger updates to the game display, the chat display, and the todo list display. The members of a group see what other members are doing; and in the case of the todo list, they see the current list when they sign in to the group. When any member of a group adds a task, crosses it out as completed, edits its description, or removes it, the server updates the persistent file and all members of the group immediately see the revised list.

  The code below shows how incoming websockets messages are routed. For example, mMZ10.release() is called when a new dice roll (prefixed by CA#$42) comes in.
  ```javascript
  const messages$ = sources.WS.map( e => {
    mMtem.ret(e.data.split(',')).bnd( v => {
  console.log('Websockets data.split message v: ', v ),    
  mMZ10.bnd( () => {
    buttonNode = bNode([v[3],v[4],v[5],v[6]]);
    var st = gameMonad.s[5][mMindex.x].slice();
    st[0] = v[7];
    st[1] = v[8];
    st[2] = 0;
    st[3] = [];
    st[4] = [v[3],v[4],v[5],v[6]];
    gameMonad.run(st);
    console.log(buttonNode);
  });
    mMZ12.bnd( () => mM6.ret(v[2] + ' successfully logged in.'));
    mMZ13.bnd( () => {
      var message = v.slice(3,v.length).join(', ');
      var str = v[2] + ': ' + message;
      messages.unshift(h('span', str ),h('br'));  
   });
  mMZ14.bnd( () => {
    mMgoals2.ret('The winner is ' + v[2]);
    setTimeout(() => mMgoals2.ret(''), 5000 );
  });
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

  ```  
  The "mMZ" prefix designates instances of MonadItter. An instance's bnd() method assigns its argument to its "p" attribute. "p" runs if and when its release() method is called. The next() function releases a specified MonadItter instance when the calling monad's value matches the specified value in the expression. In the messages$ stream, the MonadItter instance's bnd methods do not take argumants, but next is capable of sending arguments when bnd() is called on functions requiring them. Here is an example:
  MonadState and MonadState Transformers

  An instance of MonadState holds the current state and value of a computation. For any instance of MonadState, say m, these can be accessed through m.s and m.a, respectively.
```javascript
    function MonadState(g, state) {
      this.id = g;
      this.s = state;
      this.bnd = (func, ...args) => func(this.s, ...args);  
      this.ret = function (a) {
        return window[this.id] = new MonadState(this.id, a);
      };
    };
```
MonadState reproduces some of the functionality found in the Haskell Module "Control.Monad.State.Lazy", inspired by the paper "Functional Programming with Overloading and Higher-der Polymorphism", Mark P Jones (http://web.cecs.pdx.edu/~mpj/) Advanced School of Functional Programming, 1995. The following demonstrations use the MonadState instances fibsMonad and primesMonad to create and store arrays of Fibonacci numbers and arrays of prime numbers, respectively. fibsMonad and primesMonad provide a simple way to compute lists of prime Fibonacci numbers. Because the results of computations are stored in the a and s attributes of MonadState instances, it was easy to make sure that no prime number had to be computed more than once in the prime Fibonacci demonstration.

Here is the definition of fibsMonad, along with the definition of the function that becomes fibsMonad.process.
```javascript
  var primesMonad = new MonadState('primesMonad', [3, '', 3, [2,3]], primes_state);

  var fibs_state = function fibs_state(ar) {
    var a = ar.slice();
    while (a[3].length < a[2]) {
      a = [a[1], a[0] + a[1], a[2], a[3].concat(a[0])];
    }
    return a
  }  
```  
Another MonadState instance used in this demonstration is primesMonad. Here is its definition along with the function that becomes primesMonad.process:
```javascript
  var primesMonad = new MonadState('primesMonad', [2, '', 3, [2]], [2],  primes_state)

  var primes_state = function primes_state(x) {
    var v = x.slice();
      while (2 === 2) {
        if (v[3].every(e => ((v[0]/e) != Math.floor(v[0]/e)))) {
          v[3].push(v[0]);
        }
        if (v[3][v[3].length - 1] > v[2]) { break }; // Not an infinite loop afterall
        v[0]+=2;
      }
    return v;
  }  
```  
## MonadState transformers

Transformers take instances of MonadState and return different instances of MonadState, possibly in a modified state. The method call "fibsMonad.bnd(fpTransformer, primesMonad)" returns primesMonad. Here is the definition of fpTransformer:
```javascrit
  var fpTransformer = function fpTransformer (s, m) {
    var bound = Math.ceil(Math.sqrt(s[3][s[3].length - 1]));
    if (bound > m.a[m.a.length - 1] ) {
      m.run([m.s[0], "from the fibKeyPress5$ handler", bound, primesMonad.a])
    }
    return m;
  }  
```  
If the largest number in primesMonad.a is less than the square root of the largest number in fibsMonad.a, primesMonad is updated so that the largest number in primesMonad.a is greater than the square root of the largest number in fibsMonad.a. Otherwise, primesMonad is returned unchanged.

The final computation in the prime Fibonacci numbers demonstration occurs when "tr3(fibsState[3],primesState[3]" is called. tr3() takes an array of Fibonacci numbers and an array of prime numbers and returns an array containing an array of Fibonacci numbers, an array of prime numbers, and an array of prime Fibonacci numbers. Here is the definition of tr3:
```javascript
  var tr3 = function tr (fibsArray, primesArray) {
    var bound = Math.ceil(Math.sqrt(fibsArray[fibsArray.length - 1]))
    var primes = primesArray.slice();
    if (primesArray.slice(-1)[0] >= bound) {
      primes = primesArray.filter(v => v <= bound);
    }
    var ar = [];
    var fibs = fibsArray.slice(3);
    fibs.map (v => {
      if (primesArray.every(p => (v % p || v === p))) ar.push(v);
    })
    return [fibsArray, primes, ar]
  }  
```  
User input is handled by a chain of computations. first to update fibsMonad, second to extract fibsMonad.s, third to run fpTransformer to modify and then return primesMonad, and fourth to extract primesMonad.s and run tr3(fibsState[3],primesState[3]). Monad instance mMres obtains the result. mMres.x[0], mMres.x[1], and mMres.x[2], are permanent features of the virtual DOM. Here is the code:
```javascript
  const fibKeyPress5$ = sources.DOM
    .select('input#fib92').events('keydown');

  const primeFib$ = fibKeyPress5$.map(e => {
    if( e.keyCode === 13 ) {
      mMres.ret(fibsMonad
      .run([0, 1, e.target.value, []])
      .bnd(fibsState => fibsMonad
      .bnd(fpTransformer, primesMonad)
      .bnd(primesState => tr3(fibsState[3],primesState[3]))))var
    }
  });  
```  
Only 48 Fibonacci numbers need to be generated in order to get the eleventh prime Fibonacci number. But 5546 prime numbers need to be generated to test for divisibility into 2971215073. Finding the next Fibonacci number is just a matter of adding the previous two. Getting the next prime number is a more elaborate and time-consuming procedure. In this context, the time needed to compute 48 Fibonacci numbers is insignificant, so I didn't bother to save previously computed Fibonacci numbers in the prime Fibonacci demonstration. When a user enters a number smaller than the current length of fibsMonad.a, fibsMonad is modified such that its length becomes exactly what the user entered. It takes a couple of seconds to test 50 Fibonacci numbers in the online demo on my desktop computer. Beyond that, lag times start getting pretty long.

The online demonstration features a game with a traversable dice-roll history; group chat rooms; and a persistent, multi-user todo list. People in the same group share the game, chat messages, and whatever todo list they might have. Updating, adding, removing, or checking "Complete" by any member causes every member 's todo list to update. The Haskell websockets server preserves a unique text file for each group's todo list. Restarting the server does not affect the lists. Restarting or refreshing the browser window causes the list display to disappear, but signing in and re-joining the old group brings it back. If the final task is removed, the server deletes the group's todo text file.

With Motorcycle.js, the application runs smoothly and is easy to understand and maintain. I say "easy to understand", but for people coming from an imperative programming background, some effort must first be invested into getting used to functions that take functions as arguments, which are at the heart of Motorcycle and JS-monads-stable. After that, seeing how the monads work is a matter of contemplating their definitions and experimenting a little. Most of the monads and the functions they use in this demonstration are readily available in the browser console. If you have the right dev tools in Chrome or Firefox, just load [http://schalk.net:3055](http://schalk.net:3055) and press F12. You might need to enter Ctrl-R to re-load with access to the monad.js script. I do this to troubleshoot and experiment. 


## APPENDIX

### worker.js

```javascript
onmessage = function(v) {

  function MonadState(g, state, p) {
    this.id = g;
    this.s = state;
    this.process = p;
    this.a = this.s[3];
    this.bnd = (func, ...args) => func(this.s, ...args);  
    this.run = ar => {
      var ar2 = this.process(ar);
      this.s = ar2;
      this.a = ar2[3];
      self[this.id] = this;
      return self[this.id];
    }
  };

  function primes_state(x) {
    var v = x.slice();
    while (2 == 2) {
        if ( v[3].every(e =>  (v[0] / e) != Math.floor(v[0] / e)) ) {
            v[3].push(v[0]);
        }
        if (v[3][v[3].length - 1] > v[2]) {
            break;
        };
        v[0] += 2;
    }
    return v;
  };

  var primesMonad = new MonadState('primesMonad', [3, '', 3, [2,3]], primes_state);
  primesMonad.run([3, '', 12, [2, 3]]);
  function pFib(fibs, primes) {
    var ar = [];
    fibs.map(function (f) {
        if (f < 2)
            return;
        if (primes.every(function (p) { return (f % p != 0 || f == p); }))
            ar.push(f);
    });
    return ar;
  };

  function prFactTransformer3(s, n) {
    return factors_state3([[], [], n, s[3]]);
  };

  function factors_state3(a) {
    var b = a.slice();
    var result;
    func(b);
    function func (v) {
      for (let p of v[3]) {
        if (v[2] / p == Math.floor(v[2] / p)) {
          v[1].push(p);
          v[2] = v[2]/p;
          if (v[2] != 1) {
            func(v);
          }
        };
        v[1].sort(function(a, b) {
          return a - b;
        });
        result = v[1];
      };
    }
    return result;
  }

  function checkpM () {

  };

  function factors (num) {
    return primesMonad.run([primesMonad.s[0], [], num, primesMonad.a])
    .bnd(s => prFactTransformer3(s, num))
  }

  function lcm (c1,d1) {
    var ar= [];
    var c = c1.slice()
    var d = d1.slice()
    var r;
    d1.map(v => {
      if (c.some(x => x === v)) {
        ar.push(v)
        c.splice(c.indexOf(v),1)
        d.splice(d.indexOf(v),1)}
        r = ar.concat(d).concat(c).reduce(function (a,b) {return a*b})
      }
    )
    return r
  }
```
  var a = v.data[0];
  var b = v.data[1];
  var r = Math.sqrt(a*a + b*b);
  console.log('In worker.js a,b',a,b )
  postMessage(["CA#$41", r]);
  postMessage(["CB#$41", parseInt(a,10) + parseInt(b,10)]);
  postMessage(["CC#$41", a * b]);
  postMessage(["CD#$41", lcm(factors(a),factors(b))]);
};
// EOF
