export type OfficerData = {
  name?: string | null | undefined;
  position?: "President" | "Vice President" | "Project Manager" | "Secretary" | "Tresurer" | "Promoter" | null | undefined;
  startDate?: number;
  endDate?: number;
  statement?: string;
  image?: string | Blob | null,
  _id?: string | null;
}