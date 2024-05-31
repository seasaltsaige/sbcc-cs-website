import React, { useEffect, useState } from "react";
import { useAuthHeader, useIsAuthenticated } from "react-auth-kit";
import "./CurrentOfficers.css";

import { Navbar, OfficerContainer, OfficerPopup } from "../../../components";
import { OfficerData } from "../../../types/OfficerData.type";
import { createOfficer, getCurrentOfficers, deleteOfficer, updateOfficer as updateOff } from "../../../api/index";

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
      console.log(data);
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
        console.log(createRes);
        if (createRes.status === 200)
          await fetchOfficers();
      } catch (err) {
        console.log(err);
      }
    }
    // Patch
    else {
      try {
        const updateRes = await updateOff(officer, auth);
        if (updateRes.status === 200)
          await fetchOfficers();
      } catch (err) {

      }
    }
  }

  const deleteOff = async (_id: string) => {
    const header = authHeader();
    try {
      const deleteRes = await deleteOfficer(_id, header);
      if (deleteRes.status === 200)
        await fetchOfficers();
    } catch (err) {
      // i gues i just dont handle this lmao
      // TODO
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

            // TODO: refactor into component to use for past officers as well
            officersData.length > 0 ?
              officersData.map((officer, i) => (
                <OfficerContainer
                  deleteOfficer={() => deleteOff(officer._id!)}
                  editOfficer={() => {
                    setType("edit");
                    setOpenOfficer(officer);
                    setIsOpen(true);
                  }}
                  officer={officer}
                  key={i}
                />
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