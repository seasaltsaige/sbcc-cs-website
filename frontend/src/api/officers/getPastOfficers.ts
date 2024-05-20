import axios from "axios";

const URL = process.env.REACT_APP_URL;

export async function getPastOfficers(auth?: string) {
  return await axios.get(`${URL}/officers/past`, { headers: { Authorization: auth } });
}