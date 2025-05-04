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
- ⚙️ Unit tests using Jest for backend

---

## 📹 Demo Video

📺 [Watch the Demo](#)  
*(Insert your Google Drive or YouTube link here)*

---

## 🔐 Authentication Flow

- Signup/Login via `/api/signup` or `/api/login`  
- JWT token is stored in `localStorage`  
- Token is sent as `Authorization: Bearer <token>` in secured routes

---

## 📬 Postman API Example

### Endpoint
```http
POST https://email-marketing-sequence-builder-backend.onrender.com/api/save-flow
```

### Headers
```http
Content-Type: application/json  
Authorization: Bearer <your-token>
```

### Body
```json
{
  "nodes": [
    {
      "id": "1",
      "type": "leadSource",
      "data": { "leadEmail": "test@example.com" }
    },
    {
      "id": "2",
      "type": "coldEmail",
      "data": { "subject": "Welcome!", "body": "Thanks for signing up!" }
    },
    {
      "id": "3",
      "type": "delay",
      "data": { "delay": "2" }
    }
  ],
  "edges": [
    { "source": "1", "target": "2" },
    { "source": "2", "target": "3" }
  ]
}
```

### Sample Response
```json
{
  "message": "✅ Flow scheduled successfully!"
}
```

📁 Postman collection included in: `/postman/EmailFlow.postman_collection.json`

---

## ⚙️ Environment Setup

### `server/.env.example`
```env
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/...
JWT_SECRET=your_jwt_secret
```

### `client/.env`
```env
REACT_APP_API_URL=https://email-marketing-sequence-builder-backend.onrender.com
```

---

## 🧪 Running Backend Tests

```bash
cd server
npm install
npm test
```

---

## 📁 Folder Structure

```
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
```

---

## 🧠 How It Works

1. User signs up or logs in  
2. Creates a visual flow using blocks (Lead → Email → Delay → Email)  
3. Flow is sent to backend using `POST /api/save-flow`  
4. Backend parses and schedules jobs using Agenda  
5. Emails are sent at the right time using Nodemailer  

---

## ✅ Submission Checklist

- [x] Frontend with ReactFlow editor  
- [x] Cold Email, Delay, Lead Source nodes  
- [x] JWT Auth (Login/Signup)  
- [x] Flow saving and scheduling  
- [x] Nodemailer + Agenda integration  
- [x] `.env.example` file  
- [x] Unit tests with Jest  
- [x] Postman Collection  
- [x] Deployed frontend + backend  
- [x] Demo video link  
- [x] Complete README  

---

## 👤 Author

**Tanisha Pargal**  
📧 tanishapargal2003@gmail.com  
🔗 [GitHub](https://github.com/tanisha-pargal-15)
