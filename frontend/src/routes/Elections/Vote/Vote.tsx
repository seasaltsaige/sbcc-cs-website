import React, { useEffect, useState } from "react";
import "./Vote.css";
import { Navbar } from "../../../components";
import { getElection, ip } from "../../../api";

import { Link, useNavigate, useParams } from "react-router-dom";
import { Election } from "../../../types/Election.type";

export function Vote() {

  const navigate = useNavigate();

  const [electionObject, setElectionObject] = useState({} as Election);
  const [ipVal, setIpVal] = useState("");

  const [ended, setEnded] = useState(false);

  const electionActive: (election: Election) => boolean = (election: Election) => {
    console.log(election, 'election obj')
    if (!election._id) return false;
    const now = new Date();
    const start = new Date(election.voteTime.start);
    const end = new Date(election.voteTime.end);

    if (end <= now) setEnded(true);

    if (start <= now) return true;
    else return false;
  }

  useEffect(() => {
    (async () => {
      const ipRes = await ip();
      const election = await getElection();

      if (ipRes.status === 200)
        setIpVal(ipRes.data.ip);

      if (election.status === 200)
        setElectionObject(election.data.election);


      if (!electionActive(election.data.election))
        navigate("/elections");
    })();
    // Fetch election
  }, []);

  // Use cookies to stop constant voting
  // Log ip to backend temporarily
  // Generate code in backend
  return (
    <>
      <Navbar />
      <div className="vote-page">
        {!ended ?
          <>
            <p className="vote-header">Vote for your officers!</p>
            <p>Go <Link to={"/elections"}>here</Link> to figure out who to vote for!</p>
            {/*  */}
            {
              ["President", "Vice President", "Project Manager", "Secretary", "Treasurer", "Promoter"].map((pos, i) => (
                <>{pos}</>
              ))
            }
          </>
          : <div>
            Elections have ended. Here are the voting results!
          </div>
        }
      </div>
    </>
  )
}