
function showFunc (name, name2) {return name == name2 ? 'inline-block' : 'none'}

function extract ([x]) {return x};

var MonadState3 = function MonadState3(g, state) {
  console.log('MonadState3 says: here are g and state', g, state);
  this.id = g;
  this.s = state;
  this.bnd = (func, ...args) => func(this.s, ...args);
  this.ret = function (a) {
    return window[this.id] = new MonadState(this.id, a);
  };
};

var commentMonad = new MonadState3('commentMonad',   [ '', [], [] ]);

MonadState3.prototype.clear = function () { this.s = [ '', [], [] ]; }

MonadState3.prototype.run = function (s0) {
  var n = -1;
  var html = [];
  var str = s0.replace(/<<>>/g, ",")
  .replace(/(\r\n|\n|\r)/gm,"");   // Remove newlines
  var ar = str.split('<@>')
  ar = ar.filter(v => ( v != "" ))
  .map(v => v = v.split('<o>'))
  .filter(v =>  ( v.length > 1))
  .filter(v =>  (v[1].length > 0) )
  ar.map(a => {
    var show = showFunc(a[0], pMname.x);
    n+=1;
    console.log("JESUS H. CHRIST n a", n, a );
    html.push(h('div#'+n, [
      h('div', a[0] + ' commented: ' + a[1]),
      h('input#editB', { props: { type:'textarea', value: a[1]}, style: {display: show}}),
      h('button#deleteB', {props: {innerHTML: 'delete'}, style: {display: show, fontSize:14}}),
      h('br' ),
      h('span', '***************************************************************')
    ]))
  })
  this.s = [str, ar, html]; 
  return html;
}






