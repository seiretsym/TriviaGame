var mongoose = require("mongoose");

// schema structure
var Schema = mongoose.Schema

// create schema
var SongSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
})

// create model
var Song = mongoose.model("Song", SongSchema);

// export model
module.exports = Song;