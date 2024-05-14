import axios from "axios";
import { OfficerData } from "../types/OfficerData.type";
const URL = "http://localhost:3002";

export async function createOfficer(officer: OfficerData, auth: string) {
  // const form = new FormData();

  const { endDate, image, name, position, startDate, statement } = officer;

  // form.append("name", name!);
  // form.append("statement", statement!);
  // form.append("startDate", startDate?.getTime()?.toString()!);
  // form.append("endDate", endDate?.getTime()?.toString()!);
  // form.append("position", position!);
  // if (image !== null && image !== undefined) {
  //   form.append("image", image);
  // }


  // console.log(form);
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