import { axios } from "../";
import { OfficerData } from "../../types/OfficerData.type";


export async function createOfficer(officer: OfficerData, auth: string) {
  const { endDate, image, name, position, startDate, statement } = officer;

  if (image !== null && image !== undefined) {
    return await axios.post(`/officers/create`, {
      name,
      statement,
      startDate: startDate,
      endDate: endDate,
      position,
      image,
    }, { headers: { Authorization: auth, "Content-Type": "multipart/form-data" } });
  } else {
    return await axios.post(`/officers/create`, {
      name,
      statement,
      startDate: startDate,
      endDate: endDate,
      position,
    }, { headers: { Authorization: auth, "Content-Type": "multipart/form-data" } });
  }

}