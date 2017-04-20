

function MonadState3(g, state) {
  console.log('someone called with g and state', g, state);
  this.id = g;
  this.s = state;
  this.bnd = (func, ...args) => func(this.s, ...args);  
  this.ret = function (a) {
    return window[this.id] = new MonadState(this.id, a);
  };
};

var commentMonad = new MonadState3( 'commentMonad', ['', [], []] );

MonadState3.prototype.comments = [];
var showEdit = 'none';
var showEditB = 'none';

MonadState3.prototype.run3 = function (str)  {
  var n = -1
  var str2 = str.replace(rep, ','); 
  var a0 = str.split('<@>');
  a0.shift();
  this.s = a0.map(a => a.split("<o>"));
  console.log('<@><#><@><#><@>$<&><&><&><&> run3 >>> this.s before shift', this.s );
  this.s = a0.map(a => a.split("<o>"));
  console.log('<@><#><@><#><@>$<&><&><&><&> run3 >>> this.s after shift', this.s );
  var a1 = this.s.slice().map(a => {
    n += 1;
    console.log('******************************* this is a:', a);
    let showEdit = pMname.x == a[0] ? 'inline-block' : 'none'
    this.comments.push(h('div#' + n, [
      h('span', a[0] + ' commented: ' + a[2]),
      h('button#edit4', {props: {innerHTML: 'edit'}, style: { display: showEdit } }),
      h('input#edit4B', { props: { type:'textarea', value: a[1] }, style: { display: showEditB } } ),
      h('button#delete4', {props: {innerHTML: 'delete'}, style: { display: showEdit }} ),
      h('br' ),
      h('span', '***************************************************************'),
    ]))
    console.log('In run3. this is', this);
  }) 
};


