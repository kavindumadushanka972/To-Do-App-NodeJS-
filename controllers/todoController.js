var bodyParser = require('body-parser') //to access to the req.body data
var mongoose = require('mongoose'); //to interract with database

//Connect to the database
mongoose.connect('mongodb+srv://Kavindu:<password>@cluster0.0hfpe.mongodb.net/<dbname>?retryWrites=true&w=majority'); //connect to the database 

//Create a schema -> this is like a blueprint
var todoSchema = new mongoose.Schema({
    item: String
});

//Model type
var Todo = mongoose.model('Todo', todoSchema);

//some dummy data here passing as a array to display as todos list
//var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}]; 

var urlencodedParser = bodyParser.urlencoded({extended: false});
module.exports = function(app){

    app.get('/todo', function(req, res){
        //get Data from MongoDB and pass it to view
        Todo.find({}, function(err, data){
            if(err) throw err;
            res.render('todo', {todos: data}); //sending data to the view
        }); //retireve all the items in the collection, to specify a special item replace inside empty {} with {item: 'get milk}
         
    });

    // this function will fire on a post method to the url '/todo'
    app.post('/todo', urlencodedParser, function(req, res){
        //get data from the view and add it to MongoDB
        Todo(req.body).save(function(err, data){
            if(err) throw err;
            res.json(data)
        });
        //data.push(req.body); //push data to the array(request is coming from POST method in todo-list.ja file)
        //res.json({item:data}); //send data back to the fromt end(to the todo-list.js file)
    });

    //this method will fire when url is '/todo/:item (coming from todo-list.js)
    app.delete('/todo/:item', function(req, res){ 
        //delete the requested item from MongoDB
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).deleteOne(function(err, data){
            if(err) throw err;
            res.json(data);
        });
        //data = data.filter(function(todo){ //iterate though array 'data' if return value is 'false' the value will be deleted
        // //getting every item in the array and replace all the spaces with '-'s and compare with the reqest value
        // //request value is coming from todo-list.js and it is also replaced spaces with '-'s
        // //if both values are same will return true and if both values are same will return false     
        // return todo.item.replace(/ /g, '-') !== req.params.item;
        //});
        //res.json(data);
    });
}