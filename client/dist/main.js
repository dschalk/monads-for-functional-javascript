(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('@most/multicast', ['exports', '@most/prelude'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('@most/prelude'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.prelude);
    global.mostMulticast = mod.exports;
  }
})(this, function (exports, _prelude) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.MulticastSource = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var MulticastDisposable = function () {
    function MulticastDisposable(source, sink) {
      _classCallCheck(this, MulticastDisposable);

      this.source = source;
      this.sink = sink;
      this.disposed = false;
    }

    _createClass(MulticastDisposable, [{
      key: 'dispose',
      value: function dispose() {
        if (this.disposed) {
          return;
        }
        this.disposed = true;
        var remaining = this.source.remove(this.sink);
        return remaining === 0 && this.source._dispose();
      }
    }]);

    return MulticastDisposable;
  }();

  function tryEvent(t, x, sink) {
    try {
      sink.event(t, x);
    } catch (e) {
      sink.error(t, e);
    }
  }

  function tryEnd(t, x, sink) {
    try {
      sink.end(t, x);
    } catch (e) {
      sink.error(t, e);
    }
  }

  var dispose = function dispose(disposable) {
    return disposable.dispose();
  };

  var emptyDisposable = {
    dispose: function dispose() {}
  };

  var MulticastSource = function () {
    function MulticastSource(source) {
      _classCallCheck(this, MulticastSource);

      this.source = source;
      this.sinks = [];
      this._disposable = emptyDisposable;
    }

    _createClass(MulticastSource, [{
      key: 'run',
      value: function run(sink, scheduler) {
        var n = this.add(sink);
        if (n === 1) {
          this._disposable = this.source.run(this, scheduler);
        }
        return new MulticastDisposable(this, sink);
      }
    }, {
      key: '_dispose',
      value: function _dispose() {
        var disposable = this._disposable;
        this._disposable = void 0;
        return Promise.resolve(disposable).then(dispose);
      }
    }, {
      key: 'add',
      value: function add(sink) {
        this.sinks = (0, _prelude.append)(sink, this.sinks);
        return this.sinks.length;
      }
    }, {
      key: 'remove',
      value: function remove(sink) {
        this.sinks = (0, _prelude.remove)((0, _prelude.findIndex)(sink, this.sinks), this.sinks);
        return this.sinks.length;
      }
    }, {
      key: 'event',
      value: function event(time, value) {
        var s = this.sinks;
        if (s.length === 1) {
          s[0].event(time, value);
          return;
        }
        for (var i = 0; i < s.length; ++i) {
          tryEvent(time, value, s[i]);
        }
      }
    }, {
      key: 'end',
      value: function end(time, value) {
        var s = this.sinks;
        if (s.length === 1) {
          s[0].end(time, value);
          return;
        }
        for (var i = 0; i < s.length; ++i) {
          tryEnd(time, value, s[i]);
        }
      }
    }, {
      key: 'error',
      value: function error(time, err) {
        var s = this.sinks;
        for (var i = 0; i < s.length; ++i) {
          s[i].error(time, err);
        }
      }
    }]);

    return MulticastSource;
  }();

  function multicast(stream) {
    var source = stream.source;
    return source instanceof MulticastSource ? stream : new stream.constructor(new MulticastSource(source));
  }

  exports.MulticastSource = MulticastSource;
  exports.default = multicast;
});

},{"@most/prelude":2}],2:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('@most/prelude', ['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.mostPrelude = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /** @license MIT License (c) copyright 2010-2016 original author or authors */

  // Non-mutating array operations

  // cons :: a -> [a] -> [a]
  // a with x prepended
  function cons(x, a) {
    var l = a.length;
    var b = new Array(l + 1);
    b[0] = x;
    for (var i = 0; i < l; ++i) {
      b[i + 1] = a[i];
    }
    return b;
  }

  // append :: a -> [a] -> [a]
  // a with x appended
  function append(x, a) {
    var l = a.length;
    var b = new Array(l + 1);
    for (var i = 0; i < l; ++i) {
      b[i] = a[i];
    }

    b[l] = x;
    return b;
  }

  // drop :: Int -> [a] -> [a]
  // drop first n elements
  function drop(n, a) {
    // eslint-disable-line complexity
    if (n < 0) {
      throw new TypeError('n must be >= 0');
    }

    var l = a.length;
    if (n === 0 || l === 0) {
      return a;
    }

    if (n >= l) {
      return [];
    }

    return unsafeDrop(n, a, l - n);
  }

  // unsafeDrop :: Int -> [a] -> Int -> [a]
  // Internal helper for drop
  function unsafeDrop(n, a, l) {
    var b = new Array(l);
    for (var i = 0; i < l; ++i) {
      b[i] = a[n + i];
    }
    return b;
  }

  // tail :: [a] -> [a]
  // drop head element
  function tail(a) {
    return drop(1, a);
  }

  // copy :: [a] -> [a]
  // duplicate a (shallow duplication)
  function copy(a) {
    var l = a.length;
    var b = new Array(l);
    for (var i = 0; i < l; ++i) {
      b[i] = a[i];
    }
    return b;
  }

  // map :: (a -> b) -> [a] -> [b]
  // transform each element with f
  function map(f, a) {
    var l = a.length;
    var b = new Array(l);
    for (var i = 0; i < l; ++i) {
      b[i] = f(a[i]);
    }
    return b;
  }

  // reduce :: (a -> b -> a) -> a -> [b] -> a
  // accumulate via left-fold
  function reduce(f, z, a) {
    var r = z;
    for (var i = 0, l = a.length; i < l; ++i) {
      r = f(r, a[i], i);
    }
    return r;
  }

  // replace :: a -> Int -> [a]
  // replace element at index
  function replace(x, i, a) {
    // eslint-disable-line complexity
    if (i < 0) {
      throw new TypeError('i must be >= 0');
    }

    var l = a.length;
    var b = new Array(l);
    for (var j = 0; j < l; ++j) {
      b[j] = i === j ? x : a[j];
    }
    return b;
  }

  // remove :: Int -> [a] -> [a]
  // remove element at index
  function remove(i, a) {
    // eslint-disable-line complexity
    if (i < 0) {
      throw new TypeError('i must be >= 0');
    }

    var l = a.length;
    if (l === 0 || i >= l) {
      // exit early if index beyond end of array
      return a;
    }

    if (l === 1) {
      // exit early if index in bounds and length === 1
      return [];
    }

    return unsafeRemove(i, a, l - 1);
  }

  // unsafeRemove :: Int -> [a] -> Int -> [a]
  // Internal helper to remove element at index
  function unsafeRemove(i, a, l) {
    var b = new Array(l);
    var j = undefined;
    for (j = 0; j < i; ++j) {
      b[j] = a[j];
    }
    for (j = i; j < l; ++j) {
      b[j] = a[j + 1];
    }

    return b;
  }

  // removeAll :: (a -> boolean) -> [a] -> [a]
  // remove all elements matching a predicate
  function removeAll(f, a) {
    var l = a.length;
    var b = new Array(l);
    var j = 0;
    for (var x, i = 0; i < l; ++i) {
      x = a[i];
      if (!f(x)) {
        b[j] = x;
        ++j;
      }
    }

    b.length = j;
    return b;
  }

  // findIndex :: a -> [a] -> Int
  // find index of x in a, from the left
  function findIndex(x, a) {
    for (var i = 0, l = a.length; i < l; ++i) {
      if (x === a[i]) {
        return i;
      }
    }
    return -1;
  }

  // isArrayLike :: * -> boolean
  // Return true iff x is array-like
  function isArrayLike(x) {
    return x != null && typeof x.length === 'number' && typeof x !== 'function';
  }

  /** @license MIT License (c) copyright 2010-2016 original author or authors */

  // id :: a -> a
  var id = function id(x) {
    return x;
  };

  // compose :: (b -> c) -> (a -> b) -> (a -> c)
  var compose = function compose(f, g) {
    return function (x) {
      return f(g(x));
    };
  };

  // apply :: (a -> b) -> a -> b
  var apply = function apply(f, x) {
    return f(x);
  };

  // curry2 :: ((a, b) -> c) -> (a -> b -> c)
  function curry2(f) {
    function curried(a, b) {
      switch (arguments.length) {
        case 0:
          return curried;
        case 1:
          return function (b) {
            return f(a, b);
          };
        default:
          return f(a, b);
      }
    }
    return curried;
  }

  // curry3 :: ((a, b, c) -> d) -> (a -> b -> c -> d)
  function curry3(f) {
    function curried(a, b, c) {
      // eslint-disable-line complexity
      switch (arguments.length) {
        case 0:
          return curried;
        case 1:
          return curry2(function (b, c) {
            return f(a, b, c);
          });
        case 2:
          return function (c) {
            return f(a, b, c);
          };
        default:
          return f(a, b, c);
      }
    }
    return curried;
  }

  exports.cons = cons;
  exports.append = append;
  exports.drop = drop;
  exports.tail = tail;
  exports.copy = copy;
  exports.map = map;
  exports.reduce = reduce;
  exports.replace = replace;
  exports.remove = remove;
  exports.removeAll = removeAll;
  exports.findIndex = findIndex;
  exports.isArrayLike = isArrayLike;
  exports.id = id;
  exports.compose = compose;
  exports.apply = apply;
  exports.curry2 = curry2;
  exports.curry3 = curry3;
});

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = undefined;

var _mostSubject = require('most-subject');

var makeSinkProxies = function makeSinkProxies(drivers) {
  return Object.keys(drivers).reduce(function (sinkProxies, driverName) {
    sinkProxies[driverName] = (0, _mostSubject.holdSubject)();
    return sinkProxies;
  }, {});
};

var callDrivers = function callDrivers(drivers, sinkProxies) {
  return Object.keys(drivers).reduce(function (sources, driverName) {
    sources[driverName] = drivers[driverName](sinkProxies[driverName].stream, driverName);
    return sources;
  }, {});
};

var runMain = function runMain(main, sources, disposableStream) {
  var sinks = main(sources);
  return Object.keys(sinks).reduce(function (accumulator, driverName) {
    accumulator[driverName] = sinks[driverName].until(disposableStream);
    return accumulator;
  }, {});
};

var logErrorToConsole = function logErrorToConsole(err) {
  if (console && console.error) {
    console.error(err.message);
  }
};

var replicateMany = function replicateMany(sinks, sinkProxies) {
  return setTimeout(function () {
    Object.keys(sinks).filter(function (driverName) {
      return sinkProxies[driverName];
    }).forEach(function (driverName) {
      sinks[driverName].forEach(sinkProxies[driverName].sink.add).then(sinkProxies[driverName].sink.end).catch(logErrorToConsole);
    });
  }, 1);
};

var isObjectEmpty = function isObjectEmpty(object) {
  return Object.keys(object).length <= 0;
};

var run = function run(main, drivers) {
  if (typeof main !== 'function') {
    throw new Error('First argument given to run() must be the ' + '\'main\' function.');
  }
  if (typeof drivers !== 'object' || drivers === null) {
    throw new Error('Second argument given to run() must be an ' + 'object with driver functions as properties.');
  }
  if (isObjectEmpty(drivers)) {
    throw new Error('Second argument given to run() must be an ' + 'object with at least one driver function declared as a property.');
  }

  var _subject = (0, _mostSubject.subject)();

  var disposableSink = _subject.sink;
  var disposableStream = _subject.stream;

  var sinkProxies = makeSinkProxies(drivers, disposableStream);
  var sources = callDrivers(drivers, sinkProxies);
  var sinks = runMain(main, sources, disposableStream);
  replicateMany(sinks, sinkProxies);

  var dispose = function dispose() {
    disposableSink.add(1);
    Object.keys(sinkProxies).forEach(function (key) {
      return sinkProxies[key].sink.end();
    });
    disposableSink.end();
  };

  return { sinks: sinks, sources: sources, dispose: dispose };
};

exports.default = { run: run };
exports.run = run;
},{"most-subject":7}],4:[function(require,module,exports){
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define('@most/hold', ['exports', 'most/lib/source/MulticastSource'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('most/lib/source/MulticastSource'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.MulticastSource);
        global.mostHold = mod.exports;
    }
})(this, function (exports, _MulticastSource) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _MulticastSource2 = _interopRequireDefault(_MulticastSource);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = (function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    })();

    var hold = function hold(stream) {
        return new stream.constructor(new _MulticastSource2.default(new Hold(stream.source)));
    };

    var Hold = (function () {
        function Hold(source) {
            _classCallCheck(this, Hold);

            this.source = source;
            this.time = -Infinity;
            this.value = void 0;
        }

        _createClass(Hold, [{
            key: 'run',
            value: function run(sink, scheduler) {
                if (sink._hold !== this) {
                    sink._hold = this;
                    sink._holdAdd = sink.add;
                    sink.add = holdAdd;
                    sink._holdEvent = sink.event;
                    sink.event = holdEvent;
                }

                return this.source.run(sink, scheduler);
            }
        }]);

        return Hold;
    })();

    function holdAdd(sink) {
        var len = this._holdAdd(sink);

        if (this._hold.time >= 0) {
            sink.event(this._hold.time, this._hold.value);
        }

        return len;
    }

    function holdEvent(t, x) {
        if (t >= this._hold.time) {
            this._hold.time = t;
            this._hold.value = x;
        }

        return this._holdEvent(t, x);
    }

    exports.default = hold;
});

},{"most/lib/source/MulticastSource":60}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.replay = replay;
exports.ReplaySource = ReplaySource;
var most = require('most');
var MulticastSource = require('most/lib/source/MulticastSource');
var PropagateTask = require('most/lib/scheduler/PropagateTask');
var CompoundDisposable = require('most/lib/disposable/dispose').all;
var Stream = most.Stream;

function replay(stream, maxBufferSize) {
  if (stream.source instanceof ReplaySource && source.maxBufferSize !== maxBufferSize) {
    return stream;
  }
  return new Stream(new ReplaySource(stream.source, maxBufferSize));
}

function ReplaySource(source, maxBufferSize) {
  this._buffer = [];
  this._ended = false;
  this.maxBufferSize = maxBufferSize || Infinity;
  MulticastSource.call(this, source);
}
ReplaySource.prototype = Object.create(MulticastSource.prototype);

ReplaySource.prototype._run = MulticastSource.prototype.run;
ReplaySource.prototype.run = function (sink, scheduler) {
  var buffer = this._buffer;
  var self = this;
  this.sink = sink;

  if (this._ended) {
    return replay();
  }
  if (buffer.length === 0) {
    return run();
  }
  return new CompoundDisposable([replay(), run()]);

  function replay() {
    return new BufferProducer(buffer.slice(0), sink, scheduler);
  }

  function run() {
    return self._run(sink, scheduler);
  }
};

ReplaySource.prototype._event = MulticastSource.prototype.event;
ReplaySource.prototype.event = function ReplaySource_event(t, x) {
  this._addToBuffer({ type: 0, t: t, x: x });
  this._event(t, x);
};

MulticastSource.prototype._addToBuffer = function ReplaySource_addToBuffer(event) {
  if (this._buffer.length >= this.maxBufferSize) {
    this._buffer.shift();
  }
  this._buffer.push(event);
};

MulticastSource.prototype.end = function (t, x, r) {
  MulticastSource;
  var s = this.sinks;
  if (s.length === 1) {
    s[0].end(t, x);
    return;
  }
  for (var i = 0; i < s.length; ++i) {
    if (i === s.length - 1) {
      if (r) {
        break; // don't end underlying stream
      }
    }
    s[i].end(t, x);
  };
};

ReplaySource.prototype._end = MulticastSource.prototype.end;
ReplaySource.prototype.end = function ReplaySource_end(t, x) {
  var self = this;
  this._ended = true;
  this._addToBuffer({ type: 1, t: t, x: x });
  this._end(t, x, this);
  this.add(this.sink); // add an extra sink so the last values can go through
  setTimeout(function () {
    self._end(t, x);
  }, 0); // dispose after values are propagated
};

MulticastSource.prototype.error = function (t, e, r) {
  var s = this.sinks;
  if (s.length === 1) {
    s[0].error(t, e);
    return;
  }
  for (var i = 0; i < s.length; ++i) {
    if (i === s.length - 1) {
      if (r) {
        break; // don't end underlying stream
      }
    }
    s[i].error(t, e);
  };
};

ReplaySource.prototype._error = MulticastSource.prototype.error;
ReplaySource.prototype.error = function ReplaySink_error(t, e) {
  var self = this;
  this._ended = true;
  this._buffer.push({ type: 2, t: t, x: e });
  this._error(t, e, this);
  this.add(this.sink);
  setTimeout(function () {
    self._error(t, e);
  }, 0);
};

function BufferProducer(buffer, sink, scheduler) {
  this.task = new PropagateTask(runProducer, buffer, sink);
  scheduler.asap(this.task);
}

BufferProducer.prototype.dispose = function () {
  return this.task.dispose();
};

function runProducer(t, buffer, sink) {
  var emit = function emit(item) {
    sink.event(item.t, item.x);
  };
  for (var i = 0, j = buffer.length; i < j && this.active; i++) {
    var item = buffer[i];
    switch (item.type) {
      case 0:
        emit(item);break;
      case 1:
        return this.active && sink.end(item.t, item.x);
      case 2:
        return this.active && sink.error(item.t, item.x);
    }
  }
}
},{"most":73,"most/lib/disposable/dispose":41,"most/lib/scheduler/PropagateTask":49,"most/lib/source/MulticastSource":60}],6:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Subscription = function () {
  function Subscription() {
    var _this = this;

    _classCallCheck(this, Subscription);

    this.run = function (sink, scheduler) {
      return _this._run(sink, scheduler);
    };
    this.add = this.next = function (x) {
      return _this._add(x);
    };
    this.error = function (err) {
      return _this._error(err);
    };
    this.end = this.complete = function (x) {
      return _this._end(x);
    };
  }

  _createClass(Subscription, [{
    key: "_run",
    value: function _run(sink, scheduler) {
      this.sink = sink;
      this.scheduler = scheduler;
      this.active = true;
      return this;
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this.active = false;
    }
  }, {
    key: "_add",
    value: function _add(x) {
      if (!this.active) {
        return;
      }
      tryEvent(this.sink, this.scheduler, x);
    }
  }, {
    key: "_error",
    value: function _error(e) {
      this.active = false;
      this.sink.error(this.scheduler.now(), e);
    }
  }, {
    key: "_end",
    value: function _end(x) {
      if (!this.active) {
        return;
      }
      this.active = false;
      tryEnd(this.sink, this.scheduler, x);
    }
  }]);

  return Subscription;
}();

function tryEvent(sink, scheduler, event) {
  try {
    sink.event(scheduler.now(), event);
  } catch (e) {
    sink.error(scheduler.now(), e);
  }
}

function tryEnd(sink, scheduler, event) {
  try {
    sink.end(scheduler.now(), event);
  } catch (e) {
    sink.error(scheduler.now(), e);
  }
}

exports.Subscription = Subscription;
},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.holdSubject = exports.subject = undefined;

var _most = require('most');

var _MulticastSource = require('most/lib/source/MulticastSource');

var _MulticastSource2 = _interopRequireDefault(_MulticastSource);

var _Subscription = require('./Subscription');

var _ReplaySource = require('./ReplaySource');

var _hold = require('@most/hold');

var _hold2 = _interopRequireDefault(_hold);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaults = {
  replay: false,
  bufferSize: 1
};

function create(replay, bufferSize, initialValue) {
  var sink = new _Subscription.Subscription();
  var stream = undefined;

  if (!replay) {
    stream = new _most.Stream(new _MulticastSource2.default(sink));
  } else {
    stream = bufferSize === 1 ? (0, _hold2.default)(new _most.Stream(sink)) : (0, _ReplaySource.replay)(new _most.Stream(sink), bufferSize);
  }

  stream.drain();

  if (typeof initialValue !== 'undefined') {
    sink.next(initialValue);
  }

  return { sink: sink, stream: stream, observer: sink };
}

function subject(initialValue) {
  return create(false, 1, initialValue);
}

function holdSubject() {
  var bufferSize = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
  var initialValue = arguments[1];

  return create(true, bufferSize, initialValue);
}

exports.subject = subject;
exports.holdSubject = holdSubject;
},{"./ReplaySource":5,"./Subscription":6,"@most/hold":4,"most":73,"most/lib/source/MulticastSource":60}],8:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

module.exports = LinkedList;

/**
 * Doubly linked list
 * @constructor
 */
function LinkedList() {
	this.head = null;
	this.length = 0;
}

/**
 * Add a node to the end of the list
 * @param {{prev:Object|null, next:Object|null, dispose:function}} x node to add
 */
LinkedList.prototype.add = function(x) {
	if(this.head !== null) {
		this.head.prev = x;
		x.next = this.head;
	}
	this.head = x;
	++this.length;
};

/**
 * Remove the provided node from the list
 * @param {{prev:Object|null, next:Object|null, dispose:function}} x node to remove
 */
LinkedList.prototype.remove = function(x) {
	--this.length;
	if(x === this.head) {
		this.head = this.head.next;
	}
	if(x.next !== null) {
		x.next.prev = x.prev;
		x.next = null;
	}
	if(x.prev !== null) {
		x.prev.next = x.next;
		x.prev = null;
	}
};

/**
 * @returns {boolean} true iff there are no nodes in the list
 */
LinkedList.prototype.isEmpty = function() {
	return this.length === 0;
};

/**
 * Dispose all nodes
 * @returns {Promise} promise that fulfills when all nodes have been disposed,
 *  or rejects if an error occurs while disposing
 */
LinkedList.prototype.dispose = function() {
	if(this.isEmpty()) {
		return Promise.resolve();
	}

	var promises = [];
	var x = this.head;
	this.head = null;
	this.length = 0;

	while(x !== null) {
		promises.push(x.dispose());
		x = x.next;
	}

	return Promise.all(promises);
};

},{}],9:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

exports.isPromise = isPromise;

function isPromise(p) {
	return p !== null && typeof p === 'object' && typeof p.then === 'function';
}

},{}],10:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

// Based on https://github.com/petkaantonov/deque

module.exports = Queue;

function Queue(capPow2) {
	this._capacity = capPow2||32;
	this._length = 0;
	this._head = 0;
}

Queue.prototype.push = function (x) {
	var len = this._length;
	this._checkCapacity(len + 1);

	var i = (this._head + len) & (this._capacity - 1);
	this[i] = x;
	this._length = len + 1;
};

Queue.prototype.shift = function () {
	var head = this._head;
	var x = this[head];

	this[head] = void 0;
	this._head = (head + 1) & (this._capacity - 1);
	this._length--;
	return x;
};

Queue.prototype.isEmpty = function() {
	return this._length === 0;
};

Queue.prototype.length = function () {
	return this._length;
};

Queue.prototype._checkCapacity = function (size) {
	if (this._capacity < size) {
		this._ensureCapacity(this._capacity << 1);
	}
};

Queue.prototype._ensureCapacity = function (capacity) {
	var oldCapacity = this._capacity;
	this._capacity = capacity;

	var last = this._head + this._length;

	if (last > oldCapacity) {
		copy(this, 0, this, oldCapacity, last & (oldCapacity - 1));
	}
};

function copy(src, srcIndex, dst, dstIndex, len) {
	for (var j = 0; j < len; ++j) {
		dst[j + dstIndex] = src[j + srcIndex];
		src[j + srcIndex] = void 0;
	}
}


},{}],11:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

module.exports = Stream;

function Stream(source) {
	this.source = source;
}

},{}],12:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

exports.noop = noop;
exports.identity = identity;
exports.compose = compose;
exports.apply = apply;

exports.cons = cons;
exports.append = append;
exports.drop = drop;
exports.tail = tail;
exports.copy = copy;
exports.map = map;
exports.reduce = reduce;
exports.replace = replace;
exports.remove = remove;
exports.removeAll = removeAll;
exports.findIndex = findIndex;
exports.isArrayLike = isArrayLike;

function noop() {}

function identity(x) {
	return x;
}

function compose(f, g) {
	return function(x) {
		return f(g(x));
	};
}

function apply(f, x) {
	return f(x);
}

function cons(x, array) {
	var l = array.length;
	var a = new Array(l + 1);
	a[0] = x;
	for(var i=0; i<l; ++i) {
		a[i + 1] = array[i];
	}
	return a;
}

function append(x, a) {
	var l = a.length;
	var b = new Array(l+1);
	for(var i=0; i<l; ++i) {
		b[i] = a[i];
	}

	b[l] = x;
	return b;
}

function drop(n, array) {
	var l = array.length;
	if(n >= l) {
		return [];
	}

	l -= n;
	var a = new Array(l);
	for(var i=0; i<l; ++i) {
		a[i] = array[n+i];
	}
	return a;
}

function tail(array) {
	return drop(1, array);
}

function copy(array) {
	var l = array.length;
	var a = new Array(l);
	for(var i=0; i<l; ++i) {
		a[i] = array[i];
	}
	return a;
}

function map(f, array) {
	var l = array.length;
	var a = new Array(l);
	for(var i=0; i<l; ++i) {
		a[i] = f(array[i]);
	}
	return a;
}

function reduce(f, z, array) {
	var r = z;
	for(var i=0, l=array.length; i<l; ++i) {
		r = f(r, array[i], i);
	}
	return r;
}

function replace(x, i, array) {
	var l = array.length;
	var a = new Array(l);
	for(var j=0; j<l; ++j) {
		a[j] = i === j ? x : array[j];
	}
	return a;
}

function remove(index, array) {
	var l = array.length;
	if(l === 0 || index >= array) { // exit early if index beyond end of array
		return array;
	}

	if(l === 1) { // exit early if index in bounds and length === 1
		return [];
	}

	return unsafeRemove(index, array, l-1);
}

function unsafeRemove(index, a, l) {
	var b = new Array(l);
	var i;
	for(i=0; i<index; ++i) {
		b[i] = a[i];
	}
	for(i=index; i<l; ++i) {
		b[i] = a[i+1];
	}

	return b;
}

function removeAll(f, a) {
	var l = a.length;
	var b = new Array(l);
	for(var x, i=0, j=0; i<l; ++i) {
		x = a[i];
		if(!f(x)) {
			b[j] = x;
			++j;
		}
	}

	b.length = j;
	return b;
}

function findIndex(x, a) {
	for (var i = 0, l = a.length; i < l; ++i) {
		if (x === a[i]) {
			return i;
		}
	}
	return -1;
}

function isArrayLike(x){
   return x != null && typeof x.length === 'number' && typeof x !== 'function';
}

},{}],13:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var Stream = require('../Stream');
var Pipe = require('../sink/Pipe');
var runSource = require('../runSource');
var cons = require('./build').cons;
var noop = require('../base').noop;

exports.scan = scan;
exports.reduce = reduce;

/**
 * Create a stream containing successive reduce results of applying f to
 * the previous reduce result and the current stream item.
 * @param {function(result:*, x:*):*} f reducer function
 * @param {*} initial initial value
 * @param {Stream} stream stream to scan
 * @returns {Stream} new stream containing successive reduce results
 */
function scan(f, initial, stream) {
	return cons(initial, new Stream(new Accumulate(ScanSink, f, initial, stream.source)));
}

function ScanSink(f, z, sink) {
	this.f = f;
	this.value = z;
	this.sink = sink;
}

ScanSink.prototype.event = function(t, x) {
	var f = this.f;
	this.value = f(this.value, x);
	this.sink.event(t, this.value);
};

ScanSink.prototype.error = Pipe.prototype.error;
ScanSink.prototype.end = Pipe.prototype.end;

/**
 * Reduce a stream to produce a single result.  Note that reducing an infinite
 * stream will return a Promise that never fulfills, but that may reject if an error
 * occurs.
 * @param {function(result:*, x:*):*} f reducer function
 * @param {*} initial initial value
 * @param {Stream} stream to reduce
 * @returns {Promise} promise for the file result of the reduce
 */
function reduce(f, initial, stream) {
	return runSource.withDefaultScheduler(noop, new Accumulate(AccumulateSink, f, initial, stream.source));
}

function Accumulate(SinkType, f, z, source) {
	this.SinkType = SinkType;
	this.f = f;
	this.value = z;
	this.source = source;
}

Accumulate.prototype.run = function(sink, scheduler) {
	return this.source.run(new this.SinkType(this.f, this.value, sink), scheduler);
};

function AccumulateSink(f, z, sink) {
	this.f = f;
	this.value = z;
	this.sink = sink;
}

AccumulateSink.prototype.event = function(t, x) {
	var f = this.f;
	this.value = f(this.value, x);
	this.sink.event(t, this.value);
};

AccumulateSink.prototype.error = Pipe.prototype.error;

AccumulateSink.prototype.end = function(t) {
	this.sink.end(t, this.value);
};

},{"../Stream":11,"../base":12,"../runSource":48,"../sink/Pipe":57,"./build":15}],14:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var combine = require('./combine').combine;
var apply = require('../base').apply;

exports.ap  = ap;

/**
 * Assume fs is a stream containing functions, and apply the latest function
 * in fs to the latest value in xs.
 * fs:         --f---------g--------h------>
 * xs:         -a-------b-------c-------d-->
 * ap(fs, xs): --fa-----fb-gb---gc--hc--hd->
 * @param {Stream} fs stream of functions to apply to the latest x
 * @param {Stream} xs stream of values to which to apply all the latest f
 * @returns {Stream} stream containing all the applications of fs to xs
 */
function ap(fs, xs) {
	return combine(apply, fs, xs);
}

},{"../base":12,"./combine":16}],15:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var streamOf = require('../source/core').of;
var continueWith = require('./continueWith').continueWith;

exports.concat = concat;
exports.cycle = cycle;
exports.cons = cons;

/**
 * @param {*} x value to prepend
 * @param {Stream} stream
 * @returns {Stream} new stream with x prepended
 */
function cons(x, stream) {
	return concat(streamOf(x), stream);
}

/**
 * @param {Stream} left
 * @param {Stream} right
 * @returns {Stream} new stream containing all events in left followed by all
 *  events in right.  This *timeshifts* right to the end of left.
 */
function concat(left, right) {
	return continueWith(function() {
		return right;
	}, left);
}

/**
 * Tie stream into a circle, creating an infinite stream
 * @param {Stream} stream
 * @returns {Stream} new infinite stream
 */
function cycle(stream) {
	return continueWith(function cycleNext() {
		return cycle(stream);
	}, stream);
}

},{"../source/core":62,"./continueWith":18}],16:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var Stream = require('../Stream');
var transform = require('./transform');
var core = require('../source/core');
var Pipe = require('../sink/Pipe');
var IndexSink = require('../sink/IndexSink');
var mergeSources = require('./merge').mergeSources;
var dispose = require('../disposable/dispose');
var base = require('../base');
var invoke = require('../invoke');

var hasValue = IndexSink.hasValue;

//var map = base.map;
var tail = base.tail;

exports.combineArray = combineArray;
exports.combine = combine;

/**
 * Combine latest events from all input streams
 * @param {function(...events):*} f function to combine most recent events
 * @returns {Stream} stream containing the result of applying f to the most recent
 *  event of each input stream, whenever a new event arrives on any stream.
 */
function combine(f /*, ...streams */) {
	return combineArray(f, tail(arguments));
}

/**
 * Combine latest events from all input streams
 * @param {function(...events):*} f function to combine most recent events
 * @param {[Stream]} streams most recent events
 * @returns {Stream} stream containing the result of applying f to the most recent
 *  event of each input stream, whenever a new event arrives on any stream.
 */
function combineArray(f, streams) {
	var l = streams.length;
	return l === 0 ? core.empty()
		 : l === 1 ? transform.map(f, streams[0])
		 : new Stream(mergeSources(CombineSink, f, streams));
}

function CombineSink(disposables, sinks, sink, f) {
	this.sink = sink;
	this.disposables = disposables;
	this.sinks = sinks;
	this.f = f;
	this.values = new Array(sinks.length);
	this.ready = false;
	this.activeCount = sinks.length;
}

CombineSink.prototype.error = Pipe.prototype.error;

CombineSink.prototype.event = function(t, indexedValue) {
	if(!this.ready) {
		this.ready = this.sinks.every(hasValue);
	}

	this.values[indexedValue.index] = indexedValue.value;
	if(this.ready) {
		this.sink.event(t, invoke(this.f, this.values));
	}
};

CombineSink.prototype.end = function(t, indexedValue) {
	dispose.tryDispose(t, this.disposables[indexedValue.index], this.sink);
	if(--this.activeCount === 0) {
		this.sink.end(t, indexedValue.value);
	}
};

},{"../Stream":11,"../base":12,"../disposable/dispose":41,"../invoke":46,"../sink/IndexSink":55,"../sink/Pipe":57,"../source/core":62,"./merge":25,"./transform":36}],17:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var mergeConcurrently = require('./mergeConcurrently').mergeConcurrently;
var map = require('./transform').map;

exports.concatMap = concatMap;

/**
 * Map each value in stream to a new stream, and concatenate them all
 * stream:              -a---b---cX
 * f(a):                 1-1-1-1X
 * f(b):                        -2-2-2-2X
 * f(c):                                -3-3-3-3X
 * stream.concatMap(f): -1-1-1-1-2-2-2-2-3-3-3-3X
 * @param {function(x:*):Stream} f function to map each value to a stream
 * @param {Stream} stream
 * @returns {Stream} new stream containing all events from each stream returned by f
 */
function concatMap(f, stream) {
	return mergeConcurrently(1, map(f, stream));
}

},{"./mergeConcurrently":26,"./transform":36}],18:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var Stream = require('../Stream');
var Sink = require('../sink/Pipe');
var dispose = require('../disposable/dispose');
var isPromise = require('../Promise').isPromise;

exports.continueWith = continueWith;

function continueWith(f, stream) {
	return new Stream(new ContinueWith(f, stream.source));
}

function ContinueWith(f, source) {
	this.f = f;
	this.source = source;
}

ContinueWith.prototype.run = function(sink, scheduler) {
	return new ContinueWithSink(this.f, this.source, sink, scheduler);
};

function ContinueWithSink(f, source, sink, scheduler) {
	this.f = f;
	this.sink = sink;
	this.scheduler = scheduler;
	this.active = true;
	this.disposable = dispose.once(source.run(this, scheduler));
}

ContinueWithSink.prototype.error = Sink.prototype.error;

ContinueWithSink.prototype.event = function(t, x) {
	if(!this.active) {
		return;
	}
	this.sink.event(t, x);
};

ContinueWithSink.prototype.end = function(t, x) {
	if(!this.active) {
		return;
	}

	var result = dispose.tryDispose(t, this.disposable, this.sink);
	this.disposable = isPromise(result)
		? dispose.promised(this._thenContinue(result, x))
		: this._continue(this.f, x);
};

ContinueWithSink.prototype._thenContinue = function(p, x) {
	var self = this;
	return p.then(function () {
		return self._continue(self.f, x);
	});
};

ContinueWithSink.prototype._continue = function(f, x) {
	return f(x).source.run(this.sink, this.scheduler);
};

ContinueWithSink.prototype.dispose = function() {
	this.active = false;
	return this.disposable.dispose();
};

},{"../Promise":9,"../Stream":11,"../disposable/dispose":41,"../sink/Pipe":57}],19:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var Stream = require('../Stream');
var Sink = require('../sink/Pipe');
var dispose = require('../disposable/dispose');
var PropagateTask = require('../scheduler/PropagateTask');

exports.delay = delay;

/**
 * @param {Number} delayTime milliseconds to delay each item
 * @param {Stream} stream
 * @returns {Stream} new stream containing the same items, but delayed by ms
 */
function delay(delayTime, stream) {
	return delayTime <= 0 ? stream
		 : new Stream(new Delay(delayTime, stream.source));
}

function Delay(dt, source) {
	this.dt = dt;
	this.source = source;
}

Delay.prototype.run = function(sink, scheduler) {
	var delaySink = new DelaySink(this.dt, sink, scheduler);
	return dispose.all([delaySink, this.source.run(delaySink, scheduler)]);
};

function DelaySink(dt, sink, scheduler) {
	this.dt = dt;
	this.sink = sink;
	this.scheduler = scheduler;
}

DelaySink.prototype.dispose = function() {
	var self = this;
	this.scheduler.cancelAll(function(task) {
		return task.sink === self.sink;
	});
};

DelaySink.prototype.event = function(t, x) {
	this.scheduler.delay(this.dt, PropagateTask.event(x, this.sink));
};

DelaySink.prototype.end = function(t, x) {
	this.scheduler.delay(this.dt, PropagateTask.end(x, this.sink));
};

DelaySink.prototype.error = Sink.prototype.error;

},{"../Stream":11,"../disposable/dispose":41,"../scheduler/PropagateTask":49,"../sink/Pipe":57}],20:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var Stream = require('../Stream');
var ValueSource = require('../source/ValueSource');
var tryDispose = require('../disposable/dispose').tryDispose;
var tryEvent = require('../source/tryEvent');
var apply = require('../base').apply;

exports.flatMapError = recoverWith;
exports.recoverWith  = recoverWith;
exports.throwError   = throwError;

/**
 * If stream encounters an error, recover and continue with items from stream
 * returned by f.
 * @param {function(error:*):Stream} f function which returns a new stream
 * @param {Stream} stream
 * @returns {Stream} new stream which will recover from an error by calling f
 */
function recoverWith(f, stream) {
	return new Stream(new RecoverWith(f, stream.source));
}

/**
 * Create a stream containing only an error
 * @param {*} e error value, preferably an Error or Error subtype
 * @returns {Stream} new stream containing only an error
 */
function throwError(e) {
	return new Stream(new ValueSource(error, e));
}

function error(t, e, sink) {
	sink.error(t, e);
}

function RecoverWith(f, source) {
	this.f = f;
	this.source = source;
}

RecoverWith.prototype.run = function(sink, scheduler) {
	return new RecoverWithSink(this.f, this.source, sink, scheduler);
};

function RecoverWithSink(f, source, sink, scheduler) {
	this.f = f;
	this.sink = sink;
	this.scheduler = scheduler;
	this.active = true;
	this.disposable = source.run(this, scheduler);
}

RecoverWithSink.prototype.error = function(t, e) {
	if(!this.active) {
		return;
	}

	// TODO: forward dispose errors
	tryDispose(t, this.disposable, this);

	var stream = apply(this.f, e);
	this.disposable = stream.source.run(this.sink, this.scheduler);
};

RecoverWithSink.prototype.event = function(t, x) {
	if(!this.active) {
		return;
	}
	tryEvent.tryEvent(t, x, this.sink);
};

RecoverWithSink.prototype.end = function(t, x) {
	if(!this.active) {
		return;
	}
	tryEvent.tryEnd(t, x, this.sink);
};

RecoverWithSink.prototype.dispose = function() {
	this.active = false;
	return this.disposable.dispose();
};

},{"../Stream":11,"../base":12,"../disposable/dispose":41,"../source/ValueSource":61,"../source/tryEvent":71}],21:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var Stream = require('../Stream');
var Sink = require('../sink/Pipe');
var Filter = require('../fusion/Filter');

exports.filter = filter;
exports.skipRepeats = skipRepeats;
exports.skipRepeatsWith = skipRepeatsWith;

/**
 * Retain only items matching a predicate
 * @param {function(x:*):boolean} p filtering predicate called for each item
 * @param {Stream} stream stream to filter
 * @returns {Stream} stream containing only items for which predicate returns truthy
 */
