import { axios } from "../";
import { Candidate } from "../../types/Candidate.type";

export async function updateCandidate(candidate: Candidate, auth: string) {

  const data = {
    name: candidate.name,
    image: typeof candidate.image === "string" ? null : candidate.image,
    statement: candidate.statement,
    position: candidate.position,
  }
  console.log(data);
  return await axios.patch(`/candidate/${candidate._id}`, data, {
    headers: {
      Authorization: auth,
      "Content-Type": "multipart/form-data",
    }
  })
}