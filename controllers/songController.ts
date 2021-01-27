import * as db from "../models";
import express from "express";


function getAll(req: express.Request, res: express.Response) {
  db.Song
    .find()
    .select("-_id -__v")
    .then(songs => res.status(200).json(songs))
    .catch(err => res.status(503).json(err));
}

export { getAll };