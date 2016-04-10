#JS-monads-part6 - Websockets Team Todo List

This page picks up where [JS-monads-part5](http://schalk.net:3077) left off. The basic monads don't change when their "ret()" methods replace their values. Updated monads are attached to the global object "O", leaving the original monad just as it was. The "O" object is where you can find monads with their most recent updates. Nothing, other than "O", gets mutated in this demonstation. "O" is unique, and I see no advantage in allocating resources for the purpose of making a new object named "O" every time any monad calls its ret() method. If I want a fresh monad with the same name as the superseded monad with a previous value, something has to be mutated. It used to be the window object; now it is "O". "O" serves as a namespace for the current state of the monads. Prior versions of monads (monads holding earlier values) are not automatically preserved, but preserving them is as simple as assinging them to variables or pushing them into arrays. Nothing prevents you from mutating monads by using the anit-pattern "m.x = newValue", but I never do that. I update monads only by means of the ret() method.
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

## Monad$ - Monad Streams
This fifth part of the monad introduced a the enhanced version of ret(), named "Monad$".
```javascript
  var Monad$ = function Monad$(z, g) {
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
      O[_this.id] = new Monad$(a,_this.id);
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

