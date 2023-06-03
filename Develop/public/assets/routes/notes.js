const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const path = require('path')
const notesPath = path.join(__dirname, '..', 'db', 'db.json');

// Get Route for retrievign notes from DB

notes.get('/notes', (req, res) => {
    readFromFile(notesPath).then(content => {
    res.json(JSON.parse(content) || []);
     })
});



module.exports = notes;

