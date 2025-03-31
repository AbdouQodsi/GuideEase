import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyReviewsPage.css";

function MyReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [tours, setTours] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [newFeedback, setNewFeedback] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  console.log("User from localStorage:", user); 
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const fetchUserReviews = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/reviews/user/${user._id}`);
        setReviews(res.data);
        const tourIds = res.data.map((review) => review.tourId);
        const tourData = {};
        for (let id of tourIds) {
          const tourRes = await axios.get(`http://localhost:5000/api/tours/${id}`);
          tourData[id] = tourRes.data.name;
        }
        setTours(tourData);
      } catch (err) {
        console.error("Erreur en récupérant les avis utilisateur :", err);
      }
    };

    fetchUserReviews();
  }, [user._id]);

  const handleEdit = (reviewId, currentFeedback) => {
    setEditingId(reviewId);
    setNewFeedback(currentFeedback || "");
  };

  const handleSaveFeedback = async (reviewId) => {
    try {
      await axios.put(`http://localhost:5000/api/reviews/${reviewId}/feedback`, {
        feedback: newFeedback
      });

      const updated = reviews.map((review) =>
        review._id === reviewId ? { ...review, feedback: newFeedback } : review
      );
      setReviews(updated);
      setEditingId(null);
    } catch (err) {
      console.error("Erreur lors de la mise à jour du feedback :", err);
    }
  };

  return (
    <div className="my-reviews-page">
      <h1>My Reviews</h1>

      {reviews.map((review) => (
        <div key={review._id} className="review-card">
          <h3>Tour: {tours[review.tourId] || "Loading..."}</h3>
          <p>Rating: {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</p>
          <p>Comment: {review.comment}</p>

          {editingId === review._id ? (
            <div>
              <textarea
                value={newFeedback}
                onChange={(e) => setNewFeedback(e.target.value)}
                placeholder="Add your feedback..."
              />
              <button onClick={() => handleSaveFeedback(review._id)}>Save</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </div>
          ) : (
            <div>
              <p>Feedback: {review.feedback || "No feedback yet."}</p>
              <button onClick={() => handleEdit(review._id, review.feedback)}>Edit Feedback</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default MyReviewsPage;
