import axios from "axios";
const URL = process.env.REACT_APP_URL;

export async function rsvpToEvent(_id: string, name: string) {
  return await axios.post(`${URL}/events/upcoming/rsvp/${_id}`, { name });
}

