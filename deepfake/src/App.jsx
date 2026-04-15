import { useState, useRef } from "react";
import { motion } from "framer-motion";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [mode, setMode] = useState("deepfake");
  const [cameraOn, setCameraOn] = useState(false);

  const videoRef = useRef(null);

  //  File Upload API
  const uploadFile = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  //  Open Camera
  const openCamera = async () => {
    setCameraOn(true);
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
  };

  //  Stop Camera
  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
    }
    setCameraOn(false);
  };

  //  Capture Image
  const captureImage = async () => {
    if (!videoRef.current) {
      alert("Camera not ready");
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0);

    canvas.toBlob(async (blob) => {
      if (!blob) {
        alert("Capture failed");
        return;
      }

      const formData = new FormData();
      formData.append("file", blob, "capture.jpg");

      try {
        const response = await fetch("http://127.0.0.1:8000/predict", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        setResult(data);
      } catch (err) {
        console.error(err);
        alert("Error sending image");
      }
    }, "image/jpeg");
  };

  //  Real-time Detection (every 2 sec)
  const startRealtimeDetection = () => {
    const interval = setInterval(() => {
      captureImage();
    }, 2000);

    window.realtimeInterval = interval;
  };

  const stopRealtimeDetection = () => {
    clearInterval(window.realtimeInterval);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      {/* 🔥 Sidebar */}
      <div style={{
        width: "200px",
        backgroundColor: "#111",
        color: "white",
        padding: "20px"
      }}>
        <h3 style={{ color: "hotpink" }}>Menu</h3>

        <button
          onClick={() => setMode("deepfake")}
          style={{ backgroundColor: mode === "deepfake" ? "hotpink" : "gray", margin: "10px 0" }}
        >
          Deepfake Detection
        </button>

        <button
          onClick={() => setMode("fakenews")}
          style={{ backgroundColor: mode === "fakenews" ? "hotpink" : "gray", margin: "10px 0" }}
        >
          Fake News Detection
        </button>
      </div>

      {/*  Main UI */}
      <div style={{
        flex: 1,
        backgroundColor: "black",
        color: "white",
        textAlign: "center",
        paddingTop: "50px"
      }}>

        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ color: "hotpink" }}
        >
          {mode === "deepfake" ? "Deepfake Detection" : "Fake News Detection"}
        </motion.h1>

        {/* File Upload */}
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <br /><br />

        {/* Upload Button */}
        <button onClick={uploadFile} style={{
          backgroundColor: "hotpink",
          padding: "10px 20px",
          border: "none"
        }}>
          Check File
        </button>

        {/* Camera Controls */}
        <div style={{ marginTop: "20px" }}>
          <button onClick={openCamera}>Open Camera</button>
          <button onClick={stopCamera} style={{ marginLeft: "10px" }}>
            Stop Camera
          </button>
        </div>

        {/*  Camera Section */}
        {cameraOn && (
          <div style={{ marginTop: "20px" }}>
            <video ref={videoRef} autoPlay width="400" />
            <br />

            <button onClick={captureImage} style={{ marginTop: "10px" }}>
              Capture & Check
            </button>

            <br /><br />

            <button onClick={startRealtimeDetection}>
              Start Real-time
            </button>

            <button onClick={stopRealtimeDetection} style={{ marginLeft: "10px" }}>
              Stop Real-time
            </button>
          </div>
        )}

        {/* Result */}
        {result && (
          <div style={{ marginTop: "20px" }}>
            <h2>Result: {result.result}</h2>
            <h3>Confidence: {result.confidence}</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;