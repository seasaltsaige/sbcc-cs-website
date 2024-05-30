import { axios } from "../";

export async function getCurrentOfficers(auth?: string) {
  return await axios.get(`/officers/current`, { headers: { Authorization: auth } });
}