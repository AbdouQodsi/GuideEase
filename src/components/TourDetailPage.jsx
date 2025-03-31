import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./TourDetailPage.css";
import axios from "axios";

function TourDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // State for booking
  const [adults, setAdults] = useState(1);
  const [kids, setKids] = useState(0);
  const [tour, setTour] = useState(null);
  
  useEffect(() => {
    const fetchTour = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/tours/${id}`);
        setTour(response.data);
      } catch (error) {
        console.error("Error fetching tour:", error);
      }
    };

    fetchTour();
  }, [id]);

  const user = JSON.parse(localStorage.getItem("user"));

 // Handle booking confirmation
  const handleConfirmBooking = () => {
    const totalPrice = adults * tour.priceAdult + kids * tour.priceChild;
    navigate("/payment", {
      state: {
        totalPrice,
        tourId: tour._id,
        userId: user._id, 
      }
    });
    
  };


  return (
    <div className="tour-detail-container">
      <button className="back-btn" onClick={() => navigate("/ListPage")}>← Back to Tours</button>
      {tour ? (
      <div className="tour-detail-content">
        <div className="tour-info">
          <h1 className="tour-detail-title">{tour.name}</h1>
          {/* <img src={`http://localhost:5000/${tour.image}`} alt={tour.name} className="tour-detail-image" /> */}
          <img
              src={tour.image.startsWith('http') ? tour.image : `http://localhost:5000/${tour.image}`}
              alt={tour.name}
              className="tour-detail-image"
            />

          <p className="tour-detail-description">{tour.description}</p>

          <div className="tour-activities">
            <hr />
            <h3>Activity</h3>
            <h4>What You Will Do</h4>
            <ul>
              {tour.activity.split(";").map((act, idx) => (
                <li key={idx}>{act}</li>
              ))}
            </ul>
          </div>

          <hr />
          <div className="tour-includes">
            <h3>What Is Included</h3>
            <h4>Includes</h4>
            <ul>
              {tour.included.split(";").map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <hr />
          <div className="tour-details">
            <h3>Details</h3>
            <ul>
              <li><strong>Language:</strong> {tour.language}</li>
              <li><strong>Duration:</strong> {tour.duration}</li>
              <li><strong>Number Of People:</strong> {tour.numberOfPeople}</li>
            </ul>
          </div>

          <div className="tour-meeting-point">
            <h4>Meeting Point Address</h4>
            <ul><li>{tour.meetingPoint}</li></ul>
          </div>

          {tour.map && (
            <div className="tour-map">
              <h3>Meeting Point Map</h3>
              <iframe
                src={tour.mapEmbed}
                width="600"
                height="450"
                style={{ border: 0, width: "100%", height: "300px" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Tour Meeting Point Map"
              ></iframe>
              <p>
                <a href={tour.map} target="_blank" rel="noopener noreferrer">
                  Open in Google Maps
                </a>
              </p>
            </div>
          )}
        </div>

        <div className="booking-section">
          <h3 className="booking-title">Booking</h3>
          <p className="booking-price">
            <strong>${tour.priceAdult}/Per Adult</strong> &nbsp;
            <span>${tour.priceChild}/Per Child</span>
          </p>
          <div className="booking-controls">
            <div className="booking-row">
              <span>Adults</span>
              <div className="booking-counter">
                <button onClick={() => setAdults(Math.max(1, adults - 1))}>−</button>
                <span>{adults}</span>
                <button onClick={() => setAdults(adults + 1)}>+</button>
              </div>
            </div>
            <div className="booking-row">
              <span>Kids</span>
              <div className="booking-counter">
                <button onClick={() => setKids(Math.max(0, kids - 1))}>−</button>
                <span>{kids}</span>
                <button onClick={() => setKids(kids + 1)}>+</button>
              </div>
            </div>
          </div>
          <button className="confirm-booking-btn" onClick={handleConfirmBooking}>Confirm Booking</button>
          <Link
            to={`/tour/${tour._id}/reviews`}
            state={{ id: tour._id, name: tour.name }}
            className="Links"
            >
            <button className="view-reviews-btn">View Review and Rating</button>
          </Link>
          
        </div>
        </div>
      ) : (
      <div>Loading...</div>
    )}
      
    </div>
  );
}

export default TourDetailPage;
