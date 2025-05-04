# 📧 Email Marketing Sequence Builder

A full-stack MERN application that allows users to visually build and schedule automated email sequences using a flowchart. Built with ReactFlow, Node.js, MongoDB, Agenda.js, and Nodemailer.

---

## 🌐 Live Project Links

| Component     | URL                                                               |
|---------------|--------------------------------------------------------------------|
| 🔵 Frontend    | https://email-marketing-sequence-builder.vercel.app              |
| 🟢 Backend API | https://email-marketing-sequence-builder-backend.onrender.com     |

---

## 🚀 Tech Stack

- **Frontend**: React, ReactFlow
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Scheduler**: Agenda.js
- **Mailer**: Nodemailer
- **Authentication**: JWT
- **Deployment**: Vercel (Frontend), Render (Backend)

---

## ✅ Features

- 🔐 Secure user authentication with JWT
- 🧩 Visual flow editor using ReactFlow
- 📨 Schedule and automate email sequences
- ⏳ Add delay nodes (in minutes) between emails
- 📤 Emails sent using Nodemailer & Gmail
- 🧪 API tested using Postman
- 🧪 Unit tests using Jest for backend

---

## 📹 Demo Video

📺 [Watch the Demo](#)  
*(Insert your Google Drive or YouTube link)*

---

## 🔐 Authentication Flow

- Signup/Login via `/api/signup` or `/api/login`
- JWT token is stored in `localStorage`
- Token sent as `Authorization: Bearer <token>` in all secured requests

---

## 📬 Postman API Collection

🧪 You can test the API endpoints using Postman.

---

## 📬 Postman API Example

### Endpoint:
POST https://email-marketing-sequence-builder-backend.onrender.com/api/save-flow
### Headers and Body:
```http
Content-Type: application/json  
Authorization: Bearer <your-token>
{
  "nodes": [
    {
      "id": "1",
      "type": "leadSource",
      "data": {
        "leadEmail": "test@example.com"
      }
    },
    {
      "id": "2",
      "type": "coldEmail",
      "data": {
        "subject": "Welcome!",
        "body": "Thanks for signing up!"
      }
    },
    {
      "id": "3",
      "type": "delay",
      "data": {
        "delay": "2"
      }
    }
  ],
  "edges": [
    { "source": "1", "target": "2" },
    { "source": "2", "target": "3" }
  ]
}

{
  "message": "✅ Flow scheduled successfully!" //sample response
}
 Postman collection included: /postman/EmailFlow.postman_collection.json


ENVIRONMENT SETUPS
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/...
JWT_SECRET=your_jwt_secret
REACT_APP_API_URL=https://email-marketing-sequence-builder-backend.onrender.com

RUNNING BACKEND TEST
cd server
npm install
npm test

FOLDER STRUCTURE
email-marketing-sequence-builder/
├── client/             # React + ReactFlow frontend
│   ├── src/
│   └── .env
├── server/             # Express.js backend with Agenda + Nodemailer
│   ├── jobs/
│   └── .env.example
├── postman/            # Postman API collection
├── README.md
└── .gitignore

How It Works
User signs up or logs in

Creates a visual flow using blocks (Lead → Email → Delay → Email)

Flow is sent to backend using POST /api/save-flow

Agenda schedules jobs based on delay blocks

Nodemailer sends emails at correct times

 Submission Checklist
 Frontend with ReactFlow editor

 Cold Email, Delay, Lead Source nodes

 JWT Auth (Login/Signup)

 Flow saving and scheduling

 Nodemailer + Agenda integration

 .env.example file

 Unit tests with Jest

 Postman Collection

 Deployed frontend + backend

 Demo video link

 Complete README
