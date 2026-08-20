# HackMinds 🧠
**AI-Powered System Architecture Synthesizer**

[![Live Demo](https://img.shields.io/badge/Live_Demo-hackminds.vercel.app-6366f1?style=for-the-badge)](https://hackminds.vercel.app/)

HackMinds is a full-stack SaaS platform designed to solve the "blank canvas" problem developers face at the start of a project. By simply inputting a desired technology stack and project scale, the application utilizes a Google Gemini neural engine to instantly generate a comprehensive, production-ready software blueprint, complete with database schemas and a generated pitch deck.

---

## 🚀 Core Capabilities

* **System Architecture Synthesis:** Generates production-ready blueprints, handling everything from monolithic structures to complex microservices based on your specific tech stack.
* **Intelligent Schema Design:** Outputs optimized, scalable data models tailored for your chosen relational or NoSQL databases.
* **Automated Pitch Deck Generation:** Instantly creates 5-slide presentation outlines and elevator pitches tailored to impress hackathon judges and investors.
* **Project Memory & Management:** Automatically saves generated architectures to a MongoDB database. Users can review past blueprints from a centralized dashboard and securely delete old iterations.
* **Premium UI/UX:** Features a highly immersive, dark-mode-first interface built with Framer Motion, glassmorphism, dynamic border-beams, and responsive Tailwind CSS layouts.

---

## 🛠️ Tech Stack

### Frontend (Deployed on Vercel)
* **Framework:** React (via Vite)
* **Styling:** Tailwind CSS v4
* **Animations:** Framer Motion, Typewriter-Effect
* **Icons:** Lucide-React
* **Markdown Parsing:** React-Markdown

### Backend (Deployed on Render)
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB & Mongoose
* **AI Engine:** Google Generative AI (gemini-1.5-flash)
* **Architecture:** Enterprise MVC (Model-View-Controller) Pattern

---

## 📂 Project Structure

The project follows a modular, scalable architecture separating the client-side UI from the server-side business logic.

~~~text
HackMinds/
│
├── client/                     # React Frontend
│   ├── src/
│   │   ├── components/         # Modular UI Components
│   │   │   ├── GeneratePage.jsx
│   │   │   ├── HistoryPage.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   ├── Toast.jsx
│   │   │   └── TopNavbar.jsx
│   │   ├── App.jsx             # React Router Setup
│   │   ├── api.js              # Centralized API Configuration
│   │   ├── index.css           # Tailwind & Custom CSS
│   │   └── main.jsx
│   ├── vercel.json             # Vercel Routing Configuration
│   └── package.json
│
├── server/                     # Express Backend
│   ├── config/
│   │   └── db.js               # MongoDB Connection
│   ├── controllers/
│   │   └── projectController.js# AI & DB Logic (CRUD operations)
│   ├── models/
│   │   └── Project.js          # Mongoose Schema
│   ├── routes/
│   │   └── projectRoutes.js    # Express API Routes
│   ├── .env                    # Environment Variables
│   ├── index.js                # Server Entry Point
│   └── package.json
~~~

---

## ⚙️ Local Installation & Setup

### Prerequisites
Make sure you have the following installed on your machine:
* Node.js (v16 or higher)
* MongoDB (Local instance or MongoDB Atlas)
* Google Gemini API Key

### 1. Clone the Repository
~~~bash
git clone https://github.com/Kartikay-goel/HackMinds.git
cd HackMinds
~~~

### 2. Backend Setup
Navigate to the server directory and install dependencies:
~~~bash
cd server
npm install
~~~

Create a `.env` file in the `server` root and add the following variables:

| Variable | Description | Example |
| :--- | :--- | :--- |
| `PORT` | The port your server will run on. | `5000` |
| `MONGO_URI` | Your MongoDB connection string. | `mongodb://localhost:27017/hackminds` |
| `GEMINI_API_KEY` | Your Google AI Studio API key. | `AIzaSyYourKeyHere...` |

Start the backend server:
~~~bash
npm start
~~~

### 3. Frontend Setup
Open a new terminal window, navigate to the client directory, and install dependencies:
~~~bash
cd client
npm install
~~~

Create a `.env` file in the `client` root if you need to override the default local API URL:
~~~env
VITE_API_BASE_URL=http://localhost:5000
~~~

Start the Vite development server:
~~~bash
npm run dev
~~~

The application will now be running at `http://localhost:5173`.

---

## 💡 Usage Guide

1. **Initialize Engine:** Navigate to the "Architect" tab from the top navigation bar.
2. **Define Arsenal:** Enter your specific languages, frameworks, and databases (e.g., "Next.js, Tailwind, MongoDB").
3. **Set Scale:** Choose between *Hackathon MVP*, *Startup Beta*, or *Enterprise Grade*.
4. **Generate:** Click "Ignite Architecture" and wait for the Gemini AI to synthesize your markdown blueprint.
5. **Pitch Deck:** Once generated, click "Build Pitch Deck" to instantly append a presentation outline.
6. **Manage:** Visit the "History" tab to view your past blueprints. Hover over any card and click the Trash icon to securely delete it from the database.

---

## 👨‍💻 Author

**Kartikay Goel**
* GitHub: [@Kartikay-goel](https://github.com/Kartikay-goel)

---

