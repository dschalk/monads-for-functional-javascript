

Groups and the todo application.

Join a group ->

CF#$42 -> mMZ15 -> generic task object ->
  O.mMar.bnd(sliceFront, 8, mMar)
  ob.task = O.mMar.x
  O.mM$task.bnd(unshift, ob, mM$task)

mM$task is the worker in the task application. 
taskAction$ = mM$task.stream.map(ar => {
  Pushes a Snabbdom task description into mMtaskList.x
    var tasks = (ar.map(stringify)).toString();
    socket.send('TD#$42,' + ... tasks)






