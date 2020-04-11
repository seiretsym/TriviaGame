const router = require("express").Router();
const scoreController = require("../../../controllers/scoreController");

// Matches with "api/scores"
router.route("/")
  .post(scoreController.addScore);

router.route("/all")
  .get(scoreController.getAll);

module.exports = router;