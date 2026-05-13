# 🌿 Wellness Connect

A full-stack MERN mental wellness platform where users can explore therapy resources, share in an anonymous community, maintain a private journal, and practice interactive mindfulness exercises.

> **Live Demo:** _[Add your deployed URL here]_  
> **Built as a portfolio project** — fully functional, production-ready architecture.

---

## 🔑 Demo Credentials

> Use these to explore all authenticated features instantly — no sign-up needed.

| Field | Value |
|---|---|
| **Email** | `demo@wellnessconnect.com` |
| **Password** | `demo123` |

> The demo account comes pre-loaded with journal entries and community posts so the app looks fully populated.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **JWT Authentication** | Secure register/login with bcrypt password hashing and 30-day tokens |
| 💬 **Community Feed** | Reddit-style posts with like/unlike toggle, category filters, sort by Recent or Trending |
| 📖 **Private Journal** | Authenticated, user-isolated journal entries with mood tagging |
| 🩺 **Therapist Directory** | Searchable & filterable directory with real-time debounced queries |
| ⚙️ **Account Settings** | Update username, email, password, or permanently delete account |
| 🌬️ **Breathing Visualizer** | Animated 4-7-8 breathing exercise with session timer and cycle counter |
| 🧠 **Mood Check-In** | 5-question self-assessment with personalized wellness recommendations |
| 📱 **Fully Responsive** | Mobile-first design with hamburger nav, works on all screen sizes |
| 🚫 **404 Page** | Branded Not Found page for invalid routes |

---

## 🛠️ Tech Stack

**Frontend**
- React 18 + Vite
- React Router v6
- Axios (with JWT interceptors)
- Tailwind CSS (custom design tokens)

**Backend**
- Node.js + Express.js
- MongoDB + Mongoose
- JSON Web Tokens (jsonwebtoken)
- bcryptjs

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/wellness-connect.git
cd wellness-connect
```

### 2. Backend setup
```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/wellness-connect
JWT_SECRET=your_super_secret_key_here
```

Start the backend:
```bash
npm run dev
```

### 3. Frontend setup
```bash
cd ../frontend
npm install
npm run dev
```

### 4. Seed the database (optional)
```bash
cd backend
node seed.js
```
This populates therapists and sample community posts.

---

## 🚀 Deployment

### 1. Backend (e.g., Render, Railway)
- Set `NODE_ENV` to `production`.
- Set `MONGO_URI` to your MongoDB Atlas connection string.
- Set `JWT_SECRET` to a strong, random string.
- Set `PORT` (usually provided automatically by the host).

### 2. Frontend (e.g., Vercel, Netlify)
- Set `VITE_API_URL` to your deployed backend URL (e.g., `https://your-api.onrender.com/api`).
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

---

## 📁 Project Structure

```
wellness-connect/
├── backend/
│   ├── controllers/     # Route handlers (user, post, journal, therapist)
│   ├── middleware/      # JWT auth middleware
│   ├── models/          # Mongoose schemas
│   ├── routes/          # Express routers
│   ├── seed.js          # Database seeder
│   └── server.js        # Entry point
│
└── frontend/
    └── src/
        ├── api/         # Axios instance with auth interceptor
        ├── components/  # Navbar, ProtectedRoute, BreathingExercise, MoodCheckIn
        ├── context/     # AuthContext, ToastContext
        └── pages/       # All page components
```

---

## 🔒 Security

- Passwords are hashed with **bcryptjs** (salt rounds: 10)
- All sensitive routes require a **Bearer JWT token**
- Users can only **delete their own posts/journals**
- Auth middleware validates token **and** confirms user still exists in DB

---

## 📸 Screenshots

> _Add screenshots here after deployment_

---

## 📄 License

MIT — feel free to use this as a reference or starting point for your own projects.
