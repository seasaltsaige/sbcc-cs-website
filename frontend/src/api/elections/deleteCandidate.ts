import { axios } from "../";

export async function deleteCandidate(_id: string, auth: string) {
  return await axios.delete(`/candidate/${_id}`, {
    headers: {
      Authorization: auth,
    },
  });
}