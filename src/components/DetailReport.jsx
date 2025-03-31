import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./DetailReport.css";

function ReportDetailPage() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/reports/${id}`);
        setReport(res.data);
      } catch (err) {
        console.error("Failed to fetch report:", err);
      }
    };

    fetchReport();
  }, [id]);


if (!report) {
    return <h2>Report not found</h2>;
  }



  const handleResolveDispute = async () => {
    try {
      await axios.put(`http://localhost:5000/api/reports/${id}/status`, {
        status: "traité",
      });
      alert("Dispute has been resolved successfully.");
      navigate("/admin/reports");
    } catch (error) {
      console.error("Failed to update report status:", error);
      alert("An error occurred while resolving the dispute.");
    }
  };


  return (
    <div className="report-detail-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <h1 className="title">Complaint</h1>
      <div className="report-content">
        <h2 className="subject">Subject: {report.reason}</h2>
        <p className="content">{report.description}</p>
      </div>
      <button className="resolve-btn" onClick={handleResolveDispute}>
        Resolve Dispute
      </button>
    </div>
  );
}

export default ReportDetailPage;
