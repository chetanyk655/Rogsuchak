import React, { useState } from "react";
import HistoryModal from "./HistoryModal";
import "./History.css";

export default function History({ disease, percentage, date, leaf, details }) {
  const [viewClicked, setViewClicked] = useState(false);

  // Convert percentage string to a number for calculations.
  const confidence = parseFloat(percentage);

  return (
    <div className="Historywrapper">
      <section className="HistoryContainerwithDetails">
        <div className="leftsideHistoryDetails">
          <h5>
            Disease Name: <span>{disease}</span>
          </h5>
          <h5>
            Confidence Level: <span>{percentage}</span>
          </h5>
          <div
            className="confidenceParent"
            style={{
              width: "200px",
              backgroundColor: "grey",
              borderRadius: "20px",
            }}
          >
            <div
              className="confidenceindicator"
              style={{
                borderRadius: "20px",
                width: `${(confidence / 100) * 200}px`,
                backgroundColor:
                  confidence > 90
                    ? "green"
                    : confidence > 70
                    ? "rgb(252, 211, 3)"
                    : "red",
                border:
                  confidence > 90
                    ? "3px solid green"
                    : confidence > 70
                    ? "3px solid rgb(252, 211, 3)"
                    : "3px solid red",
              }}
            ></div>
          </div>
          <h5>
            Date: <span>{date}</span>
          </h5>
          <div className="viewMoreHistoryButton">
            <div className="button" onClick={() => setViewClicked(true)}>
              View More
            </div>
            {viewClicked && (
              <HistoryModal
                onclose={() => setViewClicked(false)}
                disease={disease}
                percentage={percentage}
                leaf={leaf}
                details={details || null} // Pass null if details is not provided
              />
            )}
          </div>
        </div>
        <div className="rigthsideHistoryDetails">
          <img
            src={leaf}
            alt={`Leaf affected by ${disease}`}
            style={{
              maxWidth: "100px",
              maxHeight: "100px",
              objectFit: "cover",
            }}
          />
        </div>
      </section>
    </div>
  );
}
