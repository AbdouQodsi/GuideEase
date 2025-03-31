import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./GuideDetailPage.css";

const tours = {
  1: {
    title: "Lantau Island Day Trip - Big Buddha & Tai O",
    duration: "3.5 hours",
    price: "$400 per adult / $270 per child",
    id: "1",
    description: `
      Imagine waking up to the gentle sea breeze and the distant chant of monks, as you set foot on Lantau Island, Hong Kong's hidden gem. 
      This is not just a tour; it's an adventure that weaves through the tapestry of Hong Kong's natural and cultural fabric.
      
      Our journey unfolds at the base of the Tian Tan Buddha, a colossal 34-meter bronze statue that watches over the island with a serene smile. 
      As you climb the 268 steps, each one tells a story of devotion and peace. At the top, you're greeted with an embrace of panoramic vistas that make the climb utterly worthwhile. 
      It's a moment of connection, where the sky, sea, and spirituality meet.
      
      From the spiritual to the earthly, we then meander through the lanes of Tai O, a fishing village that feels like a step back in time. 
      Here, houses on stilts stand tall, narrating tales of the sea and the Tanka people who call it home. The air is filled with the aroma of fresh seafood and the laughter of villagers. 
      It's an invitation to savor local delicacies, try your hand at fishing, or simply get lost in the labyrinth of alleys, each with its own secret.

      This isn't just a tour; it's your story. Whether you're here to find tranquility, to explore the rich tapestry of Hong Kong's culture, 
      or to create memories that last a lifetime, the Lantau Island Tour is your chapter in the grand tale of travel.
    `,
    participants: { adults: 25, children: 10 },
    participantLimit: 50,
    totalIncome: "$12,700",
  },
  2: {
    title: "City Night Walk",
    duration: "1 Evening",
    price: "$50 per person",
    id: "2",
    description: `
      Experience the city's vibrant nightlife with a guided walk, exploring iconic landmarks illuminated under the evening sky.
      Enjoy the blend of modern and historic charm that makes the city come alive at night.
    `,
    participants: { adults: 10, children: 5 },
    participantLimit: 30,
    totalIncome: "$750",
  },
  3: {
    title: "Jungle Adventure",
    duration: "5 Days, 4 Nights",
    price: "$500 per person",
    id: "3",
    description: `
      An adventurous journey deep into the jungle, discovering exotic wildlife, breathtaking landscapes, and thrilling activities.
      This tour is perfect for nature lovers and those seeking an adrenaline rush.
    `,
    participants: { adults: 15, children: 5 },
    participantLimit: 25,
    totalIncome: "$10,000",
  },
};

function TourDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const tour = tours[id];

  if (!tour) {
    return <h2>Tour not found</h2>;
  }

  const handleEdit = () => {
    navigate(`/edit-tour/${id}`);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this tour?")) {
      alert("Tour deleted successfully!");
      navigate("/tour-services");
    }
  };

  const handleViewReviews = () => {
    navigate(`/tour-services/${id}/reviews`);
  };

  return (
    <div className="tour-detail-container">
      <button className="back-btn" onClick={() => navigate('/GuideList')}>
        ← Back
      </button>
      <h1 className="title">Tour Information</h1>
      <div className="tour-detail">
        <h2>{tour.title}</h2>
        <p>
          <strong>Duration:</strong>
          {tour.duration}
        </p>
        <p>
          <strong>Price:</strong> {tour.price}
        </p>
        <p>
          <strong>Description:</strong>
        </p>
        <p className="description1">{tour.description}</p>
      </div>

      <div className="tour-stats">
        <p>
          <strong>Number of Participants:</strong> {tour.participants.adults}{" "}
          Adults, {tour.participants.children} Children
        </p>
        <p>
          <strong>Participant Limit:</strong> {tour.participantLimit} People
        </p>
        <p>
          <strong>Total Income:</strong> {tour.totalIncome}
        </p>
      </div>

      <div className="action-buttons">
        <button className="viewreviews-btn" onClick={handleViewReviews}>
          View Reviews and Ratings
        </button>
        <button
          className="edit-btn"
          onClick={() => navigate(`/editTour/${tour.id}`)}
        >
          Edit Tour
        </button>
        <button className="delete-btn" onClick={handleDelete}>
          Delete Tour
        </button>
      </div>
    </div>
  );
}

export default TourDetailPage;
