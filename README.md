# 🏨 Velora Grand - Luxury Resort Booking System

[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

A modern, high-end, responsive booking website and administration dashboard for **Velora Grand**, a luxury beach resort. This project contains a production-ready SPA frontend integrated with a secure Node.js/Express backend featuring HTTPS configurations, SSL, role-based access control, and robust session management.

---

## ✨ Features

### 🌟 Luxury Frontend (Vite + React)
- **Stunning UI Layout**: Elegant glassmorphism designs, deep rich color scheme (matching HSL brand-tan and brand-dark palette), smooth micro-animations powered by **Motion** (Framer Motion).
- **Interactive Search & Reservation Bar**: Fully responsive calendar booking, date check validation, and custom guest count controllers.
- **Dynamic Booking & Checkouts**: Real-time room price calculations based on nights, guests, and category type.
- **Fully Responsive Navigation**: Mobile-first optimized menus, custom touch targets (44px+ targets), and lockable body scrolls on open overlay menus.

### 🛡️ Admin Dashboard (`/admin`)
- **Key Metrics Row**: Interactive indicators summarizing revenue, occupied rooms, pending status, and total checkins.
- **Advanced Bookings Manager**: Search bookings by Name/ID/Room, filter by status, sort columns, paginate results, and download bookings data as CSV.
- **Rich Status Transition Panels**: Manage booking states directly, transitions from Pending ➔ Confirmed ➔ Completed / Cancelled.

### 🔒 Secure Backend (Node.js + Express)
- **Express Server Architecture**: Structured API controllers, middleware layers, and centralized error handling.
- **Strict User & Admin Roles**: Account registration, password hashing (bcrypt), and authorization validation.
- **Token Security (JWT)**: JSON Web Token auth using HTTP-Only secure cookies to safeguard sessions from XSS.
- **Dual HTTP & HTTPS Servers**: Setup for localhost HTTPS self-signed certs and certbot integration for production load balancers.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Lucide React, Motion.
- **Backend**: Node.js, Express, Mongoose, JWT, Cookie-Parser, CORS, Helmet.
- **Database**: MongoDB (Atlas Cloud or local server).

---

## 📁 Folder Structure

```text
Velora_grand/
├── api/                    # Vercel Serverless Function entrypoint
├── public/                 # Favicons and static web assets
├── src/
│   ├── backend/            # Express Backend API
│   │   ├── config/         # Database and server config
│   │   ├── controllers/    # API Route controllers
│   │   ├── middleware/     # Auth checks, error capture, security
│   │   ├── models/         # Mongoose Schemas (User, Room, Booking)
│   │   ├── routes/         # Backend Express API Routes
│   │   └── utils/          # Helpers
│   ├── components/         # Frontend React Components (AdminDashboard)
│   ├── App.tsx             # Main React Application UI
│   ├── main.tsx            # Vite client bootstrap
│   └── index.css           # Styling directives, fonts, brand variables
├── server.ts               # Local HTTP Development Server
├── server-https.ts         # Local HTTPS Production-Simulation Server
├── package.json            # Node configuration scripts & dependencies
└── tsconfig.json           # TypeScript configuration
```

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js**: v18 or later
- **MongoDB**: Active local MongoDB database or MongoDB Atlas cloud cluster

### 2. Installation
Clone the project repository and run the setup commands in your terminal:
```bash
# Clone the repository
git clone https://github.com/your-username/velora-grand.git
cd velora-grand

# Install dependencies
npm install
```

### 3. Environment Setup
Rename the `.env.example` file to `.env`:
```bash
cp .env.example .env
```
Open `.env` and fill in the necessary environment configurations:
```env
NODE_ENV=development
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key_here
ADMIN_SECRET_CODE=secret_admin_registration_code_123
CLIENT_URL=http://localhost:3000
```

### 4. Running Locally
Run the development server in your local shell:
```bash
npm run dev
```
Open **`http://localhost:3000`** in your browser to experience the site.

---

## 🔒 HTTPS and SSL Setup

This system includes production-ready HTTPS configuration (`server-https.ts`) to simulate secure environments.

### Development Environment (Self-Signed)
1. Generate self-signed keys in a new `certs` folder:
   ```bash
   mkdir certs
   openssl req -nodes -new -x509 -keyout certs/server.key -out certs/server.crt -days 365
   ```
2. Enable SSL path mappings in your `.env`:
   ```env
   CERT_PATH=./certs/server.crt
   KEY_PATH=./certs/server.key
   HTTPS_PORT=443
   PORT=80
   ```
3. Run the HTTPS server (requires administrator permissions to bind standard port numbers):
   ```bash
   npx tsx server-https.ts
   ```

---

## 📡 API Endpoints

### 🔐 Authentication
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Create user profile |
| `POST` | `/api/auth/login` | Log in user (returns JWT inside HTTP-Only cookie) |
| `POST` | `/api/auth/logout` | End session and clear auth cookies |

### 🏨 Booking & Services
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/rooms` | Fetch all resort rooms | Public |
| `GET` | `/api/rooms/:id` | Get room specifications | Public |
| `POST` | `/api/bookings` | Book a room for selected dates | User |
| `GET` | `/api/bookings/mybookings` | List active bookings of the user | User |

### 🛠️ Admin Dashboard
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/admin/register` | Register admin (requires secret code validation) | Public |
| `POST` | `/api/admin/login` | Log in administrator | Public |
| `GET` | `/api/admin/stats` | Fetch revenue and occupancy metrics | Admin |

---

## 📜 License

Distributed under the **MIT License**. See `LICENSE` for details.
