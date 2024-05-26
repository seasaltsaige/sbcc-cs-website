import { axios } from "../";
import { Candidate } from "../../types/Candidate.type";

export async function updateCandidate(candidate: Candidate, auth: string) {
  return await axios.patch("");
}