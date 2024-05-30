type ElectionCandidate = {
  votes: number;
  candidate: string;
}

export type Election = {
  presidents: Array<ElectionCandidate>;
  vicepresidents: Array<ElectionCandidate>;
  projectmanagers: Array<ElectionCandidate>;
  secretarys: Array<ElectionCandidate>;
  treasurers: Array<ElectionCandidate>;
  promoters: Array<ElectionCandidate>;
  voteTime: {
    start: number;
    end: number;
  };
  postedOn: number;
  _id: string;
}