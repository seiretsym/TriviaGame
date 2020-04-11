var mongoose = require("mongoose");

// schema structure
var Schema = mongoose.Schema

// create schema
var ScoreSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
})

// create model
var Score = mongoose.model("Score", ScoreSchema);

// export model
module.exports = Score;