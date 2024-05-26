import { axios } from "../";

export async function deleteEvent(_id: string, auth: string) {
  return await axios.delete(`/events/upcoming/${_id}`, {
    headers: {
      Authorization: auth,
    },
  });
}