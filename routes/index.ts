import path from "path";
import express from "express";
import api from "./api";

const router = express.Router();

// api routes
router.use("/api", api)

// send react app
if (process.env.NODE_ENV === "production") {
    router.use(function (req, res) {
        res.sendFile(path.join(__dirname, "../client/build/index.html"))
    })
}

export = router;