function filter(p, stream) {
	return new Stream(Filter.create(p, stream.source));
}

/**
 * Skip repeated events, using === to detect duplicates
 * @param {Stream} stream stream from which to omit repeated events
 * @returns {Stream} stream without repeated events
 */
function skipRepeats(stream) {
	return skipRepeatsWith(same, stream);
}

/**
 * Skip repeated events using the provided equals function to detect duplicates
 * @param {function(a:*, b:*):boolean} equals optional function to compare items
 * @param {Stream} stream stream from which to omit repeated events
 * @returns {Stream} stream without repeated events
 */
function skipRepeatsWith(equals, stream) {
	return new Stream(new SkipRepeats(equals, stream.source));
}

function SkipRepeats(equals, source) {
	this.equals = equals;
	this.source = source;
}

SkipRepeats.prototype.run = function(sink, scheduler) {
	return this.source.run(new SkipRepeatsSink(this.equals, sink), scheduler);
};

function SkipRepeatsSink(equals, sink) {
	this.equals = equals;
	this.sink = sink;
	this.value = void 0;
	this.init = true;
}

SkipRepeatsSink.prototype.end   = Sink.prototype.end;
SkipRepeatsSink.prototype.error = Sink.prototype.error;

SkipRepeatsSink.prototype.event = function(t, x) {
	if(this.init) {
		this.init = false;
		this.value = x;
		this.sink.event(t, x);
	} else if(!this.equals(this.value, x)) {
		this.value = x;
		this.sink.event(t, x);
	}
};

function same(a, b) {
	return a === b;
}

},{"../Stream":11,"../fusion/Filter":43,"../sink/Pipe":57}],22:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var mergeConcurrently = require('./mergeConcurrently').mergeConcurrently;
var map = require('./transform').map;

exports.flatMap = flatMap;
exports.join = join;

/**
 * Map each value in the stream to a new stream, and merge it into the
 * returned outer stream. Event arrival times are preserved.
 * @param {function(x:*):Stream} f chaining function, must return a Stream
 * @param {Stream} stream
 * @returns {Stream} new stream containing all events from each stream returned by f
 */
function flatMap(f, stream) {
	return join(map(f, stream));
}

/**
 * Monadic join. Flatten a Stream<Stream<X>> to Stream<X> by merging inner
 * streams to the outer. Event arrival times are preserved.
 * @param {Stream<Stream<X>>} stream stream of streams
 * @returns {Stream<X>} new stream containing all events of all inner streams
 */
function join(stream) {
	return mergeConcurrently(Infinity, stream);
}

},{"./mergeConcurrently":26,"./transform":36}],23:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var Stream = require('../Stream');
var Sink = require('../sink/Pipe');
var dispose = require('../disposable/dispose');
var PropagateTask = require('../scheduler/PropagateTask');

exports.throttle = throttle;
exports.debounce = debounce;

/**
 * Limit the rate of events by suppressing events that occur too often
 * @param {Number} period time to suppress events
 * @param {Stream} stream
 * @returns {Stream}
 */
function throttle(period, stream) {
	return new Stream(new Throttle(period, stream.source));
}

function Throttle(period, source) {
	this.dt = period;
	this.source = source;
}

Throttle.prototype.run = function(sink, scheduler) {
	return this.source.run(new ThrottleSink(this.dt, sink), scheduler);
};

function ThrottleSink(dt, sink) {
	this.time = 0;
	this.dt = dt;
	this.sink = sink;
}

ThrottleSink.prototype.event = function(t, x) {
	if(t >= this.time) {
		this.time = t + this.dt;
		this.sink.event(t, x);
	}
};

ThrottleSink.prototype.end   = Sink.prototype.end;

ThrottleSink.prototype.error = Sink.prototype.error;

/**
 * Wait for a burst of events to subside and emit only the last event in the burst
 * @param {Number} period events occuring more frequently than this
 *  will be suppressed
 * @param {Stream} stream stream to debounce
 * @returns {Stream} new debounced stream
 */
function debounce(period, stream) {
	return new Stream(new Debounce(period, stream.source));
}

function Debounce(dt, source) {
	this.dt = dt;
	this.source = source;
}

Debounce.prototype.run = function(sink, scheduler) {
	return new DebounceSink(this.dt, this.source, sink, scheduler);
};

function DebounceSink(dt, source, sink, scheduler) {
	this.dt = dt;
	this.sink = sink;
	this.scheduler = scheduler;
	this.value = void 0;
	this.timer = null;

	var sourceDisposable = source.run(this, scheduler);
	this.disposable = dispose.all([this, sourceDisposable]);
}

DebounceSink.prototype.event = function(t, x) {
	this._clearTimer();
	this.value = x;
	this.timer = this.scheduler.delay(this.dt, PropagateTask.event(x, this.sink));
};

DebounceSink.prototype.end = function(t, x) {
	if(this._clearTimer()) {
		this.sink.event(t, this.value);
		this.value = void 0;
	}
	this.sink.end(t, x);
};

DebounceSink.prototype.error = function(t, x) {
	this._clearTimer();
	this.sink.error(t, x);
};

DebounceSink.prototype.dispose = function() {
	this._clearTimer();
};

DebounceSink.prototype._clearTimer = function() {
	if(this.timer === null) {
		return false;
	}
	this.timer.cancel();
	this.timer = null;
	return true;
};

},{"../Stream":11,"../disposable/dispose":41,"../scheduler/PropagateTask":49,"../sink/Pipe":57}],24:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var Stream = require('../Stream');
var Pipe = require('../sink/Pipe');

exports.loop = loop;

/**
 * Generalized feedback loop. Call a stepper function for each event. The stepper
 * will be called with 2 params: the current seed and the an event value.  It must
 * return a new { seed, value } pair. The `seed` will be fed back into the next
 * invocation of stepper, and the `value` will be propagated as the event value.
 * @param {function(seed:*, value:*):{seed:*, value:*}} stepper loop step function
 * @param {*} seed initial seed value passed to first stepper call
 * @param {Stream} stream event stream
 * @returns {Stream} new stream whose values are the `value` field of the objects
 * returned by the stepper
 */
function loop(stepper, seed, stream) {
	return new Stream(new Loop(stepper, seed, stream.source));
}

function Loop(stepper, seed, source) {
	this.step = stepper;
	this.seed = seed;
	this.source = source;
}

Loop.prototype.run = function(sink, scheduler) {
	return this.source.run(new LoopSink(this.step, this.seed, sink), scheduler);
};

function LoopSink(stepper, seed, sink) {
	this.step = stepper;
	this.seed = seed;
	this.sink = sink;
}

LoopSink.prototype.error = Pipe.prototype.error;

LoopSink.prototype.event = function(t, x) {
	var result = this.step(this.seed, x);
	this.seed = result.seed;
	this.sink.event(t, result.value);
};

LoopSink.prototype.end = function(t) {
	this.sink.end(t, this.seed);
};

},{"../Stream":11,"../sink/Pipe":57}],25:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var Stream = require('../Stream');
var Pipe = require('../sink/Pipe');
var IndexSink = require('../sink/IndexSink');
var empty = require('../source/core').empty;
var dispose = require('../disposable/dispose');
var base = require('../base');

var copy = base.copy;
var map = base.map;

exports.merge = merge;
exports.mergeArray = mergeArray;
exports.mergeSources = mergeSources;

/**
 * @returns {Stream} stream containing events from all streams in the argument
 * list in time order.  If two events are simultaneous they will be merged in
 * arbitrary order.
 */
function merge(/*...streams*/) {
	return mergeArray(copy(arguments));
}

/**
 * @param {Array} streams array of stream to merge
 * @returns {Stream} stream containing events from all input observables
 * in time order.  If two events are simultaneous they will be merged in
 * arbitrary order.
 */
function mergeArray(streams) {
    var l = streams.length;
    return l === 0 ? empty()
		 : l === 1 ? streams[0]
		 : new Stream(mergeSources(MergeSink, void 0, streams));
}

function mergeSources(Sink, arg, streams) {
	return new Merge(Sink, arg, map(getSource, streams))
}

function getSource(stream) {
	return stream.source;
}

function Merge(Sink, arg, sources) {
	this.Sink = Sink;
	this.arg = arg;
	this.sources = sources;
}

Merge.prototype.run = function(sink, scheduler) {
	var l = this.sources.length;
	var disposables = new Array(l);
	var sinks = new Array(l);

	var mergeSink = new this.Sink(disposables, sinks, sink, this.arg);

	for(var indexSink, i=0; i<l; ++i) {
		indexSink = sinks[i] = new IndexSink(i, mergeSink);
		disposables[i] = this.sources[i].run(indexSink, scheduler);
	}

	return dispose.all(disposables);
};

function MergeSink(disposables, sinks, sink) {
	this.sink = sink;
	this.disposables = disposables;
	this.activeCount = sinks.length;
}

MergeSink.prototype.error = Pipe.prototype.error;

MergeSink.prototype.event = function(t, indexValue) {
	this.sink.event(t, indexValue.value);
};

MergeSink.prototype.end = function(t, indexedValue) {
	dispose.tryDispose(t, this.disposables[indexedValue.index], this.sink);
	if(--this.activeCount === 0) {
		this.sink.end(t, indexedValue.value);
	}
};

},{"../Stream":11,"../base":12,"../disposable/dispose":41,"../sink/IndexSink":55,"../sink/Pipe":57,"../source/core":62}],26:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var Stream = require('../Stream');
var dispose = require('../disposable/dispose');
var LinkedList = require('../LinkedList');

exports.mergeConcurrently = mergeConcurrently;

function mergeConcurrently(concurrency, stream) {
	return new Stream(new MergeConcurrently(concurrency, stream.source));
}

function MergeConcurrently(concurrency, source) {
	this.concurrency = concurrency;
	this.source = source;
}

MergeConcurrently.prototype.run = function(sink, scheduler) {
	return new Outer(this.concurrency, this.source, sink, scheduler);
};

function Outer(concurrency, source, sink, scheduler) {
	this.concurrency = concurrency;
	this.sink = sink;
	this.scheduler = scheduler;
	this.pending = [];
	this.current = new LinkedList();
	this.disposable = dispose.once(source.run(this, scheduler));
	this.active = true;
}

Outer.prototype.event = function(t, x) {
	this._addInner(t, x);
};

Outer.prototype._addInner = function(t, stream) {
	if(this.current.length < this.concurrency) {
		this._startInner(t, stream);
	} else {
		this.pending.push(stream);
	}
};

Outer.prototype._startInner = function(t, stream) {
	var innerSink = new Inner(t, this, this.sink);
	this.current.add(innerSink);
	innerSink.disposable = stream.source.run(innerSink, this.scheduler);
};

Outer.prototype.end = function(t, x) {
	this.active = false;
	this.disposable.dispose();
	this._checkEnd(t, x);
};

Outer.prototype.error = function(t, e) {
	this.active = false;
	this.sink.error(t, e);
};

Outer.prototype.dispose = function() {
	this.active = false;
	this.pending.length = 0;
	return Promise.all([this.disposable.dispose(), this.current.dispose()]);
};

Outer.prototype._endInner = function(t, x, inner) {
	this.current.remove(inner);
	dispose.tryDispose(t, inner, this);

	if(this.pending.length === 0) {
		this._checkEnd(t, x);
	} else {
		this._startInner(t, this.pending.shift());
	}
};

Outer.prototype._checkEnd = function(t, x) {
	if(!this.active && this.current.isEmpty()) {
		this.sink.end(t, x);
	}
};

function Inner(time, outer, sink) {
	this.prev = this.next = null;
	this.time = time;
	this.outer = outer;
	this.sink = sink;
	this.disposable = void 0;
}

Inner.prototype.event = function(t, x) {
	this.sink.event(Math.max(t, this.time), x);
};

Inner.prototype.end = function(t, x) {
	this.outer._endInner(Math.max(t, this.time), x, this);
};

Inner.prototype.error = function(t, e) {
	this.outer.error(Math.max(t, this.time), e);
};

Inner.prototype.dispose = function() {
	return this.disposable.dispose();
};

},{"../LinkedList":8,"../Stream":11,"../disposable/dispose":41}],27:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */
/** @contributor Maciej Ligenza */

var Stream = require('../Stream');
var MulticastSource = require('../source/MulticastSource');

exports.multicast = multicast;

/**
 * Transform the stream into a multicast stream, allowing it to be shared
 * more efficiently by many observers, without causing multiple invocation
 * of internal machinery.  Multicast is idempotent:
 * stream.multicast() === stream.multicast().multicast()
 * @param {Stream} stream to ensure is multicast.
 * @returns {Stream} new stream which will multicast events to all observers.
 */
function multicast(stream) {
	var source = stream.source;
	return source instanceof MulticastSource ? stream
		: new Stream(new MulticastSource(source));
}

},{"../Stream":11,"../source/MulticastSource":60}],28:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var runSource = require('../runSource');
var noop = require('../base').noop;

exports.observe = observe;
exports.drain = drain;

/**
 * Observe all the event values in the stream in time order. The
 * provided function `f` will be called for each event value
 * @param {function(x:T):*} f function to call with each event value
 * @param {Stream<T>} stream stream to observe
 * @return {Promise} promise that fulfills after the stream ends without
 *  an error, or rejects if the stream ends with an error.
 */
function observe(f, stream) {
	return runSource.withDefaultScheduler(f, stream.source);
}

/**
 * "Run" a stream by
 * @param stream
 * @return {*}
 */
function drain(stream) {
	return runSource.withDefaultScheduler(noop, stream.source);
}

},{"../base":12,"../runSource":48}],29:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var Stream = require('../Stream');
var fatal = require('../fatalError');

exports.fromPromise = fromPromise;
exports.awaitPromises = awaitPromises;

/**
 * Create a stream containing only the promise's fulfillment
 * value at the time it fulfills.
 * @param {Promise<T>} p promise
 * @return {Stream<T>} stream containing promise's fulfillment value.
 *  If the promise rejects, the stream will error
 */
function fromPromise(p) {
	return new Stream(new PromiseSource(p));
}

function PromiseSource(p) {
	this.promise = p;
}

PromiseSource.prototype.run = function(sink, scheduler) {
	return new PromiseProducer(this.promise, sink, scheduler);
};

function PromiseProducer(p, sink, scheduler) {
	this.sink = sink;
	this.scheduler = scheduler;
	this.active = true;

	var self = this;
	Promise.resolve(p).then(function(x) {
		self._emit(self.scheduler.now(), x);
	}).catch(function(e) {
		self._error(self.scheduler.now(), e);
	});
}

PromiseProducer.prototype._emit = function(t, x) {
	if(!this.active) {
		return;
	}

	this.sink.event(t, x);
	this.sink.end(t, void 0);
};

PromiseProducer.prototype._error = function(t, e) {
	if(!this.active) {
		return;
	}

	this.sink.error(t, e);
};

PromiseProducer.prototype.dispose = function() {
	this.active = false;
};

/**
 * Turn a Stream<Promise<T>> into Stream<T> by awaiting each promise.
 * Event order is preserved.
 * @param {Stream<Promise<T>>} stream
 * @return {Stream<T>} stream of fulfillment values.  The stream will
 * error if any promise rejects.
 */
function awaitPromises(stream) {
	return new Stream(new Await(stream.source));
}

function Await(source) {
	this.source = source;
}

Await.prototype.run = function(sink, scheduler) {
	return this.source.run(new AwaitSink(sink, scheduler), scheduler);
};

function AwaitSink(sink, scheduler) {
	this.sink = sink;
	this.scheduler = scheduler;
	this.queue = Promise.resolve();
	var self = this;

	// Pre-create closures, to avoid creating them per event
	this._eventBound = function(x) {
		self.sink.event(self.scheduler.now(), x);
	};

	this._endBound = function(x) {
		self.sink.end(self.scheduler.now(), x);
	};

	this._errorBound = function(e) {
		self.sink.error(self.scheduler.now(), e);
	};
}

AwaitSink.prototype.event = function(t, promise) {
	var self = this;
	this.queue = this.queue.then(function() {
		return self._event(promise);
	}).catch(this._errorBound);
};

AwaitSink.prototype.end = function(t, x) {
	var self = this;
	this.queue = this.queue.then(function() {
		return self._end(x);
	}).catch(this._errorBound);
};

AwaitSink.prototype.error = function(t, e) {
	var self = this;
	// Don't resolve error values, propagate directly
	this.queue = this.queue.then(function() {
		return self._errorBound(e);
	}).catch(fatal);
};

AwaitSink.prototype._event = function(promise) {
	return promise.then(this._eventBound);
};

AwaitSink.prototype._end = function(x) {
	return Promise.resolve(x).then(this._endBound);
};

},{"../Stream":11,"../fatalError":42}],30:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var Stream = require('../Stream');
var Pipe = require('../sink/Pipe');
var dispose = require('../disposable/dispose');
var base = require('../base');
var invoke = require('../invoke');

exports.sample = sample;
exports.sampleWith = sampleWith;
exports.sampleArray = sampleArray;

/**
 * When an event arrives on sampler, emit the result of calling f with the latest
 * values of all streams being sampled
 * @param {function(...values):*} f function to apply to each set of sampled values
 * @param {Stream} sampler streams will be sampled whenever an event arrives
 *  on sampler
 * @returns {Stream} stream of sampled and transformed values
 */
function sample(f, sampler /*, ...streams */) {
	return sampleArray(f, sampler, base.drop(2, arguments));
}

/**
 * When an event arrives on sampler, emit the latest event value from stream.
 * @param {Stream} sampler stream of events at whose arrival time
 *  stream's latest value will be propagated
 * @param {Stream} stream stream of values
 * @returns {Stream} sampled stream of values
 */
function sampleWith(sampler, stream) {
	return new Stream(new Sampler(base.identity, sampler.source, [stream.source]));
}

function sampleArray(f, sampler, streams) {
	return new Stream(new Sampler(f, sampler.source, base.map(getSource, streams)));
}

function getSource(stream) {
	return stream.source;
}

function Sampler(f, sampler, sources) {
	this.f = f;
	this.sampler = sampler;
	this.sources = sources;
}

Sampler.prototype.run = function(sink, scheduler) {
	var l = this.sources.length;
	var disposables = new Array(l+1);
	var sinks = new Array(l);

	var sampleSink = new SampleSink(this.f, sinks, sink);

	for(var hold, i=0; i<l; ++i) {
		hold = sinks[i] = new Hold(sampleSink);
		disposables[i] = this.sources[i].run(hold, scheduler);
	}

	disposables[i] = this.sampler.run(sampleSink, scheduler);

	return dispose.all(disposables);
};

function Hold(sink) {
	this.sink = sink;
	this.hasValue = false;
}

Hold.prototype.event = function(t, x) {
	this.value = x;
	this.hasValue = true;
	this.sink._notify(this);
};

Hold.prototype.end = base.noop;
Hold.prototype.error = Pipe.prototype.error;

function SampleSink(f, sinks, sink) {
	this.f = f;
	this.sinks = sinks;
	this.sink = sink;
	this.active = false;
}

SampleSink.prototype._notify = function() {
	if(!this.active) {
		this.active = this.sinks.every(hasValue);
	}
};

SampleSink.prototype.event = function(t) {
	if(this.active) {
		this.sink.event(t, invoke(this.f, base.map(getValue, this.sinks)));
	}
};

SampleSink.prototype.end = Pipe.prototype.end;
SampleSink.prototype.error = Pipe.prototype.error;

function hasValue(hold) {
	return hold.hasValue;
}

function getValue(hold) {
	return hold.value;
}

},{"../Stream":11,"../base":12,"../disposable/dispose":41,"../invoke":46,"../sink/Pipe":57}],31:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var Stream = require('../Stream');
var Sink = require('../sink/Pipe');
var core = require('../source/core');
var dispose = require('../disposable/dispose');

exports.take = take;
exports.skip = skip;
exports.slice = slice;
exports.takeWhile = takeWhile;
exports.skipWhile = skipWhile;

/**
 * @param {number} n
 * @param {Stream} stream
 * @returns {Stream} new stream containing only up to the first n items from stream
 */
function take(n, stream) {
	return slice(0, n, stream);
}

/**
 * @param {number} n
 * @param {Stream} stream
 * @returns {Stream} new stream with the first n items removed
 */
function skip(n, stream) {
	return slice(n, Infinity, stream);
}

/**
 * Slice a stream by index. Negative start/end indexes are not supported
 * @param {number} start
 * @param {number} end
 * @param {Stream} stream
 * @returns {Stream} stream containing items where start <= index < end
 */
function slice(start, end, stream) {
	return end <= start ? core.empty()
		: new Stream(new Slice(start, end, stream.source));
}

function Slice(min, max, source) {
	this.skip = min;
	this.take = max - min;
	this.source = source;
}

Slice.prototype.run = function(sink, scheduler) {
	return new SliceSink(this.skip, this.take, this.source, sink, scheduler);
};

function SliceSink(skip, take, source, sink, scheduler) {
	this.skip = skip;
	this.take = take;
	this.sink = sink;
	this.disposable = dispose.once(source.run(this, scheduler));
}

SliceSink.prototype.end   = Sink.prototype.end;
SliceSink.prototype.error = Sink.prototype.error;

SliceSink.prototype.event = function(t, x) {
	if(this.skip > 0) {
		this.skip -= 1;
		return;
	}

	if(this.take === 0) {
		return;
	}

	this.take -= 1;
	this.sink.event(t, x);
	if(this.take === 0) {
		this.dispose();
		this.sink.end(t, x);
	}
};

SliceSink.prototype.dispose = function() {
	return this.disposable.dispose();
};

function takeWhile(p, stream) {
	return new Stream(new TakeWhile(p, stream.source));
}

function TakeWhile(p, source) {
	this.p = p;
	this.source = source;
}

TakeWhile.prototype.run = function(sink, scheduler) {
	return new TakeWhileSink(this.p, this.source, sink, scheduler);
};

function TakeWhileSink(p, source, sink, scheduler) {
	this.p = p;
	this.sink = sink;
	this.active = true;
	this.disposable = dispose.once(source.run(this, scheduler));
}

TakeWhileSink.prototype.end   = Sink.prototype.end;
TakeWhileSink.prototype.error = Sink.prototype.error;

TakeWhileSink.prototype.event = function(t, x) {
	if(!this.active) {
		return;
	}

	var p = this.p;
	this.active = p(x);
	if(this.active) {
		this.sink.event(t, x);
	} else {
		this.dispose();
		this.sink.end(t, x);
	}
};

TakeWhileSink.prototype.dispose = function() {
	return this.disposable.dispose();
};

function skipWhile(p, stream) {
	return new Stream(new SkipWhile(p, stream.source));
}

function SkipWhile(p, source) {
	this.p = p;
	this.source = source;
}

SkipWhile.prototype.run = function(sink, scheduler) {
	return this.source.run(new SkipWhileSink(this.p, sink), scheduler);
};

function SkipWhileSink(p, sink) {
	this.p = p;
	this.sink = sink;
	this.skipping = true;
}

SkipWhileSink.prototype.end   = Sink.prototype.end;
SkipWhileSink.prototype.error = Sink.prototype.error;

SkipWhileSink.prototype.event = function(t, x) {
	if(this.skipping) {
		var p = this.p;
		this.skipping = p(x);
		if(this.skipping) {
			return;
		}
	}

	this.sink.event(t, x);
};

},{"../Stream":11,"../disposable/dispose":41,"../sink/Pipe":57,"../source/core":62}],32:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var Stream = require('../Stream');
var MulticastSource = require('../source/MulticastSource');
var until = require('./timeslice').takeUntil;
var mergeConcurrently = require('./mergeConcurrently').mergeConcurrently;
var map = require('./transform').map;

exports.switch = switchLatest;

/**
 * Given a stream of streams, return a new stream that adopts the behavior
 * of the most recent inner stream.
 * @param {Stream} stream of streams on which to switch
 * @returns {Stream} switching stream
 */
function switchLatest(stream) {
	var upstream = new Stream(new MulticastSource(stream.source));

	return mergeConcurrently(1, map(untilNext, upstream));

	function untilNext(s) {
		return until(upstream, s);
	}
}

},{"../Stream":11,"../source/MulticastSource":60,"./mergeConcurrently":26,"./timeslice":33,"./transform":36}],33:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var Stream = require('../Stream');
var Pipe = require('../sink/Pipe');
var dispose = require('../disposable/dispose');
var join = require('../combinator/flatMap').join;
var noop = require('../base').noop;

exports.during    = during;
exports.takeUntil = takeUntil;
exports.skipUntil = skipUntil;

function takeUntil(signal, stream) {
	return new Stream(new Until(signal.source, stream.source));
}

function skipUntil(signal, stream) {
	return new Stream(new Since(signal.source, stream.source));
}

function during(timeWindow, stream) {
	return takeUntil(join(timeWindow), skipUntil(timeWindow, stream));
}

function Until(maxSignal, source) {
	this.maxSignal = maxSignal;
	this.source = source;
}

Until.prototype.run = function(sink, scheduler) {
	var min = new Bound(-Infinity, sink);
	var max = new UpperBound(this.maxSignal, sink, scheduler);
	var disposable = this.source.run(new TimeWindowSink(min, max, sink), scheduler);

	return dispose.all([min, max, disposable]);
};

function Since(minSignal, source) {
	this.minSignal = minSignal;
	this.source = source;
}

Since.prototype.run = function(sink, scheduler) {
	var min = new LowerBound(this.minSignal, sink, scheduler);
	var max = new Bound(Infinity, sink);
	var disposable = this.source.run(new TimeWindowSink(min, max, sink), scheduler);

	return dispose.all([min, max, disposable]);
};

function Bound(value, sink) {
	this.value = value;
	this.sink = sink;
}

Bound.prototype.error = Pipe.prototype.error;
Bound.prototype.event = noop;
Bound.prototype.end = noop;
Bound.prototype.dispose = noop;

function TimeWindowSink(min, max, sink) {
	this.min = min;
	this.max = max;
	this.sink = sink;
}

TimeWindowSink.prototype.event = function(t, x) {
	if(t >= this.min.value && t < this.max.value) {
		this.sink.event(t, x);
	}
};

TimeWindowSink.prototype.error = Pipe.prototype.error;
TimeWindowSink.prototype.end = Pipe.prototype.end;

function LowerBound(signal, sink, scheduler) {
	this.value = Infinity;
	this.sink = sink;
	this.disposable = signal.run(this, scheduler);
}

LowerBound.prototype.event = function(t /*, x */) {
	if(t < this.value) {
		this.value = t;
	}
};

LowerBound.prototype.end = noop;
LowerBound.prototype.error = Pipe.prototype.error;

LowerBound.prototype.dispose = function() {
	return this.disposable.dispose();
};

function UpperBound(signal, sink, scheduler) {
	this.value = Infinity;
	this.sink = sink;
	this.disposable = signal.run(this, scheduler);
}

UpperBound.prototype.event = function(t, x) {
	if(t < this.value) {
		this.value = t;
		this.sink.end(t, x);
	}
};

UpperBound.prototype.end = noop;
UpperBound.prototype.error = Pipe.prototype.error;

UpperBound.prototype.dispose = function() {
	return this.disposable.dispose();
};

},{"../Stream":11,"../base":12,"../combinator/flatMap":22,"../disposable/dispose":41,"../sink/Pipe":57}],34:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var Stream = require('../Stream');
var Sink = require('../sink/Pipe');

exports.timestamp = timestamp;

function timestamp(stream) {
	return new Stream(new Timestamp(stream.source));
}

function Timestamp(source) {
	this.source = source;
}

Timestamp.prototype.run = function(sink, scheduler) {
	return this.source.run(new TimestampSink(sink), scheduler);
};

function TimestampSink(sink) {
	this.sink = sink;
}

TimestampSink.prototype.end   = Sink.prototype.end;
TimestampSink.prototype.error = Sink.prototype.error;

TimestampSink.prototype.event = function(t, x) {
	this.sink.event(t, { time: t, value: x });
};

},{"../Stream":11,"../sink/Pipe":57}],35:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var Stream = require('../Stream');

exports.transduce = transduce;

/**
 * Transform a stream by passing its events through a transducer.
 * @param  {function} transducer transducer function
 * @param  {Stream} stream stream whose events will be passed through the
 *  transducer
 * @return {Stream} stream of events transformed by the transducer
 */
function transduce(transducer, stream) {
	return new Stream(new Transduce(transducer, stream.source));
}

function Transduce(transducer, source) {
	this.transducer = transducer;
	this.source = source;
}

Transduce.prototype.run = function(sink, scheduler) {
	var xf = this.transducer(new Transformer(sink));
	return this.source.run(new TransduceSink(getTxHandler(xf), sink), scheduler);
};

function TransduceSink(adapter, sink) {
	this.xf = adapter;
	this.sink = sink;
}

TransduceSink.prototype.event = function(t, x) {
	var next = this.xf.step(t, x);

	return this.xf.isReduced(next)
		? this.sink.end(t, this.xf.getResult(next))
		: next;
};

TransduceSink.prototype.end = function(t, x) {
	return this.xf.result(x);
};

TransduceSink.prototype.error = function(t, e) {
	return this.sink.error(t, e);
};

function Transformer(sink) {
	this.time = -Infinity;
	this.sink = sink;
}

Transformer.prototype['@@transducer/init'] = Transformer.prototype.init = function() {};

Transformer.prototype['@@transducer/step'] = Transformer.prototype.step = function(t, x) {
	if(!isNaN(t)) {
		this.time = Math.max(t, this.time);
	}
	return this.sink.event(this.time, x);
};

Transformer.prototype['@@transducer/result'] = Transformer.prototype.result = function(x) {
	return this.sink.end(this.time, x);
};

/**
 * Given an object supporting the new or legacy transducer protocol,
 * create an adapter for it.
 * @param {object} tx transform
 * @returns {TxAdapter|LegacyTxAdapter}
 */
function getTxHandler(tx) {
	return typeof tx['@@transducer/step'] === 'function'
		? new TxAdapter(tx)
		: new LegacyTxAdapter(tx);
}

/**
 * Adapter for new official transducer protocol
 * @param {object} tx transform
 * @constructor
 */
function TxAdapter(tx) {
	this.tx = tx;
}

TxAdapter.prototype.step = function(t, x) {
	return this.tx['@@transducer/step'](t, x);
};
TxAdapter.prototype.result = function(x) {
	return this.tx['@@transducer/result'](x);
};
TxAdapter.prototype.isReduced = function(x) {
	return x != null && x['@@transducer/reduced'];
};
TxAdapter.prototype.getResult = function(x) {
	return x['@@transducer/value'];
};

/**
 * Adapter for older transducer protocol
 * @param {object} tx transform
 * @constructor
 */
function LegacyTxAdapter(tx) {
	this.tx = tx;
}

LegacyTxAdapter.prototype.step = function(t, x) {
	return this.tx.step(t, x);
};
LegacyTxAdapter.prototype.result = function(x) {
	return this.tx.result(x);
};
LegacyTxAdapter.prototype.isReduced = function(x) {
	return x != null && x.__transducers_reduced__;
};
LegacyTxAdapter.prototype.getResult = function(x) {
	return x.value;
};

},{"../Stream":11}],36:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var Stream = require('../Stream');
var Map = require('../fusion/Map');

exports.map = map;
exports.constant = constant;
exports.tap = tap;

/**
 * Transform each value in the stream by applying f to each
 * @param {function(*):*} f mapping function
 * @param {Stream} stream stream to map
 * @returns {Stream} stream containing items transformed by f
 */
function map(f, stream) {
	return new Stream(Map.create(f, stream.source));
}

/**
 * Replace each value in the stream with x
 * @param {*} x
 * @param {Stream} stream
 * @returns {Stream} stream containing items replaced with x
 */
function constant(x, stream) {
	return map(function() {
		return x;
	}, stream);
}

/**
 * Perform a side effect for each item in the stream
 * @param {function(x:*):*} f side effect to execute for each item. The
 *  return value will be discarded.
 * @param {Stream} stream stream to tap
 * @returns {Stream} new stream containing the same items as this stream
 */
function tap(f, stream) {
	return map(function(x) {
		f(x);
		return x;
	}, stream);
}

},{"../Stream":11,"../fusion/Map":45}],37:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var Stream = require('../Stream');
var transform = require('./transform');
var core = require('../source/core');
var Sink = require('../sink/Pipe');
var IndexSink = require('../sink/IndexSink');
var dispose = require('../disposable/dispose');
var base = require('../base');
var invoke = require('../invoke');
var Queue = require('../Queue');

var map = base.map;
var tail = base.tail;

exports.zip = zip;
exports.zipArray = zipArray;

/**
 * Combine streams pairwise (or tuple-wise) by index by applying f to values
 * at corresponding indices.  The returned stream ends when any of the input
 * streams ends.
 * @param {function} f function to combine values
 * @returns {Stream} new stream with items at corresponding indices combined
 *  using f
 */
function zip(f /*,...streams */) {
	return zipArray(f, tail(arguments));
}

/**
 * Combine streams pairwise (or tuple-wise) by index by applying f to values
 * at corresponding indices.  The returned stream ends when any of the input
 * streams ends.
 * @param {function} f function to combine values
 * @param {[Stream]} streams streams to zip using f
 * @returns {Stream} new stream with items at corresponding indices combined
 *  using f
 */
function zipArray(f, streams) {
	return streams.length === 0 ? core.empty()
		 : streams.length === 1 ? transform.map(f, streams[0])
		 : new Stream(new Zip(f, map(getSource, streams)));
}

function getSource(stream) {
	return stream.source;
}

function Zip(f, sources) {
	this.f = f;
	this.sources = sources;
}

Zip.prototype.run = function(sink, scheduler) {
	var l = this.sources.length;
	var disposables = new Array(l);
	var sinks = new Array(l);
	var buffers = new Array(l);

	var zipSink = new ZipSink(this.f, buffers, sinks, sink);

	for(var indexSink, i=0; i<l; ++i) {
		buffers[i] = new Queue();
		indexSink = sinks[i] = new IndexSink(i, zipSink);
		disposables[i] = this.sources[i].run(indexSink, scheduler);
	}

	return dispose.all(disposables);
};

function ZipSink(f, buffers, sinks, sink) {
	this.f = f;
	this.sinks = sinks;
	this.sink = sink;
	this.buffers = buffers;
}

ZipSink.prototype.event = function(t, indexedValue) {
	var buffers = this.buffers;
	var buffer = buffers[indexedValue.index];

	buffer.push(indexedValue.value);

	if(buffer.length() === 1) {
		if(!ready(this.buffers)) {
			return;
		}

		emitZipped(this.f, t, buffers, this.sink);

		if (ended(this.buffers, this.sinks)) {
			this.sink.end(t, void 0);
		}
	}
};

ZipSink.prototype.end = function(t, indexedValue) {
	var buffer = this.buffers[indexedValue.index];
	if(buffer.isEmpty()) {
		this.sink.end(t, indexedValue.value);
	}
};

ZipSink.prototype.error = Sink.prototype.error;

function emitZipped (f, t, buffers, sink) {
	sink.event(t, invoke(f, map(head, buffers)));
}

function head(buffer) {
	return buffer.shift();
}

function ended(buffers, sinks) {
	for(var i=0, l=buffers.length; i<l; ++i) {
		if(buffers[i].isEmpty() && !sinks[i].active) {
			return true;
		}
	}
	return false;
}

function ready(buffers) {
	for(var i=0, l=buffers.length; i<l; ++i) {
		if(buffers[i].isEmpty()) {
			return false;
		}
	}
	return true;
}

},{"../Queue":10,"../Stream":11,"../base":12,"../disposable/dispose":41,"../invoke":46,"../sink/IndexSink":55,"../sink/Pipe":57,"../source/core":62,"./transform":36}],38:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

module.exports = defer;

function defer(task) {
	return Promise.resolve(task).then(runTask);
}

function runTask(task) {
	try {
		return task.run();
	} catch(e) {
		return task.error(e);
	}
}

},{}],39:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

module.exports = Disposable;

/**
 * Create a new Disposable which will dispose its underlying resource.
 * @param {function} dispose function
 * @param {*?} data any data to be passed to disposer function
 * @constructor
 */
function Disposable(dispose, data) {
	this._dispose = dispose;
	this._data = data;
}

Disposable.prototype.dispose = function() {
	return this._dispose(this._data);
};

},{}],40:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

module.exports = SettableDisposable;

function SettableDisposable() {
	this.disposable = void 0;
	this.disposed = false;
	this._resolve = void 0;

	var self = this;
	this.result = new Promise(function(resolve) {
		self._resolve = resolve;
	});
}

SettableDisposable.prototype.setDisposable = function(disposable) {
	if(this.disposable !== void 0) {
		throw new Error('setDisposable called more than once');
	}

	this.disposable = disposable;

	if(this.disposed) {
		this._resolve(disposable.dispose());
	}
};

SettableDisposable.prototype.dispose = function() {
	if(this.disposed) {
		return this.result;
	}

	this.disposed = true;

	if(this.disposable !== void 0) {
		this.result = this.disposable.dispose();
	}

	return this.result;
};

},{}],41:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var Disposable = require('./Disposable');
var SettableDisposable = require('./SettableDisposable');
var isPromise = require('../Promise').isPromise;
var base = require('../base');

var map = base.map;
var identity = base.identity;

exports.tryDispose = tryDispose;
exports.create = create;
exports.once = once;
exports.empty = empty;
exports.all = all;
exports.settable = settable;
exports.promised = promised;

/**
 * Call disposable.dispose.  If it returns a promise, catch promise
 * error and forward it through the provided sink.
 * @param {number} t time
 * @param {{dispose: function}} disposable
 * @param {{error: function}} sink
 * @return {*} result of disposable.dispose
 */
function tryDispose(t, disposable, sink) {
	var result = disposeSafely(disposable);
	return isPromise(result)
		? result.catch(function (e) {
			sink.error(t, e);
		})
		: result;
}

/**
 * Create a new Disposable which will dispose its underlying resource
 * at most once.
 * @param {function} dispose function
 * @param {*?} data any data to be passed to disposer function
 * @return {Disposable}
 */
function create(dispose, data) {
	return once(new Disposable(dispose, data));
}

/**
 * Create a noop disposable. Can be used to satisfy a Disposable
 * requirement when no actual resource needs to be disposed.
 * @return {Disposable|exports|module.exports}
 */
function empty() {
	return new Disposable(identity, void 0);
}

/**
 * Create a disposable that will dispose all input disposables in parallel.
 * @param {Array<Disposable>} disposables
 * @return {Disposable}
 */
function all(disposables) {
	return create(disposeAll, disposables);
}

function disposeAll(disposables) {
	return Promise.all(map(disposeSafely, disposables));
}

function disposeSafely(disposable) {
	try {
		return disposable.dispose();
	} catch(e) {
		return Promise.reject(e);
	}
}

/**
 * Create a disposable from a promise for another disposable
 * @param {Promise<Disposable>} disposablePromise
 * @return {Disposable}
 */
function promised(disposablePromise) {
	return create(disposePromise, disposablePromise);
}

function disposePromise(disposablePromise) {
	return disposablePromise.then(disposeOne);
}

function disposeOne(disposable) {
	return disposable.dispose();
}

/**
 * Create a disposable proxy that allows its underlying disposable to
 * be set later.
 * @return {SettableDisposable}
 */
function settable() {
	return new SettableDisposable();
}

