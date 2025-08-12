# Task Manager

A full-stack task management app with React (TypeScript) frontend and Node.js backend.

🌐 **Live Demo:** [https://task-manager-mocha-six.vercel.app/](https://task-manager-mocha-six.vercel.app/)

## Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)

## Project Structure

```
task-manager/
├── backend/
│   ├── models/Task.js
│   ├── routes/tasks.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   └── utils/
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

### Setup

1. **Clone and install:**
   ```bash
   git clone https://github.com/gilleon/task-manager.git
   cd task-manager
   
   # Backend
   cd backend && npm install
   
   # Frontend  
   cd ../frontend && npm install
   ```

2. **Configure backend:**
   ```bash
   # backend/.env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/taskmanager
   # For MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://<username>:<db_password>@cluster.mongodb.net/taskmanager
   ```

3. **Start services:**
   ```bash
   # Terminal 1 - Backend
   cd backend && npm start
   
   # Terminal 2 - Frontend
   cd frontend && npm start
   ```

4. **Access app:** http://localhost:3001

## 🛠️ Tech Stack

**Frontend:** React 18, TypeScript, Tailwind CSS, Axios  
**Backend:** Node.js, Express, MongoDB, Mongoose

## ✨ Features

### Core Functionality
- ✅ Create, delete tasks
- ✅ Mark tasks complete/incomplete  
- ✅ Filter: All/Completed/Incomplete
- ✅ Priority levels (High/Medium/Low)
- ✅ Due dates and descriptions
- ✅ Responsive design


### Additional Features
- **Responsive Design** - Works on desktop and mobile
- **Real-time Updates** - Instant UI feedback with optimistic updates
- **Offline Support** - localStorage fallback when backend is unavailable
- **Priority Levels** - Visual indicators for task priority (High, Medium, Low)
- **Task Counters** - Display counts for each filter category
- **Loading States** - Smooth loading indicators
- **Error Handling** - Graceful error messages and recovery

## ⚙️ API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/tasks` | Get all tasks |
| POST   | `/tasks` | Create a new task |
| PUT    | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |
## 🐛 Known Issues

- **CORS**: Backend includes CORS middleware for development; configure for production
- **MongoDB Connection**: Ensure MongoDB is running before starting the backend
- If Tailwind styles don't load, check `postcss.config.js`

## 📱 Offline Mode

The app automatically falls back to localStorage when the backend is unavailable, allowing full functionality offline.