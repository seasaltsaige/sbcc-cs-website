import axios from "axios";

const URL = process.env.REACT_APP_URL;

export async function deleteOfficer(_id: string, auth: string) {
  return await axios.delete(`${URL}/officers/${_id}`, { headers: { Authorization: auth } });
}