/**
 * Wrap an existing disposable (which may not already have been once()d)
 * so that it will only dispose its underlying resource at most once.
 * @param {{ dispose: function() }} disposable
 * @return {Disposable} wrapped disposable
 */
function once(disposable) {
	return new Disposable(disposeMemoized, memoized(disposable));
}

function disposeMemoized(memoized) {
	if(!memoized.disposed) {
		memoized.disposed = true;
		memoized.value = disposeSafely(memoized.disposable);
		memoized.disposable = void 0;
	}

	return memoized.value;
}

function memoized(disposable) {
	return { disposed: false, disposable: disposable, value: void 0 };
}

},{"../Promise":9,"../base":12,"./Disposable":39,"./SettableDisposable":40}],42:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

module.exports = fatalError;

function fatalError (e) {
	setTimeout(function() {
		throw e;
	}, 0);
}

},{}],43:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var Pipe = require('../sink/Pipe');

module.exports = Filter;

function Filter(p, source) {
	this.p = p;
	this.source = source;
}

/**
 * Create a filtered source, fusing adjacent filter.filter if possible
 * @param {function(x:*):boolean} p filtering predicate
 * @param {{run:function}} source source to filter
 * @returns {Filter} filtered source
 */
Filter.create = function createFilter(p, source) {
	if (source instanceof Filter) {
		return new Filter(and(source.p, p), source.source);
	}

	return new Filter(p, source);
};

Filter.prototype.run = function(sink, scheduler) {
	return this.source.run(new FilterSink(this.p, sink), scheduler);
};

function FilterSink(p, sink) {
	this.p = p;
	this.sink = sink;
}

FilterSink.prototype.end   = Pipe.prototype.end;
FilterSink.prototype.error = Pipe.prototype.error;

FilterSink.prototype.event = function(t, x) {
	var p = this.p;
	p(x) && this.sink.event(t, x);
};

function and(p, q) {
	return function(x) {
		return p(x) && q(x);
	};
}

},{"../sink/Pipe":57}],44:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var Pipe = require('../sink/Pipe');

module.exports = FilterMap;

function FilterMap(p, f, source) {
	this.p = p;
	this.f = f;
	this.source = source;
}

FilterMap.prototype.run = function(sink, scheduler) {
	return this.source.run(new FilterMapSink(this.p, this.f, sink), scheduler);
};

function FilterMapSink(p, f, sink) {
	this.p = p;
	this.f = f;
	this.sink = sink;
}

FilterMapSink.prototype.event = function(t, x) {
	var f = this.f;
	var p = this.p;
	p(x) && this.sink.event(t, f(x));
};

FilterMapSink.prototype.end = Pipe.prototype.end;
FilterMapSink.prototype.error = Pipe.prototype.error;

},{"../sink/Pipe":57}],45:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var Pipe = require('../sink/Pipe');
var Filter = require('./Filter');
var FilterMap = require('./FilterMap');
var base = require('../base');

module.exports = Map;

function Map(f, source) {
	this.f = f;
	this.source = source;
}

/**
 * Create a mapped source, fusing adjacent map.map, filter.map,
 * and filter.map.map if possible
 * @param {function(*):*} f mapping function
 * @param {{run:function}} source source to map
 * @returns {Map|FilterMap} mapped source, possibly fused
 */
Map.create = function createMap(f, source) {
	if(source instanceof Map) {
		return new Map(base.compose(f, source.f), source.source);
	}

	if(source instanceof Filter) {
		return new FilterMap(source.p, f, source.source);
	}

	if(source instanceof FilterMap) {
		return new FilterMap(source.p, base.compose(f, source.f), source.source);
	}

	return new Map(f, source);
};

Map.prototype.run = function(sink, scheduler) {
	return this.source.run(new MapSink(this.f, sink), scheduler);
};

function MapSink(f, sink) {
	this.f = f;
	this.sink = sink;
}

MapSink.prototype.end   = Pipe.prototype.end;
MapSink.prototype.error = Pipe.prototype.error;

MapSink.prototype.event = function(t, x) {
	var f = this.f;
	this.sink.event(t, f(x));
};

},{"../base":12,"../sink/Pipe":57,"./Filter":43,"./FilterMap":44}],46:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

module.exports = invoke;

function invoke(f, args) {
	/*eslint complexity: [2,7]*/
	switch(args.length) {
		case 0: return f();
		case 1: return f(args[0]);
		case 2: return f(args[0], args[1]);
		case 3: return f(args[0], args[1], args[2]);
		case 4: return f(args[0], args[1], args[2], args[3]);
		case 5: return f(args[0], args[1], args[2], args[3], args[4]);
		default:
			return f.apply(void 0, args);
	}
}

},{}],47:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

exports.isIterable = isIterable;
exports.getIterator = getIterator;
exports.makeIterable = makeIterable;

/*global Set, Symbol*/
var iteratorSymbol;
// Firefox ships a partial implementation using the name @@iterator.
// https://bugzilla.mozilla.org/show_bug.cgi?id=907077#c14
if (typeof Set === 'function' && typeof new Set()['@@iterator'] === 'function') {
	iteratorSymbol = '@@iterator';
} else {
	iteratorSymbol = typeof Symbol === 'function' && Symbol.iterator ||
	'_es6shim_iterator_';
}

function isIterable(o) {
	return typeof o[iteratorSymbol] === 'function';
}

function getIterator(o) {
	return o[iteratorSymbol]();
}

function makeIterable(f, o) {
	o[iteratorSymbol] = f;
	return o;
}

},{}],48:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var Observer = require('./sink/Observer');
var dispose = require('./disposable/dispose');
var defaultScheduler = require('./scheduler/defaultScheduler');

exports.withDefaultScheduler = withDefaultScheduler;
exports.withScheduler = withScheduler;

function withDefaultScheduler(f, source) {
	return withScheduler(f, source, defaultScheduler);
}

function withScheduler(f, source, scheduler) {
	return new Promise(function (resolve, reject) {
		runSource(f, source, scheduler, resolve, reject);
	});
}

function runSource(f, source, scheduler, resolve, reject) {
	var disposable = dispose.settable();
	var observer = new Observer(f, resolve, reject, disposable);

	disposable.setDisposable(source.run(observer, scheduler));
}

},{"./disposable/dispose":41,"./scheduler/defaultScheduler":51,"./sink/Observer":56}],49:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var fatal = require('../fatalError');

module.exports = PropagateTask;

function PropagateTask(run, value, sink) {
	this._run = run;
	this.value = value;
	this.sink = sink;
	this.active = true;
}

PropagateTask.event = function(value, sink) {
	return new PropagateTask(emit, value, sink);
};

PropagateTask.end = function(value, sink) {
	return new PropagateTask(end, value, sink);
};

PropagateTask.error = function(value, sink) {
	return new PropagateTask(error, value, sink);
};

PropagateTask.prototype.dispose = function() {
	this.active = false;
};

PropagateTask.prototype.run = function(t) {
	if(!this.active) {
		return;
	}
	this._run(t, this.value, this.sink);
};

PropagateTask.prototype.error = function(t, e) {
	if(!this.active) {
		return fatal(e);
	}
	this.sink.error(t, e);
};

function error(t, e, sink) {
	sink.error(t, e);
}

function emit(t, x, sink) {
	sink.event(t, x);
}

function end(t, x, sink) {
	sink.end(t, x);
}

},{"../fatalError":42}],50:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var base = require('./../base');

module.exports = Scheduler;

function ScheduledTask(delay, period, task, scheduler) {
	this.time = delay;
	this.period = period;
	this.task = task;
	this.scheduler = scheduler;
	this.active = true;
}

ScheduledTask.prototype.run = function() {
	return this.task.run(this.time);
};

ScheduledTask.prototype.error = function(e) {
	return this.task.error(this.time, e);
};

ScheduledTask.prototype.cancel = function() {
	this.scheduler.cancel(this);
	return this.task.dispose();
};

function runTask(task) {
	try {
		return task.run();
	} catch(e) {
		return task.error(e);
	}
}

function Scheduler(timer) {
	this.timer = timer;

	this._timer = null;
	this._nextArrival = 0;
	this._tasks = [];

	var self = this;
	this._runReadyTasksBound = function() {
		self._runReadyTasks(self.now());
	};
}

Scheduler.prototype.now = function() {
	return this.timer.now();
};

Scheduler.prototype.asap = function(task) {
	return this.schedule(0, -1, task);
};

Scheduler.prototype.delay = function(delay, task) {
	return this.schedule(delay, -1, task);
};

Scheduler.prototype.periodic = function(period, task) {
	return this.schedule(0, period, task);
};

Scheduler.prototype.schedule = function(delay, period, task) {
	var now = this.now();
    var st = new ScheduledTask(now + Math.max(0, delay), period, task, this);

	insertByTime(st, this._tasks);
	this._scheduleNextRun(now);
	return st;
};

Scheduler.prototype.cancel = function(task) {
	task.active = false;
	var i = binarySearch(task.time, this._tasks);

	if(i >= 0 && i < this._tasks.length) {
		var at = base.findIndex(task, this._tasks[i].events);
        this._tasks[i].events.splice(at, 1);
		this._reschedule();
	}
};

Scheduler.prototype.cancelAll = function(f) {
	this._tasks = base.removeAll(f, this._tasks);
	this._reschedule();
};

Scheduler.prototype._reschedule = function() {
	if(this._tasks.length === 0) {
		this._unschedule();
	} else {
		this._scheduleNextRun(this.now());
	}
};

Scheduler.prototype._unschedule = function() {
	this.timer.clearTimer(this._timer);
	this._timer = null;
};

Scheduler.prototype._scheduleNextRun = function(now) {
	if(this._tasks.length === 0) {
		return;
	}

	var nextArrival = this._tasks[0].time;

	if(this._timer === null) {
		this._scheduleNextArrival(nextArrival, now);
	} else if(nextArrival < this._nextArrival) {
		this._unschedule();
		this._scheduleNextArrival(nextArrival, now);
	}
};

Scheduler.prototype._scheduleNextArrival = function(nextArrival, now) {
	this._nextArrival = nextArrival;
	var delay = Math.max(0, nextArrival - now);
	this._timer = this.timer.setTimer(this._runReadyTasksBound, delay);
};


Scheduler.prototype._runReadyTasks = function(now) {
	this._timer = null;

	this._tasks = this._findAndRunTasks(now);

	this._scheduleNextRun(this.now());
};

Scheduler.prototype._findAndRunTasks = function(now) {
	var tasks = this._tasks;
	var l = tasks.length;
	var i = 0;

	while(i < l && tasks[i].time <= now) {
		++i;
	}

	this._tasks = tasks.slice(i);

	// Run all ready tasks
	for (var j = 0; j < i; ++j) {
		this._tasks = runTasks(tasks[j], this._tasks);
	}
	return this._tasks;
};

function runTasks(timeslot, tasks) {
	var events = timeslot.events;
	for(var i=0; i<events.length; ++i) {
		var task = events[i];

		if(task.active) {
			runTask(task);

			// Reschedule periodic repeating tasks
			// Check active again, since a task may have canceled itself
			if(task.period >= 0) {
				task.time = task.time + task.period;
				insertByTime(task, tasks);
			}
		}
	}

	return tasks;
}

function insertByTime(task, timeslots) {
	var l = timeslots.length;

	if(l === 0) {
		timeslots.push(newTimeslot(task.time, [task]));
		return;
	}

	var i = binarySearch(task.time, timeslots);

	if(i >= l) {
		timeslots.push(newTimeslot(task.time, [task]));
	} else if(task.time === timeslots[i].time) {
		timeslots[i].events.push(task);
	} else {
		timeslots.splice(i, 0, newTimeslot(task.time, [task]));
	}
}

function binarySearch(t, sortedArray) {
	var lo = 0;
	var hi = sortedArray.length;
	var mid, y;

	while (lo < hi) {
		mid = Math.floor((lo + hi) / 2);
		y = sortedArray[mid];

		if (t === y.time) {
			return mid;
		} else if (t < y.time) {
			hi = mid;
		} else {
			lo = mid + 1;
		}
	}
	return hi;
}

function newTimeslot(t, events) {
	return { time: t, events: events };
}

},{"./../base":12}],51:[function(require,module,exports){
(function (process){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var Scheduler = require('./Scheduler');
var setTimeoutTimer = require('./timeoutTimer');
var nodeTimer = require('./nodeTimer');

var isNode = typeof process === 'object'
		&& typeof process.nextTick === 'function';

module.exports = new Scheduler(isNode ? nodeTimer : setTimeoutTimer);

}).call(this,require('_process'))
},{"./Scheduler":50,"./nodeTimer":52,"./timeoutTimer":53,"_process":114}],52:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var defer = require('../defer');

/*global setTimeout, clearTimeout*/

function Task(f) {
	this.f = f;
	this.active = true;
}

Task.prototype.run = function() {
	if(!this.active) {
		return;
	}
	var f = this.f;
	return f();
};

Task.prototype.error = function(e) {
	throw e;
};

Task.prototype.cancel = function() {
	this.active = false;
};

function runAsTask(f) {
	var task = new Task(f);
	defer(task);
	return task;
}

module.exports = {
	now: Date.now,
	setTimer: function(f, dt) {
		return dt <= 0 ? runAsTask(f) : setTimeout(f, dt);
	},
	clearTimer: function(t) {
		return t instanceof Task ? t.cancel() : clearTimeout(t);
	}
};

},{"../defer":38}],53:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

/*global setTimeout, clearTimeout*/

module.exports = {
	now: Date.now,
	setTimer: function(f, dt) {
		return setTimeout(f, dt);
	},
	clearTimer: function(t) {
		return clearTimeout(t);
	}
};

},{}],54:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var defer = require('../defer');

module.exports = DeferredSink;

function DeferredSink(sink) {
	this.sink = sink;
	this.events = [];
	this.length = 0;
	this.active = true;
}

DeferredSink.prototype.event = function(t, x) {
	if(!this.active) {
		return;
	}

	if(this.length === 0) {
		defer(new PropagateAllTask(this));
	}

	this.events[this.length++] = { time: t, value: x };
};

DeferredSink.prototype.error = function(t, e) {
	this.active = false;
	defer(new ErrorTask(t, e, this.sink));
};

DeferredSink.prototype.end = function(t, x) {
	this.active = false;
	defer(new EndTask(t, x, this.sink));
};

function PropagateAllTask(deferred) {
	this.deferred = deferred;
}

PropagateAllTask.prototype.run = function() {
	var p = this.deferred;
	var events = p.events;
	var sink = p.sink;
	var event;

	for(var i = 0, l = p.length; i<l; ++i) {
		event = events[i];
		sink.event(event.time, event.value);
		events[i] = void 0;
	}

	p.length = 0;
};

PropagateAllTask.prototype.error = function(e) {
	this.deferred.error(0, e);
};

function EndTask(t, x, sink) {
	this.time = t;
	this.value = x;
	this.sink = sink;
}

EndTask.prototype.run = function() {
	this.sink.end(this.time, this.value);
};

EndTask.prototype.error = function(e) {
	this.sink.error(this.time, e);
};

function ErrorTask(t, e, sink) {
	this.time = t;
	this.value = e;
	this.sink = sink;
}

ErrorTask.prototype.run = function() {
	this.sink.error(this.time, this.value);
};

ErrorTask.prototype.error = function(e) {
	throw e;
};

},{"../defer":38}],55:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var Sink = require('./Pipe');

module.exports = IndexSink;

IndexSink.hasValue = hasValue;

function hasValue(indexSink) {
	return indexSink.hasValue;
}

function IndexSink(i, sink) {
	this.index = i;
	this.sink = sink;
	this.active = true;
	this.hasValue = false;
	this.value = void 0;
}

IndexSink.prototype.event = function(t, x) {
	if(!this.active) {
		return;
	}
	this.value = x;
	this.hasValue = true;
	this.sink.event(t, this);
};

IndexSink.prototype.end = function(t, x) {
	if(!this.active) {
		return;
	}
	this.active = false;
	this.sink.end(t, { index: this.index, value: x });
};

IndexSink.prototype.error = Sink.prototype.error;

},{"./Pipe":57}],56:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

module.exports = Observer;

/**
 * Sink that accepts functions to apply to each event, and to end, and error
 * signals.
 * @constructor
 */
function Observer(event, end, error, disposable) {
	this._event = event;
	this._end = end;
	this._error = error;
	this._disposable = disposable;
	this.active = true;
}

Observer.prototype.event = function(t, x) {
	if (!this.active) {
		return;
	}
	this._event(x);
};

Observer.prototype.end = function(t, x) {
	if (!this.active) {
		return;
	}
	this.active = false;
	disposeThen(this._end, this._error, this._disposable, x);
};

Observer.prototype.error = function(t, e) {
	this.active = false;
	disposeThen(this._error, this._error, this._disposable, e);
};

function disposeThen(end, error, disposable, x) {
	Promise.resolve(disposable.dispose()).then(function () {
		end(x);
	}, error);
}

},{}],57:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

module.exports = Pipe;

/**
 * A sink mixin that simply forwards event, end, and error to
 * another sink.
 * @param sink
 * @constructor
 */
function Pipe(sink) {
	this.sink = sink;
}

Pipe.prototype.event = function(t, x) {
	return this.sink.event(t, x);
};

Pipe.prototype.end = function(t, x) {
	return this.sink.end(t, x);
};

Pipe.prototype.error = function(t, e) {
	return this.sink.error(t, e);
};

},{}],58:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var DeferredSink = require('../sink/DeferredSink');
var dispose = require('../disposable/dispose');
var tryEvent = require('./tryEvent');

module.exports = EventEmitterSource;

function EventEmitterSource(event, source) {
	this.event = event;
	this.source = source;
}

EventEmitterSource.prototype.run = function(sink, scheduler) {
	// NOTE: Because EventEmitter allows events in the same call stack as
	// a listener is added, use a DeferredSink to buffer events
	// until the stack clears, then propagate.  This maintains most.js's
	// invariant that no event will be delivered in the same call stack
	// as an observer begins observing.
	var dsink = new DeferredSink(sink);

	function addEventVariadic(a) {
		var l = arguments.length;
		if(l > 1) {
			var arr = new Array(l);
			for(var i=0; i<l; ++i) {
				arr[i] = arguments[i];
			}
			tryEvent.tryEvent(scheduler.now(), arr, dsink);
		} else {
			tryEvent.tryEvent(scheduler.now(), a, dsink);
		}
	}

	this.source.addListener(this.event, addEventVariadic);

	return dispose.create(disposeEventEmitter, { target: this, addEvent: addEventVariadic });
};

function disposeEventEmitter(info) {
	var target = info.target;
	target.source.removeListener(target.event, info.addEvent);
}

},{"../disposable/dispose":41,"../sink/DeferredSink":54,"./tryEvent":71}],59:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var dispose = require('../disposable/dispose');
var tryEvent = require('./tryEvent');

module.exports = EventTargetSource;

function EventTargetSource(event, source, capture) {
	this.event = event;
	this.source = source;
	this.capture = capture;
}

EventTargetSource.prototype.run = function(sink, scheduler) {
	function addEvent(e) {
		tryEvent.tryEvent(scheduler.now(), e, sink);
	}

	this.source.addEventListener(this.event, addEvent, this.capture);

	return dispose.create(disposeEventTarget,
		{ target: this, addEvent: addEvent });
};

function disposeEventTarget(info) {
	var target = info.target;
	target.source.removeEventListener(target.event, info.addEvent, target.capture);
}

},{"../disposable/dispose":41,"./tryEvent":71}],60:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var base = require('../base');

module.exports = MulticastSource;

function MulticastSource(source) {
	this.source = source;
	this.sinks = [];
	this._disposable = void 0;
}

MulticastSource.prototype.run = function(sink, scheduler) {
	var n = this.add(sink);
	if(n === 1) {
		this._disposable = this.source.run(this, scheduler);
	}

	return new MulticastDisposable(this, sink);
};

MulticastSource.prototype._dispose = function() {
	var disposable = this._disposable;
	this._disposable = void 0;
	return Promise.resolve(disposable).then(dispose);
};

function dispose(disposable) {
	if(disposable === void 0) {
		return;
	}
	return disposable.dispose();
}

function MulticastDisposable(source, sink) {
	this.source = source;
	this.sink = sink;
}

MulticastDisposable.prototype.dispose = function() {
	var s = this.source;
	var remaining = s.remove(this.sink);
	return remaining === 0 && s._dispose();
};

MulticastSource.prototype.add = function(sink) {
	this.sinks = base.append(sink, this.sinks);
	return this.sinks.length;
};

MulticastSource.prototype.remove = function(sink) {
	this.sinks = base.remove(base.findIndex(sink, this.sinks), this.sinks);
	return this.sinks.length;
};

MulticastSource.prototype.event = function(t, x) {
	var s = this.sinks;
	if(s.length === 1) {
		s[0].event(t, x);
		return;
	}
	for(var i=0; i<s.length; ++i) {
		s[i].event(t, x);
	}
};

MulticastSource.prototype.end = function(t, x) {
	var s = this.sinks;
	if(s.length === 1) {
		s[0].end(t, x);
		return;
	}
	for(var i=0; i<s.length; ++i) {
		s[i].end(t, x);
	}
};

MulticastSource.prototype.error = function(t, e) {
	var s = this.sinks;
	if(s.length === 1) {
		s[0].error(t, e);
		return;
	}
	for (var i=0; i<s.length; ++i) {
		s[i].error(t, e);
	}
};

},{"../base":12}],61:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var PropagateTask = require('../scheduler/PropagateTask');

module.exports = ValueSource;

function ValueSource(emit, x) {
	this.emit = emit;
	this.value = x;
}

ValueSource.prototype.run = function(sink, scheduler) {
	return new ValueProducer(this.emit, this.value, sink, scheduler);
};

function ValueProducer(emit, x, sink, scheduler) {
	this.task = new PropagateTask(emit, x, sink);
	scheduler.asap(this.task);
}

ValueProducer.prototype.dispose = function() {
	return this.task.dispose();
};

},{"../scheduler/PropagateTask":49}],62:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var Stream = require('../Stream');
var ValueSource = require('../source/ValueSource');
var dispose = require('../disposable/dispose');
var PropagateTask = require('../scheduler/PropagateTask');

exports.of = streamOf;
exports.empty = empty;
exports.never = never;

/**
 * Stream containing only x
 * @param {*} x
 * @returns {Stream}
 */
function streamOf(x) {
	return new Stream(new ValueSource(emit, x));
}

function emit(t, x, sink) {
	sink.event(0, x);
	sink.end(0, void 0);
}

/**
 * Stream containing no events and ends immediately
 * @returns {Stream}
 */
function empty() {
	return EMPTY;
}

function EmptySource() {}

EmptySource.prototype.run = function(sink, scheduler) {
	var task = PropagateTask.end(void 0, sink);
	scheduler.asap(task);

	return dispose.create(disposeEmpty, task);
};

function disposeEmpty(task) {
	return task.dispose();
}

var EMPTY = new Stream(new EmptySource());

/**
 * Stream containing no events and never ends
 * @returns {Stream}
 */
function never() {
	return NEVER;
}

function NeverSource() {}

NeverSource.prototype.run = function() {
	return dispose.empty();
};

var NEVER = new Stream(new NeverSource());

},{"../Stream":11,"../disposable/dispose":41,"../scheduler/PropagateTask":49,"../source/ValueSource":61}],63:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var Stream = require('../Stream');
var MulticastSource = require('./MulticastSource');
var DeferredSink = require('../sink/DeferredSink');
var tryEvent = require('./tryEvent');

exports.create = create;

function create(run) {
	return new Stream(new MulticastSource(new SubscriberSource(run)));
}

function SubscriberSource(subscribe) {
	this._subscribe = subscribe;
}

SubscriberSource.prototype.run = function(sink, scheduler) {
	return new Subscription(new DeferredSink(sink), scheduler, this._subscribe);
};

function Subscription(sink, scheduler, subscribe) {
	this.sink = sink;
	this.scheduler = scheduler;
	this.active = true;
	this._unsubscribe = this._init(subscribe);
}

Subscription.prototype._init = function(subscribe) {
	var s = this;

	try {
		return subscribe(add, end, error);
	} catch(e) {
		error(e);
	}

	function add(x) {
		s._add(x);
	}
	function end(x) {
		s._end(x);
	}
	function error(e) {
		s._error(e);
	}
};

Subscription.prototype._add = function(x) {
	if(!this.active) {
		return;
	}
	tryEvent.tryEvent(this.scheduler.now(), x, this.sink);
};

Subscription.prototype._end = function(x) {
	if(!this.active) {
		return;
	}
	this.active = false;
	tryEvent.tryEnd(this.scheduler.now(), x, this.sink);
};

Subscription.prototype._error = function(x) {
	this.active = false;
	this.sink.error(this.scheduler.now(), x);
};

Subscription.prototype.dispose = function() {
	this.active = false;
	if(typeof this._unsubscribe === 'function') {
		return this._unsubscribe.call(void 0);
	}
};

},{"../Stream":11,"../sink/DeferredSink":54,"./MulticastSource":60,"./tryEvent":71}],64:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var fromArray = require('./fromArray').fromArray;
var isIterable = require('../iterable').isIterable;
var fromIterable = require('./fromIterable').fromIterable;
var isArrayLike = require('../base').isArrayLike;

exports.from = from;

function from(a) {
	if(Array.isArray(a) || isArrayLike(a)) {
		return fromArray(a);
	}

	if(isIterable(a)) {
		return fromIterable(a);
	}

	throw new TypeError('not iterable: ' + a);
}

},{"../base":12,"../iterable":47,"./fromArray":65,"./fromIterable":67}],65:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var Stream = require('../Stream');
var PropagateTask = require('../scheduler/PropagateTask');

exports.fromArray = fromArray;

function fromArray (a) {
	return new Stream(new ArraySource(a));
}

function ArraySource(a) {
	this.array = a;
}

ArraySource.prototype.run = function(sink, scheduler) {
	return new ArrayProducer(this.array, sink, scheduler);
};

function ArrayProducer(array, sink, scheduler) {
	this.scheduler = scheduler;
	this.task = new PropagateTask(runProducer, array, sink);
	scheduler.asap(this.task);
}

ArrayProducer.prototype.dispose = function() {
	return this.task.dispose();
};

function runProducer(t, array, sink) {
	produce(this, array, sink);
}

function produce(task, array, sink) {
	for(var i=0, l=array.length; i<l && task.active; ++i) {
		sink.event(0, array[i]);
	}

	task.active && end();

	function end() {
		sink.end(0);
	}
}

},{"../Stream":11,"../scheduler/PropagateTask":49}],66:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var Stream = require('../Stream');
var MulticastSource = require('./MulticastSource');
var EventTargetSource = require('./EventTargetSource');
var EventEmitterSource = require('./EventEmitterSource');

exports.fromEvent = fromEvent;

/**
 * Create a stream from an EventTarget, such as a DOM Node, or EventEmitter.
 * @param {String} event event type name, e.g. 'click'
 * @param {EventTarget|EventEmitter} source EventTarget or EventEmitter
 * @param {boolean?} useCapture for DOM events, whether to use
 *  capturing--passed as 3rd parameter to addEventListener.
 * @returns {Stream} stream containing all events of the specified type
 * from the source.
 */
function fromEvent(event, source /*, useCapture = false */) {
	var s;

	if(typeof source.addEventListener === 'function' && typeof source.removeEventListener === 'function') {
		var capture = arguments.length > 2 && !!arguments[2];
		s = new MulticastSource(new EventTargetSource(event, source, capture));
	} else if(typeof source.addListener === 'function' && typeof source.removeListener === 'function') {
		s = new EventEmitterSource(event, source);
	} else {
		throw new Error('source must support addEventListener/removeEventListener or addListener/removeListener');
	}

	return new Stream(s);
}

},{"../Stream":11,"./EventEmitterSource":58,"./EventTargetSource":59,"./MulticastSource":60}],67:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var Stream = require('../Stream');
var getIterator = require('../iterable').getIterator;
var PropagateTask = require('../scheduler/PropagateTask');

exports.fromIterable = fromIterable;

function fromIterable(iterable) {
	return new Stream(new IterableSource(iterable));
}

function IterableSource(iterable) {
	this.iterable = iterable;
}

IterableSource.prototype.run = function(sink, scheduler) {
	return new IteratorProducer(getIterator(this.iterable), sink, scheduler);
};

function IteratorProducer(iterator, sink, scheduler) {
	this.scheduler = scheduler;
	this.iterator = iterator;
	this.task = new PropagateTask(runProducer, this, sink);
	scheduler.asap(this.task);
}

IteratorProducer.prototype.dispose = function() {
	return this.task.dispose();
};

function runProducer(t, producer, sink) {
	var x = producer.iterator.next();
	if(x.done) {
		sink.end(t, x.value);
	} else {
		sink.event(t, x.value);
	}

	producer.scheduler.asap(producer.task);
}

},{"../Stream":11,"../iterable":47,"../scheduler/PropagateTask":49}],68:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var Stream = require('../Stream');
var base = require('../base');

exports.generate = generate;

/**
 * Compute a stream using an *async* generator, which yields promises
 * to control event times.
 * @param f
 * @returns {Stream}
 */
function generate(f /*, ...args */) {
	return new Stream(new GenerateSource(f, base.tail(arguments)));
}

function GenerateSource(f, args) {
	this.f = f;
	this.args = args;
}

GenerateSource.prototype.run = function(sink, scheduler) {
	return new Generate(this.f.apply(void 0, this.args), sink, scheduler);
};

function Generate(iterator, sink, scheduler) {
	this.iterator = iterator;
	this.sink = sink;
	this.scheduler = scheduler;
	this.active = true;

	var self = this;
	function err(e) {
		self.sink.error(self.scheduler.now(), e);
	}

	Promise.resolve(this).then(next).catch(err);
}

function next(generate, x) {
	return generate.active ? handle(generate, generate.iterator.next(x)) : x;
}

function handle(generate, result) {
	if (result.done) {
		return generate.sink.end(generate.scheduler.now(), result.value);
	}

	return Promise.resolve(result.value).then(function (x) {
		return emit(generate, x);
	}, function(e) {
		return error(generate, e);
	});
}

function emit(generate, x) {
	generate.sink.event(generate.scheduler.now(), x);
	return next(generate, x);
}

function error(generate, e) {
	return handle(generate, generate.iterator.throw(e));
}

Generate.prototype.dispose = function() {
	this.active = false;
};

},{"../Stream":11,"../base":12}],69:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var Stream = require('../Stream');

exports.iterate = iterate;

/**
 * Compute a stream by iteratively calling f to produce values
 * Event times may be controlled by returning a Promise from f
 * @param {function(x:*):*|Promise<*>} f
 * @param {*} x initial value
 * @returns {Stream}
 */
function iterate(f, x) {
	return new Stream(new IterateSource(f, x));
}

function IterateSource(f, x) {
	this.f = f;
	this.value = x;
}

IterateSource.prototype.run = function(sink, scheduler) {
	return new Iterate(this.f, this.value, sink, scheduler);
};

function Iterate(f, initial, sink, scheduler) {
	this.f = f;
	this.sink = sink;
	this.scheduler = scheduler;
	this.active = true;

	var x = initial;

	var self = this;
	function err(e) {
		self.sink.error(self.scheduler.now(), e);
	}

	function start(iterate) {
		return stepIterate(iterate, x);
	}

	Promise.resolve(this).then(start).catch(err);
}

Iterate.prototype.dispose = function() {
	this.active = false;
};

function stepIterate(iterate, x) {
	iterate.sink.event(iterate.scheduler.now(), x);

	if(!iterate.active) {
		return x;
	}

	var f = iterate.f;
	return Promise.resolve(f(x)).then(function(y) {
		return continueIterate(iterate, y);
	});
}

function continueIterate(iterate, x) {
	return !iterate.active ? iterate.value : stepIterate(iterate, x);
}

},{"../Stream":11}],70:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var Stream = require('../Stream');
var dispose = require('../disposable/dispose');
var MulticastSource = require('./MulticastSource');
var PropagateTask = require('../scheduler/PropagateTask');

exports.periodic = periodic;

/**
 * Create a stream that emits the current time periodically
 * @param {Number} period periodicity of events in millis
 * @param {*) value value to emit each period
 * @returns {Stream} new stream that emits the current time every period
 */
function periodic(period, value) {
	return new Stream(new MulticastSource(new Periodic(period, value)));
}

function Periodic(period, value) {
	this.period = period;
	this.value = value;
}

Periodic.prototype.run = function(sink, scheduler) {
	var task = scheduler.periodic(this.period, new PropagateTask(emit, this.value, sink));
	return dispose.create(cancelTask, task);
};

function cancelTask(task) {
	task.cancel();
}

function emit(t, x, sink) {
	sink.event(t, x);
}

},{"../Stream":11,"../disposable/dispose":41,"../scheduler/PropagateTask":49,"./MulticastSource":60}],71:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

exports.tryEvent = tryEvent;
exports.tryEnd = tryEnd;

function tryEvent(t, x, sink) {
	try {
		sink.event(t, x);
	} catch(e) {
		sink.error(t, e);
	}
}

function tryEnd(t, x, sink) {
	try {
		sink.end(t, x);
	} catch(e) {
		sink.error(t, e);
	}
}

},{}],72:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var Stream = require('../Stream');

exports.unfold = unfold;

/**
 * Compute a stream by unfolding tuples of future values from a seed value
 * Event times may be controlled by returning a Promise from f
 * @param {function(seed:*):{value:*, seed:*, done:boolean}|Promise<{value:*, seed:*, done:boolean}>} f unfolding function accepts
 *  a seed and returns a new tuple with a value, new seed, and boolean done flag.
 *  If tuple.done is true, the stream will end.
 * @param {*} seed seed value
 * @returns {Stream} stream containing all value of all tuples produced by the
 *  unfolding function.
 */
function unfold(f, seed) {
	return new Stream(new UnfoldSource(f, seed));
}

function UnfoldSource(f, seed) {
	this.f = f;
	this.value = seed;
}

UnfoldSource.prototype.run = function(sink, scheduler) {
	return new Unfold(this.f, this.value, sink, scheduler);
};

function Unfold(f, x, sink, scheduler) {
	this.f = f;
	this.sink = sink;
	this.scheduler = scheduler;
	this.active = true;

	var self = this;
	function err(e) {
		self.sink.error(self.scheduler.now(), e);
	}

	function start(unfold) {
		return stepUnfold(unfold, x);
	}

	Promise.resolve(this).then(start).catch(err);
}

Unfold.prototype.dispose = function() {
	this.active = false;
};

function stepUnfold(unfold, x) {
	var f = unfold.f;
	return Promise.resolve(f(x)).then(function(tuple) {
		return continueUnfold(unfold, tuple);
	});
}

function continueUnfold(unfold, tuple) {
	if(tuple.done) {
		unfold.sink.end(unfold.scheduler.now(), tuple.value);
		return tuple.value;
	}

	unfold.sink.event(unfold.scheduler.now(), tuple.value);

	if(!unfold.active) {
		return tuple.value;
	}
	return stepUnfold(unfold, tuple.seed);
}

},{"../Stream":11}],73:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var Stream = require('./lib/Stream');
var base = require('./lib/base');
var core = require('./lib/source/core');
var from = require('./lib/source/from').from;
var periodic = require('./lib/source/periodic').periodic;

/**
 * Core stream type
 * @type {Stream}
 */
exports.Stream = Stream;

// Add of and empty to constructor for fantasy-land compat
exports.of       = Stream.of    = core.of;
exports.just     = core.of; // easier ES6 import alias
exports.empty    = Stream.empty = core.empty;
exports.never    = core.never;
exports.from     = from;
exports.periodic = periodic;

//-----------------------------------------------------------------------
// Creating

var create = require('./lib/source/create');

/**
 * Create a stream by imperatively pushing events.
 * @param {function(add:function(x), end:function(e)):function} run function
 *  that will receive 2 functions as arguments, the first to add new values to the
 *  stream and the second to end the stream. It may *return* a function that
 *  will be called once all consumers have stopped observing the stream.
 * @returns {Stream} stream containing all events added by run before end
 */
exports.create = create.create;

//-----------------------------------------------------------------------
// Adapting other sources

var events = require('./lib/source/fromEvent');

/**
 * Create a stream of events from the supplied EventTarget or EventEmitter
 * @param {String} event event name
 * @param {EventTarget|EventEmitter} source EventTarget or EventEmitter. The source
 *  must support either addEventListener/removeEventListener (w3c EventTarget:
 *  http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget),
 *  or addListener/removeListener (node EventEmitter: http://nodejs.org/api/events.html)
 * @returns {Stream} stream of events of the specified type from the source
 */
exports.fromEvent = events.fromEvent;

//-----------------------------------------------------------------------
// Observing

var observe = require('./lib/combinator/observe');

exports.observe = observe.observe;
exports.forEach = observe.observe;
exports.drain   = observe.drain;

/**
 * Process all the events in the stream
 * @returns {Promise} promise that fulfills when the stream ends, or rejects
 *  if the stream fails with an unhandled error.
 */
Stream.prototype.observe = Stream.prototype.forEach = function(f) {
	return observe.observe(f, this);
};

/**
 * Consume all events in the stream, without providing a function to process each.
 * This causes a stream to become active and begin emitting events, and is useful
 * in cases where all processing has been setup upstream via other combinators, and
 * there is no need to process the terminal events.
 * @returns {Promise} promise that fulfills when the stream ends, or rejects
 *  if the stream fails with an unhandled error.
 */
Stream.prototype.drain = function() {
	return observe.drain(this);
};

//-------------------------------------------------------

var loop = require('./lib/combinator/loop').loop;

exports.loop = loop;

/**
 * Generalized feedback loop. Call a stepper function for each event. The stepper
 * will be called with 2 params: the current seed and the an event value.  It must
 * return a new { seed, value } pair. The `seed` will be fed back into the next
 * invocation of stepper, and the `value` will be propagated as the event value.
 * @param {function(seed:*, value:*):{seed:*, value:*}} stepper loop step function
 * @param {*} seed initial seed value passed to first stepper call
 * @returns {Stream} new stream whose values are the `value` field of the objects
 * returned by the stepper
 */
Stream.prototype.loop = function(stepper, seed) {
	return loop(stepper, seed, this);
};

//-------------------------------------------------------

var accumulate = require('./lib/combinator/accumulate');

exports.scan   = accumulate.scan;
exports.reduce = accumulate.reduce;

/**
 * Create a stream containing successive reduce results of applying f to
 * the previous reduce result and the current stream item.
 * @param {function(result:*, x:*):*} f reducer function
 * @param {*} initial initial value
 * @returns {Stream} new stream containing successive reduce results
 */
Stream.prototype.scan = function(f, initial) {
	return accumulate.scan(f, initial, this);
};

/**
 * Reduce the stream to produce a single result.  Note that reducing an infinite
 * stream will return a Promise that never fulfills, but that may reject if an error
 * occurs.
 * @param {function(result:*, x:*):*} f reducer function
 * @param {*} initial optional initial value
 * @returns {Promise} promise for the file result of the reduce
 */
Stream.prototype.reduce = function(f, initial) {
	return accumulate.reduce(f, initial, this);
};

//-----------------------------------------------------------------------
// Building and extending

var unfold = require('./lib/source/unfold');
var iterate = require('./lib/source/iterate');
var generate = require('./lib/source/generate');
var build = require('./lib/combinator/build');

