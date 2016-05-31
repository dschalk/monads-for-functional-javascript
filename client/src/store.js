
        h('h2', 'Monad Definitions'  ),
        h('p', 'This JS-monads project began as an exploration into the potential usefulness of simple composable objects whose "bnd()" and "ret()" methods behave like Haskell\'s ">=" (prornounced "bind") and "return". The stand-alone function "ret()" is also similar to Haskell\'s "return". I named the little objects "monads" and demonstrated, earlier in this series, that in their simplest use cases they obey the Haskell monad laws. In other cases, they might do anything Javascript allows. '),
        h('p', 'I have settled on definitions of Monad and Monad$ that provide for updating the values they carry without mutating them. For any monad m, m.x = newValue mutates m. But m.ret(newValue) creates a new monad O.m carrying newValue instead of oldValue. ret(newValue, "m") returns a new monad named "m" whose value is newValue. The earlier version can be preserved; for example, by assigning it to a variable or placing it in an array. ' ),
        h('span.tao', ' Earlier pages in this series. some of which define Monad differently, are still available at ' ),
        h('a', {props: {href: "http://schalk.net"}}, 'schalk.net' ),
        h('span', '. They contain examples and detailed explanations which the reader might find enlightening, despite the sometimes differnt definitions of Monad. This is how Monad, Monad$, MonadIter, and ret() are defined: '),
        code.monads,  
        h('p', 'Todo list processing relies on an instance of Monad$ named mM$taskList. It hold a string with all of the information necessary for displaying todo list updates. When users click buttons or enter data in text boxes, mM$taskList processes the data and sends its updated string to the Haskell server, where it is received as Text. The server keeps a text file for each group, updating it and distribuing its content whenever a change is made or a user signs into a group. The message stream sorts messages and distributes them to functions that parse them into Snabbdom blocks of code that are then fed into the stream that updates the DOM on the next cycle. ' ),
        h('hr', ),  
        h('h2', 'Complex Functionality Organized In Concise Code Blocks' ),
        h('p', ' Incoming websockets messages trigger updates to the game display, the chat display, and the todo list display. The members of a group see what other members are doing; and in the case of the todo list, they see the current list when they sign into the group. When any member of a group adds a task, crosses it out as completed, edits its description, or removes it, the server updates the persistent file and all members of the group immediately see the revised list.  '  ),
        h('p', 'The flow of the game and the routing of websockets messages are handled by these little blocks of code: ' ),
