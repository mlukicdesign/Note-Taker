const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");


const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');



// Get Route for retrievign notes from DB

router.get('/api/notes', async (req, res) => {
  const notesData = await JSON.parse(fs.readFileSync("db/db.json","utf8"));
  res.json(notesData);
});




// Post for adding and storing new notes with unique ID

router.post('/api/notes', (req, res) => {
 
const { title, text, } = req.body

if (req.body) {
  const newNote = {
    title,
    text,
    id: uuidv4(),
  };
  
  readAndAppend(newNote, 'db/db.json');
  res.json('note added succesfully 🚀')
} else {
  res.errored('An Error has occured');
}
});


router.delete('/api/notes/:id', (req, res) => {
  const noteId = req.params.id;
  readFromFile('db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.id !== noteId);
      const jsonData = JSON.stringify(result);

      // Save the JSON data to the filesystem
      fs.writeFile('db/db.json', jsonData, (err) => {
        if (err) {
          res.status(500).send('Internal Server Error');
          return;
        }
        // Respond to the DELETE request
        res.json(`Item ${noteId} has been deleted`);
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});




module.exports = router;

