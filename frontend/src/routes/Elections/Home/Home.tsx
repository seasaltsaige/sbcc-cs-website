import React, { useEffect, useState } from "react";
import "./Home.css";
import { CreateElectionPopup, ElectionPreview, Navbar } from "../../../components";
import { useAuthHeader, useIsAuthenticated } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { Election } from "../../../types/Election.type";
import { createElection, getAllCandidates, getElection } from "../../../api";
import { Candidate } from "../../../types/Candidate.type";

export function ElectionsHome() {

  const isAuth = useIsAuthenticated();
  const authHeader = useAuthHeader();
  const navigate = useNavigate();

  const [electionsPopupVisible, setElectionsPopupVisible] = useState(false);
  const [electionObject, setElectionObject] = useState({} as Election);
  const [allCandidates, setAllCandidates] = useState([] as Array<Candidate>);


  const [elec, setElec] = useState(null as Election | null);

  const closePopup = () => {
    setElectionObject({} as Election);
    setElectionsPopupVisible(false);
  }

  const fetchElection = async () => {
    try {
      const res = await getElection();
      if (res.status === 200) {
        // console.log(res.data);
        setElec(res.data.election as Election);
      } else setElec(null);
      // if (res) {}
    } catch (err) {
      console.log(err);
    }
  }

  const fetchAllCandidates = async () => {
    try {
      const res = await getAllCandidates();
      if (res.status === 200) {
        setAllCandidates(res.data.candidates as Array<Candidate>);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const saveElection = async (election: Election) => {
    const auth = authHeader();
    try {
      const res = await createElection(election, auth);
      if (res.status === 200) {
        await fetchElection();
      }

    } catch (err) {
      console.log(err);
    }

    closePopup();
  }

  useEffect(() => {
    (async () => {
      await fetchElection();
      await fetchAllCandidates();
    })();
  }, []);


  // TODO: Refactor to a single page.
  // Before voting begins, the buttons just wont show up,
  // but once it starts, the user can vote for people

  return (
    <>
      <Navbar />
      <div className="elections-home-page">
        {
          isAuth()
            ? (
              <div className="admin-tools">
                <button
                  className="create-election"
                  disabled={elec !== null}
                  onClick={() => { if (elec !== null) return; setElectionObject({} as Election); setElectionsPopupVisible(true); }}
                  title={elec !== null ? "Election has already been created" : ""}
                >Create Election</button>
                <button className="go-to-candidates" onClick={() => navigate("/elections/candidates")}>Go to Candidates</button>
              </div>
            ) : <></>
        }
        {
          elec ?
            <>
              <ElectionPreview
                candidates={allCandidates}
                election={elec}
                refreshHome={() => { setElec(null); fetchElection() }}
              />
            </>
            : <h1>No upcoming elections...</h1>
        }
      </div>

      <CreateElectionPopup
        visible={electionsPopupVisible}
        close={closePopup}
        allCandidates={allCandidates}
        save={saveElection}
      />

    </>
  )
}