h('pre', `  const messages$ = (sources.WS).map(e => 
    console.log('In messages$  e.data is: ', e.data)
    mMtem.ret(e.data.split(',')).bnd(v => {
      mMZ10.bnd(() => mM$1
        .ret([v[3], v[4], v[5], v[6]])
        .bnd(() => mM$2.ret([])))
      mMZ11.bnd(() => updateScoreboard(v[3]));
      mMZ12.bnd(() => mM6
        .ret(v[2] + ' successfully logged in.'))
      mMZ13.bnd(() => updateMessages(v))
      mMZ14.bnd(() => mMgoals2.ret('The winner is ' + O.mMsender.x ))
      mMZ15.bnd(() => mMgoals2.ret('A player named ' + 
          O.mMname.x + 'is currently logged in. Page will refresh in 4 seconds.')
        .bnd(refresh))
      mMZ16.bnd(() => process(e.data))
    mMtemp.ret(e.data.split(',')[0])
      .bnd(next, 'CA#$42', mMZ10)
      .bnd(next, 'CB#$42', mMZ11)
      .bnd(next, 'CC#$42', mMZ12)
      .bnd(next, 'CD#$42', mMZ13)
      .bnd(next, 'CE#$42', mMZ14)
      .bnd(next, 'EE#$42', mMZ15)
      .bnd(next, 'DD#$42', mMZ16)
    })                
  });

  function updateCalc() { 
    mMZ2.bnd(() => O.mM13
                 .bnd(score, 1)
                 .bnd(next2, (O.mM13.x % 5 === 0), mMZ5) 
                 .bnd(newRoll));
    mMZ4.bnd(() => O.mM13
                 .bnd(score, 3)
                 .bnd(next2, (O.mM13.x % 5 === 0), mMZ5) 
                 .bnd(newRoll));
        mMZ5.bnd(() => O.mM13
                     .bnd(score,5)
                     .bnd(v => mM13.ret(v)
                     .bnd(next, 25, mMZ6)));
            mMZ6.bnd(() => mM9.bnd(score2) 
                         .bnd(next,3,mMZ7));
               mMZ7.bnd(() => mM13.bnd(winner));               
    O.mM3.bnd(x => mM7
                 .ret(calc(x[0], O.mM8.x, x[1]))
                 .bnd(next, 18, mMZ4)  
                 .bnd(next, 20, mMZ2) // Releases mMZ2 (above)
                 .bnd(() => O.mM$1.bnd(push, O.mM7.x, mM$1)
                 .bnd(() => mM3
                 .ret([])
                 .bnd(() => mM4
                 .ret(0).bnd(mM8.ret)
                 .bnd(cleanup)
                 ))))
  }
  `  ),
        h('p', ' The "mMZ" prefix designates instances of MonadIter. Their bnd() method holds functions which execute if and when the release() method is called. The next() function releases a specified MonadIter instance when the calling monad\'s value matches the specified value. next2() releases the specified monad when the specified condition returns true. This syntactic sugar for callbacks provides much the same functionality as Ecmascript 2015 iterators, promises, and generators, as was demonstated in earlier installments of this series. Here are the definitions of next() and next2(): ' ),
        code.next,

        h('h2', 'The Todo List  ' ),
        h('p', 'Just as mM$1 is the key to understanding the flow of the game, mM$task is the key to understanding the Todo application. The first thing to note is that every time mM$task.ret() is executed, mM$task.stream triggers the construction of an updated virtual Todo list which is sent to the websockets server. Here is the code: ' ),
        code.taskStream,
        h('p', ' Messages from the server are received and parsed as follows: ' ), 
        code.messages,
        h('p', 'As explained in an earlier installment, "messages" is like a switch block. When a message with the CF#$42 prefix comes in, the code in mMZ15 runs. This causes the task contained in the message to be added to the todo list. That task originated from a a browser input field and was processed in the following manner:    ' ),
        code.newTask,
        h('p', 'In the websockets message, false, yellow, and none correspond to checked, color, and text-decoration. e.target.value is the comma-separated author, responsible person, and task. The six task parameters are transmitted to and received from the server in strings prefixed by "CF#$42". '     ),  
        h('p', ' Clicking "Delete" invokes:' ),  
        code.deleteTask,  
        h('p','The "CQ#$42" prefixed message carries the todo list index of the task being removed to the server, and the server broadcasts the information to all group members. In "message", the following code is run:' ),  
        code.deleteTask2,
        h('p', 'After the todo list is spliced, the worker monad, mM$task, captures the updated list information causing mM$task.stream to trigger a DOM update in taskAction$, as shown above.  '  ),  
        h('h3', 'Joining A Group'    ),  
        h('p', 'The interaction of group membership and the displayed todo list is somewhat complex. When someone logs in and enters text in Group input field for the first time, the todo list for that group, if it exists, is immediately displayed. If someone has a todo displayed and enters the name of another group, the todo display shows that groups todo list or else goes blank. This is the first thing that happens when a group name is entered in the input field:    '     ),  
        h('pre',  `  const groupPress$ = sources.DOM
    .select('input#group').events('keypress');

  const groupPressAction$ = groupPress$.map(e => {
    let v = e.target.value;
    if( e.keyCode == 13 ) {
      mMgroup.ret(e.target.value);
      socket.send('CO#$42,' + e.target.value + ',' + O.mMname.x.trim() + ',' + e.target.value);
      socket.send('DD#$42,' + e.target.value + ',' + O.mMname.x.trim() + ',nothing');
    }
  });  `  ),
        h('p', 'The "DD#$42" prefixed message prompts the server to fetch and transmit the todo list corresponding to the group name, if such a list exists.  Receiving a "DD#$42" prefixed message prompts message(O.mMar.x) to execute. message is defined as follows:  '   ),  
        code.process,
        h('p', ),  
        h('p', ),  
