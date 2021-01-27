// dependencies
import express from "express";
import mongoose from "mongoose";
import routes from "./routes";

// server config
const app = express();
const PORT = process.env.PORT || 3377;

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// for heroku
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// routes
app.use(routes);

// connect to mongo~
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/triviagame");

// start server
app.listen(PORT, () => console.log("Server listening on port: " + PORT))