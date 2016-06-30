
function primes_state(x) {
  var v = x.slice();
  var ar = [];
  var R;
  var a = v[0];
  var b = v[1];
  var c = v[2];
  var d = v[3];
  f(a,b,c,d);
  function f (a, b, c, d) {
    ar = [];
    if (b > a) {
      R = [a,b,c,d];
      return;
    }
    else {
      d.map(el => {
        if ((b % el) != 0) {
          ar.push(b);
        }
      })
      if (ar.length != d.length) {
        b = b + 1;
        f(a,b,c,d);
      }
      else {
        d.push(b);
        b = b + 1;
        f(a, b, c, d);
      }
    }
  }
  return R;
}

