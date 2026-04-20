# Gift-Registry-Wishlist-App
A personal gift registry and wishlist platform where users can create wishlists and allow friends to reserve gifts to avoid duplicates.

Description

A full-stack web application designed to allow users to create and manage personal gift registries and wishlists. This platform enables friends and family to view the wishlist and privately reserve gifts to avoid duplicates, featuring support for optional anonymous visitor participation.

## 🚀 Features
- **Gift Registry Management**: Admin can create, view, edit, and delete gifts on the registry.
- **Smart Reservation System**: Visitors can reserve gifts to prevent duplicate purchases. The system supports both named tracking and optional anonymous participation.
- **Secure Authentication**: Protected admin login system utilizing JWT & Bcrypt.
- **Modern & Responsive UI**: Clean, responsive Indigo-themed design customized for an optimal user experience across all devices.
- **Real-time Notifications**: Custom interactive toast alerts for successes, errors, and validation warnings.
## 💻 Tech Stack
**Frontend (Client)**:
- React 19 (Vite)
- Tailwind CSS (Styling)
- React Router DOM (Navigation)
- Axios (HTTP client)
- Lucide React (Icons)
- React Hot Toast (Notifications)
**Backend (Server)**:
- Node.js
- Express.js
- MongoDB & Mongoose (Database & ORM)
- JSON Web Token (Authentication)
- Bcrypt.js (Password Hashing)
## 📁 Project Structure
The project is a monorepo containing two main folders:
- `/client`: Contains the React Vite application (Frontend).
- `/server`: Contains the Express REST API (Backend).
## 🛠️ Getting Started
### Prerequisites
- [Node.js](https://nodejs.org/en/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) account (Atlas) or local MongoDB instance
### Installation
1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd Gift-Registry-Wishlist-App
Set up the Backend (/server): Open a terminal and set up the server dependencies.

bash
cd server
npm install
Create a .env file in the /server directory and configure the environment variables:

env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
Start the backend server in development mode:

bash
npm run dev
Set up the Frontend (/client): Open a new terminal and set up the client dependencies.

bash
cd client
npm install
Create a .env file in the /client directory and configure the API URL:

env
VITE_API_URL=http://localhost:5000/api
Start the frontend application:

bash
npm run dev
🎯 Usage
Access the application interface via http://localhost:5173.
Log in to the admin dashboard using your credentials to manage registry items.
Share the public-facing application link with your friends and family so they can begin reserving gifts!

PROJECT OVERVIEW,CODE EXPLANATION VIDEO:
https://drive.google.com/file/d/17WbKMXy2A8uIqI9WRPrPUFVhtBF2B81V/view?usp=sharing
