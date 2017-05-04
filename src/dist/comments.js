

var MonadState3 = function MonadState3(g, state) {
  console.log('someone called with g and state', g, state);
  this.id = g;
  this.s = state;
  this.bnd = (func, ...args) => func(this.s, ...args);  
  this.ret = function (a) {
    return window[this.id] = new MonadState(this.id, a);
  };
};


MonadState3.prototype.comments = [];
var showEdit = 'none';
var showEditB = 'none';

MonadState3.prototype.clear = function() {
  this.s = []; 
  this.comments  = [];
  return this;
};

MonadState3.prototype.init = function (str) {
  this.s = str.split('<@>')
}

MonadState3.prototype.run3 = function (str)  {
  var s = this.s.slice();
  var s0 = str.split('<@>');
  s.push(str)
  var n = -1
  var a1 = this.s.slice()
  a1.map(a => {
    n += 1;
    console.log('******************************* this is a:', a);
    let show = pMname.x == a[0] ? 'inline-block' : 'none'
    this.comments.push(h('div#' + n, [
      h('div', a[0] + ' commented: ' + a[1]),
      h('button#edit4', {props: {innerHTML: 'edit'}, style: {display: show}}),
      h('input#edit4B', { props: { type:'textarea', value: a[1]}, style: {display: show}}),
      h('button#delete4', {props: {innerHTML: 'delete'}, style: {display: show}}),
      h('br' ),
      h('span', '***************************************************************'),
    ]))
    console.log('In run3. this is', this);
  }) 
};

var commentMonad = new MonadState3( 'commentMonad', [] );
// commentMonad.comments.map(v => v.children[0].elm.style.display = 'none')







