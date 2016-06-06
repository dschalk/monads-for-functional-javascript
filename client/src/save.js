

  const taskAction$ = mM$taskList.stream.observe(str => {
    console.log('In taskAction$. str is: ', str)
    socket.send('TD#$42' + ',' + O.mMgroup.x.trim() + 
        ',' + O.mMname.x.trim() + ',' + '@' + str);
  });

  autorun(() => {CURRENT_ROLL = O.mMcurrentRoll.x}); 

        h('div#rightPanel',  {style: {display: 'none'}}, [
          h('span#tog', [
          h('button#game',  {style: {fontSize: '16px'}}, 'TOGGLE GAME'  ), 
          h('span.tao',' ' ),
          h('button#todoButton',  {style: {fontSize: '16px'}}, 'TOGGLE TODO LIST'  ),  
          h('br'),
          h('br'),
          h('button#chat2',  {style: {fontSize: '16px'}}, 'TOGGLE CHAT'  ),
          h('span.tao',' ' ),
          h('button#caption',  {style: {fontSize: '16px'}}, 'TOGGLE CAPTION'  )  ]),
          h('br'),
          h('br'),
          h('br'),
          h('br'),

          h('div#gameDiv',   [
          h('span',  'Group: ' + O.mMgroup.x ),
          h('br'),
          h('span',  'Goals: ' + O.mMgoals.x ),
          h('br'),
          h('span',  'Name: ' + O.mMname.x ),
          h('br'),
          h('span', 'player[score][goals]' ),
          h('div', O.mMscoreboard.x ) ]) ,
          h('br'),
          h('br'),  
          h('br'),  
    
          h('div#todoDiv',  [ 
            h('div#taskList', O.mMtaskList.x ),
            h('span', 'Author, Responsible Person, Task: '  ),  
            h('input.newTask' ) ]),
          h('br'),
          h('span#alert' ),
          h('br'),
          h('br'),

          h('div#chatDiv', [ 
          h('div#messages',  [
          h('span', 'Message: '  ),
          h('input.inputMessage' ),
          h('div', O.mMmsg.x  ) ]) ]) 
        ]),
        h('div.leftPanel', {  style: {width: '60%'   }},   [  
        h('br'),
        h('a.tao', {props: {href: '#common'}}, 'Common Patterns'   ),  
        h('a.tao', {props: {href: '#tdList'}}, 'Todo List Explanation'   ),  
        h('a.tao', {props: {href: '#monads'}}, 'Why Call Them Monads'   ),  
        h('div#captionDiv', [
        h('h1', 'Motorcycle.js With JS-monads' ),
        h('span.tao1', ' A shared, persistent todo list, ' ),
        h('br'),
        h('span.tao1', ' A websockets simulated dice roll game. ' ),
        h('br'),
        h('span.tao1', ' Group chat rooms and more demonstrations of efficient, ' ),
        h('br'),
        h('span.tao2', ' maintainable code using Motorcycle.js and JS-monads.  ' ) ] ),
        h('br'),
        h('span.tao', 'This is a ' ),
        h('a', {props: {href: "https://github.com/motorcyclejs", target: "_blank" }}, 'Motorcycle.js' ),
        h('span', ' application. Motorcycle.js is ' ), 
        h('a', {props: {href: "https://github.com/cyclejs/core", target: "_blank" }}, 'Cycle.js' ),
        h('span', ' using ' ),
        h('a', {props: {href: "https://github.com/cujojs/most", target: "_blank" }}, 'Most' ),
        h('span', ' , ' ),
        h('a', {props: {href: "https://github.com/TylorS/most-subject", target: "_blank" }}, 'Most-subject' ),
        h('span', ' and '  ), 
        h('a', {props: {href: "https://github.com/paldepind/snabbdom", target: "_blank" }}, 'Snabbdom' ),
        h('span', ' instead of RxJS and virtual-dom. Reactive evaluation of expression is made possible by '  ),
        h('a', {props: {href: "https://github.com/mobxjs/mobx", target: "_blank" }}, 'MobX' ),
        h('span', ' . The code for this repository is at ' ),
        h('a', {props: {href: "https://github.com/dschalk/JS-monads-stable", target: "_blank" }}, 'JS-monads-stable' ),
        h('div#gameDiv2',  {style: {display: 'none'}}, [
        h('br'),
        h('span', ' Here are the basic rules:' ), 
        h('p', 'RULES: If clicking two numbers and an operator (in any order) results in 20 or 18, the score increases by 1 or 3, respectively. If the score becomes 0 mod 5, 5 points are added. A score of 25 results in one goal. That can only be achieved by arriving at a score of 20, which jumps the score to 25. Directly computing 25 results in a score of 30, and no goal. Each time ROLL is clicked, one point is deducted. Three goals wins the game. '    ),
        h('button#0.num',  CURRENT_ROLL[0]  ),
        h('button#1.num',  CURRENT_ROLL[1]  ),
        h('button#2.num',  CURRENT_ROLL[2]  ),
        h('button#3.num',  CURRENT_ROLL[3]  ),
        h('br'),
        h('button#4.op', 'add'  ),
        h('button#5.op', 'subtract' ),
        h('button#5.op', 'mult' ),
        h('button#5.op', 'div' ),
        h('button#5.op', 'concat' ),
        h('br'),
        h('div#dice', {style: {display: 'none'}}, [ 
        h('button.roll', 'ROLL' ),
        h('br'),
        h('div.winner', O.mMgoals2.x+''  ),
        h('div#log1', [
        h('p', 'IN ORDER TO SEE THE DEMONSTRATIONS, YOU MUST ENTER SOMETHING BELOW.'  ),
        h('span', 'Name: ' ),
        h('input#login', {props: {placeholder: "focus on; start typing"}} ) ]),
        h('p', O.mM6.x.toString() ),
        h('div#log2', {style: {display: 'none'}}, [
        h('span', 'Change group: '  ),
        h('input#group' ) ]),
        h('p',  O.mMsoloAlert.x  ),
        h('p', 'People who are in the same group, other than solo, share the same todo list, messages, and simulated dice game. In order to see any of these, you must establish an identity on the server by logging in. The websockets connection would terminate if the first message the server receives does not succefully participate in the login handshake. '  ),
        h('hr' ),
        h('h1', 'The Monads'  ),
        h('p', ' There are three basic types of monads: Monad, MonadIter, and MonadStream. Instances of Monad have a method called "bnd" which takes a function and possibly other values as arguments. I have not created a comprehensive library of functions for bnd(), but most of the functions used in this demonstration are in the NPM package "js-monads", and all of them are in the Github repository. I create functions to suit specific purposes and I assume that anyone who uses these monads, or their own variations on the theme, will likewise want to create functions to suit their specific purposes. ' ),
        h('p', ' There is a basic pattern that I have found useful for computations and manipulating objects, including arrays. add() and cube() are examples of the pattern. They will be defined and used in the examples below. ' ),
        h('h2', 'Monad' ),
        code.monad,
        h('p', 'The following statements create instances of Monad named "m" with initial values of "some value": var m = new Monad("some value", "m") and ret("some value", "m"). Monad instances maintain state in the unique, mutable, global object named "O". Where there is changing state, it is not practical to avoid mutating something. My choices narrowed down to the window object or an attribute of window like O. O seemed like the better choice. It is a place to keep the most recent versions of named monads. Earlier versions of named monads can persist elsewhere, or be left for the gargage collector.   ' ),
        h('p', ' In the examples shown on this page, the initial values of instances of Monad remain unchaged. The ret() method places updated instances on O. The instances on O are never mutated. For any instance of Monad named m with id "m" and value v (i.e., m.x == v is true), m.ret(v2) creates a new attribute of O with key "m" or, if O.m already exists, m.ret(v2) mutates O by replacing its m attribute\'s value. The monad O.m is not mutated, so any O.m that is replaced will persist if there is a reference to it, or will be subject to garbage collection if there is not. ' ),
        h('h3', 'Examples' ),
        h('p', ' Here are the definitions of ret(), add(), and cube(): '  ),
        code.ret_add_cube,
        h('p', ' calling ret() with only one argument creates an anonymous global monad. There is no reference to it, so when a computation sequence using it terminates, it becomes eligeble for garbage collection. Although the monad\'s scope is global, it can\'t be clobbered because it has no name (no variable referring to it). ' ),
        h('p', ' As you see, cube() and ret() are overloaded functions. Here are some examples of various ways of using them: ' ),
        h('span.red3', 'cube(3)' ),
        h('span.td2', ' creates a useless anonymous monad with x == 27 and id == "anonymous". ' ),
        h('br' ),  
        h('br' ),  
        h('span.red3', 'cube(3).bnd(m.ret)' ),
        h('span.td2', ' O.m.x == 27 and O.m.id == "m". ' ),
        h('br' ),  
        h('br' ),  
        h('span.red3', 'cube(5, m)' ), 
        h('span.td2', ' where m is a monad leaves m unchanged, O.m.x == 125, and O.m.id == "m". ' ), 
        h('br' ),  
        h('br' ),  
        h('span.red3', 'cube(5).bnd(m.ret)' ), 
        h('span.td2', ' is equivalent to the previous example. m is unchanged and O.m.x == 125. ' ), 
        h('br' ),  
        h('br' ),  
        h('span.red3', 'ret(5).bnd(cube).bnd(m.ret)' ), 
        h('span.td2', ' is equivalent to the previous two examples. O.m.x == 125. ' ), 
        h('br' ),  
        h('br' ),  
        h('span.red3', 'm.ret(4).bnd(cube)' ), 
        h('span.td2', 'causes O.m.x == 4, and creates an anonymous monad with x == 64. ' ),
        h('br' ),  
        h('br' ),  
        h('span.red3', 'm.ret(4).bnd(cube, m)' ), 
        h('span.td2', ' leaves m unchanged, O.m.x == 64, and O.m.id == "m". ' ),
        h('br' ),  
        h('br' ),  
        h('span.tao', ' The convention "a == b" in this presentation signifies that a == b is true. By the way, if you want to change the value of m, all you have to do is call ' ),
        h('span.red3', 'ret(v, "m")' ),
        h('span', ' to cause m.x == v and m.id = "m". This is the definition of add(): ' ),
        code.add,   
        h('span.red3', 'add(3, 4)' ),
        h('span.td2', ' creates a useless anonymous monad with x == 7 and id == "anonymous". ' ),
        h('br' ),  
        h('br' ),  
        h('span.red3', 'add(3, 4).bnd(m.ret)' ),
        h('span.td2', ' causes O.m.x == 7 and O.m.id == "m". ' ),
        h('br' ),  
        h('br' ),  
        h('span.red3', 'add(3, 4, m)' ), 
        h('span.td2', ' is equivalent to the prior example. The result is O.m.x == 7, and O.m.id == "m". ' ), 
        h('br' ),  
        h('br' ),  
        h('span.red3', 'm.ret(0).bnd(add, 3).bnd(cube)' ), 
        h('span.td2', 'leaves m unchanged, O.m.x == 0, and creates an anonymous monad with x == 27. ' ),
        h('br' ),  
        h('br' ),  
        h('span.red3', 'ret(0).bnd(add, 3).bnd(cube).bnd(m.ret)' ), 
        h('span.td2', 'causes O.m.x == 27, and O.m.id = "m". ' ),
        h('br' ),  
        h('br' ),  
        h('span.red3', 'ret(0).bnd(add, 2, m).bnd(cube, m2)' ), 
        h('span.td2', ' where m, and m2 are monads causes O.m.x == 2, and O.m2.x == 8. ' ),
        h('br' ),  
        h('p#iterLink', ' O holds the current state of the monads. This is convenient. For example, mMcurrentList.ret() is seen in the application code whereever a todo list is created, removed, or altered. O.mMcurrentList.x sits in the virtual DOM, making sure that the todo list display is is always current. ' ),
        h('h2', 'MonadIter' ),
        h('p', 'For any instance of MonadIter, say "m", the statement "m.bnd(func)" causes m.p == func to be true. The statement "m.release(...args) causes p(...args) to execute. Here is the definition: ' ), 
        code.monadIt,
        h('p', 'As shown later on this page, MonadIter instances control the routing of incoming websockets messages and the flow of action in the simulated dice game. '  ), 
        h('p', 'The following example illustrates the use of release() with an argument. It also shows lambda expressions being provided as arguments for bnd(). The initial values of mMt1, mMt2, and mMt3 are 0, 0, and "" respectively. When this page loads, the following code runs: ' ),
        code.testZ,
        h('p', ' add() and cube() are defined in the Monad section (above). If you click "mMZ1.release(1)" several times, the code (above) beginning with "mMZ1" will run several times, each time with v == 1. The result, O.mMt3.x, is shown below the button. mMZ1.p (bnd()\'s argument) remains constant while mMZ1.release(1) is repeatedly called. ' ),
        h('button#testZ', 'mMZ1.release(1)'  ),
        h('p.code2', O.mMt3.x ),
        h('span', 'Refresh button: '  ),
        h('button#testQ', 'mMt1.ret(0).bnd(mMt2.ret)'  ),
        h('br' ),
        h('br' ),
        h('span.tao', '  You can call ' ),
        h('span.green', 'mMZ2.release(v)' ),
        h('span', ' by entering a value for v below: ' ), 
        h('br' ),
        h('span', 'Please enter an integer here: ' ), 
        h('input#testW' ), 
        h('p', ' Here is another example. It demonstrates lambda expressions passing values to a remote location for use in a computation. If you enter three numbers consecutively below, I\'ll call them a, b, and c, then the quadratic equation will be used to find solutions for a*x**2 + b*x + c = 0. The a, b, and c you select might not have a solution. If a and b are positive numbers, you are likely to see solutions if c is a negative number. For example, 12, 12, and -24 yields the solutions 1 and -2. ' ),
        h('p.code2#quad4', O.mMquad1.x ),
        h('span.red2', O.mMquad2.x ),
        h('span.red2', O.mMquad3.x ),
        h('br' ),
        h('span.tao' , 'Run mMZ3.release(v) three times for three numbers. The numbers are a, b, and c in ax*x + b*x + c = 0: ' ),
        h('input#quad' ),  
        h('p', 'Here is the code:' ),
        code.quad,
        h('span#tdList' ),
        h('h2', 'MonadStream'  ),
        code.monadStr,
        h('span.tao', ' MonadStream instances acquire values with the "ret()" method, placing them in the "stream" attribute. The stream depends on the ' ),
        h('a', {props: {href: "https://github.com/TylorS/most-subject/", target: "_blank" }}, 'most-subject' ),
        h('p', ' The next example uses MonadStream instances to display an array of Fibonacci numbers, an array of Prime numbers, and an array of prime Fibonacci numbers. The number entered into the box below puts an upper bound on the arrays. '  ),
        h('p', ' Enter an integer below to run the code. '  ), 
        h('input#fib3335',  ),
        h('p#fib5.red4',  ),  
        h('p#prime5.red4',  ),  
        h('p#primeFibs.red4',  ),  
        h('p', ' Here is the code for the memoizing Fibonacci number generator:   '  ),
        code.primeFib3,
        h('p', ' As you see, the mM$fib5 observer receives data when mMitterFib5 is released. Entering a number in the box (above) releases mMitterFib5 with the number that was entered. When a number is received, I called it "x", a test determines if the largest number in O.mMfibs8.x is smaller than x. If it is, mM$fib5 is called to run computations until the largest number in O.mMfibs8.x exceeds x. '  ),
        h('p', ' mM$fib5 releases mMitterPrime5, which is the entry point for the prime number generator. An array containing a Fibonacci number and an array of Fibonacci numbers is included in mMitterPrime5.release([num, array]). The array of Fibonacci numbers is used in the final calculation which determines which of the Fibonacci numbers are prime. Here is the code that receives that information and causes the array of prime numbers and the array of prime Fibonacci numbers to be displayed: '  ),
        code.primeFib4,
        h('p', ' When the web page loads, the mM$fib5 and mM$prime5 observers are initiated with the following expressions: '  ),
        h('pre', `    mM$fib5.ret( [ 0, 1, 1 ] );
    mM$prime5.ret( [ [2], 3, 3 ] );
`    ),


        h('h2', 'Hot Monad State'   ),
        h('p', ' I made the global object "O" observable with the following two lines of code: ' ),
        h('pre', `    import {observable, autorun} from 'mobx'
    monadState = observable(O);    ` ),
        h('p', ' So now, whenever an instance of Monad, say m, calls its ret() method, O gets mutated and any expression containing O.m can be made to automatically update by a MobX observer. First, here is the code for a calculator that does not use MobX: '  ), 
        code.spreadsheet,
        h('p', ' And here is where you can enter numbers: ' ),
        h('span', 'O.mMcount.ret(number): ' ), 
        h('input#spread1', ), 
        h('br' ),  
        h('span', 'O.mMcount2.ret(number): ' ), 
        h('input#spread2', ), 
        h('p#spreadsheet1',  O.mMspreadsheet.x[0] ), 
        h('p#spreadsheet2',  O.mMspreadsheet.x[1] ), 
        h('p#spreadsheet3',  O.mMspreadsheet.x[2] ), 
        h('p#spreadsheet4',  O.mMspreadsheet.x[3] ), 
        h('p', ' The MobX expression (shown below) produces these results:  '  ),
        h('p#spreadsheet5',  RESULT[0] ), 
        h('p#spreadsheet6',  RESULT[1] ), 
        h('p#spreadsheet7',  RESULT[2] ), 
        h('p#spreadsheet8',  RESULT[3] ), 
        h('p', ' Here is the code that is responsible for the second set of results: '  ),
        code.spreadsheet2,
        h('p', ' User input changes O.mMcount.x and O.mMcount2.x; and since they were made observable by "monadState = observable(O)", autorun can make RESULT automatically update whenever either of them changes. As shown in the first block of calculations, the additional overhead of adding the MobX library to the application code base would not be justified if making a calculater were all that we wanted to do. MobX is extreemly useful in ReactJS applications, so I wanted to see what it could add here. I doubt that there is anything MobX can do that Motorcycle doesn\'t already have covered.   ' ),
        h('h2', 'Updating the DOM'  ),
        h('h3', 'Todo List DOM Updates' ),
        h('p', ' When users do anything to the todo list, MonadStream instance mM$taskList runs its ret() method on the modified String representation of the list, causing the string to be added to mM$taskList.stream. mM$taskList.stream has only one subscriber, taskAction$, whose only purpose it to send the string representation of the todo list to the server. The server updates its persistent file and distributes a text representation of the updated todo list to all group members. Each group member receives the todo list as a string and parses it into a DOM node tree that is merged into the stream that updates the virtual DOM. All Todo List side effects can be traced to:' ),
        code.todoStream,
        h('span', ' Just search for "mM$taskList.ret" to find where all todo list changes were initiated. The following link takes you to a more detailed explanation of the todo list. ' ),
        h('a', {props: {href: '#tdList2'}}, 'Detailed Todo List Explanation'   ),  
        h('br' ),
        h('h3', 'Dice Game DOM updates' ),
        h('p', ' Because the MobX "observable" function makes "O" reactive, the following code causes the virtual DOM to update whenever mMcurrentRoll.ret() is called. ' ),
        h('pre', `    autorun(() => {CURRENT_ROLL = O.mMcurrentRoll.x}) `  ),
        h('p', ' mMcurrentRoll.ret() is called only when (1) a new dice roll comes in from the server, (2) when a player clicks a number, and (3) when clicking a number or operator results in a computation being performed. These are the three things that require a DOM update. When a player clicks a number, it disappears from number display. When a computation is performed, the result is added to the number display, unless the result is 18 or 20. A result of 18 or 20 results in a new roll coming in from the server ' ),
        h('p', '    ' ),
        h('hr' ),  
        h('h2', 'Concise Code Blocks For Information Control' ),
        h('p', ' Incoming websockets messages trigger updates to the game display, the chat display, and the todo list display. The members of a group see what other members are doing; and in the case of the todo list, they see the current list when they sign in to the group. When any member of a group adds a task, crosses it out as completed, edits its description, or removes it, the server updates the persistent file and all members of the group immediately see the revised list.  '  ),
        h('p', 'The code below shows how incoming websockets messages are routed. For example, mMZ10.release() is called when a new dice roll (prefixed by CA#$42) comes in.   ' ),
        code.messages,
        h('p', ' The "mMZ" prefix designates instances of MonadIter. The bnd() method assigns its argument to the "p" attribute. "p" runs if and when the release() method is called. The next() function releases a specified MonadIter instance when the calling monad\'s value matches the specified value. next2() releases the specified monad when the specified condition returns true. The release method in next() has no argument, but next does take arguments, as illustrated below.' ),
        h('span.tao', ' The incoming messages block is just a syntactic variation of a switch block, but that isn\'t all that MonadIter instances can do. They can provide fine-grained control over the lazy evaluation of blocks of code. Calling release() after a function completes some task provides Promise-like behavior. Error handling is optional. The MonadInter release(...args) method facilitates sequential evaluation of code blocks, remeniscent of video and blog explanations of ES6 iterators and generators. I prefer doing it with MonadIter over "yield" and "next". For one thing, ES6 generator "yield" blocks must be evaluated in a predetermined order. This link takes you back to the MonadIter section with interactive examples of the use of release() with arguments.  ' ),
        h('a#tdList2', {props: {href: '#iterLink'}}, 'release() with arguments'   ),  
        h('br' ),
        h('br' ),
        h('a', {props: {href: '#top'}}, 'Back To The Top'   ),  
        h('br' ),
        h('h3', 'The Todo List' ),
        h('p', ' Next, I\'ll go over some features of the todo list application. This will show how Motorcycle.js and the monads work together.' ),
        h('p', 'Creation Of A Task: If you enter something like Susan, Fred, Pay the water bill, the editable task will appear in your browser and in the browsers of any members a group you might have created or joined. If you have loaded this page in another tab and changed to the same group in both, you will see the task in both tabs, barring some malfunction. The task has a delete button, an edit button, and a "Completed" checkbox. It shows that Susan authorized the task and Fred is responsible for making sure it gets done. Instead of entering an authority and responsible person, you can just enter two commas before the task description. Without two commas, a message appears requesting more information. This is how Motorcycle.js handles the creation of a new task: ' ),
        code.newTask,
        h('p', ' mM$taskList is the todo application\'s worker function. Every time it executes its ret() method, the argument to ret() is added to its stream, causing the following code to run: ' ),
        code.mM$task,
        h('p', 'mM$taskList caries a string representing the task list. mMtaskList.x.split(",") produces an array whose length is a multiple of six. Commas in the task description are replaced by "$*$*$" so split(",") will put the entire task description in a single element. Commas are re-inserted when the list arrives from the server for rendering. Although a task list is a nested virtual DOM object (Snabbdom vnode), it can be conveniently passed back and forth to the server as a string without resorting to JSON.stringify. Its type is Text on the server and String in the front end, becomming a virtual DOM node only once, when it arrives from the server prefixed by "DD#$42" causing "process(e.data) to execute. Here is process(): ' ),
        code.process,
        h('span.tao', 'As you see, the string becomes a list of six-element objects, then those objects are used to create a Snabbdom vnode which is handed to mM$taskList.ret() leading to the update of O.mMtaskList. O.mMtaskList.x sits permanently in the main virtual DOM description. When its value gets refreshed, the DOM re-renders because taskStream$ is merged into the stream that is mapped into the virtural DOM description inside the object returned by "main". "main" and "sources" are the arguments provided to Cycle.run(). "sources" is the argument provided to "main". It is an array of drivers. The code is at '  ),
        h('a', {props: {href: "https://github.com/dschalk/JS-monads-stable"}}, 'https://github.com/dschalk/JS-monads-stable' ),
        h('br'),
        h('p', ' Clicking "Completed": When the "Completed" button is clicked, the following code runs:         '  ),
        code.colorClick,
        h('p', 'O.mMtaskList is split into an array. Every sixth element is the start of a new task. colorAction$ toggles the second, third, and fourth element in the task pinpointed by "index" * 6. getIndex finds the index of the first and only the element whose task description matches the one that is being marked "Completed". I say "only" because users are prevented from adding duplicate tasks. After the changes are made, the array of strings is reduced to one string and sent to the server when mM$taskList.ret() updates mM$taskList.stream triggering . '  ),  
        h('p', ' This is the code involved in editing a task description: '  ),
        code.edit,
        h('p', 'Clicking "Edit" causes a text box to be displayed. Pressing <ENTER> causes it to diappear. edit2Action$ obtains the edited description of the task and the index of the task iten and provides them as arguments to process. Process exchanges $*$*$ for any commas in the edited version and assigns the amended task description to the variable "task". O.mMtaskList.x is copied and split into an array. "index * 6" is replaced with "task" and the list of strings is reduced back to a single string and sent to the server for distribution. This pattern, - (1) split the string representation of the todo list into an array of strings, (2) do something, (3) reduce the list of strings back to a single string - is repeated when the "Delete" button is clicked. If the last item gets deleted, the server is instructed to delete the persistent file bearing the name of the group whose member deleted the last task. ' ), 
        h('p#common', 'Cycle.js has been criticized for not keeping state in a single location, the way React.js does. Motorcycle.js didn\'t do it for me, or try to force me to do it, but it so happens that the current state of all active monads is in the object "O". I have written applications in Node.js and React.js, and I can say without a doubt that Motorcycle.js provides the best reactive interface for my purposes.  ' ),
        h('hr'),
        h('a', {props: {href: '#top'}}, 'Back To The Top'   ),  
        h('h2', 'Common Patterns' ),
        h('p', 'Anyone not yet familiar with functional programming can learn by studying the definition of the Monad bnd() method and considering the common patterns presented below. Often, we want to give a named monad the value of an anonymous monad returned by a monadic computation. Here are some ways to accomplish that: '  ),
        h('p', 'For any monads m1 and m2 with values a and b respectively (in other words, m1.x == a and m2.x == b return true), m1.bnd(m2.ret) provides m1\'s value to m2.ret() causing O.m2 to have m1\'s value. So, after m1.bnd(m2.ret), m1.x == a, m2.x == b, O.m2.x == a all return true. The definition of Monad\s bnd() method shows that the function m2.ret() operates on m1.x. m1.bnd(m2.ret) is equivalent to m2.ret(m1.x). The stand-alone ret() function can be used to alter the current value of m2, rather than altering the value of O.m2. Here is one way of accomplishing this: m1.bnd(x => ret(x,"m2"). These relationships are demonstrated in the following tests: ' ),
        h('pre', 
`             ret('m1Val','m1')
             m1.x === 'm1Val'   // true
             ret('m2Val', 'm2')
             m2.x === 'm2Val'   // true

             m1.bnd(m2.ret)
             O.m2.x === 'm1Val' // true
             m2.x === 'm2Val'   // still true

             m1.ret('newVal')
             O.m1.bnd(v => ret(v, 'm2'))
             m2.x === 'newVal'  // true
             O.m2.x === 'm1Val' // true   still the same  `   ),
        h('p', ' Here are two basic ways to create a monad named "m" with id = "m" and value v: '  ),
        h('pre',
`  var m = new Monad(v, "m");
  ret(v, "m");  `  ),  
        h('p', 'Let m be a monad with id == "m" and value v. Its bnd() method can return an anonymous monad, a new named monad, or a previously existing monad containing the computation result. To illustrate, here is the definition of "add" along with five uses of it: ' ),
        code.add,  
        h('p'  ), 
        h('hr'),
        h('h3', 'Immutable Data And The State Object "O" ' ),
        h('p',  'The server updates scores in response to messages prefixed by "CG#$42". Each such message carries an integer specifying the amount of the change. The ServerState list of Client tupples is pulled from the game state TMVar and replaced by a new tupple whose Score field differs from the previous one.' ),
        h('p', 'In front end code, mutating variables which are defined inside of functions often seems inocuous in applications written in an object oriented programming style. This is not the case in a Motorcycle.js application, where functions culminate in streams that merge into the stream that feeds the object returned by the main function, called "main" in this application. "sources" is an array of drivers. It is main\'s only argument, "sources" and "main" are Cycle.run()\'s arguments.' ), 
        h('p', '"main" and "Cycle.run" are called only once. In the cyclic steady state that results, a reference should say what it means and mean what it says. If it suddenly refers to something other than what the other half of the cycle thinks it is, there will be a temporary disconnect. This will promptly staighten out, but having temporary disconnects shakes confidence in the consistency and reliability of the program. I don\'t have an example of mutating an object causing an unexpected result or crash. I would appreciate it if someone would give me such an example. ' ),
       h('p', ' In this environment, avoiding mutations is recommended and I generally follow that recommendation. Mutations in this application are confined to the global state object "O" and MonadIter instances. In the examples above, the release() method moves the process forward to the next occurance of the MonadIter instance where the bnd() method provides a new function to the "p" attribute. The progressive morphing of "p" in MonadIter instances is desirable behavior, and I think that creating a clone each time it occurs would be a senseless waste of resources. Unless and until release() is called, the program is not affected by "p". If release() is called, the return value of p(...args) is returned, but "p" itself remains tucked away, never mixing with the flow of information through the program. The bnd() method is pure. Given the same argument, it will always do the same thing. It doesn\'t even return anything. It just updates the internal "p" attribute. This insulation of internal operations from the outer program is remeniscent of an important purpose of the Haskell IO monad. These are just hand-waving arguments for the harmlessness of letting the bnd() method mutate MonadIter instances, but I wanted to explain why I feel comfortable with letting the definition of MonadIter stand as it is.  ' ),           
       h('p', 'All monad updates caused by the monad ret() method are stored in the object "O". When a monad m executes m.ret(v) for some value "v", m remains unchanged and the O attribute O.m is created or, if it already exists, is replaced by the update; i.e., O.m.x == v becomes true. Older versions of m are subject to garbage collection unless there is a reference to them or to an object (arrays are objects) containing m.  This is illustrated in the score-keeping code below.  All score changes are captured by mM13.ret(). Therefore, O.mM13.x is always the current score. Replacing monad attributes in O is vaguely analogous to swapping out ServerState in the Haskell server\'s state TMVar. Older versions of ServerState can be preserved in the server just as prior versions of O.mM13 can be preserved in the front end. ' ),     
        code.updateCalc,
        h('p', 'The socket messages prompt the server to update its application state and to broadcast messages to all members of the group whose member sent the message to the server. Let\'s take another look at the way incoming messages are handled.'  ),  
        code.messages,
        h('p#monads', ' Messages prefixed by CB#$42 are broadcast in response to CG#$42-prefixed messages from a browser. CB#$42 prefixes release mMZ11, causing the scoreboard to update. CA#$42-prefixed messages to the server result in CA#$42-prefixed messages carrying the next dice roll to be broadcast to the sender\'s group.  CE#$42 prefixed messages cause the release of mMZ14 which causes O.mMgoals2.x to change from an empty string to an anouncement of the name of the winner. ' ),  
        h('hr' ),  
        h('a', {props: {href: '#top'}}, 'Back To The Top'   ),  
        h('h3', 'Why Call Them Monads?' ),  
        h('p', 'For any monad m and function f mapping values to monads, inside the O object the bnd() method behaves like the Haskell >>= operator(pronounce "bind"). Sequences of calls to bnd() are associative; i,e, how computations are grouped does not matter. And the ret() method and ret() function provide a kind of left and right identity similar to the specification in the Haskell monad laws. Here are three functions we will use to illustrate this:' ),
        code.mdem1,
        h('span.tao', ' The relationships being demonstrated here are readily derivable from the definition of Monads; but just for illustration, here are some examples tested with Mocha: ' ),  
        h('a', {props: {href: "http://schalk.net:3056", target: "_blank" }}, 'Mocha Tests.' ),
        h('p', ' That\'s about it. That\'s why I call them "monads". But JS-monads can do much more than vaguely mirror Haskell monad functionality. There is no attempt to constrain JS-monads with type classes, or with restrictions on the types of functions the bnd() method can accept. m.bnd(x => x**3) returns a number, not a JS-monad. It would be the end of the line for a chained sequence of computations; but that might be exactly what you want: a monadic chain of computations that spits out a number when it is done. '  ),  
        h('a', {props: {href: '#top'}}, 'Back To The Top'   ),  
        h('p' ),  
        h('p' ),  
        h('p' ),  
        h('br'),  
        h('br'),  
        h('br'),  
        h('hr'),  
        h('p' ),  
        h('p' ),  
        h('p' ),  
        h('p' ),  
        h('p' )  
        ])
      ])
    ]) ])  )}     


        h('p', ' Expressions involving parsing or computation can be automatically evaluated without function calls. MobX facilitates this kind of functionality by making mutable data observable. The mutable global object O is a good match for MobX. After the following two lines of code, any expression involving the Monad ret() method automatically executes. ' ),
        h('pre', 
`import {observable, computed, autorun, asReference} from 'mobx'
monadState = observable(O);
`  ),
        h('p', ' Now, for any monad m and value v, when m.ret(v) executes, O.m is automatically updated (by the definition of "ret()") so that O.m.x == v becomes true. And since monadState = observable(O), monadState.m.x == v is also true. In the next domonstration, MobX is used to help create arrays of Fibonacci numbers. Here is the code: ' ),
        code.reactiveFib,
        h('div.tao', ' When you enter a number below, ' [ 
        h('pre', `fibFunc(<entered number>)` ),
        h('span', 'executes with the number you entered. The number must be greater than 2.  '  ) ] ),
        h('br' ),
        h('span', ' Enter a number greater than 2 here: ' ), 
        h('input#fibF',   ), 
        h('p#newFib', O.mMfib2.x  ),
        h('p', ' Neither mMcount, O.mMcount, nor monadState.mMcount are mutated in the code above. Only "O" mutates. This helps prevent functions from interfering with one another. Once a function creates a reference to O.mMcount, the value of that reference cannot be altered by another function. On the other hand, having "O" constantly mutate as state changes is a powerful feature. Compared to other data structures in this application, to me "O" seems brilliant and alive, and kind of like the sun at the center of the solar system. It is full of firey potential, and it is what makes effortless MobX reactivity possible. '  ),
        h('p', ' Religeously adhering to immutability, or anything else for that matter, limits possiblities. If your boss does that; well, that\'s part of the job. If you are doing it to yourself, maybe you would do well to step back and think it over for a while. '  ),  



