import axios from "axios";

const URL = "http://localhost:3002";
export async function registerAdmin(username: string, password: string) {
  return await axios.post(`${URL}/auth/admin`, {
    username,
    password,
  });
}