import React, { useEffect, useState } from "react";
import "./CurrentOfficers.css";
import Navbar from "../../../components/Navbar/Navbar";
import { useAuthHeader, useIsAuthenticated } from "react-auth-kit";
import OfficerPopup from "../../../components/OfficerPopup/OfficerPopup";
import { OfficerData } from "../../../types/OfficerData.type";
import { createOfficer, getCurrentOfficers } from "../../../api/index";

const URL = "http://localhost:3002";

export function CurrentOfficers() {

  const [officersData, setOfficersData] = useState<OfficerData[]>([]);
  const [error, setError] = useState("");
  const isAuth = useIsAuthenticated();
  const authHeader = useAuthHeader();

  const [openOfficer, setOpenOfficer] = useState<OfficerData | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [type, setType] = useState<"edit" | "new">("new");


  const createAlert = (text: string, ms: number) => {
    setError(text);
    setTimeout(() => {
      setError("");
    }, ms);
  }


  const close = () => {
    setIsOpen(false);
    setOpenOfficer(null);
  }


  const fetchOfficers = async () => {
    const header = authHeader();
    try {
      const fetchRes = await getCurrentOfficers(header);
      const data = fetchRes.data.officers as OfficerData[];
      setOfficersData(data);
    } catch (err) {
      if (typeof err === "string")
        createAlert(err, 7500);
      else if (typeof err === "object")
        createAlert((err as any).response.data.message, 6000);
    }
  }

  const updateOfficer = async (officer: OfficerData) => {
    const auth = authHeader();
    // Post
    if (type === "new") {
      try {
        const createRes = await createOfficer(officer, auth);
        if (createRes.status === 200)
          await fetchOfficers();
      } catch (err) {
        console.log(err);
      }
    }
    // Patch
    // TODO
    else {

    }
  }

  useEffect(() => {
    (async () => {
      await fetchOfficers();
    })();
  }, []);

  useEffect(() => {
    if (isOpen)
      document.getElementsByTagName("body").item(0)!.style.overflowY = "hidden";
    else
      document.getElementsByTagName("body").item(0)!.style.overflowY = "";
  }, [isOpen]);

  return (
    <>
      <Navbar />
      <div className="officers">
        {
          error !== "" ?
            (
              <div className="error-bar">
                <p className="error-text">{error}</p>
              </div>
            )
            : <></>
        }
        <p className="club-officers-text">Current Club Officers</p>
        <div className={`horizontal-flow-container ${officersData.length < 1 ? "empty" : ""}`}>
          {
            // Will have logic for display all current officers
            officersData.length > 0 ?
              officersData.map((officer, i) => (
                <div key={i} className="officer-panel">
                  <p className="officer-position">{officer.position}</p>
                  <img
                    className="officer-image"
                    src={
                      officer.image !== null
                        ? `${URL}/uploads/officers/${officer.image}`
                        : "/default.png"
                    }
                    alt="Officer Image"
                  />
                  <p className="officer-name">{officer.name}</p>
                  <p className="officer-tenure">{`${new Date(officer.startDate as unknown as number).toLocaleDateString()} to ${new Date(officer.endDate as unknown as number).toLocaleDateString()}`}</p>
                  <div className="officer-statement-paragraph">
                    <p>{officer.statement}</p>
                  </div>
                  {
                    isAuth()
                      ? (
                        <div className="admin-buttons">
                          <button
                            onClick={
                              () => {
                                setType("edit");
                                setOpenOfficer(
                                  {
                                    ...officer,
                                    // endDate: officer.endDate,
                                    // startDate: new Date(officer.startDate as unknown as number),
                                    // image: officer.image ? officer.image : null,
                                  }); setIsOpen(true)
                              }} className="edit officer-admin-button">Edit</button>
                          <button className="delete officer-admin-button">Delete</button>
                        </div>
                      )
                      : <></>
                  }
                </div>
              ))

              : <h1>No officers to display</h1>
          }
        </div>
        {
          isAuth() ?
            <button
              className="create-officer"
              onClick={() => { setType("new"); setIsOpen(true); }}
            >
              Create new Officer
            </button>
            : <></>
        }
      </div>

      <OfficerPopup
        isOpen={isOpen}
        close={close}
        officerData={openOfficer}
        updateOfficer={updateOfficer}
        type={type}
      />
    </>
  )
}