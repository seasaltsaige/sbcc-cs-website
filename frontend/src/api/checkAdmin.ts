import axios from "axios";
const URL = "localhost:3002";

export default async function checkAdmin() {
    return await axios.get(`${URL}/auth/admin`);
}