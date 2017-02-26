
          h('button#0.num', { style: { display: styl(gxx[1][gxx[0]][0].length) }}, 
            gxx[1][gxx[0]][0][0]),
          h('button#1.num', { style: { display: styl(gxx[1][gxx[0]][0].length) }}, 
            gxx[1][gxx[0]][0][1]),
          h('button#2.num', { style: { display: styl(gxx[1][gxx[0]][0].length) }}, 
            gxx[1][gxx[0]][0][2]),
          h('button#3.num', { style: { display: styl(gxx[1][gxx[0]][0].length) }}, 
            gxx[1][gxx[0]][0][3]),

  
    "@cycle/dom": "^12.2.3",
    "@cycle/most-adapter": "^4.1.0",
    "@cycle/most-run": "^4.2.0",
    "@most/create": "^2.0.1",
    "@motorcycle/core": "^1.2.1",
    "@motorcycle/dom": "^1.4.0",





  var numClickAction$ = numClick$.map(e => {
    if (gxx[1][gxx[0]][3].length === 2  ) {return};
      var a = gxx[1][gxx[0]].slice();
      a[3].push(e.target.innerHTML)
      a[1] -= 1;
      a[0].splice(e.target.id, 1);
      execGame(a);
      if (a[3].length === 2 && a[5] != 0) {
        updateCalc(a[3], a[4]) 
      }
      }).startWith([0, 0, 0, 0]);

  var opClick$ = sources.DOM
      .select('.op').events('click');

  var opClickAction$ = opClick$.map(e => {
    if (gxx[1][gxx[0]].length === 2) {
      updateCalc(gxx[1][gxx[0]][3], gxx[1][gxx[0]][4]) 

    }
    else {
      var a = gxx.slice();
      a[1][a[0]][4] = e.target.innerHTML;
      gameMonad.bnd(execGame,a);
    }
  });

