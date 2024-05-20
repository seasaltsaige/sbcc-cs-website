import axios from "axios";

const URL = process.env.REACT_APP_URL;
export async function registerAdmin(username: string, password: string) {
  return await axios.post(`${URL}/auth/admin`, {
    username,
    password,
  });
}