import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './SPsignup.css'
import axios from "axios";

function SignUpPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    license: null,
    introduction: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, license: e.target.files[0] });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.phoneNumber ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("All fields are required.");
      return;
    }
  
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
  
    setError("");
  
    try {
      const data = new FormData();
      data.append("firstname", formData.firstName);
      data.append("lastname", formData.lastName);
      data.append("phone", formData.phoneNumber);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("userType", "tourguide");
      data.append("introduction", formData.introduction);
      if (formData.license) {
        data.append("license", formData.license);
      }
  
      const response = await axios.post("http://localhost:5000/api/guide/register-or-update", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      if (response.status === 200 || response.status === 201) {
        alert(response.data.message || "Guide saved successfully!");

        const user = response.data.newUser || response.data.updatedUser;
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        window.dispatchEvent(new Event("userUpdate2"));
      }

        navigate("/");
      } else {
        setError(response.data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Server error. Please try again.");
    }
  };
  
  

  return (
    <div className="signup-container">
      <h1>Join As TravelEase Guide</h1>
      {/* Sign-Up Form */}
      <form className="signup-form" onSubmit={handleSubmit}>
        {/* Personal Details */}
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Enter First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Enter Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Enter Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Password Confirm</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Enter Password Confirmation"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        {/* Professional License */}
        <div className="form-group">
          <label htmlFor="license">
            Professional License (PDF/Images)
          </label>
          <input
            type="file"
            id="license"
            name="license"
            onChange={handleFileChange}
            accept=".pdf, .jpg, .jpeg, .png"
          />
        </div>

        {/* Short Introduction */}
        <div className="form-group">
          <label htmlFor="introduction">Short Introduction</label>
          <textarea
            id="introduction"
            name="introduction"
            placeholder="Write a brief introduction about yourself and your experience"
            value={formData.introduction}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Error Message */}
        {error && <p className="error-message">{error}</p>}

        {/* Terms and Submit Button */}
        <div className="terms-section">
          <p>
            By clicking Join, I agree to the GuideEase's{" "}
            <a href="/terms" target="_blank" rel="noopener noreferrer">
              Terms and Conditions
            </a>{" "}
            and I agree to the collection, use, sharing, and transfer of
            information as set out in the GuideEase Global Privacy Statement.
          </p>
        </div>
        <button type="submit" className="submit-btn">
          Join For Free
        </button>
      </form>
    </div>
  );
}

export default SignUpPage;