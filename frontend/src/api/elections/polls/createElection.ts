import { axios } from "../..";
import { Election } from "../../../types/Election.type";
export async function createElection(election: Election, auth: string) {

  const data = {
    presidents: election.presidents,
    vicepresidents: election.vicepresidents,
    projectmanagers: election.projectmanagers,
    promoters: election.promoters,
    secretarys: election.secretarys,
    treasurers: election.treasurers,
    startTime: election.voteTime.start,
    endTime: election.voteTime.end,
  }

  console.log(data);

  return await axios.post("/elections/create", data, {
    headers: {
      Authorization: auth,
    },
  });
}