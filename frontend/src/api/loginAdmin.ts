import axios from "axios";
const URL = "http://192.168.0.201:3002";
export default async function loginAdmin(username: string, password: string) {
  return await axios.post(`${URL}/auth/login`, {
    username,
    password,
  });
}