const db = require("../models");

// Defining methods for the scoreController
module.exports = {
  // add score to database
  addScore: function (req, res) {
    db.Score
      .create(req.body)
      .then(() => res.status(200).end())
      .catch(err => res.status(503).json(err));
  },
  getWeekly: function (req, res) {
    console.log(Date.now());
  },
  getAll: function (req, res) {
    db.Score
      .find()
      .then(scores => res.status(200).json(scores))
      .catch(err => res.status(503).json(err));
  }
};
