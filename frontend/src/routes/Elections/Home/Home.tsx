import React from "react";
import "./Home.css";
import { CreateElectionPopup, Navbar } from "../../../components";
import { useIsAuthenticated } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

export function ElectionsHome() {

  const isAuth = useIsAuthenticated();
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="elections-home-page">
        {
          isAuth()
            ? (
              <div className="admin-tools">
                <button className="create-election">Create Election</button>
                <button className="create-candidate" onClick={() => navigate("/elections/candidates")}>Go to Candidates</button>
              </div>
            ) : <></>
        }
        <div className="election-preview-container">

        </div>
      </div>

      <CreateElectionPopup />
    </>
  )
}