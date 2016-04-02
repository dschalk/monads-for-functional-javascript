#JS-monads-part6 - Websockets Team Todo List

This page picks up where [JS-monads-part5](http://schalk.net:3077) left off. The basic monads don't change when their "ret()" methods replace their values. Updates are attached to the namespace object "O". These monads don't self-mutate when they use their "ret()" methods, making it convenient to keep historacal versions. 

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

