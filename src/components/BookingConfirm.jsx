import React from "react";
import { useNavigate } from "react-router-dom";
import './BookingConfirm.css'

function BookingConfirmationPage() {
  const navigate = useNavigate();

  return (
    <div className="confirmation-container">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Eo_circle_green_white_checkmark.svg/2048px-Eo_circle_green_white_checkmark.svg.png" alt="confirm tick" className="green-tick" />
      <h1>Booking Confirmed!</h1>
      <p>Thank you for your payment. Your booking is complete.</p>
      <button onClick={() => navigate("/")} className="home-btn">
        Go to Home
      </button>
    </div>
  );
}

export default BookingConfirmationPage;