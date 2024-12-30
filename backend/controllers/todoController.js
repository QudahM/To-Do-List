const Todo = require('../models/todo');

const getTodos = async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
};

const createTodo = async (req, res) => {
    try {
        const { task, completed = false, isEditing = false } = req.body;
        
        if (!task) {
            return res.status(400).json({ message: "Task field is required" });
        }

        const newTodo = await Todo.create({ task, completed, isEditing });
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateTodo = async (req, res) => {
    const { id } = req.params;
    const { task, completed, isEditing } = req.body;

    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            { task, completed, isEditing },
            { new: true }
        );
        res.json(updatedTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


const deleteTodo = async (req, res) => {
    const { id } = req.params;
    try {
        await Todo.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete the task', error });
    }
};


module.exports = { getTodos, createTodo, updateTodo, deleteTodo };