<a name="back"></a>

#JS-monads-stable 
Monads not in the sense of category theory monads; monads in the same spirit as the Haskell programming language constructs known as "monads". See [Hask is not a category](http://math.andrej.com/2016/08/06/hask-is-not-a-category/) by Andrej Bauer and [Discussion](#discuss) below.

This is the repository for a [Motorcycle.js](https://github.com/motorcyclejs) application running online at [JS-monads-stable](http://schalk.net:3055). Motorcycle.js is essentially [Cycle.js](https://github.com/cyclejs/core) using [Most](https://github.com/cujojs/most) and [Snabbdom](https://github.com/paldepind/snabbdom) instead of RxJS and virtual-dom.

Motorcycle is an ideal host for my JS-monads project, which is an exposition of functional programming using instances of convenient constructs named "Monad", "MonadState", "MonadSet", and "MonadItter".
The server is a modified clone of the Haskell Wai Websockets server. Haskell pattern matching and list comprehension made it easy to configure the server to broadcast selectively to members of groups, who share the dice game, todo list, and chat room. I use Babel and Webpack to prepare the front end and Stack to compile everything into a single executable which I upload to my Digital Ocean "droplet". 

The code here is not annotated, but detailed examinations of the code behind the multiplayer simulated dice game, persistent todo list, chat feature, and several other demonstrations can be found at [http://schalk.net:3055](http://schalk.net:3055), where the code is running online. 
## Basic Monad    
```javascript    
    var Monad = function Monad(z = 42, g = 'generic') {
      var _this = this;
      this.x = z;
      this.id = g;
      this.bnd = function (func, ...args) {
        var m = func(_this.x, ...args)
        var mon;
        if (m instanceof Monad) {
          mon = testPrefix(args,_this.id); 
          return window[mon] = new Monad(m.x, mon);
        }
        else return m;
      };
      this.ret = function (a) {
    
    function testPrefix (x,y) {
      var t = y;
      var s;
      if (Array.isArray(x)) {
        x.some(v => {
          if (typeof v == 'string' && v.charAt() == 'M') {
            t = v.slice(1, v.length);
          }
        })
      }
      return t;
    }

```
In most chains of computations, the arguments provided to each link's bnd() method are functions that return instances of Monad. The stand-alone ret() function does only one thing; it creates new Monad instances. Here are some examples of functions that return instances of Monad:
```javascript
    function ret(v, id = 'generic') {
      return new Monad(v, id);
    } 

    var add = function add (x, b) {
        return ret(parseInt(x,10) + parseInt(b,10) );
    };
    
    var cube = function cube (v, id = 'default') {
        return ret(v * v * v, id);
    };
  
    function log(x,y) {
        console.log(y)
        return ret(x);
    };
```
These functions can be used with instances of Monad in many ways, for example:
```javascript
  ret(3,'cow').bnd(x => log(x,['Received the value ' + x])
  .bnd(cube).bnd(y => log(y, [x + ' cubed is ' + y])
  .bnd(log,['The monad cow holds the value ' + cow.x])))  

   Output:
   Received the value 3
   3 cubed is 27  
   The monad cow holds the value 3  
```
  
[Back to the top](#back)

I experimented with several definitions of Monad during the investigations that led to the current one. This version's bnd() method re-assigns the calling monad's identifyer (variable name) without clobbering previous versions with the same name. For example, m.bnd(cube) re-assigns "m" to the returned monad, which has an x attribute that is the calling monad's x attribute cubed. If the previous version is an array element, an object attribute, or has a reference to it, it persists as it was, with its x attribute unchanged. That feature is illustrated in the screen shot (below). Here are the functions associated with the screen shots:
```javascript
    function test10 () {
      m.ret(4).bnd(mult,100,'Mm1')
      .bnd(square,'Mm2')
      .bnd(add,-m2.x + 3,'Mm3')
      .bnd(mult,100,'Mm4')
      .bnd(square,'Mm5')
      .bnd(add,m2.x,'Mm6') 
      .bnd(sqroot,'Mm7')
      .bnd(() => { 
        mMar10.ret([m, m1, m2, m3, m4, m5, m6, m7]);
        console.log('The square root of the sum of ', m1.x,
          ' squared and ', m4.x, ' squared is ', m7.x); });
      return mMar10;
    }  
    
    function test11 () {
      m.ret(4).bnd(v => 
      ret(v)
      .bnd(mult,100,'Mm1')
      .bnd(square,'Mm2')
      .bnd(add,-m2.x + 3,'Mm3')
      .bnd(mult,100,'Mm4')
      .bnd(square,'Mm5')
      .bnd(add,m2.x,'Mm6') 
      .bnd(sqroot,'Mm7').bnd(m.ret)
      .bnd(() => { 
        mMar11.ret([m, m1, m2, m3, m4, m5, m6, m7]);
        console.log('The square root of the sum of ', m1.x,
          ' squared and ', m4.x, ' squared is ', m7.x); }));
      return mMar11;
   }  
   
```   
The screen shot(below) demonstrates three things:
```javascript
  (1) Immutability. When named monads are superseded by fresh instantiations, 
      previous instances that have been stored in an array do not change.

  (2) Convenient control. The monad m still has its initial value after test10() runs. 
      Simply appending ".bnd(m.ret)" to the end of the computation causes m to wind up with the final value.   

  (3) Using "M" folowed by a string as an argument in the bnd() method causes a monad to appear in 
      a sequence having the name and id of the string, and and an x element that is
      the result of whatever computation, parsing, etc. the other arguments accomplish. 
      The calling monad is left unchanged.  
```
In a similar function, m might obtain its value from a websocket, user input, or some other unpredictable source. The coder might want to preserve m with that initial value for further use, might want to keep m with its inital value, or might not care what value m has after the computation is finished. Here is the screen showing the results of running test10() and test11() in the Chrome console.

![Alt text](Immutable_a.png?raw=true)

The Monad Laws

In the following discussion, "x == y" signifies that the expression x == y returns true. Let J be the collection of all Javascript values, including functions, instances of Monad, etc, and let F be the collection of all functions mapping values in J to instances of Monad with references (names) matching their ids; that is, with window[id] == m.id for some id which is a valid es2015 variable name. The collection of all such instances of Monad along and all of the functions in F is called "M". For any instances of Monad m, m1, and m2 in M and any functions f and g in F, the following relationships follow easily from the definition of Monad:

Left Identity
    m.ret(v, ...args).bnd(f, ...args).x == f(v, ...args).x   
    ret(v, ...args).bnd(f, ...args).x == f(v, ...args).x 
    Examples: m.ret(3).bnd(cube).x == cube(3).x  Tested and verified  
    ret(3).bnd(cube).x == cube(3).x     Tested and verified
    Haskell monad law: (return x) >>= f ≡ f x  
Right Identity
    m.bnd(m.ret) == m      Tested and verified 
    m.bnd(m.ret) === m   Tested and verified
    m.bnd(ret) == m  Tested and verified
    Haskell monad law: m >>= return ≡ m 
Commutivity
    m.bnd(f1, ...args).bnd(f2, ...args).x == m.bnd(v => f1(v, ...args).bnd(f2, ...args)).x 
    Example: m.ret(0).bnd(add, 3).bnd(cube).x == 
    m.ret(0).bnd(v => add(v,3).bnd(cube)).x  Tested amd verified
    Haskell monad law: (m >>= f) >>= g ≡ m >>= ( \x -> (f x >>= g) ) 

###Disussion
The Haskell statement f ≡ g means that f x == g x for all Haskell values x of the appropriate type. That is the test applied to Javascript expressions in "Monad Laws" section (above). Neither the == nor the === operator would provide useful information about the behavior of instances of Monad, which are objects. Those operators test objects for location in memory. If the left and right sides of predicates create new instances of m, then the left side m and the right side m wind up in different locations in memory. So we expect m.ret(3) == m.ret(3) to return false, and it does. The question we want answered is the question ≡ answers in Haskell: Can the left and right sides be substituted for one another and still yield the same results.

The Haskell programming language borrowed the term "monad" from the branch of mathematics known as category theory. This was apropriate because Haskell monads, along with the function return and the operator >>=, behave quite a bit like category theory monads, and the inspiration for them came out of category theory. For Haskell monads to be category theory monads, they would need to reside in a category-theory category. They don't, although the Haskell mystique tends to give newcommers to the language the impression that they do. See Hask is not a category.

Attempts continue to be made to define a Haskell category, usually with special constraints, omitted features, and sometimes with definitions of morphisms that are not Haskell functions. Succeeding in that endeavor would be the first step toward proving that Haskell monads are, in some contrived context, category-theory monads. Devising such a scheme might be an instructive academic excercise, but I don't see how it could possibly be of any value beyond that. Imitating definitions and patterns found in category theory, as Haskell does in defining the functor, monoid, and monad type classes, was a stroke of genius that vastly enriched the Haskell programming language and brought it into the mainstream as a viable alternative to java, c++, etc. This website runs efficiently on a Haskell websockets server. Category theory patterns are less needed, but neverthless useful, in Javascript. Code that adheres to them tends to be robust and versitile.

##MonadItter

MonadItter instances do not have monadic properties, but they facilitate the work of monads. Here's how they work:

For any instance of MonadItter, say "it", "it.bnd(func)" causes it.p == func. Calling the method "it.release(...args)" causes p(...args) to run, possibly with arguments supplied by the caller. Here is the definition:
```javascript
const MonadItter = function ()  {
  this.p = function () {};
  this.release = (...args) => this.p(...args);
  this.bnd = func => this.p = func;
};
```
As shown later in the online demonstration, MonadItter instances control the routing of incoming websockets messages and the flow of action in the simulated dice game. In one of the demonstrations, they behave much like ES2015 iterators. I prefer them over ES2015 iterators. They can also help to provide promises-like functionality without promises.

###Traversal of the dice game history.

MonadState instance travMonad facilitates traversal of the game history. travMonad.s is a four member array holding the current numbers, current score, current goals, and an array of arrays containing numbers, score, and goals corresponding to past states of the game.. Here is the definition of travMonad and its auxiliary function:
```javascript
MonadState("travMonad", [[8,8,8,8], 0, 0, [ [ [], 0, 0 ] ] ], trav_state)
  
  function trav_state (ar) {
    pMindex.bnd(add,1).bnd(pMindex.ret);
    var nums = ar[0];
    var score = ar[1];
    var goals = ar[2];
    var next = travMonad.s.slice();
    var ar = [nums, score, goals];
    next[0] = nums;
    next[1] = score;
    next[2] = goals;
    next[3].unshift(ar);
    return next;         // This results in travMonad.s == next.
  }
```  
The number display is generated by four virtual button nodes with id = i, st yle: {display: pMstyle.x[i]} and text pMnums.x[i] for i = 0, 1, 2, and 3. The virtual button nodes rest permanently in the virtual DOM. pMnums and pMstyle are updated in the messages$ stream whenever a new dice roll is received from the server. pMnums and pMstyle are also re-set when a user clicks a number, causing it to disappear from the display and when when a user clicks a number or an operator button prompting a call to updateCalc, which either causes a new roll or a computed number to be added to the display. numClickAction$ and opClickAction$ are merged into the stream that feeds the virtual DOM, so updates are seen almost instantaneously.

Whenever pMnums changes, the expression pMnums.bnd(test3).bnd(pMstyle.ret) updates pMstyle so as to hide undefined values of pMnumes.x[i] for i = 0, 1, 2, and 3.
```javascript
  function test3 (a) {
    var b = [];
    for (let i of [0,1,2,3]) {
      b[i] = (a[i] == undefined) ? 'none' : 'inline'
    }
    return ret(b);
  }  

  pMnums.bnd(test3).bnd(pMstyle.ret);  
```  
New dice rolls always correspond to score changes. One point is lost each time a player clicke ROLL. Scores increase whenever players put together expressions that return 18 or 20. An increase in score is always accompanied by a call to newRoll() with two arguments: score and goals. The server updates its ServerState TMVar and broadcasts the new roll to all group members with the prefix "CA#$42. The server also broadcasts the updated score and goal information, with the prefix NN#$42. These messages are caught, parsed, and acted upon in the message$ stream in the Motorcycle front end. pMnums, pMstyle, and travMonad get updated during the course of this process.
```javascript
  mMZ10.bnd( () => {
    pMnums.ret([v[3], v[4], v[5], v[6]]).bnd(test3).bnd(pMstyle.ret)
    travMonad.run([ [v[3], v[4], v[5], v[6]], v[7], v[8] ]);
    pMscore.ret(v[7]);
    pMgoals.ret(v[8]) });  
```
###Updating the numbers

The previous discusion was about traversal of the game history. This seems like a good place to look at the algorithm for generating new numbers when players click on the number and operator buttons. Here is the code:
```javascript
  var numClick$ = sources.DOM
      .select('.num').events('click'); 

  var numClickAction$ = numClick$.map(e => {
    if (mM3.x.length == 2) {return};
    pMnums    
    .bnd(spliceM, e.target.id, 1)
    .bnd(pMnums.ret)
    .bnd(test3)
    .bnd(pMstyle.ret)
    mM3
    .bnd(push, e.target.innerHTML)
    .bnd(mM3.ret)
    .bnd(v => {
      if (v.length == 2 && mM8.x != 0) {
        updateCalc(v, mM8.x) 
      }
    })
    }).startWith([0, 0, 0, 0]);

  var opClick$ = sources.DOM
      .select('.op').events('click');

  var opClickAction$ = opClick$.map(e => {
    mM8.ret(e.target.innerHTML).bnd(v => { 
      var ar = mM3.x
      if (ar.length === 2) {
        updateCalc(ar, v)
      }
    }) 
  });
```
The clicked number is removed from pMnums and added to mM3 in the numClickAction$ stream. If two numbers and an operator have been selected, numClickAction$ and opClickAction$ call updateCalc, giving it the two member array (which is held in mM3) of selected numbers and the selected operator. After each roll, mM8 is given the value 0 so mM8.x != 0 means an operator has been selected. 
```javascript
  function updateCalc(ar, op) {
    var result = calc(ar[0], op, ar[1]);
    mM3.ret([]);
    mM8.ret(0)
    if (result == 20) { 
      pMscore.bnd(add,1)
      .bnd(testscore)
      .bnd(pMscore.ret)
      .bnd(v => score(v));
      return; 
    } 
    else if (result == 18) { 
      pMscore.bnd(add,3)
      .bnd(testscore)
      .bnd(pMscore.ret)
      .bnd(v => score(v));
      return; 
    }
    else {
      pMnums.bnd(push,result)
      .bnd(pMnums.ret)
      .bnd(v => {
        travMonad.run([v, pMscore.x, pMgoals.x])
        test3(v)
        .bnd(pMstyle.ret)
      }); 
      mM8.ret(0);
      mM3.ret([]);
    }
  };  

  var testscore = function testscore(v) {
    if ((v % 5) === 0) return ret(v+5)
    else return ret(v);
  };

  function score(scor) {
    if (scor != 25) {
      newRoll(scor, pMgoals.x)
    }
    else if (pMgoals.x == 2) {
      newRoll(0,0)
    }
    else {pMgoals.bnd(add, 1).bnd(pMgoals.ret).bnd(g => newRoll(0, g))};
  };  

```  
updateCalc calls calc on the numbers and operater given to it by numCalcAction$ or opCalcAction$, giving the value to a variable named "result". If the value of result is 18 or 20, the resulting score is checked to see if it should be augmented by five and then score(scor) is called, providing the new score to the function score(). score() performs some more tests and calls for a new roll with the values of score and goals it has determined depending on whether or not there is a score and, if so, a winner.
##MonadSet
The list of online group members at the bottom of the scoreboard is very responsive to change. When someone joins the group, changes to a different group, or closes a browser session, a message prefixed by NN#$42 goes out from the server providing group members with the updated list of group members. MonadSet acts upon messages prefixed by NN#$42. Here are the definitions of MonadSet and the MonadSet instance sMplayers:
```javascript  
  var MonadSet = function MonadSet(set, str) {
    var ob = {
      ID: str,
      s: set,  
      bnd: (func, ...args) => func(ob.s, ...args),
      add: a => MonadSet(s.add(a), ob.id),
      delete: a => MonadSet(s.delete(a), ob.id),
      clear: () => MonadSet(s.clear(), ob.id)
    };
    return ob;
  };

   var s = new Set();
  
  var sMplayers = MonadSet(s, 'sMplayers'); // holds currently online players 
```
## MonadE - An Error-Catching Monad

Instances of MonadE function much the same as instances of Monad, but when an instance of MonadE encounters an error, it ceases to perform any further computations. Instead, it passes through every subsequent stage of a sequence of MonadE expressions, reporting where it is and repeating the error message. It will continue to do this until it is re-instantiated or until its bnd() method runs on the function clean().

Functions used as arguments to the MonadE bnd() method are placed in quotation marks to prevent the browser engine from throwing reference errors. Arguments can be protected in the same manner.

The variable test1 was defined as shown below. When test1 was entered in the Chrome developer console, "The square root of the sum of 300 squared and 400 squared is 500" was displayed. Here is the code. The screen shot is shown below.
```javascript
  test1 = ret2(0,'a')
    .bnd('add2',3, 'a')
    .bnd('mult2',100,'a')
    .bnd('square2','c')
    .bnd('ret2','c')
    .bnd('add2',-c.getx() + 4,'b')
    .bnd('ret2','b')
    .bnd('mult2',100,'b')
    .bnd('ret2','e')
    .bnd('square2','e')
    .bnd('add2',c.getx(),'e')
    .bnd('sqroot2','e')
    .bnd('log2','The square root of the sum of ' + a.getx() + 
      ' squared and ' + b.getx() + ' squared is ' + e.getx(), 'e')
    .getx()  
```    
Next, I tried to define test2 in the Chrome developer scratch pad, which runs in the Chrome developer tools. Like the console, it is accessable by pressing F12 while in the running application in Chrome. Firefox provides similar tools. The attempt to define test2 resulted in the sequence of reports shown in the screenshot below. I defined test2 in monad.js, which loads as a script in the index.html file. The application loaded successfully, and when I looked in the console, I saw the same series of reports (screenshot below). When I entered test2 in the console, 0 was displayed. That was the value of the MonadE instance "a" when the error occurred. Here is test2 and the screenshot:
```javascript
  test2 = ret2(0,'a')
    .bnd('add22',3, 'a')     // The error occurs here.
    .bnd('mult2',100,'a')
    .bnd('square2','c')
    .bnd('ret2','c')
    .bnd('add2',-c.getx() + 4,'b')
    .bnd('ret2','b')
    .bnd('mult2',100,'b')
    .bnd('ret2','e')
    .bnd('square2','e')
    .bnd('add2',c.getx(),'e')
    .bnd('sqroot2','e')
    .bnd('log2','The square root of the sum of ' + a.getx() + 
      ' squared and ' + b.getx() + ' squared is ' + e.getx(), 'e')
    .getx()  
```
![Alt text](MonadE_a.png?raw=true)
Here are the definitions of MonadE and the functions used in the demonstration:
```Javascript
  function MonadE (val, ID, er = []) {
    var x = val;
    var e = er;
    var ob = {  
      id: ID,
  
      getx: function () {return x},
  
      bnd: function (f, ...args) {

        if (f == 'clean') {
          ret2(x, ob.id, []);
          return new MonadE(x, ob.id, [])
        }

        if (e.length > 0) {
          console.log('BYPASSING COMPUTATION in MonadE instance', ob.id, f, '.  PROPAGATING ERROR:',  e[0]); 
          return ob;  
        }
  
        if (f == 'log2') {
          console.log(args[0]);
          return new MonadE(args[0], 'log', [])
        }
  
        var a = ("typeof " + f);

        if (eval(a) == 'function') {
          let b = '';
          for (let v of args) {
            b = "typeof " + v
            if (eval(b) == 'undefined') {
              console.log(v, "is undefined. No further computations will be attempted");
              e.push(v + " is undefined." );
              return ob;
            }
  
            if (eval(b) == 'NaN') {i
              console.log(v, "is NaN. No further computations will be attempted");
              e.push(v + " is NaN." );
              return ob;
            }
          }

          try {return eval(f)(x, ...args)}
          catch (error) {
            e.push(error);
            console.log('MonadE instance',ob.id,'generated the following error message:');
            console.log('Error ' + error);  
          }
        }
        
        else {
          e.push(f + ' is not a function. ');
          console.log(f, 'is not a function. No further computations will be attempted');
          return ob;
        }
      },
  
      ret: function (a) {
        window[ob.id] = new MonadE(a, ob.id, []);
        return window[ob.id];
      }  
    }
    return ob;
  };
   
  function add2 (x, y, str ) {
    window[str] = new MonadE(x+y, str, []);
    return window[str];
  };
  
  function square2 (x, str) {
    window[str] = new MonadE(x*x, str, []);
    return window[str];
  };
  
  function mult2 (x,y,str) {
    window[str] = new MonadE(x*y, str, []);
    return window[str];
  };
  
  function sqroot2 (x,str) {
    window[str] = new MonadE(Math.sqrt(x), str, []);
    return window[str];
  };

  function log2(x, message, str) {
    window[str] = new MonadE(x, str, []);
    console.log(message);
    return window[str];
  };

  function ret2(v, id = 'ret2') {
    window[id] = new MonadE(v, id, []);
    return window[id];
  };  
   }  
```
When a MonadE instance encounters a function or an argument in quotation marks of types undefined or NaN, a message string gets pushed into its e attribue. After that, the bnd() method will not process any function other than clean() and log2(). It will stop at theif (e.length > 0)block. clean() resets an instance to normal functioning mode by setting its e attribute back to []. MonadE instances are created on the flyin the error-free version. In the version with an error, these MonadE instances have already been created and ret2, by creating fresh instances, effectively re-sets their values to 0. 

The final test in the bnd() method occurs in a try-catch block. If a function and its quoted arguments are not of types undefined or NaN but the system returns an error, the error message gets logged and a browser crash is averted.

##Websocket messages

Incoming websockets messages trigger updates to the game display, the chat display, and the todo list display. The members of a group see what other members are doing; and in the case of the todo list, they see the current list when they sign in to the group. When any member of a group adds a task, crosses it out as completed, edits its description, or removes it, the server updates the persistent file and all members of the group immediately see the revised list.

The code below shows how incoming websockets messages are routed. For example, mMZ10.release() is called when a new dice roll (prefixed by CA#$42) comes in.
```javascript
  const messages$ = (sources.WS).map( e => {
  mMtem.ret(e.data.split(',')).bnd( v => {
  console.log('<><><><><><><><><><><><><><><><>  INCOMING  <><><><><><><> >>> In messages. e amd v are ', e, v);
  mMZ10.bnd( () => {
    pMnums.ret([v[3], v[4], v[5], v[6]]).bnd(test3).bnd(pMstyle.ret)
    travMonad.run([ [v[3], v[4], v[5], v[6]], v[7], v[8] ]);
    pMscore.ret(v[7]);
    pMgoals.ret(v[8]) }); 
  mMZ12.bnd( () => mM6.ret(v[2] + ' successfully logged in.'));
  mMZ13.bnd( () => updateMessages(e.data));
  mMZ14.bnd( () => mMgoals2.ret('The winner is ' + v[2]));
  mMZ15.bnd( () => {
    mMgoals2.ret('A player named ' + v[2] + ' is currently logged in. Page will refresh in 4 seconds.')
    refresh() });
  mMZ17.bnd( () => testTask(v[2], v[3], e.data) ); 
  mMZ18.bnd( () => {if (pMgroup.x != 'solo' || pMname.x == v[2]) {updatePlayers(e.data) } });
  })       
  mMtemp.ret(e.data.split(',')[0])
  .bnd(next, 'CA#$42', mMZ10)
  .bnd(next, 'CD#$42', mMZ13)
  .bnd(next, 'CE#$42', mMZ14)
  .bnd(next, 'EE#$42', mMZ15)
  .bnd(next, 'DD#$42', mMZ17)
  .bnd(next, 'NN#$42', mMZ18)
  });
```  
The "mMZ" prefix designates instances of MonadItter. An instance's bnd() method assigns its argument to its "p" attribute. "p" runs if and when its release() method is called. The next() function releases a specified MonadItter instance when the calling monad's value matches the specified value in the expression. In the messages$ stream, the MonadItter instance's bnd methods do not take argumants, but next is capable of sending arguments when bnd() is called on functions requiring them. Here is an example:
MonadState and MonadState Transformers

An instance of MonadState holds the current state and value of a computation. For any instance of MonadState, say m, these can be accessed through m.s and m.a, respectively.
```javascript
    function MonadState(g, state, p) {
      var _this = this;
      this.id = g;
      this.s = state;
      this.process = p;
      this.a = s[3];
      this.bnd = (func, ...args) => func(_this.s, ...args);  
      this.run = ar => { 
        var ar2 = _this.process(ar);
        _this.s = ar2;
        _this.a = ar2[3];
        window[_this.id] = _this;
        return window[_this.id];
      }
    };  
``` 
MonadState reproduces some of the functionality found in the Haskell Module "Control.Monad.State.Lazy", inspired by the paper "Functional Programming with Overloading and Higher-der Polymorphism", Mark P Jones (http://web.cecs.pdx.edu/~mpj/) Advanced School of Functional Programming, 1995. The following demonstrations use the MonadState instances fibsMonad and primesMonad to create and store arrays of Fibonacci numbers and arrays of prime numbers, respectively. fibsMonad and primesMonad provide a simple way to compute lists of prime Fibonacci numbers. Because the results of computations are stored in the a and s attributes of MonadState instances, it was easy to make sure that no prime number had to be computed more than once in the prime Fibonacci demonstration.

Here is the definition of fibsMonad, along with the definition of the function that becomes fibsMonad.process.
```javascript
  var primesMonad = new MonadState('primesMonad', [3, '', 3, [2,3]], primes_state);

  var fibs_state = function fibs_state(ar) {
    var a = ar.slice();
    while (a[3].length < a[2]) {
      a = [a[1], a[0] + a[1], a[2], a[3].concat(a[0])];
    }
    return a
  }  
```  
Another MonadState instance used in this demonstration is primesMonad. Here is its definition along with the function that becomes primesMonad.process:
```javascript
  var primesMonad = new MonadState('primesMonad', [2, '', 3, [2]], [2],  primes_state) 

  var primes_state = function primes_state(x) {
    var v = x.slice();
      while (2 == 2) {
        if (v[3].every(e => ((v[0]/e) != Math.floor(v[0]/e)))) {
          v[3].push(v[0]);
        }
        if (v[3][v[3].length - 1] > v[2]) { break }; // Not an infinite loop afterall
        v[0]+=2;
      }
    return v;
  }  
```  
MonadState transformers

Transformers take instances of MonadState and return different instances of MonadState, possibly in a modified state. The method call "fibsMonad.bnd(fpTransformer, primesMonad)" returns primesMonad. Here is the definition of fpTransformer:
```javascrit
  var fpTransformer = function fpTransformer (s, m) {
    var bound = Math.ceil(Math.sqrt(s[3][s[3].length - 1]));
    if (bound > m.a[m.a.length - 1] ) {
      m.run([m.s[0], "from the fibKeyPress5$ handler", bound, primesMonad.a])
    }
    return m;
  }  
```  
If the largest number in primesMonad.a is less than the square root of the largest number in fibsMonad.a, primesMonad is updated so that the largest number in primesMonad.a is greater than the square root of the largest number in fibsMonad.a. herwise, primesMonad is returned unchanged.

The final computation in the prime Fibonacci numbers demonstration occurs when "tr3(fibsState[3],primesState[3]" is called. tr3() takes an array of Fibonacci numbers and an array of prime numbers and returns an array containing an array of Fibonacci numbers, an array of prime numbers, and an array of prime Fibonacci numbers. Here is the definition of tr3:
```javascript
  var tr3 = function tr (fibsArray, primesArray) {
    var bound = Math.ceil(Math.sqrt(fibsArray[fibsArray.length - 1]))
    var primes = primesArray.slice();
    if (primesArray.slice(-1)[0] >= bound) {
      primes = primesArray.filter(v => v <= bound);
    } 
    var ar = [];
    var fibs = fibsArray.slice(3);
    fibs.map (v => {
      if (primesArray.every(p => (v % p || v == p))) ar.push(v);
    })
    return [fibsArray, primes, ar]
  }  
```  
User input is handled by a chain of computations. first to update fibsMonad, second to extract fibsMonad.s, third to run fpTransformer to modify and then return primesMonad, and fourth to extract primesMonad.s and run tr3(fibsState[3],primesState[3]). Monad instance mMres obtains the result. mMres.x[0], mMres.x[1], and mMres.x[2], are permanent features of the virtual DOM. Here is the code:
```javascript
  const fibKeyPress5$ = sources.DOM
    .select('input#fib92').events('keydown');

  const primeFib$ = fibKeyPress5$.map(e => {
    if( e.keyCode == 13 ) {
      mMres.ret(fibsMonad
      .run([0, 1, e.target.value, []])
      .bnd(fibsState => fibsMonad
      .bnd(fpTransformer, primesMonad)
      .bnd(primesState => tr3(fibsState[3],primesState[3]))))var
    }
  });  
```  
Only 48 Fibonacci numbers need to be generated in order to get the eleventh prime Fibonacci number. But 5546 prime numbers need to be generated to test for divisibility into 2971215073. Finding the next Fibonacci number is just a matter of adding the previous two. Getting the next prime number is a more elaborate and time-consuming procedure. In this context, the time needed to compute 48 Fibonacci numbers is insignificant, so I didn't bother to save previously computed Fibonacci numbers in the prime Fibonacci demonstration. When a user enters a number smaller than the current length of fibsMonad.a, fibsMonad is modified such that its length becomes exactly what the user entered. It takes a couple of seconds to test 50 Fibonacci numbers in the online demo on my desktop computer. Beyond that, lag times start getting pretty long. 

The online demonstration features a game with a traversible dice-roll history; group chat rooms; and a persistent, multi-user todo list. People in the same group share the game, chat messages, and whatever todo list they might have. Updating, adding, removing, or checking "Complete" by any member causes every member 's todo list to update. The Haskell websockets server preserves a unique text file for each group's todo list. Restarting the server does not affect the lists. Restarting or refreshing the browser window causes the list display to disappear, but signing in and re-joining the old group brings it back. If the final task is removed, the server deletes the group's todo text file. 

With Motorcycle.js, the application runs smoothly and is easy to understand and maintain. I say "easy to understand", but for people coming from an imperitive programming background, some effort must first be invested into getting used to functions that take functions as arguments, which are at the heart of Motorcycle and JS-monads-stable. After that, seeing how the monads work is a matter of contemplating their definitions and experimenting a little. Most of the monads and the functions they use in this demonstration are readily available in the browser console. If you have the right dev tools in Chrome or Firefox, just load [http://schalk.net:3055](http://schalk.net:3055) and press F12. You might need to enter Ctrl-R to re-load with access to the monad.js script. I do this to troubleshoot and experiment. 

.
.

