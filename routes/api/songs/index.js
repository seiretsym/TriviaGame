const router = require("express").Router();
const songController = require("../../controllers/songController");

// Matches with "api/scores"
router.route("/")
  .get(songController.getAll);

module.exports = router;
