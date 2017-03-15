var fpTransformer = function fpTransformer(fibsState, primesState, then) {
  var = top = fibsState[1];
  var ar = [];
  var k = Math.ceil(Math.sqrt(top));
  postMessage(['green', 'green', 'red', 'color', 'done', 'done', 'computing prime fibs'])
  var state = execP(primesState, top);
  fibsState[3].map(fib => {
    if (state[1].every(p => (fib % p || fib == p))) {ar.push(fib)}
  })  
  postMessage(['green', 'green', 'green', 'color', 'done', 'done', 'done']);
  postMessage( [ [fibsState[3].join(', '), primesState[2], ar.join(', '), then], state ] )
}
