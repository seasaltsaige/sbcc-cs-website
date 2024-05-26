import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_URL!;


export {
  axios,
};


export * from "./auth/checkAdmin";
export * from "./auth/loginAdmin";
export * from "./auth/registerAdmin";
export * from "./auth/updateAdmin";

export * from "./officers/createOfficer";
export * from "./officers/getCurrentOfficers";
export * from "./officers/getPastOfficers";
export * from "./officers/deleteOfficer";
export * from "./officers/updateOfficer";

export * from "./events/createEvent";
export * from "./events/getUpcomingEvents";
export * from "./events/deleteEvent";
export * from "./events/updateEvent";
export * from "./events/rsvpToEvent";

export * from "./elections/createCandidate";
export * from "./elections/updateCandidate";
export * from "./elections/createElection";
export * from "./elections/getAllCandidates";
// Add as needed