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
/******/ 	return __webpack_require__(__webpack_require__.s = 103);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Disposable = __webpack_require__(73);
	var SettableDisposable = __webpack_require__(74);
	var isPromise = __webpack_require__(11).isPromise;
	var base = __webpack_require__(3);

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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
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


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(0);
	var base = __webpack_require__(3);
	var core = __webpack_require__(7);
	var from = __webpack_require__(85).from;
	var periodic = __webpack_require__(91).periodic;

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

	var create = __webpack_require__(84);

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

	var events = __webpack_require__(87);

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

	var observe = __webpack_require__(64);

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

	var loop = __webpack_require__(62).loop;

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

	var accumulate = __webpack_require__(55);

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

	var unfold = __webpack_require__(92);
	var iterate = __webpack_require__(90);
	var generate = __webpack_require__(89);
	var build = __webpack_require__(24);

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

	var transform = __webpack_require__(12);
	var applicative = __webpack_require__(56);

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

	var transduce = __webpack_require__(71);

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

	var flatMap = __webpack_require__(27);

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

	var continueWith = __webpack_require__(26).continueWith;

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

	var concatMap = __webpack_require__(57).concatMap;

	exports.concatMap = concatMap;

	Stream.prototype.concatMap = function(f) {
		return concatMap(f, this);
	};

	//-----------------------------------------------------------------------
	// Concurrent merging

	var mergeConcurrently = __webpack_require__(8);

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

	var merge = __webpack_require__(63);

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

	var combine = __webpack_require__(25);

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

	var sample = __webpack_require__(66);

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

	var zip = __webpack_require__(72);

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

	var switchLatest = __webpack_require__(68).switch;

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

	var filter = __webpack_require__(60);

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

	var slice = __webpack_require__(67);

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

	var timeslice = __webpack_require__(69);

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

	var delay = __webpack_require__(58).delay;

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

	var timestamp = __webpack_require__(70).timestamp;

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

	var limit = __webpack_require__(61);

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

	var promises = __webpack_require__(65);

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

	var errors = __webpack_require__(59);

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

	var multicast = __webpack_require__(5).default;

	exports.multicast = multicast;

	/**
	 * Transform the stream into multicast stream.  That means that many subscribers
	 * to the stream will not cause multiple invocations of the internal machinery.
	 * @returns {Stream} new stream which will multicast events to all observers.
	 */
	Stream.prototype.multicast = function() {
		return multicast(this);
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
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
	      this.sink = undefined;
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
	        if (this.sink === undefined) {
	          this.sink = sink;
	          return 1;
	        }

	        this.sinks = (0, _prelude.append)(sink, this.sinks);
	        return this.sinks.length + 1;
	      }
	    }, {
	      key: 'remove',
	      value: function remove(sink) {
	        if (sink === this.sink) {
	          this.sink = this.sinks.shift();
	          return this.sink === undefined ? 0 : this.sinks.length + 1;
	        }

	        this.sinks = (0, _prelude.remove)((0, _prelude.findIndex)(sink, this.sinks), this.sinks);
	        return this.sinks.length + 1;
	      }
	    }, {
	      key: 'event',
	      value: function event(time, value) {
	        var s = this.sinks;
	        if (s.length === 0) {
	          this.sink.event(time, value);
	        } else {
	          tryEvent(time, value, this.sink);
	          for (var i = 0; i < s.length; ++i) {
	            tryEvent(time, value, s[i]);
	          }
	        }
	      }
	    }, {
	      key: 'end',
	      value: function end(time, value) {
	        // Important: slice first since sink.end may change
	        // the set of sinks
	        var s = this.sinks.slice();
	        tryEnd(time, value, this.sink);
	        for (var i = 0; i < s.length; ++i) {
	          tryEnd(time, value, s[i]);
	        }
	      }
	    }, {
	      key: 'error',
	      value: function error(time, err) {
	        // Important: slice first since sink.error may change
	        // the set of sinks
	        var s = this.sinks.slice();
	        this.sink.error(time, err);
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


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var fatal = __webpack_require__(29);

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


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(0);
	var ValueSource = __webpack_require__(35);
	var dispose = __webpack_require__(2);
	var PropagateTask = __webpack_require__(6);

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


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(0);
	var dispose = __webpack_require__(2);
	var LinkedList = __webpack_require__(53);
	var identity = __webpack_require__(3).id;

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

	MergeConcurrently.prototype.run = function(sink, scheduler) {
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
		innerSink.disposable = mapAndRun(this.f, innerSink, this.scheduler, stream);
	};

	function mapAndRun(f, innerSink, scheduler, stream) {
		return f(stream).source.run(innerSink, scheduler);
	}

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


/***/ },
/* 9 */
/***/ function(module, exports) {

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


/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = {
	  array: Array.isArray,
	  primitive: function(s) { return typeof s === 'string' || typeof s === 'number'; },
	};


/***/ },
/* 11 */
/***/ function(module, exports) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	exports.isPromise = isPromise;

	function isPromise(p) {
		return p !== null && typeof p === 'object' && typeof p.then === 'function';
	}


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(0);
	var Map = __webpack_require__(31);

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


/***/ },
/* 13 */
/***/ function(module, exports) {

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


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Sink = __webpack_require__(1);

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


/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = function(sel, data, children, text, elm) {
	  var key = data === undefined ? undefined : data.key;
	  return {sel: sel, data: data, children: children,
	          text: text, elm: elm, key: key};
	};


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.mockDOMSource = exports.makeDOMDriver = exports.video = exports.ul = exports.u = exports.tr = exports.title = exports.thead = exports.th = exports.tfoot = exports.textarea = exports.td = exports.tbody = exports.table = exports.sup = exports.sub = exports.style = exports.strong = exports.span = exports.source = exports.small = exports.select = exports.section = exports.script = exports.samp = exports.s = exports.ruby = exports.rt = exports.rp = exports.q = exports.pre = exports.param = exports.p = exports.option = exports.optgroup = exports.ol = exports.object = exports.noscript = exports.nav = exports.meta = exports.menu = exports.mark = exports.map = exports.main = exports.link = exports.li = exports.legend = exports.label = exports.keygen = exports.kbd = exports.ins = exports.input = exports.img = exports.iframe = exports.i = exports.html = exports.hr = exports.hgroup = exports.header = exports.head = exports.h6 = exports.h5 = exports.h4 = exports.h3 = exports.h2 = exports.h1 = exports.form = exports.footer = exports.figure = exports.figcaption = exports.fieldset = exports.embed = exports.em = exports.dt = exports.dl = exports.div = exports.dir = exports.dfn = exports.del = exports.dd = exports.colgroup = exports.col = exports.code = exports.cite = exports.caption = exports.canvas = exports.button = exports.br = exports.body = exports.blockquote = exports.bdo = exports.bdi = exports.base = exports.b = exports.audio = exports.aside = exports.article = exports.area = exports.address = exports.abbr = exports.a = exports.h = exports.thunk = exports.modules = undefined;

	var _makeDOMDriver = __webpack_require__(44);

	Object.defineProperty(exports, 'makeDOMDriver', {
	  enumerable: true,
	  get: function get() {
	    return _makeDOMDriver.makeDOMDriver;
	  }
	});

	var _mockDOMSource = __webpack_require__(45);

	Object.defineProperty(exports, 'mockDOMSource', {
	  enumerable: true,
	  get: function get() {
	    return _mockDOMSource.mockDOMSource;
	  }
	});

	var _modules = __webpack_require__(21);

	var modules = _interopRequireWildcard(_modules);

	var _thunk = __webpack_require__(102);

	var _thunk2 = _interopRequireDefault(_thunk);

	var _hyperscript = __webpack_require__(43);

	var _hyperscript2 = _interopRequireDefault(_hyperscript);

	var _hyperscriptHelpers = __webpack_require__(49);

	var _hyperscriptHelpers2 = _interopRequireDefault(_hyperscriptHelpers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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
/* 17 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
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


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.makeEventsSelector = undefined;

	var _domEvent = __webpack_require__(41);

	var _makeIsStrictlyInRootScope = __webpack_require__(20);

	var matchesSelector = void 0;
	try {
	  matchesSelector = __webpack_require__(50);
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
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isolateSource = exports.isolateSink = undefined;

	var _utils = __webpack_require__(22);

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
/* 20 */
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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.EventsModule = exports.HeroModule = exports.AttrsModule = exports.PropsModule = exports.ClassModule = exports.StyleModule = undefined;

	var _class = __webpack_require__(96);

	var _class2 = _interopRequireDefault(_class);

	var _props = __webpack_require__(99);

	var _props2 = _interopRequireDefault(_props);

	var _attributes = __webpack_require__(95);

	var _attributes2 = _interopRequireDefault(_attributes);

	var _eventlisteners = __webpack_require__(97);

	var _eventlisteners2 = _interopRequireDefault(_eventlisteners);

	var _style = __webpack_require__(100);

	var _style2 = _interopRequireDefault(_style);

	var _hero = __webpack_require__(98);

	var _hero2 = _interopRequireDefault(_hero);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = [_style2.default, _class2.default, _props2.default, _attributes2.default];
	exports.StyleModule = _style2.default;
	exports.ClassModule = _class2.default;
	exports.PropsModule = _props2.default;
	exports.AttrsModule = _attributes2.default;
	exports.HeroModule = _hero2.default;
	exports.EventsModule = _eventlisteners2.default;

/***/ },
/* 22 */
/***/ function(module, exports) {

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

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.holdSubject = exports.subject = undefined;

	var _most = __webpack_require__(4);

	var _multicast = __webpack_require__(5);

	var _Observer = __webpack_require__(51);

	var _Replay = __webpack_require__(52);

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

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var streamOf = __webpack_require__(7).of;
	var continueWith = __webpack_require__(26).continueWith;

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


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(0);
	var transform = __webpack_require__(12);
	var core = __webpack_require__(7);
	var Pipe = __webpack_require__(1);
	var IndexSink = __webpack_require__(14);
	var dispose = __webpack_require__(2);
	var base = __webpack_require__(3);
	var invoke = __webpack_require__(13);

	var hasValue = IndexSink.hasValue;

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
		return l === 0 ? core.empty()
			 : l === 1 ? transform.map(f, streams[0])
			 : new Stream(combineSources(f, streams));
	}

	function combineSources(f, streams) {
		return new Combine(f, map(getSource, streams))
	}

	function getSource(stream) {
		return stream.source;
	}

	function Combine(f, sources) {
		this.f = f;
		this.sources = sources;
	}

	Combine.prototype.run = function(sink, scheduler) {
		var l = this.sources.length;
		var disposables = new Array(l);
		var sinks = new Array(l);

		var mergeSink = new CombineSink(disposables, sinks, sink, this.f);

		for(var indexSink, i=0; i<l; ++i) {
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


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(0);
	var Sink = __webpack_require__(1);
	var dispose = __webpack_require__(2);
	var isPromise = __webpack_require__(11).isPromise;

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


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var mergeConcurrently = __webpack_require__(8).mergeConcurrently;
	var mergeMapConcurrently = __webpack_require__(8).mergeMapConcurrently;

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
/* 28 */
/***/ function(module, exports) {

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


/***/ },
/* 29 */
/***/ function(module, exports) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	module.exports = fatalError;

	function fatalError (e) {
		setTimeout(function() {
			throw e;
		}, 0);
	}


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Pipe = __webpack_require__(1);

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


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Pipe = __webpack_require__(1);
	var Filter = __webpack_require__(30);
	var FilterMap = __webpack_require__(75);
	var base = __webpack_require__(3);

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


/***/ },
/* 32 */
/***/ function(module, exports) {

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


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Observer = __webpack_require__(80);
	var dispose = __webpack_require__(2);
	var defaultScheduler = __webpack_require__(77);

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


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var defer = __webpack_require__(28);

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


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var PropagateTask = __webpack_require__(6);

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


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = selectorParser;

	var _browserSplit = __webpack_require__(48);

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

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var VNode = __webpack_require__(15);
	var is = __webpack_require__(10);

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


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.run = undefined;

	var _mostSubject = __webpack_require__(23);

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
	    sources[name] = drivers[name](sinkProxies[name].stream, name);
	  }
	  return sources;
	}

	function makeHandleError(observer, onError) {
	  return function handleError(err) {
	    observer.error(err);
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
	      var observer = sinkProxies[name].observer;

	      sinks[name].until(disposableStream).observe(observer.next).then(observer.complete).catch(makeHandleError(observer, onError));
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
	  if (typeof drivers !== 'object' || drivers === null) {
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

	  var _subject = (0, _mostSubject.subject)();

	  var disposableObserver = _subject.observer;
	  var disposableStream = _subject.stream;

	  var sinkProxies = makeSinkProxies(drivers);
	  var sources = callDrivers(drivers, sinkProxies);
	  var sinks = assertSinks(main(sources));
	  replicateMany({ sinks: sinks, sinkProxies: sinkProxies, disposableStream: disposableStream, onError: onError });

	  function dispose() {
	    disposableObserver.next(1);
	    disposableObserver.complete();
	  }

	  return { sinks: sinks, sources: sources, dispose: dispose };
	}

	exports.default = { run: run };
	exports.run = run;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_most_subject__ = __webpack_require__(23);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_most_subject___default = __WEBPACK_IMPORTED_MODULE_0_most_subject__ && __WEBPACK_IMPORTED_MODULE_0_most_subject__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_most_subject__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_most_subject__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_most_subject___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_most_subject___default });

	'use strict';

	var O = {};

	var tempStyle = {display: 'inline'}
	var tempStyle2 = {display: 'none'}

	function _classCallCheck(instance, Constructor) { 
	  if (!(instance instanceof Constructor)) { 
	    throw new TypeError("Cannot call a class as a function"); 
	  } 
	}


	// var subject = require('most-subject');

	var MonadStream = function MonadStream(g) {
	  var _this = this;
	  this.subject = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0_most_subject__["subject"]();
	  this.observer = this.subject.observer;
	  this.stream = this.subject.stream;
	  this.id = g;
	  this.ret = function (a) {
	    _this.observer.next(a);
	    console.log('Streaming from ', _this.id);
	    return _this;
	  };
	};

	var mM$1 = new MonadStream('mM$1');

	var Monad = function Monad(z, g) {
	  var _this = this;

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
	    O[_this.id] = new Monad(a,_this.id);
	    return O[_this.id];
	  };
	};

	var MonadIter = function MonadIter() {
	  var _this = this;
	  this.p = function () {};

	  this.release = function () {
	    return this.p.apply(this, arguments);
	  };

	  this.bnd = function (func) {
	    _this.p = func;
	  };
	};

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

	var calc = function calc(a,op,b) { 
	  var result;
	  switch (op) {
	      case "add": result = (parseFloat(a) + parseFloat(b));
	      break;
	      case "subtract": result = (a - b);
	      break;
	      case "mult": result = (a * b);
	      break;
	      case "div": result = (a / b);
	      break;
	      case "concat": result = (a+""+b)*1.0;
	      break;
	      default : 'Major Malfunction in calc.';
	  }
	  return result;
	};

	var equals = function equals (x, mon1, mon2, mon3) {
	  if (mon1.id === mon2.id && mon1.x === mon2.x) {
	    mon3.ret('true');
	  } else mon3.ret('false');
	  return ret(x);
	}
	var wait = function wait(x, y, mon) {
	  if (x === y) {
	    mon2.release();
	  }
	  return mon;
	};

	var unshift = function unshift(y,v,mon) {
	  if (Array.isArray(y)) {
	    let ar = [];
	    let keys = Object.keys(y);
	    for (let k in keys) {ar[k] = y[k]};
	    ar.unshift(v);
	    return mon.ret(ar);  
	  }
	  console.log('The value provided to unshift is not an array');
	  return ret(y);
	};

	var unshift2 = function unshift(y,v,mon) {
	  return mon.ret(ret(y).x.unshift(v));
	};

	var toFloat = function toFloat(x) {
	    return ret(parseFloat(x));
	};

	var push = function push(y,v,mon) {
	  console.log('In push. y, v, mon are: ', y, v, mon);
	    let ar = [];
	    if (y.length == 0) {
	      ar = [v];
	    }
	    else {
	      let keys = Object.keys(y);
	      for (let k in keys) {ar[k] = y[k]};
	      ar.push(v);
	    }
	    return mon.ret(ar);
	};

	var spliceRemove = function spliceRemove(x, index, location, mon) {
	  if (Array.isArray(x)) {
	    let ar = [];
	    let keys = Object.keys(x[index]);
	    for (let k in keys) {
	      ar[k] = x[index][k];
	    }
	    ar.splice(location,1);
	    return mon.ret(ar);  
	  }
	  console.log('Major malfunction in spliceRemove. x, index, location, mon: ', x, index, location, mon);
	};

	var spliceAdd = function spliceAdd(x, index, value, mon) {
	  if (Array.isArray(x)) {
	    let ar = [];
	    let keys = Object.keys(x);
	    for (let k in keys) {ar[k] = x[k]};
	    ar.splice(index, 0, value);
	    return mon.ret(ar);  
	  }
	  console.log('The value provided to spliceAdd is not an array');
	  return ret(x);
	};

	var splice = function splice(x, start, n, mon) {
	  if (Array.isArray(x)) {
	    let ar = [];
	    let keys = Object.keys(x);
	    for (let k in keys) {ar[k] = x[k]};
	    ar.splice(start, n);
	    return mon.ret(ar);  
	  }
	  console.log('The value provided to splice is not an array');
	  return ret(x);
	};

	var concat = function concat(x, str, mon) {
	  mon.ret(x + str)
	}

	var sliceFront = function sliceFront(x, n, mon) {
	  if (Array.isArray(x)) {
	    let ar = x.slice(n);
	    return mon.ret(ar);  
	  }
	  console.log('The value provided to sliceFront is not an array');
	  return ret(x);
	};

	var filter = function filter(x, condition) {
	  if (Array.isArray(x)) {
	    let ar = ret(x);
	    return ret(ar.x.filter(v => condition))
	  }
	  return ret(x);
	}

	var map = function map(x, f, mon) {
	  if (Array.isArray(x)) {
	    let ar = [];
	    let keys = Object.keys(x);
	    for (let k in keys) {
	      ar[k] = f(x[k]);
	      return mon.ret(ar);  
	    }
	  }
	  console.log('The value provided to map is not an array');
	  return ret(x);
	};

	var reduce = function reduce(x, f, mon) {
	  console.log('In reduce.  Array.isArray(x), x.length: ', Array.isArray(x), x.length);
	  if (Array.isArray(x) && x.length > 0) {
	    let ar = [];
	    let keys = Object.keys(x);
	    for (let k in keys) {ar[k] = x[k]};
	    console.log('ar in reduce is ', ar);
	    return mon.ret(ar.reduce(f));  
	  }
	  console.log('The value provided to reduce is not an array or is empty . Value: ', x);
	  return ret(x);
	};

	var next = function next(x, y, mon2, a1, a2) {
	  if (x === y) {
	    mon2.release(a1, a2);
	  }
	  return ret(x);
	}

	var next2 = function next(x, condition, mon2) {
	  if (condition) {
	    mon2.release();
	  }
	  return ret(x);
	}

	var next3 = function next(x, y, z, mon2) {
	  if (x === y) {
	    mon2.ret(z);
	    mon2.release();
	  }
	  return ret(x);
	}

	var log = function log(x, message) {
	  console.log('In log.  message is: ', message);
	    return ret(x);
	};

	  var getIndex = function getIndex (event_object) {
	    var task = event_object.currentTarget.parentNode.innerText;
	    var possibilities = event_object.currentTarget.parentNode.parentNode.childNodes;
	    var keys = Object.keys(possibilities);
	    for (let k in keys) {
	      if (task == possibilities[k].innerText) {
	        return k
	      }
	    }
	    console.log('In getIndex. No match');
	  }

	  var getIndex2 = function getIndex2 (e) {
	    var elem = e.currentTarget.parentNode.children[0].innerHTML
	    var elem2 = e.currentTarget.parentNode.parentNode.childNodes
	    var keys = Object.keys(elem2);
	    for (let k in keys) {
	      if (elem == elem2[k].childNodes[0].innerHTML) {
	        return k
	      }
	      console.log('In getIndex2. No match');
	    }
	  }

	/* harmony default export */ exports["default"] = {O, ret, Monad, MonadIter, MonadStream, add, cube, push, equals, splice, map, filter, reduce, unshift, calc}



