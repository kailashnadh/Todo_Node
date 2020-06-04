var express = require('express');
var router = express.Router();
// var jwt = require('express-jwt');
// var auth = jwt({
//   secret: process.env.JWT_SECRET,
//   userProperty: 'payload'
// });
const todoController = require('../controllers/todo');
//movies
router.get('/todos', todoController.getTodo);
router.post('/todos',todoController.createTodo);
router.get('/todos/:todoId', todoController.getSingleTodo);
router.put('/todos/:todoId',todoController.updateTodo);
router.delete('/todos/:todoId',todoController.deleteTodo);
// router.post('/movies/register', ctrlAuth.register);
// router.post('/movies/login', ctrlAuth.login);


module.exports = router;