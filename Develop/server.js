const express = require('express');
const path = require('path');
const notes = require('./db/db.json');
const fs = require('fs');
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());

app.use(express.static('public'));

// GET Route for home page
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
    res.json(notes)
});

// POST request
app.post('/api/notes', (req, res) => {
    notes.push(req.body);
    fs.writeFile('./db/db.json', JSON.stringify(notes), err => {
        if (err) {
            console.error(err);
        }
    });
    res.send(notes)
});

app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    let deleteNote = notes.find(note => note.id == id);
    let deleteIndex = notes.indexOf(deleteNote);
    notes.splice(deleteIndex, 1);
    fs.writeFile('./db/db.json', JSON.stringify(notes), err => {
        if (err) {
            console.error(err);
        }
    });
    res.send(deleteNote);
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
