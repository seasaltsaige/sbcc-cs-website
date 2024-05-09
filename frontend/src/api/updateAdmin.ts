import axios from "axios";

const URL = "http://localhost:3002";

export default async function updateAdmin(username: string, password: string, update: { newUsername?: string, newPassword?: string }, auth: string) {
  return await axios.patch(`${URL}/auth/admin`, {
    username,
    password,
    newUsername: update.newUsername,
    newPassword: update.newPassword,
  }, {
    headers: {
      Authorization: auth,
    },
  });
}