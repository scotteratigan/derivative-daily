const mongoose = require('mongoose');

const {
  Schema,
} = mongoose;

const NoteSchema = new Schema({
  body: String,
});

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;
