

   autorun(() => console.log(
   [O.mMcount3.x + ' + ' + O.mMcount4.x + ' = ' + (O.mMcount3.x*1 + O.mMcount4.x*1),  
    O.mMcount3.x + ' - ' + O.mMcount4.x + ' = ' + (O.mMcount3.x - O.mMcount4.x),  
    O.mMcount3.x + ' * ' + O.mMcount4.x + ' = ' + (O.mMcount3.x * O.mMcount4.x),  
    O.mMcount3.x + ' / ' + O.mMcount4.x + ' = ' + (O.mMcount3.x / O.mMcount4.x)]));

  autorun(() => RESULT = 
   [monadState.mMcount.x + ' + ' + monadState.mMcount2.x + ' = ' + (monadState.mMcount.x*1 + monadState.mMcount2.x*1),  
    monadState.mMcount.x + ' - ' + monadState.mMcount2.x + ' = ' + (monadState.mMcount.x - monadState.mMcount2.x),  
    monadState.mMcount.x + ' * ' + monadState.mMcount2.x + ' = ' + (monadState.mMcount.x * monadState.mMcount2.x),  
    monadState.mMcount.x + ' / ' + monadState.mMcount2.x + ' = ' + (monadState.mMcount.x / monadState.mMcount2.x)]);

