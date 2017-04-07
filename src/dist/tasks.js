
var rep = new RegExp('<<>>', 'g');
var rep2 = new RegExp(',', 'g');


function MonadState2(g, state) {
  console.log('someone called with g and state', g, state);
  this.id = g;
  this.s = state;
  this.bnd = (func, ...args) => func(this.s, ...args);  
  this.ret = function (a) {
    return window[this.id] = new MonadState(this.id, a);
  };
};

taskMonad = new MonadState2( 'taskMonad', [ [] ] );

MonadState2.prototype.run2 = function (str) {
  console.log('In run >>>>>>>>>>>>>>>>>>>> str is', str);
  this.s = JSON.parse(str);
//  var s2 = ar.map(v => v.split(','));
  /*var s3.map(v => {
    v[0] = v[0].split('@').join(', ')
    v[3] = v[3] === "true" ? true : false 
    console.log('In run loop, v is', v)
  }); */
 // this.s = s3;
  mMtaskList.ret(process4(this.s));
}

function process4(x) {
  var arr = x.slice();
  console.log('In process4. <><><><><><><> arr is', arr );
  var nodeObject = [];
  var n = -1
   arr.map(a => {
     a[0] = a[0].replace(rep, ", ");
    n+=1
    nodeObject.push(h('div#' + n +'.todo', [
        h('span.task3', { style: { color: a[1], textDecoration: a[2] } }, 'Task: ' + a[0]),
        h('br'),
        h('button.edit1', {props: {innerHTML: 'Edit'}}),
        h('input#edit2', { props: { type:'textarea', value: a[0] }, style: { display: a[6] } }),
        h('span.author.tao', 'Author: ' + a[4] + ' / ' + 'Responsibility: ' + a[5]),
        h('br'),
        h('label.chBox', { props: { for: '.cbx' } }, 'Completed:'),
        h('input.cbx',  { props: { type: 'checkbox', checked: a[3] }, style: { color: a[1],
                textDecoration: a[2] }  } ), 
        h('button.delete', 'Delete'),
        h('br'),
        h('hr')   
    ])) 
  });
  return(nodeObject);
};





