import axios from "axios";

const URL = "http://192.168.0.201:3002";
export default async function registerAdmin(username: string, password: string) {
  return await axios.post(`${URL}/auth/admin`, {
    username,
    password,
  });
}