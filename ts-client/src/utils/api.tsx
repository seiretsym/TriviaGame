import axios from "axios";

export default {
  // Gets all products
  loadSongs: function () {
    return axios.get("/api/songs");
  },
  saveScore: function (data) {
    return axios.post("/api/scores", data)
  },
  getScores: function () {
    return axios.get("/api/scores")
  }
}