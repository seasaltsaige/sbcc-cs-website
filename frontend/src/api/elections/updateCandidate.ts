import { axios } from "../";
import { Candidate } from "../../types/Candidate.type";

export async function updateCandidate(candidate: Candidate, auth: string) {

  const data = {
    name: candidate.name,
    _id: candidate._id,
    image: typeof candidate.image === "string" ? null : candidate.image,
    statement: candidate.statement,
    position: candidate.position,
  }

  return await axios.patch(`/candidate/${candidate._id}`, data, {
    headers: {
      Authorization: auth,
    }
  })
}