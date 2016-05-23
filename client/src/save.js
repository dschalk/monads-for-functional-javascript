
  const fetchTasks$ = sources.DOM
    .select('#fetchTasks').events('click')

  fetchAction$ = fetchTasks$.map(e => {
    socket.send('GQ#$42,' + O.mMgroup.x.trim() + ',' + O.mMname.x.trim() + ',nothing');

    mMZ20.bnd(() => mM$task.ret(O.mMar.x[3]));

      .bnd(next, 'GQ#$42', mMZ20)

 fetchAction$, 


        h('br'),
        h('button#fetchTasks', 'Fetch Tasks'  ),

  mM$fib4.stream.addListener({
    next: v => {
      let a = v[1];         // Fibonacci number
      let b = v[0] + v[1];  // Fibonacci number
      let c = v[2];         // Limit
      let d = v[3];         // List of Fibonacci numbers
      d.push(a);
      if (a < c) {mM$fib4.ret([a,b,c,d])}
      else {
        mMfibSave.ret([a, b, c, d]);
        document.getElementById('fib4').innerHTML = d; 
        mMitterPrimeFibs.release([b, d]); 
      };
      mMitterFib7.bnd(limit => {
        let e = O.mMfibSave.x
        e[3].pop();
        e[2] = limit;
        mM$fib4.ret(e);
      }) 
      mMitterFib4.bnd(
        x => {
          let largest = v[3][v[3].length - 1];
          console.log('In mMitterFib4.bnd  [x, a, b, c, v[3]] is: ', [x,a,b,c,v[3]]);
          if (x < largest) {
            var ar = v[3].filter(v => v <= x);
            var arLargest = ar[ar.length - 1];
            document.getElementById('fib4').innerHTML = ar; 
            mMitterPrimeFibs.release([arLargest, ar]);
          }
          if (x == largest) {
            document.getElementById('fib4').innerHTML = d; 
            mMitterPrimeFibs.release([arLargest,ar]);
          }
          if (x > largest) {
            mMitterFib7.release();
          }
        });
    },
    error: err => console.error(err),
    complete: () => console.log('completed')
  });

  mM$primeFibs.stream.addListener({
    next: v => {
      if (v[2] > 1) {
        var arPrimeFibs;
        for (let i in v[0]) {
          if ((v[1] % v[0][i]) == 0) {
            mM$primeFibs.ret([v[0], v[1] + 1, v[2]]);
            return;
          }
          if (i == (v[0].length - 1)) {
            v[0].push(v[1]);
            document.getElementById('prime2').innerHTML = v[0];
          }
        }
        if (v[0][v[0].length - 1] < v[2]) {
          mM$primeFibs.ret([v[0], v[1] + 1, v[2]])
        }
          mMitterPrimeFibs.bnd(
          x => {
          console.log('In mMitterPrimeFibs. x is: ', x);  
          let top = v[0][v[0].length -1];
          if (x[0] > top) { 
            mM$primeFibs.ret([v[0], top + 1, x[0]]);
          }
          if (x[0] == top) { 
              document.getElementById('prime2').innerHTML = v[0];
          }
          if (x[0] < top) {
            var ar = v[0].filter(v => v <= x[0]);
            var prime = v[0][ar.length];
            ar.push(prime);
            document.getElementById('prime2').innerHTML = ar;
          }
          arPrimeFibs = v[0].filter(function(n) {
              return x[1].indexOf(n) != -1;
          })
          document.getElementById('primeFibs').innerHTML = arPrimeFibs;
          })
      }
    },
    error: err => console.error(err),
    complete: () => console.log('completed')
  });
