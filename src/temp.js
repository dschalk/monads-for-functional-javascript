



  
    var backAction$ = backClick$.map(() => {
      if (pMindex.x > 1) {
        let a = travMonad.a[travMonad.a.length + 1 - pMindex.x ];
        mMtemp.ret(a[0]),bnd(pMnums.ret).bnd(test3).bnd(pMstyle.ret);
        pMscore.ret(a[1]);
        pMgoals.ret(a[2]);
        pMindex.bnd(add,-1).bnd(pMindex.ret);
        if (pMnums.x.length == 4) {
          socket.send(`CG#$42,${pMgroup.x},${pMname.x},${pMscore.x},${pMgoals.x}`);
        }
      }
    });

    var forwardAction$ = forwardClick$.map(function () {
      if (pMindex) < travMonad.a.length.x {
        let a = travMonad.a[travMonad.a.length - pMindex.x -1 ]
        mMtemp.ret(a[0]).bnd(pMnums.ret).bnd(mMtemp.ret).bnd(test3).bnd(pMstyle.ret);
        updateScoreboard2(namesList);
        pMscore.ret(a[1]);
        pMgoals.ret(a[2]);
        pMindex.bnd(add,1).bnd(pMindex.ret);
        if (pMnums.length == 4) {
          socket.send(`CG#$42,${pMgroup.x},${pMname.x},${pMscore.x},${pMgoals.x}`);
        }
      }
    });  
