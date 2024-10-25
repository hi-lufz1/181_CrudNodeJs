const express = require('express');

const router = express.Router();

let todos = [
    {
id :1, task : 'Belajar Node.Js', completed: false    
},
{
id :2, task : 'Membuat API', completed: false  
},
];

// GET /api/todos
router.get('/', (req, res) => {res.json(todos); });

// POST /api/todos - Menambahkan todo baru
router.post('/', (req, res) => 
    {const newTodo = {
        id : todos.length + 1, 
        task : req.body.task, 
        completed : false

    }
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// PUT /api/todos/:id - Memperbarui todo berdasarkan id
router.put('/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const { task, completed } = req.body;

    // Mencari todo berdasarkan id
    const todo = todos.find(t => t.id === todoId);

    if (todo) {
        // Memperbarui task dan completed jika diberikan
        if (task !== undefined) {
            todo.task = task;
        }
        if (completed !== undefined) {
            todo.completed = completed;
        }
        res.json(todo);
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
});

// DELETE /api/todos/:id - Menghapus todo berdasarkan id
router.delete('/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const index = todos.findIndex(t => t.id === todoId);

    if (index !== -1) {
        const deletedTodo = todos.splice(index, 1); // Menghapus todo
        res.json(deletedTodo[0]); // Mengembalikan todo yang dihapus
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
});

module.exports = router;
