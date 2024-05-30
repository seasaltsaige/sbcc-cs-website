import React, { useEffect, useState } from "react";

import "./CreateElectionPopup.css";
import { Election } from "../../types/Election.type";
import { Candidate } from "../../types/Candidate.type";
import { Link, useNavigate } from "react-router-dom";
import { getElection } from "../../api";

export function CreateElectionPopup({
  visible,
  close,
  save,
  // type,
  allCandidates: candidates,
}: {
  allCandidates: Array<Candidate>;
  visible: boolean;
  close: () => void;
  save: (electionObject: Election) => void;
  // type: "edit" | "new";
}) {

  const [electionObject, setElectionObject] = useState({} as Election);
  const [allCandidates, setAllCandidates] = useState([] as Array<Candidate>);
  const [electionDate, setElectionDate] = useState({} as { startDay: number; startHours: number; endHours: number });
  const [error, setError] = useState("");

  const displayError = (text: string, ms: number) => {
    setError(text);
    setTimeout(() => {
      setError("");
    }, ms);
  }

  const navigate = useNavigate();

  const parseDate = () => {
    const date = new Date();
    const [month, day, year] = date.toLocaleString().split(",")[0].split("/");
    return `${year}-${month.length === 1 ? `0${month}` : month}-${day.length === 1 ? `0${day}` : day}`;
  }


  const editElection = (obj: Partial<Election>) => {
    setElectionObject((old) => ({ ...old, ...obj }));
  }


  useEffect(() => {
    setAllCandidates(candidates);

    const update: Partial<Election> = {};

    // Update election object with candidates
    ["President", "Vice President", "Project Manager", "Secretary", "Treasurer", "Promoter"].forEach((position) => {
      const objKey = position.toLowerCase().replaceAll(/\s+/g, "") + "s" as ("presidents" | "vicepresidents" | "projectmanagers" | "secretarys" | "treasurers" | "promoters");
      update[objKey] = candidates.filter((cand) => cand.position === position).map((cand) => ({ candidate: cand._id, votes: 0 }));
      console.log(candidates.filter(cand => cand.position === position))
    });

    editElection(update);

  }, [candidates]);


  useEffect(() => {
    (async () => {
      try {
        const res = await getElection();
        if (res.status === 200) {
          setElectionObject({} as Election)
          close();
        }
      } catch (err) { }
    })();
  }, [visible]);


  return (
    visible
      ? <div className="create-election-popup">
        <div className="create-election-modal">
          <p className="election-header">
            Create Election
          </p>
          <p className="election-info-alert">Creating an Election Poll will use the <i>available candidates</i> that have been created.<br />Go to <Link to="/elections/candidates">/elections/candidates</Link> to edit the candidates.<br />Once an event is made, it can not be edited. You will need to delete and remake if an error is made.</p>
          {
            // This is ultra cursed
            allCandidates.length !== 0 ?
              ["President", "Vice President", "Project Manager", "Secretary", "Treasurer", "Promoter"].map((pos, j) => (
                <div key={j} className={`candidate-position-type ${pos.toLowerCase().replaceAll(/\s+/g, "")}s`}>
                  <p className="candidate-type-text">
                    {pos}
                  </p>
                  <div className="election-candidate-name-container">

                    <p className="candidate-names">

                      {
                        allCandidates.filter(cand => cand.position === pos).map(cand => cand.name).join(", ")
                      }
                    </p>
                  </div>
                </div>
              ))
              : <div className="no-candidates-alert">
                <p className="no-candidates-text">
                  No candidates were found. Please create some candidates before making an election poll.
                </p>
                <button onClick={() => { close(); navigate("/elections/candidates") }}></button>
              </div>
          }

          <div className="times-container">
            <div className="start-time-input">
              <p>Start Time</p>
              <input
                onChange={(ev) => editElection({ voteTime: { start: ev.target.valueAsNumber + 7000 * 60 * 60, end: electionObject?.voteTime?.end } })}
                className="times-start-time-input"
                type="datetime-local"
              />
            </div>
            <div className="end-time-input">
              <p>End Time</p>
              <input
                onChange={(ev) => editElection({ voteTime: { end: ev.target.valueAsNumber + 7000 * 60 * 60, start: electionObject?.voteTime?.start } })}
                className="times-end-time-input"
                type="datetime-local"
              />
            </div>
          </div>

          <div className="admin-buttons">
            <button
              className="modal-button"
              disabled={allCandidates.length === 0}
              onClick={() => save(electionObject)}
            >Create</button>
            <button
              className="modal-button"
              onClick={() => close()}
            >Cancel</button>
          </div>
        </div>
        {
          error ?
            <div className="election-error-container">
              <p>{error}</p>
            </div>
            : <></>
        }
      </div>
      : <></>
  )
}