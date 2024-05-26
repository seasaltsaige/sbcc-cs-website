import { axios } from "../";
export async function getAllCandidates() {
  return await axios.get("/candidate/all");
}