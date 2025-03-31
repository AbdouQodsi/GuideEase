import "./ListPage.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AvailabilityBox from "./AvailabilityBox";
import axios from "axios";

function ListPage() {
  const [tours, setTours] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const [selectedThemes, setSelectedThemes] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/tours");
        setTours(res.data);
      } catch (err) {
        console.error("Error fetching tours:", err);
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/reviews");
        setAllReviews(res.data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };

    fetchTours();
    fetchReviews();
  }, []);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const handleCategoryCheckboxChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  

  const [searchTerm, setSearchTerm] = useState("");


  const filteredTours = tours
  .filter((tour) => {
    const themeMatch = selectedThemes.length === 0 || selectedThemes.includes(tour.theme);
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(tour.category);
    return themeMatch && categoryMatch;
  })
  .filter((tour) =>
    tour.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tour.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tour.theme?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tour.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const categories = ["Water Activities", "Cultural", "Food", "City Tour"];

  const calculateAverageRating = (tourId) => {
    const reviews = allReviews.filter((r) => r.tourId === tourId.toString());
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    return Math.round(total / reviews.length);
  };

  return (
    <div className="list-page-container">
      <h1 className="list-title">Tours In Hong Kong</h1>
      <p className="list-subtitle">{filteredTours.length} Tours Found</p>

      <div className="ListPagebox">
        {/* Theme Checkboxes */}
        <div className="filter-container">
          <AvailabilityBox />
          <h3 className="filter-title">Theme</h3>
          <hr />
          <div className="checkbox-group">
          {categories.map((category, index) => (
            <label key={index} className="checkbox-label">
              <input
                type="checkbox"
                value={category}
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryCheckboxChange(category)}
              />
              {category}
            </label>
          ))}
          </div>
        </div>
        
        <div className="tours-list">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search tours..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

          {filteredTours.map((tour) => {
            const reviews = allReviews.filter((r) => r.tourId === tour._id.toString());
            const avgRating = calculateAverageRating(tour._id);
            return (
              <div key={tour._id} className="tour-item">
                <img
                  src={tour.image.startsWith('http') ? tour.image : `http://localhost:5000/${tour.image}`}
                  alt={tour.name}
                  className="tour-detail-image"
                />
                <div className="tour-info">
                  <h2>{tour.name}</h2>
                  <h5 className="tour-theme">{tour.category || ""}</h5>
                  <p className="tour-duration">{tour.duration}</p>
                  <span> | </span>
                  <span>🚗 Transport</span>
                  <span> | </span>
                  <span>👨‍👩‍👧‍👦 Family Plan</span>
                  <p className="tour-reviews">{reviews.length} Reviews</p>
                  <div className="tour-stars">
                    {"★".repeat(avgRating)}
                    {"☆".repeat(5 - avgRating)}
                  </div>
                </div>
                <div className="tour-price">${tour.priceAdult}</div>
                <Link to={`/ListPage/tour/${tour._id}`}>
                  <button className="book-btn">Book
                     Now!</button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ListPage;
