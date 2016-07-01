#JS-monads-stable -v1.2

In this version, MonadStream has been dropped. It was dead weight. Simple function calls are now doing what MonadStream instances were doing in the simulated dice game and persistent, shared todo list.

This repository contains the code that is running online at [JS-monads-stable](http://schalk.net:3055) in a [Motorcycle.js](https://github.com/motorcyclejs) application. Motorcycle.js is [Cycle.js](https://github.com/cyclejs/core) using [Most](https://github.com/cujojs/most) and [Snabbdom](https://github.com/paldepind/snabbdom) instead of RxJS and "virtual-dom".  

The use of the monads is explained at [the online presentation](http://schalk.net:3055), which is the running version of this code. There, you can see explanations and demonstrations of a shared, persistent todo list; an interactive simulated dice game with a traversable history of number displays, chat rooms for for each group that is formed to play the game or just to chat, and more.

Here are some definitions, which can also be seen at [the online presentation](http://schalk.net:3055) :
## Basic Monad    
```javascript                 
  var Monad = function Monad(z, g) {
    var _this = this;

    this.x = z;
    if (arguments.length === 1) {
      this.id = 'anonymous';
    } else {
      this.id = g;
    };

    this.bnd = function (func, ...args) {
       return func(_this.x, ...args);
    };

    this.ret = function (a) {
      O.[_this.id] = new Monad(a, _this.id);
      return O.[_this.id]
    };
  };  
```
##MonadItter
```javascript
  var MonadItter = function MonadItter() {
    var _this = this;
    this.p = function () {};
  
    this.release = function (...args) {
      return this.p(...args);
    };
  
    this.bnd = function (func) {
      _this.p = func;
    };
  }; `
```
## MonadState
```javascript
  var MonadState = function MonadState (g, state, value, p) {
    var _this = this;
    this.id = g;
    this.s = state;
    this.a = value;
    this.process = p;
    this.bnd = function (func, ...args) {
       return func(_this.a, ...args);
    };
    this.run = function(st) { 
      let s = _this.process(st); 
      let a = s[3];
      window[_this.id] = new MonadState(_this.id, s, a, _this.process);
      return window[_this.id];
    }
  }
```
## Stand alone ret()
```javascript
  var ret = function ret(v, id) {
    if (arguments.length === 1) {
      return (new Monad(v, 'anonymous'));
    }
    window[id] = new Monad(v, id);
    return window[id];
  }
```
##Immutability And The Global "O" Object
###The Haskell Back-End
This project isn't an exposition of the modified Haskell Wai Websockets server, but I want to point out the similarity between the way the server holds the application's state in a TMVar and the way the front end holds state in an object. The application's state is always changing, so it\'s a pretty safe bet that something is mutating somewhere. The Haskell server for the online demonstration at [JS-monads-stable](http://schalk.net:3055) keeps the ever-changing state of the application in the ServerState list of tupples. It is defined as follows: 
```haskell
type Name = Text
type Score = Int
type Goal = Int
type Group = Text
type Client = (Name, Score, Goal, Group, WS.Connection)
type ServerState = [Client]

newServerState :: ServerState
newServerState = []
```
When the server loads, the line of code 
```haskell
state <- atomically $ newTMVar newServerState
```
When the server is notified of a score change in the simulated dice game, this code executes:
```haskell
else if "CG#$42" `T.isPrefixOf` msg
  then
    mask_ $ do
      old <- atomically $ takeTMVar state
      let new = changeScore sender extraNum extraNum2 old
      atomically $ putTMVar state new
      let subSt = subState sender group new
      broadcast msg subSt
      broadcast ("CB#$42," `mappend` group `mappend` ","
          `mappend` sender `mappend` "," `mappend` T.concat (intersperse "<br>" (textState subSt))) subSt
```
You don't need to be a Haskell programmer to see that state is pulled out of the TMVar and given the name "old". "new" is the state after changeScore sender extraNum extraNum2 old executes. "atomically $ putTMVar state new" replaces "old" in the TMVar with "new".

In the browser, when an instance of Monad, say "m" with m.x == oldValue, executes its ret() method on some reference to a value, let's call it "newValue", O's m attribute points to a fresh Monad instance. O.m.x == oldValue becomes false and O.m.x == newValue becomes true. The Monad instance with m.x == oldValue still exists, and if there is a reference to it, it won't be destroyed by the garbage collector.

In the server, replacing state in the TMVar takes place inside the IO monad, which scupulously protects the application from side effects. But the fact remains that the TMVar ServerState list of clients is not what it used to be after a score change. Some client in the ServerState list has been replaced by a client with the same name, goal, group, and websockets connection but a different score.

###The Motorcycle.js Front-End
In the front-end application, state is held in the global object named "O". As mentioned above, when a monad, say "m", executes m.ret(newValue), m does not mutate. Instead, a new monad named "m" with id "m" and value "newValue" becomes an attribute of O. After that, O.m.x == newValue is true, but m remains unchanged. If O.m previously existed, it is not mutated by this process. If there is no reference to it, it will be subject to obliteration by the garbage collector.

I can't think of a good reason for doing it, but if you want to change the value of m, something like ret(42,'m') will do the job. Suppose m.x == 0 and O.m.x == 0. ret(42,'m') creates a new monad named "m" with m.x == 42. After that, O.m.x == 0 would still be true but m.x == 0 returns false. m.x == 42 returns true. If, after that, you update O.m only by using m's ret() and refrain from using the value m.x, the application will proceed as though nothing happened.

If you want to go a step further and mutate m, nothing prevents you from calling "m.x = 8888", O.m.x = "WTF", and such. If I ever recruit people to help develop an application, I might ask them to update Monad instances only by using the ret() method so everyone could confidently look to the "O" object for changes in Monad instances' state. 


MonadIter instances are useful only when their bnd() method is used; and when bnd() is used, the "p" attribute becomes the argument to bnd(). I think this is a situation in which it is wise to take advantage of the fact that Javascript allows p to morph into the bnd() argument. Words like "dogmatic", "religous", and "obsessive" come to mind when I think of imposing consistency on this project by eliminating the only exception (other than "O") to the general no-mutations policy. If I find that it interferes with JavaScript engine optimization, I will reconsider.
 
### Implications of "O" for Cycle.js and Motorcycle.js
[Cycle.js](https://github.com/cyclejs/core) has been criticized for not keeping state in a central location. Well, there it is, in O. I have created applications using Node.js and React.js. [Motorcycle.js](https://github.com/motorcyclejs) is such a relief. It and the monads presented here work well together. As previously mentioned, Motorcycle.js is Cycle.js, only using [Most](https://github.com/cujojs/most) and [Snabbdom](https://github.com/paldepind/snabbdom) instead of RxJS and "virtual-dom").

##[The Online Demonstration](http://schalk.net:3055)
The online demonstration features a game with a traversible dice-roll history; group chat rooms; and a persistent, multi-user todo list. People in the same group share the game, chat messages, and whatever todo list they might have. Updating, adding, removing, or checking "Complete" by any member causes every member 's todo list to update. The Haskell websockets server preserves a unique text file for each group's todo list. Restarting the server does not affect the lists. Restarting or refreshing the browser window causes the list display to disappear, but signing in and re-joining the old group brings it back. If the final task is removed, the server deletes the group's todo text file. 

With Motorcycle.js, the application runs smoothly and is easy to understand and maintain. I say "easy to understand", but some effort must first be invested into getting used to functions that take functions as arguments, and the Cycle.js / Motorcycle.js API has a learning curve. After that, seeing how the monads work is a matter of contemplating their definitions and experimenting a little. Most of the monads and the functions they use in this demonstration are immediately available in the browser console. Just load [http://schalk.net:3055](http://schalk.net:3055) and press F12 and Ctrl-R to explore and experiment. Try mM25.bnd(mM25.ret).x == mM25.x and see that it returns true.

### Example
MonadState instances show a great deal of potential. Here are the definitions of fibsMonad and its helper functions:

### fibsMonad
```javascript
  var fibsMonad = new MonadState('fibsMonad', O.mMsT.x, [0],  fibs_state)   // creates fibsMonad  

  var mMsT = new Monad([], 'mMsT');              // Used below.
  mMsT.ret([]);                                  // Creates O.mMst
  
  var fibs_state = function fibs_state(ar) { 
    mMsT.ret(ar.slice());
    while (O.mMsT.x[3].length < O.mMsT.x[2]) { 
      let ar = O.mMst.x[3].slice();
      mMsT.ret([O.mMsT.x[1], (O.mMsT.x[0]*1 + O.mMsT.x[1]), O.mMsT.x[2], ar.concat(O.mMsT.x[0])])
    }
    return O.mMsT.x;       
  }
```
And here are the definitions of primesMonad and its helper functions:

### primesMonad
```javascript
  var primesMonad = new MonadState('primesMonad', [2, 3, 'primesMonad', [2]], [2],  primes_state)  
p
  function primes_state(x) {
    var v = x.slice();
    var R;
      while (v[1] <= v[0]) {
        if (check()) {
          v[3].push(v[1]);
        }
        v[1]+=2;
      }
      function check () {
        var R = false;
        v[3].map(e => {
          if ((v[1] % e) == 0) {
            return;
          }
          R = true;
        })
        return R;
      }
    return v;
  }
```
### Abstractions Over The "run()" Method
In both instances of MonadState, the run() method takes an array of four elements. The following functions are abstractions over run that take one argumant and make sure that all four of the elements in the array presented to run() are correct. The arguments provided to runFib and runPrime determine the lengths of the arrays referenced by the "a" attributes of both MonadState instances. Here they are:
```javascript
  var runFib = function runFib (x) {
    if (fibsMonad.a.length >= x) { 
      let ar = fibsMonad.a.slice();
      ar.length = x;
      return ar;
    }
    fibsMonad.run([fibsMonad.s[0], fibsMonad.s[1], x, fibsMonad.a]);
    return fibsMonad.a;
  }

  var runPrime = function runPrime (x) {
    if (primesMonad.a >= x) {
    let ar = fibsMonad.a.slice();
    ar.length = x;
    return(ar);
    }
    primesMonad.run([x, primesMonad.s[1], "from runPrime", primesMonad.a]);
    return primesMonad.a;
  }  
```
### User Interface 
```javascript
  const fibKeyPress5$ = sources.DOM
    .select('input#fib3335').events('keydown');

  const fibKeyPressAction5$ = fibKeyPress5$.map(e => {
    if (e.target.value == '') {return};
    if( e.keyCode == 13 ) {
      var fibs = runFib(e.target.value)
      var fibs2 = fibs.filter(v => v <= Math.round(Math.sqrt(fibs[fibs.length - 1])));
      var c = fibs[fibs2.length];
      var primes = runPrime(c);
      var primeFibs = pFib(fibs, primes);
      document.getElementById('PF_9').innerHTML = fibs;
      document.getElementById('PF_22').innerHTML = primes;
      document.getElementById('primeFibs').innerHTML = primeFibs;
    }
  });  
```
The function that takes an array of Fibonacci numbers and an array of prime numbers, and returns an array of prime Fibonacci numbers, is named "pFib and is defined as follows:
```javascript
  function pFib (fibs, primes) {
    var ar = [];
    fibs.map (f => {
      if (f < 2) { return; };
      if ( primes.every(p => (f % p != 0 || f == p))) { ar.push(f) };
    });
    return ar;
  };
```

.
.

