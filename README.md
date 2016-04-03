#JS-monads-part6 - Websockets Team Todo List

This page picks up where [JS-monads-part5](http://schalk.net:3077) left off. The basic monads don't change when their "ret()" methods replace their values. Updated monads are attached to the global object "O", leaving the original monad just as it was. The "O" object is where you can find monads with their most recent updates. Nothing, other than "O", gets mutated in this demonstation. "O" is unique, and I see no advantage in allocating resources for the purpose of making a new object named "O" every time any monad calls its ret() method. "O" serves as a namespace for the current state of the monads. Prior versions of monads (monads holding earlier values) are not automatically preserved, but prior versions are immutable (if updating values is done only by means of the ret() method) can easily be preserved; for example, by pushing them into arrays. 
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




.
.
.

