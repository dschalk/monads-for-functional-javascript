/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { throw err; };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 62);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	module.exports = Stream;

	function Stream(source) {
		this.source = source;
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Stream;
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function Stream(source) {
	  this.source = source;
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	(function (global, factory) {
	  ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? factory(exports) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.mostPrelude = global.mostPrelude || {});
	})(undefined, function (exports) {
	  'use strict';

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
	    var j;
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

	  Object.defineProperty(exports, '__esModule', { value: true });
	});
	//# sourceMappingURL=prelude.js.map

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Disposable = __webpack_require__(156);
	var SettableDisposable = __webpack_require__(157);
	var isPromise = __webpack_require__(27).isPromise;
	var base = __webpack_require__(2);

	var map = base.map;
	var identity = base.id;

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
	  return isPromise(result) ? result.catch(function (e) {
	    sink.error(t, e);
	  }) : result;
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
	  } catch (e) {
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
	  if (!memoized.disposed) {
	    memoized.disposed = true;
	    memoized.value = disposeSafely(memoized.disposable);
	    memoized.disposable = void 0;
	  }

	  return memoized.value;
	}

	function memoized(disposable) {
	  return { disposed: false, disposable: disposable, value: void 0 };
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.tryDispose = tryDispose;
	exports.create = create;
	exports.empty = empty;
	exports.all = all;
	exports.promised = promised;
	exports.settable = settable;
	exports.once = once;

	var _Disposable = __webpack_require__(109);

	var _Disposable2 = _interopRequireDefault(_Disposable);

	var _SettableDisposable = __webpack_require__(110);

	var _SettableDisposable2 = _interopRequireDefault(_SettableDisposable);

	var _Promise = __webpack_require__(87);

	var _prelude = __webpack_require__(2);

	var base = _interopRequireWildcard(_prelude);

	function _interopRequireWildcard(obj) {
	  if (obj && obj.__esModule) {
	    return obj;
	  } else {
	    var newObj = {};if (obj != null) {
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	      }
	    }newObj.default = obj;return newObj;
	  }
	}

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	var map = base.map;
	var identity = base.id;

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
	  return (0, _Promise.isPromise)(result) ? result.catch(function (e) {
	    sink.error(t, e);
	  }) : result;
	}

	/**
	 * Create a new Disposable which will dispose its underlying resource
	 * at most once.
	 * @param {function} dispose function
	 * @param {*?} data any data to be passed to disposer function
	 * @return {Disposable}
	 */
	function create(dispose, data) {
	  return once(new _Disposable2.default(dispose, data));
	}

	/**
	 * Create a noop disposable. Can be used to satisfy a Disposable
	 * requirement when no actual resource needs to be disposed.
	 * @return {Disposable|exports|module.exports}
	 */
	function empty() {
	  return new _Disposable2.default(identity, void 0);
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
	  } catch (e) {
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
	  return new _SettableDisposable2.default();
	}

	/**
	 * Wrap an existing disposable (which may not already have been once()d)
	 * so that it will only dispose its underlying resource at most once.
	 * @param {{ dispose: function() }} disposable
	 * @return {Disposable} wrapped disposable
	 */
	function once(disposable) {
	  return new _Disposable2.default(disposeMemoized, memoized(disposable));
	}

	function disposeMemoized(memoized) {
	  if (!memoized.disposed) {
	    memoized.disposed = true;
	    memoized.value = disposeSafely(memoized.disposable);
	    memoized.disposable = void 0;
	  }

	  return memoized.value;
	}

	function memoized(disposable) {
	  return { disposed: false, disposable: disposable, value: void 0 };
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

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

	Pipe.prototype.event = function (t, x) {
	  return this.sink.event(t, x);
	};

	Pipe.prototype.end = function (t, x) {
	  return this.sink.end(t, x);
	};

	Pipe.prototype.error = function (t, e) {
	  return this.sink.error(t, e);
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Pipe;
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	/**
	 * A sink mixin that simply forwards event, end, and error to
	 * another sink.
	 * @param sink
	 * @constructor
	 */
	function Pipe(sink) {
	  this.sink = sink;
	}

	Pipe.prototype.event = function (t, x) {
	  return this.sink.event(t, x);
	};

	Pipe.prototype.end = function (t, x) {
	  return this.sink.end(t, x);
	};

	Pipe.prototype.error = function (t, e) {
	  return this.sink.error(t, e);
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = PropagateTask;

	var _fatalError = __webpack_require__(20);

	var _fatalError2 = _interopRequireDefault(_fatalError);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function PropagateTask(run, value, sink) {
	  this._run = run;
	  this.value = value;
	  this.sink = sink;
	  this.active = true;
	} /** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	PropagateTask.event = function (value, sink) {
	  return new PropagateTask(emit, value, sink);
	};

	PropagateTask.end = function (value, sink) {
	  return new PropagateTask(end, value, sink);
	};

	PropagateTask.error = function (value, sink) {
	  return new PropagateTask(error, value, sink);
	};

	PropagateTask.prototype.dispose = function () {
	  this.active = false;
	};

	PropagateTask.prototype.run = function (t) {
	  if (!this.active) {
	    return;
	  }
	  this._run(t, this.value, this.sink);
	};

	PropagateTask.prototype.error = function (t, e) {
	  if (!this.active) {
	    return (0, _fatalError2.default)(e);
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

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var fatal = __webpack_require__(28);

	module.exports = PropagateTask;

	function PropagateTask(run, value, sink) {
		this._run = run;
		this.value = value;
		this.sink = sink;
		this.active = true;
	}

	PropagateTask.event = function (value, sink) {
		return new PropagateTask(emit, value, sink);
	};

	PropagateTask.end = function (value, sink) {
		return new PropagateTask(end, value, sink);
	};

	PropagateTask.error = function (value, sink) {
		return new PropagateTask(error, value, sink);
	};

	PropagateTask.prototype.dispose = function () {
		this.active = false;
	};

	PropagateTask.prototype.run = function (t) {
		if (!this.active) {
			return;
		}
		this._run(t, this.value, this.sink);
	};

	PropagateTask.prototype.error = function (t, e) {
		if (!this.active) {
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

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.of = of;
	exports.empty = empty;
	exports.never = never;

	var _Stream = __webpack_require__(1);

	var _Stream2 = _interopRequireDefault(_Stream);

	var _dispose = __webpack_require__(4);

	var dispose = _interopRequireWildcard(_dispose);

	var _PropagateTask = __webpack_require__(7);

	var _PropagateTask2 = _interopRequireDefault(_PropagateTask);

	function _interopRequireWildcard(obj) {
	  if (obj && obj.__esModule) {
	    return obj;
	  } else {
	    var newObj = {};if (obj != null) {
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	      }
	    }newObj.default = obj;return newObj;
	  }
	}

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	/**
	 * Stream containing only x
	 * @param {*} x
	 * @returns {Stream}
	 */
	function of(x) {
	  return new _Stream2.default(new Just(x));
	} /** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function Just(x) {
	  this.value = x;
	}

	Just.prototype.run = function (sink, scheduler) {
	  return scheduler.asap(new _PropagateTask2.default(runJust, this.value, sink));
	};

	function runJust(t, x, sink) {
	  sink.event(t, x);
	  sink.end(t, void 0);
	}

	/**
	 * Stream containing no events and ends immediately
	 * @returns {Stream}
	 */
	function empty() {
	  return EMPTY;
	}

	function EmptySource() {}

	EmptySource.prototype.run = function (sink, scheduler) {
	  var task = _PropagateTask2.default.end(void 0, sink);
	  scheduler.asap(task);

	  return dispose.create(disposeEmpty, task);
	};

	function disposeEmpty(task) {
	  return task.dispose();
	}

	var EMPTY = new _Stream2.default(new EmptySource());

	/**
	 * Stream containing no events and never ends
	 * @returns {Stream}
	 */
	function never() {
	  return NEVER;
	}

	function NeverSource() {}

	NeverSource.prototype.run = function () {
	  return dispose.empty();
	};

	var NEVER = new _Stream2.default(new NeverSource());

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(0);
	var dispose = __webpack_require__(3);
	var PropagateTask = __webpack_require__(8);

	exports.of = streamOf;
	exports.empty = empty;
	exports.never = never;

	/**
	 * Stream containing only x
	 * @param {*} x
	 * @returns {Stream}
	 */
	function streamOf(x) {
	  return new Stream(new Just(x));
	}

	function Just(x) {
	  this.value = x;
	}

	Just.prototype.run = function (sink, scheduler) {
	  return scheduler.asap(new PropagateTask(runJust, this.value, sink));
	};

	function runJust(t, x, sink) {
	  sink.event(t, x);
	  sink.end(t, void 0);
	}

	/**
	 * Stream containing no events and ends immediately
	 * @returns {Stream}
	 */
	function empty() {
	  return EMPTY;
	}

	function EmptySource() {}

	EmptySource.prototype.run = function (sink, scheduler) {
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

	NeverSource.prototype.run = function () {
	  return dispose.empty();
	};

	var NEVER = new Stream(new NeverSource());

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(0);
	var base = __webpack_require__(2);
	var core = __webpack_require__(10);
	var from = __webpack_require__(169).from;
	var periodic = __webpack_require__(175).periodic;
	var symbolObservable = __webpack_require__(59);

	/**
	 * Core stream type
	 * @type {Stream}
	 */
	exports.Stream = Stream;

	// Add of and empty to constructor for fantasy-land compat
	exports.of = Stream.of = core.of;
	exports.just = core.of; // easier ES6 import alias
	exports.empty = Stream.empty = core.empty;
	exports.never = core.never;
	exports.from = from;
	exports.periodic = periodic;

	//-----------------------------------------------------------------------
	// Draft ES Observable proposal interop
	// https://github.com/zenparsing/es-observable

	var subscribe = __webpack_require__(161).subscribe;

	Stream.prototype.subscribe = function (subscriber) {
	  return subscribe(subscriber, this);
	};

	Stream.prototype[symbolObservable] = function () {
	  return this;
	};

	//-----------------------------------------------------------------------
	// Fluent adapter

	var thru = __webpack_require__(151).thru;

	/**
	 * Adapt a functional stream transform to fluent style.
	 * It applies f to the this stream object
	 * @param  {function(s: Stream): Stream} f function that
	 * receives the stream itself and must return a new stream
	 * @return {Stream}
	 */
	Stream.prototype.thru = function (f) {
	  return thru(f, this);
	};

	//-----------------------------------------------------------------------
	// Creating

	var create = __webpack_require__(168);

	/**
	 * @deprecated
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

	var events = __webpack_require__(171);

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

	var observe = __webpack_require__(146);

	exports.observe = observe.observe;
	exports.forEach = observe.observe;
	exports.drain = observe.drain;

	/**
	 * Process all the events in the stream
	 * @returns {Promise} promise that fulfills when the stream ends, or rejects
	 *  if the stream fails with an unhandled error.
	 */
	Stream.prototype.observe = Stream.prototype.forEach = function (f) {
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
	Stream.prototype.drain = function () {
	  return observe.drain(this);
	};

	//-------------------------------------------------------

	var loop = __webpack_require__(144).loop;

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
	Stream.prototype.loop = function (stepper, seed) {
	  return loop(stepper, seed, this);
	};

	//-------------------------------------------------------

	var accumulate = __webpack_require__(136);

	exports.scan = accumulate.scan;
	exports.reduce = accumulate.reduce;

	/**
	 * Create a stream containing successive reduce results of applying f to
	 * the previous reduce result and the current stream item.
	 * @param {function(result:*, x:*):*} f reducer function
	 * @param {*} initial initial value
	 * @returns {Stream} new stream containing successive reduce results
	 */
	Stream.prototype.scan = function (f, initial) {
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
	Stream.prototype.reduce = function (f, initial) {
	  return accumulate.reduce(f, initial, this);
	};

	//-----------------------------------------------------------------------
	// Building and extending

	var unfold = __webpack_require__(176);
	var iterate = __webpack_require__(174);
	var generate = __webpack_require__(173);
	var build = __webpack_require__(138);

	exports.unfold = unfold.unfold;
	exports.iterate = iterate.iterate;
	exports.generate = generate.generate;
	exports.cycle = build.cycle;
	exports.concat = build.concat;
	exports.startWith = build.cons;

	/**
	 * @deprecated
	 * Tie this stream into a circle, thus creating an infinite stream
	 * @returns {Stream} new infinite stream
	 */
	Stream.prototype.cycle = function () {
	  return build.cycle(this);
	};

	/**
	 * @param {Stream} tail
	 * @returns {Stream} new stream containing all items in this followed by
	 *  all items in tail
	 */
	Stream.prototype.concat = function (tail) {
	  return build.concat(this, tail);
	};

	/**
	 * @param {*} x value to prepend
	 * @returns {Stream} a new stream with x prepended
	 */
	Stream.prototype.startWith = function (x) {
	  return build.cons(x, this);
	};

	//-----------------------------------------------------------------------
	// Transforming

	var transform = __webpack_require__(16);
	var applicative = __webpack_require__(137);

	exports.map = transform.map;
	exports.constant = transform.constant;
	exports.tap = transform.tap;
	exports.ap = applicative.ap;

	/**
	 * Transform each value in the stream by applying f to each
	 * @param {function(*):*} f mapping function
	 * @returns {Stream} stream containing items transformed by f
	 */
	Stream.prototype.map = function (f) {
	  return transform.map(f, this);
	};

	/**
	 * Assume this stream contains functions, and apply each function to each item
	 * in the provided stream.  This generates, in effect, a cross product.
	 * @param {Stream} xs stream of items to which
	 * @returns {Stream} stream containing the cross product of items
	 */
	Stream.prototype.ap = function (xs) {
	  return applicative.ap(this, xs);
	};

	/**
	 * Replace each value in the stream with x
	 * @param {*} x
	 * @returns {Stream} stream containing items replaced with x
	 */
	Stream.prototype.constant = function (x) {
	  return transform.constant(x, this);
	};

	/**
	 * Perform a side effect for each item in the stream
	 * @param {function(x:*):*} f side effect to execute for each item. The
	 *  return value will be discarded.
	 * @returns {Stream} new stream containing the same items as this stream
	 */
	Stream.prototype.tap = function (f) {
	  return transform.tap(f, this);
	};

	//-----------------------------------------------------------------------
	// Transducer support

	var transduce = __webpack_require__(154);

	exports.transduce = transduce.transduce;

	/**
	 * Transform this stream by passing its events through a transducer.
	 * @param  {function} transducer transducer function
	 * @return {Stream} stream of events transformed by the transducer
	 */
	Stream.prototype.transduce = function (transducer) {
	  return transduce.transduce(transducer, this);
	};

	//-----------------------------------------------------------------------
	// FlatMapping

	var flatMap = __webpack_require__(53);

	exports.flatMap = exports.chain = flatMap.flatMap;
	exports.join = flatMap.join;

	/**
	 * Map each value in the stream to a new stream, and merge it into the
	 * returned outer stream. Event arrival times are preserved.
	 * @param {function(x:*):Stream} f chaining function, must return a Stream
	 * @returns {Stream} new stream containing all events from each stream returned by f
	 */
	Stream.prototype.flatMap = Stream.prototype.chain = function (f) {
	  return flatMap.flatMap(f, this);
	};

	/**
	 * Monadic join. Flatten a Stream<Stream<X>> to Stream<X> by merging inner
	 * streams to the outer. Event arrival times are preserved.
	 * @returns {Stream<X>} new stream containing all events of all inner streams
	 */
	Stream.prototype.join = function () {
	  return flatMap.join(this);
	};

	var continueWith = __webpack_require__(52).continueWith;

	exports.continueWith = continueWith;
	exports.flatMapEnd = continueWith;

	/**
	 * Map the end event to a new stream, and begin emitting its values.
	 * @param {function(x:*):Stream} f function that receives the end event value,
	 * and *must* return a new Stream to continue with.
	 * @returns {Stream} new stream that emits all events from the original stream,
	 * followed by all events from the stream returned by f.
	 */
	Stream.prototype.continueWith = Stream.prototype.flatMapEnd = function (f) {
	  return continueWith(f, this);
	};

	var concatMap = __webpack_require__(139).concatMap;

	exports.concatMap = concatMap;

	Stream.prototype.concatMap = function (f) {
	  return concatMap(f, this);
	};

	//-----------------------------------------------------------------------
	// Concurrent merging

	var mergeConcurrently = __webpack_require__(15);

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
	Stream.prototype.mergeConcurrently = function (concurrency) {
	  return mergeConcurrently.mergeConcurrently(concurrency, this);
	};

	//-----------------------------------------------------------------------
	// Merging

	var merge = __webpack_require__(145);

	exports.merge = merge.merge;
	exports.mergeArray = merge.mergeArray;

	/**
	 * Merge this stream and all the provided streams
	 * @returns {Stream} stream containing items from this stream and s in time
	 * order.  If two events are simultaneous they will be merged in
	 * arbitrary order.
	 */
	Stream.prototype.merge = function () /*...streams*/{
	  return merge.mergeArray(base.cons(this, arguments));
	};

	//-----------------------------------------------------------------------
	// Combining

	var combine = __webpack_require__(51);

	exports.combine = combine.combine;
	exports.combineArray = combine.combineArray;

	/**
	 * Combine latest events from all input streams
	 * @param {function(...events):*} f function to combine most recent events
	 * @returns {Stream} stream containing the result of applying f to the most recent
	 *  event of each input stream, whenever a new event arrives on any stream.
	 */
	Stream.prototype.combine = function (f /*, ...streams*/) {
	  return combine.combineArray(f, base.replace(this, 0, arguments));
	};

	//-----------------------------------------------------------------------
	// Sampling

	var sample = __webpack_require__(148);

	exports.sample = sample.sample;
	exports.sampleWith = sample.sampleWith;

	/**
	 * When an event arrives on sampler, emit the latest event value from stream.
	 * @param {Stream} sampler stream of events at whose arrival time
	 *  signal's latest value will be propagated
	 * @returns {Stream} sampled stream of values
	 */
	Stream.prototype.sampleWith = function (sampler) {
	  return sample.sampleWith(sampler, this);
	};

	/**
	 * When an event arrives on this stream, emit the result of calling f with the latest
	 * values of all streams being sampled
	 * @param {function(...values):*} f function to apply to each set of sampled values
	 * @returns {Stream} stream of sampled and transformed values
	 */
	Stream.prototype.sample = function (f /* ...streams */) {
	  return sample.sampleArray(f, this, base.tail(arguments));
	};

	//-----------------------------------------------------------------------
	// Zipping

	var zip = __webpack_require__(155);

	exports.zip = zip.zip;

	/**
	 * Pair-wise combine items with those in s. Given 2 streams:
	 * [1,2,3] zipWith f [4,5,6] -> [f(1,4),f(2,5),f(3,6)]
	 * Note: zip causes fast streams to buffer and wait for slow streams.
	 * @param {function(a:Stream, b:Stream, ...):*} f function to combine items
	 * @returns {Stream} new stream containing pairs
	 */
	Stream.prototype.zip = function (f /*, ...streams*/) {
	  return zip.zipArray(f, base.replace(this, 0, arguments));
	};

	//-----------------------------------------------------------------------
	// Switching

	var switchLatest = __webpack_require__(150).switch;

	exports.switch = switchLatest;
	exports.switchLatest = switchLatest;

	/**
	 * Given a stream of streams, return a new stream that adopts the behavior
	 * of the most recent inner stream.
	 * @returns {Stream} switching stream
	 */
	Stream.prototype.switch = Stream.prototype.switchLatest = function () {
	  return switchLatest(this);
	};

	//-----------------------------------------------------------------------
	// Filtering

	var filter = __webpack_require__(142);

	exports.filter = filter.filter;
	exports.skipRepeats = exports.distinct = filter.skipRepeats;
	exports.skipRepeatsWith = exports.distinctBy = filter.skipRepeatsWith;

	/**
	 * Retain only items matching a predicate
	 * stream:                           -12345678-
	 * filter(x => x % 2 === 0, stream): --2-4-6-8-
	 * @param {function(x:*):boolean} p filtering predicate called for each item
	 * @returns {Stream} stream containing only items for which predicate returns truthy
	 */
	Stream.prototype.filter = function (p) {
	  return filter.filter(p, this);
	};

	/**
	 * Skip repeated events, using === to compare items
	 * stream:           -abbcd-
	 * distinct(stream): -ab-cd-
	 * @returns {Stream} stream with no repeated events
	 */
	Stream.prototype.skipRepeats = function () {
	  return filter.skipRepeats(this);
	};

	/**
	 * Skip repeated events, using supplied equals function to compare items
	 * @param {function(a:*, b:*):boolean} equals function to compare items
	 * @returns {Stream} stream with no repeated events
	 */
	Stream.prototype.skipRepeatsWith = function (equals) {
	  return filter.skipRepeatsWith(equals, this);
	};

	//-----------------------------------------------------------------------
	// Slicing

	var slice = __webpack_require__(149);

	exports.take = slice.take;
	exports.skip = slice.skip;
	exports.slice = slice.slice;
	exports.takeWhile = slice.takeWhile;
	exports.skipWhile = slice.skipWhile;

	/**
	 * stream:          -abcd-
	 * take(2, stream): -ab|
	 * @param {Number} n take up to this many events
	 * @returns {Stream} stream containing at most the first n items from this stream
	 */
	Stream.prototype.take = function (n) {
	  return slice.take(n, this);
	};

	/**
	 * stream:          -abcd->
	 * skip(2, stream): ---cd->
	 * @param {Number} n skip this many events
	 * @returns {Stream} stream not containing the first n events
	 */
	Stream.prototype.skip = function (n) {
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
	Stream.prototype.slice = function (start, end) {
	  return slice.slice(start, end, this);
	};

	/**
	 * stream:                        -123451234->
	 * takeWhile(x => x < 5, stream): -1234|
	 * @param {function(x:*):boolean} p predicate
	 * @returns {Stream} stream containing items up to, but not including, the
	 * first item for which p returns falsy.
	 */
	Stream.prototype.takeWhile = function (p) {
	  return slice.takeWhile(p, this);
	};

	/**
	 * stream:                        -123451234->
	 * skipWhile(x => x < 5, stream): -----51234->
	 * @param {function(x:*):boolean} p predicate
	 * @returns {Stream} stream containing items following *and including* the
	 * first item for which p returns falsy.
	 */
	Stream.prototype.skipWhile = function (p) {
	  return slice.skipWhile(p, this);
	};

	//-----------------------------------------------------------------------
	// Time slicing

	var timeslice = __webpack_require__(152);

	exports.until = exports.takeUntil = timeslice.takeUntil;
	exports.since = exports.skipUntil = timeslice.skipUntil;
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
	Stream.prototype.until = Stream.prototype.takeUntil = function (signal) {
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
	Stream.prototype.since = Stream.prototype.skipUntil = function (signal) {
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
	Stream.prototype.during = function (timeWindow) {
	  return timeslice.during(timeWindow, this);
	};

	//-----------------------------------------------------------------------
	// Delaying

	var delay = __webpack_require__(140).delay;

	exports.delay = delay;

	/**
	 * @param {Number} delayTime milliseconds to delay each item
	 * @returns {Stream} new stream containing the same items, but delayed by ms
	 */
	Stream.prototype.delay = function (delayTime) {
	  return delay(delayTime, this);
	};

	//-----------------------------------------------------------------------
	// Getting event timestamp

	var timestamp = __webpack_require__(153).timestamp;

	exports.timestamp = timestamp;

	/**
	 * Expose event timestamps into the stream. Turns a Stream<X> into
	 * Stream<{time:t, value:X}>
	 * @returns {Stream<{time:number, value:*}>}
	 */
	Stream.prototype.timestamp = function () {
	  return timestamp(this);
	};

	//-----------------------------------------------------------------------
	// Rate limiting

	var limit = __webpack_require__(143);

	exports.throttle = limit.throttle;
	exports.debounce = limit.debounce;

	/**
	 * Limit the rate of events
	 * stream:              abcd----abcd----
	 * throttle(2, stream): a-c-----a-c-----
	 * @param {Number} period time to suppress events
	 * @returns {Stream} new stream that skips events for throttle period
	 */
	Stream.prototype.throttle = function (period) {
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
	Stream.prototype.debounce = function (period) {
	  return limit.debounce(period, this);
	};

	//-----------------------------------------------------------------------
	// Awaiting Promises

	var promises = __webpack_require__(147);

	exports.fromPromise = promises.fromPromise;
	exports.await = promises.awaitPromises;

	/**
	 * Await promises, turning a Stream<Promise<X>> into Stream<X>.  Preserves
	 * event order, but timeshifts events based on promise resolution time.
	 * @returns {Stream<X>} stream containing non-promise values
	 */
	Stream.prototype.await = function () {
	  return promises.awaitPromises(this);
	};

	//-----------------------------------------------------------------------
	// Error handling

	var errors = __webpack_require__(141);

	exports.recoverWith = errors.flatMapError;
	exports.flatMapError = errors.flatMapError;
	exports.throwError = errors.throwError;

	/**
	 * If this stream encounters an error, recover and continue with items from stream
	 * returned by f.
	 * stream:                  -a-b-c-X-
	 * f(X):                           d-e-f-g-
	 * flatMapError(f, stream): -a-b-c-d-e-f-g-
	 * @param {function(error:*):Stream} f function which returns a new stream
	 * @returns {Stream} new stream which will recover from an error by calling f
	 */
	Stream.prototype.recoverWith = Stream.prototype.flatMapError = function (f) {
	  return errors.flatMapError(f, this);
	};

	//-----------------------------------------------------------------------
	// Multicasting

	var multicast = __webpack_require__(12).default;

	exports.multicast = multicast;

	/**
	 * Transform the stream into multicast stream.  That means that many subscribers
	 * to the stream will not cause multiple invocations of the internal machinery.
	 * @returns {Stream} new stream which will multicast events to all observers.
	 */
	Stream.prototype.multicast = function () {
	  return multicast(this);
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	(function (global, factory) {
	  ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? factory(exports, __webpack_require__(2)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(2)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.mostMulticast = global.mostMulticast || {}, global.mostPrelude);
	})(undefined, function (exports, _most_prelude) {
	  'use strict';

	  var MulticastDisposable = function MulticastDisposable(source, sink) {
	    this.source = source;
	    this.sink = sink;
	    this.disposed = false;
	  };

	  MulticastDisposable.prototype.dispose = function dispose() {
	    if (this.disposed) {
	      return;
	    }
	    this.disposed = true;
	    var remaining = this.source.remove(this.sink);
	    return remaining === 0 && this.source._dispose();
	  };

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
	    dispose: function dispose$1() {}
	  };

	  var MulticastSource = function MulticastSource(source) {
	    this.source = source;
	    this.sinks = [];
	    this._disposable = emptyDisposable;
	  };

	  MulticastSource.prototype.run = function run(sink, scheduler) {
	    var n = this.add(sink);
	    if (n === 1) {
	      this._disposable = this.source.run(this, scheduler);
	    }
	    return new MulticastDisposable(this, sink);
	  };

	  MulticastSource.prototype._dispose = function _dispose() {
	    var disposable = this._disposable;
	    this._disposable = emptyDisposable;
	    return Promise.resolve(disposable).then(dispose);
	  };

	  MulticastSource.prototype.add = function add(sink) {
	    this.sinks = _most_prelude.append(sink, this.sinks);
	    return this.sinks.length;
	  };

	  MulticastSource.prototype.remove = function remove$1(sink) {
	    var i = _most_prelude.findIndex(sink, this.sinks);
	    // istanbul ignore next
	    if (i >= 0) {
	      this.sinks = _most_prelude.remove(i, this.sinks);
	    }

	    return this.sinks.length;
	  };

	  MulticastSource.prototype.event = function event(time, value) {
	    var s = this.sinks;
	    if (s.length === 1) {
	      return s[0].event(time, value);
	    }
	    for (var i = 0; i < s.length; ++i) {
	      tryEvent(time, value, s[i]);
	    }
	  };

	  MulticastSource.prototype.end = function end(time, value) {
	    var s = this.sinks;
	    for (var i = 0; i < s.length; ++i) {
	      tryEnd(time, value, s[i]);
	    }
	  };

	  MulticastSource.prototype.error = function error(time, err) {
	    var s = this.sinks;
	    for (var i = 0; i < s.length; ++i) {
	      s[i].error(time, err);
	    }
	  };

	  function multicast(stream) {
	    var source = stream.source;
	    return source instanceof MulticastSource ? stream : new stream.constructor(new MulticastSource(source));
	  }

	  exports['default'] = multicast;
	  exports.MulticastSource = MulticastSource;

	  Object.defineProperty(exports, '__esModule', { value: true });
	});
	//# sourceMappingURL=multicast.js.map

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	  array: Array.isArray,
	  primitive: function primitive(s) {
	    return typeof s === 'string' || typeof s === 'number';
	  }
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.map = map;
	exports.constant = constant;
	exports.tap = tap;

	var _Stream = __webpack_require__(1);

	var _Stream2 = _interopRequireDefault(_Stream);

	var _Map = __webpack_require__(21);

	var _Map2 = _interopRequireDefault(_Map);

	var _Pipe = __webpack_require__(6);

	var _Pipe2 = _interopRequireDefault(_Pipe);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	/**
	 * Transform each value in the stream by applying f to each
	 * @param {function(*):*} f mapping function
	 * @param {Stream} stream stream to map
	 * @returns {Stream} stream containing items transformed by f
	 */
	function map(f, stream) {
	  return new _Stream2.default(_Map2.default.create(f, stream.source));
	}

	/**
	* Replace each value in the stream with x
	* @param {*} x
	* @param {Stream} stream
	* @returns {Stream} stream containing items replaced with x
	*/
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function constant(x, stream) {
	  return map(function () {
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
	  return new _Stream2.default(new Tap(f, stream.source));
	}

	function Tap(f, source) {
	  this.source = source;
	  this.f = f;
	}

	Tap.prototype.run = function (sink, scheduler) {
	  return this.source.run(new TapSink(this.f, sink), scheduler);
	};

	function TapSink(f, sink) {
	  this.sink = sink;
	  this.f = f;
	}

	TapSink.prototype.end = _Pipe2.default.prototype.end;
	TapSink.prototype.error = _Pipe2.default.prototype.error;

	TapSink.prototype.event = function (t, x) {
	  var f = this.f;
	  f(x);
	  this.sink.event(t, x);
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(0);
	var dispose = __webpack_require__(3);
	var LinkedList = __webpack_require__(134);
	var identity = __webpack_require__(2).id;

	exports.mergeConcurrently = mergeConcurrently;
	exports.mergeMapConcurrently = mergeMapConcurrently;

	function mergeConcurrently(concurrency, stream) {
		return mergeMapConcurrently(identity, concurrency, stream);
	}

	function mergeMapConcurrently(f, concurrency, stream) {
		return new Stream(new MergeConcurrently(f, concurrency, stream.source));
	}

	function MergeConcurrently(f, concurrency, source) {
		this.f = f;
		this.concurrency = concurrency;
		this.source = source;
	}

	MergeConcurrently.prototype.run = function (sink, scheduler) {
		return new Outer(this.f, this.concurrency, this.source, sink, scheduler);
	};

	function Outer(f, concurrency, source, sink, scheduler) {
		this.f = f;
		this.concurrency = concurrency;
		this.sink = sink;
		this.scheduler = scheduler;
		this.pending = [];
		this.current = new LinkedList();
		this.disposable = dispose.once(source.run(this, scheduler));
		this.active = true;
	}

	Outer.prototype.event = function (t, x) {
		this._addInner(t, x);
	};

	Outer.prototype._addInner = function (t, x) {
		if (this.current.length < this.concurrency) {
			this._startInner(t, x);
		} else {
			this.pending.push(x);
		}
	};

	Outer.prototype._startInner = function (t, x) {
		try {
			this._initInner(t, x);
		} catch (e) {
			this.error(t, e);
		}
	};

	Outer.prototype._initInner = function (t, x) {
		var innerSink = new Inner(t, this, this.sink);
		innerSink.disposable = mapAndRun(this.f, x, innerSink, this.scheduler);
		this.current.add(innerSink);
	};

	function mapAndRun(f, x, sink, scheduler) {
		return f(x).source.run(sink, scheduler);
	}

	Outer.prototype.end = function (t, x) {
		this.active = false;
		dispose.tryDispose(t, this.disposable, this.sink);
		this._checkEnd(t, x);
	};

	Outer.prototype.error = function (t, e) {
		this.active = false;
		this.sink.error(t, e);
	};

	Outer.prototype.dispose = function () {
		this.active = false;
		this.pending.length = 0;
		return Promise.all([this.disposable.dispose(), this.current.dispose()]);
	};

	Outer.prototype._endInner = function (t, x, inner) {
		this.current.remove(inner);
		dispose.tryDispose(t, inner, this);

		if (this.pending.length === 0) {
			this._checkEnd(t, x);
		} else {
			this._startInner(t, this.pending.shift());
		}
	};

	Outer.prototype._checkEnd = function (t, x) {
		if (!this.active && this.current.isEmpty()) {
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

	Inner.prototype.event = function (t, x) {
		this.sink.event(Math.max(t, this.time), x);
	};

	Inner.prototype.end = function (t, x) {
		this.outer._endInner(Math.max(t, this.time), x, this);
	};

	Inner.prototype.error = function (t, e) {
		this.outer.error(Math.max(t, this.time), e);
	};

	Inner.prototype.dispose = function () {
		return this.disposable.dispose();
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(0);
	var Map = __webpack_require__(29);
	var Pipe = __webpack_require__(5);

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
	  return map(function () {
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
	  return new Stream(new Tap(f, stream.source));
	}

	function Tap(f, source) {
	  this.source = source;
	  this.f = f;
	}

	Tap.prototype.run = function (sink, scheduler) {
	  return this.source.run(new TapSink(this.f, sink), scheduler);
	};

	function TapSink(f, sink) {
	  this.sink = sink;
	  this.f = f;
	}

	TapSink.prototype.end = Pipe.prototype.end;
	TapSink.prototype.error = Pipe.prototype.error;

	TapSink.prototype.event = function (t, x) {
	  var f = this.f;
	  f(x);
	  this.sink.event(t, x);
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	exports.tryEvent = tryEvent;
	exports.tryEnd = tryEnd;

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

/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (sel, data, children, text, elm) {
	  var key = data === undefined ? undefined : data.key;
	  return { sel: sel, data: data, children: children,
	    text: text, elm: elm, key: key };
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.mergeConcurrently = mergeConcurrently;
	exports.mergeMapConcurrently = mergeMapConcurrently;

	var _Stream = __webpack_require__(1);

	var _Stream2 = _interopRequireDefault(_Stream);

	var _dispose = __webpack_require__(4);

	var dispose = _interopRequireWildcard(_dispose);

	var _LinkedList = __webpack_require__(86);

	var _LinkedList2 = _interopRequireDefault(_LinkedList);

	var _prelude = __webpack_require__(2);

	function _interopRequireWildcard(obj) {
	  if (obj && obj.__esModule) {
	    return obj;
	  } else {
	    var newObj = {};if (obj != null) {
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	      }
	    }newObj.default = obj;return newObj;
	  }
	}

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function mergeConcurrently(concurrency, stream) {
	  return mergeMapConcurrently(_prelude.id, concurrency, stream);
	}

	function mergeMapConcurrently(f, concurrency, stream) {
	  return new _Stream2.default(new MergeConcurrently(f, concurrency, stream.source));
	}

	function MergeConcurrently(f, concurrency, source) {
	  this.f = f;
	  this.concurrency = concurrency;
	  this.source = source;
	}

	MergeConcurrently.prototype.run = function (sink, scheduler) {
	  return new Outer(this.f, this.concurrency, this.source, sink, scheduler);
	};

	function Outer(f, concurrency, source, sink, scheduler) {
	  this.f = f;
	  this.concurrency = concurrency;
	  this.sink = sink;
	  this.scheduler = scheduler;
	  this.pending = [];
	  this.current = new _LinkedList2.default();
	  this.disposable = dispose.once(source.run(this, scheduler));
	  this.active = true;
	}

	Outer.prototype.event = function (t, x) {
	  this._addInner(t, x);
	};

	Outer.prototype._addInner = function (t, x) {
	  if (this.current.length < this.concurrency) {
	    this._startInner(t, x);
	  } else {
	    this.pending.push(x);
	  }
	};

	Outer.prototype._startInner = function (t, x) {
	  try {
	    this._initInner(t, x);
	  } catch (e) {
	    this.error(t, e);
	  }
	};

	Outer.prototype._initInner = function (t, x) {
	  var innerSink = new Inner(t, this, this.sink);
	  innerSink.disposable = mapAndRun(this.f, x, innerSink, this.scheduler);
	  this.current.add(innerSink);
	};

	function mapAndRun(f, x, sink, scheduler) {
	  return f(x).source.run(sink, scheduler);
	}

	Outer.prototype.end = function (t, x) {
	  this.active = false;
	  dispose.tryDispose(t, this.disposable, this.sink);
	  this._checkEnd(t, x);
	};

	Outer.prototype.error = function (t, e) {
	  this.active = false;
	  this.sink.error(t, e);
	};

	Outer.prototype.dispose = function () {
	  this.active = false;
	  this.pending.length = 0;
	  return Promise.all([this.disposable.dispose(), this.current.dispose()]);
	};

	Outer.prototype._endInner = function (t, x, inner) {
	  this.current.remove(inner);
	  dispose.tryDispose(t, inner, this);

	  if (this.pending.length === 0) {
	    this._checkEnd(t, x);
	  } else {
	    this._startInner(t, this.pending.shift());
	  }
	};

	Outer.prototype._checkEnd = function (t, x) {
	  if (!this.active && this.current.isEmpty()) {
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

	Inner.prototype.event = function (t, x) {
	  this.sink.event(Math.max(t, this.time), x);
	};

	Inner.prototype.end = function (t, x) {
	  this.outer._endInner(Math.max(t, this.time), x, this);
	};

	Inner.prototype.error = function (t, e) {
	  this.outer.error(Math.max(t, this.time), e);
	};

	Inner.prototype.dispose = function () {
	  return this.disposable.dispose();
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = fatalError;
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function fatalError(e) {
	  setTimeout(function () {
	    throw e;
	  }, 0);
	}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Map;

	var _Pipe = __webpack_require__(6);

	var _Pipe2 = _interopRequireDefault(_Pipe);

	var _Filter = __webpack_require__(47);

	var _Filter2 = _interopRequireDefault(_Filter);

	var _FilterMap = __webpack_require__(111);

	var _FilterMap2 = _interopRequireDefault(_FilterMap);

	var _prelude = __webpack_require__(2);

	var base = _interopRequireWildcard(_prelude);

	function _interopRequireWildcard(obj) {
	  if (obj && obj.__esModule) {
	    return obj;
	  } else {
	    var newObj = {};if (obj != null) {
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	      }
	    }newObj.default = obj;return newObj;
	  }
	}

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

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
	  if (source instanceof Map) {
	    return new Map(base.compose(f, source.f), source.source);
	  }

	  if (source instanceof _Filter2.default) {
	    return new _FilterMap2.default(source.p, f, source.source);
	  }

	  return new Map(f, source);
	};

	Map.prototype.run = function (sink, scheduler) {
	  // eslint-disable-line no-extend-native
	  return this.source.run(new MapSink(this.f, sink), scheduler);
	};

	function MapSink(f, sink) {
	  this.f = f;
	  this.sink = sink;
	}

	MapSink.prototype.end = _Pipe2.default.prototype.end;
	MapSink.prototype.error = _Pipe2.default.prototype.error;

	MapSink.prototype.event = function (t, x) {
	  var f = this.f;
	  this.sink.event(t, f(x));
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = invoke;
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function invoke(f, args) {
	  /*eslint complexity: [2,7]*/
	  switch (args.length) {
	    case 0:
	      return f();
	    case 1:
	      return f(args[0]);
	    case 2:
	      return f(args[0], args[1]);
	    case 3:
	      return f(args[0], args[1], args[2]);
	    case 4:
	      return f(args[0], args[1], args[2], args[3]);
	    case 5:
	      return f(args[0], args[1], args[2], args[3], args[4]);
	    default:
	      return f.apply(void 0, args);
	  }
	}

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Scheduler = __webpack_require__(118);

	var _Scheduler2 = _interopRequireDefault(_Scheduler);

	var _ClockTimer = __webpack_require__(116);

	var _ClockTimer2 = _interopRequireDefault(_ClockTimer);

	var _Timeline = __webpack_require__(119);

	var _Timeline2 = _interopRequireDefault(_Timeline);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	var defaultScheduler = new _Scheduler2.default(new _ClockTimer2.default(), new _Timeline2.default()); /** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	exports.default = defaultScheduler;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = IndexSink;

	var _Pipe = __webpack_require__(6);

	var _Pipe2 = _interopRequireDefault(_Pipe);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function IndexSink(i, sink) {
	  this.sink = sink;
	  this.index = i;
	  this.active = true;
	  this.value = void 0;
	} /** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	IndexSink.prototype.event = function (t, x) {
	  if (!this.active) {
	    return;
	  }
	  this.value = x;
	  this.sink.event(t, this);
	};

	IndexSink.prototype.end = function (t, x) {
	  if (!this.active) {
	    return;
	  }
	  this.active = false;
	  this.sink.end(t, { index: this.index, value: x });
	};

	IndexSink.prototype.error = _Pipe2.default.prototype.error;

/***/ },
/* 25 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.tryEvent = tryEvent;
	exports.tryEnd = tryEnd;
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

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

/***/ },
/* 26 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.defer = defer;
	exports.runTask = runTask;
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function defer(task) {
	  return Promise.resolve(task).then(runTask);
	}

	function runTask(task) {
	  try {
	    return task.run();
	  } catch (e) {
	    return task.error(e);
	  }
	}

/***/ },
/* 27 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	exports.isPromise = isPromise;

	function isPromise(p) {
		return p !== null && (typeof p === 'undefined' ? 'undefined' : _typeof(p)) === 'object' && typeof p.then === 'function';
	}

/***/ },
/* 28 */
/***/ function(module, exports) {

	"use strict";

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	module.exports = fatalError;

	function fatalError(e) {
		setTimeout(function () {
			throw e;
		}, 0);
	}

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Pipe = __webpack_require__(5);
	var Filter = __webpack_require__(55);
	var FilterMap = __webpack_require__(158);
	var base = __webpack_require__(2);

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
		if (source instanceof Map) {
			return new Map(base.compose(f, source.f), source.source);
		}

		if (source instanceof Filter) {
			return new FilterMap(source.p, f, source.source);
		}

		return new Map(f, source);
	};

	Map.prototype.run = function (sink, scheduler) {
		return this.source.run(new MapSink(this.f, sink), scheduler);
	};

	function MapSink(f, sink) {
		this.f = f;
		this.sink = sink;
	}

	MapSink.prototype.end = Pipe.prototype.end;
	MapSink.prototype.error = Pipe.prototype.error;

	MapSink.prototype.event = function (t, x) {
		var f = this.f;
		this.sink.event(t, f(x));
	};

/***/ },
/* 30 */
/***/ function(module, exports) {

	"use strict";

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	module.exports = invoke;

	function invoke(f, args) {
		/*eslint complexity: [2,7]*/
		switch (args.length) {
			case 0:
				return f();
			case 1:
				return f(args[0]);
			case 2:
				return f(args[0], args[1]);
			case 3:
				return f(args[0], args[1], args[2]);
			case 4:
				return f(args[0], args[1], args[2], args[3]);
			case 5:
				return f(args[0], args[1], args[2], args[3], args[4]);
			default:
				return f.apply(void 0, args);
		}
	}

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Scheduler = __webpack_require__(162);
	var setTimeoutTimer = __webpack_require__(164);
	var nodeTimer = __webpack_require__(163);

	var isNode = (typeof process === 'undefined' ? 'undefined' : _typeof(process)) === 'object' && typeof process.nextTick === 'function';

	module.exports = new Scheduler(isNode ? nodeTimer : setTimeoutTimer);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(34)))

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Sink = __webpack_require__(5);

	module.exports = IndexSink;

	function IndexSink(i, sink) {
		this.sink = sink;
		this.index = i;
		this.active = true;
		this.value = void 0;
	}

	IndexSink.prototype.event = function (t, x) {
		if (!this.active) {
			return;
		}
		this.value = x;
		this.sink.event(t, this);
	};

	IndexSink.prototype.end = function (t, x) {
		if (!this.active) {
			return;
		}
		this.active = false;
		this.sink.end(t, { index: this.index, value: x });
	};

	IndexSink.prototype.error = Sink.prototype.error;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.mockDOMSource = exports.makeDOMDriver = exports.video = exports.ul = exports.u = exports.tr = exports.title = exports.thead = exports.th = exports.tfoot = exports.textarea = exports.td = exports.tbody = exports.table = exports.sup = exports.sub = exports.style = exports.strong = exports.span = exports.source = exports.small = exports.select = exports.section = exports.script = exports.samp = exports.s = exports.ruby = exports.rt = exports.rp = exports.q = exports.pre = exports.param = exports.p = exports.option = exports.optgroup = exports.ol = exports.object = exports.noscript = exports.nav = exports.meta = exports.menu = exports.mark = exports.map = exports.main = exports.link = exports.li = exports.legend = exports.label = exports.keygen = exports.kbd = exports.ins = exports.input = exports.img = exports.iframe = exports.i = exports.html = exports.hr = exports.hgroup = exports.header = exports.head = exports.h6 = exports.h5 = exports.h4 = exports.h3 = exports.h2 = exports.h1 = exports.form = exports.footer = exports.figure = exports.figcaption = exports.fieldset = exports.embed = exports.em = exports.dt = exports.dl = exports.div = exports.dir = exports.dfn = exports.del = exports.dd = exports.colgroup = exports.col = exports.code = exports.cite = exports.caption = exports.canvas = exports.button = exports.br = exports.body = exports.blockquote = exports.bdo = exports.bdi = exports.base = exports.b = exports.audio = exports.aside = exports.article = exports.area = exports.address = exports.abbr = exports.a = exports.h = exports.thunk = exports.modules = undefined;

	var _makeDOMDriver = __webpack_require__(66);

	Object.defineProperty(exports, 'makeDOMDriver', {
	  enumerable: true,
	  get: function get() {
	    return _makeDOMDriver.makeDOMDriver;
	  }
	});

	var _mockDOMSource = __webpack_require__(67);

	Object.defineProperty(exports, 'mockDOMSource', {
	  enumerable: true,
	  get: function get() {
	    return _mockDOMSource.mockDOMSource;
	  }
	});

	var _modules = __webpack_require__(38);

	var modules = _interopRequireWildcard(_modules);

	var _thunk = __webpack_require__(79);

	var _thunk2 = _interopRequireDefault(_thunk);

	var _hyperscript = __webpack_require__(65);

	var _hyperscript2 = _interopRequireDefault(_hyperscript);

	var _hyperscriptHelpers = __webpack_require__(81);

	var _hyperscriptHelpers2 = _interopRequireDefault(_hyperscriptHelpers);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function _interopRequireWildcard(obj) {
	  if (obj && obj.__esModule) {
	    return obj;
	  } else {
	    var newObj = {};if (obj != null) {
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	      }
	    }newObj.default = obj;return newObj;
	  }
	}

	exports.modules = modules;
	exports.thunk = _thunk2.default;
	exports.h = _hyperscript2.default;

	var _hh = (0, _hyperscriptHelpers2.default)(_hyperscript2.default);

	var a = _hh.a;
	var abbr = _hh.abbr;
	var address = _hh.address;
	var area = _hh.area;
	var article = _hh.article;
	var aside = _hh.aside;
	var audio = _hh.audio;
	var b = _hh.b;
	var base = _hh.base;
	var bdi = _hh.bdi;
	var bdo = _hh.bdo;
	var blockquote = _hh.blockquote;
	var body = _hh.body;
	var br = _hh.br;
	var button = _hh.button;
	var canvas = _hh.canvas;
	var caption = _hh.caption;
	var cite = _hh.cite;
	var code = _hh.code;
	var col = _hh.col;
	var colgroup = _hh.colgroup;
	var dd = _hh.dd;
	var del = _hh.del;
	var dfn = _hh.dfn;
	var dir = _hh.dir;
	var div = _hh.div;
	var dl = _hh.dl;
	var dt = _hh.dt;
	var em = _hh.em;
	var embed = _hh.embed;
	var fieldset = _hh.fieldset;
	var figcaption = _hh.figcaption;
	var figure = _hh.figure;
	var footer = _hh.footer;
	var form = _hh.form;
	var h1 = _hh.h1;
	var h2 = _hh.h2;
	var h3 = _hh.h3;
	var h4 = _hh.h4;
	var h5 = _hh.h5;
	var h6 = _hh.h6;
	var head = _hh.head;
	var header = _hh.header;
	var hgroup = _hh.hgroup;
	var hr = _hh.hr;
	var html = _hh.html;
	var i = _hh.i;
	var iframe = _hh.iframe;
	var img = _hh.img;
	var input = _hh.input;
	var ins = _hh.ins;
	var kbd = _hh.kbd;
	var keygen = _hh.keygen;
	var label = _hh.label;
	var legend = _hh.legend;
	var li = _hh.li;
	var link = _hh.link;
	var main = _hh.main;
	var map = _hh.map;
	var mark = _hh.mark;
	var menu = _hh.menu;
	var meta = _hh.meta;
	var nav = _hh.nav;
	var noscript = _hh.noscript;
	var object = _hh.object;
	var ol = _hh.ol;
	var optgroup = _hh.optgroup;
	var option = _hh.option;
	var p = _hh.p;
	var param = _hh.param;
	var pre = _hh.pre;
	var q = _hh.q;
	var rp = _hh.rp;
	var rt = _hh.rt;
	var ruby = _hh.ruby;
	var s = _hh.s;
	var samp = _hh.samp;
	var script = _hh.script;
	var section = _hh.section;
	var select = _hh.select;
	var small = _hh.small;
	var source = _hh.source;
	var span = _hh.span;
	var strong = _hh.strong;
	var style = _hh.style;
	var sub = _hh.sub;
	var sup = _hh.sup;
	var table = _hh.table;
	var tbody = _hh.tbody;
	var td = _hh.td;
	var textarea = _hh.textarea;
	var tfoot = _hh.tfoot;
	var th = _hh.th;
	var thead = _hh.thead;
	var title = _hh.title;
	var tr = _hh.tr;
	var u = _hh.u;
	var ul = _hh.ul;
	var video = _hh.video;
	exports.a = a;
	exports.abbr = abbr;
	exports.address = address;
	exports.area = area;
	exports.article = article;
	exports.aside = aside;
	exports.audio = audio;
	exports.b = b;
	exports.base = base;
	exports.bdi = bdi;
	exports.bdo = bdo;
	exports.blockquote = blockquote;
	exports.body = body;
	exports.br = br;
	exports.button = button;
	exports.canvas = canvas;
	exports.caption = caption;
	exports.cite = cite;
	exports.code = code;
	exports.col = col;
	exports.colgroup = colgroup;
	exports.dd = dd;
	exports.del = del;
	exports.dfn = dfn;
	exports.dir = dir;
	exports.div = div;
	exports.dl = dl;
	exports.dt = dt;
	exports.em = em;
	exports.embed = embed;
	exports.fieldset = fieldset;
	exports.figcaption = figcaption;
	exports.figure = figure;
	exports.footer = footer;
	exports.form = form;
	exports.h1 = h1;
	exports.h2 = h2;
	exports.h3 = h3;
	exports.h4 = h4;
	exports.h5 = h5;
	exports.h6 = h6;
	exports.head = head;
	exports.header = header;
	exports.hgroup = hgroup;
	exports.hr = hr;
	exports.html = html;
	exports.i = i;
	exports.iframe = iframe;
	exports.img = img;
	exports.input = input;
	exports.ins = ins;
	exports.kbd = kbd;
	exports.keygen = keygen;
	exports.label = label;
	exports.legend = legend;
	exports.li = li;
	exports.link = link;
	exports.main = main;
	exports.map = map;
	exports.mark = mark;
	exports.menu = menu;
	exports.meta = meta;
	exports.nav = nav;
	exports.noscript = noscript;
	exports.object = object;
	exports.ol = ol;
	exports.optgroup = optgroup;
	exports.option = option;
	exports.p = p;
	exports.param = param;
	exports.pre = pre;
	exports.q = q;
	exports.rp = rp;
	exports.rt = rt;
	exports.ruby = ruby;
	exports.s = s;
	exports.samp = samp;
	exports.script = script;
	exports.section = section;
	exports.select = select;
	exports.small = small;
	exports.source = source;
	exports.span = span;
	exports.strong = strong;
	exports.style = style;
	exports.sub = sub;
	exports.sup = sup;
	exports.table = table;
	exports.tbody = tbody;
	exports.td = td;
	exports.textarea = textarea;
	exports.tfoot = tfoot;
	exports.th = th;
	exports.thead = thead;
	exports.title = title;
	exports.tr = tr;
	exports.u = u;
	exports.ul = ul;
	exports.video = video;

/***/ },
/* 34 */
/***/ function(module, exports) {

	'use strict';

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout() {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	})();
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch (e) {
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch (e) {
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e) {
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e) {
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
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
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while (len) {
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
	    runClearTimeout(timeout);
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
	        runTimeout(drainQueue);
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

	process.cwd = function () {
	    return '/';
	};
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function () {
	    return 0;
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.makeEventsSelector = undefined;

	var _domEvent = __webpack_require__(63);

	var _makeIsStrictlyInRootScope = __webpack_require__(37);

	var matchesSelector = void 0;
	try {
	  matchesSelector = __webpack_require__(82);
	} catch (e) {
	  matchesSelector = function matchesSelector() {};
	}

	var eventTypesThatDontBubble = ['load', 'unload', 'focus', 'blur', 'mouseenter', 'mouseleave', 'submit', 'change', 'reset', 'timeupdate', 'playing', 'waiting', 'seeking', 'seeked', 'ended', 'loadedmetadata', 'loadeddata', 'canplay', 'canplaythrough', 'durationchange', 'play', 'pause', 'ratechange', 'volumechange', 'suspend', 'emptied', 'stalled'];

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
	  var isStrictlyInRootScope = (0, _makeIsStrictlyInRootScope.makeIsStrictlyInRootScope)(namespace);
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

	function makeEventsSelector(rootElement$, namespace) {
	  return function eventsSelector(type) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? defaults : arguments[1];

	    if (typeof type !== 'string') {
	      throw new Error('DOM driver\'s events() expects argument to be a ' + 'string representing the event type to listen for.');
	    }
	    var useCapture = false;
	    if (typeof options.useCapture === 'boolean') {
	      useCapture = options.useCapture;
	    }
	    if (eventTypesThatDontBubble.indexOf(type) !== -1) {
	      useCapture = true;
	    }

	    return rootElement$.map(function (rootElement) {
	      return { rootElement: rootElement, namespace: namespace };
	    }).skipRepeatsWith(function (prev, curr) {
	      return prev.namespace.join('') === curr.namespace.join('');
	    }).map(function (_ref) {
	      var rootElement = _ref.rootElement;

	      if (!namespace || namespace.length === 0) {
	        return (0, _domEvent.domEvent)(type, rootElement, useCapture);
	      }
	      var simulateBubbling = makeSimulateBubbling(namespace, rootElement);
	      return (0, _domEvent.domEvent)(type, rootElement, useCapture).filter(simulateBubbling);
	    }).switch().multicast();
	  };
	}

	exports.makeEventsSelector = makeEventsSelector;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isolateSource = exports.isolateSink = undefined;

	var _utils = __webpack_require__(39);

	var isolateSource = function isolateSource(source_, scope) {
	  return source_.select('.' + _utils.SCOPE_PREFIX + scope);
	};

	var isolateSink = function isolateSink(sink, scope) {
	  return sink.map(function (vTree) {
	    if (vTree.sel.indexOf('' + _utils.SCOPE_PREFIX + scope) === -1) {
	      if (vTree.data.ns) {
	        // svg elements
	        var _vTree$data$attrs = vTree.data.attrs;
	        var attrs = _vTree$data$attrs === undefined ? {} : _vTree$data$attrs;

	        attrs.class = (attrs.class || '') + ' ' + _utils.SCOPE_PREFIX + scope;
	      } else {
	        vTree.sel = vTree.sel + '.' + _utils.SCOPE_PREFIX + scope;
	      }
	    }
	    return vTree;
	  });
	};

	exports.isolateSink = isolateSink;
	exports.isolateSource = isolateSource;

/***/ },
/* 37 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function makeIsStrictlyInRootScope(namespace) {
	  var classIsForeign = function classIsForeign(c) {
	    var matched = c.match(/cycle-scope-(\S+)/);
	    return matched && namespace.indexOf("." + c) === -1;
	  };
	  var classIsDomestic = function classIsDomestic(c) {
	    var matched = c.match(/cycle-scope-(\S+)/);
	    return matched && namespace.indexOf("." + c) !== -1;
	  };
	  return function isStrictlyInRootScope(leaf) {
	    var some = Array.prototype.some;
	    var split = String.prototype.split;
	    for (var el = leaf; el; el = el.parentElement) {
	      var classList = el.classList || split.call(el.className, " ");
	      if (some.call(classList, classIsDomestic)) {
	        return true;
	      }
	      if (some.call(classList, classIsForeign)) {
	        return false;
	      }
	    }
	    return true;
	  };
	}

	exports.makeIsStrictlyInRootScope = makeIsStrictlyInRootScope;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.EventsModule = exports.HeroModule = exports.AttrsModule = exports.PropsModule = exports.ClassModule = exports.StyleModule = undefined;

	var _class = __webpack_require__(73);

	var _class2 = _interopRequireDefault(_class);

	var _props = __webpack_require__(76);

	var _props2 = _interopRequireDefault(_props);

	var _attributes = __webpack_require__(72);

	var _attributes2 = _interopRequireDefault(_attributes);

	var _eventlisteners = __webpack_require__(74);

	var _eventlisteners2 = _interopRequireDefault(_eventlisteners);

	var _style = __webpack_require__(77);

	var _style2 = _interopRequireDefault(_style);

	var _hero = __webpack_require__(75);

	var _hero2 = _interopRequireDefault(_hero);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	exports.default = [_style2.default, _class2.default, _props2.default, _attributes2.default];
	exports.StyleModule = _style2.default;
	exports.ClassModule = _class2.default;
	exports.PropsModule = _props2.default;
	exports.AttrsModule = _attributes2.default;
	exports.HeroModule = _hero2.default;
	exports.EventsModule = _eventlisteners2.default;

/***/ },
/* 39 */
/***/ function(module, exports) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var SCOPE_PREFIX = "cycle-scope-";

	var isElement = function isElement(obj) {
	  return (typeof HTMLElement === "undefined" ? "undefined" : _typeof(HTMLElement)) === "object" ? obj instanceof HTMLElement || obj instanceof DocumentFragment : obj && (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" && obj !== null && (obj.nodeType === 1 || obj.nodeType === 11) && typeof obj.nodeName === "string";
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

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = selectorParser;

	var _browserSplit = __webpack_require__(80);

	var _browserSplit2 = _interopRequireDefault(_browserSplit);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

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

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var VNode = __webpack_require__(18);
	var is = __webpack_require__(13);

	function addNS(data, children) {
	  data.ns = 'http://www.w3.org/2000/svg';
	  if (children !== undefined) {
	    for (var i = 0; i < children.length; ++i) {
	      addNS(children[i].data, children[i].children);
	    }
	  }
	}

	module.exports = function h(sel, b, c) {
	  var data = {},
	      children,
	      text,
	      i;
	  if (arguments.length === 3) {
	    data = b;
	    if (is.array(c)) {
	      children = c;
	    } else if (is.primitive(c)) {
	      text = c;
	    }
	  } else if (arguments.length === 2) {
	    if (is.array(b)) {
	      children = b;
	    } else if (is.primitive(b)) {
	      text = b;
	    } else {
	      data = b;
	    }
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

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var SubjectDisposable_1 = __webpack_require__(84);
	var util_1 = __webpack_require__(43);
	var defaultScheduler = __webpack_require__(23);
	var BasicSubjectSource = function () {
	    function BasicSubjectSource() {
	        this.scheduler = defaultScheduler;
	        this.sinks = [];
	        this.active = false;
	    }
	    BasicSubjectSource.prototype.run = function (sink, scheduler) {
	        var n = this.add(sink);
	        if (n === 1) {
	            this.scheduler = scheduler;
	            this.active = true;
	        }
	        return new SubjectDisposable_1.SubjectDisposable(this, sink);
	    };
	    BasicSubjectSource.prototype.add = function (sink) {
	        this.sinks = util_1.append(sink, this.sinks);
	        return this.sinks.length;
	    };
	    BasicSubjectSource.prototype.remove = function (sink) {
	        var i = util_1.findIndex(sink, this.sinks);
	        if (i >= 0) {
	            this.sinks = util_1.remove(i, this.sinks);
	        }
	        return this.sinks.length;
	    };
	    BasicSubjectSource.prototype._dispose = function () {
	        this.active = false;
	    };
	    BasicSubjectSource.prototype.next = function (value) {
	        if (!this.active || this.scheduler === void 0) return;
	        this._next(this.scheduler.now(), value);
	    };
	    BasicSubjectSource.prototype.error = function (err) {
	        if (!this.active || this.scheduler === void 0) return;
	        this._dispose();
	        this._error(this.scheduler.now(), err);
	    };
	    BasicSubjectSource.prototype.complete = function (value) {
	        if (!this.active || this.scheduler === void 0) return;
	        this._dispose();
	        this._complete(this.scheduler.now(), value);
	    };
	    BasicSubjectSource.prototype._next = function (time, value) {
	        var s = this.sinks;
	        if (s.length === 1) {
	            return s[0].event(time, value);
	        }
	        for (var i = 0; i < s.length; ++i) {
	            util_1.tryEvent(time, value, s[i]);
	        }
	    };
	    BasicSubjectSource.prototype._complete = function (time, value) {
	        var s = this.sinks;
	        for (var i = 0; i < s.length; ++i) {
	            util_1.tryEnd(time, value, s[i]);
	        }
	    };
	    BasicSubjectSource.prototype._error = function (time, err) {
	        var s = this.sinks;
	        for (var i = 0; i < s.length; ++i) {
	            s[i].error(time, err);
	        }
	    };
	    return BasicSubjectSource;
	}();
	exports.BasicSubjectSource = BasicSubjectSource;
	//# sourceMappingURL=SubjectSource.js.map

/***/ },
/* 43 */
/***/ function(module, exports) {

	"use strict";

	function tryEvent(t, x, sink) {
	    try {
	        sink.event(t, x);
	    } catch (e) {
	        sink.error(t, e);
	    }
	}
	exports.tryEvent = tryEvent;
	function tryEnd(t, x, sink) {
	    try {
	        sink.end(t, x);
	    } catch (e) {
	        sink.error(t, e);
	    }
	}
	exports.tryEnd = tryEnd;
	function pushEvents(buffer, sink) {
	    for (var i = 0; i < buffer.length; ++i) {
	        var _a = buffer[i],
	            time = _a.time,
	            value = _a.value;
	        sink.event(time, value);
	    }
	}
	exports.pushEvents = pushEvents;
	function dropAndAppend(event, buffer, bufferSize) {
	    if (buffer.length === bufferSize) {
	        return append(event, drop(1, buffer));
	    }
	    return append(event, buffer);
	}
	exports.dropAndAppend = dropAndAppend;
	function append(x, a) {
	    var l = a.length;
	    var b = new Array(l + 1);
	    for (var i = 0; i < l; ++i) {
	        b[i] = a[i];
	    }
	    b[l] = x;
	    return b;
	}
	exports.append = append;
	function drop(n, a) {
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
	function remove(i, a) {
	    if (i < 0) {
	        throw new TypeError('i must be >= 0');
	    }
	    var l = a.length;
	    if (l === 0 || i >= l) {
	        return a;
	    }
	    if (l === 1) {
	        return [];
	    }
	    return unsafeRemove(i, a, l - 1);
	}
	exports.remove = remove;
	// unsafeRemove :: Int -> [a] -> Int -> [a]
	// Internal helper to remove element at index
	function unsafeRemove(i, a, l) {
	    var b = new Array(l);
	    var j;
	    for (j = 0; j < i; ++j) {
	        b[j] = a[j];
	    }
	    for (j = i; j < l; ++j) {
	        b[j] = a[j + 1];
	    }
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
	exports.findIndex = findIndex;
	//# sourceMappingURL=util.js.map

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.combine = combine;
	exports.combineArray = combineArray;

	var _Stream = __webpack_require__(1);

	var _Stream2 = _interopRequireDefault(_Stream);

	var _transform = __webpack_require__(14);

	var transform = _interopRequireWildcard(_transform);

	var _core = __webpack_require__(9);

	var core = _interopRequireWildcard(_core);

	var _Pipe = __webpack_require__(6);

	var _Pipe2 = _interopRequireDefault(_Pipe);

	var _IndexSink = __webpack_require__(24);

	var _IndexSink2 = _interopRequireDefault(_IndexSink);

	var _dispose = __webpack_require__(4);

	var dispose = _interopRequireWildcard(_dispose);

	var _prelude = __webpack_require__(2);

	var base = _interopRequireWildcard(_prelude);

	var _invoke = __webpack_require__(22);

	var _invoke2 = _interopRequireDefault(_invoke);

	function _interopRequireWildcard(obj) {
	  if (obj && obj.__esModule) {
	    return obj;
	  } else {
	    var newObj = {};if (obj != null) {
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	      }
	    }newObj.default = obj;return newObj;
	  }
	}

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var map = base.map;
	var tail = base.tail;

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
	  return l === 0 ? core.empty() : l === 1 ? transform.map(f, streams[0]) : new _Stream2.default(combineSources(f, streams));
	}

	function combineSources(f, streams) {
	  return new Combine(f, map(getSource, streams));
	}

	function getSource(stream) {
	  return stream.source;
	}

	function Combine(f, sources) {
	  this.f = f;
	  this.sources = sources;
	}

	Combine.prototype.run = function (sink, scheduler) {
	  var this$1 = this;

	  var l = this.sources.length;
	  var disposables = new Array(l);
	  var sinks = new Array(l);

	  var mergeSink = new CombineSink(disposables, sinks, sink, this.f);

	  for (var indexSink, i = 0; i < l; ++i) {
	    indexSink = sinks[i] = new _IndexSink2.default(i, mergeSink);
	    disposables[i] = this$1.sources[i].run(indexSink, scheduler);
	  }

	  return dispose.all(disposables);
	};

	function CombineSink(disposables, sinks, sink, f) {
	  var this$1 = this;

	  this.sink = sink;
	  this.disposables = disposables;
	  this.sinks = sinks;
	  this.f = f;

	  var l = sinks.length;
	  this.awaiting = l;
	  this.values = new Array(l);
	  this.hasValue = new Array(l);
	  for (var i = 0; i < l; ++i) {
	    this$1.hasValue[i] = false;
	  }

	  this.activeCount = sinks.length;
	}

	CombineSink.prototype.error = _Pipe2.default.prototype.error;

	CombineSink.prototype.event = function (t, indexedValue) {
	  var i = indexedValue.index;
	  var awaiting = this._updateReady(i);

	  this.values[i] = indexedValue.value;
	  if (awaiting === 0) {
	    this.sink.event(t, (0, _invoke2.default)(this.f, this.values));
	  }
	};

	CombineSink.prototype._updateReady = function (index) {
	  if (this.awaiting > 0) {
	    if (!this.hasValue[index]) {
	      this.hasValue[index] = true;
	      this.awaiting -= 1;
	    }
	  }
	  return this.awaiting;
	};

	CombineSink.prototype.end = function (t, indexedValue) {
	  dispose.tryDispose(t, this.disposables[indexedValue.index], this.sink);
	  if (--this.activeCount === 0) {
	    this.sink.end(t, indexedValue.value);
	  }
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.continueWith = continueWith;

	var _Stream = __webpack_require__(1);

	var _Stream2 = _interopRequireDefault(_Stream);

	var _Pipe = __webpack_require__(6);

	var _Pipe2 = _interopRequireDefault(_Pipe);

	var _dispose = __webpack_require__(4);

	var dispose = _interopRequireWildcard(_dispose);

	function _interopRequireWildcard(obj) {
	  if (obj && obj.__esModule) {
	    return obj;
	  } else {
	    var newObj = {};if (obj != null) {
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	      }
	    }newObj.default = obj;return newObj;
	  }
	}

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function continueWith(f, stream) {
	  return new _Stream2.default(new ContinueWith(f, stream.source));
	} /** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function ContinueWith(f, source) {
	  this.f = f;
	  this.source = source;
	}

	ContinueWith.prototype.run = function (sink, scheduler) {
	  return new ContinueWithSink(this.f, this.source, sink, scheduler);
	};

	function ContinueWithSink(f, source, sink, scheduler) {
	  this.f = f;
	  this.sink = sink;
	  this.scheduler = scheduler;
	  this.active = true;
	  this.disposable = dispose.once(source.run(this, scheduler));
	}

	ContinueWithSink.prototype.error = _Pipe2.default.prototype.error;

	ContinueWithSink.prototype.event = function (t, x) {
	  if (!this.active) {
	    return;
	  }
	  this.sink.event(t, x);
	};

	ContinueWithSink.prototype.end = function (t, x) {
	  if (!this.active) {
	    return;
	  }

	  dispose.tryDispose(t, this.disposable, this.sink);
	  this._startNext(t, x, this.sink);
	};

	ContinueWithSink.prototype._startNext = function (t, x, sink) {
	  try {
	    this.disposable = this._continue(this.f, x, sink);
	  } catch (e) {
	    sink.error(t, e);
	  }
	};

	ContinueWithSink.prototype._continue = function (f, x, sink) {
	  return f(x).source.run(sink, this.scheduler);
	};

	ContinueWithSink.prototype.dispose = function () {
	  this.active = false;
	  return this.disposable.dispose();
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.flatMap = flatMap;
	exports.join = join;

	var _mergeConcurrently = __webpack_require__(19);

	/**
	 * Map each value in the stream to a new stream, and merge it into the
	 * returned outer stream. Event arrival times are preserved.
	 * @param {function(x:*):Stream} f chaining function, must return a Stream
	 * @param {Stream} stream
	 * @returns {Stream} new stream containing all events from each stream returned by f
	 */
	function flatMap(f, stream) {
	  return (0, _mergeConcurrently.mergeMapConcurrently)(f, Infinity, stream);
	}

	/**
	 * Monadic join. Flatten a Stream<Stream<X>> to Stream<X> by merging inner
	 * streams to the outer. Event arrival times are preserved.
	 * @param {Stream<Stream<X>>} stream stream of streams
	 * @returns {Stream<X>} new stream containing all events of all inner streams
	 */
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function join(stream) {
	  return (0, _mergeConcurrently.mergeConcurrently)(Infinity, stream);
	}

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Filter;

	var _Pipe = __webpack_require__(6);

	var _Pipe2 = _interopRequireDefault(_Pipe);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

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
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	Filter.create = function createFilter(p, source) {
	  if (source instanceof Filter) {
	    return new Filter(and(source.p, p), source.source);
	  }

	  return new Filter(p, source);
	};

	Filter.prototype.run = function (sink, scheduler) {
	  return this.source.run(new FilterSink(this.p, sink), scheduler);
	};

	function FilterSink(p, sink) {
	  this.p = p;
	  this.sink = sink;
	}

	FilterSink.prototype.end = _Pipe2.default.prototype.end;
	FilterSink.prototype.error = _Pipe2.default.prototype.error;

	FilterSink.prototype.event = function (t, x) {
	  var p = this.p;
	  p(x) && this.sink.event(t, x);
	};

	function and(p, q) {
	  return function (x) {
	    return p(x) && q(x);
	  };
	}

/***/ },
/* 48 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isIterable = isIterable;
	exports.getIterator = getIterator;
	exports.makeIterable = makeIterable;
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	/*global Set, Symbol*/
	var iteratorSymbol;
	// Firefox ships a partial implementation using the name @@iterator.
	// https://bugzilla.mozilla.org/show_bug.cgi?id=907077#c14
	if (typeof Set === 'function' && typeof new Set()['@@iterator'] === 'function') {
	  iteratorSymbol = '@@iterator';
	} else {
	  iteratorSymbol = typeof Symbol === 'function' && Symbol.iterator || '_es6shim_iterator_';
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

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.withDefaultScheduler = withDefaultScheduler;
	exports.withScheduler = withScheduler;

	var _dispose = __webpack_require__(4);

	var dispose = _interopRequireWildcard(_dispose);

	var _defaultScheduler = __webpack_require__(23);

	var _defaultScheduler2 = _interopRequireDefault(_defaultScheduler);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function _interopRequireWildcard(obj) {
	  if (obj && obj.__esModule) {
	    return obj;
	  } else {
	    var newObj = {};if (obj != null) {
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	      }
	    }newObj.default = obj;return newObj;
	  }
	}

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function withDefaultScheduler(source) {
	  return withScheduler(source, _defaultScheduler2.default);
	}

	function withScheduler(source, scheduler) {
	  return new Promise(function (resolve, reject) {
	    runSource(source, scheduler, resolve, reject);
	  });
	}

	function runSource(source, scheduler, resolve, reject) {
	  var disposable = dispose.settable();
	  var observer = new Drain(resolve, reject, disposable);

	  disposable.setDisposable(source.run(observer, scheduler));
	}

	function Drain(end, error, disposable) {
	  this._end = end;
	  this._error = error;
	  this._disposable = disposable;
	  this.active = true;
	}

	Drain.prototype.event = function (t, x) {};

	Drain.prototype.end = function (t, x) {
	  if (!this.active) {
	    return;
	  }
	  this.active = false;
	  disposeThen(this._end, this._error, this._disposable, x);
	};

	Drain.prototype.error = function (t, e) {
	  this.active = false;
	  disposeThen(this._error, this._error, this._disposable, e);
	};

	function disposeThen(end, error, disposable, x) {
	  Promise.resolve(disposable.dispose()).then(function () {
	    end(x);
	  }, error);
	}

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(132);

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(0);
	var transform = __webpack_require__(16);
	var core = __webpack_require__(10);
	var Pipe = __webpack_require__(5);
	var IndexSink = __webpack_require__(32);
	var dispose = __webpack_require__(3);
	var base = __webpack_require__(2);
	var invoke = __webpack_require__(30);

	var map = base.map;
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
		return l === 0 ? core.empty() : l === 1 ? transform.map(f, streams[0]) : new Stream(combineSources(f, streams));
	}

	function combineSources(f, streams) {
		return new Combine(f, map(getSource, streams));
	}

	function getSource(stream) {
		return stream.source;
	}

	function Combine(f, sources) {
		this.f = f;
		this.sources = sources;
	}

	Combine.prototype.run = function (sink, scheduler) {
		var l = this.sources.length;
		var disposables = new Array(l);
		var sinks = new Array(l);

		var mergeSink = new CombineSink(disposables, sinks, sink, this.f);

		for (var indexSink, i = 0; i < l; ++i) {
			indexSink = sinks[i] = new IndexSink(i, mergeSink);
			disposables[i] = this.sources[i].run(indexSink, scheduler);
		}

		return dispose.all(disposables);
	};

	function CombineSink(disposables, sinks, sink, f) {
		this.sink = sink;
		this.disposables = disposables;
		this.sinks = sinks;
		this.f = f;

		var l = sinks.length;
		this.awaiting = l;
		this.values = new Array(l);
		this.hasValue = new Array(l);
		for (var i = 0; i < l; ++i) {
			this.hasValue[i] = false;
		}

		this.activeCount = sinks.length;
	}

	CombineSink.prototype.error = Pipe.prototype.error;

	CombineSink.prototype.event = function (t, indexedValue) {
		var i = indexedValue.index;
		var awaiting = this._updateReady(i);

		this.values[i] = indexedValue.value;
		if (awaiting === 0) {
			this.sink.event(t, invoke(this.f, this.values));
		}
	};

	CombineSink.prototype._updateReady = function (index) {
		if (this.awaiting > 0) {
			if (!this.hasValue[index]) {
				this.hasValue[index] = true;
				this.awaiting -= 1;
			}
		}
		return this.awaiting;
	};

	CombineSink.prototype.end = function (t, indexedValue) {
		dispose.tryDispose(t, this.disposables[indexedValue.index], this.sink);
		if (--this.activeCount === 0) {
			this.sink.end(t, indexedValue.value);
		}
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(0);
	var Sink = __webpack_require__(5);
	var dispose = __webpack_require__(3);
	var isPromise = __webpack_require__(27).isPromise;

	exports.continueWith = continueWith;

	function continueWith(f, stream) {
		return new Stream(new ContinueWith(f, stream.source));
	}

	function ContinueWith(f, source) {
		this.f = f;
		this.source = source;
	}

	ContinueWith.prototype.run = function (sink, scheduler) {
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

	ContinueWithSink.prototype.event = function (t, x) {
		if (!this.active) {
			return;
		}
		this.sink.event(t, x);
	};

	ContinueWithSink.prototype.end = function (t, x) {
		if (!this.active) {
			return;
		}

		dispose.tryDispose(t, this.disposable, this.sink);
		this._startNext(t, x, this.sink);
	};

	ContinueWithSink.prototype._startNext = function (t, x, sink) {
		try {
			this.disposable = this._continue(this.f, x, sink);
		} catch (e) {
			sink.error(t, e);
		}
	};

	ContinueWithSink.prototype._continue = function (f, x, sink) {
		return f(x).source.run(sink, this.scheduler);
	};

	ContinueWithSink.prototype.dispose = function () {
		this.active = false;
		return this.disposable.dispose();
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var mergeConcurrently = __webpack_require__(15).mergeConcurrently;
	var mergeMapConcurrently = __webpack_require__(15).mergeMapConcurrently;

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
	  return mergeMapConcurrently(f, Infinity, stream);
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

/***/ },
/* 54 */
/***/ function(module, exports) {

	"use strict";

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
		} catch (e) {
			return task.error(e);
		}
	}

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Pipe = __webpack_require__(5);

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

	Filter.prototype.run = function (sink, scheduler) {
		return this.source.run(new FilterSink(this.p, sink), scheduler);
	};

	function FilterSink(p, sink) {
		this.p = p;
		this.sink = sink;
	}

	FilterSink.prototype.end = Pipe.prototype.end;
	FilterSink.prototype.error = Pipe.prototype.error;

	FilterSink.prototype.event = function (t, x) {
		var p = this.p;
		p(x) && this.sink.event(t, x);
	};

	function and(p, q) {
		return function (x) {
			return p(x) && q(x);
		};
	}

/***/ },
/* 56 */
/***/ function(module, exports) {

	'use strict';

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
		iteratorSymbol = typeof Symbol === 'function' && Symbol.iterator || '_es6shim_iterator_';
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

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var dispose = __webpack_require__(3);
	var defaultScheduler = __webpack_require__(31);

	exports.withDefaultScheduler = withDefaultScheduler;
	exports.withScheduler = withScheduler;

	function withDefaultScheduler(source) {
		return withScheduler(source, defaultScheduler);
	}

	function withScheduler(source, scheduler) {
		return new Promise(function (resolve, reject) {
			runSource(source, scheduler, resolve, reject);
		});
	}

	function runSource(source, scheduler, resolve, reject) {
		var disposable = dispose.settable();
		var observer = new Drain(resolve, reject, disposable);

		disposable.setDisposable(source.run(observer, scheduler));
	}

	function Drain(end, error, disposable) {
		this._end = end;
		this._error = error;
		this._disposable = disposable;
		this.active = true;
	}

	Drain.prototype.event = function (t, x) {};

	Drain.prototype.end = function (t, x) {
		if (!this.active) {
			return;
		}
		this.active = false;
		disposeThen(this._end, this._error, this._disposable, x);
	};

	Drain.prototype.error = function (t, e) {
		this.active = false;
		disposeThen(this._error, this._error, this._disposable, e);
	};

	function disposeThen(end, error, disposable, x) {
		Promise.resolve(disposable.dispose()).then(function () {
			end(x);
		}, error);
	}

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var defer = __webpack_require__(54);

	module.exports = DeferredSink;

	function DeferredSink(sink) {
		this.sink = sink;
		this.events = [];
		this.active = true;
	}

	DeferredSink.prototype.event = function (t, x) {
		if (!this.active) {
			return;
		}

		if (this.events.length === 0) {
			defer(new PropagateAllTask(this.sink, this.events));
		}

		this.events.push({ time: t, value: x });
	};

	DeferredSink.prototype.error = function (t, e) {
		this._end(new ErrorTask(t, e, this.sink));
	};

	DeferredSink.prototype.end = function (t, x) {
		this._end(new EndTask(t, x, this.sink));
	};

	DeferredSink.prototype._end = function (task) {
		this.active = false;
		this.events = void 0;
		defer(task);
	};

	function PropagateAllTask(sink, events) {
		this.sink = sink;
		this.events = events;
	}

	PropagateAllTask.prototype.run = function () {
		var events = this.events;
		var sink = this.sink;
		var event;

		for (var i = 0, l = events.length; i < l; ++i) {
			event = events[i];
			sink.event(event.time, event.value);
		}

		events.length = 0;
	};

	PropagateAllTask.prototype.error = function (e) {
		this.sink.error(0, e);
	};

	function EndTask(t, x, sink) {
		this.time = t;
		this.value = x;
		this.sink = sink;
	}

	EndTask.prototype.run = function () {
		this.sink.end(this.time, this.value);
	};

	EndTask.prototype.error = function (e) {
		this.sink.error(this.time, e);
	};

	function ErrorTask(t, e, sink) {
		this.time = t;
		this.value = e;
		this.sink = sink;
	}

	ErrorTask.prototype.run = function () {
		this.sink.error(this.time, this.value);
	};

	ErrorTask.prototype.error = function (e) {
		throw e;
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/* global window */
	'use strict';

	module.exports = __webpack_require__(177)(global || window || undefined);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _dom = __webpack_require__(33);

	/*
	import {subject} from 'most-subject'
	var sub = subject
	var observer = sub.observer;
	var stream = sub.stream;
	*/

	var Monad = function Monad() {
	  var z = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 42;
	  var g = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'generic';

	  var _this = this;
	  this.x = z;
	  this.id = g;
	  this.bnd = function (func) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    var m = func.apply(undefined, [this.x].concat(args));
	    if (m instanceof Monad) {
	      return window[this.id] = new Monad(m.x, this.id);
	    } else return m;
	  };
	  this.ret = function (a) {
	    return window[_this.id] = new Monad(a, _this.id);
	  };
	};

	var monad = (0, _dom.h)('pre.turk6', '    var Monad = function Monad(z = 42, g = \'generic\') {\n      this.x = z;\n      this.id = g;\n      this.bnd = function (func, ...args) {\n        var m = func(this.x, ...args)\n        var mon;\n        if (m instanceof Monad) {\n          mon = testPrefix(args,this.id); \n          return window[mon] = new Monad(m.x, mon);\n        }\n        else return m;\n      };\n      this.ret = function (a) {\n        return window[_this.id] = new Monad(a,_this.id);\n      };\n    };  \n\n    function testPrefix (x,y) {\n      var t = y;\n      var s;\n      if (Array.isArray(x)) {\n        x.some(v => {\n          if (typeof v === \'string\' && v.charAt() === \'M\') {\n             t = v.slice(1, v.length);\n          }\n        })\n      }\n      return t;\n    }  ');

	var monadIt = (0, _dom.h)('pre', { style: { color: '#AFEEEE' } }, '  const MonadItter = () => {\n    this.p = function () {};\n    this.release = (...args) => this.p(...args);\n    this.bnd = func => this.p = func;\n  }; ');

	var ret = (0, _dom.h)('pre', { style: { color: '#AFEEEE' } }, '    function ret(v, id = \'default\') {\n      return window[id] = (new Monad(v, id));\n    } ');

	var driver = (0, _dom.h)('pre', '  var websocketsDriver = function () {\n      return create((add) => {\n        socket.onmessage = msg => add(msg)\n      })\n  };\n');

	var messages = (0, _dom.h)('pre', '  const messages$ = (sources.WS).map( e => {\n  mMtem.ret(e.data.split(\',\')).bnd( v => {\n  console.log(\'<><><><><><><><><><><><><><><><>  INCOMING  <><><><><><><> >>> In messages. e amd v are \', e, v);\n  mMZ10.bnd( () => {\n    pMnums.ret([v[3], v[4], v[5], v[6]]).bnd(test3,"MpMstyle");\n    travMonad.run([ [v[3], v[4], v[5], v[6]], v[7], v[8], [], 0 ]);\n    pMscore.ret(v[7]);\n    pMgoals.ret(v[8]) }); \n  mMZ12.bnd( () => mM6.ret(v[2] + \' successfully logged in.\'));\n  mMZ13.bnd( () => updateMessages(e.data));\n  mMZ14.bnd( () => mMgoals2.ret(\'The winner is \' + v[2]));\n  mMZ15.bnd( () => {\n    mMgoals2.ret(\'A player named \' + v[2] + \' is currently logged in. Page will refresh in 4 seconds.\')\n    refresh() });\n  mMZ17.bnd( () => testTask(v[2], v[3], e.data) ); \n  mMZ18.bnd( () => {\n    if (pMgroup.x != \'solo\' || pMname.x === v[2] ) updatePlayers(e.data)  });\n  })       \n  mMtemp.ret(e.data.split(\',\')[0])\n  .bnd(next, \'CA#$42\', mMZ10)\n  .bnd(next, \'CD#$42\', mMZ13)\n  .bnd(next, \'CE#$42\', mMZ14)\n  .bnd(next, \'EE#$42\', mMZ15)\n  .bnd(next, \'DD#$42\', mMZ17)\n  .bnd(next, \'NN#$42\', mMZ18)\n  });  ');

	var MonadSet = (0, _dom.h)('pre', '  var MonadSet = function MonadSet(set, ID) {\n    this.s = set;\n    this.bnd = (func, ...args) => func(this.s, ...args);  \n    this.add = a => new MonadSet(s.add(a), this.id);\n    this.delete = a => new MonadSet(s.delete(a), this.id);\n    this.clear = () => new MonadSet(s.clear(), this.id);\n  };  ');

	var nums = (0, _dom.h)('pre', '    const numClick$ = sources.DOM\n      .select(\'.num\').events(\'click\');\n       \n    const numClickAction$ = numClick$.map(e => {\n      if (mM3.x.length < 2) {\n        mM3.bnd(push, e.target.innerHTML, mM3)\n        var ar = mMhistorymM1.x[mMindex.x].slice()\n        ar.splice(e.target.id, 1)\n        mM1.ret(ar);\n        game(ar);\n      }\n      if (mM3.x.length === 2 && mM8.x !== 0) {\n        console.log(\'7777777777777777777777777777  In numClickAction$ heading for updateCalc.  mM1.x is \', mM1.x);\n        updateCalc();\n      }\n    }).startWith([0,0,0,0]);\n      \n    const opClick$ = sources.DOM\n      .select(\'.op\').events(\'click\');\n   \n    const opClickAction$ = opClick$.map(e => {\n      mM8.ret(e.target.textContent);\n      if (mM3.x.length === 2) {\n        updateCalc();\n      }\n    })\n   \n    var game = function game (z) {\n      console.log(\'>>>>>>>>>>>>>>> game has been called. mMindex.x and z are \', mMindex.x, z);\n      var x = z.slice();\n      var onlinePlayers;\n          mMindex.bnd(add, 1, mMindex).bnd(i => mMhistorymM1.bnd(spliceAdd, i, x, mMhistorymM1)\n            .bnd(() => mMplayerArchive.bnd(spliceAdd, i, playerMonad.s, mMplayerArchive)) \n            .bnd(() => mMsetArchive.bnd(spliceAdd, i, sMplayers.s, mMsetArchive) ) \n            .bnd(() => console.log(\'In game. >>>>>>>>>>>>>>>>>>>>>>>>>> i is \', i))  )          \n        document.getElementById(\'0\').innerHTML = x[0];  \n        document.getElementById(\'1\').innerHTML = x[1];  \n        document.getElementById(\'2\').innerHTML = x[2];  \n        document.getElementById(\'3\').innerHTML = x[3]; \n        game2();\n        cleanup();\n    };\n  \n    var game2 = function game2 () {\n        var ar = Array.from(sMplayers.s);\n        document.getElementById(\'sb1\').innerHTML = \'Name: \' +  pMname.x;\n        document.getElementById(\'sb2\').innerHTML = \'Group: \' + pMgroup.x\n        document.getElementById(\'sb3\').innerHTML = \'Score: \' + pMscore.x\n        document.getElementById(\'sb4\').innerHTML = \'Goals: \' + pMgoals.x\n        document.getElementById(\'sb5\').innerHTML = \'Currently online: \';\n        document.getElementById(\'sb6\').innerHTML =  ar.join(\', \');\n        cleanup();\n    };\n  });  ');

	var arrayFuncs = (0, _dom.h)('pre', '  var push = function push(y,v,mon) {\n      if (Array.isArray(y)) {\n        let ar = [];\n        let keys = Object.keys(y);\n        for (let k in keys) {ar[k] = y[k]};\n        ar.push(v);\n        return mon.ret(ar);  \n      }\n      console.log(\'The value provided to push is not an array\');\n      return ret(y);\n    };\n    \n    var spliceRemove = function splice(x, j, mon) {\n      if (Array.isArray(x)) {\n        let ar = [];\n        let keys = Object.keys(x);\n        for (let k in keys) {ar[k] = x[k]};\n        ar.splice(j,1);\n        return mon.ret(ar);  \n      }\n      console.log(\'The value provided to spliceRemove is not an array\');\n      return ret(x);\n    };\n    \n    var spliceAdd = function splice(x, index, value, mon) {\n      if (Array.isArray(x)) {\n        let ar = [];\n        let keys = Object.keys(x);\n        for (let k in keys) {ar[k] = x[k]};\n        ar.splice(index, 0, value);\n        return mon.ret(ar);  \n      }\n      console.log(\'The value provided to spliceAdd is not an array\');\n      return ret(x);\n    };\n    \n    var splice = function splice(x, start, end, mon) {\n      if (Array.isArray(x)) {\n        let ar = [];\n        let keys = Object.keys(x);\n        for (let k in keys) {ar[k] = x[k]};\n        ar.splice(start, end);\n        return mon.ret(ar);  \n      }\n      console.log(\'The value provided to spliceAdd is not an array\');\n      return ret(x);\n    };\n  ');

	var cleanup = (0, _dom.h)('pre', '  function cleanup (x) {\n      let target0 = document.getElementById(\'0\');\n      let target1 = document.getElementById(\'1\');\n      let target2 = document.getElementById(\'2\');\n      let target3 = document.getElementById(\'3\');\n      let targetAr = [target0, target1, target2, target3];\n      for (let i in [0,1,2,3]) {\n        if (targetAr[i].innerHTML === \'undefined\' )    {\n          targetAr[i].style.display = \'none\';\n        }\n        else {\n          targetAr[i].style.display = \'inline\';\n        }\n      }\n      return ret(x);\n  }; ');

	var C42 = (0, _dom.h)('pre', '  mMZ10.bnd(() => mM$1\n     .ret([mMar.x[3], mMar.x[4], mMar.x[5], mMar.x[6]])\n     .bnd(() => mM$2.ret([]))\n     .bnd(displayInline,\'0\')\n     .bnd(displayInline,\'1\')\n     .bnd(displayInline,\'2\')\n     .bnd(displayInline,\'3\'));  ');

	var taskStream = (0, _dom.h)('pre', '  \n      ');

	var deleteTask2 = (0, _dom.h)('pre', '  mMZ19.bnd(() => mM$task.bnd(spliceRemove, mMar.x[3], mM$task));\n  ');

	var newTask = (0, _dom.h)('pre', '  const newTask$ = sources.DOM\n    .select(\'input.newTask\').events(\'keydown\'); \n\n  const newTaskAction$ = newTask$.map(e => {\n      let ob = {};\n      var alert = \'\';\n      var ar = e.target.value.split(\',\');\n      var ar2 = ar.slice(2);\n      var task = \'\';\n      if (ar.length < 4) {\n        task = ar[2];\n      }\n      if (ar.length > 3) {\n        task = ar2.reduce((a,b) => a + \'$*$*$\' + b);\n      }\n      if( e.keyCode === 13 ) {\n        if ( ar.length < 3 ) {\n          alert = \'You should enter "author, responsible party, task" separated by commas\';\n          document.getElementById(\'alert\').innerHTML = alert;\n        }\n\n        else if ( (mMar2.x.filter(v => (v.task === task)).length) > 0 ) {\n          document.getElementById(\'alert\').innerHTML = task + " is already listed.";\n        }\n\n        else if ( ar.length > 2 ) {\n          mM$taskList.bnd(addString, task + \',yellow, none, false,\' +  ar[0] + \',\' + ar[1], mM$taskList);\n          e.target.value = \'\';\n          document.getElementById(\'alert\').innerHTML = \'\';\n        } \n      } \n  };  ');

	var process = (0, _dom.h)('pre', '  const process = function(str) {\n    let a = str.split(",");\n    console.log(\'In process. str and a are: \', str, a);\n    if (a === undefined) {\n      return;\n    };\n    if (a.length < 9) {\n      return\n    };\n    let ob = {};\n    let ar = a.slice(3)\n    let s = ar.reduce((a,b) => a + \',\' + b);\n    if (mM$taskList.x.length < 5) {\n      mM$taskList.ret(s);\n    }\n    let ar2 = [];\n    let tempArray = [];\n    if (ar.length < 6) {return};\n    if ((ar.length % 6) !== 0) {\n      document.getElementById(\'alert\').innerHTML = \'Error: array length is: \' + length;\n    } else {\n      let keys = Array(ar.length/6).fill(1);\n      keys.map(_ => {\n        ar2.push(\n          {\n            task: convertBack(ar.shift()),\n            color: ar.shift(),\n            textDecoration: ar.shift(),\n            checked: ar.shift() === \'true\',\n            author: ar.shift(),\n            responsible: ar.shift()\n          }\n        )\n      })\n      console.log(\'In process  ar2 is: \', ar2)\n      let keys2 = Object.keys(ar2);\n      for (let k in keys) {\n        tempArray.push(\n          h(\'div.todo\',  [\n            h(\'span.task3\', {style: {color: ar2[k].color, textDecoration: ar2[k].textDecoration}},\n                \'Task: \' + ar2[k].task  ),  \n            h(\'br\'),\n            h(\'button#edit1\', \'Edit\'  ),\n            h(\'input#edit2\', {props: {type: \'textarea\', value: ar2[k].task}, style: {display: \'none\'}}  ), \n            h(\'span#author.tao\', \'Author: \' + ar2[k].author  + \' / \' + \'Responsibility: \' + ar2[k].responsible),\n            h(\'br\'),\n            h(\'input#cb\', {props: {type: \'checkbox\', checked: ar2[k].checked}, style: {color: ar2[k].color,\n                 textDecoration: ar2[k].textDecoration} } ), \n            h(\'label.cbox\', { props: {for: \'#cb\'}}, \'Completed\' ),\n            h(\'button.delete\', \'Delete\'  ),  \n            h(\'br\'),\n            h(\'hr\')])\n        )\n      }\n      mMtaskList.ret(tempArray)\n    }\n  };  ');

	var colorClick = (0, _dom.h)('pre', '  const colorClick$ = sources.DOM\n    .select(\'#cb\').events(\'click\')\n    \n  const colorAction$ = colorClick$.map(e => {\n    let index = getIndex(e);\n    let s = mM$taskList.x;\n    let ar = s.split(\',\');\n    let n = 6 * index + 3;\n    let j = 6 * index + 2;\n    let k = 6 * index + 1;\n    let checked = ar[n];\n    if (checked === \'true\')  {\n      ar[n] = \'false\'; \n      ar[k] = \'yellow\'; \n      ar[j] = \'none\'; \n    }\n    else {\n      ar[n] = \'true\'; \n      ar[k] = \'lightGreen\'; \n      ar[j] = \'line-through\'; \n    }\n    mM$taskList.ret( ar.reduce((a,b) => a + \',\' + b) )\n  });  \n                     \n  var getIndex = function getIndex (event_object) {\n    var task = event_object.currentTarget.parentNode.innerText;\n    var possibilities = event_object.currentTarget.parentNode.parentNode.childNodes;\n    var keys = Object.keys(possibilities);\n    for (let k in keys) {\n      if (task === possibilities[k].innerText) {\n        return k\n      }\n    }\n    console.log(\'In getIndex. No match\');\n  }  ');

	var edit = (0, _dom.h)('pre', '  const edit1$ = sources.DOM\n    .select(\'#edit1\').events(\'click\')\n    \n  const edit1Action$ = edit1$.map(e => {\n    let index = getIndex2(e);\n    mMtaskList.x[index].children[3].elm.style.display = \'block\';\n  });\n\n  const edit2$ = sources.DOM\n    .select(\'#edit2\').events(\'keypress\')\n    \n  const edit2Action$ = edit2$.map(e => {\n    let v = e.target.value;\n    let index = getIndex2(e);\n    if( e.keyCode === 13 ) {\n      process2(v, index);\n    mMtaskList.x[index].children[3].elm.style.display = \'none\';\n    }\n  });\n\n  const process2 = function(str, index) {\n    var a = mMcurrentList.x.split(\',\');\n    a[6*index] = str;\n    var b = a.reduce((a,b) => a + \',\' + b)\n    task2(b);  \n  };\n\n  var getIndex2 = function getIndex2 (e) {\n    var elem = e.currentTarget.parentNode.children[0].innerHTML\n    var elem2 = e.currentTarget.parentNode.parentNode.childNodes\n    var keys = Object.keys(elem2);\n    for (let k in keys) {\n      if (elem === elem2[k].childNodes[0].innerHTML) {\n        return k\n      }\n      console.log(\'In getIndex2. No match\');\n    }\n  }  ');

	var mM$task = (0, _dom.h)('pre', '  const taskAction$ = mM$taskList.stream.map(str => {\n    socket.send(\'TD#$42\' + \',\' + mMgroup.x.trim() + \n        \',\' + mMname.x.trim() + \',\' + \'@\' + str);\n  });  ');

	var updateCalc = (0, _dom.h)('pre', '  function updateCalc() { \n    mM3.bnd(ar => mM7       // mM3 contributes mM3.x to the computation.\n    .ret(calc(ar[0], mM8.x, ar[1]))      // mM8.x is the operator string.\n    .bnd(result =>   // The return value of calc(), which is mM7.x, is used three times.\n      {  mM1.bnd(push, result, mM1).bnd(z =>\n         mM$1.ret(z));                         // Updates the display.             \n        if (result === 20) {score(mM13.x, 1)}; \n        if (result === 18) {score(mM13.x, 3)};\n      }\n    )) \n    reset()\n  };\n\n  var score = function score(x,j) {\n    socket.send(\'CA#$42,\' + pMgroup.x + \',\' + pMname.x + \',6,6,12,20\');\n    if ((x + j) === 20) {\n      mMplayer.ret([]);\n      mM13.ret(0).bnd(mMindex.ret);\n      mMhistorymM1.ret([0,0,0,0]);   \n      mMgoals.bnd(add, 1, mMgoals).bnd(v => {\n        if (v === 3) {\n          socket.send(\'CG#$42,\' + pMgroup.x + \',\' + pMname.x + \',\' + -x + \',\' + 0); \n          socket.send(\'CE#$42,\' + pMgroup.x + \',\' + pMname.x + \',nothing \')\n          mMgoals.ret(0);\n        }\n        else socket.send(\'CG#$42,\' + pMgroup.x + \',\' + pMname.x + \',\' + -x + \',\' + v); \n      })\n      return;\n    }\n    if ((x + j) % 5 === 0) {\n      socket.send(\'CG#$42,\' + pMgroup.x + \',\' + pMname.x + \',\'+ (j+5)+\',\' + mMgoals.x); \n      mM13.ret(x + j + 5);\n      return;\n    } \n    socket.send(\'CG#$42,\' + pMgroup.x + \',\' + pMname.x + \',\'+ j + \',\' + mMgoals.x); \n    mM13.ret(x + j);\n };\n\n  var reset = function reset () {\n      mM3.ret([])\n      .bnd(() => mM4.ret(0)\n      .bnd(mM8.ret)\n      .bnd(cleanup))    // Hides \'undefined\' values in the display.\n  }\n\n  var updateScoreboard = function updateScoreboard(v) {  // v is received from the server.\n    let ar2 = v.split("<br>");\n    let ar = ar.slice();\n    return mMscoreboard.ret(ar);\n  };  ');

	var testZ = (0, _dom.h)('pre', '  mMZ1.bnd(v => mMt1\n  .bnd(add,v).bnd(w => {\n    mMt1.ret(w)\n    .bnd(cube)\n    .bnd(x => mMt3VAL = w + \' cubed is \' + x)}));  \n  \n  mMZ2.bnd(v => cube(v)\n  .bnd(w => mMt3VAL = v + \' cubed is \' + w));  ');

	var quad = (0, _dom.h)('pre', '  const quad$ = sources.DOM\n    .select(\'#quad\').events(\'keypress\')  // Motorcycle way to get user input.\n  \n  const quadAction$ = quad$.map((e) => {\n    if( e.keyCode === 13 ) {\n      mMZ3.release(e.target.value)       // Releases mMZ (below).\n      document.getElementById(\'quad\').value = null;\n    }\n  });\n\n  var solve = function solve () {\n     mMZ3.bnd(a => {\n     mMquad4.ret(\'\'); \n     mMquad6.ret(\'\');  \n     mMquad5.ret(a + " * x * x ")    \n     mMZ3.bnd(b => {\n     mMquad6.ret(b + \' * x \')\n     mMZ3.bnd(c => {\n     mMtemp.ret([a,b,c])\n    .bnd(fmap, qS4,\'mMtemp2\')\n    .bnd(result => {  \n      let x = result[0]\n      let y = result[1]\n      if (x === 0) {\n        mMquad5.ret(\'No solution\', mMtemp)\n        mMquad6.ret(\' \');\n        solve(); \n        return;\n      }\n      if (y === 0) {\n        mMquad5.ret(\'No solution\')\n        mMquad6.ret(\' \')   \n        solve(); \n        return;\n      };\n      mMquad4.ret("Results: " + x + " and  " + y)  \n      mMquad5.ret(p(a).text + " * " + x + " * " + x + " + " + p(b).text + \n              " * " + x + " " + p(c).text + " = 0")\n      mMquad6.ret(p(a).text + " * " + y + " * " + y + " + " + p(b).text + \n              " * " + y + " " + p(c).text + " = 0")   \n      solve();  \n      }) }) }) }) \n  };\n  \n  var p = function p (x) { \n    if (x >= 0) {return \' + \' + x}\n    if (x < 0 ) {return \' - \' + Math.abs(x)}\n  }\n\n  var qS1 = function qS1 (a, b, c) {\n    let n = (b*(-1)) + (Math.sqrt(b*b - 4*a*c));\n    if (n != n) {\n      return "No solution";\n    }\n    return n/(2*a);\n  }\n\n  var qS2 = function qS2 (a, b, c) {\n    let n = (b*(-1)) - (Math.sqrt(b*b - 4*a*c));\n    if (n != n) {\n      return "No solution";\n    }\n    return n/(2*a);\n  \n  function fmap(x, g, id) { \n    var mon = new Monad(g(x), id); \n    window[id] = mon;\n    return mon;\n  }  ');

	var runTest = (0, _dom.h)('pre', '  var runTest = function monTest () {\n  mM5.bnd( equals,  \n    m.ret(0).bnd(v => add(v, 3, m).bnd(cube)), \n    m.ret(0).bnd(add, 3, m).bnd(cube), mMa)\n\n  mM5.bnd(equals, m, m.bnd(m.ret), mMb)\n\n  mM5.bnd(equals, m, m.ret(m.x), mMc)\n  }  ');

	var inc = (0, _dom.h)('pre', '  var inc = function inc(x, mon) {\n      return mon.ret(x + 1);\n  };\n\n  var spliceAdd = function spliceAdd(x, index, value, mon) {\n    if (Array.isArray(x)) {\n      let ar = [];\n      let keys = Object.keys(x);\n      for (let k in keys) {ar[k] = x[k]};\n      ar.splice(index, 0, value);\n      return mon.ret(ar);  \n    }\n    console.log(\'The value provided to spliceAdd is not an array\');\n    return ret(x);\n  }  ');

	var todoStream = (0, _dom.h)('pre', '  const taskAction$ = mM$taskList.stream.map(str => {\n    socket.send(\'TD#$42\' + \',\' + mMgroup.x.trim() + \n        \',\' + mMname.x.trim() + \',\' + \'@\' + str);\n  });  ');

	var add = (0, _dom.h)('pre', '  var add = function(x,b,mon) {\n    if (arguments.length === 3) {\n      return mon.ret(x + b);\n    }\n    return ret(x+b);  \n  }; ');

	var seed = (0, _dom.h)('pre', '  mM$prime.ret([[2],3])  ');

	var MonadState = (0, _dom.h)('pre', '    function MonadState(g, state, p) {\n      this.id = g;\n      this.s = state;\n      this.process = p;\n      this.a = s[3];\n      this.bnd = (func, ...args) => func(this.s, ...args);  \n      this.run = ar => { \n        var ar2 = this.process(ar);\n        this.s = ar2;\n        this.a = ar2[3];\n        window[this.id] = this;\n        return window[this.id];\n      }\n    };  ');

	var primesMonad = (0, _dom.h)('pre', '  var primesMonad = new MonadState(\'primesMonad\', [2, \'\', 3, [2]], [2],  primes_state) \n\n  var primes_state = function primes_state(x) {\n    var v = x.slice();\n      while (2 === 2) {\n        if (v[3].every(e => ((v[0]/e) != Math.floor(v[0]/e)))) {\n          v[3].push(v[0]);\n        }\n        if (v[3][v[3].length - 1] > v[2]) { break }; // Not an infinite loop afterall\n        v[0]+=2;\n      }\n    return v;\n  }  ');

	var fibsMonad = (0, _dom.h)('pre', '  var primesMonad = new MonadState(\'primesMonad\', [3, \'\', 3, [2,3]], primes_state);\n\n  var fibs_state = function fibs_state(ar) {\n    var a = ar.slice();\n    while (a[3].length < a[2]) {\n      a = [a[1], a[0] + a[1], a[2], a[3].concat(a[0])];\n    }\n    return a\n  }  ');

	var tr3 = (0, _dom.h)('pre', '  var tr3 = function tr (fibsArray, primesArray) {\n    var bound = Math.ceil(Math.sqrt(fibsArray[fibsArray.length - 1]))\n    var primes = primesArray.slice();\n    if (primesArray.slice(-1)[0] >= bound) {\n      primes = primesArray.filter(v => v <= bound);\n    } \n    var ar = [];\n    var fibs = fibsArray.slice(3);\n    fibs.map (v => {\n      if (primesArray.every(p => (v % p || v === p))) ar.push(v);\n    })\n    return [fibsArray, primes, ar]\n  }  ');

	var primeFibInterface = (0, _dom.h)('pre', '  const fibKeyPress5$ = sources.DOM\n    .select(\'input#fib92\').events(\'keydown\');\n\n  const primeFib$ = fibKeyPress5$.map(e => {\n    if( e.keyCode === 13 ) {\n      mMres.ret(fibsMonad\n      .run([0, 1, e.target.value, []])\n      .bnd(fibsState => fibsMonad\n      .bnd(fpTransformer, primesMonad)\n      .bnd(primesState => tr3(fibsState[3],primesState[3]))))var\n    }\n  });  ');

	var fpTransformer = (0, _dom.h)('pre', '  var fpTransformer = function fpTransformer (s, m) {\n    var bound = Math.ceil(Math.sqrt(s[3][s[3].length - 1]));\n    if (bound > m.a[m.a.length - 1] ) {\n      m.run([m.s[0], "from the fibKeyPress5$ handler", bound, primesMonad.a])\n    }\n    return m;\n  }  ');

	var factorsMonad = (0, _dom.h)('pre', '  var factorsMonad = new MonadState(\'factorsMonad\', [[], [], 2, []], factor_state);\n  \n  function factor_state(v) {\n    v[3].map(function (p) {\n      if (v[2] / p === Math.floor(v[2] / p)) {\n          v[0].push(p);\n      }\n    });\n    return v;\n  }  ');

	var factorsInput = (0, _dom.h)('pre', '  var factorsPress$ = sources.DOM\n      .select(\'input#factors_1\').events(\'keydown\');\n\n  var factorsAction$ = factorsPress$.map(function (e) {\n    var factors = [];\n    mMfactors3.ret(\'\');\n    if (e.keyCode === 13) {\n      var num = e.target.value\n      if (!num.match(/^[0-9]+$/)) {\n        mMfactors3.ret(\'This works only if you enter a number. \' + num + \' is not a number\');\n      }\n      else {\n        factors = primesMonad.run([primesMonad.s[0], [], num, primesMonad.a])\n        .bnd(s => prFactTransformer3(s, num));\n        mMfactors.ret("The prime factors of " + num + " are " + factors.join(\', \'));\n      }\n    }\n  });  ');

	var playerMonad = (0, _dom.h)('pre', '  var playerMonad = new MonadState(\'playerMonad\', [0,0], [0,0], player_state);\n\n  function player_state (v) {\n    var x = v.slice();\n    let ar = [ \n    pMscore.ret(x[0]),\n    pMgoals.ret(x[1]) ]\n    playerMonad.a = ar;\n    playerMonad.s = ar;  \n    return x; \n  };  ');

	var MonadSet = (0, _dom.h)('pre', '    var MonadSet = function MonadSet(set, str) {\n      var this = this;\n      this.id = str;\n      this.s = new Set();  \n  };\n\n  var s = new Set();\n\n  var sMplayers = MonadSet(s, \'sMplayers\'); // holds currently online players  ');

	var promise = (0, _dom.h)('pre', '      var promise = function promise(x, t, mon, args) {\n        return (new Promise((resolve) => {\n          setTimeout(function() {\n            resolve(eval("mon.ret(x).bnd(" + args + ")"))   // eval! Get over it, Douglas.\n          },t*1000  );\n        }));\n      };  ');

	var promiseSnippet = (0, _dom.h)('pre', '  m.ret(3).bnd(promise, 2, m, "cube").then(data => m.ret(data.x).bnd(add, 15, m))  ');

	var timeoutSnippet = (0, _dom.h)('pre', '  const timeoutClicks$ = sources.DOM.select(\'#timeout\').events(\'click\')\n    const timeoutAction$ = timeoutClicks$.map(() => {\n      document.getElementById(\'timeout2\').innerHTML = \'\'\n      document.getElementById(\'timeout3\').innerHTML = \'\'\n      m.ret(3).bnd(m.ret)\n        .bnd(display, \'timeout2\', \'m) is \' + \' \' + m)).bnd(m.ret)\n        .bnd(timeout2, 1, m, [() => m\n        .bnd(cube).bnd(m.ret)\n        .bnd(display, \'timeout2\', \'m) is \' + \' \' + m)).bnd(m.ret)\n        .bnd(timeout2, 2, m, [() => m\n        .bnd(add, 15).bnd(m.ret)\n        .bnd(display, \'timeout2\',  \'m) is \' + \' \' + m)).bnd(m.ret)\n        .bnd(display, \'timeout3\', \'The meaning of everything was computed to be\' + \' \' + m))   \n      ])]);  \n    });  \n  });  ');

	var timeout = (0, _dom.h)('pre', '  var timeout2 = function timeout (x, t, m, args) {\n    setTimeout(function () {\n      mMZ9.release();\n    }, t * 1000  );\n    return mMZ9.bnd(() => m.bnd(... args))\n  };  ');

	var examples = (0, _dom.h)('pre', ' \n             ret(\'m1Val\',\'m1\')\n             m1.x === \'m1Val\'   // true\n             ret(\'m2Val\', \'m2\')\n             m2.x === \'m2Val\'   // true\n\n             m1.bnd(m2.ret)\n             m2.x === \'m1Val\' // true\n             m2.x === \'m2Val\'   // still true\n\n             m1.ret(\'newVal\')\n             m1.bnd(v => ret(v, \'m2\'))\n             m2.x === \'newVal\'  // true\n             m2.x === \'m1Val\' // true   still the same  ');

	var examples2 = (0, _dom.h)('pre', ' \n  var m = new Monad(v, "m");\n  ret(v, "m");\n             ');

	var async = (0, _dom.h)('pre', '  const LOCKED = ret(true, \'LOCKED\');\n  LOCKED.ret(true);   // Creates LOCKED\n\n  const messages2$ = (sources.WS).map(e => {\n    if (!LOCKED.x) {\n      var v2 = e.data.split(\',\');\n      ret(v2.slice(3))\n      .bnd(v => mMtemp.bnd(display,\'request2\', \'The current online members of \' + pMgroup.x + \' are:\')\n      .bnd(() => mMtemp.bnd(display,\'request3\', v) \n      .bnd(() => mMtemp.bnd(log, "The members are " + v )\n      .bnd(() => LOCKED.ret(true)))))\n    }\n  });\n\n  const requestClicks$ = sources.DOM.select(\'#request\').events(\'click\');\n\n  const requestAction$ = requestClicks$.map(() => {\n    if (pMgroup.x != \'solo\') {         // The default non-group\n      LOCKED.ret(false);\n      socket.send(\'NN#$42,\' + pMgroup.x  + \',\' + pMname.x + \',\' + pMgroup ); \n    }\n  });\n\n  var display = function display (x, id, string) {\n    document.getElementById(id).innerHTML = string;\n    return ret(x);\n  }  ');

	var e1 = (0, _dom.h)('pre.turk', '  function ret(v, id = \'generic\') {\n    window[id] = new Monad(v, id);\n    return window[id];\n  }\n\n  function cube (v, id) {\n    return ret(v * v * v);\n  };\n\n  function add (x, b) {\n    return ret(parseInt(x,10) + parseInt(b,10) );\n  };\n\n  function log(x,y) {\n      console.log(y)\n      return ret(x);\n  };  ');

	var e2 = (0, _dom.h)('pre.turk', '  var c = m.ret(0).bnd(add,3).bnd(cube).bnd(log, "The values of m\'s and c\'s \n  x attributes are " + m.x + " and " + c.x + " respectively." )   ');

	var e2x = (0, _dom.h)('pre', '   Output: The values of m\'s and c\'s x attributes are 0 and 27 respectively.  ');

	var e3 = (0, _dom.h)('p', ' Note: m\'s x attribute keeps its initial value of 0 because each computation creates a fresh instance of Monad with id === "default". In the next example, m\'s x attribute becomes the computation result due to the addition of ".bnd(m.ret)". ');

	var e4 = (0, _dom.h)('pre.turk', '  var c = m.ret(0).bnd(add,3).bnd(cube).bnd(m.ret).bnd(log, \n   "The values m\'s and c\'s x attributes are " + m.x + " and " + c.x + " respectively.") ');

	var e4x = (0, _dom.h)('pre', '   Output: The values of m\'s and c\'s x attributes are 27 and 27 respectively.  ');

	var e6 = (0, _dom.h)('pre.turk', '  m.ret(0).bnd(add,3).bnd(m2.ret).bnd(cube,m3).bnd(m3.ret)\n  .bnd(log,"m), m2.x, and m3.x are  " + m.x + ", " + m2.x + " and " + \n  m3.x + " respectively. "); ');
	var e6x = (0, _dom.h)('pre', '   Output: m.x and m2.x and m3) are  0, 3 and 27 respectively.  ');

	var equals = (0, _dom.h)('pre', '    var equals = function equals (mon1, mon2) {\n      if (mon1.id === mon2.id && mon1) === mon2)) return true;\n      else return false\n    }  ');

	var fmap = (0, _dom.h)('pre', '    function fmap (x, g, id) {window[id] = new Monad(g(x), id); return window[id]}\n  \n    var qS1 = function qS1 (a, b, c) {\n      let n = (b*(-1)) + (Math.sqrt(b*b - 4*a*c));\n      if (n != n) {\n        return "No solution";\n      }\n      return n/(2*a);\n    }\n  \n    var qS2 = function qS2 (a, b, c) {\n      let n = (b*(-1)) - (Math.sqrt(b*b - 4*a*c));\n      if (n != n) {\n        return "No solution";\n      }\n      return n/(2*a);\n    }\n  \n    var qS4 = function qS4 ([x,y,z]) {\n      let [a,b,c] = [x,y,z]\n      return [qS1(a,b,c), qS2(a,b,c)]    \n    }  \n    \n    m.ret([12,12,-144])\n  \n    m.bnd(fmap, qS4, "temp").bnd(lg)   logs [3, -4] ');

	var opM = (0, _dom.h)('pre', '    function opM (a, op, b, id) {\n      window[id] = new Monad(eval(a.x + op + b.x), id); \n      return window[id];\n    }  \n    \n    m1.ret(42)\n\n    m2.ret(7)\n\n    opM(m1, "%", m2, "ok").bnd(lg)  logs 0\n\n    opM(m1, "+", m2, "ok").bnd(lg)  logs 49  ');

	var a = 'acorn';

	var messageMonad = (0, _dom.h)('pre', '    var messageMonad = new MonadState(\'messageMonad\', messages, messages, message_state); \n\n    function message_state(v) {\n      var ar = v[0].concat(v[3]);\n      return [ v[0], [], [], ar ];\n    };  ');

	var updateMessages = (0, _dom.h)('pre', '    var updateMessages = function updateMessages(e) {\n        var ar = e.split(\',\');\n        var sender = ar[2];\n        ar.splice(0,3);\n        var str = ar.join(\',\');\n        messageMonad.run([ [h(\'br\'), sender + \': \' + str], [], [], messageMonad.s[3] ]);\n    }  ;  ');

	var travMonad = (0, _dom.h)('pre', '  var travMonad = new MonadState("travMonad", [[8,8,8,8], 0, 0, [ [ [], 0, 0 ] ] ], trav_state)\n  \n  function trav_state (ar) {\n    pMindex.bnd(add,1).bnd(pMindex.ret);\n    var nums = ar[0];\n    var score = ar[1];\n    var goals = ar[2];\n    var next = travMonad.s.slice();\n    var ar = [nums, score, goals];\n    next[0] = nums;\n    next[1] = score;\n    next[2] = goals;\n    next[3].splice( pMindex.x, 0, ar );\n    return next;         // This results in travMonad.s === next.\n  }  ');

	var test3 = (0, _dom.h)('pre', '  function test3 (a) {\n    var b = [];\n    for (let i of [0,1,2,3]) {\n      b[i] = (a[i] === undefined) ? \'none\' : \'inline\'\n    }\n    return ret(b);\n  }  \n  \n  pMnums.bnd(test3).bnd(pMstyle.ret);  ');

	var mMZ10 = (0, _dom.h)('pre', '  mMZ10.bnd( () => {\n    pMnums.ret([v[3], v[4], v[5], v[6]]).bnd(test3).bnd(pMstyle.ret)\n    travMonad.run([ [v[3], v[4], v[5], v[6]], v[7], v[8] ]);\n    pMscore.ret(v[7]);\n    pMgoals.ret(v[8]) });  ');

	var numClick1 = (0, _dom.h)('pre.blue', '  var numClick$ = sources.DOM\n      .select(\'.num\').events(\'click\'); \n\n  var numClickAction$ = numClick$.map(e => {\n    console.log(\'In numClickAction. @@@@@@@@@@@@@@@@@@@@@@@@ e.target.id, e, and pMnums are \', e.target.id, e, pMnums.x );\n    if (pMclicked.x.length === 2) {return};\n    pMnums.bnd(spliceM, e.target.id, 1)\n    .bnd(v => {\n      test3(v, \'MpMstyle\')\n      socket.send(`CG#$42,${pMgroup.x},${pMname.x},${pMscore.x},${pMgoals.x}`);\n      pMclicked\n      .bnd(push, e.target.innerHTML)\n      .bnd(pMclicked.ret)\n      .bnd(w => {\n        travMonad.run([v, pMscore.x, pMgoals.x, w, pMop.x])\n        if (w.length === 2 && pMop.x != 0) {\n          console.log(\'In numClickAction# if block >>>>>> @@@@@@@@@@@@@@@@@@@@@@ \' );\n          updateCalc(w, pMop.x) \n        }\n      })\n    })\n  }).startWith([0, 0, 0, 0]);\n\n  var opClick$ = sources.DOM\n      .select(\'.op\').events(\'click\');\n\n  var opClickAction$ = opClick$.map(e => {\n    pMop.ret(e.target.innerHTML).bnd(v => { \n      var ar = pMclicked.x\n      if (ar.length === 2) {\n        updateCalc(ar, v)\n      }\n    }) \n  });  ');

	var numClick2 = (0, _dom.h)('pre.blue', '  function updateCalc(ar, op) {\n    var result = calc(ar[0], op, ar[1]);\n    mM3.ret([]);\n    mM8.ret(0)\n    if (result === 20) { \n      pMscore.bnd(add,1)\n      .bnd(testscore)\n      .bnd(pMscore.ret)\n      .bnd(v => score(v));\n      return; \n    } \n    else if (result === 18) { \n      pMscore.bnd(add,3)\n      .bnd(testscore)\n      .bnd(pMscore.ret)\n      .bnd(v => score(v));\n      return; \n    }\n\n    else {\n      pMnums.bnd(push,result)\n      .bnd(v => {\n        travMonad.run([v, pMscore.x, pMgoals.x, [], 0])\n        test3(v, \'MpMstyle\')\n      }); \n    }\n  };  \n\n  var testscore = function testscore(v) {\n    if ((v % 5) === 0) return ret(v+5)\n    else return ret(v);\n  };\n\n  function score(scor) {\n    if (scor != 25) {\n      newRoll(scor, pMgoals.x)\n    }\n    else if (pMgoals.x === 2) {\n      socket.send(`CE#$42,' + pMgroup.x + ',' + pMname.x + '`);\n      newRoll(0,0)\n    }\n    else {pMgoals.bnd(add, 1).bnd(pMgoals.ret).bnd(g => newRoll(0, g))};\n  };  ');

	var test10_11 = (0, _dom.h)('pre.turk5', '    function test10 () {\n      m.ret(4).bnd(mult,100,\'Mm1\')\n      .bnd(square,\'Mm2\')\n      .bnd(add,-m2.x + 3,\'Mm3\')\n      .bnd(mult,100,\'Mm4\')\n      .bnd(square,\'Mm5\')\n      .bnd(add,m2.x,\'Mm6\') \n      .bnd(sqroot,\'Mm7\')\n      .bnd(() => { \n        mMar10.ret([m, m1, m2, m3, m4, m5, m6, m7]);\n        console.log(\'The square root of the sum of \', m1.x,\n          \' squared and \', m4.x, \' squared is \', m7.x); });\n      return mMar10;\n    }  \n    \n    function test11 () {\n      m.ret(4).bnd(mult,100,\'Mm1\')\n      .bnd(square,\'Mm2\')\n      .bnd(add,-m2.x + 3,\'Mm3\')\n      .bnd(mult,100,\'Mm4\')\n      .bnd(square,\'Mm5\')\n      .bnd(add,m2.x,\'Mm6\') \n      .bnd(sqroot,\'Mm7\').bnd(m.ret)\n      .bnd(() => { \n        mMar11.ret([m, m1, m2, m3, m4, m5, m6, m7]);\n        console.log(\'The square root of the sum of \', m1.x,\n          \' squared and \', m4.x, \' squared is \', m7.x); });\n      return mMar11;\n    }  ');

	var monadArchive2 = (0, _dom.h)('pre.blue', '    function MonadArchive(g, state, p) {\n      this.id = g;\n      this.s = state;\n      this.process = p;\n      this.a = s[0];\n      this.bnd = (func, ...args) => func(this.s, ...args);  \n      this.run = ar => { \n        var ar2 = this.process(ar);\n        this.a = ar2[pMindex.x];\n        this.s = ar2;\n        console.log(\'In MonadState instance this.a, this.s \', this.a, this.s) \n        window[this.id] = this;\n        return window[this.id];\n      }\n    };\n\n    var travMonad = new MonadArchive("travMonad", [ [ [ 0,0,0,0 ], 0, 0, [], 0 ] ] , trav_archive)\n    \n    function trav_archive (ar) {\n      var ind = pMindex.x + 1;\n      pMindex.ret(ind);\n      pMnums.ret(ar[0]);\n      pMscore.ret(ar[1]);\n      pMgoals.ret(ar[2]);\n      ar[3] = (typeof ar[3] === "undefined") ? pMclicked.x : ar[3]\n      ar[4] = (typeof ar[4] === "undefined") ? pMop.x : ar[4]\n      pMclicked.ret(ar[3]);\n      pMop.ret(ar[4]); \n      var next = travMonad.s.slice();\n      next.splice( ind, 0, ar );\n      return next;                // The new value of travMonad.s.\n    }  ');

	var backAction = (0, _dom.h)('pre', '  \n    var backAction$ = backClick$.map(() => {\n      if (pMindex.x > 1) {   \n        pMop.ret(0);\n        var ind = pMindex.x - 1;\n        var s = travMonad.s[ind];\n        pMnums.ret(s[0]).bnd(test3, \'MpMstyle\');\n        pMscore.ret(s[1]);\n        pMgoals.ret(s[2]);\n        pMclicked.ret(s[3]);\n        pMop.ret(s[4]);\n        socket.send(`CG#$42,' + pMgroup.x + ',' + pMname.x + ',' + pMscore.x + ',' + pMgoals.x + '`);\n      pMindex.bnd(add,-1);\n      } \n    });    ');

	var monadEr = (0, _dom.h)('pre.red9', '    function MonadEr (val, ID, er = []) {\n        var test;\n        var arr = arr = [];\n        this.x = val;\n        this.e = er;\n        this.id = ID;\n        this.getx = function getx (x) {return this.x};\n        this.bnd = function (f, ...args) {\n          var args = args;\n          if (f === \'clean3\' || f === clean3) {\n            this.e = [];\n            window[this.id] = new MonadEr(this.x, this.id, []);\n            return window[this.id];\n          }\n          if (this.e.length > 0) {\n            console.log(\'BYPASSING COMPUTATION in MonadEr instance\', this.id, f, \'.  PROPAGATING ERROR:\',  this.e[0]); \n            return this;  \n          }\n          \n          if (args.length > 0) {\n            arr = args.filter(v => !(typeof v === \'string\' && v.charAt() === \'M\' && v.slice(0,4) !== \'Math\'))\n              \n            arr.map(v => {\n              test = testP(v, this.id)\n              if (test === \'STOP\') {\n                console.log(\'"STOP" returned from testP. Ending code execution in \',this.id, \'.\' ) \n                this.e.push(\'STOP\');\n                return this;\n              } \n            }); \n          }\n          if (test !== "STOP") {\n          try {\n            var testId = testPrefix(args, this.id);  \n            var ar = arr.map(v => eval(v))\n            var m = eval(f)(this.x, ...ar)  \n            var id = testPrefix(ar, this.id);\n            window[testId] = new MonadEr(m.x, testId, []);\n            return window[testId];\n            }      \n            catch(error) {\n              this.e.push(\'STOP -- Execution Aborted. \');\n              console.log(f, \'ERROR in \',id,error,\' No further computations will be attempted\');\n              return this;\n            } \n          }\n          else {\n            this.e.push(\'STOP -- Execution Aborted. \');\n            console.log(f, \'ERROR "STOP" returned from testP. No further computations will be attempted\');\n            return this;\n          }  \n        }\n        this.ret = function (a) {\n          window[this.id] = new MonadEr(a, this.id, []);\n          return window[this.id];\n        }  \n      };\n\n    function testPrefix (x,y) {\n      var t = y;\n      var s;\n      if (Array.isArray(x)) {\n        x.some(v => {\n          if (typeof v === \'string\' && v.charAt() === \'M\') {\n             t = v.slice(1);\n          }\n        })\n      }\n      return t;\n    }\n    \n    function testP (x,id) {\n        if ( eval(\'typeof \' + x) === \'undefined\') {\n          console.log(`............... ERROR parameter ${x} is not defined`);\n          window[id].e = [`${x} is not defined`]\n          return \'STOP\';\n        }\n        if (eval(x) !== eval(x)) {\n          console.log(`............... ERROR parameter ${x} is not a number`);\n          window[id].e = [`${x} is not a number`]; \n          return \'STOP\';\n        } \n        mMZ12.release([]);\n        return []  \n    }\n    \n    function ret3(v, id = \'generic\') {\n        window[id] = new MonadEr(v, id, []);\n        return window[id];\n      }\n    \n    function add3(x, y) {\n        return ret3(x*1 + y*1);\n      }\n    \n    function cube3(x) {\n        return ret3(x*x*x);\n    }\n    \n    function clean3 (x, id) {\n      window[id] = new MonadEr(x, id, []);\n      return window[id];\n    }    ');

	var errorDemo = (0, _dom.h)('pre.turk5', '    var t = new MonadEr(0,\'t\', []);\n    var t2 = new MonadEr(0,\'t2\', []);\n    var t3 = new MonadEr(0,\'t3\', []);\n    console.log(\'Values of t, t2, and t3\', t.x,t2.x,t3.x)\n    console.log("executing t.bnd(\'add3\',3,\'Mt2\').bnd(cube3, \'Mt3\') ");\n    t.bnd(\'add3\',3,\'Mt2\').bnd(cube3, \'Mt3\')\n    console.log(\'Values of t, t2, and t3\', t.x,t2.x,t3.x)\n    var t = new MonadEr(0,\'t\', []);\n    var t2 = new MonadEr(0,\'t2\', []);\n    var t3 = new MonadEr(0,\'t3\', []); \n    console.log(\'Values of t, t2, and t3\', t.x,t2.x,t3.x)\n    \n    console.log("executing t.bnd(\'add3\',\'three\', \'Mt2\').bnd(cube3, \'Mt3\') " );\n    t.bnd(\'add3\',\'three\',\'Mt2\').bnd(cube3, \'Mt3\')\n    console.log(\'Values of t, t2, and t3\', t.x,t2.x,t3.x)\n    \n    console.log( \'t.bnd(clean3)\' );\n    t.bnd(clean3);\n    \n    console.log("executing t.bnd(\'add3\', \'Math.sqrt(-1)\', \'Mt2\').bnd(cube3, \'Mt3\') " );\n    t.bnd(\'add3\',\'Math.sqrt(-1)\',\'Mt2\').bnd(cube3, \'Mt3\')\n    console.log(\'Values of t, t2, and t3\', t.x,t2.x,t3.x)\n    console.log( \'t.bnd(clean3)\' );\n    t.bnd(clean3);\n    console.log("executing t.bnd(\'addd3\',3,\'Mt2\').bnd(cube3, \'Mt3\') ");\n    t.bnd(\'addd3\',3,\'Mt2\').bnd(cube3, \'Mt3\')\n    console.log(\'Values of t, t2, and t3\', t.x,t2.x,t3.x)    ');

	var tests = (0, _dom.h)('pre', '    function atest () {\n      ret(2,\'a\')\n      .bnd(add,1)\n      a.bnd(v => ret(v*100,\'b\'))\n      .bnd(v2 => ret(v2*v2,\'c\')\n      .bnd(v3 => ret(4,\'d\')\n      .bnd(v4 => ret(v4*100))\n      .bnd(v5 => ret(v5*v5,\'e\')\n      .bnd(v6 => ret(Math.sqrt(v6+v3),\'f\')\n      .bnd(v7 => console.log(\'The square root of the sum of\',v2,\'and\',v5,\'is\', v7,\'.\'))))))\n      return [a,b,c,d,e,f]  \n    }\n\n    console.log(\'// Now setting a, b, c, d, e and f to 7 and logging a.x, b.x, c.x, d.x, e.x, and f.x.)\');\n    ret(7,\'a\');ret(7,\'b\');ret(7,\'c\');ret(7,\'d\');ret(7,\'e\');ret(7,\'f\');  \n    console.log(a.x, b.x, c.x, d.x, e.x,f.x)\n    console.log(\'// Now running atest and making demoAr a reference to its return value. \');\n    demoAr = atest();\n    console.log(\'// Now logging a.x, b.x, c.x, d.x, e.x, and f.x.\');\n    console.log(a.x, b.x, c.x, d.x, e.x,f.x)\n    console.log(\'// Now logging demoAr.map(v => v.x).join(", ").\');\n    console.log(demoAr.map(v => v.x).join(\', \'));\n    console.log(\'// Now setting a, b, c, d, e and f to 6 and logging a.x, b.x, c.x, d.x, e.x, and f.x.)\');\n    ret(6,\'a\');ret(6,\'b\');ret(6,\'c\');ret(6,\'d\');ret(6,\'e\');ret(6,\'f\');  \n    console.log(a.x, b.x, c.x, d.x, e.x,f.x)\n    console.log(\'// Now logging demoAr.map(v => v.x).join(", ").\');\n    console.log(demoAr.map(v => v.x).join(\', \'));\n    console.log(\'// The monads in DemoAr were not mutated or replaced when monads with the same \' );\n    console.log(\'// names (a, b, c, d, and e) updated to 6, 6, 6, 6, 6, 6 by using their bnd() methods. \'); \n    }  ');

	var p5 = (0, _dom.h)('pre', '  \n');

	var p6 = (0, _dom.h)('pre', '  \n');

	var p7 = (0, _dom.h)('pre', '  \n');

	var p8 = (0, _dom.h)('pre', '  \n');

	var p9 = (0, _dom.h)('pre', '  \n');

	exports.default = { errorDemo: errorDemo, monadEr: monadEr, backAction: backAction, monadArchive2: monadArchive2, tests: tests, numClick1: numClick1, numClick2: numClick2, mMZ10: mMZ10, test3: test3, travMonad: travMonad, monad: monad, equals: equals, fmap: fmap, opM: opM, e1: e1, e2: e2, e2x: e2x, e3: e3, e4: e4, e4x: e4x, e6: e6, e6x: e6x, driver: driver, messages: messages, monadIt: monadIt, MonadSet: MonadSet, updateCalc: updateCalc, arrayFuncs: arrayFuncs, nums: nums, cleanup: cleanup, ret: ret, C42: C42, newTask: newTask, process: process, mM$task: mM$task, colorClick: colorClick, edit: edit, testZ: testZ, quad: quad, runTest: runTest, todoStream: todoStream, inc: inc, seed: seed, add: add, MonadState: MonadState, primesMonad: primesMonad, fibsMonad: fibsMonad, primeFibInterface: primeFibInterface, tr3: tr3, fpTransformer: fpTransformer, factorsMonad: factorsMonad, factorsInput: factorsInput, playerMonad: playerMonad, promise: promise, promiseSnippet: promiseSnippet, timeout: timeout, timeoutSnippet: timeoutSnippet, examples: examples, examples2: examples2, async: async };

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.run = undefined;

	var _mostSubject = __webpack_require__(85);

	function makeSinkProxies(drivers) {
	  var sinkProxies = {};
	  var keys = Object.keys(drivers);
	  for (var i = 0; i < keys.length; i++) {
	    sinkProxies[keys[i]] = (0, _mostSubject.holdSubject)(1);
	  }
	  return sinkProxies;
	}

	function callDrivers(drivers, sinkProxies) {
	  var sources = {};
	  var keys = Object.keys(drivers);
	  for (var i = 0; i < keys.length; i++) {
	    var name = keys[i];
	    sources[name] = drivers[name](sinkProxies[name], name);
	  }
	  return sources;
	}

	function makeHandleError(stream, onError) {
	  return function handleError(err) {
	    stream.error(err);
	    onError(err);
	  };
	}

	function replicateMany(_ref) {
	  var sinks = _ref.sinks;
	  var sinkProxies = _ref.sinkProxies;
	  var disposableStream = _ref.disposableStream;
	  var onError = _ref.onError;

	  var sinkKeys = Object.keys(sinks);
	  for (var i = 0; i < sinkKeys.length; i++) {
	    var name = sinkKeys[i];
	    if (sinkProxies.hasOwnProperty(name)) {
	      (function () {
	        var stream = sinkProxies[name];
	        sinks[name].until(disposableStream).observe(function (x) {
	          return stream.next(x);
	        }).then(function (x) {
	          return stream.complete(x);
	        }).catch(makeHandleError(stream, onError));
	      })();
	    }
	  }
	}

	function assertSinks(sinks) {
	  var keys = Object.keys(sinks);
	  for (var i = 0; i < keys.length; i++) {
	    if (!sinks[keys[i]] || typeof sinks[keys[i]].observe !== 'function') {
	      throw new Error('Sink \'' + keys[i] + '\' must be a most.Stream');
	    }
	  }
	  return sinks;
	}

	var logErrorToConsole = typeof console !== 'undefined' && console.error ? function (error) {
	  console.error(error.stack || error);
	} : Function.prototype;

	var defaults = {
	  onError: logErrorToConsole
	};

	function runInputGuard(_ref2) {
	  var main = _ref2.main;
	  var drivers = _ref2.drivers;
	  var onError = _ref2.onError;

	  if (typeof main !== 'function') {
	    throw new Error('First argument given to run() must be the ' + '\'main\' function.');
	  }
	  if ((typeof drivers === 'undefined' ? 'undefined' : _typeof(drivers)) !== 'object' || drivers === null) {
	    throw new Error('Second argument given to run() must be an ' + 'object with driver functions as properties.');
	  }
	  if (!Object.keys(drivers).length) {
	    throw new Error('Second argument given to run() must be an ' + 'object with at least one driver function declared as a property.');
	  }

	  if (typeof onError !== 'function') {
	    throw new Error('onError must be a function');
	  }
	}

	function run(main, drivers) {
	  var _ref3 = arguments.length <= 2 || arguments[2] === undefined ? defaults : arguments[2];

	  var _ref3$onError = _ref3.onError;
	  var onError = _ref3$onError === undefined ? logErrorToConsole : _ref3$onError;

	  runInputGuard({ main: main, drivers: drivers, onError: onError });
	  var disposableStream = (0, _mostSubject.subject)();
	  var sinkProxies = makeSinkProxies(drivers);
	  var sources = callDrivers(drivers, sinkProxies);
	  var sinks = assertSinks(main(sources));
	  replicateMany({ sinks: sinks, sinkProxies: sinkProxies, disposableStream: disposableStream, onError: onError });

	  function dispose() {
	    disposableStream.next(1);
	    disposableStream.complete();
	  }

	  return { sinks: sinks, sources: sources, dispose: dispose };
	}

	exports.default = { run: run };
	exports.run = run;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {"use strict";
	// import xs from 'xstream';
	// import {run} from '@cycle/xstream-run';
	// import {makeDOMDriver} from '@cycle/dom';

	var _core = __webpack_require__(61);

	var _core2 = _interopRequireDefault(_core);

	var _most = __webpack_require__(11);

	var _dom = __webpack_require__(33);

	var _code = __webpack_require__(60);

	var _code2 = _interopRequireDefault(_code);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	messageMonad = messageMonad;

	var updateMessages = function updateMessages(e) {
	    var ar = e.split(',');
	    var sender = ar[2];
	    ar.splice(0, 3);
	    var str = ar.join(',');
	    messageMonad.run([[(0, _dom.h)('br'), sender + ': ' + str], [], [], messageMonad.s[3]]);
	};

	console.log('.');
	console.log('.');

	var Greeter = function () {
	    function Greeter(message) {
	        this.greeting = message;
	    }
	    Greeter.prototype.greet = function () {
	        return "Hello, " + this.greeting;
	    };
	    return Greeter;
	}();

	var greeter;
	greeter = new Greeter("world");
	console.log(greeter.greet());

	function createWebSocket(path) {
	    var host = window.location.hostname;
	    if (host === '') host = 'localhost';
	    var uri = 'ws://' + host + ':3055' + path;
	    var Socket = "MozWebSocket" in window ? MozWebSocket : WebSocket;
	    return new Socket(uri);
	}

	var socket = createWebSocket('/');
	console.log('########## socket: ', socket);

	var websocketsDriver = function websocketsDriver() {
	    return (0, _most.create)(function (add) {
	        return socket.onmessage = function (msg) {
	            return add(msg);
	        };
	    });
	};

	socket.onmessage = function (event) {
	    console.log(event);
	};

	socket.onclose = function (event) {
	    console.log('<><><> New message <><><> ', event);
	};

	function updateTasks(obArray) {
	    var todoData = [];
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	        for (var _iterator = obArray[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var ob = _step.value;

	            todoData = todoData.concat([(0, _dom.h)('span.task3', '{ style: { color: ' + ob.color + ', textDecoration: ' + ob.textDecoration + ' } }, \'Task: \' + ' + ob.task), (0, _dom.h)('br'), (0, _dom.h)('button#edit1', 'Edit'), (0, _dom.h)('input#edit2', '{ props: { type: textarea, value: ' + ob.task + '}}'), (0, _dom.h)('span#author.tao', 'Author: ' + ob.author + '  /  Responsibility: ' + ob.responsible), (0, _dom.h)('br'), (0, _dom.h)('input#cb', '{ props: { type: \'checkbox\', checked: ' + ob.checked + '}}, \n           {style: { color: ' + ob.color + ', textDecoration: ' + ob.textDecoration + '}}'), (0, _dom.h)('label.cbox', { props: { for: '#cb' } }, 'Completed'), (0, _dom.h)('button.delete', 'Delete'), (0, _dom.h)('br'), (0, _dom.h)('hr')]);
	        }
	    } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	                _iterator.return();
	            }
	        } finally {
	            if (_didIteratorError) {
	                throw _iteratorError;
	            }
	        }
	    }

	    console.log('In updateTasks uuuuuuuuuuuuuuuuuu  todoData ', todoData);
	};

	console.log((0, _dom.h)('button', { style: { display: pMstyle.x[1] } }, pMnums.x[1]));

	function main(sources) {
	    var numsDisplay = [4, 4, 4, 4];
	    var newTasks = [];

	    var messages$ = sources.WS.map(function (e) {
	        mMtem.ret(e.data.split(',')).bnd(function (v) {
	            console.log('<><><><><><><><><><><><><><><><>  INCOMING  <><><><><><><> >>> In messages. e amd v are ', e, v);
	            mMZ10.bnd(function () {
	                pMnums.ret([v[3], v[4], v[5], v[6]]).bnd(test3, "MpMstyle");
	                travMonad.run([[v[3], v[4], v[5], v[6]], v[7], v[8], [], 0]);
	                pMscore.ret(v[7]);
	                pMgoals.ret(v[8]);
	            });
	            mMZ12.bnd(function () {
	                return mM6.ret(v[2] + ' successfully logged in.');
	            });
	            mMZ13.bnd(function () {
	                return updateMessages(e.data);
	            });
	            mMZ14.bnd(function () {
	                return mMgoals2.ret('The winner is ' + v[2]);
	            });
	            mMZ15.bnd(function () {
	                mMgoals2.ret('A player named ' + v[2] + ' is currently logged in. Page will refresh in 4 seconds.');
	                refresh();
	            });
	            mMZ17.bnd(function () {
	                return testTask(v[2], v[3], e.data);
	            });
	            mMZ18.bnd(function () {
	                if (pMgroup.x != 'solo' || pMname.x === v[2]) updatePlayers(e.data);
	            });
	        });
	        mMtemp.ret(e.data.split(',')[0]).bnd(next, 'CA#$42', mMZ10).bnd(next, 'CD#$42', mMZ13).bnd(next, 'CE#$42', mMZ14).bnd(next, 'EE#$42', mMZ15).bnd(next, 'DD#$42', mMZ17).bnd(next, 'NN#$42', mMZ18);
	    });

	    function next(x, y, instance) {
	        if (x === y) {
	            instance.release();
	        }
	        return ret(x);
	    };

	    function newRoll(a, b) {
	        socket.send('CA#$42,' + pMgroup.x + ',' + pMname.x + ',6,6,12,20,' + a + ',' + b);
	    }

	    var loginPress$ = sources.DOM.select('input#login').events('keypress');

	    var loginPressAction$ = loginPress$.map(function (e) {
	        var v = e.target.value;
	        if (e.keyCode === 13) {
	            pMname.ret(v);
	            socket.send('CC#$42' + v);
	            pMclicked.ret([]);

	            mMdice.ret('block');
	            mMrightPanel.ret('block');
	            mMgameDiv2.ret('block');
	            mMlogin.ret('none');
	            mMlog1.ret('none');
	            mMlog2.ret('block');

	            /*
	            mMcaptionDiv.ret('block')
	            mMchatDiv.ret('block')
	            mMtodoDiv.ret('block')
	            mMgameDiv.ret('block')
	            mMchat.ret('inline')
	            mMcaption.ret('inline');
	            mMgame.ret('inline')
	            mMtodo.ret('inline')
	            */
	            // document.getElementById('group').focus(); 
	            newRoll(0, 0);
	        }
	    });

	    var groupPress$ = sources.DOM.select('input#group').events('keypress');

	    var groupPressAction$ = groupPress$.map(function (e) {
	        if (e.keyCode === 13) {
	            travMonad.run([[], 0, 0]);
	            socket.send('CO#$42,' + pMgroup.x + ',' + pMname.x + ',' + e.target.value);
	            pMgroup.ret(e.target.value).bnd(function (gr) {
	                return socket.send('CG#$42,' + pMgroup.x + ',' + pMname.x + ',0,0');
	            });
	        }
	    });

	    var messagePress$ = sources.DOM.select('input.inputMessage').events('keydown');

	    var messagePressAction$ = messagePress$.map(function (e) {
	        if (e.keyCode === 13) {
	            socket.send('CD#$42,' + pMgroup.x + ',' + pMname.x + ',' + e.target.value);
	            e.target.value = '';
	            console.log('In messagePressAction$ ', socket.readyState);
	        }
	    });

	    var updatePlayers = function updatePlayers(data) {
	        sMplayers.s.clear();
	        var namesL = data.split("<br>");
	        var namesList = namesL.slice(1);
	        updateScoreboard2(namesList);
	        namesList.forEach(function (player) {
	            return sMplayers.s.add(player.trim());
	        });
	    };

	    var updateScoreboard2 = function updateScoreboard2(v) {
	        var ar = [];
	        var _iteratorNormalCompletion2 = true;
	        var _didIteratorError2 = false;
	        var _iteratorError2 = undefined;

	        try {
	            for (var _iterator2 = v[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                var k = _step2.value;

	                ar.push(['  ' + k]);
	            }
	        } catch (err) {
	            _didIteratorError2 = true;
	            _iteratorError2 = err;
	        } finally {
	            try {
	                if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                    _iterator2.return();
	                }
	            } finally {
	                if (_didIteratorError2) {
	                    throw _iteratorError2;
	                }
	            }
	        }

	        ;
	        pMdata.ret(ar);
	    };

	    var rollClick$ = sources.DOM.select('.roll').events('click');

	    var rollClickAction$ = rollClick$.map(function () {
	        var a = pMscore.x - 1;
	        var b = pMgoals.x;
	        newRoll(a, b);
	    });

	    var numClick$ = sources.DOM.select('.num').events('click');

	    var numClickAction$ = numClick$.map(function (e) {
	        console.log('In numClickAction. @@@@@@@@@@@@@@@@@@@@@@@@ e.target.id, e, and pMnums are ', e.target.id, e, pMnums.x);
	        if (pMclicked.x.length === 2) {
	            return;
	        };
	        pMnums.bnd(spliceM, e.target.id, 1).bnd(function (v) {
	            test3(v, 'MpMstyle');
	            socket.send('CG#$42,' + pMgroup.x + ',' + pMname.x + ',' + pMscore.x + ',' + pMgoals.x);
	            pMclicked.bnd(push, e.target.innerHTML).bnd(pMclicked.ret).bnd(function (w) {
	                travMonad.run([v, pMscore.x, pMgoals.x, w, pMop.x]);
	                if (w.length === 2 && pMop.x != 0) {
	                    updateCalc(w, pMop.x);
	                }
	            });
	        });
	    }).startWith([0, 0, 0, 0]);

	    var opClick$ = sources.DOM.select('.op').events('click');

	    var opClickAction$ = opClick$.map(function (e) {
	        pMop.ret(e.target.innerHTML).bnd(function (v) {
	            var ar = pMclicked.x;
	            if (ar.length === 2) {
	                updateCalc(ar, v);
	            }
	        });
	    });

	    function updateCalc(ar, op) {
	        mMgoals2.ret('');
	        var result = calc(ar[0], op, ar[1]);
	        console.log('RESULT var result in updateCalc *******************************************************', result);

	        if (result === 20 || result === '20') {
	            console.log('IN result == 20 ?????????????????????????????????????????????????????????');
	            pMscore.bnd(add, 1).bnd(testscore).bnd(pMscore.ret).bnd(function (v) {
	                return score(v);
	            });
	            return;
	        } else if (result === 18 || result === '18') {
	            console.log('IN result == 18 ##################i ?????????????????????????????????????????????????????????');
	            pMscore.bnd(add, 3).bnd(testscore).bnd(pMscore.ret).bnd(function (v) {
	                return score(v);
	            });
	            return;
	        } else {
	            pMnums.bnd(push, result).bnd(function (v) {
	                travMonad.run([v, pMscore.x, pMgoals.x, [], 0]);
	                test3(v, 'MpMstyle');
	            });
	        }
	    };

	    function score(scor) {
	        if (scor != 25) {
	            newRoll(scor, pMgoals.x);
	        } else if (pMgoals.x === 2) {
	            socket.send('CE#$42,' + pMgroup.x + ',' + pMname.x);
	            newRoll(0, 0);
	        } else {
	            pMgoals.bnd(add, 1).bnd(pMgoals.ret).bnd(function (g) {
	                return newRoll(0, g);
	            });
	        };
	    };
	    var fib2 = function fib2(v) {
	        if (v[2] > 1) {
	            mMfib.ret([v[1], v[0] + v[1], v[2] - 1]);
	        } else {
	            console.log(v[0]);
	            mM19.ret(v[0]);
	        }
	    };
	    var fibPress$ = sources.DOM.select('input#code').events('keydown');
	    var fibPressAction$ = fibPress$.map(function (e) {
	        if (e.target.value === '') {
	            return;
	        }
	        ;
	        if (e.keyCode === 13) {
	            mM21.ret(e.target.value);
	            fib2([0, 1, e.target.value]);
	        }
	    });
	    // *******************************************n****************************** ENDOM iginal Fibonacci END
	    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> START PRIME FIB  
	    var fibKeyPress5$ = sources.DOM.select('input#fib92').events('keydown');

	    var primeFib$ = fibKeyPress5$.map(function (e) {
	        console.log('In primeFib$ VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV primesMonad.s, primesMonad.a ', primesMonad.s, primesMonad.a);
	        console.log('In primeFib$ VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV fibsMonad.s, fibsMonad.a ', fibsMonad.s, fibsMonad.a);
	        if (e.keyCode === 13) {
	            mMres.ret(fibsMonad.run([1, 2, e.target.value, [0, 1]]).bnd(function (fibsState) {
	                return fibsMonad.bnd(fpTransformer, primesMonad).bnd(function (primesState) {
	                    return tr3(fibsState[3], primesState[3]);
	                });
	            }));
	        }
	    });
	    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ENDOM basic prime END
	    // <>>><>><><><><>>>><><><   prime factors   ><><><><><><>>><<><><><><><><>< START prime factors  
	    var factorsPress$ = sources.DOM.select('input#factors_1').events('keydown');

	    var factorsAction$ = factorsPress$.map(function (e) {
	        var factors = [];
	        mMfactors3.ret('');
	        if (e.keyCode === 13) {
	            var num = e.target.value;
	            if (!num.match(/^[0-9]+$/)) {
	                mMfactors3.ret('This works only if you enter a number. ' + num + ' is not a number');
	            } else {
	                factors = primesMonad.run([primesMonad.s[0], [], num, primesMonad.a]).bnd(function (s) {
	                    return prFactTransformer3(s, num);
	                });
	                mMfactors.ret("The prime factors of " + num + " are " + factors.join(', '));
	            }
	        }
	    });

	    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ENDOM prime factors END
	    // ?<>>><>><><><><>>>><><><  traversal  ><><><><><><>>><><><><><><><><><><><>< START traversal  
	    document.onload = function (event) {
	        console.log('onload event: ', event);
	        mMitterfib5.release(200);

	        var change = function change(a, b) {
	            document.getElementById(a).blur();
	            document.getElementById(b).focus();
	        };

	        // document.getElementById('login').focus(); 
	    };
	    // <>>><>><><><><>>>><><><  traversal  ><><><><><><>>><><><><><><><><><><><>< ENDOM traversal  
	    // <>>><>><><><><>>>><><><  traversal  ><><><><><><>>><><><><><><><><><><><>< START Itterator 


	    mMZ1.bnd(function (v) {
	        return mMt1.bnd(add, v).bnd(function (w) {
	            mMt1.ret(w).bnd(cube).bnd(function (x) {
	                return mMt3.ret(w + ' cubed is ' + x);
	            });
	        });
	    });

	    mMZ2.bnd(function (v) {
	        return cube(v).bnd(function (w) {
	            return mMt3.ret(v + ' cubed is ' + w);
	        });
	    });

	    var testZ = sources.DOM.select('#testZ').events('click');

	    var testZAction$ = testZ.map(function () {
	        console.log('WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW in testZaction$');
	        mMZ1.release(1);
	    });

	    var testQ = sources.DOM.select('#testQ').events('click');

	    var testQAction$ = testQ.map(function () {
	        mMt1.ret(0).bnd(function (v) {
	            return mMZ2.release(v);
	        });
	    });

	    var testW = sources.DOM.select('#testW').events('keypress');

	    var testWAction$ = testW.map(function (e) {
	        if (e.keyCode === 13) {
	            mMZ2.release(e.target.value);
	        }
	    });

	    var solve = function solve() {
	        mMZ3.bnd(function (a) {
	            mMquad4.ret('');
	            mMquad6.ret('');
	            mMquad5.ret(a + " * x * x ");
	            mMZ3.bnd(function (b) {
	                mMquad6.ret(b + ' * x ');
	                mMZ3.bnd(function (c) {
	                    mMtemp.ret([a, b, c]).bnd(fmap, qS4, 'mMtemp2').bnd(function (result) {
	                        var x = result[0];
	                        var y = result[1];
	                        if (x === 0) {
	                            mMquad5.ret('No solution', mMtemp);
	                            mMquad6.ret(' ');
	                            solve();
	                            return;
	                        }
	                        if (y === 0) {
	                            mMquad5.ret('No solution');
	                            mMquad6.ret(' ');
	                            solve();
	                            return;
	                        };
	                        mMquad4.ret("Results: " + x + " and  " + y);
	                        mMquad5.ret((0, _dom.p)(a).text + " * " + x + " * " + x + " + " + (0, _dom.p)(b).text + " * " + x + " " + (0, _dom.p)(c).text + " = 0");
	                        mMquad6.ret((0, _dom.p)(a).text + " * " + y + " * " + y + " + " + (0, _dom.p)(b).text + " * " + y + " " + (0, _dom.p)(c).text + " = 0");
	                        solve();
	                    });
	                });
	            });
	        });
	    };

	    solve();

	    var quad$ = sources.DOM.select('#quad').events('keypress');

	    var quadAction$ = quad$.map(function (e) {
	        if (e.keyCode === 13) {
	            mMZ3.release(e.target.value);
	            document.getElementById('quad').value = null;
	        }
	    });

	    // *******************************************************************BEGIN TODO LIST           

	    var task2 = function task2(str) {
	        socket.send('TD#$42,' + get(pMgroup) + ',' + get(pMname) + ',@' + str);
	    };

	    var newTask$ = sources.DOM.select('input.newTask').events('keydown');

	    var newTaskAction$ = newTask$.map(function (e) {
	        var ob = {};
	        var alert = '';
	        var task = '';
	        if (e.keyCode === 13) {
	            var ar = e.target.value.split(',');
	            if (ar.length < 3) {
	                mMalert.ret('You should enter "author, responsible party, task" separated by commas');
	                return;
	            }
	            var ar2 = ar.slice(2);
	            console.log('*************  newTaskAction$  ************************$$$$$$$$$$$  ar ', ar);
	            if (ar2.length === 1) {
	                task = ar[2];
	            }
	            if (ar2.length > 1) {
	                task = ar2.reduce(function (a, b) {
	                    return a + '$*$*$' + b;
	                });
	            }
	            if (get(mMar2).filter(function (v) {
	                return v.task === task;
	            }).length > 0) {
	                mMalert.ret(task + " is already listed.");
	            } else if (ar.length > 2) {
	                mMcurrentList.bnd(addString, task + ',yellow, none, false,' + ar[0] + ',' + ar[1], mMcurrentList);
	                task2(get(mMcurrentList));
	                e.target.value = '';
	                mMalert.ret('');
	            }
	        }
	    });

	    function testTask(v2, v3, data) {
	        if (v3 === 'no file' || v3 === 'empty') {
	            mMtaskList.ret([]);
	            taskL = (0, _dom.h)('span');
	            return;
	        }
	        if (get(pMgroup) != 'solo' || get(pMgroup) === 'solo' && get(pMname) === v2) {
	            process(data);
	        }
	    };

	    var process = function process(str) {
	        var a = str.split(",");
	        if (a === undefined) {
	            return;
	        };

	        if (a.length < 9) {
	            return;
	        };

	        var ar = a.slice(3);
	        var s = ar.reduce(function (a, b) {
	            return a + ',' + b;
	        });
	        var tempArray = [];
	        mMcurrentList.ret(s);
	        process3(ar);
	    };

	    var process3 = function process3(a) {
	        var ar5 = [];
	        if (a.length % 6 === 0) {
	            var keys = rang(0, a.length / 6);
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
	        } else console.log(a, "is not an appropriate size");
	        mMar2.ret(ar5);
	        process4(ar5);
	    };

	    var process4 = function process4(a) {
	        var tempArray = [];
	        var keys = Object.keys(a);
	        for (var k in keys) {
	            tempArray.push((0, _dom.h)('div.todo', [(0, _dom.h)('span.task3', { style: { color: a[k].color, textDecoration: a[k].textDecoration } }, 'Task: ' + a[k].task), (0, _dom.h)('br'), (0, _dom.h)('button#edit1', 'Edit'), (0, _dom.h)('input#edit2', { props: { type: 'textarea', value: a[k].task }, style: { display: 'none' } }), (0, _dom.h)('span#author.tao', 'Author: ' + a[k].author + ' / ' + 'Responsibility: ' + a[k].responsible), (0, _dom.h)('br'), (0, _dom.h)('input#cb', { props: { type: 'checkbox', checked: a[k].checked }, style: { color: a[k].color,
	                    textDecoration: a[k].textDecoration } }), (0, _dom.h)('label.cbox', { props: { for: '#cb' } }, 'Completed'), (0, _dom.h)('button.delete', 'Delete'), (0, _dom.h)('br'), (0, _dom.h)('hr')]));
	        }

	        mMtaskList.ret(tempArray);
	        taskL = tempArray;
	    };

	    var colorClick$ = sources.DOM.select('#cb').events('click');

	    var colorAction$ = colorClick$.map(function (e) {
	        var ind = getIndex(e);
	        var index = parseInt(ind, 10);
	        var s = get(mMcurrentList);
	        var ar = s.split(',');
	        var n = 6 * index + 3;
	        var j = 6 * index + 2;
	        var k = 6 * index + 1;
	        var checked = ar[n];
	        if (checked === 'true') {
	            ar[n] = 'false';
	            ar[k] = 'yellow';
	            ar[j] = 'none';
	        } else {
	            ar[n] = 'true';
	            ar[k] = 'lightGreen';
	            ar[j] = 'line-through';
	        }
	        task2(ar.reduce(function (a, b) {
	            return a + ',' + b;
	        }));
	    });

	    var edit1$ = sources.DOM.select('#edit1').events('click');

	    var edit1Action$ = edit1$.map(function (e) {
	        var index = getIndex2(e);
	        get(mMtaskList)[index].children[3].elm.style.display = 'block';
	    });

	    var edit2$ = sources.DOM.select('#edit2').events('keypress');

	    var edit2Action$ = edit2$.map(function (e) {
	        var v = noComma(e.target.value);
	        var index = getIndex2(e);
	        if (e.keyCode === 13) {
	            process2(v, index);
	            mMtaskList.x[index].children[3].elm.style.display = 'none';
	            updateScoreboard2(namesList);
	        }
	    });

	    var process2 = function process2(str, index) {
	        var a = mMcurrentList.x.split(',');
	        console.log('In process2 VVVVVVVVVVVV a is ', a);
	        a[6 * index] = str;
	        var b = a.reduce(function (a, b) {
	            return a + ',' + b;
	        });
	        task2(b);
	    };

	    var deleteClick$ = sources.DOM.select('.delete').events('click');

	    var deleteAction$ = deleteClick$.map(function (e) {
	        var index = parseInt(getIndex(e), 10);
	        var s = get(mMcurrentList);
	        var ar = s.split(',');
	        if (ar.length < 7) {
	            task2('empty');
	            socket.send('TX#$42,' + get(pMgroup) + ',' + get(pMname));
	            return;
	        }
	        var str = '';
	        ar.splice(index * 6, 6);
	        task2(ar.reduce(function (a, b) {
	            return a + ',' + b;
	        }));
	    });

	    // **********************************************************************END TODO LIST                       
	    /*  var chatClick$ = sources.DOM
	          .select('#chat2').events('click');
	       var chatClickAction$ = chatClick$.map(function () {
	          var el = document.getElementById('chatDiv');
	          (el.style.display === 'none') ?
	              el.style.display = 'inline' :
	              el.style.display = 'none';
	      });
	       var captionClick$ = sources.DOM
	          .select('#caption').events('click');
	      var captionClickAction$ = captionClick$.map(function () {
	          var el = document.getElementById('captionDiv');
	          (el.style.display === 'none') ?
	              el.style.display = 'inline' :
	              el.style.display = 'none';
	      });
	       var todoClick$ = sources.DOM
	          .select('#todoButton').events('click');
	    
	      var todoClickAction$ = todoClick$.map(function (e) {
	          var el = document.getElementById('todoDiv');
	          (el.style.display === 'none') ?
	              el.style.display = 'inline' :
	              el.style.display = 'none';
	      });
	       var gameClick$ = sources.DOM
	          .select('#game').events('click');
	       var gameClickAction$ = gameClick$.map(function () {
	          var el = document.getElementById('gameDiv');
	          (el.style.display === 'none') ?
	          updateScoreboard2(namesList);
	              el.style.display = 'inline' :
	              el.style.display = 'none';
	          var el2 = document.getElementById('gameDiv2');
	          (el2.style.display === 'none') ?
	              el2.style.display = 'inline' :
	              el2.style.display = 'none';
	      });
	    */

	    var todoClick$ = sources.DOM.select('#todoButton').events('click');

	    var todoClickAction$ = todoClick$.map(function (e) {
	        get(mMtodoDiv) === 'none' ? mMtodoDiv.ret('block') : mMtodoDiv.ret('none');
	    });

	    var chatClick$ = sources.DOM.select('#chat2').events('click');

	    var chatClickAction$ = chatClick$.map(function () {
	        get(mMchatDiv) === 'none' ? mMchatDiv.ret('block') : mMchatDiv.ret('none');
	    });

	    var captionClick$ = sources.DOM.select('#caption').events('click');

	    var captionClickAction$ = captionClick$.map(function () {
	        get(mMcaptionDiv) === 'none' ? mMcaptionDiv.ret('block') : mMcaptionDiv.ret('none');
	    });

	    var gameClick$ = sources.DOM.select('#game').events('click');

	    var gameClickAction$ = gameClick$.map(function () {
	        get(mMgameDiv) === 'none' ? mMgameDiv.ret('block') : mMgameDiv.ret('none');
	    });

	    var clearPicked$ = sources.DOM.select('#clear').events('click');

	    var clearAction$ = clearPicked$.map(function () {
	        console.log('In clearAction$ @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ ', pMclicked.x);
	        // pMclicked.ret([]);
	        travMonad.run([pMnums.x, pMscore.x, pMgoals.x, []]);
	        console.log('In clearAction$ @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ ', pMclicked.x);
	    });

	    var forwardClick$ = sources.DOM.select('#forward').events('click');

	    var backClick$ = sources.DOM.select('#back').events('click');

	    var backAction$ = backClick$.map(function () {
	        if (pMindex.x > 1) {
	            pMop.ret(0);
	            var ind = pMindex.x - 1;
	            var s = travMonad.s[ind];
	            pMnums.ret(s[0]).bnd(test3, 'MpMstyle');
	            pMscore.ret(s[1]);
	            pMgoals.ret(s[2]);
	            pMclicked.ret(s[3]);
	            pMop.ret(s[4]);
	            socket.send('CG#$42,' + pMgroup.x + ',' + pMname.x + ',' + pMscore.x + ',' + pMgoals.x);
	            pMindex.bnd(add, -1);
	        }
	    });

	    var forwardAction$ = forwardClick$.map(function () {
	        console.log('forward button clicked &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
	        if (pMindex.x < travMonad.s.length - 1) {
	            console.log('n the if block &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
	            pMop.ret(0);
	            var ind = pMindex.x + 1;
	            var s = travMonad.s[ind];
	            pMnums.ret(s[0]).bnd(test3, 'MpMstyle');
	            pMscore.ret(s[1]);
	            pMgoals.ret(s[2]);
	            pMclicked.ret(s[3]);
	            pMop.ret(s[4]);
	            socket.send('CG#$42,' + pMgroup.x + ',' + pMname.x + ',' + pMscore.x + ',' + pMgoals.x);
	            pMindex.bnd(add, +1);
	        }
	    });

	    var calcStream$ = (0, _most.merge)(clearAction$, backAction$, forwardAction$, factorsAction$, primeFib$, fibPressAction$, quadAction$, edit1Action$, edit2Action$, testWAction$, testZAction$, testQAction$, colorAction$, deleteAction$, newTaskAction$, chatClickAction$, gameClickAction$, todoClickAction$, captionClickAction$, groupPressAction$, rollClickAction$, messagePressAction$, loginPressAction$, messages$, numClickAction$, opClickAction$);
	    return {
	        DOM: calcStream$.map(function () {
	            return (0, _dom.h)('div.content', [(0, _dom.h)('div#rightPanel', { style: { display: '' + mMrightPanel.x } }, [(0, _dom.h)('span#tog', [(0, _dom.h)('button#game', { style: { fontSize: '16px', display: 'inline' } }, 'TOGGLE GAME'), (0, _dom.h)('span.tao', ' '), (0, _dom.h)('button#todoButton', { style: { fontSize: '16px', display: 'inline' } }, 'TOGGLE TODO_LIST'), (0, _dom.h)('br'), (0, _dom.h)('br'), (0, _dom.h)('button#chat2', { style: { fontSize: '16px', display: 'inline' } }, 'TOGGLE CHAT'), (0, _dom.h)('span.tao', ' '), (0, _dom.h)('button#caption', { style: { fontSize: '16px', display: 'inline' } }, 'TOGGLE CAPTION')]), (0, _dom.h)('br'), (0, _dom.h)('br'), (0, _dom.h)('br'), (0, _dom.h)('br'), (0, _dom.h)('br'), (0, _dom.h)('br'), (0, _dom.h)('br'), (0, _dom.h)('br'), (0, _dom.h)('br'), (0, _dom.h)('br'), (0, _dom.h)('br'), (0, _dom.h)('br'), (0, _dom.h)('br'), (0, _dom.h)('div#gameDiv', { style: { display: 'mMgameDiv.x' } }, [(0, _dom.h)('div.game', 'Name: ' + pMname.x), (0, _dom.h)('div.game', 'Group: ' + pMgroup.x), (0, _dom.h)('div.game', 'Currently online: Name score | goals'), (0, _dom.h)('div.game', '' + pMdata.x)]), (0, _dom.h)('br'), (0, _dom.h)('br'), (0, _dom.h)('div#todoDiv', { style: { display: mMtodoDiv.x } }, [(0, _dom.h)('div#taskList', taskL), (0, _dom.h)('span', 'Author, Responsible Person, Task: '), (0, _dom.h)('input.newTask')]), (0, _dom.h)('br'), (0, _dom.h)('span#alert', mMalert.x), (0, _dom.h)('br'), (0, _dom.h)('span#alert2'), (0, _dom.h)('br'), (0, _dom.h)('div#chatDiv', { style: { display: mMchatDiv.x } }, [(0, _dom.h)('div#messages', [(0, _dom.h)('span', 'Message: '), (0, _dom.h)('input.inputMessage'), (0, _dom.h)('div', messageMonad.s[3])])]), (0, _dom.h)('br'), (0, _dom.h)('br'), (0, _dom.h)('br'), (0, _dom.h)('br'), (0, _dom.h)('div', 'pMclicked.x: ' + pMclicked.x.join(', ')), (0, _dom.h)('div', 'pMop.x: ' + pMop.x), (0, _dom.h)('div', 'pMindex.x: ' + pMindex.x), (0, _dom.h)('div', 'travMonad.s.length: ' + travMonad.s.length), (0, _dom.h)('div', 'travMonad.s[pMindex.x][0]: ' + travMonad.s[pMindex.x][0]), (0, _dom.h)('div', 'travMonad.s[pMindex.x][1]: ' + travMonad.s[pMindex.x][1]), (0, _dom.h)('div', 'travMonad.s[pMindex.x][2]: ' + travMonad.s[pMindex.x][2]), (0, _dom.h)('div', 'travMonad.s[pMindex.x][3]: ' + travMonad.s[pMindex.x][3]), (0, _dom.h)('div', 'travMonad.s[pMindex.x][4]: ' + travMonad.s[pMindex.x][4])]), (0, _dom.h)('div#leftPanel', [(0, _dom.h)('br'), (0, _dom.h)('div#captionDiv', { style: { display: mMcaptionDiv.x } }, [(0, _dom.h)('h1', 'Motorcycle.js With JS-monads')]), (0, _dom.h)('span#italic', ' Not category theory monads. These monads are like the Haskell monads, They use patterns and conform to rules borrowed from category theory. See '), (0, _dom.h)('a', { props: { href: "http://math.andrej.com/2016/08/06/hask-is-not-a-category/", target: "_blank" } }, 'Hask is not a category.'), (0, _dom.h)('span', ' by Andrej Bauer and . '), (0, _dom.h)('a', { props: { href: '#discussion' } }, 'Discussion'), (0, _dom.h)('span', ' below. '), (0, _dom.h)('br'), (0, _dom.h)('br'), (0, _dom.h)('br'), (0, _dom.h)('span.tao1', ' The demonstrations include persisternt, shared todo lists; '), (0, _dom.h)('br'), (0, _dom.h)('span.tao1', ' An interactive simulated dice game with a traversable history (all group members see your score decrease or increase as you navegate backwards and forwards); '), (0, _dom.h)('br'), (0, _dom.h)('span.tao1', ' Chat rooms where members can compete in the simulated dice game, chat, and share a project todo list; '), (0, _dom.h)('br'), (0, _dom.h)('span.tao1', ' And other demonstrations of the power and convenience of JS-monads in a Motorcycle application.  '), (0, _dom.h)('br'), (0, _dom.h)('br'), (0, _dom.h)('span.tao', 'This is a '), (0, _dom.h)('a', { props: { href: "https://github.com/motorcyclejs", target: "_blank" } }, 'Motorcycle.js'), (0, _dom.h)('span', ' application. Motorcycle.js is '), (0, _dom.h)('a', { props: { href: "https://github.com/cyclejs/core", target: "_blank" } }, 'Cycle.js'), (0, _dom.h)('span', ' using '), (0, _dom.h)('a', { props: { href: "https://github.com/cujojs/most", target: "_blank" } }, 'Most'), (0, _dom.h)('span', ' , '), (0, _dom.h)('span', ' and '), (0, _dom.h)('a', { props: { href: "https://github.com/paldepind/snabbdom", target: "_blank" } }, 'Snabbdom'), (0, _dom.h)('span', ' instead of RxJS and virtual-dom.  The code for this repository is at '), (0, _dom.h)('a', { props: { href: "https://github.com/dschalk/JS-monads-stable", target: "_blank" } }, 'JS-monads-stable'), (0, _dom.h)('div#gameDiv2', { style: { display: mMgameDiv2.x } }, [(0, _dom.h)('br'), (0, _dom.h)('span', ' Here are the basic rules:'), (0, _dom.h)('p', 'RULES: If clicking two numbers and an operator (in any order) results in 20 or 18, the score increases by 1 or 3, respectively. If the score becomes 0 or is evenly divisible by 5, 5 points are added. A score of 25 results in one goal. That can only be achieved by arriving at a score of 20, which jumps the score to 25. Directly computing 25 results in a score of 30, and no goal. Each time RL is clicked, one point is deducted. Three goals wins the game. '), (0, _dom.h)('p.red4', mMgoals2.x), (0, _dom.h)('button#0.num', { style: { display: pMstyle.x[0] } }, pMnums.x[0]), (0, _dom.h)('button#1.num', { style: { display: pMstyle.x[1] } }, pMnums.x[1]), (0, _dom.h)('button#2.num', { style: { display: pMstyle.x[2] } }, pMnums.x[2]), (0, _dom.h)('button#3.num', { style: { display: pMstyle.x[3] } }, pMnums.x[3]), (0, _dom.h)('br'), (0, _dom.h)('button#4.op', 'add'), (0, _dom.h)('button#5.op', 'subtract'), (0, _dom.h)('button#5.op', 'mult'), (0, _dom.h)('button#5.op', 'div'), (0, _dom.h)('button#5.op', 'concat'), (0, _dom.h)('br'), (0, _dom.h)('div#dice', { style: { display: mMdice.x } }, [(0, _dom.h)('button.roll', 'ROLL'), (0, _dom.h)('br'), (0, _dom.h)('button#back', 'BACK'), (0, _dom.h)('button#forward', 'FORWARD'), (0, _dom.h)('div.tao', 'Selected numbers: ' + pMclicked.x.join(', ') + ' '), (0, _dom.h)('div.tao', 'Operator: ' + pMop.x + ' '), (0, _dom.h)('button#clear', 'Clear selected numbers (Possibly useful after clicking the BACK button) ')])]), (0, _dom.h)('div#log1', { style: { display: mMlog1.x } }, [(0, _dom.h)('p', 'IN ORDER TO SEE THE GAME, TODOLIST, AND CHAT DEMONSTRATIONS, YOU MUST ENTER SOMETHING .'), (0, _dom.h)('span', 'Name: '), (0, _dom.h)('input#login')]), (0, _dom.h)('p', mM6.x), (0, _dom.h)('div#log2', { style: { display: mMlog2.x } }, [(0, _dom.h)('span', 'Change group: '), (0, _dom.h)('input#group')]), (0, _dom.h)('p', mMsoloAlert.x), (0, _dom.h)('p', 'People who are in the same group, other than solo, share the same todo list, messages, and simulated dice game. In order to see any of these, you must establish an identity on the server by loggin g in. The websockets connection terminates if the first message the server receives does not come from the sign in form. You can enter any random numbers or letters you like. The only check is to make sure someone hasn\t already signed in with whatever you have selected. If you log in with a name that is already in use, a message will appear and this page will be re-loaded in the browser after a four-second pause. '), (0, _dom.h)('p', ' Data for the traversable game history accumulates until a player scores three goals and wins. The data array is then erased and the application is ready to start accumulating a new history. '), (0, _dom.h)('hr'), (0, _dom.h)('h1', 'The Monads'), (0, _dom.h)('h3', ' Monad '), _code2.default.monad, (0, _dom.h)('br'), (0, _dom.h)('span.tao#monad', ' Monad instances facilitate programming in a functional style. They facilitate the linking of computation sequences, memoization (see '), (0, _dom.h)('a', { props: { href: '#state' } }, 'MonadState'), (0, _dom.h)('span', '), error management (see '), (0, _dom.h)('a', { props: { href: '#err' } }, 'MonadEr'), (0, _dom.h)('span', '), and preserving intermediate results in linked sequences of operations ( '), (0, _dom.h)('a', { props: { href: '#demo' } }, 'M prefix demo).'), (0, _dom.h)('p', ' In most sequences of operationns, the arguments provided to each link\'s bnd() method are functions that return an instance of Monad. Here are some examples of functions that return instances of Monad: '), _code2.default.e1, (0, _dom.h)('p', ' I experimented with several definitions of Monad during the course of this project. The reader is encouraged to experiment with variations on the theme. If you come up with something that is useful to you, please let me know. The current version is the most useful for me, so far. its bnd() method can assign the return value of bnd()\'s argument to any valid Javascript variable name. In the following example, m1, m2, and m3 have already been declared. Here is a comparrison of the results obtained when the "M" prefix is used and when it is omitted: '), (0, _dom.h)('pre.red9', '    m1.ret(7).bnd(m2.ret).bnd(m3.ret)  // All three monads get the value 7.\n    m1.ret(0).bnd(add,3,\'m2\').bnd(cube,\'m3\')  // equivalent to m1.ret(0).bnd(add,3).bnd(cube)'), (0, _dom.h)('pre', '    Result: m1.x === 27\n            m2.x === 7\n            m3.x === 7  '), (0, _dom.h)('pre.red9', '    m1.ret(0).bnd(add,3,\'Mm2\').bnd(cube,\'Mm3\')   '), (0, _dom.h)('pre', '    Result: m1.x === 0\n            m2.x === 3\n            m3.x === 27  '), (0, _dom.h)('p', ' If the prefix "M" is absent, bnd() ignores the string argument. But when the "M" prefix is present, m1 retains its initial value, m2 retains the value it gets from from adding m\'s value (which is 0) to 3, and m3.x is the result. Both forms could be useful. '), (0, _dom.h)('p', ' The following example shows lambda expressions sending variables v1 and v2 through a sequence of computations and v3 sending the final result to the string that is logged. It also shows monads a, b, c, d, e, f, and g being updated and preserved in an array that is not affected by further updates. That is because calling the ret() method does not mutate a monad, it creates a fresh instance with the same name. Here is the example, shown in a screen shot of the Chrome console log:. '), (0, _dom.h)('br'), (0, _dom.h)('br'), (0, _dom.h)('img.image', { props: { src: "demo_000.png" } }), (0, _dom.h)('h3', ' The Monad Laws '), (0, _dom.h)('p', ' In the following discussion, "x === y" signifies that the expression x === y returns true. Let J be the collection of all Javascript values, including functions, instances of Monad, etc, and let F be the collection of all functions mapping values in J to instances of Monad with references (names) matching their ids; that is, with window[id] === m.id for some id which is a valid es2015 variable name. The collection of all such instances of Monad along and all of the functions in F is called "M". For any instances of Monad m, m1, and m2 in M and any functions f and g in F, the following relationships follow easily from the definition of Monad: '), (0, _dom.h)('div', 'Left Identity '), (0, _dom.h)('pre.turk', '    m.ret(v, ...args).bnd(f, ...args).x === f(v, ...args).x \n    ret(v, ...args).bnd(f, ...args).x === f(v, ...args).x \n    Examples: m.ret(3).bnd(cube).x === cube(3).x  Tested and verified  \n    ret(3).bnd(cube).x === cube(3).x     Tested and verified\n    Haskell monad law: (return x) >>= f \u2261 f x  '), (0, _dom.h)('div#discussion', ' Right Identity  '), (0, _dom.h)('pre.turk', '    m.bnd(m.ret) === m      Tested and verified \n    m.bnd(m.ret) === m   Tested and verified\n    m.bnd(ret) === m  Tested and verified\n    Haskell monad law: m >>= return \u2261 m '), (0, _dom.h)('div', ' Commutivity  '), (0, _dom.h)('pre.turk', '    m.bnd(f1, ...args).bnd(f2, ...args).x === m.bnd(v => f1(v, ...args).bnd(f2, ...args)).x \n    Example: m.ret(0).bnd(add, 3).bnd(cube).x === \n    m.ret(0).bnd(v => add(v,3).bnd(cube)).x  Tested amd verified\n    Haskell monad law: (m >>= f) >>= g \u2261 m >>= ( \\x -> (f x >>= g) ) '), (0, _dom.h)('a', { props: { href: '#top' } }, 'Back To The Top'), (0, _dom.h)('h3', ' Disussion '), (0, _dom.h)('span.tao', ' The Haskell statement '), (0, _dom.h)('span.turk6', 'f \u2261 g'), (0, _dom.h)('span', ' means that f x === g x for all Haskell values x of the appropriate type. That is the test applied to Javascript expressions in "Monad Laws" section (above). Neither the === nor the === operator would provide useful information about the behavior of instances of Monad, which are objects. Those operators test objects for location in memory. If the left and right sides of predicates create new instances of m, then the left side m and the right side m wind up in different locations in memory. So we expect m.ret(3) === m.ret(3) to return false, and it does. The question we want answered is the question \u2261 answers in Haskell: Can the left and right sides be substituted for one another and still yield the same results.'), (0, _dom.h)('br'), (0, _dom.h)('br'), (0, _dom.h)('span.tao', ' The Haskell programming language borrowed the term "monad" from the branch of mathematics known as category theory. This was apropriate because Haskell monads, along with the function return and the operator >>=, behave quite a bit like category theory monads, and the inspiration for them came out of category theory. For Haskell monads to be category theory monads, they would need to reside in a category-theory category. They don\'t, although the Haskell mystique tends to give newcommers to the language the impression that they do. See '), (0, _dom.h)('a', { props: { href: "http://math.andrej.com/2016/08/06/hask-is-not-a-category/", target: "_blank" } }, 'Hask is not a category.'), (0, _dom.h)('br'), (0, _dom.h)('br'), (0, _dom.h)('span#err', ' Attempts continue to be made to define a Haskell category, usually with special constraints, omitted features, and sometimes with definitions of morphisms that are not Haskell functions. Succeeding in that endeavor would be the first step toward proving that Haskell monads are, in some contrived context, category-theory monads. Devising such a scheme might be an instructive academic excercise, but I don\'t see how it could possibly be of any value beyond that. Imitating definitions and patterns found in category theory, as Haskell does in defining the functor, monoid, and monad type classes, was a stroke of genius that vastly enriched the Haskell programming language and brought it into the mainstream as a viable alternative to java, c++, etc.  This website runs efficiently on a Haskell websockets server. Category theory patterns are less needed, but neverthless useful, in Javascript. Code that adheres to them tends to be robust and versitile.  '),

	            // **************************************************************************** END MONAD       START ERROR   

	            (0, _dom.h)('h2', ' MonadEr - An Error-Catching Monad '), (0, _dom.h)('p', ' Instances of MonadEr function much the same as instances of Monad, but when an instance of MonadEr encounters an error, it ceases to perform any further computations. Instead, it passes through every subsequent stage of a sequence of MonadEr expressions, reporting where it is and repeating the error message. It will continue to do this until it is re-instantiated or until its bnd() method runs on the function clean(). '), (0, _dom.h)('p', 'Functions used as arguments to the MonadEr bnd() method can be placed in quotation marks to prevent the browser engine from throwing reference errors. Arguments can be protected in the same manner. Using MonadEr can prevent the silent proliferation of NaN results in math computations, and can prevent browser crashes due to attempts to evaluate undefined variables. Sometimes crashes are desired when testing code, but MonadEr provides instant feedback pinpointing the exact location of the error. '), (0, _dom.h)('p', ' The following demonstration shows the Chrome console log entries that result from running '), (0, _dom.h)('pre', '    t.bnd(\'add3", 3, \'Mt2\').bnd(cube3, \'Mt3\'\n    t.bnd(\'add3",\'three\', \'Mt2\').bnd(cube3, \'Mt3\'    \n    t.bnd(\'add3",\'Math.sqrt(-1)\', \'Mt2\').bnd(cube3, \'Mt3\' \n    t.bnd(\'addd3", 3, \'Mt2\').bnd(cube3, \'Mt3\' '), (0, _dom.h)('br'), (0, _dom.h)('img.image', { props: { src: "error2.png" } }), (0, _dom.h)('br'), (0, _dom.h)('p.tao1b', ' The monad laws hold for MonadVEr instances. The following relationships were verified in the Chrome console: '), (0, _dom.h)('pre', '    ret3(0,\'t\',[])  // t is now an instance of MonadEr with t.x = 0 and t.e = [].\n\n    t.ret(3).bnd(cube3).x === cube(3).x  \n    ret3(3).bnd(cube3).x === cube3(3).x    \n\n    t.bnd(t.ret) === t   \n    t.bnd(ret) === t  \n   \n    t.ret(0).bnd(add3, 3).bnd(cube3).x === \n    t.ret(0).bnd(v => add3(v,3).bnd(cube3)).x  '), (0, _dom.h)('br'), (0, _dom.h)('div.tao1b', ' Here are the definitions of MonadEr, MonadE\'s helper functions, and the functions which serve as parameters to the bnd() method in the demonstration: '), _code2.default.monadEr, (0, _dom.h)('p', ' and here is the code that produced the Chrome console log entries: '), _code2.default.errorDemo, (0, _dom.h)('span.tao', ' When  a MonadEr instance encounters a function or an argument in quotation marks of types "undefined" or "NaN", a string gets pushed into the instance\'s e attribue. After that, the  bnd() method will not process any function other than clean(). It will stop at the'), (0, _dom.h)('span.turk', 'if (e.length > 0)'), (0, _dom.h)('span', 'block. clean() resets an instance to normal functioning mode by setting its e attribute back to []. '), (0, _dom.h)('br'), (0, _dom.h)('a', { props: { href: '#top' } }, 'Back To The Top'), (0, _dom.h)('h2', 'MonadItter'), _code2.default.monadIt, (0, _dom.h)('p', ' MonadItter instances don\'t link to one another. They exist to facilitate the work of instances of Monad, MonadState, etc. Here\'s how they work: '), (0, _dom.h)('p', 'For any instance of MonadItter, say "it", "it.bnd(func)" causes it.p === func. Calling the method "it.release(...args)" causes p(...args) to run, possibly with arguments supplied by the caller. '), (0, _dom.h)('p', ' As shown later on this page, MonadItter instances control the routing of incoming websockets messages. In one of the demonstrations below, they behave much like ES2015 iterators. I prefer them over ES2015 iterators, at least for what I am demonstrating.'), (0, _dom.h)('h3#itterLink', ' A Basic Itterator '), (0, _dom.h)('p', 'The following example illustrates the use of release() with an argument. It also shows a lambda expressions being provided as an argument for the method mMZ1.bnd() (thereby becoming the value of mMZ1.p), and then mMZ1.release providing an arguments for the function mMZ1.p. The code is shown beneith the following two buttons. '), (0, _dom.h)('button#testZ', 'mMZ1.release(1)'), (0, _dom.h)('p.code2', mMt3.x), (0, _dom.h)('span', 'Refresh button: '), (0, _dom.h)('button#testQ', 'mMt1.ret(0).bnd(v => mMZ2.release(v)) '), (0, _dom.h)('br'), _code2.default.testZ, (0, _dom.h)('span.tao', ' The expression mMt3.x sits permanently in the Motorcycle virtual DOM description. You can call '), (0, _dom.h)('span.green', 'mMZ2.release(v)'), (0, _dom.h)('span', ' by entering a value for v below: '), (0, _dom.h)('br'), (0, _dom.h)('span', 'Please enter an integer here: '), (0, _dom.h)('input#testW'), (0, _dom.h)('p', ' cube() is defined in the Monad section (above). If you click "mMZ1.release(1)" several times, the code (above) will run several times, each time with v === 1. The result, mMt3.x, is shown below the button. mMZ1.p (bnd()\'s argument) remains constant while mMZ1.release(1) is repeatedly called, incrementing the number being cubed each time. '), (0, _dom.h)('p', ' Here is another example. It demonstrates lambda expressions passing values to a remote location for use in a computation. If you enter three numbers consecutively below, call them a, b, and c, then the quadratic equation will be used to find solutions for a*x**2 + b*x + c = 0. The a, b, and c you select might not have a solution. If a and b are positive numbers, you are likely to see solutions if c is a negative number. For example, 12, 12, and -24 yields the solutions 1 and -2. '), (0, _dom.h)('p#quad4.red2', mMquad4.x), (0, _dom.h)('p#quad5.red2', mMquad5.x), (0, _dom.h)('p#quad6.red2', mMquad6.x), (0, _dom.h)('p', 'Run mMZ3.release(v) three times for three numbers. The numbers are a, b, and c in ax*x + b*x + c = 0: '), (0, _dom.h)('input#quad'), (0, _dom.h)('p', 'Here is the code:'), _code2.default.quad, (0, _dom.h)('p', ' fmap (above) facilitated using qS4 in a monadic sequence. qS4 returns an array, not an instance of Monad, but fmap lifts qS4 into the monadic sequence. '), (0, _dom.h)('p', ' The function solve() is recursive. It invokes itself after release() executes three times. The expression "solve()" resets solve to the top, where mMZ3.p becomes a function containing two nested occurrances of mMZ3.bnd. After mMZ3.release() executes, mMZ3.p becomes the function that is the argument to the next occurrance of mMZ3.bnd. That function contains yet another occurrance of mMZ3.bnd. MonadItter is syntactic sugar for nested callbacks. '),

	            // ************************************************************************** START MonadState
	            (0, _dom.h)('a#state', { props: { href: '#monad' } }, 'Back to Monad discussion'), (0, _dom.h)('p#monadstate'), (0, _dom.h)('h2', 'MonadState and MonadState Transformers'), (0, _dom.h)('p', ' An instance of MonadState holds the current state and value of a computation. For any instance of MonadState, say m, these can be accessed through m.s and m.a, respectively.  '), _code2.default.MonadState, (0, _dom.h)('p', ' MonadState reproduces some of the functionality found in the Haskell Module "Control.Monad.State.Lazy", inspired by the paper "Functional Programming with Overloading and Higher-der Polymorphism", Mark P Jones (http://web.cecs.pdx.edu/~mpj/) Advanced School of Functional Programming, 1995. The following demonstrations use the MonadState instances fibsMonad and primesMonad to create and store arrays of Fibonacci numbers and arrays of prime numbers, respectively. fibsMonad and primesMonad provide a simple way to compute lists of prime Fibonacci numbers.  Because the results of computations are stored in the a and s attributes of MonadState instances, it was easy to make sure that no prime number had to be computed more than once in the prime Fibonacci demonstration. '), (0, _dom.h)('p', ' Here is the definition of fibsMonad, along with the definition of the function that becomes fibsMonad.process. '), _code2.default.fibsMonad, (0, _dom.h)('p', ' Another MonadState instance used in this demonstration is primesMonad. Here is its definition along with the function that becomes primesMonad.process:  '), _code2.default.primesMonad, (0, _dom.h)('h3', ' MonadState transformers '), (0, _dom.h)('p', ' Transformers take instances of MonadState and return different instances of MonadState, possibly in a modified state. The method call "fibsMonad.bnd(fpTransformer, primesMonad)" returns primesMonad. Here is the definition of fpTransformer: '), _code2.default.fpTransformer, (0, _dom.h)('p', ' If the largest number in primesMonad.a is less than the square root of the largest number in fibsMonad.a, primesMonad is updated so that the largest number in primesMonad.a is greater than the square root of the largest number in fibsMonad.a. herwise, primesMonad is returned unchanged.  '), (0, _dom.h)('p', ' The final computation in the prime Fibonacci numbers demonstration occurs when "tr3(fibsState[3],primesState[3]" is called. tr3() takes an array of Fibonacci numbers and an array of prime numbers and returns an array containing an array of Fibonacci numbers, an array of prime numbers, and an array of prime Fibonacci numbers. Here is the definition of tr3: '), _code2.default.tr3, (0, _dom.h)('p', ' User input is handled by a chain of computations. first to update fibsMonad, second to extract fibsMonad.s, third to run fpTransformer to modify and then return primesMonad, and fourth to extract primesMonad.s and run tr3(fibsState[3],primesState[3]). Monad instance mMres obtains the result. mMres.x[0], mMres.x[1], and mMres.x[2], are permanent features of the virtual DOM.  Here is the code: '), _code2.default.primeFibInterface, (0, _dom.h)('p', 'Only 48 Fibonacci numbers need to be generated in order to get the eleventh prime Fibonacci number. But 5546 prime numbers need to be generated to test for divisibility into 2971215073. Finding the next Fibonacci number is just a matter of adding the previous two. Getting the next prime number is a more elaborate and time-consuming procedure. In this context, the time needed to compute 48 Fibonacci numbers is insignificant, so I didn\'t bother to save previously computed Fibonacci numbers in the prime Fibonacci demonstration. When a user enters a number smaller than the current length of fibsMonad.a, fibsMonad is modified such that its length becomes exactly what the user entered.'), (0, _dom.h)('p', ' Entering 50 in my desktop Ubuntu Chrome and Firefox browsers got the first eleven prime Fibonacci numbers in about one second. I tried gradually incrementing upwards from 50, but when I got to 61 I stopped due to impatience with the lag time. The 61st Fibonacci number was computed to be 1,548,008,755,920. 76,940 prime numbers were needed to check the 60th Fibonacci number. 96,043 prime numbers were needed to check the 61st Fibonacci number.  At Fibonacci number 61, no new prime Fibonacci numbers had appeared.'), (0, _dom.h)('p', ' According to multiple sources, these are the first eleven proven prime Fibonacci numbers:'), (0, _dom.h)('span.lb', ' 2, 3, 5, 13, 89, 233, 1597, 28657, 514229, 433494437, and 2971215073 '), (0, _dom.h)('br'), (0, _dom.h)('p', ' The number you enter below is the length of the list of Fibonacci numbers you want to generate.  '), (0, _dom.h)('p'), (0, _dom.h)('input#fib92'), (0, _dom.h)('br'), (0, _dom.h)('span#PF_7.red6', 'Fibonacci Numbers'), (0, _dom.h)('br'), (0, _dom.h)('span#PF_9.turk', mMres.x[0]), (0, _dom.h)('br'), (0, _dom.h)('span#PF_8.red6', 'Prime Fibonacci Numbers'), (0, _dom.h)('br'), (0, _dom.h)('span#primeFibs.turk', mMres.x[2]), (0, _dom.h)('br'), (0, _dom.h)('span#PF_21.red6', 'Prime Numbers'), (0, _dom.h)('br'), (0, _dom.h)('span#PF_22.turk', mMres.x[1]), (0, _dom.h)('br'), (0, _dom.h)('p', ' The next demonstration uses two instances of MonadState to find the prime factors of numbers. Each prime factor is listed once.  On my desktop computer, it took several seconds to verify that 514229 is a prime number. After that, due to memoization, numbers below 514229 or not too far above it evaluated rapidly. Here\'s where you can enter a number to see its prime factors: '), (0, _dom.h)('input#factors_1'), (0, _dom.h)('br'), (0, _dom.h)('br'), (0, _dom.h)('div.tao3', mMfactors.x), (0, _dom.h)('div.tao3', mMfactors3.x), (0, _dom.h)('p', ' The demonstration uses primesMonad and factorsMonad. Here are the definitions of factosMonad and factor_state, the function that is factorsMonad.process: '), _code2.default.factorsMonad, (0, _dom.h)('p#async', ' And this is how user input is handled: '), _code2.default.factorsInput, (0, _dom.h)('p', ' The expressions get(mMfactors) and get(mMfactors) are permanent fixtures of the virtual DOM. The click handler is a stream which receives input from the virtual DOM and is merged into the stream that feeds data to the virtual DOM. Since changes to mMfactors and mMfactors3 are in the cycle initiated by user input and culminating in a modification of the virtual DOM, there is no need to explicitly create observers. Reactivity stems from being in the cycle. '), (0, _dom.h)('a', { props: { href: '#top' } }, 'Back To The Top'),

	            // ***********************************************************************************************  MonadArchive


	            (0, _dom.h)('h2', ' MonadArchive '), (0, _dom.h)('h3', ' Traversal of the dice game history. '), (0, _dom.h)('p', ' The state of the simulated dice game is maintained in travMonad, an instance of MonadArchive. Here are the definitions of MonadArchive, travMonad, and the helper function trav_archive: '), _code2.default.monadArchive2, (0, _dom.h)('p', ' The method travMonad.run() executes in: '), (0, _dom.h)('pre', '    messages$.          Runs when a new dice roll comes in from the websockets server.\n    groupPressAction$.  Clears game data when a new group is jointed.\n    nunClickAction$     Updates travMonad when numbers are clicked.\n    clearAction$        Clears saved data when the button under the display is clicked.\n    updateCalc          A function called by numsClickAction$ and opClickAction during game play.  '), (0, _dom.h)('p', ' travMonad keeps a record of the "x" attributes of pMnums (displayed numbers), pMscore, pMgoals, pMclicked (selected numbers), and pMop (the selected operator). Whenever pMnums changes, the expression pMnums.bnd(test3, "MpMstyle") executes, updating pMstyle in order to maintain a well-formated numbers display. In is, therefor, not necessary to keep a record of pMstyle in travMonad. Here is the definition of clear():'), _code2.default.test3, (0, _dom.h)('p', ' Whenever a new roll is requested from the server, a player\'s score and the number of goals is sent to the server. The server responds by sending all group members two messages; one for updating their numbers display, the other for updating their scoreboards. Messages from browsers to the server requesting updated numbers and scoreboard information are prefixed by CA#$42. This serves the interests of efficiency because mew rolls are automaticlly requested when scores change, and score changes are always associate with requests for new numbers. One point is deducted when a player clickes ROLL. '), (0, _dom.h)('p', ' Scores increase whenever players put together expressions that return 18 or 20. An increase in score is accompanied by a call to newRoll() with two arguments: score and goals. The Haskell server updates its ServerState TMVar and broadcasts the new numbers to all group members with the prefix "CA#$42, along with a message prefixed by NN#$42 containing the updated score and goal information. NN#$42 and CA#$42 messages are parsed and acted upon in the message$ stream, where each player\'s travMonad object is augmented by the addition of a new state information array. travMonad.s is an array of arrays containing the collection of these state arrays. '), (0, _dom.h)('p', ' Here is the code that runs when the back button is clicked: '), _code2.default.backAction, (0, _dom.h)('h3', ' Updating the numbers '), (0, _dom.h)('p', ' The following code shows what happens when a player clicks a number: '), _code2.default.numClick1, (0, _dom.h)('p', ' The clicked number is removed from pMnums and added to pMclicked in the numClickAction$ stream. If two numbers and an operator have been selected, numClickAction$ or opClickAction$ (depending on whether the most recent click was on a number or an operator) calls updateCalc with two arguments, the pMclicked.x array of selected numbers and the chosen operator. After each roll, pMop.x is updated to 0. pMop.x != 0 indicates that an operator has been selected. '), _code2.default.numClick2, (0, _dom.h)('p', ' updateCalc calls calc on the numbers and operater provided to it by numCalcAction$ or opCalcAction$.  The return value is assigned to the variable result. If the value of result is 18 or 20, pMscore.x is augmented by 3 or 1, respectively, and checked to see if another five points should be added. score() is then called with the new value of pMscore.x as its argument. score() performs some additional tests to determine whether or not pMgoals.x should be augmented or, if the result is 3, set back to 0 to begin another game. newRoll is called in score() with the (possible newly calculated) values of pMscore.x and pMgoals.x. '),

	            //************************************************************************** END MonadArchive 


	            (0, _dom.h)('h2', ' MonadSet '), (0, _dom.h)('p', ' The list of online group members at the bottom of the scoreboard is very responsive to change. When someone joins the group, changes to a different group, or closes a browser session, a message prefixed by NN#$42 goes out from the server providing group members with the updated list of group members. MonadSet acts upon messages prefixed by NN#$42. Here are the definitions of MonadSet and the MonadSet instance sMplayers '), _code2.default.MonadSet, (0, _dom.h)('a', { props: { href: '#top' } }, 'Back To The Top'), (0, _dom.h)('h3', ' Websocket messages'), (0, _dom.h)('p#demo', ' Incoming websockets messages trigger updates to the game display, the chat display, and the todo list display. The members of a group see what other members are doing; and in the case of the todo list, they see the current list when they sign in to the group. When any member of a group adds a task, crosses it out as completed, edits its description, or removes it, the server updates the persistent file and all members of the group immediately see the revised list.  '), (0, _dom.h)('p', 'The code below shows how incoming websockets messages are routed. For example, mMZ10.release() is called when a new dice roll (prefixed by CA#$42) comes in.   '), _code2.default.messages, (0, _dom.h)('p', ' The "mMZ" prefix designates instances of MonadItter. An instance\'s bnd() method assigns its argument to its "p" attribute. "p" runs if and when its release() method is called. The next() function releases a specified MonadItter instance when the calling monad\'s value matches the specified value in the expression. In the messages$ stream, the MonadItter instance\'s bnd methods do not take argumants, but next is capable of sending arguments when bnd() is called on functions requiring them. Here is an example: '), (0, _dom.h)('a#tdList2', { props: { href: '#itterLink' } }, 'release() with arguments'), (0, _dom.h)('br'), (0, _dom.h)('br'), (0, _dom.h)('a', { props: { href: '#top' } }, 'Back To The Top'), (0, _dom.h)('br'), (0, _dom.h)('br'), (0, _dom.h)('br'), (0, _dom.h)('p'), (0, _dom.h)('p'), (0, _dom.h)('p', '.'), (0, _dom.h)('p', '.'), (0, _dom.h)('p', '.'), (0, _dom.h)('p', '.'), (0, _dom.h)('p', '.'), (0, _dom.h)('p'), (0, _dom.h)('p'), (0, _dom.h)('p'), (0, _dom.h)('p'), (0, _dom.h)('p')])]);
	        })
	    };
	}

	var sources = {
	    DOM: (0, _dom.makeDOMDriver)('#main-container'),
	    WS: websocketsDriver
	};

	_core2.default.run(main, sources);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(34)))

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	(function (global, factory) {
	  ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? factory(exports, __webpack_require__(11)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(11)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.mostDomEvent = global.mostDomEvent || {}, global.most);
	})(undefined, function (exports, most) {
	  'use strict';

	  // domEvent :: (EventTarget t, Event e) => String -> t -> boolean=false -> Stream e

	  var domEvent = function domEvent(event, node, capture) {
	    if (capture === void 0) capture = false;

	    return new most.Stream(new DomEvent(event, node, capture));
	  };

	  var blur = function blur(node, capture) {
	    if (capture === void 0) capture = false;

	    return domEvent('blur', node, capture);
	  };
	  var focus = function focus(node, capture) {
	    if (capture === void 0) capture = false;

	    return domEvent('focus', node, capture);
	  };
	  var focusin = function focusin(node, capture) {
	    if (capture === void 0) capture = false;

	    return domEvent('focusin', node, capture);
	  };
	  var focusout = function focusout(node, capture) {
	    if (capture === void 0) capture = false;

	    return domEvent('focusout', node, capture);
	  };
	  var click = function click(node, capture) {
	    if (capture === void 0) capture = false;

	    return domEvent('click', node, capture);
	  };
	  var dblclick = function dblclick(node, capture) {
	    if (capture === void 0) capture = false;

	    return domEvent('dblclick', node, capture);
	  };
	  var mousedown = function mousedown(node, capture) {
	    if (capture === void 0) capture = false;

	    return domEvent('mousedown', node, capture);
	  };
	  var mouseup = function mouseup(node, capture) {
	    if (capture === void 0) capture = false;

	    return domEvent('mouseup', node, capture);
	  };
	  var mousemove = function mousemove(node, capture) {
	    if (capture === void 0) capture = false;

	    return domEvent('mousemove', node, capture);
	  };
	  var mouseover = function mouseover(node, capture) {
	    if (capture === void 0) capture = false;

	    return domEvent('mouseover', node, capture);
	  };
	  var mouseenter = function mouseenter(node, capture) {
	    if (capture === void 0) capture = false;

	    return domEvent('mouseenter', node, capture);
	  };
	  var mouseout = function mouseout(node, capture) {
	    if (capture === void 0) capture = false;

	    return domEvent('mouseout', node, capture);
	  };
	  var mouseleave = function mouseleave(node, capture) {
	    if (capture === void 0) capture = false;

	    return domEvent('mouseleave', node, capture);
	  };
	  var change = function change(node, capture) {
	    if (capture === void 0) capture = false;

	    return domEvent('change', node, capture);
	  };
	  var select = function select(node, capture) {
	    if (capture === void 0) capture = false;

	    return domEvent('select', node, capture);
	  };
	  var submit = function submit(node, capture) {
	    if (capture === void 0) capture = false;

	    return domEvent('submit', node, capture);
	  };
	  var keydown = function keydown(node, capture) {
	    if (capture === void 0) capture = false;

	    return domEvent('keydown', node, capture);
	  };
	  var keypress = function keypress(node, capture) {
	    if (capture === void 0) capture = false;

	    return domEvent('keypress', node, capture);
	  };
	  var keyup = function keyup(node, capture) {
	    if (capture === void 0) capture = false;

	    return domEvent('keyup', node, capture);
	  };
	  var input = function input(node, capture) {
	    if (capture === void 0) capture = false;

	    return domEvent('input', node, capture);
	  };
	  var contextmenu = function contextmenu(node, capture) {
	    if (capture === void 0) capture = false;

	    return domEvent('contextmenu', node, capture);
	  };
	  var resize = function resize(node, capture) {
	    if (capture === void 0) capture = false;

	    return domEvent('resize', node, capture);
	  };
	  var scroll = function scroll(node, capture) {
	    if (capture === void 0) capture = false;

	    return domEvent('scroll', node, capture);
	  };
	  var error = function error(node, capture) {
	    if (capture === void 0) capture = false;

	    return domEvent('error', node, capture);
	  };

	  var hashchange = function hashchange(node, capture) {
	    if (capture === void 0) capture = false;

	    return domEvent('hashchange', node, capture);
	  };
	  var popstate = function popstate(node, capture) {
	    if (capture === void 0) capture = false;

	    return domEvent('popstate', node, capture);
	  };
	  var load = function load(node, capture) {
	    if (capture === void 0) capture = false;

	    return domEvent('load', node, capture);
	  };
	  var unload = function unload(node, capture) {
	    if (capture === void 0) capture = false;

	    return domEvent('unload', node, capture);
	  };

	  var pointerdown = function pointerdown(node, capture) {
	    if (capture === void 0) capture = false;

	    return domEvent('pointerdown', node, capture);
	  };
	  var pointerup = function pointerup(node, capture) {
	    if (capture === void 0) capture = false;

	    return domEvent('pointerup', node, capture);
	  };
	  var pointermove = function pointermove(node, capture) {
	    if (capture === void 0) capture = false;

	    return domEvent('pointermove', node, capture);
	  };
	  var pointerover = function pointerover(node, capture) {
	    if (capture === void 0) capture = false;

	    return domEvent('pointerover', node, capture);
	  };
	  var pointerenter = function pointerenter(node, capture) {
	    if (capture === void 0) capture = false;

	    return domEvent('pointerenter', node, capture);
	  };
	  var pointerout = function pointerout(node, capture) {
	    if (capture === void 0) capture = false;

	    return domEvent('pointerout', node, capture);
	  };
	  var pointerleave = function pointerleave(node, capture) {
	    if (capture === void 0) capture = false;

	    return domEvent('pointerleave', node, capture);
	  };

	  var touchstart = function touchstart(node, capture) {
	    if (capture === void 0) capture = false;

	    return domEvent('touchstart', node, capture);
	  };
	  var touchend = function touchend(node, capture) {
	    if (capture === void 0) capture = false;

	    return domEvent('touchend', node, capture);
	  };
	  var touchmove = function touchmove(node, capture) {
	    if (capture === void 0) capture = false;

	    return domEvent('touchmove', node, capture);
	  };
	  var touchcancel = function touchcancel(node, capture) {
	    if (capture === void 0) capture = false;

	    return domEvent('touchcancel', node, capture);
	  };

	  var DomEvent = function DomEvent(event, node, capture) {
	    this.event = event;
	    this.node = node;
	    this.capture = capture;
	  };

	  DomEvent.prototype.run = function run(sink, scheduler) {
	    var this$1 = this;

	    var send = function send(e) {
	      return tryEvent(scheduler.now(), e, sink);
	    };
	    var dispose = function dispose() {
	      return this$1.node.removeEventListener(this$1.event, send, this$1.capture);
	    };

	    this.node.addEventListener(this.event, send, this.capture);

	    return { dispose: dispose };
	  };

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

	  Object.defineProperty(exports, '__esModule', { value: true });
	});
	//# sourceMappingURL=mostDomEvent.js.map

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(12)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports, require('@most/multicast'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, global.multicast);
	    global.mostHold = mod.exports;
	  }
	})(undefined, function (exports, _multicast) {
	  'use strict';

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

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

	  // hold :: Stream a -> Stream a
	  var index = function index(stream) {
	    return new stream.constructor(new _multicast.MulticastSource(new Hold(stream.source)));
	  };

	  var Hold = function () {
	    function Hold(source) {
	      _classCallCheck(this, Hold);

	      this.source = source;
	      this.time = -Infinity;
	      this.value = void 0;
	    }

	    _createClass(Hold, [{
	      key: 'run',
	      value: function run(sink, scheduler) {
	        /* istanbul ignore else */
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
	  }();

	  function holdAdd(sink) {
	    var len = this._holdAdd(sink);
	    /* istanbul ignore else */
	    if (this._hold.time >= 0) {
	      sink.event(this._hold.time, this._hold.value);
	    }
	    return len;
	  }

	  function holdEvent(t, x) {
	    /* istanbul ignore else */
	    if (t >= this._hold.time) {
	      this._hold.time = t;
	      this._hold.value = x;
	    }
	    return this._holdEvent(t, x);
	  }

	  exports.default = index;
	});

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _vnode = __webpack_require__(18);

	var _vnode2 = _interopRequireDefault(_vnode);

	var _is = __webpack_require__(13);

	var _is2 = _interopRequireDefault(_is);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	var isObservable = function isObservable(x) {
	  return typeof x.observe === 'function';
	};

	var addNSToObservable = function addNSToObservable(vNode) {
	  addNS(vNode.data, vNode.children); // eslint-disable-line
	};

	function addNS(data, children) {
	  data.ns = 'http://www.w3.org/2000/svg';
	  if (typeof children !== 'undefined' && _is2.default.array(children)) {
	    for (var i = 0; i < children.length; ++i) {
	      if (isObservable(children[i])) {
	        children[i] = children[i].tap(addNSToObservable);
	      } else {
	        addNS(children[i].data, children[i].children);
	      }
	    }
	  }
	}

	/* eslint-disable */
	function h(sel, b, c) {
	  var data = {};
	  var children = void 0;
	  var text = void 0;
	  var i = void 0;
	  if (arguments.length === 3) {
	    data = b;
	    if (_is2.default.array(c)) {
	      children = c;
	    } else if (_is2.default.primitive(c)) {
	      text = c;
	    }
	  } else if (arguments.length === 2) {
	    if (_is2.default.array(b)) {
	      children = b;
	    } else if (_is2.default.primitive(b)) {
	      text = b;
	    } else {
	      data = b;
	    }
	  }
	  if (_is2.default.array(children)) {
	    for (i = 0; i < children.length; ++i) {
	      if (_is2.default.primitive(children[i])) {
	        children[i] = (0, _vnode2.default)(undefined, undefined, undefined, children[i]);
	      }
	    }
	  }
	  if (sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g') {
	    addNS(data, children);
	  }
	  return (0, _vnode2.default)(sel, data || {}, children, text, undefined);
	}
	/* eslint-enable */

	exports.default = h;

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.makeDOMDriver = undefined;

	var _most = __webpack_require__(11);

	var _hold = __webpack_require__(64);

	var _hold2 = _interopRequireDefault(_hold);

	var _snabbdom = __webpack_require__(78);

	var _h = __webpack_require__(41);

	var _h2 = _interopRequireDefault(_h);

	var _classNameFromVNode = __webpack_require__(70);

	var _classNameFromVNode2 = _interopRequireDefault(_classNameFromVNode);

	var _selectorParser2 = __webpack_require__(40);

	var _selectorParser3 = _interopRequireDefault(_selectorParser2);

	var _utils = __webpack_require__(39);

	var _modules = __webpack_require__(38);

	var _modules2 = _interopRequireDefault(_modules);

	var _transposition = __webpack_require__(69);

	var _isolate = __webpack_require__(36);

	var _select = __webpack_require__(68);

	var _events = __webpack_require__(35);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

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

	    var isVNodeAndRootElementIdentical = vNodeId.toUpperCase() === rootElement.id.toUpperCase() && selectorTagName.toUpperCase() === rootElement.tagName.toUpperCase() && vNodeClassName.toUpperCase() === rootElement.className.toUpperCase();

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

	function DOMDriverInputGuard(view$) {
	  if (!view$ || typeof view$.observe !== 'function') {
	    throw new Error('The DOM driver function expects as input an ' + 'Observable of virtual DOM elements');
	  }
	}

	function defaultOnErrorFn(msg) {
	  if (console && console.error) {
	    console.error(msg);
	  } else {
	    console.log(msg);
	  }
	}

	var defaults = {
	  modules: _modules2.default,
	  onError: defaultOnErrorFn
	};

	function makeDOMDriver(container) {
	  var _ref = arguments.length <= 1 || arguments[1] === undefined ? defaults : arguments[1];

	  var _ref$modules = _ref.modules;
	  var modules = _ref$modules === undefined ? _modules2.default : _ref$modules;
	  var _ref$onError = _ref.onError;
	  var onError = _ref$onError === undefined ? defaultOnErrorFn : _ref$onError;

	  var patch = (0, _snabbdom.init)(modules);
	  var rootElement = (0, _utils.domSelectorParser)(container);

	  if (!Array.isArray(modules)) {
	    throw new Error('Optional modules option must be ' + 'an array for snabbdom modules');
	  }

	  if (typeof onError !== 'function') {
	    throw new Error('Optional onError opition must be ' + 'a function to approriately handle your errors');
	  }

	  function DOMDriver(view$) {
	    DOMDriverInputGuard(view$);

	    var rootElement$ = (0, _hold2.default)(view$.map(_transposition.transposeVTree).switch().map(makeVNodeWrapper(rootElement)).scan(patch, rootElement).skip(1).recoverWith(function (err) {
	      onError(err);
	      return (0, _most.throwError)(err);
	    }).map(function (_ref2) {
	      var elm = _ref2.elm;
	      return elm;
	    }));

	    rootElement$.drain();

	    return {
	      observable: rootElement$,
	      namespace: [],
	      select: (0, _select.makeElementSelector)(rootElement$),
	      events: (0, _events.makeEventsSelector)(rootElement$),
	      isolateSink: _isolate.isolateSink,
	      isolateSource: _isolate.isolateSource
	    };
	  }

	  return DOMDriver;
	}

	exports.makeDOMDriver = makeDOMDriver;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.mockDOMSource = undefined;

	var _most = __webpack_require__(11);

	var _most2 = _interopRequireDefault(_most);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	var emptyStream = _most2.default.empty();

	function getEventsStreamForSelector(mockedEventTypes) {
	  return function getEventsStream(eventType) {
	    for (var key in mockedEventTypes) {
	      if (mockedEventTypes.hasOwnProperty(key) && key === eventType) {
	        return mockedEventTypes[key];
	      }
	    }
	    return emptyStream;
	  };
	}

	function makeMockSelector(mockedSelectors) {
	  return function select(selector) {
	    for (var key in mockedSelectors) {
	      if (mockedSelectors.hasOwnProperty(key) && key === selector) {
	        var observable = emptyStream;
	        if (mockedSelectors[key].hasOwnProperty('observable')) {
	          observable = mockedSelectors[key].observable;
	        }
	        return {
	          observable: observable,
	          select: makeMockSelector(mockedSelectors[key]),
	          events: getEventsStreamForSelector(mockedSelectors[key])
	        };
	      }
	    }
	    return {
	      observable: emptyStream,
	      select: makeMockSelector(mockedSelectors),
	      events: function events() {
	        return emptyStream;
	      }
	    };
	  };
	}

	function mockDOMSource() {
	  var mockedSelectors = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  return {
	    observable: emptyStream,
	    select: makeMockSelector(mockedSelectors),
	    events: function events() {
	      return emptyStream;
	    }
	  };
	}

	exports.mockDOMSource = mockDOMSource;

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.makeIsStrictlyInRootScope = exports.makeElementSelector = undefined;

	var _makeIsStrictlyInRootScope = __webpack_require__(37);

	var _events = __webpack_require__(35);

	var _isolate = __webpack_require__(36);

	var isValidString = function isValidString(param) {
	  return typeof param === 'string' && param.length > 0;
	};

	var contains = function contains(str, match) {
	  return str.indexOf(match) > -1;
	};

	var isNotTagName = function isNotTagName(param) {
	  return isValidString(param) && contains(param, '.') || contains(param, '#') || contains(param, ':');
	};

	function sortNamespace(a, b) {
	  if (isNotTagName(a) && isNotTagName(b)) {
	    return 0;
	  }
	  return isNotTagName(a) ? 1 : -1;
	}

	function removeDuplicates(arr) {
	  var newArray = [];
	  arr.forEach(function (element) {
	    if (newArray.indexOf(element) === -1) {
	      newArray.push(element);
	    }
	  });
	  return newArray;
	}

	var getScope = function getScope(namespace) {
	  return namespace.filter(function (c) {
	    return c.indexOf('.cycle-scope') > -1;
	  });
	};

	function makeFindElements(namespace) {
	  return function findElements(rootElement) {
	    if (namespace.join('') === '') {
	      return rootElement;
	    }
	    var slice = Array.prototype.slice;

	    var scope = getScope(namespace);
	    // Uses global selector && is isolated
	    if (namespace.indexOf('*') > -1 && scope.length > 0) {
	      // grab top-level boundary of scope
	      var topNode = rootElement.querySelector(scope.join(' '));
	      // grab all children
	      var childNodes = topNode.getElementsByTagName('*');
	      return removeDuplicates([topNode].concat(slice.call(childNodes))).filter((0, _makeIsStrictlyInRootScope.makeIsStrictlyInRootScope)(namespace));
	    }

	    return removeDuplicates(slice.call(rootElement.querySelectorAll(namespace.join(' '))).concat(slice.call(rootElement.querySelectorAll(namespace.join(''))))).filter((0, _makeIsStrictlyInRootScope.makeIsStrictlyInRootScope)(namespace));
	  };
	}

	function makeElementSelector(rootElement$) {
	  return function elementSelector(selector) {
	    if (typeof selector !== 'string') {
	      throw new Error('DOM driver\'s select() expects the argument to be a ' + 'string as a CSS selector');
	    }

	    var namespace = this.namespace;
	    var trimmedSelector = selector.trim();
	    var childNamespace = trimmedSelector === ':root' ? namespace : namespace.concat(trimmedSelector).sort(sortNamespace);

	    return {
	      observable: rootElement$.map(makeFindElements(childNamespace)),
	      namespace: childNamespace,
	      select: makeElementSelector(rootElement$),
	      events: (0, _events.makeEventsSelector)(rootElement$, childNamespace),
	      isolateSource: _isolate.isolateSource,
	      isolateSink: _isolate.isolateSink
	    };
	  };
	}

	exports.makeElementSelector = makeElementSelector;
	exports.makeIsStrictlyInRootScope = _makeIsStrictlyInRootScope.makeIsStrictlyInRootScope;

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.transposeVTree = undefined;

	var _most = __webpack_require__(11);

	var _most2 = _interopRequireDefault(_most);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function createVTree(vTree, children) {
	  return {
	    sel: vTree.sel,
	    data: vTree.data,
	    text: vTree.text,
	    elm: vTree.elm,
	    key: vTree.key,
	    children: children
	  };
	}

	function transposeVTree(vTree) {
	  if (!vTree) {
	    return null;
	  } else if (vTree && _typeof(vTree.data) === 'object' && vTree.data.static) {
	    return _most2.default.just(vTree);
	  } else if (typeof vTree.observe === 'function') {
	    return vTree.map(transposeVTree).switch();
	  } else if ((typeof vTree === 'undefined' ? 'undefined' : _typeof(vTree)) === 'object') {
	    if (!vTree.children || vTree.children.length === 0) {
	      return _most2.default.just(vTree);
	    }

	    var vTreeChildren = vTree.children.map(transposeVTree).filter(function (x) {
	      return x !== null;
	    });

	    return vTreeChildren.length === 0 ? _most2.default.just(createVTree(vTree, vTreeChildren)) : _most2.default.combineArray(function () {
	      for (var _len = arguments.length, children = Array(_len), _key = 0; _key < _len; _key++) {
	        children[_key] = arguments[_key];
	      }

	      return createVTree(vTree, children);
	    }, vTreeChildren);
	  } else {
	    throw new Error('Unhandled vTree Value');
	  }
	}

	exports.transposeVTree = transposeVTree;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = classNameFromVNode;

	var _selectorParser2 = __webpack_require__(40);

	var _selectorParser3 = _interopRequireDefault(_selectorParser2);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

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

/***/ },
/* 71 */
/***/ function(module, exports) {

	"use strict";

	function createElement(tagName) {
	  return document.createElement(tagName);
	}

	function createElementNS(namespaceURI, qualifiedName) {
	  return document.createElementNS(namespaceURI, qualifiedName);
	}

	function createTextNode(text) {
	  return document.createTextNode(text);
	}

	function insertBefore(parentNode, newNode, referenceNode) {
	  parentNode.insertBefore(newNode, referenceNode);
	}

	function removeChild(node, child) {
	  node.removeChild(child);
	}

	function appendChild(node, child) {
	  node.appendChild(child);
	}

	function parentNode(node) {
	  return node.parentElement;
	}

	function nextSibling(node) {
	  return node.nextSibling;
	}

	function tagName(node) {
	  return node.tagName;
	}

	function setTextContent(node, text) {
	  node.textContent = text;
	}

	module.exports = {
	  createElement: createElement,
	  createElementNS: createElementNS,
	  createTextNode: createTextNode,
	  appendChild: appendChild,
	  removeChild: removeChild,
	  insertBefore: insertBefore,
	  parentNode: parentNode,
	  nextSibling: nextSibling,
	  tagName: tagName,
	  setTextContent: setTextContent
	};

/***/ },
/* 72 */
/***/ function(module, exports) {

	"use strict";

	var booleanAttrs = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "compact", "controls", "declare", "default", "defaultchecked", "defaultmuted", "defaultselected", "defer", "disabled", "draggable", "enabled", "formnovalidate", "hidden", "indeterminate", "inert", "ismap", "itemscope", "loop", "multiple", "muted", "nohref", "noresize", "noshade", "novalidate", "nowrap", "open", "pauseonexit", "readonly", "required", "reversed", "scoped", "seamless", "selected", "sortable", "spellcheck", "translate", "truespeed", "typemustmatch", "visible"];

	var booleanAttrsDict = {};
	for (var i = 0, len = booleanAttrs.length; i < len; i++) {
	  booleanAttrsDict[booleanAttrs[i]] = true;
	}

	function updateAttrs(oldVnode, vnode) {
	  var key,
	      cur,
	      old,
	      elm = vnode.elm,
	      oldAttrs = oldVnode.data.attrs || {},
	      attrs = vnode.data.attrs || {};

	  // update modified attributes, add new attributes
	  for (key in attrs) {
	    cur = attrs[key];
	    old = oldAttrs[key];
	    if (old !== cur) {
	      // TODO: add support to namespaced attributes (setAttributeNS)
	      if (!cur && booleanAttrsDict[key]) elm.removeAttribute(key);else elm.setAttribute(key, cur);
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

	module.exports = { create: updateAttrs, update: updateAttrs };

/***/ },
/* 73 */
/***/ function(module, exports) {

	'use strict';

	function updateClass(oldVnode, vnode) {
	  var cur,
	      name,
	      elm = vnode.elm,
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

	module.exports = { create: updateClass, update: updateClass };

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var is = __webpack_require__(13);

	function arrInvoker(arr) {
	  return function () {
	    // Special case when length is two, for performance
	    arr.length === 2 ? arr[0](arr[1]) : arr[0].apply(undefined, arr.slice(1));
	  };
	}

	function fnInvoker(o) {
	  return function (ev) {
	    o.fn(ev);
	  };
	}

	function updateEventListeners(oldVnode, vnode) {
	  var name,
	      cur,
	      old,
	      elm = vnode.elm,
	      oldOn = oldVnode.data.on || {},
	      on = vnode.data.on;
	  if (!on) return;
	  for (name in on) {
	    cur = on[name];
	    old = oldOn[name];
	    if (old === undefined) {
	      if (is.array(cur)) {
	        elm.addEventListener(name, arrInvoker(cur));
	      } else {
	        cur = { fn: cur };
	        on[name] = cur;
	        elm.addEventListener(name, fnInvoker(cur));
	      }
	    } else if (is.array(old)) {
	      // Deliberately modify old array since it's captured in closure created with `arrInvoker`
	      old.length = cur.length;
	      for (var i = 0; i < old.length; ++i) {
	        old[i] = cur[i];
	      }on[name] = old;
	    } else {
	      old.fn = cur;
	      on[name] = old;
	    }
	  }
	}

	module.exports = { create: updateEventListeners, update: updateEventListeners };

/***/ },
/* 75 */
/***/ function(module, exports) {

	'use strict';

	var raf = typeof window !== 'undefined' && window.requestAnimationFrame || setTimeout;
	var nextFrame = function nextFrame(fn) {
	  raf(function () {
	    raf(fn);
	  });
	};

	function setNextFrame(obj, prop, val) {
	  nextFrame(function () {
	    obj[prop] = val;
	  });
	}

	function getTextNodeRect(textNode) {
	  var rect;
	  if (document.createRange) {
	    var range = document.createRange();
	    range.selectNodeContents(textNode);
	    if (range.getBoundingClientRect) {
	      rect = range.getBoundingClientRect();
	    }
	  }
	  return rect;
	}

	function calcTransformOrigin(isTextNode, textRect, boundingRect) {
	  if (isTextNode) {
	    if (textRect) {
	      //calculate pixels to center of text from left edge of bounding box
	      var relativeCenterX = textRect.left + textRect.width / 2 - boundingRect.left;
	      var relativeCenterY = textRect.top + textRect.height / 2 - boundingRect.top;
	      return relativeCenterX + 'px ' + relativeCenterY + 'px';
	    }
	  }
	  return '0 0'; //top left
	}

	function getTextDx(oldTextRect, newTextRect) {
	  if (oldTextRect && newTextRect) {
	    return oldTextRect.left + oldTextRect.width / 2 - (newTextRect.left + newTextRect.width / 2);
	  }
	  return 0;
	}
	function getTextDy(oldTextRect, newTextRect) {
	  if (oldTextRect && newTextRect) {
	    return oldTextRect.top + oldTextRect.height / 2 - (newTextRect.top + newTextRect.height / 2);
	  }
	  return 0;
	}

	function isTextElement(elm) {
	  return elm.childNodes.length === 1 && elm.childNodes[0].nodeType === 3;
	}

	var removed, created;

	function pre(oldVnode, vnode) {
	  removed = {};
	  created = [];
	}

	function create(oldVnode, vnode) {
	  var hero = vnode.data.hero;
	  if (hero && hero.id) {
	    created.push(hero.id);
	    created.push(vnode);
	  }
	}

	function destroy(vnode) {
	  var hero = vnode.data.hero;
	  if (hero && hero.id) {
	    var elm = vnode.elm;
	    vnode.isTextNode = isTextElement(elm); //is this a text node?
	    vnode.boundingRect = elm.getBoundingClientRect(); //save the bounding rectangle to a new property on the vnode
	    vnode.textRect = vnode.isTextNode ? getTextNodeRect(elm.childNodes[0]) : null; //save bounding rect of inner text node
	    var computedStyle = window.getComputedStyle(elm, null); //get current styles (includes inherited properties)
	    vnode.savedStyle = JSON.parse(JSON.stringify(computedStyle)); //save a copy of computed style values
	    removed[hero.id] = vnode;
	  }
	}

	function post() {
	  var i, id, newElm, oldVnode, oldElm, hRatio, wRatio, oldRect, newRect, dx, dy, origTransform, origTransition, newStyle, oldStyle, newComputedStyle, isTextNode, newTextRect, oldTextRect;
	  for (i = 0; i < created.length; i += 2) {
	    id = created[i];
	    newElm = created[i + 1].elm;
	    oldVnode = removed[id];
	    if (oldVnode) {
	      isTextNode = oldVnode.isTextNode && isTextElement(newElm); //Are old & new both text?
	      newStyle = newElm.style;
	      newComputedStyle = window.getComputedStyle(newElm, null); //get full computed style for new element
	      oldElm = oldVnode.elm;
	      oldStyle = oldElm.style;
	      //Overall element bounding boxes
	      newRect = newElm.getBoundingClientRect();
	      oldRect = oldVnode.boundingRect; //previously saved bounding rect
	      //Text node bounding boxes & distances
	      if (isTextNode) {
	        newTextRect = getTextNodeRect(newElm.childNodes[0]);
	        oldTextRect = oldVnode.textRect;
	        dx = getTextDx(oldTextRect, newTextRect);
	        dy = getTextDy(oldTextRect, newTextRect);
	      } else {
	        //Calculate distances between old & new positions
	        dx = oldRect.left - newRect.left;
	        dy = oldRect.top - newRect.top;
	      }
	      hRatio = newRect.height / Math.max(oldRect.height, 1);
	      wRatio = isTextNode ? hRatio : newRect.width / Math.max(oldRect.width, 1); //text scales based on hRatio
	      // Animate new element
	      origTransform = newStyle.transform;
	      origTransition = newStyle.transition;
	      if (newComputedStyle.display === 'inline') //inline elements cannot be transformed
	        newStyle.display = 'inline-block'; //this does not appear to have any negative side effects
	      newStyle.transition = origTransition + 'transform 0s';
	      newStyle.transformOrigin = calcTransformOrigin(isTextNode, newTextRect, newRect);
	      newStyle.opacity = '0';
	      newStyle.transform = origTransform + 'translate(' + dx + 'px, ' + dy + 'px) ' + 'scale(' + 1 / wRatio + ', ' + 1 / hRatio + ')';
	      setNextFrame(newStyle, 'transition', origTransition);
	      setNextFrame(newStyle, 'transform', origTransform);
	      setNextFrame(newStyle, 'opacity', '1');
	      // Animate old element
	      for (var key in oldVnode.savedStyle) {
	        //re-apply saved inherited properties
	        if (parseInt(key) != key) {
	          var ms = key.substring(0, 2) === 'ms';
	          var moz = key.substring(0, 3) === 'moz';
	          var webkit = key.substring(0, 6) === 'webkit';
	          if (!ms && !moz && !webkit) //ignore prefixed style properties
	            oldStyle[key] = oldVnode.savedStyle[key];
	        }
	      }
	      oldStyle.position = 'absolute';
	      oldStyle.top = oldRect.top + 'px'; //start at existing position
	      oldStyle.left = oldRect.left + 'px';
	      oldStyle.width = oldRect.width + 'px'; //Needed for elements who were sized relative to their parents
	      oldStyle.height = oldRect.height + 'px'; //Needed for elements who were sized relative to their parents
	      oldStyle.margin = 0; //Margin on hero element leads to incorrect positioning
	      oldStyle.transformOrigin = calcTransformOrigin(isTextNode, oldTextRect, oldRect);
	      oldStyle.transform = '';
	      oldStyle.opacity = '1';
	      document.body.appendChild(oldElm);
	      setNextFrame(oldStyle, 'transform', 'translate(' + -dx + 'px, ' + -dy + 'px) scale(' + wRatio + ', ' + hRatio + ')'); //scale must be on far right for translate to be correct
	      setNextFrame(oldStyle, 'opacity', '0');
	      oldElm.addEventListener('transitionend', function (ev) {
	        if (ev.propertyName === 'transform') document.body.removeChild(ev.target);
	      });
	    }
	  }
	  removed = created = undefined;
	}

	module.exports = { pre: pre, create: create, destroy: destroy, post: post };

/***/ },
/* 76 */
/***/ function(module, exports) {

	'use strict';

	function updateProps(oldVnode, vnode) {
	  var key,
	      cur,
	      old,
	      elm = vnode.elm,
	      oldProps = oldVnode.data.props || {},
	      props = vnode.data.props || {};
	  for (key in oldProps) {
	    if (!props[key]) {
	      delete elm[key];
	    }
	  }
	  for (key in props) {
	    cur = props[key];
	    old = oldProps[key];
	    if (old !== cur && (key !== 'value' || elm[key] !== cur)) {
	      elm[key] = cur;
	    }
	  }
	}

	module.exports = { create: updateProps, update: updateProps };

/***/ },
/* 77 */
/***/ function(module, exports) {

	'use strict';

	var raf = typeof window !== 'undefined' && window.requestAnimationFrame || setTimeout;
	var nextFrame = function nextFrame(fn) {
	  raf(function () {
	    raf(fn);
	  });
	};

	function setNextFrame(obj, prop, val) {
	  nextFrame(function () {
	    obj[prop] = val;
	  });
	}

	function updateStyle(oldVnode, vnode) {
	  var cur,
	      name,
	      elm = vnode.elm,
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
	  var style,
	      name,
	      elm = vnode.elm,
	      s = vnode.data.style;
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
	  var name,
	      elm = vnode.elm,
	      idx,
	      i = 0,
	      maxDur = 0,
	      compStyle,
	      style = s.remove,
	      amount = 0,
	      applied = [];
	  for (name in style) {
	    applied.push(name);
	    elm.style[name] = style[name];
	  }
	  compStyle = getComputedStyle(elm);
	  var props = compStyle['transition-property'].split(', ');
	  for (; i < props.length; ++i) {
	    if (applied.indexOf(props[i]) !== -1) amount++;
	  }
	  elm.addEventListener('transitionend', function (ev) {
	    if (ev.target === elm) --amount;
	    if (amount === 0) rm();
	  });
	}

	module.exports = { create: updateStyle, update: updateStyle, destroy: applyDestroyStyle, remove: applyRemoveStyle };

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	// jshint newcap: false
	/* global require, module, document, Node */
	'use strict';

	var VNode = __webpack_require__(18);
	var is = __webpack_require__(13);
	var domApi = __webpack_require__(71);

	function isUndef(s) {
	  return s === undefined;
	}
	function isDef(s) {
	  return s !== undefined;
	}

	var emptyNode = VNode('', {}, [], undefined, undefined);

	function sameVnode(vnode1, vnode2) {
	  return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
	}

	function createKeyToOldIdx(children, beginIdx, endIdx) {
	  var i,
	      map = {},
	      key;
	  for (i = beginIdx; i <= endIdx; ++i) {
	    key = children[i].key;
	    if (isDef(key)) map[key] = i;
	  }
	  return map;
	}

	var hooks = ['create', 'update', 'remove', 'destroy', 'pre', 'post'];

	function init(modules, api) {
	  var i,
	      j,
	      cbs = {};

	  if (isUndef(api)) api = domApi;

	  for (i = 0; i < hooks.length; ++i) {
	    cbs[hooks[i]] = [];
	    for (j = 0; j < modules.length; ++j) {
	      if (modules[j][hooks[i]] !== undefined) cbs[hooks[i]].push(modules[j][hooks[i]]);
	    }
	  }

	  function emptyNodeAt(elm) {
	    return VNode(api.tagName(elm).toLowerCase(), {}, [], undefined, elm);
	  }

	  function createRmCb(childElm, listeners) {
	    return function () {
	      if (--listeners === 0) {
	        var parent = api.parentNode(childElm);
	        api.removeChild(parent, childElm);
	      }
	    };
	  }

	  function createElm(vnode, insertedVnodeQueue) {
	    var i,
	        thunk,
	        data = vnode.data;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.init)) i(vnode);
	      if (isDef(i = data.vnode)) {
	        thunk = vnode;
	        vnode = i;
	      }
	    }
	    var elm,
	        children = vnode.children,
	        sel = vnode.sel;
	    if (isDef(sel)) {
	      // Parse selector
	      var hashIdx = sel.indexOf('#');
	      var dotIdx = sel.indexOf('.', hashIdx);
	      var hash = hashIdx > 0 ? hashIdx : sel.length;
	      var dot = dotIdx > 0 ? dotIdx : sel.length;
	      var tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;
	      elm = vnode.elm = isDef(data) && isDef(i = data.ns) ? api.createElementNS(i, tag) : api.createElement(tag);
	      if (hash < dot) elm.id = sel.slice(hash + 1, dot);
	      if (dotIdx > 0) elm.className = sel.slice(dot + 1).replace(/\./g, ' ');
	      if (is.array(children)) {
	        for (i = 0; i < children.length; ++i) {
	          api.appendChild(elm, createElm(children[i], insertedVnodeQueue));
	        }
	      } else if (is.primitive(vnode.text)) {
	        api.appendChild(elm, api.createTextNode(vnode.text));
	      }
	      for (i = 0; i < cbs.create.length; ++i) {
	        cbs.create[i](emptyNode, vnode);
	      }i = vnode.data.hook; // Reuse variable
	      if (isDef(i)) {
	        if (i.create) i.create(emptyNode, vnode);
	        if (i.insert) insertedVnodeQueue.push(vnode);
	      }
	    } else {
	      elm = vnode.elm = api.createTextNode(vnode.text);
	    }
	    if (isDef(thunk)) thunk.elm = vnode.elm;
	    return vnode.elm;
	  }

	  function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      api.insertBefore(parentElm, createElm(vnodes[startIdx], insertedVnodeQueue), before);
	    }
	  }

	  function invokeDestroyHook(vnode) {
	    var i,
	        j,
	        data = vnode.data;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.destroy)) i(vnode);
	      for (i = 0; i < cbs.destroy.length; ++i) {
	        cbs.destroy[i](vnode);
	      }if (isDef(i = vnode.children)) {
	        for (j = 0; j < vnode.children.length; ++j) {
	          invokeDestroyHook(vnode.children[j]);
	        }
	      }
	      if (isDef(i = data.vnode)) invokeDestroyHook(i);
	    }
	  }

	  function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      var i,
	          listeners,
	          rm,
	          ch = vnodes[startIdx];
	      if (isDef(ch)) {
	        if (isDef(ch.sel)) {
	          invokeDestroyHook(ch);
	          listeners = cbs.remove.length + 1;
	          rm = createRmCb(ch.elm, listeners);
	          for (i = 0; i < cbs.remove.length; ++i) {
	            cbs.remove[i](ch, rm);
	          }if (isDef(i = ch.data) && isDef(i = i.hook) && isDef(i = i.remove)) {
	            i(ch, rm);
	          } else {
	            rm();
	          }
	        } else {
	          // Text node
	          api.removeChild(parentElm, ch.elm);
	        }
	      }
	    }
	  }

	  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {
	    var oldStartIdx = 0,
	        newStartIdx = 0;
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
	      } else if (sameVnode(oldStartVnode, newEndVnode)) {
	        // Vnode moved right
	        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
	        api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm));
	        oldStartVnode = oldCh[++oldStartIdx];
	        newEndVnode = newCh[--newEndIdx];
	      } else if (sameVnode(oldEndVnode, newStartVnode)) {
	        // Vnode moved left
	        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
	        api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
	        oldEndVnode = oldCh[--oldEndIdx];
	        newStartVnode = newCh[++newStartIdx];
	      } else {
	        if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
	        idxInOld = oldKeyToIdx[newStartVnode.key];
	        if (isUndef(idxInOld)) {
	          // New element
	          api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
	          newStartVnode = newCh[++newStartIdx];
	        } else {
	          elmToMove = oldCh[idxInOld];
	          patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
	          oldCh[idxInOld] = undefined;
	          api.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
	          newStartVnode = newCh[++newStartIdx];
	        }
	      }
	    }
	    if (oldStartIdx > oldEndIdx) {
	      before = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
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
	    if (isDef(i = vnode.data) && isDef(i = i.vnode)) {
	      patchVnode(oldVnode, i, insertedVnodeQueue);
	      vnode.elm = i.elm;
	      return;
	    }
	    var elm = vnode.elm = oldVnode.elm,
	        oldCh = oldVnode.children,
	        ch = vnode.children;
	    if (oldVnode === vnode) return;
	    if (!sameVnode(oldVnode, vnode)) {
	      var parentElm = api.parentNode(oldVnode.elm);
	      elm = createElm(vnode, insertedVnodeQueue);
	      api.insertBefore(parentElm, elm, oldVnode.elm);
	      removeVnodes(parentElm, [oldVnode], 0, 0);
	      return;
	    }
	    if (isDef(vnode.data)) {
	      for (i = 0; i < cbs.update.length; ++i) {
	        cbs.update[i](oldVnode, vnode);
	      }i = vnode.data.hook;
	      if (isDef(i) && isDef(i = i.update)) i(oldVnode, vnode);
	    }
	    if (isUndef(vnode.text)) {
	      if (isDef(oldCh) && isDef(ch)) {
	        if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue);
	      } else if (isDef(ch)) {
	        if (isDef(oldVnode.text)) api.setTextContent(elm, '');
	        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
	      } else if (isDef(oldCh)) {
	        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
	      } else if (isDef(oldVnode.text)) {
	        api.setTextContent(elm, '');
	      }
	    } else if (oldVnode.text !== vnode.text) {
	      api.setTextContent(elm, vnode.text);
	    }
	    if (isDef(hook) && isDef(i = hook.postpatch)) {
	      i(oldVnode, vnode);
	    }
	  }

	  return function (oldVnode, vnode) {
	    var i, elm, parent;
	    var insertedVnodeQueue = [];
	    for (i = 0; i < cbs.pre.length; ++i) {
	      cbs.pre[i]();
	    }if (isUndef(oldVnode.sel)) {
	      oldVnode = emptyNodeAt(oldVnode);
	    }

	    if (sameVnode(oldVnode, vnode)) {
	      patchVnode(oldVnode, vnode, insertedVnodeQueue);
	    } else {
	      elm = oldVnode.elm;
	      parent = api.parentNode(elm);

	      createElm(vnode, insertedVnodeQueue);

	      if (parent !== null) {
	        api.insertBefore(parent, vnode.elm, api.nextSibling(elm));
	        removeVnodes(parent, [oldVnode], 0, 0);
	      }
	    }

	    for (i = 0; i < insertedVnodeQueue.length; ++i) {
	      insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);
	    }
	    for (i = 0; i < cbs.post.length; ++i) {
	      cbs.post[i]();
	    }return vnode;
	  };
	}

	module.exports = { init: init };

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var h = __webpack_require__(41);

	function init(thunk) {
	  var i,
	      cur = thunk.data;
	  cur.vnode = cur.fn.apply(undefined, cur.args);
	}

	function prepatch(oldThunk, thunk) {
	  var i,
	      old = oldThunk.data,
	      cur = thunk.data;
	  var oldArgs = old.args,
	      args = cur.args;
	  cur.vnode = old.vnode;
	  if (old.fn !== cur.fn || oldArgs.length !== args.length) {
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

	module.exports = function (name, fn /* args */) {
	  var i,
	      args = [];
	  for (i = 2; i < arguments.length; ++i) {
	    args[i - 2] = arguments[i];
	  }
	  return h('thunk' + name, {
	    hook: { init: init, prepatch: prepatch },
	    fn: fn, args: args
	  });
	};

/***/ },
/* 80 */
/***/ function(module, exports) {

	"use strict";

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
	module.exports = function split(undef) {

	  var nativeSplit = String.prototype.split,
	      compliantExecNpcg = /()??/.exec("")[1] === undef,

	  // NPCG: nonparticipating capturing group
	  self;

	  self = function self(str, separator, limit) {
	    // If `separator` is not a regex, use `nativeSplit`
	    if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
	      return nativeSplit.call(str, separator, limit);
	    }
	    var output = [],
	        flags = (separator.ignoreCase ? "i" : "") + (separator.multiline ? "m" : "") + (separator.extended ? "x" : "") + ( // Proposed for ES6
	    separator.sticky ? "y" : ""),

	    // Firefox 3+
	    lastLastIndex = 0,

	    // Make `global` and avoid `lastIndex` issues by working with a copy
	    separator = new RegExp(separator.source, flags + "g"),
	        separator2,
	        match,
	        lastIndex,
	        lastLength;
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
	          match[0].replace(separator2, function () {
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
	}();

/***/ },
/* 81 */
/***/ function(module, exports) {

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

	var TAG_NAMES = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'dd', 'del', 'dfn', 'dir', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'menu', 'meta', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'p', 'param', 'pre', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'title', 'tr', 'u', 'ul', 'video', 'progress'];

	exports['default'] = function (h) {
	  var createTag = node(h);
	  var exported = { TAG_NAMES: TAG_NAMES, isSelector: isSelector, createTag: createTag };
	  TAG_NAMES.forEach(function (n) {
	    exported[n] = createTag(n);
	  });
	  return exported;
	};

	module.exports = exports['default'];

/***/ },
/* 82 */
/***/ function(module, exports) {

	'use strict';

	var proto = Element.prototype;
	var vendor = proto.matches || proto.matchesSelector || proto.webkitMatchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector;

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

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var SubjectSource_1 = __webpack_require__(42);
	var util_1 = __webpack_require__(43);
	var HoldSubjectSource = function (_super) {
	    __extends(HoldSubjectSource, _super);
	    function HoldSubjectSource(bufferSize) {
	        _super.call(this);
	        this.buffer = [];
	        this.bufferSize = bufferSize;
	    }
	    HoldSubjectSource.prototype.add = function (sink) {
	        var buffer = this.buffer;
	        if (buffer.length > 0) {
	            util_1.pushEvents(buffer, sink);
	        }
	        return _super.prototype.add.call(this, sink);
	    };
	    HoldSubjectSource.prototype.next = function (value) {
	        if (this.scheduler === void 0) {
	            return;
	        }
	        var time = this.scheduler.now();
	        this.buffer = util_1.dropAndAppend({ time: time, value: value }, this.buffer, this.bufferSize);
	        if (this.active) {
	            this._next(time, value);
	        }
	    };
	    return HoldSubjectSource;
	}(SubjectSource_1.BasicSubjectSource);
	exports.HoldSubjectSource = HoldSubjectSource;
	//# sourceMappingURL=HoldSubjectSource.js.map

/***/ },
/* 84 */
/***/ function(module, exports) {

	"use strict";

	var SubjectDisposable = function () {
	    function SubjectDisposable(source, sink) {
	        this.source = source;
	        this.sink = sink;
	        this.disposed = false;
	    }
	    SubjectDisposable.prototype.dispose = function () {
	        if (this.disposed) return;
	        this.disposed = true;
	        var remaining = this.source.remove(this.sink);
	        return remaining === 0 && this.source._dispose();
	    };
	    return SubjectDisposable;
	}();
	exports.SubjectDisposable = SubjectDisposable;
	//# sourceMappingURL=SubjectDisposable.js.map

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var most_1 = __webpack_require__(112);
	var SubjectSource_1 = __webpack_require__(42);
	exports.BasicSubjectSource = SubjectSource_1.BasicSubjectSource;
	var HoldSubjectSource_1 = __webpack_require__(83);
	exports.HoldSubjectSource = HoldSubjectSource_1.HoldSubjectSource;
	function subject() {
	    return new Subject(new SubjectSource_1.BasicSubjectSource());
	}
	exports.subject = subject;
	function holdSubject(bufferSize) {
	    if (bufferSize === void 0) {
	        bufferSize = 1;
	    }
	    if (bufferSize <= 0) {
	        throw new Error('bufferSize must be an integer 1 or greater');
	    }
	    return new Subject(new HoldSubjectSource_1.HoldSubjectSource(bufferSize));
	}
	exports.holdSubject = holdSubject;
	var Subject = function (_super) {
	    __extends(Subject, _super);
	    function Subject(source) {
	        _super.call(this, source);
	    }
	    Subject.prototype.next = function (value) {
	        this.source.next(value);
	    };
	    Subject.prototype.error = function (err) {
	        this.source.error(err);
	    };
	    Subject.prototype.complete = function (value) {
	        this.source.complete(value);
	    };
	    return Subject;
	}(most_1.Stream);
	exports.Subject = Subject;
	//# sourceMappingURL=index.js.map

/***/ },
/* 86 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = LinkedList;
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

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
	LinkedList.prototype.add = function (x) {
	  if (this.head !== null) {
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
	LinkedList.prototype.remove = function (x) {
	  // eslint-disable-line  complexity
	  --this.length;
	  if (x === this.head) {
	    this.head = this.head.next;
	  }
	  if (x.next !== null) {
	    x.next.prev = x.prev;
	    x.next = null;
	  }
	  if (x.prev !== null) {
	    x.prev.next = x.next;
	    x.prev = null;
	  }
	};

	/**
	 * @returns {boolean} true iff there are no nodes in the list
	 */
	LinkedList.prototype.isEmpty = function () {
	  return this.length === 0;
	};

	/**
	 * Dispose all nodes
	 * @returns {Promise} promise that fulfills when all nodes have been disposed,
	 *  or rejects if an error occurs while disposing
	 */
	LinkedList.prototype.dispose = function () {
	  if (this.isEmpty()) {
	    return Promise.resolve();
	  }

	  var promises = [];
	  var x = this.head;
	  this.head = null;
	  this.length = 0;

	  while (x !== null) {
	    promises.push(x.dispose());
	    x = x.next;
	  }

	  return Promise.all(promises);
	};

/***/ },
/* 87 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isPromise = isPromise;
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function isPromise(p) {
	  return p !== null && (typeof p === 'undefined' ? 'undefined' : _typeof(p)) === 'object' && typeof p.then === 'function';
	}

/***/ },
/* 88 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Queue;
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	// Based on https://github.com/petkaantonov/deque

	function Queue(capPow2) {
	  this._capacity = capPow2 || 32;
	  this._length = 0;
	  this._head = 0;
	}

	Queue.prototype.push = function (x) {
	  var len = this._length;
	  this._checkCapacity(len + 1);

	  var i = this._head + len & this._capacity - 1;
	  this[i] = x;
	  this._length = len + 1;
	};

	Queue.prototype.shift = function () {
	  var head = this._head;
	  var x = this[head];

	  this[head] = void 0;
	  this._head = head + 1 & this._capacity - 1;
	  this._length--;
	  return x;
	};

	Queue.prototype.isEmpty = function () {
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
	    copy(this, 0, this, oldCapacity, last & oldCapacity - 1);
	  }
	};

	function copy(src, srcIndex, dst, dstIndex, len) {
	  for (var j = 0; j < len; ++j) {
	    dst[j + dstIndex] = src[j + srcIndex];
	    src[j + srcIndex] = void 0;
	  }
	}

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.scan = scan;
	exports.reduce = reduce;

	var _Stream = __webpack_require__(1);

	var _Stream2 = _interopRequireDefault(_Stream);

	var _Pipe = __webpack_require__(6);

	var _Pipe2 = _interopRequireDefault(_Pipe);

	var _runSource = __webpack_require__(49);

	var _dispose = __webpack_require__(4);

	var dispose = _interopRequireWildcard(_dispose);

	var _PropagateTask = __webpack_require__(7);

	var _PropagateTask2 = _interopRequireDefault(_PropagateTask);

	function _interopRequireWildcard(obj) {
	  if (obj && obj.__esModule) {
	    return obj;
	  } else {
	    var newObj = {};if (obj != null) {
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	      }
	    }newObj.default = obj;return newObj;
	  }
	}

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	/**
	 * Create a stream containing successive reduce results of applying f to
	 * the previous reduce result and the current stream item.
	 * @param {function(result:*, x:*):*} f reducer function
	 * @param {*} initial initial value
	 * @param {Stream} stream stream to scan
	 * @returns {Stream} new stream containing successive reduce results
	 */
	function scan(f, initial, stream) {
	  return new _Stream2.default(new Scan(f, initial, stream.source));
	} /** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function Scan(f, z, source) {
	  this.source = source;
	  this.f = f;
	  this.value = z;
	}

	Scan.prototype.run = function (sink, scheduler) {
	  var d1 = scheduler.asap(_PropagateTask2.default.event(this.value, sink));
	  var d2 = this.source.run(new ScanSink(this.f, this.value, sink), scheduler);
	  return dispose.all([d1, d2]);
	};

	function ScanSink(f, z, sink) {
	  this.f = f;
	  this.value = z;
	  this.sink = sink;
	}

	ScanSink.prototype.event = function (t, x) {
	  var f = this.f;
	  this.value = f(this.value, x);
	  this.sink.event(t, this.value);
	};

	ScanSink.prototype.error = _Pipe2.default.prototype.error;
	ScanSink.prototype.end = _Pipe2.default.prototype.end;

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
	  return (0, _runSource.withDefaultScheduler)(new Reduce(f, initial, stream.source));
	}

	function Reduce(f, z, source) {
	  this.source = source;
	  this.f = f;
	  this.value = z;
	}

	Reduce.prototype.run = function (sink, scheduler) {
	  return this.source.run(new ReduceSink(this.f, this.value, sink), scheduler);
	};

	function ReduceSink(f, z, sink) {
	  this.f = f;
	  this.value = z;
	  this.sink = sink;
	}

	ReduceSink.prototype.event = function (t, x) {
	  var f = this.f;
	  this.value = f(this.value, x);
	  this.sink.event(t, this.value);
	};

	ReduceSink.prototype.error = _Pipe2.default.prototype.error;

	ReduceSink.prototype.end = function (t) {
	  this.sink.end(t, this.value);
	};

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ap = ap;

	var _combine = __webpack_require__(44);

	var _prelude = __webpack_require__(2);

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
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function ap(fs, xs) {
	  return (0, _combine.combine)(_prelude.apply, fs, xs);
	}

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.cons = cons;
	exports.concat = concat;

	var _core = __webpack_require__(9);

	var _continueWith = __webpack_require__(45);

	/**
	 * @param {*} x value to prepend
	 * @param {Stream} stream
	 * @returns {Stream} new stream with x prepended
	 */
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function cons(x, stream) {
	  return concat((0, _core.of)(x), stream);
	}

	/**
	* @param {Stream} left
	* @param {Stream} right
	* @returns {Stream} new stream containing all events in left followed by all
	*  events in right.  This *timeshifts* right to the end of left.
	*/
	function concat(left, right) {
	  return (0, _continueWith.continueWith)(function () {
	    return right;
	  }, left);
	}

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.concatMap = concatMap;

	var _mergeConcurrently = __webpack_require__(19);

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
	  return (0, _mergeConcurrently.mergeMapConcurrently)(f, 1, stream);
	} /** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.delay = delay;

	var _Stream = __webpack_require__(1);

	var _Stream2 = _interopRequireDefault(_Stream);

	var _Pipe = __webpack_require__(6);

	var _Pipe2 = _interopRequireDefault(_Pipe);

	var _dispose = __webpack_require__(4);

	var dispose = _interopRequireWildcard(_dispose);

	var _PropagateTask = __webpack_require__(7);

	var _PropagateTask2 = _interopRequireDefault(_PropagateTask);

	function _interopRequireWildcard(obj) {
	  if (obj && obj.__esModule) {
	    return obj;
	  } else {
	    var newObj = {};if (obj != null) {
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	      }
	    }newObj.default = obj;return newObj;
	  }
	}

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	/**
	 * @param {Number} delayTime milliseconds to delay each item
	 * @param {Stream} stream
	 * @returns {Stream} new stream containing the same items, but delayed by ms
	 */
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function delay(delayTime, stream) {
	  return delayTime <= 0 ? stream : new _Stream2.default(new Delay(delayTime, stream.source));
	}

	function Delay(dt, source) {
	  this.dt = dt;
	  this.source = source;
	}

	Delay.prototype.run = function (sink, scheduler) {
	  var delaySink = new DelaySink(this.dt, sink, scheduler);
	  return dispose.all([delaySink, this.source.run(delaySink, scheduler)]);
	};

	function DelaySink(dt, sink, scheduler) {
	  this.dt = dt;
	  this.sink = sink;
	  this.scheduler = scheduler;
	}

	DelaySink.prototype.dispose = function () {
	  var self = this;
	  this.scheduler.cancelAll(function (task) {
	    return task.sink === self.sink;
	  });
	};

	DelaySink.prototype.event = function (t, x) {
	  this.scheduler.delay(this.dt, _PropagateTask2.default.event(x, this.sink));
	};

	DelaySink.prototype.end = function (t, x) {
	  this.scheduler.delay(this.dt, _PropagateTask2.default.end(x, this.sink));
	};

	DelaySink.prototype.error = _Pipe2.default.prototype.error;

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.flatMapError = undefined;
	exports.recoverWith = recoverWith;
	exports.throwError = throwError;

	var _Stream = __webpack_require__(1);

	var _Stream2 = _interopRequireDefault(_Stream);

	var _SafeSink = __webpack_require__(121);

	var _SafeSink2 = _interopRequireDefault(_SafeSink);

	var _dispose = __webpack_require__(4);

	var dispose = _interopRequireWildcard(_dispose);

	var _tryEvent = __webpack_require__(25);

	var tryEvent = _interopRequireWildcard(_tryEvent);

	var _PropagateTask = __webpack_require__(7);

	var _PropagateTask2 = _interopRequireDefault(_PropagateTask);

	function _interopRequireWildcard(obj) {
	  if (obj && obj.__esModule) {
	    return obj;
	  } else {
	    var newObj = {};if (obj != null) {
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	      }
	    }newObj.default = obj;return newObj;
	  }
	}

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	/**
	 * If stream encounters an error, recover and continue with items from stream
	 * returned by f.
	 * @param {function(error:*):Stream} f function which returns a new stream
	 * @param {Stream} stream
	 * @returns {Stream} new stream which will recover from an error by calling f
	 */
	function recoverWith(f, stream) {
	  return new _Stream2.default(new RecoverWith(f, stream.source));
	} /** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var flatMapError = exports.flatMapError = recoverWith;

	/**
	 * Create a stream containing only an error
	 * @param {*} e error value, preferably an Error or Error subtype
	 * @returns {Stream} new stream containing only an error
	 */
	function throwError(e) {
	  return new _Stream2.default(new ErrorSource(e));
	}

	function ErrorSource(e) {
	  this.value = e;
	}

	ErrorSource.prototype.run = function (sink, scheduler) {
	  return scheduler.asap(new _PropagateTask2.default(runError, this.value, sink));
	};

	function runError(t, e, sink) {
	  sink.error(t, e);
	}

	function RecoverWith(f, source) {
	  this.f = f;
	  this.source = source;
	}

	RecoverWith.prototype.run = function (sink, scheduler) {
	  return new RecoverWithSink(this.f, this.source, sink, scheduler);
	};

	function RecoverWithSink(f, source, sink, scheduler) {
	  this.f = f;
	  this.sink = new _SafeSink2.default(sink);
	  this.scheduler = scheduler;
	  this.disposable = source.run(this, scheduler);
	}

	RecoverWithSink.prototype.event = function (t, x) {
	  tryEvent.tryEvent(t, x, this.sink);
	};

	RecoverWithSink.prototype.end = function (t, x) {
	  tryEvent.tryEnd(t, x, this.sink);
	};

	RecoverWithSink.prototype.error = function (t, e) {
	  var nextSink = this.sink.disable();

	  dispose.tryDispose(t, this.disposable, this.sink);
	  this._startNext(t, e, nextSink);
	};

	RecoverWithSink.prototype._startNext = function (t, x, sink) {
	  try {
	    this.disposable = this._continue(this.f, x, sink);
	  } catch (e) {
	    sink.error(t, e);
	  }
	};

	RecoverWithSink.prototype._continue = function (f, x, sink) {
	  var stream = f(x);
	  return stream.source.run(sink, this.scheduler);
	};

	RecoverWithSink.prototype.dispose = function () {
	  return this.disposable.dispose();
	};

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.filter = filter;
	exports.skipRepeats = skipRepeats;
	exports.skipRepeatsWith = skipRepeatsWith;

	var _Stream = __webpack_require__(1);

	var _Stream2 = _interopRequireDefault(_Stream);

	var _Pipe = __webpack_require__(6);

	var _Pipe2 = _interopRequireDefault(_Pipe);

	var _Filter = __webpack_require__(47);

	var _Filter2 = _interopRequireDefault(_Filter);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	/**
	 * Retain only items matching a predicate
	 * @param {function(x:*):boolean} p filtering predicate called for each item
	 * @param {Stream} stream stream to filter
	 * @returns {Stream} stream containing only items for which predicate returns truthy
	 */
	function filter(p, stream) {
	  return new _Stream2.default(_Filter2.default.create(p, stream.source));
	}

	/**
	 * Skip repeated events, using === to detect duplicates
	 * @param {Stream} stream stream from which to omit repeated events
	 * @returns {Stream} stream without repeated events
	 */
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

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
	  return new _Stream2.default(new SkipRepeats(equals, stream.source));
	}

	function SkipRepeats(equals, source) {
	  this.equals = equals;
	  this.source = source;
	}

	SkipRepeats.prototype.run = function (sink, scheduler) {
	  return this.source.run(new SkipRepeatsSink(this.equals, sink), scheduler);
	};

	function SkipRepeatsSink(equals, sink) {
	  this.equals = equals;
	  this.sink = sink;
	  this.value = void 0;
	  this.init = true;
	}

	SkipRepeatsSink.prototype.end = _Pipe2.default.prototype.end;
	SkipRepeatsSink.prototype.error = _Pipe2.default.prototype.error;

	SkipRepeatsSink.prototype.event = function (t, x) {
	  if (this.init) {
	    this.init = false;
	    this.value = x;
	    this.sink.event(t, x);
	  } else if (!this.equals(this.value, x)) {
	    this.value = x;
	    this.sink.event(t, x);
	  }
	};

	function same(a, b) {
	  return a === b;
	}

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.throttle = throttle;
	exports.debounce = debounce;

	var _Stream = __webpack_require__(1);

	var _Stream2 = _interopRequireDefault(_Stream);

	var _Pipe = __webpack_require__(6);

	var _Pipe2 = _interopRequireDefault(_Pipe);

	var _dispose = __webpack_require__(4);

	var dispose = _interopRequireWildcard(_dispose);

	var _PropagateTask = __webpack_require__(7);

	var _PropagateTask2 = _interopRequireDefault(_PropagateTask);

	var _Map = __webpack_require__(21);

	var _Map2 = _interopRequireDefault(_Map);

	function _interopRequireWildcard(obj) {
	  if (obj && obj.__esModule) {
	    return obj;
	  } else {
	    var newObj = {};if (obj != null) {
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	      }
	    }newObj.default = obj;return newObj;
	  }
	}

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	/**
	 * Limit the rate of events by suppressing events that occur too often
	 * @param {Number} period time to suppress events
	 * @param {Stream} stream
	 * @returns {Stream}
	 */
	function throttle(period, stream) {
	  return new _Stream2.default(throttleSource(period, stream.source));
	} /** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function throttleSource(period, source) {
	  return source instanceof _Map2.default ? commuteMapThrottle(period, source) : source instanceof Throttle ? fuseThrottle(period, source) : new Throttle(period, source);
	}

	function commuteMapThrottle(period, source) {
	  return _Map2.default.create(source.f, throttleSource(period, source.source));
	}

	function fuseThrottle(period, source) {
	  return new Throttle(Math.max(period, source.period), source.source);
	}

	function Throttle(period, source) {
	  this.period = period;
	  this.source = source;
	}

	Throttle.prototype.run = function (sink, scheduler) {
	  return this.source.run(new ThrottleSink(this.period, sink), scheduler);
	};

	function ThrottleSink(period, sink) {
	  this.time = 0;
	  this.period = period;
	  this.sink = sink;
	}

	ThrottleSink.prototype.event = function (t, x) {
	  if (t >= this.time) {
	    this.time = t + this.period;
	    this.sink.event(t, x);
	  }
	};

	ThrottleSink.prototype.end = _Pipe2.default.prototype.end;

	ThrottleSink.prototype.error = _Pipe2.default.prototype.error;

	/**
	 * Wait for a burst of events to subside and emit only the last event in the burst
	 * @param {Number} period events occuring more frequently than this
	 *  will be suppressed
	 * @param {Stream} stream stream to debounce
	 * @returns {Stream} new debounced stream
	 */
	function debounce(period, stream) {
	  return new _Stream2.default(new Debounce(period, stream.source));
	}

	function Debounce(dt, source) {
	  this.dt = dt;
	  this.source = source;
	}

	Debounce.prototype.run = function (sink, scheduler) {
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

	DebounceSink.prototype.event = function (t, x) {
	  this._clearTimer();
	  this.value = x;
	  this.timer = this.scheduler.delay(this.dt, _PropagateTask2.default.event(x, this.sink));
	};

	DebounceSink.prototype.end = function (t, x) {
	  if (this._clearTimer()) {
	    this.sink.event(t, this.value);
	    this.value = void 0;
	  }
	  this.sink.end(t, x);
	};

	DebounceSink.prototype.error = function (t, x) {
	  this._clearTimer();
	  this.sink.error(t, x);
	};

	DebounceSink.prototype.dispose = function () {
	  this._clearTimer();
	};

	DebounceSink.prototype._clearTimer = function () {
	  if (this.timer === null) {
	    return false;
	  }
	  this.timer.dispose();
	  this.timer = null;
	  return true;
	};

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.loop = loop;

	var _Stream = __webpack_require__(1);

	var _Stream2 = _interopRequireDefault(_Stream);

	var _Pipe = __webpack_require__(6);

	var _Pipe2 = _interopRequireDefault(_Pipe);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

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
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function loop(stepper, seed, stream) {
	  return new _Stream2.default(new Loop(stepper, seed, stream.source));
	}

	function Loop(stepper, seed, source) {
	  this.step = stepper;
	  this.seed = seed;
	  this.source = source;
	}

	Loop.prototype.run = function (sink, scheduler) {
	  return this.source.run(new LoopSink(this.step, this.seed, sink), scheduler);
	};

	function LoopSink(stepper, seed, sink) {
	  this.step = stepper;
	  this.seed = seed;
	  this.sink = sink;
	}

	LoopSink.prototype.error = _Pipe2.default.prototype.error;

	LoopSink.prototype.event = function (t, x) {
	  var result = this.step(this.seed, x);
	  this.seed = result.seed;
	  this.sink.event(t, result.value);
	};

	LoopSink.prototype.end = function (t) {
	  this.sink.end(t, this.seed);
	};

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.merge = merge;
	exports.mergeArray = mergeArray;

	var _Stream = __webpack_require__(1);

	var _Stream2 = _interopRequireDefault(_Stream);

	var _Pipe = __webpack_require__(6);

	var _Pipe2 = _interopRequireDefault(_Pipe);

	var _IndexSink = __webpack_require__(24);

	var _IndexSink2 = _interopRequireDefault(_IndexSink);

	var _core = __webpack_require__(9);

	var _dispose = __webpack_require__(4);

	var dispose = _interopRequireWildcard(_dispose);

	var _prelude = __webpack_require__(2);

	var base = _interopRequireWildcard(_prelude);

	function _interopRequireWildcard(obj) {
	  if (obj && obj.__esModule) {
	    return obj;
	  } else {
	    var newObj = {};if (obj != null) {
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	      }
	    }newObj.default = obj;return newObj;
	  }
	}

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var copy = base.copy;
	var reduce = base.reduce;

	/**
	 * @returns {Stream} stream containing events from all streams in the argument
	 * list in time order.  If two events are simultaneous they will be merged in
	 * arbitrary order.
	 */
	function merge() /* ...streams*/{
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
	  return l === 0 ? (0, _core.empty)() : l === 1 ? streams[0] : new _Stream2.default(mergeSources(streams));
	}

	/**
	 * This implements fusion/flattening for merge.  It will
	 * fuse adjacent merge operations.  For example:
	 * - a.merge(b).merge(c) effectively becomes merge(a, b, c)
	 * - merge(a, merge(b, c)) effectively becomes merge(a, b, c)
	 * It does this by concatenating the sources arrays of
	 * any nested Merge sources, in effect "flattening" nested
	 * merge operations into a single merge.
	 */
	function mergeSources(streams) {
	  return new Merge(reduce(appendSources, [], streams));
	}

	function appendSources(sources, stream) {
	  var source = stream.source;
	  return source instanceof Merge ? sources.concat(source.sources) : sources.concat(source);
	}

	function Merge(sources) {
	  this.sources = sources;
	}

	Merge.prototype.run = function (sink, scheduler) {
	  var this$1 = this;

	  var l = this.sources.length;
	  var disposables = new Array(l);
	  var sinks = new Array(l);

	  var mergeSink = new MergeSink(disposables, sinks, sink);

	  for (var indexSink, i = 0; i < l; ++i) {
	    indexSink = sinks[i] = new _IndexSink2.default(i, mergeSink);
	    disposables[i] = this$1.sources[i].run(indexSink, scheduler);
	  }

	  return dispose.all(disposables);
	};

	function MergeSink(disposables, sinks, sink) {
	  this.sink = sink;
	  this.disposables = disposables;
	  this.activeCount = sinks.length;
	}

	MergeSink.prototype.error = _Pipe2.default.prototype.error;

	MergeSink.prototype.event = function (t, indexValue) {
	  this.sink.event(t, indexValue.value);
	};

	MergeSink.prototype.end = function (t, indexedValue) {
	  dispose.tryDispose(t, this.disposables[indexedValue.index], this.sink);
	  if (--this.activeCount === 0) {
	    this.sink.end(t, indexedValue.value);
	  }
	};

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.observe = observe;
	exports.drain = drain;

	var _runSource = __webpack_require__(49);

	var _transform = __webpack_require__(14);

	/**
	 * Observe all the event values in the stream in time order. The
	 * provided function `f` will be called for each event value
	 * @param {function(x:T):*} f function to call with each event value
	 * @param {Stream<T>} stream stream to observe
	 * @return {Promise} promise that fulfills after the stream ends without
	 *  an error, or rejects if the stream ends with an error.
	 */
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function observe(f, stream) {
	  return drain((0, _transform.tap)(f, stream));
	}

	/**
	 * "Run" a stream by creating demand and consuming all events
	 * @param {Stream<T>} stream stream to drain
	 * @return {Promise} promise that fulfills after the stream ends without
	 *  an error, or rejects if the stream ends with an error.
	 */
	function drain(stream) {
	  return (0, _runSource.withDefaultScheduler)(stream.source);
	}

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.fromPromise = fromPromise;
	exports.awaitPromises = awaitPromises;

	var _Stream = __webpack_require__(1);

	var _Stream2 = _interopRequireDefault(_Stream);

	var _fatalError = __webpack_require__(20);

	var _fatalError2 = _interopRequireDefault(_fatalError);

	var _core = __webpack_require__(9);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	/**
	 * Create a stream containing only the promise's fulfillment
	 * value at the time it fulfills.
	 * @param {Promise<T>} p promise
	 * @return {Stream<T>} stream containing promise's fulfillment value.
	 *  If the promise rejects, the stream will error
	 */
	function fromPromise(p) {
	  return awaitPromises((0, _core.of)(p));
	}

	/**
	 * Turn a Stream<Promise<T>> into Stream<T> by awaiting each promise.
	 * Event order is preserved.
	 * @param {Stream<Promise<T>>} stream
	 * @return {Stream<T>} stream of fulfillment values.  The stream will
	 * error if any promise rejects.
	 */
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function awaitPromises(stream) {
	  return new _Stream2.default(new Await(stream.source));
	}

	function Await(source) {
	  this.source = source;
	}

	Await.prototype.run = function (sink, scheduler) {
	  return this.source.run(new AwaitSink(sink, scheduler), scheduler);
	};

	function AwaitSink(sink, scheduler) {
	  this.sink = sink;
	  this.scheduler = scheduler;
	  this.queue = Promise.resolve();
	  var self = this;

	  // Pre-create closures, to avoid creating them per event
	  this._eventBound = function (x) {
	    self.sink.event(self.scheduler.now(), x);
	  };

	  this._endBound = function (x) {
	    self.sink.end(self.scheduler.now(), x);
	  };

	  this._errorBound = function (e) {
	    self.sink.error(self.scheduler.now(), e);
	  };
	}

	AwaitSink.prototype.event = function (t, promise) {
	  var self = this;
	  this.queue = this.queue.then(function () {
	    return self._event(promise);
	  }).catch(this._errorBound);
	};

	AwaitSink.prototype.end = function (t, x) {
	  var self = this;
	  this.queue = this.queue.then(function () {
	    return self._end(x);
	  }).catch(this._errorBound);
	};

	AwaitSink.prototype.error = function (t, e) {
	  var self = this;
	  // Don't resolve error values, propagate directly
	  this.queue = this.queue.then(function () {
	    return self._errorBound(e);
	  }).catch(_fatalError2.default);
	};

	AwaitSink.prototype._event = function (promise) {
	  return promise.then(this._eventBound);
	};

	AwaitSink.prototype._end = function (x) {
	  return Promise.resolve(x).then(this._endBound);
	};

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.sample = sample;
	exports.sampleWith = sampleWith;
	exports.sampleArray = sampleArray;

	var _Stream = __webpack_require__(1);

	var _Stream2 = _interopRequireDefault(_Stream);

	var _Pipe = __webpack_require__(6);

	var _Pipe2 = _interopRequireDefault(_Pipe);

	var _dispose = __webpack_require__(4);

	var dispose = _interopRequireWildcard(_dispose);

	var _prelude = __webpack_require__(2);

	var base = _interopRequireWildcard(_prelude);

	var _invoke = __webpack_require__(22);

	var _invoke2 = _interopRequireDefault(_invoke);

	function _interopRequireWildcard(obj) {
	  if (obj && obj.__esModule) {
	    return obj;
	  } else {
	    var newObj = {};if (obj != null) {
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	      }
	    }newObj.default = obj;return newObj;
	  }
	}

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

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
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function sampleWith(sampler, stream) {
	  return new _Stream2.default(new Sampler(base.id, sampler.source, [stream.source]));
	}

	function sampleArray(f, sampler, streams) {
	  return new _Stream2.default(new Sampler(f, sampler.source, base.map(getSource, streams)));
	}

	function getSource(stream) {
	  return stream.source;
	}

	function Sampler(f, sampler, sources) {
	  this.f = f;
	  this.sampler = sampler;
	  this.sources = sources;
	}

	Sampler.prototype.run = function (sink, scheduler) {
	  var this$1 = this;

	  var l = this.sources.length;
	  var disposables = new Array(l + 1);
	  var sinks = new Array(l);

	  var sampleSink = new SampleSink(this.f, sinks, sink);

	  for (var hold, i = 0; i < l; ++i) {
	    hold = sinks[i] = new Hold(sampleSink);
	    disposables[i] = this$1.sources[i].run(hold, scheduler);
	  }

	  disposables[i] = this.sampler.run(sampleSink, scheduler);

	  return dispose.all(disposables);
	};

	function Hold(sink) {
	  this.sink = sink;
	  this.hasValue = false;
	}

	Hold.prototype.event = function (t, x) {
	  this.value = x;
	  this.hasValue = true;
	  this.sink._notify(this);
	};

	Hold.prototype.end = function () {};
	Hold.prototype.error = _Pipe2.default.prototype.error;

	function SampleSink(f, sinks, sink) {
	  this.f = f;
	  this.sinks = sinks;
	  this.sink = sink;
	  this.active = false;
	}

	SampleSink.prototype._notify = function () {
	  if (!this.active) {
	    this.active = this.sinks.every(hasValue);
	  }
	};

	SampleSink.prototype.event = function (t) {
	  if (this.active) {
	    this.sink.event(t, (0, _invoke2.default)(this.f, base.map(getValue, this.sinks)));
	  }
	};

	SampleSink.prototype.end = _Pipe2.default.prototype.end;
	SampleSink.prototype.error = _Pipe2.default.prototype.error;

	function hasValue(hold) {
	  return hold.hasValue;
	}

	function getValue(hold) {
	  return hold.value;
	}

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.take = take;
	exports.skip = skip;
	exports.slice = slice;
	exports.takeWhile = takeWhile;
	exports.skipWhile = skipWhile;

	var _Stream = __webpack_require__(1);

	var _Stream2 = _interopRequireDefault(_Stream);

	var _Pipe = __webpack_require__(6);

	var _Pipe2 = _interopRequireDefault(_Pipe);

	var _core = __webpack_require__(9);

	var core = _interopRequireWildcard(_core);

	var _dispose = __webpack_require__(4);

	var dispose = _interopRequireWildcard(_dispose);

	var _Map = __webpack_require__(21);

	var _Map2 = _interopRequireDefault(_Map);

	function _interopRequireWildcard(obj) {
	  if (obj && obj.__esModule) {
	    return obj;
	  } else {
	    var newObj = {};if (obj != null) {
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	      }
	    }newObj.default = obj;return newObj;
	  }
	}

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

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
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

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
	  return end <= start ? core.empty() : new _Stream2.default(sliceSource(start, end, stream.source));
	}

	function sliceSource(start, end, source) {
	  return source instanceof _Map2.default ? commuteMapSlice(start, end, source) : source instanceof Slice ? fuseSlice(start, end, source) : new Slice(start, end, source);
	}

	function commuteMapSlice(start, end, source) {
	  return _Map2.default.create(source.f, sliceSource(start, end, source.source));
	}

	function fuseSlice(start, end, source) {
	  start += source.min;
	  end = Math.min(end + source.min, source.max);
	  return new Slice(start, end, source.source);
	}

	function Slice(min, max, source) {
	  this.source = source;
	  this.min = min;
	  this.max = max;
	}

	Slice.prototype.run = function (sink, scheduler) {
	  return new SliceSink(this.min, this.max - this.min, this.source, sink, scheduler);
	};

	function SliceSink(skip, take, source, sink, scheduler) {
	  this.sink = sink;
	  this.skip = skip;
	  this.take = take;
	  this.disposable = dispose.once(source.run(this, scheduler));
	}

	SliceSink.prototype.end = _Pipe2.default.prototype.end;
	SliceSink.prototype.error = _Pipe2.default.prototype.error;

	SliceSink.prototype.event = function (t, x) {
	  // eslint-disable-line complexity
	  if (this.skip > 0) {
	    this.skip -= 1;
	    return;
	  }

	  if (this.take === 0) {
	    return;
	  }

	  this.take -= 1;
	  this.sink.event(t, x);
	  if (this.take === 0) {
	    this.dispose();
	    this.sink.end(t, x);
	  }
	};

	SliceSink.prototype.dispose = function () {
	  return this.disposable.dispose();
	};

	function takeWhile(p, stream) {
	  return new _Stream2.default(new TakeWhile(p, stream.source));
	}

	function TakeWhile(p, source) {
	  this.p = p;
	  this.source = source;
	}

	TakeWhile.prototype.run = function (sink, scheduler) {
	  return new TakeWhileSink(this.p, this.source, sink, scheduler);
	};

	function TakeWhileSink(p, source, sink, scheduler) {
	  this.p = p;
	  this.sink = sink;
	  this.active = true;
	  this.disposable = dispose.once(source.run(this, scheduler));
	}

	TakeWhileSink.prototype.end = _Pipe2.default.prototype.end;
	TakeWhileSink.prototype.error = _Pipe2.default.prototype.error;

	TakeWhileSink.prototype.event = function (t, x) {
	  if (!this.active) {
	    return;
	  }

	  var p = this.p;
	  this.active = p(x);
	  if (this.active) {
	    this.sink.event(t, x);
	  } else {
	    this.dispose();
	    this.sink.end(t, x);
	  }
	};

	TakeWhileSink.prototype.dispose = function () {
	  return this.disposable.dispose();
	};

	function skipWhile(p, stream) {
	  return new _Stream2.default(new SkipWhile(p, stream.source));
	}

	function SkipWhile(p, source) {
	  this.p = p;
	  this.source = source;
	}

	SkipWhile.prototype.run = function (sink, scheduler) {
	  return this.source.run(new SkipWhileSink(this.p, sink), scheduler);
	};

	function SkipWhileSink(p, sink) {
	  this.p = p;
	  this.sink = sink;
	  this.skipping = true;
	}

	SkipWhileSink.prototype.end = _Pipe2.default.prototype.end;
	SkipWhileSink.prototype.error = _Pipe2.default.prototype.error;

	SkipWhileSink.prototype.event = function (t, x) {
	  if (this.skipping) {
	    var p = this.p;
	    this.skipping = p(x);
	    if (this.skipping) {
	      return;
	    }
	  }

	  this.sink.event(t, x);
	};

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.switch = undefined;
	exports.switchLatest = switchLatest;

	var _Stream = __webpack_require__(1);

	var _Stream2 = _interopRequireDefault(_Stream);

	var _dispose = __webpack_require__(4);

	var dispose = _interopRequireWildcard(_dispose);

	function _interopRequireWildcard(obj) {
	  if (obj && obj.__esModule) {
	    return obj;
	  } else {
	    var newObj = {};if (obj != null) {
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	      }
	    }newObj.default = obj;return newObj;
	  }
	}

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	/**
	 * Given a stream of streams, return a new stream that adopts the behavior
	 * of the most recent inner stream.
	 * @param {Stream} stream of streams on which to switch
	 * @returns {Stream} switching stream
	 */
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function switchLatest(stream) {
	  return new _Stream2.default(new Switch(stream.source));
	}

	exports.switch = switchLatest;

	function Switch(source) {
	  this.source = source;
	}

	Switch.prototype.run = function (sink, scheduler) {
	  var switchSink = new SwitchSink(sink, scheduler);
	  return dispose.all([switchSink, this.source.run(switchSink, scheduler)]);
	};

	function SwitchSink(sink, scheduler) {
	  this.sink = sink;
	  this.scheduler = scheduler;
	  this.current = null;
	  this.ended = false;
	}

	SwitchSink.prototype.event = function (t, stream) {
	  this._disposeCurrent(t); // TODO: capture the result of this dispose
	  this.current = new Segment(t, Infinity, this, this.sink);
	  this.current.disposable = stream.source.run(this.current, this.scheduler);
	};

	SwitchSink.prototype.end = function (t, x) {
	  this.ended = true;
	  this._checkEnd(t, x);
	};

	SwitchSink.prototype.error = function (t, e) {
	  this.ended = true;
	  this.sink.error(t, e);
	};

	SwitchSink.prototype.dispose = function () {
	  return this._disposeCurrent(this.scheduler.now());
	};

	SwitchSink.prototype._disposeCurrent = function (t) {
	  if (this.current !== null) {
	    return this.current._dispose(t);
	  }
	};

	SwitchSink.prototype._disposeInner = function (t, inner) {
	  inner._dispose(t); // TODO: capture the result of this dispose
	  if (inner === this.current) {
	    this.current = null;
	  }
	};

	SwitchSink.prototype._checkEnd = function (t, x) {
	  if (this.ended && this.current === null) {
	    this.sink.end(t, x);
	  }
	};

	SwitchSink.prototype._endInner = function (t, x, inner) {
	  this._disposeInner(t, inner);
	  this._checkEnd(t, x);
	};

	SwitchSink.prototype._errorInner = function (t, e, inner) {
	  this._disposeInner(t, inner);
	  this.sink.error(t, e);
	};

	function Segment(min, max, outer, sink) {
	  this.min = min;
	  this.max = max;
	  this.outer = outer;
	  this.sink = sink;
	  this.disposable = dispose.empty();
	}

	Segment.prototype.event = function (t, x) {
	  if (t < this.max) {
	    this.sink.event(Math.max(t, this.min), x);
	  }
	};

	Segment.prototype.end = function (t, x) {
	  this.outer._endInner(Math.max(t, this.min), x, this);
	};

	Segment.prototype.error = function (t, e) {
	  this.outer._errorInner(Math.max(t, this.min), e, this);
	};

	Segment.prototype._dispose = function (t) {
	  this.max = t;
	  dispose.tryDispose(t, this.disposable, this.sink);
	};

/***/ },
/* 104 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.thru = thru;
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function thru(f, stream) {
	  return f(stream);
	}

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.takeUntil = takeUntil;
	exports.skipUntil = skipUntil;
	exports.during = during;

	var _Stream = __webpack_require__(1);

	var _Stream2 = _interopRequireDefault(_Stream);

	var _Pipe = __webpack_require__(6);

	var _Pipe2 = _interopRequireDefault(_Pipe);

	var _dispose = __webpack_require__(4);

	var dispose = _interopRequireWildcard(_dispose);

	var _flatMap = __webpack_require__(46);

	function _interopRequireWildcard(obj) {
	  if (obj && obj.__esModule) {
	    return obj;
	  } else {
	    var newObj = {};if (obj != null) {
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	      }
	    }newObj.default = obj;return newObj;
	  }
	}

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function takeUntil(signal, stream) {
	  return new _Stream2.default(new Until(signal.source, stream.source));
	}

	function skipUntil(signal, stream) {
	  return new _Stream2.default(new Since(signal.source, stream.source));
	}

	function during(timeWindow, stream) {
	  return takeUntil((0, _flatMap.join)(timeWindow), skipUntil(timeWindow, stream));
	}

	function Until(maxSignal, source) {
	  this.maxSignal = maxSignal;
	  this.source = source;
	}

	Until.prototype.run = function (sink, scheduler) {
	  var min = new Bound(-Infinity, sink);
	  var max = new UpperBound(this.maxSignal, sink, scheduler);
	  var disposable = this.source.run(new TimeWindowSink(min, max, sink), scheduler);

	  return dispose.all([min, max, disposable]);
	};

	function Since(minSignal, source) {
	  this.minSignal = minSignal;
	  this.source = source;
	}

	Since.prototype.run = function (sink, scheduler) {
	  var min = new LowerBound(this.minSignal, sink, scheduler);
	  var max = new Bound(Infinity, sink);
	  var disposable = this.source.run(new TimeWindowSink(min, max, sink), scheduler);

	  return dispose.all([min, max, disposable]);
	};

	function Bound(value, sink) {
	  this.value = value;
	  this.sink = sink;
	}

	Bound.prototype.error = _Pipe2.default.prototype.error;
	Bound.prototype.event = noop;
	Bound.prototype.end = noop;
	Bound.prototype.dispose = noop;

	function TimeWindowSink(min, max, sink) {
	  this.min = min;
	  this.max = max;
	  this.sink = sink;
	}

	TimeWindowSink.prototype.event = function (t, x) {
	  if (t >= this.min.value && t < this.max.value) {
	    this.sink.event(t, x);
	  }
	};

	TimeWindowSink.prototype.error = _Pipe2.default.prototype.error;
	TimeWindowSink.prototype.end = _Pipe2.default.prototype.end;

	function LowerBound(signal, sink, scheduler) {
	  this.value = Infinity;
	  this.sink = sink;
	  this.disposable = signal.run(this, scheduler);
	}

	LowerBound.prototype.event = function (t /*, x */) {
	  if (t < this.value) {
	    this.value = t;
	  }
	};

	LowerBound.prototype.end = noop;
	LowerBound.prototype.error = _Pipe2.default.prototype.error;

	LowerBound.prototype.dispose = function () {
	  return this.disposable.dispose();
	};

	function UpperBound(signal, sink, scheduler) {
	  this.value = Infinity;
	  this.sink = sink;
	  this.disposable = signal.run(this, scheduler);
	}

	UpperBound.prototype.event = function (t, x) {
	  if (t < this.value) {
	    this.value = t;
	    this.sink.end(t, x);
	  }
	};

	UpperBound.prototype.end = noop;
	UpperBound.prototype.error = _Pipe2.default.prototype.error;

	UpperBound.prototype.dispose = function () {
	  return this.disposable.dispose();
	};

	function noop() {}

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.timestamp = timestamp;

	var _Stream = __webpack_require__(1);

	var _Stream2 = _interopRequireDefault(_Stream);

	var _Pipe = __webpack_require__(6);

	var _Pipe2 = _interopRequireDefault(_Pipe);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function timestamp(stream) {
	  return new _Stream2.default(new Timestamp(stream.source));
	}

	function Timestamp(source) {
	  this.source = source;
	}

	Timestamp.prototype.run = function (sink, scheduler) {
	  return this.source.run(new TimestampSink(sink), scheduler);
	};

	function TimestampSink(sink) {
	  this.sink = sink;
	}

	TimestampSink.prototype.end = _Pipe2.default.prototype.end;
	TimestampSink.prototype.error = _Pipe2.default.prototype.error;

	TimestampSink.prototype.event = function (t, x) {
	  this.sink.event(t, { time: t, value: x });
	};

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.transduce = transduce;

	var _Stream = __webpack_require__(1);

	var _Stream2 = _interopRequireDefault(_Stream);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	/**
	 * Transform a stream by passing its events through a transducer.
	 * @param  {function} transducer transducer function
	 * @param  {Stream} stream stream whose events will be passed through the
	 *  transducer
	 * @return {Stream} stream of events transformed by the transducer
	 */
	function transduce(transducer, stream) {
	  return new _Stream2.default(new Transduce(transducer, stream.source));
	} /** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function Transduce(transducer, source) {
	  this.transducer = transducer;
	  this.source = source;
	}

	Transduce.prototype.run = function (sink, scheduler) {
	  var xf = this.transducer(new Transformer(sink));
	  return this.source.run(new TransduceSink(getTxHandler(xf), sink), scheduler);
	};

	function TransduceSink(adapter, sink) {
	  this.xf = adapter;
	  this.sink = sink;
	}

	TransduceSink.prototype.event = function (t, x) {
	  var next = this.xf.step(t, x);

	  return this.xf.isReduced(next) ? this.sink.end(t, this.xf.getResult(next)) : next;
	};

	TransduceSink.prototype.end = function (t, x) {
	  return this.xf.result(x);
	};

	TransduceSink.prototype.error = function (t, e) {
	  return this.sink.error(t, e);
	};

	function Transformer(sink) {
	  this.time = -Infinity;
	  this.sink = sink;
	}

	Transformer.prototype['@@transducer/init'] = Transformer.prototype.init = function () {};

	Transformer.prototype['@@transducer/step'] = Transformer.prototype.step = function (t, x) {
	  if (!isNaN(t)) {
	    this.time = Math.max(t, this.time);
	  }
	  return this.sink.event(this.time, x);
	};

	Transformer.prototype['@@transducer/result'] = Transformer.prototype.result = function (x) {
	  return this.sink.end(this.time, x);
	};

	/**
	* Given an object supporting the new or legacy transducer protocol,
	* create an adapter for it.
	* @param {object} tx transform
	* @returns {TxAdapter|LegacyTxAdapter}
	*/
	function getTxHandler(tx) {
	  return typeof tx['@@transducer/step'] === 'function' ? new TxAdapter(tx) : new LegacyTxAdapter(tx);
	}

	/**
	* Adapter for new official transducer protocol
	* @param {object} tx transform
	* @constructor
	*/
	function TxAdapter(tx) {
	  this.tx = tx;
	}

	TxAdapter.prototype.step = function (t, x) {
	  return this.tx['@@transducer/step'](t, x);
	};
	TxAdapter.prototype.result = function (x) {
	  return this.tx['@@transducer/result'](x);
	};
	TxAdapter.prototype.isReduced = function (x) {
	  return x != null && x['@@transducer/reduced'];
	};
	TxAdapter.prototype.getResult = function (x) {
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

	LegacyTxAdapter.prototype.step = function (t, x) {
	  return this.tx.step(t, x);
	};
	LegacyTxAdapter.prototype.result = function (x) {
	  return this.tx.result(x);
	};
	LegacyTxAdapter.prototype.isReduced = function (x) {
	  return x != null && x.__transducers_reduced__;
	};
	LegacyTxAdapter.prototype.getResult = function (x) {
	  return x.value;
	};

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.zip = zip;
	exports.zipArray = zipArray;

	var _Stream = __webpack_require__(1);

	var _Stream2 = _interopRequireDefault(_Stream);

	var _transform = __webpack_require__(14);

	var transform = _interopRequireWildcard(_transform);

	var _core = __webpack_require__(9);

	var core = _interopRequireWildcard(_core);

	var _Pipe = __webpack_require__(6);

	var _Pipe2 = _interopRequireDefault(_Pipe);

	var _IndexSink = __webpack_require__(24);

	var _IndexSink2 = _interopRequireDefault(_IndexSink);

	var _dispose = __webpack_require__(4);

	var dispose = _interopRequireWildcard(_dispose);

	var _prelude = __webpack_require__(2);

	var base = _interopRequireWildcard(_prelude);

	var _invoke = __webpack_require__(22);

	var _invoke2 = _interopRequireDefault(_invoke);

	var _Queue = __webpack_require__(88);

	var _Queue2 = _interopRequireDefault(_Queue);

	function _interopRequireWildcard(obj) {
	  if (obj && obj.__esModule) {
	    return obj;
	  } else {
	    var newObj = {};if (obj != null) {
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	      }
	    }newObj.default = obj;return newObj;
	  }
	}

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	var map = base.map; /** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var tail = base.tail;

	/**
	 * Combine streams pairwise (or tuple-wise) by index by applying f to values
	 * at corresponding indices.  The returned stream ends when any of the input
	 * streams ends.
	 * @param {function} f function to combine values
	 * @returns {Stream} new stream with items at corresponding indices combined
	 *  using f
	 */
	function zip(f /*, ...streams */) {
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
	  return streams.length === 0 ? core.empty() : streams.length === 1 ? transform.map(f, streams[0]) : new _Stream2.default(new Zip(f, map(getSource, streams)));
	}

	function getSource(stream) {
	  return stream.source;
	}

	function Zip(f, sources) {
	  this.f = f;
	  this.sources = sources;
	}

	Zip.prototype.run = function (sink, scheduler) {
	  var this$1 = this;

	  var l = this.sources.length;
	  var disposables = new Array(l);
	  var sinks = new Array(l);
	  var buffers = new Array(l);

	  var zipSink = new ZipSink(this.f, buffers, sinks, sink);

	  for (var indexSink, i = 0; i < l; ++i) {
	    buffers[i] = new _Queue2.default();
	    indexSink = sinks[i] = new _IndexSink2.default(i, zipSink);
	    disposables[i] = this$1.sources[i].run(indexSink, scheduler);
	  }

	  return dispose.all(disposables);
	};

	function ZipSink(f, buffers, sinks, sink) {
	  this.f = f;
	  this.sinks = sinks;
	  this.sink = sink;
	  this.buffers = buffers;
	}

	ZipSink.prototype.event = function (t, indexedValue) {
	  // eslint-disable-line complexity
	  var buffers = this.buffers;
	  var buffer = buffers[indexedValue.index];

	  buffer.push(indexedValue.value);

	  if (buffer.length() === 1) {
	    if (!ready(this.buffers)) {
	      return;
	    }

	    emitZipped(this.f, t, buffers, this.sink);

	    if (ended(this.buffers, this.sinks)) {
	      this.sink.end(t, void 0);
	    }
	  }
	};

	ZipSink.prototype.end = function (t, indexedValue) {
	  var buffer = this.buffers[indexedValue.index];
	  if (buffer.isEmpty()) {
	    this.sink.end(t, indexedValue.value);
	  }
	};

	ZipSink.prototype.error = _Pipe2.default.prototype.error;

	function emitZipped(f, t, buffers, sink) {
	  sink.event(t, (0, _invoke2.default)(f, map(head, buffers)));
	}

	function head(buffer) {
	  return buffer.shift();
	}

	function ended(buffers, sinks) {
	  for (var i = 0, l = buffers.length; i < l; ++i) {
	    if (buffers[i].isEmpty() && !sinks[i].active) {
	      return true;
	    }
	  }
	  return false;
	}

	function ready(buffers) {
	  for (var i = 0, l = buffers.length; i < l; ++i) {
	    if (buffers[i].isEmpty()) {
	      return false;
	    }
	  }
	  return true;
	}

/***/ },
/* 109 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Disposable;
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

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

	Disposable.prototype.dispose = function () {
	  return this._dispose(this._data);
	};

/***/ },
/* 110 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = SettableDisposable;
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function SettableDisposable() {
	  this.disposable = void 0;
	  this.disposed = false;
	  this._resolve = void 0;

	  var self = this;
	  this.result = new Promise(function (resolve) {
	    self._resolve = resolve;
	  });
	}

	SettableDisposable.prototype.setDisposable = function (disposable) {
	  if (this.disposable !== void 0) {
	    throw new Error('setDisposable called more than once');
	  }

	  this.disposable = disposable;

	  if (this.disposed) {
	    this._resolve(disposable.dispose());
	  }
	};

	SettableDisposable.prototype.dispose = function () {
	  if (this.disposed) {
	    return this.result;
	  }

	  this.disposed = true;

	  if (this.disposable !== void 0) {
	    this.result = this.disposable.dispose();
	  }

	  return this.result;
	};

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = FilterMap;

	var _Pipe = __webpack_require__(6);

	var _Pipe2 = _interopRequireDefault(_Pipe);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function FilterMap(p, f, source) {
	  this.p = p;
	  this.f = f;
	  this.source = source;
	} /** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	FilterMap.prototype.run = function (sink, scheduler) {
	  return this.source.run(new FilterMapSink(this.p, this.f, sink), scheduler);
	};

	function FilterMapSink(p, f, sink) {
	  this.p = p;
	  this.f = f;
	  this.sink = sink;
	}

	FilterMapSink.prototype.event = function (t, x) {
	  var f = this.f;
	  var p = this.p;
	  p(x) && this.sink.event(t, f(x));
	};

	FilterMapSink.prototype.end = _Pipe2.default.prototype.end;
	FilterMapSink.prototype.error = _Pipe2.default.prototype.error;

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.multicast = exports.throwError = exports.flatMapError = exports.recoverWith = exports.await = exports.awaitPromises = exports.fromPromise = exports.debounce = exports.throttle = exports.timestamp = exports.delay = exports.during = exports.since = exports.skipUntil = exports.until = exports.takeUntil = exports.skipWhile = exports.takeWhile = exports.slice = exports.skip = exports.take = exports.distinctBy = exports.skipRepeatsWith = exports.distinct = exports.skipRepeats = exports.filter = exports.switch = exports.switchLatest = exports.zipArray = exports.zip = exports.sampleWith = exports.sampleArray = exports.sample = exports.combineArray = exports.combine = exports.mergeArray = exports.merge = exports.mergeConcurrently = exports.concatMap = exports.flatMapEnd = exports.continueWith = exports.join = exports.chain = exports.flatMap = exports.transduce = exports.ap = exports.tap = exports.constant = exports.map = exports.startWith = exports.concat = exports.generate = exports.iterate = exports.unfold = exports.reduce = exports.scan = exports.loop = exports.drain = exports.forEach = exports.observe = exports.fromEvent = exports.periodic = exports.from = exports.never = exports.empty = exports.just = exports.of = exports.Stream = undefined;

	var _fromEvent = __webpack_require__(126);

	Object.defineProperty(exports, 'fromEvent', {
	  enumerable: true,
	  get: function get() {
	    return _fromEvent.fromEvent;
	  }
	});

	var _unfold = __webpack_require__(131);

	Object.defineProperty(exports, 'unfold', {
	  enumerable: true,
	  get: function get() {
	    return _unfold.unfold;
	  }
	});

	var _iterate = __webpack_require__(129);

	Object.defineProperty(exports, 'iterate', {
	  enumerable: true,
	  get: function get() {
	    return _iterate.iterate;
	  }
	});

	var _generate = __webpack_require__(128);

	Object.defineProperty(exports, 'generate', {
	  enumerable: true,
	  get: function get() {
	    return _generate.generate;
	  }
	});

	var _Stream = __webpack_require__(1);

	var _Stream2 = _interopRequireDefault(_Stream);

	var _prelude = __webpack_require__(2);

	var base = _interopRequireWildcard(_prelude);

	var _core = __webpack_require__(9);

	var _from = __webpack_require__(124);

	var _periodic = __webpack_require__(130);

	var _symbolObservable = __webpack_require__(50);

	var _symbolObservable2 = _interopRequireDefault(_symbolObservable);

	var _subscribe = __webpack_require__(115);

	var _thru = __webpack_require__(104);

	var _observe = __webpack_require__(99);

	var _loop = __webpack_require__(97);

	var _accumulate = __webpack_require__(89);

	var _build = __webpack_require__(91);

	var _transform = __webpack_require__(14);

	var _applicative = __webpack_require__(90);

	var _transduce = __webpack_require__(107);

	var _flatMap = __webpack_require__(46);

	var _continueWith = __webpack_require__(45);

	var _concatMap = __webpack_require__(92);

	var _mergeConcurrently = __webpack_require__(19);

	var _merge = __webpack_require__(98);

	var _combine = __webpack_require__(44);

	var _sample = __webpack_require__(101);

	var _zip = __webpack_require__(108);

	var _switch = __webpack_require__(103);

	var _filter = __webpack_require__(95);

	var _slice = __webpack_require__(102);

	var _timeslice = __webpack_require__(105);

	var _delay = __webpack_require__(93);

	var _timestamp = __webpack_require__(106);

	var _limit = __webpack_require__(96);

	var _promises = __webpack_require__(100);

	var _errors = __webpack_require__(94);

	var _multicast = __webpack_require__(12);

	var _multicast2 = _interopRequireDefault(_multicast);

	function _interopRequireWildcard(obj) {
	  if (obj && obj.__esModule) {
	    return obj;
	  } else {
	    var newObj = {};if (obj != null) {
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	      }
	    }newObj.default = obj;return newObj;
	  }
	}

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	/**
	 * Core stream type
	 * @type {Stream}
	 */
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	exports.Stream = _Stream2.default;

	// Add of and empty to constructor for fantasy-land compat

	_Stream2.default.of = _core.of;
	_Stream2.default.empty = _core.empty;
	// Add from to constructor for ES Observable compat
	_Stream2.default.from = _from.from;
	exports.of = _core.of;
	exports.just = _core.of;
	exports.empty = _core.empty;
	exports.never = _core.never;
	exports.from = _from.from;
	exports.periodic = _periodic.periodic;

	// -----------------------------------------------------------------------
	// Draft ES Observable proposal interop
	// https://github.com/zenparsing/es-observable

	_Stream2.default.prototype.subscribe = function (subscriber) {
	  return (0, _subscribe.subscribe)(subscriber, this);
	};

	_Stream2.default.prototype[_symbolObservable2.default] = function () {
	  return this;
	};

	// -----------------------------------------------------------------------
	// Fluent adapter

	/**
	 * Adapt a functional stream transform to fluent style.
	 * It applies f to the this stream object
	 * @param  {function(s: Stream): Stream} f function that
	 * receives the stream itself and must return a new stream
	 * @return {Stream}
	 */
	_Stream2.default.prototype.thru = function (f) {
	  return (0, _thru.thru)(f, this);
	};

	// -----------------------------------------------------------------------
	// Adapting other sources

	/**
	 * Create a stream of events from the supplied EventTarget or EventEmitter
	 * @param {String} event event name
	 * @param {EventTarget|EventEmitter} source EventTarget or EventEmitter. The source
	 *  must support either addEventListener/removeEventListener (w3c EventTarget:
	 *  http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget),
	 *  or addListener/removeListener (node EventEmitter: http://nodejs.org/api/events.html)
	 * @returns {Stream} stream of events of the specified type from the source
	 */

	// -----------------------------------------------------------------------
	// Observing

	exports.observe = _observe.observe;
	exports.forEach = _observe.observe;
	exports.drain = _observe.drain;

	/**
	 * Process all the events in the stream
	 * @returns {Promise} promise that fulfills when the stream ends, or rejects
	 *  if the stream fails with an unhandled error.
	 */

	_Stream2.default.prototype.observe = _Stream2.default.prototype.forEach = function (f) {
	  return (0, _observe.observe)(f, this);
	};

	/**
	 * Consume all events in the stream, without providing a function to process each.
	 * This causes a stream to become active and begin emitting events, and is useful
	 * in cases where all processing has been setup upstream via other combinators, and
	 * there is no need to process the terminal events.
	 * @returns {Promise} promise that fulfills when the stream ends, or rejects
	 *  if the stream fails with an unhandled error.
	 */
	_Stream2.default.prototype.drain = function () {
	  return (0, _observe.drain)(this);
	};

	// -------------------------------------------------------

	exports.loop = _loop.loop;

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

	_Stream2.default.prototype.loop = function (stepper, seed) {
	  return (0, _loop.loop)(stepper, seed, this);
	};

	// -------------------------------------------------------

	exports.scan = _accumulate.scan;
	exports.reduce = _accumulate.reduce;

	/**
	 * Create a stream containing successive reduce results of applying f to
	 * the previous reduce result and the current stream item.
	 * @param {function(result:*, x:*):*} f reducer function
	 * @param {*} initial initial value
	 * @returns {Stream} new stream containing successive reduce results
	 */

	_Stream2.default.prototype.scan = function (f, initial) {
	  return (0, _accumulate.scan)(f, initial, this);
	};

	/**
	 * Reduce the stream to produce a single result.  Note that reducing an infinite
	 * stream will return a Promise that never fulfills, but that may reject if an error
	 * occurs.
	 * @param {function(result:*, x:*):*} f reducer function
	 * @param {*} initial optional initial value
	 * @returns {Promise} promise for the file result of the reduce
	 */
	_Stream2.default.prototype.reduce = function (f, initial) {
	  return (0, _accumulate.reduce)(f, initial, this);
	};

	// -----------------------------------------------------------------------
	// Building and extending

	exports.concat = _build.concat;
	exports.startWith = _build.cons;

	/**
	 * @param {Stream} tail
	 * @returns {Stream} new stream containing all items in this followed by
	 *  all items in tail
	 */

	_Stream2.default.prototype.concat = function (tail) {
	  return (0, _build.concat)(this, tail);
	};

	/**
	 * @param {*} x value to prepend
	 * @returns {Stream} a new stream with x prepended
	 */
	_Stream2.default.prototype.startWith = function (x) {
	  return (0, _build.cons)(x, this);
	};

	// -----------------------------------------------------------------------
	// Transforming

	exports.map = _transform.map;
	exports.constant = _transform.constant;
	exports.tap = _transform.tap;
	exports.ap = _applicative.ap;

	/**
	 * Transform each value in the stream by applying f to each
	 * @param {function(*):*} f mapping function
	 * @returns {Stream} stream containing items transformed by f
	 */

	_Stream2.default.prototype.map = function (f) {
	  return (0, _transform.map)(f, this);
	};

	/**
	 * Assume this stream contains functions, and apply each function to each item
	 * in the provided stream.  This generates, in effect, a cross product.
	 * @param {Stream} xs stream of items to which
	 * @returns {Stream} stream containing the cross product of items
	 */
	_Stream2.default.prototype.ap = function (xs) {
	  return (0, _applicative.ap)(this, xs);
	};

	/**
	 * Replace each value in the stream with x
	 * @param {*} x
	 * @returns {Stream} stream containing items replaced with x
	 */
	_Stream2.default.prototype.constant = function (x) {
	  return (0, _transform.constant)(x, this);
	};

	/**
	 * Perform a side effect for each item in the stream
	 * @param {function(x:*):*} f side effect to execute for each item. The
	 *  return value will be discarded.
	 * @returns {Stream} new stream containing the same items as this stream
	 */
	_Stream2.default.prototype.tap = function (f) {
	  return (0, _transform.tap)(f, this);
	};

	// -----------------------------------------------------------------------
	// Transducer support

	exports.transduce = _transduce.transduce;

	/**
	 * Transform this stream by passing its events through a transducer.
	 * @param  {function} transducer transducer function
	 * @return {Stream} stream of events transformed by the transducer
	 */

	_Stream2.default.prototype.transduce = function (transducer) {
	  return (0, _transduce.transduce)(transducer, this);
	};

	// -----------------------------------------------------------------------
	// FlatMapping

	exports.flatMap = _flatMap.flatMap;
	exports.chain = _flatMap.flatMap;
	exports.join = _flatMap.join;

	/**
	 * Map each value in the stream to a new stream, and merge it into the
	 * returned outer stream. Event arrival times are preserved.
	 * @param {function(x:*):Stream} f chaining function, must return a Stream
	 * @returns {Stream} new stream containing all events from each stream returned by f
	 */

	_Stream2.default.prototype.flatMap = _Stream2.default.prototype.chain = function (f) {
	  return (0, _flatMap.flatMap)(f, this);
	};

	/**
	 * Monadic join. Flatten a Stream<Stream<X>> to Stream<X> by merging inner
	 * streams to the outer. Event arrival times are preserved.
	 * @returns {Stream<X>} new stream containing all events of all inner streams
	 */
	_Stream2.default.prototype.join = function () {
	  return (0, _flatMap.join)(this);
	};

	exports.continueWith = _continueWith.continueWith;
	exports.flatMapEnd = _continueWith.continueWith;

	/**
	 * Map the end event to a new stream, and begin emitting its values.
	 * @param {function(x:*):Stream} f function that receives the end event value,
	 * and *must* return a new Stream to continue with.
	 * @returns {Stream} new stream that emits all events from the original stream,
	 * followed by all events from the stream returned by f.
	 */

	_Stream2.default.prototype.continueWith = _Stream2.default.prototype.flatMapEnd = function (f) {
	  return (0, _continueWith.continueWith)(f, this);
	};

	exports.concatMap = _concatMap.concatMap;

	_Stream2.default.prototype.concatMap = function (f) {
	  return (0, _concatMap.concatMap)(f, this);
	};

	// -----------------------------------------------------------------------
	// Concurrent merging

	exports.mergeConcurrently = _mergeConcurrently.mergeConcurrently;

	/**
	 * Flatten a Stream<Stream<X>> to Stream<X> by merging inner
	 * streams to the outer, limiting the number of inner streams that may
	 * be active concurrently.
	 * @param {number} concurrency at most this many inner streams will be
	 *  allowed to be active concurrently.
	 * @return {Stream<X>} new stream containing all events of all inner
	 *  streams, with limited concurrency.
	 */

	_Stream2.default.prototype.mergeConcurrently = function (concurrency) {
	  return (0, _mergeConcurrently.mergeConcurrently)(concurrency, this);
	};

	// -----------------------------------------------------------------------
	// Merging

	exports.merge = _merge.merge;
	exports.mergeArray = _merge.mergeArray;

	/**
	 * Merge this stream and all the provided streams
	 * @returns {Stream} stream containing items from this stream and s in time
	 * order.  If two events are simultaneous they will be merged in
	 * arbitrary order.
	 */

	_Stream2.default.prototype.merge = function () /* ...streams*/{
	  return (0, _merge.mergeArray)(base.cons(this, arguments));
	};

	// -----------------------------------------------------------------------
	// Combining

	exports.combine = _combine.combine;
	exports.combineArray = _combine.combineArray;

	/**
	 * Combine latest events from all input streams
	 * @param {function(...events):*} f function to combine most recent events
	 * @returns {Stream} stream containing the result of applying f to the most recent
	 *  event of each input stream, whenever a new event arrives on any stream.
	 */

	_Stream2.default.prototype.combine = function (f /*, ...streams*/) {
	  return (0, _combine.combineArray)(f, base.replace(this, 0, arguments));
	};

	// -----------------------------------------------------------------------
	// Sampling

	exports.sample = _sample.sample;
	exports.sampleArray = _sample.sampleArray;
	exports.sampleWith = _sample.sampleWith;

	/**
	 * When an event arrives on sampler, emit the latest event value from stream.
	 * @param {Stream} sampler stream of events at whose arrival time
	 *  signal's latest value will be propagated
	 * @returns {Stream} sampled stream of values
	 */

	_Stream2.default.prototype.sampleWith = function (sampler) {
	  return (0, _sample.sampleWith)(sampler, this);
	};

	/**
	 * When an event arrives on this stream, emit the result of calling f with the latest
	 * values of all streams being sampled
	 * @param {function(...values):*} f function to apply to each set of sampled values
	 * @returns {Stream} stream of sampled and transformed values
	 */
	_Stream2.default.prototype.sample = function (f /* ...streams */) {
	  return (0, _sample.sampleArray)(f, this, base.tail(arguments));
	};

	// -----------------------------------------------------------------------
	// Zipping

	exports.zip = _zip.zip;
	exports.zipArray = _zip.zipArray;

	/**
	 * Pair-wise combine items with those in s. Given 2 streams:
	 * [1,2,3] zipWith f [4,5,6] -> [f(1,4),f(2,5),f(3,6)]
	 * Note: zip causes fast streams to buffer and wait for slow streams.
	 * @param {function(a:Stream, b:Stream, ...):*} f function to combine items
	 * @returns {Stream} new stream containing pairs
	 */

	_Stream2.default.prototype.zip = function (f /*, ...streams*/) {
	  return (0, _zip.zipArray)(f, base.replace(this, 0, arguments));
	};

	// -----------------------------------------------------------------------
	// Switching

	exports.switchLatest = _switch.switchLatest;
	exports.switch = _switch.switchLatest;

	/**
	 * Given a stream of streams, return a new stream that adopts the behavior
	 * of the most recent inner stream.
	 * @returns {Stream} switching stream
	 */

	_Stream2.default.prototype.switch = _Stream2.default.prototype.switchLatest = function () {
	  return (0, _switch.switchLatest)(this);
	};

	// -----------------------------------------------------------------------
	// Filtering

	exports.filter = _filter.filter;
	exports.skipRepeats = _filter.skipRepeats;
	exports.distinct = _filter.skipRepeats;
	exports.skipRepeatsWith = _filter.skipRepeatsWith;
	exports.distinctBy = _filter.skipRepeatsWith;

	/**
	 * Retain only items matching a predicate
	 * stream:                           -12345678-
	 * filter(x => x % 2 === 0, stream): --2-4-6-8-
	 * @param {function(x:*):boolean} p filtering predicate called for each item
	 * @returns {Stream} stream containing only items for which predicate returns truthy
	 */

	_Stream2.default.prototype.filter = function (p) {
	  return (0, _filter.filter)(p, this);
	};

	/**
	 * Skip repeated events, using === to compare items
	 * stream:           -abbcd-
	 * distinct(stream): -ab-cd-
	 * @returns {Stream} stream with no repeated events
	 */
	_Stream2.default.prototype.skipRepeats = function () {
	  return (0, _filter.skipRepeats)(this);
	};

	/**
	 * Skip repeated events, using supplied equals function to compare items
	 * @param {function(a:*, b:*):boolean} equals function to compare items
	 * @returns {Stream} stream with no repeated events
	 */
	_Stream2.default.prototype.skipRepeatsWith = function (equals) {
	  return (0, _filter.skipRepeatsWith)(equals, this);
	};

	// -----------------------------------------------------------------------
	// Slicing

	exports.take = _slice.take;
	exports.skip = _slice.skip;
	exports.slice = _slice.slice;
	exports.takeWhile = _slice.takeWhile;
	exports.skipWhile = _slice.skipWhile;

	/**
	 * stream:          -abcd-
	 * take(2, stream): -ab|
	 * @param {Number} n take up to this many events
	 * @returns {Stream} stream containing at most the first n items from this stream
	 */

	_Stream2.default.prototype.take = function (n) {
	  return (0, _slice.take)(n, this);
	};

	/**
	 * stream:          -abcd->
	 * skip(2, stream): ---cd->
	 * @param {Number} n skip this many events
	 * @returns {Stream} stream not containing the first n events
	 */
	_Stream2.default.prototype.skip = function (n) {
	  return (0, _slice.skip)(n, this);
	};

	/**
	 * Slice a stream by event index. Equivalent to, but more efficient than
	 * stream.take(end).skip(start);
	 * NOTE: Negative start and end are not supported
	 * @param {Number} start skip all events before the start index
	 * @param {Number} end allow all events from the start index to the end index
	 * @returns {Stream} stream containing items where start <= index < end
	 */
	_Stream2.default.prototype.slice = function (start, end) {
	  return (0, _slice.slice)(start, end, this);
	};

	/**
	 * stream:                        -123451234->
	 * takeWhile(x => x < 5, stream): -1234|
	 * @param {function(x:*):boolean} p predicate
	 * @returns {Stream} stream containing items up to, but not including, the
	 * first item for which p returns falsy.
	 */
	_Stream2.default.prototype.takeWhile = function (p) {
	  return (0, _slice.takeWhile)(p, this);
	};

	/**
	 * stream:                        -123451234->
	 * skipWhile(x => x < 5, stream): -----51234->
	 * @param {function(x:*):boolean} p predicate
	 * @returns {Stream} stream containing items following *and including* the
	 * first item for which p returns falsy.
	 */
	_Stream2.default.prototype.skipWhile = function (p) {
	  return (0, _slice.skipWhile)(p, this);
	};

	// -----------------------------------------------------------------------
	// Time slicing

	exports.takeUntil = _timeslice.takeUntil;
	exports.until = _timeslice.takeUntil;
	exports.skipUntil = _timeslice.skipUntil;
	exports.since = _timeslice.skipUntil;
	exports.during = _timeslice.during;

	/**
	 * stream:                    -a-b-c-d-e-f-g->
	 * signal:                    -------x
	 * takeUntil(signal, stream): -a-b-c-|
	 * @param {Stream} signal retain only events in stream before the first
	 * event in signal
	 * @returns {Stream} new stream containing only events that occur before
	 * the first event in signal.
	 */

	_Stream2.default.prototype.until = _Stream2.default.prototype.takeUntil = function (signal) {
	  return (0, _timeslice.takeUntil)(signal, this);
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
	_Stream2.default.prototype.since = _Stream2.default.prototype.skipUntil = function (signal) {
	  return (0, _timeslice.skipUntil)(signal, this);
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
	_Stream2.default.prototype.during = function (timeWindow) {
	  return (0, _timeslice.during)(timeWindow, this);
	};

	// -----------------------------------------------------------------------
	// Delaying

	exports.delay = _delay.delay;

	/**
	 * @param {Number} delayTime milliseconds to delay each item
	 * @returns {Stream} new stream containing the same items, but delayed by ms
	 */

	_Stream2.default.prototype.delay = function (delayTime) {
	  return (0, _delay.delay)(delayTime, this);
	};

	// -----------------------------------------------------------------------
	// Getting event timestamp

	exports.timestamp = _timestamp.timestamp;

	/**
	 * Expose event timestamps into the stream. Turns a Stream<X> into
	 * Stream<{time:t, value:X}>
	 * @returns {Stream<{time:number, value:*}>}
	 */

	_Stream2.default.prototype.timestamp = function () {
	  return (0, _timestamp.timestamp)(this);
	};

	// -----------------------------------------------------------------------
	// Rate limiting

	exports.throttle = _limit.throttle;
	exports.debounce = _limit.debounce;

	/**
	 * Limit the rate of events
	 * stream:              abcd----abcd----
	 * throttle(2, stream): a-c-----a-c-----
	 * @param {Number} period time to suppress events
	 * @returns {Stream} new stream that skips events for throttle period
	 */

	_Stream2.default.prototype.throttle = function (period) {
	  return (0, _limit.throttle)(period, this);
	};

	/**
	 * Wait for a burst of events to subside and emit only the last event in the burst
	 * stream:              abcd----abcd----
	 * debounce(2, stream): -----d-------d--
	 * @param {Number} period events occuring more frequently than this
	 *  on the provided scheduler will be suppressed
	 * @returns {Stream} new debounced stream
	 */
	_Stream2.default.prototype.debounce = function (period) {
	  return (0, _limit.debounce)(period, this);
	};

	// -----------------------------------------------------------------------
	// Awaiting Promises

	exports.fromPromise = _promises.fromPromise;
	exports.awaitPromises = _promises.awaitPromises;
	exports.await = _promises.awaitPromises;

	/**
	 * Await promises, turning a Stream<Promise<X>> into Stream<X>.  Preserves
	 * event order, but timeshifts events based on promise resolution time.
	 * @returns {Stream<X>} stream containing non-promise values
	 */

	_Stream2.default.prototype.await = function () {
	  return (0, _promises.awaitPromises)(this);
	};

	// -----------------------------------------------------------------------
	// Error handling

	exports.recoverWith = _errors.recoverWith;
	exports.flatMapError = _errors.flatMapError;
	exports.throwError = _errors.throwError;

	/**
	 * If this stream encounters an error, recover and continue with items from stream
	 * returned by f.
	 * stream:                  -a-b-c-X-
	 * f(X):                           d-e-f-g-
	 * flatMapError(f, stream): -a-b-c-d-e-f-g-
	 * @param {function(error:*):Stream} f function which returns a new stream
	 * @returns {Stream} new stream which will recover from an error by calling f
	 */

	_Stream2.default.prototype.recoverWith = _Stream2.default.prototype.flatMapError = function (f) {
	  return (0, _errors.flatMapError)(f, this);
	};

	// -----------------------------------------------------------------------
	// Multicasting

	exports.multicast = _multicast2.default;

	/**
	 * Transform the stream into multicast stream.  That means that many subscribers
	 * to the stream will not cause multiple invocations of the internal machinery.
	 * @returns {Stream} new stream which will multicast events to all observers.
	 */

	_Stream2.default.prototype.multicast = function () {
	  return (0, _multicast2.default)(this);
	};

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.fromObservable = fromObservable;
	exports.ObservableSource = ObservableSource;
	exports.SubscriberSink = SubscriberSink;

	var _Stream = __webpack_require__(1);

	var _Stream2 = _interopRequireDefault(_Stream);

	var _dispose = __webpack_require__(4);

	var dispose = _interopRequireWildcard(_dispose);

	function _interopRequireWildcard(obj) {
	  if (obj && obj.__esModule) {
	    return obj;
	  } else {
	    var newObj = {};if (obj != null) {
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	      }
	    }newObj.default = obj;return newObj;
	  }
	}

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function fromObservable(observable) {
	  return new _Stream2.default(new ObservableSource(observable));
	}

	function ObservableSource(observable) {
	  this.observable = observable;
	}

	ObservableSource.prototype.run = function (sink, scheduler) {
	  var sub = this.observable.subscribe(new SubscriberSink(sink, scheduler));
	  if (typeof sub === 'function') {
	    return dispose.create(sub);
	  } else if (sub && typeof sub.unsubscribe === 'function') {
	    return dispose.create(unsubscribe, sub);
	  }

	  throw new TypeError('Observable returned invalid subscription ' + String(sub));
	};

	function SubscriberSink(sink, scheduler) {
	  this.sink = sink;
	  this.scheduler = scheduler;
	}

	SubscriberSink.prototype.next = function (x) {
	  this.sink.event(this.scheduler.now(), x);
	};

	SubscriberSink.prototype.complete = function (x) {
	  this.sink.end(this.scheduler.now(), x);
	};

	SubscriberSink.prototype.error = function (e) {
	  this.sink.error(this.scheduler.now(), e);
	};

	function unsubscribe(subscription) {
	  return subscription.unsubscribe();
	}

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = getObservable;

	var _symbolObservable = __webpack_require__(50);

	var _symbolObservable2 = _interopRequireDefault(_symbolObservable);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function getObservable(o) {
	  // eslint-disable-line complexity
	  var obs = null;
	  if (o) {
	    // Access foreign method only once
	    var method = o[_symbolObservable2.default];
	    if (typeof method === 'function') {
	      obs = method.call(o);
	      if (!(obs && typeof obs.subscribe === 'function')) {
	        throw new TypeError('invalid observable ' + obs);
	      }
	    }
	  }

	  return obs;
	} /** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.subscribe = subscribe;
	exports.SubscribeObserver = SubscribeObserver;
	exports.Subscription = Subscription;

	var _defaultScheduler = __webpack_require__(23);

	var _defaultScheduler2 = _interopRequireDefault(_defaultScheduler);

	var _dispose = __webpack_require__(4);

	var dispose = _interopRequireWildcard(_dispose);

	var _fatalError = __webpack_require__(20);

	var _fatalError2 = _interopRequireDefault(_fatalError);

	function _interopRequireWildcard(obj) {
	  if (obj && obj.__esModule) {
	    return obj;
	  } else {
	    var newObj = {};if (obj != null) {
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	      }
	    }newObj.default = obj;return newObj;
	  }
	}

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function subscribe(subscriber, stream) {
	  if (subscriber == null || (typeof subscriber === 'undefined' ? 'undefined' : _typeof(subscriber)) !== 'object') {
	    throw new TypeError('subscriber must be an object');
	  }

	  var disposable = dispose.settable();
	  var observer = new SubscribeObserver(_fatalError2.default, subscriber, disposable);

	  disposable.setDisposable(stream.source.run(observer, _defaultScheduler2.default));

	  return new Subscription(disposable);
	} /** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function SubscribeObserver(fatalError, subscriber, disposable) {
	  this.fatalError = fatalError;
	  this.subscriber = subscriber;
	  this.disposable = disposable;
	}

	SubscribeObserver.prototype.event = function (t, x) {
	  if (typeof this.subscriber.next === 'function') {
	    this.subscriber.next(x);
	  }
	};

	SubscribeObserver.prototype.end = function (t, x) {
	  var s = this.subscriber;
	  doDispose(this.fatalError, s, s.complete, s.error, this.disposable, x);
	};

	SubscribeObserver.prototype.error = function (t, e) {
	  var s = this.subscriber;
	  doDispose(this.fatalError, s, s.error, s.error, this.disposable, e);
	};

	function Subscription(disposable) {
	  this.disposable = disposable;
	}

	Subscription.prototype.unsubscribe = function () {
	  this.disposable.dispose();
	};

	function doDispose(fatal, subscriber, complete, error, disposable, x) {
	  Promise.resolve(disposable.dispose()).then(function () {
	    if (typeof complete === 'function') {
	      complete.call(subscriber, x);
	    }
	  }).catch(function (e) {
	    if (typeof error === 'function') {
	      error.call(subscriber, e);
	    }
	  }).catch(fatal);
	}

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = ClockTimer;

	var _task = __webpack_require__(26);

	/*global setTimeout, clearTimeout*/

	function ClockTimer() {} /** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	ClockTimer.prototype.now = Date.now;

	ClockTimer.prototype.setTimer = function (f, dt) {
	  return dt <= 0 ? runAsap(f) : setTimeout(f, dt);
	};

	ClockTimer.prototype.clearTimer = function (t) {
	  return t instanceof Asap ? t.cancel() : clearTimeout(t);
	};

	function Asap(f) {
	  this.f = f;
	  this.active = true;
	}

	Asap.prototype.run = function () {
	  return this.active && this.f();
	};

	Asap.prototype.error = function (e) {
	  throw e;
	};

	Asap.prototype.cancel = function () {
	  this.active = false;
	};

	function runAsap(f) {
	  var task = new Asap(f);
	  (0, _task.defer)(task);
	  return task;
	}

/***/ },
/* 117 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = ScheduledTask;
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function ScheduledTask(delay, period, task, scheduler) {
	  this.time = delay;
	  this.period = period;
	  this.task = task;
	  this.scheduler = scheduler;
	  this.active = true;
	}

	ScheduledTask.prototype.run = function () {
	  return this.task.run(this.time);
	};

	ScheduledTask.prototype.error = function (e) {
	  return this.task.error(this.time, e);
	};

	ScheduledTask.prototype.dispose = function () {
	  this.scheduler.cancel(this);
	  return this.task.dispose();
	};

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Scheduler;

	var _ScheduledTask = __webpack_require__(117);

	var _ScheduledTask2 = _interopRequireDefault(_ScheduledTask);

	var _task = __webpack_require__(26);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function Scheduler(timer, timeline) {
	  this.timer = timer;
	  this.timeline = timeline;

	  this._timer = null;
	  this._nextArrival = Infinity;

	  var self = this;
	  this._runReadyTasksBound = function () {
	    self._runReadyTasks(self.now());
	  };
	}

	Scheduler.prototype.now = function () {
	  return this.timer.now();
	};

	Scheduler.prototype.asap = function (task) {
	  return this.schedule(0, -1, task);
	};

	Scheduler.prototype.delay = function (delay, task) {
	  return this.schedule(delay, -1, task);
	};

	Scheduler.prototype.periodic = function (period, task) {
	  return this.schedule(0, period, task);
	};

	Scheduler.prototype.schedule = function (delay, period, task) {
	  var now = this.now();
	  var st = new _ScheduledTask2.default(now + Math.max(0, delay), period, task, this);

	  this.timeline.add(st);
	  this._scheduleNextRun(now);
	  return st;
	};

	Scheduler.prototype.cancel = function (task) {
	  task.active = false;
	  if (this.timeline.remove(task)) {
	    this._reschedule();
	  }
	};

	Scheduler.prototype.cancelAll = function (f) {
	  this.timeline.removeAll(f);
	  this._reschedule();
	};

	Scheduler.prototype._reschedule = function () {
	  if (this.timeline.isEmpty()) {
	    this._unschedule();
	  } else {
	    this._scheduleNextRun(this.now());
	  }
	};

	Scheduler.prototype._unschedule = function () {
	  this.timer.clearTimer(this._timer);
	  this._timer = null;
	};

	Scheduler.prototype._scheduleNextRun = function (now) {
	  // eslint-disable-line complexity
	  if (this.timeline.isEmpty()) {
	    return;
	  }

	  var nextArrival = this.timeline.nextArrival();

	  if (this._timer === null) {
	    this._scheduleNextArrival(nextArrival, now);
	  } else if (nextArrival < this._nextArrival) {
	    this._unschedule();
	    this._scheduleNextArrival(nextArrival, now);
	  }
	};

	Scheduler.prototype._scheduleNextArrival = function (nextArrival, now) {
	  this._nextArrival = nextArrival;
	  var delay = Math.max(0, nextArrival - now);
	  this._timer = this.timer.setTimer(this._runReadyTasksBound, delay);
	};

	Scheduler.prototype._runReadyTasks = function (now) {
	  this._timer = null;
	  this.timeline.runTasks(now, _task.runTask);
	  this._scheduleNextRun(this.now());
	};

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Timeline;

	var _prelude = __webpack_require__(2);

	var base = _interopRequireWildcard(_prelude);

	function _interopRequireWildcard(obj) {
	  if (obj && obj.__esModule) {
	    return obj;
	  } else {
	    var newObj = {};if (obj != null) {
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	      }
	    }newObj.default = obj;return newObj;
	  }
	}

	function Timeline() {
	  this.tasks = [];
	} /** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	Timeline.prototype.nextArrival = function () {
	  return this.isEmpty() ? Infinity : this.tasks[0].time;
	};

	Timeline.prototype.isEmpty = function () {
	  return this.tasks.length === 0;
	};

	Timeline.prototype.add = function (st) {
	  insertByTime(st, this.tasks);
	};

	Timeline.prototype.remove = function (st) {
	  var i = binarySearch(st.time, this.tasks);

	  if (i >= 0 && i < this.tasks.length) {
	    var at = base.findIndex(st, this.tasks[i].events);
	    if (at >= 0) {
	      this.tasks[i].events.splice(at, 1);
	      return true;
	    }
	  }

	  return false;
	};

	Timeline.prototype.removeAll = function (f) {
	  var this$1 = this;

	  for (var i = 0, l = this.tasks.length; i < l; ++i) {
	    removeAllFrom(f, this$1.tasks[i]);
	  }
	};

	Timeline.prototype.runTasks = function (t, runTask) {
	  var this$1 = this;

	  var tasks = this.tasks;
	  var l = tasks.length;
	  var i = 0;

	  while (i < l && tasks[i].time <= t) {
	    ++i;
	  }

	  this.tasks = tasks.slice(i);

	  // Run all ready tasks
	  for (var j = 0; j < i; ++j) {
	    this$1.tasks = runTasks(runTask, tasks[j], this$1.tasks);
	  }
	};

	function runTasks(runTask, timeslot, tasks) {
	  // eslint-disable-line complexity
	  var events = timeslot.events;
	  for (var i = 0; i < events.length; ++i) {
	    var task = events[i];

	    if (task.active) {
	      runTask(task);

	      // Reschedule periodic repeating tasks
	      // Check active again, since a task may have canceled itself
	      if (task.period >= 0 && task.active) {
	        task.time = task.time + task.period;
	        insertByTime(task, tasks);
	      }
	    }
	  }

	  return tasks;
	}

	function insertByTime(task, timeslots) {
	  // eslint-disable-line complexity
	  var l = timeslots.length;

	  if (l === 0) {
	    timeslots.push(newTimeslot(task.time, [task]));
	    return;
	  }

	  var i = binarySearch(task.time, timeslots);

	  if (i >= l) {
	    timeslots.push(newTimeslot(task.time, [task]));
	  } else if (task.time === timeslots[i].time) {
	    timeslots[i].events.push(task);
	  } else {
	    timeslots.splice(i, 0, newTimeslot(task.time, [task]));
	  }
	}

	function removeAllFrom(f, timeslot) {
	  timeslot.events = base.removeAll(f, timeslot.events);
	}

	function binarySearch(t, sortedArray) {
	  // eslint-disable-line complexity
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

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = DeferredSink;

	var _task = __webpack_require__(26);

	function DeferredSink(sink) {
	  this.sink = sink;
	  this.events = [];
	  this.active = true;
	} /** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	DeferredSink.prototype.event = function (t, x) {
	  if (!this.active) {
	    return;
	  }

	  if (this.events.length === 0) {
	    (0, _task.defer)(new PropagateAllTask(this.sink, t, this.events));
	  }

	  this.events.push({ time: t, value: x });
	};

	DeferredSink.prototype.end = function (t, x) {
	  if (!this.active) {
	    return;
	  }

	  this._end(new EndTask(t, x, this.sink));
	};

	DeferredSink.prototype.error = function (t, e) {
	  this._end(new ErrorTask(t, e, this.sink));
	};

	DeferredSink.prototype._end = function (task) {
	  this.active = false;
	  (0, _task.defer)(task);
	};

	function PropagateAllTask(sink, time, events) {
	  this.sink = sink;
	  this.events = events;
	  this.time = time;
	}

	PropagateAllTask.prototype.run = function () {
	  var this$1 = this;

	  var events = this.events;
	  var sink = this.sink;
	  var event;

	  for (var i = 0, l = events.length; i < l; ++i) {
	    event = events[i];
	    this$1.time = event.time;
	    sink.event(event.time, event.value);
	  }

	  events.length = 0;
	};

	PropagateAllTask.prototype.error = function (e) {
	  this.sink.error(this.time, e);
	};

	function EndTask(t, x, sink) {
	  this.time = t;
	  this.value = x;
	  this.sink = sink;
	}

	EndTask.prototype.run = function () {
	  this.sink.end(this.time, this.value);
	};

	EndTask.prototype.error = function (e) {
	  this.sink.error(this.time, e);
	};

	function ErrorTask(t, e, sink) {
	  this.time = t;
	  this.value = e;
	  this.sink = sink;
	}

	ErrorTask.prototype.run = function () {
	  this.sink.error(this.time, this.value);
	};

	ErrorTask.prototype.error = function (e) {
	  throw e;
	};

/***/ },
/* 121 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = SafeSink;
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function SafeSink(sink) {
	  this.sink = sink;
	  this.active = true;
	}

	SafeSink.prototype.event = function (t, x) {
	  if (!this.active) {
	    return;
	  }
	  this.sink.event(t, x);
	};

	SafeSink.prototype.end = function (t, x) {
	  if (!this.active) {
	    return;
	  }
	  this.disable();
	  this.sink.end(t, x);
	};

	SafeSink.prototype.error = function (t, e) {
	  this.disable();
	  this.sink.error(t, e);
	};

	SafeSink.prototype.disable = function () {
	  this.active = false;
	  return this.sink;
	};

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = EventEmitterSource;

	var _DeferredSink = __webpack_require__(120);

	var _DeferredSink2 = _interopRequireDefault(_DeferredSink);

	var _dispose = __webpack_require__(4);

	var dispose = _interopRequireWildcard(_dispose);

	var _tryEvent = __webpack_require__(25);

	var tryEvent = _interopRequireWildcard(_tryEvent);

	function _interopRequireWildcard(obj) {
	  if (obj && obj.__esModule) {
	    return obj;
	  } else {
	    var newObj = {};if (obj != null) {
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	      }
	    }newObj.default = obj;return newObj;
	  }
	}

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function EventEmitterSource(event, source) {
	  this.event = event;
	  this.source = source;
	} /** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	EventEmitterSource.prototype.run = function (sink, scheduler) {
	  // NOTE: Because EventEmitter allows events in the same call stack as
	  // a listener is added, use a DeferredSink to buffer events
	  // until the stack clears, then propagate.  This maintains most.js's
	  // invariant that no event will be delivered in the same call stack
	  // as an observer begins observing.
	  var dsink = new _DeferredSink2.default(sink);

	  function addEventVariadic(a) {
	    var arguments$1 = arguments;

	    var l = arguments.length;
	    if (l > 1) {
	      var arr = new Array(l);
	      for (var i = 0; i < l; ++i) {
	        arr[i] = arguments$1[i];
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

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = EventTargetSource;

	var _dispose = __webpack_require__(4);

	var dispose = _interopRequireWildcard(_dispose);

	var _tryEvent = __webpack_require__(25);

	var tryEvent = _interopRequireWildcard(_tryEvent);

	function _interopRequireWildcard(obj) {
	  if (obj && obj.__esModule) {
	    return obj;
	  } else {
	    var newObj = {};if (obj != null) {
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	      }
	    }newObj.default = obj;return newObj;
	  }
	}

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function EventTargetSource(event, source, capture) {
	  this.event = event;
	  this.source = source;
	  this.capture = capture;
	}

	EventTargetSource.prototype.run = function (sink, scheduler) {
	  function addEvent(e) {
	    tryEvent.tryEvent(scheduler.now(), e, sink);
	  }

	  this.source.addEventListener(this.event, addEvent, this.capture);

	  return dispose.create(disposeEventTarget, { target: this, addEvent: addEvent });
	};

	function disposeEventTarget(info) {
	  var target = info.target;
	  target.source.removeEventListener(target.event, info.addEvent, target.capture);
	}

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.from = from;

	var _Stream = __webpack_require__(1);

	var _Stream2 = _interopRequireDefault(_Stream);

	var _fromArray = __webpack_require__(125);

	var _iterable = __webpack_require__(48);

	var _fromIterable = __webpack_require__(127);

	var _getObservable = __webpack_require__(114);

	var _getObservable2 = _interopRequireDefault(_getObservable);

	var _fromObservable = __webpack_require__(113);

	var _prelude = __webpack_require__(2);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function from(a) {
	  // eslint-disable-line complexity
	  if (a instanceof _Stream2.default) {
	    return a;
	  }

	  var observable = (0, _getObservable2.default)(a);
	  if (observable != null) {
	    return (0, _fromObservable.fromObservable)(observable);
	  }

	  if (Array.isArray(a) || (0, _prelude.isArrayLike)(a)) {
	    return (0, _fromArray.fromArray)(a);
	  }

	  if ((0, _iterable.isIterable)(a)) {
	    return (0, _fromIterable.fromIterable)(a);
	  }

	  throw new TypeError('from(x) must be observable, iterable, or array-like: ' + a);
	} /** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.fromArray = fromArray;

	var _Stream = __webpack_require__(1);

	var _Stream2 = _interopRequireDefault(_Stream);

	var _PropagateTask = __webpack_require__(7);

	var _PropagateTask2 = _interopRequireDefault(_PropagateTask);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function fromArray(a) {
	  return new _Stream2.default(new ArraySource(a));
	}

	function ArraySource(a) {
	  this.array = a;
	}

	ArraySource.prototype.run = function (sink, scheduler) {
	  return scheduler.asap(new _PropagateTask2.default(runProducer, this.array, sink));
	};

	function runProducer(t, array, sink) {
	  for (var i = 0, l = array.length; i < l && this.active; ++i) {
	    sink.event(t, array[i]);
	  }

	  this.active && end(t);

	  function end(t) {
	    sink.end(t);
	  }
	}

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.fromEvent = fromEvent;

	var _Stream = __webpack_require__(1);

	var _Stream2 = _interopRequireDefault(_Stream);

	var _EventTargetSource = __webpack_require__(123);

	var _EventTargetSource2 = _interopRequireDefault(_EventTargetSource);

	var _EventEmitterSource = __webpack_require__(122);

	var _EventEmitterSource2 = _interopRequireDefault(_EventEmitterSource);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	/**
	 * Create a stream from an EventTarget, such as a DOM Node, or EventEmitter.
	 * @param {String} event event type name, e.g. 'click'
	 * @param {EventTarget|EventEmitter} source EventTarget or EventEmitter
	 * @param {*?} capture for DOM events, whether to use
	 *  capturing--passed as 3rd parameter to addEventListener.
	 * @returns {Stream} stream containing all events of the specified type
	 * from the source.
	 */
	function fromEvent(event, source, capture) {
	  // eslint-disable-line complexity
	  var s;

	  if (typeof source.addEventListener === 'function' && typeof source.removeEventListener === 'function') {
	    if (arguments.length < 3) {
	      capture = false;
	    }

	    s = new _EventTargetSource2.default(event, source, capture);
	  } else if (typeof source.addListener === 'function' && typeof source.removeListener === 'function') {
	    s = new _EventEmitterSource2.default(event, source);
	  } else {
	    throw new Error('source must support addEventListener/removeEventListener or addListener/removeListener');
	  }

	  return new _Stream2.default(s);
	} /** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.fromIterable = fromIterable;

	var _Stream = __webpack_require__(1);

	var _Stream2 = _interopRequireDefault(_Stream);

	var _iterable = __webpack_require__(48);

	var _PropagateTask = __webpack_require__(7);

	var _PropagateTask2 = _interopRequireDefault(_PropagateTask);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function fromIterable(iterable) {
	  return new _Stream2.default(new IterableSource(iterable));
	} /** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function IterableSource(iterable) {
	  this.iterable = iterable;
	}

	IterableSource.prototype.run = function (sink, scheduler) {
	  return new IteratorProducer((0, _iterable.getIterator)(this.iterable), sink, scheduler);
	};

	function IteratorProducer(iterator, sink, scheduler) {
	  this.scheduler = scheduler;
	  this.iterator = iterator;
	  this.task = new _PropagateTask2.default(runProducer, this, sink);
	  scheduler.asap(this.task);
	}

	IteratorProducer.prototype.dispose = function () {
	  return this.task.dispose();
	};

	function runProducer(t, producer, sink) {
	  var x = producer.iterator.next();
	  if (x.done) {
	    sink.end(t, x.value);
	  } else {
	    sink.event(t, x.value);
	  }

	  producer.scheduler.asap(producer.task);
	}

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.generate = generate;

	var _Stream = __webpack_require__(1);

	var _Stream2 = _interopRequireDefault(_Stream);

	var _prelude = __webpack_require__(2);

	var base = _interopRequireWildcard(_prelude);

	function _interopRequireWildcard(obj) {
	  if (obj && obj.__esModule) {
	    return obj;
	  } else {
	    var newObj = {};if (obj != null) {
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	      }
	    }newObj.default = obj;return newObj;
	  }
	}

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	/**
	 * Compute a stream using an *async* generator, which yields promises
	 * to control event times.
	 * @param f
	 * @returns {Stream}
	 */
	/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function generate(f /*, ...args */) {
	  return new _Stream2.default(new GenerateSource(f, base.tail(arguments)));
	}

	function GenerateSource(f, args) {
	  this.f = f;
	  this.args = args;
	}

	GenerateSource.prototype.run = function (sink, scheduler) {
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
	  }, function (e) {
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

	Generate.prototype.dispose = function () {
	  this.active = false;
	};

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.iterate = iterate;

	var _Stream = __webpack_require__(1);

	var _Stream2 = _interopRequireDefault(_Stream);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	/**
	 * Compute a stream by iteratively calling f to produce values
	 * Event times may be controlled by returning a Promise from f
	 * @param {function(x:*):*|Promise<*>} f
	 * @param {*} x initial value
	 * @returns {Stream}
	 */
	function iterate(f, x) {
	  return new _Stream2.default(new IterateSource(f, x));
	} /** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function IterateSource(f, x) {
	  this.f = f;
	  this.value = x;
	}

	IterateSource.prototype.run = function (sink, scheduler) {
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

	Iterate.prototype.dispose = function () {
	  this.active = false;
	};

	function stepIterate(iterate, x) {
	  iterate.sink.event(iterate.scheduler.now(), x);

	  if (!iterate.active) {
	    return x;
	  }

	  var f = iterate.f;
	  return Promise.resolve(f(x)).then(function (y) {
	    return continueIterate(iterate, y);
	  });
	}

	function continueIterate(iterate, x) {
	  return !iterate.active ? iterate.value : stepIterate(iterate, x);
	}

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.periodic = periodic;

	var _Stream = __webpack_require__(1);

	var _Stream2 = _interopRequireDefault(_Stream);

	var _PropagateTask = __webpack_require__(7);

	var _PropagateTask2 = _interopRequireDefault(_PropagateTask);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	/**
	 * Create a stream that emits the current time periodically
	 * @param {Number} period periodicity of events in millis
	 * @param {*} value value to emit each period
	 * @returns {Stream} new stream that emits the current time every period
	 */
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function periodic(period, value) {
	  return new _Stream2.default(new Periodic(period, value));
	}

	function Periodic(period, value) {
	  this.period = period;
	  this.value = value;
	}

	Periodic.prototype.run = function (sink, scheduler) {
	  return scheduler.periodic(this.period, _PropagateTask2.default.event(this.value, sink));
	};

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.unfold = unfold;

	var _Stream = __webpack_require__(1);

	var _Stream2 = _interopRequireDefault(_Stream);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

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
	  return new _Stream2.default(new UnfoldSource(f, seed));
	} /** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	function UnfoldSource(f, seed) {
	  this.f = f;
	  this.value = seed;
	}

	UnfoldSource.prototype.run = function (sink, scheduler) {
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

	Unfold.prototype.dispose = function () {
	  this.active = false;
	};

	function stepUnfold(unfold, x) {
	  var f = unfold.f;
	  return Promise.resolve(f(x)).then(function (tuple) {
	    return continueUnfold(unfold, tuple);
	  });
	}

	function continueUnfold(unfold, tuple) {
	  if (tuple.done) {
	    unfold.sink.end(unfold.scheduler.now(), tuple.value);
	    return tuple.value;
	  }

	  unfold.sink.event(unfold.scheduler.now(), tuple.value);

	  if (!unfold.active) {
	    return tuple.value;
	  }
	  return stepUnfold(unfold, tuple.seed);
	}

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, module) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _ponyfill = __webpack_require__(133);

	var _ponyfill2 = _interopRequireDefault(_ponyfill);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var root; /* global window */

	if (typeof self !== 'undefined') {
	  root = self;
	} else if (typeof window !== 'undefined') {
	  root = window;
	} else if (typeof global !== 'undefined') {
	  root = global;
	} else if (true) {
	  root = module;
	} else {
	  root = Function('return this')();
	}

	var result = (0, _ponyfill2['default'])(root);
	exports['default'] = result;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(178)(module)))

/***/ },
/* 133 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports['default'] = symbolObservablePonyfill;
	function symbolObservablePonyfill(root) {
		var result;
		var _Symbol = root.Symbol;

		if (typeof _Symbol === 'function') {
			if (_Symbol.observable) {
				result = _Symbol.observable;
			} else {
				result = _Symbol('observable');
				_Symbol.observable = result;
			}
		} else {
			result = '@@observable';
		}

		return result;
	};

/***/ },
/* 134 */
/***/ function(module, exports) {

	"use strict";

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
	LinkedList.prototype.add = function (x) {
		if (this.head !== null) {
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
	LinkedList.prototype.remove = function (x) {
		--this.length;
		if (x === this.head) {
			this.head = this.head.next;
		}
		if (x.next !== null) {
			x.next.prev = x.prev;
			x.next = null;
		}
		if (x.prev !== null) {
			x.prev.next = x.next;
			x.prev = null;
		}
	};

	/**
	 * @returns {boolean} true iff there are no nodes in the list
	 */
	LinkedList.prototype.isEmpty = function () {
		return this.length === 0;
	};

	/**
	 * Dispose all nodes
	 * @returns {Promise} promise that fulfills when all nodes have been disposed,
	 *  or rejects if an error occurs while disposing
	 */
	LinkedList.prototype.dispose = function () {
		if (this.isEmpty()) {
			return Promise.resolve();
		}

		var promises = [];
		var x = this.head;
		this.head = null;
		this.length = 0;

		while (x !== null) {
			promises.push(x.dispose());
			x = x.next;
		}

		return Promise.all(promises);
	};

/***/ },
/* 135 */
/***/ function(module, exports) {

	"use strict";

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	// Based on https://github.com/petkaantonov/deque

	module.exports = Queue;

	function Queue(capPow2) {
		this._capacity = capPow2 || 32;
		this._length = 0;
		this._head = 0;
	}

	Queue.prototype.push = function (x) {
		var len = this._length;
		this._checkCapacity(len + 1);

		var i = this._head + len & this._capacity - 1;
		this[i] = x;
		this._length = len + 1;
	};

	Queue.prototype.shift = function () {
		var head = this._head;
		var x = this[head];

		this[head] = void 0;
		this._head = head + 1 & this._capacity - 1;
		this._length--;
		return x;
	};

	Queue.prototype.isEmpty = function () {
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
			copy(this, 0, this, oldCapacity, last & oldCapacity - 1);
		}
	};

	function copy(src, srcIndex, dst, dstIndex, len) {
		for (var j = 0; j < len; ++j) {
			dst[j + dstIndex] = src[j + srcIndex];
			src[j + srcIndex] = void 0;
		}
	}

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(0);
	var Pipe = __webpack_require__(5);
	var runSource = __webpack_require__(57).withDefaultScheduler;
	var dispose = __webpack_require__(3);
	var PropagateTask = __webpack_require__(8);

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
		return new Stream(new Scan(f, initial, stream.source));
	}

	function Scan(f, z, source) {
		this.source = source;
		this.f = f;
		this.value = z;
	}

	Scan.prototype.run = function (sink, scheduler) {
		var d1 = scheduler.asap(PropagateTask.event(this.value, sink));
		var d2 = this.source.run(new ScanSink(this.f, this.value, sink), scheduler);
		return dispose.all([d1, d2]);
	};

	function ScanSink(f, z, sink) {
		this.f = f;
		this.value = z;
		this.sink = sink;
	}

	ScanSink.prototype.event = function (t, x) {
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
		return runSource(new Reduce(f, initial, stream.source));
	}

	function Reduce(f, z, source) {
		this.source = source;
		this.f = f;
		this.value = z;
	}

	Reduce.prototype.run = function (sink, scheduler) {
		return this.source.run(new ReduceSink(this.f, this.value, sink), scheduler);
	};

	function ReduceSink(f, z, sink) {
		this.f = f;
		this.value = z;
		this.sink = sink;
	}

	ReduceSink.prototype.event = function (t, x) {
		var f = this.f;
		this.value = f(this.value, x);
		this.sink.event(t, this.value);
	};

	ReduceSink.prototype.error = Pipe.prototype.error;

	ReduceSink.prototype.end = function (t) {
		this.sink.end(t, this.value);
	};

	function noop() {}

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var combine = __webpack_require__(51).combine;
	var apply = __webpack_require__(2).apply;

	exports.ap = ap;

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

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var streamOf = __webpack_require__(10).of;
	var continueWith = __webpack_require__(52).continueWith;

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
	  return continueWith(function () {
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

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var mergeMapConcurrently = __webpack_require__(15).mergeMapConcurrently;

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
	  return mergeMapConcurrently(f, 1, stream);
	}

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(0);
	var Sink = __webpack_require__(5);
	var dispose = __webpack_require__(3);
	var PropagateTask = __webpack_require__(8);

	exports.delay = delay;

	/**
	 * @param {Number} delayTime milliseconds to delay each item
	 * @param {Stream} stream
	 * @returns {Stream} new stream containing the same items, but delayed by ms
	 */
	function delay(delayTime, stream) {
		return delayTime <= 0 ? stream : new Stream(new Delay(delayTime, stream.source));
	}

	function Delay(dt, source) {
		this.dt = dt;
		this.source = source;
	}

	Delay.prototype.run = function (sink, scheduler) {
		var delaySink = new DelaySink(this.dt, sink, scheduler);
		return dispose.all([delaySink, this.source.run(delaySink, scheduler)]);
	};

	function DelaySink(dt, sink, scheduler) {
		this.dt = dt;
		this.sink = sink;
		this.scheduler = scheduler;
	}

	DelaySink.prototype.dispose = function () {
		var self = this;
		this.scheduler.cancelAll(function (task) {
			return task.sink === self.sink;
		});
	};

	DelaySink.prototype.event = function (t, x) {
		this.scheduler.delay(this.dt, PropagateTask.event(x, this.sink));
	};

	DelaySink.prototype.end = function (t, x) {
		this.scheduler.delay(this.dt, PropagateTask.end(x, this.sink));
	};

	DelaySink.prototype.error = Sink.prototype.error;

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(0);
	var SafeSink = __webpack_require__(165);
	var Pipe = __webpack_require__(5);
	var dispose = __webpack_require__(3);
	var tryEvent = __webpack_require__(17);
	var isPromise = __webpack_require__(27).isPromise;
	var PropagateTask = __webpack_require__(8);

	exports.flatMapError = recoverWith;
	exports.recoverWith = recoverWith;
	exports.throwError = throwError;

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
		return new Stream(new ErrorSource(e));
	}

	function ErrorSource(e) {
		this.value = e;
	}

	ErrorSource.prototype.run = function (sink, scheduler) {
		return scheduler.asap(new PropagateTask(runError, this.value, sink));
	};

	function runError(t, e, sink) {
		sink.error(t, e);
	}

	function RecoverWith(f, source) {
		this.f = f;
		this.source = source;
	}

	RecoverWith.prototype.run = function (sink, scheduler) {
		return new RecoverWithSink(this.f, this.source, sink, scheduler);
	};

	function RecoverWithSink(f, source, sink, scheduler) {
		this.f = f;
		this.sink = new SafeSink(sink);
		this.scheduler = scheduler;
		this.disposable = source.run(this, scheduler);
	}

	RecoverWithSink.prototype.event = function (t, x) {
		tryEvent.tryEvent(t, x, this.sink);
	};

	RecoverWithSink.prototype.end = function (t, x) {
		tryEvent.tryEnd(t, x, this.sink);
	};

	RecoverWithSink.prototype.error = function (t, e) {
		var nextSink = this.sink.disable();

		dispose.tryDispose(t, this.disposable, this.sink);
		this._startNext(t, e, nextSink);
	};

	RecoverWithSink.prototype._startNext = function (t, x, sink) {
		try {
			this.disposable = this._continue(this.f, x, sink);
		} catch (e) {
			sink.error(t, e);
		}
	};

	RecoverWithSink.prototype._continue = function (f, x, sink) {
		var stream = f(x);
		return stream.source.run(sink, this.scheduler);
	};

	RecoverWithSink.prototype.dispose = function () {
		return this.disposable.dispose();
	};

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(0);
	var Sink = __webpack_require__(5);
	var Filter = __webpack_require__(55);

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

	SkipRepeats.prototype.run = function (sink, scheduler) {
		return this.source.run(new SkipRepeatsSink(this.equals, sink), scheduler);
	};

	function SkipRepeatsSink(equals, sink) {
		this.equals = equals;
		this.sink = sink;
		this.value = void 0;
		this.init = true;
	}

	SkipRepeatsSink.prototype.end = Sink.prototype.end;
	SkipRepeatsSink.prototype.error = Sink.prototype.error;

	SkipRepeatsSink.prototype.event = function (t, x) {
		if (this.init) {
			this.init = false;
			this.value = x;
			this.sink.event(t, x);
		} else if (!this.equals(this.value, x)) {
			this.value = x;
			this.sink.event(t, x);
		}
	};

	function same(a, b) {
		return a === b;
	}

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(0);
	var Sink = __webpack_require__(5);
	var dispose = __webpack_require__(3);
	var PropagateTask = __webpack_require__(8);
	var Map = __webpack_require__(29);

	exports.throttle = throttle;
	exports.debounce = debounce;

	/**
	 * Limit the rate of events by suppressing events that occur too often
	 * @param {Number} period time to suppress events
	 * @param {Stream} stream
	 * @returns {Stream}
	 */
	function throttle(period, stream) {
		return new Stream(throttleSource(period, stream.source));
	}

	function throttleSource(period, source) {
		return source instanceof Map ? commuteMapThrottle(period, source) : source instanceof Throttle ? fuseThrottle(period, source) : new Throttle(period, source);
	}

	function commuteMapThrottle(period, source) {
		return Map.create(source.f, throttleSource(period, source.source));
	}

	function fuseThrottle(period, source) {
		return new Throttle(Math.max(period, source.period), source.source);
	}

	function Throttle(period, source) {
		this.period = period;
		this.source = source;
	}

	Throttle.prototype.run = function (sink, scheduler) {
		return this.source.run(new ThrottleSink(this.period, sink), scheduler);
	};

	function ThrottleSink(period, sink) {
		this.time = 0;
		this.period = period;
		this.sink = sink;
	}

	ThrottleSink.prototype.event = function (t, x) {
		if (t >= this.time) {
			this.time = t + this.period;
			this.sink.event(t, x);
		}
	};

	ThrottleSink.prototype.end = Sink.prototype.end;

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

	Debounce.prototype.run = function (sink, scheduler) {
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

	DebounceSink.prototype.event = function (t, x) {
		this._clearTimer();
		this.value = x;
		this.timer = this.scheduler.delay(this.dt, PropagateTask.event(x, this.sink));
	};

	DebounceSink.prototype.end = function (t, x) {
		if (this._clearTimer()) {
			this.sink.event(t, this.value);
			this.value = void 0;
		}
		this.sink.end(t, x);
	};

	DebounceSink.prototype.error = function (t, x) {
		this._clearTimer();
		this.sink.error(t, x);
	};

	DebounceSink.prototype.dispose = function () {
		this._clearTimer();
	};

	DebounceSink.prototype._clearTimer = function () {
		if (this.timer === null) {
			return false;
		}
		this.timer.dispose();
		this.timer = null;
		return true;
	};

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(0);
	var Pipe = __webpack_require__(5);

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

	Loop.prototype.run = function (sink, scheduler) {
		return this.source.run(new LoopSink(this.step, this.seed, sink), scheduler);
	};

	function LoopSink(stepper, seed, sink) {
		this.step = stepper;
		this.seed = seed;
		this.sink = sink;
	}

	LoopSink.prototype.error = Pipe.prototype.error;

	LoopSink.prototype.event = function (t, x) {
		var result = this.step(this.seed, x);
		this.seed = result.seed;
		this.sink.event(t, result.value);
	};

	LoopSink.prototype.end = function (t) {
		this.sink.end(t, this.seed);
	};

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(0);
	var Pipe = __webpack_require__(5);
	var IndexSink = __webpack_require__(32);
	var empty = __webpack_require__(10).empty;
	var dispose = __webpack_require__(3);
	var base = __webpack_require__(2);

	var copy = base.copy;
	var reduce = base.reduce;

	exports.merge = merge;
	exports.mergeArray = mergeArray;

	/**
	 * @returns {Stream} stream containing events from all streams in the argument
	 * list in time order.  If two events are simultaneous they will be merged in
	 * arbitrary order.
	 */
	function merge() /*...streams*/{
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
		return l === 0 ? empty() : l === 1 ? streams[0] : new Stream(mergeSources(streams));
	}

	/**
	 * This implements fusion/flattening for merge.  It will
	 * fuse adjacent merge operations.  For example:
	 * - a.merge(b).merge(c) effectively becomes merge(a, b, c)
	 * - merge(a, merge(b, c)) effectively becomes merge(a, b, c)
	 * It does this by concatenating the sources arrays of
	 * any nested Merge sources, in effect "flattening" nested
	 * merge operations into a single merge.
	 */
	function mergeSources(streams) {
		return new Merge(reduce(appendSources, [], streams));
	}

	function appendSources(sources, stream) {
		var source = stream.source;
		return source instanceof Merge ? sources.concat(source.sources) : sources.concat(source);
	}

	function Merge(sources) {
		this.sources = sources;
	}

	Merge.prototype.run = function (sink, scheduler) {
		var l = this.sources.length;
		var disposables = new Array(l);
		var sinks = new Array(l);

		var mergeSink = new MergeSink(disposables, sinks, sink);

		for (var indexSink, i = 0; i < l; ++i) {
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

	MergeSink.prototype.event = function (t, indexValue) {
		this.sink.event(t, indexValue.value);
	};

	MergeSink.prototype.end = function (t, indexedValue) {
		dispose.tryDispose(t, this.disposables[indexedValue.index], this.sink);
		if (--this.activeCount === 0) {
			this.sink.end(t, indexedValue.value);
		}
	};

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var run = __webpack_require__(57).withDefaultScheduler;
	var tap = __webpack_require__(16).tap;

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
	  return drain(tap(f, stream));
	}

	var defaultScheduler = __webpack_require__(31);
	var dispose = __webpack_require__(3);

	/**
	 * "Run" a stream by creating demand and consuming all events
	 * @param {Stream<T>} stream stream to drain
	 * @return {Promise} promise that fulfills after the stream ends without
	 *  an error, or rejects if the stream ends with an error.
	 */
	function drain(stream) {
	  return run(stream.source);
	}

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(0);
	var fatal = __webpack_require__(28);
	var just = __webpack_require__(10).of;

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

	Await.prototype.run = function (sink, scheduler) {
		return this.source.run(new AwaitSink(sink, scheduler), scheduler);
	};

	function AwaitSink(sink, scheduler) {
		this.sink = sink;
		this.scheduler = scheduler;
		this.queue = Promise.resolve();
		var self = this;

		// Pre-create closures, to avoid creating them per event
		this._eventBound = function (x) {
			self.sink.event(self.scheduler.now(), x);
		};

		this._endBound = function (x) {
			self.sink.end(self.scheduler.now(), x);
		};

		this._errorBound = function (e) {
			self.sink.error(self.scheduler.now(), e);
		};
	}

	AwaitSink.prototype.event = function (t, promise) {
		var self = this;
		this.queue = this.queue.then(function () {
			return self._event(promise);
		}).catch(this._errorBound);
	};

	AwaitSink.prototype.end = function (t, x) {
		var self = this;
		this.queue = this.queue.then(function () {
			return self._end(x);
		}).catch(this._errorBound);
	};

	AwaitSink.prototype.error = function (t, e) {
		var self = this;
		// Don't resolve error values, propagate directly
		this.queue = this.queue.then(function () {
			return self._errorBound(e);
		}).catch(fatal);
	};

	AwaitSink.prototype._event = function (promise) {
		return promise.then(this._eventBound);
	};

	AwaitSink.prototype._end = function (x) {
		return Promise.resolve(x).then(this._endBound);
	};

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(0);
	var Pipe = __webpack_require__(5);
	var dispose = __webpack_require__(3);
	var base = __webpack_require__(2);
	var invoke = __webpack_require__(30);

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
		return new Stream(new Sampler(base.id, sampler.source, [stream.source]));
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

	Sampler.prototype.run = function (sink, scheduler) {
		var l = this.sources.length;
		var disposables = new Array(l + 1);
		var sinks = new Array(l);

		var sampleSink = new SampleSink(this.f, sinks, sink);

		for (var hold, i = 0; i < l; ++i) {
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

	Hold.prototype.event = function (t, x) {
		this.value = x;
		this.hasValue = true;
		this.sink._notify(this);
	};

	Hold.prototype.end = function () {};
	Hold.prototype.error = Pipe.prototype.error;

	function SampleSink(f, sinks, sink) {
		this.f = f;
		this.sinks = sinks;
		this.sink = sink;
		this.active = false;
	}

	SampleSink.prototype._notify = function () {
		if (!this.active) {
			this.active = this.sinks.every(hasValue);
		}
	};

	SampleSink.prototype.event = function (t) {
		if (this.active) {
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

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(0);
	var Sink = __webpack_require__(5);
	var core = __webpack_require__(10);
	var dispose = __webpack_require__(3);
	var Map = __webpack_require__(29);

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
		return end <= start ? core.empty() : new Stream(sliceSource(start, end, stream.source));
	}

	function sliceSource(start, end, source) {
		return source instanceof Map ? commuteMapSlice(start, end, source) : source instanceof Slice ? fuseSlice(start, end, source) : new Slice(start, end, source);
	}

	function commuteMapSlice(start, end, source) {
		return Map.create(source.f, sliceSource(start, end, source.source));
	}

	function fuseSlice(start, end, source) {
		start += source.min;
		end = Math.min(end + source.min, source.max);
		return new Slice(start, end, source.source);
	}

	function Slice(min, max, source) {
		this.source = source;
		this.min = min;
		this.max = max;
	}

	Slice.prototype.run = function (sink, scheduler) {
		return new SliceSink(this.min, this.max - this.min, this.source, sink, scheduler);
	};

	function SliceSink(skip, take, source, sink, scheduler) {
		this.sink = sink;
		this.skip = skip;
		this.take = take;
		this.disposable = dispose.once(source.run(this, scheduler));
	}

	SliceSink.prototype.end = Sink.prototype.end;
	SliceSink.prototype.error = Sink.prototype.error;

	SliceSink.prototype.event = function (t, x) {
		if (this.skip > 0) {
			this.skip -= 1;
			return;
		}

		if (this.take === 0) {
			return;
		}

		this.take -= 1;
		this.sink.event(t, x);
		if (this.take === 0) {
			this.dispose();
			this.sink.end(t, x);
		}
	};

	SliceSink.prototype.dispose = function () {
		return this.disposable.dispose();
	};

	function takeWhile(p, stream) {
		return new Stream(new TakeWhile(p, stream.source));
	}

	function TakeWhile(p, source) {
		this.p = p;
		this.source = source;
	}

	TakeWhile.prototype.run = function (sink, scheduler) {
		return new TakeWhileSink(this.p, this.source, sink, scheduler);
	};

	function TakeWhileSink(p, source, sink, scheduler) {
		this.p = p;
		this.sink = sink;
		this.active = true;
		this.disposable = dispose.once(source.run(this, scheduler));
	}

	TakeWhileSink.prototype.end = Sink.prototype.end;
	TakeWhileSink.prototype.error = Sink.prototype.error;

	TakeWhileSink.prototype.event = function (t, x) {
		if (!this.active) {
			return;
		}

		var p = this.p;
		this.active = p(x);
		if (this.active) {
			this.sink.event(t, x);
		} else {
			this.dispose();
			this.sink.end(t, x);
		}
	};

	TakeWhileSink.prototype.dispose = function () {
		return this.disposable.dispose();
	};

	function skipWhile(p, stream) {
		return new Stream(new SkipWhile(p, stream.source));
	}

	function SkipWhile(p, source) {
		this.p = p;
		this.source = source;
	}

	SkipWhile.prototype.run = function (sink, scheduler) {
		return this.source.run(new SkipWhileSink(this.p, sink), scheduler);
	};

	function SkipWhileSink(p, sink) {
		this.p = p;
		this.sink = sink;
		this.skipping = true;
	}

	SkipWhileSink.prototype.end = Sink.prototype.end;
	SkipWhileSink.prototype.error = Sink.prototype.error;

	SkipWhileSink.prototype.event = function (t, x) {
		if (this.skipping) {
			var p = this.p;
			this.skipping = p(x);
			if (this.skipping) {
				return;
			}
		}

		this.sink.event(t, x);
	};

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(0);
	var dispose = __webpack_require__(3);

	exports.switch = switchLatest;

	/**
	 * Given a stream of streams, return a new stream that adopts the behavior
	 * of the most recent inner stream.
	 * @param {Stream} stream of streams on which to switch
	 * @returns {Stream} switching stream
	 */
	function switchLatest(stream) {
		return new Stream(new Switch(stream.source));
	}

	function Switch(source) {
		this.source = source;
	}

	Switch.prototype.run = function (sink, scheduler) {
		var switchSink = new SwitchSink(sink, scheduler);
		return dispose.all(switchSink, this.source.run(switchSink, scheduler));
	};

	function SwitchSink(sink, scheduler) {
		this.sink = sink;
		this.scheduler = scheduler;
		this.current = null;
		this.ended = false;
	}

	SwitchSink.prototype.event = function (t, stream) {
		this._disposeCurrent(t); // TODO: capture the result of this dispose
		this.current = new Segment(t, Infinity, this, this.sink);
		this.current.disposable = stream.source.run(this.current, this.scheduler);
	};

	SwitchSink.prototype.end = function (t, x) {
		this.ended = true;
		this._checkEnd(t, x);
	};

	SwitchSink.prototype.error = function (t, e) {
		this.ended = true;
		this.sink.error(t, e);
	};

	SwitchSink.prototype.dispose = function () {
		return this._disposeCurrent(0);
	};

	SwitchSink.prototype._disposeCurrent = function (t) {
		if (this.current !== null) {
			return this.current._dispose(t);
		}
	};

	SwitchSink.prototype._disposeInner = function (t, inner) {
		inner._dispose(t); // TODO: capture the result of this dispose
		if (inner === this.current) {
			this.current = null;
		}
	};

	SwitchSink.prototype._checkEnd = function (t, x) {
		if (this.ended && this.current === null) {
			this.sink.end(t, x);
		}
	};

	SwitchSink.prototype._endInner = function (t, x, inner) {
		this._disposeInner(t, inner);
		this._checkEnd(t, x);
	};

	SwitchSink.prototype._errorInner = function (t, e, inner) {
		this._disposeInner(t, inner);
		this.sink.error(t, e);
	};

	function Segment(min, max, outer, sink) {
		this.min = min;
		this.max = max;
		this.outer = outer;
		this.sink = sink;
		this.disposable = dispose.empty();
	}

	Segment.prototype.event = function (t, x) {
		if (t < this.max) {
			this.sink.event(Math.max(t, this.min), x);
		}
	};

	Segment.prototype.end = function (t, x) {
		this.outer._endInner(Math.max(t, this.min), x, this);
	};

	Segment.prototype.error = function (t, e) {
		this.outer._errorInner(Math.max(t, this.min), e, this);
	};

	Segment.prototype._dispose = function (t) {
		this.max = t;
		dispose.tryDispose(t, this.disposable, this.sink);
	};

/***/ },
/* 151 */
/***/ function(module, exports) {

	"use strict";

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	exports.thru = function thru(f, stream) {
		return f(stream);
	};

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(0);
	var Pipe = __webpack_require__(5);
	var dispose = __webpack_require__(3);
	var join = __webpack_require__(53).join;

	exports.during = during;
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

	Until.prototype.run = function (sink, scheduler) {
		var min = new Bound(-Infinity, sink);
		var max = new UpperBound(this.maxSignal, sink, scheduler);
		var disposable = this.source.run(new TimeWindowSink(min, max, sink), scheduler);

		return dispose.all([min, max, disposable]);
	};

	function Since(minSignal, source) {
		this.minSignal = minSignal;
		this.source = source;
	}

	Since.prototype.run = function (sink, scheduler) {
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

	TimeWindowSink.prototype.event = function (t, x) {
		if (t >= this.min.value && t < this.max.value) {
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

	LowerBound.prototype.event = function (t /*, x */) {
		if (t < this.value) {
			this.value = t;
		}
	};

	LowerBound.prototype.end = noop;
	LowerBound.prototype.error = Pipe.prototype.error;

	LowerBound.prototype.dispose = function () {
		return this.disposable.dispose();
	};

	function UpperBound(signal, sink, scheduler) {
		this.value = Infinity;
		this.sink = sink;
		this.disposable = signal.run(this, scheduler);
	}

	UpperBound.prototype.event = function (t, x) {
		if (t < this.value) {
			this.value = t;
			this.sink.end(t, x);
		}
	};

	UpperBound.prototype.end = noop;
	UpperBound.prototype.error = Pipe.prototype.error;

	UpperBound.prototype.dispose = function () {
		return this.disposable.dispose();
	};

	function noop() {}

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(0);
	var Sink = __webpack_require__(5);

	exports.timestamp = timestamp;

	function timestamp(stream) {
		return new Stream(new Timestamp(stream.source));
	}

	function Timestamp(source) {
		this.source = source;
	}

	Timestamp.prototype.run = function (sink, scheduler) {
		return this.source.run(new TimestampSink(sink), scheduler);
	};

	function TimestampSink(sink) {
		this.sink = sink;
	}

	TimestampSink.prototype.end = Sink.prototype.end;
	TimestampSink.prototype.error = Sink.prototype.error;

	TimestampSink.prototype.event = function (t, x) {
		this.sink.event(t, { time: t, value: x });
	};

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(0);

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

	Transduce.prototype.run = function (sink, scheduler) {
		var xf = this.transducer(new Transformer(sink));
		return this.source.run(new TransduceSink(getTxHandler(xf), sink), scheduler);
	};

	function TransduceSink(adapter, sink) {
		this.xf = adapter;
		this.sink = sink;
	}

	TransduceSink.prototype.event = function (t, x) {
		var next = this.xf.step(t, x);

		return this.xf.isReduced(next) ? this.sink.end(t, this.xf.getResult(next)) : next;
	};

	TransduceSink.prototype.end = function (t, x) {
		return this.xf.result(x);
	};

	TransduceSink.prototype.error = function (t, e) {
		return this.sink.error(t, e);
	};

	function Transformer(sink) {
		this.time = -Infinity;
		this.sink = sink;
	}

	Transformer.prototype['@@transducer/init'] = Transformer.prototype.init = function () {};

	Transformer.prototype['@@transducer/step'] = Transformer.prototype.step = function (t, x) {
		if (!isNaN(t)) {
			this.time = Math.max(t, this.time);
		}
		return this.sink.event(this.time, x);
	};

	Transformer.prototype['@@transducer/result'] = Transformer.prototype.result = function (x) {
		return this.sink.end(this.time, x);
	};

	/**
	 * Given an object supporting the new or legacy transducer protocol,
	 * create an adapter for it.
	 * @param {object} tx transform
	 * @returns {TxAdapter|LegacyTxAdapter}
	 */
	function getTxHandler(tx) {
		return typeof tx['@@transducer/step'] === 'function' ? new TxAdapter(tx) : new LegacyTxAdapter(tx);
	}

	/**
	 * Adapter for new official transducer protocol
	 * @param {object} tx transform
	 * @constructor
	 */
	function TxAdapter(tx) {
		this.tx = tx;
	}

	TxAdapter.prototype.step = function (t, x) {
		return this.tx['@@transducer/step'](t, x);
	};
	TxAdapter.prototype.result = function (x) {
		return this.tx['@@transducer/result'](x);
	};
	TxAdapter.prototype.isReduced = function (x) {
		return x != null && x['@@transducer/reduced'];
	};
	TxAdapter.prototype.getResult = function (x) {
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

	LegacyTxAdapter.prototype.step = function (t, x) {
		return this.tx.step(t, x);
	};
	LegacyTxAdapter.prototype.result = function (x) {
		return this.tx.result(x);
	};
	LegacyTxAdapter.prototype.isReduced = function (x) {
		return x != null && x.__transducers_reduced__;
	};
	LegacyTxAdapter.prototype.getResult = function (x) {
		return x.value;
	};

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(0);
	var transform = __webpack_require__(16);
	var core = __webpack_require__(10);
	var Sink = __webpack_require__(5);
	var IndexSink = __webpack_require__(32);
	var dispose = __webpack_require__(3);
	var base = __webpack_require__(2);
	var invoke = __webpack_require__(30);
	var Queue = __webpack_require__(135);

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
		return streams.length === 0 ? core.empty() : streams.length === 1 ? transform.map(f, streams[0]) : new Stream(new Zip(f, map(getSource, streams)));
	}

	function getSource(stream) {
		return stream.source;
	}

	function Zip(f, sources) {
		this.f = f;
		this.sources = sources;
	}

	Zip.prototype.run = function (sink, scheduler) {
		var l = this.sources.length;
		var disposables = new Array(l);
		var sinks = new Array(l);
		var buffers = new Array(l);

		var zipSink = new ZipSink(this.f, buffers, sinks, sink);

		for (var indexSink, i = 0; i < l; ++i) {
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

	ZipSink.prototype.event = function (t, indexedValue) {
		var buffers = this.buffers;
		var buffer = buffers[indexedValue.index];

		buffer.push(indexedValue.value);

		if (buffer.length() === 1) {
			if (!ready(this.buffers)) {
				return;
			}

			emitZipped(this.f, t, buffers, this.sink);

			if (ended(this.buffers, this.sinks)) {
				this.sink.end(t, void 0);
			}
		}
	};

	ZipSink.prototype.end = function (t, indexedValue) {
		var buffer = this.buffers[indexedValue.index];
		if (buffer.isEmpty()) {
			this.sink.end(t, indexedValue.value);
		}
	};

	ZipSink.prototype.error = Sink.prototype.error;

	function emitZipped(f, t, buffers, sink) {
		sink.event(t, invoke(f, map(head, buffers)));
	}

	function head(buffer) {
		return buffer.shift();
	}

	function ended(buffers, sinks) {
		for (var i = 0, l = buffers.length; i < l; ++i) {
			if (buffers[i].isEmpty() && !sinks[i].active) {
				return true;
			}
		}
		return false;
	}

	function ready(buffers) {
		for (var i = 0, l = buffers.length; i < l; ++i) {
			if (buffers[i].isEmpty()) {
				return false;
			}
		}
		return true;
	}

/***/ },
/* 156 */
/***/ function(module, exports) {

	"use strict";

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

	Disposable.prototype.dispose = function () {
	  return this._dispose(this._data);
	};

/***/ },
/* 157 */
/***/ function(module, exports) {

	'use strict';

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	module.exports = SettableDisposable;

	function SettableDisposable() {
		this.disposable = void 0;
		this.disposed = false;
		this._resolve = void 0;

		var self = this;
		this.result = new Promise(function (resolve) {
			self._resolve = resolve;
		});
	}

	SettableDisposable.prototype.setDisposable = function (disposable) {
		if (this.disposable !== void 0) {
			throw new Error('setDisposable called more than once');
		}

		this.disposable = disposable;

		if (this.disposed) {
			this._resolve(disposable.dispose());
		}
	};

	SettableDisposable.prototype.dispose = function () {
		if (this.disposed) {
			return this.result;
		}

		this.disposed = true;

		if (this.disposable !== void 0) {
			this.result = this.disposable.dispose();
		}

		return this.result;
	};

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Pipe = __webpack_require__(5);

	module.exports = FilterMap;

	function FilterMap(p, f, source) {
		this.p = p;
		this.f = f;
		this.source = source;
	}

	FilterMap.prototype.run = function (sink, scheduler) {
		return this.source.run(new FilterMapSink(this.p, this.f, sink), scheduler);
	};

	function FilterMapSink(p, f, sink) {
		this.p = p;
		this.f = f;
		this.sink = sink;
	}

	FilterMapSink.prototype.event = function (t, x) {
		var f = this.f;
		var p = this.p;
		p(x) && this.sink.event(t, f(x));
	};

	FilterMapSink.prototype.end = Pipe.prototype.end;
	FilterMapSink.prototype.error = Pipe.prototype.error;

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(0);
	var dispose = __webpack_require__(3);

	exports.fromObservable = fromObservable;
	exports.ObservableSource = ObservableSource;
	exports.SubscriberSink = SubscriberSink;

	function fromObservable(observable) {
		return new Stream(new ObservableSource(observable));
	}

	function ObservableSource(observable) {
		this.observable = observable;
	}

	ObservableSource.prototype.run = function (sink, scheduler) {
		var sub = this.observable.subscribe(new SubscriberSink(sink, scheduler));
		if (typeof sub === 'function') {
			return dispose.create(sub);
		} else if (sub && typeof sub.unsubscribe === 'function') {
			return dispose.create(unsubscribe, sub);
		}

		throw new TypeError('Observable returned invalid subscription ' + String(sub));
	};

	function SubscriberSink(sink, scheduler) {
		this.sink = sink;
		this.scheduler = scheduler;
	}

	SubscriberSink.prototype.next = function (x) {
		this.sink.event(this.scheduler.now(), x);
	};

	SubscriberSink.prototype.complete = function (x) {
		this.sink.end(this.scheduler.now(), x);
	};

	SubscriberSink.prototype.error = function (e) {
		this.sink.error(this.scheduler.now(), e);
	};

	function unsubscribe(subscription) {
		return subscription.unsubscribe();
	}

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var symbolObservable = __webpack_require__(59);

	module.exports = getObservable;

	function getObservable(o) {
		var obs = null;
		if (o != null && (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object') {
			var method = o[symbolObservable];
			if (typeof method === 'function') {
				obs = method.call(o);
				if (obs == null || (typeof obs === 'undefined' ? 'undefined' : _typeof(obs)) !== 'object') {
					throw new TypeError('invalid observable ' + obs);
				}
			}
		}

		return obs;
	}

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var defaultScheduler = __webpack_require__(31);
	var dispose = __webpack_require__(3);
	var fatalError = __webpack_require__(28);

	exports.subscribe = subscribe;
	exports.SubscribeObserver = SubscribeObserver;
	exports.Subscription = Subscription;

	function subscribe(subscriber, stream) {
		if (subscriber == null || (typeof subscriber === 'undefined' ? 'undefined' : _typeof(subscriber)) !== 'object') {
			throw new TypeError('subscriber must be an object');
		}

		var disposable = dispose.settable();
		var observer = new SubscribeObserver(fatalError, subscriber, disposable);

		disposable.setDisposable(stream.source.run(observer, defaultScheduler));

		return new Subscription(disposable);
	}

	function SubscribeObserver(fatalError, subscriber, disposable) {
		this.fatalError = fatalError;
		this.subscriber = subscriber;
		this.disposable = disposable;
	}

	SubscribeObserver.prototype.event = function (t, x) {
		if (typeof this.subscriber.next === 'function') {
			this.subscriber.next(x);
		}
	};

	SubscribeObserver.prototype.end = function (t, x) {
		var s = this.subscriber;
		doDispose(this.fatalError, s, s.complete, s.error, this.disposable, x);
	};

	SubscribeObserver.prototype.error = function (t, e) {
		var s = this.subscriber;
		doDispose(this.fatalError, s, s.error, s.error, this.disposable, e);
	};

	function Subscription(disposable) {
		this.disposable = disposable;
	}

	Subscription.prototype.unsubscribe = function () {
		this.disposable.dispose();
	};

	function doDispose(fatal, subscriber, complete, error, disposable, x) {
		Promise.resolve(disposable.dispose()).then(function () {
			if (typeof complete === 'function') {
				complete.call(subscriber, x);
			}
		}).catch(function (e) {
			if (typeof error === 'function') {
				error.call(subscriber, e);
			}
		}).catch(fatal);
	}

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var base = __webpack_require__(2);

	module.exports = Scheduler;

	function ScheduledTask(delay, period, task, scheduler) {
		this.time = delay;
		this.period = period;
		this.task = task;
		this.scheduler = scheduler;
		this.active = true;
	}

	ScheduledTask.prototype.run = function () {
		return this.task.run(this.time);
	};

	ScheduledTask.prototype.error = function (e) {
		return this.task.error(this.time, e);
	};

	ScheduledTask.prototype.dispose = function () {
		this.scheduler.cancel(this);
		return this.task.dispose();
	};

	function runTask(task) {
		try {
			return task.run();
		} catch (e) {
			return task.error(e);
		}
	}

	function Scheduler(timer) {
		this.timer = timer;

		this._timer = null;
		this._nextArrival = 0;
		this._tasks = [];

		var self = this;
		this._runReadyTasksBound = function () {
			self._runReadyTasks(self.now());
		};
	}

	Scheduler.prototype.now = function () {
		return this.timer.now();
	};

	Scheduler.prototype.asap = function (task) {
		return this.schedule(0, -1, task);
	};

	Scheduler.prototype.delay = function (delay, task) {
		return this.schedule(delay, -1, task);
	};

	Scheduler.prototype.periodic = function (period, task) {
		return this.schedule(0, period, task);
	};

	Scheduler.prototype.schedule = function (delay, period, task) {
		var now = this.now();
		var st = new ScheduledTask(now + Math.max(0, delay), period, task, this);

		insertByTime(st, this._tasks);
		this._scheduleNextRun(now);
		return st;
	};

	Scheduler.prototype.cancel = function (task) {
		task.active = false;
		var i = binarySearch(task.time, this._tasks);

		if (i >= 0 && i < this._tasks.length) {
			var at = base.findIndex(task, this._tasks[i].events);
			if (at >= 0) {
				this._tasks[i].events.splice(at, 1);
				this._reschedule();
			}
		}
	};

	Scheduler.prototype.cancelAll = function (f) {
		for (var i = 0; i < this._tasks.length; ++i) {
			removeAllFrom(f, this._tasks[i]);
		}
		this._reschedule();
	};

	function removeAllFrom(f, timeslot) {
		timeslot.events = base.removeAll(f, timeslot.events);
	}

	Scheduler.prototype._reschedule = function () {
		if (this._tasks.length === 0) {
			this._unschedule();
		} else {
			this._scheduleNextRun(this.now());
		}
	};

	Scheduler.prototype._unschedule = function () {
		this.timer.clearTimer(this._timer);
		this._timer = null;
	};

	Scheduler.prototype._scheduleNextRun = function (now) {
		if (this._tasks.length === 0) {
			return;
		}

		var nextArrival = this._tasks[0].time;

		if (this._timer === null) {
			this._scheduleNextArrival(nextArrival, now);
		} else if (nextArrival < this._nextArrival) {
			this._unschedule();
			this._scheduleNextArrival(nextArrival, now);
		}
	};

	Scheduler.prototype._scheduleNextArrival = function (nextArrival, now) {
		this._nextArrival = nextArrival;
		var delay = Math.max(0, nextArrival - now);
		this._timer = this.timer.setTimer(this._runReadyTasksBound, delay);
	};

	Scheduler.prototype._runReadyTasks = function (now) {
		this._timer = null;

		this._tasks = this._findAndRunTasks(now);

		this._scheduleNextRun(this.now());
	};

	Scheduler.prototype._findAndRunTasks = function (now) {
		var tasks = this._tasks;
		var l = tasks.length;
		var i = 0;

		while (i < l && tasks[i].time <= now) {
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
		for (var i = 0; i < events.length; ++i) {
			var task = events[i];

			if (task.active) {
				runTask(task);

				// Reschedule periodic repeating tasks
				// Check active again, since a task may have canceled itself
				if (task.period >= 0) {
					task.time = task.time + task.period;
					insertByTime(task, tasks);
				}
			}
		}

		return tasks;
	}

	function insertByTime(task, timeslots) {
		var l = timeslots.length;

		if (l === 0) {
			timeslots.push(newTimeslot(task.time, [task]));
			return;
		}

		var i = binarySearch(task.time, timeslots);

		if (i >= l) {
			timeslots.push(newTimeslot(task.time, [task]));
		} else if (task.time === timeslots[i].time) {
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

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var defer = __webpack_require__(54);

	/*global setTimeout, clearTimeout*/

	function Task(f) {
		this.f = f;
		this.active = true;
	}

	Task.prototype.run = function () {
		if (!this.active) {
			return;
		}
		var f = this.f;
		return f();
	};

	Task.prototype.error = function (e) {
		throw e;
	};

	Task.prototype.cancel = function () {
		this.active = false;
	};

	function runAsTask(f) {
		var task = new Task(f);
		defer(task);
		return task;
	}

	module.exports = {
		now: Date.now,
		setTimer: function setTimer(f, dt) {
			return dt <= 0 ? runAsTask(f) : setTimeout(f, dt);
		},
		clearTimer: function clearTimer(t) {
			return t instanceof Task ? t.cancel() : clearTimeout(t);
		}
	};

/***/ },
/* 164 */
/***/ function(module, exports) {

	"use strict";

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	/*global setTimeout, clearTimeout*/

	module.exports = {
		now: Date.now,
		setTimer: function setTimer(f, dt) {
			return setTimeout(f, dt);
		},
		clearTimer: function clearTimer(t) {
			return clearTimeout(t);
		}
	};

/***/ },
/* 165 */
/***/ function(module, exports) {

	"use strict";

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	module.exports = SafeSink;

	function SafeSink(sink) {
		this.sink = sink;
		this.active = true;
	}

	SafeSink.prototype.event = function (t, x) {
		if (!this.active) {
			return;
		}
		this.sink.event(t, x);
	};

	SafeSink.prototype.end = function (t, x) {
		if (!this.active) {
			return;
		}
		this.disable();
		this.sink.end(t, x);
	};

	SafeSink.prototype.error = function (t, e) {
		this.disable();
		this.sink.error(t, e);
	};

	SafeSink.prototype.disable = function () {
		this.active = false;
		return this.sink;
	};

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var DeferredSink = __webpack_require__(58);
	var dispose = __webpack_require__(3);
	var tryEvent = __webpack_require__(17);

	module.exports = EventEmitterSource;

	function EventEmitterSource(event, source) {
		this.event = event;
		this.source = source;
	}

	EventEmitterSource.prototype.run = function (sink, scheduler) {
		// NOTE: Because EventEmitter allows events in the same call stack as
		// a listener is added, use a DeferredSink to buffer events
		// until the stack clears, then propagate.  This maintains most.js's
		// invariant that no event will be delivered in the same call stack
		// as an observer begins observing.
		var dsink = new DeferredSink(sink);

		function addEventVariadic(a) {
			var l = arguments.length;
			if (l > 1) {
				var arr = new Array(l);
				for (var i = 0; i < l; ++i) {
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

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var dispose = __webpack_require__(3);
	var tryEvent = __webpack_require__(17);

	module.exports = EventTargetSource;

	function EventTargetSource(event, source, capture) {
		this.event = event;
		this.source = source;
		this.capture = capture;
	}

	EventTargetSource.prototype.run = function (sink, scheduler) {
		function addEvent(e) {
			tryEvent.tryEvent(scheduler.now(), e, sink);
		}

		this.source.addEventListener(this.event, addEvent, this.capture);

		return dispose.create(disposeEventTarget, { target: this, addEvent: addEvent });
	};

	function disposeEventTarget(info) {
		var target = info.target;
		target.source.removeEventListener(target.event, info.addEvent, target.capture);
	}

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(0);
	var MulticastSource = __webpack_require__(12).MulticastSource;
	var DeferredSink = __webpack_require__(58);
	var tryEvent = __webpack_require__(17);

	exports.create = create;

	/**
	 * @deprecated
	 */
	function create(run) {
		return new Stream(new MulticastSource(new SubscriberSource(run)));
	}

	function SubscriberSource(subscribe) {
		this._subscribe = subscribe;
	}

	SubscriberSource.prototype.run = function (sink, scheduler) {
		return new Subscription(new DeferredSink(sink), scheduler, this._subscribe);
	};

	function Subscription(sink, scheduler, subscribe) {
		this.sink = sink;
		this.scheduler = scheduler;
		this.active = true;
		this._unsubscribe = this._init(subscribe);
	}

	Subscription.prototype._init = function (subscribe) {
		var s = this;

		try {
			return subscribe(add, end, error);
		} catch (e) {
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

	Subscription.prototype._add = function (x) {
		if (!this.active) {
			return;
		}
		tryEvent.tryEvent(this.scheduler.now(), x, this.sink);
	};

	Subscription.prototype._end = function (x) {
		if (!this.active) {
			return;
		}
		this.active = false;
		tryEvent.tryEnd(this.scheduler.now(), x, this.sink);
	};

	Subscription.prototype._error = function (x) {
		this.active = false;
		this.sink.error(this.scheduler.now(), x);
	};

	Subscription.prototype.dispose = function () {
		this.active = false;
		if (typeof this._unsubscribe === 'function') {
			return this._unsubscribe.call(void 0);
		}
	};

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(0);
	var fromArray = __webpack_require__(170).fromArray;
	var isIterable = __webpack_require__(56).isIterable;
	var fromIterable = __webpack_require__(172).fromIterable;
	var getObservable = __webpack_require__(160);
	var fromObservable = __webpack_require__(159).fromObservable;
	var isArrayLike = __webpack_require__(2).isArrayLike;

	exports.from = from;

	function from(a) {
		// eslint-disable-line complexity
		if (a instanceof Stream) {
			return a;
		}

		var observable = getObservable(a);
		if (observable != null) {
			return fromObservable(observable);
		}

		if (Array.isArray(a) || isArrayLike(a)) {
			return fromArray(a);
		}

		if (isIterable(a)) {
			return fromIterable(a);
		}

		throw new TypeError('from(x) must be observable, iterable, or array-like: ' + a);
	}

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(0);
	var PropagateTask = __webpack_require__(8);

	exports.fromArray = fromArray;

	function fromArray(a) {
		return new Stream(new ArraySource(a));
	}

	function ArraySource(a) {
		this.array = a;
	}

	ArraySource.prototype.run = function (sink, scheduler) {
		return scheduler.asap(new PropagateTask(runProducer, this.array, sink));
	};

	function runProducer(t, array, sink) {
		for (var i = 0, l = array.length; i < l && this.active; ++i) {
			sink.event(t, array[i]);
		}

		this.active && end(t);

		function end(t) {
			sink.end(t);
		}
	}

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(0);
	var MulticastSource = __webpack_require__(12).MulticastSource;
	var EventTargetSource = __webpack_require__(167);
	var EventEmitterSource = __webpack_require__(166);

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

		if (typeof source.addEventListener === 'function' && typeof source.removeEventListener === 'function') {
			var capture = arguments.length > 2 && !!arguments[2];
			s = new MulticastSource(new EventTargetSource(event, source, capture));
		} else if (typeof source.addListener === 'function' && typeof source.removeListener === 'function') {
			s = new EventEmitterSource(event, source);
		} else {
			throw new Error('source must support addEventListener/removeEventListener or addListener/removeListener');
		}

		return new Stream(s);
	}

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(0);
	var getIterator = __webpack_require__(56).getIterator;
	var PropagateTask = __webpack_require__(8);

	exports.fromIterable = fromIterable;

	function fromIterable(iterable) {
		return new Stream(new IterableSource(iterable));
	}

	function IterableSource(iterable) {
		this.iterable = iterable;
	}

	IterableSource.prototype.run = function (sink, scheduler) {
		return new IteratorProducer(getIterator(this.iterable), sink, scheduler);
	};

	function IteratorProducer(iterator, sink, scheduler) {
		this.scheduler = scheduler;
		this.iterator = iterator;
		this.task = new PropagateTask(runProducer, this, sink);
		scheduler.asap(this.task);
	}

	IteratorProducer.prototype.dispose = function () {
		return this.task.dispose();
	};

	function runProducer(t, producer, sink) {
		var x = producer.iterator.next();
		if (x.done) {
			sink.end(t, x.value);
		} else {
			sink.event(t, x.value);
		}

		producer.scheduler.asap(producer.task);
	}

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(0);
	var base = __webpack_require__(2);

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

	GenerateSource.prototype.run = function (sink, scheduler) {
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
		}, function (e) {
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

	Generate.prototype.dispose = function () {
		this.active = false;
	};

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(0);

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

	IterateSource.prototype.run = function (sink, scheduler) {
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

	Iterate.prototype.dispose = function () {
		this.active = false;
	};

	function stepIterate(iterate, x) {
		iterate.sink.event(iterate.scheduler.now(), x);

		if (!iterate.active) {
			return x;
		}

		var f = iterate.f;
		return Promise.resolve(f(x)).then(function (y) {
			return continueIterate(iterate, y);
		});
	}

	function continueIterate(iterate, x) {
		return !iterate.active ? iterate.value : stepIterate(iterate, x);
	}

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(0);
	var dispose = __webpack_require__(3);
	var MulticastSource = __webpack_require__(12).MulticastSource;
	var PropagateTask = __webpack_require__(8);

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

	Periodic.prototype.run = function (sink, scheduler) {
	  return scheduler.periodic(this.period, new PropagateTask(emit, this.value, sink));
	};

	function emit(t, x, sink) {
	  sink.event(t, x);
	}

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(0);

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

	UnfoldSource.prototype.run = function (sink, scheduler) {
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

	Unfold.prototype.dispose = function () {
		this.active = false;
	};

	function stepUnfold(unfold, x) {
		var f = unfold.f;
		return Promise.resolve(f(x)).then(function (tuple) {
			return continueUnfold(unfold, tuple);
		});
	}

	function continueUnfold(unfold, tuple) {
		if (tuple.done) {
			unfold.sink.end(unfold.scheduler.now(), tuple.value);
			return tuple.value;
		}

		unfold.sink.event(unfold.scheduler.now(), tuple.value);

		if (!unfold.active) {
			return tuple.value;
		}
		return stepUnfold(unfold, tuple.seed);
	}

/***/ },
/* 177 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function symbolObservablePonyfill(root) {
		var result;
		var _Symbol = root.Symbol;

		if (typeof _Symbol === 'function') {
			if (_Symbol.observable) {
				result = _Symbol.observable;
			} else {
				result = _Symbol('observable');
				_Symbol.observable = result;
			}
		} else {
			result = '@@observable';
		}

		return result;
	};

/***/ },
/* 178 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (module) {
		if (!module.webpackPolyfill) {
			module.deprecate = function () {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	};

/***/ }
/******/ ]);