import axios from "axios";
const URL = process.env.REACT_APP_URL;

export async function deleteEvent(_id: string, auth: string) {
  return await axios.delete(`${URL}/events/upcoming/${_id}`, {
    headers: {
      Authorization: auth,
    },
  });
}