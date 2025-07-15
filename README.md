# 🫀 OrganEase - Organ Donation Management System

OrganEase is a full-stack web application designed to streamline the communication between hospitals and transplant centers for organ procurement and request management. It offers a simple, secure, and responsive interface for managing organ availability and matching critical patient needs.

---

## 🚀 Features

### 🏥 For Hospitals
- View all available organs
- Submit organ requests with patient details
- Track request status (Pending, Accepted, Rejected)

### 🏢 For Transplant Centers
- Add new donated organs
- View listed organs with live availability status
- Manage and respond to incoming hospital requests

### 🔐 Authentication
- Role-based login (Hospital / Center)
- JWT-protected routes
- Passwords stored securely with bcrypt hashing

### 🌐 UI/UX
- Fully responsive design with **Tailwind CSS**
- Smooth transitions and interactive components using **Framer Motion**
- Clean dashboards and forms for both user types
- Themed color palette for medical branding

---

## 🛠️ Tech Stack

| Frontend | Backend | Database |
|---------|---------|----------|
| React + Vite | Express.js | MongoDB |
| Tailwind CSS | Node.js | Mongoose |
| React Router | JWT Auth | --- |

---

## 📸 Screenshots

> 📷 Add screenshots or screen recordings here  
> Home • Login • Hospital Dashboard • Center Dashboard • Organ Listing • Requests

---

## 🧩 Folder Structure

OrganEase/
├── client/ # React frontend
├── server/ # Node + Express backend
├── README.md
└── .gitignore


---

## 🧪 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/organease.git
cd organease

2. Setup Server
cd server
npm install
# Create .env and configure
npm run dev

3. Setup Client
cd client
npm install
npm run dev

📦 Environment Variables
Inside server/.env:

PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret

✅ To-Do (Optional Enhancements)
 Organ request matching by blood group compatibility

 Email or SMS notifications on status updates

 Admin panel for analytics

 Deployment via Render / Vercel

 🤝 Contributing
Pull requests are welcome. For major changes, open an issue first to discuss what you’d like to change.

📄 License
MIT License © [Your Name]

👤 Author
Vishal Sain
🔗 LinkedIn • GitHub


---

Let me know if you want this customized for **deployment links**, **badges**, or if you’d like to add **project goals** or **API documentation**!
