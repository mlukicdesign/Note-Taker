const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
// const path = require('path');

// Get Route for retrievign notes from DB
router.get('/api/notes', async (req, res) => {
  const notesData = await JSON.parse(fs.readFileSync("db/db.json","utf8"));
  res.json(notesData);
});



router.post('/api/notes', (req, res) => {
  const notesData = JSON.parse(fs.readFileSync("db/db.json","utf8"));
  const newNote = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv4(),
  };
  notesData.push(newNote);
  fs.writeFileSync("db/db,json",JSON.stringify(notesData));
  res.json(notesData)
});

module.exports = router;
