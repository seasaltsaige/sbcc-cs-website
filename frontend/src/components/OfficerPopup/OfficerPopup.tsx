import React, { useEffect, useState } from "react";
import Dropdown from "react-dropdown";
import 'react-dropdown/style.css';
import "./OfficerPopup.css";
import { useIsAuthenticated } from "react-auth-kit";
import { OfficerData } from "../../types/OfficerData.type";
const url = process.env.REACT_APP_URL;


export function OfficerPopup({
  isOpen,
  close,
  officerData,
  updateOfficer,
  type
}: {
  type: "edit" | "new",
  isOpen: boolean,
  close: (clearOfficer?: boolean) => void,
  officerData: OfficerData | null,
  updateOfficer: (officer: OfficerData) => void
}) {
  const isAuth = useIsAuthenticated();

  const [officer, setOfficer] = useState<OfficerData>();
  const [fileName, setFileName] = useState<string>("");
  const [error, setError] = useState<string>("");

  const createAlert = (text: string, ms: number) => {
    setError(text);
    setTimeout(() => {
      setError("");
    }, ms);
  }

  const localEdit = (officer: OfficerData) => {
    setOfficer((old) => ({ ...old, ...officer }));
  }

  const clear = () => {
    setOfficer(undefined);
    setFileName("");
  }

  const saveChanges = () => {
    if (!officer) return createAlert("No Officer information provided", 5000);
    else if (!officer.name) return createAlert("No Officer name provided", 5000);
    else if (!officer.startDate) return createAlert("No Officer start date provided", 5000);
    else if (!officer.endDate) return createAlert("No Officer end date provided", 5000);
    else if (!officer.position) return createAlert("No Officer position provided", 5000);
    else if (!officer.statement) return createAlert("No Officer statement provided", 5000);

    updateOfficer({ ...officer });
    clear();
    close();
  }
  const parseLocaleDateToRFC3339 = (date: Date) => {
    // date.to
    const ddmmyyyy = date.toLocaleDateString().split("/");
    const val = `${ddmmyyyy[2]}-${ddmmyyyy[0].length === 1 ? `0${ddmmyyyy[0]}` : ddmmyyyy[0]}-${ddmmyyyy[1].length === 1 ? `0${ddmmyyyy[1]}` : ddmmyyyy[1]}`;
    return val;
  }
  useEffect(() => {
    setOfficer(officerData === null ? undefined : officerData)
  }, [officerData]);



  return (
    isOpen && isAuth() ?
      <div className="officer-popup-container">
        <div className="officer-modal">
          <p className="modal-header-text">
            {type === "edit" ? "Edit Officer" : "Create Officer"}
          </p>

          <div className="modal-content">
            {
              error !== "" ?
                <div className="error-container">
                  {error}
                </div>
                : <></>
            }

            <div className="image-preview-container">
              <img
                src={
                  officer?.image
                    ? (
                      typeof officer.image === "string" ? `${url}/uploads/officers/${officer.image}`
                        : URL.createObjectURL(officer?.image!)
                    )
                    : "/default.png"}
                alt="Officer Image"
                className="image-preview"
              />

              <div className="image-upload">
                <button
                  className="image-upload-input modal-button"
                  onClick={() => document.getElementById("profile-upload")?.click()}
                >
                  Upload Image
                  <input
                    id="profile-upload"
                    hidden
                    type="file"
                    accept="image/png, image/jpg, image/jpeg"
                    name="profileImage"
                    onChange={(ev) => { localEdit({ ...officer, image: ev.target.files![0] }); setFileName(ev.target.files![0].name) }}
                  />
                </button>
                <p className="image-name">{fileName === "" ? "No image selected" : (fileName.length > 21 ? `${fileName.slice(0, 21)}.${fileName.split(".")[fileName.split(".").length - 1]}` : fileName)}</p>
              </div>
            </div>


            <div className="officer-name">
              <p>Officer Name</p>
              <input
                value={officer && officer.name ? officer.name : ""}
                className="name-input"
                placeholder="Officer name"
                type="text"
                onChange={
                  (ev) => {
                    localEdit({ ...officer, name: ev.target.value })
                  }
                }
              />
            </div>

            <div className="officer-tenure">
              <p className="tenure">Officer Tenure</p>
              <div className="date-selecters">
                <div className="date-container">
                  <p className="start-date-text">Start Date</p>
                  <input
                    className="start-date"
                    type="date"
                    value={officer && officer.startDate ? parseLocaleDateToRFC3339(new Date(officer.startDate)) : ""}
                    onChange={(ev) => { localEdit({ ...officer, startDate: ev.target.valueAsNumber + (1000 * 60 * 60 * 24) }) }}
                  />
                </div>
                <div className="date-container">
                  <p className="end-date-text">End Date</p>
                  <input
                    className="end-date"
                    type="date"
                    value={officer && officer.endDate ? parseLocaleDateToRFC3339(new Date(officer.endDate)) : ""}
                    onChange={(ev) => { localEdit({ ...officer, endDate: ev.target.valueAsNumber + (1000 * 60 * 60 * 24) }) }}
                  />
                </div>
              </div>
            </div>

            <div className="officer-statement">
              <p className="officer-statement-text">Officer Statement</p>
              <textarea
                placeholder="Officer Statement"
                className="officer-statement-input"
                onChange={(ev) => { localEdit({ ...officer, statement: ev.target.value }) }}
                defaultValue={officerData?.statement || ""}
              />
            </div>

            <div className="officer-type-container">
              <label htmlFor="officer-type">Officer Position</label>
              <Dropdown
                placeholder="Select a position"
                className="officer-type-dropdown"
                controlClassName="officer-type-dropdown"
                value={officer?.position!}
                options={["President", "Vice President", "Project Manager", "Secretary", "Tresurer", "Promoter"]}
                onChange={(arg) => localEdit({ ...officer, position: arg.value as any })}
              />
            </div>


            <div className="buttons-container">
              <button className="save modal-button" onClick={() => { saveChanges(); }}>Save</button>
              <button className="close modal-button" onClick={() => { clear(); close(false); }}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
      : <></>
  );

}