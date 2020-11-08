$(document).ready(function(){

  // on a submit event in todo.ejs, this function is going to fire and get the value in the input box
  // and make it as same as structure in our list and pass it to the url named '/todo'
  $('form').on('submit', function(){ 

      var item = $('form input');
      var todo = {item: item.val()};

      $.ajax({
        type: 'POST',
        url: '/todo',
        data: todo,
        success: function(data){ //after successfully added to the list, page will be reloaded here(data to be roladed 
          //will coming from back end in the post method in todoController.js)
          //do something with the data via front-end framework
          location.reload();
        }
      });

      return false;

  });

  //on a click event on a list this method will fire
  $('li').on('click', function(){
      var item = $(this).text().replace(/ /g, "-"); // getting item replacing all the spaces with - (eg: make bed -> make-bed)
      $.ajax({
        type: 'DELETE',
        url: '/todo/' + item, //passing to /todo url with the item
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
  });

});