exports.unfold    = unfold.unfold;
exports.iterate   = iterate.iterate;
exports.generate  = generate.generate;
exports.cycle     = build.cycle;
exports.concat    = build.concat;
exports.startWith = build.cons;

/**
 * Tie this stream into a circle, thus creating an infinite stream
 * @returns {Stream} new infinite stream
 */
Stream.prototype.cycle = function() {
	return build.cycle(this);
};

/**
 * @param {Stream} tail
 * @returns {Stream} new stream containing all items in this followed by
 *  all items in tail
 */
Stream.prototype.concat = function(tail) {
	return build.concat(this, tail);
};

/**
 * @param {*} x value to prepend
 * @returns {Stream} a new stream with x prepended
 */
Stream.prototype.startWith = function(x) {
	return build.cons(x, this);
};

//-----------------------------------------------------------------------
// Transforming

var transform = require('./lib/combinator/transform');
var applicative = require('./lib/combinator/applicative');

exports.map      = transform.map;
exports.constant = transform.constant;
exports.tap      = transform.tap;
exports.ap       = applicative.ap;

/**
 * Transform each value in the stream by applying f to each
 * @param {function(*):*} f mapping function
 * @returns {Stream} stream containing items transformed by f
 */
Stream.prototype.map = function(f) {
	return transform.map(f, this);
};

/**
 * Assume this stream contains functions, and apply each function to each item
 * in the provided stream.  This generates, in effect, a cross product.
 * @param {Stream} xs stream of items to which
 * @returns {Stream} stream containing the cross product of items
 */
Stream.prototype.ap = function(xs) {
	return applicative.ap(this, xs);
};

/**
 * Replace each value in the stream with x
 * @param {*} x
 * @returns {Stream} stream containing items replaced with x
 */
Stream.prototype.constant = function(x) {
	return transform.constant(x, this);
};

/**
 * Perform a side effect for each item in the stream
 * @param {function(x:*):*} f side effect to execute for each item. The
 *  return value will be discarded.
 * @returns {Stream} new stream containing the same items as this stream
 */
Stream.prototype.tap = function(f) {
	return transform.tap(f, this);
};

//-----------------------------------------------------------------------
// Transducer support

var transduce = require('./lib/combinator/transduce');

exports.transduce = transduce.transduce;

/**
 * Transform this stream by passing its events through a transducer.
 * @param  {function} transducer transducer function
 * @return {Stream} stream of events transformed by the transducer
 */
Stream.prototype.transduce = function(transducer) {
	return transduce.transduce(transducer, this);
};

//-----------------------------------------------------------------------
// FlatMapping

var flatMap = require('./lib/combinator/flatMap');

exports.flatMap = exports.chain = flatMap.flatMap;
exports.join    = flatMap.join;

/**
 * Map each value in the stream to a new stream, and merge it into the
 * returned outer stream. Event arrival times are preserved.
 * @param {function(x:*):Stream} f chaining function, must return a Stream
 * @returns {Stream} new stream containing all events from each stream returned by f
 */
Stream.prototype.flatMap = Stream.prototype.chain = function(f) {
	return flatMap.flatMap(f, this);
};

/**
 * Monadic join. Flatten a Stream<Stream<X>> to Stream<X> by merging inner
 * streams to the outer. Event arrival times are preserved.
 * @returns {Stream<X>} new stream containing all events of all inner streams
 */
Stream.prototype.join = function() {
	return flatMap.join(this);
};

var continueWith = require('./lib/combinator/continueWith').continueWith;

exports.continueWith = continueWith;
exports.flatMapEnd = continueWith;

/**
 * Map the end event to a new stream, and begin emitting its values.
 * @param {function(x:*):Stream} f function that receives the end event value,
 * and *must* return a new Stream to continue with.
 * @returns {Stream} new stream that emits all events from the original stream,
 * followed by all events from the stream returned by f.
 */
Stream.prototype.continueWith = Stream.prototype.flatMapEnd = function(f) {
	return continueWith(f, this);
};

var concatMap = require('./lib/combinator/concatMap').concatMap;

exports.concatMap = concatMap;

Stream.prototype.concatMap = function(f) {
	return concatMap(f, this);
};

//-----------------------------------------------------------------------
// Concurrent merging

var mergeConcurrently = require('./lib/combinator/mergeConcurrently');

exports.mergeConcurrently = mergeConcurrently.mergeConcurrently;

/**
 * Flatten a Stream<Stream<X>> to Stream<X> by merging inner
 * streams to the outer, limiting the number of inner streams that may
 * be active concurrently.
 * @param {number} concurrency at most this many inner streams will be
 *  allowed to be active concurrently.
 * @return {Stream<X>} new stream containing all events of all inner
 *  streams, with limited concurrency.
 */
Stream.prototype.mergeConcurrently = function(concurrency) {
	return mergeConcurrently.mergeConcurrently(concurrency, this);
};

//-----------------------------------------------------------------------
// Merging

var merge = require('./lib/combinator/merge');

exports.merge = merge.merge;
exports.mergeArray = merge.mergeArray;

/**
 * Merge this stream and all the provided streams
 * @returns {Stream} stream containing items from this stream and s in time
 * order.  If two events are simultaneous they will be merged in
 * arbitrary order.
 */
Stream.prototype.merge = function(/*...streams*/) {
	return merge.mergeArray(base.cons(this, arguments));
};

//-----------------------------------------------------------------------
// Combining

var combine = require('./lib/combinator/combine');

exports.combine = combine.combine;
exports.combineArray = combine.combineArray;

/**
 * Combine latest events from all input streams
 * @param {function(...events):*} f function to combine most recent events
 * @returns {Stream} stream containing the result of applying f to the most recent
 *  event of each input stream, whenever a new event arrives on any stream.
 */
Stream.prototype.combine = function(f /*, ...streams*/) {
	return combine.combineArray(f, base.replace(this, 0, arguments));
};

//-----------------------------------------------------------------------
// Sampling

var sample = require('./lib/combinator/sample');

exports.sample = sample.sample;
exports.sampleWith = sample.sampleWith;

/**
 * When an event arrives on sampler, emit the latest event value from stream.
 * @param {Stream} sampler stream of events at whose arrival time
 *  signal's latest value will be propagated
 * @returns {Stream} sampled stream of values
 */
Stream.prototype.sampleWith = function(sampler) {
	return sample.sampleWith(sampler, this);
};

/**
 * When an event arrives on this stream, emit the result of calling f with the latest
 * values of all streams being sampled
 * @param {function(...values):*} f function to apply to each set of sampled values
 * @returns {Stream} stream of sampled and transformed values
 */
Stream.prototype.sample = function(f /* ...streams */) {
	return sample.sampleArray(f, this, base.tail(arguments));
};

//-----------------------------------------------------------------------
// Zipping

var zip = require('./lib/combinator/zip');

exports.zip = zip.zip;

/**
 * Pair-wise combine items with those in s. Given 2 streams:
 * [1,2,3] zipWith f [4,5,6] -> [f(1,4),f(2,5),f(3,6)]
 * Note: zip causes fast streams to buffer and wait for slow streams.
 * @param {function(a:Stream, b:Stream, ...):*} f function to combine items
 * @returns {Stream} new stream containing pairs
 */
Stream.prototype.zip = function(f /*, ...streams*/) {
	return zip.zipArray(f, base.replace(this, 0, arguments));
};

//-----------------------------------------------------------------------
// Switching

var switchLatest = require('./lib/combinator/switch').switch;

exports.switch       = switchLatest;
exports.switchLatest = switchLatest;

/**
 * Given a stream of streams, return a new stream that adopts the behavior
 * of the most recent inner stream.
 * @returns {Stream} switching stream
 */
Stream.prototype.switch = Stream.prototype.switchLatest = function() {
	return switchLatest(this);
};

//-----------------------------------------------------------------------
// Filtering

var filter = require('./lib/combinator/filter');

exports.filter          = filter.filter;
exports.skipRepeats     = exports.distinct   = filter.skipRepeats;
exports.skipRepeatsWith = exports.distinctBy = filter.skipRepeatsWith;

/**
 * Retain only items matching a predicate
 * stream:                           -12345678-
 * filter(x => x % 2 === 0, stream): --2-4-6-8-
 * @param {function(x:*):boolean} p filtering predicate called for each item
 * @returns {Stream} stream containing only items for which predicate returns truthy
 */
Stream.prototype.filter = function(p) {
	return filter.filter(p, this);
};

/**
 * Skip repeated events, using === to compare items
 * stream:           -abbcd-
 * distinct(stream): -ab-cd-
 * @returns {Stream} stream with no repeated events
 */
Stream.prototype.skipRepeats = function() {
	return filter.skipRepeats(this);
};

/**
 * Skip repeated events, using supplied equals function to compare items
 * @param {function(a:*, b:*):boolean} equals function to compare items
 * @returns {Stream} stream with no repeated events
 */
Stream.prototype.skipRepeatsWith = function(equals) {
	return filter.skipRepeatsWith(equals, this);
};

//-----------------------------------------------------------------------
// Slicing

var slice = require('./lib/combinator/slice');

exports.take      = slice.take;
exports.skip      = slice.skip;
exports.slice     = slice.slice;
exports.takeWhile = slice.takeWhile;
exports.skipWhile = slice.skipWhile;

/**
 * stream:          -abcd-
 * take(2, stream): -ab|
 * @param {Number} n take up to this many events
 * @returns {Stream} stream containing at most the first n items from this stream
 */
Stream.prototype.take = function(n) {
	return slice.take(n, this);
};

/**
 * stream:          -abcd->
 * skip(2, stream): ---cd->
 * @param {Number} n skip this many events
 * @returns {Stream} stream not containing the first n events
 */
Stream.prototype.skip = function(n) {
	return slice.skip(n, this);
};

/**
 * Slice a stream by event index. Equivalent to, but more efficient than
 * stream.take(end).skip(start);
 * NOTE: Negative start and end are not supported
 * @param {Number} start skip all events before the start index
 * @param {Number} end allow all events from the start index to the end index
 * @returns {Stream} stream containing items where start <= index < end
 */
Stream.prototype.slice = function(start, end) {
	return slice.slice(start, end, this);
};

/**
 * stream:                        -123451234->
 * takeWhile(x => x < 5, stream): -1234|
 * @param {function(x:*):boolean} p predicate
 * @returns {Stream} stream containing items up to, but not including, the
 * first item for which p returns falsy.
 */
Stream.prototype.takeWhile = function(p) {
	return slice.takeWhile(p, this);
};

/**
 * stream:                        -123451234->
 * skipWhile(x => x < 5, stream): -----51234->
 * @param {function(x:*):boolean} p predicate
 * @returns {Stream} stream containing items following *and including* the
 * first item for which p returns falsy.
 */
Stream.prototype.skipWhile = function(p) {
	return slice.skipWhile(p, this);
};

//-----------------------------------------------------------------------
// Time slicing

var timeslice = require('./lib/combinator/timeslice');

exports.until  = exports.takeUntil = timeslice.takeUntil;
exports.since  = exports.skipUntil = timeslice.skipUntil;
exports.during = timeslice.during;

/**
 * stream:                    -a-b-c-d-e-f-g->
 * signal:                    -------x
 * takeUntil(signal, stream): -a-b-c-|
 * @param {Stream} signal retain only events in stream before the first
 * event in signal
 * @returns {Stream} new stream containing only events that occur before
 * the first event in signal.
 */
Stream.prototype.until = Stream.prototype.takeUntil = function(signal) {
	return timeslice.takeUntil(signal, this);
};

/**
 * stream:                    -a-b-c-d-e-f-g->
 * signal:                    -------x
 * takeUntil(signal, stream): -------d-e-f-g->
 * @param {Stream} signal retain only events in stream at or after the first
 * event in signal
 * @returns {Stream} new stream containing only events that occur after
 * the first event in signal.
 */
Stream.prototype.since = Stream.prototype.skipUntil = function(signal) {
	return timeslice.skipUntil(signal, this);
};

/**
 * stream:                    -a-b-c-d-e-f-g->
 * timeWindow:                -----s
 * s:                               -----t
 * stream.during(timeWindow): -----c-d-e-|
 * @param {Stream<Stream>} timeWindow a stream whose first event (s) represents
 *  the window start time.  That event (s) is itself a stream whose first event (t)
 *  represents the window end time
 * @returns {Stream} new stream containing only events within the provided timespan
 */
Stream.prototype.during = function(timeWindow) {
	return timeslice.during(timeWindow, this);
};

//-----------------------------------------------------------------------
// Delaying

var delay = require('./lib/combinator/delay').delay;

exports.delay = delay;

/**
 * @param {Number} delayTime milliseconds to delay each item
 * @returns {Stream} new stream containing the same items, but delayed by ms
 */
Stream.prototype.delay = function(delayTime) {
	return delay(delayTime, this);
};

//-----------------------------------------------------------------------
// Getting event timestamp

var timestamp = require('./lib/combinator/timestamp').timestamp;

exports.timestamp = timestamp;

/**
 * Expose event timestamps into the stream. Turns a Stream<X> into
 * Stream<{time:t, value:X}>
 * @returns {Stream<{time:number, value:*}>}
 */
Stream.prototype.timestamp = function() {
	return timestamp(this);
};

//-----------------------------------------------------------------------
// Rate limiting

var limit = require('./lib/combinator/limit');

exports.throttle = limit.throttle;
exports.debounce = limit.debounce;

/**
 * Limit the rate of events
 * stream:              abcd----abcd----
 * throttle(2, stream): a-c-----a-c-----
 * @param {Number} period time to suppress events
 * @returns {Stream} new stream that skips events for throttle period
 */
Stream.prototype.throttle = function(period) {
	return limit.throttle(period, this);
};

/**
 * Wait for a burst of events to subside and emit only the last event in the burst
 * stream:              abcd----abcd----
 * debounce(2, stream): -----d-------d--
 * @param {Number} period events occuring more frequently than this
 *  on the provided scheduler will be suppressed
 * @returns {Stream} new debounced stream
 */
Stream.prototype.debounce = function(period) {
	return limit.debounce(period, this);
};

//-----------------------------------------------------------------------
// Awaiting Promises

var promises = require('./lib/combinator/promises');

exports.fromPromise = promises.fromPromise;
exports.await       = promises.awaitPromises;

/**
 * Await promises, turning a Stream<Promise<X>> into Stream<X>.  Preserves
 * event order, but timeshifts events based on promise resolution time.
 * @returns {Stream<X>} stream containing non-promise values
 */
Stream.prototype.await = function() {
	return promises.awaitPromises(this);
};

//-----------------------------------------------------------------------
// Error handling

var errors = require('./lib/combinator/errors');

exports.recoverWith  = errors.flatMapError;
exports.flatMapError = errors.flatMapError;
exports.throwError   = errors.throwError;

/**
 * If this stream encounters an error, recover and continue with items from stream
 * returned by f.
 * stream:                  -a-b-c-X-
 * f(X):                           d-e-f-g-
 * flatMapError(f, stream): -a-b-c-d-e-f-g-
 * @param {function(error:*):Stream} f function which returns a new stream
 * @returns {Stream} new stream which will recover from an error by calling f
 */
Stream.prototype.recoverWith = Stream.prototype.flatMapError = function(f) {
	return errors.flatMapError(f, this);
};

//-----------------------------------------------------------------------
// Multicasting

var multicast = require('./lib/combinator/multicast').multicast;

exports.multicast = multicast;

/**
 * Transform the stream into multicast stream.  That means that many subscribers
 * to the stream will not cause multiple invocations of the internal machinery.
 * @returns {Stream} new stream which will multicast events to all observers.
 */
Stream.prototype.multicast = function() {
	return multicast(this);
};

},{"./lib/Stream":11,"./lib/base":12,"./lib/combinator/accumulate":13,"./lib/combinator/applicative":14,"./lib/combinator/build":15,"./lib/combinator/combine":16,"./lib/combinator/concatMap":17,"./lib/combinator/continueWith":18,"./lib/combinator/delay":19,"./lib/combinator/errors":20,"./lib/combinator/filter":21,"./lib/combinator/flatMap":22,"./lib/combinator/limit":23,"./lib/combinator/loop":24,"./lib/combinator/merge":25,"./lib/combinator/mergeConcurrently":26,"./lib/combinator/multicast":27,"./lib/combinator/observe":28,"./lib/combinator/promises":29,"./lib/combinator/sample":30,"./lib/combinator/slice":31,"./lib/combinator/switch":32,"./lib/combinator/timeslice":33,"./lib/combinator/timestamp":34,"./lib/combinator/transduce":35,"./lib/combinator/transform":36,"./lib/combinator/zip":37,"./lib/source/core":62,"./lib/source/create":63,"./lib/source/from":64,"./lib/source/fromEvent":66,"./lib/source/generate":68,"./lib/source/iterate":69,"./lib/source/periodic":70,"./lib/source/unfold":72}],74:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domEvent = require('@most/dom-event');

var _select = require('./select');

var matchesSelector = undefined;
try {
  matchesSelector = require('matches-selector');
} catch (err) {
  matchesSelector = function matchesSelector() {};
}

var eventTypesThatDontBubble = ['load', 'unload', 'focus', 'blur', 'mouseenter', 'mouseleave', 'submit', 'change', 'reset'];

function maybeMutateEventPropagationAttributes(event) {
  if (!event.hasOwnProperty('propagationHasBeenStopped')) {
    (function () {
      event.propagationHasBeenStopped = false;
      var oldStopPropagation = event.stopPropagation;
      event.stopPropagation = function stopPropagation() {
        oldStopPropagation.call(this);
        this.propagationHasBeenStopped = true;
      };
    })();
  }
}

function mutateEventCurrentTarget(event, currentTargetElement) {
  try {
    Object.defineProperty(event, 'currentTarget', {
      value: currentTargetElement,
      configurable: true
    });
  } catch (err) {
    console.log('please use event.ownerTarget');
  }
  event.ownerTarget = currentTargetElement;
}

function makeSimulateBubbling(namespace, rootEl) {
  var isStrictlyInRootScope = (0, _select.makeIsStrictlyInRootScope)(namespace);
  var descendantSel = namespace.join(' ');
  var topSel = namespace.join('');
  var roof = rootEl.parentElement;

  return function simulateBubbling(ev) {
    maybeMutateEventPropagationAttributes(ev);
    if (ev.propagationHasBeenStopped) {
      return false;
    }
    for (var el = ev.target; el && el !== roof; el = el.parentElement) {
      if (!isStrictlyInRootScope(el)) {
        continue;
      }
      if (matchesSelector(el, descendantSel) || matchesSelector(el, topSel)) {
        mutateEventCurrentTarget(ev, el);
        return true;
      }
    }
    return false;
  };
}

var defaults = {
  useCapture: false
};

function makeEventsSelector(rootElement$, selector) {
  return function eventsSelector(type) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? defaults : arguments[1];

    if (typeof type !== 'string') {
      throw new Error('DOM drivers events() expects argument to be a ' + 'string representing the event type to listen for.');
    }
    var useCapture = false;
    if (eventTypesThatDontBubble.indexOf(type) !== -1) {
      useCapture = true;
    }
    if (typeof options.useCapture === 'boolean') {
      useCapture = options.useCapture;
    }
    return rootElement$.map(function (rootElement) {
      return { rootElement: rootElement, selector: selector };
    }).skipRepeatsWith(function (prev, curr) {
      return prev.selector.join('') === curr.selector.join('');
    }).map(function (_ref) {
      var rootElement = _ref.rootElement;

      if (!selector || selector.lenght === 0) {
        return (0, _domEvent.domEvent)(type, rootElement, useCapture);
      }

      var simulateBubbling = makeSimulateBubbling(selector, rootElement);
      return (0, _domEvent.domEvent)(type, rootElement, useCapture).filter(simulateBubbling);
    }).switch().multicast();
  };
}

exports.default = makeEventsSelector;
},{"./select":78,"@most/dom-event":81,"matches-selector":101}],75:[function(require,module,exports){
'use strict';

var _h = require('snabbdom/h');

var _h2 = _interopRequireDefault(_h);

var _thunk = require('snabbdom/thunk');

var _thunk2 = _interopRequireDefault(_thunk);

var _makeDOMDriver = require('./makeDOMDriver');

var _makeDOMDriver2 = _interopRequireDefault(_makeDOMDriver);

var _assign = require('fast.js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hh = require('hyperscript-helpers')(_h2.default);

module.exports = (0, _assign2.default)({ makeDOMDriver: _makeDOMDriver2.default, h: _h2.default, thunk: _thunk2.default }, hh);
},{"./makeDOMDriver":77,"fast.js/object/assign":99,"hyperscript-helpers":100,"snabbdom/h":105,"snabbdom/thunk":112}],76:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isolateSource = exports.isolateSink = undefined;

var _utils = require('./utils');

var isolateSource = function isolateSource(source_, scope) {
  return source_.select('.' + _utils.SCOPE_PREFIX + scope);
};

var isolateSink = function isolateSink(sink, scope) {
  return sink.map(function (vTree) {
    if (vTree.sel.indexOf('' + _utils.SCOPE_PREFIX + scope) === -1) {
      vTree.sel = vTree.sel + '.' + _utils.SCOPE_PREFIX + scope;
    }
    return vTree;
  }).multicast();
};

exports.isolateSink = isolateSink;
exports.isolateSource = isolateSource;
},{"./utils":79}],77:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hold = require('@most/hold');

var _hold2 = _interopRequireDefault(_hold);

var _snabbdom = require('snabbdom');

var _snabbdom2 = _interopRequireDefault(_snabbdom);

var _h = require('snabbdom/h');

var _h2 = _interopRequireDefault(_h);

var _classNameFromVNode = require('snabbdom-selector/lib/classNameFromVNode');

var _classNameFromVNode2 = _interopRequireDefault(_classNameFromVNode);

var _selectorParser2 = require('snabbdom-selector/lib/selectorParser');

var _selectorParser3 = _interopRequireDefault(_selectorParser2);

var _utils = require('./utils');

var _vTreeParser = require('./vTreeParser');

var _vTreeParser2 = _interopRequireDefault(_vTreeParser);

var _isolate = require('./isolate');

var _select = require('./select');

var _select2 = _interopRequireDefault(_select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeVNodeWrapper(rootElement) {
  return function vNodeWrapper(vNode) {
    var _selectorParser = (0, _selectorParser3.default)(vNode.sel);

    var selectorTagName = _selectorParser.tagName;
    var selectorId = _selectorParser.id;

    var vNodeClassName = (0, _classNameFromVNode2.default)(vNode);
    var _vNode$data = vNode.data;
    var vNodeData = _vNode$data === undefined ? {} : _vNode$data;
    var _vNodeData$props = vNodeData.props;
    var vNodeDataProps = _vNodeData$props === undefined ? {} : _vNodeData$props;
    var _vNodeDataProps$id = vNodeDataProps.id;
    var vNodeId = _vNodeDataProps$id === undefined ? selectorId : _vNodeDataProps$id;

    var isVNodeAndRootElementIdentical = vNodeId === rootElement.id && selectorTagName === rootElement.tagName && vNodeClassName === rootElement.className;

    if (isVNodeAndRootElementIdentical) {
      return vNode;
    }

    var tagName = rootElement.tagName;
    var id = rootElement.id;
    var className = rootElement.className;

    var elementId = id ? '#' + id : '';
    var elementClassName = className ? '.' + className.split(' ').join('.') : '';
    return (0, _h2.default)('' + tagName + elementId + elementClassName, {}, [vNode]);
  };
}

var domDriverInputGuard = function domDriverInputGuard(view$) {
  if (!view$ || typeof view$.observe !== 'function') {
    throw new Error('The DOM driver function expects as input an ' + 'Observable of virtual DOM elements');
  }
};

// snabbdoms style module blows up server-side
// because rAf is not defined
if (typeof window === 'undefined') {
  global.requestAnimationFrame = setTimeout;
}

var defaultOptions = {
  modules: [require('snabbdom/modules/class'), require('snabbdom/modules/props'), require('snabbdom/modules/attributes'), require('snabbdom/modules/style')]
};

var makeDOMDriver = function makeDOMDriver(containerElementSelectors) {
  var _ref = arguments.length <= 1 || arguments[1] === undefined ? defaultOptions : arguments[1];

  var _ref$modules = _ref.modules;
  var modules = _ref$modules === undefined ? defaultOptions.modules : _ref$modules;

  var patch = _snabbdom2.default.init(modules);
  var rootElement = (0, _utils.domSelectorParser)(containerElementSelectors);

  var DomDriver = function DomDriver(view$) {
    domDriverInputGuard(view$);
    if (!Array.isArray(modules)) {
      throw new Error('Optional modules option must be ' + 'an array for snabbdom modules');
    }

    var rootElement$ = (0, _hold2.default)(view$.map(_vTreeParser2.default).switch().map(makeVNodeWrapper(rootElement)).scan(patch, rootElement).skip(1).map(function (_ref2) {
      var elm = _ref2.elm;
      return elm;
    }));

    rootElement$.drain();

    return {
      namespace: [],
      select: (0, _select2.default)(rootElement$),
      isolateSink: _isolate.isolateSink,
      isolateSource: _isolate.isolateSource
    };
  };

  return DomDriver;
};

exports.default = makeDOMDriver;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./isolate":76,"./select":78,"./utils":79,"./vTreeParser":80,"@most/hold":82,"snabbdom":111,"snabbdom-selector/lib/classNameFromVNode":102,"snabbdom-selector/lib/selectorParser":103,"snabbdom/h":105,"snabbdom/modules/attributes":107,"snabbdom/modules/class":108,"snabbdom/modules/props":109,"snabbdom/modules/style":110}],78:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeIsStrictlyInRootScope = undefined;

var _events = require('./events');

var _events2 = _interopRequireDefault(_events);

var _isolate = require('./isolate');

var _array = require('fast.js/array');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeIsStrictlyInRootScope(namespace) {
  var classIsForeign = function classIsForeign(c) {
    var matched = c.match(/cycle-scope-(\S+)/);
    return matched && namespace.indexOf('.' + c) === -1;
  };
  var classIsDomestic = function classIsDomestic(c) {
    var matched = c.match(/cycle-scope-(\S+)/);
    return matched && namespace.indexOf('.' + c) !== -1;
  };
  return function isStrictlyInRootScope(leaf) {
    for (var el = leaf; el !== null; el = el.parentElement) {
      var split = String.prototype.split;
      var classList = el.classList || split.call(el.className, ' ');
      if (Array.prototype.some.call(classList, classIsDomestic)) {
        return true;
      }
      if (Array.prototype.some.call(classList, classIsForeign)) {
        return false;
      }
    }
    return true;
  };
}

function makeElementGetter(selector) {
  return function elemenGetter(rootElement) {
    if (selector.join('') === '') {
      return rootElement;
    }
    var nodeList = rootElement.querySelectorAll(selector.join(' '));
    if (nodeList.length === 0) {
      nodeList = rootElement.querySelectorAll(selector.join(''));
    }
    var array = Array.prototype.slice.call(nodeList);
    return (0, _array.filter)(array, makeIsStrictlyInRootScope(selector));
  };
}

function makeElementSelector(rootElement$) {
  return function DOMSelect(selector) {
    if (typeof selector !== 'string') {
      throw new Error('DOM drivers select() expects first argument to be a ' + 'string as a CSS selector');
    }

    var namespace = this.namespace;

    var scopedSelector = (0, _array.concat)(namespace, selector.trim() === ':root' ? '' : selector.trim());

    return {
      observable: rootElement$.map(makeElementGetter(scopedSelector)),
      namespace: scopedSelector,
      select: makeElementSelector(rootElement$),
      events: (0, _events2.default)(rootElement$, scopedSelector),
      isolateSource: _isolate.isolateSource,
      isolateSink: _isolate.isolateSink
    };
  };
}

exports.default = makeElementSelector;
exports.makeIsStrictlyInRootScope = makeIsStrictlyInRootScope;
},{"./events":74,"./isolate":76,"fast.js/array":89}],79:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var SCOPE_PREFIX = "cycle-scope-";

var isElement = function isElement(obj) {
  return typeof HTMLElement === "object" ? obj instanceof HTMLElement || obj instanceof DocumentFragment : obj && typeof obj === "object" && obj !== null && (obj.nodeType === 1 || obj.nodeType === 11) && typeof obj.nodeName === "string";
};

var domSelectorParser = function domSelectorParser(selectors) {
  var domElement = typeof selectors === "string" ? document.querySelector(selectors) : selectors;

  if (typeof domElement === "string" && domElement === null) {
    throw new Error("Cannot render into unknown element `" + selectors + "`");
  } else if (!isElement(domElement)) {
    throw new Error("Given container is not a DOM element neither a " + "selector string.");
  }
  return domElement;
};

exports.domSelectorParser = domSelectorParser;
exports.SCOPE_PREFIX = SCOPE_PREFIX;
},{}],80:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _most = require('most');

var _most2 = _interopRequireDefault(_most);

var _map = require('fast.js/array/map');

var _map2 = _interopRequireDefault(_map);

var _filter = require('fast.js/array/filter');

var _filter2 = _interopRequireDefault(_filter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var combineVTreeStreams = function combineVTreeStreams(vTree) {
  for (var _len = arguments.length, children = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    children[_key - 1] = arguments[_key];
  }

  return {
    sel: vTree.sel,
    data: vTree.data,
    text: vTree.text,
    elm: vTree.elm,
    key: vTree.key,
    children: children
  };
};

var vTreeParser = function vTreeParser(vTree) {
  if (vTree.data && vTree.data.static) {
    return _most2.default.just(vTree);
  } else if (!vTree) {
    return null;
  } else if (vTree.observe) {
    return vTree.map(vTreeParser).switch();
  } else if ('object' === (typeof vTree === 'undefined' ? 'undefined' : _typeof(vTree))) {
    var vTree$ = _most2.default.just(vTree);
    if (vTree.children && vTree.children.length > 0) {
      return _most2.default.combine.apply(_most2.default, [combineVTreeStreams, vTree$].concat(_toConsumableArray((0, _filter2.default)((0, _map2.default)(vTree.children, vTreeParser), function (x) {
        return x !== null;
      }))));
    }
    return vTree$;
  } else {
    throw new Error('Unhandled tree value');
  }
};

exports.default = vTreeParser;
},{"fast.js/array/filter":87,"fast.js/array/map":92,"most":183}],81:[function(require,module,exports){
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define('@most/dom-event', ['exports', 'most'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('most'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.most);
        global.mostDomEvent = mod.exports;
    }
})(this, function (exports, _most) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.touchcancel = exports.touchmove = exports.touchend = exports.touchstart = exports.pointerleave = exports.pointerout = exports.pointerenter = exports.pointerover = exports.pointermove = exports.pointerup = exports.pointerdown = exports.unload = exports.load = exports.popstate = exports.hashchange = exports.error = exports.scroll = exports.resize = exports.contextmenu = exports.input = exports.keyup = exports.keypress = exports.keydown = exports.submit = exports.select = exports.change = exports.mouseleave = exports.mouseout = exports.mouseenter = exports.mouseover = exports.mousemove = exports.mouseup = exports.mousedown = exports.dblclick = exports.click = exports.focusout = exports.focusin = exports.focus = exports.blur = exports.domEvent = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var domEvent = function domEvent(event, node) {
        var capture = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
        return new _most.Stream(new DomEvent(event, node, capture));
    };

    var blur = function blur(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('blur', node, capture);
    };

    var focus = function focus(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('focus', node, capture);
    };

    var focusin = function focusin(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('focusin', node, capture);
    };

    var focusout = function focusout(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('focusout', node, capture);
    };

    var click = function click(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('click', node, capture);
    };

    var dblclick = function dblclick(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('dblclick', node, capture);
    };

    var mousedown = function mousedown(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('mousedown', node, capture);
    };

    var mouseup = function mouseup(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('mouseup', node, capture);
    };

    var mousemove = function mousemove(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('mousemove', node, capture);
    };

    var mouseover = function mouseover(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('mouseover', node, capture);
    };

    var mouseenter = function mouseenter(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('mouseenter', node, capture);
    };

    var mouseout = function mouseout(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('mouseout', node, capture);
    };

    var mouseleave = function mouseleave(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('mouseleave', node, capture);
    };

    var change = function change(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('change', node, capture);
    };

    var select = function select(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('select', node, capture);
    };

    var submit = function submit(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('submit', node, capture);
    };

    var keydown = function keydown(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('keydown', node, capture);
    };

    var keypress = function keypress(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('keypress', node, capture);
    };

    var keyup = function keyup(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('keyup', node, capture);
    };

    var input = function input(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('input', node, capture);
    };

    var contextmenu = function contextmenu(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('contextmenu', node, capture);
    };

    var resize = function resize(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('resize', node, capture);
    };

    var scroll = function scroll(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('scroll', node, capture);
    };

    var error = function error(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('error', node, capture);
    };

    var hashchange = function hashchange(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('hashchange', node, capture);
    };

    var popstate = function popstate(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('popstate', node, capture);
    };

    var load = function load(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('load', node, capture);
    };

    var unload = function unload(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('unload', node, capture);
    };

    var pointerdown = function pointerdown(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('pointerdown', node, capture);
    };

    var pointerup = function pointerup(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('pointerup', node, capture);
    };

    var pointermove = function pointermove(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('pointermove', node, capture);
    };

    var pointerover = function pointerover(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('pointerover', node, capture);
    };

    var pointerenter = function pointerenter(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('pointerenter', node, capture);
    };

    var pointerout = function pointerout(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('pointerout', node, capture);
    };

    var pointerleave = function pointerleave(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('pointerleave', node, capture);
    };

    var touchstart = function touchstart(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('touchstart', node, capture);
    };

    var touchend = function touchend(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('touchend', node, capture);
    };

    var touchmove = function touchmove(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('touchmove', node, capture);
    };

    var touchcancel = function touchcancel(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('touchcancel', node, capture);
    };

    var DomEvent = function () {
        function DomEvent(event, node, capture) {
            _classCallCheck(this, DomEvent);

            this.event = event;
            this.node = node;
            this.capture = capture;
        }

        _createClass(DomEvent, [{
            key: 'run',
            value: function run(sink, scheduler) {
                var _this = this;

                var send = function send(e) {
                    return tryEvent(scheduler.now(), e, sink);
                };

                var dispose = function dispose() {
                    return _this.node.removeEventListener(_this.event, send, _this.capture);
                };

                this.node.addEventListener(this.event, send, this.capture);
                return {
                    dispose: dispose
                };
            }
        }]);

        return DomEvent;
    }();

    function tryEvent(t, x, sink) {
        try {
            sink.event(t, x);
        } catch (e) {
            sink.error(t, e);
        }
    }

    exports.domEvent = domEvent;
    exports.blur = blur;
    exports.focus = focus;
    exports.focusin = focusin;
    exports.focusout = focusout;
    exports.click = click;
    exports.dblclick = dblclick;
    exports.mousedown = mousedown;
    exports.mouseup = mouseup;
    exports.mousemove = mousemove;
    exports.mouseover = mouseover;
    exports.mouseenter = mouseenter;
    exports.mouseout = mouseout;
    exports.mouseleave = mouseleave;
    exports.change = change;
    exports.select = select;
    exports.submit = submit;
    exports.keydown = keydown;
    exports.keypress = keypress;
    exports.keyup = keyup;
    exports.input = input;
    exports.contextmenu = contextmenu;
    exports.resize = resize;
    exports.scroll = scroll;
    exports.error = error;
    exports.hashchange = hashchange;
    exports.popstate = popstate;
    exports.load = load;
    exports.unload = unload;
    exports.pointerdown = pointerdown;
    exports.pointerup = pointerup;
    exports.pointermove = pointermove;
    exports.pointerover = pointerover;
    exports.pointerenter = pointerenter;
    exports.pointerout = pointerout;
    exports.pointerleave = pointerleave;
    exports.touchstart = touchstart;
    exports.touchend = touchend;
    exports.touchmove = touchmove;
    exports.touchcancel = touchcancel;
});

},{"most":183}],82:[function(require,module,exports){
arguments[4][4][0].apply(exports,arguments)
},{"dup":4,"most/lib/source/MulticastSource":170}],83:[function(require,module,exports){
'use strict';

/**
 * # Clone Array
 *
 * Clone an array or array like object (e.g. `arguments`).
 * This is the equivalent of calling `Array.prototype.slice.call(arguments)`, but
 * significantly faster.
 *
 * @param  {Array} input The array or array-like object to clone.
 * @return {Array}       The cloned array.
 */
module.exports = function fastCloneArray (input) {
  var length = input.length,
      sliced = new Array(length),
      i;
  for (i = 0; i < length; i++) {
    sliced[i] = input[i];
  }
  return sliced;
};

},{}],84:[function(require,module,exports){
'use strict';

/**
 * # Concat
 *
 * Concatenate multiple arrays.
 *
 * > Note: This function is effectively identical to `Array.prototype.concat()`.
 *
 *
 * @param  {Array|mixed} item, ... The item(s) to concatenate.
 * @return {Array}                 The array containing the concatenated items.
 */
module.exports = function fastConcat () {
  var length = arguments.length,
      arr = [],
      i, item, childLength, j;

  for (i = 0; i < length; i++) {
    item = arguments[i];
    if (Array.isArray(item)) {
      childLength = item.length;
      for (j = 0; j < childLength; j++) {
        arr.push(item[j]);
      }
    }
    else {
      arr.push(item);
    }
  }
  return arr;
};

},{}],85:[function(require,module,exports){
'use strict';

var bindInternal3 = require('../function/bindInternal3');

/**
 * # Every
 *
 * A fast `.every()` implementation.
 *
 * @param  {Array}    subject     The array (or array-like) to iterate over.
 * @param  {Function} fn          The visitor function.
 * @param  {Object}   thisContext The context for the visitor.
 * @return {Boolean}              true if all items in the array passes the truth test.
 */
module.exports = function fastEvery (subject, fn, thisContext) {
  var length = subject.length,
      iterator = thisContext !== undefined ? bindInternal3(fn, thisContext) : fn,
      i;
  for (i = 0; i < length; i++) {
    if (!iterator(subject[i], i, subject)) {
      return false;
    }
  }
  return true;
};

},{"../function/bindInternal3":97}],86:[function(require,module,exports){
'use strict';

/**
 * # Fill
 * Fill an array with values, optionally starting and stopping at a given index.
 *
 * > Note: unlike the specced Array.prototype.fill(), this version does not support
 * > negative start / end arguments.
 *
 * @param  {Array}   subject The array to fill.
 * @param  {mixed}   value   The value to insert.
 * @param  {Integer} start   The start position, defaults to 0.
 * @param  {Integer} end     The end position, defaults to subject.length
 * @return {Array}           The now filled subject.
 */
module.exports = function fastFill (subject, value, start, end) {
  var length = subject.length,
      i;
  if (start === undefined) {
    start = 0;
  }
  if (end === undefined) {
    end = length;
  }
  for (i = start; i < end; i++) {
    subject[i] = value;
  }
  return subject;
};
},{}],87:[function(require,module,exports){
'use strict';

var bindInternal3 = require('../function/bindInternal3');

/**
 * # Filter
 *
 * A fast `.filter()` implementation.
 *
 * @param  {Array}    subject     The array (or array-like) to filter.
 * @param  {Function} fn          The filter function.
 * @param  {Object}   thisContext The context for the filter.
 * @return {Array}                The array containing the results.
 */
module.exports = function fastFilter (subject, fn, thisContext) {
  var length = subject.length,
      result = [],
      iterator = thisContext !== undefined ? bindInternal3(fn, thisContext) : fn,
      i;
  for (i = 0; i < length; i++) {
    if (iterator(subject[i], i, subject)) {
      result.push(subject[i]);
    }
  }
  return result;
};

},{"../function/bindInternal3":97}],88:[function(require,module,exports){
'use strict';

var bindInternal3 = require('../function/bindInternal3');

/**
 * # For Each
 *
 * A fast `.forEach()` implementation.
 *
 * @param  {Array}    subject     The array (or array-like) to iterate over.
 * @param  {Function} fn          The visitor function.
 * @param  {Object}   thisContext The context for the visitor.
 */
module.exports = function fastForEach (subject, fn, thisContext) {
  var length = subject.length,
      iterator = thisContext !== undefined ? bindInternal3(fn, thisContext) : fn,
      i;
  for (i = 0; i < length; i++) {
    iterator(subject[i], i, subject);
  }
};

},{"../function/bindInternal3":97}],89:[function(require,module,exports){
'use strict';

exports.clone = require('./clone');
exports.concat = require('./concat');
exports.every = require('./every');
exports.filter = require('./filter');
exports.forEach = require('./forEach');
exports.indexOf = require('./indexOf');
exports.lastIndexOf = require('./lastIndexOf');
exports.map = require('./map');
exports.pluck = require('./pluck');
exports.reduce = require('./reduce');
exports.reduceRight = require('./reduceRight');
exports.some = require('./some');
exports.fill = require('./fill');
},{"./clone":83,"./concat":84,"./every":85,"./fill":86,"./filter":87,"./forEach":88,"./indexOf":90,"./lastIndexOf":91,"./map":92,"./pluck":93,"./reduce":94,"./reduceRight":95,"./some":96}],90:[function(require,module,exports){
'use strict';

/**
 * # Index Of
 *
 * A faster `Array.prototype.indexOf()` implementation.
 *
 * @param  {Array}  subject   The array (or array-like) to search within.
 * @param  {mixed}  target    The target item to search for.
 * @param  {Number} fromIndex The position to start searching from, if known.
 * @return {Number}           The position of the target in the subject, or -1 if it does not exist.
 */
module.exports = function fastIndexOf (subject, target, fromIndex) {
  var length = subject.length,
      i = 0;

  if (typeof fromIndex === 'number') {
    i = fromIndex;
    if (i < 0) {
      i += length;
      if (i < 0) {
        i = 0;
      }
    }
  }

  for (; i < length; i++) {
    if (subject[i] === target) {
      return i;
    }
  }
  return -1;
};

},{}],91:[function(require,module,exports){
'use strict';

/**
 * # Last Index Of
 *
 * A faster `Array.prototype.lastIndexOf()` implementation.
 *
 * @param  {Array}  subject The array (or array-like) to search within.
 * @param  {mixed}  target  The target item to search for.
 * @param  {Number} fromIndex The position to start searching backwards from, if known.
 * @return {Number}         The last position of the target in the subject, or -1 if it does not exist.
 */
module.exports = function fastLastIndexOf (subject, target, fromIndex) {
  var length = subject.length,
      i = length - 1;

  if (typeof fromIndex === 'number') {
    i = fromIndex;
    if (i < 0) {
      i += length;
    }
  }
  for (; i >= 0; i--) {
    if (subject[i] === target) {
      return i;
    }
  }
  return -1;
};

},{}],92:[function(require,module,exports){
'use strict';

var bindInternal3 = require('../function/bindInternal3');

/**
 * # Map
 *
 * A fast `.map()` implementation.
 *
 * @param  {Array}    subject     The array (or array-like) to map over.
 * @param  {Function} fn          The mapper function.
 * @param  {Object}   thisContext The context for the mapper.
 * @return {Array}                The array containing the results.
 */
module.exports = function fastMap (subject, fn, thisContext) {
  var length = subject.length,
      result = new Array(length),
      iterator = thisContext !== undefined ? bindInternal3(fn, thisContext) : fn,
      i;
  for (i = 0; i < length; i++) {
    result[i] = iterator(subject[i], i, subject);
  }
  return result;
};

},{"../function/bindInternal3":97}],93:[function(require,module,exports){
'use strict';

/**
 * # Pluck
 * Pluck the property with the given name from an array of objects.
 *
 * @param  {Array}  input The values to pluck from.
 * @param  {String} field The name of the field to pluck.
 * @return {Array}        The plucked array of values.
 */
module.exports = function fastPluck (input, field) {
  var length = input.length,
      plucked = [],
      count = 0,
      value, i;

  for (i = 0; i < length; i++) {
    value = input[i];
    if (value != null && value[field] !== undefined) {
      plucked[count++] = value[field];
    }
  }
  return plucked;
};
},{}],94:[function(require,module,exports){
'use strict';

var bindInternal4 = require('../function/bindInternal4');

/**
 * # Reduce
 *
 * A fast `.reduce()` implementation.
 *
 * @param  {Array}    subject      The array (or array-like) to reduce.
 * @param  {Function} fn           The reducer function.
 * @param  {mixed}    initialValue The initial value for the reducer, defaults to subject[0].
 * @param  {Object}   thisContext  The context for the reducer.
 * @return {mixed}                 The final result.
 */
module.exports = function fastReduce (subject, fn, initialValue, thisContext) {
  var length = subject.length,
      iterator = thisContext !== undefined ? bindInternal4(fn, thisContext) : fn,
      i, result;

  if (initialValue === undefined) {
    i = 1;
    result = subject[0];
  }
  else {
    i = 0;
    result = initialValue;
  }

  for (; i < length; i++) {
    result = iterator(result, subject[i], i, subject);
  }

  return result;
};

},{"../function/bindInternal4":98}],95:[function(require,module,exports){
'use strict';

var bindInternal4 = require('../function/bindInternal4');

/**
 * # Reduce Right
 *
 * A fast `.reduceRight()` implementation.
 *
 * @param  {Array}    subject      The array (or array-like) to reduce.
 * @param  {Function} fn           The reducer function.
 * @param  {mixed}    initialValue The initial value for the reducer, defaults to subject[0].
 * @param  {Object}   thisContext  The context for the reducer.
 * @return {mixed}                 The final result.
 */
module.exports = function fastReduce (subject, fn, initialValue, thisContext) {
  var length = subject.length,
      iterator = thisContext !== undefined ? bindInternal4(fn, thisContext) : fn,
      i, result;

  if (initialValue === undefined) {
    i = length - 2;
    result = subject[length - 1];
  }
  else {
    i = length - 1;
    result = initialValue;
  }

  for (; i >= 0; i--) {
    result = iterator(result, subject[i], i, subject);
  }

  return result;
};

},{"../function/bindInternal4":98}],96:[function(require,module,exports){
'use strict';

var bindInternal3 = require('../function/bindInternal3');

/**
 * # Some
 *
 * A fast `.some()` implementation.
 *
 * @param  {Array}    subject     The array (or array-like) to iterate over.
 * @param  {Function} fn          The visitor function.
 * @param  {Object}   thisContext The context for the visitor.
 * @return {Boolean}              true if at least one item in the array passes the truth test.
 */
module.exports = function fastSome (subject, fn, thisContext) {
  var length = subject.length,
      iterator = thisContext !== undefined ? bindInternal3(fn, thisContext) : fn,
      i;
  for (i = 0; i < length; i++) {
    if (iterator(subject[i], i, subject)) {
      return true;
    }
  }
  return false;
};

},{"../function/bindInternal3":97}],97:[function(require,module,exports){
'use strict';

/**
 * Internal helper to bind a function known to have 3 arguments
 * to a given context.
 */
module.exports = function bindInternal3 (func, thisContext) {
  return function (a, b, c) {
    return func.call(thisContext, a, b, c);
  };
};

},{}],98:[function(require,module,exports){
'use strict';

/**
 * Internal helper to bind a function known to have 4 arguments
 * to a given context.
 */
module.exports = function bindInternal4 (func, thisContext) {
  return function (a, b, c, d) {
    return func.call(thisContext, a, b, c, d);
  };
};

},{}],99:[function(require,module,exports){
'use strict';

/**
 * Analogue of Object.assign().
 * Copies properties from one or more source objects to
 * a target object. Existing keys on the target object will be overwritten.
 *
 * > Note: This differs from spec in some important ways:
 * > 1. Will throw if passed non-objects, including `undefined` or `null` values.
 * > 2. Does not support the curious Exception handling behavior, exceptions are thrown immediately.
 * > For more details, see:
 * > https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 *
 *
 *
 * @param  {Object} target      The target object to copy properties to.
 * @param  {Object} source, ... The source(s) to copy properties from.
 * @return {Object}             The updated target object.
 */
module.exports = function fastAssign (target) {
  var totalArgs = arguments.length,
      source, i, totalKeys, keys, key, j;

  for (i = 1; i < totalArgs; i++) {
    source = arguments[i];
    keys = Object.keys(source);
    totalKeys = keys.length;
    for (j = 0; j < totalKeys; j++) {
      key = keys[j];
      target[key] = source[key];
    }
  }
  return target;
};

},{}],100:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var isValidString = function isValidString(param) {
  return typeof param === 'string' && param.length > 0;
};

