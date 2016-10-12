#JS-monads-stable 
This is the repository for a [Motorcycle.js](https://github.com/motorcyclejs) application running online at [JS-monads-stable](http://schalk.net:3055). Motorcycle.js is essentially [Cycle.js](href: https://github.com/cyclejs/core) using [Most](https://github.com/cujojs/most) and [Snabbdom](https://github.com/paldepind/snabbdom) instead of RxJS and virtual-dom.

Motorcycle is an ideal host for my JS-monads project, which is an exposition of functional programming using instances of convenient constructs named "Monad", "MonadState", "MonadSet", and "MonadItter".
The server is a modified clone of the Haskell Wai Websockets server. Haskell pattern matching and list comprehension made it easy to configure to broadcast selectively to members of groups, who share the dice game, todo list, and chat room. I use Babel and Webpack to prepare the front end and Stack to compile everything into a single executable which I upload to my Digital Ocean "droplet". 

The code here is not annotated, but detailed examinations of the code behind the multiplayer simulated dice game, persistent todo list, chat feature, and several other demonstrations can be found at [http://schalk.net:3055](http://schalk.net:3055), where the code is running online. 
## Basic Monad    
```javascript    
    function Monad (z, ID = 'default') {
        var x = z;
        var ob = {
        id: ID,
        bnd: function (func, ...args) {
          return func(x, ...args)
        },
        ret: function (a) {
          return window[ob.id] = new Monad(a, ob.id);
        }
      };
      return ob
    };
    
    function get (m) {    // Getter for the x attribute, which is not exposed.
      let v = m.bnd(x => x);
      return v;
    }  
```
In most chains of computations, the arguments provided to each link's bnd() method are functions that return instances of Monad. The stand-alone ret() function does only one thing; it creates new Monad instances. Here are some examples of functions that return instances of Monad:
```javascript
    function ret(v, id = 'default') {
      return new Monad(v, id);
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

In the following discussion, "x == y" signifies that x == y returns true. Let J be the collection of all Javascript values, including functions, instances of Monad, etc, and let F be the collection of all functions mapping values in J to instances of Monad m with references matching their ids; that is, with m[id] == m.id. M is defined as the collection of all such instances of Monad along and all of the functions in F. We speculate that there is a one to one correspondence between monads in Hask (The For any m (with id == "m"), f, and f' in M, J, F, and F, respectively, the following relationships hold:
```javascript
Left Identity

  equals( m.ret(v).bnd(f), f(v) )   
  equals( ret(v).bnd(f), f(v) ) 
  Examples: equals( m.ret(3).bnd(cube), cube(3) )  Tested and verified  
            equals( ret(3).bnd(cube), cube(3)      Tested and verified
  Haskell monad law: (return x) >>= f ≡ f x  

Right Identity

  m.bnd(m.ret) === m      Tested and verified 
  m.bnd(ret, "m") === m   Tested and verified
  equals(m.bnd(m.ret), m)   Tested and verified
  Haskell monad law: m >>= return ≡ m 

Commutivity

  equals( m.bnd(f1).bnd(f2), m.bnd(v => f1(v).bnd(f2)) ) 
  Example: equals( m.ret(0).bnd(add, 3).bnd(cube), 
           m.ret(0).bnd(v => add(v,3).bnd(cube)) )  Tested amd verified
  Haskell monad law: (m >>= f) >>= g ≡ m >>= ( \x -> (f x >>= g) ) 
```
where equals is defined as:
```javascript
    var equals = function equals (mon1, mon2) {
      if (mon1.id === mon2.id && get(mon1) === get(mon2)) return true;
      else return false
    }  
```
The function equals() was used because the == and === operators on objects check for location in memory, not equality of attributes and equivalence of methods. If the left and right sides of predicates create new instances of m, then the left side m and the right side m wind up in different locations in memory and the == operator returns false. So we expect m.ret(3) == m.ret(3) to return false. What concerns us is the equivalence of both sides of a comparison; that is, can the left side be substituted for the right side and vice versa.

Tests in the JS-monads-mutableInstances branch at the Github repository produce results closer to what we would expect in mathematics. For example: m.ret(7) == m.ret(7) returns true in JS-monads-mutableIntances but false in JS-monads-stable, the master branch. But it would be folly to give up immutability for the sake of making unimportant comparisons come out "right". equals(m.ret(7), m.ret(7)) tells us that m.ret(7) is doing the same thing on both sides of the comparison, and that is all that is important. Similarly, equals(ret(3).bnd(cube), cube(3)) tells us that ret(3).bnd(cube) and cube(3) are doing the same thing; they can be substituted for one another.

In Haskell, x ≡ y means that you can replace x with y and vice-versa, and the behaviour of your program will not change. That is what "equals(x, y)" means in the context of demonstrating that instances of Monad in M obey the Javascript equivalent of the Haskell monad laws. The behavior of Instances of Monad with ret() (the function and the method) and bnd() mirrors the behavior of Haskell monads with return and >>=. The laws to which both of them conform are the

Haskell monads are not category theory monads. To begin with, they don't even reside in a category. See: http://math.andrej.com/2016/08/06/hask-is-not-a-category. Nevertheless, blogs abound perpetuating the Haskell mystique that, as one blogger wrote, "There exists a "Haskell category", of which the objects are Haskell types, and the morphisms from types a to b are Haskell functions of type a -> b." The nLab wiki page states "There is a category, Hask, whose objects are Haskell types and whose morphisms are extensionally identified Haskell functions.", and the first line of the Haskell Wiki https://wiki.haskell.org/Hask states "Hask is the category of Haskell types and functions." but at least it goes on to demonstrate that Hask really isn't a category.

It is true that Haskell monads obey rules that are Haskell translations of the structure-preserving rules about functors and natural transformations in the category-theoretic monad. I have demonstrated that the elements of M (defined above) obey a Javascript interpretation of these same rules. This suggests that instances of Monad can be expected to be versitile and robust in production. The smoothly functioning game and todo list, along with the demonstratons that appear later on this page, reinforce this expectation.
##MonadItter

MonadItter instances do not have monadic properties, but they facilitate the work of monads. Here's how they work:

For any instance of MonadItter, say "it", "it.bnd(func)" causes it.p == func. Calling the method "it.release(...args)" causes p(...args) to run, possibly with arguments supplied by the caller. Here is the definition:
```javascript
const MonadItter = function ()  {
  this.p = function () {};
  this.release = (...args) => this.p(...args);
  this.bnd = func => this.p = func;
};

As shown later in the online demonstration, MonadItter instances control the routing of incoming websockets messages and the flow of action in the simulated dice game. In one of the demonstrations, they behave much like ES2015 iterators. I prefer them over ES2015 iterators. They can also help to provide promises-like functionality without promises.

## MonadState
```javascript
  function MonadState(g, state, p) {
    var ob = {
      id: g,
      s: state,
      a: s[3],
      process: p,
      bnd: (func, ...args) => func(ob.s, ...args),  
      run: function (ar) {
        var ar2 = ob.process(ar);
        ob.s = ar2;
        ob.a = ar2[3];
        window[ob.id] = ob;
        return window[ob.id];
      }
    };
    return ob;
  };
MonadState reproduces some of the functionality found in the Haskell Module "Control.Monad.State.Lazy", inspired by the paper "Functional Programming with erloading and Higher-der Polymorphism", Mark P Jones (http://web.cecs.pdx.edu/~mpj/) Advanced School of Functional Programming, 1995. The following demonstrations use the MonadState instances fibsMonad and primesMonad to create and store arrays of Fibonacci numbers and arrays of prime numbers, respectively. fibsMonad and primesMonad provide a simple way to compute lists of prime Fibonacci numbers. Because the results of computations are stored in the a and s attributes of MonadState instances, it was easy to make sure that no prime number had to be computed more than once in the prime Fibonacci demonstration.

Here is the definition of fibsMonad, along with the definition of the function that becomes fibsMonad.process.
```javascript
  var fibsMonad = new MonadState('fibsMonad', [0, 1, 3, [0,1]], [0,1], fibs_state); 
  
  var fibs_state = function fibs_state(ar) {
    var a = ar.slice();
    while (a[3].length < a[2]) {
      a = [a[1], a[0] + a[1], a[2], a[3].concat(a[0])];
    }
    return a;
  }
Another MonadState instance used in the online demonstration is primesMonad. Here is its definition along with the function that becomes primesMonad.process:
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
primesMonad keeps a cash of computed primes in primesMonad.a and primesMonad.s[3]. It never performs a computation to generate a prime number more than once during a browser session.
## messageMonad
The following code supports the group chat feature:
```javascript
    var messageMonad = new MonadState('messageMonad', messages, messages, message_state); 
    
    function message_state(v) {
      var ar = v[0].concat(v[3]);
      return [ v[0], [], [], ar ];
    };

    var updateMessages = function updateMessages(e) {
      var ar = e.split(',');
      var sender = ar[2];
      ar.splice(0,3);
      var str = ar.join(',');
      messageMonad.run([ [h('br'), sender + ': ' + str], [], [], messageMonad.s[3] ]);
    };
```
messageMonad.s[3] rests permantly in the virtual DOM. The message handler sends a string to the websockets server which broadcasts it to group members. The incoming websockets message handler is a stream which is merged into the stream that feeds the virtual DOM, triggering the Snabbdom diff anad render algorithm.

The stand-alone ret() function creates new Monad instances. Here is its definition:
```javascript
    function ret(v, id = 'default') {
      return new Monad(v, id);
    }
```
## MonadSet
```javascript
const MonadSet = function (set, ID = 'anonymous')  {
  this.s = set;
  this.bnd = (func, ...args) => func(this.s, ...args);  
  this.add = a => new MonadSet(s.add(a), this.id);
  this.delete = a => new MonadSet(s.delete(a), this.id);
  this.clear = () => new MonadSet(s.clear(), this.id);
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

  var solve = function solve () {
    mMZ3.bnd(a => 
    mMtemp.ret(a)           
    .bnd(display, 'quad4', '')         
    .bnd(display, 'quad6', '')         
    .bnd(display,'quad5', a + " * x * x ")
    .bnd(a => mMZ3    // Blocks here until new user input comes in.
    .bnd(b =>  mMtemp.ret(b)
    .bnd(display, 'quad6', b + ' * x ').bnd(b => mMZ3  // Blocks again.
    .bnd(c => mMtemp.ret([a,b,c]).bnd(fmap, qS4, "mMtemp")
    .bnd(v => {  
      let x = v[0]
      let y = v[1]
      console.log('Here is x and y: ', x, y)
    mMtemp.bnd(display, 'quad4', "Results: " + x + " and  " + y)  
    .bnd(display, 'quad5', p(a).text + " * " + x + " * " + x + " + " + p(b).text + 
            " * " + x + " " + p(c).text + " = 0")
    .bnd(display, 'quad6', p(a).text + " * " + y + " * " + y + " + " + p(b).text + 
            " * " + y + " " + p(c).text + " = 0")   
    solve();  
    } ) ) ) ) ) ) 
  };

function fmap (x, g, id) {
  window[id] = new Monad(g(x), id); 
  return window[id]
}

var display = function display (x, id, string) {
  document.getElementById(id).innerHTML = string;
  return ret(x);
}
```
## MonadState Transformer Example
MonadState instances are used to create a list of prime Fibonacci number. More commentary is available at [Demonstration](http://schalk.net:3055). Here are the definitions of fibsMonad and its helper functions:

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
Running the following code causes get(m) == 42 after two seconds.
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
##MonadMaybe
When sequences of computations are performed inside of MonadMaybe, the inadvertent creation of variables with the values NaN or undefined can halt further computation while the sequence rapidly runs to completion. In this demonstration, an udefined variable and a variable with value NaN appear in the middle of a middle of a sequence of computations. Scren shots of the Chrome console show what happens. First, here are the most relevant definitions:
```javascript
  var MonadMaybe = function MonadMaybe(z) {
  var _this = this;
  var g = arguments.length <= 1 || arguments[1] === undefined ? 'anonymous' : arguments[1];
  this.id = g;
  this.x = z;
  
  this.bnd = function (a) {
    console.log('<B><B><B>             Entering bnd()  <B><B><B>               The argument is ', a );
    var result;
    if (_this.x == 'Nothing' || a[1] == 'Nothing') {
      console.log('<B><N><B>             In bnd()        <B><N><B>      Propagating Nothing from bnd()');
      result = Nothing;
      console.log('<$><$><$>             In bnd()        <$><$><$>      The result is ', result, '   result.x:', result.x);
    }
    else if (a instanceof Function) return a();
    else {
      var b = a.slice(1);
      var res = test([a[0],_this.x.toString(), ... b]);    
      result = res;
      console.log('<$><$><$>             In bnd()        <$><$><$>      The result is ', result, '   result.x:', result.x);
    }
    return result;
  }
  
  this.ret = function (a) { 
    var b = eval(`typeof(acorn)`);
    console.log('<@><@><@>             In ret()  <@><@><@>            Creating a new instance of MonadMaybe ___  id:', '"' +_this.id +'"', '     value:', a );
    if (_this.x == 'Nothing') {
      console.log('<N><N><N>    Still in ret()   <N><N><N>      Propagating Nothing from ret()');
      return Nothing
    }  
    try {
      if (a == undefined) throw '    ' + a + " is not defined"
      return window[_this.id] = new MonadMaybe(a, _this.id);
    }
    catch(e) { 
      console.log("<N><N><N>   Still in ret()  <N><N><N>  In a catch block ", a, 'is not defined.    ', e) 
      return Nothing
    };
    try {
      if (a == 'NaN') throw '    ' + a + " is not a number"
      return window[_this.id] = new MonadMaybe(a, _this.id);
    }
    catch(e) { 
      console.log("<N><N><N>   Still in ret()  <N><N><N>  In a catch block ", a, 'is not a number.   ', e) 
      return Nothing
    };
  };
};
  
  var Nothing = new MonadMaybe('Nothing', 'Nothing');
  
  function run (x) {
    console.log('<O><O><O>  Left test(), now at the start of run()  <O><O><O>  The argument is ', x);  
    var f = eval(x[0]);
    var b = x.slice(1)
    return f(... b)
  }
  
function test (a) {

  console.log('<T><T><T>  Left bnd(); now at the start of test()  <T><T><T>  The argument is ', a );
  
  for (let c of a) {
    try {if (eval(c).toString == undefined) {
      throw "Error " + c + "is not defined"}
    } 
    catch(e) {
      console.log("<E><E><E>             In test()       <E><E><E>      " + c + " is not defined");
      console.log("<T><N><T>             In test()       <T><N><T>      Propagating Nothing from test()");
      return Nothing;
    }
    try {if ((eval(c).toString()) == 'NaN') {
      throw "Error " + c + " is not a number"}
    } 
    catch(e) {
      console.log('<E><E><E>             In test()       <E><E><E>      " + c + " is not a number' );
      console.log("<T><N><T>             In test()       <T><N><T>      Propagating Nothing from test()");
      return Nothing;
    }
    try {if (a[1] == 'Nothing') {
      throw "Error The value of the argument's x attribute is 'Nothing' " }
    } 
    catch(e) {
      console.log('<E><E><E>             In test()       <E><E><E>      The substrate monad's x attribute is "Nothing' );
      console.log("<T><N><T>             In test()       <T><N><T>      Propagating Nothing from test()");
      return Nothing;
    }
  return run(a);
  }  
```  
And here are the screenshots of what was logged after calling a sequence of computations that executed properly and then two variations that failed. First, the version that succeeded:
![success](src/images/success.png)
Next, the undefined variable ox appears halfway through the sequence of computations. What happened and where it happened are readily apparent in the screenshot. Just scan for the first appearance of MonadMaybe  {id: "Nothing, x: "Nothing"} result.x Nothing, then look above it. Two lines up it says "ox is not defined". Directly above that we see that the undefined variable was introduced in the file named "test". Two lines above that we see that mQ1 has the value ox. Here is the screenshot:  
![undefined](/src/images/ox.png)
And finally, 0/0 causes get(mQ1) == NaN.
![NaN](src/images/div0.png)
After NaN was encountered, the sequence ran smoothly and rapidly through the final stages without attempting to do the specified work. In other scenarios, the savings in resources might be significant, a system crash might be averted, or a silently-produced bug causing incorrect results might have been avoided. And if I hadn't intentionally caused the failure, trouble-shooting would have been a no-brainer. In production, I would log only code pertaining to Nothing in order to be notified of problems that slipped past me during testing, but for this demonstration I logged messages from each stage of the computation, which might be a good thing to do during development. An operation in the middle of a sequence of operations might pause to obtain data from a remote resouse based on information received from the previous MonadMaybe instance. MonadMaybe could be modified to throw for more that undefined and NaN.
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

In the server, replacing state in the TMVar takes place inside the Imonad, which scupulously protects the application from side effects. But the fact remains that the TMVar ServerState list of clients is not what it used to be after a score change. Some client in the ServerState list has been replaced by a client with the same name, goal, group, and websockets connection but a different score.

### MonadItter
MonadItter instances are net monadic in any sense of the word. "Monad" is more like a namespace in the case of MonadItter. It is useful, but only for its bnd() and release() methods.  only when their bnd() method is used; and when bnd() is used, the "p" attribute becomes the argument to bnd(). I think this is a situation in which it is wise to take advantage of the fact that Javascript allows p to morph into the bnd() argument. Words like "dogmatic", "religous", and "obsessive" come to mind when I think of imposing consistency on this project by eliminating the only exception to the general no-mutations policy. If I find that it interferes with JavaScript engine optimization, I will reconsider.
 
##[The Online Demonstration](http://schalk.net:3055)
The online demonstration features a game with a traversible dice-roll history; group chat rooms; and a persistent, multi-user todo list. People in the same group share the game, chat messages, and whatever todo list they might have. Updating, adding, removing, or checking "Complete" by any member causes every member 's todo list to update. The Haskell websockets server preserves a unique text file for each group's todo list. Restarting the server does not affect the lists. Restarting or refreshing the browser window causes the list display to disappear, but signing in and re-joining the old group brings it back. If the final task is removed, the server deletes the group's todo text file. 

With Motorcycle.js, the application runs smoothly and is easy to understand and maintain. I say "easy to understand", but for people coming from an imperitive programming background, some effort must first be invested into getting used to functions that take functions as arguments, which are at the heart of Motorcycle and JS-monads-stable. After that, seeing how the monads work is a matter of contemplating their definitions and experimenting a little. Most of the monads and the functions they use in this demonstration are readily available in the browser console. If you have the right dev tools in Chrome or Firefox, just load [http://schalk.net:3055](http://schalk.net:3055) and press F12 and then Ctrl-R to re-load with access to the monad.js script. I do this to troubleshoot and experiment. Try mM25.bnd(mM25.ret).x == get(mM25) and see that it returns true.

.
.

