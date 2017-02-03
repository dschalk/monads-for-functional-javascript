









function eqTest ([ [p1,x1,y1], [p2,x2,y2] ]) {
  if (x1 < x2) {return p1(x1,y1) }
  else { return p2(x2,y2) } 
} 

function f (x,y) { if (x === y) return true }
function g (x,y) { if (x === y) return false}

var r = eqTest([ [f,12,12], [g,5,5] ]);


console.log(r);




