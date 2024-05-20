import axios from "axios";
const URL = process.env.REACT_APP_URL;

export async function checkAdmin() {
  return await axios.get(`${URL}/auth/admin`);
}