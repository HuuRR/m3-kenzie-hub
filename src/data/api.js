import axios from "axios";

const Api = axios.create({
  baseURL: "https://kenziehub.herokuapp.com",
  timeout: 15000,
});

export default Api;
