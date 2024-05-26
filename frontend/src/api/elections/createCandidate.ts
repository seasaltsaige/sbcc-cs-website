import { axios } from "../";
import { Candidate } from "../../types/Candidate.type";

export async function createCandidate(candidate: Candidate, auth: string) {

  return await axios.post(`/candidate/create`, {}, {
    headers: {
      Authorization: auth,
      "Content-Type": "multipart/form-data",
    },
  });
}