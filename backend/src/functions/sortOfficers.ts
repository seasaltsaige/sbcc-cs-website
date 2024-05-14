import { Schema } from "mongoose";

export type TOfficer = {
  name: string | null | undefined,
  position: "President" | "Vice President" | "Project Manager" | "Secretary" | "Tresurer" | "Promoter" | null | undefined,
  startDate: number | null | undefined,
  endDate: number | null | undefined,
  statement: string | null | undefined,
  image: string | null | undefined,
  _id: Schema.Types.ObjectId | null,
}



/**
 * Sorts the list of officers in the order "President", "Vice President", "Project Manager", "Secretary", "Tresurer", "Promoter"
 */
export default function sortOfficers(officers: TOfficer[]) {
  const sorted: TOfficer[] = [];

  for (const officer of officers) {
    if (officer.position === "President")
      sorted.push(officer);
  }
  for (const officer of officers) {
    if (officer.position === "Vice President")
      sorted.push(officer);
  }
  for (const officer of officers) {
    if (officer.position === "Project Manager")
      sorted.push(officer);
  }
  for (const officer of officers) {
    if (officer.position === "Secretary")
      sorted.push(officer);
  }
  for (const officer of officers) {
    if (officer.position === "Tresurer")
      sorted.push(officer);
  }
  for (const officer of officers) {
    if (officer.position === "Promoter")
      sorted.push(officer);
  }

  return sorted;
}