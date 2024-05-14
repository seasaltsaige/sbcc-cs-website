import axios from "axios";

const URL = "http://localhost:3002";

export async function getPastOfficers(auth?: string) {
  return await axios.get(`${URL}/officers/past`, { headers: { Authorization: auth } });
}