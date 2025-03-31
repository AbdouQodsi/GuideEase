import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BookingListPage.css";

function Booking() {
  const [bookings, setBookings] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user._id) return;
  
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/bookings/from-tours/${user._id}`
        );
        setBookings(response.data);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
      }
    };
  
    fetchBookings();
  }, []);
  

  if (!user) return <p>You must be logged in to see your bookings.</p>;

  return (
    <div className="booking-list-container">
      <h2>My Bookings</h2>
      <table className="booking-table">
        <thead>
          <tr>
            <th>Tour</th>
            <th>Date</th>
            <th>Total</th>
            <th>Guests</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.tour?.name || "Tour deleted"}</td>
              <td>{new Date(booking.createdAt).toLocaleDateString()}</td>
              <td>${booking.totalPrice}</td>
              <td>{booking.firstName} {booking.lastName}</td>
              <td>{booking.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Booking;
