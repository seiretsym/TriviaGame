import express from "express";
import scores from "./scores";
import songs from "./songs";

const router = express.Router();

// routes to db tables
router.use("/scores", scores);
router.use("/songs", songs);

export = router;