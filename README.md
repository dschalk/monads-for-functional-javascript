#JS-monads-part6

This is the culmination of the experimental JS-monads series. When I started, I didn't know if anything useful would come simple composable objects I was creating. The objects contained a single value attribute, which could be a number or a nested list of lists of objects, and two methods: bnd() and ret(). The definitions changed as the investigation matured, but the behavior of the objects' bnd and ret methods was always pretty consistent with the behavior of >= and return in Haskell; and I thought that kept them grounded close to the lambda calculus. I called the little objects "monads", even though they existed without type constraints.

The monads turned out to be useful for organizing code. With the addition of MonadIter, code involving callbacks could be written in a neat, imperitive-looking style. Also, step-wise functionality could be achieved without the overhead of ES6 promises, iterators, and generators. MonadIter remains in the core of the project. The MonadIter release() method now takes arguments that can be fed into the computation captured by the bnd() method and held in the "p" attribute.

Variation on the Monad theme can be helpful in special cases. I experimented with MonadHistory, a monad that stored everything that it captured with its ret() method. It worked, but then MonadStream turned out to be more useful for game's time travel feature. I have yet to find a use for MonadState, a variation on Monad that caries a value and the current state of a computation sequence. My purpose in this project is not to impose a specific API or Framework on anyone; but rather, to share how I use the three core monads and to show how easy it is to construct specialized variations on Monad for application-specific purposes.

##Immutability And The Global "O" Object

The Haskell server for the online demonstration at [JS-monads-part6](http://schalk.net:3055) keeps the ever-changing state of the application in the ServerState list of tupples defined as follows: 
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
 executes. The type of state is TMVar ServerState. ServerState is never mutated; that would be impossible in Haskell since ServerState was defined in the main program. But state is in the IO monad, so the fact that the it refers to different versions of "TMVar Server" is not a problem. And the TMVar is likewise a monad that has no problem with the replacement of a named value that it holds.

In the front-end application, state is held in the global object named "O". When the value of a monad, say "m", changes due the use of m.ret(newValue), m does not mutate. A new monad named "m" with id "m" and value "newValue" replaces the previous attribute in O named "m". Then O.m.x == newValue is true, but the old m was not mutated and could have been preserved by, for example, creating a reference to it or placing it in a named array.

In earlier experiments, I sort of side-stepped mutation by creating new entities with same names as the entities they superceded. But that mutated the window object. So, I ask, what's the difference? Why not keep O around and mutate it instead? Doing things that way has some advantages. Say I run "var m = new Monad(0,'m'), creating a new monad named m with value 0. Then I run m.bnd(add,1,m) causing O.m.x == 1 but still m.x == 0 to be true. m can carry the same value forever, donating it wherever needed, while updates created by m.ret() are always availe in O.m. I can't think of a good reason for doing it, but ret(42,'m') creates a new monad named "m" with value 42. After that, O.m.x == 1 is still true and m.x == 42 is also true. Nothing is lost by using O and much is gained. Cycle.js has been criticized for not keeping state in a central location. Well, there it is!

The third and final member of what I consider the core group of monads in a Motorcycle.js application is MonadStream. Every time an instance uses it ret() method, its most-subject stream gets the value and its subscribers immediately update. In the game application, mMZ1 is the busy worker that keeps things moving along smoothly. You can see it in action at [JS-monads-part6](http://schalk.net:3055). 
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
## MonadStream
This fifth part of the monad introduced a the enhanced version of ret(), named "MonadStream".
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
[Motorcycle.js](https://github.com/motorcyclejs) and the monads presented here work well together. This installment of the JS-monads series features a persistent, multi-user todo list application. People in the same group can still share the game and chat messages, but now they can share a todo list. Updating, adding, removing, or checking "Complete" by one member causes every member 's list to update. The Haskell websockets server preserves a unique list for each group. Restarting the server does not affect the lists. Restarting or refreshing the browser window causes the list display to disappear, but signing in and re-joining the old group brings it back. 

With Motorcycle.js, the application runs smoothly and is easy to understand and maintain. I say "easy to understand", but some effort must first be invested into getting used to functions that take functions as arguments, and the Cycle.js / Motorcycle.js API. After that, seeing how the monads work is a matter of contemplating their definitions and experimenting a little. Most of the monads and the functions they use in this demonstration are immediately available in the browser console. Just load [http://schalk.net:3055](http://schalk.net:3055) to see them in action, and click F12 to explore and experiment.



.
.
.

