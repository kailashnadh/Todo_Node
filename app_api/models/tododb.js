const mongoose = require('mongoose');

var todoSchema = new mongoose.Schema({
    description: String,
    targetDate: Date,
    isDone: String,
});


mongoose.model('todo', todoSchema, 'todo');