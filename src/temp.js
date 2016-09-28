
    var updateMessages = function updateMessages(e) {
      console.log('8888888888888888888888888In updateMessages ar is >>>>>>>>>>>>>>', ar);
      var ar = e.split(',');
      var sender = ar[2];
      var ar2 = ar(sliceM, 3);
      var str = ar2.join(',');
      messagesMonad.run(h('div', sender + ': ' + str))
      console.log('99999999999999999999999In updateMessages mMmsg is ', mMmsg);
    };


        h('div#taskList', 'How about that?' ),
        h('span.task3', `{ style: { color: ${newTask.color}, textDecoration: ${newTask.textDecoration} } }, 'Task: ' + ${newTask.task}`),
        h('br'),
        h('button#edit1', 'Edit'),
        h('input#edit2', `{ props: { type: textarea, value: ${newTask.task}}}`),
        h('span#author.tao', `Author: ${newTask.author}  /  Responsibility: ${newTask.responsible}`),
        h('br'),
        h('input#cb', `{ props: { type: 'checkbox', checked: ${newTask.checked }}}, 
               {style: { color: ${newTask.color}, textDecoration: ${newTask.textDecoration}}}` ),
        h('label.cbox',   { props: { for: '#cb' } }, 'Completed'   ),
        h('button.delete', 'Delete'),
        h('br'),
