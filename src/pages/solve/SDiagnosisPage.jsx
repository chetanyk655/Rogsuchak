import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Solve.css";

const SDiagnosisPage = () => {
  const { caseId } = useParams();
  const [caseDetails, setCaseDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    diseaseName: "",
    diseaseSymptoms: "",
    organicTreatment: "",
    inorganicTreatment: "",
    preventiveMeasure: "",
    conclusion: "",
  });
  useEffect(() => {
    const fetchCaseDetails = async () => {
      try {
        const response = await axios.get(`http://${LOCAL_IP}:5000/api/solve/cases/${caseId}`);
        setCaseDetails(response.data);
        setFormData((prev) => ({
          ...prev,
          comment: response.data.comment || "No comments yet",
        }));
      } catch (error) {
        console.error("Error fetching case details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseDetails();
  }, [caseId]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(caseDetails);
    try {
      const response = await axios.post(`http://${LOCAL_IP}:5000/api/notifications/create-diagnosis-blog`, {
        caseId,
        userId: caseDetails.userId,
        diagnosisId: caseDetails.diagnosisId,
        ...formData,
      });

      alert("Diagnosis Report Submitted and Blog Created Successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting diagnosis report:", error);
      alert("Failed to submit the report.");
    }
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div></div>
      </div>
    );
  }

  if (!caseDetails) {
    return <p>Case not found.</p>;
  }

  return (
    <div className="workspaceContainer">
      <div className="case-section">
        <h2>Case #{caseDetails._id}</h2>
        <div className="image-container">
          <img
            src={caseDetails.imageUrl || "https://via.placeholder.com/400"}
            alt="Diseased Leaf"
            className="leaf-image"
          />
          <div className="diseaseInfoContainer" >
            <p className="metaDname">
              <strong>Disease Name:</strong>
            </p>
            <p className="dname">{caseDetails.diseaseName || "Unknown"}</p>
            <p className="metaConf">
              <strong>Confidence:</strong>{" "}
            </p>
            <p className="conf">
              <div className="confidenceParent" style={{ width: "100%", backgroundColor: "grey", borderRadius: "20px", fontSize: '13px', color: 'white' }}>
                <div className="confidenceindicator" style={{ borderRadius: "20px 20px 20px 20px", width: `${(parseFloat((caseDetails.confidenceScore * 100).toFixed(0)) / 100) * 100}%`, backgroundColor: (caseDetails.confidenceScore * 100).toFixed(0) > 90 ? " green" : (caseDetails.confidenceScore * 100).toFixed(0) > 70 ? " rgb(252, 211, 3)" : " red", textAlign: "center" }}>{(caseDetails.confidenceScore * 100).toFixed(1)}%</div>
              </div>
            </p>
            <p className="metaLocation">
              <strong>Location:</strong> 
            </p>
            <p className="location">
            {caseDetails.location}
            </p>
            <p className="metaDate">
              <strong>Diagnosis Date:</strong>{" "}
            </p>
            <p className="date">
            {new Date(caseDetails.diagnosisDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>
            <p className="metaComment">
              <strong>Comment:</strong> 
            </p>
            <p className="comment">
            {caseDetails.comment || "No comments yet"}
            </p>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="section-heading">Write Diagnosis Report</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="diseaseName">Disease Name</label>
            <input
              type="text"
              id="diseaseName"
              name="diseaseName"
              value={formData.diseaseName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="diseaseSymptoms">Disease Symptoms</label>
            <textarea
              id="diseaseSymptoms"
              name="diseaseSymptoms"
              value={formData.diseaseSymptoms}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="organicTreatment">Organic Treatment</label>
            <textarea
              id="organicTreatment"
              name="organicTreatment"
              rows="3"
              value={formData.organicTreatment}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="inorganicTreatment">Inorganic Treatment</label>
            <textarea
              id="inorganicTreatment"
              name="inorganicTreatment"
              rows="3"
              value={formData.inorganicTreatment}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="preventiveMeasure">Preventive Measures</label>
            <textarea
              id="preventiveMeasure"
              name="preventiveMeasure"
              rows="3"
              value={formData.preventiveMeasure}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="conclusion">Conclusion</label>
            <textarea
              id="conclusion"
              name="conclusion"
              rows="3"
              value={formData.conclusion}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SDiagnosisPage;
