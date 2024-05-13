import axios from "axios";

const URL = "http://192.168.0.201:3002";

export default async function getAllOfficers() {
  return await axios.get(`${URL}/officers/all`);
}