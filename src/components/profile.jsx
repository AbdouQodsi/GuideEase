import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
import axios from "axios";

function Profile() {

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setFormData({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        email: user.email || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("http://localhost:5000/api/profile/update", formData);
      if (response.status === 200) {
        setMessage("Profile updated successfully!");

         localStorage.setItem("user", JSON.stringify(response.data.updatedUser));
        window.dispatchEvent(new Event("userUpdate"));

      }
    } catch (error) {
      setMessage("Error updating profile.");
      console.error("Update error:", error);
    }
  };

   

  return (
    <div className="profile-container">
    <h1 className="profile-title">Your Profile</h1>
    <form className="profile-form" onSubmit={handleSubmit}>
        <label>First Name</label>
        <input
          type="text"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
        />

        <label>Last Name</label>
        <input
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <button type="submit">Update Profile</button>

        {message && <p className="message">{message}</p>}
      </form>
  </div>
  );
}

export default Profile;