const fibber = observable(0);
fibber.set(1);
var fibby = function fibby(n) {
  var k = 0;
  var ar = [0,1];
  fibber.observe((a,b) => {
    k+=1;
    if (k < n) {
      ar.push(a+b);
      fibber.set(a+b)
     } 
  }) 
  console.log(ar); 
}
fibby(300);









  const fetchTasks$ = sources.DOM
    .select('#fetchTasks').events('click')

  fetchAction$ = fetchTasks$.map(e => {
    socket.send('GQ#$42,' + O.mMgroup.x.trim() + ',' + O.mMname.x.trim() + ',nothing');

    mMZ20.bnd(() => mM$task.ret(O.mMar.x[3]));

      .bnd(next, 'GQ#$42', mMZ20)

 fetchAction$, 


        h('br'),
        h('button#fetchTasks', 'Fetch Tasks'  ),

  mM$fib4.stream.addListener({
    next: v => {
      let a = v[1];         // Fibonacci number
      let b = v[0] + v[1];  // Fibonacci number
      let c = v[2];         // Limit
      let d = v[3];         // List of Fibonacci numbers
      d.push(a);
      if (a < c) {mM$fib4.ret([a,b,c,d])}
      else {
        mMfibSave.ret([a, b, c, d]);
        document.getElementById('fib4').innerHTML = d; 
        mMitterPrimeFibs.release([b, d]); 
      };
      mMitterFib7.bnd(limit => {
        let e = O.mMfibSave.x
        e[3].pop();
        e[2] = limit;
        mM$fib4.ret(e);
      }) 
      mMitterFib4.bnd(
        x => {
          let largest = v[3][v[3].length - 1];
          console.log('In mMitterFib4.bnd  [x, a, b, c, v[3]] is: ', [x,a,b,c,v[3]]);
          if (x < largest) {
            var ar = v[3].filter(v => v <= x);
            var arLargest = ar[ar.length - 1];
            document.getElementById('fib4').innerHTML = ar; 
            mMitterPrimeFibs.release([arLargest, ar]);
          }
          if (x == largest) {
            document.getElementById('fib4').innerHTML = d; 
            mMitterPrimeFibs.release([arLargest,ar]);
          }
          if (x > largest) {
            mMitterFib7.release();
          }
        });
    },
    error: err => console.error(err),
    complete: () => console.log('completed')
  });

  mM$primeFibs.stream.addListener({
    next: v => {
      if (v[2] > 1) {
        var arPrimeFibs;
        for (let i in v[0]) {
          if ((v[1] % v[0][i]) == 0) {
            mM$primeFibs.ret([v[0], v[1] + 1, v[2]]);
            return;
          }
          if (i == (v[0].length - 1)) {
            v[0].push(v[1]);
            document.getElementById('prime2').innerHTML = v[0];
          }
        }
        if (v[0][v[0].length - 1] < v[2]) {
          mM$primeFibs.ret([v[0], v[1] + 1, v[2]])
        }
          mMitterPrimeFibs.bnd(
          x => {
          console.log('In mMitterPrimeFibs. x is: ', x);  
          let top = v[0][v[0].length -1];
          if (x[0] > top) { 
            mM$primeFibs.ret([v[0], top + 1, x[0]]);
          }
          if (x[0] == top) { 
              document.getElementById('prime2').innerHTML = v[0];
          }
          if (x[0] < top) {
            var ar = v[0].filter(v => v <= x[0]);
            var prime = v[0][ar.length];
            ar.push(prime);
            document.getElementById('prime2').innerHTML = ar;
          }
          arPrimeFibs = v[0].filter(function(n) {
              return x[1].indexOf(n) != -1;
          })
          document.getElementById('primeFibs').innerHTML = arPrimeFibs;
          })
      }
    },
    error: err => console.error(err),
    complete: () => console.log('completed')
  });
