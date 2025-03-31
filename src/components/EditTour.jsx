import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './EditTour.css'

// Example tour data
const tours = {
  1: {
    title: "Lantau Island Day Trip - Big Buddha & Tai O",
    duration: "3.5 hours",
    price: "$400 per adult / $270 per child",
    participantLimit: 50,
    description: `
      Imagine waking up to the gentle sea breeze and the distant chant of monks, as you set foot on Lantau Island, Hong Kong's hidden gem. 
      This is not just a tour; it's an adventure that weaves through the tapestry of Hong Kong's natural and cultural fabric.
    `,
  },
  2: {
    title: "City Night Walk",
    duration: "1 Evening",
    price: "$50 per person",
    participantLimit: 30,
    description: "Experience the city's vibrant nightlife with a guided walk.",
  },
  3: {
    title: "Jungle Adventure",
    duration: "5 Days, 4 Nights",
    price: "$500 per person",
    participantLimit: 25,
    description: "An adventurous journey deep into the jungle.",
  },
};

function EditTourPage() {
  const { id } = useParams(); // Get the dynamic ID from the URL
  const navigate = useNavigate();

  const tour = tours[id]; // Retrieve the tour data using the ID

  const [formData, setFormData] = useState({
    title: tour?.title || "",
    duration: tour?.duration || "",
    price: tour?.price || "",
    participantLimit: tour?.participantLimit || "",
    description: tour?.description || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert("Tour details updated successfully!");
    console.log("Updated Tour Data:", formData);
    navigate(`/tour-services/${id}`); // Navigate back to the detail page
  };

  const handleCancel = () => {
    navigate(`/tour-services/${id}`); // Navigate back to the detail page
  };

  if (!tour) {
    return <h2>Tour not found</h2>;
  }

  return (
    <div className="edit-tour-container">
      <h1 className="title">Edit Tour</h1>
      <form className="edit-tour-form" onSubmit={handleSave}>
        <section className="basic-info">
          <h2>Basic Information</h2>
          <div className="form-group">
            <label htmlFor="title">Tour Name</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="duration">Duration</label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="participantLimit">Participant Limit</label>
            <input
              type="number"
              id="participantLimit"
              name="participantLimit"
              value={formData.participantLimit}
              onChange={handleChange}
              required
            />
          </div>
        </section>

        <section className="description-section">
          <h2>Description</h2>
          <div className="form-group">
            <label htmlFor="description">Tour Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={8}
              required
            ></textarea>
          </div>
        </section>

        <div className="form-actions">
          <button type="submit" className="save-btn">
            Save Changes
          </button>
          <button type="button" className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditTourPage;