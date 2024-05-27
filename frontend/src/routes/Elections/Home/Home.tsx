import React, { useState } from "react";
import "./Home.css";
import { CreateElectionPopup, Navbar } from "../../../components";
import { useAuthHeader, useIsAuthenticated } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { Election } from "../../../types/Election.type";

export function ElectionsHome() {

  const isAuth = useIsAuthenticated();
  const authHeader = useAuthHeader();
  const navigate = useNavigate();

  const [electionsPopupVisible, setElectionsPopupVisible] = useState(false);
  const [electionObject, setElectionObject] = useState({} as Election);
  const [popupType, setPopupType] = useState("new" as "new" | "edit");

  const closePopup = () => {
    setElectionObject({});
    setElectionsPopupVisible(false);
  }

  const saveElection = async (election: Election) => {
    const auth = authHeader();
    try {
      if (popupType === "new") {

      } else {

      }
    } catch (err) {
      console.log(err);
    }

    closePopup();
  }


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
                  onClick={() => { setElectionObject({}); setPopupType("new"); setElectionsPopupVisible(true); }}
                >Create Election</button>
                <button className="go-to-candidates" onClick={() => navigate("/elections/candidates")}>Go to Candidates</button>
              </div>
            ) : <></>
        }
        <div className="election-preview-container">

        </div>
      </div>

      <CreateElectionPopup
        visible={electionsPopupVisible}
        close={closePopup}
        election={electionObject}
        save={saveElection}
        type={popupType}
      />
    </>
  )
}