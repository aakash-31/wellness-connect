<div align="center">
  <img src="https://img.icons8.com/color/96/000000/leaf.png" alt="Wellness Connect Logo"/>
  <h1>Wellness Connect</h1>
  <p><i>A full-stack mental wellness platform for community connection, mindful journaling, and therapeutic resources.</i></p>
  
  <p>
    <a href="https://wellness-connect-topaz.vercel.app/"><img src="https://img.shields.io/badge/Live_Demo-Available-success?style=for-the-badge&logo=vercel" alt="Live Demo" /></a>
    <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
    <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node" />
    <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
    <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License" />
  </p>
</div>

<br />

## Overview

**Wellness Connect** is a responsive, production-ready MERN stack application designed to support mental well-being. It provides users with a safe, authenticated environment to share experiences in an anonymous community, maintain a private mood-tracking journal, practice guided mindfulness, and locate professional therapists via interactive maps.

Built with a focus on **security**, **performance**, and **user experience**, this project showcases modern full-stack development practices including RESTful API design, robust authentication, state management, and responsive UI/UX.

---

## Live Demo & Access

> **Production Application:** [https://wellness-connect-topaz.vercel.app/](https://wellness-connect-topaz.vercel.app/)

To instantly explore authenticated features without creating an account, you can use the pre-seeded demo credentials:

| Field | Demo Credentials |
| :--- | :--- |
| **Email** | `demo@wellnessconnect.com` |
| **Password** | `demo123` |

*Note: The demo account is pre-populated with sample journal entries and community posts.*

---

## Key Features

### Secure Authentication & Authorization
- Robust JWT-based authentication with 30-day token expiration.
- Password hashing utilizing `bcryptjs` (salt rounds: 10).
- Protected API routes and protected React routes preventing unauthorized access.
- Secure HTTP headers and rate-limiting using `helmet` and `express-rate-limit`.

### Interactive Community Feed
- Reddit-style anonymous community discussion board.
- Dynamic filtering by categories (e.g., Anxiety, Motivation, General).
- Real-time sorting by 'Recent' or 'Trending' (based on engagement).
- Like/Unlike functionality for posts.

### Private Journaling & Mood Tracking
- Secure, user-isolated journaling system.
- Daily mood logging with dynamic visual tags.
- Full CRUD capabilities for journal entries.

### Mindfulness & Self-Assessment
- **Breathing Visualizer:** Interactive 4-7-8 breathing exercise with CSS-driven animations, cycle counters, and session timers.
- **Mood Check-In:** 5-question cognitive self-assessment generating personalized wellness insights.

### Therapist Locator
- Searchable directory of mental health professionals.
- Real-time debounced search queries for optimized API usage.
- Integrated mapping via `leaflet` and `react-leaflet`.

### Modern UI/UX
- Responsive, mobile-first design built with **Tailwind CSS**.
- Accessible navigation, comprehensive error handling, and customized 404 pages.
- Global toast notifications for user actions.

---

## Technology Stack

### Frontend Architecture
- **Framework:** React 19 + Vite for rapid development and optimized builds.
- **Routing:** React Router v7.
- **Styling:** Tailwind CSS with custom design tokens.
- **Data Fetching:** Axios with global request/response interceptors for JWT injection.
- **Mapping:** Leaflet & React-Leaflet.

### Backend Architecture
- **Runtime:** Node.js.
- **Framework:** Express 5 (with native async error handling).
- **Database:** MongoDB with Mongoose ODM.
- **Security:** Helmet, Express Rate Limit, CORS.
- **Logging:** Morgan.
- **Auth:** JSON Web Tokens (jsonwebtoken).

---

## Project Structure

```text
wellness-connect/
├── backend/
│   ├── controllers/      # Business logic & route handlers
│   ├── middleware/       # Custom Express middlewares (Auth, Error Handling)
│   ├── models/           # Mongoose schemas (User, Post, Journal, Therapist)
│   ├── routes/           # RESTful API route definitions
│   ├── seed.js           # Database population script
│   └── server.js         # Application entry point
│
└── frontend/
    ├── src/
    │   ├── api/          # Axios configurations and interceptors
    │   ├── components/   # Reusable UI components (Navbar, ProtectedRoute)
    │   ├── context/      # React Contexts (Auth, UI State)
    │   ├── pages/        # Route components
    │   └── App.jsx       # Root component and router configuration
    ├── package.json
    └── vite.config.js
```

---

## Local Development Setup

Follow these instructions to run the project locally.

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas cluster)

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/wellness-connect.git
cd wellness-connect
```

### 2. Backend Setup
Navigate to the backend directory, install dependencies, and configure environment variables.
```bash
cd backend
npm install
```
Create a `.env` file in the `/backend` directory:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/wellness-connect
JWT_SECRET=your_super_secret_jwt_key_here
```
Start the backend development server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal, navigate to the frontend directory, install dependencies, and configure environment variables.
```bash
cd frontend
npm install
```
Create a `.env` file in the `/frontend` directory:
```env
VITE_API_URL=http://localhost:5000/api
```
Start the Vite development server:
```bash
npm run dev
```

### 4. Database Seeding (Optional)
To populate your local database with therapists and sample posts:
```bash
cd backend
node seed.js
```

---

## Security Measures Implemented

1. **Helmet.js**: Secures Express apps by setting various HTTP headers.
2. **Rate Limiting**: Protects APIs against Brute-Force and DDoS attacks.
3. **Data Sanitization**: Mongoose schemas enforce strict validation.
4. **CORS Policy**: Configured to only allow requests from trusted frontend origins.
5. **Authorization Verification**: Middleware explicitly checks database for user existence on every protected request, ensuring deleted/banned users instantly lose access even with valid tokens.
6. **Resource Isolation**: Users can only modify or delete data that belongs to their `userId`.

---

## Contributing

Contributions are welcome! If you have suggestions to improve the platform, please follow these steps:
1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## License

Distributed under the MIT License. Feel free to use this as a reference, portfolio piece, or starting point for your own projects.

---

<div align="center">
  <p>Built with care for mental well-being.</p>
</div>
