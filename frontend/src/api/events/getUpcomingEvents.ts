import { axios } from "../";

export async function getUpcomingEvents() {
  return await axios.get(`/events/upcoming`);
}