#JS-monads-stable -v1.1

This is the culmination of the experimental JS-monads series. Features are still being added, but the core definitions are stable. It is running online at [JS-monads-stable](http://schalk.net:3055) in a [Motorcycle.js](https://github.com/motorcyclejs) application. Motorcycle.js is [Cycle.js](https://github.com/cyclejs/core) using [Most](https://github.com/cujojs/most) and [Snabbdom](https://github.com/paldepind/snabbdom) instead of RxJS and "virtual-dom". [most-subject](https://github.com/TylorS/most-subject) makes MonadStream work as intended. The application runs online at [http://schalk.net:3055](http://schalk.net:3055).  

The use of the monads is explained at [the online presentation](http://schalk.net:3055), which is the running version of this code. There, you can see explanations and demonstrations of a shared, persistent todo list; an interactive simulated dice game with a traversable history number displays, chat rooms for for each group that is formed to play the game or just to chat, and much more.

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
  }; ` 
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
## MonadStream
```javascript
  var MonadStream = function MonadStream(g) {
    var _this = this;
    this.id = g;
    this.stream = mostSubject.subject()
    this.ret = function (a) {
      _this.stream.next(a);
      return _this;
    };
  };
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
 executes. The type of state is TMVar ServerState. ServerState is never mutated; that would be impossible in Haskell since ServerState was defined in the main program. But state is in the IO monad, so the fact that the it refers to the ServerState list pulled from the TMVar before and after one ServerState list is replaced by another ServerState list is not a problem.

###The Motorcycle.js Front-End
In the front-end application, state is held in the global object named "O". When a monad, say "m", executes m.ret(newValue), m does not mutate. Instead, a new monad named "m" with id "m" and value "newValue" becomes an attribute of O. After that, O.m.x == newValue is true, but m remains unchanged. If O.m previously existed, it is not mutated by this process. If there is no reference to it, it will be subject to obliteration by the garbage collector.

In earlier experiments, I sort of side-stepped mutation by creating new monads with same names as the monads they superceded. Stand-alone "ret()" can still do this. Creating a new global entity with a name that already exists in the global space mutates the global object, which is window in this web application. So, I ask, what's the difference? Why not keep O around and mutate it instead instead of window? Doing it that way has some advantages. Say I run "var m = new Monad(0,'m'), creating a new monad named m with value 0. Then I run m.bnd(add,1,m) causing O.m.x == 1 to be true but leaving m.x still equal to 0. m can carry the same value forever, donating it wherever needed, while updates created by m.ret() are readily available in O.m. If the value is less trivial than 0, this could be pretty useful. I can't think of a good reason for doing it, but if you want to change the value of m, something like ret(42,'m') will do the job. ret(42,'m') creates a new monad named "m" with value 42. After that, O.m.x == 1 would still true but m.x == 0 returns false. m.x == 42 returns true. 

Other than O, MonatIter instances are the only objects that mutate in this presentation. MonadIter instances are useful only when their bnd() method is used; and when bnd() is used, the "p" attribute becomes the argument to bnd(). I think this is a situation in which it is wise to take advantage of the fact that Javascript allows p to morph into the bnd() argument. Words like "dogmatic", "religous", and "obsessive" come to mind when I think of imposing consistency on this project by eliminating the only exception (other than "O") to the general no-mutations policy. If I find that it interferes significantly with browser optimization, I will reconsider.
 
### Implications of "O" for Cycle.js and Motorcycle.js
[Cycle.js](https://github.com/cyclejs/core) has been criticized for not keeping state in a central location. Well, there it is, in O. I have created applications using Node.js and React.js. [Motorcycle.js](https://github.com/motorcyclejs) is such a relief. It and the monads presented here work well together. As previously mentioned, Motorcycle.js is Cycle.js, only using [Most](https://github.com/cujojs/most) and [Snabbdom](https://github.com/paldepind/snabbdom) instead of RxJS and "virtual-dom").

##[The Online Demonstration](http://schalk.net:3055)
The online demonstration features a game with a traversible dice-roll history; group chat rooms; and a persistent, multi-user todo list. People in the same group share the game, chat messages, and whatever todo list they might have. Updating, adding, removing, or checking "Complete" by any member causes every member 's todo list to update. The Haskell websockets server preserves a unique text file for each group's todo list. Restarting the server does not affect the lists. Restarting or refreshing the browser window causes the list display to disappear, but signing in and re-joining the old group brings it back. If the final task is removed, the server deletes the group's todo text file. 

With Motorcycle.js, the application runs smoothly and is easy to understand and maintain. I say "easy to understand", but some effort must first be invested into getting used to functions that take functions as arguments, and the Cycle.js / Motorcycle.js API. After that, seeing how the monads work is a matter of contemplating their definitions and experimenting a little. Most of the monads and the functions they use in this demonstration are immediately available in the browser console. Just load [http://schalk.net:3055](http://schalk.net:3055) and press F12 to explore and experiment.

### Example
One of the examples in the online demonstration uses MonadStream and MonadIter to produce an array of Fibonacci numbers, an array of prime numbers, and an array of prime Fibonacci numbers whenever a user enter an upper bound. The stream listeners are accessed through MonadItter's bnd() method. User data enters mM$fib5, then mM$fib5 calls mMitterPrime5.release([number, array]) sending a Fibonacci number and an array of Fibonacci numbers to mM$prime5. Fibonacci numbers and prime numbers are calculated only once. If an array shorter than one already computed is requested, a truncated version of the older list is displayed. Further explanation and an interactive demonstration are at [http://schalk.net:3055](http://schalk.net:3055).

```javascript
  mM$fib5.stream.observe(v => {
    var x = v.splice(0, v.length);
      if (x[1] < x[2]) {
          monadState.mMfibs8.bnd(push, x[0] + x[1], mMfibs8);
          mM$fib5.ret([x[1], x[0] + x[1], x[2]]);
      }
      else {
        let ar = O.mMfibs8.x.slice(0, O.mMfibs8.x.length - 1);
        document.getElementById('fib5').innerHTML = ar;
        mMitterPrime5.release([x[0], ar]);
      } 
      mMitterFib5.bnd(
        x => {
          let ar = O.mMfibs8.x.slice(0, O.mMfibs8.x.length);
          if (x > ar[ar.length - 1]) {
            let a = ar.pop();
            let b = ar.pop();
            mM$fib5.ret([b, a, x]);
          }
          else {
            let ar2 = ar.filter(v => v <= x);
            document.getElementById('fib5').innerHTML = ar2;
            mMitterPrime5.release(([ar2[ar2.length-1], ar2]));
          }
      })
  });
```
The code above passes a Fibonacci number and an array of Fibonacci numbers to the code below.
```javascript
  mM$prime5.stream.observe(v => {
      while ((v[0][v[0].length - 1]) < v[2]) {
        for (let i in v[0]) {
          if ((v[1] % v[0][i]) == 0) {
            mM$prime5.ret([v[0], v[1] + 1, v[2]]);
          }
          if (i == (v[0].length - 1)) {
            v[0].push(v[1]);
          }
        }
      }
      let ar = v[0].slice(0, v[0].length)
      document.getElementById('prime5').innerHTML = ar;
      var prFibs = ar.filter(v => O.mMfibs8.x.includes(v));
      document.getElementById('primeFibs').innerHTML = prFibs;
      mMitterPrime5.bnd(arr => {
        var x = arr[0];
        var fibs = arr[1];
        if (x > (v[0][v[0].length - 1])) {
          mM$prime5.ret([v[0], v[1] + 1, x]);
        }
        else {
          let trunc = ar.filter(a => a < x);
          let ar2 = ar.slice(0, trunc.length + 1);
          document.getElementById('prime5').innerHTML = ar2;
          var primeFibs = fibs.filter(v => ar2.includes(v)); 
          document.getElementById('primeFibs').innerHTML = primeFibs;
           
        }
      })
  });
```
Other ways of generating the three arrays might be more efficient; but when you are familiar with the monads, the above code is easy to read and understand. User data -> mMitterFib5.release(num) -> test -> (A) generate a longer array and display or (B) truncate and display -> mMitterPrime5.release -> test -> (A) generate a longer array and display or (B) truncate and display -> generate the prime Fibonacci numbers and display them.


 
.
.

