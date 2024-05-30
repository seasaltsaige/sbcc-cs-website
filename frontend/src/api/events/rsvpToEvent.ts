import { axios } from "../";

export async function rsvpToEvent(_id: string, name: string) {
  return await axios.post(`/events/upcoming/rsvp/${_id}`, { name });
}

