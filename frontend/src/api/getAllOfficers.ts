import axios from "axios";

const URL = "http://localhost:3002";

export default async function getAllOfficers(auth?: string) {
  return await axios.get(`${URL}/officers/all`, { headers: { Authorization: auth } });
}