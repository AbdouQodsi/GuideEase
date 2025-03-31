import React from "react";
import { useNavigate } from "react-router-dom";
import './guideList.css'

function MyTourServicesPage() {
  const navigate = useNavigate();

  const tours = [
    {
      id: 1,
      title: "Lantau Island Day Trip - Big Buddha & Tai O",
      duration: "3.5 hours",
      price: "$400 per adult / $270 per child",
      description:
        "Imagine waking up to the gentle sea breeze and the distant chant of monks, as you set foot on Lantau Island, Hong Kong's hidden gem. This is not just a tour; it's an adventure that weaves through the tapestry of Hong Kong's natural and cultural fabric...",
    },
    {
      id: 2,
      title: "City Night Walk",
      duration: "1 Evening",
      price: "$50 per person",
      description:
        "Experience the city's vibrant nightlife with a guided walk.",
    },
    {
      id: 3,
      title: "Jungle Adventure",
      duration: "5 Days, 4 Nights",
      price: "$500 per person",
      description: "An adventurous journey deep into the jungle.",
    },
  ];

  const handleNavigate = (id) => {
    navigate(`/tour-services/${id}`);
  };

  return (
    <div className="tour-services-container">
      <h1 className="title">My Tour Services</h1>
      <button className="create-tour-btn" onClick={() => navigate("/createtour")}>
        + Create New Tour
      </button>
      <div className="tour-list">
        {tours.map((tour) => (
          <div
            key={tour.id}
            className="tour-item1"
            onClick={() => handleNavigate(tour.id)}
          >
            <h2>{tour.title}</h2>
            <p>
              <strong>Duration:</strong> {tour.duration}
            </p>
            <p>
              <strong>Price:</strong> {tour.price}
            </p>
            <p>
              <strong>Description:</strong> {tour.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyTourServicesPage;