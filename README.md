#JS-monads-part6

This is the culmination of the experimental JS-monads series. It is running online at [JS-monads-part6](http://schalk.net:3055). 

When I started, I didn't know if anything useful would come out of simple composable objects I was creating. The objects contained a single value attribute and two methods. The value could be a number, a nested list of lists, primitive values, objects, and functions, or anything you like. The method bnd() takes a function and other optional arguments. For any monad m with value v, m.bnd(f, ...args) returns f(v, ...args). The definition of the method ret() changed during the experimental phase. I always endeavored to make the behavior of bnd() and ret() consistent with the behavior of >= and return in Haskell. I thought that would keep the monads grounded in the lambda calculus, which is pregnant with possibilities. I called the little objects "monads", even though they existed without type constraints or constraints on what they could do. As time went on, I discovered that they were more useful than I could have hoped.

Instances of Monad and MonadIter working together provide freedom from callback hell and the pyramid of doom. They also provide the same kinds of functionality that are being demonstated in blogs and video presentations about ES6 iterators, and generators. You can step through a series of procedures and, while you do, provide input to the procedures on the fly. They can also provide Promise-like behavior.  

MonadStream turned out to be very useful, as is demonstated in the online presentation. For any MonadStream instance m, m.ret(v) causes v to be added to m.stream. In the online demonstratiop at [JS-monads-part6](http://schalk.net:3055), m.ret(v) causes subscribers to m.stream to update the DOM using the information in v. I imported most-subject for the MonadStream streaming feature. 


Here are some definitions:
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
      O[_this.id] = new Monad(a, _this.id);
      return O[_this.id]
    };
  };               
```
##MonadIter
```javascript
var MonadIter = function MonadIter() {
  var this = this;
  this.p = function (a, ... args) {};

  this.release = function (x, ...args) {
    return this.p(x, ...args);
  };

  this.bnd = function (func) {
    _this.p = func;
    return _this;
  };
};
```
## MonadStream
```javascript
  var MonadStream = function MonadStream(z, g) {
    var _this = this;
    
    this.subject = sub();
    this.observer = this.subject.observer;
    this.stream = this.subject.stream;
    this.x = z;
  
    if (arguments.length === 1) {
      this.id = 'anonymous';
    } else {
      this.id = g;
    }
  
    this.bnd = function (func, ...args) {
       return func(_this.x, ...args);
    };
  
    this.ret = function (a) {
      O[_this.id] = new MonadStream(a,_this.id);
      _this.observer.next(a);
      return O[_this.id];
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

This discussion isn't about the websockets server, but I want to point out the similarity between the way the server holds the application's state in a TMVar and the way the front end holds state in an object. The application's state is always changing, so it\'s a pretty safe bet that something is mutating. The Haskell server for the online demonstration at [JS-monads-part6](http://schalk.net:3055) keeps the ever-changing state of the application in the ServerState list of tupples. It is defined as follows: 
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
 executes. The type of state is TMVar ServerState. ServerState is never mutated; that would be impossible in Haskell since ServerState was defined in the main program. But state is in the IO monad, so the fact that the it refers to different versions of "TMVar ServerState" is not a problem. TMVar exists to have its value removed for reading and/or replacement.

In the front-end application, state is held in the global object named "O". When a monad, say "m", executes m.ret(newValue), m does not mutate. Instead, a new monad named "m" with id "m" and value "newValue" becomes an attribute of O. After that, O.m.x == newValue is true, but m remains unchanged. If O.m previously existed, it is not mutated by this process. If there is no reference to it, it will be subject to obliteration by the garbage collector.

In earlier experiments, I sort of side-stepped mutation by creating new monads with same names as the monads they superceded. Stand-alone "ret()" can still do this. Creating a new global entity with a name that already exists in the global space mutates the global object, which is window in this web application. So, I ask, what's the difference? Why not keep O around and mutate it instead instead of window? Doing it that way has some advantages. Say I run "var m = new Monad(0,'m'), creating a new monad named m with value 0. Then I run m.bnd(add,1,m) causing O.m.x == 1 to be true but leaving m.x still equal to 0. m can carry the same value forever, donating it wherever needed, while updates created by m.ret() are readily available in O.m. If the value is less trivial than 0, this could be useful. I can't think of a good reason for doing it, but if you want to change the value of m, something like ret(42,'m') will do the job. ret(42,'m') creates a new monad named "m" with value 42. After that, O.m.x == 1 would still true but m.x == 0 returns false. m.x == 42 returns true. 
### Implications of "O" for Cycle.js and Motorcycle.js
Cycle.js has been criticized for not keeping state in a central location. Well, there it is, in O. I have created applications using Node.js and React.js. Motorcycle.js is such a relief. 

### MonadStream
The third and final member of what I consider the core group of monads in a Motorcycle.js application is MonadStream. Every time an instance uses its ret() method, its most-subject stream gets the new value and its subscribers immediately update. In the game application, mMZ1 is the busy worker that keeps things moving along smoothly. You can see it in action at [JS-monads-part6](http://schalk.net:3055). 
[Motorcycle.js](https://github.com/motorcyclejs) and the monads presented here work well together. Motorcycle.js is Cycle.js, only using [Most](https://github.com/cujojs/most) and [Snabbdom](https://github.com/paldepind/snabbdom) instead of RxJS and "virtual-dom").
This installment of the JS-monads series features a persistent, multi-user todo list application. People in the same group can still share the game and chat messages, but now they can share a todo list. Updating, adding, removing, or checking "Complete" by one member causes every member 's list to update. The Haskell websockets server preserves a unique list for each group. Restarting the server does not affect the lists. Restarting or refreshing the browser window causes the list display to disappear, but signing in and re-joining the old group brings it back. 

With Motorcycle.js, the application runs smoothly and is easy to understand and maintain. I say "easy to understand", but some effort must first be invested into getting used to functions that take functions as arguments, and the Cycle.js / Motorcycle.js API. After that, seeing how the monads work is a matter of contemplating their definitions and experimenting a little. Most of the monads and the functions they use in this demonstration are immediately available in the browser console. Just load [http://schalk.net:3055](http://schalk.net:3055) and press F12 to explore and experiment.



.
.
.

