import axios from "axios";
const URL = "http://192.168.0.201:3002";

export default async function checkAdmin() {
  return await axios.get(`${URL}/auth/admin`);
}