import axios from "axios";

const instance = axios.create({
  baseURL: "https://moviesapi.codingfront.dev/api/v1/",
});
export default instance;
