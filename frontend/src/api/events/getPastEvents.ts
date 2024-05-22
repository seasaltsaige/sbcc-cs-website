import axios from "axios";
const URL = process.env.REACT_APP_URL;
export async function getPastEvents() {
  return await axios.get("");
}