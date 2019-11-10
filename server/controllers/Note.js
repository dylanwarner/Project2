const models = require('../models');

const Note = models.Note;

const makerPage = (req, res) => {
  Note.NoteModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), notes: docs });
  });
};

const makeNote = (req, res) => {
  if (!req.body.title || !req.body.note) {
    return res.status(400).json({ error: 'Both title and note are required.' });
  }

  const noteData = {
    title: req.body.title,
    note: req.body.note,
    owner: req.session.account._id,
  };

  const newNote = new Note.NoteModel(noteData);

  const notePromise = newNote.save();

  notePromise.then(() => res.json({ redirect: '/maker' }));

  notePromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Note already exists.' });
    }

    return res.status(400).json({ error: 'An error occurred.' });
  });

  return notePromise;
};

const getNotes = (request, response) => {
  const req = request;
  const res = response;

  return Note.NoteModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred.' });
    }

    return res.json({ notes: docs });
  });
};

module.exports.makerPage = makerPage;
module.exports.getNotes = getNotes;
module.exports.make = makeNote;
