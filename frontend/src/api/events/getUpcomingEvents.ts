import axios from "axios";
const URL = process.env.REACT_APP_URL;
export async function getUpcomingEvents() {
  return await axios.get(`${URL}/events/upcoming`);
}