import axios from "axios";

export default {
  // Gets all products
  loadSongs: function () {
    return axios.get("/api/songs");
  }
}