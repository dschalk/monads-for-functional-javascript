


        h('p', ' Expressions involving parsing or computation can be automatically evaluated without function calls. MobX facilitates this kind of functionality by making mutable data observable. The mutable global object O is a good match for MobX. After the following two lines of code, any expression involving the Monad ret() method automatically executes. ' ),
        h('pre', 
`import {observable, computed, autorun, asReference} from 'mobx'
monadState = observable(O);
`  ),
        h('p', ' Now, for any monad m and value v, when m.ret(v) executes, O.m is automatically updated (by the definition of "ret()") so that O.m.x == v becomes true. And since monadState = observable(O), monadState.m.x == v is also true. In the next domonstration, MobX is used to help create arrays of Fibonacci numbers. Here is the code: ' ),
        code.reactiveFib,
        h('div.tao', ' When you enter a number below, ' [ 
        h('pre', `fibFunc(<entered number>)` ),
        h('span', 'executes with the number you entered. The number must be greater than 2.  '  ) ] ),
        h('br' ),
        h('span', ' Enter a number greater than 2 here: ' ), 
        h('input#fibF',   ), 
        h('p#newFib', O.mMfib2.x  ),
        h('p', ' Neither mMcount, O.mMcount, nor monadState.mMcount are mutated in the code above. Only "O" mutates. This helps prevent functions from interfering with one another. Once a function creates a reference to O.mMcount, the value of that reference cannot be altered by another function. On the other hand, having "O" constantly mutate as state changes is a powerful feature. Compared to other data structures in this application, to me "O" seems brilliant and alive, and kind of like the sun at the center of the solar system. It is full of firey potential, and it is what makes effortless MobX reactivity possible. '  ),
        h('p', ' Religeously adhering to immutability, or anything else for that matter, limits possiblities. If your boss does that; well, that\'s part of the job. If you are doing it to yourself, maybe you would do well to step back and think it over for a while. '  ),  



const fibber = observable(0);
fibber.set(1);
var fibby = function fibby(n) {
  var k = 0;
  var ar = [0,1];
  fibber.observe((a,b) => {
    k+=1;
    if (k < n) {
      ar.push(a+b);
      fibber.set(a+b)
     } 
  }) 
  console.log(ar); 
}
fibby(300);









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
