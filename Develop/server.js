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




app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
