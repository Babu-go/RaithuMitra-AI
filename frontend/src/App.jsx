import { useState } from "react";
import axios from "axios";

function App() {

  const [selectedFile, setSelectedFile] = useState(null);

  const [selectedImage, setSelectedImage] = useState(null);

  const [result, setResult] = useState("");

  const [loading, setLoading] = useState(false);

  const handleImageChange = (event) => {

    const file = event.target.files[0];

    if (file) {

      setSelectedFile(file);

      setSelectedImage(
        URL.createObjectURL(file)
      );
    }
  };

  const analyzeCrop = async () => {

    if (!selectedFile) {

      alert("Please upload a crop image");

      return;
    }

    const formData = new FormData();

    formData.append("file", selectedFile);

    try {

      setLoading(true);

      const response = await axios.post(
        "https://raithumitra-ai.onrender.com/analyze-crop",
        formData
      );

      setResult(response.data);

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);

      alert("Backend Error");
    }
  };

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #dcfce7, #bbf7d0)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        fontFamily: "Arial"
      }}
    >

      <div
        style={{
          textAlign: "center",
          marginBottom: "25px"
        }}
      >

        <h1
          style={{
            fontSize: "42px",
            color: "#166534",
            marginBottom: "10px"
          }}
        >
          🚜 RaithuMitra AI
        </h1>

        <p
          style={{
            color: "#166534",
            fontSize: "18px"
          }}
        >
          AI-Powered Smart Farming Assistant 🌿
        </p>

      </div>

      <label
        style={{
          width: "100%",
          maxWidth: "340px",
          background: "white",
          border: "3px dashed #16a34a",
          borderRadius: "20px",
          padding: "30px",
          textAlign: "center",
          cursor: "pointer",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          marginBottom: "25px"
        }}
      >

        <h2
          style={{
            color: "#166534",
            marginBottom: "10px"
          }}
        >
          📷 Upload Crop Image
        </h2>

        <p
          style={{
            color: "gray"
          }}
        >
          Tap here to choose image
        </p>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />

      </label>

      {selectedImage && (

        <img
          src={selectedImage}
          alt="Crop"
          style={{
            width: "100%",
            maxWidth: "340px",
            borderRadius: "20px",
            marginBottom: "25px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
          }}
        />

      )}

      <button
        onClick={analyzeCrop}
        style={{
          padding: "15px 35px",
          background: "#16a34a",
          color: "white",
          border: "none",
          borderRadius: "12px",
          fontSize: "18px",
          cursor: "pointer",
          fontWeight: "bold",
          boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
        }}
      >
        🌿 Analyze Crop
      </button>

      {
        loading && (

          <div
            style={{
              marginTop: "25px",
              background: "white",
              padding: "20px",
              borderRadius: "18px",
              boxShadow: "0 5px 20px rgba(0,0,0,0.15)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "15px"
            }}
          >

            <div
              style={{
                width: "50px",
                height: "50px",
                border: "5px solid #bbf7d0",
                borderTop: "5px solid #16a34a",
                borderRadius: "50%",
                animation: "spin 1s linear infinite"
              }}
            />

            <h3
              style={{
                color: "#166534"
              }}
            >
              🌱 AI is analyzing crop...
            </h3>

          </div>

        )
      }

      {result && (

        <div
          style={{
            width: "100%",
            maxWidth: "380px",
            marginTop: "30px",
            background: "white",
            padding: "25px",
            borderRadius: "22px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            border: "3px solid #16a34a"
          }}
        >

          <h2
            style={{
              textAlign: "center",
              color: "#166534",
              marginBottom: "25px",
              fontSize: "28px"
            }}
          >
            🌿 Crop Analysis Report
          </h2>

          <div style={{ marginBottom: "18px" }}>
            <h3 style={{ color: "#166534" }}>
              Disease Detected
            </h3>

            <p
              style={{
                fontSize: "22px",
                fontWeight: "bold"
              }}
            >
              {result.result}
            </p>
          </div>

          <div style={{ marginBottom: "18px" }}>
            <h3 style={{ color: "#166534" }}>
              📊 Confidence
            </h3>

            <p
              style={{
                color: "#15803d",
                fontWeight: "bold"
              }}
            >
              {result.confidence}
            </p>
          </div>

          <div style={{ marginBottom: "18px" }}>
            <h3 style={{ color: "#166534" }}>
              ⚠ Symptoms
            </h3>

            <ul>
              {
                result.symptoms.map((item, index) => (
                  <li key={index}>
                    {item}
                  </li>
                ))
              }
            </ul>
          </div>

          <div style={{ marginBottom: "18px" }}>
            <h3 style={{ color: "#166534" }}>
              💊 Treatment
            </h3>

            <p>
              {result.treatment}
            </p>
          </div>

          <div style={{ marginBottom: "18px" }}>
            <h3 style={{ color: "#166534" }}>
              🌱 Prevention
            </h3>

            <p>
              {result.prevention}
            </p>
          </div>

          <div style={{ marginBottom: "18px" }}>
            <h3 style={{ color: "#166534" }}>
              🇮🇳 Telugu Advice
            </h3>

            <p>
              {result.telugu}
            </p>
          </div>

          <div
            style={{
              background: "#dcfce7",
              padding: "12px",
              borderRadius: "12px",
              textAlign: "center",
              fontWeight: "bold",
              color: "#166534"
            }}
          >
            ✅ AI Analysis Completed
          </div>

        </div>

      )}

      <style>
        {`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }

            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>

    </div>
  );
}

export default App;