import axios from "axios";
const URL = "http://localhost:3002";

export async function checkAdmin() {
  return await axios.get(`${URL}/auth/admin`);
}