/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__motorcycle_dom__ = __webpack_require__(16);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__motorcycle_dom___default = __WEBPACK_IMPORTED_MODULE_0__motorcycle_dom__ && __WEBPACK_IMPORTED_MODULE_0__motorcycle_dom__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0__motorcycle_dom__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0__motorcycle_dom__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0__motorcycle_dom___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0__motorcycle_dom___default });
	 

	/*
	import {subject} from 'most-subject'
	var sub = subject
	var observer = sub.observer;
	var stream = sub.stream;
	*/
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
	    window[_this.id] = new Monad(a,_this.id);
	    return window[_this.id];
	  };
	};

	var mMname = new Monad('Fred', 'mMname');

	const monad = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__motorcycle_dom__["h"]('pre', {style: {color: '#AFEEEE' }}, `  var Monad = function Monad(z, g) {
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
	      O.[_this.id] = new Monad(a, _this.id);
	      return O.[_this.id]
	    };
	  }; ` )

	const monadStr = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__motorcycle_dom__["h"]('pre', {style: {color: '#AFEEEE' }}, `  var MonadStream = function MonadStream(g) {
	    var _this = this;
	    this.subject = subject();
	    this.observer = this.subject.observer;
	    this.stream = this.subject.stream;
	    this.id = g;
	    this.ret = function (a) {
	      _this.observer.next(a);
	      console.log('Streaming from ', _this.id);
	    };
	  }; ` )

	const monadIt = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__motorcycle_dom__["h"]('pre', {style: {color: '#AFEEEE' }}, `  var MonadIter = function MonadIter() {
	    var _this = this;
	    this.p = function () {};
	  
	    this.release = function (...args) {
	      return this.p(...args);
	    };
	  
	    this.bnd = function (func) {
	      _this.p = func;
	    };
	  }; ` )

	const ret = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__motorcycle_dom__["h"]('pre', {style: {color: '#AFEEEE' }}, `  var ret = function ret(v, id) {
	    if (arguments.length === 1) {
	      return (new Monad(v, 'anonymous'));
	    }
	    window[id] = new Monad(v, id);
	    return window[id];
	  }; ` )

	var fib = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__motorcycle_dom__["h"]('pre', `  var fib = function fib(x) {
	    return mMfib.ret([ O.mMfib.x[1], O.mMfib.x[0] + O.mMfib.x[1] ]);
	  }

	  var fibCalc = function(x, n) {
	    mMfib.ret([0,1])
	    for(let k in Array(n).fill(1)) mMfib.bnd(fib)
	    return ret(O.mMfib.x[0])
	  }   ` )  


	var driver = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__motorcycle_dom__["h"]('pre', `  var websocketsDriver = function () {
	      return create((add) => {
	        socket.onmessage = msg => add(msg)
	      })
	  };
	` )

	var messages = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__motorcycle_dom__["h"]('pre', `  const messages$ = (sources.WS).map(e => 
	    mMtem.ret(e.data.split(',')).bnd(v => {
	    mMZ10.bnd(() => mM$1
	      .ret([v[3], v[4], v[5], v[6]])
	      .bnd(() => mM$2.ret([])))
	    mMZ11.bnd(() => updateScoreboard(v[3]));
	    mMZ12.bnd(() => mM6
	      .ret(v[2] + ' successfully logged in.'))
	    mMZ13.bnd(() => updateMessages(v))
	    mMZ14.bnd(() => mMgoals2.ret('The winner is ' + v.x ))
	    mMZ15.bnd(() => mMgoals2.ret('A player named ' + 
	      O.mMname.x + 'is currently logged in. Page will refresh in 4 seconds.')
	      .bnd(refresh))
	    mMZ16.bnd(() => process(e.data))
	    mMtemp.ret(e.data.split(',')[0])
	      .bnd(next, 'CA#$42', mMZ10)
	      .bnd(next, 'CB#$42', mMZ11)
	      .bnd(next, 'CC#$42', mMZ12)
	      .bnd(next, 'CD#$42', mMZ13)
	      .bnd(next, 'CE#$42', mMZ14)
	      .bnd(next, 'EE#$42', mMZ15)
	      .bnd(next, 'DD#$42', mMZ16)
	    }) 
	  );
	             
	  var next = function next(x, y, mon2) {
	    if (x === y) {
	      mon2.release();
	    }
	    return ret(x);
	  }`  )

	var next = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__motorcycle_dom__["h"]('pre',  `  
	  `  )


	var Monad$ = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__motorcycle_dom__["h"]('pre',  `  var Monad$ = function Monad$(z, g) {
	      var _this = this;
	      this.subject = subject();
	      this.observer = this.subject.observer;
	      this.stream = this.subject.stream;
	      this.x = z;
	      this.id = g;

	      this.bnd = function (func, ...args) {
	         return func(_this.x, ...args);
	      };

	      this.ret = function (a) {
	        O[_this.id] = new Monad$(a,_this.id);
	        _this.observer.next(a);
	        return O[_this.id];
	      };
	    };
	  `  )

	var nums = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__motorcycle_dom__["h"]('pre',  `  
	    const numClick$ = sources.DOM
	      .select('.num').events('click');
	       
	    const numClickAction$ = numClick$.map(e => {
	      console.log(e);
	      if (O.mM3.x.length < 2) {
	        O.mM3.bnd(push, e.target.innerHTML, O.mM3)
	        mM28.ret(O.mMhistorymM1.x[O.mMindex2.x])
	        .bnd(spliceRemove, e.target.id, O.mM$1)
	        .bnd(mM$1.ret);
	        if (O.mM3.x.length === 2 && O.mM8.x !== 0) {
	          updateCalc();
	        }
	      };
	    }).startWith([0,0,0,0]);

	    const opClick$ = sources.DOM
	      .select('.op').events('click');
	  
	    const opClickAction$ = opClick$.map(e => {
	      mM8.ret(e.target.textContent);
	      if (O.mM3.x.length === 2) {
	        updateCalc();
	      }
	    })

	    const mM$1Action$ = mM$1.stream.map(v => {
	      if (Array.isArray(v)) {
	        O.mMhistorymM1.bnd(spliceAdd, O.mMindex2.x, v, O.mMhistorymM1);
	        document.getElementById('0').innerHTML = (O.mMhistorymM1.x[O.mMindex2.x])[0]; 
	        document.getElementById('1').innerHTML = (O.mMhistorymM1.x[O.mMindex2.x])[1]; 
	        document.getElementById('2').innerHTML = (O.mMhistorymM1.x[O.mMindex2.x])[2]; 
	        document.getElementById('3').innerHTML = (O.mMhistorymM1.x[O.mMindex2.x])[3]; 
	        cleanup()
	      }
	      else {
	        console.log('O.mM$1.stream is providing defective data to O.mM$1Action');
	      }
	  });  `  )

	  const arrayFuncs = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__motorcycle_dom__["h"]('pre',  `  var push = function push(y,v,mon) {
	      if (Array.isArray(y)) {
	        let ar = [];
	        let keys = Object.keys(y);
	        for (let k in keys) {ar[k] = y[k]};
	        ar.push(v);
	        return mon.ret(ar);  
	      }
	      console.log('The value provided to push is not an array');
	      return ret(y);
	    };
	    
	    var spliceRemove = function splice(x, j, mon) {
	      if (Array.isArray(x)) {
	        let ar = [];
	        let keys = Object.keys(x);
	        for (let k in keys) {ar[k] = x[k]};
	        ar.splice(j,1);
	        return mon.ret(ar);  
	      }
	      console.log('The value provided to spliceRemove is not an array');
	      return ret(x);
	    };
	    
	    var spliceAdd = function splice(x, index, value, mon) {
	      if (Array.isArray(x)) {
	        let ar = [];
	        let keys = Object.keys(x);
	        for (let k in keys) {ar[k] = x[k]};
	        ar.splice(index, 0, value);
	        return mon.ret(ar);  
	      }
	      console.log('The value provided to spliceAdd is not an array');
	      return ret(x);
	    };
	    
	    var splice = function splice(x, start, end, mon) {
	      if (Array.isArray(x)) {
	        let ar = [];
	        let keys = Object.keys(x);
	        for (let k in keys) {ar[k] = x[k]};
	        ar.splice(start, end);
	        return mon.ret(ar);  
	      }
	      console.log('The value provided to spliceAdd is not an array');
	      return ret(x);
	    };
	  `  )

	var cleanup = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__motorcycle_dom__["h"]('pre',  `  function cleanup (x) {
	      let target0 = document.getElementById('0');
	      let target1 = document.getElementById('1');
	      let target2 = document.getElementById('2');
	      let target3 = document.getElementById('3');
	      let targetAr = [target0, target1, target2, target3];
	      for (let i in [0,1,2,3]) {
	        if (targetAr[i].innerHTML == 'undefined' )    {
	          targetAr[i].style.display = 'none';
	        }
	        else {
	          targetAr[i].style.display = 'inline';
	        }
	      }
	      return ret(x);
	  }; `  )

	  var travel = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__motorcycle_dom__["h"]('pre',  `  const forwardClick$ = sources.DOM
	      .select('#forward2').events('click');
	  
	    const backClick$ = sources.DOM
	      .select('#back2').events('click');
	  
	    const forwardClickAction$ = forwardClick$.map(() => {
	      if (O.mMindex2.x < (O.mMhistorymM1.x.length - 1)) {
	        inc(O.mMindex2.x, mMindex2)
	        .bnd(() => mM$3.ret('Hello'))
	      }
	    });
	  
	    const backClickAction$ = backClick$.map(() => {
	      if (O.mMindex2.x > 0) {
	        dec(O.mMindex2.x, mMindex2)
	        .bnd(() => mM$3.ret('You bet!'))
	      }
	    });

	    const mM$3Action$ = mM$3.stream.map(v => {
	      document.getElementById('0').innerHTML = (O.mMhistorymM1.x[O.mMindex2.x])[0]; 
	      document.getElementById('1').innerHTML = (O.mMhistorymM1.x[O.mMindex2.x])[1]; 
	      document.getElementById('2').innerHTML = (O.mMhistorymM1.x[O.mMindex2.x])[2]; 
	      document.getElementById('3').innerHTML = (O.mMhistorymM1.x[O.mMindex2.x])[3]; 
	      cleanup();
	    })  `  )

	  var C42 = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__motorcycle_dom__["h"]('pre',  `  mMZ10.bnd(() => mM$1
	     .ret([O.mMar.x[3], O.mMar.x[4], O.mMar.x[5], O.mMar.x[6]])
	     .bnd(() => mM$2.ret([]))
	     .bnd(displayInline,'0')
	     .bnd(displayInline,'1')
	     .bnd(displayInline,'2')
	     .bnd(displayInline,'3'));  `  )

	  var taskStream = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__motorcycle_dom__["h"]('pre',  `  
	    });  `  )

	  var deleteTask2 = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__motorcycle_dom__["h"]('pre',  `  mMZ19.bnd(() => O.mM$task.bnd(spliceRemove, O.mMar.x[3], mM$task));
	  `  )

	  var newTask = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__motorcycle_dom__["h"]('pre',  `  const newTask$ = sources.DOM
	    .select('input.newTask').events('keydown'); 

	  const newTaskAction$ = newTask$.map(e => {
	      let ob = {};
	      var alert = '';
	      var ar = e.target.value.split(',');
	      var ar2 = ar.slice(2);
	      var task = '';
	      if (ar.length < 4) {
	        task = ar[2];
	      }
	      if (ar.length > 3) {
	        task = ar2.reduce((a,b) => a + '$*$*$' + b);
	      }
	      if( e.keyCode == 13 ) {
	        if ( ar.length < 3 ) {
	          alert = 'You should enter "author, responsible party, task" separated by commas';
	          document.getElementById('alert').innerHTML = alert;
	        }

	        else if ( (O.mMar2.x.filter(v => (v.task == task)).length) > 0 ) {
	          document.getElementById('alert').innerHTML = task + " is already listed.";
	        }

	        else if ( ar.length > 2 ) {
	          O.mM$taskList.bnd(addString, task + ',yellow, none, false,' +  ar[0] + ',' + ar[1], mM$taskList);
	          e.target.value = '';
	          document.getElementById('alert').innerHTML = '';
	        } 
	      } 
	  };  ` )

	  var process = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__motorcycle_dom__["h"]('pre',  `  const process = function(str) {
	    let a = str.split(",");
	    console.log('In process. str and a are: ', str, a);
	    if (a == undefined) {
	      return;
	    };
	    if (a.length < 9) {
	      return
	    };
	    let ob = {};
	    let ar = a.slice(3)
	    let s = ar.reduce((a,b) => a + ',' + b);
	    if (mM$taskList.x.length < 5) {
	      O.mM$taskList.ret(s);
	    }
	    let ar2 = [];
	    let tempArray = [];
	    if (ar.length < 6) {return};
	    if ((ar.length % 6) !== 0) {
	      document.getElementById('alert').innerHTML = 'Error: array length is: ' + length;
	    } else {
	      let keys = Array(ar.length/6).fill(1);
	      keys.map(_ => {
	        ar2.push(
	          {
	            task: convertBack(ar.shift()),
	            color: ar.shift(),
	            textDecoration: ar.shift(),
	            checked: ar.shift() === 'true',
	            author: ar.shift(),
	            responsible: ar.shift()
	          }
	        )
	      })
	      console.log('In process  ar2 is: ', ar2)
	      let keys2 = Object.keys(ar2);
	      for (let k in keys) {
	        tempArray.push(
	          h('div.todo',  [
	            h('span.task3', {style: {color: ar2[k].color, textDecoration: ar2[k].textDecoration}},
	                'Task: ' + ar2[k].task  ),  
	            h('br'),
	            h('button#edit1', 'Edit'  ),
	            h('input#edit2', {props: {type: 'textarea', value: ar2[k].task}, style: {display: 'none'}}  ), 
	            h('span#author.tao', 'Author: ' + ar2[k].author  + ' / ' + 'Responsibility: ' + ar2[k].responsible),
	            h('br'),
	            h('input#cb', {props: {type: 'checkbox', checked: ar2[k].checked}, style: {color: ar2[k].color,
	                 textDecoration: ar2[k].textDecoration} } ), 
	            h('label.cbox', { props: {for: '#cb'}}, 'Completed' ),
	            h('button.delete', 'Delete'  ),  
	            h('br'),
	            h('hr')])
	        )
	      }
	      mMtaskList.ret(tempArray)
	    }
	  };  `  )

	  var colorClick = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__motorcycle_dom__["h"]('pre',  `  const colorClick$ = sources.DOM
	    .select('#cb').events('click')
	    
	  const colorAction$ = colorClick$.map(e => {
	    let index = getIndex(e);
	    let s = O.mM$taskList.x;
	    let ar = s.split(',');
	    let n = 6 * index + 3;
	    let j = 6 * index + 2;
	    let k = 6 * index + 1;
	    let checked = ar[n];
	    if (checked == 'true')  {
	      ar[n] = 'false'; 
	      ar[k] = 'yellow'; 
	      ar[j] = 'none'; 
	    }
	    else {
	      ar[n] = 'true'; 
	      ar[k] = 'lightGreen'; 
	      ar[j] = 'line-through'; 
	    }
	    mM$taskList.ret( ar.reduce((a,b) => a + ',' + b) )
	  });  
	                     
	  var getIndex = function getIndex (event_object) {
	    var task = event_object.currentTarget.parentNode.innerText;
	    var possibilities = event_object.currentTarget.parentNode.parentNode.childNodes;
	    var keys = Object.keys(possibilities);
	    for (let k in keys) {
	      if (task == possibilities[k].innerText) {
	        return k
	      }
	    }
	    console.log('In getIndex. No match');
	  }  `  )

	  var edit = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__motorcycle_dom__["h"]('pre',  `  const edit1$ = sources.DOM
	    .select('#edit1').events('click')
	    
	  const edit1Action$ = edit1$.map(e => {
	    let index = getIndex2(e);
	    O.mMtaskList.x[index].children[3].elm.style.display = 'block';
	  });

	  const edit2$ = sources.DOM
	    .select('#edit2').events('keypress')
	    
	  const edit2Action$ = edit2$.map(e => {
	    let v = e.target.value;
	    let index = getIndex2(e);
	    if( e.keyCode == 13 ) {
	      process2(v, index);
	    O.mMtaskList.x[index].children[3].elm.style.display = 'none';
	    }
	  });

	  const process2 = function(str, index) {
	    let a = O.mM$taskList.x;
	    let ar = a.split(',');
	    let task = str.split(',').reduce((a,b) => ar + '$*$*$' + b)
	    ar[index * 6] = task;
	    let s = ar.reduce((a,b) => a + ',' + b);
	    mM$taskList.ret(s);
	  };

	  var getIndex2 = function getIndex2 (e) {
	    var elem = e.currentTarget.parentNode.children[0].innerHTML
	    var elem2 = e.currentTarget.parentNode.parentNode.childNodes
	    var keys = Object.keys(elem2);
	    for (let k in keys) {
	      if (elem == elem2[k].childNodes[0].innerHTML) {
	        return k
	      }
	      console.log('In getIndex2. No match');
	    }
	  }  `  )

	  var mM$task = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__motorcycle_dom__["h"]('pre',  `  const taskAction$ = mM$taskList.stream.map(str => {
	    socket.send('TD#$42' + ',' + O.mMgroup.x.trim() + 
	        ',' + O.mMname.x.trim() + ',' + '@' + str);
	  });  `  )

	  var updateCalc = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__motorcycle_dom__["h"]('pre',  `  function updateCalc() { 
	    O.mM3.bnd(x => mM7
	    .ret(calc(x[0], O.mM8.x, x[1]))
	    .bnd(result => {if (result == 20) {score(O.mM13.x, 1)}; return O.mM7}) 
	    .bnd(result => {if (result == 18) {score(O.mM13.x, 3)}; return O.mM$1}) 
	    .bnd(push, O.mM7.x, mM$1)
	    .bnd(reset))
	  };

	  var score = function score(x,j) {
	    if ((x + j) == 20) {
	      mMgoals.ret(O.mMgoals.x == 2 ? 0 : (O.mMgoals.x + 1)); 
	      mM13.ret(0);
	      socket.send('CG#$42,' + O.mMgroup.x + ',' + O.mMname.x + ',' + -x + ',' + O.mMgoals.x); 
	      if (O.mMgoals.x == 0) {
	        socket.send('CE#$42,' + O.mMgroup.x + ',' + O.mMname.x + ',nothing ');
	      }
	      socket.send('CA#$42,' + O.mMgroup.x.trim() + ',' + O.mMname.x.trim() + ',6,6,12,20');
	      return;
	    }
	    if ((x + j) % 5 == 0) {
	      mMscoreChange.ret(j + 5);  
	      socket.send('CG#$42,' + O.mMgroup.x + ',' + O.mMname.x + ','+(j+5)+',' + O.mMgoals.x); 
	      mM13.ret(x + j + 5);
	      socket.send('CA#$42,' + O.mMgroup.x.trim() + ',' + O.mMname.x.trim() + ',6,6,12,20');
	      return;
	    } 
	    socket.send('CG#$42,' + O.mMgroup.x + ',' + O.mMname.x + ','+j+',' + O.mMgoals.x); 
	    mM13.ret(x + j);
	    socket.send('CA#$42,' + O.mMgroup.x.trim() + ',' + O.mMname.x.trim() + ',6,6,12,20');
	  };  `  )


	  var testZ = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__motorcycle_dom__["h"]('pre',  `  mMZ1.bnd(v => O.mMt1.bnd(add,v,mMt1)
	  .bnd(cube,mMt2)
	  .bnd(() => mMt3.ret(O.mMt1.x + ' cubed is ' + O.mMt2.x)))  
	  
	  mMZ2.bnd(v => cube(v).bnd(w => mMt3.ret(v + ' cubed is ' + w)))  

	  var add = function(x,b,mon) {
	    if (arguments.length === 3) {
	      return mon.ret(x + b);
	    }
	    return ret(x+b);
	  }
	  
	  var cube = function(v,mon) {
	    if (arguments.length === 2) {
	      return mon.ret(v*v*v);
	    }
	    return ret(v*v*v);  // Returns an anonymous monad.
	  }  `  )

	  var quad = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__motorcycle_dom__["h"]('pre',  `  var solve = (function solve () {
	    mMZ3
	    .bnd(a => mMquad1.ret(a + 'x**2')
	    .bnd(() => mMquad2.ret('').bnd(mMquad3.ret) // Clear the display.
	    .bnd(() => 
	    mMZ3
	    .bnd(b => mMquad1.ret(a + 'x**x ' + ' + ' + b + 'x')
	    .bnd(() =>  
	    mMZ3
	    .bnd(c => mMquad1
	    .ret('Solutions for ' + a + 'x**x ' + ' + ' + b + 'x' + ' + ' + c + ' = 0:')
	    .bnd(() => mMquad2.bnd(sol1,a,b,c,mMquad2)
	    .bnd(() => mMquad3.bnd(sol2,a,b,c,mMquad3) 
	    .bnd(() => solve()    
	        )))))))))
	  })();

	  const quad$ = sources.DOM
	    .select('#quad').events('keypress')
	  const quadAction$ = quad$.map((e) => {
	    if( e.keyCode == 13 ) {
	      mMZ3.release(e.target.value)
	      document.getElementById('quad').value = '';
	    }
	  });

	  var sol1 = function sol1 (x,a,b,c,mon) {
	    let n = b*(-1) + Math.sqrt(b*b - 4*a*c);
	    if (n != n) {   // Test for NaN
	      return mon.ret("No solution");
	    }
	    return mon.ret(n/2*a);
	  }
	  
	  var sol2 = function sol2 (x,a,b,c,mon) {
	    let n = b*(-1) - Math.sqrt(b*b - 4*a*c)
	    if (n != n) {
	      return mon.ret("No solution");
	    }
	    return mon.ret(n/2*a);
	  }  `  )

	  var mdem1 = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__motorcycle_dom__["h"]('pre',  `  var equals = function equals (x, mon1, mon2, mon3) {
	    if (mon1.id === mon2.id && mon1.x === mon2.x) {
	      mon3.ret('true');
	    } else mon3.ret('false');
	    return ret(x);
	  }
	  
	  var add = function(x,b,mon) {
	    if (arguments.length === 3) {
	      return mon.ret(x + b);
	    }
	    return ret(x+b);
	  }

	  var cube = function(v,mon) {
	    if (arguments.length === 2) {
	      return mon.ret(v*v*v);
	    }
	    return ret(v*v*v);
	  }  `  )

	  var runTest = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__motorcycle_dom__["h"]('pre',  `  var runTest = function monTest () {
	  mM5.bnd( equals,  
	    m.ret(0).bnd(v => add(v, 3, m).bnd(cube)), 
	    m.ret(0).bnd(add, 3, m).bnd(cube), mMa)

	  mM5.bnd(equals, m, m.bnd(m.ret), mMb)

	  mM5.bnd(equals, m, m.ret(m.x), mMc)
	  }  `  )

	  
	  var gameStream = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__motorcycle_dom__["h"]('pre',  `  const mM$1Action$ = mM$1.stream.map(v => {
	      O.mMindex2.bnd(inc, mMindex2);
	      O.mMallRolls.bnd(spliceAdd, O.mMindex2.x, v, mMallRolls);
	      document.getElementById('0').innerHTML = (O.mMallRolls.x[O.mMindex2.x])[0]; 
	      document.getElementById('1').innerHTML = (O.mMallRolls.x[O.mMindex2.x])[1]; 
	      document.getElementById('2').innerHTML = (O.mMallRolls.x[O.mMindex2.x])[2]; 
	      document.getElementById('3').innerHTML = (O.mMallRolls.x[O.mMindex2.x])[3]; 
	      cleanup(7)
	  });  `  )

	  var inc = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__motorcycle_dom__["h"]('pre',  `  var inc = function inc(x, mon) {
	      return mon.ret(x + 1);
	  };

	  var spliceAdd = function spliceAdd(x, index, value, mon) {
	    if (Array.isArray(x)) {
	      let ar = [];
	      let keys = Object.keys(x);
	      for (let k in keys) {ar[k] = x[k]};
	      ar.splice(index, 0, value);
	      return mon.ret(ar);  
	    }
	    console.log('The value provided to spliceAdd is not an array');
	    return ret(x);
	  }  `  )

	    var todoStream = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__motorcycle_dom__["h"]('pre',  `  const taskAction$ = mM$taskList.stream.map(str => {
	    socket.send('TD#$42' + ',' + O.mMgroup.x.trim() + 
	        ',' + O.mMname.x.trim() + ',' + '@' + str);
	  });  `  )

	    var p3 = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__motorcycle_dom__["h"]('pre',  `  
	    `  )

	    var p4 = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__motorcycle_dom__["h"]('pre',  `  
	    `  )

	    var p5 = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__motorcycle_dom__["h"]('pre',  `  
	    `  )

	var add = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__motorcycle_dom__["h"]('pre',  `  var add = function(x,b,mon) {
	  if (arguments.length === 3) {
	    return mon.ret(x + b);
	  }
	  return ret(x+b);  `  )

	var ret_cube = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__motorcycle_dom__["h"]('pre',  `  var ret = function ret(v, id) {
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
	}  `  )

	    var p5 = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__motorcycle_dom__["h"]('pre',  `  
	    `  )





	  /* harmony default export */ exports["default"] = {monad, monadStr, monadIt, fib, driver, messages, next, Monad$, updateCalc, arrayFuncs, travel, nums, cleanup, ret, C42, taskStream, newTask, process, mM$task, addString, colorClick, edit, testZ, quad, mdem1, runTest, todoStream, gameStream, inc, add, ret_cube }




