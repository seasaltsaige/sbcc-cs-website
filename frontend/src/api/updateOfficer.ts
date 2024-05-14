import axios from "axios";
import { OfficerData } from "../types/OfficerData.type";

const URL = "http://localhost:3002";
export async function updateOfficer(officer: OfficerData, auth: string) {

  const data = {
    name: officer.name,
    statement: officer.statement,
    startDate: officer.startDate as unknown as number,
    endDate: officer.endDate as unknown as number,
    position: officer.position,
    image: null,
  }

  if (typeof officer.image !== "string")
    data.image = officer.image as any;

  return await axios.patch(`${URL}/officers/${officer._id}`, data, { headers: { Authorization: auth, "Content-Type": "multipart/form-data" } });
}