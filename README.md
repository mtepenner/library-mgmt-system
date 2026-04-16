# 📚 Library Management System

The Library Management System is a full-stack React and Node.js application for role-based catalog management. Visitors can search an alphabetized collection, save favorites, and schedule book pickups. Administrators use a secure dashboard to manage books and genres, authorized by a unique one-time Admin ID system.

## 🏗️ Architecture
The project is split into two main components:
* **`backend/`**: A RESTful API powered by Node.js, Express, and Prisma ORM.
* **`frontend/`**: A React single-page application styled with Tailwind CSS.

## 🌟 Key Features

### User Roles
* **Visitors**: Can browse the catalog, search for books, save favorites, and schedule pickups.
* **Administrators**: Access to a protected dashboard to manage books, create genres, and authorize new admin accounts.

### Core Functionality
* **Secure Authentication**: Role-based access control using JSON Web Tokens (JWT) and bcrypt password hashing.
* **Dynamic Catalog**: An automatically alphabetized list of books with genre-based filtering.
* **Admin Onboarding**: A secure system requiring a pre-generated `Admin_ID` code for staff registration to prevent unauthorized access.

## 🛠️ Tech Stack
* **Frontend**: React (Vite), Tailwind CSS, React Router, Axios.
* **Backend**: Node.js, Express.js.
* **Database**: PostgreSQL with Prisma ORM.
* **Security**: JWT for session management and bcrypt for credential encryption.

## 🚀 Getting Started

### Prerequisites
* Node.js (v16+)
* PostgreSQL instance

### Installation

1.  **Clone the repository** and navigate to the project root.
2.  **Backend Setup**:
    ```bash
    cd backend
    npm install
    ```
    * Create a `.env` file with `DATABASE_URL`, `JWT_SECRET`, and `PORT`.
    * Run migrations: `npx prisma migrate dev`.
3.  **Frontend Setup**:
    ```bash
    cd ../frontend
    npm install
    ```

### Initial Admin Creation
Because the system requires a valid code for Admin registration, you must seed the first code manually:
1.  Navigate to `backend/` and run `npx prisma studio`.
2.  Add a new record to the `Admin_ID` model (e.g., `INIT-ADMIN-2024`).
3.  Use this code on the registration page to create the primary administrator account.

## 📁 Repository Structure
```text
library/
├── backend/            # Express API & Database Logic
│   ├── controllers/    # Request handlers (Auth, Books)
│   ├── prisma/         # Database schema and migrations
│   └── routes/         # API endpoint definitions
└── frontend/           # React Client
    ├── src/
    │   ├── components/ # UI Views (Dashboard, Catalog, Login)
    │   └── services/   # API configuration (Axios interceptors)
```
