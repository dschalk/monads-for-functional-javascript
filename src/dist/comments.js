
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

var commentMonad = new MonadState3('commentMonad',   [ '', '', [], [] ]);

MonadState3.prototype.clear = function () { this.s = [ '', '', [], [] ]; }

MonadState3.prototype.run = function (st, sender) {
  var str = st.replace(/<n>/g, "\n");
  var ar = str.split('<@>');
  var arr = ar.filter(x => x !== "")
  console.log('In MonadState3 run. arr is', arr ); 
  this.s[0] = str;
  this.s[1] = sender;
  this.s[2] = arr.map(v => v = v.split('<o>'));
  var n = -1;
  this.s[2].shift();
  this.s[2].map(a => {
    console.log("In comments.js a[0], a[1], and a[2] are", a[0], a[1], a[2]);
    var show = showFunc(a[0],this.s[1]);
    n+=1;
    this.s[3].push(h('div#'+n, [
      h('div', a[0] + ' commented: ' + a[1]),
      h('input#editB', { props: { type:'textarea', value: a[1]}, style: {display: show}}),
      h('button#deleteB', {props: {innerHTML: 'delete'}, style: {display: show, fontSize:14}}),
      h('br' ),
      h('span', '***************************************************************')
    ]))
  })
  console.log('In MonadState3. this.s is', this.s);
}
