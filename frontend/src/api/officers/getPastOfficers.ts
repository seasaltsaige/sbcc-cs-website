import { axios } from "../";

export async function getPastOfficers(auth?: string) {
  return await axios.get(`/officers/past`, { headers: { Authorization: auth } });
}