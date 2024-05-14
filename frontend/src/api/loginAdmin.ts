import axios from "axios";
const URL = "http://localhost:3002";
export async function loginAdmin(username: string, password: string) {
  return await axios.post(`${URL}/auth/login`, {
    username,
    password,
  });
}