
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

