const express = require('express');
const db = require('./database');
const app = express();

const PORT = 3000;
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/tasks', (req, res) => {
    db.all("SELECT * FROM tasks", [], (err, rows) => {
        if (err) {
            throw err;
        }
        const taskItems = rows.map(row => `<li>${row.task}</li>`).join('');
        res.send(taskItems);
    });
});

app.post('/add-task', (req, res) => {
    const task = req.body.task;
    db.run("INSERT INTO tasks (task) VALUES (?)", [task], (err) => {
        if (err) {
            return res.status(500).send("Failed adding task");
        }
        // Send back the updated task list
        db.all("SELECT * FROM tasks", [], (err, rows) => {
            if (err) {
                return res.status(500).send("Failed fetching tasks");
            }
            const taskItems = rows.map(row => `<li>${row.task}</li>`).join('');
            res.send(taskItems);
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

