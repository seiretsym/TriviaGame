import express from "express";
import * as scoreController from "../../../controllers/scoreController";

const router = express.Router();

// Matches with "api/scores"
router.route("/")
  .post(scoreController.addScore)
  .get(scoreController.getAll);

export = router;
