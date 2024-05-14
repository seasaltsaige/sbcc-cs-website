import axios from "axios";

const URL = "http://localhost:3002";

export async function getCurrentOfficers(auth?: string) {
  return await axios.get(`${URL}/officers/current`, { headers: { Authorization: auth } });
}