import React, { useEffect, useState } from "react";
import "./CurrentOfficers.css";
import Navbar from "../../../components/Navbar/Navbar";
import { useIsAuthenticated } from "react-auth-kit";

type OfficersData = {
  name: string | null | undefined;
  position: "Club President" | "Vice President" | "Project Manager" | "Secretary" | "Tresurer" | "Promoter" | null | undefined;
  startDate: Date;
  endDate: Date;
  statement: string;
  image: null, // tbd;
  _id: string;
}


export function CurrentOfficers() {

  const [officerData, setOfficersData] = useState<OfficersData[]>([]);
  const isAuth = useIsAuthenticated();


  useEffect(() => {
    (async () => {

    })();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="officers">
        <p className="club-officers-text">Current Club Officers</p>
        <div className={`horizontal-flow-container ${officerData.length < 1 ? "empty" : ""}`}>
          {
            // Will have logic for display all current officers
            officerData.length > 0 ? <></>
              : <h1>No officers to display</h1>
          }
        </div>
        {
          isAuth() ?
            <button className="create-officer">Create new Officer</button>
            : <></>
        }
      </div>
    </div>
  )
}