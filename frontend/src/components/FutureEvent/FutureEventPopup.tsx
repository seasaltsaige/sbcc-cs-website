import React, { useState } from "react";

import "./FutureEventPopup.css";
import { useIsAuthenticated } from "react-auth-kit";
import { FutureEvent } from "../../types/FutureEvent.type";
import useUserAgent from "../../hooks/useUserAgent";
import useWindowDimensions from "../../hooks/useWindowDimensions";
const url = process.env.REACT_APP_URL;
export function FutureEventPopup({
  eventObject,
  open,
  saveEvent,
  close,
  type
}: {
  type: "edit" | "new",
  eventObject: FutureEvent | null,
  open: boolean,
  saveEvent: (...params: any) => any,
  close: () => void
}) {
  const isAuth = useIsAuthenticated();
  const [fileName, setFileName] = useState("");
  const [event, setEvent] = useState(eventObject);

  const localEdit = (ev: FutureEvent) => {
    console.log(ev);
    setEvent(ev);
  }

  const { isMobile } = useUserAgent();
  const { width, height } = useWindowDimensions();

  const closeModal = (updateObject: boolean) => {
    if (updateObject)
      saveEvent(event, type);

    setEvent(null);
    setFileName("");
    close();
  }

  return (
    open && isAuth()
      ? (
        <div className="create-event-container">
          <div className="create-event-modal">
            <p
              className="create-event-header"
            >
              {type === "edit" ? "Edit" : "Create new"} Event
            </p>

            <div className="event-image-preview-container">
              <div className="event-images-scroll">
                {
                  event?.images && event.images.length > 1 ?
                    event?.images?.map((image: any) => {
                      return <img
                        src={
                          image !== null && image !== undefined
                            ? (
                              typeof image === "string" ? `${url}/uploads/officers/${image}`
                                : URL.createObjectURL(image)
                            ) :
                            "https://placehold.co/400"}
                        alt="Officer Image"
                        className="event-image-preview"
                      />
                    })
                    : <img src="https://placehold.co/400" className="event-image-preview" />
                }
              </div>
              <div className="event-image-upload">
                <button
                  className="event-image-upload-input modal-button"
                  onClick={() => document.getElementById("profile-upload")?.click()}
                >
                  Upload Images
                  <input
                    id="profile-upload"
                    hidden
                    type="file"
                    multiple
                    accept="image/png, image/jpg, image/jpeg"
                    name="profileImage"
                    onChange={(ev) => { localEdit({ ...event, images: Array.from(ev.target.files!) }); setFileName(`${ev.target.files?.length} file(s) selected`) }}
                  />
                </button>
                {/* <p className="event-image-name">{fileName === "" ? "No image selected" : (fileName.length > 21 ? `${fileName.slice(0, 21)}.${fileName.split(".")[fileName.split(".").length - 1]}` : fileName)}</p> */}
              </div>
            </div>

            <div className="input-container">
              <div className="event-title">
                <p>Event Title</p>
                <input
                  onChange={(ev) => localEdit({ ...event, title: ev.target.value })}
                  type="text"
                />
              </div>

              <div className="event-date-time">
                <p>Event Date/Time</p>
                <input
                  onChange={(ev) => localEdit({ ...event, eventTime: ev.target.valueAsNumber })}
                  type="datetime-local"
                />
              </div>

              <div className="event-location">
                <p>Event Location</p>
                <input
                  onChange={(ev) => localEdit({ ...event, location: ev.target.value })}
                  type="text"
                />
              </div>


            </div>
            <div className="event-body">
              <p>Event Body</p>
              <textarea
                onChange={(ev) => localEdit({ ...event, postBody: ev.target.value })}
              />
            </div>
            <div className="buttons">
              <button
                className="save modal-button"
                onClick={() => closeModal(true)}
              >
                Save
              </button>
              <button
                className="cancel modal-button"
                onClick={() => closeModal(false)}
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      ) : <></>
  )
}