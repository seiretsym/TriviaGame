import express from "express";
import * as songController from "../../../controllers/songController";

const router = express.Router();

// Matches with "api/songs"
router.route("/")
  .get(songController.getAll);

export = router;
