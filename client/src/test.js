

  const mM$1Action$ = O.mM$1.stream.map(v => {
    if (Array.isArray(v)) {
      O.mMhistorymM1.bnd(spliceAdd, O.mMindex2.x, v, O.mMhistoryO.mM1);
      document.getElementById('0').innerHTML = (O.mMhistorymM1.x[O.mMindex2.x])[0]; 
      document.getElementById('1').innerHTML = (O.mMhistorymM1.x[O.mMindex2.x])[1]; 
      document.getElementById('2').innerHTML = (O.mMhistorymM1.x[O.mMindex2.x])[2]; 
      document.getElementById('3').innerHTML = (O.mMhistorymM1.x[O.mMindex2.x])[3]; 
      cleanup()
    }
    else {
      console.log('O.mM$1.stream is providing defective data to O.mM$1Action');
    }
  });

  const O.mM$3Action$ = O.mM$3.stream.map(v => {
    document.getElementById('0').innerHTML = (O.mMhistorymM1.x[O.mMindex2.x])[0]; 
    document.getElementById('1').innerHTML = (O.mMhistorymM1.x[O.mMindex2.x])[1]; 
    document.getElementById('2').innerHTML = (O.mMhistorymM1.x[O.mMindex2.x])[2]; 
    document.getElementById('3').innerHTML = (O.mMhistorymM1.x[O.mMindex2.x])[3]; 
    cleanup();
  })

