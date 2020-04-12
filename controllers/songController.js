const db = require("../models");

// Defining methods for the songController
module.exports = {
  // get all songs from database
  getAll: function (req, res) {
    db.Song
      .find()
      .select("-_id -__v")
      .then(songs => res.status(200).json(songs))
      .catch(err => res.status(503).json(err));
  }
};
