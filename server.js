// Dependencies
const express = require('express');

const path = require('path');
const PORT = 3001;

const api = require('./Develop/public/assets/routes/notes.js');




const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', api);


// Set static folder
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static('public'));



// GET Route for notes

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'notes.html'));
  });


app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});


// Server
app.listen(PORT, () =>
console.log(`App is running at http://localhost:${PORT}`)
);

