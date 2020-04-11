const router = require("express").Router();
const scores = require("./scores");


// Score routes
router.use("/scores", scores);

module.exports = router;