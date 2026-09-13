# PCV Backend — Petty Cash Voucher (PCV) System

## Overview
This folder contains the backend server for the Petty Cash Voucher system. It is a Node.js / Express application that implements the API endpoints used by the frontend to manage users, vouchers, leave requests, and email sending (demo mail capture).

## Languages & Frameworks
- Node.js (JavaScript)
- Express.js for routing and controllers
- MongoDB (or similar) accessed via `config/database.js` and model files under `models/`.

## Key files & folders
- `server.js` — entry point for the server.
- `controllers/` — route handlers for vouchers, auth, admin, email, leave requests, etc.
- `routes/` — route definitions wired to controllers.
- `models/` — data models (Admin, User, Voucher, LeaveRequest, Email, etc.).
- `middleware/` — authentication middleware, etc.
- `config/database.js` — DB connection configuration.
- `utils/` — helper utilities, e.g., `superAdmin.js`.

## How this backend contributes
The backend handles:
- User onboarding, authentication, and role management.
- Voucher creation, approval workflows, and status updates.
- Leave request submission and approval flows.
- Email sending/recording for demo inboxing (an inbox API used by the frontend).

## Local development
1. From the `pcv-backend` directory install dependencies:

```bash
cd pcv-backend
npm install
```

2. Start the server:

```bash
node server.js
```

3. By default, the server expects environment variables for database connection and email configuration. Set them accordingly in your environment or via a `.env` file.

## Deploying to Render
- Repository root for the backend: the `pcv-backend` directory.
- Create a new Web Service on Render and link your GitHub repo.
- In Render settings specify:
  - Root directory: `pcv-backend`
  - Build command: `npm install`
  - Start command: `node server.js`
- Set the required environment variables on Render (DB connection string, any email provider credentials, `NODE_ENV=production`, etc.).

## API base URL
Once deployed on Render, use the deployment URL as the frontend `VITE_API_BASE_URL` environment variable so the frontend can call the API.

## Notes on email / inbox behavior
- The frontend’s inbox page fetches messages from the backend `/api/email/inbox` endpoint. Email routing and which users receive which message types are defined by the backend email sending logic. To ensure only approved vouchers are delivered to finance manager you must implement those rules in the backend email-sending controller (`controllers/emailController.js`).

---
Created for repository: pcv-backend
