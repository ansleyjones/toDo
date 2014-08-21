$(document).ready(function(){

    myTodo.init();

});

var myTodo = {
  init: function(){
    this.initStyling();
    this.initEvents();
  },
  initStyling: function(){
    myTodo.getTodo();
  },
  initEvents: function(){

    $("form").on("submit", function(event){
      event.preventDefault();
      var newItem = {
        item: $(".listItem").val(),
        active: true
      };

      myTodo.createTodo(newItem);
      $(".listItem").val('');
    });
    $(".container").on("dblclick",".textItem", function(event){
      event.preventDefault();
      $(this).parent('p').find(".ex").toggleClass("hide");
      $(this).parent('p').closest('article').find("form").toggleClass("hidden");
      console.log('yay');

    });
    $(".container").on("click",".ex", function(event){
      event.preventDefault();
      var todoId = $(this).parent('p').closest('article').data("todoid");
      console.log(todoId);
      myTodo.deleteTodo(todoId);

    });
    $(".container").on("click",".check", function(event){
      event.preventDefault();
      console.log("here");
      var todoId = $(this).parent('p').closest('article').data("todoid");
      var updatedPost = {
        active: false
      }
      $(this).find(".fa").addClass("green");
      $(this).parent('p').find("span").addClass("strike");
      $(this).parent('p').parent("article").removeClass("active").addClass("done");


      var numAct = todoItems.length;
      for(var i = 0; i<todoItems.length;i++){
        if(todoItems[i].active === 'false'){
          numAct = numAct - 1;
        }
      }
      var textPl = "";
        if(numAct == 0 || numAct > 1){
          textPl = " items left";
        }else if(numAct == 1){
          textPl = " item left";
        }
      var bottomCount = numAct + textPl;
      console.log(bottomCount);


      // myTodo.renderCount($(".countBox"));
      myTodo.updateTodo(todoId, updatedPost);

    });
    $(".container").on("click", ".editSubmit", function(event){
      event.preventDefault();
      console.log('youre here');
      var todoId = $(this).parent('form').parent('article').data("todoid");
      var updatedPost = {
        item: $(this).parent('form').find(".listEdit").val()
      }
      myTodo.updateTodo2(todoId, updatedPost);
    });
    $(".tabNav").on("click", ".all", function(event){
      event.preventDefault();
      $(".done").removeClass("hideThis");
      $(".active").removeClass("hideThis");

    });
    $(".tabNav").on("click", ".complete", function(event){
      event.preventDefault();
      $(".done").removeClass("hideThis");
      $(".active").addClass("hideThis");

    });
    $(".tabNav").on("click", ".incomplete", function(event){
      event.preventDefault();
      $(".done").addClass("hideThis");
      $(".active").removeClass("hideThis");
    });

    $(".tabNav").on("click", ".clear", function(event){
      for (var i = 0; i < todoItems.length; i++) {
        if (todoItems[i].active === 'false') {
          var todoId = todoItems[i]._id;
          myTodo.deleteTodo(todoId);
        }
      }
    });
  },


  render: function(template, data, $target){
    var tdList = _.template(template, data);
    $target.html(tdList);
  },
  // renderCount: function($target){
  //   myTodo.render($('.countBox').html(), myCounter, $target);
  // },

  url: 'http://tiy-fee-rest.herokuapp.com/collections/ansley',

  getTodo: function(){
    $.ajax({
      url: myTodo.url,
      type: 'GET',
      success: function(response){
        var todoItems = window.todoItems = response;
        myTodo.render(todoTmpl, todoItems, $('.inputArea'))
      }
    });

  },

  createTodo: function(newItem){
    $.ajax({
      url: myTodo.url,
      data: newItem,
      type: 'POST',
      success: function(response){
        myTodo.getTodo();
      }
    });

  },

  deleteTodo: function(todoId){
    $.ajax({
      url: myTodo.url + "/" + todoId,
      type: 'DELETE',
      success: function(){
        myTodo.getTodo();
      }
    });

  },

  updateTodo: function(todoId, updatedItem){
    $.ajax({
      url: myTodo.url + "/" + todoId,
      type: 'PUT',
      data: updatedItem,
      success: function(response){

      }
    });
  },

  updateTodo2: function(todoId, updatedItem){
    $.ajax({
      url: myTodo.url + "/" + todoId,
      type: 'PUT',
      data: updatedItem,
      success: function(response){
        myTodo.getTodo();
      }
    });
  }


}
