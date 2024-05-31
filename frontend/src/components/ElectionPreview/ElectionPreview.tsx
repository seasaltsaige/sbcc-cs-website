import React, { useEffect, useState } from "react";
import moment, { min, now } from "moment";
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

  const [votingTime, setVotingTime] = useState(false as boolean | undefined);
  const [viewCandidate, setViewCandidate] = useState({} as Candidate);
  const [timeTill, setTimeTill] = useState("");
  const [statementOpen, setStatementOpen] = useState(false);
  const close = () => {
    setViewCandidate({} as Candidate);
    setStatementOpen(false);
  }

  function checkVoteTime(startTime: number, endTime: number) {

    const dur = moment.duration(moment(startTime).diff(moment()));
    const endDur = moment.duration(moment(endTime).diff(moment()));

    // const yearsRemain = dur.years();
    // const monthsRemain = dur.months();
    const daysRemain = dur.days();
    const hoursRemain = dur.hours();
    const minutesRemain = dur.minutes();
    const secondsRemain = dur.seconds();

    // const endDaysRemain = dur.days();
    const endHoursRemain = endDur.hours();
    const endMinutesRemain = endDur.minutes();
    const endSecondsRemain = endDur.seconds();

    const nowDate = new Date();

    if (new Date(startTime) < nowDate) {
      if (new Date(endTime) < nowDate) {
        setVotingTime(undefined);
      } else {
        setVotingTime(true);
        setTimeTill(`${endHoursRemain > 0 ? `${endHoursRemain} hour(s), ` : ""}${endMinutesRemain > 0 ? `${endMinutesRemain} minute(s), ` : ""}${endSecondsRemain} second(s)`);
      }
    } else {
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
      checkVoteTime(election.voteTime.start, election.voteTime.end);
    }, 133);

    checkVoteTime(election.voteTime.start, election.voteTime.end);

    return () => {
      clearInterval(checkInterval)
    }
  }, []);

  return (
    <>
      <div className="election-preview">
        {
          votingTime ?
            <>
              <h3>Elections ending in {timeTill}! Vote now!</h3>
              <button
                className="vote-now-button"
                onClick={() => navigate("/elections/vote")}
              >
                Vote Now
              </button>
            </> : votingTime === undefined ?
              <button
                className="vote-now-button"
                onClick={() => navigate("/elections/vote")}
              >
                View results
              </button>
              :
              <h3
                className="voting-not-available"
              >Voting for this election hasn't started yet!<br />Check back in {timeTill}!<br />Polls start on {moment(election.voteTime.start).format("MM/DD/YY, h:mm A")}</h3>
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
        name={viewCandidate.name || ""}
        statement={viewCandidate.statement || ""}
        close={close}
        visible={statementOpen}
      />
    </>
  )
}