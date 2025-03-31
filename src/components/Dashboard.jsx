import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./DashboardPage.css";

function Dashboard() {

 
    const [showPopup, setShowPopup] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [tours, setTours] = useState([]);
    const [editingTourId, setEditingTourId] = useState(null);
      const [formData, setFormData] = useState({
        name: "",
        image: null,
        description: "",
        date: "",
        map: "",
        numberOfPeople: "",
        duration: "",
        language: "",
        meetingPoint: "",
        included: "",
        activity: "",
        priceAdult: "",
        priceChild: "",
        category: "",
        mapEmbed : "",
      });


      const navigate = useNavigate();

      useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        const fetchTours = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/api/tours/user/${user._id}`);
            setTours(response.data);
          } catch (error) {
            console.error("Error fetching tours:", error);
          }
        };
        fetchTours();
      }, []);
    
    
      const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
          setFormData({ ...formData, image: files[0] });
        } else {
          setFormData({ ...formData, [name]: value });
        }
      };
      const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this tour?")) {
          try {
            await axios.delete(`http://localhost:5000/api/tours/${id}`);
            setTours(tours.filter((tour) => tour._id !== id));
          } catch (error) {
            console.error("Error deleting tour:", error);
          }
        }
      };

      const openEditPopup = (tour) => {
        setFormData({ ...tour, image: null });
        setEditingTourId(tour._id);
        setIsEditing(true);
        setShowPopup(true);
      };


      const openAddPopup = () => {
        setFormData({
          name: "",
          image: null,
          description: "",
          date: "",
          map: "",
          numberOfPeople: "",
          duration: "",
          language: "",
          meetingPoint: "",
          included: "",
          activity: "",
          priceAdult: "",
          priceChild: "",
          category: "",
          mapEmbed : "",
        });
        setEditingTourId(null);
        setIsEditing(false);
        setShowPopup(true);
      };
      
      const user = JSON.parse(localStorage.getItem("user"));
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const data = new FormData();
          Object.keys(formData).forEach((key) => {
            if (formData[key]) data.append(key, formData[key]);
          });
    
          if (isEditing) {
            const response = await axios.put(`http://localhost:5000/api/tours/${editingTourId}`, data, {
              headers: { "Content-Type": "multipart/form-data" },
            });
            const updatedTours = tours.map((t) => (t._id === editingTourId ? response.data.tour : t));
            setTours(updatedTours);
            alert("Tour updated successfully!");
          } else {
            data.append("userId", user._id);
            const response = await axios.post("http://localhost:5000/api/tours", data, {
              headers: { "Content-Type": "multipart/form-data" },
            });
            setTours([...tours, response.data.tour]);
            alert("Tour added successfully!");
          }
    
          setShowPopup(false);
        } catch (error) {
          console.error("Error saving tour:", error);
          alert("Failed to save tour.");
        }
      };
    
    
      return (
        <div className="dashboard-container">
          <div className="dashboard-header">
            <h1>Your Tours</h1>
            <button onClick={openAddPopup} className="add-tour-btn">
              + Add Tour
            </button>
          </div>
    
          <table className="tour-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {tours.map((tour) => (
                <tr key={tour._id}>
                <td>{tour.name}</td>
                <td>{tour.date}</td>
                <td>
                    <button className="btn-action" onClick={() => navigate(`/ListPage/tour/${tour._id}`)}>View</button>
                    <button className="btn-action" onClick={() => openEditPopup(tour)}>Edit</button>
                    <button className="btn-action" onClick={() => handleDelete(tour._id)}>Delete</button>
                </td>
                </tr>
            ))}
            </tbody>
          </table>
    
          {showPopup && (
        <div className="popup-overlay">
          <div className="popup-form">
            <h2>{isEditing ? "Edit Tour" : "Add New Tour"}</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" name="name" value={formData.name} placeholder="Tour Name" onChange={handleChange} required />
              <input type="file" name="image" accept="image/*" onChange={handleChange} />
              <textarea name="description" value={formData.description} placeholder="Description" onChange={handleChange} required />
              <input type="date" name="date" value={formData.date} onChange={handleChange} required />
              <input type="text" name="map" value={formData.map} placeholder="Map Link or Coordinates" onChange={handleChange} />
              <input type="number" name="numberOfPeople" value={formData.numberOfPeople} placeholder="Number of People" onChange={handleChange} />
              <input type="text" name="duration" value={formData.duration} placeholder="Duration" onChange={handleChange} />
              <input type="text" name="language" value={formData.language} placeholder="Language" onChange={handleChange} />
              <input type="text" name="meetingPoint" value={formData.meetingPoint} placeholder="Meeting Point Address" onChange={handleChange} />
              <textarea name="included" value={formData.included} placeholder="What is Included" onChange={handleChange} />
              <input type="text" name="activity" value={formData.activity} placeholder="Activity" onChange={handleChange} />
              <input type="number" name="priceAdult" value={formData.priceAdult} placeholder="Price for Adult" onChange={handleChange} />
              <input type="number" name="priceChild" value={formData.priceChild} placeholder="Price for Child" onChange={handleChange} />
              <div className="form-group">
                <label>Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">-- Select Category --</option>
                  <option value="Nature">Water Activities</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Food">Food</option>
                  <option value="Adventure">City Tour</option>
                </select>
              </div>

              <div className="popup-actions">
                <button type="submit">{isEditing ? "Update" : "Save"}</button>
                <button type="button" onClick={() => setShowPopup(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
        </div>
      );
    }
    


export default Dashboard;