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

export * from "./elections/candidates/createCandidate";
export * from "./elections/candidates/updateCandidate";
export * from "./elections/candidates/deleteCandidate";
export * from "./elections/candidates/getAllCandidates";

export * from "./elections/polls/createElection";
export * from "./elections/polls/deleteElection";
export * from "./elections/polls/getElection";
export * from "./elections/polls/updateElectionn";
// Add as needed