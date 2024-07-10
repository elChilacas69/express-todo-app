const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/todo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const todoSchema = new mongoose.Schema({
    task: String,
    completed: Boolean,
});

const Todo = mongoose.model('Todo', todoSchema);

app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

app.post('/todos', async (req, res) => {
    const todo = new Todo({
        task: req.body.task,
        completed: req.body.completed,
    });
    await todo.save();
    res.json(todo);
});

app.put('/todos/:id', async (req, res) => {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.json(todo);
});

app.delete('/todos/:id', async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
