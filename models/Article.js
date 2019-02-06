const mongoose = require('mongoose');

// Save a reference to the Schema constructor
const {
  Schema,
} = mongoose;

// Using the Schema constructor, create a new UserSchema object
// I've decided to make the URL the unique index to prevent duplicates.
const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
  },
  scrapeTime: {
    type: Date,
    default: Date.now,
  },
  // `note` is an object that stores a Note id
  // The ref property links the ObjectId to the Note model
  // This allows us to populate the Article with an associated Note
  note: {
    type: Schema.Types.ObjectId,
    ref: 'Note',
  },
});

// This creates our model from the above schema, using mongoose's model method
const Article = mongoose.model('Article', ArticleSchema);

// Export the Article model
module.exports = Article;
