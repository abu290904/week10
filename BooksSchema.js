let mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    booktitle: { type: String, required: true },
    PubYear: Number,
    author: String,
    Topic: String,
    formate: String // Either "Electronic" or "Hard Copy"
});

module.exports = mongoose.model('bookmodel', BookSchema, 'BookCollection');
