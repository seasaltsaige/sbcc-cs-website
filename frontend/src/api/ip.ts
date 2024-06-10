import axios from "axios"
export async function ip() {
  return await axios.get("https://api.ipify.org/?format=json");
}