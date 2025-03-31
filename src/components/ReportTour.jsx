import React, { useEffect, useState } from "react";
import axios from "axios";
import './ReportTour.css'

function ReportTourGuidePage() {
  const [selectedTour, setSelectedTour] = useState("Tour 1: Explore the Mountains");
  const [reason, setReason] = useState("Improper Behavior");
  const [description, setDescription] = useState("");
  const [userBookings, setUserBookings] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user || !user._id) return;

      try {
        const res = await axios.get(`http://localhost:5000/api/bookings/user/${user._id}`);
        setUserBookings(res.data);
        if (res.data.length > 0) {
          setSelectedTour(res.data[0].tourId?._id); // default selection
        }
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
      }
    };

    fetchBookings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedTour || !reason || !description) {
      alert("Please complete the form.");
      return;
    }

    try {
      const reportData = {
        userId: user._id,
        tourId: selectedTour,
        reason,
        description,
      };

      const res = await axios.post("http://localhost:5000/api/reports", reportData);
      if (res.status === 201) {
        alert("Your report has been submitted successfully!");
        setDescription("");
        setReason("Improper Behavior");
      }
    } catch (err) {
      console.error("Failed to submit report:", err);
      alert("Failed to submit report. Please try again.");
    }
  };

  return (
    <div className="report-container">
      <h1 className="title">Report Tour Guide</h1>

      {/* Tour History Section */}
      <section className="tour-history">
        <h2>Your Tour History</h2>
         {userBookings.map((booking) => (
          <div key={booking._id} className="tour-item2">
            <span>{booking.tourId?.name || "Unknown Tour"}</span>
            <span>{new Date(booking.createdAt).toLocaleDateString()}</span>
          </div>
        ))}
      </section>

      {/* Report Form Section */}
      <section className="report-form">
        <h2>Report Form</h2>
        <form onSubmit={handleSubmit}>
          {/* Selected Tour */}
          <div className="form-group">
            <label htmlFor="selectedTour">Selected Tour</label>
            <select
              id="selectedTour"
              value={selectedTour}
              onChange={(e) => setSelectedTour(e.target.value)}
            >
              {userBookings.map((booking) => (
                <option key={booking._id} value={booking.tourId?._id}>
                  {booking.tourId?.name || "Unknown Tour"}
                </option>
              ))}
            </select>
          </div>

          {/* Reason for Report */}
          <div className="form-group">
            <label htmlFor="reason">Reason for Report</label>
            <select
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            >
              <option>Improper Behavior</option>
              <option>Unprofessional Conduct</option>
              <option>Misleading Information</option>
              <option>Other</option>
            </select>
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="Provide details about the incident"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-btn">
            Submit Report
          </button>
        </form>
      </section>
    </div>
  );
}

export default ReportTourGuidePage;