export type OfficerData = {
  name?: string | null | undefined;
  position?: "President" | "Vice President" | "Project Manager" | "Secretary" | "Tresurer" | "Promoter" | null | undefined;
  startDate?: Date;
  endDate?: Date;
  statement?: string;
  image?: Blob | null,
  _id?: string | null;
}