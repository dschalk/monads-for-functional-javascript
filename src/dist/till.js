ret2(0,'a').bnd('add2',3, 'a')
  .bnd('mult2',100, 'a')
  .bnd(a.ret)
  .bnd('square2', 'a')  
  .bnd("ret2(0,'c').ret")  
   .bnd(() => {
    ret2(0,'b')
    .bnd('add2',4, 'b')
   .bnd('mult2',100, 'b')
   .bnd('b.ret')})
