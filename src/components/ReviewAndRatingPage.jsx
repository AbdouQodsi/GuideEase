import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./ReviewAndRatingPage.css";
import axios from "axios";

function ReviewAndRatingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { name } = location.state || {};
  const [filter, setFilter] = useState("Recommended");
  const [searchTerm, setSearchTerm] = useState("");

  // Initialize helpful reviews state
  const initialHelpfulState = {};

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/reviews/${id}`);
        setReviews(res.data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };

    fetchReviews();
  }, [id]);


  const getFilteredReviews = () => {
    let filteredReviews = [...reviews];

    if (filter === "Newest") {
      filteredReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (filter === "Lowest Rating") {
      filteredReviews.sort((a, b) => a.rating - b.rating);
    } else if (filter === "Recommended") {
      filteredReviews.sort((a, b) => b.rating - a.rating);
    }

    if (searchTerm) {
      filteredReviews = filteredReviews.filter(
        (review) =>
          review.comment?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          review.feedback?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          review.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filteredReviews;
  };

  const filteredReviews = getFilteredReviews();
   const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : 0;


  return (
    <div className="review-page-container">
       <button
        className="back-btn"
        onClick={() => navigate(`/ListPage/tour/${id}`)}
      >
        ← Back to Tour Details
      </button>

      <div className="review-header">
        <h1>Customer Reviews for {name}</h1>
        <div className="overall-rating">
          <span className="rating-score">{averageRating}</span>
          <span className="rating-stars">{"★".repeat(Math.round(averageRating))}</span>
          <span className="total-reviews">{reviews.length} Reviews</span>
          <button
            className="submit-review-btn"
            onClick={() => navigate(`/tour/${id}/submit-review`, {
              state: { tourId: id, tourName: name }
            })}
          >
            Submit Rate/Review
          </button>

        </div>
        <div className="rating-breakdown">
          <div className="breakdown-item">
            <span>Guide</span>
            <progress value="4.8" max="5"></progress>
            <span>4.8</span>
          </div>
          <div className="breakdown-item">
            <span>Transportation</span>
            <progress
              value="4"
              max="5"
            ></progress>
            <span>4</span>
          </div>
          <div className="breakdown-item">
            <span>Value for Money</span>
            <progress
              value="4.5"
              max="5"
            ></progress>
            <span>4.5</span>
          </div>
          <div className="breakdown-item">
            <span>Safety</span>
            <progress value="4" max="5"></progress>
            <span>4</span>
          </div>
        </div>
      </div>

      <div className="filter-section">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="Recommended">Recommended</option>
          <option value="Newest">Newest</option>
          <option value="Lowest Rating">Lowest Rating</option>
        </select>
        <input
          type="text"
          placeholder="Search Here"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Reviews Section */}
      <div className="reviews-section">
        {filteredReviews.map((review) => (
          <div key={review._id} className="review-item">
            <h4>
              {review.comment} {" "}
              <span className="review-stars">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </span>
            </h4>
            <p>{review.feedback}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewAndRatingPage;