var startsWith = function startsWith(string, start) {
  return string[0] === start;
};

var isSelector = function isSelector(param) {
  return isValidString(param) && (startsWith(param, '.') || startsWith(param, '#'));
};

var node = function node(h) {
  return function (tagName) {
    return function (first) {
      for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        rest[_key - 1] = arguments[_key];
      }

      if (isSelector(first)) {
        return h.apply(undefined, [tagName + first].concat(rest));
      } else {
        return h.apply(undefined, [tagName, first].concat(rest));
      }
    };
  };
};

var TAG_NAMES = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'dd', 'del', 'dfn', 'dir', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'menu', 'meta', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'p', 'param', 'pre', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'title', 'tr', 'u', 'ul', 'video'];

exports['default'] = function (h) {
  var createTag = node(h);
  var exported = { TAG_NAMES: TAG_NAMES, isSelector: isSelector, createTag: createTag };
  TAG_NAMES.forEach(function (n) {
    exported[n] = createTag(n);
  });
  return exported;
};

module.exports = exports['default'];

},{}],101:[function(require,module,exports){
'use strict';

var proto = Element.prototype;
var vendor = proto.matches
  || proto.matchesSelector
  || proto.webkitMatchesSelector
  || proto.mozMatchesSelector
  || proto.msMatchesSelector
  || proto.oMatchesSelector;

module.exports = match;

/**
 * Match `el` to `selector`.
 *
 * @param {Element} el
 * @param {String} selector
 * @return {Boolean}
 * @api public
 */

function match(el, selector) {
  if (vendor) return vendor.call(el, selector);
  var nodes = el.parentNode.querySelectorAll(selector);
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i] == el) return true;
  }
  return false;
}
},{}],102:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = classNameFromVNode;

var _selectorParser2 = require('./selectorParser');

var _selectorParser3 = _interopRequireDefault(_selectorParser2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function classNameFromVNode(vNode) {
  var _selectorParser = (0, _selectorParser3.default)(vNode.sel);

  var cn = _selectorParser.className;

  if (!vNode.data) {
    return cn;
  }

  var _vNode$data = vNode.data;
  var dataClass = _vNode$data.class;
  var props = _vNode$data.props;

  if (dataClass) {
    var c = Object.keys(vNode.data.class).filter(function (cl) {
      return vNode.data.class[cl];
    });
    cn += ' ' + c.join(' ');
  }

  if (props && props.className) {
    cn += ' ' + props.className;
  }

  return cn.trim();
}
},{"./selectorParser":103}],103:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = selectorParser;

var _browserSplit = require('browser-split');

var _browserSplit2 = _interopRequireDefault(_browserSplit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var classIdSplit = /([\.#]?[a-zA-Z0-9\u007F-\uFFFF_:-]+)/;
var notClassId = /^\.|#/;

function selectorParser() {
  var selector = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

  var tagName = undefined;
  var id = '';
  var classes = [];

  var tagParts = (0, _browserSplit2.default)(selector, classIdSplit);

  if (notClassId.test(tagParts[1]) || selector === '') {
    tagName = 'div';
  }

  var part = undefined;
  var type = undefined;
  var i = undefined;

  for (i = 0; i < tagParts.length; i++) {
    part = tagParts[i];

    if (!part) {
      continue;
    }

    type = part.charAt(0);

    if (!tagName) {
      tagName = part;
    } else if (type === '.') {
      classes.push(part.substring(1, part.length));
    } else if (type === '#') {
      id = part.substring(1, part.length);
    }
  }

  return {
    tagName: tagName,
    id: id,
    className: classes.join(' ')
  };
}
},{"browser-split":104}],104:[function(require,module,exports){
/*!
 * Cross-Browser Split 1.1.1
 * Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
 * Available under the MIT License
 * ECMAScript compliant, uniform cross-browser split method
 */

/**
 * Splits a string into an array of strings using a regex or string separator. Matches of the
 * separator are not included in the result array. However, if `separator` is a regex that contains
 * capturing groups, backreferences are spliced into the result each time `separator` is matched.
 * Fixes browser bugs compared to the native `String.prototype.split` and can be used reliably
 * cross-browser.
 * @param {String} str String to split.
 * @param {RegExp|String} separator Regex or string to use for separating the string.
 * @param {Number} [limit] Maximum number of items to include in the result array.
 * @returns {Array} Array of substrings.
 * @example
 *
 * // Basic use
 * split('a b c d', ' ');
 * // -> ['a', 'b', 'c', 'd']
 *
 * // With limit
 * split('a b c d', ' ', 2);
 * // -> ['a', 'b']
 *
 * // Backreferences in result array
 * split('..word1 word2..', /([a-z]+)(\d+)/i);
 * // -> ['..', 'word', '1', ' ', 'word', '2', '..']
 */
module.exports = (function split(undef) {

  var nativeSplit = String.prototype.split,
    compliantExecNpcg = /()??/.exec("")[1] === undef,
    // NPCG: nonparticipating capturing group
    self;

  self = function(str, separator, limit) {
    // If `separator` is not a regex, use `nativeSplit`
    if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
      return nativeSplit.call(str, separator, limit);
    }
    var output = [],
      flags = (separator.ignoreCase ? "i" : "") + (separator.multiline ? "m" : "") + (separator.extended ? "x" : "") + // Proposed for ES6
      (separator.sticky ? "y" : ""),
      // Firefox 3+
      lastLastIndex = 0,
      // Make `global` and avoid `lastIndex` issues by working with a copy
      separator = new RegExp(separator.source, flags + "g"),
      separator2, match, lastIndex, lastLength;
    str += ""; // Type-convert
    if (!compliantExecNpcg) {
      // Doesn't need flags gy, but they don't hurt
      separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
    }
    /* Values for `limit`, per the spec:
     * If undefined: 4294967295 // Math.pow(2, 32) - 1
     * If 0, Infinity, or NaN: 0
     * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
     * If negative number: 4294967296 - Math.floor(Math.abs(limit))
     * If other: Type-convert, then use the above rules
     */
    limit = limit === undef ? -1 >>> 0 : // Math.pow(2, 32) - 1
    limit >>> 0; // ToUint32(limit)
    while (match = separator.exec(str)) {
      // `separator.lastIndex` is not reliable cross-browser
      lastIndex = match.index + match[0].length;
      if (lastIndex > lastLastIndex) {
        output.push(str.slice(lastLastIndex, match.index));
        // Fix browsers whose `exec` methods don't consistently return `undefined` for
        // nonparticipating capturing groups
        if (!compliantExecNpcg && match.length > 1) {
          match[0].replace(separator2, function() {
            for (var i = 1; i < arguments.length - 2; i++) {
              if (arguments[i] === undef) {
                match[i] = undef;
              }
            }
          });
        }
        if (match.length > 1 && match.index < str.length) {
          Array.prototype.push.apply(output, match.slice(1));
        }
        lastLength = match[0].length;
        lastLastIndex = lastIndex;
        if (output.length >= limit) {
          break;
        }
      }
      if (separator.lastIndex === match.index) {
        separator.lastIndex++; // Avoid an infinite loop
      }
    }
    if (lastLastIndex === str.length) {
      if (lastLength || !separator.test("")) {
        output.push("");
      }
    } else {
      output.push(str.slice(lastLastIndex));
    }
    return output.length > limit ? output.slice(0, limit) : output;
  };

  return self;
})();

},{}],105:[function(require,module,exports){
var VNode = require('./vnode');
var is = require('./is');

function addNS(data, children) {
  data.ns = 'http://www.w3.org/2000/svg';
  if (children !== undefined) {
    for (var i = 0; i < children.length; ++i) {
      addNS(children[i].data, children[i].children);
    }
  }
}

module.exports = function h(sel, b, c) {
  var data = {}, children, text, i;
  if (arguments.length === 3) {
    data = b;
    if (is.array(c)) { children = c; }
    else if (is.primitive(c)) { text = c; }
  } else if (arguments.length === 2) {
    if (is.array(b)) { children = b; }
    else if (is.primitive(b)) { text = b; }
    else { data = b; }
  }
  if (is.array(children)) {
    for (i = 0; i < children.length; ++i) {
      if (is.primitive(children[i])) children[i] = VNode(undefined, undefined, undefined, children[i]);
    }
  }
  if (sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g') {
    addNS(data, children);
  }
  return VNode(sel, data, children, text, undefined);
};

},{"./is":106,"./vnode":113}],106:[function(require,module,exports){
module.exports = {
  array: Array.isArray,
  primitive: function(s) { return typeof s === 'string' || typeof s === 'number'; },
};

},{}],107:[function(require,module,exports){
var booleanAttrs = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "compact", "controls", "declare", 
                "default", "defaultchecked", "defaultmuted", "defaultselected", "defer", "disabled", "draggable", 
                "enabled", "formnovalidate", "hidden", "indeterminate", "inert", "ismap", "itemscope", "loop", "multiple", 
                "muted", "nohref", "noresize", "noshade", "novalidate", "nowrap", "open", "pauseonexit", "readonly", 
                "required", "reversed", "scoped", "seamless", "selected", "sortable", "spellcheck", "translate", 
                "truespeed", "typemustmatch", "visible"];
    
var booleanAttrsDict = {};
for(var i=0, len = booleanAttrs.length; i < len; i++) {
  booleanAttrsDict[booleanAttrs[i]] = true;
}
    
function updateAttrs(oldVnode, vnode) {
  var key, cur, old, elm = vnode.elm,
      oldAttrs = oldVnode.data.attrs || {}, attrs = vnode.data.attrs || {};
  
  // update modified attributes, add new attributes
  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      // TODO: add support to namespaced attributes (setAttributeNS)
      if(!cur && booleanAttrsDict[key])
        elm.removeAttribute(key);
      else
        elm.setAttribute(key, cur);
    }
  }
  //remove removed attributes
  // use `in` operator since the previous `for` iteration uses it (.i.e. add even attributes with undefined value)
  // the other option is to remove all attributes with value == undefined
  for (key in oldAttrs) {
    if (!(key in attrs)) {
      elm.removeAttribute(key);
    }
  }
}

module.exports = {create: updateAttrs, update: updateAttrs};

},{}],108:[function(require,module,exports){
function updateClass(oldVnode, vnode) {
  var cur, name, elm = vnode.elm,
      oldClass = oldVnode.data.class || {},
      klass = vnode.data.class || {};
  for (name in oldClass) {
    if (!klass[name]) {
      elm.classList.remove(name);
    }
  }
  for (name in klass) {
    cur = klass[name];
    if (cur !== oldClass[name]) {
      elm.classList[cur ? 'add' : 'remove'](name);
    }
  }
}

module.exports = {create: updateClass, update: updateClass};

},{}],109:[function(require,module,exports){
function updateProps(oldVnode, vnode) {
  var key, cur, old, elm = vnode.elm,
      oldProps = oldVnode.data.props || {}, props = vnode.data.props || {};
  for (key in oldProps) {
    if (!props[key]) {
      delete elm[key];
    }
  }
  for (key in props) {
    cur = props[key];
    old = oldProps[key];
    if (old !== cur) {
      elm[key] = cur;
    }
  }
}

module.exports = {create: updateProps, update: updateProps};

},{}],110:[function(require,module,exports){
var raf = (window && window.requestAnimationFrame) || setTimeout;
var nextFrame = function(fn) { raf(function() { raf(fn); }); };

function setNextFrame(obj, prop, val) {
  nextFrame(function() { obj[prop] = val; });
}

function updateStyle(oldVnode, vnode) {
  var cur, name, elm = vnode.elm,
      oldStyle = oldVnode.data.style || {},
      style = vnode.data.style || {},
      oldHasDel = 'delayed' in oldStyle;
  for (name in oldStyle) {
    if (!style[name]) {
      elm.style[name] = '';
    }
  }
  for (name in style) {
    cur = style[name];
    if (name === 'delayed') {
      for (name in style.delayed) {
        cur = style.delayed[name];
        if (!oldHasDel || cur !== oldStyle.delayed[name]) {
          setNextFrame(elm.style, name, cur);
        }
      }
    } else if (name !== 'remove' && cur !== oldStyle[name]) {
      elm.style[name] = cur;
    }
  }
}

function applyDestroyStyle(vnode) {
  var style, name, elm = vnode.elm, s = vnode.data.style;
  if (!s || !(style = s.destroy)) return;
  for (name in style) {
    elm.style[name] = style[name];
  }
}

function applyRemoveStyle(vnode, rm) {
  var s = vnode.data.style;
  if (!s || !s.remove) {
    rm();
    return;
  }
  var name, elm = vnode.elm, idx, i = 0, maxDur = 0,
      compStyle, style = s.remove, amount = 0, applied = [];
  for (name in style) {
    applied.push(name);
    elm.style[name] = style[name];
  }
  compStyle = getComputedStyle(elm);
  var props = compStyle['transition-property'].split(', ');
  for (; i < props.length; ++i) {
    if(applied.indexOf(props[i]) !== -1) amount++;
  }
  elm.addEventListener('transitionend', function(ev) {
    if (ev.target === elm) --amount;
    if (amount === 0) rm();
  });
}

module.exports = {create: updateStyle, update: updateStyle, destroy: applyDestroyStyle, remove: applyRemoveStyle};

},{}],111:[function(require,module,exports){
// jshint newcap: false
/* global require, module, document, Element */
'use strict';

var VNode = require('./vnode');
var is = require('./is');

function isUndef(s) { return s === undefined; }
function isDef(s) { return s !== undefined; }

function emptyNodeAt(elm) {
  return VNode(elm.tagName, {}, [], undefined, elm);
}

var emptyNode = VNode('', {}, [], undefined, undefined);

function sameVnode(vnode1, vnode2) {
  return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
}

function createKeyToOldIdx(children, beginIdx, endIdx) {
  var i, map = {}, key;
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) map[key] = i;
  }
  return map;
}

function createRmCb(childElm, listeners) {
  return function() {
    if (--listeners === 0) childElm.parentElement.removeChild(childElm);
  };
}

var hooks = ['create', 'update', 'remove', 'destroy', 'pre', 'post'];

function init(modules) {
  var i, j, cbs = {};
  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (modules[j][hooks[i]] !== undefined) cbs[hooks[i]].push(modules[j][hooks[i]]);
    }
  }

  function createElm(vnode, insertedVnodeQueue) {
    var i, data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) i(vnode);
      if (isDef(i = data.vnode)) vnode = i;
    }
    var elm, children = vnode.children, sel = vnode.sel;
    if (isDef(sel)) {
      // Parse selector
      var hashIdx = sel.indexOf('#');
      var dotIdx = sel.indexOf('.', hashIdx);
      var hash = hashIdx > 0 ? hashIdx : sel.length;
      var dot = dotIdx > 0 ? dotIdx : sel.length;
      var tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;
      elm = vnode.elm = isDef(data) && isDef(i = data.ns) ? document.createElementNS(i, tag)
                                                          : document.createElement(tag);
      if (hash < dot) elm.id = sel.slice(hash + 1, dot);
      if (dotIdx > 0) elm.className = sel.slice(dot+1).replace(/\./g, ' ');
      if (is.array(children)) {
        for (i = 0; i < children.length; ++i) {
          elm.appendChild(createElm(children[i], insertedVnodeQueue));
        }
      } else if (is.primitive(vnode.text)) {
        elm.appendChild(document.createTextNode(vnode.text));
      }
      for (i = 0; i < cbs.create.length; ++i) cbs.create[i](emptyNode, vnode);
      i = vnode.data.hook; // Reuse variable
      if (isDef(i)) {
        if (i.create) i.create(emptyNode, vnode);
        if (i.insert) insertedVnodeQueue.push(vnode);
      }
    } else {
      elm = vnode.elm = document.createTextNode(vnode.text);
    }
    return vnode.elm;
  }

  function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      parentElm.insertBefore(createElm(vnodes[startIdx], insertedVnodeQueue), before);
    }
  }

  function invokeDestroyHook(vnode) {
    var i = vnode.data, j;
    if (isDef(i)) {
      if (isDef(i = i.hook) && isDef(i = i.destroy)) i(vnode);
      for (i = 0; i < cbs.destroy.length; ++i) cbs.destroy[i](vnode);
      if (isDef(i = vnode.children)) {
        for (j = 0; j < vnode.children.length; ++j) {
          invokeDestroyHook(vnode.children[j]);
        }
      }
    }
  }

  function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var i, listeners, rm, ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.sel)) {
          invokeDestroyHook(ch);
          listeners = cbs.remove.length + 1;
          rm = createRmCb(ch.elm, listeners);
          for (i = 0; i < cbs.remove.length; ++i) cbs.remove[i](ch, rm);
          if (isDef(i = ch.data) && isDef(i = i.hook) && isDef(i = i.remove)) {
            i(ch, rm);
          } else {
            rm();
          }
        } else { // Text node
          parentElm.removeChild(ch.elm);
        }
      }
    }
  }

  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {
    var oldStartIdx = 0, newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, elmToMove, before;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        idxInOld = oldKeyToIdx[newStartVnode.key];
        if (isUndef(idxInOld)) { // New element
          parentElm.insertBefore(createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        } else {
          elmToMove = oldCh[idxInOld];
          patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
          oldCh[idxInOld] = undefined;
          parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        }
      }
    }
    if (oldStartIdx > oldEndIdx) {
      before = isUndef(newCh[newEndIdx+1]) ? null : newCh[newEndIdx+1].elm;
      addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function patchVnode(oldVnode, vnode, insertedVnodeQueue) {
    var i, hook;
    if (isDef(i = vnode.data) && isDef(hook = i.hook) && isDef(i = hook.prepatch)) {
      i(oldVnode, vnode);
    }
    if (isDef(i = oldVnode.data) && isDef(i = i.vnode)) oldVnode = i;
    if (isDef(i = vnode.data) && isDef(i = i.vnode)) vnode = i;
    var elm = vnode.elm = oldVnode.elm, oldCh = oldVnode.children, ch = vnode.children;
    if (oldVnode === vnode) return;
    if (isDef(vnode.data)) {
      for (i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode);
      i = vnode.data.hook;
      if (isDef(i) && isDef(i = i.update)) i(oldVnode, vnode);
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue);
      } else if (isDef(ch)) {
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      }
    } else if (oldVnode.text !== vnode.text) {
      elm.textContent = vnode.text;
    }
    if (isDef(hook) && isDef(i = hook.postpatch)) {
      i(oldVnode, vnode);
    }
  }

  return function(oldVnode, vnode) {
    var i;
    var insertedVnodeQueue = [];
    for (i = 0; i < cbs.pre.length; ++i) cbs.pre[i]();
    if (oldVnode instanceof Element) {
      if (oldVnode.parentElement !== null) {
        createElm(vnode, insertedVnodeQueue);
        oldVnode.parentElement.replaceChild(vnode.elm, oldVnode);
      } else {
        oldVnode = emptyNodeAt(oldVnode);
        patchVnode(oldVnode, vnode, insertedVnodeQueue);
      }
    } else {
      patchVnode(oldVnode, vnode, insertedVnodeQueue);
    }
    for (i = 0; i < insertedVnodeQueue.length; ++i) {
      insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);
    }
    for (i = 0; i < cbs.post.length; ++i) cbs.post[i]();
    return vnode;
  };
}

module.exports = {init: init};

},{"./is":106,"./vnode":113}],112:[function(require,module,exports){
var h = require('./h');

function init(thunk) {
  var i, cur = thunk.data;
  cur.vnode = cur.fn.apply(undefined, cur.args);
}

function prepatch(oldThunk, thunk) {
  var i, old = oldThunk.data, cur = thunk.data;
  var oldArgs = old.args, args = cur.args;
  cur.vnode = old.vnode;
  if (oldArgs.length !== args.length) {
    cur.vnode = cur.fn.apply(undefined, args);
    return;
  }
  for (i = 0; i < args.length; ++i) {
    if (oldArgs[i] !== args[i]) {
      cur.vnode = cur.fn.apply(undefined, args);
      return;
    }
  }
}

module.exports = function(name, fn /* args */) {
  var i, args = [];
  for (i = 2; i < arguments.length; ++i) {
    args[i - 2] = arguments[i];
  }
  return h('thunk' + name, {
    hook: {init: init, prepatch: prepatch},
    fn: fn, args: args,
  });
};

},{"./h":105}],113:[function(require,module,exports){
module.exports = function(sel, data, children, text, elm) {
  var key = data === undefined ? undefined : data.key;
  return {sel: sel, data: data, children: children,
          text: text, elm: elm, key: key};
};

},{}],114:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],115:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function tryEvent(sink, scheduler, event) {
  try {
    sink.event(scheduler.now(), event);
  } catch (err) {
    sink.error(scheduler.now(), err);
  }
}

function tryEnd(sink, scheduler, event) {
  try {
    sink.end(scheduler.now(), event);
  } catch (err) {
    sink.error(scheduler.now(), err);
  }
}

var Observer = function () {
  function Observer() {
    var _this = this;

    _classCallCheck(this, Observer);

    this.run = function (sink, scheduler) {
      return _this._run(sink, scheduler);
    };
    this.next = function (x) {
      return _this._next(x);
    };
    this.error = function (err) {
      return _this._error(err);
    };
    this.complete = function (x) {
      return _this._complete(x);
    };
  }

  _createClass(Observer, [{
    key: "_run",
    value: function _run(sink, scheduler) {
      this.sink = sink;
      this.scheduler = scheduler;
      this.active = true;
      return this;
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this.active = false;
    }
  }, {
    key: "_next",
    value: function _next(value) {
      if (!this.active) {
        return;
      }
      tryEvent(this.sink, this.scheduler, value);
    }
  }, {
    key: "_error",
    value: function _error(err) {
      this.active = false;
      this.sink.error(this.scheduler.now(), err);
    }
  }, {
    key: "_complete",
    value: function _complete(value) {
      if (!this.active) {
        return;
      }
      this.active = false;
      tryEnd(this.sink, this.scheduler, value);
    }
  }]);

  return Observer;
}();

exports.Observer = Observer;
},{}],116:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.replay = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _most = require('most');

var _multicast = require('@most/multicast');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function pushEvents(sink, buffer) {
  var i = 0;
  for (; i < buffer.length; ++i) {
    var item = buffer[i];
    sink.event(item.time, item.value);
  }
}

function replayAdd(sink) {
  var length = this._replayAdd(sink);
  if (this._replay.buffer.length > 0) {
    pushEvents(sink, this._replay.buffer);
  }
  return length;
}

function addToBuffer(event, replay) {
  if (replay.buffer.length >= replay.bufferSize) {
    replay.buffer.shift();
  }
  replay.buffer.push(event);
}

function replayEvent(time, value) {
  if (this._replay.bufferSize > 0) {
    addToBuffer({ time: time, value: value }, this._replay);
  }
  this._replayEvent(time, value);
}

var Replay = function () {
  function Replay(bufferSize, source) {
    _classCallCheck(this, Replay);

    this.source = source;
    this.bufferSize = bufferSize;
    this.buffer = [];
  }

  _createClass(Replay, [{
    key: 'run',
    value: function run(sink, scheduler) {
      if (sink._replay !== this) {
        sink._replay = this;
        sink._replayAdd = sink.add;
        sink.add = replayAdd;

        sink._replayEvent = sink.event;
        sink.event = replayEvent;
      }

      return this.source.run(sink, scheduler);
    }
  }]);

  return Replay;
}();

var replay = function replay(bufferSize, stream) {
  return new _most.Stream(new _multicast.MulticastSource(new Replay(bufferSize, stream.source)));
};

exports.replay = replay;
},{"@most/multicast":1,"most":183}],117:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.holdSubject = exports.subject = undefined;

var _most = require('most');

var _multicast = require('@most/multicast');

var _Observer = require('./Observer');

var _Replay = require('./Replay');

function create(hold, bufferSize, initialValue) {
  var observer = new _Observer.Observer();
  var stream = hold ? (0, _Replay.replay)(bufferSize, new _most.Stream(observer)) : new _most.Stream(new _multicast.MulticastSource(observer));

  stream.drain();

  if (typeof initialValue !== 'undefined') {
    observer.next(initialValue);
  }

  return { stream: stream, observer: observer };
}

function subject() {
  return create(false, 0);
}

function holdSubject() {
  var bufferSize = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
  var initialValue = arguments[1];

  if (bufferSize < 1) {
    throw new Error('First argument to holdSubject is expected to be an ' + 'integer greater than or equal to 1');
  }
  return create(true, bufferSize, initialValue);
}

exports.subject = subject;
exports.holdSubject = holdSubject;
},{"./Observer":115,"./Replay":116,"@most/multicast":1,"most":183}],118:[function(require,module,exports){
arguments[4][8][0].apply(exports,arguments)
},{"dup":8}],119:[function(require,module,exports){
arguments[4][9][0].apply(exports,arguments)
},{"dup":9}],120:[function(require,module,exports){
arguments[4][10][0].apply(exports,arguments)
},{"dup":10}],121:[function(require,module,exports){
arguments[4][11][0].apply(exports,arguments)
},{"dup":11}],122:[function(require,module,exports){
arguments[4][12][0].apply(exports,arguments)
},{"dup":12}],123:[function(require,module,exports){
arguments[4][13][0].apply(exports,arguments)
},{"../Stream":121,"../base":122,"../runSource":158,"../sink/Pipe":167,"./build":125,"dup":13}],124:[function(require,module,exports){
arguments[4][14][0].apply(exports,arguments)
},{"../base":122,"./combine":126,"dup":14}],125:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var streamOf = require('../source/core').of;
var continueWith = require('./continueWith').continueWith;

exports.concat = concat;
exports.cycle = cycle;
exports.cons = cons;

/**
 * @param {*} x value to prepend
 * @param {Stream} stream
 * @returns {Stream} new stream with x prepended
 */
function cons(x, stream) {
	return concat(streamOf(x), stream);
}

/**
 * @param {Stream} left
 * @param {Stream} right
 * @returns {Stream} new stream containing all events in left followed by all
 *  events in right.  This *timeshifts* right to the end of left.
 */
function concat(left, right) {
	return continueWith(function() {
		return right;
	}, left);
}

/**
 * @deprecated
 * Tie stream into a circle, creating an infinite stream
 * @param {Stream} stream
 * @returns {Stream} new infinite stream
 */
function cycle(stream) {
	return continueWith(function cycleNext() {
		return cycle(stream);
	}, stream);
}

},{"../source/core":172,"./continueWith":128}],126:[function(require,module,exports){
arguments[4][16][0].apply(exports,arguments)
},{"../Stream":121,"../base":122,"../disposable/dispose":151,"../invoke":156,"../sink/IndexSink":165,"../sink/Pipe":167,"../source/core":172,"./merge":135,"./transform":146,"dup":16}],127:[function(require,module,exports){
arguments[4][17][0].apply(exports,arguments)
},{"./mergeConcurrently":136,"./transform":146,"dup":17}],128:[function(require,module,exports){
arguments[4][18][0].apply(exports,arguments)
},{"../Promise":119,"../Stream":121,"../disposable/dispose":151,"../sink/Pipe":167,"dup":18}],129:[function(require,module,exports){
arguments[4][19][0].apply(exports,arguments)
},{"../Stream":121,"../disposable/dispose":151,"../scheduler/PropagateTask":159,"../sink/Pipe":167,"dup":19}],130:[function(require,module,exports){
arguments[4][20][0].apply(exports,arguments)
},{"../Stream":121,"../base":122,"../disposable/dispose":151,"../source/ValueSource":171,"../source/tryEvent":181,"dup":20}],131:[function(require,module,exports){
arguments[4][21][0].apply(exports,arguments)
},{"../Stream":121,"../fusion/Filter":153,"../sink/Pipe":167,"dup":21}],132:[function(require,module,exports){
arguments[4][22][0].apply(exports,arguments)
},{"./mergeConcurrently":136,"./transform":146,"dup":22}],133:[function(require,module,exports){
arguments[4][23][0].apply(exports,arguments)
},{"../Stream":121,"../disposable/dispose":151,"../scheduler/PropagateTask":159,"../sink/Pipe":167,"dup":23}],134:[function(require,module,exports){
arguments[4][24][0].apply(exports,arguments)
},{"../Stream":121,"../sink/Pipe":167,"dup":24}],135:[function(require,module,exports){
arguments[4][25][0].apply(exports,arguments)
},{"../Stream":121,"../base":122,"../disposable/dispose":151,"../sink/IndexSink":165,"../sink/Pipe":167,"../source/core":172,"dup":25}],136:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var Stream = require('../Stream');
var dispose = require('../disposable/dispose');
var LinkedList = require('../LinkedList');

exports.mergeConcurrently = mergeConcurrently;

function mergeConcurrently(concurrency, stream) {
	return new Stream(new MergeConcurrently(concurrency, stream.source));
}

function MergeConcurrently(concurrency, source) {
	this.concurrency = concurrency;
	this.source = source;
}

MergeConcurrently.prototype.run = function(sink, scheduler) {
	return new Outer(this.concurrency, this.source, sink, scheduler);
};

function Outer(concurrency, source, sink, scheduler) {
	this.concurrency = concurrency;
	this.sink = sink;
	this.scheduler = scheduler;
	this.pending = [];
	this.current = new LinkedList();
	this.disposable = dispose.once(source.run(this, scheduler));
	this.active = true;
}

Outer.prototype.event = function(t, x) {
	this._addInner(t, x);
};

Outer.prototype._addInner = function(t, stream) {
	if(this.current.length < this.concurrency) {
		this._startInner(t, stream);
	} else {
		this.pending.push(stream);
	}
};

Outer.prototype._startInner = function(t, stream) {
	var innerSink = new Inner(t, this, this.sink);
	this.current.add(innerSink);
	innerSink.disposable = stream.source.run(innerSink, this.scheduler);
};

Outer.prototype.end = function(t, x) {
	this.active = false;
	dispose.tryDispose(t, this.disposable, this.sink);
	this._checkEnd(t, x);
};

Outer.prototype.error = function(t, e) {
	this.active = false;
	this.sink.error(t, e);
};

Outer.prototype.dispose = function() {
	this.active = false;
	this.pending.length = 0;
	return Promise.all([this.disposable.dispose(), this.current.dispose()]);
};

