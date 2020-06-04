const mongoose = require('mongoose');
const Todo = mongoose.model('todo');

const getTodo = function (req, res){
    Todo.find().exec(function(err, tododata){
	 if(err){
		 res
		 .status(404)
		 .json({err});
         
	 return;
	 }
	 res
		 .status(200)
		 .json(tododata);
  })

};



const createTodo = function (req, res){
       console.log("in create todo")
  Todo.create({
        username: req.body.username,
        description: req.body.description,
        targetDate: req.body.targetDate,
        isDone: req.body.isDone
    }, (err, tododata) => {
        if (err) {
			res
            .status(400)
			.json(err);
        } 
        else {
            res
			.status(201)
			.json(tododata);
        } 
  });
};

const getSingleTodo = function (req, res){
  Todo
	  .findById(req.params.todoId)
        .exec((err, tododata) => {
        if (!tododata) {
            return res
                .status(404)
                .json({"message": "Todo not found"});
        } 
        else if (err) {
            return res
                .status(404)
                .json(err);
        }
        res
            .status(200)
            .json(tododata);
    });
};

const updateTodo = function (req, res){
  if (!req.params.todoId) {
        res
        .status(404)
        .json({
           "message" : "Not found, todo id is required"
        });
    return;
    }
    Todo.findById(req.params.todoId)
    .exec((err, tododata) => {
       if (!tododata) {
           res
        .json(404)
        .status({
              "message" : "todoid not found"});
        return;
       } else if(err){
           res
           .status(400)
           .json(err);
           return;
       }
       tododata.username= req.body.username,
       tododata.description= req.body.description,
       tododata.targetDate= req.body.targetDate,
       tododata.isDone= req.body.isDone
       tododata.save((err, tododata) => {
            if(err){
                res
                .status(404)
                .json(err);
            } else {
                res
                .status(200)
                .json(tododata);
            }
        });
    }); 
};

const deleteTodo = function (req, res){
  const todoid = req.params.todoId;
  console.log("in delete api");
    
    if (todoid) {
        Todo
        .findByIdAndRemove (todoid)
        .exec((err, tododata) => {
           if(err){
               res
               .status(404)
               .json(err);
            return;
           }
    res
		.status(204)
		.json(null);
        });
    } else {
        res
        .status(404)
        .json({"message" : "No todoid"});
}};

module.exports = {
    getTodo,
    createTodo,
    getSingleTodo,
    updateTodo,
    deleteTodo
};