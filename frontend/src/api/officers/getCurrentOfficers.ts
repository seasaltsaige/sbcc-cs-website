import axios from "axios";

const URL = process.env.REACT_APP_URL;

export async function getCurrentOfficers(auth?: string) {
  return await axios.get(`${URL}/officers/current`, { headers: { Authorization: auth } });
}