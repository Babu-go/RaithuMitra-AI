import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  // =========================================
  // STATES
  // =========================================

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // =========================================
  // HANDLE IMAGE
  // =========================================

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

  // =========================================
  // ANALYZE IMAGE
  // =========================================

  const analyzeImage = async () => {

    if (!image) {
      alert("Please upload a crop image first.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", image);

      const response = await axios.post(
        "http://127.0.0.1:8000/analyze-crop",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setResult(response.data);

    } catch (error) {
      console.error(error);
      setResult({
        result: "❌ Backend Error",
        confidence: "0%",
        symptoms: [],
        treatment: "Unable to analyze image.",
        prevention: "Please try again.",
        telugu: "మళ్లీ ప్రయత్నించండి."
      });
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // CHECK IF ERROR
  // =========================================

  const isError = result && (
    result.result.includes("❌") ||
    result.result.includes("Error") ||
    result.result.includes("Invalid")
  );

  // =========================================
  // UI
  // =========================================

  return (
    <>

      {/* ── HEADER ── */}
      <header className="header">
        <div className="header-logo">
          <div className="header-logo-icon">🌾</div>
          <h1>Raithu<span>Mitra</span> AI</h1>
        </div>
        <div className="header-badge">AI Powered · Free · Telugu Support</div>
      </header>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-tag">🤖 Smart Crop Disease Detection</div>
        <h2>Diagnose your crop,<br />protect your harvest.</h2>
        <p>Upload a photo of your crop and get instant AI-powered disease analysis in English and Telugu.</p>
      </section>

      {/* ── MAIN GRID ── */}
      <main className="main-grid">

        {/* ── LEFT: UPLOAD ── */}
        <div className="card">

          <div className="card-header">
            <div className="card-icon">📷</div>
            <h2>Upload Crop Image</h2>
          </div>

          {/* UPLOAD ZONE */}
          <div className="upload-zone">
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
            />
            <div className="upload-icon">🌿</div>
            <p>Click or drag & drop your image</p>
            <span>Supports JPG, PNG, WEBP</span>
          </div>

          {/* IMAGE PREVIEW */}
          {preview && (
            <div className="preview-wrap">
              <img src={preview} alt="Crop preview" />
              <div className="preview-label">📸 Uploaded Image</div>
            </div>
          )}

          {/* ANALYZE BUTTON */}
          <button
            className={`analyze-btn ${loading ? "loading" : ""}`}
            onClick={analyzeImage}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="spinner" />
                Analyzing your crop...
              </>
            ) : (
              <>🔬 Analyze Crop</>
            )}
          </button>

        </div>

        {/* ── RIGHT: RESULTS ── */}
        <div className="card">

          <div className="card-header">
            <div className="card-icon">📊</div>
            <h2>Analysis Report</h2>
          </div>

          {/* EMPTY STATE */}
          {!result && (
            <div className="empty-state">
              <div className="empty-icon">🌱</div>
              <p>Upload a crop image and click<br /><strong>Analyze Crop</strong> to see results here.</p>
            </div>
          )}

          {/* ERROR STATE */}
          {result && isError && (
            <div className="error-box">
              <div className="error-icon">⚠️</div>
              <p>{result.result}</p>
              <p style={{ marginTop: "6px", color: "#888", fontSize: "0.82rem" }}>
                {result.treatment}
              </p>
              <p style={{ marginTop: "4px", color: "#888", fontSize: "0.82rem" }}>
                {result.telugu}
              </p>
            </div>
          )}

          {/* SUCCESS RESULT */}
          {result && !isError && (
            <div className="result-wrap">

              {/* DISEASE + CONFIDENCE */}
              <div className="result-title-row">
                <div className="result-disease">{result.result}</div>
                <div className="confidence-badge">
                  {result.confidence} confidence
                </div>
              </div>

              <div className="divider" />

              {/* SYMPTOMS */}
              {result.symptoms && result.symptoms.length > 0 && (
                <>
                  <div className="section-label">Symptoms</div>
                  <ul className="symptoms-list">
                    {result.symptoms.map((item, i) => (
                      <li key={i}>
                        <span className="symptom-dot" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="divider" />
                </>
              )}

              {/* TREATMENT */}
              <div className="section-label">Treatment</div>
              <div className="info-box" style={{ marginBottom: "1rem" }}>
                {result.treatment}
              </div>

              {/* PREVENTION */}
              <div className="section-label">Prevention</div>
              <div className="info-box" style={{ marginBottom: "1rem" }}>
                {result.prevention}
              </div>

              {/* TELUGU */}
              <div className="section-label">🗣 Telugu Advice</div>
              <div className="telugu-box">
                {result.telugu}
              </div>

            </div>
          )}

        </div>

      </main>

      {/* ── FOOTER ── */}
      <footer className="footer">
        RaithuMitra AI · Built for Indian Farmers · Powered by Groq AI
      </footer>

    </>
  );
}

export default App;