/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(4)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
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


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(5)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports, require('@most/multicast'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, global.multicast);
	    global.mostHold = mod.exports;
	  }
	})(this, function (exports, _multicast) {
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
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _vnode = __webpack_require__(15);

	var _vnode2 = _interopRequireDefault(_vnode);

	var _is = __webpack_require__(10);

	var _is2 = _interopRequireDefault(_is);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.makeDOMDriver = undefined;

	var _most = __webpack_require__(4);

	var _hold = __webpack_require__(42);

	var _hold2 = _interopRequireDefault(_hold);

	var _snabbdom = __webpack_require__(101);

	var _h = __webpack_require__(37);

	var _h2 = _interopRequireDefault(_h);

	var _classNameFromVNode = __webpack_require__(93);

	var _classNameFromVNode2 = _interopRequireDefault(_classNameFromVNode);

	var _selectorParser2 = __webpack_require__(36);

	var _selectorParser3 = _interopRequireDefault(_selectorParser2);

	var _utils = __webpack_require__(22);

	var _modules = __webpack_require__(21);

	var _modules2 = _interopRequireDefault(_modules);

	var _transposition = __webpack_require__(47);

	var _isolate = __webpack_require__(19);

	var _select = __webpack_require__(46);

	var _events = __webpack_require__(18);

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
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.mockDOMSource = undefined;

	var _most = __webpack_require__(4);

	var _most2 = _interopRequireDefault(_most);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.makeIsStrictlyInRootScope = exports.makeElementSelector = undefined;

	var _makeIsStrictlyInRootScope = __webpack_require__(20);

	var _events = __webpack_require__(18);

	var _isolate = __webpack_require__(19);

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
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.transposeVTree = undefined;

	var _most = __webpack_require__(4);

	var _most2 = _interopRequireDefault(_most);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	  } else if (vTree && typeof vTree.data === 'object' && vTree.data.static) {
	    return _most2.default.just(vTree);
	  } else if (typeof vTree.observe === 'function') {
	    return vTree.map(transposeVTree).switch();
	  } else if (typeof vTree === 'object') {
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
/* 48 */
/***/ function(module, exports) {

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


/***/ },
/* 49 */
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
/* 50 */
/***/ function(module, exports) {

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

/***/ },
/* 51 */
/***/ function(module, exports) {

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

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.replay = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _most = __webpack_require__(4);

	var _multicast = __webpack_require__(5);

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

/***/ },
/* 53 */
/***/ function(module, exports) {

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


/***/ },
/* 54 */
/***/ function(module, exports) {

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



/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(0);
	var Pipe = __webpack_require__(1);
	var runSource = __webpack_require__(33);
	var cons = __webpack_require__(24).cons;

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

	function noop() {}


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var combine = __webpack_require__(25).combine;
	var apply = __webpack_require__(3).apply;

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


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var mergeMapConcurrently = __webpack_require__(8).mergeMapConcurrently;

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
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(0);
	var Sink = __webpack_require__(1);
	var dispose = __webpack_require__(2);
	var PropagateTask = __webpack_require__(6);

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


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(0);
	var ValueSource = __webpack_require__(35);
	var SafeSink = __webpack_require__(81);
	var Pipe = __webpack_require__(1);
	var dispose = __webpack_require__(2);
	var tryEvent = __webpack_require__(9);
	var isPromise = __webpack_require__(11).isPromise;

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
		this.sink = new SafeSink(sink);
		this.scheduler = scheduler;
		this.disposable = source.run(this, scheduler);
	}

	RecoverWithSink.prototype.event = function(t, x) {
			tryEvent.tryEvent(t, x, this.sink);
	}

	RecoverWithSink.prototype.end = function(t, x) {
			tryEvent.tryEnd(t, x, this.sink);
	}

	RecoverWithSink.prototype.error = function(t, e) {
		var nextSink = this.sink.disable();

		var result = dispose.tryDispose(t, this.disposable, nextSink);
		this.disposable = isPromise(result)
			? dispose.promised(this._thenContinue(result, e, nextSink))
			: this._continue(this.f, e, nextSink);
	};

	RecoverWithSink.prototype._thenContinue = function(p, x, sink) {
		var self = this;
		return p.then(function () {
			return self._continue(self.f, x, sink);
		});
	};

	RecoverWithSink.prototype._continue = function(f, x, sink) {
		return f(x).source.run(sink, this.scheduler);
	};

	RecoverWithSink.prototype.dispose = function() {
		return this.disposable.dispose();
	};


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(0);
	var Sink = __webpack_require__(1);
	var Filter = __webpack_require__(30);

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


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(0);
	var Sink = __webpack_require__(1);
	var dispose = __webpack_require__(2);
	var PropagateTask = __webpack_require__(6);

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


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(0);
	var Pipe = __webpack_require__(1);

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


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(0);
	var Pipe = __webpack_require__(1);
	var IndexSink = __webpack_require__(14);
	var empty = __webpack_require__(7).empty;
	var dispose = __webpack_require__(2);
	var base = __webpack_require__(3);

	var copy = base.copy;
	var reduce = base.reduce;

	exports.merge = merge;
	exports.mergeArray = mergeArray;

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
			 : new Stream(mergeSources(streams));
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
		return new Merge(reduce(appendSources, [], streams))
	}

	function appendSources(sources, stream) {
		var source = stream.source;
		return source instanceof Merge
			? sources.concat(source.sources)
			: sources.concat(source)
	}

	function Merge(sources) {
		this.sources = sources;
	}

	Merge.prototype.run = function(sink, scheduler) {
		var l = this.sources.length;
		var disposables = new Array(l);
		var sinks = new Array(l);

		var mergeSink = new MergeSink(disposables, sinks, sink);

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


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var runSource = __webpack_require__(33);

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

	function noop() {}


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(0);
	var fatal = __webpack_require__(29);
	var just = __webpack_require__(7).of;

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


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(0);
	var Pipe = __webpack_require__(1);
	var dispose = __webpack_require__(2);
	var base = __webpack_require__(3);
	var invoke = __webpack_require__(13);

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

	Hold.prototype.end = function () {};
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


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(0);
	var Sink = __webpack_require__(1);
	var core = __webpack_require__(7);
	var dispose = __webpack_require__(2);
	var Map = __webpack_require__(31);

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
			: new Stream(sliceSource(start, end, stream.source));
	}

	function sliceSource(start, end, source) {
		return source instanceof Map ? commuteMapSlice(start, end, source)
			: source instanceof Slice ? fuseSlice(start, end, source)
			: new Slice(start, end, source);
	}

	function commuteMapSlice(start, end, source) {
		return Map.create(source.f, sliceSource(start, end, source.source))
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

	Slice.prototype.run = function(sink, scheduler) {
		return new SliceSink(this.min, this.max - this.min, this.source, sink, scheduler);
	};

	function SliceSink(skip, take, source, sink, scheduler) {
		this.sink = sink;
		this.skip = skip;
		this.take = take;
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


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(0);
	var dispose = __webpack_require__(2)

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

	Switch.prototype.run = function(sink, scheduler) {
		var switchSink = new SwitchSink(sink, scheduler);
		return dispose.all(switchSink, this.source.run(switchSink, scheduler));
	};

	function SwitchSink(sink, scheduler) {
		this.sink = sink;
		this.scheduler = scheduler;
		this.current = null;
		this.ended = false;
	}

	SwitchSink.prototype.event = function(t, stream) {
		this._disposeCurrent(t); // TODO: capture the result of this dispose
		this.current = new Segment(t, Infinity, this, this.sink);
		this.current.disposable = stream.source.run(this.current, this.scheduler);
	};

	SwitchSink.prototype.end = function(t, x) {
		this.ended = true;
		this._checkEnd(t, x);
	};

	SwitchSink.prototype.error = function(t, e) {
		this.ended = true;
		this.sink.error(t, e);
	};

	SwitchSink.prototype.dispose = function() {
		return this._disposeCurrent(0);
	};

	SwitchSink.prototype._disposeCurrent = function(t) {
		if(this.current !== null) {
			return this.current._dispose(t);
		}
	};

	SwitchSink.prototype._disposeInner = function(t, inner) {
		inner._dispose(t); // TODO: capture the result of this dispose
		if(inner === this.current) {
			this.current = null;
		}
	};

	SwitchSink.prototype._checkEnd = function(t, x) {
		if(this.ended && this.current === null) {
			this.sink.end(t, x);
		}
	};

	SwitchSink.prototype._endInner = function(t, x, inner) {
		this._disposeInner(t, inner);
		this._checkEnd(t, x);
	};

	SwitchSink.prototype._errorInner = function(t, e, inner) {
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

	Segment.prototype.event = function(t, x) {
		if(t < this.max) {
			this.sink.event(Math.max(t, this.min), x);
		}
	};

	Segment.prototype.end = function(t, x) {
		this.outer._endInner(Math.max(t, this.min), x, this);
	};

	Segment.prototype.error = function(t, e) {
		this.outer._errorInner(Math.max(t, this.min), e, this);
	};

	Segment.prototype._dispose = function(t) {
		this.max = t;
		dispose.tryDispose(t, this.disposable, this.sink)
	};


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(0);
	var Pipe = __webpack_require__(1);
	var dispose = __webpack_require__(2);
	var join = __webpack_require__(27).join;

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

	function noop() {}


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(0);
	var Sink = __webpack_require__(1);

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


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

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


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(0);
	var transform = __webpack_require__(12);
	var core = __webpack_require__(7);
	var Sink = __webpack_require__(1);
	var IndexSink = __webpack_require__(14);
	var dispose = __webpack_require__(2);
	var base = __webpack_require__(3);
	var invoke = __webpack_require__(13);
	var Queue = __webpack_require__(54);

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


/***/ },
/* 73 */
/***/ function(module, exports) {

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


/***/ },
/* 74 */
/***/ function(module, exports) {

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


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Pipe = __webpack_require__(1);

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


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var base = __webpack_require__(3);

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


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Scheduler = __webpack_require__(76);
	var setTimeoutTimer = __webpack_require__(79);
	var nodeTimer = __webpack_require__(78);

	var isNode = typeof process === 'object'
			&& typeof process.nextTick === 'function';

	module.exports = new Scheduler(isNode ? nodeTimer : setTimeoutTimer);

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17)))

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var defer = __webpack_require__(28);

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


/***/ },
/* 79 */
/***/ function(module, exports) {

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


/***/ },
/* 80 */
/***/ function(module, exports) {

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


/***/ },
/* 81 */
/***/ function(module, exports) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	module.exports = SafeSink;

	function SafeSink(sink) {
		this.sink = sink;
		this.active = true;
	}

	SafeSink.prototype.event = function(t, x) {
		if(!this.active) {
			return;
		}
		this.sink.event(t, x);
	};

	SafeSink.prototype.end = function(t, x) {
		if(!this.active) {
			return;
		}
		this.disable();
		this.sink.end(t, x);
	};

	SafeSink.prototype.error = function(t, e) {
		this.disable();
		this.sink.error(t, e);
	};

	SafeSink.prototype.disable = function() {
		this.active = false;
		return this.sink;
	}


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var DeferredSink = __webpack_require__(34);
	var dispose = __webpack_require__(2);
	var tryEvent = __webpack_require__(9);

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


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var dispose = __webpack_require__(2);
	var tryEvent = __webpack_require__(9);

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


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(0);
	var MulticastSource = __webpack_require__(5).MulticastSource;
	var DeferredSink = __webpack_require__(34);
	var tryEvent = __webpack_require__(9);

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


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var fromArray = __webpack_require__(86).fromArray;
	var isIterable = __webpack_require__(32).isIterable;
	var fromIterable = __webpack_require__(88).fromIterable;
	var isArrayLike = __webpack_require__(3).isArrayLike;

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


