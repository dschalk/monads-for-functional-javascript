
  const fetchTasks$ = sources.DOM
    .select('#fetchTasks').events('click')

  fetchAction$ = fetchTasks$.map(e => {
    socket.send('GQ#$42,' + O.mMgroup.x.trim() + ',' + O.mMname.x.trim() + ',nothing');

    mMZ20.bnd(() => mM$task.ret(O.mMar.x[3]));

      .bnd(next, 'GQ#$42', mMZ20)

 fetchAction$, 


        h('br'),
        h('button#fetchTasks', 'Fetch Tasks'  ),

