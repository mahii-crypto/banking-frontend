import axios from "axios";

const API = axios.create({
  baseURL: "https://banking-system-api-ntid.onrender.com/api/accounts/",
});

export default API;