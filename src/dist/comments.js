
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

var commentMonad = new MonadState3('commentMonad', [ '','', ['','',[]]]);

MonadState3.prototype.run = function (st, sender) {
  var str = st.replace(/<n>/g, "\n");
  var ar = str.split('<@>');
  var ar2 = ar.filter(x => x !== "")
  var arr = ar2.filter(x => x !== "\n"))
  this.s[0] = str;
  this.s[1] = sender;
  this.s[2] = arr.map(v => v = v.split('<o>'));
  var n = -1;
  this.s[2].shift();
  this.s[2].map(a => {
    var show = showFunc(a[0],this.s[1]);
    n+=1;
    mMcomments.bnd(push, h('div#'+n, [
      h('div', a[0] + ' commented: ' + a[2]),
      h('input#editB', { props: { type:'textarea', value: a[1]}, style: {display: show}}),
      h('button#deleteB', {props: {innerHTML: 'delete'}, style: {display: show, fontSize:14}}),
      h('br' ),
      h('span', '***************************************************************')
    ]))
  })
}
