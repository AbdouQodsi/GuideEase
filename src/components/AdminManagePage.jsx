import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './AdminManagePage.css'

function AdminReportListPage() {
  const navigate = useNavigate();
  const handleViewReport = (id) => {
    navigate(`/reports/${id}`);

  };
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/reports/pending");
        setReports(response.data);
      } catch (error) {
        console.error("Failed to fetch reports:", error);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="admin-report-container">
      <h1 className="title">Manage Reports</h1>
      <div className="report-list">
        <div className="report-header">
          <span className="header-name">Name</span>
          <span className="header-date">Date Reported</span>
          <span className="header-action">Action</span>
        </div>
        {reports.map((report) => (
          <div key={report._id} className="report-item">
            <span className="report-name">{report.tour?.name || "Unknown Tour"}</span>
            <span className="report-date">{new Date(report.createdAt).toLocaleDateString()}</span>
            <button
              className="view-report-btn"
              onClick={() => handleViewReport(report._id)}
            >
              View Report
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminReportListPage;