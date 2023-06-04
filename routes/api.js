const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

// Get Route for retrievign notes from DB

router.get("/api/notes", (req, res) => {
  // Read the db.json file
  fs.readFile(path.join(__dirname, "db/db.json"), "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to read notes data." });
    }

    // Parse the JSON data
    const notes = JSON.parse(data);

    // Return the notes as JSON
    res.json(notes);
  });
});

// Route to save a new note
router.post("api/notes", (req, res) => {
  // Read the db.json file
  fs.readFile(path.join(__dirname, "db/db.json"), "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to read notes data." });
    }

    // Parse the JSON data
    const notes = JSON.parse(data);

    // Generate a unique ID for the new note
    const newNote = {
      id: uuidv4(),
      ...req.body,
    };

    notes.push(newNote);

    fs.writefile(
      path.join(__dirname, "db/db.json"),
      JSON.stringify(notes),
      (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Failed to save the note. " });
        }

        res.json(newNote);
      }
    );
  });
});

module.exports = router;
