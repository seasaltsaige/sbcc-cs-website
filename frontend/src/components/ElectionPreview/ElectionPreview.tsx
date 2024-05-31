import React, { useEffect, useState } from "react";
import moment, { min } from "moment";
import { useNavigate } from "react-router-dom";
import { useAuthHeader, useIsAuthenticated } from "react-auth-kit";

import "./ElectionPreview.css";
import { Election } from "../../types/Election.type";
import { Candidate } from "../../types/Candidate.type";
import { StatementPopup, CandidateCotainer } from "../index";
import { deleteElection } from "../../api";

const PT_OFFSET_HOURS = 7 * 1000 * 60 * 60;

export function ElectionPreview({
  election,
  candidates,
  refreshHome,
}: {
  election: Election;
  candidates: Array<Candidate>;
  refreshHome: () => void;
}) {

  const isAuth = useIsAuthenticated();
  const authHeader = useAuthHeader();
  const navigate = useNavigate();

  const [votingTime, setVotingTime] = useState(false);
  const [viewCandidate, setViewCandidate] = useState({} as Candidate);
  const [timeTill, setTimeTill] = useState("");
  const [statementOpen, setStatementOpen] = useState(false);
  const close = () => {
    setViewCandidate({} as Candidate);
    setStatementOpen(false);
  }

  function checkVoteTime(time: number) {

    const dur = moment.duration(moment(time).diff(moment()));

    const yearsRemain = dur.years();
    const monthsRemain = dur.months();
    const daysRemain = dur.days();
    const hoursRemain = dur.hours();
    const minutesRemain = dur.minutes();
    const secondsRemain = dur.seconds();

    if (new Date(time) < new Date())
      setVotingTime(true);
    else {
      setVotingTime(false);
      setTimeTill(`${daysRemain > 0 ? `${daysRemain} day(s), ` : ""}${hoursRemain > 0 ? `${hoursRemain} hour(s), ` : ""}${minutesRemain > 0 ? `${minutesRemain} minute(s), ` : ""}${secondsRemain} second(s)`);
    }
  }

  const delElection = async (election: Election) => {
    const auth = authHeader();
    try {
      const res = await deleteElection(election._id, auth);
      if (res.status === 200) {
        refreshHome();
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    // While user is on page, check if event has started
    const checkInterval = setInterval(() => {
      checkVoteTime(election.voteTime.start)
    }, 133);

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
            >Voting for this election hasn't started yet!<br />Check back {timeTill}!<br />Polls start on {moment(election.voteTime.start).format("MM/DD/YY, h:mm A")}</h3>
        }

        {
          isAuth() ?
            <button
              className="delete-election-button"
              onClick={() => delElection(election)}
            >Delete Election</button>
            : <></>
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



      <StatementPopup
        candidate={viewCandidate}
        close={close}
        visible={statementOpen}
      />
    </>
  )
}