# Petty Cash Voucher (PCV) System (Backend)
**This repository contains the Node.js/Express API and MongoDB for the Petty Cash Voucher web app for a fintech company, Getpayed Technology Solutions Ltd** <br> <br>
Live Demo: https://voucher-system-client.netlify.app <br>
Frontend Repository: https://github.com/oliviaigbinosa/voucher-system-client 
## This repository handles: <br>
- User onboarding, authentication, and role management.
- Voucher creation, approval workflows, and status updates.
- Leave request submission and approval flows.
- Sending of voucher and leave request emails via nodemailer
## Tech Stack
### Runtime:
Node.js v20.0.0
### Language:
JavaScript: ES Modules (type: module)
### Database:
MongoDB (via Mongoose): ^8.16.0
### Key Dependencies:
dotenv v16.5.0, for environment variables  <br>
nodemailer v9.0.3, for email sending
### Security
- Helmet v8.3.0, to set security-related HTTP headers like X-Content-Type-Options to secure the Express app
- CORS v2.8.5, to prevent unauthorized cross-origin requests
- express-rate-limit v8.7.0, to prevent brute force attacks and DDoS attempts
- express-mongo-sanitize v2.2.0, to prevent NoSQL injection attacks
- bcryptjs v3.0.2, for password security
- jsonwebtoken v9.0.3, to enable secure user authentication
- express-validator v7.3.2, to validate and sanitize user input