Outer.prototype._endInner = function(t, x, inner) {
	this.current.remove(inner);
	dispose.tryDispose(t, inner, this);

	if(this.pending.length === 0) {
		this._checkEnd(t, x);
	} else {
		this._startInner(t, this.pending.shift());
	}
};

Outer.prototype._checkEnd = function(t, x) {
	if(!this.active && this.current.isEmpty()) {
		this.sink.end(t, x);
	}
};

function Inner(time, outer, sink) {
	this.prev = this.next = null;
	this.time = time;
	this.outer = outer;
	this.sink = sink;
	this.disposable = void 0;
}

Inner.prototype.event = function(t, x) {
	this.sink.event(Math.max(t, this.time), x);
};

Inner.prototype.end = function(t, x) {
	this.outer._endInner(Math.max(t, this.time), x, this);
};

Inner.prototype.error = function(t, e) {
	this.outer.error(Math.max(t, this.time), e);
};

Inner.prototype.dispose = function() {
	return this.disposable.dispose();
};

},{"../LinkedList":118,"../Stream":121,"../disposable/dispose":151}],137:[function(require,module,exports){
arguments[4][27][0].apply(exports,arguments)
},{"../Stream":121,"../source/MulticastSource":170,"dup":27}],138:[function(require,module,exports){
arguments[4][28][0].apply(exports,arguments)
},{"../base":122,"../runSource":158,"dup":28}],139:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var Stream = require('../Stream');
var fatal = require('../fatalError');
var just = require('../source/core').of;

exports.fromPromise = fromPromise;
exports.awaitPromises = awaitPromises;

/**
 * Create a stream containing only the promise's fulfillment
 * value at the time it fulfills.
 * @param {Promise<T>} p promise
 * @return {Stream<T>} stream containing promise's fulfillment value.
 *  If the promise rejects, the stream will error
 */
function fromPromise(p) {
	return awaitPromises(just(p));
}

/**
 * Turn a Stream<Promise<T>> into Stream<T> by awaiting each promise.
 * Event order is preserved.
 * @param {Stream<Promise<T>>} stream
 * @return {Stream<T>} stream of fulfillment values.  The stream will
 * error if any promise rejects.
 */
function awaitPromises(stream) {
	return new Stream(new Await(stream.source));
}

function Await(source) {
	this.source = source;
}

Await.prototype.run = function(sink, scheduler) {
	return this.source.run(new AwaitSink(sink, scheduler), scheduler);
};

function AwaitSink(sink, scheduler) {
	this.sink = sink;
	this.scheduler = scheduler;
	this.queue = Promise.resolve();
	var self = this;

	// Pre-create closures, to avoid creating them per event
	this._eventBound = function(x) {
		self.sink.event(self.scheduler.now(), x);
	};

	this._endBound = function(x) {
		self.sink.end(self.scheduler.now(), x);
	};

	this._errorBound = function(e) {
		self.sink.error(self.scheduler.now(), e);
	};
}

AwaitSink.prototype.event = function(t, promise) {
	var self = this;
	this.queue = this.queue.then(function() {
		return self._event(promise);
	}).catch(this._errorBound);
};

AwaitSink.prototype.end = function(t, x) {
	var self = this;
	this.queue = this.queue.then(function() {
		return self._end(x);
	}).catch(this._errorBound);
};

AwaitSink.prototype.error = function(t, e) {
	var self = this;
	// Don't resolve error values, propagate directly
	this.queue = this.queue.then(function() {
		return self._errorBound(e);
	}).catch(fatal);
};

AwaitSink.prototype._event = function(promise) {
	return promise.then(this._eventBound);
};

AwaitSink.prototype._end = function(x) {
	return Promise.resolve(x).then(this._endBound);
};

},{"../Stream":121,"../fatalError":152,"../source/core":172}],140:[function(require,module,exports){
arguments[4][30][0].apply(exports,arguments)
},{"../Stream":121,"../base":122,"../disposable/dispose":151,"../invoke":156,"../sink/Pipe":167,"dup":30}],141:[function(require,module,exports){
arguments[4][31][0].apply(exports,arguments)
},{"../Stream":121,"../disposable/dispose":151,"../sink/Pipe":167,"../source/core":172,"dup":31}],142:[function(require,module,exports){
arguments[4][32][0].apply(exports,arguments)
},{"../Stream":121,"../source/MulticastSource":170,"./mergeConcurrently":136,"./timeslice":143,"./transform":146,"dup":32}],143:[function(require,module,exports){
arguments[4][33][0].apply(exports,arguments)
},{"../Stream":121,"../base":122,"../combinator/flatMap":132,"../disposable/dispose":151,"../sink/Pipe":167,"dup":33}],144:[function(require,module,exports){
arguments[4][34][0].apply(exports,arguments)
},{"../Stream":121,"../sink/Pipe":167,"dup":34}],145:[function(require,module,exports){
arguments[4][35][0].apply(exports,arguments)
},{"../Stream":121,"dup":35}],146:[function(require,module,exports){
arguments[4][36][0].apply(exports,arguments)
},{"../Stream":121,"../fusion/Map":155,"dup":36}],147:[function(require,module,exports){
arguments[4][37][0].apply(exports,arguments)
},{"../Queue":120,"../Stream":121,"../base":122,"../disposable/dispose":151,"../invoke":156,"../sink/IndexSink":165,"../sink/Pipe":167,"../source/core":172,"./transform":146,"dup":37}],148:[function(require,module,exports){
arguments[4][38][0].apply(exports,arguments)
},{"dup":38}],149:[function(require,module,exports){
arguments[4][39][0].apply(exports,arguments)
},{"dup":39}],150:[function(require,module,exports){
arguments[4][40][0].apply(exports,arguments)
},{"dup":40}],151:[function(require,module,exports){
arguments[4][41][0].apply(exports,arguments)
},{"../Promise":119,"../base":122,"./Disposable":149,"./SettableDisposable":150,"dup":41}],152:[function(require,module,exports){
arguments[4][42][0].apply(exports,arguments)
},{"dup":42}],153:[function(require,module,exports){
arguments[4][43][0].apply(exports,arguments)
},{"../sink/Pipe":167,"dup":43}],154:[function(require,module,exports){
arguments[4][44][0].apply(exports,arguments)
},{"../sink/Pipe":167,"dup":44}],155:[function(require,module,exports){
arguments[4][45][0].apply(exports,arguments)
},{"../base":122,"../sink/Pipe":167,"./Filter":153,"./FilterMap":154,"dup":45}],156:[function(require,module,exports){
arguments[4][46][0].apply(exports,arguments)
},{"dup":46}],157:[function(require,module,exports){
arguments[4][47][0].apply(exports,arguments)
},{"dup":47}],158:[function(require,module,exports){
arguments[4][48][0].apply(exports,arguments)
},{"./disposable/dispose":151,"./scheduler/defaultScheduler":161,"./sink/Observer":166,"dup":48}],159:[function(require,module,exports){
arguments[4][49][0].apply(exports,arguments)
},{"../fatalError":152,"dup":49}],160:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var base = require('./../base');

module.exports = Scheduler;

function ScheduledTask(delay, period, task, scheduler) {
	this.time = delay;
	this.period = period;
	this.task = task;
	this.scheduler = scheduler;
	this.active = true;
}

ScheduledTask.prototype.run = function() {
	return this.task.run(this.time);
};

ScheduledTask.prototype.error = function(e) {
	return this.task.error(this.time, e);
};

ScheduledTask.prototype.cancel = function() {
	this.scheduler.cancel(this);
	return this.task.dispose();
};

function runTask(task) {
	try {
		return task.run();
	} catch(e) {
		return task.error(e);
	}
}

function Scheduler(timer) {
	this.timer = timer;

	this._timer = null;
	this._nextArrival = 0;
	this._tasks = [];

	var self = this;
	this._runReadyTasksBound = function() {
		self._runReadyTasks(self.now());
	};
}

Scheduler.prototype.now = function() {
	return this.timer.now();
};

Scheduler.prototype.asap = function(task) {
	return this.schedule(0, -1, task);
};

Scheduler.prototype.delay = function(delay, task) {
	return this.schedule(delay, -1, task);
};

Scheduler.prototype.periodic = function(period, task) {
	return this.schedule(0, period, task);
};

Scheduler.prototype.schedule = function(delay, period, task) {
	var now = this.now();
	var st = new ScheduledTask(now + Math.max(0, delay), period, task, this);

	insertByTime(st, this._tasks);
	this._scheduleNextRun(now);
	return st;
};

Scheduler.prototype.cancel = function(task) {
	task.active = false;
	var i = binarySearch(task.time, this._tasks);

	if(i >= 0 && i < this._tasks.length) {
		var at = base.findIndex(task, this._tasks[i].events);
		if(at >= 0) {
			this._tasks[i].events.splice(at, 1);
			this._reschedule();
		}
	}
};

Scheduler.prototype.cancelAll = function(f) {
	for(var i=0; i<this._tasks.length; ++i) {
		removeAllFrom(f, this._tasks[i]);
	}
	this._reschedule();
};

function removeAllFrom(f, timeslot) {
	timeslot.events = base.removeAll(f, timeslot.events);
}

Scheduler.prototype._reschedule = function() {
	if(this._tasks.length === 0) {
		this._unschedule();
	} else {
		this._scheduleNextRun(this.now());
	}
};

Scheduler.prototype._unschedule = function() {
	this.timer.clearTimer(this._timer);
	this._timer = null;
};

Scheduler.prototype._scheduleNextRun = function(now) {
	if(this._tasks.length === 0) {
		return;
	}

	var nextArrival = this._tasks[0].time;

	if(this._timer === null) {
		this._scheduleNextArrival(nextArrival, now);
	} else if(nextArrival < this._nextArrival) {
		this._unschedule();
		this._scheduleNextArrival(nextArrival, now);
	}
};

Scheduler.prototype._scheduleNextArrival = function(nextArrival, now) {
	this._nextArrival = nextArrival;
	var delay = Math.max(0, nextArrival - now);
	this._timer = this.timer.setTimer(this._runReadyTasksBound, delay);
};


Scheduler.prototype._runReadyTasks = function(now) {
	this._timer = null;

	this._tasks = this._findAndRunTasks(now);

	this._scheduleNextRun(this.now());
};

Scheduler.prototype._findAndRunTasks = function(now) {
	var tasks = this._tasks;
	var l = tasks.length;
	var i = 0;

	while(i < l && tasks[i].time <= now) {
		++i;
	}

	this._tasks = tasks.slice(i);

	// Run all ready tasks
	for (var j = 0; j < i; ++j) {
		this._tasks = runTasks(tasks[j], this._tasks);
	}
	return this._tasks;
};

function runTasks(timeslot, tasks) {
	var events = timeslot.events;
	for(var i=0; i<events.length; ++i) {
		var task = events[i];

		if(task.active) {
			runTask(task);

			// Reschedule periodic repeating tasks
			// Check active again, since a task may have canceled itself
			if(task.period >= 0) {
				task.time = task.time + task.period;
				insertByTime(task, tasks);
			}
		}
	}

	return tasks;
}

function insertByTime(task, timeslots) {
	var l = timeslots.length;

	if(l === 0) {
		timeslots.push(newTimeslot(task.time, [task]));
		return;
	}

	var i = binarySearch(task.time, timeslots);

	if(i >= l) {
		timeslots.push(newTimeslot(task.time, [task]));
	} else if(task.time === timeslots[i].time) {
		timeslots[i].events.push(task);
	} else {
		timeslots.splice(i, 0, newTimeslot(task.time, [task]));
	}
}

function binarySearch(t, sortedArray) {
	var lo = 0;
	var hi = sortedArray.length;
	var mid, y;

	while (lo < hi) {
		mid = Math.floor((lo + hi) / 2);
		y = sortedArray[mid];

		if (t === y.time) {
			return mid;
		} else if (t < y.time) {
			hi = mid;
		} else {
			lo = mid + 1;
		}
	}
	return hi;
}

function newTimeslot(t, events) {
	return { time: t, events: events };
}

},{"./../base":122}],161:[function(require,module,exports){
arguments[4][51][0].apply(exports,arguments)
},{"./Scheduler":160,"./nodeTimer":162,"./timeoutTimer":163,"_process":114,"dup":51}],162:[function(require,module,exports){
arguments[4][52][0].apply(exports,arguments)
},{"../defer":148,"dup":52}],163:[function(require,module,exports){
arguments[4][53][0].apply(exports,arguments)
},{"dup":53}],164:[function(require,module,exports){
arguments[4][54][0].apply(exports,arguments)
},{"../defer":148,"dup":54}],165:[function(require,module,exports){
arguments[4][55][0].apply(exports,arguments)
},{"./Pipe":167,"dup":55}],166:[function(require,module,exports){
arguments[4][56][0].apply(exports,arguments)
},{"dup":56}],167:[function(require,module,exports){
arguments[4][57][0].apply(exports,arguments)
},{"dup":57}],168:[function(require,module,exports){
arguments[4][58][0].apply(exports,arguments)
},{"../disposable/dispose":151,"../sink/DeferredSink":164,"./tryEvent":181,"dup":58}],169:[function(require,module,exports){
arguments[4][59][0].apply(exports,arguments)
},{"../disposable/dispose":151,"./tryEvent":181,"dup":59}],170:[function(require,module,exports){
arguments[4][60][0].apply(exports,arguments)
},{"../base":122,"dup":60}],171:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var PropagateTask = require('../scheduler/PropagateTask');

module.exports = ValueSource;

function ValueSource(emit, x) {
	this.emit = emit;
	this.value = x;
}

ValueSource.prototype.run = function(sink, scheduler) {
	return new ValueProducer(this.emit, this.value, sink, scheduler);
};

function ValueProducer(emit, x, sink, scheduler) {
	this.task = scheduler.asap(new PropagateTask(emit, x, sink));
}

ValueProducer.prototype.dispose = function() {
	return this.task.cancel();
};

},{"../scheduler/PropagateTask":159}],172:[function(require,module,exports){
arguments[4][62][0].apply(exports,arguments)
},{"../Stream":121,"../disposable/dispose":151,"../scheduler/PropagateTask":159,"../source/ValueSource":171,"dup":62}],173:[function(require,module,exports){
arguments[4][63][0].apply(exports,arguments)
},{"../Stream":121,"../sink/DeferredSink":164,"./MulticastSource":170,"./tryEvent":181,"dup":63}],174:[function(require,module,exports){
arguments[4][64][0].apply(exports,arguments)
},{"../base":122,"../iterable":157,"./fromArray":175,"./fromIterable":177,"dup":64}],175:[function(require,module,exports){
arguments[4][65][0].apply(exports,arguments)
},{"../Stream":121,"../scheduler/PropagateTask":159,"dup":65}],176:[function(require,module,exports){
arguments[4][66][0].apply(exports,arguments)
},{"../Stream":121,"./EventEmitterSource":168,"./EventTargetSource":169,"./MulticastSource":170,"dup":66}],177:[function(require,module,exports){
arguments[4][67][0].apply(exports,arguments)
},{"../Stream":121,"../iterable":157,"../scheduler/PropagateTask":159,"dup":67}],178:[function(require,module,exports){
arguments[4][68][0].apply(exports,arguments)
},{"../Stream":121,"../base":122,"dup":68}],179:[function(require,module,exports){
arguments[4][69][0].apply(exports,arguments)
},{"../Stream":121,"dup":69}],180:[function(require,module,exports){
arguments[4][70][0].apply(exports,arguments)
},{"../Stream":121,"../disposable/dispose":151,"../scheduler/PropagateTask":159,"./MulticastSource":170,"dup":70}],181:[function(require,module,exports){
arguments[4][71][0].apply(exports,arguments)
},{"dup":71}],182:[function(require,module,exports){
arguments[4][72][0].apply(exports,arguments)
},{"../Stream":121,"dup":72}],183:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var Stream = require('./lib/Stream');
var base = require('./lib/base');
var core = require('./lib/source/core');
var from = require('./lib/source/from').from;
var periodic = require('./lib/source/periodic').periodic;

/**
 * Core stream type
 * @type {Stream}
 */
exports.Stream = Stream;

// Add of and empty to constructor for fantasy-land compat
exports.of       = Stream.of    = core.of;
exports.just     = core.of; // easier ES6 import alias
exports.empty    = Stream.empty = core.empty;
exports.never    = core.never;
exports.from     = from;
exports.periodic = periodic;

//-----------------------------------------------------------------------
// Creating

var create = require('./lib/source/create');

/**
 * Create a stream by imperatively pushing events.
 * @param {function(add:function(x), end:function(e)):function} run function
 *  that will receive 2 functions as arguments, the first to add new values to the
 *  stream and the second to end the stream. It may *return* a function that
 *  will be called once all consumers have stopped observing the stream.
 * @returns {Stream} stream containing all events added by run before end
 */
exports.create = create.create;

//-----------------------------------------------------------------------
// Adapting other sources

var events = require('./lib/source/fromEvent');

/**
 * Create a stream of events from the supplied EventTarget or EventEmitter
 * @param {String} event event name
 * @param {EventTarget|EventEmitter} source EventTarget or EventEmitter. The source
 *  must support either addEventListener/removeEventListener (w3c EventTarget:
 *  http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget),
 *  or addListener/removeListener (node EventEmitter: http://nodejs.org/api/events.html)
 * @returns {Stream} stream of events of the specified type from the source
 */
exports.fromEvent = events.fromEvent;

//-----------------------------------------------------------------------
// Observing

var observe = require('./lib/combinator/observe');

exports.observe = observe.observe;
exports.forEach = observe.observe;
exports.drain   = observe.drain;

/**
 * Process all the events in the stream
 * @returns {Promise} promise that fulfills when the stream ends, or rejects
 *  if the stream fails with an unhandled error.
 */
Stream.prototype.observe = Stream.prototype.forEach = function(f) {
	return observe.observe(f, this);
};

/**
 * Consume all events in the stream, without providing a function to process each.
 * This causes a stream to become active and begin emitting events, and is useful
 * in cases where all processing has been setup upstream via other combinators, and
 * there is no need to process the terminal events.
 * @returns {Promise} promise that fulfills when the stream ends, or rejects
 *  if the stream fails with an unhandled error.
 */
Stream.prototype.drain = function() {
	return observe.drain(this);
};

//-------------------------------------------------------

var loop = require('./lib/combinator/loop').loop;

exports.loop = loop;

/**
 * Generalized feedback loop. Call a stepper function for each event. The stepper
 * will be called with 2 params: the current seed and the an event value.  It must
 * return a new { seed, value } pair. The `seed` will be fed back into the next
 * invocation of stepper, and the `value` will be propagated as the event value.
 * @param {function(seed:*, value:*):{seed:*, value:*}} stepper loop step function
 * @param {*} seed initial seed value passed to first stepper call
 * @returns {Stream} new stream whose values are the `value` field of the objects
 * returned by the stepper
 */
Stream.prototype.loop = function(stepper, seed) {
	return loop(stepper, seed, this);
};

//-------------------------------------------------------

var accumulate = require('./lib/combinator/accumulate');

exports.scan   = accumulate.scan;
exports.reduce = accumulate.reduce;

/**
 * Create a stream containing successive reduce results of applying f to
 * the previous reduce result and the current stream item.
 * @param {function(result:*, x:*):*} f reducer function
 * @param {*} initial initial value
 * @returns {Stream} new stream containing successive reduce results
 */
Stream.prototype.scan = function(f, initial) {
	return accumulate.scan(f, initial, this);
};

/**
 * Reduce the stream to produce a single result.  Note that reducing an infinite
 * stream will return a Promise that never fulfills, but that may reject if an error
 * occurs.
 * @param {function(result:*, x:*):*} f reducer function
 * @param {*} initial optional initial value
 * @returns {Promise} promise for the file result of the reduce
 */
Stream.prototype.reduce = function(f, initial) {
	return accumulate.reduce(f, initial, this);
};

//-----------------------------------------------------------------------
// Building and extending

var unfold = require('./lib/source/unfold');
var iterate = require('./lib/source/iterate');
var generate = require('./lib/source/generate');
var build = require('./lib/combinator/build');

exports.unfold    = unfold.unfold;
exports.iterate   = iterate.iterate;
exports.generate  = generate.generate;
exports.cycle     = build.cycle;
exports.concat    = build.concat;
exports.startWith = build.cons;

/**
 * @deprecated
 * Tie this stream into a circle, thus creating an infinite stream
 * @returns {Stream} new infinite stream
 */
Stream.prototype.cycle = function() {
	return build.cycle(this);
};

/**
 * @param {Stream} tail
 * @returns {Stream} new stream containing all items in this followed by
 *  all items in tail
 */
Stream.prototype.concat = function(tail) {
	return build.concat(this, tail);
};

/**
 * @param {*} x value to prepend
 * @returns {Stream} a new stream with x prepended
 */
Stream.prototype.startWith = function(x) {
	return build.cons(x, this);
};

//-----------------------------------------------------------------------
// Transforming

var transform = require('./lib/combinator/transform');
var applicative = require('./lib/combinator/applicative');

exports.map      = transform.map;
exports.constant = transform.constant;
exports.tap      = transform.tap;
exports.ap       = applicative.ap;

/**
 * Transform each value in the stream by applying f to each
 * @param {function(*):*} f mapping function
 * @returns {Stream} stream containing items transformed by f
 */
Stream.prototype.map = function(f) {
	return transform.map(f, this);
};

/**
 * Assume this stream contains functions, and apply each function to each item
 * in the provided stream.  This generates, in effect, a cross product.
 * @param {Stream} xs stream of items to which
 * @returns {Stream} stream containing the cross product of items
 */
Stream.prototype.ap = function(xs) {
	return applicative.ap(this, xs);
};

/**
 * Replace each value in the stream with x
 * @param {*} x
 * @returns {Stream} stream containing items replaced with x
 */
Stream.prototype.constant = function(x) {
	return transform.constant(x, this);
};

/**
 * Perform a side effect for each item in the stream
 * @param {function(x:*):*} f side effect to execute for each item. The
 *  return value will be discarded.
 * @returns {Stream} new stream containing the same items as this stream
 */
Stream.prototype.tap = function(f) {
	return transform.tap(f, this);
};

//-----------------------------------------------------------------------
// Transducer support

var transduce = require('./lib/combinator/transduce');

exports.transduce = transduce.transduce;

/**
 * Transform this stream by passing its events through a transducer.
 * @param  {function} transducer transducer function
 * @return {Stream} stream of events transformed by the transducer
 */
Stream.prototype.transduce = function(transducer) {
	return transduce.transduce(transducer, this);
};

//-----------------------------------------------------------------------
// FlatMapping

var flatMap = require('./lib/combinator/flatMap');

exports.flatMap = exports.chain = flatMap.flatMap;
exports.join    = flatMap.join;

/**
 * Map each value in the stream to a new stream, and merge it into the
 * returned outer stream. Event arrival times are preserved.
 * @param {function(x:*):Stream} f chaining function, must return a Stream
 * @returns {Stream} new stream containing all events from each stream returned by f
 */
Stream.prototype.flatMap = Stream.prototype.chain = function(f) {
	return flatMap.flatMap(f, this);
};

/**
 * Monadic join. Flatten a Stream<Stream<X>> to Stream<X> by merging inner
 * streams to the outer. Event arrival times are preserved.
 * @returns {Stream<X>} new stream containing all events of all inner streams
 */
Stream.prototype.join = function() {
	return flatMap.join(this);
};

var continueWith = require('./lib/combinator/continueWith').continueWith;

exports.continueWith = continueWith;
exports.flatMapEnd = continueWith;

/**
 * Map the end event to a new stream, and begin emitting its values.
 * @param {function(x:*):Stream} f function that receives the end event value,
 * and *must* return a new Stream to continue with.
 * @returns {Stream} new stream that emits all events from the original stream,
 * followed by all events from the stream returned by f.
 */
Stream.prototype.continueWith = Stream.prototype.flatMapEnd = function(f) {
	return continueWith(f, this);
};

var concatMap = require('./lib/combinator/concatMap').concatMap;

exports.concatMap = concatMap;

Stream.prototype.concatMap = function(f) {
	return concatMap(f, this);
};

//-----------------------------------------------------------------------
// Concurrent merging

var mergeConcurrently = require('./lib/combinator/mergeConcurrently');

exports.mergeConcurrently = mergeConcurrently.mergeConcurrently;

/**
 * Flatten a Stream<Stream<X>> to Stream<X> by merging inner
 * streams to the outer, limiting the number of inner streams that may
 * be active concurrently.
 * @param {number} concurrency at most this many inner streams will be
 *  allowed to be active concurrently.
 * @return {Stream<X>} new stream containing all events of all inner
 *  streams, with limited concurrency.
 */
Stream.prototype.mergeConcurrently = function(concurrency) {
	return mergeConcurrently.mergeConcurrently(concurrency, this);
};

//-----------------------------------------------------------------------
// Merging

var merge = require('./lib/combinator/merge');

exports.merge = merge.merge;
exports.mergeArray = merge.mergeArray;

/**
 * Merge this stream and all the provided streams
 * @returns {Stream} stream containing items from this stream and s in time
 * order.  If two events are simultaneous they will be merged in
 * arbitrary order.
 */
Stream.prototype.merge = function(/*...streams*/) {
	return merge.mergeArray(base.cons(this, arguments));
};

//-----------------------------------------------------------------------
// Combining

var combine = require('./lib/combinator/combine');

exports.combine = combine.combine;
exports.combineArray = combine.combineArray;

/**
 * Combine latest events from all input streams
 * @param {function(...events):*} f function to combine most recent events
 * @returns {Stream} stream containing the result of applying f to the most recent
 *  event of each input stream, whenever a new event arrives on any stream.
 */
Stream.prototype.combine = function(f /*, ...streams*/) {
	return combine.combineArray(f, base.replace(this, 0, arguments));
};

//-----------------------------------------------------------------------
// Sampling

var sample = require('./lib/combinator/sample');

exports.sample = sample.sample;
exports.sampleWith = sample.sampleWith;

/**
 * When an event arrives on sampler, emit the latest event value from stream.
 * @param {Stream} sampler stream of events at whose arrival time
 *  signal's latest value will be propagated
 * @returns {Stream} sampled stream of values
 */
Stream.prototype.sampleWith = function(sampler) {
	return sample.sampleWith(sampler, this);
};

/**
 * When an event arrives on this stream, emit the result of calling f with the latest
 * values of all streams being sampled
 * @param {function(...values):*} f function to apply to each set of sampled values
 * @returns {Stream} stream of sampled and transformed values
 */
Stream.prototype.sample = function(f /* ...streams */) {
	return sample.sampleArray(f, this, base.tail(arguments));
};

//-----------------------------------------------------------------------
// Zipping

var zip = require('./lib/combinator/zip');

exports.zip = zip.zip;

/**
 * Pair-wise combine items with those in s. Given 2 streams:
 * [1,2,3] zipWith f [4,5,6] -> [f(1,4),f(2,5),f(3,6)]
 * Note: zip causes fast streams to buffer and wait for slow streams.
 * @param {function(a:Stream, b:Stream, ...):*} f function to combine items
 * @returns {Stream} new stream containing pairs
 */
Stream.prototype.zip = function(f /*, ...streams*/) {
	return zip.zipArray(f, base.replace(this, 0, arguments));
};

//-----------------------------------------------------------------------
// Switching

var switchLatest = require('./lib/combinator/switch').switch;

exports.switch       = switchLatest;
exports.switchLatest = switchLatest;

/**
 * Given a stream of streams, return a new stream that adopts the behavior
 * of the most recent inner stream.
 * @returns {Stream} switching stream
 */
Stream.prototype.switch = Stream.prototype.switchLatest = function() {
	return switchLatest(this);
};

//-----------------------------------------------------------------------
// Filtering

var filter = require('./lib/combinator/filter');

exports.filter          = filter.filter;
exports.skipRepeats     = exports.distinct   = filter.skipRepeats;
exports.skipRepeatsWith = exports.distinctBy = filter.skipRepeatsWith;

/**
 * Retain only items matching a predicate
 * stream:                           -12345678-
 * filter(x => x % 2 === 0, stream): --2-4-6-8-
 * @param {function(x:*):boolean} p filtering predicate called for each item
 * @returns {Stream} stream containing only items for which predicate returns truthy
 */
Stream.prototype.filter = function(p) {
	return filter.filter(p, this);
};

/**
 * Skip repeated events, using === to compare items
 * stream:           -abbcd-
 * distinct(stream): -ab-cd-
 * @returns {Stream} stream with no repeated events
 */
Stream.prototype.skipRepeats = function() {
	return filter.skipRepeats(this);
};

/**
 * Skip repeated events, using supplied equals function to compare items
 * @param {function(a:*, b:*):boolean} equals function to compare items
 * @returns {Stream} stream with no repeated events
 */
Stream.prototype.skipRepeatsWith = function(equals) {
	return filter.skipRepeatsWith(equals, this);
};

//-----------------------------------------------------------------------
// Slicing

var slice = require('./lib/combinator/slice');

exports.take      = slice.take;
exports.skip      = slice.skip;
exports.slice     = slice.slice;
exports.takeWhile = slice.takeWhile;
exports.skipWhile = slice.skipWhile;

/**
 * stream:          -abcd-
 * take(2, stream): -ab|
 * @param {Number} n take up to this many events
 * @returns {Stream} stream containing at most the first n items from this stream
 */
Stream.prototype.take = function(n) {
	return slice.take(n, this);
};

/**
 * stream:          -abcd->
 * skip(2, stream): ---cd->
 * @param {Number} n skip this many events
 * @returns {Stream} stream not containing the first n events
 */
Stream.prototype.skip = function(n) {
	return slice.skip(n, this);
};

/**
 * Slice a stream by event index. Equivalent to, but more efficient than
 * stream.take(end).skip(start);
 * NOTE: Negative start and end are not supported
 * @param {Number} start skip all events before the start index
 * @param {Number} end allow all events from the start index to the end index
 * @returns {Stream} stream containing items where start <= index < end
 */
Stream.prototype.slice = function(start, end) {
	return slice.slice(start, end, this);
};

/**
 * stream:                        -123451234->
 * takeWhile(x => x < 5, stream): -1234|
 * @param {function(x:*):boolean} p predicate
 * @returns {Stream} stream containing items up to, but not including, the
 * first item for which p returns falsy.
 */
Stream.prototype.takeWhile = function(p) {
	return slice.takeWhile(p, this);
};

/**
 * stream:                        -123451234->
 * skipWhile(x => x < 5, stream): -----51234->
 * @param {function(x:*):boolean} p predicate
 * @returns {Stream} stream containing items following *and including* the
 * first item for which p returns falsy.
 */
Stream.prototype.skipWhile = function(p) {
	return slice.skipWhile(p, this);
};

//-----------------------------------------------------------------------
// Time slicing

var timeslice = require('./lib/combinator/timeslice');

exports.until  = exports.takeUntil = timeslice.takeUntil;
exports.since  = exports.skipUntil = timeslice.skipUntil;
exports.during = timeslice.during;

/**
 * stream:                    -a-b-c-d-e-f-g->
 * signal:                    -------x
 * takeUntil(signal, stream): -a-b-c-|
 * @param {Stream} signal retain only events in stream before the first
 * event in signal
 * @returns {Stream} new stream containing only events that occur before
 * the first event in signal.
 */
Stream.prototype.until = Stream.prototype.takeUntil = function(signal) {
	return timeslice.takeUntil(signal, this);
};

/**
 * stream:                    -a-b-c-d-e-f-g->
 * signal:                    -------x
 * takeUntil(signal, stream): -------d-e-f-g->
 * @param {Stream} signal retain only events in stream at or after the first
 * event in signal
 * @returns {Stream} new stream containing only events that occur after
 * the first event in signal.
 */
Stream.prototype.since = Stream.prototype.skipUntil = function(signal) {
	return timeslice.skipUntil(signal, this);
};

/**
 * stream:                    -a-b-c-d-e-f-g->
 * timeWindow:                -----s
 * s:                               -----t
 * stream.during(timeWindow): -----c-d-e-|
 * @param {Stream<Stream>} timeWindow a stream whose first event (s) represents
 *  the window start time.  That event (s) is itself a stream whose first event (t)
 *  represents the window end time
 * @returns {Stream} new stream containing only events within the provided timespan
 */
Stream.prototype.during = function(timeWindow) {
	return timeslice.during(timeWindow, this);
};

//-----------------------------------------------------------------------
// Delaying

var delay = require('./lib/combinator/delay').delay;

exports.delay = delay;

/**
 * @param {Number} delayTime milliseconds to delay each item
 * @returns {Stream} new stream containing the same items, but delayed by ms
 */
Stream.prototype.delay = function(delayTime) {
	return delay(delayTime, this);
};

//-----------------------------------------------------------------------
// Getting event timestamp

var timestamp = require('./lib/combinator/timestamp').timestamp;

exports.timestamp = timestamp;

/**
 * Expose event timestamps into the stream. Turns a Stream<X> into
 * Stream<{time:t, value:X}>
 * @returns {Stream<{time:number, value:*}>}
 */
Stream.prototype.timestamp = function() {
	return timestamp(this);
};

//-----------------------------------------------------------------------
// Rate limiting

var limit = require('./lib/combinator/limit');

exports.throttle = limit.throttle;
exports.debounce = limit.debounce;

/**
 * Limit the rate of events
 * stream:              abcd----abcd----
 * throttle(2, stream): a-c-----a-c-----
 * @param {Number} period time to suppress events
 * @returns {Stream} new stream that skips events for throttle period
 */
Stream.prototype.throttle = function(period) {
	return limit.throttle(period, this);
};

/**
 * Wait for a burst of events to subside and emit only the last event in the burst
 * stream:              abcd----abcd----
 * debounce(2, stream): -----d-------d--
 * @param {Number} period events occuring more frequently than this
 *  on the provided scheduler will be suppressed
 * @returns {Stream} new debounced stream
 */
Stream.prototype.debounce = function(period) {
	return limit.debounce(period, this);
};

//-----------------------------------------------------------------------
// Awaiting Promises

var promises = require('./lib/combinator/promises');

exports.fromPromise = promises.fromPromise;
exports.await       = promises.awaitPromises;

/**
 * Await promises, turning a Stream<Promise<X>> into Stream<X>.  Preserves
 * event order, but timeshifts events based on promise resolution time.
 * @returns {Stream<X>} stream containing non-promise values
 */
Stream.prototype.await = function() {
	return promises.awaitPromises(this);
};

//-----------------------------------------------------------------------
// Error handling

var errors = require('./lib/combinator/errors');

exports.recoverWith  = errors.flatMapError;
exports.flatMapError = errors.flatMapError;
exports.throwError   = errors.throwError;

/**
 * If this stream encounters an error, recover and continue with items from stream
 * returned by f.
 * stream:                  -a-b-c-X-
 * f(X):                           d-e-f-g-
 * flatMapError(f, stream): -a-b-c-d-e-f-g-
 * @param {function(error:*):Stream} f function which returns a new stream
 * @returns {Stream} new stream which will recover from an error by calling f
 */
Stream.prototype.recoverWith = Stream.prototype.flatMapError = function(f) {
	return errors.flatMapError(f, this);
};

//-----------------------------------------------------------------------
// Multicasting

var multicast = require('./lib/combinator/multicast').multicast;

exports.multicast = multicast;

/**
 * Transform the stream into multicast stream.  That means that many subscribers
 * to the stream will not cause multiple invocations of the internal machinery.
 * @returns {Stream} new stream which will multicast events to all observers.
 */
Stream.prototype.multicast = function() {
	return multicast(this);
};

},{"./lib/Stream":121,"./lib/base":122,"./lib/combinator/accumulate":123,"./lib/combinator/applicative":124,"./lib/combinator/build":125,"./lib/combinator/combine":126,"./lib/combinator/concatMap":127,"./lib/combinator/continueWith":128,"./lib/combinator/delay":129,"./lib/combinator/errors":130,"./lib/combinator/filter":131,"./lib/combinator/flatMap":132,"./lib/combinator/limit":133,"./lib/combinator/loop":134,"./lib/combinator/merge":135,"./lib/combinator/mergeConcurrently":136,"./lib/combinator/multicast":137,"./lib/combinator/observe":138,"./lib/combinator/promises":139,"./lib/combinator/sample":140,"./lib/combinator/slice":141,"./lib/combinator/switch":142,"./lib/combinator/timeslice":143,"./lib/combinator/timestamp":144,"./lib/combinator/transduce":145,"./lib/combinator/transform":146,"./lib/combinator/zip":147,"./lib/source/core":172,"./lib/source/create":173,"./lib/source/from":174,"./lib/source/fromEvent":176,"./lib/source/generate":178,"./lib/source/iterate":179,"./lib/source/periodic":180,"./lib/source/unfold":182}],184:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _motorcycleDom = require('@motorcycle/dom');

var _mostSubject = require('most-subject');

var sub = _mostSubject.subject;
var observer = sub.observer;
var stream = sub.stream;

var Monad = function Monad(z, g) {
  var _this = this;

  this.x = z;
  if (arguments.length === 1) {
    this.id = 'anonymous';
  } else {
    this.id = g;
  }

  this.bnd = function (func) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    return func.apply(undefined, [_this.x].concat(args));
  };

  this.ret = function (a) {
    window[_this.id] = new Monad(a, _this.id);
    return window[_this.id];
  };
};

var mMname = new Monad('Fred', 'mMname');

var monad = (0, _motorcycleDom.h)('pre', { style: { color: '#AFEEEE' } }, '  var Monad = function Monad(z, g) {\n    var _this = this;\n\n    this.x = z;\n    if (arguments.length === 1) {\n      this.id = \'anonymous\';\n    } else {\n      this.id = g;\n    };\n\n    this.bnd = function (func, ...args) {\n       return func(_this.x, ...args);\n    };\n\n    this.ret = function (a) {\n      O.[_this.id] = new Monad(a, _this.id);\n      return O.[_this.id]\n    };\n  }; ');

var monadStr = (0, _motorcycleDom.h)('pre', { style: { color: '#AFEEEE' } }, '  var MonadStream = function MonadStream(g) {\n    var _this = this;\n    this.subject = subject();\n    this.observer = this.subject.observer;\n    this.stream = this.subject.stream;\n    this.id = g;\n    this.ret = function (a) {\n      _this.observer.next(a);\n      console.log(\'Streaming from \', _this.id);\n    };\n  }; ');

var monadIt = (0, _motorcycleDom.h)('pre', { style: { color: '#AFEEEE' } }, '  var MonadIter = function MonadIter() {\n    var _this = this;\n    this.p = function () {};\n  \n    this.release = function (...args) {\n      return this.p(...args);\n    };\n  \n    this.bnd = function (func) {\n      _this.p = func;\n    };\n  }; ');

var ret = (0, _motorcycleDom.h)('pre', { style: { color: '#AFEEEE' } }, '  var ret = function ret(v, id) {\n    if (arguments.length === 1) {\n      return (new Monad(v, \'anonymous\'));\n    }\n    window[id] = new Monad(v, id);\n    return window[id];\n  }; ');

var fib = (0, _motorcycleDom.h)('pre', '  var fib = function fib(x) {\n    return mMfib.ret([ O.mMfib.x[1], O.mMfib.x[0] + O.mMfib.x[1] ]);\n  }\n\n  var fibCalc = function(x, n) {\n    mMfib.ret([0,1])\n    for(let k in Array(n).fill(1)) mMfib.bnd(fib)\n    return ret(O.mMfib.x[0])\n  }   ');

