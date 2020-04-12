// dependencies
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

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
mongoose.connect(process.env.MONGODB_URI || "mongodb://heroku_nj2r9glq:tlvm9tml0oal0ub835uc4hbnj@ds015942.mlab.com:15942/heroku_nj2r9glq");

// start server
app.listen(PORT, () => console.log("Server listening on port: " + PORT))