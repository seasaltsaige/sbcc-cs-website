import { axios } from "../..";
export async function getElection() {
  return await axios.get("/elections");
}