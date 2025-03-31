import React, { useState } from "react";
import './AvailabilityBox.css'

function AvailabilityBox() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleAvailabilityCheck = () => {
    if (!(fromDate && toDate)){
      alert("Please select both dates.");
    }
  };

  return (
    <div className="availability-box">
      <h3 className="availability-title">Availability</h3>
      <div className="date-picker">
        <label htmlFor="from-date" className="date-label">
          From
        </label>
        <input
          type="date"
          id="from-date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="date-input"
        />
      </div>
      <div className="date-picker">
        <label htmlFor="to-date" className="date-label">
          To
        </label>
        <input
          type="date"
          id="to-date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="date-input"
        />
      </div>
      <button className="check-availability-btn" onClick={handleAvailabilityCheck}>
        Check Availability
      </button>
    </div>
  );
}

export default AvailabilityBox;