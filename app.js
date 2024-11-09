
const express = require('express');
const app = express();
//const todoRoutes = require('./routes/todo.js');
const todoRoutes = require('./routes/tododb.js');
require('dotenv').config();
const port = process.env.PORT;
const db = require('./database/db');
const expressLayouts = require('express-ejs-layouts')
app.use(expressLayouts);


app.use(express.json());
app.use('/todos',todoRoutes);

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index',{layout:'layouts/main-layout'});
});

app.get('/contact', (req, res) => {
    res.render('contact',{layout:'layouts/main-layout'});
});

app.get('/todo-view', (req, res) => {
    db.query('SELECT * FROM todos', (err, todos) => {
        if (err) return res.status(500).send('Internal Server Error');
        res.render('todo', {
            layout: 'layouts/main-layout',
            todos: todos
        });
    });
});

app.use((req, res) =>
{res.status(404). send(`404 - Halaman Tidak Ditemukan`)}
)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});