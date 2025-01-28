# Backend Setup for PerfectFit

This document provides a guide to setting up and running the backend for the **PerfectFit** application.

## Prerequisites
Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher recommended)
- **npm** (comes with Node.js) or **yarn**
- **MongoDB Atlas** account (for database connection)
- **Cloudinary** account (for media storage)
- **Mailtrap** account (for email testing)
- **Razorpay** account (for payment integration)

---

## Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/mern-stack-project.git
   cd backend
   ```

2. **Install Dependencies**:
   Use npm or yarn to install required dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Variables**:
   Create a `.env` file in the root of the `backend` directory and add the following variables:
   
   ```env
   // Server
   PORT = 5000
   FRONT_END_URL = "<frontend_url>"
   ADMIN_URL = "<admin_url>"

   // MongoDB
   MONGODB_URI = "<mongodb_uri>"

   // JWT
   SALT_ROUNDS = 12
   JWT_SECRET = "<jwt_secret>"
   COOKIE_EXPIRE = 30

   // Email
   MAIL_TRAP_ENDPOINT = "<mail_trap_endpoint>"
   MAIL_TRAP_TOKEN = "<mail_trap_token>"
   SENDER_EMAIL = "<sender_email>"

   // Cloudinary
   CLOUDINARY_URL = "<cloudinary_url>"
   CLOUD_NAME = "<cloud_name>"
   CLOUDINARY_API_KEY = <cloudinary_api_key>
   CLOUDINARY_API_SECRET = "<cloudinary_api_secret>"

   // Razorpay
   RAZORPAY_API_KEY = "<razorpay_api_key>"
   RAZORPAY_API_SECRET = "<razorpay_api_secret>"
   ```

   > **Note:** Replace placeholder values (e.g., `<frontend_url>`, `<mongodb_uri>`, etc.) with your actual credentials when deploying to production.

4. **Start the Server**:
   Run the following command to start the backend server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:5000` by default.

---

## Key Features
- **MongoDB Atlas**: Stores product data, user information, and orders.
- **JWT Authentication**: Ensures secure user login and session management.
- **Cloudinary Integration**: Manages image uploads and media storage.
- **Mailtrap**: Handles email testing during development.
- **Razorpay**: Processes payments securely.

---

## Folder Structure
```
backend/
├── controllers/        # Business logic for routes
├── models/             # Database schemas
├── routes/             # API endpoints
├── utils/              # Helper functions and middleware
├── .env                # Environment variables (not included in GitHub)
├── server.js           # Entry point to start the server
└── package.json        # Project metadata and dependencies
```

---

## Testing
- Use tools like **Postman** or **Thunder Client** to test the API endpoints.
- Example API Endpoints:
  - `POST /api/auth/login`: Login a user.
  - `GET /api/products`: Fetch all products.

---

## Notes
- Always secure sensitive credentials before deploying.
- Use `.gitignore` to exclude the `.env` file from version control.

For further details, contact the repository owner.