/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(0);
	var PropagateTask = __webpack_require__(6);

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


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(0);
	var MulticastSource = __webpack_require__(5).MulticastSource;
	var EventTargetSource = __webpack_require__(83);
	var EventEmitterSource = __webpack_require__(82);

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


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(0);
	var getIterator = __webpack_require__(32).getIterator;
	var PropagateTask = __webpack_require__(6);

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


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(0);
	var base = __webpack_require__(3);

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


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

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


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(0);
	var dispose = __webpack_require__(2);
	var MulticastSource = __webpack_require__(5).MulticastSource;
	var PropagateTask = __webpack_require__(6);

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


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

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


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = classNameFromVNode;

	var _selectorParser2 = __webpack_require__(36);

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

/***/ },
/* 94 */
/***/ function(module, exports) {

	function createElement(tagName){
	  return document.createElement(tagName);
	}

	function createElementNS(namespaceURI, qualifiedName){
	  return document.createElementNS(namespaceURI, qualifiedName);
	}

	function createTextNode(text){
	  return document.createTextNode(text);
	}


	function insertBefore(parentNode, newNode, referenceNode){
	  parentNode.insertBefore(newNode, referenceNode);
	}


	function removeChild(node, child){
	  node.removeChild(child);
	}

	function appendChild(node, child){
	  node.appendChild(child);
	}

	function parentNode(node){
	  return node.parentElement;
	}

	function nextSibling(node){
	  return node.nextSibling;
	}

	function tagName(node){
	  return node.tagName;
	}

	function setTextContent(node, text){
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
/* 95 */
/***/ function(module, exports) {

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


/***/ },
/* 96 */
/***/ function(module, exports) {

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


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var is = __webpack_require__(10);

	function arrInvoker(arr) {
	  return function() {
	    // Special case when length is two, for performance
	    arr.length === 2 ? arr[0](arr[1]) : arr[0].apply(undefined, arr.slice(1));
	  };
	}

	function fnInvoker(o) {
	  return function(ev) { o.fn(ev); };
	}

	function updateEventListeners(oldVnode, vnode) {
	  var name, cur, old, elm = vnode.elm,
	      oldOn = oldVnode.data.on || {}, on = vnode.data.on;
	  if (!on) return;
	  for (name in on) {
	    cur = on[name];
	    old = oldOn[name];
	    if (old === undefined) {
	      if (is.array(cur)) {
	        elm.addEventListener(name, arrInvoker(cur));
	      } else {
	        cur = {fn: cur};
	        on[name] = cur;
	        elm.addEventListener(name, fnInvoker(cur));
	      }
	    } else if (is.array(old)) {
	      // Deliberately modify old array since it's captured in closure created with `arrInvoker`
	      old.length = cur.length;
	      for (var i = 0; i < old.length; ++i) old[i] = cur[i];
	      on[name]  = old;
	    } else {
	      old.fn = cur;
	      on[name] = old;
	    }
	  }
	}

	module.exports = {create: updateEventListeners, update: updateEventListeners};


/***/ },
/* 98 */
/***/ function(module, exports) {

	var raf = (typeof window !== 'undefined' && window.requestAnimationFrame) || setTimeout;
	var nextFrame = function(fn) { raf(function() { raf(fn); }); };

	function setNextFrame(obj, prop, val) {
	  nextFrame(function() { obj[prop] = val; });
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
	      var relativeCenterX = textRect.left + textRect.width/2 - boundingRect.left;
	      var relativeCenterY = textRect.top + textRect.height/2 - boundingRect.top;
	      return relativeCenterX + 'px ' + relativeCenterY + 'px';
	    }
	  }
	  return '0 0'; //top left
	}

	function getTextDx(oldTextRect, newTextRect) {
	  if (oldTextRect && newTextRect) {
	    return ((oldTextRect.left + oldTextRect.width/2) - (newTextRect.left + newTextRect.width/2));
	  }
	  return 0;
	}
	function getTextDy(oldTextRect, newTextRect) {
	  if (oldTextRect && newTextRect) {
	    return ((oldTextRect.top + oldTextRect.height/2) - (newTextRect.top + newTextRect.height/2));
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
	  var i, id, newElm, oldVnode, oldElm, hRatio, wRatio,
	      oldRect, newRect, dx, dy, origTransform, origTransition,
	      newStyle, oldStyle, newComputedStyle, isTextNode,
	      newTextRect, oldTextRect;
	  for (i = 0; i < created.length; i += 2) {
	    id = created[i];
	    newElm = created[i+1].elm;
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
	      hRatio = newRect.height / (Math.max(oldRect.height, 1));
	      wRatio = isTextNode ? hRatio : newRect.width / (Math.max(oldRect.width, 1)); //text scales based on hRatio
	      // Animate new element
	      origTransform = newStyle.transform;
	      origTransition = newStyle.transition;
	      if (newComputedStyle.display === 'inline') //inline elements cannot be transformed
	        newStyle.display = 'inline-block';        //this does not appear to have any negative side effects
	      newStyle.transition = origTransition + 'transform 0s';
	      newStyle.transformOrigin = calcTransformOrigin(isTextNode, newTextRect, newRect);
	      newStyle.opacity = '0';
	      newStyle.transform = origTransform + 'translate('+dx+'px, '+dy+'px) ' +
	                               'scale('+1/wRatio+', '+1/hRatio+')';
	      setNextFrame(newStyle, 'transition', origTransition);
	      setNextFrame(newStyle, 'transform', origTransform);
	      setNextFrame(newStyle, 'opacity', '1');
	      // Animate old element
	      for (var key in oldVnode.savedStyle) { //re-apply saved inherited properties
	        if (parseInt(key) != key) {
	          var ms = key.substring(0,2) === 'ms';
	          var moz = key.substring(0,3) === 'moz';
	          var webkit = key.substring(0,6) === 'webkit';
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
	      setNextFrame(oldStyle, 'transform', 'translate('+ -dx +'px, '+ -dy +'px) scale('+wRatio+', '+hRatio+')'); //scale must be on far right for translate to be correct
	      setNextFrame(oldStyle, 'opacity', '0');
	      oldElm.addEventListener('transitionend', function(ev) {
	        if (ev.propertyName === 'transform')
	          document.body.removeChild(ev.target);
	      });
	    }
	  }
	  removed = created = undefined;
	}

	module.exports = {pre: pre, create: create, destroy: destroy, post: post};


/***/ },
/* 99 */
/***/ function(module, exports) {

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
	    if (old !== cur && (key !== 'value' || elm[key] !== cur)) {
	      elm[key] = cur;
	    }
	  }
	}

	module.exports = {create: updateProps, update: updateProps};


/***/ },
/* 100 */
/***/ function(module, exports) {

	var raf = (typeof window !== 'undefined' && window.requestAnimationFrame) || setTimeout;
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


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	// jshint newcap: false
	/* global require, module, document, Node */
	'use strict';

	var VNode = __webpack_require__(15);
	var is = __webpack_require__(10);
	var domApi = __webpack_require__(94);

	function isUndef(s) { return s === undefined; }
	function isDef(s) { return s !== undefined; }

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

	var hooks = ['create', 'update', 'remove', 'destroy', 'pre', 'post'];

	function init(modules, api) {
	  var i, j, cbs = {};

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
	    return function() {
	      if (--listeners === 0) {
	        var parent = api.parentNode(childElm);
	        api.removeChild(parent, childElm);
	      }
	    };
	  }

	  function createElm(vnode, insertedVnodeQueue) {
	    var i, thunk, data = vnode.data;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.init)) i(vnode);
	      if (isDef(i = data.vnode)) {
	          thunk = vnode;
	          vnode = i;
	      }
	    }
	    var elm, children = vnode.children, sel = vnode.sel;
	    if (isDef(sel)) {
	      // Parse selector
	      var hashIdx = sel.indexOf('#');
	      var dotIdx = sel.indexOf('.', hashIdx);
	      var hash = hashIdx > 0 ? hashIdx : sel.length;
	      var dot = dotIdx > 0 ? dotIdx : sel.length;
	      var tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;
	      elm = vnode.elm = isDef(data) && isDef(i = data.ns) ? api.createElementNS(i, tag)
	                                                          : api.createElement(tag);
	      if (hash < dot) elm.id = sel.slice(hash + 1, dot);
	      if (dotIdx > 0) elm.className = sel.slice(dot+1).replace(/\./g, ' ');
	      if (is.array(children)) {
	        for (i = 0; i < children.length; ++i) {
	          api.appendChild(elm, createElm(children[i], insertedVnodeQueue));
	        }
	      } else if (is.primitive(vnode.text)) {
	        api.appendChild(elm, api.createTextNode(vnode.text));
	      }
	      for (i = 0; i < cbs.create.length; ++i) cbs.create[i](emptyNode, vnode);
	      i = vnode.data.hook; // Reuse variable
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
	    var i, j, data = vnode.data;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.destroy)) i(vnode);
	      for (i = 0; i < cbs.destroy.length; ++i) cbs.destroy[i](vnode);
	      if (isDef(i = vnode.children)) {
	        for (j = 0; j < vnode.children.length; ++j) {
	          invokeDestroyHook(vnode.children[j]);
	        }
	      }
	      if (isDef(i = data.vnode)) invokeDestroyHook(i);
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
	          api.removeChild(parentElm, ch.elm);
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
	        api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm));
	        oldStartVnode = oldCh[++oldStartIdx];
	        newEndVnode = newCh[--newEndIdx];
	      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
	        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
	        api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
	        oldEndVnode = oldCh[--oldEndIdx];
	        newStartVnode = newCh[++newStartIdx];
	      } else {
	        if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
	        idxInOld = oldKeyToIdx[newStartVnode.key];
	        if (isUndef(idxInOld)) { // New element
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
	    if (isDef(i = vnode.data) && isDef(i = i.vnode)) {
	      patchVnode(oldVnode, i, insertedVnodeQueue);
	      vnode.elm = i.elm;
	      return;
	    }
	    var elm = vnode.elm = oldVnode.elm, oldCh = oldVnode.children, ch = vnode.children;
	    if (oldVnode === vnode) return;
	    if (!sameVnode(oldVnode, vnode)) {
	      var parentElm = api.parentNode(oldVnode.elm);
	      elm = createElm(vnode, insertedVnodeQueue);
	      api.insertBefore(parentElm, elm, oldVnode.elm);
	      removeVnodes(parentElm, [oldVnode], 0, 0);
	      return;
	    }
	    if (isDef(vnode.data)) {
	      for (i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode);
	      i = vnode.data.hook;
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

	  return function(oldVnode, vnode) {
	    var i, elm, parent;
	    var insertedVnodeQueue = [];
	    for (i = 0; i < cbs.pre.length; ++i) cbs.pre[i]();

	    if (isUndef(oldVnode.sel)) {
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
	    for (i = 0; i < cbs.post.length; ++i) cbs.post[i]();
	    return vnode;
	  };
	}

	module.exports = {init: init};


/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	var h = __webpack_require__(37);

	function init(thunk) {
	  var i, cur = thunk.data;
	  cur.vnode = cur.fn.apply(undefined, cur.args);
	}

	function prepatch(oldThunk, thunk) {
	  var i, old = oldThunk.data, cur = thunk.data;
	  var oldArgs = old.args, args = cur.args;
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


/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__motorcycle_core__ = __webpack_require__(38);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__motorcycle_core___default = __WEBPACK_IMPORTED_MODULE_0__motorcycle_core__ && __WEBPACK_IMPORTED_MODULE_0__motorcycle_core__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0__motorcycle_core__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0__motorcycle_core__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0__motorcycle_core___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0__motorcycle_core___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__ = __webpack_require__(16);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom___default = __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__ && __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_1__motorcycle_dom___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_most__ = __webpack_require__(4);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_most___default = __WEBPACK_IMPORTED_MODULE_2_most__ && __WEBPACK_IMPORTED_MODULE_2_most__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_2_most__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_2_most__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_2_most___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_2_most___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__code_js__ = __webpack_require__(40);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_js_monads__ = __webpack_require__(39);






	setTimeout(function() {
	  console.log(/* harmony import */ __WEBPACK_IMPORTED_MODULE_4_js_monads__["default"].cube);
	},3000 );

	function createWebSocket(path) {
	    let host = window.location.hostname;
	    if(host == '') host = 'localhost';
	    let uri = 'ws://' + host + ':3055' + path;
	    let Socket = "MozWebSocket" in window ? MozWebSocket : WebSocket;
	    return new Socket(uri);
	}

	const socket = createWebSocket('/');

	const websocketsDriver = function () {
	    return /* harmony import */ __WEBPACK_IMPORTED_MODULE_2_most__["create"]((add) => {
	      socket.onmessage = msg => add(msg)
	    })
	}

	const unitDriver = function () {
	  return /* harmony import */ __WEBPACK_IMPORTED_MODULE_2_most__["periodic"](1000, 1);
	}

	window.onload = function (event) {
	  console.log('onopen event: ', event);
	};

	function main(sources) {

	  setTimeout( function() {
	    document.querySelector('input#login').focus();
	  },500 );
	  
	  mMfib.ret([0,1]);
	  mMpause.ret(0);

	  mMZ1.bnd(v => O.mMt1.bnd(add,v,mMt1)
	  .bnd(cube,mMt2)
	  .bnd(() => mMt3.ret(O.mMt1.x + ' cubed is ' + O.mMt2.x)))
	  
	  mMZ2.bnd(v => cube(v).bnd(w => mMt3.ret(v + ' cubed is ' + w)))
	  
	  const messages$ = (sources.WS).map(e => {
	    console.log('******____&&&&&&&&&&&&&&&&&&&____**************_In messages$  e.data is: ', e.data)
	    mMtem.ret(e.data.split(',')).bnd(v => {
	    mMZ10.bnd(() => {
	      mM$2.ret([])
	      mM$1.ret([v[3], v[4], v[5], v[6]])})
	    mMZ11.bnd(() => updateScoreboard(v[3]));
	    mMZ12.bnd(() => mM6
	      .ret(v[2] + ' successfully logged in.'))
	    mMZ13.bnd(() => updateMessages(v))
	    mMZ14.bnd(() => mMgoals2.ret('The winner is ' + v.x ))
	    mMZ15.bnd(() => mMgoals2.ret('A player named ' + 
	      O.mMname.x + 'is currently logged in. Page will refresh in 4 seconds.')
	      .bnd(refresh))
	    mMZ16.bnd(() => {
	      if (v[3] == 'no file') {
	        mMtaskList.ret([])
	      } 
	      else {
	        process(e.data)
	      }
	    })
	    mMtemp.ret(e.data.split(',')[0])
	      .bnd(next, 'CA#$42', mMZ10)
	      .bnd(next, 'CB#$42', mMZ11)
	      .bnd(next, 'CC#$42', mMZ12)
	      .bnd(next, 'CD#$42', mMZ13)
	      .bnd(next, 'CE#$42', mMZ14)
	      .bnd(next, 'EE#$42', mMZ15)
	      .bnd(next, 'DD#$42', mMZ16)
	    }) 
	  });
	  
	  const updateMessages = function updateMessages (ar) {
	    var sender = ar[2];
	    mMhelper.ret(ar)
	      .bnd(splice, 0, 3, mMhelper)
	      .bnd(reduce, ((a,b) => {return a + ', ' + b}), mMhelper)
	      .bnd(v => O.mMmsg.bnd(unshift, /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('div', sender + ': ' + v), O.mMmsg));
	  }

	  const loginPress$ = sources.DOM
	    .select('input#login').events('keypress');

	  const loginPressAction$ = loginPress$.map(e => {
	    let v = (e.target.value);
	    if (v == '' ) {
	      return;
	    } 
	    if( e.keyCode == 13 ) {
	      socket.send("CC#$42" + v);
	      mMname.ret(v.trim())
	      mM3.ret([]).bnd(mM2.ret);
	      e.target.value = '';
	      document.getElementById('dice').style.display = 'block';
	      document.getElementById('rightPanel').style.display = 'block';
	      document.getElementById('log1').style.display = 'none';
	      document.getElementById('log2').style.display = 'block';
	      document.getElementById('gameDiv2').style.display = 'block';
	    }
	  });

	  const groupPress$ = sources.DOM
	    .select('input#group').events('keypress');

	  const groupPressAction$ = groupPress$.map(e => {
	    let v = e.target.value;
	    if( e.keyCode == 13 ) {
	      mMgroup.ret(v);
	      socket.send(`CO#$42,${v},${O.mMname.x.trim()},${v}`);
	    }
	  });

	  const messagePress$ = sources.DOM
	    .select('input.inputMessage').events('keydown');

	  const messagePressAction$ = messagePress$.map(e => {
	    if( e.keyCode == 13 ) {
	      socket.send(`CD#$42,${O.mMgroup.x.trim()},${O.mMname.x.trim()},${e.target.value}`);
	      e.target.value = '';
	    }
	  });

	  const newTask$ = sources.DOM
	    .select('input.newTask').events('keydown');

	  const newTaskAction$ = newTask$.map(e => {
	      let ob = {};
	      var alert = '';
	      var task = '';
	      if( e.keyCode == 13 ) {
	        var ar = e.target.value.split(',');
	        if ( ar.length < 3 ) {
	          alert = 'You should enter "author, responsible party, task" separated by commas';
	          document.getElementById('alert').innerHTML = alert;
	        }
	        var ar2 = ar.slice(2);
	        console.log('*************************************$$$$$$$$$$$_ar ', ar);
	        if (ar2.length == 1) {
	          task = ar[2];
	        }
	        if (ar2.length > 1) {
	          task = ar2.reduce((a,b) => a + '$*$*$' + b);
	        }
	        if ( (O.mMar2.x.filter(v => (v.task == task)).length) > 0 ) {
	          document.getElementById('alert').innerHTML = task + " is already listed.";
	        }
	        else if ( ar.length > 2 ) {
	          O.mMcurrentList.bnd(addString, task + ',yellow, none, false,' +  ar[0] + ',' + ar[1], mM$taskList)
	          e.target.value = '';
	          document.getElementById('alert').innerHTML = '';
	        } 
	      } 
	  });

	  const process = function(str) {
	    var a = str.split(",");
	    if (a == undefined) {
	      return;
	    };
	    if (a.length < 9) {
	      return
	    };
	    var ob = {};
	    var ar = a.slice(3)
	    var s = ar.reduce((a,b) => a + ',' + b);
	    console.log('In process. ar and s are: ', ar, s);
	    var tempArray = [];
	    if (ar.length < 6) {return};
	    if ((ar.length % 6) !== 0) {
	      document.getElementById('alert').innerHTML = 'Error: array length is: ' + length;
	    } 
	    mMcurrentList.ret(s);
	    process3(ar);
	  }
	    
	  const process3 = function(a) {
	    var ar5 = [];
	    var keys = Array(a.length/6).fill(1);
	    keys.map(_ => {
	      ar5.push(
	        {
	          task: convertBack(a.shift()),
	          color: a.shift(),
	          textDecoration: a.shift(),
	          checked: a.shift() === 'true',
	          author: a.shift(),
	          responsible: a.shift()
	        }
	      )
	    })
	    mMar2.ret(ar5);
	    process4(ar5);
	  };

	  const process4 = function(a) {
	    var tempArray = [];
	    let keys = Object.keys(a);
	    for (let k in keys) {
	      tempArray.push(
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('div.todo',  [
	          /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span.task3', {style: {color: a[k].color, textDecoration: a[k].textDecoration}},
	              'Task: ' + a[k].task  ),  
	          /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br'),
	          /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('button#edit1', 'Edit'  ),
	          /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('input#edit2', {props: {type: 'textarea', value: a[k].task}, style: {display: 'none'}}  ), 
	          /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span#author.tao', 'Author: ' + a[k].author  + ' / ' + 'Responsibility: ' + a[k].responsible),
	          /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br'),
	          /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('input#cb', {props: {type: 'checkbox', checked: a[k].checked}, style: {color: a[k].color,
	               textDecoration: a[k].textDecoration} } ), 
	          /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('label.cbox', { props: {for: '#cb'}}, 'Completed' ),
	          /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('button.delete', 'Delete'  ),  
	          /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br'),
	          /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('hr')])
	      )
	    }
	    mMtaskList.ret(tempArray)
	  }

	  const colorClick$ = sources.DOM
	    .select('#cb').events('click')
	    
	  const colorAction$ = colorClick$.map(e => {
	    let index = getIndex(e);
	    let s = O.mMcurrentList.x;
	    let ar = s.split(',');
	    let n = 6 * index + 3;
	    let j = 6 * index + 2;
	    let k = 6 * index + 1;
	    let checked = ar[n];
	    if (checked == 'true')  {
	      ar[n] = 'false'; 
	      ar[k] = 'yellow'; 
	      ar[j] = 'none'; 
	    }
	    else {
	      ar[n] = 'true'; 
	      ar[k] = 'lightGreen'; 
	      ar[j] = 'line-through'; 
	    }
	    mM$taskList.ret( ar.reduce((a,b) => a + ',' + b) )
	  });

	  const edit1$ = sources.DOM
	    .select('#edit1').events('click')
	    
	  const edit1Action$ = edit1$.map(e => {
	    let index = getIndex2(e);
	    O.mMtaskList.x[index].children[3].elm.style.display = 'block';
	  });

	  const edit2$ = sources.DOM
	    .select('#edit2').events('keypress')
	    
	  const edit2Action$ = edit2$.map(e => {
	    let v = e.target.value;
	    let index = getIndex2(e);
	    if( e.keyCode == 13 ) {
	      process2(v, index);
	    O.mMtaskList.x[index].children[3].elm.style.display = 'none';
	    }
	  });

	  const process2 = function(str, index) {
	    let a = O.mMcurrentList.x;
	    let ar = a.split(',');
	    let task = str.split(',').reduce((a,b) => ar + '$*$*$' + b)
	    ar[index * 6] = task;
	    let s = ar.reduce((a,b) => a + ',' + b);
	    mM$taskList.ret(s);
	  };

	  const deleteClick$ = sources.DOM
	    .select('.delete').events('click')
	    
	  const deleteAction$ = deleteClick$.map(e => {
	    let index = getIndex(e);
	    let s = O.mMcurrentList.x;
	    let ar = s.split(',');
	    let str = '';
	    ar.splice(index*6, 6);
	    if (ar.length > 0) {
	      mM$taskList.ret(ar.reduce((a,b) => a + ',' + b));
	    } else {
	      socket.send('TX#$42' + ',' + O.mMgroup.x.trim() + ',' + O.mMname.x.trim() ); 
	      mMtaskList.ret('');
	    } 
	  });

	  const chatClick$ = sources.DOM
	    .select('#chat2').events('click');

	  const chatClickAction$ = chatClick$.map(() => {
	    var el = document.getElementById('chatDiv');
	    (el.style.display == 'none') ?
	    el.style.display = 'inline' :
	    el.style.display = 'none' 
	  });
	     
	  const captionClick$ = sources.DOM
	    .select('#caption').events('click');

	  const captionClickAction$ = captionClick$.map(() => {
	    var el = document.getElementById('captionDiv');
	    (el.style.display == 'none') ?
	    el.style.display = 'inline' :
	    el.style.display = 'none' 
	  });
	     
	  const gameClick$ = sources.DOM
	    .select('#game').events('click');

	  const gameClickAction$ = gameClick$.map(() => {
	    var el = document.getElementById('gameDiv');
	    (el.style.display == 'none') ?
	    el.style.display = 'inline' :
	    el.style.display = 'none' 
	    
	    var el2 = document.getElementById('gameDiv2');
	    (el2.style.display == 'none') ?
	    el2.style.display = 'inline' :
	    el2.style.display = 'none' 
	  });
	     
	  const runTest$ = sources.DOM
	    .select('#runTest').events('click')
	    
	  const runTestAction$ = runTest$.map(() => {
	    runTest();
	});

	  const todoClick$ = sources.DOM
	    .select('#todoButton').events('click')
	    
	  const todoClickAction$ = todoClick$.map(e => {
	    var el = document.getElementById('todoDiv');
	    (el.style.display == 'none') ?
	    el.style.display = 'inline' :
	    el.style.display = 'none' 
	});

	  const numClick$ = sources.DOM
	    .select('.num').events('click');
	     
	  const numClickAction$ = numClick$.map(e => {
	    console.log('In numClickAction$ O.mM3.x and e are: ', O.mM3.x, e);
	    if (O.mM3.x.length < 2) {
	      O.mM3.bnd(push, e.target.innerHTML, O.mM3)
	      // mMtemp.ret(O.mMhistorymM1.x[O.mMindex2.x])
	      O.mMallRolls.bnd(spliceRemove, O.mMindex2.x, e.target.id, mM$1)
	      if (O.mM3.x.length === 2 && O.mM8.x !== 0) {
	        updateCalc();
	      }
	    };
	  }).startWith([0,0,0,0]);
	    
	  const opClick$ = sources.DOM
	    .select('.op').events('click');

	  const opClickAction$ = opClick$.map(e => {
	    mM8.ret(e.target.textContent);
	    if (O.mM3.x.length === 2) {
	      updateCalc();
	    }
	  })

	  const rollClick$ = sources.DOM
	    .select('.roll').events('click');

	  const rollClickAction$ = rollClick$.map(e => {  
	    mM13.ret(O.mM13.x - 1);
	    mM8.ret(0);
	    mM3.ret([]);
	    socket.send('CG#$42,' + O.mMgroup.x.trim() + ',' + 
	        O.mMname.x.trim() + ',' + -1 + ',' + O.mMgoals.x);
	    socket.send('CA#$42,' + O.mMgroup.x.trim() + ',' + O.mMname.x.trim() + ',6,6,12,20')
	  });

	  const fibPress$ = sources.DOM
	    .select('input#code').events('keydown');

	  const fibPressAction$ = fibPress$.map(e => {
	    if (e.target.value == '') {return};
	    if( e.keyCode == 13 && Number.isInteger(e.target.value*1) ) {
	      mM19.bnd(fibCalc,e.target.value*1).bnd(mM19.ret);
	      mM21.ret(e.target.value);
	    }
	    if( e.keyCode == 13 && !Number.isInteger(e.target.value*1 )) {
	      mM19.ret("You didn't provide an integer");
	    }
	  });

	  const forwardClick$ = sources.DOM
	    .select('#forward2').events('click');

	  const backClick$ = sources.DOM
	    .select('#back2').events('click');

	  const forwardClickAction$ = forwardClick$.map(() => {
	    if (O.mMindex2.x < (O.mMallRolls.x.length - 1)) {
	      inc(O.mMindex2.x, mMindex2)
	      .bnd(() => mM$3.ret('Hello'))
	    }
	  });

	  const backClickAction$ = backClick$.map(() => {
	    if (O.mMindex2.x > 0) {
	      console.log('In backClickAction$ O.mMindex2.x is: ', O.mMindex2.x);
	      dec(O.mMindex2.x, mMindex2)
	      .bnd(() => mM$3.ret('You bet!'))
	      console.log('In backClickAction$ again ***** O.mMindex2.x is: ', O.mMindex2.x);
	    }
	  });

	  const taskAction$ = mM$taskList.stream.map(str => {
	    console.log('In taskAction$. str is: ', str)
	    socket.send('TD#$42' + ',' + O.mMgroup.x.trim() + 
	        ',' + O.mMname.x.trim() + ',' + '@' + str);
	  });
	  

	  const mM$1Action$ = mM$1.stream.map(v => {
	      console.log('In mM$1Action$. v is: ', v)
	      O.mMindex2.bnd(inc, mMindex2);
	      O.mMallRolls.bnd(spliceAdd, O.mMindex2.x, v, mMallRolls);
	      mMcurrentRoll.ret(v);
	      document.getElementById('0').innerHTML = (O.mMallRolls.x[O.mMindex2.x])[0]; 
	      document.getElementById('1').innerHTML = (O.mMallRolls.x[O.mMindex2.x])[1]; 
	      document.getElementById('2').innerHTML = (O.mMallRolls.x[O.mMindex2.x])[2]; 
	      document.getElementById('3').innerHTML = (O.mMallRolls.x[O.mMindex2.x])[3]; 
	      cleanup(7)
	    })
	 

	  const mM$3Action$ = mM$3.stream.map(v => {
	      console.log('In mM$3Action$. v is: ', v)
	      document.getElementById('0').innerHTML = (O.mMallRolls.x[O.mMindex2.x])[0]; 
	      document.getElementById('1').innerHTML = (O.mMallRolls.x[O.mMindex2.x])[1]; 
	      document.getElementById('2').innerHTML = (O.mMallRolls.x[O.mMindex2.x])[2]; 
	      document.getElementById('3').innerHTML = (O.mMallRolls.x[O.mMindex2.x])[3]; 
	      cleanup(11);
	  })

	  const testZ = sources.DOM
	    .select('#testZ').events('click')
	  const testZAction$ = testZ.map(() =>
	    mMZ1.release(1));                                

	  const testQ = sources.DOM
	    .select('#testQ').events('click')
	  const testQAction$ = testQ.map(() =>
	    mMt1.ret(-1).bnd(mM2.ret)
	    .bnd(() => mMZ1.release(1)));                                

	  const testW = sources.DOM
	    .select('#testW').events('keypress')
	  const testWAction$ = testW.map((e) => {
	    if( e.keyCode == 13 ) {
	      mMZ2.release(e.target.value)
	    }
	  });

	  var solve = (function solve () {
	    mMZ3
	    .bnd(a => mMquad1.ret(a + 'x**2')
	    .bnd(() => mMquad2.ret('').bnd(mMquad3.ret) // Clear the display.
	    .bnd(() => 
	    mMZ3
	    .bnd(b => mMquad1.ret(a + 'x**2 ' + ' + ' + b + 'x')
	    .bnd(() =>  
	    mMZ3
	    .bnd(c => mMquad1
	    .ret('Solutions for ' + a + 'x**2 ' + ' + ' + b + 'x' + ' + ' + c + ' = 0:')
	    .bnd(() => mMquad2.bnd(sol1,a,b,c,mMquad2)
	    .bnd(() => mMquad3.bnd(sol2,a,b,c,mMquad3) 
	    .bnd(() => solve()    
	        )))))))))
	  })();

	  const quad$ = sources.DOM
	    .select('#quad').events('keypress')
	  const quadAction$ = quad$.map((e) => {
	    if( e.keyCode == 13 ) {
	      mMZ3.release(e.target.value)
	      document.getElementById('quad').value = '';
	    }
	  });

	  const calcStream$ = /* harmony import */ __WEBPACK_IMPORTED_MODULE_2_most__["merge"]( runTestAction$, quadAction$, testWAction$, testZAction$, testQAction$, edit1Action$, edit2Action$, taskAction$, colorAction$, deleteAction$, newTaskAction$, chatClickAction$, gameClickAction$, todoClickAction$, captionClickAction$, mM$3Action$, mM$1Action$, backClickAction$, forwardClickAction$, fibPressAction$, groupPressAction$, rollClickAction$, messagePressAction$, loginPressAction$, messages$, numClickAction$, opClickAction$ );

	    return {
	      DOM: 
	        calcStream$.map(() => 
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('div.content', [ 
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('div#rightPanel',  {style: {display: 'none'}}, [
	          /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span#tog', [
	          /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('button#game',  {style: {fontSize: '16px'}}, 'TOGGLE GAME'  ), 
	          /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span.tao',' ' ),
	          /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('button#todoButton',  {style: {fontSize: '16px'}}, 'TOGGLE TODO LIST'  ),  
	          /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br'),
	          /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br'),
	          /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('button#chat2',  {style: {fontSize: '16px'}}, 'TOGGLE CHAT'  ),
	          /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span.tao',' ' ),
	          /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('button#caption',  {style: {fontSize: '16px'}}, 'TOGGLE CAPTION'  )  ]),
	          /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br'),
	          /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br'),
	          /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br'),
	          /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br'),

	          /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('div#gameDiv',   [
	          /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span',  'Group: ' + O.mMgroup.x ),
	          /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br'),
	          /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span',  'Goals: ' + O.mMgoals.x ),
	          /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br'),
	          /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span',  'Name: ' + O.mMname.x ),
	          /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br'),
	          /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span', 'player[score][goals]' ),
	          /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('div', O.mMscoreboard.x ) ]) ,
	          /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br'),
	          /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br'),  
	          /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br'),  
	    
	          /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('div#todoDiv',  [ 
	            /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('div#taskList', O.mMtaskList.x ),
	            /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span', 'Author, Responsible Person, Task: '  ),  
	            /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('input.newTask' ) ]),
	          /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br'),
	          /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span#alert' ),
	          /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br'),
	          /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br'),

	          /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('div#chatDiv', [ 
	          /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('div#messages',  [
	          /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span', 'Message: '  ),
	          /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('input.inputMessage' ),
	          /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('div', O.mMmsg.x  ) ]) ]) 
	        ]),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('div.leftPanel', {  style: {width: '60%'   }},   [  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br'),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('a.tao', {props: {href: '#common'}}, 'Common Patterns'   ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('a.tao', {props: {href: '#tdList'}}, 'Todo List Explanation'   ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('a.tao', {props: {href: '#monads'}}, 'Why Call Them Monads'   ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('div#captionDiv', [
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('h1', 'Motorcycle.js With JS-monads' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span.tao1', ' A shared, persistent todo list, ' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br'),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span.tao1', ' A websockets game with a traversable history of dice rolls, ' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br'),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span.tao1', ' Group chat rooms and more demonstrations of efficient, ' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br'),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span.tao2', ' maintainable code using Motorcycle.js and JS-monads.  ' ) ] ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br'),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span.tao', 'This is a ' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('a', {props: {href: "https://github.com/motorcyclejs"}}, 'Motorcycle.js' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span', ' application. Motorcycle.js is ' ), 
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('a', {props: {href: "https://github.com/cyclejs/core"}}, 'Cycle.js' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span', ' using ' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('a', {props: {href: "https://github.com/cujojs/most"}}, 'Most' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span', ' , ' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('a', {props: {href: "https://github.com/TylorS/most-subject"}}, 'Most-subject' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span', ' and '  ), 
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('a', {props: {href: "https://github.com/paldepind/snabbdom"}}, 'Snabbdom' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span', ' instead of RxJS and virtual-dom. The repository is at '  ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('a', {props: {href: "https://github.com/dschalk/JS-monads-stable"}}, 'JS-monads-stable' ),

	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('div#gameDiv2',  {style: {display: 'none'}}, [
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br'),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span', ' Here are the basic rules:' ), 
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p', 'RULES: If clicking two numbers and an operator (in any order) results in 20 or 18, the score increases by 1 or 3, respectively. If the score becomes 0 mod 5, 5 points are added. A score of 25 results in one goal. That can only be achieved by arriving at a score of 20, which jumps the score to 25. Directly computing 25 results in a score of 30, and no goal. Each time ROLL is clicked, one point is deducted. Three goals wins the game. '    ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('button#0.num'),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('button#1.num'),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('button#2.num'),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('button#3.num'),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br'),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('button#4.op', 'add'  ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('button#5.op', 'subtract' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('button#5.op', 'mult' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('button#5.op', 'div' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('button#5.op', 'concat' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br'),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('div#dice', {style: {display: 'none'}}, [ 
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('button.roll', 'ROLL' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br'),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('button#back2', 'BACK'  ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('button#forward2', 'FORWARD'  ) ]) ]),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('div.winner', O.mMgoals2.x+''  ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('div#log1', [
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p', 'IN ORDER TO SEE THE DEMONSTRATIONS, YOU MUST ENTER SOMETHING BELOW.'  ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span', 'Name: ' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('input#login', {props: {placeholder: "focus on; start typing"}} ) ]),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p', O.mM6.x.toString() ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('div#log2', {style: {display: 'none'}}, [
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span', 'Change group: '  ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('input#group' ) ]),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p',  O.mMsoloAlert.x  ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p', 'People who are in the same group, other than solo, share the same todo list, messages, and simulated dice game. In order to see any of these, you must establish an identity on the server by logging in. The websockets connection would terminate if the first message the server receives does not succefully participate in the login handshake. '  ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('hr' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('h1', 'The Monads'  ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p', ' There are three basic types of monads: Monad, MonadIter, and MonadStream. Instances of Monad have a method called "bnd" which takes a functions and possibly other values as arguments. I have not created a library of functions for because nobody needs that. You should create functions that suit your specific purposes. I use browserify or webpack so I can use ES6 functions such as map, reduce, and filter. I don\'t need the Ramda or Underscore-fs. ' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p', ' There is a basic pattern that I have found useful for computations and object (including array) manipulation. For what it is worth, I will demonstrate it with some simple examples in the discussion that follows. This will serve as a demonstration of how the monads work. ' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('h2', 'Monad' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_3__code_js__["default"].monad,
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p', 'The following statements create instances of Monad named "m" with an initial value of "some value": var m = new Monad("some value", "m") and ret("some value", "m"). Monad instances maintain state in the unique, mutable, global object named "O". Where there is changing state, it is not practical to avoid mutating something. My choices narrowed down to the window object or an attribute of window like O. O seemed like the better choice. It is a place to keep the most recent versions of named monads. Earlier versions of named monads can persist elsewhere, or be left for the gargage collector.   ' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p', ' In the examples shown on this page, the initial values of instances of Monad remain unchaged. The ret() method places updated instances on O. The instances on O are never mutated. For any instance of Monad named m with id "m" and value v (i.e., m.x == v is true), m.ret(v2) creates a new attribute of O with key "m" or, if O.m already exists, m.ret(v2) mutates O by replacing its m attribute\'s value. The monad O.m is not mutated, so any O.m that is replaced will persist if there is a reference to it, or will be subject to garbage collection if there is not. ' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('h3', 'Examples' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p', ' Here are the definitions of ret() and add(): '  ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_3__code_js__["default"].ret_cube,
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p', ' calling ret() with only one argument creates an anonymous global monad. There is no reference to it, so when a computation sequence using it terminates, it becomes eligeble for garbage collection. Although the monad\'s scope is global, it can\'t be clobbered because it has no name (no variable referring to it). ' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p', ' As you see, cube() and ret() are overloaded functions. Here are some examples of various ways of using them: ' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span.red3', 'cube(3)' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span.td2', ' creates a useless anonymous monad with x == 27 and id == "anonymous". ' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br' ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br' ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span.red3', 'cube(5, m)' ), 
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span.td2', ' where m is a monad leaves m unchanged, O.m.x == 125, and O.m.id == "m". ' ), 
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br' ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br' ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span.red3', 'cube(5).bnd(m.ret)' ), 
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span.td2', ' is equivalent to the previous example. m is unchanged and O.m.x == 125. ' ), 
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br' ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br' ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span.red3', 'ret(5).bnd(cube).bnd(m.ret)' ), 
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span.td2', ' is equivalent to the previous two examples. O.m.x == 125. ' ), 
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br' ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br' ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span.red3', 'm.ret(4).bnd(cube)' ), 
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span.td2', 'causes O.m.x == 2, and creates an anonymous monad with x == 64. ' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br' ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br' ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span.red3', 'm.ret(4).bnd(cube, m)' ), 
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span.td2', ' leaves m unchanged, O.m.x == 64, and O.m.id == "m". ' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br' ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br' ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span.tao', ' The convention "a == b" in this presentation signifies that a == b is true. By the way, if you want to change the value of m, all you have to do is call ' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span.red3', 'ret(v, "m")' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span', ' to cause m.x == v and m.id = "m". This is the definition of add(): ' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_3__code_js__["default"].add,   
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span.red3', 'add(3, 4)' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span.td2', ' creates a useless anonymous monad with x == 7 and id == "anonymous". ' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br' ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br' ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span.red3', 'add(3, 4).bnd(m.ret)' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span.td2', ' causes O.m.x == 7 and O.m.id == "m". ' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br' ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br' ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span.red3', 'add(3, 4, m)' ), 
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span.td2', ' is equivalent to the prior example. The result is O.m.x == 7, and O.m.id == "m". ' ), 
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br' ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br' ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span.red3', 'm.ret(0).bnd(add, 3).bnd(cube)' ), 
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span.td2', 'leaves m unchanged, O.m.x == 0, and creates an anonymous monad with x == 27. ' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br' ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br' ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span.red3', 'ret(0).bnd(add, 3).bnd(cube).bnd(m.ret)' ), 
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span.td2', 'causes O.m.x == 27, and O.m.id = "m". ' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br' ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br' ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span.red3', 'ret(0).bnd(add, 2, m).bnd(cube, m2)' ), 
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span.td2', ' where m, and m2 are monads causes O.m.x == 2, and O.m2.x == 8. ' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br' ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p#iterLink', ' O holds the current state of the monads. This is convenient. For example, mMcurrentList.ret() is seen in the application code whereever a todo list is created, removed, or altered. O.mMcurrentList.x sits in the virtual DOM, making sure that the todo list display is is always current. ' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('h2', 'MonadIter' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p', 'For any instance of MonadIter, say "m", the statement "m.bnd(func)" causes m.p == func to be true. The statement "m.release(...args) causes p(...args) to execute. Here is the definition: ' ), 
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_3__code_js__["default"].monadIt,
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p', 'As shown later on this page, MonadIter instances control the routing of incoming websockets messages and the flow of action in the simulated dice game. '  ), 
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p', 'The following example illustrates the use of release() with an argument. It also shows lambda expressions being provided as arguments for bnd(). The initial values of mMt1, mMt2, and mMt3 are 0, 0, and "" respectively. When this page loads, the following code runs: ' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_3__code_js__["default"].testZ,
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p', ' add() and cube() function as arguments of the bnd() method, or as functions that return monads. Click "mMZ1.release(1)" several times to run the code with n == 1. O.mMt3.x is shown below the button. mMZ1.p doesn\'t change until its bnd() method is used again, so repeated calls to release(1) continue to run the function provided to bnd() in the code shown above. ' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('button#testZ', 'mMZ1.release(1)'  ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p.code2', O.mMt3.x ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span', 'Refresh button: '  ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('button#testQ', 'mMt1.ret(0).bnd(mMt2.ret)'  ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p', '  You can call release() with arguments other than 1 by entering numbers below. ' ), 
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('input#testW' ), 
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p', ' Here is another example. It demonstrates lambda expressions passing values to a remote location for use in a computation. If you enter three numbers consecutively below, I\'ll call them a, b, and c, then the quadratic equation will be used to find solutions for a*x**2 + b*x + c = 0. The a, b, and c you select might not have a solution. If a and b are positive numbers, you are likely to see solutions if c is a negative number. For example, 12, 12, and -24 yields the solutions 1 and -2. ' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p.code2#quad4', O.mMquad1.x ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span.red2', O.mMquad2.x ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span.red2', O.mMquad3.x ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span.tao' , 'Run mMZ3.release(v) three times for three numbers. The numbers are a, b, and c in ax*x + b*x + c = 0: ' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('input#quad' ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p', 'Here is the code:' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_3__code_js__["default"].quad,
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span#tdList' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('h2', 'MonadStream'  ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span.tao', ' MonadStream uses ' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('a', {props: {href: "https://github.com/TylorS/most-subject"}}, 'most-subject' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span', '. In a Cycle application that is already using RxJS, RxJs could be substituted for most-subject. Bacon could be used. most-subject is light-weight and does the job, so you might want to use it in any application context. Here is the definition:  '  ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_3__code_js__["default"].monadStr,
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('h3', 'Todo List Side Effects' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p', ' When users do anything to the todo list, MonadStream instance mM$taskList runs its ret() method on the modified String representation of the list, causing the string to be added to mM$taskList.stream. mM$taskList.stream has only one subscriber, taskAction$, whose only purpose it to send the string representation of the todo list to the server. The server updates its persistent file and distributes a text representation of the updated todo list to all group members. Each group member receives the todo list as a string and parses it into a DOM node tree that is merged into the stream that updates the virtual DOM. All Todo List side effects can be traced to:' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_3__code_js__["default"].todoStream,
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span', ' Just search for "mM$taskList.ret" to find where all todo list changes were initiated. The following link takes you to a more detailed explanation of the todo list. ' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('a', {props: {href: '#tdList2'}}, 'Detailed Todo List Explanation'   ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('h3', 'Dice Game Side Effects' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p', ' mM$1.ret() is called only when (1) a new dice roll comes in from the server, (2) when a player clicks a number, and (3) when clicking a number or operator results in a computation being performed. These are the three things that require a DOM update. When a player clicks a number, it disappears from number display. When a computation is performed, the result is added to the number display, unless the result is 18 or 20. A result of 18 or 20 results in a new roll coming in from the server and mM$1.ret() being called on an array of four numbers; something like mM$1.ret[4,2,11,17]). When a number is removed or a result added, mM$1.ret() is called on an array containing fewer than four numbers. ' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p', ' mM$1.stream is a stream of arrays of integers, as explained in the paragraph above. All game side effects can be traced to: ' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_3__code_js__["default"].gameStream,
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p', ' Because a player can traverse the history of number displays by clicking the BACK and FORWARD buttons, the current value of O.mMindex2.x must be incremented to determine where the new array of numbers will be placed in the O.mMallRolls.x array. Here are the definitions of inc and spliceAdd: ' ), 
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_3__code_js__["default"].inc,
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('hr' ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('h2', 'Concise Code Blocks For Information Control' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p', ' Incoming websockets messages trigger updates to the game display, the chat display, and the todo list display. The members of a group see what other members are doing; and in the case of the todo list, they see the current list when they sign in to the group. When any member of a group adds a task, crosses it out as completed, edits its description, or removes it, the server updates the persistent file and all members of the group immediately see the revised list.  '  ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p', 'The code below shows how incoming websockets messages are routed. For example, mMZ10.release() is called when a new dice roll (prefixed by CA#$42) comes in.   ' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_3__code_js__["default"].messages,
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p', ' The "mMZ" prefix designates instances of MonadIter. The bnd() method assigns its argument to the "p" attribute. "p" runs if and when the release() method is called. The next() function releases a specified MonadIter instance when the calling monad\'s value matches the specified value. next2() releases the specified monad when the specified condition returns true. The release method in next() has no argument, but next does take arguments, as illustrated below.' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span.tao', ' The incoming messages block is just a syntactic variation of a switch block, but that isn\'t all that MonadIter instances can do. They can provide fine-grained control over the lazy evaluation of blocks of code. Calling release() after a function completes some task provides Promise-like behavior. Error handling is optional. The MonadInter release(...args) method facilitates sequential evaluation of code blocks, remeniscent of video and blog explanations of ES6 iterators and generators. I prefer doing it with MonadIter over "yield" and "next". For one thing, ES6 generator "yield" blocks must be evaluated in a predetermined order. This link takes you back to the MonadIter section with interactive examples of the use of release() with arguments.  ' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('a#tdList2', {props: {href: '#iterLink'}}, 'release() with arguments'   ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('a', {props: {href: '#top'}}, 'Back To The Top'   ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('h3', 'The Todo List' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p', ' Next, I\'ll go over some features of the todo list application. This will show how Motorcycle.js and the monads work together.' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p', 'Creation Of A Task: If you enter something like Susan, Fred, Pay the water bill, the editable task will appear in your browser and in the browsers of any members a group you might have created or joined. If you have loaded this page in another tab and changed to the same group in both, you will see the task in both tabs, barring some malfunction. The task has a delete button, an edit button, and a "Completed" checkbox. It shows that Susan authorized the task and Fred is responsible for making sure it gets done. Instead of entering an authority and responsible person, you can just enter two commas before the task description. Without two commas, a message appears requesting more information. This is how Motorcycle.js handles the creation of a new task: ' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_3__code_js__["default"].newTask,
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p', ' mM$taskList is the todo application\'s worker function. Every time it executes its ret() method, the argument to ret() is added to its stream, causing the following code to run: ' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_3__code_js__["default"].mM$task,
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p', 'mM$taskList caries a string representing the task list. mMtaskList.x.split(",") produces an array whose length is a multiple of six. Commas in the task description are replaced by "$*$*$" so split(",") will put the entire task description in a single element. Commas are re-inserted when the list arrives from the server for rendering. Although a task list is a nested virtual DOM object (Snabbdom vnode), it can be conveniently passed back and forth to the server as a string without resorting to JSON.stringify. Its type is Text on the server and String in the front end, becomming a virtual DOM node only once, when it arrives from the server prefixed by "DD#$42" causing "process(e.data) to execute. Here is process(): ' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_3__code_js__["default"].process,
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span.tao', 'As you see, the string becomes a list of six-element objects, then those objects are used to create a Snabbdom vnode which is handed to mM$taskList.ret() leading to the update of O.mMtaskList. O.mMtaskList.x sits permanently in the main virtual DOM description. When its value gets refreshed, the DOM re-renders because taskStream$ is merged into the stream that is mapped into the virtural DOM description inside the object returned by "main". "main" and "sources" are the arguments provided to Cycle.run(). "sources" is the argument provided to "main". It is an array of drivers. The code is at '  ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('a', {props: {href: "https://github.com/dschalk/JS-monads-stable"}}, 'https://github.com/dschalk/JS-monads-stable' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br'),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p', ' Clicking "Completed": When the "Completed" button is clicked, the following code runs:         '  ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_3__code_js__["default"].colorClick,
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p', 'O.mMtaskList is split into an array. Every sixth element is the start of a new task. colorAction$ toggles the second, third, and fourth element in the task pinpointed by "index" * 6. getIndex finds the index of the first and only the element whose task description matches the one that is being marked "Completed". I say "only" because users are prevented from adding duplicate tasks. After the changes are made, the array of strings is reduced to one string and sent to the server when mM$taskList.ret() updates mM$taskList.stream triggering . '  ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p', ' This is the code involved in editing a task description: '  ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_3__code_js__["default"].edit,
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p', 'Clicking "Edit" causes a text box to be displayed. Pressing <ENTER> causes it to diappear. edit2Action$ obtains the edited description of the task and the index of the task iten and provides them as arguments to process. Process exchanges $*$*$ for any commas in the edited version and assigns the amended task description to the variable "task". O.mMtaskList.x is copied and split into an array. "index * 6" is replaced with "task" and the list of strings is reduced back to a single string and sent to the server for distribution. This pattern, - (1) split the string representation of the todo list into an array of strings, (2) do something, (3) reduce the list of strings back to a single string - is repeated when the "Delete" button is clicked. If the last item gets deleted, the server is instructed to delete the persistent file bearing the name of the group whose member deleted the last task. ' ), 
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p#common', 'Cycle.js has been criticized for not keeping state in a single location, the way React.js does. Motorcycle.js didn\'t do it for me, or try to force me to do it, but it so happens that the current state of all active monads is in the object "O". I have written applications in Node.js and React.js, and I can say without a doubt that Motorcycle.js provides the best reactive interface for my purposes.  ' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('hr'),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('a', {props: {href: '#top'}}, 'Back To The Top'   ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('h2', 'Common Patterns' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p', 'Anyone not yet familiar with functional programming can learn by studying the definition of the Monad bnd() method and considering the common patterns presented below. Often, we want to give a named monad the value of an anonymous monad returned by a monadic computation. Here are some ways to accomplish that: '  ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p', 'For any monads m1 and m2 with values a and b respectively (in other words, m1.x == a and m2.x == b return true), m1.bnd(m2.ret) provides m1\'s value to m2.ret() causing O.m2 to have m1\'s value. So, after m1.bnd(m2.ret), m1.x == a, m2.x == b, O.m2.x == a all return true. The definition of Monad\s bnd() method shows that the function m2.ret() operates on m1.x. m1.bnd(m2.ret) is equivalent to m2.ret(m1.x). The stand-alone ret() function can be used to alter the current value of m2, rather than altering the value of O.m2. Here is one way of accomplishing this: m1.bnd(x => ret(x,"m2"). These relationships are verified in the following tests: ' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('pre', 
	`             ret('m1Val','m1')
	             m1.x === 'm1Val'  // true
	             ret('m2Val', 'm2')
	             m2.x === 'm2Val'  // true

	             m1.bnd(m2.ret)
	             O.m2.x === 'm1Val' // true

	             m1.ret('newVal')
	             O.m1.bnd(v => ret(v, 'm2'))
	             m2.x === 'newVal'  // true
	             O.m2.x === 'm1Val' // true   still the same  `   ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p', 'The bnd() method does not have to return anonymous monads. Consider, for example, the trivial function f = function(x, mon) {return mon.ret(x)}. The monad that calls its bnd() method with the argument f gives the monad designated as "mon" its value. So m1.bnd(f, m2) results in m1.x == a, m2.x == b, O.m2.x == a all returning true. ' ), 
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p'  ), 
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p', 'Frequently, some monad "m" will use its "bnd" method on some function which takes two arguments, say "f(x,v)". The first argument is the value of m (which is m.x). m.bnd(f,v) is equivalent to f(m.x, v). The following example demonstates the use of a two-argument function: ' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_3__code_js__["default"].fib,
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span.tao', 'In both functions, the "x" argument is ignored. It must be included, however, in order to make the bnd() method return the desired result. If you enter some number "n" in the box below, '  ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('pre',  '  mM19.bnd(fibCalc, e.target.value*1).bnd(mM19.ret)' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span', ' will execute and O.mM19.x will be displayed under the input box. ' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('input#code' ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br'),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span', 'Fibonacci ' + O.mM21.x + ' is ' ), 
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span.code2', ' ' + O.mM19.x ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('hr'),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('h3', 'Immutable Data And The State Object "O" ' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p',  'The server updates scores in response to messages prefixed by "CG#$42". Each such message carries an integer specifying the amount of the change. The ServerState list of Client tupples is pulled from the game state TMVar and replaced by a new tupple whose Score field differs from the previous one.' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p', 'In front end code, mutating variables which are defined inside of functions often seems inocuous in applications written in an object oriented programming style. This is not the case in a Motorcycle.js application, where functions culminate in streams that merge into the stream that feeds the object returned by the main function, called "main" in this application. "sources" is an array of drivers. It is main\'s only argument, "sources" and "main" are Cycle.run()\'s arguments.' ), 
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p', '"main" and "Cycle.run" are called only once. In the cyclic steady state that results, a reference should say what it means and mean what it says. If it suddenly refers to something other than what the other half of the cycle thinks it is, there will be a temporary disconnect. This will promptly staighten out, but having temporary disconnects shakes confidence in the consistency and reliability of the program. I don\'t have an example of mutating an object causing an unexpected result or crash. I would appreciate it if someone would give me such an example. ' ),
	       /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p', ' In this environment, avoiding mutations is recommended and I generally follow that recommendation. Mutations in this application are confined to the global state object "O" and MonadIter instances. In the examples above, the release() method moves the process forward to the next occurance of the MonadIter instance where the bnd() method provides a new function to the "p" attribute. The progressive morphing of "p" in MonadIter instances is desirable behavior, and I think that creating a clone each time it occurs would be a senseless waste of resources. Unless and until release() is called, the program is not affected by "p". If release() is called, the return value of p(...args) is returned, but "p" itself remains tucked away, never mixing with the flow of information through the program. The bnd() method is pure. Given the same argument, it will always do the same thing. It doesn\'t even return anything. It just updates the internal "p" attribute. This insulation of internal operations from the outer program is remeniscent of an important purpose of the Haskell IO monad. These are just hand-waving arguments for the harmlessness of letting the bnd() method mutate MonadIter instances, but I wanted to explain why I feel comfortable with letting the definition of MonadIter stand as it is.  ' ),           
	       /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p', 'All monad updates caused by the monad ret() method are stored in the object "O". When a monad m executes m.ret(v) for some value "v", m remains unchanged and the O attribute O.m is created or, if it already exists, is replaced by the update; i.e., O.m.x == v becomes true. Older versions of m are subject to garbage collection unless there is a reference to them or to an object (arrays are objects) containing m.  This is illustrated in the score-keeping code below.  All score changes are captured by mM13.ret(). Therefore, O.mM13.x is always the current score. Replacing monad attributes in O is vaguely analogous to swapping out ServerState in the Haskell server\'s state TMVar. Older versions of ServerState can be preserved in the server just as prior versions of O.mM13 can be preserved in the front end. ' ),     
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_3__code_js__["default"].updateCalc,
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p', 'The socket messages prompt the server to update its application state and to broadcast messages to all members of the group whose member sent the message to the server. Let\'s take another look at the way incoming messages are handled.'  ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_3__code_js__["default"].messages,
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p#monads', ' Messages prefixed by CB#$42 are broadcast in response to CG#$42-prefixed messages from a browser. CB#$42 prefixes release mMZ11, causing the scoreboard to update. CA#$42-prefixed messages to the server result in CA#$42-prefixed messages carrying the next dice roll to be broadcast to the sender\'s group.  CE#$42 prefixed messages cause the release of mMZ14 which causes O.mMgoals2.x to change from an empty string to an anouncement of the name of the winner. ' ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('hr' ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('a', {props: {href: '#top'}}, 'Back To The Top'   ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('h3', 'Why Call Them Monads?' ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p', 'For any monad m and function f mapping values to monads, inside the O object the bnd() method behaves like the Haskell >>= operator(pronounce "bind"). For example, if we set O.m.x to 0 and call O.m.bnd(add, 3, m), O.m.x == 3 becomes true. And, like Haskell monads that obey the optional Haskell monad laws, sequences of calls to bnd() are associative; i,e, how computations are grouped does not matter. Here are three functions we will use to illustrate this:' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_3__code_js__["default"].mdem1,
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p', ' The relationships being demonstrated here are readily derivable from the definition of Monad. This is just an example to illustrate the general properties. The "===" operator isn\'t useful for illustrating monadic behavior because it returns false for clones. A meaningful variation of associative property can be demonstrated with the equals() function. We will use equals() to test the associative property along with the left and right identity properties of the ret() mdethod. These relationships are similar to the relationships in the Haskell laws.'),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p', ' Click runTest() to see updated O.mMa.x, O.mMb.x, and O.mMc.x, colored red, displayed below.  ' ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_3__code_js__["default"].runTest,  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('button#runTest', 'runTest()' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span.tao', 'O.mMa.x: ' ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span.red', O.mMa.x ), 
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br' ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span.tao', 'O.mMb.x: ' ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span.red', O.mMb.x ), 
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br' ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span.tao', 'O.mMc.x: ' ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('span.red', O.mMc.x ), 
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p' ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p' ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p', ' That\'s about it. That\'s why I call them "monads". But JS-monads can do much more than vaguely mirror Haskell monad functionality. There is no attempt to constrain JS-monads with type classes, or with restrictions on the types of functions the bnd() method can accept. m.bnd(x => x**3) returns a number, not a JS-monad. It would be the end of the line for a chained sequence of computations; but that might be exactly what you want: a monadic chain of computations that spits out a number when it is done. '  ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('h2', 'Conclusion' ),
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p', '  You might not need a ready-made framework or a bloated set of libraries for your project. It could be that improvisation, possibly with the help of JS-monads or your own variation on the JS-monads theme, is the key to creating a well-organized, understandable, and easily maintainable masterpiece. The libraries I imported, Motorcycle.js and Most-subject, were an immense help. I wholeheartedly endorse Motorcycle, with its Cycle, Snabbdom, and Most constitutents; along with Most-subject, which made MonadStream possible. '    ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('a', {props: {href: '#top'}}, 'Back To The Top'   ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p' ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p' ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p' ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br'),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br'),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('br'),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('hr'),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p' ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p' ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p' ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p' ),  
	        /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('p' )  
	        ])
	      ])
	    )}} 

	  function cleanup (x) {
	      let target0 = document.getElementById('0');
	      let target1 = document.getElementById('1');
	      let target2 = document.getElementById('2');
	      let target3 = document.getElementById('3');
	      let targetAr = [target0, target1, target2, target3];
	      [0,1,2,3].map(i => {
	        if (targetAr[i].innerHTML == 'undefined' )    {
	          targetAr[i].style.display = 'none';
	        }
	        else {
	          targetAr[i].style.display = 'inline';
	        }
	      });
	      return ret(x);
	  };

	  function updateCalc() { 
	    O.mM3.bnd(x => mM7
	    .ret(calc(x[0], O.mM8.x, x[1]))
	    .bnd(result => {if (result == 20) {score(O.mM13.x, 1)}; return O.mM7}) 
	    .bnd(result => {if (result == 18) {score(O.mM13.x, 3)}; return O.mMcurrentRoll}) 
	    .bnd(push, O.mM7.x, mM$1))
	    reset();
	  };

	  var score = function score(x,j) {
	    if ((x + j) == 20) {
	      mMgoals.ret(O.mMgoals.x == 2 ? 0 : (O.mMgoals.x + 1)); 
	      mM13.ret(0);
	      socket.send('CG#$42,' + O.mMgroup.x + ',' + O.mMname.x + ',' + -x + ',' + O.mMgoals.x); 
	      if (O.mMgoals.x == 0) {
	        socket.send('CE#$42,' + O.mMgroup.x + ',' + O.mMname.x + ',nothing ');
	      }
	      socket.send('CA#$42,' + O.mMgroup.x.trim() + ',' + O.mMname.x.trim() + ',6,6,12,20');
	      return;
	    }
	    if ((x + j) % 5 == 0) {
	      socket.send('CG#$42,' + O.mMgroup.x + ',' + O.mMname.x + ','+ (j+5)+',' + O.mMgoals.x); 
	      mM13.ret(x + j + 5);
	      socket.send('CA#$42,' + O.mMgroup.x.trim() + ',' + O.mMname.x.trim() + ',6,6,12,20');
	      return;
	    } 
	    socket.send('CG#$42,' + O.mMgroup.x + ',' + O.mMname.x + ','+j+',' + O.mMgoals.x); 
	    mM13.ret(x + j);
	    socket.send('CA#$42,' + O.mMgroup.x.trim() + ',' + O.mMname.x.trim() + ',6,6,12,20');
	 };

	  var reset = function reset () {
	      mM3.ret([])
	      .bnd(() => mM4.ret(0)
	      .bnd(mM8.ret)
	      .bnd(cleanup))
	  }

	  var updateScoreboard = function updateScoreboard(v) {
	    let ar2 = v.split("<br>");
	    let keys = Object.keys(ar2);
	    let ar = [];
	    keys.map(k => {
	      ar.push(/* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["h"]('div', ar2[k]))
	    });
	    return mMscoreboard.ret(ar);
	  };

	  var displayOff = function displayOff(x,a) {
	      document.getElementById(a).style.display = 'none';
	      return ret(x);
	  };

	  var displayInline = function displayInline(x,a) {
	      if (document.getElementById(a)) document.getElementById(a).style.display = 'inline';
	      return ret(x);
	  };

	  var newRoll = function(v) {
	    socket.send('CA#$42,' + O.mMgroup.x.trim() + ',' + O.mMname.x.trim() + ',6,6,12,20' )
	    return ret(v);
	  };

	  var refresh = function() {
	    setTimeout( function () {
	       document.location.reload(false);
	     },4000);
	  };

	  const sources = {
	    DOM: /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__motorcycle_dom__["makeDOMDriver"]('#main-container'),
	    WS: websocketsDriver,
	    UNIT: unitDriver
	  }

	  /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__motorcycle_core___default.a.run(main, sources);



	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17)))

/***/ }
/******/ ]);