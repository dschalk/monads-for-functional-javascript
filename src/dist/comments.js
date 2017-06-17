
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
  console.log(' - - - <*><*><*><*><*><*><*><*><*><*><*> - - - In run');
  console.log(' - - - <*><*><*><*><*><*><*><*><*><*><*> - - - In run');
  console.log('s0', s0);
  var st = s0.replace(/<<>>/g, ",");
  this.s = [ '', [], [] ];
  console.log('st', st);
  var str = st.replace(/(\r\n|\n|\r)/gm,"");   // Remove newlines
  console.log('str', str);
  this.s[0] = str;
  var ar0 = str.split('<@>');
  var ar = ar0.filter(v => v !== "");
  this.s[1] = ar.map(v => v = v.split('<o>'));
  var n = -1;
  this.s[1].map(a => {
    var show = showFunc(a[0], pMname.x);
    n+=1;
    this.s[2].push(h('div#'+n, [
      h('div', a[0] + ' commented: ' + a[1]),
      h('input#editB', { props: { type:'textarea', value: a[1]}, style: {display: show}}),
      h('button#deleteB', {props: {innerHTML: 'delete'}, style: {display: show, fontSize:14}}),
      h('br' ),
      h('span', '***************************************************************')
    ]))
  })
  console.log('commentMonad.s', commentMonad.s );
  console.log(' - - - <*><*><*><*><*><*><*><*><*><*><*> - - - Leaving run');
  return this.s[2];
}

MonadState3.prototype.append = function (string) {
  // var st = s0.replace(/(\r\n|\n|\r)/gm,"");   // Remove newlines
  var string2 = this.s[0] + string
  this.s[0] = string2;
  var arr = [];
  var str = string2.replace(/<<>>/g, ",");
  var ar0 = str.split('<@>');
  var ar = ar0.filter(v => v !== "");
  this.s[1] = ar.map(v => v = v.split('<o>'));
  var n = -1;
  this.s[1].map(a => {
    var show = showFunc(a[0], pMname.x);
    n+=1;
    arr.push(h('div#'+n, [
      h('div', a[0] + ' commented: ' + a[1]),
      h('input#editB', { props: { type:'textarea', value: a[1]}, style: {display: show}}),
      h('button#deleteB', {props: {innerHTML: 'delete'}, style: {display: show, fontSize:14}}),
      h('br' ),
      h('span', '***************************************************************')
    ]))
  })
  this.s[2] = arr;
  return arr;
}