var driver = (0, _motorcycleDom.h)('pre', '  var websocketsDriver = function () {\n      return create((add) => {\n        socket.onmessage = msg => add(msg)\n      })\n  };\n');

var messages = (0, _motorcycleDom.h)('pre', '  const messages$ = (sources.WS).map(e => \n    mMtem.ret(e.data.split(\',\')).bnd(v => {\n    mMZ10.bnd(() => mM$1\n      .ret([v[3], v[4], v[5], v[6]])\n      .bnd(() => mM$2.ret([])))\n    mMZ11.bnd(() => updateScoreboard(v[3]));\n    mMZ12.bnd(() => mM6\n      .ret(v[2] + \' successfully logged in.\'))\n    mMZ13.bnd(() => updateMessages(v))\n    mMZ14.bnd(() => mMgoals2.ret(\'The winner is \' + v.x ))\n    mMZ15.bnd(() => mMgoals2.ret(\'A player named \' + \n      O.mMname.x + \'is currently logged in. Page will refresh in 4 seconds.\')\n      .bnd(refresh))\n    mMZ16.bnd(() => process(e.data))\n    mMtemp.ret(e.data.split(\',\')[0])\n      .bnd(next, \'CA#$42\', mMZ10)\n      .bnd(next, \'CB#$42\', mMZ11)\n      .bnd(next, \'CC#$42\', mMZ12)\n      .bnd(next, \'CD#$42\', mMZ13)\n      .bnd(next, \'CE#$42\', mMZ14)\n      .bnd(next, \'EE#$42\', mMZ15)\n      .bnd(next, \'DD#$42\', mMZ16)\n    }) \n  );\n             \n  var next = function next(x, y, mon2) {\n    if (x === y) {\n      mon2.release();\n    }\n    return ret(x);\n  }');

var next = (0, _motorcycleDom.h)('pre', '  \n  ');

var Monad$ = (0, _motorcycleDom.h)('pre', '  var Monad$ = function Monad$(z, g) {\n      var _this = this;\n      this.subject = subject();\n      this.observer = this.subject.observer;\n      this.stream = this.subject.stream;\n      this.x = z;\n      this.id = g;\n\n      this.bnd = function (func, ...args) {\n         return func(_this.x, ...args);\n      };\n\n      this.ret = function (a) {\n        O[_this.id] = new Monad$(a,_this.id);\n        _this.observer.next(a);\n        return O[_this.id];\n      };\n    };\n  ');

var nums = (0, _motorcycleDom.h)('pre', '  \n    const numClick$ = sources.DOM\n      .select(\'.num\').events(\'click\');\n       \n    const numClickAction$ = numClick$.map(e => {\n      console.log(e);\n      if (O.mM3.x.length < 2) {\n        O.mM3.bnd(push, e.target.innerHTML, O.mM3)\n        mM28.ret(O.mMhistorymM1.x[O.mMindex2.x])\n        .bnd(spliceRemove, e.target.id, O.mM$1)\n        .bnd(mM$1.ret);\n        if (O.mM3.x.length === 2 && O.mM8.x !== 0) {\n          updateCalc();\n        }\n      };\n    }).startWith([0,0,0,0]);\n\n    const opClick$ = sources.DOM\n      .select(\'.op\').events(\'click\');\n  \n    const opClickAction$ = opClick$.map(e => {\n      mM8.ret(e.target.textContent);\n      if (O.mM3.x.length === 2) {\n        updateCalc();\n      }\n    })\n\n    const mM$1Action$ = mM$1.stream.map(v => {\n      if (Array.isArray(v)) {\n        O.mMhistorymM1.bnd(spliceAdd, O.mMindex2.x, v, O.mMhistorymM1);\n        document.getElementById(\'0\').innerHTML = (O.mMhistorymM1.x[O.mMindex2.x])[0]; \n        document.getElementById(\'1\').innerHTML = (O.mMhistorymM1.x[O.mMindex2.x])[1]; \n        document.getElementById(\'2\').innerHTML = (O.mMhistorymM1.x[O.mMindex2.x])[2]; \n        document.getElementById(\'3\').innerHTML = (O.mMhistorymM1.x[O.mMindex2.x])[3]; \n        cleanup()\n      }\n      else {\n        console.log(\'O.mM$1.stream is providing defective data to O.mM$1Action\');\n      }\n  });  ');

var arrayFuncs = (0, _motorcycleDom.h)('pre', '  var push = function push(y,v,mon) {\n      if (Array.isArray(y)) {\n        let ar = [];\n        let keys = Object.keys(y);\n        for (let k in keys) {ar[k] = y[k]};\n        ar.push(v);\n        return mon.ret(ar);  \n      }\n      console.log(\'The value provided to push is not an array\');\n      return ret(y);\n    };\n    \n    var spliceRemove = function splice(x, j, mon) {\n      if (Array.isArray(x)) {\n        let ar = [];\n        let keys = Object.keys(x);\n        for (let k in keys) {ar[k] = x[k]};\n        ar.splice(j,1);\n        return mon.ret(ar);  \n      }\n      console.log(\'The value provided to spliceRemove is not an array\');\n      return ret(x);\n    };\n    \n    var spliceAdd = function splice(x, index, value, mon) {\n      if (Array.isArray(x)) {\n        let ar = [];\n        let keys = Object.keys(x);\n        for (let k in keys) {ar[k] = x[k]};\n        ar.splice(index, 0, value);\n        return mon.ret(ar);  \n      }\n      console.log(\'The value provided to spliceAdd is not an array\');\n      return ret(x);\n    };\n    \n    var splice = function splice(x, start, end, mon) {\n      if (Array.isArray(x)) {\n        let ar = [];\n        let keys = Object.keys(x);\n        for (let k in keys) {ar[k] = x[k]};\n        ar.splice(start, end);\n        return mon.ret(ar);  \n      }\n      console.log(\'The value provided to spliceAdd is not an array\');\n      return ret(x);\n    };\n  ');

var cleanup = (0, _motorcycleDom.h)('pre', '  function cleanup (x) {\n      let target0 = document.getElementById(\'0\');\n      let target1 = document.getElementById(\'1\');\n      let target2 = document.getElementById(\'2\');\n      let target3 = document.getElementById(\'3\');\n      let targetAr = [target0, target1, target2, target3];\n      for (let i in [0,1,2,3]) {\n        if (targetAr[i].innerHTML == \'undefined\' )    {\n          targetAr[i].style.display = \'none\';\n        }\n        else {\n          targetAr[i].style.display = \'inline\';\n        }\n      }\n      return ret(x);\n  }; ');

var travel = (0, _motorcycleDom.h)('pre', '  const forwardClick$ = sources.DOM\n      .select(\'#forward2\').events(\'click\');\n  \n    const backClick$ = sources.DOM\n      .select(\'#back2\').events(\'click\');\n  \n    const forwardClickAction$ = forwardClick$.map(() => {\n      if (O.mMindex2.x < (O.mMhistorymM1.x.length - 1)) {\n        inc(O.mMindex2.x, mMindex2)\n        .bnd(() => mM$3.ret(\'Hello\'))\n      }\n    });\n  \n    const backClickAction$ = backClick$.map(() => {\n      if (O.mMindex2.x > 0) {\n        dec(O.mMindex2.x, mMindex2)\n        .bnd(() => mM$3.ret(\'You bet!\'))\n      }\n    });\n\n    const mM$3Action$ = mM$3.stream.map(v => {\n      document.getElementById(\'0\').innerHTML = (O.mMhistorymM1.x[O.mMindex2.x])[0]; \n      document.getElementById(\'1\').innerHTML = (O.mMhistorymM1.x[O.mMindex2.x])[1]; \n      document.getElementById(\'2\').innerHTML = (O.mMhistorymM1.x[O.mMindex2.x])[2]; \n      document.getElementById(\'3\').innerHTML = (O.mMhistorymM1.x[O.mMindex2.x])[3]; \n      cleanup();\n    })  ');

var C42 = (0, _motorcycleDom.h)('pre', '  mMZ10.bnd(() => mM$1\n     .ret([O.mMar.x[3], O.mMar.x[4], O.mMar.x[5], O.mMar.x[6]])\n     .bnd(() => mM$2.ret([]))\n     .bnd(displayInline,\'0\')\n     .bnd(displayInline,\'1\')\n     .bnd(displayInline,\'2\')\n     .bnd(displayInline,\'3\'));  ');

var taskStream = (0, _motorcycleDom.h)('pre', '  \n    });  ');

var deleteTask2 = (0, _motorcycleDom.h)('pre', '  mMZ19.bnd(() => O.mM$task.bnd(spliceRemove, O.mMar.x[3], mM$task));\n  ');

var newTask = (0, _motorcycleDom.h)('pre', '  const newTask$ = sources.DOM\n    .select(\'input.newTask\').events(\'keydown\'); \n\n  const newTaskAction$ = newTask$.map(e => {\n      let ob = {};\n      var alert = \'\';\n      var ar = e.target.value.split(\',\');\n      var ar2 = ar.slice(2);\n      var task = \'\';\n      if (ar.length < 4) {\n        task = ar[2];\n      }\n      if (ar.length > 3) {\n        task = ar2.reduce((a,b) => a + \'$*$*$\' + b);\n      }\n      if( e.keyCode == 13 ) {\n        if ( ar.length < 3 ) {\n          alert = \'You should enter "author, responsible party, task" separated by commas\';\n          document.getElementById(\'alert\').innerHTML = alert;\n        }\n\n        else if ( (O.mMar2.x.filter(v => (v.task == task)).length) > 0 ) {\n          document.getElementById(\'alert\').innerHTML = task + " is already listed.";\n        }\n\n        else if ( ar.length > 2 ) {\n          O.mM$taskList.bnd(addString, task + \',yellow, none, false,\' +  ar[0] + \',\' + ar[1], mM$taskList);\n          e.target.value = \'\';\n          document.getElementById(\'alert\').innerHTML = \'\';\n        } \n      } \n  };  ');

var process = (0, _motorcycleDom.h)('pre', '  const process = function(str) {\n    let a = str.split(",");\n    console.log(\'In process. str and a are: \', str, a);\n    if (a == undefined) {\n      return;\n    };\n    if (a.length < 9) {\n      return\n    };\n    let ob = {};\n    let ar = a.slice(3)\n    let s = ar.reduce((a,b) => a + \',\' + b);\n    if (mM$taskList.x.length < 5) {\n      O.mM$taskList.ret(s);\n    }\n    let ar2 = [];\n    let tempArray = [];\n    if (ar.length < 6) {return};\n    if ((ar.length % 6) !== 0) {\n      document.getElementById(\'alert\').innerHTML = \'Error: array length is: \' + length;\n    } else {\n      let keys = Array(ar.length/6).fill(1);\n      keys.map(_ => {\n        ar2.push(\n          {\n            task: convertBack(ar.shift()),\n            color: ar.shift(),\n            textDecoration: ar.shift(),\n            checked: ar.shift() === \'true\',\n            author: ar.shift(),\n            responsible: ar.shift()\n          }\n        )\n      })\n      console.log(\'In process  ar2 is: \', ar2)\n      let keys2 = Object.keys(ar2);\n      for (let k in keys) {\n        tempArray.push(\n          h(\'div.todo\',  [\n            h(\'span.task3\', {style: {color: ar2[k].color, textDecoration: ar2[k].textDecoration}},\n                \'Task: \' + ar2[k].task  ),  \n            h(\'br\'),\n            h(\'button#edit1\', \'Edit\'  ),\n            h(\'input#edit2\', {props: {type: \'textarea\', value: ar2[k].task}, style: {display: \'none\'}}  ), \n            h(\'span#author.tao\', \'Author: \' + ar2[k].author  + \' / \' + \'Responsibility: \' + ar2[k].responsible),\n            h(\'br\'),\n            h(\'input#cb\', {props: {type: \'checkbox\', checked: ar2[k].checked}, style: {color: ar2[k].color,\n                 textDecoration: ar2[k].textDecoration} } ), \n            h(\'label.cbox\', { props: {for: \'#cb\'}}, \'Completed\' ),\n            h(\'button.delete\', \'Delete\'  ),  \n            h(\'br\'),\n            h(\'hr\')])\n        )\n      }\n      mMtaskList.ret(tempArray)\n    }\n  };  ');

var colorClick = (0, _motorcycleDom.h)('pre', '  const colorClick$ = sources.DOM\n    .select(\'#cb\').events(\'click\')\n    \n  const colorAction$ = colorClick$.map(e => {\n    let index = getIndex(e);\n    let s = O.mM$taskList.x;\n    let ar = s.split(\',\');\n    let n = 6 * index + 3;\n    let j = 6 * index + 2;\n    let k = 6 * index + 1;\n    let checked = ar[n];\n    if (checked == \'true\')  {\n      ar[n] = \'false\'; \n      ar[k] = \'yellow\'; \n      ar[j] = \'none\'; \n    }\n    else {\n      ar[n] = \'true\'; \n      ar[k] = \'lightGreen\'; \n      ar[j] = \'line-through\'; \n    }\n    mM$taskList.ret( ar.reduce((a,b) => a + \',\' + b) )\n  });  \n                     \n  var getIndex = function getIndex (event_object) {\n    var task = event_object.currentTarget.parentNode.innerText;\n    var possibilities = event_object.currentTarget.parentNode.parentNode.childNodes;\n    var keys = Object.keys(possibilities);\n    for (let k in keys) {\n      if (task == possibilities[k].innerText) {\n        return k\n      }\n    }\n    console.log(\'In getIndex. No match\');\n  }  ');

var edit = (0, _motorcycleDom.h)('pre', '  const edit1$ = sources.DOM\n    .select(\'#edit1\').events(\'click\')\n    \n  const edit1Action$ = edit1$.map(e => {\n    let index = getIndex2(e);\n    O.mMtaskList.x[index].children[3].elm.style.display = \'block\';\n  });\n\n  const edit2$ = sources.DOM\n    .select(\'#edit2\').events(\'keypress\')\n    \n  const edit2Action$ = edit2$.map(e => {\n    let v = e.target.value;\n    let index = getIndex2(e);\n    if( e.keyCode == 13 ) {\n      process2(v, index);\n    O.mMtaskList.x[index].children[3].elm.style.display = \'none\';\n    }\n  });\n\n  const process2 = function(str, index) {\n    let a = O.mM$taskList.x;\n    let ar = a.split(\',\');\n    let task = str.split(\',\').reduce((a,b) => ar + \'$*$*$\' + b)\n    ar[index * 6] = task;\n    let s = ar.reduce((a,b) => a + \',\' + b);\n    mM$taskList.ret(s);\n  };\n\n  var getIndex2 = function getIndex2 (e) {\n    var elem = e.currentTarget.parentNode.children[0].innerHTML\n    var elem2 = e.currentTarget.parentNode.parentNode.childNodes\n    var keys = Object.keys(elem2);\n    for (let k in keys) {\n      if (elem == elem2[k].childNodes[0].innerHTML) {\n        return k\n      }\n      console.log(\'In getIndex2. No match\');\n    }\n  }  ');

var mM$task = (0, _motorcycleDom.h)('pre', '  const taskAction$ = mM$taskList.stream.map(str => {\n    socket.send(\'TD#$42\' + \',\' + O.mMgroup.x.trim() + \n        \',\' + O.mMname.x.trim() + \',\' + \'@\' + str);\n  });  ');

var updateCalc = (0, _motorcycleDom.h)('pre', '  function updateCalc() { \n    O.mM3.bnd(x => mM7\n    .ret(calc(x[0], O.mM8.x, x[1]))\n    .bnd(result => {if (result == 20) {score(O.mM13.x, 1)}; return O.mM7}) \n    .bnd(result => {if (result == 18) {score(O.mM13.x, 3)}; return O.mM$1}) \n    .bnd(push, O.mM7.x, mM$1)\n    .bnd(reset))\n  };\n\n  var score = function score(x,j) {\n    if ((x + j) == 20) {\n      mMgoals.ret(O.mMgoals.x == 2 ? 0 : (O.mMgoals.x + 1)); \n      mM13.ret(0);\n      socket.send(\'CG#$42,\' + O.mMgroup.x + \',\' + O.mMname.x + \',\' + -x + \',\' + O.mMgoals.x); \n      if (O.mMgoals.x == 0) {\n        socket.send(\'CE#$42,\' + O.mMgroup.x + \',\' + O.mMname.x + \',nothing \');\n      }\n      socket.send(\'CA#$42,\' + O.mMgroup.x.trim() + \',\' + O.mMname.x.trim() + \',6,6,12,20\');\n      return;\n    }\n    if ((x + j) % 5 == 0) {\n      mMscoreChange.ret(j + 5);  \n      socket.send(\'CG#$42,\' + O.mMgroup.x + \',\' + O.mMname.x + \',\'+(j+5)+\',\' + O.mMgoals.x); \n      mM13.ret(x + j + 5);\n      socket.send(\'CA#$42,\' + O.mMgroup.x.trim() + \',\' + O.mMname.x.trim() + \',6,6,12,20\');\n      return;\n    } \n    socket.send(\'CG#$42,\' + O.mMgroup.x + \',\' + O.mMname.x + \',\'+j+\',\' + O.mMgoals.x); \n    mM13.ret(x + j);\n    socket.send(\'CA#$42,\' + O.mMgroup.x.trim() + \',\' + O.mMname.x.trim() + \',6,6,12,20\');\n  };  ');

var testZ = (0, _motorcycleDom.h)('pre', '  mMZ1.bnd(v => O.mMt1.bnd(add,v,mMt1)\n  .bnd(cube,mMt2)\n  .bnd(() => mMt3.ret(O.mMt1.x + \' cubed is \' + O.mMt2.x)))  \n  \n  mMZ2.bnd(v => cube(v).bnd(w => mMt3.ret(v + \' cubed is \' + w)))  \n\n  var add = function(x,b,mon) {\n    if (arguments.length === 3) {\n      return mon.ret(x + b);\n    }\n    return ret(x+b);\n  }\n  \n  var cube = function(v,mon) {\n    if (arguments.length === 2) {\n      return mon.ret(v*v*v);\n    }\n    return ret(v*v*v);  // Returns an anonymous monad.\n  }  ');

var quad = (0, _motorcycleDom.h)('pre', '  var solve = (function solve () {\n    mMZ3\n    .bnd(a => mMquad1.ret(a + \'x**2\')\n    .bnd(() => mMquad2.ret(\'\').bnd(mMquad3.ret) // Clear the display.\n    .bnd(() => \n    mMZ3\n    .bnd(b => mMquad1.ret(a + \'x**x \' + \' + \' + b + \'x\')\n    .bnd(() =>  \n    mMZ3\n    .bnd(c => mMquad1\n    .ret(\'Solutions for \' + a + \'x**x \' + \' + \' + b + \'x\' + \' + \' + c + \' = 0:\')\n    .bnd(() => mMquad2.bnd(sol1,a,b,c,mMquad2)\n    .bnd(() => mMquad3.bnd(sol2,a,b,c,mMquad3) \n    .bnd(() => solve()    \n        )))))))))\n  })();\n\n  const quad$ = sources.DOM\n    .select(\'#quad\').events(\'keypress\')\n  const quadAction$ = quad$.map((e) => {\n    if( e.keyCode == 13 ) {\n      mMZ3.release(e.target.value)\n      document.getElementById(\'quad\').value = \'\';\n    }\n  });\n\n  var sol1 = function sol1 (x,a,b,c,mon) {\n    let n = b*(-1) + Math.sqrt(b*b - 4*a*c);\n    if (n != n) {   // Test for NaN\n      return mon.ret("No solution");\n    }\n    return mon.ret(n/2*a);\n  }\n  \n  var sol2 = function sol2 (x,a,b,c,mon) {\n    let n = b*(-1) - Math.sqrt(b*b - 4*a*c)\n    if (n != n) {\n      return mon.ret("No solution");\n    }\n    return mon.ret(n/2*a);\n  }  ');

var mdem1 = (0, _motorcycleDom.h)('pre', '  var equals = function equals (x, mon1, mon2, mon3) {\n    if (mon1.id === mon2.id && mon1.x === mon2.x) {\n      mon3.ret(\'true\');\n    } else mon3.ret(\'false\');\n    return ret(x);\n  }\n  \n  var add = function(x,b,mon) {\n    if (arguments.length === 3) {\n      return mon.ret(x + b);\n    }\n    return ret(x+b);\n  }\n\n  var cube = function(v,mon) {\n    if (arguments.length === 2) {\n      return mon.ret(v*v*v);\n    }\n    return ret(v*v*v);\n  }  ');

var runTest = (0, _motorcycleDom.h)('pre', '  var runTest = function monTest () {\n  mM5.bnd( equals,  \n    m.ret(0).bnd(v => add(v, 3, m).bnd(cube)), \n    m.ret(0).bnd(add, 3, m).bnd(cube), mMa)\n\n  mM5.bnd(equals, m, m.bnd(m.ret), mMb)\n\n  mM5.bnd(equals, m, m.ret(m.x), mMc)\n  }  ');

var gameStream = (0, _motorcycleDom.h)('pre', '  const mM$1Action$ = mM$1.stream.map(v => {\n      O.mMindex2.bnd(inc, mMindex2);\n      O.mMallRolls.bnd(spliceAdd, O.mMindex2.x, v, mMallRolls);\n      document.getElementById(\'0\').innerHTML = (O.mMallRolls.x[O.mMindex2.x])[0]; \n      document.getElementById(\'1\').innerHTML = (O.mMallRolls.x[O.mMindex2.x])[1]; \n      document.getElementById(\'2\').innerHTML = (O.mMallRolls.x[O.mMindex2.x])[2]; \n      document.getElementById(\'3\').innerHTML = (O.mMallRolls.x[O.mMindex2.x])[3]; \n      cleanup(7)\n  });  ');

var inc = (0, _motorcycleDom.h)('pre', '  var inc = function inc(x, mon) {\n      return mon.ret(x + 1);\n  };\n\n  var spliceAdd = function spliceAdd(x, index, value, mon) {\n    if (Array.isArray(x)) {\n      let ar = [];\n      let keys = Object.keys(x);\n      for (let k in keys) {ar[k] = x[k]};\n      ar.splice(index, 0, value);\n      return mon.ret(ar);  \n    }\n    console.log(\'The value provided to spliceAdd is not an array\');\n    return ret(x);\n  }  ');

var todoStream = (0, _motorcycleDom.h)('pre', '  const taskAction$ = mM$taskList.stream.map(str => {\n    socket.send(\'TD#$42\' + \',\' + O.mMgroup.x.trim() + \n        \',\' + O.mMname.x.trim() + \',\' + \'@\' + str);\n  });  ');

var p3 = (0, _motorcycleDom.h)('pre', '  \n    ');

var p4 = (0, _motorcycleDom.h)('pre', '  \n    ');

var p5 = (0, _motorcycleDom.h)('pre', '  \n    ');

var add = (0, _motorcycleDom.h)('pre', '  var add = function(x,b,mon) {\n  if (arguments.length === 3) {\n    return mon.ret(x + b);\n  }\n  return ret(x+b);  ');

var ret_cube = (0, _motorcycleDom.h)('pre', '  var ret = function ret(v, id) {\n    if (arguments.length === 1) {\n      return (new Monad(v, \'anonymous\'));\n    }\n    window[id] = new Monad(v, id);\n    return window[id];\n  }  \n\n var cube = function(v,mon) {\n  if (arguments.length === 2) {\n    return mon.ret(v*v*v);\n  }\n  return ret(v*v*v);\n}  ');

var p5 = (0, _motorcycleDom.h)('pre', '  \n    ');

exports['default'] = { monad: monad, monadStr: monadStr, monadIt: monadIt, fib: fib, driver: driver, messages: messages, next: next, Monad$: Monad$, updateCalc: updateCalc, stream: stream, arrayFuncs: arrayFuncs, travel: travel, nums: nums, cleanup: cleanup, ret: ret, C42: C42, taskStream: taskStream, newTask: newTask, process: process, mM$task: mM$task, addString: addString, colorClick: colorClick, edit: edit, testZ: testZ, quad: quad, mdem1: mdem1, runTest: runTest, todoStream: todoStream, gameStream: gameStream, inc: inc, add: add, ret_cube: ret_cube };
module.exports = exports['default'];

},{"@motorcycle/dom":75,"most-subject":117}],185:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _motorcycleCore = require('@motorcycle/core');

var _motorcycleCore2 = _interopRequireDefault(_motorcycleCore);

var _motorcycleDom = require('@motorcycle/dom');

var _most = require('most');

var _codeJs = require('./code.js');

var _codeJs2 = _interopRequireDefault(_codeJs);

var _mostSubject = require('most-subject');

function createWebSocket(path) {
  var host = window.location.hostname;
  if (host == '') host = 'localhost';
  var uri = 'ws://' + host + ':3055' + path;
  var Socket = "MozWebSocket" in window ? MozWebSocket : WebSocket;
  return new Socket(uri);
}

var socket = createWebSocket('/');

var websocketsDriver = function websocketsDriver() {
  return (0, _most.create)(function (add) {
    socket.onmessage = function (msg) {
      return add(msg);
    };
  });
};

var unitDriver = function unitDriver() {
  return (0, _most.periodic)(1000, 1);
};

mM3.ret([]);

window.onload = function (event) {
  console.log('onopen event: ', event);
};

