const router = require("express").Router();
const scores = require("./scores");
const songs = require("./songs");

// routes to db tables
router.use("/scores", scores);
router.use("/songs", songs);

module.exports = router;