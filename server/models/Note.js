const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let NoteModel = {};

// mongoose.Types.ObjectID is a function that
// converts string ID to real mongo ID
const convertId = mongoose.Types.ObjectId;
const setTitle = (title) => _.escape(title).trim();

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    set: setTitle,
  },
  note: {
    type: String,
    required: true,
    trim: true,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  createdData: {
    type: Date,
    default: Date.now,
  },
});

NoteSchema.statics.toAPI = (doc) => ({
  title: doc.title,
  note: doc.note,
});

NoteSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return NoteModel.find(search).select('title note').exec(callback);
};

NoteModel = mongoose.model('Note', NoteSchema);

module.exports.NoteModel = NoteModel;
module.exports.NoteSchema = NoteSchema;
