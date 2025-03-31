import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./createTour.css";

function CreateTourPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    duration: "",
    price: "",
    participantLimit: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateTour = (e) => {
    e.preventDefault();
    console.log("New Tour Created:", formData);
    alert("Tour created successfully!");
    navigate("/GuideList"); // Navigate back to the tour list page
  };

  const handleCancel = () => {
    navigate("/GuideList"); // Navigate back to the tour list page
  };

  return (
    <div className="create-tour-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <h1 className="title">Create New Tour</h1>
      <form className="create-tour-form" onSubmit={handleCreateTour}>
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
              placeholder="Enter the tour name"
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
              placeholder="e.g., 3.5 hours, 5 days"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">
              Price (e.g., $400 per adult / $270 per child)
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter the price details"
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
              placeholder="Enter the participant limit"
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
              placeholder="Provide a detailed description of the tour"
              required
            ></textarea>
          </div>
        </section>

        <div className="form-actions">
          <button type="submit" className="create-btn">
            Create Tour
          </button>
          <button type="button" className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateTourPage;
