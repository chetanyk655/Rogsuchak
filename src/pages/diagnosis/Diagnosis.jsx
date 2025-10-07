
import { useDarkMode } from "../../DarkModeContext";
import React, { useState, useEffect } from "react";
import "./Diagnosis.css";

const Diagnosis = () => {
  const { isDarkMode, setDarkMode } = useDarkMode();
  const [image, setImage] = useState(null);
  const [result, setResult] = useState("");
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    if (!image) {
      alert("Please upload an image.");
      setLoading(false)
      return;
    }
    console.log(result)
    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await fetch(
        `http://localhost:8000/predict`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      let value = data.predicted_class.replaceAll("_"," ")
      value = value.replaceAll("  "," ")
      console.log(value);
      setLoading(false)
      setResult(value)
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while uploading the image.");
      setLoading(false);
    }
  };

  return (
    <div className="diagnosisContainer" style={isDarkMode ? { color: "white", backgroundColor: "#2e302f" } : { color: "black" }}>
      <h3>Diagnose Your Plant</h3>
      <form className="uploadOptions" onSubmit={handleSubmit}>
        <div className="input">
          <label className="button" htmlFor="file-upload-button">
            Choose Image
          </label>
          <input
            id="file-upload-button"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
          
        </div>
        {preview && (
          <div className="finalUpload">
            <img src={preview} alt="Preview" />
            <button
              type="button"
              className="button custom-upload-button"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Detecting..." : "Detect Disease"}
            </button>
          </div>
        )}
      </form>
      {result !== "" ? <p className="diseaseDetectedPlate">Detected Disease : {result}</p> : ""}
    </div>
  );
};

export default Diagnosis;
