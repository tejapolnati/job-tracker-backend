# Job Tracker Backend API

A secure backend API for tracking job applications with JWT authentication and MySQL database integration.

---

## Features

- User Signup
- User Login with JWT Authentication
- Protected Routes
- Add Job Application
- Fetch User Jobs
- Update Job Details
- Delete Job Application

---

## Tech Stack

- Node.js
- Express.js
- MySQL
- JWT Authentication
- bcrypt
- Postman

---

## API Endpoints

### Auth Routes

| Method | Endpoint | Description       |
| ------ | -------- | ----------------- |
| POST   | /signup  | Register new user |
| POST   | /login   | Login user        |

---

### Job Routes

| Method | Endpoint        | Description       |
| ------ | --------------- | ----------------- |
| POST   | /add-job        | Add new job       |
| GET    | /jobs           | Get all user jobs |
| PUT    | /update-job/:id | Update job        |
| DELETE | /delete-job/:id | Delete job        |

---

## Installation

```bash
git clone <your_repo_url>
cd job-tracker-backend
npm install
```

---

## Run Server

```bash
node server.js
```

---

## Environment Variables

Create a `.env` file:

```env
JWT_SECRET=your_secret_key
DB_NAME=job_tracker
```

---

## Sample Protected Header

```text
Authorization: your_jwt_token
```

---

## Future Improvements

- Role-based authentication
- Pagination
- Search & filtering
- Deployment
- Frontend integration

---

## Author

Teja
