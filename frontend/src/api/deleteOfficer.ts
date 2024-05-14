import axios from "axios";

const URL = "http://localhost:3002";

export async function deleteOfficer(_id: string, auth: string) {
  return await axios.delete(`${URL}/officers/${_id}`, { headers: { Authorization: auth } });
}