const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let NoteSchema = new Schema({

    author: String,

    title: String,

    commentSection: String

})

let Note = mongoose.model("Note", NoteSchema);

module.exports = Note