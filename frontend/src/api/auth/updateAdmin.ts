import axios from "axios";

const URL = process.env.REACT_APP_URL;

export async function updateAdmin(username: string, password: string, update: { newUsername?: string, newPassword?: string }, auth: string) {
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