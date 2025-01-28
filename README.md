# PerfectFit - MERN Stack Application

This repository contains the codebase for the **PerfectFit** e-commerce application, built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It is organized into three main folders:

- **backend/**: Contains the server-side code (API and business logic).
- **frontend/**: Contains the client-side code (user interface).
- **admin/**: Contains the admin panel for managing products, users, and orders.

---

## Prerequisites
Before running the application, ensure you have the following installed:
- **Node.js** (v16 or higher recommended)
- **npm** or **yarn**
- **MongoDB Atlas** account (for database connection)
- **Cloudinary** account (for media storage)
- **Mailtrap** account (for email testing)
- **Razorpay** account (for payment integration)

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/perfectfit-mern.git
cd perfectfit-mern
```

### 2. Install Dependencies
Install the required dependencies for all three folders:

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd ../frontend
npm install
```

#### Admin
```bash
cd ../admin
npm install
```

### 3. Configure Environment Variables
Each folder requires a `.env` file with its respective environment variables. Below are the basic requirements:

#### Backend (`backend/.env`)
Refer to the `backend/README.md` for detailed environment variables setup.

#### Frontend (`frontend/.env`)
```env
REACT_APP_BACKEND_URL=http://localhost:5000
REACT_APP_API_KEY=your_api_key
```

#### Admin (`admin/.env`)
```env
REACT_APP_BACKEND_URL=http://localhost:5000
REACT_APP_ADMIN_KEY=your_admin_key
```

> **Note:** Replace placeholders with actual values in production.

### 4. Start the Applications
Run the backend, frontend, and admin panel:

#### Backend
```bash
cd backend
npm start
```

#### Frontend
```bash
cd frontend
npm start
```

#### Admin
```bash
cd admin
npm start
```

---

## Folder Structure
```
perfectfit-mern/
├── backend/           # Server-side code
├── frontend/          # User-facing client-side code
├── admin/             # Admin panel for managing the application
└── README.md          # Documentation for the repository
```

---

## Features
- **User Authentication**: Secure login and registration.
- **Product Management**: Add, edit, and delete products.
- **Order Management**: Manage user orders efficiently.
- **Payment Integration**: Razorpay for secure transactions.
- **Image Uploads**: Cloudinary integration for media storage.
- **Email Notifications**: Mailtrap for development testing.

---

## Notes
- Ensure all `.env` files are properly configured before starting.
- Use `.gitignore` to exclude sensitive files like `.env` from version control.

For further details, check the individual `README.md` files in the respective folders or contact the repository owner.