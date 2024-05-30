import { axios } from "../..";
export async function deleteElection(_id: string, auth: string) {
  return await axios.delete(`/elections/${_id}`, {
    headers: {
      Authorization: auth,
    },
  });
}