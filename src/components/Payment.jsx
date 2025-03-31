import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Payment.css";
import axios from "axios"; 

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalPrice, tourId, userId } = location.state;

  // Form state
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [SecurityNo, setSecurityNo] = useState("");

  const handlePayment = async (e) => {
    e.preventDefault();
  
    try {
      const bookingData = {
        userId,
        tourId,
        firstName,
        lastName,
        email,
        phone,
        totalPrice,
        cardNumber,
        expiryMonth,
        expiryYear,
        securityNo: SecurityNo,
      };
  
      const response = await axios.post("http://localhost:5000/api/bookings", bookingData);
  
      if (response.status === 201) {
        alert("Payment successful! Thank you for booking.");
        navigate("/bookingConfirm");
      } else {
        alert("Something went wrong. Try again.");
      }
    } catch (err) {
      console.error("Payment error:", err);
      alert("Server error. Please try again.");
    }
  };


  return (
    <div className="payment-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back to Tours
      </button>

     {/* Payment Details */}
      <div className="payment-content">
        <h2 className="section-title">Payment and Guest Details</h2>

        {/* Total for Tour */}
        <div className="total-section">
          <h3>Total for Tour</h3>
          <p className="total-price">Total: <strong>${totalPrice}</strong></p>
        </div>

        {/* Payment Form */}
        <form onSubmit={handlePayment}>
          <div className="form-section">
            <h3>Payment</h3>
            <div className="form-group">
              <label htmlFor="card-number">Card Number</label>
              <input
                type="text"
                id="card-number"
                placeholder="Enter your card number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
              />
            </div>
            <div className="form-group expiry-fields">
              <div>
                <label htmlFor="month">Month</label>
                <input
                  type="text"
                  id="month"
                  placeholder="MM"
                  maxLength="2"
                  value={expiryMonth}
                  onChange={(e) => setExpiryMonth(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="year">Year</label>
                <input
                  type="text"
                  id="year"
                  placeholder="YYYY"
                  maxLength="4"
                  value={expiryYear}
                  onChange={(e) => setExpiryYear(e.target.value)}
                  required
                />
              </div>
              <div>
              <label htmlFor="year">Security Number</label>
                <input
                  type="text"
                  id="SecurityNo"
                  placeholder="Security Num"
                  maxLength="6"
                  value={SecurityNo}
                  onChange={(e) => setSecurityNo(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Guest Information */}
          <div className="form-section">
            <h3>Guest Information</h3>
            <div className="form-group">
              <label htmlFor="first-name">First Name</label>
              <input
                type="text"
                id="first-name"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="last-name">Last Name</label>
              <input
                type="text"
                id="last-name"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                id="phone"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="button-container">
            <button type="submit" className="book-now-btn">
              Book Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PaymentPage;