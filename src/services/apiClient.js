import axios from "axios";

export default axios.create({
  baseURL: "https://notes-api.dicoding.dev/v1",
});