
V
var MonadAcc = function MonadAcc(z = 0, g = 'generic') {
  var _this = this;
  this.x = z;
  this.id = g;
  this.bnd = function(func, ...args) {
    return func(_this.x, ...args);
  }
  this.reset = function () {
    return window[_this.id] = new MonadAcc('', _this.id);
  };
  this.ret = function (a) {
    var str = _this.x + a;
    return window[_this.id] = new MonadAcc(str, _this.id);
  };
};

var acc1 = new MonadAcc('', 'acc1');

console.log('accumulator',
acc1.reset()
.bnd(() => m.ret(3).bnd(mult,100)
.bnd(acc1.ret)).ret(' squared plus ')
.bnd(() => m2.ret(0).bnd(add,4).bnd(mult,100)
.bnd(acc1.ret))
.ret(' squared is ').bnd(() => m3.ret(Math.sqrt(m.x * m.x + m2.x * m2.x)).bnd(acc1.ret)).x,

acc1.reset()
.bnd(() => m.ret(3).bnd(mult,100)
.bnd(acc1.ret)).ret(' squared plus ')
.bnd(() => m2.ret(0).bnd(add,4).bnd(mult,100)
.bnd(acc1.ret))
.ret(' squared is ').bnd(() => m3.ret(m.x * m.x + m2.x * m2.x).bnd(sqroot).bnd(acc1.ret)).x);

function acc (x, y, str) {
  return window[str] = new MonadAcc(x + y, str);
}

console.log('log function',
m.ret('The square root of the sum of ').bnd(log,'').bnd(() => m.ret(3)
.bnd(mult,100)
.bnd(log,' squared plus ').bnd(m2.ret)
.bnd(m3.ret).bnd(add, -m2.x).bnd(add,4).bnd(mult,100)
.bnd(log, ' squared is  ').bnd(square).bnd(add,m2.bnd(square).x).bnd(sqroot).bnd(log,''))

var lg = function lg(x) {
    console.log(x);
    return ret(x);
};

    var todoClick$ = sources.DOM
        .select('#todoButton').events('click');
  
    var todoClickAction$ = todoClick$.map(function (e) {
        var el = document.getElementById('todoDiv');
        (todoDiv == 'none') ?
            todoDiv = 'inline' :
            todoDiv = 'none';
    });

    var chatClick$ = sources.DOM
        .select('#chat2').events('click');

    var chatClickAction$ = chatClick$.map(function () {
        var el = document.getElementById('chatDiv');
        (chatDiv  == 'none') ?
            chatDiv = 'inline' :
            chatDiv = 'none';
    });

    var captionClick$ = sources.DOM
        .select('#caption').events('click');

    var captionClickAction$ = captionClick$.map(function () {
        (captionDiv  == 'none') ?
            captionDiv = 'inline' :
            captionDiv = 'none';
    });
    // **************************************   GAME   *********************************************** GAME START
    var gameClick$ = sources.DOM
        .select('#game').events('click');

    var gameClickAction$ = gameClick$.map(function () {

        (gameDiv  == 'none') ?
            gameDiv = 'inline' :
            gameDiv = 'none';

    });

