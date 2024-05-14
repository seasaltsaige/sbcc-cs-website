import axios from "axios";
import { OfficerData } from "../types/OfficerData.type";
const URL = "http://localhost:3002";

export async function createOfficer(officer: OfficerData, auth: string) {
  const { endDate, image, name, position, startDate, statement } = officer;

  if (image !== null && image !== undefined) {
    return await axios.post(`${URL}/officers/create`, {
      name,
      statement,
      startDate: startDate?.getTime(),
      endDate: endDate?.getTime(),
      position,
      image,
    }, { headers: { Authorization: auth, "Content-Type": "multipart/form-data" } });
  } else {
    return await axios.post(`${URL}/officers/create`, {
      name,
      statement,
      startDate: startDate?.getTime(),
      endDate: endDate?.getTime(),
      position,
    }, { headers: { Authorization: auth, "Content-Type": "multipart/form-data" } });
  }

}