function main(sources) {

  setTimeout(function () {
    document.querySelector('input#login').focus();
  }, 500);

  mMfib.ret([0, 1]);
  mMpause.ret(0);

  mMZ1.bnd(function (v) {
    return O.mMt1.bnd(add, v, mMt1).bnd(cube, mMt2).bnd(function () {
      return mMt3.ret(O.mMt1.x + ' cubed is ' + O.mMt2.x);
    });
  });

  mMZ2.bnd(function (v) {
    return cube(v).bnd(function (w) {
      return mMt3.ret(v + ' cubed is ' + w);
    });
  });

  var messages$ = sources.WS.map(function (e) {
    console.log('******____&&&&&&&&&&&&&&&&&&&____**************_In messages$  e.data is: ', e.data);
    mMtem.ret(e.data.split(',')).bnd(function (v) {
      mMZ10.bnd(function () {
        mM$2.ret([]);
        mM$1.ret([v[3], v[4], v[5], v[6]]);
      });
      mMZ11.bnd(function () {
        return updateScoreboard(v[3]);
      });
      mMZ12.bnd(function () {
        return mM6.ret(v[2] + ' successfully logged in.');
      });
      mMZ13.bnd(function () {
        return updateMessages(v);
      });
      mMZ14.bnd(function () {
        return mMgoals2.ret('The winner is ' + v.x);
      });
      mMZ15.bnd(function () {
        return mMgoals2.ret('A player named ' + O.mMname.x + 'is currently logged in. Page will refresh in 4 seconds.').bnd(refresh);
      });
      mMZ16.bnd(function () {
        if (v[3] == 'no file') {
          mMtaskList.ret([]);
        } else {
          process(e.data);
        }
      });
      mMtemp.ret(e.data.split(',')[0]).bnd(next, 'CA#$42', mMZ10).bnd(next, 'CB#$42', mMZ11).bnd(next, 'CC#$42', mMZ12).bnd(next, 'CD#$42', mMZ13).bnd(next, 'CE#$42', mMZ14).bnd(next, 'EE#$42', mMZ15).bnd(next, 'DD#$42', mMZ16);
    });
  });

  var updateMessages = function updateMessages(ar) {
    var sender = ar[2];
    mMhelper.ret(ar).bnd(splice, 0, 3, mMhelper).bnd(reduce, function (a, b) {
      return a + ', ' + b;
    }, mMhelper).bnd(function (v) {
      return O.mMmsg.bnd(unshift, (0, _motorcycleDom.h)('div', sender + ': ' + v), O.mMmsg);
    });
  };

  var loginPress$ = sources.DOM.select('input#login').events('keypress');

  var loginPressAction$ = loginPress$.map(function (e) {
    var v = e.target.value;
    if (v == '') {
      return;
    }
    if (e.keyCode == 13) {
      socket.send("CC#$42" + v);
      mMname.ret(v.trim());
      mM3.ret([]).bnd(mM2.ret);
      e.target.value = '';
      document.getElementById('dice').style.display = 'block';
      document.getElementById('rightPanel').style.display = 'block';
      document.getElementById('log1').style.display = 'none';
      document.getElementById('log2').style.display = 'block';
      document.getElementById('gameDiv2').style.display = 'block';
    }
  });

  var groupPress$ = sources.DOM.select('input#group').events('keypress');

  var groupPressAction$ = groupPress$.map(function (e) {
    var v = e.target.value;
    if (e.keyCode == 13) {
      mMgroup.ret(v);
      socket.send('CO#$42,' + v + ',' + O.mMname.x.trim() + ',' + v);
    }
  });

  var messagePress$ = sources.DOM.select('input.inputMessage').events('keydown');

  var messagePressAction$ = messagePress$.map(function (e) {
    if (e.keyCode == 13) {
      socket.send('CD#$42,' + O.mMgroup.x.trim() + ',' + O.mMname.x.trim() + ',' + e.target.value);
      e.target.value = '';
    }
  });

  var newTask$ = sources.DOM.select('input.newTask').events('keydown');

  var newTaskAction$ = newTask$.map(function (e) {
    var ob = {};
    var alert = '';
    var task = '';
    if (e.keyCode == 13) {
      var ar = e.target.value.split(',');
      if (ar.length < 3) {
        alert = 'You should enter "author, responsible party, task" separated by commas';
        document.getElementById('alert').innerHTML = alert;
      }
      var ar2 = ar.slice(2);
      console.log('*************************************$$$$$$$$$$$_ar ', ar);
      if (ar2.length == 1) {
        task = ar[2];
      }
      if (ar2.length > 1) {
        task = ar2.reduce(function (a, b) {
          return a + '$*$*$' + b;
        });
      }
      if (O.mMar2.x.filter(function (v) {
        return v.task == task;
      }).length > 0) {
        document.getElementById('alert').innerHTML = task + " is already listed.";
      } else if (ar.length > 2) {
        O.mMcurrentList.bnd(addString, task + ',yellow, none, false,' + ar[0] + ',' + ar[1], mM$taskList);
        e.target.value = '';
        document.getElementById('alert').innerHTML = '';
      }
    }
  });

  var process = function process(str) {
    var a = str.split(",");
    if (a == undefined) {
      return;
    };
    if (a.length < 9) {
      return;
    };
    var ob = {};
    var ar = a.slice(3);
    var s = ar.reduce(function (a, b) {
      return a + ',' + b;
    });
    console.log('In process. ar and s are: ', ar, s);
    var tempArray = [];
    if (ar.length < 6) {
      return;
    };
    if (ar.length % 6 !== 0) {
      document.getElementById('alert').innerHTML = 'Error: array length is: ' + length;
    }
    mMcurrentList.ret(s);
    process3(ar);
  };

  var process3 = function process3(a) {
    var ar5 = [];
    var keys = Array(a.length / 6).fill(1);
    keys.map(function (_) {
      ar5.push({
        task: convertBack(a.shift()),
        color: a.shift(),
        textDecoration: a.shift(),
        checked: a.shift() === 'true',
        author: a.shift(),
        responsible: a.shift()
      });
    });
    mMar2.ret(ar5);
    process4(ar5);
  };

  var process4 = function process4(a) {
    var tempArray = [];
    var keys = Object.keys(a);
    for (var k in keys) {
      tempArray.push((0, _motorcycleDom.h)('div.todo', [(0, _motorcycleDom.h)('span.task3', { style: { color: a[k].color, textDecoration: a[k].textDecoration } }, 'Task: ' + a[k].task), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('button#edit1', 'Edit'), (0, _motorcycleDom.h)('input#edit2', { props: { type: 'textarea', value: a[k].task }, style: { display: 'none' } }), (0, _motorcycleDom.h)('span#author.tao', 'Author: ' + a[k].author + ' / ' + 'Responsibility: ' + a[k].responsible), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('input#cb', { props: { type: 'checkbox', checked: a[k].checked }, style: { color: a[k].color,
          textDecoration: a[k].textDecoration } }), (0, _motorcycleDom.h)('label.cbox', { props: { 'for': '#cb' } }, 'Completed'), (0, _motorcycleDom.h)('button.delete', 'Delete'), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('hr')]));
    }
    mMtaskList.ret(tempArray);
  };

  var colorClick$ = sources.DOM.select('#cb').events('click');

  var colorAction$ = colorClick$.map(function (e) {
    var index = getIndex(e);
    var s = O.mMcurrentList.x;
    var ar = s.split(',');
    var n = 6 * index + 3;
    var j = 6 * index + 2;
    var k = 6 * index + 1;
    var checked = ar[n];
    if (checked == 'true') {
      ar[n] = 'false';
      ar[k] = 'yellow';
      ar[j] = 'none';
    } else {
      ar[n] = 'true';
      ar[k] = 'lightGreen';
      ar[j] = 'line-through';
    }
    mM$taskList.ret(ar.reduce(function (a, b) {
      return a + ',' + b;
    }));
  });

  var edit1$ = sources.DOM.select('#edit1').events('click');

  var edit1Action$ = edit1$.map(function (e) {
    var index = getIndex2(e);
    O.mMtaskList.x[index].children[3].elm.style.display = 'block';
  });

  var edit2$ = sources.DOM.select('#edit2').events('keypress');

  var edit2Action$ = edit2$.map(function (e) {
    var v = e.target.value;
    var index = getIndex2(e);
    if (e.keyCode == 13) {
      process2(v, index);
      O.mMtaskList.x[index].children[3].elm.style.display = 'none';
    }
  });

  var process2 = function process2(str, index) {
    var a = O.mMcurrentList.x;
    var ar = a.split(',');
    var task = str.split(',').reduce(function (a, b) {
      return ar + '$*$*$' + b;
    });
    ar[index * 6] = task;
    var s = ar.reduce(function (a, b) {
      return a + ',' + b;
    });
    mM$taskList.ret(s);
  };

  var deleteClick$ = sources.DOM.select('.delete').events('click');

  var deleteAction$ = deleteClick$.map(function (e) {
    var index = getIndex(e);
    var s = O.mMcurrentList.x;
    var ar = s.split(',');
    var str = '';
    ar.splice(index * 6, 6);
    if (ar.length > 0) {
      mM$taskList.ret(ar.reduce(function (a, b) {
        return a + ',' + b;
      }));
    } else {
      socket.send('TX#$42' + ',' + O.mMgroup.x.trim() + ',' + O.mMname.x.trim());
      mMtaskList.ret('');
    }
  });

  var taskAction$ = mM$taskList.stream.map(function (str) {
    socket.send('TD#$42' + ',' + O.mMgroup.x.trim() + ',' + O.mMname.x.trim() + ',' + '@' + str);
  });

  var chatClick$ = sources.DOM.select('#chat2').events('click');

  var chatClickAction$ = chatClick$.map(function () {
    var el = document.getElementById('chatDiv');
    el.style.display == 'none' ? el.style.display = 'inline' : el.style.display = 'none';
  });

  var captionClick$ = sources.DOM.select('#caption').events('click');

  var captionClickAction$ = captionClick$.map(function () {
    var el = document.getElementById('captionDiv');
    el.style.display == 'none' ? el.style.display = 'inline' : el.style.display = 'none';
  });

  var gameClick$ = sources.DOM.select('#game').events('click');

  var gameClickAction$ = gameClick$.map(function () {
    var el = document.getElementById('gameDiv');
    el.style.display == 'none' ? el.style.display = 'inline' : el.style.display = 'none';

    var el2 = document.getElementById('gameDiv2');
    el2.style.display == 'none' ? el2.style.display = 'inline' : el2.style.display = 'none';
  });

  var runTest$ = sources.DOM.select('#runTest').events('click');

  var runTestAction$ = runTest$.map(function () {
    runTest();
  });

  var todoClick$ = sources.DOM.select('#todoButton').events('click');

  var todoClickAction$ = todoClick$.map(function (e) {
    var el = document.getElementById('todoDiv');
    el.style.display == 'none' ? el.style.display = 'inline' : el.style.display = 'none';
  });

  var numClick$ = sources.DOM.select('.num').events('click');

  var numClickAction$ = numClick$.map(function (e) {
    console.log('In numClickAction$ O.mM3.x and e are: ', O.mM3.x, e);
    if (O.mM3.x.length < 2) {
      O.mM3.bnd(push, e.target.innerHTML, O.mM3);
      // mMtemp.ret(O.mMhistorymM1.x[O.mMindex2.x])
      O.mMallRolls.bnd(spliceRemove, O.mMindex2.x, e.target.id, mM$1);
      if (O.mM3.x.length === 2 && O.mM8.x !== 0) {
        updateCalc();
      }
    };
  }).startWith([0, 0, 0, 0]);

  var opClick$ = sources.DOM.select('.op').events('click');

  var opClickAction$ = opClick$.map(function (e) {
    mM8.ret(e.target.textContent);
    if (O.mM3.x.length === 2) {
      updateCalc();
    }
  });

  var rollClick$ = sources.DOM.select('.roll').events('click');

  var rollClickAction$ = rollClick$.map(function (e) {
    mM13.ret(O.mM13.x - 1);
    socket.send('CG#$42,' + O.mMgroup.x.trim() + ',' + O.mMname.x.trim() + ',' + -1 + ',' + O.mMgoals.x);
    socket.send('CA#$42,' + O.mMgroup.x.trim() + ',' + O.mMname.x.trim() + ',6,6,12,20');
  });

  var fibPress$ = sources.DOM.select('input#code').events('keydown');

  var fibPressAction$ = fibPress$.map(function (e) {
    if (e.target.value == '') {
      return;
    };
    if (e.keyCode == 13 && Number.isInteger(e.target.value * 1)) {
      mM19.bnd(fibCalc, e.target.value * 1).bnd(mM19.ret);
      mM21.ret(e.target.value);
    }
    if (e.keyCode == 13 && !Number.isInteger(e.target.value * 1)) {
      mM19.ret("You didn't provide an integer");
    }
  });

  var forwardClick$ = sources.DOM.select('#forward2').events('click');

  var backClick$ = sources.DOM.select('#back2').events('click');

  var forwardClickAction$ = forwardClick$.map(function () {
    if (O.mMindex2.x < O.mMallRolls.x.length - 1) {
      inc(O.mMindex2.x, mMindex2).bnd(function () {
        return mM$3.ret('Hello');
      });
    }
  });

  var backClickAction$ = backClick$.map(function () {
    if (O.mMindex2.x > 0) {
      console.log('In backClickAction$ O.mMindex2.x is: ', O.mMindex2.x);
      dec(O.mMindex2.x, mMindex2).bnd(function () {
        return mM$3.ret('You bet!');
      });
      console.log('In backClickAction$ again ***** O.mMindex2.x is: ', O.mMindex2.x);
    }
  });

  var mM$1Action$ = mM$1.stream.map(function (v) {
    O.mMindex2.bnd(inc, mMindex2);
    O.mMallRolls.bnd(spliceAdd, O.mMindex2.x, v, mMallRolls);
    mMcurrentRoll.ret(v);
    document.getElementById('0').innerHTML = O.mMallRolls.x[O.mMindex2.x][0];
    document.getElementById('1').innerHTML = O.mMallRolls.x[O.mMindex2.x][1];
    document.getElementById('2').innerHTML = O.mMallRolls.x[O.mMindex2.x][2];
    document.getElementById('3').innerHTML = O.mMallRolls.x[O.mMindex2.x][3];
    cleanup(7);
  });

  var mM$3Action$ = mM$3.stream.map(function (v) {
    document.getElementById('0').innerHTML = O.mMallRolls.x[O.mMindex2.x][0];
    document.getElementById('1').innerHTML = O.mMallRolls.x[O.mMindex2.x][1];
    document.getElementById('2').innerHTML = O.mMallRolls.x[O.mMindex2.x][2];
    document.getElementById('3').innerHTML = O.mMallRolls.x[O.mMindex2.x][3];
    cleanup(11);
  });

  var testZ = sources.DOM.select('#testZ').events('click');
  var testZAction$ = testZ.map(function () {
    return mMZ1.release(1);
  });

  var testQ = sources.DOM.select('#testQ').events('click');
  var testQAction$ = testQ.map(function () {
    return mMt1.ret(-1).bnd(mM2.ret).bnd(function () {
      return mMZ1.release(1);
    });
  });

  var testW = sources.DOM.select('#testW').events('keypress');
  var testWAction$ = testW.map(function (e) {
    if (e.keyCode == 13) {
      mMZ2.release(e.target.value);
    }
  });

  var solve = (function solve() {
    mMZ3.bnd(function (a) {
      return mMquad1.ret(a + 'x**2').bnd(function () {
        return mMquad2.ret('').bnd(mMquad3.ret) // Clear the display.
        .bnd(function () {
          return mMZ3.bnd(function (b) {
            return mMquad1.ret(a + 'x**2 ' + ' + ' + b + 'x').bnd(function () {
              return mMZ3.bnd(function (c) {
                return mMquad1.ret('Solutions for ' + a + 'x**2 ' + ' + ' + b + 'x' + ' + ' + c + ' = 0:').bnd(function () {
                  return mMquad2.bnd(sol1, a, b, c, mMquad2).bnd(function () {
                    return mMquad3.bnd(sol2, a, b, c, mMquad3).bnd(function () {
                      return solve();
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  })();

  var quad$ = sources.DOM.select('#quad').events('keypress');
  var quadAction$ = quad$.map(function (e) {
    if (e.keyCode == 13) {
      mMZ3.release(e.target.value);
      document.getElementById('quad').value = '';
    }
  });

  var calcStream$ = (0, _most.merge)(runTestAction$, quadAction$, testWAction$, testZAction$, testQAction$, edit1Action$, edit2Action$, taskAction$, colorAction$, deleteAction$, newTaskAction$, chatClickAction$, gameClickAction$, todoClickAction$, captionClickAction$, mM$3Action$, mM$1Action$, backClickAction$, forwardClickAction$, fibPressAction$, groupPressAction$, rollClickAction$, messagePressAction$, loginPressAction$, messages$, numClickAction$, opClickAction$);

  return {
    DOM: calcStream$.map(function () {
      return (0, _motorcycleDom.h)('div.content', [(0, _motorcycleDom.h)('div#rightPanel', { style: { display: 'none' } }, [(0, _motorcycleDom.h)('span#tog', [(0, _motorcycleDom.h)('button#game', { style: { fontSize: '16px' } }, 'TOGGLE GAME'), (0, _motorcycleDom.h)('span.tao', ' '), (0, _motorcycleDom.h)('button#todoButton', { style: { fontSize: '16px' } }, 'TOGGLE TODO LIST'), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('button#chat2', { style: { fontSize: '16px' } }, 'TOGGLE CHAT'), (0, _motorcycleDom.h)('span.tao', ' '), (0, _motorcycleDom.h)('button#caption', { style: { fontSize: '16px' } }, 'TOGGLE CAPTION')]), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('div#gameDiv', [(0, _motorcycleDom.h)('span', 'Group: ' + O.mMgroup.x), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('span', 'Goals: ' + O.mMgoals.x), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('span', 'Name: ' + O.mMname.x), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('span', 'player[score][goals]'), (0, _motorcycleDom.h)('div', O.mMscoreboard.x)]), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('div#todoDiv', [(0, _motorcycleDom.h)('div#taskList', O.mMtaskList.x), (0, _motorcycleDom.h)('span', 'Author, Responsible Person, Task: '), (0, _motorcycleDom.h)('input.newTask')]), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('span#alert'), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('div#chatDiv', [(0, _motorcycleDom.h)('div#messages', [(0, _motorcycleDom.h)('span', 'Message: '), (0, _motorcycleDom.h)('input.inputMessage'), (0, _motorcycleDom.h)('div', O.mMmsg.x)])])]), (0, _motorcycleDom.h)('div.leftPanel', { style: { width: '60%' } }, [(0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('a.tao', { props: { href: '#common' } }, 'Common Patterns'), (0, _motorcycleDom.h)('a.tao', { props: { href: '#tdList' } }, 'Todo List Explanation'), (0, _motorcycleDom.h)('a.tao', { props: { href: '#monads' } }, 'Why Call Them Monads'), (0, _motorcycleDom.h)('div#captionDiv', [(0, _motorcycleDom.h)('h1', 'Motorcycle.js With JS-monads'), (0, _motorcycleDom.h)('span.tao1', ' A shared, persistent todo list, '), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('span.tao1', ' A websockets game with a traversable history of dice rolls, '), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('span.tao1', ' Group chat rooms and more demonstrations of efficient, '), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('span.tao2', ' maintainable code using Motorcycle.js and JS-monads.  ')]), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('span.tao', 'This is a '), (0, _motorcycleDom.h)('a', { props: { href: "https://github.com/motorcyclejs" } }, 'Motorcycle.js'), (0, _motorcycleDom.h)('span', ' application. Motorcycle.js is '), (0, _motorcycleDom.h)('a', { props: { href: "https://github.com/cyclejs/core" } }, 'Cycle.js'), (0, _motorcycleDom.h)('span', ' using '), (0, _motorcycleDom.h)('a', { props: { href: "https://github.com/cujojs/most" } }, 'Most'), (0, _motorcycleDom.h)('span', ' , '), (0, _motorcycleDom.h)('a', { props: { href: "https://github.com/TylorS/most-subject" } }, 'Most-subject'), (0, _motorcycleDom.h)('span', ' and '), (0, _motorcycleDom.h)('a', { props: { href: "https://github.com/paldepind/snabbdom" } }, 'Snabbdom'), (0, _motorcycleDom.h)('span', ' instead of RxJS and virtual-dom. The repository is at '), (0, _motorcycleDom.h)('a', { props: { href: "https://github.com/dschalk/JS-monads-stable" } }, 'JS-monads-stable'), (0, _motorcycleDom.h)('div#gameDiv2', { style: { display: 'none' } }, [(0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('span', ' Here are the basic rules:'), (0, _motorcycleDom.h)('p', 'RULES: If clicking two numbers and an operator (in any order) results in 20 or 18, the score increases by 1 or 3, respectively. If the score becomes 0 mod 5, 5 points are added. A score of 25 results in one goal. That can only be achieved by arriving at a score of 20, which jumps the score to 25. Directly computing 25 results in a score of 30, and no goal. Each time ROLL is clicked, one point is deducted. Three goals wins the game. '), (0, _motorcycleDom.h)('button#0.num'), (0, _motorcycleDom.h)('button#1.num'), (0, _motorcycleDom.h)('button#2.num'), (0, _motorcycleDom.h)('button#3.num'), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('button#4.op', 'add'), (0, _motorcycleDom.h)('button#5.op', 'subtract'), (0, _motorcycleDom.h)('button#5.op', 'mult'), (0, _motorcycleDom.h)('button#5.op', 'div'), (0, _motorcycleDom.h)('button#5.op', 'concat'), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('div#dice', { style: { display: 'none' } }, [(0, _motorcycleDom.h)('button.roll', 'ROLL'), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('button#back2', 'BACK'), (0, _motorcycleDom.h)('button#forward2', 'FORWARD')])]), (0, _motorcycleDom.h)('div.winner', O.mMgoals2.x + ''), (0, _motorcycleDom.h)('div#log1', [(0, _motorcycleDom.h)('p', 'IN ORDER TO SEE THE DEMONSTRATIONS, YOU MUST ENTER SOMETHING BELOW.'), (0, _motorcycleDom.h)('span', 'Name: '), (0, _motorcycleDom.h)('input#login', { props: { placeholder: "focus on; start typing" } })]), (0, _motorcycleDom.h)('p', O.mM6.x.toString()), (0, _motorcycleDom.h)('div#log2', { style: { display: 'none' } }, [(0, _motorcycleDom.h)('span', 'Change group: '), (0, _motorcycleDom.h)('input#group')]), (0, _motorcycleDom.h)('p', O.mMsoloAlert.x), (0, _motorcycleDom.h)('p', 'People who are in the same group, other than solo, share the same todo list, messages, and simulated dice game. In order to see any of these, you must establish an identity on the server by logging in. The websockets connection would terminate if the first message the server receives does not succefully participate in the login handshake. '), (0, _motorcycleDom.h)('hr'), (0, _motorcycleDom.h)('h1', 'The Monads'), (0, _motorcycleDom.h)('p', ' There are three basic types of monads: Monad, MonadIter, and MonadStream. Instances of Monad have a method called "bnd" which takes a functions and possibly other values as arguments. I have not created a library of functions for because nobody needs that. You should create functions that suit your specific purposes. I use browserify or webpack so I can use ES6 functions such as map, reduce, and filter. I don\'t need the Ramda or Underscore-fs. '), (0, _motorcycleDom.h)('p', ' There is a basic pattern that I have found useful for computations and object (including array) manipulation. For what it is worth, I will demonstrate it with some simple examples in the discussion that follows. This will serve as a demonstration of how the monads work. '), (0, _motorcycleDom.h)('h2', 'Monad'), _codeJs2['default'].monad, (0, _motorcycleDom.h)('p', 'The following statements create instances of Monad named "m" with an initial value of "some value": var m = new Monad("some value", "m") and ret("some value", "m"). Monad instances maintain state in the unique, mutable, global object named "O". Where there is changing state, it is not practical to avoid mutating something. My choices narrowed down to the window object or an attribute of window like O. O seemed like the better choice. It is a place to keep the most recent versions of named monads. Earlier versions of named monads can persist elsewhere, or be left for the gargage collector.   '), (0, _motorcycleDom.h)('p', ' In the examples shown on this page, the initial values of instances of Monad remain unchaged. The ret() method places updated instances on O. The instances on O are never mutated. For any instance of Monad named m with id "m" and value v (i.e., m.x == v is true), m.ret(v2) creates a new attribute of O with key "m" or, if O.m already exists, m.ret(v2) mutates O by replacing its m attribute\'s value. The monad O.m is not mutated, so any O.m that is replaced will persist if there is a reference to it, or will be subject to garbage collection if there is not. '), (0, _motorcycleDom.h)('h3', 'Examples'), (0, _motorcycleDom.h)('p', ' Here are the definitions of ret() and add(): '), _codeJs2['default'].ret_cube, (0, _motorcycleDom.h)('p', ' calling ret() with only one argument creates an anonymous global monad. There is no reference to it, so when a computation sequence using it terminates, it becomes eligeble for garbage collection. Although the monad\'s scope is global, it can\'t be clobbered because it has no name (no variable referring to it). '), (0, _motorcycleDom.h)('p', ' As you see, cube() and ret() are overloaded functions. Here are some examples of various ways of using them: '), (0, _motorcycleDom.h)('span.red3', 'cube(3)'), (0, _motorcycleDom.h)('span.td2', ' creates a useless anonymous monad with x == 27 and id == "anonymous". '), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('span.red3', 'cube(5, m)'), (0, _motorcycleDom.h)('span.td2', ' where m is a monad leaves m unchanged, O.m.x == 125, and O.m.id == "m". '), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('span.red3', 'cube(5).bnd(m.ret)'), (0, _motorcycleDom.h)('span.td2', ' is equivalent to the previous example. m is unchanged and O.m.x == 125. '), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('span.red3', 'ret(5).bnd(cube).bnd(m.ret)'), (0, _motorcycleDom.h)('span.td2', ' is equivalent to the previous two examples. O.m.x == 125. '), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('span.red3', 'm.ret(4).bnd(cube)'), (0, _motorcycleDom.h)('span.td2', 'causes O.m.x == 2, and creates an anonymous monad with x == 64. '), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('span.red3', 'm.ret(4).bnd(cube, m)'), (0, _motorcycleDom.h)('span.td2', ' leaves m unchanged, O.m.x == 64, and O.m.id == "m". '), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('span.tao', ' The convention "a == b" in this presentation signifies that a == b is true. By the way, if you want to change the value of m, all you have to do is call '), (0, _motorcycleDom.h)('span.red3', 'ret(v, "m")'), (0, _motorcycleDom.h)('span', ' to cause m.x == v and m.id = "m". This is the definition of add(): '), _codeJs2['default'].add, (0, _motorcycleDom.h)('span.red3', 'add(3, 4)'), (0, _motorcycleDom.h)('span.td2', ' creates a useless anonymous monad with x == 7 and id == "anonymous". '), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('span.red3', 'add(3, 4).bnd(m.ret)'), (0, _motorcycleDom.h)('span.td2', ' causes O.m.x == 7 and O.m.id == "m". '), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('span.red3', 'add(3, 4, m)'), (0, _motorcycleDom.h)('span.td2', ' is equivalent to the prior example. The result is O.m.x == 7, and O.m.id == "m". '), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('span.red3', 'm.ret(0).bnd(add, 3).bnd(cube)'), (0, _motorcycleDom.h)('span.td2', 'leaves m unchanged, O.m.x == 0, and creates an anonymous monad with x == 27. '), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('span.red3', 'ret(0).bnd(add, 3).bnd(cube).bnd(m.ret)'), (0, _motorcycleDom.h)('span.td2', 'causes O.m.x == 27, and O.m.id = "m". '), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('span.red3', 'ret(0).bnd(add, 2, m).bnd(cube, m2)'), (0, _motorcycleDom.h)('span.td2', ' where m, and m2 are monads causes O.m.x == 2, and O.m2.x == 8. '), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('p#iterLink', ' O holds the current state of the monads. This is convenient. For example, mMcurrentList.ret() is seen in the application code whereever a todo list is created, removed, or altered. O.mMcurrentList.x sits in the virtual DOM, making sure that the todo list display is is always current. '), (0, _motorcycleDom.h)('h2', 'MonadIter'), (0, _motorcycleDom.h)('p', 'For any instance of MonadIter, say "m", the statement "m.bnd(func)" causes m.p == func to be true. The statement "m.release(...args) causes p(...args) to execute. Here is the definition: '), _codeJs2['default'].monadIt, (0, _motorcycleDom.h)('p', 'As shown later on this page, MonadIter instances control the routing of incoming websockets messages and the flow of action in the simulated dice game. '), (0, _motorcycleDom.h)('p', 'The following example illustrates the use of release() with an argument. It also shows lambda expressions being provided as arguments for bnd(). The initial values of mMt1, mMt2, and mMt3 are 0, 0, and "" respectively. When this page loads, the following code runs: '), _codeJs2['default'].testZ, (0, _motorcycleDom.h)('p', ' add() and cube() function as arguments of the bnd() method, or as functions that return monads. Click "mMZ1.release(1)" several times to run the code with n == 1. O.mMt3.x is shown below the button. mMZ1.p doesn\'t change until its bnd() method is used again, so repeated calls to release(1) continue to run the function provided to bnd() in the code shown above. '), (0, _motorcycleDom.h)('button#testZ', 'mMZ1.release(1)'), (0, _motorcycleDom.h)('p.code2', O.mMt3.x), (0, _motorcycleDom.h)('span', 'Refresh button: '), (0, _motorcycleDom.h)('button#testQ', 'mMt1.ret(0).bnd(mMt2.ret)'), (0, _motorcycleDom.h)('p', '  You can call release() with arguments other than 1 by entering numbers below. '), (0, _motorcycleDom.h)('input#testW'), (0, _motorcycleDom.h)('p', ' Here is another example. It demonstrates lambda expressions passing values to a remote location for use in a computation. If you enter three numbers consecutively below, I\'ll call them a, b, and c, then the quadratic equation will be used to find solutions for a*x**2 + b*x + c = 0. The a, b, and c you select might not have a solution. If a and b are positive numbers, you are likely to see solutions if c is a negative number. For example, 12, 12, and -24 yields the solutions 1 and -2. '), (0, _motorcycleDom.h)('p.code2#quad4', O.mMquad1.x), (0, _motorcycleDom.h)('span.red2', O.mMquad2.x), (0, _motorcycleDom.h)('span.red2', O.mMquad3.x), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('span.tao', 'Run mMZ3.release(v) three times for three numbers. The numbers are a, b, and c in ax*x + b*x + c = 0: '), (0, _motorcycleDom.h)('input#quad'), (0, _motorcycleDom.h)('p', 'Here is the code:'), _codeJs2['default'].quad, (0, _motorcycleDom.h)('span#tdList'), (0, _motorcycleDom.h)('h2', 'MonadStream'), (0, _motorcycleDom.h)('span.tao', ' MonadStream uses '), (0, _motorcycleDom.h)('a', { props: { href: "https://github.com/TylorS/most-subject" } }, 'most-subject'), (0, _motorcycleDom.h)('span', '. In a Cycle application that is already using RxJS, RxJs could be substituted for most-subject. Bacon could be used. most-subject is light-weight and does the job, so you might want to use it in any application context. Here is the definition:  '), _codeJs2['default'].monadStr, (0, _motorcycleDom.h)('h3', 'Todo List Side Effects'), (0, _motorcycleDom.h)('p', ' When users do anything to the todo list, MonadStream instance mM$taskList runs its ret() method on the modified String representation of the list, causing the string to be added to mM$taskList.stream. mM$taskList.stream has only one subscriber, taskAction$, whose only purpose it to send the string representation of the todo list to the server. The server updates its persistent file and distributes a text representation of the updated todo list to all group members. Each group member receives the todo list as a string and parses it into a DOM node tree that is merged into the stream that updates the virtual DOM. All Todo List side effects can be traced to:'), _codeJs2['default'].todoStream, (0, _motorcycleDom.h)('span', ' Just search for "mM$taskList.ret" to find where all todo list changes were initiated. The following link takes you to a more detailed explanation of the todo list. '), (0, _motorcycleDom.h)('a', { props: { href: '#tdList2' } }, 'Detailed Todo List Explanation'), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('h3', 'Dice Game Side Effects'), (0, _motorcycleDom.h)('p', ' mM$1.ret() is called only when (1) a new dice roll comes in from the server, (2) when a player clicks a number, and (3) when clicking a number or operator results in a computation being performed. These are the three things that require a DOM update. When a player clicks a number, it disappears from number display. When a computation is performed, the result is added to the number display, unless the result is 18 or 20. A result of 18 or 20 results in a new roll coming in from the server and mM$1.ret() being called on an array of four numbers; something like mM$1.ret[4,2,11,17]). When a number is removed or a result added, mM$1.ret() is called on an array containing fewer than four numbers. '), (0, _motorcycleDom.h)('p', ' mM$1.stream is a stream of arrays of integers, as explained in the paragraph above. All game side effects can be traced to: '), _codeJs2['default'].gameStream, (0, _motorcycleDom.h)('p', ' Because a player can traverse the history of number displays by clicking the BACK and FORWARD buttons, the current value of O.mMindex2.x must be incremented to determine where the new array of numbers will be placed in the O.mMallRolls.x array. Here are the definitions of inc and spliceAdd: '), _codeJs2['default'].inc, (0, _motorcycleDom.h)('hr'), (0, _motorcycleDom.h)('h2', 'Concise Code Blocks For Information Control'), (0, _motorcycleDom.h)('p', ' Incoming websockets messages trigger updates to the game display, the chat display, and the todo list display. The members of a group see what other members are doing; and in the case of the todo list, they see the current list when they sign in to the group. When any member of a group adds a task, crosses it out as completed, edits its description, or removes it, the server updates the persistent file and all members of the group immediately see the revised list.  '), (0, _motorcycleDom.h)('p', 'The code below shows how incoming websockets messages are routed. For example, mMZ10.release() is called when a new dice roll (prefixed by CA#$42) comes in.   '), _codeJs2['default'].messages, (0, _motorcycleDom.h)('p', ' The "mMZ" prefix designates instances of MonadIter. The bnd() method assigns its argument to the "p" attribute. "p" runs if and when the release() method is called. The next() function releases a specified MonadIter instance when the calling monad\'s value matches the specified value. next2() releases the specified monad when the specified condition returns true. The release method in next() has no argument, but next does take arguments, as illustrated below.'), (0, _motorcycleDom.h)('span.tao', ' The incoming messages block is just a syntactic variation of a switch block, but that isn\'t all that MonadIter instances can do. They can provide fine-grained control over the lazy evaluation of blocks of code. Calling release() after a function completes some task provides Promise-like behavior. Error handling is optional. The MonadInter release(...args) method facilitates sequential evaluation of code blocks, remeniscent of video and blog explanations of ES6 iterators and generators. I prefer doing it with MonadIter over "yield" and "next". For one thing, ES6 generator "yield" blocks must be evaluated in a predetermined order. This link takes you back to the MonadIter section with interactive examples of the use of release() with arguments.  '), (0, _motorcycleDom.h)('a#tdList2', { props: { href: '#iterLink' } }, 'release() with arguments'), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('a', { props: { href: '#top' } }, 'Back To The Top'), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('h3', 'The Todo List'), (0, _motorcycleDom.h)('p', ' Next, I\'ll go over some features of the todo list application. This will show how Motorcycle.js and the monads work together.'), (0, _motorcycleDom.h)('p', 'Creation Of A Task: If you enter something like Susan, Fred, Pay the water bill, the editable task will appear in your browser and in the browsers of any members a group you might have created or joined. If you have loaded this page in another tab and changed to the same group in both, you will see the task in both tabs, barring some malfunction. The task has a delete button, an edit button, and a "Completed" checkbox. It shows that Susan authorized the task and Fred is responsible for making sure it gets done. Instead of entering an authority and responsible person, you can just enter two commas before the task description. Without two commas, a message appears requesting more information. This is how Motorcycle.js handles the creation of a new task: '), _codeJs2['default'].newTask, (0, _motorcycleDom.h)('p', ' mM$taskList is the todo application\'s worker function. Every time it executes its ret() method, the argument to ret() is added to its stream, causing the following code to run: '), _codeJs2['default'].mM$task, (0, _motorcycleDom.h)('p', 'mM$taskList caries a string representing the task list. mMtaskList.x.split(",") produces an array whose length is a multiple of six. Commas in the task description are replaced by "$*$*$" so split(",") will put the entire task description in a single element. Commas are re-inserted when the list arrives from the server for rendering. Although a task list is a nested virtual DOM object (Snabbdom vnode), it can be conveniently passed back and forth to the server as a string without resorting to JSON.stringify. Its type is Text on the server and String in the front end, becomming a virtual DOM node only once, when it arrives from the server prefixed by "DD#$42" causing "process(e.data) to execute. Here is process(): '), _codeJs2['default'].process, (0, _motorcycleDom.h)('span.tao', 'As you see, the string becomes a list of six-element objects, then those objects are used to create a Snabbdom vnode which is handed to mM$taskList.ret() leading to the update of O.mMtaskList. O.mMtaskList.x sits permanently in the main virtual DOM description. When its value gets refreshed, the DOM re-renders because taskStream$ is merged into the stream that is mapped into the virtural DOM description inside the object returned by "main". "main" and "sources" are the arguments provided to Cycle.run(). "sources" is the argument provided to "main". It is an array of drivers. The code is at '), (0, _motorcycleDom.h)('a', { props: { href: "https://github.com/dschalk/JS-monads-stable" } }, 'https://github.com/dschalk/JS-monads-stable'), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('p', ' Clicking "Completed": When the "Completed" button is clicked, the following code runs:         '), _codeJs2['default'].colorClick, (0, _motorcycleDom.h)('p', 'O.mMtaskList is split into an array. Every sixth element is the start of a new task. colorAction$ toggles the second, third, and fourth element in the task pinpointed by "index" * 6. getIndex finds the index of the first and only the element whose task description matches the one that is being marked "Completed". I say "only" because users are prevented from adding duplicate tasks. After the changes are made, the array of strings is reduced to one string and sent to the server when mM$taskList.ret() updates mM$taskList.stream triggering . '), (0, _motorcycleDom.h)('p', ' This is the code involved in editing a task description: '), _codeJs2['default'].edit, (0, _motorcycleDom.h)('p', 'Clicking "Edit" causes a text box to be displayed. Pressing <ENTER> causes it to diappear. edit2Action$ obtains the edited description of the task and the index of the task iten and provides them as arguments to process. Process exchanges $*$*$ for any commas in the edited version and assigns the amended task description to the variable "task". O.mMtaskList.x is copied and split into an array. "index * 6" is replaced with "task" and the list of strings is reduced back to a single string and sent to the server for distribution. This pattern, - (1) split the string representation of the todo list into an array of strings, (2) do something, (3) reduce the list of strings back to a single string - is repeated when the "Delete" button is clicked. If the last item gets deleted, the server is instructed to delete the persistent file bearing the name of the group whose member deleted the last task. '), (0, _motorcycleDom.h)('p#common', 'Cycle.js has been criticized for not keeping state in a single location, the way React.js does. Motorcycle.js didn\'t do it for me, or try to force me to do it, but it so happens that the current state of all active monads is in the object "O". I have written applications in Node.js and React.js, and I can say without a doubt that Motorcycle.js provides the best reactive interface for my purposes.  '), (0, _motorcycleDom.h)('hr'), (0, _motorcycleDom.h)('a', { props: { href: '#top' } }, 'Back To The Top'), (0, _motorcycleDom.h)('h2', 'Common Patterns'), (0, _motorcycleDom.h)('p', 'Anyone not yet familiar with functional programming can learn by studying the definition of the Monad bnd() method and considering the common patterns presented below. Often, we want to give a named monad the value of an anonymous monad returned by a monadic computation. Here are some ways to accomplish that: '), (0, _motorcycleDom.h)('p', 'For any monads m1 and m2 with values a and b respectively (in other words, m1.x == a and m2.x == b return true), m1.bnd(m2.ret) provides m1\'s value to m2.ret() causing O.m2 to have m1\'s value. So, after m1.bnd(m2.ret), m1.x == a, m2.x == b, O.m2.x == a all return true. The definition of Monad\s bnd() method shows that the function m2.ret() operates on m1.x. m1.bnd(m2.ret) is equivalent to m2.ret(m1.x). The stand-alone ret() function can be used to alter the current value of m2, rather than altering the value of O.m2. Here is one way of accomplishing this: m1.bnd(x => ret(x,"m2"). These relationships are verified in the following tests: '), (0, _motorcycleDom.h)('pre', '             ret(\'m1Val\',\'m1\')\n             m1.x === \'m1Val\'  // true\n             ret(\'m2Val\', \'m2\')\n             m2.x === \'m2Val\'  // true\n\n             m1.bnd(m2.ret)\n             O.m2.x === \'m1Val\' // true\n\n             m1.ret(\'newVal\')\n             O.m1.bnd(v => ret(v, \'m2\'))\n             m2.x === \'newVal\'  // true\n             O.m2.x === \'m1Val\' // true   still the same  '), (0, _motorcycleDom.h)('p', 'The bnd() method does not have to return anonymous monads. Consider, for example, the trivial function f = function(x, mon) {return mon.ret(x)}. The monad that calls its bnd() method with the argument f gives the monad designated as "mon" its value. So m1.bnd(f, m2) results in m1.x == a, m2.x == b, O.m2.x == a all returning true. '), (0, _motorcycleDom.h)('p'), (0, _motorcycleDom.h)('p', 'Frequently, some monad "m" will use its "bnd" method on some function which takes two arguments, say "f(x,v)". The first argument is the value of m (which is m.x). m.bnd(f,v) is equivalent to f(m.x, v). The following example demonstates the use of a two-argument function: '), _codeJs2['default'].fib, (0, _motorcycleDom.h)('span.tao', 'In both functions, the "x" argument is ignored. It must be included, however, in order to make the bnd() method return the desired result. If you enter some number "n" in the box below, '), (0, _motorcycleDom.h)('pre', '  mM19.bnd(fibCalc, e.target.value*1).bnd(mM19.ret)'), (0, _motorcycleDom.h)('span', ' will execute and O.mM19.x will be displayed under the input box. '), (0, _motorcycleDom.h)('input#code'), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('span', 'Fibonacci ' + O.mM21.x + ' is '), (0, _motorcycleDom.h)('span.code2', ' ' + O.mM19.x), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('hr'), (0, _motorcycleDom.h)('h3', 'Immutable Data And The State Object "O" '), (0, _motorcycleDom.h)('p', 'The server updates scores in response to messages prefixed by "CG#$42". Each such message carries an integer specifying the amount of the change. The ServerState list of Client tupples is pulled from the game state TMVar and replaced by a new tupple whose Score field differs from the previous one.'), (0, _motorcycleDom.h)('p', 'In front end code, mutating variables which are defined inside of functions often seems inocuous in applications written in an object oriented programming style. This is not the case in a Motorcycle.js application, where functions culminate in streams that merge into the stream that feeds the object returned by the main function, called "main" in this application. "sources" is an array of drivers. It is main\'s only argument, "sources" and "main" are Cycle.run()\'s arguments.'), (0, _motorcycleDom.h)('p', '"main" and "Cycle.run" are called only once. In the cyclic steady state that results, a reference should say what it means and mean what it says. If it suddenly refers to something other than what the other half of the cycle thinks it is, there will be a temporary disconnect. This will promptly staighten out, but having temporary disconnects shakes confidence in the consistency and reliability of the program. I don\'t have an example of mutating an object causing an unexpected result or crash. I would appreciate it if someone would give me such an example. '), (0, _motorcycleDom.h)('p', ' In this environment, avoiding mutations is recommended and I generally follow that recommendation. Mutations in this application are confined to the global state object "O" and MonadIter instances. In the examples above, the release() method moves the process forward to the next occurance of the MonadIter instance where the bnd() method provides a new function to the "p" attribute. The progressive morphing of "p" in MonadIter instances is desirable behavior, and I think that creating a clone each time it occurs would be a senseless waste of resources. Unless and until release() is called, the program is not affected by "p". If release() is called, the return value of p(...args) is returned, but "p" itself remains tucked away, never mixing with the flow of information through the program. The bnd() method is pure. Given the same argument, it will always do the same thing. It doesn\'t even return anything. It just updates the internal "p" attribute. This insulation of internal operations from the outer program is remeniscent of an important purpose of the Haskell IO monad. These are just hand-waving arguments for the harmlessness of letting the bnd() method mutate MonadIter instances, but I wanted to explain why I feel comfortable with letting the definition of MonadIter stand as it is.  '), (0, _motorcycleDom.h)('p', 'All monad updates caused by the monad ret() method are stored in the object "O". When a monad m executes m.ret(v) for some value "v", m remains unchanged and the O attribute O.m is created or, if it already exists, is replaced by the update; i.e., O.m.x == v becomes true. Older versions of m are subject to garbage collection unless there is a reference to them or to an object (arrays are objects) containing m.  This is illustrated in the score-keeping code below.  All score changes are captured by mM13.ret(). Therefore, O.mM13.x is always the current score. Replacing monad attributes in O is vaguely analogous to swapping out ServerState in the Haskell server\'s state TMVar. Older versions of ServerState can be preserved in the server just as prior versions of O.mM13 can be preserved in the front end. '), _codeJs2['default'].updateCalc, (0, _motorcycleDom.h)('p', 'The socket messages prompt the server to update its application state and to broadcast messages to all members of the group whose member sent the message to the server. Let\'s take another look at the way incoming messages are handled.'), _codeJs2['default'].messages, (0, _motorcycleDom.h)('p#monads', ' Messages prefixed by CB#$42 are broadcast in response to CG#$42-prefixed messages from a browser. CB#$42 prefixes release mMZ11, causing the scoreboard to update. CA#$42-prefixed messages to the server result in CA#$42-prefixed messages carrying the next dice roll to be broadcast to the sender\'s group.  CE#$42 prefixed messages cause the release of mMZ14 which causes O.mMgoals2.x to change from an empty string to an anouncement of the name of the winner. '), (0, _motorcycleDom.h)('hr'), (0, _motorcycleDom.h)('a', { props: { href: '#top' } }, 'Back To The Top'), (0, _motorcycleDom.h)('h3', 'Why Call Them Monads?'), (0, _motorcycleDom.h)('p', 'For any monad m and function f mapping values to monads, inside the O object the bnd() method behaves like the Haskell >>= operator(pronounce "bind"). For example, if we set O.m.x to 0 and call O.m.bnd(add, 3, m), O.m.x == 3 becomes true. And, like Haskell monads that obey the optional Haskell monad laws, sequences of calls to bnd() are associative; i,e, how computations are grouped does not matter. Here are three functions we will use to illustrate this:'), _codeJs2['default'].mdem1, (0, _motorcycleDom.h)('p', ' The relationships being demonstrated here are readily derivable from the definition of Monad. This is just an example to illustrate the general properties. The "===" operator isn\'t useful for illustrating monadic behavior because it returns false for clones. A meaningful variation of associative property can be demonstrated with the equals() function. We will use equals() to test the associative property along with the left and right identity properties of the ret() mdethod. These relationships are similar to the relationships in the Haskell laws.'), (0, _motorcycleDom.h)('p', ' Click runTest() to see updated O.mMa.x, O.mMb.x, and O.mMc.x, colored red, displayed below.  '), _codeJs2['default'].runTest, (0, _motorcycleDom.h)('button#runTest', 'runTest()'), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('span.tao', 'O.mMa.x: '), (0, _motorcycleDom.h)('span.red', O.mMa.x), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('span.tao', 'O.mMb.x: '), (0, _motorcycleDom.h)('span.red', O.mMb.x), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('span.tao', 'O.mMc.x: '), (0, _motorcycleDom.h)('span.red', O.mMc.x), (0, _motorcycleDom.h)('p'), (0, _motorcycleDom.h)('p'), (0, _motorcycleDom.h)('p', ' That\'s about it. That\'s why I call them "monads". But JS-monads can do much more than vaguely mirror Haskell monad functionality. There is no attempt to constrain JS-monads with type classes, or with restrictions on the types of functions the bnd() method can accept. m.bnd(x => x**3) returns a number, not a JS-monad. It would be the end of the line for a chained sequence of computations; but that might be exactly what you want: a monadic chain of computations that spits out a number when it is done. '), (0, _motorcycleDom.h)('h2', 'Conclusion'), (0, _motorcycleDom.h)('p', '  You might not need a ready-made framework or a bloated set of libraries for your project. It could be that improvisation, possibly with the help of JS-monads or your own variation on the JS-monads theme, is the key to creating a well-organized, understandable, and easily maintainable masterpiece. The libraries I imported, Motorcycle.js and Most-subject, were an immense help. I wholeheartedly endorse Motorcycle, with its Cycle, Snabbdom, and Most constitutents; along with Most-subject, which made MonadStream possible. '), (0, _motorcycleDom.h)('a', { props: { href: '#top' } }, 'Back To The Top'), (0, _motorcycleDom.h)('p'), (0, _motorcycleDom.h)('p'), (0, _motorcycleDom.h)('p'), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('br'), (0, _motorcycleDom.h)('hr'), (0, _motorcycleDom.h)('p'), (0, _motorcycleDom.h)('p'), (0, _motorcycleDom.h)('p'), (0, _motorcycleDom.h)('p'), (0, _motorcycleDom.h)('p')])]);
    }) };
}

function cleanup(x) {
  var target0 = document.getElementById('0');
  var target1 = document.getElementById('1');
  var target2 = document.getElementById('2');
  var target3 = document.getElementById('3');
  var targetAr = [target0, target1, target2, target3];
  [0, 1, 2, 3].map(function (i) {
    if (targetAr[i].innerHTML == 'undefined') {
      targetAr[i].style.display = 'none';
    } else {
      targetAr[i].style.display = 'inline';
    }
  });
  return ret(x);
};

function updateCalc() {
  O.mM3.bnd(function (x) {
    return mM7.ret(calc(x[0], O.mM8.x, x[1])).bnd(function (result) {
      if (result == 20) {
        score(O.mM13.x, 1);
      };return O.mM7;
    }).bnd(function (result) {
      if (result == 18) {
        score(O.mM13.x, 3);
      };return O.mMcurrentRoll;
    }).bnd(push, O.mM7.x, mM$1);
  });
  reset();
};

var score = function score(x, j) {
  if (x + j == 20) {
    mMgoals.ret(O.mMgoals.x == 2 ? 0 : O.mMgoals.x + 1);
    mM13.ret(0);
    socket.send('CG#$42,' + O.mMgroup.x + ',' + O.mMname.x + ',' + -x + ',' + O.mMgoals.x);
    if (O.mMgoals.x == 0) {
      socket.send('CE#$42,' + O.mMgroup.x + ',' + O.mMname.x + ',nothing ');
    }
    socket.send('CA#$42,' + O.mMgroup.x.trim() + ',' + O.mMname.x.trim() + ',6,6,12,20');
    return;
  }
  if ((x + j) % 5 == 0) {
    socket.send('CG#$42,' + O.mMgroup.x + ',' + O.mMname.x + ',' + (j + 5) + ',' + O.mMgoals.x);
    mM13.ret(x + j + 5);
    socket.send('CA#$42,' + O.mMgroup.x.trim() + ',' + O.mMname.x.trim() + ',6,6,12,20');
    return;
  }
  socket.send('CG#$42,' + O.mMgroup.x + ',' + O.mMname.x + ',' + j + ',' + O.mMgoals.x);
  mM13.ret(x + j);
  socket.send('CA#$42,' + O.mMgroup.x.trim() + ',' + O.mMname.x.trim() + ',6,6,12,20');
};

var reset = function reset() {
  mM3.ret([]).bnd(function () {
    return mM4.ret(0).bnd(mM8.ret).bnd(cleanup);
  });
};

var updateScoreboard = function updateScoreboard(v) {
  var ar2 = v.split("<br>");
  var keys = Object.keys(ar2);
  var ar = [];
  keys.map(function (k) {
    ar.push((0, _motorcycleDom.h)('div', ar2[k]));
  });
  return mMscoreboard.ret(ar);
};

var displayOff = function displayOff(x, a) {
  document.getElementById(a).style.display = 'none';
  return ret(x);
};

var displayInline = function displayInline(x, a) {
  if (document.getElementById(a)) document.getElementById(a).style.display = 'inline';
  return ret(x);
};

var newRoll = function newRoll(v) {
  socket.send('CA#$42,' + O.mMgroup.x.trim() + ',' + O.mMname.x.trim() + ',6,6,12,20');
  return ret(v);
};

var refresh = function refresh() {
  setTimeout(function () {
    document.location.reload(false);
  }, 4000);
};

var sources = {
  DOM: (0, _motorcycleDom.makeDOMDriver)('#main-container'),
  WS: websocketsDriver,
  UNIT: unitDriver
};

_motorcycleCore2['default'].run(main, sources);

},{"./code.js":184,"@motorcycle/core":3,"@motorcycle/dom":75,"most":183,"most-subject":117}]},{},[185]);
