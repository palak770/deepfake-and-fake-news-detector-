# 🚀 Deepfake & Fake News Detection System

## 🧠 Overview
This project is an AI-based system that detects:
- 🎥 Deepfake images/videos using CNN
- 📰 Fake news using NLP models

It includes a modern React UI and FastAPI backend with real-time camera detection.

---

## ✨ Features

### 🔍 Deepfake Detection
- Upload image
- Live camera detection (frame-by-frame)
- CNN model (TensorFlow/Keras)

### 📰 Fake News Detection
- Text input detection
- ML model (TF-IDF + classifier)

### 🎨 Frontend
- React UI
- Sidebar for switching modes
- Live result display

### ⚡ Backend
- FastAPI
- Separate APIs for deepfake & fake news

---

## 🛠️ Tech Stack

- Frontend: React, JavaScript
- Backend: FastAPI (Python)
- Deep Learning: TensorFlow/Keras
- ML: Scikit-learn
- Tools: OpenCV, PIL

---

## 📂 Project Structure
deepfake/
│
├── backened/
│ ├── main.py
│ ├── model.h5
│
├── dataset/
│
├── src/ (React frontend)
│
├── fake-news/
│ ├── backend/
│ │ ├── main.py
│ │ ├── model.pkl
│ │ └── vectorizer.pkl


---

## 🚀 How to Run

### Backend (Deepfake)
cd deepfake/backened
uvicorn main:app --reload


---

### Fake News Backend

cd fake-news/backend
uvicorn main:app --reload --port 8001


---

### Frontend

npm install
npm run dev


---

## 🔌 API Endpoints

### Deepfake
POST /predict → http://127.0.0.1:8000

### Fake News
POST /predict → http://127.0.0.1:8001

---

## ⚠️ Notes

- Model files (.h5, .pkl) are not uploaded (large size)
- Dataset not included

---

## 🎯 Future Work

- Real-time streaming (WebSockets)
- Face detection
- Better NLP (BERT)
- Deployment

---

## 👨‍💻 Author

Palak


B.Tech AI & ML

---

## ⭐ Star this repo if you like it!
