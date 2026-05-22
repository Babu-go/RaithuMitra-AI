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

      alert("Please upload an image");

      return;
    }

    const formData = new FormData();

    formData.append("file", selectedFile);

    try {

      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:8000/analyze-crop",
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
        background: "linear-gradient(to bottom right, #d1fae5, #bbf7d0)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        textAlign: "center"
      }}
    >

      <h1
        style={{
          fontSize: "50px",
          color: "green",
          marginBottom: "20px"
        }}
      >
        🚜🌾 RaithuMitra AI
      </h1>

      {/* Upload Box */}

      <label
        style={{
          background: "white",
          border: "2px dashed green",
          padding: "30px",
          borderRadius: "15px",
          cursor: "pointer",
          marginBottom: "20px",
          width: "300px"
        }}
      >

        <h2>📷 Upload Crop Image</h2>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />

      </label>

      {/* Image Preview */}

      {selectedImage && (

        <img
          src={selectedImage}
          alt="Crop"
          style={{
            width: "300px",
            borderRadius: "15px",
            marginBottom: "20px",
            boxShadow: "0 0 10px rgba(0,0,0,0.2)"
          }}
        />

      )}

      {/* Analyze Button */}

      <button
        onClick={analyzeCrop}
        style={{
          padding: "15px 30px",
          background: "linear-gradient(to right, #16a34a, #22c55e)",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          color: "white",
          border: "none",
          borderRadius: "10px",
          fontSize: "18px",
          cursor: "pointer"
        }}
      >
        Analyze Crop
      </button>

      {/* Loading Message */}

      {
        loading && (
          <h2
            style={{
              color: "green",
              marginTop: "20px"
            }}
          >
            🌿 AI is analyzing crop...
          </h2>
        )
      }

      {/* Result Card */}

      {result && (

        <div
          style={{
            marginTop: "30px",
            maxWidth: "700px",
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)"
          }}
        >

          <h2>{result.result}</h2>

          <p>
            <strong>Treatment:</strong>
            {" "}
            {result.treatment}
          </p>

          <p>
            <strong>Telugu:</strong>
            {" "}
            {result.telugu}
          </p>

        </div>

      )}

    </div>
  );
}

export default App;