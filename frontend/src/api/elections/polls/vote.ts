import { axios } from "../../";
import { Candidate } from "../../../types/Candidate.type";
//["President", "Vice President", "Project Manager", "Secretary", "Treasurer", "Promoter"]
type VoteBody = {
  president: string;
  vicePresident: string;
  projectManager: string;
  secretary: string;
  treasurer: string;
  promoter: string;
}

export async function vote(voteBody: VoteBody, ip: string) {
  return await axios.post("/elections/vote", {
    voteBody,
    ip,
  });
}