#JS-monads-part6

This is the culmination of the experimental JS-monads series. When I started, I didn't know if anything useful would come out of simple composable objects I was creating. The objects contained a single value attribute, which could be a number or a nested list of lists, primitive values, objects, and functions, along with two methods: bnd() and ret(). The definitions changed as the investigation matured, but the behavior of the objects' bnd and ret methods was always kept pretty consistent with the behavior of >= and return in Haskell. I thought that kept them grounded close to the lambda calculus, which is pregnant with awesome potentential. I called the little objects "monads", even though they existed without type constraints or constraints on what they could do.

The monads turned out to be useful for organizing code. With the addition of MonadIter, code involving callbacks could be written in a neat, imperitive-looking style. Also, step-wise functionality could be achieved without the overhead of ES6 promises, iterators, and generators. MonadIter remains in the core of the project. The MonadIter release() method now takes arguments that can be fed into the computation captured by the bnd() method and held in the "p" attribute.

Variation on the Monad theme are easy to implement. I experimented with MonadHistory, a monad that stored everything that it captured with its ret() method. It worked, but then MonadStream turned out to be more useful for game's time travel feature. I have yet to find a use for MonadState, a variation on Monad that caries a value and the current state of a computation sequence. My purpose in this project is not to impose a specific API or Framework on anyone; but rather, to share how I use the three core monads and to remind developers that it is easy it is to construct specialized variations on Monad for application-specific purposes.

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
 executes. The type of state is TMVar ServerState. ServerState is never mutated; that would be impossible in Haskell since ServerState was defined in the main program. But state is in the IO monad, so the fact that the it refers to different versions of "TMVar Server" is not a problem. And the TMVar is likewise a monad that has no problem with the replacement of the named value that it holds.

In the front-end application, state is held in the global object named "O". When a monad, say "m", executes m.ret(newValue), m does not mutate. Instead, a new monad named "m" with id "m" and value "newValue" becomes an attribute of O. Then O.m.x == newValue is true, but m remains unchanged. If O.m previously existed, it is not affected by this process. If there is no reference to it, it will be subject to obliteration by the garbage collector.

In earlier experiments, I sort of side-stepped mutation by creating new entities with same names as the entities they superceded. But that mutated the window object. So, I ask, what's the difference? Why not keep O around and mutate it instead? Doing it that way has some advantages. Say I run "var m = new Monad(0,'m'), creating a new monad named m with value 0. Then I run m.bnd(add,1,m) causing O.m.x == 1 to be true but leaving m.x still equal to 0. m can carry the same value forever, donating it wherever needed, while updates created by m.ret() are readily available in O.m. I can't think of a good reason for doing it, but if you want to change the value of m, something like ret(42,'m') will do the job. ret(42,'m') creates a new monad named "m" with value 42. After that, O.m.x == 1 is still true and m.x is equal to 42. Nothing is lost by using O. Cycle.js has been criticized for not keeping state in a central location. Well, there it is! Problem solved.

The third and final member of what I consider the core group of monads in a Motorcycle.js application is MonadStream. Every time an instance uses its ret() method, its most-subject stream gets the new value and its subscribers immediately update. In the game application, mMZ1 is the busy worker that keeps things moving along smoothly. You can see it in action at [JS-monads-part6](http://schalk.net:3055). 

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
[Motorcycle.js](https://github.com/motorcyclejs) and the monads presented here work well together. Motorcycle.js is Cycle.js, only using [Most](https://github.com/cujojs/most) and [Snabbdom](https://github.com/paldepind/snabbdom) instead of RxJS and "virtual-dom").
This installment of the JS-monads series features a persistent, multi-user todo list application. People in the same group can still share the game and chat messages, but now they can share a todo list. Updating, adding, removing, or checking "Complete" by one member causes every member 's list to update. The Haskell websockets server preserves a unique list for each group. Restarting the server does not affect the lists. Restarting or refreshing the browser window causes the list display to disappear, but signing in and re-joining the old group brings it back. 

With Motorcycle.js, the application runs smoothly and is easy to understand and maintain. I say "easy to understand", but some effort must first be invested into getting used to functions that take functions as arguments, and the Cycle.js / Motorcycle.js API. After that, seeing how the monads work is a matter of contemplating their definitions and experimenting a little. Most of the monads and the functions they use in this demonstration are immediately available in the browser console. Just load [http://schalk.net:3055](http://schalk.net:3055) and press F12 to explore and experiment.



.
.
.

