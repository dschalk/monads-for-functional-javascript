#JS-monads-stable 
The executable file, compiled using stack in Ubuntu 16.04, is in the bin directory. It is also running online at [JS-monads-stable](http://schalk.net:3055) 

In this version, the global object "O" has been removed. Monad instances now exist on window intead of O. MonadStream has also been dropped. Simple function calls are now doing what MonadStream instances were doing in the simulated dice game and persistent, shared todo list. 

This repository is where I keep the code that is running online at [JS-monads-stable](http://schalk.net:3055). It is a [Motorcycle.js](https://github.com/motorcyclejs) application. Motorcycle.js is [Cycle.js](https://github.com/cyclejs/core) using [Most](https://github.com/cujojs/most) and [Snabbdom](https://github.com/paldepind/snabbdom) instead of RxJS and "virtual-dom".  

[JS-monads-stable](http://schalk.net:3055) features explanations and demonstrations of a shared, persistent todo list; an interactive simulated dice game with a traversable history of number displays, chat rooms shared among members of each group that is formed to play the game or just to chat.
## Basic Monad    
```javascript    
    var Monad = function Monad(value, ID) {

    var _this = this;

    this.x = value

    if (arguments.length === 1) this.id = 'anonymous';
    else this.id = ID;
  
    this.bnd = function (func, ...args) {
       return func(_this.x, ...args);
    };
  
    this.ret = function (a) {
      window.[_this.id] = new Monad(a, _this.id);
      return window.[_this.id]
    };
  };  
```
Monad instances are useful for chaining computations. Typically, the bnd() method provides its value to a computation that returns an instance of Monad. Here are some examples:
```javascript
  var ret = function ret(v, id) {
    if (arguments.length === 1) {
      return (new Monad(v, 'anonymous'));
    }
    window[id] = new Monad(v, id);
    return window[id];
  }
  
  var cube = function(v,mon) {
    if (arguments.length === 2) {
      return mon.ret(v*v*v);
    }
    return ret(v*v*v);
  }
  
  var add = function(x,b,mon) {
    if (arguments.length === 3) {
      return mon.ret(x + b);
    }
    return ret(x+b);
  }
  
  var log = function log(x, message, mon) {
    console.log('In log. Entry: ', message);
    if (arguments.length === 3) return mon
    return ret(x);
  };  
```  
These functions can be used with instances of Monad in many ways, for example:
```javascript
  var c = m.ret(0).bnd(add,3).bnd(cube)
  .bnd(log,"m.x and a.x are  " + m.x + " and " + a.x + " respectively ")
  Output: In log. Entry:  m.x and a.x are  0 and 27 respectively 
  Note: m.x keeps its initial value of 0.

  m.bnd(() => add(0, 3).bnd(cube).bnd(m.ret).bnd(v => log("", "m.x is " + v))) 
  Output: In log. Entry:  m.x is 27
  Note: The value of m.x at the start of the computation is ignored.
 
  ret(3).bnd(v => ret(v*v).bnd(v2 => log("", "a squared is " + v2).bnd(() => 
  ret(4*4).bnd(v3 => log("", "a squared plus b squared is " + (v2 + v3), m)))))
  Output: In log. Entry:  a squared is 9
          In log. Entry:  a squared plus b squared is 25  
```
Each of the functions shown above can be used as a stand-alone function or as an argument to the bnd() method. Each monad in a chain of linked computations can do one of two things with the previous monads value: (1) It can ignore it, possibly letting it move past for use further down the chain or (2) use it, with the option of passing it on down the chain. Any computation can be inserted into the chain by giving it an additional first argument (which will be the previous monad's value), and having it return an instance of Monad. Say you have a function func(a,b,c) {...}. Put something ahead of a (it will have the previous monad's value) and return a monad. You can give the returned monad any value you like. For example, func'(x,a,b,c) {...; return ret(x)} will work. Its bnd() method will pass along the value x, which is the previous monads value.
##Similarity to Haskell Monads
In the following discussion, "x == y" signifies that x == y returns true. Let M be the collection of all instances of Monad, let J be the collection of all Javascript values, including functions, instances of Monad, etc, and let F be the collection of all functions mapping values in J to monads in M. For any m, v, f, and f' in M, J, F, and F, respectively, the following relationships hold:
```javascript
    m.ret(v).bnd(f).x == f(v).x                        Left identity
    ret(v).bnd(f).x == f(v).x                            Left identity  
    (return x) >>= f == f x                              Haskell monad law
    
    m.bnd(m.ret).x == m.x                            Right identity
    m.bnd(ret).x == m.x                              Right identity
    m >>= return == m                                    Haskell monad law
    
    Assume m.x = v, then 
    m.bnd(f).bnd(f').x == m.bnd(v => f(v).bnd(f'))  Associativity
    (m >>= f) >>= g == m >>= ( \x -> (f x >>= g) )      Haskell monad law  
```
".x" is appended to the relationships because we are checking only for equivalence of values, not equivalence of objects. m.ret(v) and m.ret(v, "m") both create new instances of Monad named "m". ret(v) creates a new un-named instance of Monad. ret(v1).ret(v2) creates a fresh attribute of Monad named "anonymous" with anonymous.x == v. m.ret(3) == m.ret(3) returns false because each time m.ret(3) runs, m points to a new instance of Monad. The previous m is left to the garbage collector unless there is a reference to it. But m.ret(3).x == m.ret(3).x returns true because 3 == 3 is true and m.x == 3 for the current and former instances of Monad named "m".

Just as Javascript if very different from Haskell, so too are the JS-monads very different from Haskell monads. Unlike JS-monads, Haskell monads obtain new values without producing new clones of themselves. I think the essential takeaways from the above demonstration of similarities are not so much that JS-monads are like Haskell monads, but that (1) that the Monad ret() method is, in a comparison of "x" attributes (and also "id" attributes), the left and right identity on instances of Monad, and (2) instances of Monad compose associatively.

Here are the definitions of MonadItter, MonadState, and MonadSet:
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
       return func(_this.s, ...args);  // func operates on state
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
## MonadSet
```javascript
  var MonadSet = function MonadSet(set, ID) {
    var _this = this;
  
    this.s = set;
  
    if (arguments.length === 1) this.id = 'anonymous';
    else this.id = ID;
  
    this.bnd = function (func, ...args) {
       return func(_this.x, ...args);
    };
  
    this.add = function (a) {
      var ar = Array.from(_this.s);
      set = new Set(ar);
      set.add(a);
      window[_this.id] = new MonadSet(set, _this.id);
      return window[_this.id];
    };
  
    this.delete = function (a) {
      var ar = Array.from(_this.s);
      set = new Set(ar);
      set.delete(a);
      window[_this.id] = new MonadSet(set, _this.id);
      return window[_this.id];
    };
  
    this.clear = function () {
      set = new Set([]);
      window[_this.id] = new MonadSet(set, _this.id);
      return window[_this.id];
    };
  };

var s = new Set();

var sMplayers = new MonadSet(s, 'sMplayers')  // holds currently online players
```
## MonadItter example
MonadItter instance mMZ3 calls its bnd() method three times. User input releases it three times, each time supplying a number to the quadratic equation `a*x*x + b*x + c = 0 `. When mMZ3 is released the third time, an attempt is made to find solutions using the quadratic formula. Here is the code:
```javascript  
  const quad$ = sources.DOM
    .select('#quad').events('keypress')  // Motorcycle way of getting user input.
  
  const quadAction$ = quad$.map((e) => {
    if( e.keyCode == 13 ) {
      mMZ3.release(e.target.value)       // Releases mMZ3 (below).
      document.getElementById('quad').value = '';
    }
  });

  var solve = function solve () {
    mMZ3.bnd(a => 
    mMtemp.ret(a)           
    .bnd(display, 'quad6', '')         
    .bnd(display,'quad5', a + " * x * x ")
    .bnd(a => mMZ3
    .bnd(b =>  mMtemp.ret(b)
    .bnd(display, 'quad6', b + ' * x ').bnd(b => mMZ3
    .bnd(c => {
      let x = p(qS1(a,b,c));
      let y = p(qS2(a,b,c));
      document.getElementById('quad5').innerHTML =
        p(a).text + " * " + x.text + " * " + x.text + " + " + p(b).text + 
            " * " + x.text + " " + p(c).text + " = 0"
      document.getElementById('quad6').innerHTML =
        p(a).text + " * " + y.text + " * " + y.text + " + " + p(b).text + 
            " * " + y.text + " " + p(c).text + " = 0"   
      solve();    // solve() causes mMZ3.bnd() to wait at the top again. 
    }) ) ) ) ) 
  }();

  var qS1 = function qS1 (a, b, c) {
    let n = (b*(-1)) + (Math.sqrt(b*b - 4*a*c));
    if (n != n) {
      return "No solution";
    }
    return n/(2*a);
  }

  var qS2 = function qS2 (a, b, c) {
    let n = (b*(-1)) - (Math.sqrt(b*b - 4*a*c));
    if (n != n) {
      return "No solution";
    }
    return n/(2*a);
  }  


var display = function display (x, id, string) {
  document.getElementById(id).innerHTML = string;
  return ret(x);
}
```
## MonadState Transformer Example
MonadState instances are used to create a list of prime Fibonacci number. More commentary is available at [Demonstration](http://schalk.net:3055). Here are the definitions of fibsMonad and its helper functions:

### fibsMonad
```javascript
  var fibsMonad = new MonadState('fibsMonad', [0, 1, 3, [0,1]], [0,1], fibs_state); 
  
  var fibs_state = function fibs_state(ar) {
    var a = ar.slice();
    while (a[3].length < a[2]) {
      a = [a[1], a[0] + a[1], a[2], a[3].concat(a[0])];
    }
    return a;
  }
```
And here are the definitions of primesMonad and its helper functions:
### primesMonad
```javascript
  var primesMonad = new MonadState('primesMonad', [3, 2, 'primesMonad', [2]], [2],  primes_state)  

  var primes_state = function primes_state(x) {
    var v = x.slice();
      while (2 == 2) {
        if (v[3].every(e => ((v[0]/e) != Math.floor(v[0]/e)))) {
          v[3].push(v[0]);
        }
        if (v[3][v[3].length - 1] > v[2]) { break };     // Not an infinite loop afterall.
        v[0]+=2;
      }
    return v;
  }
```
### MonadState Transformers
Transformers take instances of MonadState and return different instances of MonadState, possibly in a modified state. The method call "fibsMonad.bnd(pfTransformer, primesMonad)" returns primesMonad. Here is the definition of pfTransformer:
```javascript
  var fpTransformer = function transformer (s, m) {
    var bound = Math.ceil(Math.sqrt(s[3][s[3].length - 1]));
    if (bound > m.a[m.a.length - 1] ) {
      m.run([m.s[0], "from the fibKeyPress5$ handler", bound, primesMonad.a])
    }
    return m;
  }
``` 
The final computation occurs when "tr3(fibsState[3],primesState[3]" is called. tr3() takes an array of fibonacci numbers and an array of prime numbers and returns an array containing an array of Fibonacci numbrs, an array of prime numbers, and an array of prime Fibonacci numbers. Here is the definition of tr3:
```javascript
  var tr3 = function tr (fibsArray, primesArray) {
    var bound = Math.ceil(Math.sqrt(fibsArray[fibsArray.length - 1]))
    var primes = primesArray.slice();
    if (primesArray[primesArray.length - 1] >= bound) {
      primes = primesArray.filter(v => v <= bound);
    } 
    var ar = [];
    var fibs = fibsArray.slice(3);
    fibs.map (f => {
      if ( primesArray.every(p => (f % p != 0 || f == p))) ar.push(f);
    })
    return [fibsArray, primes, ar]
  }
 ```
This is how user input is handled:
```javascript  
  const fibKeyPress5$ = sources.DOM
    .select('input#fib92').events('keydown');

  const primeFib$ = fibKeyPress5$.map(e => {
    if( e.keyCode == 13 ) {
      var res = fibsMonad
      .run([0, 1, e.target.value, []])
      .bnd(fibsState => fibsMonad
      .bnd(fpTransformer, primesMonad)
      .bnd(primesState => tr3(fibsState[3],primesState[3])))
      document.getElementById('PF_9').innerHTML = res[0];
      document.getElementById('PF_22').innerHTML = res[1];
      document.getElementById('primeFibs').innerHTML = res[2];
    }
  });
```
##Asynchronous Composition: Promises, MonadItter, or Niether

Using the ES2015 Promises API inside of monads is easy. For example, consider the function "promise", defined as follows:
```javascript
  var promise = function promise(x, t, mon, args) {
    return (new Promise((resolve) => {
      setTimeout(function() {
        resolve(eval("mon.ret(x).bnd(" + args + ")"))   // eval! Get over it, Douglas.
      },t*1000  );
    }));
  };
```
Running the following code causes m.x == 42 after two seconds.
```javascript
  m.ret(3).bnd(promise, 2, m, "cube").then(data => m.ret(data.x).bnd(add, 15, m))  
```
After a two-second delay, the Promise returns the newest version of m with m.x = 27. The then statement passes 27 to m and returns a new version of m with added 15 to it. This pattern can be used to define less trivial functions that handle database calls, functions that don't return immediately, etc. And, of course, ES2015 Promises API error handling can be added.

The same result can be achieved with MonadItter instead of Promises. Consider this:
```javascript
  var timeout2 = function timeout (x, t, m, args) {
    setTimeout(function () {
      mMZ9.release();
    }, t * 1000  );
    return mMZ9.bnd(() => m.bnd(... args))
  };
```
The following code uses timeout2 (above). If you click RUN in the online presentation, "m.x is 27" appears after one second. Two seconds later, "m.x is 42" is displayed along with a blurb that confirms the chain can continue after the delayed computation completes. Here is the code that handles user input:
```javascript
  const timeoutClicks$ = sources.DOM.select('#timeout').events('click')

  const timeoutAction$ = timeoutClicks$.map(() => {
    document.getElementById('timeout2').innerHTML = ''
    document.getElementById('timeout3').innerHTML = ''
    m.ret(3, 'm')
      .bnd(timeout2, 1, m, [() => m
      .bnd(cube, m)
      .bnd(display, 'timeout2', 'm.x is ' + ' ' + m.x, m)
      .bnd(timeout2, 2, m, [() => m
      .bnd(add, 15, m)
      .bnd(display, 'timeout2',  'm.x is ' + ' ' + m.x, m)
      /* Continue chaining from here */
      .bnd(display, 'timeout3', 'The meaning of everything was computed to be' + ' ' + m.x, m)   
    ])]);  
  });
```
The final blurb confirms that the chained code waits for completion of the asynchronous code. Similar code could be made to wait for database calls, Ajax requests, or long-running processes to return before running subsequent chained code. In fact, messages$, the stream that handles incoming websockets messages, named "messages$", does just that. When a message is sent to the server, messages$ listens for the response. The functions waiting in MonadItter bnd() expressions are released according to the prefix of the incoming message from the server. Essentially, messages$ contains callbacks. MonadItter provides an uncluttered alternative to "if - then" blocks of code. 

I didn\'t provide for error handling. There doesn't seem to be any need for it in this demonstration. If I were getting information from a remote database or Ajax server, I would handle errors with "window.addEventListener("error", function (e) { ...".

Composition with Promises involves chains of ".then" statements. Using MonadItter, composition can be accomplished with Monad's bnd() and ret() methods, just as we have done throughout this presentation.

``` 
### The Haskell Wai Websockets Back End
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

In the browser, when an instance of Monad, say "m" with m.x == oldValue, executes its ret() method on some reference to a value, let's call it "newValue", O's m attribute points to a fresh Monad instance. m.x == oldValue becomes false and m.x == newValue becomes true. The Monad instance with m.x == oldValue still exists, and if there is a reference to it, it won't be destroyed by the garbage collector.

In the server, replacing state in the TMVar takes place inside the Imonad, which scupulously protects the application from side effects. But the fact remains that the TMVar ServerState list of clients is not what it used to be after a score change. Some client in the ServerState list has been replaced by a client with the same name, goal, group, and websockets connection but a different score.

### MonadItter
MonadItter instances are net monadic in any sense of the word. "Monad" is more like a namespace in the case of MonadItter. It is useful, but only for its bnd() and release() methods.  only when their bnd() method is used; and when bnd() is used, the "p" attribute becomes the argument to bnd(). I think this is a situation in which it is wise to take advantage of the fact that Javascript allows p to morph into the bnd() argument. Words like "dogmatic", "religous", and "obsessive" come to mind when I think of imposing consistency on this project by eliminating the only exception to the general no-mutations policy. If I find that it interferes with JavaScript engine optimization, I will reconsider.
 
##[The Online Demonstration](http://schalk.net:3055)
The online demonstration features a game with a traversible dice-roll history; group chat rooms; and a persistent, multi-user todo list. People in the same group share the game, chat messages, and whatever todo list they might have. Updating, adding, removing, or checking "Complete" by any member causes every member 's todo list to update. The Haskell websockets server preserves a unique text file for each group's todo list. Restarting the server does not affect the lists. Restarting or refreshing the browser window causes the list display to disappear, but signing in and re-joining the old group brings it back. If the final task is removed, the server deletes the group's todo text file. 

With Motorcycle.js, the application runs smoothly and is easy to understand and maintain. I say "easy to understand", but for people coming from an imperitive programming background, some effort must first be invested into getting used to functions that take functions as arguments, which are at the heart of Motorcycle and JS-monads-stable. After that, seeing how the monads work is a matter of contemplating their definitions and experimenting a little. Most of the monads and the functions they use in this demonstration are immediately available in the browser console. If you have the right dev tools in Chrome or Firefox, just load [http://schalk.net:3055](http://schalk.net:3055) and press F12 and then Ctrl-R to re-load with access to the monad.js script. I do this to troubleshoot and experiment. Try mM25.bnd(mM25.ret).x == mM25.x and see that it returns true.

.
.

