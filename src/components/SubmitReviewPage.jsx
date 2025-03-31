import React, { useState } from "react";
import { useLocation, useNavigate  } from "react-router-dom";
import './SubmitReviewPage.css'
import axios from "axios";

function SubmitReviewPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState("");

  

  const handleRatingClick = (star) => {
    setRating(star);
  };

  
  const { tourId, tourName } = location.state || {};
  const user = JSON.parse(localStorage.getItem("user"));
  const [comment, setComment] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/reviews", {
        tourId,
        userId: user._id,
        name: user.firstname + " " + user.lastname,
        rating,
        comment,
        feedback,
      });

      alert("Review submitted successfully!");
      navigate(`/tour/${tourId}/reviews`, { state: { id: tourId, name: tourName } });
    } catch (err) {
      console.error("Review submit error:", err);
      alert("Failed to submit review.");
    }
  };

  return (
    <div className="review-submit-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <h1>How was {tourName}</h1>
      <div className="rating-section">
        <p>Add your rating <span className="required">*</span></p>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${star <= rating ? "active" : ""}`}
              onClick={() => handleRatingClick(star)}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      <div className="review-section">
        <label htmlFor="review">
          Tell us about your visit <span className="required">*</span>
        </label>
        <textarea
          id="review"
          value={comment}
          name="comment"
          onChange={(e) => setComment(e.target.value)}
          placeholder="Tell us about your trip to inspire and help other travelers. Tips about food, transport, and other ways to enjoy the trip are welcome!"
        ></textarea>
      </div>

      <div className="terms-section">
        <input
          type="checkbox"
          id="terms"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        />
        <label htmlFor="terms">
          By uploading this review, I confirm that they belong to me and that I
          agree to GuideCase's{" "}
          <a href="/terms" target="_blank" rel="noopener noreferrer">
            Terms & Conditions
          </a>{" "}
          and{" "}
          <a href="/community-rules" target="_blank" rel="noopener noreferrer">
            Community Rules
          </a>
          .
        </label>
      </div>

      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* Submit Button */}
      <button className="submit-btn" onClick={handleSubmit}>
        Submit Rating and Review
      </button>
    </div>
  );
}

export default SubmitReviewPage;