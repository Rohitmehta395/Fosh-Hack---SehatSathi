# 🩺 SehatSaathi

**AI-powered medical report analysis — simple, secure, multilingual.**

---

## 🚀 Overview
SehatSaathi helps users understand medical reports in plain language. Upload a report → get a clear explanation in **English, Hindi, and Hinglish** within seconds.

---

## 🛠 Tech Stack
**Frontend:** React, Redux Toolkit, Tailwind CSS  
**Backend:** Node.js, Express  
**Database:** MongoDB  
**AI:** Google Gemini (analysis), Sarvam AI (multilingual output)

---

## ✨ Key Features
- 📄 Upload PDF/Image reports (≤10MB)
- 🤖 AI-based medical analysis
- 🌐 Multilingual output (EN, हिंदी, Hinglish)
- 🔐 Secure authentication (JWT + Google OAuth)
- 📜 History tracking with delete/view options

---

## 🔄 Flow
1. Upload report  
2. Gemini analyzes report  
3. Sarvam converts to 3 languages  
4. Result displayed + optionally saved  

---

## 🔌 API
### Auth
- `POST /auth/signup`
- `POST /auth/login`
- `POST /auth/google`

### Report
- `POST /report/analyze`

### History (JWT required)
- `GET /history`
- `POST /history/save`
- `DELETE /history/:id`

---

## 🔐 Security
- Passwords hashed (bcrypt)
- JWT authentication
- Google OAuth verified server-side
- Files processed in memory (not stored)
- Only results saved in DB

---

## 🧠 AI Pipeline
- **Gemini:** Extracts key medical insights  
- **Sarvam:** Converts output → English + Hindi + Hinglish  

---

## 🗂 Database
**MongoDB**  
- Stores user data and report history  
- No raw files stored (only processed results)

---

## ⚙️ Setup
```bash
# Backend
cd backend
npm install
npm start

# Frontend
cd frontend
npm install
npm run dev
