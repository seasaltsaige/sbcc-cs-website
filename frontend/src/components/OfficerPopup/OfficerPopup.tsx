import React, { useState } from "react";
import Dropdown from "react-dropdown";
import 'react-dropdown/style.css';
import "./OfficerPopup.css";
type OfficersData = {
  name?: string | null | undefined;
  position?: "Club President" | "Vice President" | "Project Manager" | "Secretary" | "Tresurer" | "Promoter" | null | undefined;
  startDate?: Date;
  endDate?: Date;
  statement?: string;
  image?: string, // tbd;
  _id?: string;
}

export default function OfficerPopup({
  isOpen,
  close,
  officerData,
  updateOfficer,
  type
}: {
  type: "edit" | "new",
  isOpen: boolean,
  close: (clearOfficer?: boolean) => void,
  officerData: OfficersData | null,
  updateOfficer: (officer: OfficersData) => void
}) {
  const [officer, setOfficer] = useState<OfficersData>();
  const [fileName, setFileName] = useState<string>("");
  const localEdit = (officer: OfficersData) => {
    setOfficer((old) => ({ ...old, ...officer }))
  }

  const clear = () => {
    setOfficer(undefined);
    setFileName("");
  }

  const saveChanges = () => {
    updateOfficer({ ...officer });
  }


  return (
    isOpen ?
      <div className="officer-popup-container">
        <div className="officer-modal">
          <div className="modal-header">
            <p className="modal-header-text">
              {type === "edit" ? "Edit Officer" : "Create Officer"}
            </p>
          </div>
          <div className="modal-content">
            <div className="image-preview-container">
              <img
                src={officer?.image || "/default.png"}
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
                    onChange={(ev) => { localEdit({ ...officer, image: URL.createObjectURL(ev.target.files![0]) }); setFileName(ev.target.files![0].name) }}
                  />
                </button>
                <p className="image-name">{fileName === "" ? "No image selected" : fileName}</p>
              </div>
            </div>


            <div className="officer-name">
              <p>Officer Name</p>
              <input defaultValue={officerData?.name || ""} className="name-input" placeholder="Officer name" type="text" onChange={(ev) => { localEdit({ ...officer, name: ev.target.value }) }} />
            </div>

            <div className="officer-tenure">
              <p className="tenure">Officer Tenure</p>
              <div className="date-selecters">
                <div className="date-container">
                  <p className="start-date-text">Start Date</p>
                  <input
                    className="start-date"
                    type="date"
                    defaultValue={officerData?.endDate?.toDateString() || new Date().toDateString()}
                    onChange={(ev) => { localEdit({ ...officer, startDate: new Date(ev.target.valueAsNumber) }) }}
                  />
                </div>
                <div className="date-container">
                  <p className="end-date-text">End Date</p>
                  <input
                    className="end-date"
                    type="date"
                    onChange={(ev) => { localEdit({ ...officer, endDate: new Date(ev.target.valueAsNumber) }) }}
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
                options={["President", "Vice President", "Project Manager", "Secretary", "Tresurer", "Promoter"]}
                onChange={(arg) => localEdit({ ...officer, position: arg.value as any })}
              />
            </div>


            <div className="buttons-container">
              <button className="save modal-button" onClick={() => { saveChanges(); clear(); close(); }}>Save</button>
              <button className="close modal-button" onClick={() => { clear(); close(false); }}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
      : <></>
  );

}