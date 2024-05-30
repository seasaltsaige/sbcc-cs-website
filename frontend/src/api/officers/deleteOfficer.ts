import { axios } from "../";


export async function deleteOfficer(_id: string, auth: string) {
  return await axios.delete(`/officers/${_id}`, { headers: { Authorization: auth } });
}