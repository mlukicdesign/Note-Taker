// Dependencies
const express = require('express');
const api = require('./routes/api')
const htmlroute = require('./routes/htmlroute')

const PORT = process.env.PORT || 3001;



const app = express();

// // Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON data
app.use(express.json());
app.use(express.static("public"));
app.use(htmlroute);
app.use(api)


// Server
app.listen(PORT, () =>
console.log(`App is running at http://localhost:${PORT}`)
);

