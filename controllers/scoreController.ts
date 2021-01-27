import * as db from "../models";
import express from "express";

function addScore(req: express.Request, res: express.Response) {
  db.Score
    .create(req.body)
    .then(() => res.status(200).end())
    .catch((err: Error) => res.status(503).json(err));
}
  
  
function getAll(req: express.Request, res: express.Response) {
  db.Score
    .find()
    .sort({ score: -1 })
    .then((scores: object) => res.status(200).json(scores))
    .catch((err: Error) => res.status(503).json(err));
}

export { addScore, getAll }