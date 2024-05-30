import React, { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useAuthHeader, useIsAuthenticated } from "react-auth-kit";

import "./ElectionPreview.css";
import { Election } from "../../types/Election.type";
import { Candidate } from "../../types/Candidate.type";
import { CandidateStatementPopup } from "../CandidateStatement/CandidateStatementPopup";
import { CandidateCotainer } from "../CandidateContainer/CandidateContainer";

const PT_OFFSET_HOURS = 7 * 1000 * 60 * 60;

export function ElectionPreview({
  election,
  candidates
}: {
  election: Election,
  candidates: Array<Candidate>
}) {

  const isAuth = useIsAuthenticated();
  const authHeader = useAuthHeader();
  const navigate = useNavigate();

  const [votingTime, setVotingTime] = useState(false);
  const [viewCandidate, setViewCandidate] = useState({} as Candidate);
  const [statementOpen, setStatementOpen] = useState(false);
  const close = () => {
    setViewCandidate({} as Candidate);
    setStatementOpen(false);
  }

  function checkVoteTime(time: number) {
    if (time - PT_OFFSET_HOURS < Date.now())
      setVotingTime(true);
    else setVotingTime(false);
  }

  useEffect(() => {
    // While user is on page, check if event has started
    const checkInterval = setInterval(() => {
      checkVoteTime(election.voteTime.start)
    }, 1000);

    checkVoteTime(election.voteTime.start);

    return () => {
      clearInterval(checkInterval)
    }
  }, []);

  return (
    <>
      <div className="election-preview">
        {
          votingTime ?
            <button
              className="vote-now-button"
              onClick={() => navigate("/elections/vote")}
            >
              Vote Now
            </button>
            :
            <h3
              className="voting-not-available"
            >Voting for this election hasn't started yet!<br />Check back {moment(election.voteTime.start).fromNow()}!</h3>
        }

        <div className="future-candidates-container">
          <h1 style={{ width: "100%", textAlign: "center", color: "var(--sbcc-red)", fontWeight: "bolder", margin: 0 }}>Meet the candidates</h1>
          {
            ["President", "Vice President", "Project Manager", "Secretary", "Treasurer", "Promoter"].map((pos, j) => (
              <div className="outer-candidates-type-container">
                <p className="position-text">{pos} Candidates</p>
                <div className={`${pos.toLowerCase().replaceAll(/\s+/g, "")}s candidates-type-container`}>
                  {
                    election[`${pos.toLowerCase().replaceAll(/\s+/g, "")}s` as ("presidents" | "vicepresidents" | "projectmanagers" | "secretarys" | "treasurers" | "promoters")].map((v) => {
                      const cnd = candidates.find(cand => v.candidate === cand._id)!;
                      if (cnd)
                        return <CandidateCotainer
                          candidate={cnd}
                          deleteCandidate={() => { }}
                          edit={() => { }}
                          useAdmin={false}
                          openStatement={() => { setViewCandidate(cnd); setStatementOpen(true); }}
                        />
                      else return <></>
                    })
                  }
                </div>
              </div>
            ))
          }
        </div>
      </div>
      <CandidateStatementPopup
        candidate={viewCandidate}
        close={close}
        visible={statementOpen}
      />
    </>
  )
}